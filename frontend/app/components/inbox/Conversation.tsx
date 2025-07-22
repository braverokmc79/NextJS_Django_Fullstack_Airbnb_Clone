"use client";
import React from 'react'
import { useRouter } from 'next/navigation';
import { ConversationType } from '@/app/inbox/page';


interface ConversationProps {
  conversation: ConversationType,
  userId: string
}

const Conversation:React.FC<ConversationProps> = ({conversation, userId}) => {
  
  const router =useRouter();
  const otherUser =conversation.users.find((user) => user.id !== userId);


  return (
    <div className='px-6 py-4 border cursor-pointer border-gray-300  rounded-xl mb-4'>          
       <p className='mb-6 text-xl'>{otherUser?.name}</p>
       <p 
       onClick={() => router.push(`/inbox/${conversation.id}`)}   
       className='text-airbnb-dark'>
        대화 하기
       </p>
    </div>
  )
}

export default Conversation;
