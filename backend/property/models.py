import uuid 
from django.conf import settings
from django.db import models
from useraccount.models import User


class Property(models.Model):
    id              = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, verbose_name="ID")
    title           = models.CharField(max_length=255,       verbose_name="숙소 제목")
    description     = models.TextField(verbose_name="숙소 설명")
    price_per_night = models.IntegerField(verbose_name="1박당 가격")
    bedrooms        = models.IntegerField(verbose_name="침실 수")
    bathrooms       = models.IntegerField(verbose_name="욕실 수")
    guests          = models.IntegerField(verbose_name="최대 투숙 인원")
    country         = models.CharField(max_length=255,       verbose_name="국가명")
    country_code    = models.CharField(max_length=10,        verbose_name="국가 코드")
    category        = models.CharField(max_length=255,       verbose_name="숙소 유형")
    favorited       = models.ManyToManyField(User, related_name='favorites', blank=True, verbose_name="찜한 사용자")
   
   
    image           = models.ImageField(upload_to='uploads/properties', verbose_name="대표 이미지")
    landlord        = models.ForeignKey(User, related_name='properties', on_delete=models.CASCADE, verbose_name="호스트")
    created_at      = models.DateTimeField(auto_now_add=True, verbose_name="등록일")

    def image_url(self):
        return f'{settings.WEBSITE_URL}{self.image.url}'

    class Meta:
        verbose_name = "Property(숙소)"
        verbose_name_plural = "Properties(숙소목록)"


class Reservation(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, verbose_name="ID")
    property = models.ForeignKey(Property, related_name='reservations', on_delete=models.CASCADE, verbose_name="예약한 숙소")
    start_date = models.DateField(verbose_name="체크인 날짜")
    end_date = models.DateField(verbose_name="체크아웃 날짜")
    number_of_nights = models.IntegerField(verbose_name="숙박 일수")
    guests = models.IntegerField(verbose_name="투숙 인원")
    total_price = models.FloatField(verbose_name="총 예약 금액")
    created_by = models.ForeignKey(User, related_name='reservations', on_delete=models.CASCADE, verbose_name="예약자")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="예약 생성일")

    def __str__(self):
        return f"{self.property.title} - {self.created_by.email} ({self.start_date} ~ {self.end_date})"

    class Meta:
        verbose_name = "Reservation(예약)"
        verbose_name_plural = "Reservations(예약 목록)"

    