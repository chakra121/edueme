import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
if(prisma) 
    console.log("Prisma connected to MongoDB");
else
    console.log("Prisma failed to connect to MongoDB");

export default prisma;
