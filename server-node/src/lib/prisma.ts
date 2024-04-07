import { PrismaClient } from "@prisma/client";

// pega um log
export const prisma = new PrismaClient({
    log: ["query"],
  });