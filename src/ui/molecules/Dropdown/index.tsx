import { PropsWithChildren, useCallback, useRef, useState } from "react";

import Button from "../../atoms/Button";
import styles from "./styles.module.css";
import Card from "../Card";
import useClickOutside from "../../../utils/useClickOutside";

type Props = {
  label: string;
};

export default function Dropdown({
  label,
  children,
}: PropsWithChildren<Props>) {
  const ref = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleClickOutside = useCallback(() => {
    if (isOpen) {
      setIsOpen(false);
    }
  }, [isOpen]);

  useClickOutside(ref, handleClickOutside);
  return (
    <div className={`${styles.container} ${isOpen ? styles.open : ""}`}>
      <Button ref={ref} onClick={toggleDropdown} variant="ghost">
        {label}
      </Button>
      <Card.Container className={styles.dropdownMenu}>
        <Card.Content>
          <ul className={styles.dropdownList} role="listbox">
            {children}
          </ul>
        </Card.Content>
      </Card.Container>
    </div>
  );
}

Dropdown.DropdownItem = function DropdownItem({
  children,
  onClick,
}: PropsWithChildren<{
  onClick?: () => void;
}>) {
  return (
    <li className={styles.dropdownItem} role="option" onClick={onClick}>
      {children}
    </li>
  );
};
