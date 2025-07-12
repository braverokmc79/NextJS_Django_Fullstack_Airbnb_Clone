## 🔧 3강: Django 백엔드 프로젝트 시작하기

이번 강의에서는 Next.js 프론트엔드와 연결될 Django 백엔드 프로젝트를 생성하고 초기 설정을 완료하는 과정을 다룹니다. DRF(Django REST Framework)를 기반으로 API를 제공할 준비를 합니다.

---

### 📁 1. 백엔드 폴더 생성

루트 디렉토리에서 `backend`라는 이름의 폴더를 생성하고, 해당 디렉토리에서 가상환경을 설정합니다.

```bash
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
```

---

### 📦 2. Django 및 필수 패키지 설치

```bash
pip install django djangorestframework djoser djangorestframework-simplejwt python-dotenv corsheaders
```

#### 설치 패키지 설명
- `django`: Django 웹 프레임워크
- `djangorestframework`: Django 기반 REST API 구성
- `djoser`: 인증 기능을 DRF로 쉽게 구현
- `djangorestframework-simplejwt`: JWT 기반 인증 토큰 제공
- `python-dotenv`: 환경변수 파일 관리
- `corsheaders`: CORS 설정을 위한 미들웨어

---

### ⚙️ 3. Django 프로젝트 생성 및 앱 추가

```bash
django-admin startproject config .
python manage.py startapp core
```

- `config`: Django 설정 디렉토리
- `core`: 메인 비즈니스 로직을 담당할 앱

---

### ⚙️ 4. settings.py 설정 변경

#### INSTALLED_APPS 수정
```python
INSTALLED_APPS = [
    'corsheaders',
    'rest_framework',
    'djoser',
    'core',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]
```

#### MIDDLEWARE에 corsheaders 추가
```python
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]
```

#### 기타 설정
```python
CORS_ALLOW_ALL_ORIGINS = True
```

---

### 🔌 5. .env 환경변수 설정

루트에 `.env` 파일을 만들고 다음처럼 설정합니다:

```
SECRET_KEY=django-insecure-...
DEBUG=True
ALLOWED_HOSTS=*
```

그리고 `settings.py`에서 `python-dotenv`로 불러올 수 있도록 다음 코드 추가:

```python
import os
from dotenv import load_dotenv

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
DEBUG = os.getenv("DEBUG") == "True"
ALLOWED_HOSTS = os.getenv("ALLOWED_HOSTS").split(" ")
```

---

### ✅ 정리

- 백엔드 구조 준비 완료
- DRF, Djoser, CORS 등 API 및 인증에 필요한 패키지 설치 및 설정
- `.env` 환경 변수 구성 및 Django와 연동

다음 강의에서는 `User` 모델 확장 및 JWT 인증 구현을 다룰 예정입니다.

