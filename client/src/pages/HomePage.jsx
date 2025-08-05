import React, { useState } from 'react'
import Sidebar from '../assets/components/Sidebar'
import ChatContainer from '../assets/components/ChatContainer'
import RightSidebar from '../assets/components/RightSidebar'

const HomePage = () => {
    const [SelectedUser, setSelectedUser] = useState(false);
  return (
    <div className='border w-full  h-screen sm:px-[15%] sm:py-[5%]'>
        <div className={`backdrop-blur-xl border-2 border-gray-600 rounded-2xl overflow-hidden h-[100%] grid grid-cols-1 relative ${SelectedUser ? 'md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]' :'grid-cols-2'}`}>
           <Sidebar selectedUser={SelectedUser} setselectedUser={setSelectedUser}/>
           <ChatContainer selectedUser={SelectedUser} setselectedUser={setSelectedUser}/>
           <RightSidebar selectedUser={SelectedUser} setselectedUser={setSelectedUser} />

        </div>
    </div>
  )
}

export default HomePage