import { SelectedChapterIndex } from '@/context/SelectedChapterIndex';
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useContext } from 'react'
import { toast } from 'sonner';

interface ChapterContentProps {
  courseInfo: {
    courses?: any;
    enrollCourse?: any;
  };
  refreshData: () => void;
}

interface TopicType {
  content? : any,
  topic? : any,
}

const ChapterContent = ({courseInfo, refreshData } : ChapterContentProps) => {
  const courseId = useParams();
  const course = courseInfo?.courses;
  const enrollCourse = courseInfo?.enrollCourse
  const courseContent = course?.courseContent;
  const {selectedChapterIndex, setSelectedChapterIndex} = useContext(SelectedChapterIndex); 
  const topics = courseContent?.[selectedChapterIndex]?.topics

  const markChapterCompleted = async()=>{
    const completedChapter = enrollCourse?.completedChapter ?? [];

      completedChapter.push(selectedChapterIndex);
      const result = await axios.put('/api/enroll-course', {
          courseId: courseId,
          completedChapters : completedChapter
      })
      console.log(result)
      refreshData();
      toast.success('Chapter Marked as Completed!')
    }

  return (
    <div className='p-10 mt-20'>
      <div className='flex justify-between items-center'>
        <h2 className='font-bold text-2xl'>{selectedChapterIndex + 1}. {courseContent?.[selectedChapterIndex]?.chapterName}</h2>
        {/* <Button onClick={markChapterCompleted} className='bg-purple-600 hover:bg-purple-400 hover:cursor-pointer'><CheckCircle/>Mark as Completed</Button> */}
      </div>
      <div className='mt-7'>
          {topics && topics.map((topic : TopicType, index : number)=>{
            return <div key={index} className='mt-10 p-5 bg-secondary rounded-2xl'>
              <h2 className='font-bold text-2xl text-purple-500 mb-2'>{topic?.topic}</h2>
              {/* <p>{topic?.content}</p> */}
              <div dangerouslySetInnerHTML={{__html: topic?.content}} style={{
                lineHeight: '2.0'
              }}></div>
            </div>
          })}
      </div>
    </div>
  )
}

export default ChapterContent