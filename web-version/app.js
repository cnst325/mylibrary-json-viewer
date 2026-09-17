// 전역 데이터 저장소
let libraryData = null;
let currentTab = 'books';
let searchTerm = '';
let backupTimestamp = null; // 백업 생성 시점
let currentLanguage = 'en'; // 기본 언어: 영어

// 정렬 상태
let sortState = {
    books: { column: null, ascending: true },
    wishlist: { column: null, ascending: true }
};

// 다국어 지원
const translations = {
    ko: {
        // 헤더
        appTitle: 'MyLibrary JSON Viewer',
        openFile: '📂 JSON 파일 열기',
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
        locationIdLabel: '소장위치ID',
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
        
        // 미디어 타입
        mediaTypeBook: '책',
        mediaTypeEbook: '전자책',
        mediaTypeAudiobook: '오디오북',
        mediaTypeCd: 'CD',
        mediaTypeVinyl: 'LP/바이닐',
        mediaTypeDvd: 'DVD',
        mediaTypeBluray: '블루레이',
        mediaTypeComic: '만화',
        mediaTypeManga: '망가',
        mediaTypeMagazine: '잡지',
        mediaTypeOther: '기타',
        
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
        coverUrl: '표지 URL',
        highResCoverUrl: '고해상도 표지 URL',
        localCoverPath: '로컬 표지 경로',
        
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
        
        // 도움말
        helpTitle: '📖 사용 가이드',
        helpStep1Title: '1️⃣ 파일 열기',
        helpStep1Desc: '상단의 "📂 JSON 파일 열기" 버튼을 클릭하여 MyLibrary 앱에서 내보낸 백업 파일(.json)을 선택하세요.',
        helpStep2Title: '2️⃣ 데이터 탐색',
        helpStep2Desc: '상단 탭(소장 자료, 대출 관리, 대출자, 위시리스트, 보관 위치)을 클릭하여 각 카테고리의 데이터를 확인하세요.',
        helpStep3Title: '3️⃣ 검색',
        helpStep3Desc: '검색창에 도서 제목, 저자, 출판사, ISBN 등을 입력하여 원하는 항목을 실시간으로 빠르게 찾을 수 있습니다.',
        helpStep4Title: '4️⃣ 상세 보기',
        helpStep4Desc: '목록의 행을 클릭하면 상세 정보를 확인할 수 있으며, 책 표지를 클릭하면 고해상도 확대 뷰어로 크게 볼 수 있습니다.',
        helpStep5Title: '5️⃣ 내보내기',
        helpStep5Desc: '현재 보고 있는 소장 도서 목록 데이터를 CSV 파일(Excel 호환)로 내보낼 수 있습니다.',
        helpFeaturesTitle: '✨ 주요 기능',
        helpFeature1: '🔄 자동 저장: 마지막으로 열었던 파일이 브라우저에 자동 저장되어 다시 열립니다 (최대 7일간 유지)',
        helpFeature2: '🌐 다국어 지원: 한국어, 영어, 일본어, 중국어(간체/번체), 독일어, 프랑스어, 스페인어, 이탈리아어, 포르투갈어 지원',
        helpFeature3: '🔒 개인정보 보호: 모든 데이터는 브라우저 내부에서만 안전하게 로컬로 처리됩니다 (외부 서버 전송 없음)',
        helpFeature4: '📱 반응형 UI: 데스크톱 및 태블릿 등 다양한 화면 크기 지원 (최적 해상도: 960px 이상)',
        
        // 날짜 형식
        dateFormat: 'ko-KR'
    },
    en: {
        // Header
        appTitle: 'MyLibrary JSON Viewer',
        openFile: '📂 Open JSON File',
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
        locationIdLabel: 'Location ID',
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
        
        // Media Types
        mediaTypeBook: 'Book',
        mediaTypeEbook: 'E-book',
        mediaTypeAudiobook: 'Audiobook',
        mediaTypeCd: 'CD',
        mediaTypeVinyl: 'LP/Vinyl',
        mediaTypeDvd: 'DVD',
        mediaTypeBluray: 'Blu-ray',
        mediaTypeComic: 'Comic',
        mediaTypeManga: 'Manga',
        mediaTypeMagazine: 'Magazine',
        mediaTypeOther: 'Other',
        
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
        coverUrl: 'Cover URL',
        highResCoverUrl: 'High-Res Cover URL',
        localCoverPath: 'Local Cover Path',
        
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
        
        // Help
        helpTitle: '📖 User Guide',
        helpStep1Title: '1️⃣ Open File',
        helpStep1Desc: 'Click the "📂 Open JSON File" button and select a backup file (.json) exported from the MyLibrary app.',
        helpStep2Title: '2️⃣ Explore Data',
        helpStep2Desc: 'Click the tabs (Collection, Loans, Borrowers, Wishlist, Locations) to browse data in each category.',
        helpStep3Title: '3️⃣ Search',
        helpStep3Desc: 'Type a title, author, publisher, ISBN, etc. in the search box to quickly filter and find items in real time.',
        helpStep4Title: '4️⃣ View Details',
        helpStep4Desc: 'Click any row in the table to view full details. You can also click the book cover to enlarge it in high resolution.',
        helpStep5Title: '5️⃣ Export',
        helpStep5Desc: 'Export the currently displayed collection data into a CSV file for Excel and spreadsheet tools.',
        helpFeaturesTitle: '✨ Key Features',
        helpFeature1: '🔄 Auto-Save: The last opened file is saved in your browser and automatically restored (valid for 7 days)',
        helpFeature2: '🌐 Multilingual: English, Korean, Japanese, Simplified Chinese, Traditional Chinese, German, French, Spanish, Italian, and Portuguese support',
        helpFeature3: '🔒 Privacy First: All data is processed locally in your browser (no server uploads)',
        helpFeature4: '📱 Responsive UI: Supports various screen sizes on desktop and tablet (recommended: 960px+)',
        
        // Date Format
        dateFormat: 'en-US'
    },
    ja: {
        // ヘッダー
        appTitle: 'MyLibrary JSON ビューア',
        openFile: '📂 JSONファイルを開く',
        exportCsv: '📊 CSVエクスポート',
        
        // ファイル情報
        fileName: 'ファイル名:',
        filePath: 'パス:',
        backupDate: 'バックアップ日:',
        backupNotice: 'すべての貸出状態と延滞情報は、バックアップ作成時点を基準に表示されます。',
        
        // タブ
        books: '📖 コレクション',
        loans: '📤 貸出',
        borrowers: '👥 借用者',
        wishlist: '⭐ ウィッシュリスト',
        locations: '📍 保管場所',
        
        // 検索
        searchPlaceholder: '検索...',
        clearSearch: '🔄 クリア',
        
        // ウェルカム画面
        welcomeTitle: '📚 MyLibrary JSON ビューア',
        welcomeDesc: 'MyLibrary Managementアプリからエクスポートされたバックアップファイルを表示できます。',
        
        // テーブルヘッダー - Books
        cover: '表紙',
        title: 'タイトル',
        author: '著者',
        publisher: '出版社',
        isbn: 'ISBN',
        category: 'カテゴリー',
        location: '場所',
        locationIdLabel: '場所ID',
        status: 'ステータス',
        
        // テーブルヘッダー - Loans
        bookTitle: '本のタイトル',
        borrower: '借用者',
        loanDate: '貸出日',
        dueDate: '返却予定日',
        returnDate: '返却日',
        
        // テーブルヘッダー - Borrowers
        info1: '情報1',
        info2: '情報2',
        createdDate: '登録日',
        
        // テーブルヘッダー - Wishlist
        price: '価格',
        priority: '優先度',
        addedDate: '登録日',
        
        // テーブルヘッダー - Locations
        name: '名前',
        description: '説明',
        
        // 読書ステータス
        unread: '未読',
        reading: '読書中',
        read: '既読',
        
        // 貸出ステータス
        returned: '返却済み',
        onLoan: 'バックアップ時点で貸出中',
        overdue: 'バックアップ時点で延滞',
        overdueDays: '日',
        
        // 詳細情報
        basicInfo: '基本情報',
        collectionInfo: '保管情報',
        readingRecord: '読書記録',
        loanHistory: '貸出履歴',
        otherInfo: 'その他',
        mediaType: 'メディアタイプ',
        rating: '評価',
        readStatus: '読書ステータス',
        pages: 'ページ',
        language: '言語',
        apiSource: 'データソース',
        note: 'ノート',
        memo: 'メモ',
        publishDate: '出版日',
        description: '説明',
        
        // 読書記録
        startReadingDate: '読書開始日',
        finishReadingDate: '読書完了日',
        emotionTag: '感情タグ',
        readingNote: '読書ノート',
        
        // メディアタイプ
        mediaTypeBook: '本',
        mediaTypeEbook: '電子書籍',
        mediaTypeAudiobook: 'オーディオブック',
        mediaTypeCd: 'CD',
        mediaTypeVinyl: 'LP/バイニル',
        mediaTypeDvd: 'DVD',
        mediaTypeBluray: 'ブルーレイ',
        mediaTypeComic: 'コミック',
        mediaTypeManga: 'マンガ',
        mediaTypeMagazine: '雑誌',
        mediaTypeOther: 'その他',
        
        // メディアタイプ別
        ebookInfo: '電子書籍情報',
        audioInfo: '音楽情報',
        videoInfo: '映像情報',
        comicInfo: 'コミック情報',
        fileFormat: 'ファイル形式',
        fileSize: 'ファイルサイズ',
        filePath: 'ファイルパス',
        artist: 'アーティスト',
        albumName: 'アルバム名',
        trackCount: 'トラック数',
        tracks: '曲',
        director: '監督',
        cast: '出演',
        runningTime: '上映時間',
        minutes: '分',
        volumeNumber: '巻数',
        volume: '巻',
        seriesName: 'シリーズ',
        isComplete: '完結',
        completed: '完結',
        ongoing: '連載中',
        coverUrl: '表紙URL',
        highResCoverUrl: '高解像度表紙URL',
        localCoverPath: 'ローカル表紙パス',
        
        // 貸出情報
        loanInfo: '貸出情報',
        bookInfo: '本情報',
        borrowerInfo: '借用者情報',
        loanDetail: '貸出詳細',
        borrowerNote: '借用者ノート',
        loanMemo: 'メモ',
        overdueDaysLabel: '経過日数',
        overdueTitle: 'バックアップ時点で返却期限超過',
        
        // 借用者情報
        borrowerDetail: '借用者情報',
        lastBorrowDate: '最終貸出日',
        totalBorrows: '総貸出回数',
        times: '回',
        isActive: 'アクティブ状態',
        active: 'アクティブ',
        inactive: '非アクティブ',
        isFavorite: 'お気に入り',
        
        // 場所情報
        locationDetail: '場所情報',
        room: '部屋',
        shelf: '棚',
        order: '順序',
        modifiedDate: '修正日',
        
        // メッセージ
        noData: 'データがありません。',
        unknown: '不明',
        
        // ヘルプ
        helpTitle: '📖 使い方ガイド',
        helpStep1Title: '1️⃣ ファイルを開く',
        helpStep1Desc: '「📂 JSONファイルを開く」ボタンをクリックし、MyLibraryアプリからエクスポートしたバックアップファイル（.json）を選択してください。',
        helpStep2Title: '2️⃣ データ探索',
        helpStep2Desc: '上部タブ（蔵書、貸出、借主、欲しい本、保管場所）をクリックして、各カテゴリーのデータを確認できます。',
        helpStep3Title: '3️⃣ 検索',
        helpStep3Desc: '検索ボックスにタイトル、著者、出版社、ISBNなどを入力すると、目的のデータを素早く検索できます。',
        helpStep4Title: '4️⃣ 詳細表示',
        helpStep4Desc: '行をクリックすると詳細情報を確認できます。また、表紙画像をクリックすると高解像度ビューアで大きく拡大表示できます。',
        helpStep5Title: '5️⃣ エクスポート',
        helpStep5Desc: '表示中の蔵書データをCSVファイル（Excel対応）としてエクスポートできます。',
        helpFeaturesTitle: '✨ 主な機能',
        helpFeature1: '🔄 自動保存: 最後に開いたファイルがブラウザに自動保存され、次回も読み込まれます（有効期間7日）',
        helpFeature2: '🌐 多言語対応: 日本語、英語、韓国語、簡体字中国語、繁体字中国語、ドイツ語、フランス語、スペイン語、イタリア語、ポルトガル語対応',
        helpFeature3: '🔒 プライバシー保護: すべてのデータはブラウザ内でのみローカル処理されます（外部送信なし）',
        helpFeature4: '📱 レスポンシブUI: デスクトップやタブレットなど多彩な画面サイズに対応（推奨: 960px以上）',
        
        // 日付形式
        dateFormat: 'ja-JP'
    },
    de: {
        // Header
        appTitle: 'MyLibrary JSON Viewer',
        openFile: '📂 JSON-Datei öffnen',
        exportCsv: '📊 CSV exportieren',
        
        // Dateiinformationen
        fileName: 'Dateiname:',
        filePath: 'Pfad:',
        backupDate: 'Backup-Datum:',
        backupNotice: 'Alle Ausleihstatus und Überfälligkeitsinformationen werden zum Zeitpunkt der Backup-Erstellung angezeigt.',
        
        // Tabs
        books: '📖 Sammlung',
        loans: '📤 Ausleihen',
        borrowers: '👥 Ausleiher',
        wishlist: '⭐ Wunschliste',
        locations: '📍 Standorte',
        
        // Suche
        searchPlaceholder: 'Suchen...',
        clearSearch: '🔄 Löschen',
        
        // Willkommensbildschirm
        welcomeTitle: '📚 MyLibrary JSON Viewer',
        welcomeDesc: 'Zeigen Sie JSON-Backup-Dateien an, die aus der MyLibrary Management-App exportiert wurden.',
        
        // Tabellenüberschriften - Bücher
        cover: 'Cover',
        title: 'Titel',
        author: 'Autor',
        publisher: 'Verlag',
        isbn: 'ISBN',
        category: 'Kategorie',
        location: 'Standort',
        locationIdLabel: 'Standort-ID',
        status: 'Status',
        
        // Tabellenüberschriften - Ausleihen
        bookTitle: 'Buchtitel',
        borrower: 'Ausleiher',
        loanDate: 'Ausleihdatum',
        dueDate: 'Rückgabedatum',
        returnDate: 'Zurückgegeben am',
        
        // Tabellenüberschriften - Ausleiher
        info1: 'Info 1',
        info2: 'Info 2',
        createdDate: 'Erstellt am',
        
        // Tabellenüberschriften - Wunschliste
        price: 'Preis',
        priority: 'Priorität',
        addedDate: 'Hinzugefügt am',
        
        // Tabellenüberschriften - Standorte
        name: 'Name',
        description: 'Beschreibung',
        
        // Lesestatus
        unread: 'Ungelesen',
        reading: 'Lese ich',
        read: 'Gelesen',
        
        // Ausleihstatus
        returned: 'Zurückgegeben',
        onLoan: 'Zum Backup-Zeitpunkt ausgeliehen',
        overdue: 'Zum Backup-Zeitpunkt überfällig',
        overdueDays: 'Tage',
        
        // Detailinformationen
        basicInfo: 'Grundinformationen',
        collectionInfo: 'Sammlungsinformationen',
        readingRecord: 'Leseprotokoll',
        loanHistory: 'Ausleihhistorie',
        otherInfo: 'Sonstiges',
        mediaType: 'Medientyp',
        rating: 'Bewertung',
        readStatus: 'Lesestatus',
        pages: 'Seiten',
        language: 'Sprache',
        apiSource: 'Datenquelle',
        note: 'Notiz',
        memo: 'Memo',
        publishDate: 'Veröffentlichungsdatum',
        description: 'Beschreibung',
        
        // Leseprotokoll
        startReadingDate: 'Lesebeginn',
        finishReadingDate: 'Leseabschluss',
        emotionTag: 'Emotions-Tag',
        readingNote: 'Lesenotiz',
        
        // Medientypen
        mediaTypeBook: 'Buch',
        mediaTypeEbook: 'E-Book',
        mediaTypeAudiobook: 'Hörbuch',
        mediaTypeCd: 'CD',
        mediaTypeVinyl: 'LP/Vinyl',
        mediaTypeDvd: 'DVD',
        mediaTypeBluray: 'Blu-ray',
        mediaTypeComic: 'Comic',
        mediaTypeManga: 'Manga',
        mediaTypeMagazine: 'Magazin',
        mediaTypeOther: 'Sonstiges',
        
        // Medientypspezifisch
        ebookInfo: 'E-Book-Informationen',
        audioInfo: 'Audio-Informationen',
        videoInfo: 'Video-Informationen',
        comicInfo: 'Comic-Informationen',
        fileFormat: 'Dateiformat',
        fileSize: 'Dateigröße',
        filePath: 'Dateipfad',
        artist: 'Künstler',
        albumName: 'Album',
        trackCount: 'Anzahl Titel',
        tracks: 'Titel',
        director: 'Regisseur',
        cast: 'Besetzung',
        runningTime: 'Laufzeit',
        minutes: 'Minuten',
        volumeNumber: 'Bandnummer',
        volume: 'Band',
        seriesName: 'Serie',
        isComplete: 'Abgeschlossen',
        completed: 'Abgeschlossen',
        ongoing: 'Laufend',
        coverUrl: 'Cover-URL',
        highResCoverUrl: 'Cover-URL (HD)',
        localCoverPath: 'Lokaler Cover-Pfad',
        
        // Ausleihinformationen
        loanInfo: 'Ausleihinformationen',
        bookInfo: 'Buchinformationen',
        borrowerInfo: 'Ausleiherinformationen',
        loanDetail: 'Ausleihdetails',
        borrowerNote: 'Ausleiher-Notiz',
        loanMemo: 'Memo',
        overdueDaysLabel: 'Verstrichene Tage',
        overdueTitle: 'Rückgabedatum zum Backup-Zeitpunkt überschritten',
        
        // Ausleiherinformationen
        borrowerDetail: 'Ausleiherdetails',
        lastBorrowDate: 'Letzte Ausleihe',
        totalBorrows: 'Gesamtzahl Ausleihen',
        times: 'Mal',
        isActive: 'Aktiv',
        active: 'Aktiv',
        inactive: 'Inaktiv',
        isFavorite: 'Favorit',
        
        // Standortinformationen
        locationDetail: 'Standortdetails',
        room: 'Raum',
        shelf: 'Regal',
        order: 'Reihenfolge',
        modifiedDate: 'Geändert am',
        
        // Nachrichten
        noData: 'Keine Daten verfügbar.',
        unknown: 'Unbekannt',
        
        // Hilfe
        helpTitle: '📖 Benutzerhandbuch',
        helpStep1Title: '1️⃣ Datei öffnen',
        helpStep1Desc: 'Klicken Sie auf "📂 JSON-Datei öffnen" und wählen Sie eine aus der MyLibrary-App exportierte Backup-Datei (.json) aus.',
        helpStep2Title: '2️⃣ Daten durchsuchen',
        helpStep2Desc: 'Klicken Sie auf die Registerkarten (Sammlung, Ausleihen, Entleiher, Wunschliste, Standorte), um die einzelnen Kategorien zu durchsuchen.',
        helpStep3Title: '3️⃣ Suchen',
        helpStep3Desc: 'Geben Sie Titel, Autor, Verlag, ISBN usw. in das Suchfeld ein, um Einträge in Echtzeit schnell zu finden.',
        helpStep4Title: '4️⃣ Details anzeigen',
        helpStep4Desc: 'Klicken Sie auf eine Tabellenzeile für Details. Klicken Sie auf das Buchcover, um es in hoher Auflösung vergrößert anzuzeigen.',
        helpStep5Title: '5️⃣ Exportieren',
        helpStep5Desc: 'Exportieren Sie die angezeigten Sammlungsdaten als CSV-Datei für Excel und Tabellenkalkulationen.',
        helpFeaturesTitle: '✨ Hauptfunktionen',
        helpFeature1: '🔄 Automatisches Speichern: Die zuletzt geöffnete Datei wird lokal gespeichert und automatisch geladen (7 Tage gültig)',
        helpFeature2: '🌐 Mehrsprachig: Unterstützung für Deutsch, Englisch, Koreanisch, Japanisch, vereinfachtes Chinesisch, traditionelles Chinesisch, Französisch, Spanisch, Italienisch und Portugiesisch',
        helpFeature3: '🔒 Datenschutz: Alle Daten werden ausschließlich lokal in Ihrem Browser verarbeitet (kein Server-Upload)',
        helpFeature4: '📱 Responsive Benutzeroberfläche: Optimiert für Desktop und Tablets (empfohlen: 960px+)',
        
        // Datumsformat
        dateFormat: 'de-DE'
    }
};

