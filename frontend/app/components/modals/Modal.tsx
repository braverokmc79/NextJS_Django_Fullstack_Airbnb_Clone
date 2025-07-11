"use client";
import React ,{ useCallback, useEffect, useState } from "react";


interface ModalProps{
    label:string;
    close:() => void;
    content:React.ReactElement;
    isOpen?:boolean
}



const Modal: React.FC<ModalProps> = ({
    label,
    content,
    isOpen
}) => {
  const [showModal, setShowModal] = useState(isOpen);

   useEffect(() => {
      setShowModal(isOpen);
    }, [isOpen]);

  const handleClose =useCallback(() => {    
    setShowModal(false);
    setTimeout(() => {
      
      close();

    }, 300);

  }, []);


  if (!showModal) {
    return null;
  }
  



  return (
    <div className="flex items-center justify-center fixed inset-0 z-50 bg-black/60">
      <div className="relative w-[90%] md:w-[80%] lg:w-[700px] my-6 h-auto mx-auto">
        <div className={`translate duration-600 h-full ${showModal ? "translate-y-0 opacity-100" : "translate-y-full opacity-10"}   `}>
          <div
            className="bg-white border-0 rounded-lg shadow-lg relative flex
                                     flex-col w-full outline-none focus:outline-none"
          >
            <header className="h-[60px] flex items-center p-6 rounded-t justify-center relative border-b">
              
              
              <div 
                onClick={handleClose}
              className="p-3 absolute right-3 hover:bg-gray-300 rounded-full cursor-pointer">
                <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round"d="M6 18 18 6M6 6l12 12"/>
                </svg>
              </div>
                   <h2 className="text-lg font-bold">{label}</h2>
            </header>


             <section className="relative p-6 flex-auto">
                <div className="my-4 text-slate-500 text-lg leading-relaxed">
                 {content}
                </div>
             </section>



          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
