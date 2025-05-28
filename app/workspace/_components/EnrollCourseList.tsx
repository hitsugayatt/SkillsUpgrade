'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import EnrollCourseCard from './EnrollCourseCard';

type Props = {}

export default function EnrollCourseList (props: Props){

    const [enrolledCourseList, setEnrolledCourseList] = useState([]);
    useEffect(()=>{
        GetEnrolledCourse();
    }, [])

    const GetEnrolledCourse = async ()=>{
        const result = await axios.get('/api/enroll-course')
        console.log(result.data)
        setEnrolledCourseList(result.data);
    }
  return enrolledCourseList?.length > 0 && (
    <div className='mt-3'>
        <h2 className='font-bold text-2xl'>Continue Learning</h2>
        <div className='grid grid-col2-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5'>
        {enrolledCourseList.map((course : any, index : any)=>{
            return <EnrollCourseCard course={course?.courses} enrollCourse ={course?.enrollCourse} key={index} />
        })}
        </div>
    </div>
  )
}