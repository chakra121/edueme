import prisma from "./globalPrisma";

export const connectToDatabase = async () => {

  try {
        await prisma.$connect();
  } catch (error) {
    console.log(error);
    throw new Error("Unable to connect to Database");
  }
};