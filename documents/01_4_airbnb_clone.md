## Next.js + Django Airbnb Clone - 1강 요약 (최종 정리)

이번 강의에서는 Airbnb 클론 프로젝트의 전체 로드맵과 프론트엔드 초기 설정을 다룹니다. 프론트엔드는 **Next.js + Tailwind CSS**, 백엔드는 **Django REST Framework + PostgreSQL + Channels**로 구성되며, Docker를 활용해 개발 환경을 구축합니다.

---

### ✅ 프로젝트 기술 스택

| 항목     | 사용 기술                                     |
| ------ | ----------------------------------------- |
| 프론트엔드  | Next.js, React, Tailwind CSS              |
| 백엔드    | Django, Django REST Framework, PostgreSQL |
| 실시간 기능 | Django Channels, WebSocket                |
| 개발 환경  | Docker Compose                            |
| 배포 환경  | DigitalOcean (Ubuntu 서버)                  |

---

### 🎯 최종 목표 기능

- 🌍 숙소 검색 (국가, 날짜, 인원, 침실, 욕실 필터링)
- 🏠 숙소 상세 페이지 (이미지, 설명, 호스트 정보, 예약)
- ❤️ 즐겨찾기 등록 및 해제 기능
- 🔐 회원가입 / 로그인 / 로그아웃 (모달 기반 UI)
- 🏡 숙소 등록 (다단계 입력, 이미지 업로드 포함)
- 💬 실시간 채팅 기능 (WebSocket 기반)
- 📦 내 예약, 내 숙소, 즐겨찾기, 프로필 수정 등
- 🚀 DigitalOcean 서버에 프론트 + 백엔드 배포

---

### 🗂️ 프로젝트 초기 설정 (Next.js)

1. 폴더 생성 및 이동:

```bash
mkdir frontend && cd frontend
```

2. Next.js 프로젝트 생성:

```bash
npx create-next-app@latest frontend
```

선택 항목:

- TypeScript: ✅ 사용
- ESLint: ❌ 미사용
- Tailwind CSS: ✅ 사용
- `src/` 디렉토리 사용: ❌ 미사용
- App Router 사용: ✅ 사용
- Turbopack 사용: ✅ 사용
- Import alias 설정: ❌ 기본값 유지하지 않음 (별도 커스텀 설정 예정)

3. 프로젝트가 생성되면 자동으로 다음 패키지가 설치됩니다:

**dependencies:**

- `react`
- `react-dom`
- `next`

**devDependencies:**

- `typescript`
- `@types/node`
- `@types/react`
- `@types/react-dom`
- `tailwindcss`
- `@tailwindcss/postcss`

4. 개발 서버 실행:

```bash
npm run dev
```

브라우저에서 `http://localhost:3000` → Next 기본 템플릿 확인

---

### 🎨 Tailwind CSS 설정

Tailwind CSS v4.1 기준으로 Next.js 프로젝트에 설정하는 과정을 아래와 같이 진행합니다.

#### 1. Tailwind 설치

```bash
pnpm install tailwindcss @tailwindcss/cli
```

#### 2. PostCSS 설정 (`postcss.config.mjs`)

```js
const config = {
  plugins: [
    "@tailwindcss/postcss",
  ],
};

export default config;
```

✅ Tailwind CSS 4.1에서는 위 설정만으로 JIT 모드가 자동 적용됩니다.

#### 3. 전역 CSS 구성 (`app/globals.css`)

```css
@import "tailwindcss";
```

> 더 이상 `@tailwind base`, `@tailwind components`, `@tailwind utilities`는 필요하지 않습니다.

#### 4. Tailwind 설정 파일 (`tailwind.config.ts`)

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        airbnb: "#ff385c",
        "airbnb-dark": "#d50027"
      }
    }
  },
  plugins: []
};

export default config;
```

#### 5. 전역 레이아웃 설정 (`app/layout.tsx`)

```tsx
import './globals.css';

