import { PropsWithChildren } from "react";
import styles from "./styles.module.css";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "link";
}

export default function Button({
  children,
  variant = "primary",
  ...props
}: PropsWithChildren<Props>) {
  return (
    <button className={[styles.button, styles[variant]].join(" ")} {...props}>
      {children}
    </button>
  );
}
