// categoryService.ts
import { getDocs, collection, DocumentReference, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

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

export async function addNameRefsToCategories(categoryRefs: DocumentReference[], nameRefs: DocumentReference[] = []) {
  for (const categoryRef of categoryRefs) {
    await addNameRefsToCategory(categoryRef, nameRefs);
  }
}

export async function addNameRefsToCategory(categoryRef: DocumentReference, nameRefs: DocumentReference[]) {
  await updateDoc(categoryRef, { names: arrayUnion(...nameRefs) });
}

export async function removeNameRefsFromCategories(categoryRefs: DocumentReference[], nameRefs: DocumentReference[] = []) {
  for (const categoryRef of categoryRefs) {
    await removeNameRefsToCategory(categoryRef, nameRefs);
  }
}

export async function removeNameRefsToCategory(categoryRef: DocumentReference, nameRefs: DocumentReference[]) {
  await updateDoc(categoryRef, { names: arrayRemove(...nameRefs) });
}