import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Book, Clock, Loader2Icon, Play, PlayCircle, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'sonner';

const CourseInfo = ({ course, viewCourse }: any) => {
  const courseLayout = course?.courseJson?.course;
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  if (!courseLayout) {
    return <div>Loading course info...</div>;
  }

  const GenerateCourseContent = async()=>{
    // call api to generate the content of the course
    setLoading(true);
    toast.info('Please wait, this might take a while!')
    try{
    const result = await axios.post('/api/generate-course-content', {
      courseJson: courseLayout,
      courseTitle: course?.name,
      courseId : course?.cid
    })
    console.log(result.data);
    setLoading(false); 
    router.replace('/workspace')
    toast.success('Course have been created successfully!')
  } catch(e) {
      console.log(e);
      setLoading(false);
      toast.error('Server Side error, Try Again!')
  }
  }

  return (
    <div className="flex flex-col lg:flex-row justify-between gap-4 sm:gap-6 p-4 sm:p-6 bg-white rounded-xl sm:rounded-2xl shadow-md">
      {/* Left section */}
      <div className="flex flex-col gap-3 sm:gap-4 flex-1 order-2 lg:order-1">
        <h2 className="font-bold text-xl sm:text-2xl lg:text-3xl text-gray-900 leading-tight">
          {courseLayout.name}
        </h2>
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed line-clamp-2 sm:line-clamp-3">
          {courseLayout.description}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mt-2">
          {/* Duration */}
          <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
            <Clock className="text-blue-600 w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-xs sm:text-sm text-gray-500">Duration</p>
              <p className="font-semibold text-sm sm:text-base text-gray-800">2 Hours</p>
            </div>
          </div>

          {/* Chapters */}
          <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
            <Book className="text-green-600 w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-xs sm:text-sm text-gray-500">Chapters</p>
              <p className="font-semibold text-sm sm:text-base text-gray-800">{courseLayout.noOfChapters}</p>
            </div>
          </div>

          {/* Difficulty */}
          <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 sm:col-span-2 lg:col-span-1">
            <TrendingUp className="text-red-600 w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-xs sm:text-sm text-gray-500">Difficulty Level</p>
              <p className="font-semibold text-sm sm:text-base text-gray-800">{courseLayout.level}</p>
            </div>
          </div>
        </div>
        {!viewCourse ? <Button onClick={GenerateCourseContent} className='bg-purple-600 cursor-pointer hover:bg-purple-400 max-w-sm text-md'>{loading? <Loader2Icon className="animate-spin"/> : 
                  <Play /> }Generate Content</Button> : <Link href={'/course/' + course?.cid}><Button className='bg-purple-600 cursor-pointer hover:bg-purple-400 max-w-sm text-md'><PlayCircle /> Continue Learning </Button></Link>
                }
      </div>

      {/* Right section (image) */}
      <div className="w-full lg:w-[280px] xl:w-[320px] flex justify-center items-center order-1 lg:order-2">
        <div className="w-full max-w-sm lg:max-w-none aspect-[4/3] relative">
          <Image
            src={course.bannerImageUrl}
            alt="Course banner image"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 320px"
            className="rounded-lg sm:rounded-xl lg:rounded-2xl object-cover shadow-lg"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default CourseInfo;