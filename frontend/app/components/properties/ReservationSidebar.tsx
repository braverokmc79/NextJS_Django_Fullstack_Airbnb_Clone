"use client";
import React from 'react';
import { useState, useEffect } from 'react';
import { differenceInDays, eachDayOfInterval, format} from 'date-fns';
import apiService from '@/app/services/apiService';
import useLoginModal from '@/app/hooks/useLoginModal';
import DatePicker from '../forms/Calendar';

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
  const [bookedDates, setBookedDates] = useState<Date[]>([]);
  const [guests, setGuests] = useState<string>('1');
  const guestsRange = Array.from({ length: property.guests }, (_, index) => index + 1)

  const performBooking=async()=>{
    console.log("✅ performBooking ", userId);
    if(userId){      

      if(dateRange.startDate&& dateRange.endDate){
         const payload = {
          guests,
          start_date: format(dateRange.startDate, 'yyyy-MM-dd'),
          end_date: format(dateRange.endDate, 'yyyy-MM-dd'),
          number_of_nights: nights,
          total_price: totalPrice,
        };
    
        const response=await apiService.post(`/api/properties/${property.id}/book/`, JSON.stringify(payload));

        if(response.success){
            console.log("Bookin successful");
        }else{
            console.log('Something went wrong ...');
        }
      }      
    }else{
      loginModal.open();
    }
  }



  const _setDateRange = (selection: any) => {
        const newStartDate = new Date(selection.startDate);
        const newEndDate = new Date(selection.endDate);

        if (newEndDate <= newStartDate) {
            newEndDate.setDate(newStartDate.getDate() + 1);
        }

        setDateRange({
            ...dateRange,
            startDate: newStartDate,
            endDate: newEndDate
        })
    }


    const getReservations =async () =>{   
      const reservations =await apiService.get(`/api/properties/${property.id}/reservations/`);
      
      let dates:Date[] =[];

      reservations.forEach((reservation:any) => {
        const range = eachDayOfInterval({
            start: new Date(reservation.start_date),
            end: new Date(reservation.end_date),
        });
        dates = [...dates, ...range];
      });

      console.log('😍dates', dates);
      setBookedDates(dates);
  }



  
    useEffect(() => {
        getReservations();

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

        <DatePicker
              value={dateRange}
              bookedDates={bookedDates}
              onChange={(value) => _setDateRange(value.selection)}
          />


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

      <div 
      onClick={performBooking}
      className="w-full mb-6 py-6 text-center text-white bg-airbnb hover:bg-airbnb-dark rounded-xl cursor-pointer">
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
