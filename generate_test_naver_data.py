#!/usr/bin/env python3
"""
MyLibrary Naver API Test Data Generator
Generates test data with 300 books (150 Korean + 150 English) and 100 wishlist items using Naver Books API
"""

import requests
import json
import random
import time
from datetime import datetime, timedelta
from typing import List, Dict, Optional

# Naver API 설정 (환경변수 또는 직접 입력)
NAVER_CLIENT_ID = "eDGg3o6UGv57ayoet6TY"
NAVER_CLIENT_SECRET = "PM9vBVcmCH"

# 검색 쿼리 - 한글 책 (150권 수집 목표)
KOREAN_QUERIES = [
    # 한국 고전 문학 (30권)
    "김유정", "이상", "박경리", "황순원", "김동인",
    "이광수", "나도향", "채만식", "염상섭", "현진건",
    "토지", "태백산맥", "무정", "상록수", "아리랑",
    "혼불", "객주", "장길산", "삼국유사", "삼국사기",
    "춘향전", "홍길동전", "구운몽", "사씨남정기", "박씨전",
    "심청전", "흥부전", "토끼전", "배비장전", "양반전",
    
    # 현대 한국 문학 (30권)
    "김영하", "한강", "신경숙", "이문열", "공지영",
    "조정래", "은희경", "김훈", "박완서", "공선옥",
    "박민규", "김애란", "천명관", "정유정", "정찬",
    "백가흠", "박형서", "이기호", "편혜영", "황정은",
    "채홍란", "김려령", "윤고은", "백수린", "손원평",
    "김초엽", "구병모", "최은영", "이기호", "서유미",
    
    # 인문/에세이 (30권)
    "유시민", "강신주", "김영민", "이어령", "도정일",
    "고미숙", "진중권", "김난도", "김지하", "조광제",
    "나는 왜 쓰는가", "어떻게 살 것인가", "생각하지 않는 사람들", "죽음이란 무엇인가", "정의란 무엇인가",
    "미움받을 용기", "죽고 싶지만 떡볶이는 먹고 싶어", "언어의 온도", "당신이 옳다", "비폭력대화",
    "아픔이 길이 되려면", "공부하는 삶", "우리는 차별에 찬성합니다", "이토록 공부가 재미있어지는 순간", "도덕의 계보",
    "정의란 무엇인가", "생각이 너무 많은 어른들을 위한 심리학", "혼자 있는 시간의 힘", "관계의 본질", "나는 나로 살기로 했다",
    
    # 실용/자기계발 (30권)
    "부의 추월차선", "돈의 속성", "시골빵집에서 자본론을 굽다", "그릿", "타이탄의 도구들",
    "아몬드", "완벽한 공부법", "습관의 힘", "몰입", "흐름",
    "생각에 관한 생각", "넛지", "스틱", "스위치", "틀 짓기",
    "오리지널스", "어떻게 나를 최고로 만드는가", "메모의 기술", "시간을 파는 상점", "1만 시간의 재발견",
    "아주 작은 습관의 힘", "디지털 미니멀리즘", "에센셜리즘", "그로스 해킹", "린 스타트업",
    "제로 투 원", "블itzscaling", "OKR", "실리콘밸리의 팀장들", "구글은 어떻게 일하는가",
    
    # 과학/기술 (30권)
    "코스모스", "이기적 유전자", "총균쇠", "사피엔스", "호모 데우스",
    "21세기를 위한 21가지 제언", "팩트풀니스", "넛지", "생각에 관한 생각", "블랙홀", 
    "시간의 역사", "엔트로피", "카오스", "복잡성의 과학", "양자역학",
    "인공지능", "딥러닝", "알고리즘의 시대", "클라우드", "블록체인",
    "메타버스", "NFT", "Web3", "빅데이터", "사물인터넷",
    "로봇", "자율주행", "양자컴퓨터", "생명공학", "나노기술"
]

