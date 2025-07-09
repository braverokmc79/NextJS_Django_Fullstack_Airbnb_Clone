## 2강. 호스트 상세 페이지 및 예약, 채팅 UI 구현 (static)

이번  **호스트 상세 페이지(landlord page)**, **예약 내역 페이지(My Reservations)**, **내 숙소 페이지(My Properties)**, **채팅 인박스(Inbox)**, **채팅 상세 페이지**, 그리고 **로그인/회원가입 모달창 및 재사용 가능한 Modal 컴포넌트**까지 전체적인 UI를 구현합니다.

---

### 1. 호스트 상세 페이지 구성
- `app/landlords/[id]/page.tsx` 생성 (동적 라우팅)
- 좌측: 프로필 이미지, 이름, Contact 버튼
- 우측: 해당 호스트의 숙소 리스트 출력 (PropertyList 컴포넌트 재사용)
- 모바일 반응형 대응 (Grid col-span 조정)
- `ContactButton.tsx` 컴포넌트 생성 → 추후 호스트에게 메시지 보내는 기능 연결 예정

---

### 2. 예약 내역 페이지 (My Reservations)
- `app/my-reservations/page.tsx` 생성
- 상단 타이틀: "My Reservations"
- 예약 항목 UI 구성:
  - 숙소 이미지
  - 숙소 이름
  - 체크인/체크아웃 날짜
  - 숙박일수 및 총 가격
  - "Go to Property" 버튼 추가
- 모바일 대응 (Grid col-span 1 → 4 조정)

---

### 3. 내 숙소 페이지 (My Properties)
- `app/my-properties/page.tsx` 생성
- `PropertyList` 컴포넌트 재사용해 내 숙소 목록 출력
- 이후 로그인된 사용자 ID 기반으로 본인 숙소만 출력 예정

---

### 4. 채팅 인박스 페이지 (Inbox)
- `app/inbox/page.tsx` 생성
- 각 대화 항목은 `components/inbox/Conversation.tsx` 컴포넌트로 분리
- 항목마다:
  - 상대방 이름
  - "Go to conversation" 텍스트
  - Hover 효과 및 클릭 가능하게 처리

---

### 5. 채팅 상세 페이지 (Conversation Detail)
- `app/inbox/[id]/page.tsx` 생성
- 컴포넌트 분리: `ConversationDetail.tsx`
- 메시지 레이아웃 구성:
  - 상대방 메시지: 왼쪽 회색 박스
  - 내 메시지: 오른쪽 파란 박스
  - 하단에 메시지 입력창 + 전송 버튼
- `CustomButton` 컴포넌트 생성 및 재사용
- 모바일 반응형 대응 완료

---

### 6. 사용자 메뉴(User Menu) 팝업
- 사용자 아이콘 클릭 시 메뉴 팝업 표시
- `MenuLink` 컴포넌트 생성
  - label 및 onClick 전달받아 로그인/회원가입 버튼 구성
- 클릭 시 Login/Signup 모달 오픈되도록 상태 관리 추가

---

### 7. 재사용 가능한 모달창 컴포넌트 생성
- `components/models/Modal.tsx` 생성
- Tailwind로 가운데 위치한 모달창 디자인
- props:
  - `isOpen` (boolean): 열기 여부
  - `onClose`: 닫기 이벤트
  - `label`: 제목 텍스트
  - `content`: 내부 컨텐츠 JSX 요소
- open/close 시 트랜지션 효과 적용 (opacity, translateY)
- 외부 클릭 시 `null` 반환 처리 및 애니메이션 동작

---

### 8. 로그인/회원가입 모달창 구현

#### (1) Zustand를 이용한 상태 관리
- `hooks/useLoginModal.ts`, `hooks/useSignupModal.ts` 생성
- 전역 상태에서 열기/닫기 제어: `isOpen`, `open()`, `close()`

#### (2) `LoginModal.tsx` / `SignupModal.tsx` 생성
- 모달 내부 UI:
  - 이메일 / 비밀번호 입력 필드
  - (회원가입은 비밀번호 확인 필드도 있음)
  - `CustomButton` 사용하여 제출 버튼 구성
  - 에러 메시지 영역도 추가

#### (3) 모달 연동
- 로그인/회원가입 버튼 클릭 시 각 모달창 열림
- 닫기 버튼 작동 확인

---

