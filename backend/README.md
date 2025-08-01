# 🏠 DjangoBnB 백어드 (Airbnb Clone with Django)

이 프로젝트는 **Next.js 프로프트에드**와 연동되는 **Django 기반의 숍소 예약 백어드**입니다.
사용자 인증, 숍소 등록, 채팅 기능, 예약 처리 등 Airbnb의 한심 기능을 API로 제공합니다.

---

## 📁 프로젝트 구조

```
├── chat/                   # 실시간 채팅 관련 앱
├── djangobnb_backend/     # 프로젝트 설정 (settings.py, urls.py 등)
├── media/                 # 업로드된 이미지 파일 경로 (MEDIA_ROOT)
├── property/              # 숍소 등록, 검색, 예약 관련 앱
├── useraccount/           # 사용자 등록, 인증, 프리평 관련 앱
├── db.sqlite3             # 개발용 SQLite DB
├── Dockerfile             # Docker 환경설정
├── entrypoint.sh          # 커테이너 실행 시 초기 셋업 스크립트
├── manage.py              # Django 관리 명령어 진입점
└── requirements.txt       # 백어드 패키지 의연성
```

---

## 🚀 주요 기능

* **회원가입 / 로그인 / JWT 인증** (`dj-rest-auth`, `django-allauth`)
* **숍소 등록 / 수정 / 예약 기능** (`property` 앱)
* **숍소 이미지 업로드** (`Pillow`, `media/` 디렉터리 사용)
* **유저 정보 수정 및 프리평** (`useraccount` 앱)
* **실시간 채팅 기능** (`channels`, `chat` 앱)
* **CORS 설정 완료** (Next.js 연동 대응)
* **Docker 기능 및 배포 준비**

---

## ⚙️ 사용 기술

| 범주                | 기술                                            |
| ----------------- | --------------------------------------------- |
| Backend Framework | Django 5.2, Django REST Framework             |
| 인증/보안             | JWT (SimpleJWT), dj-rest-auth, django-allauth |
| 실시간 처리            | Django Channels, Daphne                       |
| 이미지 처리            | Pillow                                        |
| DB                | SQLite (개발), PostgreSQL (배포 시)                |
| 배포                | Docker, Gunicorn                              |
| 환경설정              | django-environ, python-dotenv                 |
| 기탅                | django-cors-headers, pytest, debug-toolbar 등  |

---

## 💠 개발 환경 설정

```bash
# 1. 가상환경 설정
python -m venv venv
source venv/bin/activate  # 위네: venv\Scripts\activate

# 2. 패키지 설치
pip install -r requirements.txt

# 3. 환경 변수 설정 (.env 파일 필요)
cp .env.example .env

# 4. 마이그리션 및 서버 실행
python manage.py migrate
python manage.py runserver
```

---

## 🐳 Docker 사용 시

```bash
# 빌드 및 실행
docker build -t djangobnb-backend .
docker run -p 8000:8000 djangobnb-backend


--- 배포시
docker-compose -f docker-compose.prod.yml up --build

```




---

## 슈퍼유저생성

```bash

docker compose exec djangobnb_backend bash

python manage.py createsuperuser

```

```bash

docker compose -f docker-compose.prod.yml exec web bash

python manage.py createsuperuser

```


## 🌐 API 테스트

* `/api/auth/` - 회원가입/로그인/로그아웃
* `/api/properties/` - 숍소 목록, 등록, 예약
* `/api/chat/` - WebSocket 기반 실시간 채팅


---


