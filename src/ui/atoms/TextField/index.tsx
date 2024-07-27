import styles from "./styles.module.css";

export interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
}

export default function TextField({
  startAdornment,
  endAdornment,
  ...props
}: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        {startAdornment}
        <input className={styles.input} {...props} />
        {endAdornment}
      </div>
    </div>
  );
}
