// tagService.ts
import { getDocs, collection } from "firebase/firestore";

import { db } from "../firebase";

import type { ITag } from "../../types";

export async function getTagsForInput(): Promise<Pick<ITag, "tag" | "slug">[]> {
  const snapshot = await getDocs(collection(db, "tags"));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as ITag) }));
}
