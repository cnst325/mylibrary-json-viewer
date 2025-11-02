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

## � 다운로드 및 설치

### Mac 사용자

**다운로드 위치:** `dist/` 폴더

1. **DMG 파일 사용 (권장)**
   - `MyLibrary JSON Viewer-1.0.0-arm64.dmg` (91MB) 다운로드
   - DMG 파일 더블클릭
   - 앱 아이콘을 Applications 폴더로 드래그
   - Launchpad 또는 Applications에서 실행

2. **ZIP 파일 사용**
   - `MyLibrary JSON Viewer-1.0.0-arm64-mac.zip` (87MB) 다운로드
   - 압축 해제 후 .app 파일 실행

**처음 실행 시 보안 경고:**
- "확인되지 않은 개발자" 메시지가 나오면:
- 시스템 설정 > 개인정보 보호 및 보안 > "확인 없이 열기" 클릭

### Windows 사용자

Windows 실행 파일(.exe)을 생성하려면 Windows PC에서 빌드해야 합니다.
자세한 내용은 [BUILD.md](BUILD.md) 참조.

## 🚀 사용 방법

### 빌드된 앱 실행

1. 다운로드한 앱 실행
2. "Open JSON File" 버튼 클릭
3. MyLibrary Management에서 백업한 JSON 파일 선택
4. 데이터 탐색, 검색, 상세 보기

### 개발 모드 실행

1. 의존성 설치:
```bash
cd csv-viewer
npm install
```

2. 앱 실행:
```bash
npm start
```

또는 개발자 도구와 함께 실행:
```bash
npm run dev
```

## 📦 빌드 (실행 파일 생성)

### macOS용 빌드
```bash
npm run build:mac
```
생성 위치: `dist/MyLibrary JSON Viewer.dmg`

### Windows용 빌드
```bash
npm run build:win
```
생성 위치: `dist/MyLibrary JSON Viewer Setup.exe`

### 모든 플랫폼 빌드
```bash
npm run build:all
```

## 📖 사용 방법

1. 앱 실행
2. "JSON 파일 열기" 버튼 클릭
3. MyLibrary 앱에서 내보낸 `.json` 파일 선택
4. 데이터가 탭별로 표시됨:
   - **소장 자료**: 모든 책 목록
   - **대출 관리**: 대출 기록
   - **대출자**: 대출자 정보
   - **위시리스트**: 구매 예정 목록
   - **소장 위치**: 책 보관 위치
5. 검색 바에서 원하는 내용 검색
6. 행을 클릭하면 상세 정보 팝업

## 🔧 기술 스택

- **Electron**: 데스크톱 앱 프레임워크
- **HTML/CSS/JavaScript**: UI 구현
- **Node.js**: 파일 처리

## 📝 데이터 형식

MyLibrary 앱의 JSON 백업 형식:
```json
{
  "books": [...],
  "loans": [...],
  "borrowers": [...],
  "wishlist": [...],
  "locations": [...]
}
```

## 🐛 문제 해결

### macOS에서 앱이 열리지 않는 경우
```bash
sudo xattr -r -d com.apple.quarantine "MyLibrary JSON Viewer.app"
```

### Windows에서 보안 경고가 뜨는 경우
"추가 정보" → "실행" 클릭

## 📄 라이센스

MIT License

## 👨‍💻 개발자

MyLibrary Management Team
