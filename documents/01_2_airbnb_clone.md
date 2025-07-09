# 🏡 Airbnb 클론 1강: Next.js + TailwindCSS + Shadcn UI 세팅

## ✅ 강의 핵심 요약
- Next.js 프로젝트 생성
- TailwindCSS 설정
- Shadcn UI 설치 및 테스트 컴포넌트 생성
- ESLint + Prettier 설정

---

## 1️⃣ 프로젝트 생성 (Next.js + TypeScript)
```bash
npx create-next-app@latest airbnb-clone --typescript
cd airbnb-clone
```

> `pages` 디렉토리가 생성된 기존 구조입니다. 앱 라우터를 사용하지 않습니다 (강의 기준).

---

## 2️⃣ TailwindCSS 설치 및 설정
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### `tailwind.config.ts`
```ts
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

### `globals.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### `_app.tsx`
```tsx
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
```

---

## 3️⃣ Shadcn UI 설치
```bash
npx shadcn-ui@latest init
```

### 옵션 선택 예시
- 프로젝트 타입: TypeScript
- 프레임워크: Next.js
- Tailwind config 경로: `tailwind.config.ts`
- Components 디렉토리: `components`

### UI 컴포넌트 설치 예시
```bash
npx shadcn-ui@latest add button
```

### `components/ui/button.tsx` 생성됨
```tsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

const Button = React.forwardRef(...);

export { Button };
```

---

## 4️⃣ ESLint + Prettier 설정
```bash
npm install -D eslint prettier eslint-config-prettier eslint-plugin-prettier
```

### `.eslintrc.json`
```json
{
  "extends": ["next", "prettier"],
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": "error"
  }
}
```

---

## ✅ 확인용 테스트
### `pages/index.tsx`
```tsx
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="p-4">
      <Button>Shadcn Button</Button>
    </div>
  );
}
```

---

## 📦 결과 정리
- ✅ Next.js 기본 세팅 완료
- ✅ Tailwind 작동 확인
- ✅ Shadcn UI 컴포넌트 정상 작동
- ✅ 코드 포맷터 설정 완료

---

이후 2강에서는 Django 백엔드 세팅과 JWT 인증 구조를 연결하는 작업으로 넘어갑니다.

