export type IName = {
  name: string;
  nameInEnglish: string;
  meaning: string;
  description: string;
  gender: string;
  origin: string;
  slug?: string;
  literatureEvidence?: string;
  epigraphEvidence?: string;
  otherNames: string[];
  relatedNames: string[];
  categories: string[];
  comments: string[];
  tags: string[];
  author: string;
  reference?: string;
  active: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type IUser = {
  name: string;
  email: string;
  uid: string;
  imageUrl: string;
  isAdmin: boolean;
};

export type Path = { path: string; name: string };
