'use client';

import React, { useState } from 'react';
import Modal from './Modal';
import useAddPropertyModal from '@/app/hooks/useAddPropertyModal';
import CustomButton from '../forms/CustomButton';
import Categories from '../addproperty/Categories';


const AddPropertyModal: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [dataCategory, setDataCategory] = useState('');

  const addPropertyModal = useAddPropertyModal();

  // 카테고리 설정 함수
  const setCategory = (category: string) => {
    setDataCategory(category);
  };

  // 모달 내용 구성
  const content = (
    <>
      {currentStep === 1 ? (
        <>
         <h2 className="mb-6 text-2xl">카테고리를 선택하세요!</h2>     

          <Categories
            dataCategory={dataCategory}
            setCategory={(category) => setCategory(category)}
          />


          <CustomButton
            label="다음"
            onClick={() => setCurrentStep(2)}
          />
        </>
      ) : currentStep === 2 ?(
        <>
          <h2 className="mb-6 text-2xl">장소를 선택하세요!</h2>    
         <CustomButton   
            label="이전"
            className="mb-2 !bg-black hover:!bg-gray-800"
            onClick={() => setCurrentStep(1)}
          /> 

         <CustomButton
            label="다음"
            onClick={() => setCurrentStep(3)}
          />    
        </>
      ) :(
        <>
        <p>adsafsd</p>

          <CustomButton
            label="다음"
            onClick={() => setCurrentStep(4)}
          />    
        
        </> 
      )
      
      }
    </>
  );

  return (
      <Modal
        isOpen={addPropertyModal.isOpen}
        close={addPropertyModal.close}
        label="숙박 추가"
        content={content}
      />
  );
};

export default AddPropertyModal;
