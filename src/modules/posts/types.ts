import { Author } from "../authors/types";
import { Category } from "../categories/types";

export type Post = {
  id: string;
  title: string;
  content: string;
  thumbnail_url: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  categories: Category[];
  author: Author;
};

export enum QueryKeys {
  posts = "posts",
}
