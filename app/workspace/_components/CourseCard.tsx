import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Book, LoaderCircle, PlayCircle, Settings } from 'lucide-react';
import Image from 'next/image'
import Link from 'next/link';
import React, { useState } from 'react'
import { toast } from 'sonner';

const CourseCard = ({course} : any) => {
    const courseJson = course?.courseJson?.course;
    const [loading, setLoading] = useState(false);
    const onEnrollCourse = async ()=>{
        try{
            setLoading(true);
            const result = await axios.post('/api/enroll-course', {
                courseId : course?.cid
            });
            setLoading(false);
            console.log(result.data)
            if(result.data.response) {
                toast.warning('Already Enrolled');
                return;
            }
            toast.success('Enrolled!')
        } catch(e) {
            toast.error('Server side error')
            setLoading(false);
            console.log(e);
        }
    }
  return (
    <div className='shadow rounded-xl'>
        <Image src={course?.bannerImageUrl} alt={course?.name}
        width={400} height={300}
        className='w-full rounded-t-xl object-cover aspect-video'/>
        <div className='p-3 flex flex-col gap-3'>
            <h2 className='font-bold text-lg'>{courseJson?.name}</h2>
            <p className='line-clamp-3 text-gray-400 text-sm'>{courseJson?.description}</p>
            <div className='flex justify-between items-center'>
                <h2 className='flex items-center gap-2 text-sm'><Book className='text-primary h-5 w-5' />{courseJson?.noOfChapters} Chapters</h2>
                {course?.courseContent?.length ? 
                <Button onClick={onEnrollCourse} disabled={loading}
                    className='bg-purple-700 hover:cursor-pointer hover:bg-purple-600 ' size={'sm'}>
                 {loading? <LoaderCircle className='animate-spin' /> :   <PlayCircle /> } Enroll Course
                </Button>:
                <Link href={'/workspace/edit-course/' + course?.cid}>
                    <Button size={'sm'} variant={'outline'} className='bg-purple-600 hover:cursor-pointer hover:bg-purple-600'><Settings /> Generate Course </Button>
                </Link> }
            </div>
        </div>
    </div>
  )
}

export default CourseCard