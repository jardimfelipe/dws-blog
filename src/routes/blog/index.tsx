import PostList from "../../modules/posts/components/PostList";
import Sorter from "../../ui/atoms/Sorter";
import BlogFilter from "../../ui/organisms/BlogFilter";
import styles from "./styles.module.css";

export default function Blog() {
  return (
    <div className="container">
      <div className={styles.header}>
        <h1>DWS Blog</h1>
        <Sorter />
      </div>
      <aside>
        <BlogFilter />
      </aside>
      <main>
        <PostList />
      </main>
    </div>
  );
}
