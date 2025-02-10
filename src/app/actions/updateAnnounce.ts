"use server";
import prisma from "@/lib/connectPrisma";
import { revalidatePath } from "next/cache";

export default async function updateCommonAnnounce(formData: FormData) {
    await prisma.adminAnnouncement.update({
        where: {
            id: "67a9d9e0464d7d6136fa3928",
        },
data: {
title: formData.get("title") as string,
description: formData.get("description") as string,
date: new Date(),
}});

revalidatePath('./dashboard/adminDashboard/dAnnounce');
}