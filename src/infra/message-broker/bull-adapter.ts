import Bull from 'bull';
import { join } from 'path';
import { IMessageBrokerSendMessage, SendMessageProps } from '@/app/contracts';

export class MessageBroker implements IMessageBrokerSendMessage {
  private queue: Bull.Queue;

  constructor() {
    console.log('constructor MessageBroker');
    this.queue = new Bull('charge_queue', {
      redis: {
        host: 'localhost',
        port: 6379
      }
    });

    const pathProcessor = join(__dirname, 'job.processor.ts');

    this.queue.process(pathProcessor);
  }

  send(props: SendMessageProps): void {
    console.log('sending message to queue');
    this.queue.add(props);
  }
}
