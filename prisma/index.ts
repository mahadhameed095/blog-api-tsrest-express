import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient()

export { UserSchema, PostSchema } from './generated/zod';