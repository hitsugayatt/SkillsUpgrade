import { SelectedChapterIndex } from '@/context/SelectedChapterIndex';
import React, { useContext } from 'react'



const ChapterContent = ({courseInfo } : any) => {
  const course = courseInfo?.courses;
  const courseContent = course?.courseContent;
  const {selectedChapterIndex} = useContext(SelectedChapterIndex); 
  const topics = courseContent?.[selectedChapterIndex]?.topics
  return (
    <div className='p-10 mt-20'>
      <div className='flex justify-between items-center'>
        <h2 className='font-bold text-2xl'>{selectedChapterIndex + 1}. {courseContent?.[selectedChapterIndex]?.chapterName}</h2>
        {/* <Button onClick={markChapterCompleted} className='bg-purple-600 hover:bg-purple-400 hover:cursor-pointer'><CheckCircle/>Mark as Completed</Button> */}
      </div>
      <div className='mt-7'>
          {topics && topics.map((topic : any, index : number)=>{
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