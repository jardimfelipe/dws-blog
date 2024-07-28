import AuthorsFilterItems from "../../../modules/authors/components/AuthorsFilterItems";
import { AuthorsContextProvider } from "../../../modules/authors/context";
import CategoriesFilterItems from "../../../modules/categories/components/CategoriesFilterItems";
import { CategoriesContextProvider } from "../../../modules/categories/context";
import FilterList from "../../molecules/FilterList";
import styles from "./styles.module.css";

export default function BlogFilter() {
  return (
    <div className={styles.wrapper}>
      <FilterList.Container>
        <div className={styles.container}>
          <div>
            <CategoriesContextProvider>
              <CategoriesFilterItems />
            </CategoriesContextProvider>
          </div>
          <div>
            <AuthorsContextProvider>
              <AuthorsFilterItems />
            </AuthorsContextProvider>
          </div>
        </div>
      </FilterList.Container>
    </div>
  );
}
