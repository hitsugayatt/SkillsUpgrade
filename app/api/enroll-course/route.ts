import { db } from "@/config/db";
import { coursesTable, enrollCourseTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { and, desc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest) {
    const {courseId} = await req.json();
    const user = await currentUser();

    if(!user?.primaryEmailAddress?.emailAddress) {
        return NextResponse.json({
            message : 'email doesnt exist'  
        });
    }
    // if course if already enrolled
    const enrollCourses = await db.select().from(enrollCourseTable).where(and(eq(enrollCourseTable.userEmail, user?.primaryEmailAddress?.emailAddress),
    eq(enrollCourseTable.cid, courseId)))

    if(enrollCourses?.length == 0) {
        const result = await db.insert(enrollCourseTable).values({
            userEmail: user?.primaryEmailAddress?.emailAddress,
            cid: courseId
        }).returning();
        return NextResponse.json(result)
    }
    return NextResponse.json({response : 'Already enrolled'})
}

export async function GET(req : NextRequest) {
    const user = await currentUser();

    const {searchParams} = new URL(req.url);
    const courseId = searchParams.get('courseId');

    if(courseId) {
        if(!user?.primaryEmailAddress?.emailAddress) {
        return NextResponse.json({
            message : 'Email wrong'
        })
    }
        const result = await db.select().from(coursesTable).innerJoin(enrollCourseTable, eq(coursesTable.cid, enrollCourseTable.cid)).where(and(eq(enrollCourseTable.userEmail, user?.primaryEmailAddress?.emailAddress),
    eq(enrollCourseTable.cid, courseId))).orderBy(desc(enrollCourseTable.id));
    return NextResponse.json(result[0])
    }
    else {
    if(!user?.primaryEmailAddress?.emailAddress) {
        return NextResponse.json({
            message : 'Email wrong'
        })
    }
   const result = await db.select().from(coursesTable).innerJoin(enrollCourseTable, eq(coursesTable.cid, enrollCourseTable.cid)).where(eq(enrollCourseTable.userEmail, user?.primaryEmailAddress?.emailAddress)).orderBy(desc(enrollCourseTable.id));
    return NextResponse.json(result); 
}
}


export async function PUT(req : NextRequest) {
    const {completedChapters , courseId} = await req.json();
    const user = await currentUser();
    if(!user?.primaryEmailAddress?.emailAddress) {
        return NextResponse.json({message : 'wrong email'})
    }
    const result = await db.update(enrollCourseTable).set({
        completedChapters: completedChapters
    }).where(and(eq(enrollCourseTable.cid, courseId), eq(enrollCourseTable.userEmail, user?.primaryEmailAddress?.emailAddress))).returning()
    console.log(result);
    return NextResponse.json(result);
}