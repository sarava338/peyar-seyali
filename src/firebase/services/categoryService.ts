import { getDocs, collection, DocumentReference, query, where, doc, getDoc, type DocumentData } from "firebase/firestore";

import { db } from "../firebase";

import type { CategorySlugType, ICategory, IName, NameCardType, NameSlugType } from "../../types/types";
import { resolveRefs } from "../utils";

export async function getAllCategories(): Promise<ICategory[]> {
  try {
    const selectedTags = query(collection(db, "categories"), where("active", "==", true));
    const tagsSnapshot = await getDocs(selectedTags);

    return await Promise.all(
      tagsSnapshot.docs.map(async (tagDoc) => {
        const data = tagDoc.data();

        return {
          category: data.category,
          categoryInEnglish: data.categoryInEnglish,
          slug: data.slug,
          names: await resolveRefs<IName, NameSlugType>(data.names ?? [], (nameData) => ({
            name: nameData.name,
            slug: nameData.slug,
          })),
        };
      })
    );
  } catch (error) {
    console.error("errore while getting categories", error);
    throw error;
  }
}

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

export async function getNamesFromCategory(categoryId: string): Promise<NameCardType[]> {
  try {
    const catRef = doc(db, "categories", categoryId);
    const catDoc = await getDoc(catRef);

    if (!catDoc.exists()) throw new Error("tag not found");

    const catData = catDoc.data();

    if (!catData.active) throw new Error("tag not found");

    const nameDocs = await Promise.all(catData.names.map(async (nameRef: DocumentReference) => await getDoc(nameRef)));

    return await Promise.all(
      nameDocs.map(async (nameDoc: DocumentData) => {
        const data = nameDoc.data();

        return {
          name: data.name,
          nameInEnglish: data.nameInEnglish,
          slug: data.slug!,
          description: data.description,
          gender: data.gender,
        };
      })
    );
  } catch (error) {
    console.error("error while getting names for a category", error);
    throw error;
  }
}
