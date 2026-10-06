import { type SubmitEvent, type FC, useRef, memo } from "react";
import styles from "./styles.module.css";
import { TextArea, SendButton } from "@/components";
import { useMutation } from "@/hooks";
import type { TMessage } from "../types";
import { observer } from "mobx-react";
import { useStores } from "@/store/StoreContext";

interface ISendMessage {
  addMessage: (message: TMessage) => void;
}

const SendMessage: FC<ISendMessage> = observer(({ addMessage }) => {
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const { authStore } = useStores();
  const phoneNumber = authStore.phoneNumber;
  const { idInstance, apiTokenInstance } = authStore.getTokens();

  const isAuth = authStore.authorized();

  const url = `/waInstance${idInstance}/sendMessage/${apiTokenInstance}`;

  const [sendMessage, { loading }] = useMutation(url, "POST");

  const onSendMessageSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const message = formData.get("message") as string;

    const payload = {
      chatId: `${phoneNumber}@c.us`,
      message,
      typingTime: "1000",
    };

    await sendMessage(payload);

    const newMessage: TMessage = {
      text: message,
      type: "outgoing",
      date: new Date().toLocaleTimeString("ru-RU", { timeStyle: "short" }),
    };
    addMessage(newMessage);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };
  return (
    <section>
      <form className={styles.form} onSubmit={onSendMessageSubmit}>
        <TextArea
          loading={loading}
          className={styles.textArea}
          name="message"
          placeholder="сообщение"
          ref={inputRef}
        />
        {isAuth ? <SendButton className={styles.sendButton} /> : null}
      </form>
    </section>
  );
});

export default memo(SendMessage);
