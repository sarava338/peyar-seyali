export type Path = { path: string; name: string };
export type CollectionName = "names" | "tags" | "categories" | "comments";

export type IName = {
  name: string;
  nameInEnglish: string;
  meaning: string;
  description: string;
  gender: string;
  origin: string;
  special: string;
  literatureEvidence: string;
  epigraphEvidence: string;
  otherNames: NameSlugType[];
  relatedNames: NameSlugType[];
  categories: CategorySlugType[];
  tags: TagSlugType[];
  author: string;
  active: boolean;
  slug: string;
  comments?: IComment[];
  reference?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type NameTableType = Pick<
  IName,
  "name" | "nameInEnglish" | "slug" | "description" | "gender" | "origin" | "special" | "author" | "active" | "createdAt" | "updatedAt"
>;
export type NameCardType = Pick<IName, "name" | "nameInEnglish" | "slug" | "description" | "gender">;
export type NameSlugType = Pick<IName, "name" | "slug">;

export type ITag = {
  tag: string;
  tagInEnglish: string;
  slug: string;
  names: NameSlugType[];
  count: number;
};

export type TagType = Pick<ITag, "tag" | "slug" | "tagInEnglish">;
export type TagSlugType = Pick<ITag, "tag" | "slug">;

export type ICategory = {
  category: string;
  categoryInEnglish: string;
  slug: string;
  names: NameSlugType[];
};

export type CategoryType = Pick<ICategory, "category" | "slug" | "categoryInEnglish">;
export type CategorySlugType = Pick<ICategory, "category" | "slug">;

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
  image: string;
  isAdmin: boolean;
};
