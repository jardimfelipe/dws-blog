import { PropsWithChildren, forwardRef } from "react";
import styles from "./styles.module.css";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "link";
}

const Button = forwardRef<HTMLButtonElement, PropsWithChildren<Props>>(
  function Button({ children, variant = "primary", ...props }, ref) {
    return (
      <button
        ref={ref}
        className={[styles.button, styles[variant]].join(" ")}
        {...props}
      >
        {children}
      </button>
    );
  }
);

export default Button;
