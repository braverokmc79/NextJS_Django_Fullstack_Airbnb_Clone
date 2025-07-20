import Image from 'next/image';
import React from 'react'
import apiService from '../services/apiService';
import Link from 'next/link';



const MyReservationsPage:React.FC =async () => {
  
  const reservations =await apiService.get(`/api/auth/myreservations/`);

  console.log("reservations", reservations);

  return (
    <main className='max-w-[1500px] mx-auto px-6 pb-6'>
          <h1  className='mt-6 mb-2 text-2xl'>나의 예약내역</h1>

           <div className='space-y-4'>
              {reservations && reservations.map((reservation:any) => {
                  return (
                      <div 
                        key={reservation.id}
                        className='p-5 mt-4 grid grid-cols-4 gap-4 shadow-md border border-gray-300'>
                              <div className='col-span-1'>
                                  <div className='relative overflow-hidden aspect-square rounded-xl'>
                                      <Image
                                          fill
                                          src={reservation.property.image_url}
                                          className='hover:scale-110 object-cover transition h-full w-full cursor-pointer'
                                          alt='Beach house'
                                        />
                                  </div>
                              </div> 

                            <div className='col-span-3 space-y-2'>
                                  <h2 className='mb-4 text-xl'>숙소명: {reservation.property.title}</h2>
                                  <p><strong>체크인 날짜:</strong>{reservation.start_date}</p>                          
                                  <p><strong>체크아웃 날짜:</strong>{reservation.end_date}</p>
                                  <p><strong>숙박 일수:</strong>{reservation.number_of_nights}</p>
                                  <p><strong>총 금액:</strong>{reservation.total_price.toLocaleString()}</p>

                                 <Link
                                 href={`/properties/${reservation.property.id}`}
                                 className='mt-6 inline-block cursor-pointer py-4 px-6 bg-airbnb text-white rounded-xl hover:bg-airbnb-dark transition'>
                                  숙소 페이지로 이동
                                </Link>
                            </div> 
                      </div>
                  )
              })} 
              {/* 'id','start_date','end_date','number_of_nights','total_price','property', */}






           </div>



    </main>
  )
}

export default MyReservationsPage;
