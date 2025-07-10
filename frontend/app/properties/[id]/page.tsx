import ReservationSidebar from '@/app/components/properties/ReservationSidebar';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const PropertyDetailPage = () => {
  return (
    <main className='max-w-[1500px] mx-auto px-6 pb-6'>
        <div className='w-full h-[64vh] mb-4 overflow-hidden rounded-xl relative'>

            <Image
                fill
                src="/beach_1.jpg"
                className="hover:scale-110 object-cover transition h-full w-full"
                alt="Beach house"
            />

        </div>

        <div className='mt-4 grid grid-cols-1 md:grid-cols-5 gap-4'>
            <div className='py-6 pr-6 col-span-3'>
                <h1 className='mb-4 text-4xl'>Property name</h1>   

                <span className='mb-6 block text-lg text-gray-600'>
                    4 guests - 2 bedrooms - 1 bathrooms
                </span>

                <hr />

              <Link 
                href={"/"}
                className='py-6 flex items-center space-x-4'
              >
                
                  <Image
                    src="/profile_pic_1.jpg"                    
                    width={50}
                    height={50}
                    className='rounded-full'
                    alt="멍멍이"
                  />

                <p><strong>멍멍이</strong> is your host</p>
              </Link>

              <hr />

                <p className='mt-6 text-lg'>
                  dsfsdfsdfsfd
                </p>

            </div>



         <ReservationSidebar 
             
          />

        </div>
    </main>        
  )
}

export default PropertyDetailPage;
