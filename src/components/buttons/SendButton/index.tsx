import { type FC } from "react";
import styles from "./styles.module.css";

interface ISendButton {
  className?: string;
  onClick?: () => void;
}

const SendButton: FC<ISendButton> = ({ className = "", onClick }) => {
  return (
    <button
      className={`${styles.button} ${className}`}
      type="submit"
      onClick={onClick}
    >
      ↵
    </button>
  );
};

export default SendButton;
