### 📘 Next.js & Django Airbnb Clone - 6강 초안 (빠른 속도 중심)

이번은 **숙소 예약(Booking)** 기능을 구현하고, 이미 예약된 날짜 비활성화 처리와 호스트 페이지, 즐겨찾기 기능까지 빠르게 추가합니다.

---

## 📅 Django: Reservation 모델 생성

1. **models.py 수정**

```python
from django.db import models
from django.conf import settings

class Reservation(models.Model):
    property = models.ForeignKey("Property", on_delete=models.CASCADE, related_name="reservations")
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="reservations")
    start_date = models.DateField()
    end_date = models.DateField()
    nights = models.IntegerField()
    guests = models.IntegerField()
    total_price = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.property.title} 예약 ({self.start_date} ~ {self.end_date})"
```

2. **마이그레이션 적용**

```bash
python manage.py makemigrations
python manage.py migrate
```

---

## 🔗 Django: 예약 API 엔드포인트 추가

1. **views.py에 예약 API 추가**

```python
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Property, Reservation

class BookPropertyView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        data = request.data
        property_obj = Property.objects.get(pk=pk)
        Reservation.objects.create(
            property=property_obj,
            created_by=request.user,
            start_date=data.get("start_date"),
            end_date=data.get("end_date"),
            nights=data.get("nights"),
            guests=data.get("guests"),
            total_price=data.get("total_price")
        )
        return Response({"success": True})
```

2. **urls.py 등록**

```python
from django.urls import path
from .views import BookPropertyView

urlpatterns = [
    path("api/properties/<int:pk>/book/", BookPropertyView.as_view(), name="book-property"),
]
```

---

## 🗂️ React: 예약 사이드바 및 캘린더

1. **ReservationSidebar.tsx**

```tsx
import { useState, useEffect } from "react";
import DateRangePicker from "react-date-range";
import APIService from "../services/apiService";
import { format } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const ReservationSidebar = ({ property, userId }: any) => {
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection"
  });
  const [guests, setGuests] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const nights = (dateRange.endDate.getTime() - dateRange.startDate.getTime()) / (1000 * 60 * 60 * 24);
    const price = property.price * nights;
    setTotalPrice(price);
  }, [dateRange, property.price]);

  const handleBooking = async () => {
    const response = await APIService.post(`/api/properties/${property.id}/book/`, {
      start_date: format(dateRange.startDate, "yyyy-MM-dd"),
      end_date: format(dateRange.endDate, "yyyy-MM-dd"),
      nights: (dateRange.endDate.getTime() - dateRange.startDate.getTime()) / (1000 * 60 * 60 * 24),
      guests,
      total_price: totalPrice
    });

    if (response.success) alert("예약 완료!");
  };

  return (
    <div>
      <DateRangePicker
        ranges={[dateRange]}
        onChange={(item) => setDateRange(item.selection)}
        minDate={new Date()}
      />
      <input type="number" value={guests} onChange={(e) => setGuests(parseInt(e.target.value))} />
      <p>총 가격: ${totalPrice}</p>
      <button onClick={handleBooking}>예약하기</button>
    </div>
  );
};

export default ReservationSidebar;
```

---

## ❤️ 즐겨찾기 기능 추가

1. **models.py에 다대다 필드 추가**

```python
favorited_by = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name="favorites", blank=True)
```

2. **API 엔드포인트 생성**

```python
class ToggleFavoriteView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        property_obj = Property.objects.get(pk=pk)
        if request.user in property_obj.favorited_by.all():
            property_obj.favorited_by.remove(request.user)
            return Response({"is_favorite": False})
        else:
            property_obj.favorited_by.add(request.user)
            return Response({"is_favorite": True})
```

3. **urls.py 등록**

```python
path("api/properties/<int:pk>/favorite/", ToggleFavoriteView.as_view(), name="toggle-favorite")
```

4. **FavoriteButton.tsx**

```tsx
const FavoriteButton = ({ propertyId, isFavorite, onToggle }: any) => (
  <button
    className={`heart-button ${isFavorite ? "active" : ""}`}
    onClick={() => onToggle(propertyId)}
  >
    ❤️
  </button>
);

export default FavoriteButton;
```

---
