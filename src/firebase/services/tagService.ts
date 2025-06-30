// tagService.ts
import { getDocs, collection } from "firebase/firestore";

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
