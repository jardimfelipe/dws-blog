import { PropsWithChildren } from "react";

import styles from "./styles.module.css";
import Card from "../Card";
import FilterIcon from "../../atoms/Icons/FilterIcon";

function Container({ children }: PropsWithChildren) {
  return (
    <Card.Container>
      <Card.Content>
        <div className={styles.container}>
          <FilterIcon />
          <Card.Title>Filters</Card.Title>
        </div>
        {children}
      </Card.Content>
    </Card.Container>
  );
}

function List({ children }: PropsWithChildren) {
  return <ul className={styles.list}>{children}</ul>;
}

function Item({ children }: PropsWithChildren) {
  return <li className={styles.item}>{children}</li>;
}

const FilterList = {
  Container,
  List,
  Item,
};

export default FilterList;
