# MyLibrary JSON Viewer - Build Instructions

## 📦 독립 실행 파일 생성 가이드

### ✅ 이미 생성된 파일 (Mac)

현재 `dist/` 폴더에 다음 파일들이 생성되어 있습니다:

1. **MyLibrary JSON Viewer-1.0.0-arm64.dmg** (91MB)
   - Mac용 설치 파일
   - M1/M2/M3 Mac에서 실행 가능
   - 더블클릭하여 Applications 폴더로 드래그

2. **MyLibrary JSON Viewer-1.0.0-arm64-mac.zip** (87MB)
   - Mac용 압축 파일
   - 압축 해제 후 바로 실행 가능

### 🖥️ Mac 사용 방법

#### 방법 1: DMG 파일 사용 (권장)
1. `MyLibrary JSON Viewer-1.0.0-arm64.dmg` 파일 더블클릭
2. 열린 창에서 앱 아이콘을 Applications 폴더로 드래그
3. Applications 폴더에서 "MyLibrary JSON Viewer" 실행
4. 처음 실행 시 "확인되지 않은 개발자" 경고가 나오면:
   - 시스템 설정 > 개인정보 보호 및 보안 > "확인 없이 열기" 클릭

#### 방법 2: ZIP 파일 사용
1. `MyLibrary JSON Viewer-1.0.0-arm64-mac.zip` 압축 해제
2. 압축 해제된 .app 파일을 Applications 폴더로 이동 (선택사항)
3. .app 파일 더블클릭하여 실행

### 💻 Windows용 빌드 (Windows PC 또는 CI/CD에서)

Windows용 실행 파일(.exe)을 생성하려면 Windows PC에서 다음 명령어를 실행하세요:

```bash
# Windows PC에서
cd "MyLibrary-json-viewer"
npm install
npm run build:win
```

생성되는 파일:
- `dist/MyLibrary JSON Viewer Setup 1.0.0.exe` - 설치 프로그램
- `dist/MyLibrary JSON Viewer 1.0.0.exe` - 포터블 실행 파일 (설치 불필요)

### 🌍 모든 플랫폼용 빌드

Mac과 Windows 모두 빌드하려면 (Mac에서):

```bash
npm run build:all
```

**참고:** Windows 빌드는 Mac에서 생성할 수 있지만, 코드 서명이 필요하면 Windows에서 빌드하는 것이 좋습니다.

---

## 🚀 개발 모드 실행

빌드하지 않고 개발 모드로 실행:

```bash
npm start
```

개발자 도구와 함께 실행:

```bash
npm run dev
```

---

## 📂 빌드 출력 폴더 구조

```
dist/
├── MyLibrary JSON Viewer-1.0.0-arm64.dmg          # Mac 설치 파일
├── MyLibrary JSON Viewer-1.0.0-arm64-mac.zip      # Mac 압축 파일
├── MyLibrary JSON Viewer Setup 1.0.0.exe          # Windows 설치 파일 (Windows에서 빌드 시)
├── MyLibrary JSON Viewer 1.0.0.exe                # Windows 포터블 (Windows에서 빌드 시)
└── mac-arm64/                                      # Mac 앱 번들
    └── MyLibrary JSON Viewer.app
```

---

## 🔧 빌드 설정 수정

`package.json`의 `build` 섹션에서 설정을 변경할 수 있습니다:

- 앱 이름: `productName`
- 버전: `version`
- 아이콘: `mac.icon`, `win.icon`
- 출력 형식: `mac.target`, `win.target`

---

## 📋 배포 체크리스트

배포하기 전에 확인:

- [ ] 버전 번호 업데이트 (`package.json`)
- [ ] 아이콘 파일 준비 (`.icns` for Mac, `.ico` for Windows)
- [ ] 테스트: 빌드된 앱 실행 확인
- [ ] 테스트: JSON 파일 열기/저장 기능 확인
- [ ] 테스트: 언어 전환 기능 확인
- [ ] 사용자 문서 작성 (README.md)

---

## 🐛 문제 해결

### "확인되지 않은 개발자" 경고 (Mac)
- 해결: 시스템 설정 > 개인정보 보호 및 보안 > "확인 없이 열기"

### 앱이 실행되지 않음
- 해결: 터미널에서 실행하여 오류 메시지 확인
  ```bash
  open "dist/mac-arm64/MyLibrary JSON Viewer.app"
  ```

### Windows에서 빌드 오류
- 해결: Node.js와 Python이 설치되어 있는지 확인
- 해결: 관리자 권한으로 명령 프롬프트 실행

---

## 📞 지원

문제가 발생하면 이슈를 제출하거나 개발자에게 문의하세요.
