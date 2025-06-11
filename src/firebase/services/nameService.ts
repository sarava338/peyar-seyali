import {
  updateDoc,
  deleteDoc,
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "../firebase";

import { toArray, toSlug } from "../../utils";
import type { IName, NameDetail } from "../../types";

export async function getAllNames(): Promise<NameDetail[]> {
  const namesCol = collection(db, "names");
  const snapshot = await getDocs(namesCol);

  const names = snapshot.docs.map((doc) => {
    const nameData = doc.data() as IName;

    return {
      id: doc.id,
      ...nameData,
      otherNames: (nameData.otherNames || []).join(","),
      relatedNames: (nameData.relatedNames || []).join(","),
      categories: (nameData.categories || []).join(","),
      tags: (nameData.tags || []).join(","),
    };
  });

  return names;
}

export async function getNameById(id: string): Promise<NameDetail | null> {
  const docRef = doc(db, "names", id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) throw new Error("Name Not Found");

  const docData = docSnap.data() as IName;

  const nameDetail = {
    id: docSnap.id,
    ...docData,
    otherNames: (docData.otherNames || []).join(","),
    relatedNames: (docData.relatedNames || []).join(","),
    categories: (docData.categories || []).join(","),
    tags: (docData.tags || []).join(","),
  };

  return nameDetail;
}

/**
 * Add a new name with unique slug as document ID
 * @export
 * @param {NameDetail} nameDetail
 */
export async function addName(nameDetail: NameDetail) {
  const slug = toSlug(nameDetail.slug || nameDetail.nameInEnglish);
  const docRef = doc(db, "names", slug);

  await setDoc(docRef, {
    ...nameDetail,
    slug: slug,
    comments: [],
    otherNames: toArray(nameDetail.otherNames!, ","),
    relatedNames: toArray(nameDetail.relatedNames!, ","),
    categories: toArray(nameDetail.categories!, ","),
    tags: toArray(nameDetail.tags!, ","),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
}

/**
 * Update an existing name
 * @param docId firebase's document id
 * @param nameDetail name data from form
 */
export async function updateName(docId: string, nameDetail: NameDetail) {
  const docRef = doc(db, "names", docId);

  await updateDoc(docRef, {
    ...nameDetail,
    otherNames: toArray(nameDetail.otherNames!, ","),
    relatedNames: toArray(nameDetail.relatedNames!, ","),
    categories: toArray(nameDetail.categories!, ","),
    tags: toArray(nameDetail.tags!, ","),
    updatedAt: new Date().toISOString(),
  });
}

// Delete a name
export async function deleteName(docId: string) {
  const docRef = doc(db, "names", docId);
  await deleteDoc(docRef);
}
