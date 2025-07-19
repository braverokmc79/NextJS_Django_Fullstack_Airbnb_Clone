import ContactButton from "@/app/components/ContactButton";
import PropertyList from "@/app/components/properties/PropertyList";
import { getUserId } from "@/app/lib/actions";
import apiService from "@/app/services/apiService";
import Image from "next/image";
import React from "react";

interface LandlordDetailPageProps {
  params: Promise<{ id: string }>;
}

const LandlorDetailPage: React.FC<LandlordDetailPageProps> =async ({params}) => {
 const {id:landlord_id}  = await params;
 const landlord =await apiService.get(`/api/auth/${landlord_id}`); 
 const userId=await getUserId();



  return (
    <main className="max-w-[1500px] mx-auto px-6 pb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 sm:gap-4 items-center    justify-start ">
        <aside className="col-span-1 mb-4 mt-5 sm:mt-0 mx-auto md:mx-0">
          <div className="flex flex-col items-center p-6 rounded-xl border border-gray-300 shadow-xl">
            <Image
             src={landlord.image_url || "/default-host.png"}
              width={200}
              height={200}
              alt="Landlord name"
              className="rounded-full"
            />
            <h1 className="mt-6 text-2xl">{landlord.name}</h1>


            {userId!=landlord_id && <ContactButton />}
            
          </div>
        </aside>

        <div className="col-span-3 pl-0 md:pl-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <PropertyList landlord_id={landlord_id} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default LandlorDetailPage;
