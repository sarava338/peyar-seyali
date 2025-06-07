export type IName = {
  id: string;
  name: string;
  nameInEnglish: string;
  description?: string;
  gender?: string;
  origin?: string;
  tags?: string[];
};

export type IUser = {
  name: string;
  email: string;
  uid: string;
  imageUrl: string;
};
