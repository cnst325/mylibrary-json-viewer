# MyLibrary JSON Viewer - 배포 가이드

## 📦 GitHub Releases를 통한 배포 방법

GitHub Releases는 오픈소스 프로젝트의 표준 배포 방식으로, 무료이며 안정적이고 버전 관리가 용이합니다.

---

## 🚀 1단계: GitHub 저장소 준비

### 저장소 생성 (아직 없는 경우)

1. **GitHub 로그인** → [github.com](https://github.com)
2. **New Repository** 클릭
3. 저장소 설정:
   - Repository name: `mylibrary-json-viewer`
   - Description: `MyLibrary JSON Viewer - Standalone desktop app for viewing MyLibrary backup files`
   - Public 또는 Private 선택 (Public 권장)
4. **Create repository** 클릭

### 로컬 프로젝트를 GitHub에 푸시

```bash
cd "/Users/cnst/Desktop/MyLibrary Project/MyLibrary-json-viewer"

# Git 초기화 (처음인 경우)
git init

# 모든 파일 추가
git add .

# 첫 커밋
git commit -m "Initial commit: MyLibrary JSON Viewer v1.0.0"

# GitHub 저장소 연결 (본인의 GitHub 아이디로 변경)
git remote add origin https://github.com/YOUR_USERNAME/mylibrary-json-viewer.git

# 푸시
git branch -M main
git push -u origin main
```

---

## 📋 2단계: Release 생성

### GitHub 웹사이트에서 Release 만들기

1. **저장소 페이지** 접속
   - `https://github.com/YOUR_USERNAME/mylibrary-json-viewer`

2. **Releases** 섹션 클릭
   - 오른쪽 사이드바에 있음
   - 또는 `/releases` URL 직접 접속

3. **"Create a new release"** 버튼 클릭

4. **Release 정보 입력**:

   **Tag version:**
   ```
   v1.0.0
   ```
   - "Create new tag: v1.0.0 on publish" 선택

   **Release title:**
   ```
   MyLibrary JSON Viewer v1.0.0 - Initial Release
   ```

   **Description (릴리스 노트):**
   ```markdown
   ## 🎉 MyLibrary JSON Viewer v1.0.0

   MyLibrary 앱의 백업 JSON 파일을 쉽게 보고 관리할 수 있는 독립 실행형 데스크톱 앱입니다.

   ### ✨ 주요 기능
   - 📚 책 정보 조회 및 검색
   - 🔄 대출 기록 관리
   - 👥 대출자 정보 보기
   - 💝 위시리스트 관리
   - 📍 보관 장소 관리
   - 🌍 다국어 지원 (한국어/English)
   - 🎨 다크모드 지원

   ### 📥 다운로드

   #### Mac (Apple Silicon - M1/M2/M3)
   - **DMG 파일 (권장):** `MyLibrary.JSON.Viewer-1.0.0-arm64.dmg`
   - **ZIP 파일:** `MyLibrary.JSON.Viewer-1.0.0-arm64-mac.zip`

   #### 설치 방법
   1. DMG 파일 다운로드
   2. 더블클릭하여 열기
   3. 앱 아이콘을 Applications 폴더로 드래그
   4. Applications에서 실행

   ⚠️ **처음 실행 시:** "확인되지 않은 개발자" 경고가 나타나면
   - 시스템 설정 > 개인정보 보호 및 보안
   - "확인 없이 열기" 클릭

   ### 📖 사용 방법
   1. MyLibrary 앱에서 백업 생성
   2. JSON Viewer 실행
   3. "파일 선택" 버튼으로 JSON 파일 열기
   4. 책, 대출, 위시리스트 등 다양한 정보 확인

   ### 🐛 알려진 이슈
   - 없음

   ### 📞 문의 및 지원
   문제가 발생하면 [Issues 탭](https://github.com/YOUR_USERNAME/mylibrary-json-viewer/issues)에서 제보해주세요.
   ```

5. **파일 업로드**:
   - **"Attach binaries by dropping them here or selecting them"** 영역에 파일 드래그 또는 선택
   - 업로드할 파일:
     - `dist/MyLibrary JSON Viewer-1.0.0-arm64.dmg` (91MB)
     - `dist/MyLibrary JSON Viewer-1.0.0-arm64-mac.zip` (87MB)

6. **옵션 설정**:
   - ☐ Set as a pre-release (베타 버전인 경우만 체크)
   - ☑ Set as the latest release (체크 권장)

7. **"Publish release"** 버튼 클릭

---

## 🔗 3단계: 다운로드 링크 안내

### Release가 생성되면 자동으로 다운로드 링크 생성

**Release 페이지 URL:**
```
https://github.com/YOUR_USERNAME/mylibrary-json-viewer/releases/tag/v1.0.0
```

**직접 다운로드 링크:**
```
# DMG 파일
https://github.com/YOUR_USERNAME/mylibrary-json-viewer/releases/download/v1.0.0/MyLibrary.JSON.Viewer-1.0.0-arm64.dmg

# ZIP 파일
https://github.com/YOUR_USERNAME/mylibrary-json-viewer/releases/download/v1.0.0/MyLibrary.JSON.Viewer-1.0.0-arm64-mac.zip
```

**최신 릴리스 자동 링크:**
```
https://github.com/YOUR_USERNAME/mylibrary-json-viewer/releases/latest
```

---

## 📱 4단계: MyLibrary 앱 사용자에게 안내

### Android 앱의 README.md에 추가

```markdown
## 📊 백업 파일 뷰어

MyLibrary에서 백업한 JSON 파일을 PC/Mac에서 편리하게 볼 수 있는 전용 뷰어를 제공합니다.

### 다운로드
- [MyLibrary JSON Viewer 최신 버전 다운로드](https://github.com/YOUR_USERNAME/mylibrary-json-viewer/releases/latest)

### 지원 플랫폼
- ✅ Mac (Apple Silicon - M1/M2/M3)
- 🔜 Windows (준비 중)

### 사용 방법
1. [JSON Viewer 다운로드 및 설치](https://github.com/YOUR_USERNAME/mylibrary-json-viewer/releases/latest)
2. MyLibrary 앱에서 백업 생성 (설정 → 백업 및 복원)
3. JSON 파일을 PC/Mac으로 전송
4. JSON Viewer에서 파일 열기
```

### Play Store 설명에 추가

```
★ PC/Mac용 전용 뷰어 제공
MyLibrary JSON Viewer를 사용하면 백업 파일을 큰 화면에서 편리하게 확인할 수 있습니다.
다운로드: github.com/YOUR_USERNAME/mylibrary-json-viewer/releases
```

### 앱 내 "정보" 화면에 링크 추가

Android 앱의 `AboutActivity` 또는 Settings에 다음 항목 추가:

```kotlin
// AboutActivity.kt 또는 SettingsFragment.kt

val jsonViewerUrl = "https://github.com/YOUR_USERNAME/mylibrary-json-viewer/releases/latest"

binding.btnDownloadViewer.setOnClickListener {
    val intent = Intent(Intent.ACTION_VIEW, Uri.parse(jsonViewerUrl))
    startActivity(intent)
}
```

---

## 🔄 5단계: 버전 업데이트 프로세스

### 새 버전 배포 시

1. **코드 수정 및 테스트**

2. **버전 번호 업데이트**
   ```bash
   # package.json에서 버전 변경
   "version": "1.0.1"
   ```

3. **새 빌드 생성**
   ```bash
   npm run build:mac
   ```

4. **Git 커밋 및 태그**
   ```bash
   git add .
   git commit -m "Release v1.0.1: Bug fixes and improvements"
   git tag v1.0.1
   git push origin main
   git push origin v1.0.1
   ```

5. **GitHub Releases에서 새 Release 생성**
   - Tag: `v1.0.1`
   - Title: `MyLibrary JSON Viewer v1.0.1 - Bug Fixes`
   - 새로 빌드한 파일 업로드

6. **릴리스 노트 작성**
   ```markdown
   ## 🔧 v1.0.1 - Bug Fixes
   
   ### 🐛 버그 수정
   - 파일 열기 오류 수정
   - 언어 전환 버그 해결
   
   ### 🎨 개선 사항
   - UI 성능 향상
   - 검색 속도 개선
   ```

---

## 📊 6단계: 다운로드 통계 확인

### GitHub Insights에서 통계 확인

1. 저장소 페이지 → **Insights** 탭
2. **Traffic** 섹션
   - 방문자 수
   - 조회수
   - Git 클론 횟수

3. **Releases** 통계
   - 각 Release 페이지에서 다운로드 횟수 확인
   - 예: "MyLibrary JSON Viewer-1.0.0-arm64.dmg: 42 downloads"

---

## 🎯 장점 요약

### GitHub Releases의 장점

✅ **무료 호스팅**
- 용량 제한 없음 (파일당 2GB 제한)
- 대역폭 무제한

✅ **버전 관리**
- 모든 버전 히스토리 보관
- 이전 버전 다운로드 가능
- 릴리스 노트로 변경사항 명확히 전달

✅ **신뢰도**
- GitHub의 안정적인 CDN
- 99.9% 업타임 보장

✅ **접근성**
- 직접 다운로드 링크 제공
- 검색 엔진 최적화 (SEO)
- RSS 피드 자동 생성

✅ **통계**
- 다운로드 횟수 추적
- 트래픽 분석

✅ **자동화 가능**
- GitHub Actions로 자동 빌드 및 배포
- CI/CD 파이프라인 구축 가능

---

## 🛠️ 추가 개선 사항 (선택사항)

### 1. GitHub Actions로 자동 빌드

`.github/workflows/release.yml` 파일 생성:

```yaml
name: Build and Release

on:
  push:
    tags:
      - 'v*'

jobs:
  build:
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npm run build:mac
      - name: Upload Release
        uses: softprops/action-gh-release@v1
        with:
          files: |
            dist/*.dmg
            dist/*.zip
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

**사용법:**
```bash
git tag v1.0.1
git push origin v1.0.1
```
→ 자동으로 빌드되고 Release 생성됨

### 2. README.md에 배지 추가

```markdown
[![Latest Release](https://img.shields.io/github/v/release/YOUR_USERNAME/mylibrary-json-viewer)](https://github.com/YOUR_USERNAME/mylibrary-json-viewer/releases/latest)
[![Downloads](https://img.shields.io/github/downloads/YOUR_USERNAME/mylibrary-json-viewer/total)](https://github.com/YOUR_USERNAME/mylibrary-json-viewer/releases)
[![License](https://img.shields.io/github/license/YOUR_USERNAME/mylibrary-json-viewer)](LICENSE)
```

### 3. 웹사이트에 다운로드 페이지 추가

GitHub Pages를 사용하여 간단한 다운로드 페이지 생성 가능:
- 저장소 Settings → Pages → Source: main branch
- `index.html` 파일로 다운로드 페이지 제작

---

## 📞 문의 및 지원

배포 과정에서 문제가 발생하면:
1. GitHub Docs: [About Releases](https://docs.github.com/en/repositories/releasing-projects-on-github/about-releases)
2. 이슈 제출: [Issues 탭](https://github.com/YOUR_USERNAME/mylibrary-json-viewer/issues)

---

## ✅ 체크리스트

배포 전 확인사항:

- [ ] GitHub 저장소 생성 완료
- [ ] 코드를 main 브랜치에 푸시
- [ ] 빌드 파일(DMG, ZIP) 생성 완료
- [ ] Release v1.0.0 생성
- [ ] 파일 업로드 완료
- [ ] 릴리스 노트 작성 완료
- [ ] 다운로드 링크 테스트
- [ ] MyLibrary 앱 README에 링크 추가
- [ ] 사용자에게 안내 공지

**🎉 배포 완료!**
