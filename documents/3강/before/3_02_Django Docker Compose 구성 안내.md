# 🚀 Django Docker Compose 구성 안내

이 문서는 Django 백엔드 프로젝트를 Docker 기반으로 효율적으로 구성하기 위한 설정 가이드를 제공합니다. Dockerfile, docker-compose, .env 설정 등을 포함해 자동화된 마이그리션 처리와 개발 편의를 위한 환경 구성이 포함됩니다.

---

## 파일 구조 예시
![파일구조 이미지](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgRG29majkHWc-YLdCE5kQff26wWfTIrW1Gug5eZMrTYsSPn2czl6KNPR6hEW9VZtNQMvJufkG8PFPw8vvxZ6ZXac70zsBp6qDSZvayKriCkUODL2yWOATtzq5syOyfrIz8kcRS8GeGDlFwWwXPfcjaovLeFag-Q-iazY-LoTvWC9YtEQnZhDiu5YHd2yGb/s743/2025-07-12%2021%2041%2002.png)

```
├── djangobnb_backend/
│   ├── config/
│   ├── .env.dev
│   ├── docker-compose.yml
│   ├── Dockerfile
│   ├── entrypoint.sh
│   ├── manage.py
│   ├── requirements.txt
│   └── ...
├── frontend/
├── venv/
└── .gitignore
```

> ⚠️ **도커 구조와 같은 방식을 이용하면, 여러 파일이 동일 디렉토리에 있어야 합니다.**  
> Dockerfile, .env.dev, requirements.txt는 `djangobnb_backend/` 파일이 있는 위치에 필요합니다.




🖼️ 프로젝트내 도커 연동 구조

![프로젝내 도커 구조](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjFzCSrhsBfy-8WbtS2o5SFoBO2IHJfx3kB7wQU9amnWNlsBDOjfnLzA7VVLwrn5p-Z-ajK7UX39cuXSybqCknRz-Kf_x926eslKw0SwCAiZkePOtzAzdc7RLRJgP2T4KXwXnpoxFLZMy1FNuAdHFPT9fWhE-rAMsbUvVu5gNCy7y7yFYVWCv0VhpbZtL2W/w640-h410/2025-07-12%2021%2057%2055.png)





---

## ⚙️ docker-compose.yml 설정

```yaml
version: '3.8'

services:
  djangobnb_backend:
    build: .
    container_name: djangobnb_backend
    command: python manage.py runserver 0.0.0.0:8000
    volumes:
      - .:/usr/src/djangobnb_backend/
    ports:
      - "8000:8000"
    env_file:
      - ./.env.dev
    working_dir: /usr/src/djangobnb_backend
    depends_on:
      - db

  db:
    image: postgres:15
    volumes:
      - postgres_data:/var/lib/postgresql/data/
    environment:
      - POSTGRES_USER=postgresuser
      - POSTGRES_PASSWORD=postgrespassword
      - POSTGRES_DB=djangobnb

volumes:
  postgres_data:
```

> ✅ `container_name`은 exec 시 명령어로 사용될 수 있으나, docker-compose에서는 서비스 이름 기준으로 작동합니다.

---

## 🐳 Dockerfile

```Dockerfile
FROM python:3.12.2-slim-bullseye

# 필수 시스템 패키지 설치
RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev \
    zlib1g-dev \
    libjpeg-dev \
    build-essential \
    netcat \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/djangobnb_backend

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

COPY ./requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

COPY ./entrypoint.sh .
RUN sed -i 's/\r$//g' entrypoint.sh && chmod +x entrypoint.sh

COPY . .

ENTRYPOINT ["/usr/src/djangobnb_backend/entrypoint.sh"]
```

> ✅ `netcat(nc)`은 DB 연결 확인을 위해 사용되며, `libjpeg-dev`, `zlib1g-dev`는 Pillow 설치에 필수입니다.

---

## 파일: entrypoint.sh

```bash
#!/bin/sh

if [ "$DATABASE" = "postgres" ]
then
    echo "Check if database is running..."
    while ! nc -z $SQL_HOST $SQL_PORT; do
        sleep 0.1
    done
    echo "The database is up and running :-D"
fi

python manage.py makemigrations
python manage.py migrate

exec "$@"
```

> ✅ 컨테이너가 시작될 때 자동으로 DB 가용성 체크 후 마이그레이션까지 자동 실행되도록 합니다.

---

## 파일: .env.dev

```env
DEBUG=1
SECRET_KEY=codewithstein
DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1,[::1]
SQL_ENGINE=django.db.backends.postgresql
SQL_DATABASE=djangobnb
SQL_USER=postgresuser
SQL_PASSWORD=postgrespassword
SQL_HOST=db
SQL_PORT=5432
DATABASE=postgres
```

---

## settings.py 변수 적용 예시

```python
import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = os.environ.get('SECRET_KEY')
DEBUG = bool(os.environ.get('DEBUG', default=0))
ALLOWED_HOSTS = os.environ.get("DJANGO_ALLOWED_HOSTS", '').split(",")

DATABASES = {
    'default': {
        'ENGINE': os.environ.get("SQL_ENGINE"),
        'NAME': os.environ.get("SQL_DATABASE"),
        'USER': os.environ.get("SQL_USER"),
        'PASSWORD': os.environ.get("SQL_PASSWORD"),
        'HOST': os.environ.get("SQL_HOST"),
        'PORT': os.environ.get("SQL_PORT"),
    }
}
```

---

## requirements.txt 설명

```txt
# Django Framework 
Django==5.2.1

# Django REST Framework
djangorestframework==3.14.0
djangorestframework-simplejwt==5.3.1
djoser==2.2.0          # JWT 인증과 계정 관리

# 인증/회원가입 통합
dj-rest-auth==4.0.0
django-allauth==0.52.0

# API utilities
markdown               # 마크다운 지원
django-filter          # 필터 기능
pygments               # 코드 하이라이팅

# CORS
django-cors-headers==4.3.1

# 환경변수 관리
django-environ
python-dotenv==1.0.1

# ASGI
channels==4.0.0
daphne==4.0.0

# DB
sqlparse==0.5.3
psycopg2-binary==2.9.9
dj-database-url

# 이미지 처리
Pillow==10.2.0

# 배포용 서버
gunicorn==21.2.0

# 개발 및 테스트 도구
django-debug-toolbar
pytest
pytest-django

# 관리자 테마
django-jazzmin>=2.6.0
```

> ✅ Django 프로젝트 개발, 인증, API 제공, 배포까지 필요한 패키지 목록으로 구성되어 있으며, `jazzmin`은 관리자 페이지 UI를 개선해줍니다.

---

## ⛳️ 환경 시작 순서

```bash
cd djangobnb_backend

# 이미지 빌드
docker-compose build --no-cache

# 서버 실행
docker-compose up --build

# 마이그레이션, superuser 생성
docker-compose exec djangobnb_backend python manage.py migrate
docker-compose exec djangobnb_backend python manage.py createsuperuser
```

### 상태 확인

```bash
docker ps
```

### 컨테이너 내부 진입

```bash
docker-compose run djangobnb_backend bash
```

---

## 확인 URL

> 개발 서버 실행 후 접속:  
> [http://localhost:8000](http://localhost:8000/)

---

이 설정으로 Django 백엔드 환경을 Docker 기반으로 안정적으로 개발할 수 있으며, CI/CD 또는 프론트엔드 연동에도 유연하게 확장 가능합니다.