import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest) {
    const {name, email} = await req.json();

    // if user already exists
    const users = await db.select().from(usersTable).where(eq(usersTable.email, email));


    // if not then insert new user
    if(users?.length == 0) {
        const result = await db.insert(usersTable).values({
            name : name,
            email : email
        }).returning();
        console.log(result)
        return NextResponse.json({result});
    }
    return NextResponse.json(users[0]);
}