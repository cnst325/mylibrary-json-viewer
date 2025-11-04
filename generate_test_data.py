#!/usr/bin/env python3
"""
MyLibrary Test Data Generator
Generates test data with 100 books and 20 wishlist items using Google Books API
"""

import requests
import json
import random
import time
from datetime import datetime, timedelta

# 책 100권 ISBN
BOOK_ISBNS = [
    # Classic Literature (20)
    "9780061120084", "9780451524935", "9780141439518", "9780743273565",
    "9780451526342", "9780316769174", "9780399501487", "9780140177398",
    "9780141441146", "9780141439556", "9780060850524", "9780141439570",
    "9780141439471", "9780141439846", "9780141439563", "9780142437179",
    "9780142437247", "9780142437261", "9780141439600", "9780147514011",
    
    # Contemporary Fiction (20)
    "9781594631931", "9780375842207", "9780425232200", "9780307588371",
    "9781594633669", "9780142424179", "9780735220683", "9780312577223",
    "9780735219090", "9780399590504", "9780062315007", "9780156027328",
    "9781400032716", "9780307387899", "9781400078776", "9780142001745",
    "9781565125605", "9780156029438", "9780679781585", "9780316168816",
    
    # Fantasy & SF (20)
    "9780439708180", "9780439064873", "9780439136365", "9780547928227",
    "9780547928210", "9780439023528", "9780439023498", "9780439023511",
    "9780812550702", "9780345391803", "9780441172719", "9780553293357",
    "9780553418026", "9780307887443", "9780553593716", "9780756404741",
    "9780380789030", "9780060853983", "9781501143519", "9780441569595",
    
    # Mystery & Thriller (20)
    "9780307474278", "9780671027360", "9780307454546", "9780312924584",
    "9780399587191", "9780062678416", "9780307341556", "9780143113492",
    "9780316206853", "9780062073556", "9780062693662", "9780062073488",
    "9780143105008", "9780345806086", "9780735221086", "9781250121004",
    "9780062868930", "9781524714680", "9781250301697", "9781501190520",
    
    # Self-Help & Business (20)
    "9780735211292", "9781585424337", "9781982137274", "9780671027032",
    "9781577314806", "9781612680194", "9780062457714", "9780399592522",
    "9780062316097", "9780374533557", "9781878424310", "9780807014295",
    "9780307887894", "9780066620992", "9781591846444", "9781455586691",
    "9781501111112", "9780345472328", "9781592858491", "9780061583254"
]

# 위시리스트 20권 ISBN (다른 유명 서적들)
WISHLIST_ISBNS = [
    "9780316769488",  # The Catcher in the Rye (다른 에디션)
    "9780385333849",  # The Book of Lost Things - John Connolly
    "9780385490818",  # The Shadow of the Wind - Carlos Ruiz Zafón
    "9780316013949",  # Twilight - Stephenie Meyer
    "9780439139595",  # Harry Potter and the Goblet of Fire
    "9780439358071",  # Harry Potter and the Order of the Phoenix
    "9780439785969",  # Harry Potter and the Half-Blood Prince
    "9780545010221",  # Harry Potter and the Deathly Hallows
    "9780525478812",  # The Midnight Library - Matt Haig
    "9780593230572",  # Klara and the Sun - Kazuo Ishiguro
    "9780525559474",  # The Vanishing Half - Brit Bennett
    "9780525520375",  # The Four Winds - Kristin Hannah
    "9780593296707",  # People We Meet on Vacation - Emily Henry
    "9780593356487",  # The Paris Apartment - Lucy Foley
    "9780593441282",  # The Last Thing He Told Me - Laura Dave
    "9780593315200",  # The Lincoln Highway - Amor Towles
    "9780593314524",  # Cloud Cuckoo Land - Anthony Doerr
    "9780593318447",  # The Maid - Nita Prose
    "9780593355213",  # The Hunting Wives - May Cobb
    "9780593466414"   # The Christie Affair - Nina de Gramont
]

CATEGORIES = [
    "Classic Literature", "Contemporary Fiction", "Fantasy", "Science Fiction",
    "Mystery", "Thriller", "Self-Help", "Business", "Romance", "Historical Fiction"
]

LOCATIONS = ["Shelf A", "Shelf B", "Shelf C", "Desk", "Bedroom"]

BORROWER_NAMES = [
    "John Smith", "Emma Johnson", "Michael Brown", "Sarah Davis",
    "David Wilson", "Lisa Anderson", "Robert Taylor", "Jennifer Martinez"
]

READING_NOTES = [
    "Great read! Highly recommend.",
    "Interesting perspective on life.",
    "Couldn't put it down!",
    "A classic that never gets old.",
    "Thought-provoking and engaging.",
    "Beautiful writing style.",
    "One of my favorites.",
    "Mind-blowing plot twists!",
    "Characters felt so real.",
    "Will read again sometime."
]

