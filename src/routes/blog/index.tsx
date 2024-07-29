import PostList from "../../modules/posts/components/PostList";
import Sorter from "../../ui/atoms/Sorter";
import BlogFilter from "../../ui/organisms/BlogFilter";
import useMediaQuery from "../../utils/useMediaQuery";
import styles from "./styles.module.css";

export default function Blog() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <div className="container">
      <div className={styles.header}>
        <h1>DWS Blog</h1>
        {isMobile ? <BlogFilter /> : null}
        <Sorter />
      </div>
      <aside>{!isMobile ? <BlogFilter /> : null}</aside>
      <main>
        <PostList />
      </main>
    </div>
  );
}