const localeOverrides = {
    fr: {
        appTitle: 'MyLibrary JSON Viewer',
        openFile: '📂 Ouvrir un fichier JSON',
        exportCsv: '📊 Exporter en CSV',

        // File Info
        fileName: 'Nom du fichier:',
        filePath: 'Chemin:',
        backupDate: 'Date de sauvegarde:',
        backupNotice: 'Toutes les informations de prêt et de retard sont affichées selon l\'heure de création de la sauvegarde.',

        // Tabs
        books: '📖 Collection',
        loans: '📤 Prêts',
        borrowers: '👥 Emprunteurs',
        wishlist: '⭐ Liste de souhaits',
        locations: '📍 Emplacements',

        // Search
        searchPlaceholder: 'Rechercher...',
        clearSearch: '🔄 Effacer',

        // Welcome
        welcomeTitle: '📚 MyLibrary JSON Viewer',
        welcomeDesc: 'Consultez les fichiers JSON exportés depuis l\'application MyLibrary Management.',

        // Table Headers - Books
        cover: 'Couverture',
        title: 'Titre',
        author: 'Auteur',
        publisher: 'Éditeur',
        isbn: 'ISBN',
        category: 'Catégorie',
        location: 'Emplacement',
        locationIdLabel: 'ID de l\'emplacement',
        status: 'Statut',

        // Table Headers - Loans
        bookTitle: 'Titre du livre',
        borrower: 'Emprunteur',
        loanDate: 'Date de prêt',
        dueDate: 'Date d\'échéance',
        returnDate: 'Date de retour',

        // Table Headers - Borrowers
        info1: 'Info 1',
        info2: 'Info 2',
        createdDate: 'Créé',

        // Table Headers - Wishlist
        price: 'Prix',
        priority: 'Priorité',
        addedDate: 'Ajouté',

        // Table Headers - Locations
        name: 'Nom',
        description: 'Description',

        // Read Status
        unread: 'Non lu',
        reading: 'En cours',
        read: 'Lu',

        // Loan Status
        returned: 'Rendu',
        onLoan: 'En prêt (au moment du backup)',
        overdue: 'En retard (au moment du backup)',
        overdueDays: 'j',

        // Detail Info
        basicInfo: 'Informations de base',
        collectionInfo: 'Informations de la collection',
        readingRecord: 'Historique de lecture',
        loanHistory: 'Historique des prêts',
        otherInfo: 'Autres informations',
        mediaType: 'Type de média',
        rating: 'Évaluation',
        readStatus: 'Statut de lecture',
        pages: 'Pages',
        language: 'Langue',
        apiSource: 'Source des données',
        note: 'Note',
        memo: 'Mémo',
        publishDate: 'Date de publication',
        description: 'Description',

        // Reading Record
        startReadingDate: 'Début de lecture',
        finishReadingDate: 'Fin de lecture',
        emotionTag: 'Étiquette émotionnelle',
        readingNote: 'Note de lecture',

        // Media Types
        mediaTypeBook: 'Livre',
        mediaTypeEbook: 'Livre numérique',
        mediaTypeAudiobook: 'Livre audio',
        mediaTypeCd: 'CD',
        mediaTypeVinyl: 'Disque vinyle',
        mediaTypeDvd: 'DVD',
        mediaTypeBluray: 'Blu-ray',
        mediaTypeComic: 'Bande dessinée',
        mediaTypeManga: 'Manga',
        mediaTypeMagazine: 'Magazine',
        mediaTypeOther: 'Autre',

        // Media Type Specific
        ebookInfo: 'Informations sur le livre numérique',
        audioInfo: 'Informations audio',
        videoInfo: 'Informations vidéo',
        comicInfo: 'Informations sur la BD',
        fileFormat: 'Format de fichier',
        fileSize: 'Taille du fichier',
        filePath: 'Chemin du fichier',
        artist: 'Artiste',
        albumName: 'Album',
        trackCount: 'Titres',
        tracks: 'titres',
        director: 'Réalisateur',
        cast: 'Distribution',
        runningTime: 'Durée',
        minutes: 'min',
        volumeNumber: 'Volume',
        volume: 'vol',
        seriesName: 'Série',
        isComplete: 'Statut',
        completed: 'Terminé',
        ongoing: 'En cours',
        coverUrl: 'URL de la couverture',
        highResCoverUrl: 'URL de la couverture HD',
        localCoverPath: 'Chemin de couverture local',

        // Loan Info
        loanInfo: 'Informations de prêt',
        bookInfo: 'Informations sur le livre',
        borrowerInfo: 'Informations sur l\'emprunteur',
        loanDetail: 'Détails du prêt',
        borrowerNote: 'Note de l\'emprunteur',
        loanMemo: 'Mémo de prêt',
        overdueDaysLabel: 'Jours de retard',
        overdueTitle: 'Date de retour dépassée (au moment du backup)',

        // Borrower Info
        borrowerDetail: 'Détails de l\'emprunteur',
        lastBorrowDate: 'Dernier prêt',
        totalBorrows: 'Total de prêts',
        times: 'fois',
        isActive: 'Statut',
        active: 'Actif',
        inactive: 'Inactif',
        isFavorite: 'Favori',

        // Location Info
        locationDetail: 'Détails de l\'emplacement',
        room: 'Salle',
        shelf: 'Étagère',
        order: 'Ordre',
        modifiedDate: 'Modifié le',

        // Messages
        noData: 'Aucune donnée disponible.',
        unknown: 'Inconnu',

        // Help
        helpTitle: '📖 Guide d\'utilisation',
        helpStep1Title: '1️⃣ Ouvrir un fichier',
        helpStep1Desc: 'Cliquez sur le bouton "📂 Ouvrir un fichier JSON" et choisissez un fichier de sauvegarde (.json) exporté depuis MyLibrary.',
        helpStep2Title: '2️⃣ Explorer les données',
        helpStep2Desc: 'Cliquez sur les onglets (Collection, Prêts, Emprunteurs, Liste de souhaits, Emplacements) pour parcourir chaque catégorie.',
        helpStep3Title: '3️⃣ Rechercher',
        helpStep3Desc: 'Saisissez un titre, auteur, éditeur, ISBN, etc. dans la barre de recherche pour trouver rapidement des éléments en temps réel.',
        helpStep4Title: '4️⃣ Afficher les détails',
        helpStep4Desc: 'Cliquez sur une ligne du tableau pour afficher tous les détails. Vous pouvez aussi cliquer sur la couverture du livre pour l\'agrandir en haute résolution.',
        helpStep5Title: '5️⃣ Exporter',
        helpStep5Desc: 'Exportez les données de la collection affichée au format CSV compatible avec Excel.',
        helpFeaturesTitle: '✨ Fonctionnalités clés',
        helpFeature1: '🔄 Sauvegarde automatique : le dernier fichier ouvert est conservé et rechargé automatiquement (valide 7 jours)',
        helpFeature2: '🌐 Multilingue : prise en charge du français, de l\'anglais, du coréen, du japonais, du chinois simplifié, du chinois traditionnel, de l\'allemand, de l\'espagnol, de l\'italien et du portugais',
        helpFeature3: '🔒 Confidentialité absolue : toutes vos données sont traitées localement dans votre navigateur (aucun envoi sur serveur)',
        helpFeature4: '📱 Interface responsive : adaptée à différentes tailles d\'écran (recommandé : 960px ou plus)',

        dateFormat: 'fr-FR'
    },
    es: {
        appTitle: 'MyLibrary JSON Viewer',
        openFile: '📂 Abrir archivo JSON',
        exportCsv: '📊 Exportar CSV',

        // File Info
        fileName: 'Nombre del archivo:',
        filePath: 'Ruta:',
        backupDate: 'Fecha de respaldo:',
        backupNotice: 'Todos los estados de préstamo y la información de vencimiento se muestran según el momento de creación del respaldo.',

        // Tabs
        books: '📖 Colección',
        loans: '📤 Préstamos',
        borrowers: '👥 Prestatarios',
        wishlist: '⭐ Lista de deseos',
        locations: '📍 Ubicaciones',

        // Search
        searchPlaceholder: 'Buscar...',
        clearSearch: '🔄 Limpiar',

        // Welcome
        welcomeTitle: '📚 MyLibrary JSON Viewer',
        welcomeDesc: 'Visualiza archivos JSON exportados desde la app MyLibrary Management.',

        // Table Headers - Books
        cover: 'Portada',
        title: 'Título',
        author: 'Autor',
        publisher: 'Editorial',
        isbn: 'ISBN',
        category: 'Categoría',
        location: 'Ubicación',
        locationIdLabel: 'ID de ubicación',
        status: 'Estado',

        // Table Headers - Loans
        bookTitle: 'Título del libro',
        borrower: 'Prestatario',
        loanDate: 'Fecha de préstamo',
        dueDate: 'Fecha de devolución',
        returnDate: 'Fecha de retorno',

        // Table Headers - Borrowers
        info1: 'Info 1',
        info2: 'Info 2',
        createdDate: 'Creado',

        // Table Headers - Wishlist
        price: 'Precio',
        priority: 'Prioridad',
        addedDate: 'Fecha añadida',

        // Table Headers - Locations
        name: 'Nombre',
        description: 'Descripción',

        // Reading Status
        unread: 'Sin leer',
        reading: 'Leyendo',
        read: 'Leído',

        // Loan Status
        returned: 'Devuelto',
        onLoan: 'Prestado (en el respaldo)',
        overdue: 'Atrasado (en el respaldo)',
        overdueDays: 'd',

        // Detail Info
        basicInfo: 'Información básica',
        collectionInfo: 'Información de la colección',
        readingRecord: 'Registro de lectura',
        loanHistory: 'Historial de préstamos',
        otherInfo: 'Otra información',
        mediaType: 'Tipo de medio',
        rating: 'Calificación',
        readStatus: 'Estado de lectura',
        pages: 'Páginas',
        language: 'Idioma',
        apiSource: 'Fuente de datos',
        note: 'Nota',
        memo: 'Memo',
        publishDate: 'Fecha de publicación',
        description: 'Descripción',

        // Reading Record
        startReadingDate: 'Inicio de lectura',
        finishReadingDate: 'Fin de lectura',
        emotionTag: 'Etiqueta emocional',
        readingNote: 'Nota de lectura',

        // Media Types
        mediaTypeBook: 'Libro',
        mediaTypeEbook: 'Libro electrónico',
        mediaTypeAudiobook: 'Audiolibro',
        mediaTypeCd: 'CD',
        mediaTypeVinyl: 'Vinilo',
        mediaTypeDvd: 'DVD',
        mediaTypeBluray: 'Blu-ray',
        mediaTypeComic: 'Cómic',
        mediaTypeManga: 'Manga',
        mediaTypeMagazine: 'Revista',
        mediaTypeOther: 'Otros',

        // Media Specific
        ebookInfo: 'Información del libro electrónico',
        audioInfo: 'Información de audio',
        videoInfo: 'Información de video',
        comicInfo: 'Información del cómic',
        fileFormat: 'Formato de archivo',
        fileSize: 'Tamaño del archivo',
        filePath: 'Ruta del archivo',
        artist: 'Artista',
        albumName: 'Álbum',
        trackCount: 'Pistas',
        tracks: 'pistas',
        director: 'Director',
        cast: 'Reparto',
        runningTime: 'Duración',
        minutes: 'min',
        volumeNumber: 'Volumen',
        volume: 'vol',
        seriesName: 'Serie',
        isComplete: 'Estado',
        completed: 'Completado',
        ongoing: 'En curso',
        coverUrl: 'URL de la portada',
        highResCoverUrl: 'URL de la portada en alta resolución',
        localCoverPath: 'Ruta local de la portada',

        // Loan Info
        loanInfo: 'Información de préstamo',
        bookInfo: 'Información del libro',
        borrowerInfo: 'Información del prestatario',
        loanDetail: 'Detalles del préstamo',
        borrowerNote: 'Nota del prestatario',
        loanMemo: 'Memo de préstamo',
        overdueDaysLabel: 'Días de demora',
        overdueTitle: 'Fecha de devolución vencida (en el respaldo)',

        // Borrower Info
        borrowerDetail: 'Detalles del prestatario',
        lastBorrowDate: 'Último préstamo',
        totalBorrows: 'Total de préstamos',
        times: 'veces',
        isActive: 'Estado',
        active: 'Activo',
        inactive: 'Inactivo',
        isFavorite: 'Favorito',

        // Location Info
        locationDetail: 'Detalles de ubicación',
        room: 'Sala',
        shelf: 'Estante',
        order: 'Orden',
        modifiedDate: 'Modificado',

        // Messages
        noData: 'No hay datos disponibles.',
        unknown: 'Desconocido',

        // Help
        helpTitle: '📖 Guía de uso',
        helpStep1Title: '1️⃣ Abrir archivo',
        helpStep1Desc: 'Haz clic en el botón "📂 Abrir archivo JSON" y selecciona una copia de seguridad (.json) exportada desde la app MyLibrary.',
        helpStep2Title: '2️⃣ Explorar datos',
        helpStep2Desc: 'Haz clic en las pestañas (Colección, Préstamos, Prestatarios, Lista de deseos, Ubicaciones) para explorar cada categoría.',
        helpStep3Title: '3️⃣ Buscar',
        helpStep3Desc: 'Escribe título, autor, editorial, ISBN, etc. en el cuadro de búsqueda para encontrar elementos en tiempo real.',
        helpStep4Title: '4️⃣ Ver detalles',
        helpStep4Desc: 'Haz clic en una fila de la tabla para ver todos los detalles. También puedes hacer clic en la portada del libro para ampliarla en alta resolución.',
        helpStep5Title: '5️⃣ Exportar',
        helpStep5Desc: 'Exporta los datos de la colección visible a un archivo CSV compatible con Excel.',
        helpFeaturesTitle: '✨ Funciones clave',
        helpFeature1: '🔄 Guardado automático: el último archivo abierto se guarda en el navegador y se carga automáticamente (válido 7 días)',
        helpFeature2: '🌐 Multilingüe: soporte para español, inglés, coreano, japonés, chino simplificado, chino tradicional, alemán, francés, italiano y portugués',
        helpFeature3: '🔒 Máxima privacidad: todos los datos se procesan localmente en tu navegador (sin envíos al servidor)',
        helpFeature4: '📱 Diseño responsivo: compatible con diversas resoluciones de pantalla (recomendado: 960px o más)',

        dateFormat: 'es-ES'
    },
    it: {
        appTitle: 'MyLibrary JSON Viewer',
        openFile: '📂 Apri file JSON',
        exportCsv: '📊 Esporta CSV',

        // File Info
        fileName: 'Nome file:',
        filePath: 'Percorso:',
        backupDate: 'Data backup:',
        backupNotice: 'Tutte le informazioni sui prestiti e sui ritardi sono visualizzate in base al momento della creazione del backup.',

        // Tabs
        books: '📖 Collezione',
        loans: '📤 Prestiti',
        borrowers: '👥 Mutuatari',
        wishlist: '⭐ Lista desideri',
        locations: '📍 Posizioni',

        // Search
        searchPlaceholder: 'Cerca...',
        clearSearch: '🔄 Cancella',

        // Welcome
        welcomeTitle: '📚 MyLibrary JSON Viewer',
        welcomeDesc: 'Visualizza i file di backup JSON esportati dall\'app MyLibrary Management.',

        // Table Headers - Books
        cover: 'Copertina',
        title: 'Titolo',
        author: 'Autore',
        publisher: 'Editore',
        isbn: 'ISBN',
        category: 'Categoria',
        location: 'Posizione',
        locationIdLabel: 'ID posizione',
        status: 'Stato',

        // Table Headers - Loans
        bookTitle: 'Titolo libro',
        borrower: 'Mutuatario',
        loanDate: 'Data prestito',
        dueDate: 'Data scadenza',
        returnDate: 'Data restituzione',

        // Table Headers - Borrowers
        info1: 'Info 1',
        info2: 'Info 2',
        createdDate: 'Creato',

        // Table Headers - Wishlist
        price: 'Prezzo',
        priority: 'Priorità',
        addedDate: 'Data aggiunta',

        // Table Headers - Locations
        name: 'Nome',
        description: 'Descrizione',

        // Reading Status
        unread: 'Non letto',
        reading: 'In lettura',
        read: 'Letto',

        // Loan Status
        returned: 'Restituito',
        onLoan: 'In prestito (al momento del backup)',
        overdue: 'In ritardo (al momento del backup)',
        overdueDays: 'gg',

        // Detail Info
        basicInfo: 'Informazioni di base',
        collectionInfo: 'Informazioni collezione',
        readingRecord: 'Registro lettura',
        loanHistory: 'Cronologia prestiti',
        otherInfo: 'Altre informazioni',
        mediaType: 'Tipo di media',
        rating: 'Valutazione',
        readStatus: 'Stato lettura',
        pages: 'Pagine',
        language: 'Lingua',
        apiSource: 'Fonte dati',
        note: 'Nota',
        memo: 'Memo',
        publishDate: 'Data pubblicazione',
        description: 'Descrizione',

        // Reading Record
        startReadingDate: 'Inizio lettura',
        finishReadingDate: 'Fine lettura',
        emotionTag: 'Tag emotivo',
        readingNote: 'Nota di lettura',

        // Media Types
        mediaTypeBook: 'Libro',
        mediaTypeEbook: 'E-book',
        mediaTypeAudiobook: 'Audiolibro',
        mediaTypeCd: 'CD',
        mediaTypeVinyl: 'Vinile',
        mediaTypeDvd: 'DVD',
        mediaTypeBluray: 'Blu-ray',
        mediaTypeComic: 'Fumetto',
        mediaTypeManga: 'Manga',
        mediaTypeMagazine: 'Rivista',
        mediaTypeOther: 'Altro',

        // Media Specific
        ebookInfo: 'Informazioni e-book',
        audioInfo: 'Informazioni audio',
        videoInfo: 'Informazioni video',
        comicInfo: 'Informazioni fumetto',
        fileFormat: 'Formato file',
        fileSize: 'Dimensione file',
        filePath: 'Percorso file',
        artist: 'Artista',
        albumName: 'Album',
        trackCount: 'Tracce',
        tracks: 'tracce',
        director: 'Regista',
        cast: 'Cast',
        runningTime: 'Durata',
        minutes: 'min',
        volumeNumber: 'Volume',
        volume: 'vol',
        seriesName: 'Serie',
        isComplete: 'Stato',
        completed: 'Completato',
        ongoing: 'In corso',
        coverUrl: 'URL copertina',
        highResCoverUrl: 'URL copertina HD',
        localCoverPath: 'Percorso copertina locale',

        // Loan Info
        loanInfo: 'Informazioni prestito',
        bookInfo: 'Informazioni libro',
        borrowerInfo: 'Informazioni mutuatario',
        loanDetail: 'Dettagli prestito',
        borrowerNote: 'Nota mutuatario',
        loanMemo: 'Memo prestito',
        overdueDaysLabel: 'Giorni di ritardo',
        overdueTitle: 'Data di restituzione scaduta (al momento del backup)',

        // Borrower Info
        borrowerDetail: 'Dettagli mutuatario',
        lastBorrowDate: 'Ultimo prestito',
        totalBorrows: 'Prestiti totali',
        times: 'volte',
        isActive: 'Stato',
        active: 'Attivo',
        inactive: 'Inattivo',
        isFavorite: 'Preferito',

        // Location Info
        locationDetail: 'Dettagli posizione',
        room: 'Stanza',
        shelf: 'Scaffale',
        order: 'Ordine',
        modifiedDate: 'Modificato',

        // Messages
        noData: 'Nessun dato disponibile.',
        unknown: 'Sconosciuto',

        // Help
        helpTitle: '📖 Guida all\'uso',
        helpStep1Title: '1️⃣ Apri file',
        helpStep1Desc: 'Fai clic sul pulsante "📂 Apri file JSON" e seleziona un file di backup (.json) esportato dall\'app MyLibrary.',
        helpStep2Title: '2️⃣ Esplora i dati',
        helpStep2Desc: 'Fai clic sulle schede (Collezione, Prestiti, Empruntori, Lista desideri, Posizioni) per esplorare ciascuna categoria.',
        helpStep3Title: '3️⃣ Cerca',
        helpStep3Desc: 'Digita titolo, autore, editore, ISBN, ecc. nella casella di ricerca per trovare rapidamente gli elementi in tempo reale.',
        helpStep4Title: '4️⃣ Visualizza dettagli',
        helpStep4Desc: 'Fai clic su una riga della tabella per vedere tutti i dettagli. Puoi anche fare clic sulla copertina del libro per ingrandirla ad alta risoluzione.',
        helpStep5Title: '5️⃣ Esporta',
        helpStep5Desc: 'Esporta i dati della collezione visualizzati in un file CSV compatibile con Excel.',
        helpFeaturesTitle: '✨ Caratteristiche principali',
        helpFeature1: '🔄 Salvataggio automatico: l\'ultimo file aperto viene salvato nel browser e ricaricato automaticamente (valido per 7 giorni)',
        helpFeature2: '🌐 Multilingue: supporto per italiano, inglese, coreano, giapponese, cinese semplificato, cinese tradizionale, tedesco, francese, spagnolo e portoghese',
        helpFeature3: '🔒 Massima privacy: tutti i dati vengono elaborati solo localmente nel tuo browser (nessun caricamento su server)',
        helpFeature4: '📱 Design reattivo: supporta varie dimensioni dello schermo (consigliato: 960px o superiore)',

        dateFormat: 'it-IT'
    },
    pt: {
        appTitle: 'MyLibrary JSON Viewer',
        openFile: '📂 Abrir arquivo JSON',
        exportCsv: '📊 Exportar CSV',

        // File Info
        fileName: 'Nome do arquivo:',
        filePath: 'Caminho:',
        backupDate: 'Data do backup:',
        backupNotice: 'Todos os status de empréstimo e informações de atraso são exibidos com base na hora de criação do backup.',

        // Tabs
        books: '📖 Coleção',
        loans: '📤 Empréstimos',
        borrowers: '👥 Tomadores',
        wishlist: '⭐ Lista de desejos',
        locations: '📍 Localizações',

        // Search
        searchPlaceholder: 'Pesquisar...',
        clearSearch: '🔄 Limpar',

        // Welcome
        welcomeTitle: '📚 MyLibrary JSON Viewer',
        welcomeDesc: 'Visualize arquivos JSON exportados do app MyLibrary Management.',

        // Table Headers - Books
        cover: 'Capa',
        title: 'Título',
        author: 'Autor',
        publisher: 'Editora',
        isbn: 'ISBN',
        category: 'Categoria',
        location: 'Localização',
        locationIdLabel: 'ID da localização',
        status: 'Status',

        // Table Headers - Loans
        bookTitle: 'Título do livro',
        borrower: 'Tomador',
        loanDate: 'Data de empréstimo',
        dueDate: 'Data de devolução',
        returnDate: 'Data de retorno',

        // Table Headers - Borrowers
        info1: 'Info 1',
        info2: 'Info 2',
        createdDate: 'Criado',

        // Table Headers - Wishlist
        price: 'Preço',
        priority: 'Prioridade',
        addedDate: 'Adicionado',

        // Table Headers - Locations
        name: 'Nome',
        description: 'Descrição',

        // Reading Status
        unread: 'Não lido',
        reading: 'Lendo',
        read: 'Lido',

        // Loan Status
        returned: 'Devolvido',
        onLoan: 'Emprestado (no backup)',
        overdue: 'Atrasado (no backup)',
        overdueDays: 'd',

        // Detail Info
        basicInfo: 'Informações básicas',
        collectionInfo: 'Informações da coleção',
        readingRecord: 'Registro de leitura',
        loanHistory: 'Histórico de empréstimos',
        otherInfo: 'Outras informações',
        mediaType: 'Tipo de mídia',
        rating: 'Avaliação',
        readStatus: 'Status de leitura',
        pages: 'Páginas',
        language: 'Idioma',
        apiSource: 'Fonte dos dados',
        note: 'Nota',
        memo: 'Memo',
        publishDate: 'Data de publicação',
        description: 'Descrição',

        // Reading Record
        startReadingDate: 'Início da leitura',
        finishReadingDate: 'Fim da leitura',
        emotionTag: 'Etiqueta emocional',
        readingNote: 'Nota de leitura',

        // Media Types
        mediaTypeBook: 'Livro',
        mediaTypeEbook: 'Livro digital',
        mediaTypeAudiobook: 'Audiolivro',
        mediaTypeCd: 'CD',
        mediaTypeVinyl: 'Vinil',
        mediaTypeDvd: 'DVD',
        mediaTypeBluray: 'Blu-ray',
        mediaTypeComic: 'Quadrinhos',
        mediaTypeManga: 'Mangá',
        mediaTypeMagazine: 'Revista',
        mediaTypeOther: 'Outro',

        // Media Specific
        ebookInfo: 'Informações do livro digital',
        audioInfo: 'Informações de áudio',
        videoInfo: 'Informações de vídeo',
        comicInfo: 'Informações de quadrinhos',
        fileFormat: 'Formato do arquivo',
        fileSize: 'Tamanho do arquivo',
        filePath: 'Caminho do arquivo',
        artist: 'Artista',
        albumName: 'Álbum',
        trackCount: 'Faixas',
        tracks: 'faixas',
        director: 'Diretor',
        cast: 'Elenco',
        runningTime: 'Duração',
        minutes: 'min',
        volumeNumber: 'Volume',
        volume: 'vol',
        seriesName: 'Série',
        isComplete: 'Status',
        completed: 'Concluído',
        ongoing: 'Em andamento',
        coverUrl: 'URL da capa',
        highResCoverUrl: 'URL da capa em alta resolução',
        localCoverPath: 'Caminho da capa local',

        // Loan Info
        loanInfo: 'Informações de empréstimo',
        bookInfo: 'Informações do livro',
        borrowerInfo: 'Informações do tomador',
        loanDetail: 'Detalhes do empréstimo',
        borrowerNote: 'Nota do tomador',
        loanMemo: 'Memo de empréstimo',
        overdueDaysLabel: 'Dias de atraso',
        overdueTitle: 'Data de devolução ultrapassada (no backup)',

        // Borrower Info
        borrowerDetail: 'Detalhes do tomador',
        lastBorrowDate: 'Último empréstimo',
        totalBorrows: 'Total de empréstimos',
        times: 'vezes',
        isActive: 'Status',
        active: 'Ativo',
        inactive: 'Inativo',
        isFavorite: 'Favorito',

        // Location Info
        locationDetail: 'Detalhes da localização',
        room: 'Sala',
        shelf: 'Prateleira',
        order: 'Ordem',
        modifiedDate: 'Modificado em',

        // Messages
        noData: 'Nenhum dado disponível.',
        unknown: 'Desconhecido',

        // Help
        helpTitle: '📖 Guia do usuário',
        helpStep1Title: '1️⃣ Abrir arquivo',
        helpStep1Desc: 'Clique no botão "📂 Abrir arquivo JSON" e selecione um backup (.json) exportado do aplicativo MyLibrary.',
        helpStep2Title: '2️⃣ Explorar dados',
        helpStep2Desc: 'Clique nas abas (Coleção, Empréstimos, Tomadores, Lista de desejos, Localizações) para navegar por cada categoria.',
        helpStep3Title: '3️⃣ Pesquisar',
        helpStep3Desc: 'Digite título, autor, editora, ISBN, etc. no campo de busca para encontrar itens rapidamente em tempo real.',
        helpStep4Title: '4️⃣ Ver detalhes',
        helpStep4Desc: 'Clique em uma linha da tabela para ver todos os detalhes. Você também pode clicar na capa do livro para ampliá-la em alta resolução.',
        helpStep5Title: '5️⃣ Exportar',
        helpStep5Desc: 'Exporte os dados da coleção exibidos para um arquivo CSV compatível com Excel.',
        helpFeaturesTitle: '✨ Funcionalidades principais',
        helpFeature1: '🔄 Salvamento automático: o último arquivo aberto é salvo no navegador e recarregado automaticamente (válido por 7 dias)',
        helpFeature2: '🌐 Multilíngue: suporte para português, inglês, coreano, japonês, chinês simplificado, chinês tradicional, alemão, francês, espanhol e italiano',
        helpFeature3: '🔒 Privacidade total: todos os dados são processados apenas localmente no navegador (sem envio para servidores)',
        helpFeature4: '📱 Design responsivo: compatível com diversas resoluções de tela (recomendado: 960px ou mais)',

        dateFormat: 'pt-PT'
    },
    'zh-CN': {
        appTitle: 'MyLibrary JSON Viewer',
        openFile: '📂 打开 JSON 文件',
        exportCsv: '📊 导出 CSV',

        // File Info
        fileName: '文件名：',
        filePath: '路径：',
        backupDate: '备份日期：',
        backupNotice: '所有借阅状态与逾期信息均依据备份创建时间显示。',

        // Tabs
        books: '📖 收藏',
        loans: '📤 借阅',
        borrowers: '👥 借阅者',
        wishlist: '⭐ 愿望清单',
        locations: '📍 馆藏位置',

        // Search
        searchPlaceholder: '搜索...',
        clearSearch: '🔄 清除',

        // Welcome
        welcomeTitle: '📚 MyLibrary JSON Viewer',
        welcomeDesc: '浏览由 MyLibrary Management 导出的 JSON 备份文件。',

        // Table Headers - Books
        cover: '封面',
        title: '书名',
        author: '作者',
        publisher: '出版社',
        isbn: 'ISBN',
        category: '分类',
        location: '位置',
        locationIdLabel: '位置ID',
        status: '状态',

        // Table Headers - Loans
        bookTitle: '书名',
        borrower: '借阅者',
        loanDate: '借阅日期',
        dueDate: '应还日期',
        returnDate: '归还日期',

        // Table Headers - Borrowers
        info1: '信息1',
        info2: '信息2',
        createdDate: '创建时间',

        // Table Headers - Wishlist
        price: '价格',
        priority: '优先级',
        addedDate: '添加时间',

        // Table Headers - Locations
        name: '名称',
        description: '描述',

        // Reading Status
        unread: '未读',
        reading: '阅读中',
        read: '已读',

        // Loan Status
        returned: '已归还',
        onLoan: '备份时借阅中',
        overdue: '备份时逾期',
        overdueDays: '天',

        // Detail Info
        basicInfo: '基本信息',
        collectionInfo: '收藏信息',
        readingRecord: '阅读记录',
        loanHistory: '借阅历史',
        otherInfo: '其他信息',
        mediaType: '媒体类型',
        rating: '评分',
        readStatus: '阅读状态',
        pages: '页数',
        language: '语言',
        apiSource: '数据来源',
        note: '笔记',
        memo: '备注',
        publishDate: '出版日期',
        description: '描述',

        // Reading Record
        startReadingDate: '开始阅读',
        finishReadingDate: '完成阅读',
        emotionTag: '情绪标签',
        readingNote: '阅读笔记',

        // Media Types
        mediaTypeBook: '书籍',
        mediaTypeEbook: '电子书',
        mediaTypeAudiobook: '有声书',
        mediaTypeCd: 'CD',
        mediaTypeVinyl: '黑胶',
        mediaTypeDvd: 'DVD',
        mediaTypeBluray: '蓝光',
        mediaTypeComic: '漫画',
        mediaTypeManga: '动漫',
        mediaTypeMagazine: '杂志',
        mediaTypeOther: '其他',

        // Media Specific
        ebookInfo: '电子书信息',
        audioInfo: '音频信息',
        videoInfo: '视频信息',
        comicInfo: '漫画信息',
        fileFormat: '文件格式',
        fileSize: '文件大小',
        filePath: '文件路径',
        artist: '艺术家',
        albumName: '专辑',
        trackCount: '曲目数',
        tracks: '曲目',
        director: '导演',
        cast: '演员',
        runningTime: '片长',
        minutes: '分钟',
        volumeNumber: '卷数',
        volume: '卷',
        seriesName: '系列',
        isComplete: '完结状态',
        completed: '完结',
        ongoing: '连载中',
        coverUrl: '封面 URL',
        highResCoverUrl: '高分辨率封面 URL',
        localCoverPath: '本地封面路径',

        // Loan Info
        loanInfo: '借阅信息',
        bookInfo: '书籍信息',
        borrowerInfo: '借阅者信息',
        loanDetail: '借阅详情',
        borrowerNote: '借阅者备注',
        loanMemo: '借阅备注',
        overdueDaysLabel: '逾期天数',
        overdueTitle: '备份时已超过还书日',

        // Borrower Info
        borrowerDetail: '借阅者详情',
        lastBorrowDate: '最后借阅日',
        totalBorrows: '总借阅次数',
        times: '次',
        isActive: '状态',
        active: '启用',
        inactive: '停用',
        isFavorite: '收藏',

        // Location Info
        locationDetail: '位置信息',
        room: '房间',
        shelf: '书架',
        order: '排序',
        modifiedDate: '更新日期',

        // Messages
        noData: '没有可用的数据。',
        unknown: '未知',

        // Help
        helpTitle: '📖 使用指南',
        helpStep1Title: '1️⃣ 打开文件',
        helpStep1Desc: '点击“📂 打开 JSON 文件”按钮，选择从 MyLibrary 应用导出的备份文件（.json）。',
        helpStep2Title: '2️⃣ 探索数据',
        helpStep2Desc: '点击上方标签页（收藏、借阅、借阅者、愿望清单、馆藏位置）以浏览各类别数据。',
        helpStep3Title: '3️⃣ 搜索',
        helpStep3Desc: '在搜索框输入书名、作者、出版社、ISBN 等，即可快速实时查找所需项目。',
        helpStep4Title: '4️⃣ 查看详情',
        helpStep4Desc: '点击数据行即可查看该项目的完整详细信息。点击书籍封面还可放大查看高分辨率封面图片。',
        helpStep5Title: '5️⃣ 导出',
        helpStep5Desc: '将当前显示的收藏数据导出为兼容 Excel 的 CSV 表格文件。',
        helpFeaturesTitle: '✨ 主要功能',
        helpFeature1: '🔄 自动保存：自动在浏览器中保存并加载上次打开的文件（有效期 7 天）',
        helpFeature2: '🌐 多语言支持：支持简体中文、繁体中文、英文、韩文、日文、德文、法文、西班牙文、意大利文与葡萄牙文',
        helpFeature3: '🔒 隐私安全：所有数据均在浏览器本地安全处理（绝不上传至任何外部服务器）',
        helpFeature4: '📱 响应式设计：自适应电脑桌面及平板等多种屏幕尺寸（推荐分辨率：960px 以上）',

        dateFormat: 'zh-CN'
    },
    'zh-TW': {
        appTitle: 'MyLibrary JSON Viewer',
        openFile: '📂 開啟 JSON 檔案',
        exportCsv: '📊 匯出 CSV',

        // File Info
        fileName: '檔案名稱：',
        filePath: '路徑：',
        backupDate: '備份日期：',
        backupNotice: '所有借閱狀態與逾期資訊皆依備份建立時間顯示。',

        // Tabs
        books: '📖 收藏',
        loans: '📤 借閱',
        borrowers: '👥 借閱者',
        wishlist: '⭐ 願望清單',
        locations: '📍 館藏位置',

        // Search
        searchPlaceholder: '搜尋...',
        clearSearch: '🔄 清除',

        // Welcome
        welcomeTitle: '📚 MyLibrary JSON Viewer',
        welcomeDesc: '瀏覽由 MyLibrary Management 匯出的 JSON 備份檔案。',

        // Table Headers - Books
        cover: '封面',
        title: '書名',
        author: '作者',
        publisher: '出版社',
        isbn: 'ISBN',
        category: '分類',
        location: '位置',
        locationIdLabel: '位置ID',
        status: '狀態',

        // Table Headers - Loans
        bookTitle: '書名',
        borrower: '借閱者',
        loanDate: '借閱日期',
        dueDate: '應還日期',
        returnDate: '歸還日期',

        // Table Headers - Borrowers
        info1: '資訊1',
        info2: '資訊2',
        createdDate: '建立時間',

        // Table Headers - Wishlist
        price: '價格',
        priority: '優先順序',
        addedDate: '新增時間',

        // Table Headers - Locations
        name: '名稱',
        description: '描述',

        // Reading Status
        unread: '未讀',
        reading: '閱讀中',
        read: '已讀',

        // Loan Status
        returned: '已還書',
        onLoan: '備份時借閱中',
        overdue: '備份時逾期',
        overdueDays: '天',

        // Detail Info
        basicInfo: '基本資訊',
        collectionInfo: '收藏資訊',
        readingRecord: '閱讀紀錄',
        loanHistory: '借閱歷史',
        otherInfo: '其他資訊',
        mediaType: '媒體類型',
        rating: '評分',
        readStatus: '閱讀狀態',
        pages: '頁數',
        language: '語言',
        apiSource: '資料來源',
        note: '筆記',
        memo: '備註',
        publishDate: '出版日期',
        description: '描述',

        // Reading Record
        startReadingDate: '開始閱讀',
        finishReadingDate: '完成閱讀',
        emotionTag: '情緒標籤',
        readingNote: '閱讀筆記',

        // Media Types
        mediaTypeBook: '書籍',
        mediaTypeEbook: '電子書',
        mediaTypeAudiobook: '有聲書',
        mediaTypeCd: 'CD',
        mediaTypeVinyl: '黑膠',
        mediaTypeDvd: 'DVD',
        mediaTypeBluray: '藍光',
        mediaTypeComic: '漫畫',
        mediaTypeManga: '動漫',
        mediaTypeMagazine: '雜誌',
        mediaTypeOther: '其他',

        // Media Specific
        ebookInfo: '電子書資訊',
        audioInfo: '音訊資訊',
        videoInfo: '影片資訊',
        comicInfo: '漫畫資訊',
        fileFormat: '檔案格式',
        fileSize: '檔案大小',
        filePath: '檔案路徑',
        artist: '藝術家',
        albumName: '專輯',
        trackCount: '曲目數',
        tracks: '曲目',
        director: '導演',
        cast: '演員',
        runningTime: '片長',
        minutes: '分鐘',
        volumeNumber: '卷數',
        volume: '卷',
        seriesName: '系列',
        isComplete: '完結狀態',
        completed: '完結',
        ongoing: '連載中',
        coverUrl: '封面 URL',
        highResCoverUrl: '高解析度封面 URL',
        localCoverPath: '本機封面路徑',

        // Loan Info
        loanInfo: '借閱資訊',
        bookInfo: '書籍資訊',
        borrowerInfo: '借閱者資訊',
        loanDetail: '借閱細節',
        borrowerNote: '借閱者備註',
        loanMemo: '借閱備註',
        overdueDaysLabel: '逾期天數',
        overdueTitle: '備份時超過還書日',

        // Borrower Info
        borrowerDetail: '借閱者詳情',
        lastBorrowDate: '最後借閱日',
        totalBorrows: '總借閱次數',
        times: '次',
        isActive: '狀態',
        active: '啟用',
        inactive: '停用',
        isFavorite: '最愛',

        // Location Info
        locationDetail: '位置資訊',
        room: '房間',
        shelf: '書架',
        order: '排序',
        modifiedDate: '更新日期',

        // Messages
        noData: '沒有可用的資料。',
        unknown: '未知',

        // Help
        helpTitle: '📖 使用指南',
        helpStep1Title: '1️⃣ 開啟檔案',
        helpStep1Desc: '點擊「📂 開啟 JSON 檔案」按鈕，選擇從 MyLibrary 應用程式匯出的備份檔案（.json）。',
        helpStep2Title: '2️⃣ 探索資料',
        helpStep2Desc: '點擊上方分頁（收藏、借閱、借閱者、願望清單、館藏位置）以瀏覽各類別資料。',
        helpStep3Title: '3️⃣ 搜尋',
        helpStep3Desc: '在搜尋框輸入書名、作者、出版社、ISBN 等，即可快速即時查詢所需項目。',
        helpStep4Title: '4️⃣ 檢視細節',
        helpStep4Desc: '點擊資料列即可查看該項目的完整細節資訊。點擊書籍封面亦可放大檢視高解析度封面圖片。',
        helpStep5Title: '5️⃣ 匯出',
        helpStep5Desc: '將目前顯示的收藏資料匯出為相容 Excel 的 CSV 試算表檔案。',
        helpFeaturesTitle: '✨ 主要功能',
        helpFeature1: '🔄 自動儲存：自動在瀏覽器中儲存並載入上次開啟的檔案（有效期限 7 天）',
        helpFeature2: '🌐 多語系支援：支援繁體中文、簡體中文、英文、韓文、日文、德文、法文、西班牙文、義大利文與葡萄牙文',
        helpFeature3: '🔒 隱私安全：所有資料皆在瀏覽器本地安全處理（絕不上傳至任何外部伺服器）',
        helpFeature4: '📱 響應式設計：自適應電腦桌面及平板等多種螢幕尺寸（建議解析度：960px 以上）',

        dateFormat: 'zh-TW'
    }
};

