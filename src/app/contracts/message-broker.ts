export type SendMessageProps = {
  data: Message;
};

export type Message = {
  name: string;
  governmentId: string;
  email: string;
  debtAmount: number;
  debtDueDate: Date;
  debtId: string;
};

export interface IMessageBrokerSendMessage {
  send(props: SendMessageProps): void;
}
