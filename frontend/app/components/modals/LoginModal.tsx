"use client";
import React from "react";
import Modal from "./Modal";
import userLoginModal from "../hooks/useLoginModal";
import CustomButton from "../forms/CustomButton";

const LoginModal: React.FC = () => {
  const LoginModal = userLoginModal();

  const submitLogin = async () => {};
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

        <div  className="hidden  p-5 bg-airbnb text-white rounded-xl opacity-80">
          에러 메시지
        </div>

        <CustomButton label="로그인 하기" onClick={submitLogin} />
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
