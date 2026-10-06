import { type FC, useState } from "react";
import styles from "../styles.module.css";
import stylesLocal from "./styles.module.css";

interface IPasswordInput {
  value?: string;
  name?: string;
  placeholder?: string;
  defaultValue?: string;
}

const PasswordInput: FC<IPasswordInput> = ({
  value,
  name,
  placeholder,
  defaultValue,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const onClick = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className={stylesLocal.inputBlock}>
      <div className={`${stylesLocal.inputIconBlock}`} onClick={onClick}>
        <div
          className={`${stylesLocal.inputIcon} ${isVisible ? stylesLocal.isVisible : ""}`}
        >
          Ο
        </div>
      </div>
      <input
        className={`${styles.input} ${stylesLocal.input}`}
        name={name}
        type={isVisible ? "text" : "password"}
        value={value}
        placeholder={placeholder}
        defaultValue={defaultValue}
      />
    </div>
  );
};

export default PasswordInput;
