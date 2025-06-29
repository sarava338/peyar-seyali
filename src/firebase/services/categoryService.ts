// categoryService.ts
import { getDocs, collection } from "firebase/firestore";

import { db } from "../firebase";

import type { ICategory } from "../../types";

export async function getCategoriesForInput(): Promise<Pick<ICategory, "category" | "slug">[]> {
  const snapshot = await getDocs(collection(db, "categories"));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as ICategory) }));
}