Object.entries(localeOverrides).forEach(([lang, overrides]) => {
    translations[lang] = {
        ...translations.en,
        ...overrides
    };
});

// 하위 호환성 별칭: 'zh'는 기본적으로 번체('zh-TW')로 연결
translations['zh'] = translations['zh-TW'];

// CSV header keys are ordered to match the Android backup export fields.
const csvHeaderKeys = [
    'isbn',
    'title',
    'author',
    'publisher',
    'publishDate',
    'category',
    'pages',
    'language',
    'location',
    'locationIdLabel',
    'rating',
    'readStatus',
    'description',
    'note',
    'coverUrl',
    'highResCoverUrl',
    'localCoverPath',
    'price',
    'mediaType',
    'fileFormat',
    'fileSize',
    'filePath',
    'artist',
    'albumName',
    'trackCount',
    'director',
    'cast',
    'runningTime',
    'volumeNumber',
    'seriesName',
    'isComplete',
    'addedDate',
    'modifiedDate',
    'apiSource'
];

// 番役 함수
function t(key) {
    return translations[currentLanguage][key] || key;
}

// DOM 요소
const elements = {
    openFileBtn: document.getElementById('openFileBtn'),
    openFileBtn2: document.getElementById('openFileBtn2'),
    exportCsvBtn: document.getElementById('exportCsvBtn'),
    helpBtn: document.getElementById('helpBtn'),
    helpModal: document.getElementById('helpModal'),
    helpModalClose: document.getElementById('helpModalClose'),
    helpContent: document.getElementById('helpContent'),
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
    // 브라우저 언어 감지
    function detectSystemLanguage() {
        const systemLang = navigator.language || navigator.userLanguage || 'en';
        console.log('Browser language:', systemLang);
        const lang = systemLang.toLowerCase();
        
        if (lang.startsWith('ko')) return 'ko';
        if (lang.startsWith('ja')) return 'ja';
        if (lang.startsWith('de')) return 'de';
        if (lang.startsWith('fr')) return 'fr';
        if (lang.startsWith('es')) return 'es';
        if (lang.startsWith('it')) return 'it';
        if (lang.startsWith('pt')) return 'pt';
        if (lang.startsWith('zh')) {
            // 번체 감지 (대만, 홍콩, 마카오, Hant)
            if (lang.includes('tw') || lang.includes('hk') || lang.includes('mo') || lang.includes('hant')) {
                return 'zh-TW';
            }
            return 'zh-CN';
        }
        return 'en';
    }
    
    // 언어 설정: localStorage에 저장된 값 > 브라우저 언어 > 영어(기본값)
    const savedLanguage = localStorage.getItem('preferredLanguage');
    const systemLanguage = detectSystemLanguage();
    
    // localStorage에 저장된 값이 있으면 우선 사용, 없으면 시스템 언어 사용
    let initialLang = savedLanguage || systemLanguage;
    // 이전 'zh' 값이 저장되어 있다면 'zh-TW'로 자동 보정
    if (initialLang === 'zh') {
        initialLang = 'zh-TW';
    }
    currentLanguage = translations[initialLang] ? initialLang : 'en';
    
    console.log('System language detected:', systemLanguage);
    console.log('Selected language:', currentLanguage);
    
    if (elements.languageSelect) {
        elements.languageSelect.value = currentLanguage;
    }
    
    initializeEventListeners();
    updateUILanguage();
    
    // 이전에 열었던 파일 자동 로드 시도
    setTimeout(() => {
        loadLastFileFromStorage();
    }, 500);
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
    
    // 파일 입력 요소 생성 및 이벤트 리스너
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
        fileInput.addEventListener('change', handleFileSelect);
        
        // 파일 열기 버튼
        if (elements.openFileBtn) {
            elements.openFileBtn.addEventListener('click', () => fileInput.click());
        }
        if (elements.openFileBtn2) {
            elements.openFileBtn2.addEventListener('click', () => fileInput.click());
        }
    }
    
    // 도움말 버튼
    if (elements.helpBtn) {
        elements.helpBtn.addEventListener('click', showHelp);
    }
    if (elements.helpModalClose) {
        elements.helpModalClose.addEventListener('click', hideHelp);
    }
    if (elements.helpModal) {
        elements.helpModal.addEventListener('click', (e) => {
            if (e.target === elements.helpModal) {
                hideHelp();
            }
        });
    }
    
    // 내보내기 버튼
    if (elements.exportCsvBtn) {
        elements.exportCsvBtn.addEventListener('click', exportToCsv);
    }
    
    // 탭 전환
    if (elements.tabs) {
        elements.tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabName = tab.dataset.tab;
                switchTab(tabName);
            });
        });
    }
    
    // 검색
    if (elements.searchInput) {
        elements.searchInput.addEventListener('input', (e) => {
            searchTerm = e.target.value.toLowerCase();
            renderCurrentTab();
        });
    }
    
    // 검색 초기화
    if (elements.clearSearch) {
        elements.clearSearch.addEventListener('click', () => {
            elements.searchInput.value = '';
            searchTerm = '';
            renderCurrentTab();
        });
    }
    
    // 모달 닫기 - 상세보기 모달
    const detailModalClose = elements.detailModal?.querySelector('.modal-close');
    if (detailModalClose) {
        detailModalClose.addEventListener('click', closeModal);
    }
    if (elements.detailModal) {
        elements.detailModal.addEventListener('click', (e) => {
            if (e.target === elements.detailModal) {
                closeModal();
            }
        });
    }
    
    // 이미지 뷰어 모달 닫기
    const imageViewerModal = document.getElementById('imageViewerModal');
    const imageViewerClose = imageViewerModal?.querySelector('.modal-close');
    if (imageViewerClose) {
        imageViewerClose.addEventListener('click', closeImageViewer);
    }
    if (imageViewerModal) {
        imageViewerModal.addEventListener('click', (e) => {
            if (e.target === imageViewerModal) {
                closeImageViewer();
            }
        });
    }

    // ESC 키로 열려 있는 모달(도움말, 상세보기, 이미지 뷰어) 닫기
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            hideHelp();
            closeModal();
            closeImageViewer();
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
    
    // 도움말 버튼 툴팁
    if (elements.helpBtn) {
        elements.helpBtn.title = t('helpTitle') || 'Help';
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
        tabButtons[1].innerHTML = `${t('wishlist')} (<span id="wishlistCount">${wishlistCount}</span>)`;
        tabButtons[2].innerHTML = `${t('loans')} (<span id="loansCount">${loansCount}</span>)`;
        tabButtons[3].innerHTML = `${t('borrowers')} (<span id="borrowersCount">${borrowersCount}</span>)`;
        tabButtons[4].innerHTML = `${t('locations')} (<span id="locationsCount">${locationsCount}</span>)`;
    }
}

