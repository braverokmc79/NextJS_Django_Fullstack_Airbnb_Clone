## 8강 - 검색 필터 구현 및 검색 기능 완성

### 1. 프론트엔드: 검색 모달 및 상태 관리
- `useSearchModal.ts` 생성: 검색 조건(국가, 날짜, 인원수, 카테고리 등) 저장하는 Zustand 훅 정의
- `SearchModal.tsx` 생성
  - 다단계 UI (위치 → 체크인 날짜 → 체크아웃 날짜 → 상세정보 → 검색)
  - `SelectCountry`, `DatePicker`, `Input` 컴포넌트 조합 사용
  - 단계(step) 별로 UI를 조건 분기해 렌더링
  - 마지막 단계에서 `closeAndSearch()` 호출로 상태 저장 및 모달 닫기

### 2. 검색 조건 전달: searchModel.query 활용
- 최종 조건 정리:
  ```ts
  const newSearchQuery: SearchQuery = {
    country: country?.label,
    checkin: dateRange?.startDate,
    checkout: dateRange?.endDate,
    guests: parseInt(numGuests),
    bedrooms: parseInt(numBedrooms),
    bathrooms: parseInt(numBathrooms),
    category: ''
  }
  ```
- `searchModel.setQuery(newSearchQuery)`로 전역 상태에 저장

### 3. 백엔드 필터링 구현 (Django DRF)
- `api.py` > `property_list` 함수 내:
  - GET 파라미터 처리: country, checkin, checkout, guests, bedrooms, bathrooms, category
  - 체크인/체크아웃은 예약 날짜와 겹치는 property 제외:
    ```python
    if checkin and checkout:
        exact_matches = Reservation.objects.filter(start_date=checkin) | Reservation.objects.filter(end_date=checkout)
        overlap_matches = Reservation.objects.filter(start_date__lte=checkout, end_date__gte=checkin)
        all_matches = [r.property_id for r in exact_matches | overlap_matches]
        properties = properties.exclude(id__in=all_matches)
    ```
  - 나머지는 `gte` 또는 `exact match` 방식으로 필터링

### 4. 프론트엔드 요청 URL 생성
- `propertyList.tsx`에서 상태를 바탕으로 URL 생성
  ```ts
  if (searchModel.query) {
    let urlQuery = ''
    if (country) urlQuery += `&country=${country}`
    if (checkin) urlQuery += `&checkin=${format(checkin, 'yyyy-MM-dd')}`
    ...
    urlQuery = '?' + urlQuery.substring(1)
  }
  ```
- URL이 바뀌면 `getProperties()` 다시 호출되도록 `useEffect`의 deps에 `searchModel.query` 추가

### 5. 카테고리 필터링 기능 추가
- `Categories.tsx`에서 클릭 시 `searchModel.setQuery()` 호출되도록 처리
- 선택된 카테고리에 따라 스타일 강조 (border-black)
- "All" 카테고리 추가해 초기화 기능 제공

### 6. Property 추가 후 리스트 자동 새로고침
- `AddPropertyModal.tsx`에서 등록 후 `/added=true` 쿼리 추가로 트리거 유도
- `propertyList.tsx`의 `useEffect`에서 `useSearchParams()` 사용해 새로고침 감지

### 7. 토큰 자동 갱신(Refresh Token) 처리
- `handleRefresh()` 구현:
  - Refresh Token 존재 시 `/api/token/refresh/` 엔드포인트로 요청
  - 새 Access Token 발급받아 상태 갱신
- 기존 `getAccessToken()` 로직에 통합해 자동 재발급
- Django URL에 `token/refresh/` 라우트 추가

---

### 완료된 작업
- ✅ 검색 모달 단계별 구성 (국가, 날짜, 인원수 등)
- ✅ 필터 전역 상태 저장 및 전송
- ✅ 백엔드 필터 기능 완성
- ✅ 카테고리 필터 UI/로직
- ✅ 등록 후 리스트 자동 새로고침
- ✅ 토큰 갱신 로직 통합 완료

