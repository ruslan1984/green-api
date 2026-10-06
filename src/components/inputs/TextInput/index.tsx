import { type FC } from "react";
import styles from "../styles.module.css";

interface ITextInput {
  value?: string;
  name?: string;
  placeholder?: string;
  defaultValue?: string;
  pattern?: string;
}

const TextInput: FC<ITextInput> = ({
  value,
  name,
  placeholder,
  defaultValue,
  pattern,
}) => {
  return (
    <input
      className={styles.input}
      type="text"
      value={value}
      name={name}
      placeholder={placeholder}
      defaultValue={defaultValue}
      pattern={pattern}
    />
  );
};

export default TextInput;
