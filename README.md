# 🏡 Next.js + Django Fullstack 숙소 예약 플랫폼 클론 프로젝트 (Airbnb Clone)

> Code With Stein의 풀스택 강의를 따라 만든 \*\*숙소 예약 플랫폼 클론 프로젝트(Airbnb Clone)\*\*입니다. 이 프로젝트는 **Next.js(App Router)**, **TailwindCSS**, **Django + Django REST Framework**, 그리고 **Docker를 통한 배포**까지 포함한 실전형 웹 애플리케이션입니다.

## 📚 강의 개요

본 프로젝트는 다음 기술들을 실제 서비스처럼 연동하여 학습할 수 있는 종합 풀스택 강의입니다.

- **Frontend**: Next.js 15+ (App Router), TypeScript, TailwindCSS, Zustand 등
- **Backend**: Django, Django REST Framework, JWT 인증
- **Database**: PostgreSQL
- **DevOps**: Docker, Nginx, Gunicorn, DigitalOcean 배포
- **기능**: 유저 인증, 숙소 등록/예약/검색, 채팅 시스템, 관리자 페이지 등

---

## 🎥 총 9부작

1. [**Part 1**] - Next.js, Django 프로젝트 구조, 기본 설정
2. [**Part 2**] - 프론트엔드 구조, Tailwind 설정 및 컴포넌트 구성
3. [**Part 3**] - Django 모델링 및 API 개발 (숙소, 유저 등)
4. [**Part 4**]- 숙소 등록 기능, 이미지 업로드
5. [**Part 5**] - 예약 기능 및 달력 구현
6. [**Part 6**] - 유저 인증 및 보호된 페이지
7. [**Part 7**] - 실시간 채팅 기능 구현
8. [**Part 8**]- 관리자 기능, 예약/숙소 관리
9. [**Part 9**] - Docker로 배포, Nginx/Gunicorn 설정

> 🔗 영상 링크는 위 내용을 프로젝트에 맞게 수정해주세요. (추후 실제 링크로 업데이트)

---

## 🛠️ 기술 스택

### Frontend

- Next.js (App Router)
- React
- TypeScript
- TailwindCSS
- Zustand
- React Hook Form

### Backend

- Django
- Django REST Framework
- Simple JWT
- PostgreSQL
- Pillow (이미지 처리)

### DevOps

- Docker & Docker Compose
- Nginx & Gunicorn
- DigitalOcean (배포용 VPS)

---

## ✅ 주요 기능

- 사용자 회원가입, 로그인 (JWT)
- 숙소 등록/수정/삭제
- 이미지 업로드 및 썸네일 처리
- 날짜 기반 예약 기능 (중복 방지)
- 실시간 채팅 시스템 (프론트 구현 중심)
- 관리자 대시보드
- 반응형 UI 및 모던한 디자인

---

## 🐳 로컬 개발 환경 세팅

```bash
# 1. 저장소 클론
$ git clone https://github.com/your-username/nextjs-django-airbnb.git
$ cd nextjs-django-airbnb

# 2. 환경파일 설정
# backend/.env, frontend/.env.local 파일을 예시에 맞게 생성

# 3. Docker로 실행
$ docker-compose up --build

# 4. 접속 주소
Frontend: http://localhost:3000  
Backend API: http://localhost:8000/api
```

---

## 📁 프로젝트 구조 요약

```
nextjs-django-airbnb/
├── backend/                # Django 프로젝트
│   ├── core/              # Django app
│   ├── users/             # 사용자 관련 app
│   ├── listings/          # 숙소 관련 app
│   ├── chats/             # 채팅 관련 app
│   └── ...
├── frontend/              # Next.js 프로젝트 (App Router)
│   ├── app/               # 라우팅 기반 페이지 구조
│   ├── components/        # 재사용 컴포넌트
│   ├── hooks/             # 커스텀 훅
│   ├── libs/              # API 통신 및 유틸
│   └── ...
├── docker-compose.yml     # 전체 서비스 구성
├── nginx/                 # Nginx 설정 파일
└── README.md
```

---

## 🚀 배포 방식

- **Docker Compose**로 전체 서비스 빌드 및 실행
- **Gunicorn** + **Nginx**로 Django 앱을 운영 환경에 적합하게 배포
- **DigitalOcean** 등의 VPS 환경에서 서비스 운영

---

## 👨‍💻 만든 이유

- 편저 : [코담](https://codam.kr)

- 실전에서 사용하는 기술들을 종합적으로 경험해보고 싶어서
- 풀스택 개발자로서 백엔드/프론트엔드/DevOps 전체 흐름을 이해하기 위해
- Airbnb 같은 복잡한 구조의 프로젝트를 직접 구현해보고 싶어서

---

## 🙌 참고 및 출처

- 강의: [Code With Stein - Next.js & Django Airbnb Clone](https://www.youtube.com/@CodeWithStein)
- 공식 문서: Next.js, Django, Tailwind, DRF, Docker 등

