import {
  HomeModernIcon,
  SunIcon,
  BuildingLibraryIcon,
  CubeIcon,
  HomeIcon
} from '@heroicons/react/24/outline';

interface CategoriesProps {
  dataCategory: string;
  setCategory: (category: string) => void;
}

const Categories: React.FC<CategoriesProps> = ({ dataCategory, setCategory }) => {
  const baseStyle =
    "pb-4 flex flex-col items-center space-y-2 border-5 p-4 opacity-60 hover:border-gray-600 hover:opacity-100";

  return (
    <div className="pt-3 pb-6 flex items-center space-x-12 cursor-pointer">
      <div
        onClick={() => setCategory('')}
        className={`${baseStyle} ${dataCategory === '' ? 'border-red-800' : 'border-white'}`}
      >
        <HomeModernIcon className="w-5 h-5" />
        <span className="text-xs">전체</span>
      </div>

      <div
        onClick={() => setCategory('beach')}
        className={`${baseStyle} ${dataCategory === 'beach' ? 'border-red-800' : 'border-white'}`}
      >
        <SunIcon className="w-5 h-5" />
        <span className="text-xs">해변</span>
      </div>


     <div
        onClick={() => setCategory('villas')}
        className={`${baseStyle} ${dataCategory === 'villas' ? 'border-red-800' : 'border-white'}`}
      >
         <HomeIcon className="w-5 h-5" />
        <span className="text-xs">빌라</span>
      </div>

    


      <div
        onClick={() => setCategory('cabins')}
        className={`${baseStyle} ${dataCategory === 'cabins' ? 'border-red-800' : 'border-white'}`}
      >
        <BuildingLibraryIcon className="w-5 h-5" />
        <span className="text-xs">통나무집</span>
      </div>

      <div
        onClick={() => setCategory('tiny_homes')}
        className={`${baseStyle} ${dataCategory === 'tiny_homes' ? 'border-red-800' : 'border-white'}`}
      >
        <CubeIcon className="w-5 h-5" />
        <span className="text-xs">작은 집</span>
      </div>

      
    </div>
  );
};

export default Categories;
