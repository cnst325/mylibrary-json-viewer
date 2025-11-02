// 전역 데이터 저장소
let libraryData = null;
let currentTab = 'books';
let searchTerm = '';
let backupTimestamp = null; // 백업 생성 시점
let currentLanguage = 'ko'; // 기본 언어: 한국어

// 다국어 지원
const translations = {
    ko: {
        // 헤더
        appTitle: 'MyLibrary JSON Viewer',
        openFile: '📂 JSON 파일 열기',
        exportJson: '💾 JSON 내보내기',
        exportCsv: '📊 CSV 내보내기',
        
        // 파일 정보
        fileName: '파일명:',
        filePath: '경로:',
        backupDate: '백업 생성일:',
        backupNotice: '모든 대출 상태 및 연체 정보는 백업 생성 시점을 기준으로 표시됩니다.',
        
        // 탭
        books: '📖 소장 자료',
        loans: '📤 대출 관리',
        borrowers: '👥 대출자',
        wishlist: '⭐ 위시리스트',
        locations: '📍 소장 위치',
        
        // 검색
        searchPlaceholder: '검색...',
        clearSearch: '🔄 초기화',
        
        // 웰컴 화면
        welcomeTitle: '📚 MyLibrary JSON Viewer',
        welcomeDesc: 'MyLibrary Management 앱에서 내보낸 JSON 백업 파일을 볼 수 있습니다.',
        
        // 테이블 헤더 - Books
        cover: '표지',
        title: '제목',
        author: '저자',
        publisher: '출판사',
        isbn: 'ISBN',
        category: '카테고리',
        location: '위치',
        status: '상태',
        
        // 테이블 헤더 - Loans
        bookTitle: '책 제목',
        borrower: '대출자',
        loanDate: '대출일',
        dueDate: '반납 예정일',
        returnDate: '반납일',
        
        // 테이블 헤더 - Borrowers
        info1: '정보 1',
        info2: '정보 2',
        createdDate: '등록일',
        
        // 테이블 헤더 - Wishlist
        price: '가격',
        priority: '우선순위',
        addedDate: '등록일',
        
        // 테이블 헤더 - Locations
        name: '이름',
        description: '설명',
        
        // 읽음 상태
        unread: '읽지 않음',
        reading: '읽는 중',
        read: '완독',
        
        // 대출 상태
        returned: '반납 완료',
        onLoan: '백업 당시 대출 중',
        overdue: '백업 당시 연체',
        overdueDays: '일',
        
        // 상세 정보
        basicInfo: '기본 정보',
        collectionInfo: '소장 정보',
        readingRecord: '독서 기록',
        loanHistory: '대출 이력',
        otherInfo: '기타',
        mediaType: '미디어 타입',
        rating: '평점',
        readStatus: '읽음 상태',
        pages: '페이지',
        language: '언어',
        apiSource: '데이터 출처',
        note: '노트',
        memo: '메모',
        publishDate: '출판일',
        description: '설명',
        
        // 독서 기록
        startReadingDate: '독서 시작일',
        finishReadingDate: '독서 완료일',
        emotionTag: '감정 태그',
        readingNote: '독서 노트',
        
        // 미디어 타입별
        ebookInfo: '전자책 정보',
        audioInfo: '음반 정보',
        videoInfo: '영상 정보',
        comicInfo: '만화 정보',
        fileFormat: '파일 형식',
        fileSize: '파일 크기',
        filePath: '파일 경로',
        artist: '아티스트',
        albumName: '앨범명',
        trackCount: '트랙 수',
        tracks: '곡',
        director: '감독',
        cast: '출연',
        runningTime: '상영 시간',
        minutes: '분',
        volumeNumber: '권수',
        volume: '권',
        seriesName: '시리즈',
        isComplete: '완결 여부',
        completed: '완결',
        ongoing: '연재중',
        
        // 대출 정보
        loanInfo: '대출 정보',
        bookInfo: '책 정보',
        borrowerInfo: '대출자 정보',
        loanDetail: '대출 상세',
        borrowerNote: '대출자 노트',
        loanMemo: '메모',
        overdueDaysLabel: '경과 일수',
        overdueTitle: '백업 당시 반납예정일 경과',
        
        // 대출자 정보
        borrowerDetail: '대출자 정보',
        lastBorrowDate: '마지막 대출일',
        totalBorrows: '총 대출 횟수',
        times: '회',
        isActive: '활성 상태',
        active: '활성',
        inactive: '비활성',
        isFavorite: '즐겨찾기',
        
        // 위치 정보
        locationDetail: '위치 정보',
        room: '방',
        shelf: '선반',
        order: '순서',
        modifiedDate: '수정일',
        
        // 메시지
        noData: '데이터가 없습니다.',
        unknown: '알 수 없음',
        
        // 날짜 형식
        dateFormat: 'ko-KR'
    },
    en: {
        // Header
        appTitle: 'MyLibrary JSON Viewer',
        openFile: '📂 Open JSON File',
        exportJson: '💾 Export JSON',
        exportCsv: '📊 Export CSV',
        
        // File Info
        fileName: 'File Name:',
        filePath: 'Path:',
        backupDate: 'Backup Date:',
        backupNotice: 'All loan status and overdue information are displayed based on the backup creation time.',
        
        // Tabs
        books: '📖 Collection',
        loans: '📤 Loans',
        borrowers: '👥 Borrowers',
        wishlist: '⭐ Wishlist',
        locations: '📍 Locations',
        
        // Search
        searchPlaceholder: 'Search...',
        clearSearch: '🔄 Clear',
        
        // Welcome Screen
        welcomeTitle: '📚 MyLibrary JSON Viewer',
        welcomeDesc: 'View JSON backup files exported from MyLibrary Management app.',
        
        // Table Headers - Books
        cover: 'Cover',
        title: 'Title',
        author: 'Author',
        publisher: 'Publisher',
        isbn: 'ISBN',
        category: 'Category',
        location: 'Location',
        status: 'Status',
        
        // Table Headers - Loans
        bookTitle: 'Book Title',
        borrower: 'Borrower',
        loanDate: 'Loan Date',
        dueDate: 'Due Date',
        returnDate: 'Return Date',
        
        // Table Headers - Borrowers
        info1: 'Info 1',
        info2: 'Info 2',
        createdDate: 'Created',
        
        // Table Headers - Wishlist
        price: 'Price',
        priority: 'Priority',
        addedDate: 'Added',
        
        // Table Headers - Locations
        name: 'Name',
        description: 'Description',
        
        // Read Status
        unread: 'Unread',
        reading: 'Reading',
        read: 'Read',
        
        // Loan Status
        returned: 'Returned',
        onLoan: 'On Loan (at backup)',
        overdue: 'Overdue (at backup)',
        overdueDays: 'd',
        
        // Detail Info
        basicInfo: 'Basic Information',
        collectionInfo: 'Collection Information',
        readingRecord: 'Reading Record',
        loanHistory: 'Loan History',
        otherInfo: 'Other Information',
        mediaType: 'Media Type',
        rating: 'Rating',
        readStatus: 'Read Status',
        pages: 'Pages',
        language: 'Language',
        apiSource: 'Data Source',
        note: 'Note',
        memo: 'Memo',
        publishDate: 'Publish Date',
        description: 'Description',
        
        // Reading Record
        startReadingDate: 'Started Reading',
        finishReadingDate: 'Finished Reading',
        emotionTag: 'Emotion Tag',
        readingNote: 'Reading Note',
        
        // Media Type Specific
        ebookInfo: 'E-book Information',
        audioInfo: 'Audio Information',
        videoInfo: 'Video Information',
        comicInfo: 'Comic Information',
        fileFormat: 'File Format',
        fileSize: 'File Size',
        filePath: 'File Path',
        artist: 'Artist',
        albumName: 'Album',
        trackCount: 'Tracks',
        tracks: 'tracks',
        director: 'Director',
        cast: 'Cast',
        runningTime: 'Runtime',
        minutes: 'min',
        volumeNumber: 'Volume',
        volume: 'vol',
        seriesName: 'Series',
        isComplete: 'Status',
        completed: 'Completed',
        ongoing: 'Ongoing',
        
        // Loan Info
        loanInfo: 'Loan Information',
        bookInfo: 'Book Information',
        borrowerInfo: 'Borrower Information',
        loanDetail: 'Loan Details',
        borrowerNote: 'Borrower Note',
        loanMemo: 'Memo',
        overdueDaysLabel: 'Days Overdue',
        overdueTitle: 'Due Date Passed (at backup)',
        
        // Borrower Info
        borrowerDetail: 'Borrower Details',
        lastBorrowDate: 'Last Loan Date',
        totalBorrows: 'Total Loans',
        times: 'times',
        isActive: 'Status',
        active: 'Active',
        inactive: 'Inactive',
        isFavorite: 'Favorite',
        
        // Location Info
        locationDetail: 'Location Details',
        room: 'Room',
        shelf: 'Shelf',
        order: 'Order',
        modifiedDate: 'Modified',
        
        // Messages
        noData: 'No data available.',
        unknown: 'Unknown',
        
        // Date Format
        dateFormat: 'en-US'
    }
};

