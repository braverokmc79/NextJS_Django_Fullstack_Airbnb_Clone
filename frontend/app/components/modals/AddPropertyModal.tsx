'use client';

import React, { useState } from 'react';
import Modal from './Modal';
import useAddPropertyModal from '@/app/hooks/useAddPropertyModal';
import CustomButton from '../forms/CustomButton';
import Categories from '../addproperty/Categories';
import SelectCountry, { SelectCountryValue } from '../forms/SelectCountry';


const AddPropertyModal: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [dataCategory, setDataCategory] = useState('');
  const [dataTitle, setDataTitle] = useState('');  
  const [dataDescription, setDataDescription] = useState('');

  const [dataPrice, setDataPrice] = useState('');
  const [dataBedrooms, setDataBedrooms] = useState('');
  const [dataBathrooms, setDataBathrooms] = useState('');
  const [dataGuests, setDataGuests] = useState('');

  const [dataCountry, setDataCountry] = useState<SelectCountryValue>();

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
         <h2 className="mb-6 text-2xl">카테고리를 선택하세요! </h2>     

          <Categories
            dataCategory={dataCategory}
            setCategory={(category) => setCategory(category)}
          />


          <CustomButton
            label="다음"
            disabled={dataCategory === ''}
            onClick={() => setCurrentStep(2)}
          />
        </>
      ) : currentStep === 2 ?(
        <>
        <form onSubmit={(e) => {
            e.preventDefault();
            setCurrentStep(3)
        }}>
            <h2 className="mb-6 text-2xl">장소를 선택하세요!</h2>    
          
          <div className='pt-3 pb-6 space-y-4'>
              <div className='flex flex-col space-y-2'>
                  <label>제목</label>
                  <input 
                    type="text"
                    value={dataTitle}
                    required
                    onChange={(e) => setDataTitle(e.target.value)}
                    className='w-full p-2 bg-gray-200 rounded-xl'
                  />
              </div>

              <div className='flex flex-col space-y-2'>
                  <label>내용</label>
                  <textarea                  
                    value={dataDescription}
                    required
                    onChange={(e) => setDataDescription(e.target.value)}
                    className='w-full h-[200px]  p-4  border border-gray-600  bg-gray-200 rounded-xl'
                  />
              </div>
          </div>

            <CustomButton   
                label="이전"
                className="mb-2 !bg-black hover:!bg-gray-800"
                onClick={() => setCurrentStep(1)}
              /> 

            <CustomButton
                label="다음"
                type='submit'              
              />  
            </form>  
          </>
        ) : currentStep === 3 ?(
          <>

<form onSubmit={(e) => {
  e.preventDefault();
  setCurrentStep(4);
}}>
  <h2 className="mb-6 text-2xl">숙소 상세 정보</h2>

  <div className="pt-3 pb-6 space-y-4">
    <div className="flex flex-col space-y-2">
      <label>1박 요금 (₩)</label>
      <input
        type="number"
        required
        value={dataPrice}
        onChange={(e) => setDataPrice(e.target.value)}
        className="w-full p-4 border border-gray-600 rounded-xl"
      />
    </div>

    <div className="flex flex-col space-y-2">
      <label>침실 수</label>
      <input
        type="number"
        required
        max={5}
        value={dataBedrooms}
        onChange={(e) => setDataBedrooms(e.target.value)}
        className="w-full p-4 border border-gray-600 rounded-xl"
      />
    </div>

    <div className="flex flex-col space-y-2">
      <label>욕실 수</label>
      <input
        type="number"
        required
        value={dataBathrooms}
        max={3}
        onChange={(e) => setDataBathrooms(e.target.value)}
        className="w-full p-4 border border-gray-600 rounded-xl"
      />
    </div>

    <div className="flex flex-col space-y-2">
      <label>최대 수용 인원</label>
      <input
        type="number"
        required
        max={10}
        value={dataGuests}
        onChange={(e) => setDataGuests(e.target.value)}
        className="w-full p-4 border border-gray-600 rounded-xl"
      />
    </div>
  </div>

        <CustomButton
          label="다음"
          type="submit"
        />            
</form>        


        </> 
      ) : currentStep === 4 ?
       (
        <>
              <h2 className='mb-6 text-2xl'>위치</h2>

              <div className='pt-3 pb-6 space-y-4'>
                  <SelectCountry 
                      value={dataCountry}
                      onChange={(value) => setDataCountry(value as SelectCountryValue)}
                  />
              </div>

              <CustomButton
                  label='이전'
                  className="mb-2 !bg-black hover:!bg-gray-800"
                  onClick={() => setCurrentStep(3)}
              />

              <CustomButton
                  label='다음'
                  onClick={() => setCurrentStep(5)}
              />
        </>
      ) : null}

      
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
