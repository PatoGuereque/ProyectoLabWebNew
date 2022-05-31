import { PrismaClient } from '@prisma/client';
import { isProd } from '../config';

if (!isProd && !global.prisma) {
  global.prisma = new PrismaClient();
}

// const prisma = isProd ? global.prisma : new PrismaClient();
const prisma = new PrismaClient();

export default prisma;
