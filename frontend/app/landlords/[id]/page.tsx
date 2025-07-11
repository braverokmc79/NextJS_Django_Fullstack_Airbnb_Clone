
import ContactButton from '@/app/components/ContactButton';
import PropertyList from '@/app/components/properties/PropertyList';
import Image from 'next/image';
import React from 'react'

const LandlorDetailPage:React.FC = () => {


  return (
    <main className='max-w-[1500px] mx-auto px-6 pb-6'>
            <div className='grid gird-cols-1 md:grid-cols-4 gap-4'>
                    <aside  className='col-span-1 mb-4'>
                        <div className='flex flex-col items-center p-6 rounded-xl border border-gray-300 
                                shadow-xl  col-span-1 mb-4'>
                            <Image
                                src="/profile_pic_1.jpg"
                                width={200}
                                height={200}
                                alt="Landlord name"
                                className='rounded-full'                                
                            />

                            <h1 className='mt-6 text-2xl'>Landlord</h1>

                            <ContactButton />
                        </div>
                    </aside>

                    <div className='col-span-3 pl-0 md:pl-6'>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <PropertyList />        
                        </div>
                    </div>

            </div>
    </main>        
  )
}

export default LandlorDetailPage;