def date_to_timestamp(date_str):
    """Convert YYYY-MM-DD string to Unix timestamp in milliseconds"""
    dt = datetime.strptime(date_str, '%Y-%m-%d')
    return int(dt.timestamp() * 1000)

def fetch_book_info(isbn):
    """Fetch book information from Google Books API"""
    try:
        url = f"https://www.googleapis.com/books/v1/volumes?q=isbn:{isbn}"
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        data = response.json()
        
        if 'items' not in data or len(data['items']) == 0:
            print(f"❌ No data found for ISBN: {isbn}")
            return None
        
        book_info = data['items'][0]['volumeInfo']
        
        return {
            'title': book_info.get('title', 'Unknown Title'),
            'authors': ', '.join(book_info.get('authors', ['Unknown Author'])),
            'publisher': book_info.get('publisher', ''),
            'publishedDate': book_info.get('publishedDate', ''),
            'description': book_info.get('description', ''),
            'pageCount': book_info.get('pageCount', 0),
            'categories': book_info.get('categories', []),
            'thumbnail': book_info.get('imageLinks', {}).get('thumbnail', '').replace('http://', 'https://'),  # Force HTTPS
            'language': book_info.get('language', 'en')
        }
    except Exception as e:
        print(f"❌ Error fetching ISBN {isbn}: {e}")
        return None

def random_date(start_days_ago, end_days_ago):
    """Generate random date between start_days_ago and end_days_ago"""
    start = datetime.now() - timedelta(days=start_days_ago)
    end = datetime.now() - timedelta(days=end_days_ago)
    delta = end - start
    random_days = random.randint(0, delta.days)
    return (start + timedelta(days=random_days)).strftime('%Y-%m-%d')

def generate_books_data():
    """Generate test data for 100 books"""
    books = []
    
    print("📚 Generating 100 books data...")
    print("=" * 60)
    
    for i, isbn in enumerate(BOOK_ISBNS, 1):
        print(f"[{i}/100] Fetching ISBN: {isbn}...", end=" ")
        
        book_info = fetch_book_info(isbn)
        
        if not book_info:
            continue
        
        # Random read status distribution: 30% READING, 50% READ, 20% UNREAD
        read_status_choice = random.random()
        if read_status_choice < 0.3:
            read_status = "READING"
        elif read_status_choice < 0.8:
            read_status = "READ"  # Changed from FINISHED to READ
        else:
            read_status = "UNREAD"
        
        # Book data matching BackupBook structure
        purchase_date = random_date(365, 1)
        current_time = int(datetime.now().timestamp() * 1000)
        
        book = {
            'id': i,
            'title': book_info['title'],
            'author': book_info['authors'],
            'publisher': book_info['publisher'],
            'publishDate': book_info['publishedDate'],  # Changed from publishedDate
            'isbn': isbn,
            'category': random.choice(CATEGORIES),
            'pageCount': book_info['pageCount'],
            'language': book_info['language'],
            'coverUrl': book_info['thumbnail'],  # Changed from thumbnail
            'highResCoverUrl': None,  # Optional field
            'localCoverPath': None,  # Optional field
            'location': random.choice(LOCATIONS),
            'locationId': None,  # Will be set later based on location name
            'rating': None,  # Will be set for READ books
            'readStatus': read_status,
            'description': book_info['description'],
            'note': None,  # Optional field
            'apiSource': 'Google Books API',  # Added field
            'price': f"${round(random.uniform(10.0, 50.0), 2)}",  # String format
            'startReadingDate': None,  # Will be set based on status
            'finishReadingDate': None,  # Will be set for READ books
            'emotionTag': None,  # Optional field
            'readingNote': None,  # Will be set for READ books
            'mediaType': 'BOOK',  # Default media type
            # EBOOK fields (all None for physical books)
            'fileFormat': None,
            'fileSize': None,
            'filePath': None,
            # CD/VINYL fields (all None)
            'artist': None,
            'albumName': None,
            'trackCount': None,
            # DVD fields (all None)
            'director': None,
            'cast': None,
            'runningTime': None,
            # COMIC/MANGA fields (all None)
            'volumeNumber': None,
            'seriesName': None,
            'isComplete': None,
            'addedDate': date_to_timestamp(purchase_date),  # Long timestamp
            'modifiedDate': current_time  # Long timestamp
        }
        
        # Add rating and reading dates for READ books
        if read_status == "READ":  # Changed from FINISHED to READ
            book['rating'] = float(random.randint(3, 5))  # Convert to float
            start_date = random_date(180, 30)
            book['startReadingDate'] = start_date
            # Finish date is 7-30 days after start
            finish_days = random.randint(7, 30)
            finish_date = (datetime.strptime(start_date, '%Y-%m-%d') + 
                          timedelta(days=finish_days)).strftime('%Y-%m-%d')
            book['finishReadingDate'] = finish_date
            if random.random() < 0.8:  # 80% of read books have notes
                book['readingNote'] = random.choice(READING_NOTES)
        
        # Add reading dates for READING books
        elif read_status == "READING":
            book['startReadingDate'] = random_date(60, 1)
        
        books.append(book)
        print(f"✅ {book['title'][:40]}")
        
        # Rate limiting to avoid API throttling
        time.sleep(0.5)
    
    return books

