import Bull from 'bull';
import { join } from 'path';
import { IMessageBrokerSendMessage, SendMessageProps } from '@/app/contracts';
import { config } from '@/main/config/env';

export class MessageBroker implements IMessageBrokerSendMessage {
  private queue: Bull.Queue | undefined;

  constructor() {
    try {
      this.queue = new Bull('charge_queue', {
        redis: {
          host: config.redis.host,
          port: config.redis.port
        }
      });

      const pathProcessor = join(__dirname, 'charge.processor.ts');

      this.queue.process(pathProcessor);
    } catch (error) {
      console.log('Error init Bull Queue: ', error);
    }
  }

  send(props: SendMessageProps): void {
    if (this.queue) this.queue.add(props);
    console.log('Sending message to queue');
  }
}
