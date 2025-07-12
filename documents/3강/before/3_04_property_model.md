## 🏡 3_3: 숙소(Property) 모델 구성

이번 섹션에서는 Airbnb 클론 서비스의 핵심인 숙소(Property) 모델을 정의하고, 숙소 데이터를 관리할 수 있도록 백엔드 로직을 구성합니다.

---

### 🧱 1. 숙소 앱 생성

```bash
django-admin startapp property
```

#### `settings.py`에 앱 등록

```python
INSTALLED_APPS = [
    ...
    'property',
]
```

---

### 🏘️ 2. Property 모델 정의

#### `property/models.py`

```python
import uuid
from django.db import models
from django.conf import settings

class Property(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    price_per_night = models.PositiveIntegerField()
    country = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    address = models.CharField(max_length=255)
    latitude = models.FloatField(blank=True, null=True)
    longitude = models.FloatField(blank=True, null=True)
    image = models.ImageField(upload_to='uploads/properties/', blank=True, null=True)
    landlord = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='properties')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
```

---

### ⚙️ 3. 마이그레이션 적용

```bash
python manage.py makemigrations property
python manage.py migrate
```

---

### 🧪 4. Admin 등록

#### `property/admin.py`

```python
from django.contrib import admin
from .models import Property

admin.site.register(Property)
```

> 📝 관리자 페이지에서 숙소 데이터를 직접 등록하고 테스트할 수 있도록 설정합니다.

---

### 🧹 마무리

- 숙소 데이터를 표현할 Property 모델 정의 완료
- 관리자 페이지에 모델 등록 완료

➡️ 다음 단계에서는 숙소 리스트 및 상세 API, CRUD 기능을 구현합니다.

