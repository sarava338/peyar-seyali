import {
  updateDoc,
  setDoc,
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  where,
  DocumentReference,
  arrayUnion,
  arrayRemove,
  writeBatch,
  increment,
  QueryConstraint,
} from "firebase/firestore";

import { auth, db } from "../firebase";

import { toSlug } from "../../utils";
import { getRefs, resolveRefs } from "../utils";

import type { CategorySlugType, ICategory, IComment, IName, ITag, NameCardType, NameSlugType, TagSlugType } from "../../types/types";

async function resolveName(nameRef: DocumentReference): Promise<IName | undefined> {
  try {
    const nameDoc = await getDoc(nameRef);

    const data = nameDoc.data();

    if (!data) throw new Error("Name not found");

    return {
      name: data.name,
      nameInEnglish: data.nameInEnglish,
      meaning: data.meaning,
      description: data.description,
      special: data.special,
      gender: data.gender,
      slug: data.slug,
      author: data.author,
      active: data.active,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      origin: data.origin,
      literatureEvidence: data.literatureEvidence,
      epigraphEvidence: data.epigraphEvidence,
      reference: data.reference,
      comments: await resolveRefs<IComment>(data.comments || []),
      tags: await resolveRefs<ITag, TagSlugType>(data.tags || [], (data) => ({ tag: data.tag, slug: data.slug })),
      relatedNames: await resolveRefs<IName, NameSlugType>(data.relatedNames || [], (data) => ({ name: data.name, slug: data.slug })),
      otherNames: await resolveRefs<IName, NameSlugType>(data.otherNames || [], (data) => ({ name: data.name, slug: data.slug })),
      categories: await resolveRefs<ICategory, CategorySlugType>(data.categories || [], (data) => ({
        category: data.category,
        slug: data.slug,
      })),
    };
  } catch (error) {
    console.error("error while resolving name", error);
    throw error;
  }
}

export async function getAllNamesForAdmin(queries: QueryConstraint[] = []): Promise<NameCardType[]> {
  try {
    const selectedNames = query(collection(db, "names"), ...queries);
    const snapshot = await getDocs(selectedNames);

    return snapshot.docs.map((docSnap) => {
      const data = docSnap.data() as IName;

      return {
        name: data.name,
        nameInEnglish: data.nameInEnglish,
        slug: data.slug,
        description: data.description,
        gender: data.gender,
      };
    });
  } catch (err) {
    const error = err as Error;
    console.error(error);
    throw error;
  }
}

export async function getAllNames(queries: QueryConstraint[] = []): Promise<NameCardType[]> {
  try {
    const selectedNames = query(collection(db, "names"), where("active", "==", true), ...queries);
    const snapshot = await getDocs(selectedNames);

    return snapshot.docs.map((docSnap) => {
      const data = docSnap.data() as IName;

      return {
        name: data.name,
        nameInEnglish: data.nameInEnglish,
        slug: data.slug!,
        description: data.description,
        gender: data.gender,
      };
    });
  } catch (err) {
    const error = err as Error;
    console.error("error while getting names", error);
    throw error;
  }
}

export async function getNamesForInput(): Promise<NameSlugType[]> {
  const selectedNames = collection(db, "names");
  const snapshot = await getDocs(selectedNames);

  const names = snapshot.docs.map((doc) => {
    const nameData = doc.data() as IName;

    return {
      name: nameData.name,
      slug: nameData.slug,
    };
  });

  return names;
}

export async function getNameById(id: string): Promise<IName | undefined> {
  try {
    const selectedNameQuery = query(collection(db, "names"), where("slug", "==", id), where("active", "==", true));
    const snapshot = await getDocs(selectedNameQuery);
    if (snapshot.empty) throw new Error(`name not found for id : ${id}`);

    const docRef = snapshot.docs[0].ref;

    return resolveName(docRef);
  } catch (error) {
    console.error(error);
  }
}

export async function getNameByIdForAdmin(id: string): Promise<IName | undefined> {
  try {
    const docRef = doc(db, "names", id);
    return resolveName(docRef);
  } catch (error) {
    console.error("error while getting name", error);
    throw error;
  }
}

