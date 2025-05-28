"use client"
import axios from 'axios';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import CourseInfo from '../_components/CourseInfo';
import ChapterTopicList from '../_components/ChapterTopicList';

const EditCourse = ({viewCourse=false} : any) => {
    const {courseId} = useParams();
    const [course, setCourse] = useState();
    useEffect(()=>{
        GetCourseInfo();
    }, [])

    const GetCourseInfo = async()=>{
        const result = await axios.get('/api/courses?courseId=' + courseId);
        console.log(result.data);
        setCourse(result.data);
    }

  return (
    <div>
        <CourseInfo course= {course} viewCourse={viewCourse} />
        <ChapterTopicList course={course}/>
    </div>
  )
}

export default EditCourse