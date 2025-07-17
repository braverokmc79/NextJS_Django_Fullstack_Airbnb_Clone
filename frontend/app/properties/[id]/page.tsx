import ReservationSidebar from '@/app/components/properties/ReservationSidebar';
import apiService from '@/app/services/apiService';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

interface PropertyDetailPageProps {
  params: Promise<{ id: string }>
}

const PropertyDetailPage:React.FC<PropertyDetailPageProps> = async({params}) => {
  const {id} = await params;  
  const property = await apiService.get(`/api/properties/${id}`);

 

  return (
    <main className="max-w-[1500px] mx-auto px-6 pb-6">
            <div className="w-full h-[64vh] mb-4 overflow-hidden rounded-xl relative">
                <Image
                    fill
                    src={property.image_url}
                    className="object-cover w-full h-full"
                    alt="Beach house"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="py-6 pr-6 col-span-3">
                    <h1 className="mb-4 text-4xl">{property.title}</h1>

                    <span className="mb-6 block text-lg text-gray-600">
                       게스트 {property.guests}명 · 침실 {property.bedrooms}개 · 욕실 {property.bathrooms}개
                    </span>

                    <hr />

                    <Link 
                        href={`/landlords/${property.landlord.id}`}
                        className="py-6 flex items-center space-x-4"
                    >
                        {property.landlord.avatar_url && (
                            <Image
                                src={property.landlord.avatar_url}
                                width={50}
                                height={50}
                                className="rounded-full"
                                alt="The user name"
                            />
                        )}

                        <p><strong>{property.landlord.name}</strong> is your host</p>
                    </Link>

                    <hr />

                    <p className="mt-6 text-lg">
                        {property.description}
                    </p>
                </div>

                <ReservationSidebar 
                   
                />
            </div>
        </main>
  )
}

export default PropertyDetailPage;
