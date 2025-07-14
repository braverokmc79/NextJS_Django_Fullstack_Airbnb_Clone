"use client";
import React, { useEffect, useState } from "react";
import PropertyListItem from "./PropertyListItem";

export type PropertyType = {
  id: string;
  title: string;
  price_per_night: number;
  country: string;
  image_url: string;
};

const PropertyList = () => {
  const [properties, setProperties] = useState<PropertyType[]>([]);

  const getProperties = async () => {
    const url = "http://localhost:8000/api/properties/";
    const response = await fetch(url);
    const responseData = await response.json();

    if (!response.ok) {
      setProperties([]);
      return;
    }
    console.log("        =====>" ,responseData.data);
    setProperties(responseData.data);
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
