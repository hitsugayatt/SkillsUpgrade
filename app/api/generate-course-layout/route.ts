import { NextRequest, NextResponse } from "next/server";
import {
  GoogleGenAI,
} from '@google/genai';
import { db } from "@/config/db";
import { coursesTable } from "@/config/schema";
import { auth, currentUser } from "@clerk/nextjs/server";
import axios from "axios";
import { eq } from "drizzle-orm";
const PROMPT = `Generate Learning Course depends on following details. In which Make sure to add Course Name, Description, Course Banner Image Prompt(Create a modern, flat-style 2D digital illustration representing user Topic. Include UI/UX elements such as mockup screens, text blocks, icons, buttons, and creative workspace tools. Add symbolic elements related to user Course, like sticky notes, design components, and visual aids. Use a vibrant color palette (blues, purples, oranges) with a clean, professional look. The illustration should feel creative, tech-savvy, and educational, ideal for visualizing concepts in user Course) for Course Banner in 3d format Chapter Name, , Topic under each chapters , Duration for each chapters etc, in JSON format only
Schema:
{
  "course": {
    "name": "string",
    "description": "string",
    "category": "string",
    "level": "string",
    "includeVideo": "boolean",
    "noOfChapters": "number",
    "bannerImagePrompt": "string",
    "chapters": [
      {
        "chapterName": "string",
        "duration": "string",
        "topics": [
          "string"
        ]
      }
    ]
  }
}
, User Input:
`
const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(req : NextRequest) {
    const {courseId, ...formData} = await req.json();
    const user = await currentUser();
    const { has } = await auth()
    const hasPremiumAccess = has({ plan: 'starter' })
    async function main() {
    const config = {
        responseMimeType: 'text/plain',
    };
    const model = 'gemini-2.5-flash-preview-05-20';
    const contents = [
        {
        role: 'user',
        parts: [
            {
            text: PROMPT+JSON.stringify(formData),
            },
        ],
        },
    ];

    // If user already created any course?

    if(!hasPremiumAccess) {
      const result = await db.select().from(coursesTable)
      .where(eq(coursesTable.userEmail, user?.primaryEmailAddress?.emailAddress ?? ''))
      if(result.length >= 1) {
        return NextResponse.json({'resp' : 'limit exceed'})
      }
    }

    const response = await ai.models.generateContent({
        model,
        config,
        contents,
    });
    const contentText = response?.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!contentText) {
        return NextResponse.json({ error: "Failed to generate course content." }, { status: 500 });
    }
    
    const contentJson = contentText.replace('```json', '').replace('```', '');
    const JSONResp = JSON.parse(contentJson);
    console.log(JSONResp);
    const ImagePrompt = JSONResp.course.bannerImagePrompt;
    // Generate Image

    const bannerImageUrl = await generateImage(ImagePrompt);

    // Save the info to database 
    
    const email = user?.primaryEmailAddress?.emailAddress;
    if (!email) {
      return NextResponse.json({ error: "User email not found" }, { status: 400 });
    }

    await db.insert(coursesTable).values({
    name: JSONResp.course.name,
    description: JSONResp.course.description,
    noOfChapters: JSONResp.course.noOfChapters,
    includeVideo: JSONResp.course.includeVideo,
    level: JSONResp.course.level,
    category: JSONResp.course.category,
    courseJson: JSONResp, // Store full object
    userEmail: email,
    cid: courseId,
    bannerImageUrl : bannerImageUrl
});


     return NextResponse.json({courseId : courseId});
    }
    return main();
}


const generateImage = async(ImagePrompt : string)=>{
    const BASE_URL='https://aigurulab.tech';
    const result = await axios.post(BASE_URL+'/api/generate-image',
            {
                width: 1024,
                height: 1024,
                input: ImagePrompt,
                model: 'flux',//'flux'
                aspectRatio:"16:9"//Applicable to Flux model only
            },
            {
                headers: {
                    'x-api-key': process.env.AI_GURU_LAB_API_KEY, // Your API Key
                    'Content-Type': 'application/json', // Content Type
                },
            })
  console.log(result.data.image) //Output Result: Base 64 Image

  return result.data.image;
}