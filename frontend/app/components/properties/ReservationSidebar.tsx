"use client";
import React from 'react';
import { useState, useEffect } from 'react';
import { differenceInDays, eachDayOfInterval, format} from 'date-fns';
import apiService from '@/app/services/apiService';
import useLoginModal from '@/app/hooks/useLoginModal';

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection',
};


export type Property={
  id:string;
  title:string;
  guests: number;
  price_per_night:number;
  image_url:string;
}

interface ReservationSidebarProps {
  userId :string | null,
  property: Property
}

const ReservationSidebar: React.FC<ReservationSidebarProps> = ({userId,property}) => {

  const loginModal =useLoginModal();

  const [fee, setFee]=useState<number>(0);  
  const [nights, setNights]=useState<number>(0);
  const [totalPrice, setTotalPrice]=useState<number>(0);
  const [dateRange, setDateRange] = useState(initialDateRange);
  const [minDate, setMinDate] = useState<Date>(new Date());
  const [guests, setGuests] = useState<string>('1');
  const guestsRange = Array.from({ length: property.guests }, (_, index) => index + 1)



    useEffect(() => {
     
        if (dateRange.startDate && dateRange.endDate) {
            const dayCount = differenceInDays(
                dateRange.endDate,
                dateRange.startDate
            );

            if (dayCount && property.price_per_night) {
                const _fee = ((dayCount * property.price_per_night) / 100) * 5;

                setFee(_fee);
                setTotalPrice((dayCount * property.price_per_night) + _fee);
                setNights(dayCount);
            } else {
                const _fee = (property.price_per_night / 100) * 5;

                setFee(_fee);
                setTotalPrice(property.price_per_night + _fee);
                setNights(1);
            }
        }
    }, [dateRange])



  return (
    <aside className="mt-6 p-6 col-span-2 rounded-xl border border-gray-300 shadow-xl">
      <h2 className="mb-5 text-2xl"> {property.price_per_night.toLocaleString()}  / 1박 요금</h2>

      <div className="mb-6 p-3 border border-gray-400 rounded-xl">
        <label className="mb-2 block font-bold text-xs">인원</label>
        <select 
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          className="w-full -ml-1 text-sm">
              {guestsRange.map((guest) => (
                <option key={guest} value={guest}>{guest}</option>
              ))}
        </select>
      </div>

      <div className="w-full mb-6 py-6 text-center text-white bg-airbnb hover:bg-airbnb-dark rounded-xl cursor-pointer">
        예약하기
      </div>


      <div className="mb-4 flex justify-between items-center">
        <p>{(property.price_per_night).toLocaleString()}원 *  {nights}박</p>
        <p>{(property.price_per_night * nights).toLocaleString()} 원</p>
      </div>

      <div className="mb-4 flex justify-between items-center">
        <p>서비스 수수료</p>
        <p>{fee.toLocaleString()}원</p>
      </div>

      <hr />

      <div className="mt-4 flex justify-between items-center font-bold">
        <p>총 합계</p>
        <p>{totalPrice.toLocaleString()}원</p>
      </div>
    </aside>
  );
};

export default ReservationSidebar;
