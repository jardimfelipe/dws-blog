import { useCallback, useContext, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import { CategoryContext } from "../../context";
import FilterList from "../../../../ui/molecules/FilterList";
import { Category } from "../../types";
import Skeleton from "../../../../ui/atoms/Skeleton";

export default function CategoriesFilterItems() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data = [], isLoading } = useContext(CategoryContext);
  const categories = useMemo(
    () => searchParams.getAll("categories") || [],
    [searchParams]
  );

  const handleClick = useCallback(
    (categoryId: Category["id"]) => {
      const newParams = new URLSearchParams(searchParams);
      if (categories.includes(categoryId)) {
        newParams.delete("categories");
        categories
          .filter((id) => id !== categoryId)
          .forEach((id) => newParams.append("categories", id));
      } else {
        newParams.append("categories", categoryId);
      }

      setSearchParams(newParams);
    },
    [categories, searchParams, setSearchParams]
  );
  return (
    <>
      <FilterList.SubHeader>Categories</FilterList.SubHeader>
      <FilterList.List>
        {isLoading ? (
          <CategoriesFilterItems.Skeleton />
        ) : (
          data.map((category) => (
            <FilterList.Item
              role="link"
              key={category.id}
              active={categories.includes(category.id)}
              onClick={() => handleClick(category.id)}
            >
              {category.name}
            </FilterList.Item>
          ))
        )}
      </FilterList.List>
    </>
  );
}

CategoriesFilterItems.Skeleton = function CategoriesFilterItemsSkeleton() {
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
