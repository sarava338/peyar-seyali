import { updateDoc, deleteDoc, doc, setDoc } from "firebase/firestore";

import { db } from "../firebase";
import { toSlug } from "../../utils";

import type { IName } from "../../types";

/**
 * Add a new name with unique slug as document ID
 * @export
 * @param {IName} nameDetail
 */
export async function addName(nameDetail: IName) {
  const docRef = doc(db, "names", toSlug(nameDetail.name));
  await setDoc(docRef, nameDetail);
}

// Update an existing name
export async function updateName(docId: string, nameDetail: IName) {
  const docRef = doc(db, "names", docId);
  await updateDoc(docRef, nameDetail);
}

// Delete a name
export async function deleteName(docId: string) {
  const docRef = doc(db, "names", docId);
  await deleteDoc(docRef);
}
