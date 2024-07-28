export type Author = {
  id: string;
  name: string;
  profilePicture: string;
  createAt: string;
  updateAt: string;
};

export enum QueryKeys {
  authors = "authors",
}