// 브라우저에서 파일 선택 처리
function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    
    reader.onload = (e) => {
        try {
            const content = e.target.result;
            const result = {
                content: content,
                fileName: file.name,
                filePath: file.name, // 브라우저에서는 전체 경로 접근 불가
                lastModified: file.lastModified || Date.now()
            };
            
            // 파일 내용을 localStorage에 저장 (자동 로드용)
            saveLastFileToStorage(result);
            
            loadJsonData(result);
        } catch (error) {
            alert('파일을 읽는 중 오류가 발생했습니다: ' + error.message);
            console.error('File read error:', error);
        }
    };
    
    reader.onerror = () => {
        alert('파일을 읽는 중 오류가 발생했습니다.');
    };
    
    reader.readAsText(file);
}

// 마지막 파일을 localStorage에 저장
function saveLastFileToStorage(result) {
    try {
        // localStorage 용량 제한 확인 (보통 5-10MB)
        const dataSize = new Blob([result.content]).size;
        
        // 5MB 이하만 저장
        if (dataSize < 5 * 1024 * 1024) {
            localStorage.setItem('lastFileData', JSON.stringify({
                content: result.content,
                fileName: result.fileName,
                lastModified: result.lastModified,
                savedAt: Date.now()
            }));
            console.log('Last file saved to storage:', result.fileName);
        } else {
            console.warn('File too large to save to localStorage:', dataSize);
            // 큰 파일은 저장하지 않음
            localStorage.removeItem('lastFileData');
        }
    } catch (error) {
        console.error('Failed to save file to storage:', error);
        // QuotaExceededError 등의 경우 무시
    }
}

