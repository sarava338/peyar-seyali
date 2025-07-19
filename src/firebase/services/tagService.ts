// tagService.ts
import {
  getDocs,
  collection,
  DocumentReference,
  arrayUnion,
  arrayRemove,
  query,
  doc,
  orderBy,
  getDoc,
  writeBatch,
  increment,
  type DocumentData,
} from "firebase/firestore";

import { db } from "../firebase";
import { getRefs, resolveRefs } from "../utils";

import type { IName, ITag, NameCardType, NameSlugType, TagSlugType } from "../../types/types";
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

export async function getNamesFromTag(tagId: string): Promise<NameCardType[]> {
  try {
    const tagRef = doc(db, "tags", tagId);
    const tagDoc = await getDoc(tagRef);

    if (!tagDoc.exists()) throw new Error("tag not found");

    const tagData = tagDoc.data();

    if (!tagData.active) throw new Error("tag not found");
    
    const nameDocs = await Promise.all(tagData.names.map(async (nameRef: DocumentReference) => await getDoc(nameRef)));

    return nameDocs.map((nameDoc: DocumentData) => {
      const data = nameDoc.data();

      return {
        name: data.name,
        nameInEnglish: data.nameInEnglish,
        slug: data.slug!,
        description: data.description,
        gender: data.gender,
      };
    });
  } catch (error) {
    console.error("error while getting names for a tag", error);
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
    const batch = writeBatch(db);

    const slug = tagData.slug || toSlug(tagData.tagInEnglish);
    const tagRef = doc(db, "tags", slug);

    const nameRefs = await getRefs(
      "names",
      tagData.names.map((name) => name.slug)
    );

    nameRefs.forEach((nameRef) => batch.update(nameRef, { tags: arrayUnion(tagRef) }));

    batch.set(tagRef, {
      ...tagData,
      slug,
      names: nameRefs,
      count: increment(nameRefs.length),
    });

    batch.commit();
  } catch (error) {
    console.error("error while adding new tag", error);
    throw error;
  }
}

export async function deleteTag(tagId: string) {
  try {
    const batch = writeBatch(db);

    const tagRef = doc(db, "tags", tagId);
    const tagDoc = await getDoc(tagRef);

    if (!tagDoc.exists()) throw new Error("tag not found to delete");

    const deleteTag = tagDoc.data();

    const { names } = deleteTag;

    names.forEach((nameRef: DocumentReference) => batch.update(nameRef, { tags: arrayRemove(tagRef) }));
    batch.delete(tagRef);

    batch.commit();
  } catch (error) {
    console.error("error while deleting tag", error);
    throw error;
  }
}

export async function addNamesToTag(tagId: string, nameSlugs: string[]) {
  const batch = writeBatch(db);

  const tagRef = doc(db, "tags", tagId);
  const nameRefs = await getRefs("names", nameSlugs);

  batch.update(tagRef, { names: arrayUnion(...nameRefs), count: increment(nameRefs.length) });
  nameRefs.forEach((nameRef) => batch.update(nameRef, { tags: arrayUnion(tagRef) }));

  batch.commit();
}

export async function removeNamesFromTag(tagId: string, nameSlugs: string[]) {
  const batch = writeBatch(db);

  const tagRef = doc(db, "tags", tagId);
  const nameRefs = await getRefs("names", nameSlugs);

  batch.update(tagRef, { names: arrayRemove(...nameRefs), count: increment(-nameRefs.length) });
  nameRefs.forEach((nameRef) => batch.update(nameRef, { tags: arrayRemove(tagRef) }));

  batch.commit();
}