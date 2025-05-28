import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import {  PlayCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
 
const EnrollCourseCard = ({course, enrollCourse} : any) => {
  const courseJson = course?.courseJson?.course;
  const CalculateProgress = ()=>{
    return (enrollCourse?.completedChapters?.length ??0/course.courseContent.length)*100; 
  }
  return (
    <div className='shadow rounded-xl'>
        <Image src={course?.bannerImageUrl} alt={course?.name}
        width={400} height={300}
        className='w-full rounded-t-xl object-cover aspect-video'/>
        <div className='p-3 flex flex-col gap-3'>
            <h2 className='font-bold text-lg'>{courseJson?.name}</h2>
            <p className='line-clamp-3 text-gray-400 text-sm'>{courseJson?.description}</p>
            <div className=''>
                <h2 className='flex justify-between text-sm text-primary'>Progress <span>{CalculateProgress()}%</span></h2>
                <Progress
                  value={CalculateProgress()}
                  className="mt-2 bg-purple-100 [&>div]:bg-purple-700"
                >
                </Progress>
                <Link href={'/workspace/view-course/' + course?.cid}>
                <Button className='w-full mt-3 bg-purple-700 hover:bg-purple-500 hover:cursor-pointer'> <PlayCircle/> Continue Learning </Button>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default EnrollCourseCard