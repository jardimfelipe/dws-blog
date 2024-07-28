import usePostsQuery from "../modules/posts/services/usePostsQuery";

export default function Posts() {
  const { data = [] } = usePostsQuery();
  return (
    <div>
      posts:
      {data.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}
