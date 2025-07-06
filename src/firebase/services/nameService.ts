import { updateDoc, setDoc, deleteDoc, doc, getDoc, collection, getDocs, query, where, DocumentReference } from "firebase/firestore";

import { auth, db } from "../firebase";

import { addNamesToTags, removeNamesFromTags } from "./tagService";
import { addNamesToCategories, removeNamesFromCategories } from "./categoryService";

import { toSlug } from "../../utils";
import { getRefs, resolveRefs } from "../utils";

import type { CategorySlugType, ICategory, IComment, IName, ITag, NameCardType, NameSlugType, TagSlugType } from "../../types/types";

async function resolveName(docSnap: any): Promise<IName | undefined> {
  try {
    const data = docSnap.data();

    return {
      ...data,

      comments: await resolveRefs<IComment>(data.comments || []),
      tags: await resolveRefs<ITag, TagSlugType>(data.tags || [], (data) => ({ tag: data.tag, slug: data.slug })),
      relatedNames: await resolveRefs<IName, NameSlugType>(data.relatedNames || [], (data) => ({ name: data.name, slug: data.slug })),
      otherNames: await resolveRefs<IName, NameSlugType>(data.otherNames || [], (data) => ({ name: data.name, slug: data.slug })),

      categories: await resolveRefs<ICategory, CategorySlugType>(data.categories || [], (data) => ({
        category: data.category,
        slug: data.slug,
      })),
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getAllNamesForAdmin(): Promise<NameCardType[]> {
  try {
    const selectedNames = query(collection(db, "names"));
    const snapshot = await getDocs(selectedNames);

    return snapshot.docs.map((docSnap) => {
      const data = docSnap.data() as IName;

      return {
        name: data.name,
        nameInEnglish: data.nameInEnglish,
        slug: data.slug,
        description: data.description,
        gender: data.gender,
      };
    });
  } catch (err) {
    const error = err as Error;
    console.error(error);
    throw error;
  }
}

export async function getAllNames(): Promise<NameCardType[]> {
  try {
    const selectedNames = query(collection(db, "names"), where("active", "==", true));
    const snapshot = await getDocs(selectedNames);

    return snapshot.docs.map((docSnap) => {
      const data = docSnap.data() as IName;

      return {
        name: data.name,
        nameInEnglish: data.nameInEnglish,
        slug: data.slug!,
        description: data.description,
        gender: data.gender,
      };
    });
  } catch (err) {
    const error = err as Error;
    console.error(error);
    throw error;
  }
}

export async function getNamesForInput(): Promise<NameSlugType[]> {
  const selectedNames = collection(db, "names");
  const snapshot = await getDocs(selectedNames);

  const names = snapshot.docs.map((doc) => {
    const nameData = doc.data() as IName;

    return {
      name: nameData.name,
      slug: nameData.slug,
    };
  });

  return names;
}

export async function getNameById(id: string): Promise<IName | undefined> {
  try {
    const selectedName = query(collection(db, "names"), where("slug", "==", id), where("active", "==", true));

    const snapshot = await getDocs(selectedName);

    if (snapshot.empty) throw new Error("Name Not Found");

    const doc = snapshot.docs[0];

    return resolveName(doc);
  } catch (error) {
    console.error(error);
  }
}

export async function getNameByIdForAdmin(id: string): Promise<IName | undefined> {
  try {
    const docRef = doc(db, "names", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) throw new Error("Name Not Found");

    return resolveName(docSnap);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

/**
 * Add a new name with unique slug as document ID
 * @export
 * @param {IName} nameDetail
 */
export async function addName(nameDetail: IName) {
  try {
    const slug = nameDetail.slug || toSlug(nameDetail.nameInEnglish);
    const docRef = doc(db, "names", slug);

    const otherNameSlugs = nameDetail.otherNames.map((name) => name.slug);
    const relatedNameSlugs = nameDetail.relatedNames.map((name) => name.slug);
    const tagSlugs = nameDetail.tags.map((tag) => tag.slug);
    const categorySlugs = nameDetail.categories.map((category) => category.slug);

    await setDoc(docRef, {
      ...nameDetail,
      otherNames: await getRefs("names", otherNameSlugs),
      relatedNames: await getRefs("names", relatedNameSlugs),
      categories: await getRefs("categories", categorySlugs),
      tags: await getRefs("tags", tagSlugs),
      slug: slug,
      author: nameDetail.author.split("@")[0] || auth.currentUser?.email?.split("@")[0] || "Anonymous",
      comments: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  } catch (err) {
    const error = err as Error;
    console.log(error);
    throw error;
  }
}

export async function editNameById(nameId: string, updatedName: IName) {
  try {
    console.log("name - update", updatedName);

    const { tags, categories, otherNames, relatedNames } = updatedName;

    const nameRef = doc(db, "names", nameId);
    const nameSnap = await getDoc(nameRef);

    if (!nameSnap.exists()) throw new Error("Name Not Found");

    const prevName = nameSnap.data();

    console.log("prevName", prevName);

    const prevTagRefs: DocumentReference[] = prevName.tags;
    const prevCatRefs: DocumentReference[] = prevName.categories;

    const newTagRefs = await getRefs(
      "tags",
      tags.map((tag) => tag.slug)
    );
    const newCatRefs = await getRefs(
      "categories",
      categories.map((cat) => cat.slug)
    );

    const otherNameRefs = await getRefs(
      "names",
      otherNames.map((name) => name.slug)
    );
    const relatedNameRefs = await getRefs(
      "names",
      relatedNames.map((name) => name.slug)
    );

    // ⛔️ Compare paths to get what's added/removed
    const tagsToAdd = newTagRefs.filter((r) => !prevTagRefs.find((p) => p.path === r.path));
    const tagsToRemove = prevTagRefs.filter((r) => !newTagRefs.find((p) => p.path === r.path));

    const catsToAdd = newCatRefs.filter((r) => !prevCatRefs.find((p) => p.path === r.path));
    const catsToRemove = prevCatRefs.filter((r) => !newCatRefs.find((p) => p.path === r.path));

    // 🔄 Sync reverse links
    await Promise.all([
      addNamesToTags(tagsToAdd, [nameRef]),
      removeNamesFromTags(tagsToRemove, [nameRef]),
      addNamesToCategories(catsToAdd, [nameRef]),
      removeNamesFromCategories(catsToRemove, [nameRef]),
    ]);

    await updateDoc(nameRef, {
      ...updatedName,
      tags: newTagRefs,
      categories: newCatRefs,
      otherNames: otherNameRefs,
      relatedNames: relatedNameRefs,
    });
  } catch (error) {
    console.log("error while updating name", error);
    throw error;
  }
}

// Delete a name
export async function deleteName(docId: string) {
  try {
    const nameRef = doc(db, "names", docId);
    const nameSnap = await getDoc(nameRef);

    if (!nameSnap.exists()) throw new Error("name not found to delete");

    const deleteName = nameSnap.data();

    const { tags, categories } = deleteName;

    await Promise.all([removeNamesFromTags(tags, [nameRef]), removeNamesFromCategories(categories, [nameRef])]);

    // have to deleted references fields in other names which using this name as relatedName / otherName

    await deleteDoc(nameRef);
  } catch (error) {
    console.log("error while deleting name", error);
    throw error;
  }
}
