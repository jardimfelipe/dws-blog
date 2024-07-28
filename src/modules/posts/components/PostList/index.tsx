import { useContext } from "react";

import { PostContext, PostsContextProvider } from "../../context";
import PostItem from "../PostItem";
import styles from "./styles.module.css";

export default function PostList() {
  return (
    <PostsContextProvider>
      <Posts />
    </PostsContextProvider>
  );
}

function Posts() {
  const posts = useContext(PostContext);

  return posts.length ? (
    <div className={styles.container}>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  ) : (
    <div>No posts found</div>
  );
}