# 검색 쿼리 - 영어권 책 (150권 수집 목표)
ENGLISH_QUERIES = [
    # Classic Literature (30)
    "To Kill a Mockingbird", "1984", "Pride and Prejudice", "The Great Gatsby",
    "The Catcher in the Rye", "Lord of the Flies", "Animal Farm", "Brave New World",
    "Wuthering Heights", "Jane Eyre", "Moby Dick", "The Odyssey",
    "Crime and Punishment", "War and Peace", "The Brothers Karamazov", "Don Quixote",
    "Hamlet", "Macbeth", "Romeo and Juliet", "The Divine Comedy",
    "Paradise Lost", "Beowulf", "Canterbury Tales", "Les Miserables",
    "Count of Monte Cristo", "Three Musketeers", "Treasure Island", "Robinson Crusoe",
    "Gulliver's Travels", "Tom Sawyer",
    
    # Modern Fiction (30)
    "Harry Potter", "The Hobbit", "Lord of the Rings", "Game of Thrones",
    "The Hunger Games", "Divergent", "Twilight", "Percy Jackson",
    "The Da Vinci Code", "Angels and Demons", "The Alchemist", "Life of Pi",
    "The Kite Runner", "A Thousand Splendid Suns", "The Book Thief", "All the Light We Cannot See",
    "The Nightingale", "The Silent Patient", "Gone Girl", "The Girl on the Train",
    "Big Little Lies", "Sharp Objects", "Dark Places", "The Woman in the Window",
    "The Guest List", "The Sanatorium", "The Maidens", "The Push",
    "The Last Thing He Told Me", "The Paper Palace",
    
    # Fantasy & Sci-Fi (30)
    "Dune", "Foundation", "Ender's Game", "Neuromancer", "Snow Crash",
    "Ready Player One", "The Martian", "Project Hail Mary", "The Expanse", "Red Rising",
    "Mistborn", "The Way of Kings", "The Name of the Wind", "The Lies of Locke Lamora",
    "The First Law", "The Blade Itself", "The Poppy War", "The City of Brass",
    "Children of Blood and Bone", "The Priory of the Orange Tree", "A Darker Shade of Magic",
    "Six of Crows", "Shadow and Bone", "An Ember in the Ashes", "Red Queen",
    "Throne of Glass", "A Court of Thorns and Roses", "From Blood and Ash", "Fourth Wing",
    "Iron Flame",
    
    # Self-Help & Business (30)
    "Atomic Habits", "Think and Grow Rich", "How to Win Friends", "The 7 Habits",
    "Rich Dad Poor Dad", "The Lean Startup", "Zero to One", "Good to Great",
    "The Innovator's Dilemma", "Blue Ocean Strategy", "The Art of War", "The Prince",
    "The Subtle Art", "Can't Hurt Me", "Grit", "Mindset",
    "Deep Work", "Essentialism", "The Power of Now", "The Four Agreements",
    "Man's Search for Meaning", "Flow", "Drive", "Start with Why",
    "The Infinite Game", "Dare to Lead", "Radical Candor", "Crucial Conversations",
    "Never Split the Difference", "Getting to Yes",
    
    # Non-Fiction (30)
    "Sapiens", "Homo Deus", "21 Lessons", "Educated", "Becoming",
    "The Immortal Life", "Bad Blood", "The Body", "When Breath Becomes Air", "Being Mortal",
    "Factfulness", "Thinking Fast and Slow", "Freakonomics", "The Tipping Point", "Outliers",
    "Blink", "David and Goliath", "Talking to Strangers", "The Black Swan", "Antifragile",
    "Skin in the Game", "Fooled by Randomness", "Guns Germs and Steel", "Collapse", "The World Until Yesterday",
    "The Sixth Extinction", "Half-Earth", "The Uninhabitable Earth", "This Changes Everything", "No One Is Too Small"
]

