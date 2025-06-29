export type IName = {
  name: string;
  nameInEnglish: string;
  meaning: string;
  description: string;
  gender: string;
  origin: string;
  literatureEvidence: string;
  epigraphEvidence: string;
  otherNames: string[];
  relatedNames: string[];
  categories: string[];
  tags: string[];
  author: string;
  active: boolean;
  slug?: string;
  comments?: string[];
  reference?: string;
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
