### 📘 Next.js & Django Airbnb Clone - 4강

이번은 API 서비스 레이어를 추가하고, 회원가입 및 로그인 기능을 구현하여 인증 흐름을 완성합니다.

---

## 🔗 API 서비스 레이어 추가

1. **서비스 폴더 생성 및 파일 작성**

- `frontend/app/services/apiService.ts` 생성

```ts
const APIService = {
  async get(url: string): Promise<any> {
    console.log("GET:", url);
    return new Promise((resolve, reject) => {
      fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Response:", data);
          resolve(data);
        })
        .catch((error) => {
          console.error("Error:", error);
          reject(error);
        });
    });
  },

  async post(url: string, data: any): Promise<any> {
    console.log("POST:", url, data);
    return new Promise((resolve, reject) => {
      fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Response:", data);
          resolve(data);
        })
        .catch((error) => {
          console.error("Error:", error);
          reject(error);
        });
    });
  },
};

export default APIService;
```

2. **환경 변수 설정**
- 프로젝트 루트에 `.env.local` 파일 생성

```env
NEXT_PUBLIC_API_HOST=http://127.0.0.1:8000
```

3. **Next.js 서버 재시작**
```bash
npm run dev
```

---

## 👤 회원가입 기능 구현

1. **SignUpModal 컴포넌트 수정**
- 상태 추가 및 폼 핸들링

```ts
import { useState } from "react";
import { useRouter } from "next/navigation";
import APIService from "../services/apiService";
import { handleLogin } from "../lib/actions";

const SignUpModal = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const submitSignUp = async () => {
    const formData = { email, password1, password2 };
    const response = await APIService.post("/api/auth/register/", formData);

    if (response.access) {
      await handleLogin(response.user.pk, response.access, response.refresh);
      router.push("/");
    } else {
      const tmpErrors = Object.values(response);
      setErrors(tmpErrors as string[]);
    }
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); submitSignUp(); }}>
      {/* 입력 필드 및 오류 출력 */}
    </form>
  );
};
```

2. **백엔드 API 연동**
- `/api/auth/register/` URL에 POST 요청
- 회원가입 성공 시 JWT 토큰 저장 및 페이지 리디렉션

---

## 🔐 로그인 기능 구현

1. **LoginModal 컴포넌트 수정**
- 상태 추가 및 API 연동

```ts
const LoginModal = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const submitLogin = async () => {
    const formData = { email, password };
    const response = await APIService.post("/api/auth/login/", formData);

    if (response.access) {
      await handleLogin(response.user.pk, response.access, response.refresh);
      router.push("/");
    } else {
      setErrors(response.non_field_errors || []);
    }
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); submitLogin(); }}>
      {/* 입력 필드 및 오류 출력 */}
    </form>
  );
};
```

2. **백엔드 API 연동**
- `/api/auth/login/` URL에 POST 요청
- 로그인 성공 시 쿠키에 토큰 저장

---

## 🚪 로그아웃 기능 구현

1. **LogoutButton 컴포넌트 생성**

```ts
import { useRouter } from "next/navigation";
import { resetAllCookies } from "../lib/actions";

const LogoutButton = () => {
  const router = useRouter();
  const handleLogout = async () => {
    await resetAllCookies();
    router.push("/");
  };

  return <button onClick={handleLogout}>로그아웃</button>;
};
```

2. **resetAllCookies 서버 액션 추가**

```ts
'use server';
import { cookies } from "next/headers";

export const resetAllCookies = async () => {
  cookies().set("session_user_id", "");
  cookies().set("session_access_token", "");
  cookies().set("session_refresh_token", "");
};
```

---