# 위시리스트 검색 쿼리 (한글/영문 혼합)
WISHLIST_QUERIES = [
    # 한글 베스트셀러 (50권)
    "퓨처셀프", "역행자", "불편한 편의점", "달러구트 꿈 백화점", "트렌드 코리아",
    "아버지의 해방일지", "세상의 마지막 기차역", "1cm", "페인트", "보건교사 안은영",
    "우리가 빛의 속도로 갈 수 없다면", "저주토끼", "지구 끝의 온실", "딸에게 보내는 마음 편지", "작별인사",
    "시선으로부터", "파친코", "달러구트 꿈 백화점 2", "죽고 싶지만 떡볶이는 먹고 싶어 2", "이토록 평범한 미래",
    "불안", "설민석의 한국사 대모험", "총균쇠", "코스모스", "정의란 무엇인가",
    "하얼빈", "작별하지 않는다", "불편한 편의점 2", "비 오는 날 떠나기 좋은 집", "당신이 누군가를 죽였다",
    "살인자의 쇼핑몰", "한 번의 생은 눈이 오듯 찾아온다", "소년이 온다", "희랍어 시간", "괴물",
    "건축학개론", "나미야 잡화점의 기적", "어린왕자", "해리포터", "반지의 제왕",
    "백설공주 살인사건", "골든슬럼버", "용의자 X의 헌신", "백야행", "환상의 빛",
    "비밀", "나는 전설이다", "화차", "기도하는 남자", "마스커레이드",
    
    # 영문 베스트셀러 (50권)
    "Tomorrow and Tomorrow", "Holly", "The Heaven & Earth Grocery Store", "Fourth Wing", "Iron Flame",
    "Happy Place", "The Housemaid", "The Housemaid's Secret", "Lessons in Chemistry", "Demon Copperhead",
    "The Seven Husbands", "It Ends with Us", "It Starts with Us", "Verity", "Reminders of Him",
    "Ugly Love", "November 9", "Colleen Hoover Collection", "The Woman in Me", "Spare",
    "I'm Glad My Mom Died", "The Light We Carry", "Greenlights", "Will", "The Storyteller",
    "Friends Lovers", "The Wager", "Killers of the Flower Moon", "Empire of Pain", "The Kingdom",
    "Elon Musk", "Steve Jobs", "Leonardo da Vinci", "Benjamin Franklin", "Einstein",
    "The Song of Achilles", "Circe", "The Invisible Life of Addie LaRue", "Mexican Gothic", "The Midnight Library",
    "Klara and the Sun", "Cloud Cuckoo Land", "The Lincoln Highway", "The Paris Apartment", "The Christie Affair",
    "The Maid", "The Family Remains", "The It Girl", "Rock Paper Scissors", "The Hunting Wives"
]

CATEGORIES = [
    "Classic Literature", "Contemporary Fiction", "Fantasy", "Science Fiction",
    "Mystery", "Thriller", "Self-Help", "Business", "Romance", "Historical Fiction",
    "문학", "소설", "시/에세이", "인문", "역사", "사회/정치", "과학/기술", "자기계발", "경제/경영", "예술"
]

LOCATIONS = ["Shelf A", "Shelf B", "Shelf C", "Shelf D", "Shelf E", "Desk", "Bedroom", "Living Room", "Study Room", "Office"]

BORROWER_NAMES = [
    "John Smith", "Emma Johnson", "Michael Brown", "Sarah Davis",
    "David Wilson", "Lisa Anderson", "Robert Taylor", "Jennifer Martinez",
    "김민수", "이지은", "박서준", "최유나", "정하늘", "강소희", "윤동현", "임예린"
]

READING_NOTES = [
    "Great read! Highly recommend.",
    "Interesting perspective on life.",
    "Couldn't put it down!",
    "A classic that never gets old.",
    "Thought-provoking and engaging.",
    "너무 재밌어서 단숨에 읽었어요!",
    "인생책입니다. 강력 추천!",
    "작가의 문체가 아름다워요.",
    "여운이 오래가는 책이에요.",
    "다시 읽고 싶은 책입니다."
]

def date_to_timestamp(date_str):
    """Convert date string to millisecond timestamp"""
    dt = datetime.strptime(date_str, "%Y-%m-%d")
    return int(dt.timestamp() * 1000)

def search_naver_books(query: str, display: int = 10) -> List[Dict]:
    """
    Naver Books API로 책 검색
    
    Args:
        query: 검색어
        display: 검색 결과 개수 (최대 100)
    
    Returns:
        검색된 책 정보 리스트
    """
    url = "https://openapi.naver.com/v1/search/book.json"
    headers = {
        "X-Naver-Client-Id": NAVER_CLIENT_ID,
        "X-Naver-Client-Secret": NAVER_CLIENT_SECRET
    }
    params = {
        "query": query,
        "display": display,
        "sort": "sim"  # sim: 정확도순, date: 출간일순, count: 판매량순
    }
    
    try:
        response = requests.get(url, headers=headers, params=params)
        response.raise_for_status()
        data = response.json()
        return data.get("items", [])
    except requests.exceptions.RequestException as e:
        print(f"❌ API 요청 실패 ({query}): {e}")
        return []

