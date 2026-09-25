import React, { useState } from 'react';
import './App.css';

// Sample mock data for books with requested schema attributes
const INITIAL_BOOKS = [
  {
    id: 1,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    price: 14.99,
    category: 'Fiction',
    featured: true,
    isNew: false,
    popular: true,
    availableQuantity: 12,
    coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=400&q=80',
    description: 'A classic story of ambition, love, and the American Dream set in the Roaring Twenties.'
  },
  {
    id: 2,
    title: 'Atomic Habits',
    author: 'James Clear',
    price: 21.50,
    category: 'Self-Help',
    featured: true,
    isNew: true,
    popular: true,
    availableQuantity: 25,
    coverImage: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=400&q=80',
    description: 'An easy & proven way to build good habits & break bad ones with actionable insights.'
  },
  {
    id: 3,
    title: 'Clean Code',
    author: 'Robert C. Martin',
    price: 34.00,
    category: 'Technology',
    featured: false,
    isNew: false,
    popular: true,
    availableQuantity: 8,
    coverImage: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=400&q=80',
    description: 'A handbook of agile software craftsmanship packed with principles for writing better code.'
  },
  {
    id: 4,
    title: 'Dune',
    author: 'Frank Herbert',
    price: 18.99,
    category: 'Sci-Fi',
    featured: true,
    isNew: true,
    popular: false,
    availableQuantity: 15,
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80',
    description: 'Set on the desert planet Arrakis, Dune is the story of Paul Atreides and his epic destiny.'
  },
  {
    id: 5,
    title: 'Sapiens: A Brief History of Humankind',
    author: 'Yuval Noah Harari',
    price: 22.95,
    category: 'History',
    featured: false,
    isNew: true,
    popular: true,
    availableQuantity: 3,
    coverImage: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=400&q=80',
    description: 'How Homo sapiens conquered the Earth through cognitive, agricultural, and scientific revolutions.'
  },
  {
    id: 6,
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    price: 16.50,
    category: 'Psychology',
    featured: false,
    isNew: false,
    popular: false,
    availableQuantity: 19,
    coverImage: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=400&q=80',
    description: 'Explores the two systems that drive the way we think: fast intuitive thinking and slow deliberate thinking.'
  }
];

const CATEGORIES = ['All', 'Fiction', 'Self-Help', 'Technology', 'Sci-Fi', 'History', 'Psychology'];