def generate_loans_data(books):
    """Generate loan data for 15 books (15% of books) matching BackupLoan structure"""
    loans = []
    borrower_data = {}  # Track borrowers for borrowerId assignment
    
    print("\n🔄 Generating loan data...")
    print("=" * 60)
    
    # Select 15 random books for loans
    loaned_books = random.sample([b for b in books if b['readStatus'] != 'READING'], 
                                  min(15, len(books)))
    
    for i, book in enumerate(loaned_books, 1):
        loan_date_str = random_date(60, 1)
        loan_date = date_to_timestamp(loan_date_str)
        
        due_date_str = (datetime.strptime(loan_date_str, '%Y-%m-%d') + 
                       timedelta(days=14)).strftime('%Y-%m-%d')
        due_date = date_to_timestamp(due_date_str)
        
        # 70% returned, 30% still on loan
        is_returned = random.random() < 0.7
        
        borrower_name = random.choice(BORROWER_NAMES)
        borrower_contact = f"+1-555-{random.randint(1000, 9999)}"
        
        # Assign borrower ID
        if borrower_name not in borrower_data:
            borrower_data[borrower_name] = {
                'id': len(borrower_data) + 1,
                'contact': borrower_contact
            }
        borrower_id = borrower_data[borrower_name]['id']
        
        return_date_str = random_date(13, 1) if is_returned else None
        return_date = date_to_timestamp(return_date_str) if return_date_str else None
        
        loan = {
            'id': i,
            'bookId': book['id'],
            'borrowerId': borrower_id,  # Added field
            'borrowerInfo1': borrower_name,  # Changed from borrowerName
            'borrowerInfo2': borrower_contact,  # Changed from borrowerContact
            'borrowerNote': None,  # Optional field
            'loanDate': loan_date,  # Long timestamp
            'dueDate': due_date,  # Long timestamp
            'returnDate': return_date,  # Long timestamp or None
            'isReturned': is_returned,  # Changed from status (Boolean)
            'memo': None  # Optional field
        }
        
        loans.append(loan)
        status = "✅ Returned" if is_returned else "📤 On Loan"
        print(f"[{i}/15] {status}: {book['title'][:40]} → {borrower_name}")
    
    return loans, borrower_data

def generate_borrowers_data(borrower_data, loans):
    """Generate borrowers list matching BackupBorrower structure"""
    borrowers = []
    current_time = int(datetime.now().timestamp() * 1000)
    
    # Count loans per borrower and find last borrow date
    borrow_counts = {}
    last_borrow_dates = {}
    
    for loan in loans:
        borrower_id = loan['borrowerId']
        borrow_counts[borrower_id] = borrow_counts.get(borrower_id, 0) + 1
        
        loan_date = loan['loanDate']
        if borrower_id not in last_borrow_dates or loan_date > last_borrow_dates[borrower_id]:
            last_borrow_dates[borrower_id] = loan_date
    
    for name, data in borrower_data.items():
        borrower_id = data['id']
        borrower = {
            'id': borrower_id,
            'info1': name,  # Changed from name
            'info2': data['contact'],  # Changed from contact
            'note': None,  # Optional field
            'createdDate': current_time - random.randint(1, 90) * 24 * 60 * 60 * 1000,  # Random date in last 90 days
            'lastBorrowDate': last_borrow_dates.get(borrower_id),  # Long timestamp or None
            'totalBorrows': borrow_counts.get(borrower_id, 0),
            'isActive': True,  # Added field
            'isFavorite': random.random() < 0.3  # 30% favorites
        }
        borrowers.append(borrower)
    
    print(f"\n👥 Generated {len(borrowers)} unique borrowers")
    return borrowers