export async function addName(nameDetail: IName) {
  try {
    const slug = nameDetail.slug || toSlug(nameDetail.nameInEnglish);
    const docRef = doc(db, "names", slug);

    await setDoc(docRef, {
      ...nameDetail,
      slug: slug,
      author: nameDetail.author.split("@")[0] || auth.currentUser?.email?.split("@")[0] || "Anonymous",
      comments: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    // syncing refs
    await updateNameWithRefs(docRef, nameDetail);
  } catch (error) {
    console.error("error while adding new name", error);
    throw error;
  }
}

export async function editNameById(nameId: string, updatedName: IName) {
  try {
    const batch = writeBatch(db);

    const { tags, categories, otherNames, relatedNames } = updatedName;

    const nameRef = doc(db, "names", nameId);
    const nameSnap = await getDoc(nameRef);

    if (!nameSnap.exists()) throw new Error("Name Not Found");

    const prevName = nameSnap.data();

    const prevTagRefs: DocumentReference[] = prevName.tags;
    const prevCatRefs: DocumentReference[] = prevName.categories;

    const newTagRefs = await getRefs(
      "tags",
      tags.map((tag) => tag.slug)
    );
    const newCatRefs = await getRefs(
      "categories",
      categories.map((cat) => cat.slug)
    );

    const otherNameRefs = await getRefs(
      "names",
      otherNames.map((name) => name.slug)
    );
    const relatedNameRefs = await getRefs(
      "names",
      relatedNames.map((name) => name.slug)
    );

    // ⛔️ Compare paths to get what's added/removed
    const tagsToAdd = newTagRefs.filter((r) => !prevTagRefs.find((p) => p.path === r.path));
    const tagsToRemove = prevTagRefs.filter((r) => !newTagRefs.find((p) => p.path === r.path));

    const catsToAdd = newCatRefs.filter((r) => !prevCatRefs.find((p) => p.path === r.path));
    const catsToRemove = prevCatRefs.filter((r) => !newCatRefs.find((p) => p.path === r.path));

    // 🔄 Sync reverse links
    tagsToAdd.forEach((tagRef) => batch.update(tagRef, { names: arrayUnion(nameRef), count: increment(1) }));
    tagsToRemove.forEach((tagRef) => batch.update(tagRef, { names: arrayRemove(nameRef), count: increment(-1) }));
    catsToAdd.forEach((catRef) => batch.update(catRef, { names: arrayUnion(nameRef), count: increment(1) }));
    catsToRemove.forEach((catRef) => batch.update(catRef, { names: arrayRemove(nameRef), count: increment(-1) }));

    await updateDoc(nameRef, {
      ...updatedName,
      tags: newTagRefs,
      categories: newCatRefs,
      otherNames: otherNameRefs,
      relatedNames: relatedNameRefs,
    });
  } catch (error) {
    console.error("error while updating name", error);
    throw error;
  }
}

export async function deleteName(docId: string) {
  try {
    const nameRef = doc(db, "names", docId);
    const nameSnap = await getDoc(nameRef);

    if (!nameSnap.exists()) throw new Error("name not found to delete");

    const deleteName = nameSnap.data();

    const { tags, categories } = deleteName;

    await deleteNameAndCleanup(nameRef, tags, categories);
  } catch (error) {
    console.error("error while deleting name", error);
    throw error;
  }
}

export async function addTagRefsToName(nameRef: DocumentReference, tagRefs: DocumentReference[]) {
  try {
    await updateDoc(nameRef, { tags: arrayUnion(...tagRefs) });
  } catch (error) {
    console.error("error while adding tags to name", error);
    throw error;
  }
}

export async function removeTagRefsFromName(nameRef: DocumentReference, tagRefs: DocumentReference[]) {
  try {
    await updateDoc(nameRef, { tags: arrayRemove(...tagRefs) });
  } catch (error) {
    console.error("error while removing tags from name", error);
    throw error;
  }
}

export async function addCategoryRefsToName(nameRef: DocumentReference, categoryRefs: DocumentReference[]) {
  try {
    await updateDoc(nameRef, { tags: arrayUnion(...categoryRefs) });
  } catch (error) {
    console.error("error while adding categories to name", error);
    throw error;
  }
}

export async function removeCategoryRefsFromName(nameRef: DocumentReference, categoryRefs: DocumentReference[]) {
  try {
    await updateDoc(nameRef, { tags: arrayRemove(...categoryRefs) });
  } catch (error) {
    console.error("error while removing categories from name", error);
    throw error;
  }
}

export async function removeRelatedNameRefsFromName(nameRef: DocumentReference, relatedNameRefs: DocumentReference[]) {
  try {
    await updateDoc(nameRef, { relatedNames: arrayRemove(...relatedNameRefs) });
  } catch (error) {
    console.error("error while removing relatedNames from name", error);
    throw error;
  }
}

export async function removeOtherNameRefsFromName(nameRef: DocumentReference, otherNameRefs: DocumentReference[]) {
  try {
    await updateDoc(nameRef, { otherNames: arrayRemove(...otherNameRefs) });
  } catch (error) {
    console.error("error while removing otherNames from name", error);
    throw error;
  }
}

async function updateNameWithRefs(nameRef: DocumentReference, nameData: IName) {
  const batch = writeBatch(db);

  const tagRefs = await getRefs(
    "tags",
    nameData.tags.map((tag) => tag.slug)
  );
  const categoryRefs = await getRefs(
    "categories",
    nameData.categories.map((cat) => cat.slug)
  );
  const relatedNameRefs = await getRefs(
    "names",
    nameData.relatedNames.map((name) => name.slug)
  );
  const otherNameRefs = await getRefs(
    "names",
    nameData.otherNames.map((name) => name.slug)
  );

  batch.update(nameRef, {
    tags: arrayUnion(...tagRefs),
    categories: arrayUnion(...categoryRefs),
    relatedNames: arrayUnion(...relatedNameRefs),
    otherNames: arrayUnion(...otherNameRefs),
  });

  tagRefs.forEach((tagRef) => batch.update(tagRef, { names: arrayUnion(nameRef) }));
  categoryRefs.forEach((catRef) => batch.update(catRef, { names: arrayUnion(nameRef) }));

  await batch.commit();
}

async function deleteNameAndCleanup(nameRef: DocumentReference, tagRefs: DocumentReference[] = [], categoryRefs: DocumentReference[] = []) {
  const batch = writeBatch(db);

  tagRefs.forEach((tagRef) => batch.update(tagRef, { names: arrayRemove(nameRef) }));
  categoryRefs.forEach((catRef) => batch.update(catRef, { names: arrayRemove(nameRef) }));

  batch.delete(nameRef);

  await batch.commit();
}