function App() {
  const [activeTab, setActiveTab] = useState('home'); // 'home' or 'books'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBook, setSelectedBook] = useState(null);

  // Filter books based on search & category
  const filteredBooks = INITIAL_BOOKS.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredBooks = INITIAL_BOOKS.filter(b => b.featured);
  const newBooks = INITIAL_BOOKS.filter(b => b.isNew);
  const popularBooks = INITIAL_BOOKS.filter(b => b.popular);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setActiveTab('books');
  };

  return (
    <div className="app-container">
      {/* Header / Navbar */}
      <header className="navbar">
        <div className="nav-brand" onClick={() => { setActiveTab('home'); setSelectedBook(null); }}>
          📚 <span>BookSell Online</span>
        </div>
        <nav className="nav-links">
          <button 
            className={`nav-btn ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => { setActiveTab('home'); setSelectedBook(null); }}
          >
            Home
          </button>
          <button 
            className={`nav-btn ${activeTab === 'books' ? 'active' : ''}`}
            onClick={() => { setActiveTab('books'); setSelectedBook(null); }}
          >
            Books
          </button>
        </nav>
      </header>

      {/* Main Content Area with Clean White Background */}
      <main className="main-content">
        {selectedBook ? (
          /* Book Details View */
          <section className="book-details-view">
            <button className="back-btn" onClick={() => setSelectedBook(null)}>
              ← Back to {activeTab === 'home' ? 'Home' : 'Books'}
            </button>
            <div className="details-card">
              <div className="details-image-container">
                <img src={selectedBook.coverImage} alt={selectedBook.title} className="details-cover" />
              </div>
              <div className="details-info">
                <span className="badge category-badge">{selectedBook.category}</span>
                <h1 className="details-title">{selectedBook.title}</h1>
                <p className="details-author">By <strong>{selectedBook.author}</strong></p>
                <p className="details-price">${selectedBook.price.toFixed(2)}</p>
                
                <div className="quantity-status">
                  <strong>Available Quantity:</strong> 
                  <span className={selectedBook.availableQuantity > 5 ? 'in-stock' : 'low-stock'}>
                    {selectedBook.availableQuantity} in stock
                  </span>
                </div>

                <p className="details-description">{selectedBook.description}</p>

                <button className="buy-now-btn">Add to Cart</button>
              </div>
            </div>
          </section>
        ) : activeTab === 'home' ? (
          /* Home View */
          <section className="home-view">
            <div className="hero-banner">
              <h1>Find Your Next Favorite Book</h1>
              <p>Explore thousands of books across all genres and authors.</p>
              
              {/* Search Bar in Home */}
              <form className="search-bar" onSubmit={handleSearchSubmit}>
                <input 
                  type="text" 
                  placeholder="Search by book title or author..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit">Search Books</button>
              </form>
            </div>

            {/* Categories Section */}
            <section className="section">
              <h2 className="section-title">Categories</h2>
              <div className="categories-grid">
                {CATEGORIES.filter(c => c !== 'All').map(cat => (
                  <button 
                    key={cat} 
                    className="category-pill"
                    onClick={() => {
                      setSelectedCategory(cat);
                      setActiveTab('books');
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </section>

            {/* Featured Books */}
            <section className="section">
              <h2 className="section-title">Featured Books</h2>
              <div className="books-grid">
                {featuredBooks.map(book => (
                  <BookCard key={book.id} book={book} onSelect={setSelectedBook} />
                ))}
              </div>
            </section>

            {/* New Books */}
            <section className="section">
              <h2 className="section-title">New Arrival Books</h2>
              <div className="books-grid">
                {newBooks.map(book => (
                  <BookCard key={book.id} book={book} onSelect={setSelectedBook} />
                ))}
              </div>
            </section>

            {/* Popular Books */}
            <section className="section">
              <h2 className="section-title">Popular Books</h2>
              <div className="books-grid">
                {popularBooks.map(book => (
                  <BookCard key={book.id} book={book} onSelect={setSelectedBook} />
                ))}
              </div>
            </section>
          </section>
        ) : (
          /* Books View / Search & Listing */
          <section className="books-view">
            <h1 className="page-title">Explore All Books</h1>
            
            {/* Search and Filters */}
            <div className="filters-bar">
              <input 
                type="text" 
                className="search-input"
                placeholder="Search titles or authors..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              
              <div className="category-filters">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Book List Grid */}
            <div className="books-grid">
              {filteredBooks.length > 0 ? (
                filteredBooks.map(book => (
                  <BookCard key={book.id} book={book} onSelect={setSelectedBook} />
                ))
              ) : (
                <div className="no-results">No books found matching your criteria.</div>
              )}
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2026 BookSell Online. All rights reserved.</p>
      </footer>
    </div>
  );
}

// Reusable Book Card Component
function BookCard({ book, onSelect }) {
  return (
    <div className="book-card" onClick={() => onSelect(book)}>
      <div className="cover-wrapper">
        <img src={book.coverImage} alt={book.title} className="book-cover" />
      </div>
      <div className="card-body">
        <span className="card-category">{book.category}</span>
        <h3 className="card-title">{book.title}</h3>
        <p className="card-author">By {book.author}</p>
        <div className="card-footer">
          <span className="card-price">${book.price.toFixed(2)}</span>
          <span className="card-qty">{book.availableQuantity} left</span>
        </div>
      </div>
    </div>
  );
}

export default App;
