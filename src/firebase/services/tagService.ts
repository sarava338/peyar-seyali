// tagService.ts
import {
  getDocs,
  collection,
  DocumentReference,
  updateDoc,
  arrayUnion,
  arrayRemove,
  query,
  doc,
  setDoc,
  orderBy,
} from "firebase/firestore";

import { db } from "../firebase";
import { getRefs, resolveRefs } from "../utils";

import type { IName, ITag, NameSlugType, TagSlugType } from "../../types/types";
import { toSlug } from "../../utils";

export async function getAllTags(): Promise<ITag[]> {
  try {
    const selectedTags = query(collection(db, "tags"), orderBy("count", "desc"), orderBy("tag", "asc"));
    const tagsSnapshot = await getDocs(selectedTags);

    return await Promise.all(
      tagsSnapshot.docs.map(async (tagDoc) => {
        const data = tagDoc.data();

        return {
          tag: data.tag,
          tagInEnglish: data.tagInEnglish,
          slug: data.slug,
          names: await resolveRefs<IName, NameSlugType>(data.names ?? [], (nameData) => ({
            name: nameData.name,
            slug: nameData.slug,
          })),
          count: data.names.length || 0,
        };
      })
    );
  } catch (error) {
    console.error("errore while getting tags", error);
    throw error;
  }
}

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

export async function addTag(tagData: ITag) {
  try {
    const slug = tagData.slug || toSlug(tagData.tagInEnglish);
    const tagRef = doc(db, "tags", slug);

    const nameSlugs = tagData.names.map((name) => name.slug);

    await setDoc(tagRef, {
      ...tagData,
      slug: slug,
      names: await getRefs("names", nameSlugs),
      count: tagData.count,
    });
  } catch (error) {
    console.error("error while adding new tag", error);
    throw error;
  }
}

export async function addNameSlugsToTag(tagId: string, nameSlugs: string[]) {
  const tagRef = doc(db, "tags", tagId);
  const nameRefs = await getRefs("names", nameSlugs);

  await addNameRefsToTag(tagRef, nameRefs);
}

export async function removeNameSlugsFromTag(tagId: string, nameSlugs: string[]) {
  const tagRef = doc(db, "tags", tagId);
  const nameRefs = await getRefs("names", nameSlugs);

  await removeNameRefsFromTag(tagRef, nameRefs);
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
