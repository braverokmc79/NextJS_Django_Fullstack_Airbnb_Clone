import React from 'react'
import Conversation from '../components/inbox/Conversation';

const InboxPage = () => {
  return (
    <main className='max-w-[1500px] mx-auto px-6 pb-6'>
        <h1 className='mt-6 text-2xl mb-6'>📬메시지함</h1>


        <Conversation />
        <Conversation />
        <Conversation />
    </main>
  )

}

export default InboxPage;