def clean_html_tags(text: str) -> str:
    """HTML 태그 제거"""
    import re
    return re.sub(r'<[^>]+>', '', text)

def extract_isbn(naver_book: Dict) -> Optional[str]:
    """Naver API 응답에서 ISBN 추출 (ISBN13 우선)"""
    isbn = naver_book.get("isbn", "")
    
    # ISBN은 "8932473625 9788932473628" 형식 (ISBN10 ISBN13)
    parts = isbn.split()
    
    # ISBN13 찾기 (13자리)
    for part in parts:
        if len(part) == 13 and part.isdigit():
            return part
    
    # ISBN10 찾기 (10자리)
    for part in parts:
        if len(part) == 10:
            return part
    
    return None

def naver_to_mylibrary_format(naver_book: Dict, book_id: int) -> Dict:
    """
    Naver API 응답을 MyLibrary JSON 형식으로 변환
    
    Args:
        naver_book: Naver API 응답 데이터
        book_id: 도서 ID
    
    Returns:
        MyLibrary 형식의 도서 정보
    """
    isbn = extract_isbn(naver_book)
    title = clean_html_tags(naver_book.get("title", "Unknown Title"))
    author = clean_html_tags(naver_book.get("author", "Unknown Author"))
    publisher = clean_html_tags(naver_book.get("publisher", "Unknown Publisher"))
    description = clean_html_tags(naver_book.get("description", ""))
    
    # 가격 추출 (discount가 있으면 사용, 없으면 price 사용)
    price = naver_book.get("discount", naver_book.get("price", 0))
    if isinstance(price, str):
        price = int(price) if price.isdigit() else 0
    
    # 출간일 파싱
    pubdate = naver_book.get("pubdate", "")
    if pubdate and len(pubdate) == 8:  # YYYYMMDD 형식
        publication_date = f"{pubdate[:4]}-{pubdate[4:6]}-{pubdate[6:]}"
    else:
        publication_date = "2024-01-01"  # 기본값
    
    # 이미지 URL (HTTPS로 변환)
    image_url = naver_book.get("image", "")
    if image_url and image_url.startswith("http://"):
        image_url = image_url.replace("http://", "https://")
    
    # 카테고리 랜덤 선택
    category = random.choice(CATEGORIES)
    
    # ReadStatus 랜덤 선택
    read_status = random.choice(["READ", "READING", "UNREAD"])
    
    # 읽은 책의 경우 rating과 독서 노트 추가
    rating = float(random.choice([3, 4, 5])) if read_status == "READ" else None
    reading_note = random.choice(READING_NOTES) if read_status == "READ" and random.random() > 0.5 else None
    
    # 페이지 수 (Naver API에는 없으므로 랜덤 생성)
    page_count = random.randint(150, 800)
    
    # 구매일/추가일
    purchase_date = (datetime.now() - timedelta(days=random.randint(1, 365))).strftime("%Y-%m-%d")
    added_timestamp = date_to_timestamp(purchase_date)
    
    # 읽기 날짜 (READ인 경우에만)
    start_reading_date = None
    finish_reading_date = None
    if read_status == "READ":
        days_ago = random.randint(30, 300)
        start_date = datetime.now() - timedelta(days=days_ago)
        finish_date = start_date + timedelta(days=random.randint(3, 30))
        start_reading_date = start_date.strftime("%Y-%m-%d")
        finish_reading_date = finish_date.strftime("%Y-%m-%d")
    
    # Location ID (1-10 랜덤)
    location_id = random.randint(1, 10)
    
    book = {
        "id": book_id,
        "title": title,
        "author": author,
        "publisher": publisher,
        "publishDate": publication_date,  # publicationDate가 아님!
        "isbn": isbn if isbn else "",
        "category": category,
        "pageCount": page_count,
        "language": "ko" if any(ord(c) >= 0xAC00 and ord(c) <= 0xD7A3 for c in title) else "en",
        "coverUrl": image_url,  # coverImageUrl가 아님!
        "highResCoverUrl": None,
        "localCoverPath": None,
        "location": random.choice(LOCATIONS),
        "locationId": location_id,
        "rating": rating,
        "readStatus": read_status,
        "description": description[:500] if description else "",
        "note": None,
        "apiSource": "Naver Books API",
        "price": f"₩{price:,}" if price > 0 else None,
        "startReadingDate": start_reading_date,
        "finishReadingDate": finish_reading_date,
        "emotionTag": None,
        "readingNote": reading_note,
        "mediaType": "BOOK",
        "fileFormat": None,
        "fileSize": None,
        "filePath": None,
        "artist": None,
        "albumName": None,
        "trackCount": None,
        "director": None,
        "cast": None,
        "runningTime": None,
        "volumeNumber": None,
        "seriesName": None,
        "isComplete": None,
        "addedDate": added_timestamp,
        "modifiedDate": added_timestamp
    }
    
    return book

