import csv from 'csv-parser';
import * as fs from 'fs';
import { ReadFileOutput, IReadCsv } from '@/app/contracts';

export class ReadCsv implements IReadCsv {
  private charges: ReadFileOutput[] = [];

  public async read(path: string): Promise<ReadFileOutput[]> {
    try {
      await this.readStream(path);
      return this.charges;
    } catch (error) {
      throw new Error(`Read file Erro`);
    }
  }

  private async readStream(path: string): Promise<void> {
    await new Promise((resolve, reject) => {
      fs.createReadStream(path)
        .pipe(csv())
        .on('data', (data) => this.charges.push(data))
        .on('end', () => {
          resolve(this.charges);
        })
        .on('error', (error) => {
          reject(error);
        });
    });
  }
}
