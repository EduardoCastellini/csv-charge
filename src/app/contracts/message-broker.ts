export type SendMessageProps = {
  data: Message;
};

export type Message = {
  name: string;
  governmentId: number;
  email: string;
  debtAmount: number;
  debtDueDate: string;
};

export interface IMessageBrokerSendMessage {
  send(props: SendMessageProps): void;
}