def naver_to_wishlist_format(naver_book: Dict, wishlist_id: int) -> Dict:
    """
    Naver API 응답을 MyLibrary Wishlist JSON 형식으로 변환
    """
    isbn = extract_isbn(naver_book)
    title = clean_html_tags(naver_book.get("title", "Unknown Title"))
    author = clean_html_tags(naver_book.get("author", "Unknown Author"))
    publisher = clean_html_tags(naver_book.get("publisher", "Unknown Publisher"))
    description = clean_html_tags(naver_book.get("description", ""))
    
    price = naver_book.get("discount", naver_book.get("price", 0))
    if isinstance(price, str):
        price = int(price) if price.isdigit() else 0
    
    pubdate = naver_book.get("pubdate", "")
    if pubdate and len(pubdate) == 8:
        publication_date = f"{pubdate[:4]}-{pubdate[4:6]}-{pubdate[6:]}"
    else:
        publication_date = "2024-01-01"
    
    image_url = naver_book.get("image", "")
    if image_url and image_url.startswith("http://"):
        image_url = image_url.replace("http://", "https://")
    
    added_date = (datetime.now() - timedelta(days=random.randint(1, 180))).strftime("%Y-%m-%d")
    added_timestamp = date_to_timestamp(added_date)
    
    # priority: 0=LOW, 1=MEDIUM, 2=HIGH
    priority = random.choice([0, 1, 2])
    
    # 페이지 수
    page_count = random.randint(150, 800)
    
    # 희망 구매 메모
    notes = [
        "읽고 싶은 책", "추천받은 책", "베스트셀러", "꼭 사야 할 책", 
        "Must read!", "Highly recommended", "On my reading list", None
    ]
    
    wishlist = {
        "id": wishlist_id,
        "title": title,
        "author": author,
        "isbn": isbn if isbn else None,
        "publisher": publisher if publisher else None,
        "coverUrl": image_url if image_url else None,
        "highResCoverUrl": None,
        "price": f"₩{price:,}" if price > 0 else None,
        "buyLink": None,
        "priority": priority,
        "addedDate": added_timestamp,
        "description": description[:500] if description else None,
        "memo": random.choice(notes),
        "publishDate": publication_date,
        "category": random.choice(CATEGORIES),
        "pageCount": page_count,
        "language": "ko" if any(ord(c) >= 0xAC00 and ord(c) <= 0xD7A3 for c in title) else "en",
        "apiSource": "Naver Books API"
    }
    
    return wishlist

def generate_loans(books: List[Dict], num_loans: int = 30) -> List[Dict]:
    """대출 기록 생성 (대출 중인 책들)"""
    if not books:
        return []
    
    loans = []
    loan_books = random.sample(books, min(num_loans, len(books)))
    
    for idx, book in enumerate(loan_books):
        # 대출일 (최근 60일 이내)
        loan_date = datetime.now() - timedelta(days=random.randint(1, 60))
        loan_timestamp = int(loan_date.timestamp() * 1000)
        
        # 반납 예정일 (대출일로부터 14-30일 후)
        due_date = loan_date + timedelta(days=random.randint(14, 30))
        due_timestamp = int(due_date.timestamp() * 1000)
        
        # 70%는 대출 중, 30%는 이미 반납
        is_returned = random.random() < 0.3
        
        # borrowerId는 1부터 시작 (대출자 수만큼)
        borrower_id = random.randint(1, min(15, num_loans))
        
        loan = {
            "id": idx + 1,
            "bookId": book["id"],
            "borrowerId": borrower_id,
            "borrowerInfo1": BORROWER_NAMES[borrower_id - 1] if borrower_id <= len(BORROWER_NAMES) else BORROWER_NAMES[0],
            "borrowerInfo2": f"010-{random.randint(1000, 9999)}-{random.randint(1000, 9999)}",
            "borrowerNote": None,
            "loanDate": loan_timestamp,
            "dueDate": due_timestamp,
            "returnDate": due_timestamp if is_returned else None,
            "isReturned": is_returned,
            "memo": None
        }
        
        loans.append(loan)
    
    return loans

