"use client";
import React, { useEffect, useState } from "react";
import PropertyListItem from "./PropertyListItem";
import apiService from "@/app/services/apiService";

export type PropertyType = {
  id: string;
  title: string;
  price_per_night: number;
  country: string;
  image_url: string;
};

interface PropertyListProps {  
   landlord_id?: string | null;
}


const PropertyList:React.FC<PropertyListProps> = ({landlord_id}) => {
  const [properties, setProperties] = useState<PropertyType[]>([]);

  const getProperties = async () => {
    let url ='/api/properties/';

    if(landlord_id){
      //landlord_id 값이 존재하면은
      url += `?landlord_id=${landlord_id}`;
    }

    const tmpProperties = await apiService.get(url);

    setProperties(tmpProperties.data);
  };


  useEffect(() => {
    getProperties();
  }, []);  



  return (
    <>  
      {Array.isArray(properties) &&
        properties.map((property) => (
          <PropertyListItem key={property.id} property={property} />
      ))}

    
    </>
  );
};

export default PropertyList;
