// tagService.ts
import { getDocs, collection, DocumentReference, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

import { db } from "../firebase";

import type { ITag, TagSlugType } from "../../types/types";

export async function getTagsForInput(): Promise<TagSlugType[]> {
  const snapshot = await getDocs(collection(db, "tags"));
  return snapshot.docs.map((doc) => {
    const data = doc.data() as ITag;

    return {
      tag: data.tag,
      slug: data.slug,
    };
  });
}

export async function addNameRefsToTags(tagRefs: DocumentReference[], nameRefs: DocumentReference[] = []) {
  for (const tagRef of tagRefs) {
    await addNameRefsToTag(tagRef, nameRefs);
  }
}

export async function addNameRefsToTag(tagRef: DocumentReference, nameRefs: DocumentReference[]) {
  await updateDoc(tagRef, { names: arrayUnion(...nameRefs) });
}

export async function removeNameRefsFromTags(tagRefs: DocumentReference[], nameRefs: DocumentReference[] = []) {
  for (const tagRef of tagRefs) {
    await removeNameRefsFromTag(tagRef, nameRefs);
  }
}

export async function removeNameRefsFromTag(tagRef: DocumentReference, nameRefs: DocumentReference[]) {
  await updateDoc(tagRef, { names: arrayRemove(...nameRefs) });
}