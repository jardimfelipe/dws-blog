import SearchIcon from "../Icons/SearchIcon";
import styles from "./styles.module.css";

export default function SearchButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  return (
    <button aria-label="Search" className={styles.button} {...props}>
      <SearchIcon />
    </button>
  );
}
