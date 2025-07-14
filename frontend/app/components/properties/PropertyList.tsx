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

const PropertyList = () => {
  const [properties, setProperties] = useState<PropertyType[]>([]);

  useEffect(() => {
    const properties = apiService.get("/api/properties/");
    properties.then((response) => {
      setProperties(response.data);
    });

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
