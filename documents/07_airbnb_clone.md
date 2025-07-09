## 7강 - 즐겨찾기 페이지 구현 & 실시간 채팅 백엔드 구축

### 1. 즐겨찾기(Favorites) 페이지 추가
- `my-favorites/page.tsx` 생성
- 로그인된 사용자만 접근 가능 (`getUserId()`로 체크)
- 기존 `PropertyList` 재활용, `favorites=true` 파라미터 추가해 필터링
- 백엔드 필터 추가 (`is_favorite` 파라미터에 따라 필터 적용)
- `NavBar`에 "My Favorites" 메뉴 항목 추가

### 2. 채팅 시스템 백엔드 구축

#### (1) Django 앱 생성 및 모델 정의
- `chat` 앱 생성, `INSTALLED_APPS`에 추가
- `Conversation` 모델: 다대다 관계 (users), created/modified 시각 포함
- `ConversationMessage` 모델: 각 메시지 내용, 보낸 사람/받는 사람, 생성 시각 포함

#### (2) 시리얼라이저 작성
- `ConversationListSerializer`, `ConversationDetailSerializer`
- `ConversationMessageSerializer`: sender, receiver는 `UserDetailSerializer` 활용

#### (3) API 구현
- `/api/chat/`: 사용자의 모든 채팅 목록 반환 (GET)
- `/api/chat/<uuid:pk>/`: 특정 채팅 상세 정보 반환 (GET)
- `/api/chat/start/<uuid:user_id>/`: 특정 유저와의 채팅방 시작 (또는 기존 채팅 반환)

#### (4) Django Channels 설정
- `channels`, `daphne` 설치
- `ASGI` 설정 추가 (`asgi.py`, `settings.py`, `channel_layers` 설정 등)
- 토큰 인증 처리용 `TokenAuthMiddleware` 구현
- 웹소켓 라우팅 설정 (`routing.py`)

#### (5) WebSocket Consumer 작성
- `ChatConsumer` 클래스
- connect/disconnect: 방 입장/퇴장 처리
- receive: 메시지 수신 후 group으로 브로드캐스트
- `chat_message`: 메시지를 받은 사용자에게 전송
- 수신 시 DB 저장 처리 포함 (`save_message`)

### 3. 채팅 프론트엔드 연동

#### (1) 채팅 목록 페이지 (Inbox)
- 로그인된 사용자 체크 (`getUserId()`)
- `/api/chat/` 호출해 사용자의 채팅 목록 불러오기
- `Conversation` 컴포넌트 생성
- 상대방 사용자 추출 후 이름, 아바타 출력
- 클릭 시 해당 대화방(`/inbox/<id>`)으로 이동

#### (2) 채팅 상세 페이지 (ConversationDetail)
- `params.id`로 현재 채팅방 ID 가져오기
- `/api/chat/<id>` 호출해 채팅방 정보 및 참여자 정보 가져오기
- WebSocket 연결 (`useWebSocket`) 설정
- 실시간 메시지 전송 (`sendJsonMessage`)
- 실시간 수신 메시지 반영 (append to list)
- 메시지 UI 구현 (왼쪽/오른쪽 정렬, 색상 구분 등)

#### (3) 기존 메시지 로딩
- `/api/chat/<id>` 응답에서 `messages` 배열 포함되도록 수정
- 초기 메시지 `messages` state에 로딩 후 렌더링

### 4. 채팅방 생성 기능 구현
- 상세 페이지의 `ContactButton`에서 채팅 시작
- `/api/chat/start/<landlord_id>` 호출
- 기존 채팅방 있으면 해당 ID 반환, 없으면 새로 생성
- 이후 `/inbox/<id>`로 이동

---

### 완료된 기능 정리
- 즐겨찾기 목록 필터링 & 전용 페이지 구현 완료
- 채팅 모델/시리얼라이저/API/웹소켓 설정 완료
- 실시간 메시지 송수신 및 저장 처리 완료
- 채팅 시작 버튼(호스트와 대화) 구현 완료

