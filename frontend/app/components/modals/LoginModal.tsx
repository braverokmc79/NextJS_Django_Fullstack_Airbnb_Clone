"use client";
import React, { useState } from "react";
import Modal from "./Modal";
import CustomButton from "../forms/CustomButton";
import useLoginModal from "@/app/hooks/useLoginModal";
import apiService from "@/app/services/apiService";
import { useRouter } from "next/navigation";
import { handleLogin } from "@/app/lib/actions";



const LoginModal: React.FC = () => {
  const router = useRouter();
  const LoginModal = useLoginModal();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const submitLogin = async () => {
      const formData = {
        email: email,
        password: password
      };
      
      console.log('로그인 응답', formData);
      const response = await apiService.postWithoutToken("/api/auth/login/", formData);

      console.log('로그인 응답 response', response);

      if (response.access) {
        handleLogin(response.user.pk, response.access, response.refresh);
        
        LoginModal.close();        
        //router.push("/");
        router.refresh();
        window.location.href = "/";
      } else {
         setErrors(response.non_field_errors);
      }

  };

  const content = (
    <>
      <form 
          className="space-y-4" action={submitLogin}
        >
        <input
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일 입력"          
          type="email"
          required
          className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
        />

        <input
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호 입력"
          type="password"
          className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
        />

       
        {errors&& errors.map((error, index) => {
            return (
                <div 
                    key={`error_${index}`}
                    className="p-5 text-airbnb-dark  rounded-xl opacity-80"
                >
                    {error}
                </div>
            )
        })}
        <CustomButton type="submit" label="로그인 하기"  />
      </form>
    </>
  );

  return (
    <Modal
      isOpen={LoginModal.isOpen}
      close={LoginModal.close}
      label="로그인"
      content={content}
    />
  );
};

export default LoginModal;
