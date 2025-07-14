# Docker Compose 명령어: `docker-compose up -d` 완전 정복

## ✅ 명령어 설명

```bash
docker-compose up -d
```

### 📌 구성 요소

* `docker-compose` : 여러 Docker 컨테이너(서비스)를 한꺼번에 관리할 수 있는 도구
* `up` : 컨테이너를 **생성하고 실행**하라는 명령어
* `-d` : **detached mode (백그라운드 실행)**. 터미널을 점유하지 않음

---

## 🔄 실행 흐름

`docker-compose.yml` 파일에 정의된 서비스 기준으로 다음 작업을 자동으로 수행합니다:

1. 필요한 이미지 빌드 또는 Pull
2. 컨테이너 생성
3. 네트워크 및 볼륨 설정
4. 서비스 실행 (백그라운드)

---

## 📦 사용 예시

### `docker-compose.yml` 예:

```yaml
version: '3'
services:
  web:
    image: nginx
    ports:
      - "80:80"
  redis:
    image: redis
```

### 실행 명령:

```bash
docker-compose up -d
```

### 결과:

* `nginx`와 `redis` 컨테이너가 **백그라운드**에서 실행됨
* 터미널은 다시 사용 가능

---

## 🛠 자주 사용하는 명령어

| 명령어                         | 설명                     |
| --------------------------- | ---------------------- |
| `docker-compose down`       | 실행 중인 컨테이너를 중지하고 제거    |
| `docker-compose ps`         | 실행 중인 컨테이너 목록 확인       |
| `docker-compose logs`       | 전체 서비스 로그 확인           |
| `docker-compose logs -f`    | 실시간 로그 스트리밍 보기         |
| `docker-compose build`      | Dockerfile 기반 이미지 빌드   |
| `docker-compose up --build` | 캐시 무시하고 강제로 새로 빌드 후 실행 |
| `docker-compose stop`       | 컨테이너 정지                |
| `docker-compose restart`    | 컨테이너 재시작               |

---

## 🧹 캐시 삭제 후 강제 빌드

이미지가 캐시에 남아 문제가 발생할 경우 아래 명령어로 **강제 빌드**할 수 있습니다:

```bash
docker-compose down --volumes --remove-orphans
docker-compose build --no-cache
docker-compose up -d
```

설명:

* `--volumes` : 연결된 볼륨도 삭제 (주의!)
* `--remove-orphans` : `yml`에서 제거된 컨테이너도 삭제
* `--no-cache` : Dockerfile 캐시 무시하고 강제로 새 빌드

---

## 🧠 참고 팁

* `docker-compose.yml`은 현재 디렉토리에 있어야 인식됩니다.
* `-f` 옵션을 통해 다른 파일 지정도 가능합니다:

```bash
docker-compose -f custom-compose.yml up -d
```

---

## 📚 마무리

`docker-compose up -d`는 복잡한 서비스 구성을 손쉽게 백그라운드로 실행할 수 있어 **개발, 테스트, 배포** 환경에서 필수 명령어입니다. 익숙해지면 Docker 활용도가 크게 높아집니다!
