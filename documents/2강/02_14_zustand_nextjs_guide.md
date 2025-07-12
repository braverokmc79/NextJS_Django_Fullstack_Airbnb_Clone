## 🧠 Zustand를 Next.js에서 전역 상태로 사용하는 방법

Zustand는 **Next.js(넥스트 프레임워크)에서 전역 상태 관리**를 매우 간단하게 해주는 경량 라이브러리입니다. Redux보다 가볍고 코드가 간결하며, SSR에도 부담이 없습니다.

(예: 테마, 사용자 정보, 장바구니 등)도 zustand로 확장
 
한 번 제대로 세팅해두면 페이지 이동, 서버사이드랑도 깔끔하게 연동

---

### ✅ Zustand의 장점 요약

| 장점 | 설명 |
|------|------|
| **간단한 문법** | Redux에 비해 훨씬 간단한 API |
| **전역 상태 공유** | 컴포넌트, 페이지, 레이아웃 전반에서 상태 공유 가능 |
| **빠른 성능** | 불필요한 렌더링을 최소화함 |
| **TypeScript 친화적** | interface로 타입 안전하게 작성 가능 |
| **미들웨어 지원** | `persist`, `devtools` 등 확장 가능 |

---

### 🏗️ Zustand 전역 상태 생성 예시 (로그인 모달 상태 관리)

```ts
// hooks/useLoginModal.ts
import { create } from "zustand";

interface LoginModalStore {
  isOpen: boolean;
  onOpen: () => void;
  close: () => void;
}

const useLoginModal = create<LoginModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));

export default useLoginModal;
```

---

### 🔻 Next.js 어디서든 사용 가능

```tsx
// pages/index.tsx
import useLoginModal from '@/hooks/useLoginModal';

export default function HomePage() {
  const { onOpen } = useLoginModal();
  return <button onClick={onOpen}>로그인 열기</button>;
}
```

```tsx
// components/LoginModal.tsx
import useLoginModal from '@/hooks/useLoginModal';

const LoginModal = () => {
  const { isOpen, close } = useLoginModal();
  return isOpen ? <div onClick={close}>모달입니다</div> : null;
};
```

✅ 이렇게 하면 **Next.js 앱 전체에서 로그인 모달 상태를 공유**할 수 있습니다.

---

### ⚠️ 서버 컴포넌트에서의 사용 주의

Zustand는 **클라이언트 전용** 상태 관리 도구입니다.

| 사용 위치 | 가능 여부 | 설명 |
|------------|-----------|--------|
| 클라이언트 컴포넌트 | ✅ | 완벽하게 사용 가능 |
| 페이지 간 전역 상태 | ✅ | 문제 없음 |
| 서버 컴포넌트 | ❌ | 직접 사용 불가 (props로 우회 가능) |
| getServerSideProps/getStaticProps | ❌ | Zustand 상태와 무관 |

---

### 📦 확장 가능 기능

- `persist` → 로컬 스토리지에 상태 저장
- `devtools` → 개발자 도구에서 상태 추적 가능
- `selector` → 성능 최적화

---

필요하다면 로그인 상태, 테마 설정, 장바구니, 사용자 인터랙션 등도 zustand로 손쉽게 전역 상태 관리할 수 있습니다.

