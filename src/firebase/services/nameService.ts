import { updateDoc, setDoc, deleteDoc, doc, getDoc, collection, getDocs, query, where } from "firebase/firestore";

import { auth, db } from "../firebase";

import { toSlug } from "../../utils";
import { getRefs, resolveRefs } from "../utils";

import type { CategorySlugType, ICategory, IComment, IName, ITag, NameCardType, NameSlugType, TagSlugType } from "../../types/types";

async function resolveName(docSnap: any): Promise<IName> {
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

export async function getNameById(id: string): Promise<IName> {
  const selectedName = query(collection(db, "names"), where("slug", "==", id), where("active", "==", true));

  const snapshot = await getDocs(selectedName);

  if (snapshot.empty) throw new Error("Name Not Found");

  const doc = snapshot.docs[0];

  return resolveName(doc);
}

export async function getNameByIdForAdmin(id: string): Promise<IName> {
  const docRef = doc(db, "names", id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) throw new Error("Name Not Found");

  return resolveName(docSnap);
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

export async function editNameById(nameId: string, updatedName: Partial<IName>) {
  try {
    console.log("nameId", nameId);
    console.log("name - update", updatedName);

    const docRef = doc(db, "names", nameId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) throw new Error("Name Not Found");

    await updateDoc(docRef, updatedName);
  } catch (err) {
    const error = err as Error;
    console.log("errorwhile updating name", error);
    throw error;
  }
}

// Delete a name
export async function deleteName(docId: string) {
  const docRef = doc(db, "names", docId);
  await deleteDoc(docRef);
}