// 저장된 파일 자동 로드
function loadLastFileFromStorage() {
    try {
        const savedData = localStorage.getItem('lastFileData');
        if (!savedData) return false;
        
        const data = JSON.parse(savedData);
        
        // 7일 이내 데이터만 자동 로드
        const daysSinceLastSave = (Date.now() - data.savedAt) / (1000 * 60 * 60 * 24);
        if (daysSinceLastSave > 7) {
            console.log('Saved file is too old, skipping auto-load');
            localStorage.removeItem('lastFileData');
            return false;
        }
        
        const result = {
            content: data.content,
            fileName: data.fileName,
            filePath: data.fileName,
            lastModified: data.lastModified
        };
        
        console.log('Auto-loading last file:', data.fileName);
        loadJsonData(result);
        
        // 자동 로드 성공 알림
        showAutoLoadNotification(data.fileName);
        
        return true;
    } catch (error) {
        console.error('Failed to load last file from storage:', error);
        localStorage.removeItem('lastFileData');
        return false;
    }
}

// 자동 로드 알림 표시
function showAutoLoadNotification(fileName) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: #2ecc71;
        color: white;
        padding: 12px 20px;
        border-radius: 6px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        font-size: 14px;
        animation: slideIn 0.3s ease-out;
    `;
    notification.innerHTML = `✓ 이전 파일 자동 로드: ${fileName}`;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.3s';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// JSON 파일 열기 (브라우저 버전에서는 사용하지 않음)
async function openJsonFile() {
    // 이 함수는 Electron 버전 호환성을 위해 남겨둠
    // 브라우저 버전에서는 fileInput.click()으로 처리
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
        fileInput.click();
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
    let books = libraryData.books || [];
    
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
    
    // 정렬 적용
    const sortedBooks = sortBooks(filteredBooks);
    
    const getSortIcon = (column) => {
        if (sortState.books.column === column) {
            return sortState.books.ascending ? ' ▲' : ' ▼';
        }
        return '';
    };
    
    const html = `
        <table>
            <thead>
                <tr>
                    <th style="width: 80px;">${t('cover')}</th>
                    <th class="sortable" onclick="sortBooksBy('title')">${t('title')}${getSortIcon('title')}</th>
                    <th class="sortable" onclick="sortBooksBy('author')">${t('author')}${getSortIcon('author')}</th>
                    <th class="sortable" onclick="sortBooksBy('publisher')">${t('publisher')}${getSortIcon('publisher')}</th>
                    <th class="sortable" onclick="sortBooksBy('isbn')">${t('isbn')}${getSortIcon('isbn')}</th>
                    <th class="sortable" onclick="sortBooksBy('category')">${t('category')}${getSortIcon('category')}</th>
                    <th class="sortable" onclick="sortBooksBy('location')">${t('location')}${getSortIcon('location')}</th>
                    <th class="sortable" onclick="sortBooksBy('readStatus')">${t('status')}${getSortIcon('readStatus')}</th>
                </tr>
            </thead>
            <tbody>
                ${sortedBooks.map(book => `
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
    
    container.innerHTML = sortedBooks.length > 0 ? html : `<p style="padding: 20px; text-align: center;">${t('noData')}</p>`;
}

// Loans 렌더링
function renderLoans() {
    const container = document.getElementById('loansTable');
    const loans = libraryData.loans || [];
    const books = libraryData.books || [];
    
    // 책 ID로 제목 찾기
    const getBookTitle = (bookId) => {
        const book = books.find(b => b.id === bookId);
        return book ? book.title : t('unknown');
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
                    <th>${t('bookTitle')}</th>
                    <th>${t('borrower')}</th>
                    <th>${t('loanDate')}</th>
                    <th>${t('dueDate')}</th>
                    <th>${t('returnDate')}</th>
                    <th>${t('status')}</th>
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
    
    container.innerHTML = filteredLoans.length > 0 ? html : `<p style="padding: 20px; text-align: center;">${t('noData')}</p>`;
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
                    <th>${t('info1')}</th>
                    <th>${t('info2')}</th>
                    <th>${t('note')}</th>
                    <th>${t('createdDate')}</th>
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
    
    container.innerHTML = filteredBorrowers.length > 0 ? html : `<p style="padding: 20px; text-align: center;">${t('noData')}</p>`;
}

// Wishlist 렌더링
function renderWishlist() {
    const container = document.getElementById('wishlistTable');
    let wishlist = libraryData.wishlist || [];
    
    const filteredWishlist = wishlist.filter(item => {
        if (!searchTerm) return true;
        return (
            item.title?.toLowerCase().includes(searchTerm) ||
            item.author?.toLowerCase().includes(searchTerm) ||
            item.publisher?.toLowerCase().includes(searchTerm)
        );
    });
    
    // 정렬 적용
    const sortedWishlist = sortWishlist(filteredWishlist);
    
    const getSortIcon = (column) => {
        if (sortState.wishlist.column === column) {
            return sortState.wishlist.ascending ? ' ▲' : ' ▼';
        }
        return '';
    };
    
    const html = `
        <table>
            <thead>
                <tr>
                    <th style="width: 80px;">${t('cover')}</th>
                    <th class="sortable" onclick="sortWishlistBy('title')">${t('title')}${getSortIcon('title')}</th>
                    <th class="sortable" onclick="sortWishlistBy('author')">${t('author')}${getSortIcon('author')}</th>
                    <th class="sortable" onclick="sortWishlistBy('publisher')">${t('publisher')}${getSortIcon('publisher')}</th>
                    <th>ISBN</th>
                    <th class="sortable" onclick="sortWishlistBy('price')">${t('price')}${getSortIcon('price')}</th>
                    <th class="sortable" onclick="sortWishlistBy('priority')">${t('priority')}${getSortIcon('priority')}</th>
                    <th class="sortable" onclick="sortWishlistBy('addedDate')">${t('addedDate')}${getSortIcon('addedDate')}</th>
                </tr>
            </thead>
            <tbody>
                ${sortedWishlist.map(item => `
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
    
    container.innerHTML = sortedWishlist.length > 0 ? html : `<p style="padding: 20px; text-align: center;">${t('noData')}</p>`;
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
                    <th>${t('name')}</th>
                    <th>${t('description')}</th>
                    <th>${t('createdDate')}</th>
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
    
    container.innerHTML = filteredLocations.length > 0 ? html : `<p style="padding: 20px; text-align: center;">${t('noData')}</p>`;
}

// 상세 보기 함수들
function showBookDetail(id) {
    const book = libraryData.books.find(b => b.id === id);
    if (!book) return;
    
    const coverImageHtml = getBookCoverImageLarge(book);
    
    // 책 데이터를 전역에 저장 (이미지 뷰어에서 사용)
    window.currentDetailBook = book;
    
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
    
    // 위시리스트 데이터를 전역에 저장 (이미지 뷰어에서 사용)
    window.currentDetailBook = item;
    
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

// 책 또는 위시리스트 유효 표지 이미지 소스 반환 (우선순위: localCoverBase64 > highResCoverUrl > coverUrl)
function getEffectiveCoverSrc(item, preferHighRes = false) {
    if (!item) return null;

    // 1. localCoverBase64 처리 (커스텀 촬영/갤러리 이미지 - 최우선 순위)
    if (item.localCoverBase64 && typeof item.localCoverBase64 === 'string') {
        const trimmed = item.localCoverBase64.trim();
        if (trimmed.length > 0) {
            if (trimmed.startsWith('data:image/')) {
                return trimmed;
            }
            // Base64 매직 넘버 기반 MIME 타입 추론
            let mime = 'image/jpeg';
            if (trimmed.startsWith('/9j/')) {
                mime = 'image/jpeg';
            } else if (trimmed.startsWith('iVBOR')) {
                mime = 'image/png';
            } else if (trimmed.startsWith('R0lGOD')) {
                mime = 'image/gif';
            } else if (trimmed.startsWith('UklGR')) {
                mime = 'image/webp';
            }
            return `data:${mime};base64,${trimmed}`;
        }
    }

    // 2. 온라인 URL 처리 (iOS 및 레거시 안드로이드 백업 100% 호환)
    const isValidWebUrl = (url) => {
        if (!url || typeof url !== 'string') return false;
        const trimmed = url.trim();
        if (trimmed.startsWith('/') || trimmed.startsWith('file://')) return false;
        return trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('//');
    };

    const highRes = isValidWebUrl(item.highResCoverUrl) ? item.highResCoverUrl.trim() : null;
    const standard = isValidWebUrl(item.coverUrl) ? item.coverUrl.trim() : null;

    if (preferHighRes) {
        return highRes || standard || null;
    } else {
        return highRes || standard || null;
    }
}

// 책 표지 이미지 (테이블용 - 작은 크기)
function getBookCoverImage(book) {
    const src = getEffectiveCoverSrc(book, false);
    
    if (!src) {
        return '<div class="book-cover-placeholder">📚</div>';
    }
    
    return `<img src="${escapeHtml(src)}" alt="Cover" class="book-cover-thumb" loading="lazy" onerror="this.style.display='none'; this.parentElement.innerHTML='<div class=\\'book-cover-placeholder\\'>📚</div>';">`;
}

// 위시리스트 표지 이미지 (테이블용 - 작은 크기)
function getWishlistCoverImage(item) {
    const src = getEffectiveCoverSrc(item, false);
    
    if (!src) {
        return '<div class="book-cover-placeholder">⭐</div>';
    }
    
    return `<img src="${escapeHtml(src)}" alt="Cover" class="book-cover-thumb" loading="lazy" onerror="this.style.display='none'; this.parentElement.innerHTML='<div class=\\'book-cover-placeholder\\'>⭐</div>';">`;
}

// 책 표지 이미지 (상세보기용 - 큰 크기)
function getBookCoverImageLarge(book) {
    const src = getEffectiveCoverSrc(book, true);
    
    if (!src) {
        return '<div class="book-cover-large-placeholder">📚</div>';
    }
    
    return `<div class="book-cover-zoom-wrapper" onclick="openImageViewer(window.currentDetailBook)">
        <img src="${escapeHtml(src)}" alt="${escapeHtml(book.title)}" class="book-cover-large" onerror="this.style.display='none'; this.outerHTML='<div class=\\'book-cover-large-placeholder\\'>📚</div>';">
        <div class="book-cover-zoom-icon" aria-hidden="true">🔍</div>
    </div>`;
}

// 위시리스트 표지 이미지 (상세보기용 - 큰 크기)
function getWishlistCoverImageLarge(item) {
    const src = getEffectiveCoverSrc(item, true);
    
    if (!src) {
        return '<div class="book-cover-large-placeholder">⭐</div>';
    }
    
    return `<div class="book-cover-zoom-wrapper" onclick="openImageViewer(window.currentDetailBook)">
        <img src="${escapeHtml(src)}" alt="${escapeHtml(item.title)}" class="book-cover-large" onerror="this.style.display='none'; this.outerHTML='<div class=\\'book-cover-large-placeholder\\'>⭐</div>';">
        <div class="book-cover-zoom-icon" aria-hidden="true">🔍</div>
    </div>`;
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
        'BOOK': `📚 ${t('mediaTypeBook')}`,
        'EBOOK': `📱 ${t('mediaTypeEbook')}`,
        'AUDIOBOOK': `🎧 ${t('mediaTypeAudiobook')}`,
        'CD': `💿 ${t('mediaTypeCd')}`,
        'VINYL': `💿 ${t('mediaTypeVinyl')}`,
        'DVD': `📀 ${t('mediaTypeDvd')}`,
        'BLURAY': `📀 ${t('mediaTypeBluray')}`,
        'COMIC': `📖 ${t('mediaTypeComic')}`,
        'MANGA': `📖 ${t('mediaTypeManga')}`,
        'MAGAZINE': `📰 ${t('mediaTypeMagazine')}`,
        'OTHER': `📦 ${t('mediaTypeOther')}`
    };
    return types[mediaType] || mediaType || `📚 ${t('mediaTypeBook')}`;
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
    const locale = currentLanguage === 'ko' ? 'ko-KR' : 'en-US';
    return date.toLocaleDateString(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }) + ' (based on file modification time)';
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

// CSV 내보내기 (브라우저 다운로드)
async function exportToCsv() {
    if (!libraryData) {
        alert('내보낼 데이터가 없습니다.');
        return;
    }
    
    try {
        // 도서 목록 CSV 생성 (Android 앱과 동일한 형식)
        const csvData = generateBooksCsv(libraryData.books || []);
        const fileName = `mylibrary_books_${formatDateForFileName(backupTimestamp)}.csv`;
        
        // 브라우저에서 파일 다운로드
        downloadFile(csvData, fileName, 'text/csv;charset=utf-8');
        
        alert(`CSV 파일이 다운로드되었습니다: ${fileName}`);
    } catch (error) {
        console.error('Export CSV error:', error);
        alert('CSV 내보내기 중 오류가 발생했습니다: ' + error.message);
    }
}

// 브라우저에서 파일 다운로드 헬퍼 함수
function downloadFile(content, fileName, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// 도서 목록 CSV 생성 (Android 앱 BackupManager.kt와 동일한 형식)
function generateBooksCsv(books) {
    // UTF-8 BOM 추가 (Excel에서 한글 깨짐 방지)
    const BOM = '\uFEFF';
    
    // 헤더 (Android 앱 백업과 동일한 순서)
    const headers = csvHeaderKeys.map(key => t(key));
    
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

// 도움말 표시
function showHelp() {
    if (!elements.helpModal || !elements.helpContent) return;
    
    elements.helpContent.innerHTML = `
        <div style="padding: 20px;">
            <h2 style="margin-top: 0; color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px;">
                ${t('helpTitle')}
            </h2>
            
            <div style="margin: 20px 0;">
                <h3 style="color: #3498db; margin-top: 20px;">${t('helpStep1Title')}</h3>
                <p style="color: #555; line-height: 1.6;">${t('helpStep1Desc')}</p>
                
                <h3 style="color: #3498db; margin-top: 20px;">${t('helpStep2Title')}</h3>
                <p style="color: #555; line-height: 1.6;">${t('helpStep2Desc')}</p>
                
                <h3 style="color: #3498db; margin-top: 20px;">${t('helpStep3Title')}</h3>
                <p style="color: #555; line-height: 1.6;">${t('helpStep3Desc')}</p>
                
                <h3 style="color: #3498db; margin-top: 20px;">${t('helpStep4Title')}</h3>
                <p style="color: #555; line-height: 1.6;">${t('helpStep4Desc')}</p>
                
                <h3 style="color: #3498db; margin-top: 20px;">${t('helpStep5Title')}</h3>
                <p style="color: #555; line-height: 1.6;">${t('helpStep5Desc')}</p>
            </div>
            
            <div style="background: #f8f9fa; padding: 16px; border-radius: 8px; margin-top: 24px;">
                <h3 style="color: #2c3e50; margin-top: 0;">${t('helpFeaturesTitle')}</h3>
                <ul style="margin: 10px 0; padding-left: 20px; color: #555;">
                    <li style="margin: 8px 0;">${t('helpFeature1')}</li>
                    <li style="margin: 8px 0;">${t('helpFeature2')}</li>
                    <li style="margin: 8px 0;">${t('helpFeature3')}</li>
                    <li style="margin: 8px 0;">${t('helpFeature4')}</li>
                </ul>
            </div>
            
            <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e0e0e0; text-align: center;">
                <p style="margin: 0; color: #95a5a6; font-size: 13px;">
                    © ${new Date().getFullYear()} CNST. All rights reserved.
                </p>
            </div>
        </div>
    `;
    
    elements.helpModal.classList.remove('hidden');
}

// 도움말 숨김
function hideHelp() {
    if (elements.helpModal) {
        elements.helpModal.classList.add('hidden');
    }
}

// Books 정렬 함수
function sortBooksBy(column) {
    if (sortState.books.column === column) {
        sortState.books.ascending = !sortState.books.ascending;
    } else {
        sortState.books.column = column;
        sortState.books.ascending = true;
    }
    renderBooks();
}

function sortBooks(books) {
    if (!sortState.books.column) return books;
    
    const sorted = [...books].sort((a, b) => {
        const column = sortState.books.column;
        let aVal, bVal;
        
        // Location은 특별 처리 (locationId로 이름 찾기)
        if (column === 'location') {
            aVal = getLocationName(a.locationId) || a.location || '';
            bVal = getLocationName(b.locationId) || b.location || '';
        } else {
            aVal = a[column] || '';
            bVal = b[column] || '';
        }
        
        // 읽음 상태는 특별 처리
        if (column === 'readStatus') {
            const statusOrder = { 'UNREAD': 0, 'READING': 1, 'READ': 2 };
            aVal = statusOrder[aVal] ?? 999;
            bVal = statusOrder[bVal] ?? 999;
        }
        
        // 문자열 비교
        if (typeof aVal === 'string') {
            aVal = aVal.toLowerCase();
            bVal = bVal.toLowerCase();
        }
        
        if (aVal < bVal) return sortState.books.ascending ? -1 : 1;
        if (aVal > bVal) return sortState.books.ascending ? 1 : -1;
        return 0;
    });
    
    return sorted;
}

// Wishlist 정렬 함수
function sortWishlistBy(column) {
    if (sortState.wishlist.column === column) {
        sortState.wishlist.ascending = !sortState.wishlist.ascending;
    } else {
        sortState.wishlist.column = column;
        sortState.wishlist.ascending = true;
    }
    renderWishlist();
}

function sortWishlist(wishlist) {
    if (!sortState.wishlist.column) return wishlist;
    
    const sorted = [...wishlist].sort((a, b) => {
        const column = sortState.wishlist.column;
        let aVal = a[column];
        let bVal = b[column];
        
        // null/undefined 처리
        if (aVal == null) aVal = '';
        if (bVal == null) bVal = '';
        
        // 가격은 숫자로 변환
        if (column === 'price') {
            aVal = parseFloat(aVal) || 0;
            bVal = parseFloat(bVal) || 0;
        }
        // 우선순위는 숫자
        else if (column === 'priority') {
            aVal = parseInt(aVal) || 0;
            bVal = parseInt(bVal) || 0;
        }
        // 날짜
        else if (column === 'addedDate') {
            aVal = aVal || 0;
            bVal = bVal || 0;
        }
        // 문자열
        else if (typeof aVal === 'string') {
            aVal = aVal.toLowerCase();
            bVal = bVal.toLowerCase();
        }
        
        if (aVal < bVal) return sortState.wishlist.ascending ? -1 : 1;
        if (aVal > bVal) return sortState.wishlist.ascending ? 1 : -1;
        return 0;
    });
    
    return sorted;
}

// ========================================
// 이미지 뷰어 기능
// ========================================

/**
 * 고해상도 이미지 뷰어 모달 열기
 * @param {Object} book - 책 또는 위시리스트 아이템 객체
 */
function openImageViewer(book) {
    const modal = document.getElementById('imageViewerModal');
    const container = document.getElementById('imageViewerContainer');
    
    if (!modal || !container) return;
    
    const effectiveCover = getEffectiveCoverSrc(book, true);
    if (!effectiveCover) {
        return; // 유효한 이미지 URL이 없으면 뷰어를 열지 않음
    }
    
    // 커스텀 Base64 이미지가 아니고, Google Books URL인 경우만 크기 선택 옵션 제공
    const isBase64 = effectiveCover.startsWith('data:image/');
    const isGoogleBooks = !isBase64 && effectiveCover.includes('books.google.') && effectiveCover.includes('/books/content');
    
    let sizeOptions = [];
    
    if (isGoogleBooks) {
        sizeOptions = [
            { label: 'large', url: makeGoogleZoomedUrl(effectiveCover, 3), zoom: 3 },
            { label: 'small', url: makeGoogleZoomedUrl(effectiveCover, 2), zoom: 2 },
            { label: 'thumbnail', url: makeGoogleZoomedUrl(effectiveCover, 1), zoom: 1 }
        ];
    } else {
        // Base64 커스텀 표지 또는 일반 웹 이미지 URL인 경우 단일 URL로 표시 (상단 크기 선택기 숨김)
        sizeOptions = [
            { label: 'image', url: effectiveCover, zoom: null }
        ];
    }
    
    let selectedUrl = sizeOptions[0].url;
    
    function renderViewer() {
        container.innerHTML = '';
        
        // 크기 선택 UI (Google Books인 경우만 표시, 커스텀 표지일 때는 숨김)
        if (sizeOptions.length > 1) {
            const selectorDiv = document.createElement('div');
            selectorDiv.className = 'image-size-selector';
            
            sizeOptions.forEach(option => {
                const optionDiv = document.createElement('div');
                optionDiv.className = 'image-size-option' + (option.url === selectedUrl ? ' selected' : '');
                optionDiv.onclick = () => {
                    selectedUrl = option.url;
                    renderViewer();
                };
                
                const previewImg = document.createElement('img');
                previewImg.src = option.url;
                previewImg.className = 'image-size-preview';
                previewImg.alt = option.label;
                
                const labelSpan = document.createElement('span');
                labelSpan.className = 'image-size-label';
                labelSpan.textContent = option.label;
                
                optionDiv.appendChild(previewImg);
                optionDiv.appendChild(labelSpan);
                selectorDiv.appendChild(optionDiv);
            });
            
            container.appendChild(selectorDiv);
        }
        
        // 메인 이미지 표시
        const mainDiv = document.createElement('div');
        mainDiv.className = 'image-viewer-main';
        
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'image-viewer-loading';
        loadingDiv.textContent = 'Loading...';
        mainDiv.appendChild(loadingDiv);
        
        const mainImg = document.createElement('img');
        mainImg.src = selectedUrl;
        mainImg.alt = escapeHtml(book.title || 'Cover');
        mainImg.style.display = 'none';
        
        mainImg.onload = () => {
            loadingDiv.remove();
            mainImg.style.display = 'block';
        };
        
        mainImg.onerror = () => {
            loadingDiv.textContent = 'Failed to load image';
            loadingDiv.className = 'image-viewer-error';
        };
        
        mainDiv.appendChild(mainImg);
        container.appendChild(mainDiv);
    }
    
    renderViewer();
    modal.classList.remove('hidden');
}

/**
 * Google Books URL의 zoom 파라미터 변경
 * @param {string} url - 원본 URL
 * @param {number} zoom - zoom 값 (1=thumbnail, 2=small, 3=large)
 * @returns {string} - 수정된 URL
 */
function makeGoogleZoomedUrl(url, zoom) {
    if (!url) return url;
    
    const sanitized = url.replace('http://', 'https://');
    const zoomRegex = /zoom=\d+/;
    
    let withZoom;
    if (zoomRegex.test(sanitized)) {
        withZoom = sanitized.replace(zoomRegex, `zoom=${zoom}`);
    } else {
        const separator = sanitized.includes('?') ? '&' : '?';
        withZoom = `${sanitized}${separator}zoom=${zoom}`;
    }
    
    // printsec=frontcover 파라미터 추가
    if (!withZoom.includes('printsec=')) {
        const separator = withZoom.includes('?') ? '&' : '?';
        withZoom = `${withZoom}${separator}printsec=frontcover`;
    }
    
    return withZoom;
}

/**
 * 이미지 뷰어 모달 닫기
 */
function closeImageViewer() {
    const modal = document.getElementById('imageViewerModal');
    if (modal) {
        modal.classList.add('hidden');
    }
}
