export type Author = {
  id: string;
  name: string;
  profilePicture: string;
  createdAt: string;
  updatedAt: string;
};

export enum QueryKeys {
  authors = "authors",
}
