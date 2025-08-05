import React, { useEffect } from 'react'
import assets, { messagesDummyData } from '../assets'
import { useRef } from 'react'
import { formatMessageTime } from '../../lib/utils'

const ChatContainer = ({ selectedUser, setselectedUser }) => {
  const scrollEnd = useRef()
  useEffect(() => {
    if (scrollEnd.current) {
      scrollEnd.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])
  return selectedUser ? (
    <div className='h-full overflow-scroll relative backdrop-blur-lg'>
      {/* -----------------------header------------------------ */}
      <div className='flex items-center gap-3 py-3 mx-4 border-b border-stone-500'>
        <img src={assets.profile_martin} alt="" className='w-10 rounded-full' />
        <p className='flex-1 text-lg text-white flex items-center gap-2'>
          Martin Johnson
          <span className='w-2 h-2 bg-green-500 rounded-full '></span>
        </p>
        <img onClick={() => setselectedUser(null)} src={assets.arrow_icon} alt="" className='md:hidden max-w-7' />
        <img src={assets.help_icon} alt="" className='max-md:hidden max-w-5' />
      </div>
      {/* -----------------------Chat area------------------------ */}
      <div className='flex flex-col  p-3 pb-6 h-[calc(100%-80px)] overflow-y-scroll'>
        {messagesDummyData.map((message, index) => (
          <div key={index} className={`flex items-end gap-2 justify-end ${message.senderId !== '680f50e4f10f3cd28382ecf9' && 'flex-row-reverse'}`}>
            {message.image ? (
              <img src={message.image} alt="" className='max-w-[230px]  border:border-gray-700 rounded-lg overflow-hidden mb-8' />
            ) : (
              <p className={`p-2 max-w-[200px] md:text-sm font-light rounded-lg mb-8 break all bg-violet-500/30 text-white ${message.senderId === '680f50e4f10f3cd28382ecf9' ? 'rounded-br-none' : 'rounded-bl-none'}`}>{message.text}</p>
            )}
            <div className='text-center text-xs '>
              <img src={message.senderId === '680f50e4f10f3cd28382ecf9' ? assets.avatar_icon : assets.profile_john} alt="" className='w-5 rounded-full' />
              <p className='text-gray-500'>{formatMessageTime(message.createdAt)}</p>
            </div>

          </div>
        ))}
        <div ref={scrollEnd}></div>
        <div>


          {/* --------------bottom space-------------- */}
          <div className='absolute bottom-0 left-0 right-0 flex items-center gap-3'></div>
          <div className='flex-1 flex items-center bg-gray-100/12 px-3 rounded-full'>
            <input type="text" placeholder='send a message'
             className='flex-1 text-sm p-3 border-none rounded-lg outline-none text-white placeholder-gray-400' />
            <input type="file" id='image' accept='image/png, image/jpeg' hidden />
            <label htmlFor="image">
              <img src={assets.gallery_icon} alt="" className="w-5 mr-2 cursor-pointer" />
            </label>
            <img src={assets.send_button} 
          alt="" className="w-7 cursor-pointer" />

          </div>
          
        </div>

      </div>
    </div>


  ) : (
    <div className='flex flex-col items-center justify-center gap-2 text-grey-500 bg-white/10 max-md:hidden'>
      <img src={assets.logo_icon} className='max-w-16' alt="" />
      <p className='text-white text-lg font-medium'>Chat anytime with anyone!</p>
    </div>
  )
}

export default ChatContainer