def generate_borrowers(loans: List[Dict]) -> List[Dict]:
    """대출자 목록 생성"""
    # 대출 기록에서 사용된 borrowerId 추출
    borrower_ids = list(set([loan["borrowerId"] for loan in loans]))
    borrowers = []
    
    for borrower_id in sorted(borrower_ids):
        # 해당 borrower의 대출 기록들
        borrower_loans = [loan for loan in loans if loan["borrowerId"] == borrower_id]
        
        # 이름과 전화번호
        name = BORROWER_NAMES[borrower_id - 1] if borrower_id <= len(BORROWER_NAMES) else BORROWER_NAMES[0]
        phone = f"010-{random.randint(1000, 9999)}-{random.randint(1000, 9999)}"
        
        # 생성일 (가장 오래된 대출일)
        created_timestamp = min([loan["loanDate"] for loan in borrower_loans])
        
        # 마지막 대출일 (가장 최근 대출일)
        last_borrow_timestamp = max([loan["loanDate"] for loan in borrower_loans])
        
        # 총 대출 횟수
        total_borrows = len(borrower_loans)
        
        # 활성 여부 (현재 대출 중인 책이 있는지)
        is_active = any(not loan["isReturned"] for loan in borrower_loans)
        
        borrower = {
            "id": borrower_id,
            "info1": name,
            "info2": phone,
            "note": None,
            "createdDate": created_timestamp,
            "lastBorrowDate": last_borrow_timestamp,
            "totalBorrows": total_borrows,
            "isActive": is_active,
            "isFavorite": random.random() < 0.3  # 30% 확률로 즐겨찾기
        }
        
        borrowers.append(borrower)
    
    return borrowers

def generate_locations(books: List[Dict]) -> List[Dict]:
    """소장위치 목록 생성"""
    location_names = list(set([book["location"] for book in books]))
    locations = []
    
    current_time = int(datetime.now().timestamp() * 1000)
    
    location_descriptions = {
        "Shelf A": "Books stored in shelf a",
        "Shelf B": "Books stored in shelf b", 
        "Shelf C": "Books stored in shelf c",
        "Shelf D": "Books stored in shelf d",
        "Shelf E": "Books stored in shelf e",
        "Desk": "Books stored in desk",
        "Bedroom": "Books stored in bedroom",
        "Living Room": "Books stored in living room",
        "Study Room": "Books stored in study room",
        "Office": "Books stored in office"
    }
    
    for idx, name in enumerate(sorted(location_names)):
        location = {
            "id": idx + 1,
            "name": name,
            "room": None,
            "shelf": None,
            "description": location_descriptions.get(name, f"Books stored in {name.lower()}"),
            "order": idx + 1,
            "createdDate": current_time,
            "modifiedDate": current_time
        }
        
        locations.append(location)
    
    return locations

