"use client"
import React, { useContext } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { SelectedChapterIndex } from '@/context/SelectedChapterIndex';

const ChapterListSidebar = ({courseInfo} : any) => {
  const course = courseInfo?.courses;
  const courseContent = course?.courseContent;
  const { setSelectedChapterIndex} = useContext(SelectedChapterIndex);
  return (
    <div className='w-80 p-5 bg-secondary h-screen'>
      <h2 className='my-3 font-bold text-xl'>Chapters ({courseContent?.length})</h2>
      <Accordion type="single" collapsible>
        {courseContent?.map((chapter : any, index : any) => {
            return <AccordionItem onClick={()=>{
              setSelectedChapterIndex(index);
            }}
             value={chapter?.chapterName} key={index}>
              <AccordionTrigger className='hover:cursor-pointer text-lg font-md'>{index + 1}. {chapter?.chapterName}</AccordionTrigger>
            <AccordionContent asChild>
                <div className=''>
                    {chapter?.topics?.map((topic : any, index: any)=>{
                        return <h2 className='p-3 bg-white my-1 rounded-lg' key={index}>{topic?.topic}</h2>
                    })}
                </div>
            </AccordionContent>
            </AccordionItem>
        })}
      </Accordion>

    </div>
  )
}

export default ChapterListSidebar