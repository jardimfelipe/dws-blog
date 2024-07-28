import { useCallback, useContext, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import FilterList from "../../../../ui/molecules/FilterList";
import Skeleton from "../../../../ui/atoms/Skeleton";
import { AuthorsContext } from "../../context";
import { Author } from "../../types";

export default function AuthorsFilterItems() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data = [], isLoading } = useContext(AuthorsContext);
  const authors = useMemo(
    () => searchParams.getAll("authors") || [],
    [searchParams]
  );

  const handleClick = useCallback(
    (authorId: Author["id"]) => {
      const newParams = new URLSearchParams(searchParams);
      if (authors.includes(authorId)) {
        newParams.delete("authors");
        authors
          .filter((id) => id !== authorId)
          .forEach((id) => newParams.append("authors", id));
      } else {
        newParams.append("authors", authorId);
      }

      setSearchParams(newParams);
    },
    [authors, searchParams, setSearchParams]
  );
  return (
    <>
      <FilterList.SubHeader>Authors</FilterList.SubHeader>
      <FilterList.List>
        {isLoading ? (
          <AuthorsFilterItems.Skeleton />
        ) : (
          data.map((author) => (
            <FilterList.Item
              role="link"
              key={author.id}
              active={authors.includes(author.id)}
              onClick={() => handleClick(author.id)}
            >
              {author.name}
            </FilterList.Item>
          ))
        )}
      </FilterList.List>
    </>
  );
}

AuthorsFilterItems.Skeleton = function AuthorsFilterItemsSkeleton() {
  return (
    <FilterList.List>
      {[...new Array(5)].map((_, index) => (
        <FilterList.Item key={index}>
          <Skeleton width="100%" height="30px" />
        </FilterList.Item>
      ))}
    </FilterList.List>
  );
};
