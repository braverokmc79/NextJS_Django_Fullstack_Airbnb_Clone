## 9강 - 프로젝트 배포 (Docker, DigitalOcean, Nginx)

### 1. GitHub에 프론트엔드 & 백엔드 저장소 생성
- `django-bnb-frontend`, `django-bnb-backend` 두 개의 저장소 생성
- 로컬에서 각 프로젝트 폴더를 `git init`, `add`, `commit`, `push` 진행
- 접근 토큰(Token)을 생성해 비밀번호 대신 사용 (Settings > Developer Settings > Personal Access Tokens)

### 2. DigitalOcean Droplet 서버 생성
- Ubuntu 22.04 (LTS) 선택
- 최소 스펙 (1vCPU, 1GB RAM)으로 시작 가능
- 패스워드 로그인 방식으로 SSH 접근 설정
- 서버 생성 후 IP 확인 → SSH로 접속

### 3. 기본 시스템 업데이트 & Docker 설치
```bash
sudo apt update && sudo apt upgrade
sudo apt install docker.io docker-compose nginx
```

### 4. 백엔드 Docker 배포 환경 구성
- `docker-compose.prod.yml` 생성
  - 서비스 구성: `web`, `daphne`, `nginx`
  - `gunicorn`, `daphne`, `nginx` 각각 도커 서비스로 구성
  - `.env` 파일로 환경변수 분리
- `nginx` 설정 파일 작성 (`nginx.conf`) → Django 요청과 WebSocket 요청 분리 처리
- `Dockerfile` 별도 작성 (`nginx/Dockerfile`, `web`, `daphne`에 빌드 방식 지정)
- Django `settings.py` 수정
  - `ALLOWED_HOSTS`, `CSRF_TRUSTED_ORIGINS`, `MEDIA_URL` 등 설정
  - `.env` 로부터 설정 읽도록 `.env` + `python-dotenv` 설치 & 적용

### 5. 배포 빌드 및 실행
```bash
docker-compose -f docker-compose.prod.yml up --build -d
```
- 이후 IP 접속 → Django 서버 작동 확인
- `media/` 파일이 로드되지 않으면 Docker 볼륨 설정 추가 (host ↔ container 경로 연결)

### 6. 프론트엔드 배포 (Next.js)
- `.env.prod` 파일 생성: 백엔드 API 주소, WebSocket 주소 설정
- `next.config.js`에 이미지 주소 설정 (`images: { domains: ['서버 IP'] }`)
- 엔진엑스 설정 (`/etc/nginx/sites-available/frontend`) 작성
  - 포트 80에서 Next.js 프록시 설정 (`localhost:3000`)
- 빌드 및 실행
```bash
npm install
npm run build
npm start
```
- `pm2`를 이용한 백그라운드 실행 권장
```bash
npm install -g pm2
pm2 start npm --name "django-bnb" -- start
```

### 7. 배포 후 문제 해결
- ✅ 쿠키 저장 문제: HTTPS 환경에서만 작동되는 `secure` 설정을 개발용으로 `false` 설정
- ✅ 이미지 미표시: Nginx `location /media` 경로 설정 및 Docker volume 경로 수정으로 해결
- ✅ CSRF 오류: `CSRF_TRUSTED_ORIGINS` 설정 누락으로 발생 → 설정 추가
- ✅ scrollTop 타입 오류: `ref` 타입 명시 (`HTMLDivElement`)하여 해결

### 8. Django Admin CSS 안나오는 문제
- `STATIC_URL`과 static 파일 관련 설정을 production에 맞게 별도 설정 필요 (다음 강의에서 다룰 예정)

---

### 완료된 작업 정리
- ✅ Django 백엔드 Docker 기반 배포 완료
- ✅ Daphne(WebSocket) 포함한 ASGI 환경 구성 완료
- ✅ Frontend Next.js 빌드 및 pm2로 실행 완료
- ✅ 이미지/media 파일 표시 정상화
- ✅ 도메인 없이 IP 기반으로 개발 서버 운영 가능

