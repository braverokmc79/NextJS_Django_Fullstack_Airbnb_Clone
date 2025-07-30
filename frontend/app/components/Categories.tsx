"use client";

import React, { useState } from 'react';
import { HomeModernIcon, SunIcon, BuildingLibraryIcon, CubeIcon, HomeIcon } from '@heroicons/react/24/outline';
import useSearchModal, { SearchQuery } from '../hooks/useSearchModal';

const Categories: React.FC = () => {
  
  const searchModal = useSearchModal();
  const [category, setCategory] = useState('');

  const _setCategory =(_category:string) =>{
    setCategory(_category);
    
      const query: SearchQuery = {
            country: searchModal.query.country,
            checkIn: searchModal.query.checkIn,
            checkOut: searchModal.query.checkOut,
            guests: searchModal.query.guests,
            bedrooms: searchModal.query.bedrooms,
            bathrooms: searchModal.query.bathrooms,
            category: _category
      }
      searchModal.setQuery(query);
  }


  
  return (

  <div className="pt-3 cursor-pointer pb-6 flex items-center space-x-12">
      
      <div
        onClick={() => _setCategory('')}
        className={`pb-4 flex flex-col items-center space-y-2 border-b-2 
        ${category == '' ? 'border-black' : 'border-white'} opacity-60 hover:border-gray-200 hover:opacity-100`}>
        <HomeModernIcon className="w-5 h-5" />
        <span className="text-xs">전체</span>
      </div>

      <div 
        onClick={() => _setCategory('beach')}
        className={`pb-4 flex flex-col items-center space-y-2 border-b-2 
        ${category == 'beach' ? 'border-black' : 'border-white'} opacity-60 hover:border-gray-200 hover:opacity-100`}>
        <SunIcon className="w-5 h-5" />
        <span className="text-xs">해변</span>
      </div>

       <div
        onClick={() => _setCategory('villas')}
        className={`pb-4 flex flex-col items-center space-y-2 border-b-2 
        ${category == 'villas' ? 'border-black' : 'border-white'} opacity-60 hover:border-gray-200 hover:opacity-100`}>

        <HomeIcon className="w-5 h-5" />
        <span className="text-xs">빌라</span>
      </div>


      <div 
        onClick={() => _setCategory('cabins')}
        className={`pb-4 flex flex-col items-center space-y-2 border-b-2 
        ${category == 'cabins' ? 'border-black' : 'border-white'} opacity-60 hover:border-gray-200 hover:opacity-100`}>
        <BuildingLibraryIcon className="w-5 h-5" />
        <span className="text-xs">통나무집</span>
      </div>


      <div 
        onClick={() => _setCategory('tiny_homes')} 
        className={`pb-4 flex flex-col items-center space-y-2 border-b-2 
        ${category == 'tiny_homes' ? 'border-black' : 'border-white'} opacity-60 hover:border-gray-200 hover:opacity-100`}>            
        <CubeIcon className="w-5 h-5" />
        <span className="text-xs">작은 집</span>
      </div>
    </div>
  );
};

export default Categories;
