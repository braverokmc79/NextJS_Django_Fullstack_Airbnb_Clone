"use client";
import { useState } from 'react';
import Modal from './Modal';
import useSearchModal, { SearchQuery } from '@/app/hooks/useSearchModal';
import SelectCountry, { SelectCountryValue } from '../forms/SelectCountry';
import { Range } from 'react-date-range';
import DatePicker from "../forms/Calendar"; 
import CustomButton from '../forms/CustomButton';
import React, { JSX } from 'react';

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
};

const SearchModal = () => {    
    let content = (<></>);
    const searchModal = useSearchModal();
    const [numGuests, setNumGuests] = useState<string>("1");
    const [numBedrooms, setNumBedrooms] = useState<string>("0");
    const [numBathrooms, setNumBathrooms] = useState<string>("0");
    const [country, setCountry] = useState<SelectCountryValue>();
    const [dateRange, setDateRange] = useState<Range>(initialDateRange);
     
    

    const closeAndSearch = () => {
        if (!country) {
            alert("위치를 선택하세요");
            return;
        }

        const newSearchQuery: SearchQuery = {
            country: country.label,
            checkIn: dateRange.startDate,
            checkOut: dateRange.endDate,
            guests: parseInt(numGuests),
            bedrooms: parseInt(numBedrooms),
            bathrooms: parseInt(numBathrooms),
            category: searchModal.query.category
        };

        console.log("! newSearchQuery", newSearchQuery);
        searchModal.setQuery(newSearchQuery);
        searchModal.close();
    };

    const _setDateRange = (selection: Range) => {
        if (searchModal.step === 'checkin') {
            searchModal.open('checkout');
        } else if (searchModal.step === 'checkout') {
            searchModal.open('details');
        }
        setDateRange(selection);
    };

    const contentLocation = (
        <form onSubmit={(e) => { e.preventDefault(); searchModal.open('checkin'); }}>
            <h2 className="mb-6 text-2xl">어디로 가고 싶습니까?</h2>
            <SelectCountry
                value={country}
                onChange={(value) => setCountry(value)}
            />
            <div className='mt-6 flex flex-row gap-4'>
                <CustomButton label="검색" type='submit' className="w-full" />
            </div>
        </form>
    );

     const contentCheckin = (
       <>
                <h2 className="mb-6 text-2xl">언제 체크인하시겠습니까?</h2>
                <DatePicker
                    value={dateRange}
                    onChange={(value) => _setDateRange(value.selection)}
                />
                <div className='mt-6 flex flex-row gap-4'>
                    <CustomButton
                        label="<- 위치"
                        type='button'
                        onClick={() => searchModal.open('location')}
                    />
                    <CustomButton
                        label="체크아웃 날짜 ->"
                        type='button'
                    />
                </div>
          </>
    );

    const contentCheckout = (
        <>
            <h2 className="mb-6 text-2xl">언제 체크아웃하시겠습니까?</h2>
            <DatePicker
                value={dateRange}
                onChange={(value) => _setDateRange(value.selection)}
            />
            <div className='mt-6 flex flex-row gap-4'>
                <CustomButton
                    label="<- 체크인 날짜"
                    onClick={() => searchModal.open('checkin')}
                />
                <CustomButton
                    label="상세 조건 ->"
                    onClick={() => searchModal.open('details')}
                />
            </div>
        </>
    );


    const contentDetails = (
        <>
         <form onSubmit={closeAndSearch}>
            <h2 className="mb-6 text-2xl">상세 조건</h2>
            <div className="space-y-4">
                <div className="space-y-2">
                    <label>게스트 수:</label>
                    <input
                        type="number"
                        min="1"
                        required
                        value={numGuests}
                        placeholder="게스트 수를 입력하세요"
                        onChange={(e) => setNumGuests(e.target.value)}
                        className="w-full h-14 px-4 border border-gray-300 rounded-xl"
                    />
                </div>
                <div className="space-y-2">
                    <label>침실 수:</label>
                    <input
                        type="number"
                        min="1"
                        required
                        value={numBedrooms}
                        placeholder="침실 수를 입력하세요"
                        onChange={(e) => setNumBedrooms(e.target.value)}
                        className="w-full h-14 px-4 border border-gray-300 rounded-xl"
                    />
                </div>
                <div className="space-y-2">
                    <label>욕실 수:</label>
                    <input
                        type="number"
                        min="1"
                        required
                        value={numBathrooms}
                        placeholder="욕실 수를 입력하세요"
                        onChange={(e) => setNumBathrooms(e.target.value)}
                        className="w-full h-14 px-4 border border-gray-300 rounded-xl"
                    />
                </div>
            </div>
            <div className="mt-6 flex flex-row gap-4">
                <CustomButton
                    label="<- 체크아웃 날짜"
                    onClick={() => searchModal.open('checkout')}
                />
                <CustomButton
                    label="검색하기"
                    type='submit'                  
                />
            </div>
           </form> 
        </>
    );



      if (searchModal.step == 'location') {
        content = contentLocation;
    } else if (searchModal.step == 'checkin') {
        content = contentCheckin;
    } else if (searchModal.step == 'checkout') {
        content = contentCheckout;
    } else if (searchModal.step == 'details') {
        content = contentDetails;
    }

    return (
        <Modal
            label="검색"
            content={content}
            close={searchModal.close}
            isOpen={searchModal.isOpen}
        />
    );
};

export default SearchModal;
