"use client";
import React from "react";
import { useRouter } from "next/navigation";
import MenuLink from "./navbar/MenuLink";
import { resetAuthCookies } from "../lib/actions";
import { useAuthStore } from "../hooks/useAuthStore";

interface LogoutButtonProps{
  setIsOpen: (isOpen: boolean) => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({setIsOpen}) => {
  const router = useRouter();
  const setUserId = useAuthStore((state) => state.setUserId);

  const submitLogout = async () => {
    resetAuthCookies();
    setIsOpen(false);
    router.push("/");   
    setUserId(null);  // 전역 상태에서 제거
    router.refresh();
  };

  return <MenuLink label="로그아웃" onClick={submitLogout} />;
};

export default LogoutButton;
