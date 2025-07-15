import React from 'react'

interface CustomButtonProps {
    label: string;
    className?: string;
    onClick?: () => void ;
    type?: "submit" | "reset" | "button";
    disabled?: boolean
}

const CustomButton:React.FC<CustomButtonProps> = ({label,className ,onClick, type="button", disabled=false, ...props}) => {
  return (
    <button
        type={type}
        onClick={onClick}
        className={`w-full py-4 bg-airbnb hover:bg-airbnb-dark text-white text-center rounded-xl transition cursor-pointer 
        ${className}`
        }
        disabled={disabled}
        {...props}
        >      
      {label}
    </button>
  )
}

export default CustomButton
