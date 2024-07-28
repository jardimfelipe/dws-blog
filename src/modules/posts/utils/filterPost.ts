import { Post } from "../types";

interface FilterParams {
  categories: string[];
  authors: string[];
}

export const filterPosts = (posts: Post[], params: FilterParams): Post[] => {
  return posts.filter((post) => {
    const matchesCategory =
      !params.categories.length ||
      params.categories.some((categoryId) =>
        post.categories.some((postCategory) => postCategory.id === categoryId)
      );

    const matchesAuthor =
      !params.authors.length || params.authors.includes(post.author.id);

    return matchesCategory && matchesAuthor;
  });
};
