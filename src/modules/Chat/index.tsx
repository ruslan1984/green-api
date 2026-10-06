import { useEffect, useState, useRef } from "react";
import { observer } from "mobx-react";
import { useStores } from "@/store/StoreContext";
import styles from "./styles.module.css";
import { useMutation } from "@/hooks";
import SendMessage from "./SendMessage";
import MessageList from "./MessageList";
import type { TMessage, TBody } from "./types";
import LogoutButton from "../LogoutButton";

const Chat = observer(() => {
  const { authStore } = useStores();
  const { getPhoneNumber, authorized, logout } = authStore;
  const phoneNumber = getPhoneNumber();
  const isAuth = authorized();
  const { idInstance, apiTokenInstance } = authStore.getTokens();
  const int = useRef<number>(undefined);
  const [messages, setMessages] = useState<TMessage[]>([]);
  const [error, setError] = useState("");
  const addMessage = (newMessage: TMessage) => {
    setMessages((prev) => [...prev, newMessage]);
  };

  const url = `/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`;
  const [getMessages, { data, error: messageError }] = useMutation<{
    receiptId: number;
    body: TBody;
  }>(url, "GET");
  const [deleteNotification] = useMutation();

  useEffect(() => {
    if (messageError) {
      logout();
      setError(messageError);
      stopListening();
    }
  }, [messageError]);

  const startListening = () => {
    if (int.current) {
      clearInterval(int.current);
    }
    int.current = setInterval(async () => {
      await getMessages();
    }, 3000);

    return () => {
      if (int.current) {
        clearInterval(int.current);
      }
    };
  };

  const stopListening = () => {
    if (int.current) {
      clearInterval(int.current);
    }
  };

  const onLogin = () => {
    setError("");
    startListening();
  };

  const onLogout = () => {
    stopListening();
  };

  useEffect(() => {
    startListening();
  }, []);

  useEffect(() => {
    stopListening();
    logout();
  }, [phoneNumber, idInstance, apiTokenInstance]);

  useEffect(() => {
    if (data) {
      const { receiptId, body } = data;

      if (
        body.senderData?.senderPhoneNumber &&
        String(body.senderData?.senderPhoneNumber) === String(phoneNumber) &&
        body.typeWebhook === "incomingMessageReceived" &&
        body.messageData?.typeMessage === "textMessage"
      ) {
        const newMessage: TMessage = {
          text: body.messageData?.textMessageData?.textMessage || "",
          type: "incoming",
          date: new Date().toLocaleTimeString("ru-RU", {
            timeStyle: "short",
          }),
        };
        setMessages((prev) => [...prev, newMessage]);
      }
      if (receiptId) {
        const deleteUrl = `/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`;
        deleteNotification(null, deleteUrl, "DELETE");
      }
    }
  }, [data]);

  return (
    <div className={styles.chat}>
      <LogoutButton onLogout={onLogout} onLogin={onLogin} />
      {error ? (
        <div className={styles.error}>
          <div>
            Произошла ошибка, проверьте данные авторизации, телефон и попробуйте
            зайти заново
          </div>
          <div>Текст ошибки: </div>
          <p>{error}</p>
        </div>
      ) : null}
      {isAuth ? (
        <div className={styles.chatBlock}>
          <div className={styles.container}>
            <MessageList messages={messages} />
            <SendMessage addMessage={addMessage} />
          </div>
        </div>
      ) : null}
    </div>
  );
});

export default Chat;
