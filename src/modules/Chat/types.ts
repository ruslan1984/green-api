export type TMessage = {
  text: string;
  type: "incoming" | "outgoing";
  date: string;
};

export type TBody = {
  senderData: { senderPhoneNumber: string };
  typeWebhook: string;
  messageData: {
    typeMessage: string;
    textMessageData: { textMessage: string };
  };
};
