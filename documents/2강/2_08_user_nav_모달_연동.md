### 👤 8. UserNav 모달 연동

이 섹션에서는 사용자 네비게이션(UserNav) 버튼을 클릭하면 로그인/회원가입 모달이 열리도록 상태를 연동하는 과정을 설명합니다.

---

### ✅ UserNav.tsx 전체 코드

```tsx
"use client";
import { useState } from "react";
import MenuLink from "./MenuLink";
import userLoginModal from "../hooks/useLoginModal";
import useSignupModal from "../hooks/useSignupModal";

const UserNav = () => {
  const loginModal = userLoginModal();
  const signupModal = useSignupModal();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-2 relative inline-block border border-gray-300 rounded-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center cursor-pointer"
      >
        <svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>

        <svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className="w-[220px] absolute top-[60px] right-0 bg-white border rounded-xl shadow-md flex flex-col border-gray-300"
        >
          <MenuLink
            label="로그인"
            onClick={() => {
              loginModal.onOpen();
            }}
          />

          <MenuLink
            label="회원가입"
            onClick={() => {
              signupModal.onOpen();
            }}
          />
        </div>
      )}
    </div>
  );
};

export default UserNav;
```

---

### 📌 설명

- 햄버거 아이콘과 유저 아이콘을 클릭하면 드롭다운 메뉴가 토글됩니다.
- `MenuLink`를 통해 각각 로그인 / 회원가입 모달을 띄우는 함수를 호출합니다.
- 상태 관리는 `zustand` 훅(`useLoginModal`, `useSignupModal`)을 통해 제어합니다.

---

### ✅ MenuLink.tsx (기본 버튼 역할 컴포넌트)

```tsx
import React from "react";

interface MenuLinkProps {
  label: string;
  onClick: () => void;
}

const MenuLink: React.FC<MenuLinkProps> = ({ label, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="px-4 py-3 hover:bg-gray-100 transition font-semibold cursor-pointer"
    >
      {label}
    </div>
  );
};

export default MenuLink;
```

---

✅ 이제 사용자 메뉴에서 "로그인", "회원가입" 클릭 시 각각의 모달이 열리며, 전역 상태와 연결된 완성도 높은 사용자 인터랙션이 구현되었습니다.