def main():
    """메인 실행 함수"""
    print("=" * 80)
    print("MyLibrary Naver API Test Data Generator")
    print("=" * 80)
    print()
    
    # API 키 확인
    if NAVER_CLIENT_ID == "YOUR_CLIENT_ID" or NAVER_CLIENT_SECRET == "YOUR_CLIENT_SECRET":
        print("❌ 오류: Naver API 키를 설정해주세요!")
        print()
        print("다음 단계를 따라주세요:")
        print("1. https://developers.naver.com/ 접속")
        print("2. 애플리케이션 등록")
        print("3. '검색' API 선택")
        print("4. Client ID와 Client Secret을 스크립트에 입력")
        print()
        return
    
    print("✅ API 키 확인 완료")
    print()
    
    all_books = []
    all_wishlist = []
    book_id_counter = 1
    wishlist_id_counter = 1
    
    # 1. 한글 책 150권 수집
    print("📚 한글 책 수집 중...")
    korean_collected = 0
    for query in KOREAN_QUERIES:
        if korean_collected >= 150:
            break
        
        print(f"  검색 중: {query}...", end=" ")
        results = search_naver_books(query, display=5)
        
        for naver_book in results:
            if korean_collected >= 150:
                break
            
            book = naver_to_mylibrary_format(naver_book, book_id_counter)
            all_books.append(book)
            book_id_counter += 1
            korean_collected += 1
        
        print(f"✓ (총 {korean_collected}권)")
        time.sleep(0.1)  # API 요청 제한 준수
    
    print(f"✅ 한글 책 {korean_collected}권 수집 완료")
    print()
    
    # 2. 영어권 책 150권 수집
    print("📚 영어권 책 수집 중...")
    english_collected = 0
    for query in ENGLISH_QUERIES:
        if english_collected >= 150:
            break
        
        print(f"  검색 중: {query}...", end=" ")
        results = search_naver_books(query, display=5)
        
        for naver_book in results:
            if english_collected >= 150:
                break
            
            book = naver_to_mylibrary_format(naver_book, book_id_counter)
            all_books.append(book)
            book_id_counter += 1
            english_collected += 1
        
        print(f"✓ (총 {english_collected}권)")
        time.sleep(0.1)
    
    print(f"✅ 영어권 책 {english_collected}권 수집 완료")
    print()
    
    # 3. 위시리스트 100권 수집
    print("🌟 위시리스트 수집 중...")
    wishlist_collected = 0
    for query in WISHLIST_QUERIES:
        if wishlist_collected >= 100:
            break
        
        print(f"  검색 중: {query}...", end=" ")
        results = search_naver_books(query, display=5)
        
        for naver_book in results:
            if wishlist_collected >= 100:
                break
            
            wishlist = naver_to_wishlist_format(naver_book, wishlist_id_counter)
            all_wishlist.append(wishlist)
            wishlist_id_counter += 1
            wishlist_collected += 1
        
        print(f"✓ (총 {wishlist_collected}권)")
        time.sleep(0.1)
    
    print(f"✅ 위시리스트 {wishlist_collected}권 수집 완료")
    print()
    
    # 4. 대출 기록 생성
    print("📖 대출 기록 생성 중...")
    loans = generate_loans(all_books, num_loans=40)
    print(f"✅ 대출 기록 {len(loans)}건 생성 완료")
    print()
    
    # 5. 대출자 목록 생성
    print("👥 대출자 목록 생성 중...")
    borrowers = generate_borrowers(loans)
    print(f"✅ 대출자 {len(borrowers)}명 생성 완료")
    print()
    
    # 6. 소장위치 목록 생성
    print("📍 소장위치 생성 중...")
    locations = generate_locations(all_books)
    print(f"✅ 소장위치 {len(locations)}개 생성 완료")
    print()
    
    # 7. JSON 파일 생성
    backup_data = {
        "version": 2,  # 정수형
        "exportDate": int(datetime.now().timestamp() * 1000),  # 타임스탬프
        "totalBooks": len(all_books),
        "books": all_books,
        "totalLoans": len(loans),
        "loans": loans,
        "totalBorrowers": len(borrowers),
        "borrowers": borrowers,
        "totalWishlist": len(all_wishlist),
        "wishlist": all_wishlist,
        "totalLocations": len(locations),
        "locations": locations
    }
    
    filename = f"MyLibrary_NaverAPI_TestData_{korean_collected}K_{english_collected}E_{wishlist_collected}W.json"
    
    print(f"💾 JSON 파일 저장 중: {filename}")
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(backup_data, f, ensure_ascii=False, indent=2)
    
    file_size = len(json.dumps(backup_data, ensure_ascii=False))
    
    print()
    print("=" * 80)
    print("✅ 테스트 데이터 생성 완료!")
    print("=" * 80)
    print(f"📁 파일명: {filename}")
    print(f"📊 파일 크기: {file_size:,} bytes ({file_size / 1024:.1f} KB)")
    print()
    print("📈 생성된 데이터:")
    print(f"  • 한글 책: {korean_collected}권")
    print(f"  • 영어권 책: {english_collected}권")
    print(f"  • 총 소장 도서: {len(all_books)}권")
    print(f"  • 위시리스트: {len(all_wishlist)}권")
    print(f"  • 대출 기록: {len(loans)}건")
    print(f"  • 대출자: {len(borrowers)}명")
    print(f"  • 소장위치: {len(locations)}개")
    print()
    print("🎉 이제 MyLibrary 앱에서 이 파일을 가져오기 하세요!")
    print()

if __name__ == "__main__":
    main()
