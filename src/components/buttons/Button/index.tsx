import { type FC, type ReactNode } from "react";
import styles from "./styles.module.css";

interface IButton {
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  children: ReactNode;
}

const Button: FC<IButton> = ({ onClick, type = "button", children }) => {
  return (
    <button className={styles.button} onClick={onClick} type={type}>
      {children}
    </button>
  );
};

export default Button;
