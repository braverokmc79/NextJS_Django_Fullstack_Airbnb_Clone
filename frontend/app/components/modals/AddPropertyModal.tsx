'use client';

import React, { useState } from 'react';
import Modal from './Modal';
import useAddPropertyModal from '@/app/hooks/useAddPropertyModal';
import CustomButton from '../forms/CustomButton';
import Categories from '../addproperty/Categories';
import SelectCountry, { SelectCountryValue } from '../forms/SelectCountry';
import Image from 'next/image';
import apiService from '@/app/services/apiService';
import { useRouter } from 'next/navigation';


const AddPropertyModal: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<string[]>([]);


  const [dataCategory, setDataCategory] = useState('');
  const [dataTitle, setDataTitle] = useState('');  
  const [dataDescription, setDataDescription] = useState('');

  const [dataPrice, setDataPrice] = useState('');
  const [dataBedrooms, setDataBedrooms] = useState('');
  const [dataBathrooms, setDataBathrooms] = useState('');
  const [dataGuests, setDataGuests] = useState('');
  const [dataCountry, setDataCountry] = useState<SelectCountryValue>();
  const [dataImage, setDataImage] = useState<File | null>(null);


  const addPropertyModal = useAddPropertyModal();
  const router = useRouter();

  // 카테고리 설정 함수
  const setCategory = (category: string) => {
    setDataCategory(category);
  };

  //이미지 설정
  const setImage =(event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
       const tmpImage = event.target.files[0];
      
        setDataImage(tmpImage);
    }
  }


  const submitForm = async () => {
    console.log("submitForm");
    if(!dataCategory||!dataTitle||!dataDescription||!dataPrice||!dataCountry||!dataImage){
        return
    } 

    const formData = new FormData();
    formData.append('category', dataCategory);
    formData.append('title', dataTitle);
    formData.append('description', dataDescription);
    formData.append('price_per_night', dataPrice);
    formData.append('bedrooms', dataBedrooms);
    formData.append('bathrooms', dataBathrooms);
    formData.append('guests', dataGuests);
    formData.append('country', dataCountry.label);
    formData.append('country_code', dataCountry.value);
    formData.append('image', dataImage);

    const response = await apiService.fileUpload('/api/properties/create/', formData);

    if (response.success) {
        console.log('SUCCESS :-D');

        router.push('/?added=true');
        router.refresh(); 
        addPropertyModal.close();
    } else {
        console.log('Error');

        const tmpErrors: string[] = Object.values(response).map((error: any) => {
            return error;
        })

        setErrors(tmpErrors)
    }
  }

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
      ) : 
      

       (
                <>
                <form onSubmit={
                  (e) =>{
                    console.log('submitForm111');
                    e.preventDefault();
                  
                    submitForm();
                  } 
                }>
                    <h2 className='mb-6 text-2xl'>이미지</h2>

                    <div className='pt-3 pb-6 space-y-4'>
                        <div className='py-4 px-6 bg-gray-600 text-white rounded-xl'>
                            <input
                                type="file"
                                accept='image/*'
                                onChange={setImage}
                                required
                            />
                        </div>

                        {dataImage && (
                            <div className='w-[200px] h-[150px] relative'>
                                <Image                                  
                                    fill
                                    alt="Uploaded image"
                                    src={URL.createObjectURL(dataImage)}
                                    className='w-full h-full object-cover rounded-xl'
                                />
                            </div>
                        )}
                    </div>

                    {errors.map((error, index) => {
                        return (
                            <div
                                key={index}
                                className='p-5 mb-4 bg-airbnb text-white rounded-xl opacity-80'
                            >
                                {error}
                            </div>
                        )
                    })}

                    <CustomButton
                        label='이전'
                        className='mb-2 !bg-black hover:!bg-gray-800'
                        onClick={() => setCurrentStep(4)}
                    />

                    <CustomButton
                        label='숙박등록하기'
                        type='submit'
                    />
                  </form>
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
