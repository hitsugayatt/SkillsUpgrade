import { NextRequest, NextResponse } from "next/server";
import { db } from "@/config/db";
import { coursesTable } from "@/config/schema";
import { eq } from "drizzle-orm";
import { GoogleGenAI } from "@google/genai";
const PROMPT = `Based on the given chapter name and topics, generate ONLY valid JSON containing HTML content for each topic. 
No explanations, no code fences. Respond ONLY with JSON like the following:
{
  "chapterName": "Chapter Title",
  "topics": [
    {
      "topic": "Topic Title",
      "content": "<p>Some HTML content</p>"
    }
  ]
}
User Input:
`;

const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
});

type Chapter = {
  chapterName: string;
  topics: { topic: string }[];
};

type GeneratedContent = {
  chapterName: string;
  topics: { topic: string; content: string }[];
};

export async function POST(req : NextRequest) {
    const {courseJson, courseTitle, courseId} = await req.json();
    const promises = courseJson?.chapters?.map(async(chapter: Chapter): Promise<GeneratedContent>=>{
        const config = {
        responseMimeType: 'text/plain',
    };
  const model = 'gemini-2.5-flash-preview-05-20';
  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: PROMPT + JSON.stringify(chapter),
        },
      ],
    },
  ];

  const response = await ai.models.generateContent({
    model,
    config,
    contents,
  });
  const contentText = response?.candidates?.[0]?.content?.parts?.[0]?.text; 
    if (!contentText) {
        throw new Error("Failed to generate course content.");
    }
      
    const contentJson = contentText.replace('```json', '').replace('```', '');
    const JSONResp = JSON.parse(contentJson);


    // get youtube video

    

    return JSONResp;
 })

 const CourseContent = await Promise.all(promises);
  await db.update(coursesTable).set({
  courseContent: CourseContent
 }).where(eq(coursesTable.cid, courseId))



 return NextResponse.json({
    courseName : courseTitle,
    CourseContent : CourseContent
 });
}