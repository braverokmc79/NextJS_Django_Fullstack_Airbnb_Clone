### 📘 Next.js & Django Airbnb Clone - 3강

이번은  Docker로 Django 백엔드 환경을 세팅하고, PostgreSQL을 연동한 후 사용자 인증(Custom User 모델)까지 빠르게 구현합니다.

---

## 🛠️ Docker로 Django 백엔드 세팅

1. **프로젝트 구조 생성 및 Django 설치**

```bash
mkdir backend
cd backend
python3 -m venv env
source env/bin/activate
pip install django
django-admin startproject airbnb_clone_backend .
```

2. **requirements.txt 작성**

```txt
Django==5.0.2
```

3. **Dockerfile 생성**

```dockerfile
FROM python:3.12-slim
WORKDIR /usr/src/app
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
COPY requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt
COPY . .
```

4. **docker-compose.yml 작성**

```yaml
version: "3.8"
services:
  web:
    build: .
    command: python manage.py runserver 0.0.0.0:8000
    volumes:
      - .:/usr/src/app
    ports:
      - "8000:8000"
    env_file:
      - .env.dev
```

5. **.env.dev 작성**

```env
DEBUG=1
SECRET_KEY=changeme
DJANGO_ALLOWED_HOSTS=localhost 127.0.0.1
```

---

## 🗄️ PostgreSQL 설정

1. **docker-compose.yml에 PostgreSQL 추가**

```yaml
db:
  image: postgres:15
  volumes:
    - postgres_data:/var/lib/postgresql/data/
  environment:
    POSTGRES_DB=airbnb_db
    POSTGRES_USER=airbnb_user
    POSTGRES_PASSWORD=airbnb_pass
volumes:
  postgres_data:
```

2. **settings.py 수정**

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.environ.get('POSTGRES_DB'),
        'USER': os.environ.get('POSTGRES_USER'),
        'PASSWORD': os.environ.get('POSTGRES_PASSWORD'),
        'HOST': 'db',
        'PORT': 5432,
    }
}
```

3. **컨테이너 실행 및 마이그레이션**

```bash
docker-compose build
docker-compose up -d
docker-compose exec web python manage.py migrate
```

---

## 👤 Custom User 모델 생성

1. **accounts 앱 생성 및 모델 정의**

```bash
docker-compose exec web python manage.py startapp accounts
```

**accounts/models.py**

```python
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.db import models

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Email is required')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)

class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=255, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = CustomUserManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
```

2. **settings.py에 추가**

```python
AUTH_USER_MODEL = 'accounts.CustomUser'
```

3. **마이그레이션**

```bash
docker-compose exec web python manage.py makemigrations
docker-compose exec web python manage.py migrate
```

---

## 🔗 Django REST Framework 및 JWT 세팅

1. **requirements.txt 추가**

```txt
djangorestframework==3.14.0
djangorestframework-simplejwt==5.3.0
django-cors-headers==3.14.0
```

2. **settings.py 수정**

```python
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
}

from datetime import timedelta
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
}

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]
```

3. **accounts/serializers.py 작성**

```python
from rest_framework import serializers
from .models import CustomUser

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'name']
```

---

