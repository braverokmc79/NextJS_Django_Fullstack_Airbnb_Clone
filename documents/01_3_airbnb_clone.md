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

* 🌍 숙소 검색 (국가, 날짜, 인원, 침실, 욕실 필터링)
* 🏠 숙소 상세 페이지 (이미지, 설명, 호스트 정보, 예약)
* ❤️ 즐겨찾기 등록 및 해제 기능
* 🔐 회원가입 / 로그인 / 로그아웃 (모달 기반 UI)
* 🏡 숙소 등록 (다단계 입력, 이미지 업로드 포함)
* 💬 실시간 채팅 기능 (WebSocket 기반)
* 📦 내 예약, 내 숙소, 즐겨찾기, 프로필 수정 등
* 🚀 DigitalOcean 서버에 프론트 + 백엔드 배포

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

* TypeScript: ✅ 사용
* ESLint: ❌ 미사용
* Tailwind CSS: ✅ 사용
* `src/` 디렉토리 사용: ❌ 미사용
* App Router 사용: ✅ 사용
* Turbopack 사용: ✅ 사용
* Import alias 설정: ❌ 기본값 유지하지 않음 (별도 커스텀 설정 예정)

3. 프로젝트가 생성되면 자동으로 다음 패키지가 설치됩니다:

**dependencies:**

* `react`
* `react-dom`
* `next`

**devDependencies:**

* `typescript`
* `@types/node`
* `@types/react`
* `@types/react-dom`
* `tailwindcss`
* `@tailwindcss/postcss`

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

* Tailwind v4.1은 `@import "tailwindcss"` 한 줄로 모든 스타일을 자동 로딩합니다.
* `content` 배열에 포함된 경로 내에서만 클래스가 추출됩니다.
* JIT 컴파일 방식으로 필요한 CSS만 빌드되어 빠르고 최적화된 성능을 제공합니다.

---

### 🧹 불필요한 코드 정리 및 설정 변경

* `globals.css`: Tailwind 관련 설정만 남기고 정리
* `layout.tsx`: 기본 HTML 구조 정리 + 페이지 타이틀 수정
* `page.tsx`: 초기 텍스트만 남기고 불필요한 코드 제거
* `public/`: 기존 로고 삭제 → Airbnb 로고 이미지 추가
* `tailwind.config.ts`: Airbnb 컬러 추가

```ts
colors: {
  airbnb: '#FF385C',
  airbnbDark: '#D41F43'
}
```

---

### 💻 주요 UI 컴포넌트 구성

컴포넌트 기반 구조로 각 UI 요소를 독립적으로 관리합니다.

#### 1. `Navbar.tsx`

* 로고, 중앙 검색창, 우측 사용자 메뉴 포함
* `fixed`, `flex`, `z-10` 등 Tailwind 유틸리티 활용
* 반응형으로 모바일에서 필터 자동 숨김 처리

#### 2. `SearchFilters.tsx`

* 위치, 날짜, 인원 수 필터 UI
* 모바일에서는 버튼만 보이고, 클릭 시 모달 표시 예정

#### 3. `AddPropertyButton.tsx`

* "Airbnb your home" 버튼 (숙소 등록 버튼)
* 반응형 및 hover 애니메이션 적용

#### 4. `UserNav.tsx`

* 햄버거 아이콘 + 사용자 아이콘
* 클릭 시 사용자 메뉴 드롭다운 예정

---

### 🏠 메인 화면 구성 요소

#### 5. `Categories.tsx`

* 숙소 유형 선택 (Beach, Villas 등)
* 아이콘 + 텍스트 + 호버 효과 구현
* 정적 UI → 추후 선택 시 필터링 기능 연동 예정

#### 6. `PropertyList.tsx` + `PropertyListItem.tsx`

* 숙소 카드 리스트 (썸네일, 제목, 가격 등)
* 반응형 Grid (모바일: 1열 / 데스크탑: 5열)
* 현재는 하드코딩 → 이후 API 연동 예정

#### 7. 상세 페이지 `/properties/[id]/page.tsx`

* 대형 이미지 + 숙소 설명 + 호스트 정보 출력
* 우측에는 예약 사이드바 표시

#### 8. `ReservationSidebar.tsx`

* 예약 기능을 위한 UI (게스트 선택, 예약 버튼, 총액 표시)
* 향후: 날짜 선택, 중복 예약 방지, 자동 요금 계산 기능 추가 예정

---

### ✅ 현재까지 완료된 항목

* [x] 프로젝트 생성 및 기본 세팅 완료 (TypeScript, Tailwind 등)
* [x] Tailwind 설치 및 설정 완료
* [x] 레이아웃, 내비게이션, 헤더 구성
* [x] 검색 필터, 유저 메뉴, 숙소 등록 버튼 구현
* [x] 카테고리 리스트 및 숙소 카드 리스트 UI 작성
* [x] 숙소 상세 페이지 및 예약 사이드바 UI 구성

---

### 🔜 다음 강의 예고

* 호스트 페이지, 내 숙소 목록, 예약 내역 페이지 구성
* 즐겨찾기 기능 및 마이페이지 UI 구성
* 백엔드(Django REST Framework + PostgreSQL + Docker) 설정
* JWT 기반 사용자 인증 API 구축
* 숙소 등록 및 예약 기능 API 연동
* Django Channels를 통한 실시간 채팅 기능 구현
* DigitalOcean을 활용한 서버 배포 (Nginx + Gunicorn)

---

> 💡 이 시리즈는 단순한 UI 개발이 아닌, 실제 **서비스 수준의 풀스택 프로젝트** 구축을 목표로 합니다. 프론트엔드 ↔ 백엔드 연동, 사용자 인증, 실시간 기능, 서버 배포까지 모두 경험할 수 있습니다.
