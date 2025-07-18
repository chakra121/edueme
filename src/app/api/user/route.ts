import prisma from "@/lib/globalPrisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async () =>{
    try {
        await prisma.$connect();
        const users = await prisma.user.findMany();
        return NextResponse.json({users},{status:200});
    } catch {
        return NextResponse.json({error:"Server Error"},{status:500});
    }finally{
        await prisma.$disconnect();
    }
}