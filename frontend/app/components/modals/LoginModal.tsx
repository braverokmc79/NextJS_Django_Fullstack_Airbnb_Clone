"use client";
import React, { useState } from "react";
import Modal from "./Modal";
import CustomButton from "../forms/CustomButton";
import useLoginModal from "@/app/hooks/useLoginModal";
import apiService from "@/app/services/apiService";
import { useRouter } from "next/navigation";
import { handleLogin } from "@/app/lib/actions";
import { useAuthStore } from "@/app/hooks/useAuthStore";

const LoginModal: React.FC = () => {
  const router = useRouter();
  const LoginModal = useLoginModal();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  // ✅ 상태 설정 함수 가져오기
  const setUserId = useAuthStore((state) => state.setUserId);

  const submitLogin = async () => {
    const formData = { email, password };

    try {
      const response = await apiService.postWithoutToken("/api/auth/login/", formData);
      console.log("로그인 응답:", response);

      if (response.access) {
        // 토큰 핸들링 (예: 쿠키 저장)
        handleLogin(response.user.pk, response.access, response.refresh);

        // ✅ 전역 상태 저장
        setUserId(response.user.pk);

        // 모달 닫기 및 이동
        LoginModal.close();
        router.push("/");
        router.refresh();
      } else {
        setErrors(response.non_field_errors || ["로그인에 실패했습니다."]);
      }
    } catch (err) {
      console.error("로그인 오류", err);
      setErrors(["서버 오류가 발생했습니다."]);
    }
  };

  const content = (
    <>
      <form className="space-y-4" onSubmit={(e) => {
        e.preventDefault();
        submitLogin();
      }}>
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
          required
          className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
        />

        {errors.length > 0 && errors.map((error, index) => (
          <div key={`error_${index}`} className="p-5 text-airbnb-dark rounded-xl opacity-80">
            {error}
          </div>
        ))}

        <CustomButton type="submit" label="로그인 하기" />
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
