# MyLibrary JSON Viewer 🌐

MyLibrary Management 앱에서 내보낸 JSON 백업 파일을 웹 브라우저에서 볼 수 있는 뷰어입니다.

**🌟 설치 불필요 | 보안 경고 없음 | 모든 플랫폼 지원**

---

## 🚀 빠른 시작

### 방법 1: 온라인에서 바로 사용 (추천) ⭐

**👉 [https://cnst325.github.io/mylibrary-json-viewer/web-version/](https://cnst325.github.io/mylibrary-json-viewer/web-version/)**

1. 위 링크 클릭
2. "📂 Open JSON File" 버튼 클릭
3. MyLibrary 앱에서 백업한 JSON 파일 선택
4. 데이터 확인!

> 💡 모든 데이터는 브라우저 내에서만 처리되며 서버로 전송되지 않습니다.

### 방법 2: 오프라인에서 사용

1. [최신 릴리즈](https://github.com/cnst325/mylibrary-json-viewer/releases/latest)에서 `mylibrary-viewer-web.zip` 다운로드
2. 압축 해제
3. `index.html` 파일을 웹 브라우저로 열기 (더블클릭)

---

## ✨ 주요 기능

- 🌐 **설치 불필요**: 웹 브라우저에서 바로 실행
- 🔒 **개인정보 보호**: 모든 데이터가 브라우저 내에서만 처리
- 🌍 **다국어 지원**: 영어/한국어/일본어/독일어
- 📊 **완전한 데이터 보존**: JSON의 모든 데이터 표시
- 🔍 **검색 및 정렬**: 빠른 데이터 검색 및 정렬
- 📑 **카테고리별 보기**: 소장 자료, 위시리스트, 대출 관리, 대출자, 보관 장소
- 👁️ **상세 보기**: 각 항목의 전체 정보 확인 (독서 기록, 대출 이력 등)
- 💾 **CSV 내보내기**: 엑셀에서 열람 가능한 CSV 형식으로 내보내기
- 🔄 **자동 저장**: 마지막 파일 자동 로드 (7일간 유효)
- 🎨 **모던 UI**: 깔끔하고 사용하기 쉬운 인터페이스
- 💻 **모든 플랫폼**: Windows, Mac, Linux, 모바일 브라우저

---

## 📖 사용 방법

### 1️⃣ JSON 파일 준비

MyLibrary Management 앱에서 "백업 및 복원" → "백업하기"로 JSON 파일 생성

### 2️⃣ 파일 열기

- **온라인**: [웹 뷰어](https://cnst325.github.io/mylibrary-json-viewer/web-version/) 접속
- **오프라인**: 다운로드한 `index.html` 파일 더블클릭

### 3️⃣ 데이터 탐색

- 탭 클릭으로 카테고리 이동
- 검색창에서 제목, 저자, ISBN 등 검색
- 테이블 헤더 클릭으로 정렬
- 행 클릭으로 상세 정보 확인

### 4️⃣ 데이터 내보내기 (선택사항)

- "📊 Export CSV" 버튼으로 엑셀에서 열람 가능한 CSV 파일 생성

---

## 📊 지원 데이터 유형

MyLibrary JSON 파일에 포함된 모든 데이터를 표시합니다:

- **📖 소장 자료**: 제목, 저자, 출판사, ISBN, 카테고리, 보관 장소, 독서 상태, 평점, 메모 등
- **⭐ 위시리스트**: 읽고 싶은 책, 우선순위, 예상 가격
- **📤 대출 관리**: 대출자, 대출일, 반납 예정일, 연체 정보
- **👥 대출자**: 이름, 연락처, 대출 횟수
- **📍 보관 장소**: 위치명, 방, 선반, 설명

---

## 🌐 다국어 지원

시스템 언어를 자동으로 감지하며, 수동으로도 변경 가능합니다.

**지원 언어:**
- 🇰🇷 한국어
- 🇺🇸 English
- 🇯🇵 日本語
- 🇩🇪 Deutsch

---

## 🔐 개인정보 보호

- ✅ 모든 데이터는 브라우저 내에서만 처리
- ✅ 서버로 전송되지 않음
- ✅ 인터넷 연결 없이도 사용 가능 (오프라인 모드)
- ✅ 오픈소스로 투명성 보장

---

## 💻 기술 스택

- 순수 HTML5, CSS3, JavaScript (ES6+)
- 외부 라이브러리 없음
- 브라우저 표준 API만 사용 (File API, localStorage)

---

## 📱 브라우저 호환성

**권장 브라우저:**
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

**최소 화면 크기:** 960px 이상 권장

---

## 🛠️ 개발자 정보

### 로컬 개발 환경

```bash
# 저장소 클론
git clone https://github.com/cnst325/mylibrary-json-viewer.git
cd mylibrary-json-viewer/web-version

# 로컬 서버 실행 (Python)
python3 -m http.server 8000

# 또는 Node.js
npx http-server -p 8000
```

브라우저에서 `http://localhost:8000` 접속

### 프로젝트 구조

```
mylibrary-json-viewer/
└── web-version/
    ├── index.html    # 메인 HTML
    ├── app.js        # 애플리케이션 로직
    ├── styles.css    # 스타일시트
    └── README.md     # 상세 문서
```

---

## 📄 라이센스

MIT License - 자유롭게 사용, 수정, 배포 가능

자세한 내용은 [LICENSE](LICENSE) 참조

---

## 🤝 기여

버그 제보, 기능 제안, Pull Request 환영합니다!

1. Fork the Project
2. Create Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit Changes (`git commit -m 'Add AmazingFeature'`)
4. Push to Branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📞 지원

문제 발생 시 [Issues](https://github.com/cnst325/mylibrary-json-viewer/issues)에 제보해주세요.

---

## 🔗 관련 프로젝트

- **MyLibrary Management** - Android 도서 관리 앱

---

Made with ❤️ for MyLibrary users | © CNST


---

### 🖥️ Electron 데스크톱 앱 버전

독립 실행 파일로 데스크톱 앱처럼 사용하고 싶은 경우

- ✅ **독립 실행**: 브라우저 없이 앱으로 실행
- ✅ **드래그 앤 드롭**: 파일을 앱에 드롭하여 열기
- ⚠️ 코드 서명 없으면 보안 경고 발생
- ⚠️ 플랫폼별 별도 빌드 필요

**[다운로드 및 설치 방법 보기](#-다운로드-및-설치-electron-버전)**

---

## ✨ 공통 특징

- 🌐 **다국어 지원**: 영어/한국어 자동 감지 및 수동 선택
- 📊 **완전한 데이터 보존**: JSON 형식으로 모든 데이터 100% 표시
- 🔍 **검색 및 필터**: 빠른 데이터 검색
- 📑 **카테고리별 보기**: Books, Loans, Borrowers, Wishlist, Locations
- 👁️ **상세 보기**: 각 항목의 전체 정보 확인 (독서 기록, 대출 이력 등)
- 💾 **내보내기**: JSON 및 CSV 형식으로 재내보내기
- 🎨 **모던 UI**: 깔끔하고 사용하기 쉬운 인터페이스

## 📦 다운로드 및 설치 (Electron 버전)

### 🎉 최신 버전 다운로드

**[👉 여기를 클릭하여 최신 버전 다운로드](https://github.com/cnst325/mylibrary-json-viewer/releases/latest)**

### Mac 사용자 (Apple Silicon - M1/M2/M3)

1. **DMG 파일 다운로드 (권장)**
   - [Releases 페이지](https://github.com/cnst325/mylibrary-json-viewer/releases/latest)에서 `.dmg` 파일 다운로드
   - DMG 파일 더블클릭
   - 앱 아이콘을 Applications 폴더로 드래그
   - Launchpad 또는 Applications에서 실행

2. **ZIP 파일 다운로드 (대안)**
   - [Releases 페이지](https://github.com/cnst325/mylibrary-json-viewer/releases/latest)에서 `.zip` 파일 다운로드
   - 압축 해제 후 .app 파일 실행

**보안 설정 (Mac):**

이 앱은 Apple Developer로 코드 서명되어 있습니다. 처음 실행 시:

1. **앱을 우클릭 (또는 Control + 클릭)**하여 **"열기"** 선택
2. 확인 팝업에서 **"열기"** 클릭

또는 더블클릭 후 보안 경고가 나오면:
- 시스템 설정 → 개인정보 보호 및 보안 → **"확인 없이 열기"** 클릭

> 💡 **앱이 코드 서명되어 있어서** 위 방법으로 안전하게 실행할 수 있습니다.

### Windows 사용자

🔜 **Windows용 실행 파일은 준비 중입니다.**

Windows 실행 파일(.exe)을 직접 빌드하려면 [BUILD.md](BUILD.md)를 참조하세요.

## 🚀 사용 방법

### 빌드된 앱 실행

1. 다운로드한 앱 실행
2. "Open JSON File" 버튼 클릭
3. MyLibrary Management에서 백업한 JSON 파일 선택
4. 데이터 탐색, 검색, 상세 보기

### JSON 파일 형식

MyLibrary Management 앱에서 "백업 및 복원" 기능을 사용하여 JSON 파일을 생성하세요.

**포함된 데이터:**
- **Books**: 책 정보 (제목, 저자, ISBN, 카테고리, 독서 상태, 읽기 시작일, 완료일, 감상 등)
- **Loans**: 대출 기록 (대출자, 대출일, 반납일, 상태)
- **Borrowers**: 대출자 정보 (이름, 연락처)
- **Wishlist**: 위시리스트 (읽고 싶은 책, 우선순위)
- **Locations**: 보관 장소 (위치명, 설명)

## 🛠️ 개발자용

### 요구사항

- Node.js 18 이상
- npm 9 이상

### 설치

```bash
npm install
```

### 개발 모드 실행

```bash
npm start
```

개발자 도구와 함께 실행:

```bash
npm run dev
```

### 독립 실행 파일 빌드

**Mac용 빌드:**
```bash
npm run build:mac
```

**Windows용 빌드 (Windows PC에서):**
```bash
npm run build:win
```

**모든 플랫폼 빌드:**
```bash
npm run build:all
```

빌드 결과물은 `dist/` 폴더에 생성됩니다.

자세한 빌드 가이드는 [BUILD.md](BUILD.md)를 참조하세요.

## 📁 프로젝트 구조

```
mylibrary-json-viewer/
├── src/
│   ├── main.js       # Electron 메인 프로세스
│   ├── preload.js    # Preload 스크립트 (보안 브릿지)
│   ├── app.js        # 앱 로직 (렌더러 프로세스)
│   ├── index.html    # UI 구조
│   └── styles.css    # 스타일
├── assets/           # 앱 아이콘
├── dist/             # 빌드 결과물 (gitignore)
├── package.json      # 프로젝트 설정 및 의존성
├── BUILD.md          # 빌드 가이드
├── DISTRIBUTION.md   # 배포 가이드
└── README.md         # 이 파일
```

## 🌐 다국어 지원

앱은 시스템 언어를 자동으로 감지하여 한국어 또는 영어로 표시됩니다.
언어 선택기를 사용하여 수동으로 변경할 수도 있습니다.

**지원 언어:**
- 🇰🇷 한국어
- 🇺🇸 English

## 📄 라이센스

MIT License - 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 🤝 기여

버그 제보, 기능 제안, Pull Request를 환영합니다!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 문의 및 지원

문제가 발생하거나 제안 사항이 있으면 [Issues](https://github.com/cnst325/mylibrary-json-viewer/issues)에서 제보해주세요.

## 🔗 관련 프로젝트

- **MyLibrary Management** - Android 앱 (원본 프로젝트)

---

Made with ❤️ for MyLibrary users