// 번역 함수
function t(key) {
    return translations[currentLanguage][key] || key;
}

// DOM 요소
const elements = {
    openFileBtn: document.getElementById('openFileBtn'),
    openFileBtn2: document.getElementById('openFileBtn2'),
    exportJsonBtn: document.getElementById('exportJsonBtn'),
    exportCsvBtn: document.getElementById('exportCsvBtn'),
    welcomeScreen: document.getElementById('welcomeScreen'),
    mainContent: document.getElementById('mainContent'),
    fileInfo: document.getElementById('fileInfo'),
    fileName: document.getElementById('fileName'),
    filePath: document.getElementById('filePath'),
    backupDate: document.getElementById('backupDate'),
    searchInput: document.getElementById('searchInput'),
    clearSearch: document.getElementById('clearSearch'),
    detailModal: document.getElementById('detailModal'),
    detailContent: document.getElementById('detailContent'),
    tabs: document.querySelectorAll('.tab'),
    tabContents: document.querySelectorAll('.tab-content'),
    languageSelect: document.getElementById('languageSelect')
};

// 초기화
document.addEventListener('DOMContentLoaded', async () => {
    // 시스템 언어 감지 함수
    async function detectSystemLanguage() {
        try {
            // Electron에서 시스템 로케일 가져오기
            if (window.electronAPI && window.electronAPI.getSystemLocale) {
                const locale = await window.electronAPI.getSystemLocale();
                console.log('System locale:', locale);
                // 한국어인 경우 'ko', 아니면 'en' (기본값)
                return locale && locale.toLowerCase().startsWith('ko') ? 'ko' : 'en';
            }
            
            // Fallback: 브라우저 언어
            const systemLang = navigator.language || navigator.userLanguage || 'en';
            console.log('Browser language:', systemLang);
            return systemLang.toLowerCase().startsWith('ko') ? 'ko' : 'en';
        } catch (error) {
            console.error('Error detecting language:', error);
            return 'en'; // 오류 발생 시 기본값 영어
        }
    }
    
    // 언어 설정: localStorage에 저장된 값 > 시스템 언어 > 영어(기본값)
    const savedLanguage = localStorage.getItem('preferredLanguage');
    
    // 시스템 언어 감지는 시도하되, 실패하면 영어를 기본값으로 사용
    let systemLanguage = 'en'; // 기본값: 영어
    try {
        systemLanguage = await detectSystemLanguage();
    } catch (error) {
        console.error('Failed to detect system language, using default (en):', error);
    }
    
    // localStorage에 저장된 값이 있으면 우선 사용, 없으면 영어 기본값
    currentLanguage = savedLanguage || 'en';
    
    console.log('System language detected:', systemLanguage);
    console.log('Selected language:', currentLanguage);
    
    if (elements.languageSelect) {
        elements.languageSelect.value = currentLanguage;
    }
    
    initializeEventListeners();
    updateUILanguage();
    
    // 자동 로드 이벤트 리스너
    if (window.electronAPI && window.electronAPI.onAutoLoadFile) {
        window.electronAPI.onAutoLoadFile((result) => {
            if (result && !result.error) {
                loadJsonData(result);
            }
        });
    }
});

function initializeEventListeners() {
    // 언어 전환
    if (elements.languageSelect) {
        elements.languageSelect.addEventListener('change', (e) => {
            currentLanguage = e.target.value;
            localStorage.setItem('preferredLanguage', currentLanguage);
            updateUILanguage();
            if (libraryData) {
                renderCurrentTab();
            }
        });
    }
    
    // 파일 열기 버튼
    elements.openFileBtn.addEventListener('click', openJsonFile);
    elements.openFileBtn2.addEventListener('click', openJsonFile);
    
    // 내보내기 버튼
    elements.exportJsonBtn.addEventListener('click', exportToJson);
    elements.exportCsvBtn.addEventListener('click', exportToCsv);
    
    // 탭 전환
    elements.tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.dataset.tab;
            switchTab(tabName);
        });
    });
    
    // 검색
    elements.searchInput.addEventListener('input', (e) => {
        searchTerm = e.target.value.toLowerCase();
        renderCurrentTab();
    });
    
    // 검색 초기화
    elements.clearSearch.addEventListener('click', () => {
        elements.searchInput.value = '';
        searchTerm = '';
        renderCurrentTab();
    });
    
    // 모달 닫기
    document.querySelector('.modal-close').addEventListener('click', closeModal);
    elements.detailModal.addEventListener('click', (e) => {
        if (e.target === elements.detailModal) {
            closeModal();
        }
    });
}

