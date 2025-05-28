'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import { Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import CourseCard from '../_components/CourseCard'

type Props = {}

const Explore = (props: Props) => {
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    if (user) GetCourseList();
  }, [user]);

  const GetCourseList = async () => {
    setLoading(true);
    try {
      const result = await axios.get('/api/courses?courseId=0');
      setCourseList(result.data);
    } catch (err) {
      console.error('Error fetching courses:', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 sm:p-10">
      <h2 className="font-bold text-3xl sm:text-4xl mb-8 text-purple-700">
        🌟 Explore More Courses
      </h2>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-8 max-w-xl">
        <Input
          placeholder="Search for a course..."
          className="w-full sm:w-2/3 border border-gray-300"
        />
        <Button className="w-full sm:w-auto gap-2">
          <Search size={18} />
          Search
        </Button>
      </div>

      {loading ? (
        <div className="text-lg text-gray-500">Loading course details...</div>
      ) : courseList.length === 0 ? (
        <div className="text-lg text-gray-400">No courses available right now.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {courseList.map((course: any, index: number) => (
            <CourseCard key={index} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Explore;
