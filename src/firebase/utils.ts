import { collection, doc, getDoc, getDocs, query, where, type DocumentReference } from "firebase/firestore";

import { db } from "./firebase";

import type { CollectionName } from "../types/types";

export async function resolveRefs<T, R = T>(refs: DocumentReference[], projector?: (data: T) => R): Promise<R[]> {
  try {
    const docs = await Promise.all(refs.map((ref) => getDoc(ref)));

    return docs
      .filter((d) => d.exists())
      .map((d) => {
        const data = d.data() as T;
        return projector ? projector(data) : ({ id: d.id, ...data } as R);
      });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * Given a collection name and a list of slugs, returns DocumentReferences for those documents.
 *
 * @param collectionName - The Firestore collection name.
 * @param slugs - An array of document slugs.
 * @returns An array of DocumentReferences.
 */
export async function getRefs(collectionName: CollectionName, slugs: string[]): Promise<DocumentReference[]> {
  if (slugs.length === 0) return [];
  if (slugs.length > 10) throw new Error("Can not add more than 10 fields");

  const q = query(collection(db, collectionName), where("slug", "in", slugs));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((docSnap) => doc(db, collectionName, docSnap.id)) as DocumentReference[];
}
