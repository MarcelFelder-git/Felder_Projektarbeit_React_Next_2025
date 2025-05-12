// https://www.prisma.io/docs/guides/nextjs#25-set-up-prisma-client
import { PrismaClient } from './generated/prisma';

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
