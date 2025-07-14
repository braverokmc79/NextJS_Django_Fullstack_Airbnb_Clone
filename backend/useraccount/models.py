import uuid

from django.conf import settings
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, UserManager
from django.db import models


class CustomUserManager(UserManager):
    def _create_user(self, name, email, password, **extra_fields):
        if not email:
            raise ValueError("You have not specified a valid e-mail address")
    
        email = self.normalize_email(email)
        user = self.model(email=email, name=name, **extra_fields)
        user.set_password(password)
        user.save(using=self.db)
        return user

    def create_user(self, name=None, email=None, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(name, email, password, **extra_fields)
    
    def create_superuser(self, name=None, email=None, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self._create_user(name, email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    id           = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, verbose_name="ID")
    email        = models.EmailField(unique=True, verbose_name="이메일")
    name         = models.CharField(max_length=255, blank=True, null=True, verbose_name="이름")
    avatar       = models.ImageField(upload_to='uploads/avatars', verbose_name="프로필 이미지")

    is_active    = models.BooleanField(default=True, verbose_name="활성 사용자 여부")
    is_superuser = models.BooleanField(default=False, verbose_name="슈퍼유저 여부")
    is_staff     = models.BooleanField(default=False, verbose_name="스태프 권한 여부")

    date_joined  = models.DateTimeField(auto_now_add=True, verbose_name="가입일")
    last_login   = models.DateTimeField(blank=True, null=True, verbose_name="마지막 로그인")

    objects = CustomUserManager()

    USERNAME_FIELD  = 'email'
    EMAIL_FIELD     = 'email'
    REQUIRED_FIELDS = ['name',]

    def avatar_url(self):
        if self.avatar:
            return f'{settings.WEBSITE_URL}{self.avatar.url}'
        return ''

    class Meta:
        verbose_name = "사용자"
        verbose_name_plural = "사용자 목록"
