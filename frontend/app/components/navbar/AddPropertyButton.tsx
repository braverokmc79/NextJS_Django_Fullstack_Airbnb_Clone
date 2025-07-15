"use client";
import useAddPropertyModal from '@/app/hooks/useAddPropertyModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import React from 'react'


interface AddPropertyButtonProps {
    userId?:string | null;
}

const AddPropertyButton: React.FC<AddPropertyButtonProps>= ({userId}) => {
  const loginModal=useLoginModal();
  const addPropertymodal=useAddPropertyModal();

  const airbnbYourHome: () => void = () => {    
    if(userId){
        addPropertymodal.open();
    }else{
        loginModal.open();
    }    
  }



  return (
    <div 
        onClick={airbnbYourHome}  
        className='p-2 cursor-pointer text-sm font-semibold rounded-full hover:bg-gray-100 transition-colors'      
    >      
         숙소 등록하기
    </div>
  )
}

export default AddPropertyButton;
