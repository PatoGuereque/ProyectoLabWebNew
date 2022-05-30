import { PrismaClient } from '@prisma/client';
import { isProd } from '../config';

let prisma;

if (isProd) {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
