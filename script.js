// Fallback data in case data.json cannot be loaded
const fallbackData = {
    "images": [
        {
            "url": "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400",
            "alt": "Modern Book Cover",
            "position": "hero",
            "title": "The Midnight Library",
            "author": "Matt Haig",
            "price": "$18.99",
            "type": "Physical"
        },
        {
            "url": "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400",
            "alt": "Classic Literature",
            "position": "featured",
            "title": "Atomic Habits",
            "author": "James Clear",
            "price": "$14.99",
            "type": "Digital"
        },
        {
            "url": "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400",
            "alt": "Fiction Book",
            "position": "featured",
            "title": "Where the Crawdads Sing",
            "author": "Delia Owens",
            "price": "$16.99",
            "type": "Physical"
        },
        {
            "url": "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=400",
            "alt": "Business Book",
            "position": "featured",
            "title": "The 48 Laws of Power",
            "author": "Robert Greene",
            "price": "$19.99",
            "type": "Both"
        },
        {
            "url": "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400",
            "alt": "Self Help Book",
            "position": "bestseller",
            "title": "Thinking, Fast and Slow",
            "author": "Daniel Kahneman",
            "price": "$17.99",
            "type": "Digital"
        },
        {
            "url": "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400",
            "alt": "Adventure Novel",
            "position": "bestseller",
            "title": "Project Hail Mary",
            "author": "Andy Weir",
            "price": "$15.99",
            "type": "Physical"
        },
        {
            "url": "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400",
            "alt": "Mystery Thriller",
            "position": "bestseller",
            "title": "The Silent Patient",
            "author": "Alex Michaelides",
            "price": "$13.99",
            "type": "Both"
        },
        {
            "url": "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400",
            "alt": "Romance Novel",
            "position": "bestseller",
            "title": "It Ends with Us",
            "author": "Colleen Hoover",
            "price": "$12.99",
            "type": "Digital"
        }
    ]
};

// Global variable to store books data
let booksData = null;

// Function to fetch books data from JSON file
async function fetchBooksData() {
    try {
        const response = await fetch('data.json');
        if (!response.ok) {
            throw new Error('Failed to fetch data.json');
        }
        booksData = await response.json();
        console.log('Data loaded from data.json');
        return booksData;
    } catch (error) {
        console.warn('Could not load data.json, using fallback data:', error.message);
        // Use fallback data if fetch fails
        booksData = fallbackData;
        return booksData;
    }
}

// Function to create book card HTML
function createBookCard(book) {
    return `
        <div class="col-lg-3 col-md-6">
            <div class="book-card">
                <img src="${book.url}" 
                     alt="${book.alt}" 
                     class="book-image" 
                     onerror="this.src='https://via.placeholder.com/400x550/1a1a1a/ffffff?text=Image+Not+Available'">
                <div class="book-card-body">
                    <h3 class="book-title">${book.title}</h3>
                    <p class="book-author">by ${book.author}</p>
                    <div class="mb-3">
                        <span class="book-badge">${book.type}</span>
                    </div>
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="book-price">${book.price}</span>
                        <button class="btn btn-custom btn-sm" onclick="addToCart('${book.title}')">
                            <i class="fas fa-cart-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Function to load books into different sections
function loadBooks() {
    if (!booksData || !booksData.images) {
        console.error('No books data available');
        return;
    }

    const featuredContainer = document.getElementById('featured-books');
    const bestsellersContainer = document.getElementById('bestsellers');

    // Clear existing content
    if (featuredContainer) featuredContainer.innerHTML = '';
    if (bestsellersContainer) bestsellersContainer.innerHTML = '';

    // Load featured books
    const featuredBooks = booksData.images.filter(book => book.position === 'featured');
    if (featuredBooks.length > 0) {
        featuredBooks.forEach(book => {
            if (featuredContainer) {
                featuredContainer.innerHTML += createBookCard(book);
            }
        });
        console.log(`Loaded ${featuredBooks.length} featured books`);
    } else {
        console.warn('No featured books found');
    }

    // Load bestsellers
    const bestsellerBooks = booksData.images.filter(book => book.position === 'bestseller');
    if (bestsellerBooks.length > 0) {
        bestsellerBooks.forEach(book => {
            if (bestsellersContainer) {
                bestsellersContainer.innerHTML += createBookCard(book);
            }
        });
        console.log(`Loaded ${bestsellerBooks.length} bestseller books`);
    } else {
        console.warn('No bestseller books found');
    }

    // Load hero image
    const heroImage = booksData.images.find(book => book.position === 'hero');
    if (heroImage) {
        const heroImgElement = document.getElementById('hero-image');
        if (heroImgElement) {
            heroImgElement.src = heroImage.url;
            heroImgElement.alt = heroImage.alt;
            console.log('Hero image loaded');
        }
    }
}

// Function to handle add to cart (placeholder)
function addToCart(bookTitle) {
    alert(`"${bookTitle}" added to cart!`);
    // You can implement actual cart functionality here
    updateCartCount();
}

// Function to update cart count (placeholder)
function updateCartCount() {
    // This is a placeholder - implement actual cart count logic
    const cartButton = document.querySelector('.btn-custom');
    if (cartButton) {
        const currentCount = parseInt(cartButton.textContent.match(/\d+/)[0]) || 0;
        cartButton.innerHTML = `<i class="fas fa-shopping-cart me-2"></i>Cart (${currentCount + 1})`;
    }
}

// Smooth scroll for anchor links
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', async function() {
    console.log('Page loaded, fetching books data...');
    await fetchBooksData();
    loadBooks();
    console.log('Books loaded successfully!');
});

// Export functions for potential use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        fetchBooksData,
        createBookCard,
        loadBooks,
        addToCart
    };
}