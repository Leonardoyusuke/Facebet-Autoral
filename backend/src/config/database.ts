import { PrismaClient } from '@prisma/client';

let prisma = new PrismaClient();
export default prisma;


export async function connectDb() {
  prisma = new PrismaClient();
} 
export async function disconnectDB(): Promise<void> {
    await prisma?.$disconnect();
  }

  