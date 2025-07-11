import Image from 'next/image';
import React from 'react'



const MyReservationsPage:React.FC = () => {
  return (
    <main className='max-w-[1500px] mx-auto px-6 pb-6'>
          <h1  className='mt-6 mb-2 text-2xl'>나의 예약</h1>

           <div className='space-y-4'>


                <div className='p-5 mt-4 grid grid-cols-4 gap-4 shadow-md border border-gray-300'>
                        <div className='col-span-1'>
                            <div className='relative overflow-hidden aspect-square rounded-xl'>
                                <Image
                                    fill
                                    src="/beach_1.jpg"
                                    className='hover:scale-110 object-cover transition h-full w-full cursor-pointer'
                                    alt='Beach house'
                                   />
                            </div>
                        </div> 

                       <div className='col-span-3 space-y-2'>
                            <h2 className='mb-4 text-xl'>Property name</h2>
                            <p><strong>체크인 날짜:</strong>2025/07/11</p>                          
                            <p><strong>체크아웃 날짜:</strong>2025/07/11</p>
                            <p><strong>Number of nights:</strong>2025/07/11</p>
                            <p><strong>Total Price:</strong>2000</p>
                       </div> 
                </div>



            
                <div className='p-5 mt-4 grid grid-cols-4 gap-4 shadow-md border border-gray-300'>
                        <div className='col-span-1'>
                            <div className='relative overflow-hidden aspect-square rounded-xl'>
                                <Image
                                    fill
                                    src="/beach_1.jpg"
                                    className='hover:scale-110 object-cover transition h-full w-full cursor-pointer'
                                    alt='Beach house'
                                   />
                            </div>
                        </div> 


                       <div className='col-span-1 md:col-span-3'>
                            <h2 className='mb-4 text-xl'>숙소 이름</h2>

                            <p  className="mb-2"><strong>체크인 날짜:</strong>2025/07/11</p>                          
                            <p  className="mb-2"><strong>체크아웃 날짜:</strong>2025/07/11</p>
                            
                            <p  className="mb-2"><strong>숙박 일수:</strong>2025/07/11</p>
                            <p><strong>총 금액:</strong>2000</p>

                            <div className='mt-6 inline-block cursor-pointer py-4 px-6 bg-airbnb text-white rounded-xl hover:bg-airbnb-dark transition'>
                              숙소 페이지로 이동
                            </div>
                       </div> 
                </div>


           </div>



    </main>
  )
}

export default MyReservationsPage;
