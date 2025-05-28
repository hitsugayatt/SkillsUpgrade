import React from 'react'
import WelcomeBanner from '../_components/WelcomeBanner'
import EnrollCourseList from '../_components/EnrollCourseList'

type Props = {}

const MyLearning = (props: Props) => {
  return (
    <div>
        <WelcomeBanner />
        <h2 className='font-bold mt-5 text-2xl'>My Learning</h2>
        <EnrollCourseList />
    </div>
  )
}

export default MyLearning