// UI 언어 업데이트
function updateUILanguage() {
    // HTML lang 속성 변경
    document.documentElement.lang = currentLanguage;
    
    // data-i18n 속성이 있는 모든 요소 업데이트
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = t(key);
    });
    
    // 검색 입력창 placeholder
    if (elements.searchInput) {
        elements.searchInput.placeholder = t('searchPlaceholder');
    }
    
    // 웰컴 화면 업데이트
    const welcomeTitle = document.querySelector('.welcome-content h2');
    const welcomeDesc = document.querySelector('.welcome-content p');
    if (welcomeTitle) welcomeTitle.textContent = t('welcomeTitle');
    if (welcomeDesc) welcomeDesc.textContent = t('welcomeDesc');
    
    // 파일 정보 라벨 업데이트
    const fileInfoLabels = document.querySelectorAll('.file-info .label');
    if (fileInfoLabels.length >= 3) {
        fileInfoLabels[0].textContent = t('fileName');
        fileInfoLabels[1].textContent = t('filePath');
        fileInfoLabels[2].textContent = t('backupDate');
    }
    
    // 백업 안내문 업데이트
    const noticeText = document.querySelector('.notice-text');
    if (noticeText) noticeText.textContent = t('backupNotice');
    
    // 탭 업데이트
    updateTabLabels();
}

// 탭 라벨 업데이트
function updateTabLabels() {
    const tabButtons = document.querySelectorAll('.tab');
    if (tabButtons.length >= 5) {
        const booksCount = libraryData ? libraryData.books.length : 0;
        const loansCount = libraryData ? libraryData.loans.length : 0;
        const borrowersCount = libraryData ? libraryData.borrowers.length : 0;
        const wishlistCount = libraryData ? libraryData.wishlist.length : 0;
        const locationsCount = libraryData ? libraryData.locations.length : 0;
        
        tabButtons[0].innerHTML = `${t('books')} (<span id="booksCount">${booksCount}</span>)`;
        tabButtons[1].innerHTML = `${t('loans')} (<span id="loansCount">${loansCount}</span>)`;
        tabButtons[2].innerHTML = `${t('borrowers')} (<span id="borrowersCount">${borrowersCount}</span>)`;
        tabButtons[3].innerHTML = `${t('wishlist')} (<span id="wishlistCount">${wishlistCount}</span>)`;
        tabButtons[4].innerHTML = `${t('locations')} (<span id="locationsCount">${locationsCount}</span>)`;
    }
}

// JSON 파일 열기
async function openJsonFile() {
    try {
        const result = await window.electronAPI.openJsonFile();
        
        if (!result) return;
        
        if (result.error) {
            alert('파일을 읽는 중 오류가 발생했습니다: ' + result.error);
            return;
        }
        
        loadJsonData(result);
        
    } catch (error) {
        alert('파일을 여는 중 오류가 발생했습니다: ' + error.message);
        console.error('Open file error:', error);
    }
}

// JSON 데이터 로드 (수동/자동 공통)
function loadJsonData(result) {
    try {
        libraryData = JSON.parse(result.content);
        
        // 백업 생성 시점 결정 (파일 수정 시간 사용)
        backupTimestamp = result.lastModified || Date.now();
        
        // UI 업데이트
        elements.fileName.textContent = result.fileName;
        elements.filePath.textContent = result.filePath;
        elements.backupDate.textContent = formatBackupDate(backupTimestamp);
        elements.welcomeScreen.classList.add('hidden');
        elements.fileInfo.classList.remove('hidden');
        elements.mainContent.classList.remove('hidden');
        
        // 내보내기 버튼 표시
        elements.exportJsonBtn.classList.remove('hidden');
        elements.exportCsvBtn.classList.remove('hidden');
        
        // 데이터 카운트 업데이트
        updateCounts();
        
        // 첫 번째 탭 렌더링
        renderCurrentTab();
        
    } catch (error) {
        alert('JSON 파싱 오류: ' + error.message);
        console.error('Parse error:', error);
    }
}

// 카운트 업데이트
function updateCounts() {
    document.getElementById('booksCount').textContent = libraryData.books?.length || 0;
    document.getElementById('loansCount').textContent = libraryData.loans?.length || 0;
    document.getElementById('borrowersCount').textContent = libraryData.borrowers?.length || 0;
    document.getElementById('wishlistCount').textContent = libraryData.wishlist?.length || 0;
    document.getElementById('locationsCount').textContent = libraryData.locations?.length || 0;
}

