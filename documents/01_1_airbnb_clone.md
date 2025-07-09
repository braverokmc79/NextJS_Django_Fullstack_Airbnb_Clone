React, Next.js, Tailwind를 프론트엔드로, Django와 Django REST Framework를 백엔드로 사용해서 전체 스택으로 구성된 Airbnb 클론 프로젝트를 만드는 방법을 알려드립니다.

이 프로젝트는 Docker Compose와 PostgreSQL을 기반으로 백엔드 환경을 구성하고, 실시간 채팅을 위해 Django Channels도 함께 사용할 예정입니다. 초기 세팅부터 전체 UI 제작, 기능 구현, 마지막에는 Digital Ocean 서버에 배포까지 완성해볼 거예요.

---

## 프로젝트 미리보기

홈페이지에는 부드러운 애니메이션이 적용되어 있고, 검색창, 체크인/체크아웃 날짜 설정, 게스트 수, 침실/욕실 수 입력 후 검색이 가능합니다. 특정 숙소를 클릭하면 상세 페이지로 이동하며, 호스트 정보, 숙소 설명, 즐겨찾기 추가 등 다양한 기능이 구현됩니다. 또한, 예약이 완료된 날짜는 선택 불가 처리되고, 실시간 채팅 기능을 통해 호스트와 직접 대화할 수 있습니다.

---

## 1. 전체 개발 일정 및 작업 계획 (To-Do 리스트)

### 프론트엔드

1. Next.js 설치 및 프로젝트 생성
2. 네비게이션 바 (로고, 검색창, Airbnb 등록, 사용자 메뉴) 구현
3. 메인 페이지 카테고리 영역 구현 (Beach, Cabin 등)
4. 숙소 리스트 구성 (하드코딩된 static 데이터 기반)
5. 숙소 상세 페이지 static 구성
6. 호스트(landlord) 페이지 static 구성
7. 예약 내역 페이지 (my reservations) static 구성
8. 내 숙소 페이지 (my properties) static 구성
9. 채팅 인박스 static 구성
10. 채팅 상세 페이지 static 구성
11. 로그인/회원가입 모달창 UI static 구현
12. 재사용 가능한 Modal 컴포넌트 생성
13. 로그인/회원가입 모달 연동 및 에러 처리까지 static 마무리

### 백엔드

1. Docker, PostgreSQL 환경에서 Django 프로젝트 설정
2. 사용자 모델(CustomUser) 생성 (이메일 로그인, 아바타, 이름 등 필드 추가)
3. properties 앱 생성 및 모델/시리얼라이저 생성
4. DRF 설치 및 JWT 인증, CORS 설정
5. 프론트엔드에서 실제 데이터 받아와서 리스트 보여주기 (static 제거)
6. 로그인, 로그아웃, 회원가입 기능 구현
7. 숙소 등록 기능 (multi-step form, API 연동)
8. 상세 페이지 데이터 연동 (동적 라우팅)
9. 숙소 예약 기능 구현 (날짜 선택, 가격 계산 등)
10. 호스트 페이지 동적 구성 (연결된 숙소 출력)
11. 마이 숙소, 마이 예약 내역 동적 구성
12. 채팅 기능 구현

- Django Channels 및 WebSocket 설정
- 실시간 채팅 송수신 구현
- 메시지 저장 및 불러오기 기능

13. 즐겨찾기 추가/삭제 기능
14. 검색 필터 (위치, 날짜, 게스트 수 등)

- 모델 설계
- API 구성

### 배포

1. GitHub에 코드 푸시 및 버전 관리
2. DigitalOcean 서버 생성
3. Docker, Nginx, Gunicorn, Supervisor 세팅
4. 프론트엔드/백엔드 배포

---

## 2. 프로젝트 시작하기: Next.js 초기 세팅

1. 프로젝트 폴더 생성:

```bash
mkdir django-bnb
cd django-bnb
```

2. 공식 문서 참고하여 Next.js 설치:

```bash
npx create-next-app@latest
```

옵션 선택:

- 프로젝트명: django-bnb
- TypeScript: 사용
- ESLint: 미사용
- Tailwind: 사용
- `src/` 디렉토리: 사용 안 함
- App Router: 사용

3. 개발 서버 실행:

```bash
cd django-bnb
npm run dev
```

브라우저에서 `localhost:3000` 으로 접속해 기본 템플릿이 잘 뜨는지 확인.

4. boilerplate 코드 정리:

- `app/page.tsx` 내용 정리 후 "Django BNB" 텍스트만 표시
- `public/` 폴더 안의 로고 파일 삭제
- Tailwind 설정에서 Airbnb 색상 추가 (예: `#FF385C`)
- 테스트용 `h2` 태그 추가해서 색상 반영 확인

---

## 3. 네비게이션 바 만들기

1. `app/components/Navbar.tsx` 생성
2. 로고, 가운데 검색창, 오른쪽 사용자 메뉴 포함
3. 컴포넌트를 `app/layout.tsx`에 포함시켜 전체 페이지에 고정
4. 로고 이미지는 `public/logo.png`에 위치
5. 검색창은 별도 컴포넌트로 분리 (`SearchFilters.tsx`)

검색창에는 다음 요소들이 포함:

- 위치
- 체크인 날짜
- 체크아웃 날짜
- 게스트 수
- 검색 아이콘 (SVG)
- 반응형 처리 (모바일에서는 아이콘만 표시)

오른쪽 메뉴에는 다음 포함:

- "Airbnb 당신의 집 등록하기" 버튼 (`AddPropertyButton.tsx`)
- 사용자 네비게이션 메뉴 (`UserNav.tsx`) → 추후 로그인/회원 관련 기능 연결

---

## 4. 카테고리 영역 만들기

- `components/Categories.tsx` 생성 후 메인 페이지에 삽입
- 카테고리 아이템은 아이콘 + 텍스트 + 호버 시 아래 회색 밑줄
- 예: 비치, 캐빈, 빌라 등

---

## 5. 숙소 리스트 (static)

- `components/properties/PropertyList.tsx` 에 리스트 컴포넌트 생성
- 각 숙소 아이템은 `PropertyListItem.tsx`로 구성
- 카드 형태 그리드로 표시 (반응형 1→3→5열)
- 이미지, 숙소명, 가격 표시
- 이미지 호버 시 확대 효과 적용

---

## 6. 숙소 상세 페이지 만들기

- `app/properties/[id]/page.tsx` 생성 (동적 라우팅)
- 상단 대형 이미지, 아래 그리드 3:2 구성
- 왼쪽: 제목, 게스트 수, 침실/욕실, 호스트 정보, 설명
- 오른쪽: 예약 사이드바 (`ReservationSidebar.tsx`)
  - 가격, 게스트 수 선택, 예약 버튼, 요약 가격 출력

이후 과정에서는:

- 동적 데이터 연동 (프론트/백엔드 통합)
- 로그인, 회원가입 기능 구현
- 예약 및 채팅 기능 등 점차 완성해나감

---
