import PostList from "../modules/posts/components/PostList";
import BlogFilter from "../ui/organisms/BlogFilter";

export default function Blog() {
  return (
    <div className="container">
      <aside>
        <BlogFilter />
      </aside>
      <main>
        <PostList />
      </main>
    </div>
  );
}
