"use client"
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react"

import AddNewCourseDialog from "./AddNewCourseDialog";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import CourseCard from "./CourseCard";

export default function CourseList(){
    const [courseList, setCourseList] = useState([]);
    const [loading, setLoading] = useState(false);
    const {user} = useUser();
    useEffect(()=>{
        GetCourseList();
    }, [user])
    const GetCourseList = async ()=>{
        setLoading(true);
        const result = await axios.get('/api/courses')

        // console.log(result.data);
        setCourseList(result.data);
        setLoading(false);
    }
    if(loading) {
        return <div>
            Loading the course details
        </div>
    }
  return (
    <div className="mt-10">
        <h2 className="font-bold text-3xl mb-3">Course List</h2>
        {courseList?.length==0? 
        <div className="flex p-7 items-center justify-center flex-col border rounded-xl mt-2 bg-secondary">
            <Image src={'/online-edu.png'} alt="edu" width={80} height={80}/>
            <h2 className="my-2 text-xl font-bold">Looks like you haven&apos;t created any courses yet</h2>
            <AddNewCourseDialog>
                <Button className="cursor-pointer">+ Create your first course</Button>
            </AddNewCourseDialog>
        </div> : <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
            {courseList.map((course : any, index : any)=>{
                return <CourseCard key={index} course={course}/>
            })}
        </div>}
    </div>
  )
}
