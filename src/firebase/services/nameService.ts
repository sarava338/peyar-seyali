import { updateDoc, deleteDoc, doc, setDoc } from "firebase/firestore";

import { db } from "../firebase";
import { toArray, toSlug } from "../../utils";
import type { NameDetail } from "../../types";

/**
 * Add a new name with unique slug as document ID
 * @export
 * @param {NameDetail} nameDetail
 */
export async function addName(nameDetail: NameDetail) {
  const docRef = doc(
    db,
    "names",
    toSlug(nameDetail.slug || nameDetail.nameInEnglish)
  );
  await setDoc(docRef, {
    ...nameDetail,
    relatedNames: toArray(nameDetail.relatedNames, ","),
    categories: toArray(nameDetail.categories, ","),
    tags: toArray(nameDetail.tags, ","),
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
    relatedNames: toArray(nameDetail.relatedNames, ","),
    categories: toArray(nameDetail.categories, ","),
    tags: toArray(nameDetail.tags, ","),
    updatedAt: new Date().toISOString(),
  });
}

// Delete a name
export async function deleteName(docId: string) {
  const docRef = doc(db, "names", docId);
  await deleteDoc(docRef);
}
