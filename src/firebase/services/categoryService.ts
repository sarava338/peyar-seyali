// categoryService.ts
import { getDocs, collection } from "firebase/firestore";

import { db } from "../firebase";

import type { CategorySlugType, ICategory } from "../../types/types";

export async function getCategoriesForInput(): Promise<CategorySlugType[]> {
  const snapshot = await getDocs(collection(db, "categories"));
  return snapshot.docs.map((doc) => {
    const data = doc.data() as ICategory;

    return {
      category: data.category,
      slug: data.slug,
    };
  });
}
