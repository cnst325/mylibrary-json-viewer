# MyLibrary JSON Viewer

MyLibrary Management 앱에서 내보낸 JSON 백업 파일을 PC/Mac에서 볼 수 있는 크로스 플랫폼 데스크톱 애플리케이션입니다.

## ✨ 특징

- 🖥️ **크로스 플랫폼**: Windows, macOS, Linux 지원
- 📱 **독립 실행 파일**: 설치 없이 바로 실행 가능 (DMG, EXE)
- 🌐 **다국어 지원**: 영어/한국어 자동 감지 및 수동 선택
- 📊 **완전한 데이터 보존**: JSON 형식으로 모든 데이터 100% 표시
- 🔍 **검색 및 필터**: 빠른 데이터 검색
- 📑 **카테고리별 보기**: Books, Loans, Borrowers, Wishlist, Locations
- 👁️ **상세 보기**: 각 항목의 전체 정보 확인 (독서 기록, 대출 이력 등)
- 💾 **내보내기**: JSON 및 CSV 형식으로 재내보내기
- 🎨 **모던 UI**: 깔끔하고 사용하기 쉬운 인터페이스

## �� 다운로드 및 설치

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

**처음 실행 시 보안 경고:**
- "확인되지 않은 개발자" 메시지가 나오면:
- 시스템 설정 → 개인정보 보호 및 보안 → "확인 없이 열기" 클릭

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
