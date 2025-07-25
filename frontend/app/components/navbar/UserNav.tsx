"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import MenuLink from "./MenuLink";
import useLoginModal from "@/app/hooks/useLoginModal";
import useSignupModal from "@/app/hooks/useSignupModal";
import LogoutButton from "../LogoutButton";
import { useAuthStore } from "@/app/hooks/useAuthStore";

interface UserNavProps {
  userId?: string | null;
}

const UserNav: React.FC<UserNavProps> = ({ userId }) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const signupModal = useSignupModal();
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);



  return (
    <div className="p-2 relative inline-block border border-gray-300 rounded-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 cursor-pointer"
      >
        {/* 햄버거 아이콘 */}
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>

        {/* 유저 아이콘 */}
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0A3.75 3.75 0 0 1 15.75 6ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
      </button>

      {isOpen && (
        <div className="w-[220px] absolute top-[60px] right-0 bg-white border rounded-xl shadow-md flex flex-col border-gray-300 z-50">
          {isLoggedIn ? (
            <>
              <MenuLink label="쪽지함" onClick={() => { setIsOpen(false); router.push('/inbox'); }} />
              <MenuLink label="내 숙소 목록" onClick={() => { setIsOpen(false); router.push('/myproperties'); }} />
              <MenuLink label="찜한 숙소" onClick={() => { setIsOpen(false); router.push('/myfavorites'); }} />
              <MenuLink label="예약 내역" onClick={() => { setIsOpen(false); router.push('/myreservations'); }} />
              <LogoutButton setIsOpen={setIsOpen} />
            </>
          ) : (
            <>
              <MenuLink
                label="로그인"
                onClick={() => {
                  console.log("login clicked");
                  loginModal.open();
                  setIsOpen(false);
                }}
              />
              <MenuLink
                label="회원가입"
                onClick={() => {
                  console.log("signup clicked");
                  signupModal.open();
                  setIsOpen(false);
                }}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default UserNav;
