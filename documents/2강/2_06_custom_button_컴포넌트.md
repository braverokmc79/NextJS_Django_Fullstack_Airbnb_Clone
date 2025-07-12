### 🧱 6. CustomButton 컴포넌트

- 재사용 가능한 커스텀 버튼 컴포넌트입니다.
- 주요 특징은 다음과 같습니다:
  - `label`: 버튼에 표시할 텍스트
  - `className`: Tailwind 스타일을 추가로 조합할 수 있음
  - `onClick`: 클릭 이벤트 핸들러

---

### ✅ CustomButton.tsx 전체 코드
```tsx
import React from 'react'

interface CustomButtonProps {
    label: string;
    className?: string
    onClick?: () => void
}

const CustomButton:React.FC<CustomButtonProps> = ({label, className, onClick}) => {
  return (
    <div
        onClick={onClick}
        className={`w-full py-4 bg-airbnb hover:bg-airbnb-dark text-white text-center rounded-xl transition cursor-pointer ${className}`}>      
      {label}
    </div>
  )
}

export default CustomButton;
```

---

### 💡 설명
- `div` 태그를 사용하여 버튼 스타일을 지정했으며, `onClick`으로 클릭 기능을 제공합니다.
- Tailwind CSS의 `bg-airbnb`, `hover:bg-airbnb-dark`, `rounded-xl`, `transition` 등을 통해 일관된 디자인을 유지합니다.
- 다양한 위치에서 스타일을 확장할 수 있도록 `className` prop을 병합했습니다.

---

### ✅ 예시 사용법
```tsx
<CustomButton
  label="전송"
  onClick={() => console.log('클릭됨')}
  className="w-[100px]"
/>
```

위와 같이 사용하면, 너비 100px의 버튼이 생성되며 클릭 시 로그가 출력됩니다.