export const metadata = {
  title: 'My Tailwind App',
  description: 'Tailwind CSS 4.1 + Next.js 15 App',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

#### 6. Tailwind 작동 테스트 (`app/page.tsx`)

```tsx
export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-airbnb text-white">
      <h1 className="text-4xl font-bold">Tailwind 4.1 + Next.js 15 시작!</h1>
    </main>
  );
}
```

> 배경색이 `#ff385c`로 보이면 Tailwind 설정과 커스텀 컬러가 정상 적용된 것입니다.

✅ 요약:

- Tailwind v4.1은 `@import "tailwindcss"` 한 줄로 모든 스타일을 자동 로딩합니다.
- `content` 배열에 포함된 경로 내에서만 클래스가 추출됩니다.
- JIT 컴파일 방식으로 필요한 CSS만 빌드되어 빠르고 최적화된 성능을 제공합니다.

---

### 🧹 불필요한 코드 정리 및 설정 변경

- `globals.css`: Tailwind 관련 설정만 남기고 정리
- `layout.tsx`: 기본 HTML 구조 정리 + 페이지 타이틀 수정
- `page.tsx`: 초기 텍스트만 남기고 불필요한 코드 제거
- `public/`: 기존 로고 삭제 → Airbnb 로고 이미지 추가
- `tailwind.config.ts`: Airbnb 컬러 추가

```ts
colors: {
  airbnb: '#FF385C',
  airbnbDark: '#D41F43'
}
```

---

### 💻 주요 UI 컴포넌트 구성

이 프로젝트에서는 컴포넌트를 명확히 폴더 구조로 나눠 재사용성과 유지 보수성을 높였습니다.

#### 디렉토리 구조

```plaintext
app/
├── components/
│   ├── navbar/
│   │   ├── AddPropertyButton.tsx
│   │   ├── Navbar.tsx
│   │   ├── SearchFilters.tsx
│   │   └── UserNav.tsx
│   ├── properties/
│   │   ├── PropertyList.tsx
│   │   └── PropertyListItem.tsx
│   └── ReservationSidebar.tsx
```

![메인이미지](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgz2R-epNeSQU6OoYl8cXt0ShY0USLPXPxvQtaUvQx_xClJtyWwS7zbqUsH9pkb6onsIu15DJJV4nKSi4ILozI1OcK-Kad340ap-3JEjoekHfvolR0fRateKTErlUgHg6Obt-ZkVJ9AsHw8JnlCYlNA9HLo7nexkdrhk3AfLEThw3RwyVrQmZb-WWpjc2V4/s2004/2025-07-10%2020%2034%2011.png)

---

![상세이미지](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjn7ATk7Rxxw8TyqOp0lWhzNjJck8mz90oiDTeIak3hkuEsAOybpzxfaZJ7zujtOn1rZVDa5ReYXBg4GQVt4RVTZ7Y5QwZAN1XuknWArQKXwDjWY0sG_u_7OvcBwdt0jON9Er0dwyFnnbDrTxWgb6vlY4BGB-uBJDiWNoxGXviHObXyO55YJ_Ll02oNQkmS/s1837/2025-07-10%2020%2035%2014.png)



#### 1. `Navbar.tsx`

- 전체 네비게이션 바 컴포넌트
- 로고, 중앙 검색창, 우측 사용자 메뉴로 구성
- 반응형 대응 (`lg` 기준)

```tsx
<nav className="w-full fixed top-0 left-0 py-6 border-b border-gray-200  bg-white z-10">
  <div className="max-w-[1500px] mx-auto px-6">
    <div className="flex justify-between items-center">
      <Link href="/">
        <Image src="/logo.png" alt="DjangoBnb Logo" width={180} height={38} />
      </Link>
      <div className="flex space-x-6">
        <SearchFilters />
      </div>
      <div className="flex items-center space-x-6">
        <AddPropertyButton />
        <UserNav />
      </div>
    </div>
  </div>
</nav>
```

#### 2. `SearchFilters.tsx`

- 위치, 체크인, 체크아웃, 인원 선택 필터
- 모바일에서는 숨김 처리, 데스크탑 이상에서 노출

```tsx
<div className="h-[48px] lg:h-[64] flex items-center justify-between border rounded-full">
  <div className="hidden lg:block">
    <div className="flex items-center justify-between">
      <div className="cursor-pointer px-8 hover:bg-gray-100">여행지</div>
      <div className="cursor-pointer px-8 hover:bg-gray-100">체크인</div>
      <div className="cursor-pointer px-8 hover:bg-gray-100">체크아웃</div>
      <div className="cursor-pointer px-8 hover:bg-gray-100">인원</div>
    </div>
  </div>
  <div className="p-2">
    <div className="cursor-pointer p-4 bg-airbnb hover:bg-airbnb-dark text-white rounded-full">
      🔍
    </div>
  </div>
</div>
```

#### 3. `AddPropertyButton.tsx`

- 숙소 등록 버튼
- 상단 우측 사용자 메뉴 옆에 위치

```tsx
<div className='p-2 cursor-pointer text-sm font-semibold rounded-full hover:bg-gray-100 transition-colors'>
  Djangobnb your home
</div>
```

#### 4. `UserNav.tsx`

- 우측 상단에 위치하는 사용자 인터페이스 버튼 영역입니다.
- 햄버거 메뉴 아이콘과 사용자 아이콘이 나란히 배치되어 있으며, 추후 로그인/회원가입 모달 또는 드롭다운 메뉴로 확장될 수 있습니다.

```tsx
const UserNav = () => {
  return (
    <div className="p-2 relative inline-block border border-gray-300 rounded-full">
      <button className="flex items-center cursor-pointer">
        <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>

        <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
      </button>
    </div>
  );
};

export default UserNav;
```

💡 `svg` 아이콘을 직접 사용하여 이미지 의존성을 줄였으며, Tailwind CSS의 유틸리티 클래스만으로 스타일링이 이루어져 있습니다.

#### 5. `Categories.tsx`

- 숙소 유형을 선택할 수 있는 카테고리 바 구성
- 정적 이미지와 텍스트로 구성되며, Hover 시 강조 효과 적용
- 현재는 `All`, `Beach`, `Cabins`, `Tiny homes` 항목만 존재

```tsx
<div className="pt-3 pb-6 flex items-center space-x-12">
  <div className="flex flex-col items-center space-y-2 border-b-2 border-white opacity-60 hover:border-gray-200 hover:opacity-100">
    <Image src="/icn_category_beach.jpeg" width={20} height={20} alt="Beach" />
    <span className="text-xs">All</span>
  </div>
  {/* 동일한 형식으로 Beach, Cabins, Tiny homes 반복 */}
</div>
```

💡 향후 해당 카테고리를 클릭했을 때 숙소 목록을 필터링하는 기능이 추가될 예정입니다.

---

#### 6. `PropertyList.tsx` + `PropertyListItem.tsx`

- 숙소 카드 리스트 (썸네일, 제목, 가격 등)
- 반응형 Grid (모바일: 1열 / 데스크탑: 5열)
- 현재는 하드코딩 → 이후 API 연동 예정

#### 7. 상세 페이지 `/properties/[id]/page.tsx`

- 대형 이미지 + 숙소 설명 + 호스트 정보 출력
- 우측에는 예약 사이드바 표시

#### 8. `ReservationSidebar.tsx`

- 예약 기능을 위한 UI (게스트 선택, 예약 버튼, 총액 표시)
- 향후: 날짜 선택, 중복 예약 방지, 자동 요금 계산 기능 추가 예정

---

#### 9. `PropertyList.tsx`

- 숙소 카드 여러 개를 반복 렌더링하는 리스트 컴포넌트
- 현재는 3개의 하드코딩된 `PropertyListItem`을 출력하고 있으며, 향후 API를 통해 데이터를 받아 동적으로 렌더링할 예정입니다.

````tsx
import React from 'react';
import PropertyListItem from './PropertyListItem';

const PropertyList = () => {
  return (
    <>
      <PropertyListItem />
      <PropertyListItem />
      <PropertyListItem />
    </>
  );
};

export default PropertyList;
```tsx
const PropertyList = () => {
  return (
    <>
      <PropertyListItem />
      <PropertyListItem />
      <PropertyListItem />
    </>
  );
}
````

#### 10. `PropertyListItem.tsx`

- 숙소 카드 UI 하나를 구성하는 컴포넌트
- 이미지, 제목, 가격 등을 출력
- 반응형 지원, 마우스 hover 시 확대 효과 포함

```tsx
<div className='relative overflow-hidden aspect-square rounded-xl'>
  <Image
    fill
    src="/beach_1.jpg"
    className="hover:scale-110 object-cover transition h-full w-full"
    alt="Beach house"
  />
  <div className="mt-2">
    <p className="text-lg font-bold">제목</p>
  </div>
  <div className="mt-2">
    <p className="text-sm text-gray-500"><strong>ㄴ</strong> per night</p>
  </div>
</div>
```

#### 11. `ReservationSidebar.tsx`

- 숙소 상세 페이지 우측의 예약 사이드바 영역
- 인원 선택, 예약 버튼, 금액 계산 표시 포함
- 가격 정보는 임시 하드코딩 값으로 계산

```tsx
const nights = 3;
const price_per_night = 120000;
const fee = 15000;
const totalPrice = price_per_night * nights + fee;
```

- 하단에는 숙박일수, 서비스 수수료, 총 합계를 계산해 표시함
- 향후 실제 예약 로직 및 날짜 선택 기능과 연동 예정

#### 12. 숙소 상세 페이지 (`/properties/[id]/page.tsx`)

- 숙소 상세 정보를 보여주는 주요 페이지로, 숙소 이미지, 설명, 호스트 정보, 예약 사이드바까지 포함됩니다.
- 예약 사이드바(`ReservationSidebar`)와 나란히 배치되도록 Grid 레이아웃으로 구성되어 있습니다.

```tsx
import ReservationSidebar from '@/app/components/properties/ReservationSidebar';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const PropertyDetailPage = () => {
  return (
    <main className='max-w-[1500px] mx-auto px-6 pb-6'>
      <div className='w-full h-[64vh] mb-4 overflow-hidden rounded-xl relative'>
        <Image
          fill
          src="/beach_1.jpg"
          className="hover:scale-110 object-cover transition h-full w-full"
          alt="Beach house"
        />
      </div>

      <div className='mt-4 grid grid-cols-1 md:grid-cols-5 gap-4'>
        <div className='py-6 pr-6 col-span-3'>
          <h1 className='mb-4 text-4xl'>Property name</h1>
          <span className='mb-6 block text-lg text-gray-600'>
            4 guests - 2 bedrooms - 1 bathrooms
          </span>

          <hr />

          <Link href="/" className='py-6 flex items-center space-x-4'>
            <Image
              src="/profile_pic_1.jpg"
              width={50}
              height={50}
              className='rounded-full'
              alt="멍멍이"
            />
            <p><strong>멍멍이</strong> is your host</p>
          </Link>

          <hr />

          <p className='mt-6 text-lg'>숙소에 대한 상세 설명이 여기에 들어갑니다.</p>
        </div>

        <ReservationSidebar />
      </div>
    </main>
  );
};

export default PropertyDetailPage;
```

📌 이 컴포넌트는 Airbnb의 숙소 상세 화면을 모방한 구조로, 숙소 정보를 중심으로 사용자에게 예약을 유도하는 UX를 제공합니다.

\--- (`/properties/[id]/page.tsx`)

- 큰 이미지, 숙소 정보, 호스트 정보, 설명 텍스트 출력
- `ReservationSidebar`를 함께 배치하여 전체 UI 구성

---

-

---

### 🔜 다음 강의 예고

- 호스트 페이지, 내 숙소 목록, 예약 내역 페이지 구성
- 즐겨찾기 기능 및 마이페이지 UI 구성
- 백엔드(Django REST Framework + PostgreSQL + Docker) 설정
- JWT 기반 사용자 인증 API 구축
- 숙소 등록 및 예약 기능 API 연동
- Django Channels를 통한 실시간 채팅 기능 구현
- DigitalOcean을 활용한 서버 배포 (Nginx + Gunicorn)

---

> 💡 이 시리즈는 단순한 UI 개발이 아닌, 실제 **서비스 수준의 풀스택 프로젝트** 구축을 목표로 합니다. 프론트엔드 ↔ 백엔드 연동, 사용자 인증, 실시간 기능, 서버 배포까지 모두 경험할 수 있습니다.

