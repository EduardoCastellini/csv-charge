import { PrismaClient } from '@prisma/client';

export class SqliteConnection extends PrismaClient {
  private static prisma: PrismaClient | null = null;

  static async connect(): Promise<void> {
    if (!this.prisma) {
      this.prisma = new PrismaClient();
    }
    return await this.prisma.$connect();
  }

  static async disconnect(): Promise<void> {
    return await this.prisma?.$disconnect();
  }

  static getConnection(): PrismaClient {
    if (!this.prisma) {
      throw new Error('Connection not established');
    }

    return this.prisma;
  }
}