def generate_wishlist_data():
    """Generate wishlist data for 20 books"""
    wishlist = []
    
    print("\n💝 Generating wishlist data...")
    print("=" * 60)
    
    for i, isbn in enumerate(WISHLIST_ISBNS, 1):
        print(f"[{i}/20] Fetching ISBN: {isbn}...", end=" ")
        
        book_info = fetch_book_info(isbn)
        
        if not book_info:
            continue
        
        added_date_str = random_date(180, 1)
        
        # Wishlist item matching BackupWishlistItem structure
        item = {
            'id': i,
            'title': book_info['title'],
            'author': book_info['authors'],
            'isbn': isbn,
            'publisher': book_info['publisher'],
            'coverUrl': book_info['thumbnail'],  # Changed from thumbnail
            'highResCoverUrl': None,  # Optional field
            'price': f"${round(random.uniform(15.0, 45.0), 2)}",  # Changed from estimatedPrice
            'buyLink': None,  # Optional field
            'priority': random.randint(1, 5),
            'addedDate': date_to_timestamp(added_date_str),  # Long timestamp (changed from string)
            'description': book_info.get('description'),  # Optional field
            'memo': random.choice([  # Changed from notes
                "Recommended by a friend",
                "Saw great reviews online",
                "Want to read this series",
                "Author's new release",
                "Been on my list for a while"
            ]) if random.random() < 0.6 else None,
            'publishDate': book_info.get('publishedDate'),  # Optional field
            'category': random.choice(CATEGORIES) if random.random() < 0.5 else None,  # Optional field
            'pageCount': book_info.get('pageCount'),  # Optional field
            'language': book_info.get('language'),  # Optional field
            'apiSource': 'Google Books API'  # Optional field
        }
        
        wishlist.append(item)
        print(f"✅ {'⭐' * item['priority']} {item['title'][:35]}")
        
        time.sleep(0.5)
    
    return wishlist

def generate_locations_data():
    """Generate location data matching BackupLocation structure"""
    locations = []
    current_time = int(datetime.now().timestamp() * 1000)
    
    location_rooms = {
        'Shelf A': ('Living Room', 'Shelf 1'),
        'Shelf B': ('Living Room', 'Shelf 2'),
        'Bookcase C': ('Study', 'Bookcase 1'),
        'Storage D': ('Bedroom', 'Storage Box'),
        'Desk E': ('Office', 'Desk Shelf')
    }
    
    for i, location_name in enumerate(LOCATIONS, 1):
        room, shelf = location_rooms.get(location_name, (None, None))
        
        locations.append({
            'id': i,
            'name': location_name,
            'room': room,  # Added field
            'shelf': shelf,  # Added field
            'description': f"Books stored in {location_name.lower()}",
            'order': i,  # Added field
            'createdDate': current_time - (90 - i * 10) * 24 * 60 * 60 * 1000,  # Staggered creation dates
            'modifiedDate': current_time  # Added field
        })
    
    print(f"\n📍 Generated {len(locations)} locations")
    return locations

def main():
    """Main function to generate all test data"""
    print("\n" + "=" * 60)
    print("🚀 MyLibrary Test Data Generator")
    print("=" * 60)
    
    # Generate data
    books = generate_books_data()
    loans, borrower_data = generate_loans_data(books)  # Returns tuple now
    borrowers = generate_borrowers_data(borrower_data, loans)  # Updated parameters
    wishlist = generate_wishlist_data()
    locations = generate_locations_data()
    
    # Assign locationId to books based on location name
    location_id_map = {loc['name']: loc['id'] for loc in locations}
    for book in books:
        book['locationId'] = location_id_map.get(book['location'])
    
    # Create final JSON structure matching MyLibrary backup format
    backup_data = {
        'version': 2,  # Integer version, not string
        'exportDate': int(datetime.now().timestamp() * 1000),  # Unix timestamp in milliseconds
        'totalBooks': len(books),
        'books': books,
        'totalLoans': len(loans),
        'loans': loans,
        'totalBorrowers': len(borrowers),
        'borrowers': borrowers,
        'totalWishlist': len(wishlist),
        'wishlist': wishlist,
        'totalLocations': len(locations),
        'locations': locations
    }
    
    # Save to file
    output_file = 'MyLibrary_TestData_100Books.json'
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(backup_data, f, indent=2, ensure_ascii=False)
    
    # Print summary
    print("\n" + "=" * 60)
    print("✅ Test Data Generation Complete!")
    print("=" * 60)
    print(f"📊 Summary:")
    print(f"   • Books: {len(books)}")
    print(f"   • Loans: {len(loans)}")
    print(f"   • Borrowers: {len(borrowers)}")
    print(f"   • Wishlist: {len(wishlist)}")
    print(f"   • Locations: {len(locations)}")
    print(f"\n💾 Saved to: {output_file}")
    print(f"\n📱 Next Steps:")
    print(f"   1. Transfer '{output_file}' to your Android device")
    print(f"   2. Open MyLibrary app")
    print(f"   3. Go to Settings → Backup & Restore")
    print(f"   4. Select 'Restore from JSON'")
    print(f"   5. Choose '{output_file}'")
    print("=" * 60)

if __name__ == "__main__":
    main()
