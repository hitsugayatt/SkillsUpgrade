"use client"
import AppHeader from '@/app/workspace/_components/AppHeader'
import React, { useEffect, useState } from 'react'
import ChapterListSidebar from '../_components/ChapterListSidebar'
import ChapterContent from '../_components/ChapterContent'
import { useParams } from 'next/navigation'
import axios from 'axios'

const Course = () => {
  const {courseId} = useParams();
  const [enrolledCourseList, setEnrolledCourseList] = useState([]);
    useEffect(()=>{
        GetEnrolledCourseById();
    }, [])

    const GetEnrolledCourseById = async ()=>{
        const result = await axios.get('/api/enroll-course?courseId=' + courseId);
        console.log(result.data)
        setEnrolledCourseList(result.data);
    }
  return (
    <div>
        <AppHeader hideSidebar={true}/>
        <div className='flex gap-10'>
            <ChapterListSidebar courseInfo={enrolledCourseList} />
            <ChapterContent courseInfo={enrolledCourseList} refreshData={()=>GetEnrolledCourseById()}/>
        </div>
    </div>
  )
}

export default Course