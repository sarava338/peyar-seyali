import { updateDoc, setDoc, deleteDoc, doc, getDoc, collection, getDocs, query, where } from "firebase/firestore";

import { auth, db } from "../firebase";

import { toSlug } from "../../utils";
import type { IName } from "../../types";

export async function getAllNamesForAdmin(): Promise<IName[]> {
  const selectedNames = collection(db, "names");
  const snapshot = await getDocs(selectedNames);

  const names = snapshot.docs.map((doc) => {
    const nameData = doc.data() as IName;

    return {
      id: doc.id,
      ...nameData,
    };
  });

  return names;
}

export async function getAllNames(): Promise<IName[]> {
  const selectedNames = query(collection(db, "names"), where("active", "==", true));
  const snapshot = await getDocs(selectedNames);

  const names: IName[] = snapshot.docs.map((doc) => {
    const nameData = doc.data() as IName;

    return {
      id: doc.id,
      ...nameData,
    };
  });

  return names;
}

export async function getNameById(id: string): Promise<IName | null> {
  const selectedName = query(collection(db, "names"), where("slug", "==", id), where("active", "==", true));

  const snapshot = await getDocs(selectedName);

  if (snapshot.empty) return null;

  const doc = snapshot.docs[0];
  const docData = doc.data() as IName;

  return docData;
}

export async function getNameByIdForAdmin(id: string): Promise<IName | null> {
  const docRef = doc(db, "names", id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) throw new Error("Name Not Found");

  const docData = docSnap.data() as IName;

  const nameDetail = {
    id: docSnap.id,
    ...docData,
  };

  return nameDetail;
}

/**
 * Add a new name with unique slug as document ID
 * @export
 * @param {IName} nameDetail
 */
export async function addName(nameDetail: IName) {
  const slug = nameDetail.slug || toSlug(nameDetail.nameInEnglish);
  const docRef = doc(db, "names", slug);

  await setDoc(docRef, {
    ...nameDetail,
    slug: slug,
    author: nameDetail.author.split("@")[0] || auth.currentUser?.email || "Anonymous",
    comments: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
}

/**
 * Update an existing name
 * @param docId firebase's document id
 * @param nameDetail name data from form
 */
export async function updateName(docId: string, nameDetail: IName) {
  const docRef = doc(db, "names", docId);

  await updateDoc(docRef, {
    ...nameDetail,
    updatedAt: new Date().toISOString(),
  });
}

// Delete a name
export async function deleteName(docId: string) {
  const docRef = doc(db, "names", docId);
  await deleteDoc(docRef);
}