// 탭 전환
function switchTab(tabName) {
    currentTab = tabName;
    
    // 탭 버튼 활성화
    elements.tabs.forEach(tab => {
        if (tab.dataset.tab === tabName) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
    
    // 탭 컨텐츠 활성화
    elements.tabContents.forEach(content => {
        if (content.id === tabName + 'Tab') {
            content.classList.add('active');
        } else {
            content.classList.remove('active');
        }
    });
    
    renderCurrentTab();
}

// 현재 탭 렌더링
function renderCurrentTab() {
    if (!libraryData) return;
    
    switch (currentTab) {
        case 'books':
            renderBooks();
            break;
        case 'loans':
            renderLoans();
            break;
        case 'borrowers':
            renderBorrowers();
            break;
        case 'wishlist':
            renderWishlist();
            break;
        case 'locations':
            renderLocations();
            break;
    }
}

// Books 렌더링
function renderBooks() {
    const container = document.getElementById('booksTable');
    const books = libraryData.books || [];
    
    // 검색 필터
    const filteredBooks = books.filter(book => {
        if (!searchTerm) return true;
        return (
            book.title?.toLowerCase().includes(searchTerm) ||
            book.author?.toLowerCase().includes(searchTerm) ||
            book.publisher?.toLowerCase().includes(searchTerm) ||
            book.isbn?.toLowerCase().includes(searchTerm)
        );
    });
    
    const html = `
        <table>
            <thead>
                <tr>
                    <th style="width: 80px;">${t('cover')}</th>
                    <th>${t('title')}</th>
                    <th>${t('author')}</th>
                    <th>${t('publisher')}</th>
                    <th>${t('isbn')}</th>
                    <th>${t('category')}</th>
                    <th>${t('location')}</th>
                    <th>${t('status')}</th>
                </tr>
            </thead>
            <tbody>
                ${filteredBooks.map(book => `
                    <tr onclick="showBookDetail(${book.id})">
                        <td>${getBookCoverImage(book)}</td>
                        <td><strong>${escapeHtml(book.title)}</strong></td>
                        <td>${escapeHtml(book.author || '-')}</td>
                        <td>${escapeHtml(book.publisher || '-')}</td>
                        <td>${escapeHtml(book.isbn || '-')}</td>
                        <td>${escapeHtml(book.category || '-')}</td>
                        <td>${escapeHtml(getLocationName(book.locationId) || book.location || '-')}</td>
                        <td>${getReadStatusBadge(book.readStatus)}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
    
    container.innerHTML = filteredBooks.length > 0 ? html : `<p style="padding: 20px; text-align: center;">${t('noData')}</p>`;
}

// Loans 렌더링
function renderLoans() {
    const container = document.getElementById('loansTable');
    const loans = libraryData.loans || [];
    const books = libraryData.books || [];
    
    // 책 ID로 제목 찾기
    const getBookTitle = (bookId) => {
        const book = books.find(b => b.id === bookId);
        return book ? book.title : '알 수 없음';
    };
    
    const filteredLoans = loans.filter(loan => {
        if (!searchTerm) return true;
        const bookTitle = getBookTitle(loan.bookId);
        return (
            bookTitle.toLowerCase().includes(searchTerm) ||
            loan.borrowerInfo1?.toLowerCase().includes(searchTerm) ||
            loan.borrowerInfo2?.toLowerCase().includes(searchTerm)
        );
    });
    
    const html = `
        <table>
            <thead>
                <tr>
                    <th>책 제목</th>
                    <th>대출자</th>
                    <th>대출일</th>
                    <th>반납 예정일</th>
                    <th>반납일</th>
                    <th>상태</th>
                </tr>
            </thead>
            <tbody>
                ${filteredLoans.map(loan => `
                    <tr onclick="showLoanDetail(${loan.id})">
                        <td><strong>${escapeHtml(getBookTitle(loan.bookId))}</strong></td>
                        <td>${escapeHtml(loan.borrowerInfo1)}</td>
                        <td>${formatDate(loan.loanDate)}</td>
                        <td>${loan.dueDate ? formatDate(loan.dueDate) : '-'}</td>
                        <td>${loan.returnDate ? formatDate(loan.returnDate) : '-'}</td>
                        <td>${getLoanStatusBadge(loan)}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
    
    container.innerHTML = filteredLoans.length > 0 ? html : '<p style="padding: 20px; text-align: center;">데이터가 없습니다.</p>';
}

// Borrowers 렌더링
function renderBorrowers() {
    const container = document.getElementById('borrowersTable');
    const borrowers = libraryData.borrowers || [];
    
    const filteredBorrowers = borrowers.filter(borrower => {
        if (!searchTerm) return true;
        return (
            borrower.info1?.toLowerCase().includes(searchTerm) ||
            borrower.info2?.toLowerCase().includes(searchTerm) ||
            borrower.note?.toLowerCase().includes(searchTerm)
        );
    });
    
    const html = `
        <table>
            <thead>
                <tr>
                    <th>정보 1</th>
                    <th>정보 2</th>
                    <th>노트</th>
                    <th>등록일</th>
                </tr>
            </thead>
            <tbody>
                ${filteredBorrowers.map(borrower => `
                    <tr onclick="showBorrowerDetail(${borrower.id})">
                        <td><strong>${escapeHtml(borrower.info1)}</strong></td>
                        <td>${escapeHtml(borrower.info2 || '-')}</td>
                        <td>${escapeHtml(borrower.note || '-')}</td>
                        <td>${formatDate(borrower.createdDate)}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
    
    container.innerHTML = filteredBorrowers.length > 0 ? html : '<p style="padding: 20px; text-align: center;">데이터가 없습니다.</p>';
}

// Wishlist 렌더링
function renderWishlist() {
    const container = document.getElementById('wishlistTable');
    const wishlist = libraryData.wishlist || [];
    
    const filteredWishlist = wishlist.filter(item => {
        if (!searchTerm) return true;
        return (
            item.title?.toLowerCase().includes(searchTerm) ||
            item.author?.toLowerCase().includes(searchTerm) ||
            item.publisher?.toLowerCase().includes(searchTerm)
        );
    });
    
    const html = `
        <table>
            <thead>
                <tr>
                    <th style="width: 80px;">표지</th>
                    <th>제목</th>
                    <th>저자</th>
                    <th>출판사</th>
                    <th>ISBN</th>
                    <th>가격</th>
                    <th>우선순위</th>
                    <th>등록일</th>
                </tr>
            </thead>
            <tbody>
                ${filteredWishlist.map(item => `
                    <tr onclick="showWishlistDetail(${item.id})">
                        <td>${getWishlistCoverImage(item)}</td>
                        <td><strong>${escapeHtml(item.title)}</strong></td>
                        <td>${escapeHtml(item.author || '-')}</td>
                        <td>${escapeHtml(item.publisher || '-')}</td>
                        <td>${escapeHtml(item.isbn || '-')}</td>
                        <td>${escapeHtml(item.price || '-')}</td>
                        <td>${getPriorityStars(item.priority)}</td>
                        <td>${formatDate(item.addedDate)}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
    
    container.innerHTML = filteredWishlist.length > 0 ? html : '<p style="padding: 20px; text-align: center;">데이터가 없습니다.</p>';
}

// Locations 렌더링
function renderLocations() {
    const container = document.getElementById('locationsTable');
    const locations = libraryData.locations || [];
    
    const filteredLocations = locations.filter(location => {
        if (!searchTerm) return true;
        return (
            location.name?.toLowerCase().includes(searchTerm) ||
            location.description?.toLowerCase().includes(searchTerm)
        );
    });
    
    const html = `
        <table>
            <thead>
                <tr>
                    <th>위치명</th>
                    <th>설명</th>
                    <th>생성일</th>
                </tr>
            </thead>
            <tbody>
                ${filteredLocations.map(location => `
                    <tr onclick="showLocationDetail(${location.id})">
                        <td><strong>${escapeHtml(location.name)}</strong></td>
                        <td>${escapeHtml(location.description || '-')}</td>
                        <td>${formatDate(location.createdDate)}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
    
    container.innerHTML = filteredLocations.length > 0 ? html : '<p style="padding: 20px; text-align: center;">데이터가 없습니다.</p>';
}

// 상세 보기 함수들
function showBookDetail(id) {
    const book = libraryData.books.find(b => b.id === id);
    if (!book) return;
    
    const coverImageHtml = getBookCoverImageLarge(book);
    
    // 현재 대출 정보 조회
    const currentLoan = getCurrentLoan(book.id);
    const loanHistory = getLoanHistory(book.id);
    
    const html = `
        <div style="display: flex; gap: 24px;">
            ${coverImageHtml ? `<div style="flex-shrink: 0;">${coverImageHtml}</div>` : ''}
            <div style="flex: 1;">
                <h2>📖 ${escapeHtml(book.title)}</h2>
                
                ${currentLoan ? getLoanStatusBox(currentLoan) : ''}
                
                <h3>${t('basicInfo')}</h3>
                <p><strong>${t('isbn')}:</strong> ${escapeHtml(book.isbn || '-')}</p>
                <p><strong>${t('author')}:</strong> ${escapeHtml(book.author || '-')}</p>
                <p><strong>${t('publisher')}:</strong> ${escapeHtml(book.publisher || '-')}</p>
                <p><strong>${t('publishDate') || 'Publish Date'}:</strong> ${escapeHtml(book.publishDate || '-')}</p>
                <p><strong>${t('category')}:</strong> ${escapeHtml(book.category || '-')}</p>
                <p><strong>${t('pages')}:</strong> ${book.pageCount || '-'}</p>
                <p><strong>${t('language')}:</strong> ${escapeHtml(book.language || '-')}</p>
                ${book.price ? `<p><strong>${t('price')}:</strong> ${escapeHtml(book.price)}</p>` : ''}
                
                <h3>${t('collectionInfo')}</h3>
                <p><strong>${t('mediaType')}:</strong> ${getMediaTypeText(book.mediaType)}</p>
                <p><strong>${t('location')}:</strong> ${getLocationName(book.locationId) || escapeHtml(book.location || '-')}</p>
                <p><strong>${t('rating')}:</strong> ${book.rating ? '⭐'.repeat(Math.round(book.rating)) + ` (${book.rating}/5.0)` : '-'}</p>
                <p><strong>${t('readStatus')}:</strong> ${getReadStatusText(book.readStatus)}</p>
                
                ${getReadingRecordInfo(book)}
                
                ${getMediaSpecificInfo(book)}
                
                ${book.description ? `<h3>${t('description') || 'Description'}</h3><p style="line-height: 1.6;">${escapeHtml(book.description)}</p>` : ''}
                ${book.note ? `<h3>${t('note')}</h3><p style="line-height: 1.6;">${escapeHtml(book.note)}</p>` : ''}
                
                ${loanHistory.length > 0 ? `
                    <h3>${t('loanHistory')} (${loanHistory.length})</h3>
                    <div style="max-height: 200px; overflow-y: auto;">
                        ${loanHistory.map(loan => `
                            <div style="background: #f8f9fa; padding: 8px; margin-bottom: 8px; border-radius: 4px; font-size: 13px;">
                                <strong>${escapeHtml(loan.borrowerInfo1)}</strong> | 
                                ${formatDate(loan.loanDate)} ~ ${loan.returnDate ? formatDate(loan.returnDate) : t('onLoan')}
                                ${loan.isReturned ? ' ✓' : ' 🔄'}
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
                
                <h3>${t('otherInfo')}</h3>
                <p><strong>${t('addedDate') || 'Added'}:</strong> ${formatDate(book.addedDate)}</p>
                <p><strong>${t('modifiedDate')}:</strong> ${formatDate(book.modifiedDate)}</p>
                ${book.apiSource ? `<p><strong>${t('apiSource')}:</strong> ${escapeHtml(book.apiSource)}</p>` : ''}
            </div>
        </div>
    `;
    
    elements.detailContent.innerHTML = html;
    elements.detailModal.classList.remove('hidden');
}

function showLoanDetail(id) {
    const loan = libraryData.loans.find(l => l.id === id);
    if (!loan) return;
    
    const book = libraryData.books.find(b => b.id === loan.bookId);
    const bookTitle = book ? book.title : t('unknown');
    
    const html = `
        <h2>📤 ${t('loanInfo')}</h2>
        <h3>${t('bookInfo')}</h3>
        <p><strong>${t('title')}:</strong> ${escapeHtml(bookTitle)}</p>
        
        <h3>${t('borrowerInfo')}</h3>
        <p><strong>${t('info1')}:</strong> ${escapeHtml(loan.borrowerInfo1)}</p>
        ${loan.borrowerInfo2 ? `<p><strong>${t('info2')}:</strong> ${escapeHtml(loan.borrowerInfo2)}</p>` : ''}
        ${loan.borrowerNote ? `<p><strong>${t('borrowerNote')}:</strong> ${escapeHtml(loan.borrowerNote)}</p>` : ''}
        
        <h3>${t('loanDetail')}</h3>
        <p><strong>${t('loanDate')}:</strong> ${formatDate(loan.loanDate)}</p>
        <p><strong>${t('dueDate')}:</strong> ${loan.dueDate ? formatDate(loan.dueDate) : '-'}</p>
        <p><strong>${t('returnDate')}:</strong> ${loan.returnDate ? formatDate(loan.returnDate) : (currentLanguage === 'ko' ? '미반납' : 'Not returned')}</p>
        <p><strong>${t('status')}:</strong> ${getLoanStatusText(loan)}</p>
        ${loan.memo ? `<p><strong>${t('memo')}:</strong> ${escapeHtml(loan.memo)}</p>` : ''}
    `;
    
    elements.detailContent.innerHTML = html;
    elements.detailModal.classList.remove('hidden');
}

function showBorrowerDetail(id) {
    const borrower = libraryData.borrowers.find(b => b.id === id);
    if (!borrower) return;
    
    const html = `
        <h2>👤 ${t('borrowerDetail')}</h2>
        <p><strong>${t('info1')}:</strong> ${escapeHtml(borrower.info1)}</p>
        ${borrower.info2 ? `<p><strong>${t('info2')}:</strong> ${escapeHtml(borrower.info2)}</p>` : ''}
        ${borrower.note ? `<h3>${t('note')}</h3><p>${escapeHtml(borrower.note)}</p>` : ''}
        <h3>${t('otherInfo')}</h3>
        <p><strong>${t('createdDate')}:</strong> ${formatDate(borrower.createdDate)}</p>
        <p><strong>${t('lastBorrowDate')}:</strong> ${formatDate(borrower.lastBorrowDate)}</p>
        <p><strong>${t('totalBorrows')}:</strong> ${borrower.totalBorrows}${t('times')}</p>
        <p><strong>${t('isActive')}:</strong> ${borrower.isActive ? t('active') : t('inactive')}</p>
        <p><strong>${t('isFavorite')}:</strong> ${borrower.isFavorite ? '⭐' : '-'}</p>
    `;
    
    elements.detailContent.innerHTML = html;
    elements.detailModal.classList.remove('hidden');
}

function showWishlistDetail(id) {
    const item = libraryData.wishlist.find(w => w.id === id);
    if (!item) return;
    
    const coverImageHtml = getWishlistCoverImageLarge(item);
    
    const html = `
        <h2>⭐ ${escapeHtml(item.title)}</h2>
        <div style="display: flex; gap: 20px; margin-top: 10px;">
            ${coverImageHtml ? `<div style="flex-shrink: 0;">${coverImageHtml}</div>` : ''}
            <div style="flex: 1;">
                <h3>${t('basicInfo')}</h3>
                <p><strong>${t('isbn')}:</strong> ${escapeHtml(item.isbn || '-')}</p>
                <p><strong>${t('author')}:</strong> ${escapeHtml(item.author || '-')}</p>
                <p><strong>${t('publisher')}:</strong> ${escapeHtml(item.publisher || '-')}</p>
                <p><strong>${t('publishDate')}:</strong> ${escapeHtml(item.publishDate || '-')}</p>
                <p><strong>${t('price')}:</strong> ${escapeHtml(item.price || '-')}</p>
                <p><strong>${t('priority')}:</strong> ${getPriorityStars(item.priority)}</p>
                
                ${item.description ? `<h3>${t('description')}</h3><p>${escapeHtml(item.description)}</p>` : ''}
                ${item.memo ? `<h3>${t('memo')}</h3><p>${escapeHtml(item.memo)}</p>` : ''}
                
                <h3>${t('otherInfo')}</h3>
                <p><strong>${t('category')}:</strong> ${escapeHtml(item.category || '-')}</p>
                <p><strong>${t('pages')}:</strong> ${item.pageCount || '-'}</p>
                <p><strong>${t('language')}:</strong> ${escapeHtml(item.language || '-')}</p>
                <p><strong>${t('addedDate')}:</strong> ${formatDate(item.addedDate)}</p>
                ${item.apiSource ? `<p><strong>${t('apiSource')}:</strong> ${escapeHtml(item.apiSource)}</p>` : ''}
            </div>
        </div>
    `;
    
    elements.detailContent.innerHTML = html;
    elements.detailModal.classList.remove('hidden');
}

function showLocationDetail(id) {
    const location = libraryData.locations.find(l => l.id === id);
    if (!location) return;
    
    const html = `
        <h2>📍 ${escapeHtml(location.name)}</h2>
        ${location.room ? `<p><strong>${t('room')}:</strong> ${escapeHtml(location.room)}</p>` : ''}
        ${location.shelf ? `<p><strong>${t('shelf')}:</strong> ${escapeHtml(location.shelf)}</p>` : ''}
        ${location.description ? `<h3>${t('description')}</h3><p>${escapeHtml(location.description)}</p>` : ''}
        <h3>${t('otherInfo')}</h3>
        <p><strong>${t('order')}:</strong> ${location.order}</p>
        <p><strong>${t('createdDate')}:</strong> ${formatDate(location.createdDate)}</p>
        <p><strong>${t('modifiedDate')}:</strong> ${formatDate(location.modifiedDate)}</p>
    `;
    
    elements.detailContent.innerHTML = html;
    elements.detailModal.classList.remove('hidden');
}

// 모달 닫기
function closeModal() {
    elements.detailModal.classList.add('hidden');
}

// 유틸리티 함수들
function escapeHtml(text) {
    if (text === null || text === undefined) return '';
    const div = document.createElement('div');
    div.textContent = text.toString();
    return div.innerHTML;
}

function formatDate(timestamp) {
    if (!timestamp) return '-';
    const date = new Date(timestamp);
    return date.toLocaleDateString(t('dateFormat'), {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function getReadStatusBadge(status) {
    const badges = {
        'UNREAD': `<span class="badge badge-info">${t('unread')}</span>`,
        'READING': `<span class="badge badge-warning">${t('reading')}</span>`,
        'READ': `<span class="badge badge-success">${t('read')}</span>`
    };
    return badges[status] || '<span class="badge">-</span>';
}

function getReadStatusText(status) {
    const texts = {
        'UNREAD': t('unread'),
        'READING': t('reading'),
        'READ': t('read')
    };
    return texts[status] || '-';
}

function getPriorityStars(priority) {
    if (!priority || priority < 1) return '-';
    return '⭐'.repeat(Math.min(priority, 5));
}

function getLoanStatusBadge(loan) {
    if (loan.isReturned) {
        return `<span class="badge badge-success">${t('returned')}</span>`;
    }
    
    // 백업 시점 기준으로 연체 판단
    if (loan.dueDate && backupTimestamp) {
        const backupDate = new Date(backupTimestamp);
        const dueDate = new Date(loan.dueDate);
        
        // 백업일의 자정(00:00:00)과 반납예정일의 자정을 비교
        backupDate.setHours(0, 0, 0, 0);
        dueDate.setHours(0, 0, 0, 0);
        
        if (backupDate > dueDate) {
            const overdueDays = Math.floor((backupDate - dueDate) / (1000 * 60 * 60 * 24));
            return `<span class="badge badge-danger">${t('overdue')} (${overdueDays}${t('overdueDays')})</span>`;
        }
    }
    
    return `<span class="badge badge-warning">${t('onLoan')}</span>`;
}

function getLoanStatusText(loan) {
    if (loan.isReturned) return t('returned');
    
    // 백업 시점 기준으로 연체 판단
    if (loan.dueDate && backupTimestamp) {
        const backupDate = new Date(backupTimestamp);
        const dueDate = new Date(loan.dueDate);
        
        backupDate.setHours(0, 0, 0, 0);
        dueDate.setHours(0, 0, 0, 0);
        
        if (backupDate > dueDate) {
            const overdueDays = Math.floor((backupDate - dueDate) / (1000 * 60 * 60 * 24));
            return `${t('overdue')} (${overdueDays}${t('overdueDays')})`;
        }
    }
    
    return t('onLoan');
}

// 책 표지 이미지 (테이블용 - 작은 크기)
function getBookCoverImage(book) {
    // 우선순위: highResCoverUrl > coverUrl > localCoverPath
    const imageUrl = book.highResCoverUrl || book.coverUrl || book.localCoverPath;
    
    if (!imageUrl) {
        return '<div class="book-cover-placeholder">📚</div>';
    }
    
    // localCoverPath는 Android 경로이므로 표시 불가
    if (imageUrl.startsWith('/') || imageUrl.startsWith('file://')) {
        return '<div class="book-cover-placeholder">📚</div>';
    }
    
    return `<img src="${escapeHtml(imageUrl)}" alt="Cover" class="book-cover-thumb" onerror="this.style.display='none'; this.parentElement.innerHTML='<div class=\\'book-cover-placeholder\\'>📚</div>';">`;
}

// 위시리스트 표지 이미지 (테이블용 - 작은 크기)
function getWishlistCoverImage(item) {
    // 우선순위: highResCoverUrl > coverUrl > localCoverPath
    const imageUrl = item.highResCoverUrl || item.coverUrl || item.localCoverPath;
    
    if (!imageUrl) {
        return '<div class="book-cover-placeholder">⭐</div>';
    }
    
    // localCoverPath는 Android 경로이므로 표시 불가
    if (imageUrl.startsWith('/') || imageUrl.startsWith('file://')) {
        return '<div class="book-cover-placeholder">⭐</div>';
    }
    
    return `<img src="${escapeHtml(imageUrl)}" alt="Cover" class="book-cover-thumb" onerror="this.style.display='none'; this.parentElement.innerHTML='<div class=\\'book-cover-placeholder\\'>⭐</div>';">`;
}

// 책 표지 이미지 (상세보기용 - 큰 크기)
function getBookCoverImageLarge(book) {
    const imageUrl = book.highResCoverUrl || book.coverUrl || book.localCoverPath;
    
    if (!imageUrl) {
        return '<div class="book-cover-large-placeholder">📚</div>';
    }
    
    if (imageUrl.startsWith('/') || imageUrl.startsWith('file://')) {
        return '<div class="book-cover-large-placeholder">📚</div>';
    }
    
    return `<img src="${escapeHtml(imageUrl)}" alt="${escapeHtml(book.title)}" class="book-cover-large" onerror="this.style.display='none'; this.outerHTML='<div class=\\'book-cover-large-placeholder\\'>📚</div>';">`;
}

// 위시리스트 표지 이미지 (상세보기용 - 큰 크기)
function getWishlistCoverImageLarge(item) {
    const imageUrl = item.highResCoverUrl || item.coverUrl || item.localCoverPath;
    
    if (!imageUrl) {
        return '<div class="book-cover-large-placeholder">⭐</div>';
    }
    
    if (imageUrl.startsWith('/') || imageUrl.startsWith('file://')) {
        return '<div class="book-cover-large-placeholder">⭐</div>';
    }
    
    return `<img src="${escapeHtml(imageUrl)}" alt="${escapeHtml(item.title)}" class="book-cover-large" onerror="this.style.display='none'; this.outerHTML='<div class=\\'book-cover-large-placeholder\\'>⭐</div>';">`;
}

// 현재 대출 정보 조회
function getCurrentLoan(bookId) {
    if (!libraryData.loans) return null;
    return libraryData.loans.find(loan => 
        loan.bookId === bookId && !loan.isReturned
    );
}

// 대출 이력 조회
function getLoanHistory(bookId) {
    if (!libraryData.loans) return [];
    return libraryData.loans
        .filter(loan => loan.bookId === bookId)
        .sort((a, b) => b.loanDate - a.loanDate);
}

// 소장 위치명 조회
function getLocationName(locationId) {
    if (!locationId || !libraryData.locations) return null;
    const location = libraryData.locations.find(loc => loc.id === locationId);
    return location ? location.name : null;
}

// 미디어 타입 텍스트
function getMediaTypeText(mediaType) {
    const types = {
        'BOOK': '📚 책',
        'EBOOK': '📱 전자책',
        'AUDIOBOOK': '🎧 오디오북',
        'CD': '💿 CD',
        'VINYL': '💿 LP/바이닐',
        'DVD': '📀 DVD',
        'BLURAY': '📀 블루레이',
        'COMIC': '📖 만화',
        'MANGA': '📖 망가',
        'MAGAZINE': '📰 잡지',
        'OTHER': '📦 기타'
    };
    return types[mediaType] || mediaType || '📚 책';
}

// 독서 기록 정보
function getReadingRecordInfo(book) {
    if (!book.startReadingDate && !book.finishReadingDate && !book.emotionTag && !book.readingNote) {
        return '';
    }
    
    let html = `<h3>${t('readingRecord')}</h3>`;
    
    if (book.startReadingDate) {
        html += `<p><strong>${t('startReadingDate')}:</strong> ${escapeHtml(book.startReadingDate)}</p>`;
    }
    if (book.finishReadingDate) {
        html += `<p><strong>${t('finishReadingDate')}:</strong> ${escapeHtml(book.finishReadingDate)}</p>`;
    }
    if (book.emotionTag) {
        html += `<p><strong>${t('emotionTag')}:</strong> ${escapeHtml(book.emotionTag)}</p>`;
    }
    if (book.readingNote) {
        html += `<h4>${t('readingNote')}</h4><p style="line-height: 1.6;">${escapeHtml(book.readingNote)}</p>`;
    }
    
    return html;
}

// 미디어 타입별 추가 정보
function getMediaSpecificInfo(book) {
    let html = '';
    
    switch (book.mediaType) {
        case 'EBOOK':
            if (book.fileFormat || book.fileSize || book.filePath) {
                html += `<h3>${t('ebookInfo')}</h3>`;
                if (book.fileFormat) html += `<p><strong>${t('fileFormat')}:</strong> ${escapeHtml(book.fileFormat)}</p>`;
                if (book.fileSize) html += `<p><strong>${t('fileSize')}:</strong> ${escapeHtml(book.fileSize)}</p>`;
                if (book.filePath) html += `<p><strong>${t('filePath')}:</strong> ${escapeHtml(book.filePath)}</p>`;
            }
            break;
            
        case 'CD':
        case 'VINYL':
            if (book.artist || book.albumName || book.trackCount) {
                html += `<h3>${t('audioInfo')}</h3>`;
                if (book.artist) html += `<p><strong>${t('artist')}:</strong> ${escapeHtml(book.artist)}</p>`;
                if (book.albumName) html += `<p><strong>${t('albumName')}:</strong> ${escapeHtml(book.albumName)}</p>`;
                if (book.trackCount) html += `<p><strong>${t('trackCount')}:</strong> ${book.trackCount} ${t('tracks')}</p>`;
            }
            break;
            
        case 'DVD':
        case 'BLURAY':
            if (book.director || book.cast || book.runningTime) {
                html += `<h3>${t('videoInfo')}</h3>`;
                if (book.director) html += `<p><strong>${t('director')}:</strong> ${escapeHtml(book.director)}</p>`;
                if (book.cast) html += `<p><strong>${t('cast')}:</strong> ${escapeHtml(book.cast)}</p>`;
                if (book.runningTime) html += `<p><strong>${t('runningTime')}:</strong> ${book.runningTime} ${t('minutes')}</p>`;
            }
            break;
            
        case 'COMIC':
        case 'MANGA':
            if (book.volumeNumber || book.seriesName || book.isComplete !== null) {
                html += `<h3>${t('comicInfo')}</h3>`;
                if (book.volumeNumber) html += `<p><strong>${t('volumeNumber')}:</strong> ${book.volumeNumber} ${t('volume')}</p>`;
                if (book.seriesName) html += `<p><strong>${t('seriesName')}:</strong> ${escapeHtml(book.seriesName)}</p>`;
                if (book.isComplete !== null) html += `<p><strong>${t('isComplete')}:</strong> ${book.isComplete ? t('completed') : t('ongoing')}</p>`;
            }
            break;
    }
    
    return html;
}

// 대출 상태 박스 생성
function getLoanStatusBox(loan) {
    let statusClass = 'loan-status-normal';
    let statusIcon = '🔄';
    let statusTitle = t('onLoan');
    let overdueInfo = '';
    
    if (loan.dueDate && backupTimestamp) {
        const backupDate = new Date(backupTimestamp);
        const dueDate = new Date(loan.dueDate);
        
        backupDate.setHours(0, 0, 0, 0);
        dueDate.setHours(0, 0, 0, 0);
        
        if (backupDate > dueDate) {
            const overdueDays = Math.floor((backupDate - dueDate) / (1000 * 60 * 60 * 24));
            statusClass = 'loan-status-overdue';
            statusIcon = '⚠️';
            statusTitle = t('overdueTitle');
            overdueInfo = `<p style="color: #d32f2f; font-weight: 600;"><strong>${t('overdueDaysLabel')}:</strong> ${overdueDays}${t('overdueDays')}</p>`;
        }
    }
    
    return `
        <div class="${statusClass}" style="padding: 12px; border-radius: 6px; margin-bottom: 16px; border-left: 4px solid ${statusClass === 'loan-status-overdue' ? '#f44336' : '#ffc107'}; background: ${statusClass === 'loan-status-overdue' ? '#ffebee' : '#fff3cd'};">
            <h3 style="margin-top: 0; color: ${statusClass === 'loan-status-overdue' ? '#c62828' : '#856404'};">${statusIcon} ${statusTitle}</h3>
            <p><strong>${t('borrower')}:</strong> ${escapeHtml(loan.borrowerInfo1)}</p>
            ${loan.borrowerInfo2 ? `<p><strong>${t('info2')}:</strong> ${escapeHtml(loan.borrowerInfo2)}</p>` : ''}
            <p><strong>${t('loanDate')}:</strong> ${formatDate(loan.loanDate)}</p>
            <p><strong>${t('dueDate')}:</strong> ${loan.dueDate ? formatDate(loan.dueDate) : '-'}</p>
            ${overdueInfo}
            ${loan.memo ? `<p><strong>${t('memo')}:</strong> ${escapeHtml(loan.memo)}</p>` : ''}
        </div>
    `;
}

// 백업 날짜 포맷
function formatBackupDate(timestamp) {
    if (!timestamp) return '-';
    const date = new Date(timestamp);
    return date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }) + ' (파일 수정 시간 기준)';
}

// 파일명용 날짜 포맷
function formatDateForFileName(timestamp) {
    if (!timestamp) {
        const now = new Date();
        return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    }
    const date = new Date(timestamp);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

// JSON 내보내기
async function exportToJson() {
    if (!libraryData) {
        alert('내보낼 데이터가 없습니다.');
        return;
    }
    
    try {
        const jsonData = JSON.stringify(libraryData, null, 2);
        const fileName = `mylibrary_backup_${formatDateForFileName(backupTimestamp)}.json`;
        
        const result = await window.electronAPI.saveJsonFile(jsonData, fileName);
        
        if (result.success) {
            alert(`JSON 파일이 저장되었습니다.\n위치: ${result.filePath}`);
        } else if (!result.canceled) {
            alert('파일 저장 중 오류가 발생했습니다: ' + (result.error || '알 수 없는 오류'));
        }
    } catch (error) {
        console.error('Export JSON error:', error);
        alert('JSON 내보내기 중 오류가 발생했습니다: ' + error.message);
    }
}

// CSV 내보내기
async function exportToCsv() {
    if (!libraryData) {
        alert('내보낼 데이터가 없습니다.');
        return;
    }
    
    try {
        // 도서 목록 CSV 생성 (Android 앱과 동일한 형식)
        const csvData = generateBooksCsv(libraryData.books || []);
        const fileName = `mylibrary_books_${formatDateForFileName(backupTimestamp)}.csv`;
        
        const result = await window.electronAPI.saveCsvFile(csvData, fileName);
        
        if (result.success) {
            alert(`CSV 파일이 저장되었습니다.\n위치: ${result.filePath}`);
        } else if (!result.canceled) {
            alert('파일 저장 중 오류가 발생했습니다: ' + (result.error || '알 수 없는 오류'));
        }
    } catch (error) {
        console.error('Export CSV error:', error);
        alert('CSV 내보내기 중 오류가 발생했습니다: ' + error.message);
    }
}

// 도서 목록 CSV 생성 (Android 앱 BackupManager.kt와 동일한 형식)
function generateBooksCsv(books) {
    // UTF-8 BOM 추가 (Excel에서 한글 깨짐 방지)
    const BOM = '\uFEFF';
    
    // 헤더 (33개 필드 - Android 앱과 동일)
    const headers = [
        'ISBN', '제목', '저자', '출판사', '출판일',
        '카테고리', '페이지', '언어', '소장위치', '소장위치ID', '평점',
        '읽음상태', '설명', '메모', '표지URL', '고해상도표지URL', '로컬표지경로',
        '가격', '미디어타입',
        '파일형식', '파일크기', '파일경로',
        '아티스트', '앨범명', '트랙수',
        '감독', '출연진', '러닝타임',
        '권수', '시리즈명', '완결여부',
        '등록일', '수정일', '데이터출처'
    ];
    
    const rows = [headers.join(',')];
    
    // 도서 데이터 처리
    books.forEach(book => {
        const row = [
            escapeCsvField(book.isbn || ''),
            escapeCsvField(book.title || ''),
            escapeCsvField(book.author || ''),
            escapeCsvField(book.publisher || ''),
            escapeCsvField(book.publishDate || ''),
            escapeCsvField(book.category || ''),
            book.pageCount || '',
            escapeCsvField(book.language || ''),
            escapeCsvField(book.location || ''),
            book.locationId || '',
            book.rating || '',
            escapeCsvField(book.readStatus || ''),
            escapeCsvField(book.description || ''),
            escapeCsvField(book.note || ''),
            escapeCsvField(book.coverUrl || ''),
            escapeCsvField(book.highResCoverUrl || ''),
            escapeCsvField(book.localCoverPath || ''),
            escapeCsvField(book.price || ''),
            escapeCsvField(book.mediaType || ''),
            // EBOOK 필드
            escapeCsvField(book.fileFormat || ''),
            escapeCsvField(book.fileSize || ''),
            escapeCsvField(book.filePath || ''),
            // CD/VINYL 필드
            escapeCsvField(book.artist || ''),
            escapeCsvField(book.albumName || ''),
            book.trackCount || '',
            // DVD 필드
            escapeCsvField(book.director || ''),
            escapeCsvField(book.cast || ''),
            book.runningTime || '',
            // COMIC/MANGA 필드
            book.volumeNumber || '',
            escapeCsvField(book.seriesName || ''),
            book.isComplete !== undefined ? book.isComplete : '',
            formatDateForCsv(book.addedDate),
            formatDateForCsv(book.modifiedDate),
            escapeCsvField(book.apiSource || '')
        ];
        
        rows.push(row.join(','));
    });
    
    return BOM + rows.join('\n');
}

// CSV용 날짜 포맷 (밀리초 타임스탬프를 yyyy-MM-dd HH:mm:ss로 변환)
function formatDateForCsv(timestamp) {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// CSV 필드 이스케이프 (쌍따옴표 처리)
function escapeCsvField(field) {
    if (field == null) return '';
    const str = String(field);
    
    // 쉼표, 줄바꿈, 쌍따옴표가 포함되어 있으면 쌍따옴표로 감싸기
    if (str.includes(',') || str.includes('\n') || str.includes('"')) {
        // 쌍따옴표는 두 개로 이스케이프
        return '"' + str.replace(/"/g, '""') + '"';
    }
    
    return str;
}
