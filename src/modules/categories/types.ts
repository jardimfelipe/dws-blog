export type Category = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  postId: string;
};

export enum QueryKeys {
  categories = "categories",
}
