import { type FC } from "react";
import styles from "./styles.module.css";
import type { TMessage } from "../types";

interface IMessageList {
  messages?: TMessage[];
}

const MessageList: FC<IMessageList> = ({ messages = [] }) => {
  return (
    <>
      <section className={styles.messageList}>
        {messages.map((message, index) => (
          <div
            className={`${styles.message} ${message.type === "incoming" ? styles.incoming : styles.outgoing}`}
            key={index}
          >
            <div className={styles.text}>{message.text}</div>
            <div className={styles.time}>{message.date}</div>
          </div>
        ))}
      </section>
    </>
  );
};

export default MessageList;
