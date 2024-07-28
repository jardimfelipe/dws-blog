import { Post } from "../../types";

import Card from "../../../../ui/molecules/Card";
import styles from "./styles.module.css";
import { formatDate } from "../../../../utils/date";
import Badge from "../../../../ui/atoms/Badge";
import Skeleton from "../../../../ui/atoms/Skeleton";

type Props = {
  post: Post;
};

export default function PostItem({ post }: Props) {
  return (
    <Card.Container style={{ width: "300px" }}>
      <Card.Image src={post.thumbnail_url} height="150px" alt={post.title} />
      <Card.Content>
        <div className={styles.meta}>
          <Card.Description>{formatDate(post.createdAt)}</Card.Description>
          <span className={styles.separator} />
          <Card.Description>{post.author.name}</Card.Description>
        </div>
        <Card.Title>{post.title}</Card.Title>

        <p className={styles.content}>{post.content}</p>
      </Card.Content>

      <Card.Footer>
        {post.categories.map((category) => (
          <Badge key={category.id}>{category.name}</Badge>
        ))}
      </Card.Footer>
    </Card.Container>
  );
}

PostItem.Skeleton = function PostItemSkeleton() {
  return (
    <Card.Container style={{ width: "300px" }}>
      <Skeleton width="100%" height="150px" />
      <Card.Content>
        <div className={styles.meta}>
          <Skeleton width="100%" height="20px" />
          <span className={styles.separator} />
          <Skeleton width="100%" height="20px" />
        </div>
        <p>
          <Skeleton width="100%" height="30px" />
        </p>
        <p>
          <Skeleton width="100%" height="30px" />
        </p>
      </Card.Content>
    </Card.Container>
  );
};
