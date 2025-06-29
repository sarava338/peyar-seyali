import { updateDoc, setDoc, deleteDoc, doc, getDoc, collection, getDocs, query, where } from "firebase/firestore";

import { auth, db } from "../firebase";

import { toSlug } from "../../utils";
import type { ICategory, IComment, IName, ITag, NameCard } from "../../types";
import { getRefs, resolveRefs } from "../utils";

async function resolveName(docSnap: any): Promise<IName> {
  const data = docSnap.data();

  const [tags, categories, relatedNames, otherNames, comments] = await Promise.all([
    resolveRefs<Pick<ITag, "tag" | "slug">>(data.tags || []),
    resolveRefs<Pick<ICategory, "category" | "slug">>(data.categories || []),
    resolveRefs<Pick<IName, "name" | "slug">>(data.relatedNames || []),
    resolveRefs<Pick<IName, "name" | "slug">>(data.otherNames || []),
    resolveRefs<IComment>(data.comments || []),
  ]);

  return {
    id: docSnap.id,
    ...data,
    tags,
    categories,
    relatedNames,
    otherNames,
    comments,
  };
}

export async function getAllNamesForAdmin(): Promise<NameCard[]> {
  try {
    const selectedNames = query(collection(db, "names"));
    const snapshot = await getDocs(selectedNames);
    return await Promise.all(snapshot.docs.map(async (docSnap) => await resolveName(docSnap)));
  } catch (err) {
    const error = err as Error;
    console.error(error);
    throw error;
  }
}

export async function getAllNames(): Promise<NameCard[]> {
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

export async function getNamesForInput(): Promise<Pick<IName, "name" | "slug">[]> {
  const selectedNames = collection(db, "names");
  const snapshot = await getDocs(selectedNames);

  const names: Pick<IName, "name" | "slug">[] = snapshot.docs.map((doc) => {
    const nameData = doc.data() as IName;

    return {
      name: nameData.name,
      slug: nameData.slug,
    };
  });

  return names;
}

export async function getNameById(id: string): Promise<IName | null> {
  const selectedName = query(collection(db, "names"), where("slug", "==", id), where("active", "==", true));

  const snapshot = await getDocs(selectedName);

  if (snapshot.empty) return null;

  const doc = snapshot.docs[0];

  return resolveName(doc);
}

export async function getNameByIdForAdmin(id: string): Promise<IName | null> {
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
    const tagRefs = nameDetail.tags.map((tag) => tag.slug);
    const categoryRefs = nameDetail.categories.map((category) => category.slug);

    await setDoc(docRef, {
      ...nameDetail,
      otherNames: await getRefs("names", otherNameSlugs),
      relatedNames: await getRefs("names", relatedNameSlugs),
      categories: await getRefs("categories", categoryRefs),
      tags: await getRefs("tags", tagRefs),
      slug: slug,
      author: nameDetail.author.split("@")[0] || auth.currentUser?.email || "Anonymous",
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
