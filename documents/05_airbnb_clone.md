### 📘 Next.js & Django Airbnb Clone - 5강 

이번은 프론트엔드에서 **숙소 등록(Add Property)** 기능을 추가하고, Django 백엔드와 연동하여 데이터를 저장하는 과정을 빠르게 구현합니다.

---

## 🏠 Add Property 모달 컴포넌트 구현

1. **AddPropertyModal.tsx 생성**

```tsx
"use client";
import { useState } from "react";
import useAddPropertyModal from "../hooks/useAddPropertyModal";
import CustomButton from "../components/CustomButton";
import Categories from "../components/add-property/Categories";
import APIService from "../services/apiService";
import { useRouter } from "next/navigation";

const AddPropertyModal = () => {
  const router = useRouter();
  const addPropertyModal = useAddPropertyModal();

  const [step, setStep] = useState(1);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = async () => {
    if (!title || !description || !price || !category || !image) {
      setErrors(["모든 필드를 입력하세요."]);
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("image", image);

    const response = await APIService.post("/api/properties/create/", formData);

    if (response.success) {
      addPropertyModal.close();
      router.refresh();
    } else {
      setErrors(response.errors || ["숙소 등록 실패"]);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold">숙소 등록</h2>
      {step === 1 && (
        <Categories selected={category} onSelect={setCategory} />
      )}
      {step === 2 && (
        <div>
          <input
            type="text"
            placeholder="숙소 제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input"
          />
          <textarea
            placeholder="숙소 설명"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="textarea"
          ></textarea>
        </div>
      )}
      {step === 3 && (
        <input
          type="number"
          placeholder="1박 요금"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="input"
        />
      )}
      {step === 4 && (
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="input"
        />
      )}

      <div className="flex justify-between mt-4">
        {step > 1 && (
          <CustomButton label="이전" onClick={() => setStep(step - 1)} />
        )}
        {step < 4 ? (
          <CustomButton label="다음" onClick={() => setStep(step + 1)} />
        ) : (
          <CustomButton label="등록" onClick={handleSubmit} />
        )}
      </div>

      {errors.map((err, idx) => (
        <p key={idx} className="text-red-500 mt-2">{err}</p>
      ))}
    </div>
  );
};

export default AddPropertyModal;
```

---

## 🗂️ Hooks: useAddPropertyModal 생성

```ts
import { create } from "zustand";

type AddPropertyModalStore = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const useAddPropertyModal = create<AddPropertyModalStore>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));

export default useAddPropertyModal;
```

---

## 🔗 Django API: 숙소 등록 엔드포인트

1. **views.py 추가**

```python
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Property
from .serializers import PropertySerializer

class CreatePropertyView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = PropertySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(owner=request.user)
            return Response({"success": True})
        return Response({"success": False, "errors": serializer.errors}, status=400)
```

2. **urls.py 등록**

```python
from django.urls import path
from .views import CreatePropertyView

urlpatterns = [
    path("api/properties/create/", CreatePropertyView.as_view(), name="create-property")
]
```

---

