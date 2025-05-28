"use client"
import { SelectedChapterIndex } from '@/context/SelectedChapterIndex';
import { UserDetailContext } from '@/context/UserDetailContext';
import { useUser } from '@clerk/nextjs';
import axios from 'axios'
import { useEffect, useState } from 'react';
function Provider({children}: Readonly<{children: React.ReactNode;}>) {
   const {user} = useUser();
   const [userDetail, setUserDetail] = useState();
   const [selectedChapterIndex, setSelectedChapterIndex] = useState(0);
   useEffect(()=>{
    if(user) {
        CreateNewUser();
    } 
   }, [user]);
    const CreateNewUser = async ()=>{
    const result = await axios.post('/api/user', {
        name : user?.fullName,
        email: user?.primaryEmailAddress?.emailAddress
    });
    console.log(result.data);
    setUserDetail(result.data);
   } 
   
    return (
        <UserDetailContext.Provider value={{userDetail, setUserDetail}}>
        <SelectedChapterIndex.Provider value={{selectedChapterIndex, setSelectedChapterIndex}}>
        <div>
            {children}
        </div>
        </SelectedChapterIndex.Provider>
        </UserDetailContext.Provider>
    )
}

export default Provider