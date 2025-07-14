"use client";
import React, { useState } from "react";
import Modal from "./Modal";
import CustomButton from "../forms/CustomButton";
import useSignupModal from "@/app/hooks/useSignupModal";
import { useRouter } from "next/navigation";
import apiService from "@/app/services/apiService";


const SignupModal: React.FC = () => {
  
  const router = useRouter();
  const signupModal = useSignupModal();
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [errors, setErrors] = useState<string[]>(['sssss']);



  const submitSignup = async () => {
    const formData ={
      email,
      password1,
      password2
    }

  try {
      const response = await apiService.post("/api/auth/register/", JSON.stringify(formData));

      if (response.access) {
        signupModal.close();
        router.push("/");
      } else {
        const tempErrors: string[] = Object.values(response).flatMap((err: any) => err);
        setErrors(tempErrors);
      }
    } catch (error) {
      console.error("Signup failed:", error);
      setErrors(["서버 오류가 발생했습니다. 다시 시도해주세요."]);
    }

  };


  const content = (
    <>
      <form className="space-y-4">
        <input
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일 입력"
          type="email"
          className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
        />

        <input
         onChange={(e) => setPassword1(e.target.value)}
          placeholder="비밀번호 입력"
          type="password"
          className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
        />

        <input
          onChange={(e) => setPassword2(e.target.value)}
          placeholder="비밀번호 확인"
          type="password"
          className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
        />

  
        {errors.map((error, index) => (
            <div key={index} className="p-4 text-red-500  rounded-xl opacity-90">
              {error}
            </div>
         ))}

        <CustomButton label="회원가입" onClick={submitSignup} />
      </form>
    </>
  );

  return (
    <Modal
      isOpen={signupModal.isOpen}
      close={signupModal.close}
      label="회원가입"
      content={content}
    />
  );
};

export default SignupModal;
