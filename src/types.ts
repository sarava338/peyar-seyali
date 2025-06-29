export type CollectionName = "names" | "tags" | "categories" | "comments";
export type NameCard = Pick<IName, "name" | "nameInEnglish" | "slug" | "description" | "gender">;

export type IName = {
  name: string;
  nameInEnglish: string;
  meaning: string;
  description: string;
  gender: string;
  origin: string;
  literatureEvidence: string;
  epigraphEvidence: string;
  otherNames: Pick<IName, "name" | "slug">[];
  relatedNames: Pick<IName, "name" | "slug">[];
  categories: Pick<ICategory, "category" | "slug">[];
  tags: Pick<ITag, "tag" | "slug">[];
  author: string;
  active: boolean;
  slug: string;
  comments?: IComment[];
  reference?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type ITag = {
  tag: string;
  tagInEnglish: string;
  slug: string;
  names: { name: string; nameInEnglish: string; nameSlug: string }[];
};

export type ICategory = {
  category: string;
  categoryInEnglish: string;
  slug: string;
  names: { name: string; nameInEnglish: string; nameSlug: string }[];
};

export type IComment = {
  text: string;
  author: string;
  comments: IComment[];
  active: boolean;
  createdAt: string;
  updatedAt: string;
};

export type IUser = {
  name: string;
  email: string;
  uid: string;
  imageUrl: string;
  isAdmin: boolean;
};

export type Path = { path: string; name: string };
