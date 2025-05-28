import { UserProfile } from '@clerk/nextjs'
import React from 'react'

type Props = {}

const Profile = (props: Props) => {
  return (
    <div>
        <h2 className='font-bold text-3xl mb-10'>Manage your profile</h2>
        <UserProfile />
    </div>
  )
}

export default Profile