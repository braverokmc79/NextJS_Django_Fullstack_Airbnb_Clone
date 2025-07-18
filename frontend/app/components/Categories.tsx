import React from 'react';
import { HomeModernIcon, SunIcon, BuildingLibraryIcon, CubeIcon } from '@heroicons/react/24/outline';

const Categories: React.FC = () => {
  return (
    <div className="pt-3 cursor-pointer pb-6 flex items-center space-x-12">
      
      <div className="pb-4 flex flex-col items-center space-y-2 border-b-2 border-white 
          opacity-60 hover:border-gray-200 hover:opacity-100">
        <HomeModernIcon className="w-5 h-5" />
        <span className="text-xs">전체</span>
      </div>

      <div className="pb-4 flex flex-col items-center space-y-2 border-b-2 border-white 
          opacity-60 hover:border-gray-200 hover:opacity-100">
        <SunIcon className="w-5 h-5" />
        <span className="text-xs">해변</span>
      </div>

      <div className="pb-4 flex flex-col items-center space-y-2 border-b-2 border-white 
          opacity-60 hover:border-gray-200 hover:opacity-100">
        <BuildingLibraryIcon className="w-5 h-5" />
        <span className="text-xs">통나무집</span>
      </div>

      <div className="pb-4 flex flex-col items-center space-y-2 border-b-2 border-white 
          opacity-60 hover:border-gray-200 hover:opacity-100">
        <CubeIcon className="w-5 h-5" />
        <span className="text-xs">작은 집</span>
      </div>

    </div>
  );
};

export default Categories;
