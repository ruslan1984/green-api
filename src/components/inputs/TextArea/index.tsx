import { type Ref, forwardRef } from "react";
import styles from "../styles.module.css";

interface ITextInput {
  name?: string;
  placeholder?: string;
  className?: string;
  loading?: boolean;
}

const TextArea = forwardRef<HTMLTextAreaElement, ITextInput>(
  ({ name, placeholder, loading = false, className = "" }, ref) => {
    return (
      <textarea
        disabled={loading}
        ref={ref as Ref<HTMLTextAreaElement>}
        className={`${styles.input} ${className}`}
        name={name}
        placeholder={placeholder}
      />
    );
  },
);

export default TextArea;
