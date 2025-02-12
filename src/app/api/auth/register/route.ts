import { connectToDatabase } from "@/lib/connectDB";
import prisma from "@/lib/globalPrisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (req: Request) =>{
    try {
          const { 
      firstName,
      lastName,
      gender,
      grade,
      schoolName,
      phoneNumber,
      email,
      parentEmail,
      password,
      userRole
    } = await req.json();
        if(!firstName || !lastName || !gender || !grade || !schoolName || !phoneNumber || !parentEmail || !userRole || !email || !password)
            return NextResponse.json({ message: "Invalid Data" }, { status: 422 });
        if (!password) {
  return NextResponse.json({ message: "Password is required" }, { status: 422 });
}
const hashedPassword = await bcrypt.hash(password, 10);
        await  connectToDatabase();
        const user = await prisma.user.create({
            data: {
                firstName,
                lastName,
                gender,
                grade,
                schoolName,
                phoneNumber,
                email,
                parentEmail,
                userRole,
                hashedPassword,
            }
        });
        return NextResponse.json({user},{status:201});
    } catch (error) {
        console.log(error);;
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    } finally{
        await prisma.$disconnect();
    }
};