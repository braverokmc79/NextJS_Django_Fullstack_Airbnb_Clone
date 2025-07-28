'use client';
import useSearchModal from '@/app/hooks/useSearchModal';

const SearchFilters = () => {
    const searchModal = useSearchModal();

    return (
        <div 
            onClick={() => searchModal.open('location')}
            className="h-[48px] lg:h-[64] flex flex-row items-center justify-between border border-gray-300 rounded-full">
                
            <div className="hidden lg:block">
                <div className="flex flex-row items-center justify-between">
                    <div className="cursor-pointer w-[250px] h-[48px] lg:h-[64] px-8 flex flex-col justify-center rounded-full hover:bg-gray-100">
                        <p className="text-xs font-semibold">여행지</p>
                        <p className="text-sm">어디로 떠나시나요?</p>
                    </div>

                    <div className="cursor-pointer h-[48px] lg:h-[64] px-8 flex flex-col justify-center rounded-full hover:bg-gray-100">
                        <p className="text-xs font-semibold">체크인</p>
                        <p className="text-sm">날짜 추가</p>
                    </div>
                    
                    <div className="cursor-pointer h-[48px] lg:h-[64] px-8 flex flex-col justify-center rounded-full hover:bg-gray-100">
                        <p className="text-xs font-semibold">체크아웃</p>
                        <p className="text-sm">날짜 추가</p>
                    </div>

                    <div className="cursor-pointer h-[48px] lg:h-[64] px-8 flex flex-col justify-center rounded-full hover:bg-gray-100">
                        <p className="text-xs font-semibold">인원</p>
                        <p className="text-sm">게스트 추가</p>
                    </div>
                </div>
            </div>

            <div className="p-2">
                <div className="cursor-pointer p-2 lg:p-4 bg-airbnb hover:bg-airbnb-dark transition rounded-full text-white">
                <svg
                    viewBox="0 0 32 32"
                    className="block h-4 w-4 stroke-current stroke-[4] overflow-visible fill-none"
                    aria-hidden="true"
                    role="presentation"
                    focusable="false"
                >
                    <path
                    fill="none"
                    d="M13 24a11 11 0 1 0 0-22 11 11 0 0 0 0 22zm8-3 9 9"
                    />
                </svg>
                </div>

            </div>
        </div>
    )
}

export default SearchFilters;
