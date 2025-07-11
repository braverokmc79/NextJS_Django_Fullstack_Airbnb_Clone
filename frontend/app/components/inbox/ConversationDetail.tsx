"use client";
import React from 'react'
import CustomButton from '../forms/CustomButton';

const ConversationDetail:React.FC = () => {


  const sendMessage = () => {}

  return (
    <>
    <div className='max-h-[400vh] overflow-auto flex flex-col space-y-4'>        
        <div className='w-[80%] py-4 px-6 rounded-xl bg-gray-200'>
             <p className='font-bold text-gray-500'>홍길동</p>

             <p>tesfseffsfsdf dsf</p>   
        </div>


        <div className='w-[80%] ml-[20%] py-4 px-6 rounded-xl bg-blue-200'>
             <p className='font-bold text-gray-500'>이순신</p>

             <p>tesfseffsfㅇㅇㅇsdf dsf</p>   
        </div>



        <div className='mt-4 py-4 px-6 flex border border-gray-300 space-x-4 rounded-xl'>
                <input 
                    type="text"
                    placeholder='메시지를 입력해 주세요..'
                    className='w-full p-2 bg-gray-200 rounded-xl'
                />
               <CustomButton
                    label='전송'
                    onClick={sendMessage}
                    className="w-[100px]"
               />

        </div>

    </div>
    </>
  )
}



export default ConversationDetail;
