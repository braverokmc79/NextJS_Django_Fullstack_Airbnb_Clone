"use client";
import React from "react";
import Modal from "./Modal";

import CustomButton from "../forms/CustomButton";
import useSignupModal from "../hooks/useSignupModal";

const SignupModal: React.FC = () => {
  const signupModal = useSignupModal();

  const submitSignup = async () => {};
  const content = (
    <>
      <form className="space-y-4">
        <input
          placeholder="이메일 입력"
          type="email"
          className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
        />

        <input
          placeholder="비밀번호 입력"
          type="password"
          className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
        />

        <input
          placeholder="비밀번호 확인"
          type="password"
          className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
        />

        <div  className="hidden  p-5 bg-airbnb text-white rounded-xl opacity-80">
          에러 메시지
        </div>

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
