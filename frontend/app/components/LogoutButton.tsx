"use client";
import React from "react";
import { useRouter } from "next/navigation";
import MenuLink from "./navbar/MenuLink";
import { resetAuthCookies } from "../lib/actions";

interface LogoutButtonProps{
  setIsOpen: (isOpen: boolean) => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({setIsOpen}) => {
  const router = useRouter();

  const submitLogout = async () => {
    resetAuthCookies();
    setIsOpen(false);
    router.refresh();
    router.push("/");    
  };

  return <MenuLink label="로그아웃" onClick={submitLogout} />;
};

export default LogoutButton;
