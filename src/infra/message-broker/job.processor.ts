import { Message } from '@/app/contracts';
import { DoneCallback, Job } from 'bull';

export default async function ({ data }: Job<Message>, done: DoneCallback) {
  try {
    console.log('Process');
    console.log('data: ', data);

    done();
  } catch (error: any) {
    console.log(error);

    done(error);
  }
}
