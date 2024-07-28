import { createContext, useMemo } from "react";

import { Post, PostsContextProviderProps } from "../types";
import usePostsQuery from "../services/usePostsQuery";
import PostListSkeleton from "../components/PostListSkeleton";
import PostListError from "../components/PostListError";
import { useSearchParams } from "react-router-dom";
import { filterPosts } from "../utils/filterPost";

export const PostContext = createContext<Post[]>([]);

export const PostsContextProvider = ({
  children,
}: PostsContextProviderProps) => {
  const { data = [], isLoading, isError } = usePostsQuery();
  const [searchParams] = useSearchParams();

  const filteredPosts = useMemo(() => {
    const params = {
      authors: searchParams.getAll("authors"),
      categories: searchParams.getAll("categories"),
    };

    if (isLoading || isError) {
      return [];
    }

    return filterPosts(data, params);
  }, [isLoading, isError, data, searchParams]);

  if (isLoading) {
    return <PostListSkeleton />;
  }

  if (isError) {
    return <PostListError />;
  }

  return (
    <PostContext.Provider value={filteredPosts}>
      {children}
    </PostContext.Provider>
  );
};
