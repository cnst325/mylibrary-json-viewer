# MyLibrary JSON Viewer - Web Browser Version 🌐

**완전히 브라우저 기반으로 동작하는 버전 - 설치 불필요!**

## ✨ 특징

- 🌐 **순수 웹 브라우저 실행** - 설치 없이 바로 사용
- 🔒 **개인정보 보호** - 모든 데이터는 브라우저 내에서만 처리
- ⚡ **빠른 로딩** - 가볍고 빠른 실행
- 🛡️ **보안 경고 없음** - 설치 파일 없이 안전하게 사용
- 💻 **모든 플랫폼 지원** - Windows, Mac, Linux 어디서나 동일하게 작동
- 📱 **반응형 디자인** - 데스크톱, 태블릿, 모바일 지원

## 🚀 사용 방법

### 방법 1: 로컬에서 직접 실행

1. `index.html` 파일을 웹 브라우저로 열기
   ```bash
   # Mac
   open index.html
   
   # Windows (PowerShell)
   start index.html
   
   # Linux
   xdg-open index.html
   ```

2. **"📂 JSON 파일 열기"** 버튼 클릭

3. MyLibrary 앱에서 내보낸 JSON 파일 선택

4. 데이터 확인 및 내보내기

### 방법 2: 로컬 서버로 실행 (권장)

#### Python 3 사용
```bash
cd web-version
python3 -m http.server 8000
```

브라우저에서 접속: http://localhost:8000

#### Node.js 사용
```bash
cd web-version
npx http-server -p 8000
```

브라우저에서 접속: http://localhost:8000

### 방법 3: GitHub Pages (온라인)

**배포 후 접속 주소:**
```
https://[username].github.io/mylibrary-json-viewer/web-version/
```

## 📦 GitHub Pages 배포하기

### 1단계: 저장소 준비

```bash
# 변경사항 커밋
git add .
git commit -m "Add web browser version"
git push origin main
```

### 2단계: GitHub Pages 활성화

1. GitHub 저장소 페이지 접속
2. **Settings** 탭 클릭
3. 왼쪽 메뉴에서 **Pages** 클릭
4. **Source** 섹션에서:
   - Branch: `main` 선택
   - Folder: `/ (root)` 선택
5. **Save** 버튼 클릭

### 3단계: 배포 완료 확인

5~10분 후 다음 주소로 접속:
```
https://[your-username].github.io/mylibrary-json-viewer/web-version/
```

## 🔐 보안 및 개인정보

### ✅ 완전한 로컬 처리
- 모든 데이터는 **브라우저 내에서만** 처리됩니다
- 서버로 데이터가 전송되지 않습니다
- 인터넷 연결 없이도 작동합니다 (파일 로드 후)

### ✅ 데이터 저장
- 선택한 JSON 파일은 메모리에만 로드
- 페이지 새로고침 시 모든 데이터 삭제
- localStorage는 언어 설정만 저장

## 🆚 Electron 버전과 비교

| 항목 | Electron 버전 | 웹 브라우저 버전 |
|------|--------------|----------------|
| **설치** | 필요 (50~100MB) | 불필요 |
| **실행** | 앱 실행 | 브라우저에서 열기 |
| **보안 경고** | macOS/Windows 경고 | 없음 |
| **플랫폼** | Mac/Windows 별도 빌드 | 모든 플랫폼 통일 |
| **업데이트** | 재설치 필요 | 파일 교체 또는 새로고침 |
| **파일 접근** | 자동/드래그앤드롭 | 파일 선택 대화상자 |
| **오프라인** | 완전 지원 | 완전 지원 |
| **용량** | 크다 (100MB+) | 작다 (<1MB) |

## 💡 기능

### 📖 데이터 뷰어
- **소장 자료**: 책, 전자책, 오디오북 등 모든 미디어
- **대출 관리**: 대출 이력 및 현재 대출 현황
- **대출자 정보**: 등록된 대출자 관리
- **위시리스트**: 구매 예정 도서
- **소장 위치**: 책의 물리적 위치

### 🔍 검색 및 필터
- 전체 데이터 실시간 검색
- 탭별 독립적인 검색
- 한글/영문 자동 감지

### 💾 데이터 내보내기
- **JSON 내보내기**: 전체 데이터 백업
- **CSV 내보내기**: 도서 목록 (Excel 호환)

### 🌐 다국어 지원
- 한국어 / English
- 브라우저 언어 자동 감지
- 설정 저장 (localStorage)

## 🔧 개발자 정보

### 파일 구조
```
web-version/
├── index.html      # 메인 HTML
├── app.js          # JavaScript 로직
├── styles.css      # 스타일시트
└── README.md       # 이 문서
```

### 기술 스택
- **Vanilla JavaScript** (ES6+)
- **HTML5** (File API, Blob API)
- **CSS3** (Grid, Flexbox)
- **No Dependencies** (순수 구현)

### 브라우저 호환성
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📝 참고사항

### 파일 경로 제한
브라우저 보안상 파일의 전체 경로는 표시되지 않고 파일명만 표시됩니다.

### 대용량 파일
10,000개 이상의 데이터는 렌더링에 시간이 걸릴 수 있습니다.

### 모바일 지원
모바일 브라우저에서도 작동하지만, 큰 화면에서 사용하는 것을 권장합니다.

## 🆘 문제 해결

### JSON 파일이 로드되지 않아요
- 파일이 올바른 JSON 형식인지 확인
- 브라우저 콘솔(F12)에서 오류 확인
- 다른 브라우저에서 시도

### 한글이 깨져요
- 파일이 UTF-8로 인코딩되어 있는지 확인
- CSV 내보내기 시 BOM이 자동 추가됨 (Excel 호환)

### 파일 선택 후 아무 반응이 없어요
- 파일 크기가 너무 큰지 확인 (100MB 이상)
- 브라우저 콘솔에서 오류 메시지 확인

## 📄 라이센스

MIT License - 자유롭게 사용 가능

## 🔗 관련 프로젝트

- [MyLibrary Management Android App](../MyLibraryManagement/)
- [MyLibrary Electron App](../)

---

**Made with ❤️ for MyLibrary users**
