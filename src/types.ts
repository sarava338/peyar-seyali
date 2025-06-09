export type IName = {
  id: string;
  name: string;
  nameInEnglish: string;
  description?: string;
  gender?: string;
  origin?: string;
  literatureEvidence?: string;
  epigraphEvidence?: string;
  relatedNames: string[];
  comments: string[];
  categories: string[];
  tags: string[];
  author: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
};

export type NameDetail = {
  name: string;
  nameInEnglish: string;
  description?: string;
  gender?: string;
  origin?: string;
  slug?: string;
  literatureEvidence?: string;
  epigraphEvidence?: string;
  relatedNames: string;
  categories: string;
  tags: string;
  author: string;
  active: boolean;
};

export type IUser = {
  name: string;
  email: string;
  uid: string;
  imageUrl: string;
};
