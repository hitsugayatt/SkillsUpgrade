import { db } from "@/config/db";
import { coursesTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { desc, eq, ne, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req : NextRequest) {
    const {searchParams} = new URL(req.url);
    const courseId = searchParams.get('courseId') || '';
    const user = await currentUser();
    if(courseId == '0') {
      const result = await db.select().from(coursesTable).where(sql `${coursesTable.courseContent}::jsonb != '{}'::jsonb`);
      console.log(result);
      return NextResponse.json(result);
    }
    const email = user?.primaryEmailAddress?.emailAddress;
    if(!email) {
      return NextResponse.json({ error: "User email not found" }, { status: 400 });
    }
    if(courseId) {
    const result = await db.select().from(coursesTable).where(eq(coursesTable.cid, courseId));

    console.log(result);

    return NextResponse.json(result[0]);
    }
    else {
        const result = await db.select().from(coursesTable).where(eq(coursesTable.userEmail, email))
        .orderBy(desc(coursesTable.id));

        console.log(result);

        return NextResponse.json(result);
    }
}