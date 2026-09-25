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
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'books' | 'cart'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBook, setSelectedBook] = useState(null);
  
  // Shopping Cart state
  const [cart, setCart] = useState([]);

  // Add book to cart
  const addToCart = (book) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === book.id);
      if (existing) {
        if (existing.quantity >= book.availableQuantity) {
          alert(`Cannot add more. Max stock available is ${book.availableQuantity}`);
          return prevCart;
        }
        return prevCart.map((item) =>
          item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...book, quantity: 1 }];
    });
  };

  // Increase quantity of book in cart
  const increaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id === id) {
          if (item.quantity >= item.availableQuantity) {
            alert(`Maximum stock available for ${item.title} reached.`);
            return item;
          }
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      })
    );
  };

  // Decrease quantity of book in cart (removes item if quantity becomes 0)
  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Remove book completely from cart
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Calculate cart metrics (Total Count and Total Price)
  const totalItemsCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const tax = subtotal * 0.08; // 8% sales tax
  const grandTotal = subtotal + tax;

  // Filter books based on search & category
  const filteredBooks = INITIAL_BOOKS.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredBooks = INITIAL_BOOKS.filter((b) => b.featured);
  const newBooks = INITIAL_BOOKS.filter((b) => b.isNew);
  const popularBooks = INITIAL_BOOKS.filter((b) => b.popular);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setActiveTab('books');
  };

  return (
    <div className="app-container">
      {/* Header / Navbar */}
      <header className="navbar">
        <div
          className="nav-brand"
          onClick={() => {
            setActiveTab('home');
            setSelectedBook(null);
          }}
        >
          📚 <span>BookSell Online</span>
        </div>
        <nav className="nav-links">
          <button
            className={`nav-btn ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('home');
              setSelectedBook(null);
            }}
          >
            Home
          </button>
          <button
            className={`nav-btn ${activeTab === 'books' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('books');
              setSelectedBook(null);
            }}
          >
            Books
          </button>
          <button
            className={`nav-btn cart-nav-btn ${activeTab === 'cart' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('cart');
              setSelectedBook(null);
            }}
          >
            🛒 Cart ({totalItemsCount})
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
                <p className="details-author">
                  By <strong>{selectedBook.author}</strong>
                </p>
                <p className="details-price">${selectedBook.price.toFixed(2)}</p>

                <div className="quantity-status">
                  <strong>Available Quantity:</strong>
                  <span className={selectedBook.availableQuantity > 5 ? 'in-stock' : 'low-stock'}>
                    {selectedBook.availableQuantity} in stock
                  </span>
                </div>

                <p className="details-description">{selectedBook.description}</p>

                <div className="details-actions">
                  <button className="buy-now-btn" onClick={() => addToCart(selectedBook)}>
                    Add to Cart
                  </button>
                  <button
                    className="view-cart-btn"
                    onClick={() => {
                      addToCart(selectedBook);
                      setSelectedBook(null);
                      setActiveTab('cart');
                    }}
                  >
                    Buy Now & View Cart
                  </button>
                </div>
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
                {CATEGORIES.filter((c) => c !== 'All').map((cat) => (
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
                {featuredBooks.map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    onSelect={setSelectedBook}
                    onAddToCart={addToCart}
                  />
                ))}
              </div>
            </section>

            {/* New Books */}
            <section className="section">
              <h2 className="section-title">New Arrival Books</h2>
              <div className="books-grid">
                {newBooks.map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    onSelect={setSelectedBook}
                    onAddToCart={addToCart}
                  />
                ))}
              </div>
            </section>

            {/* Popular Books */}
            <section className="section">
              <h2 className="section-title">Popular Books</h2>
              <div className="books-grid">
                {popularBooks.map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    onSelect={setSelectedBook}
                    onAddToCart={addToCart}
                  />
                ))}
              </div>
            </section>
          </section>
        ) : activeTab === 'books' ? (
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
                {CATEGORIES.map((cat) => (
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
                filteredBooks.map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    onSelect={setSelectedBook}
                    onAddToCart={addToCart}
                  />
                ))
              ) : (
                <div className="no-results">No books found matching your criteria.</div>
              )}
            </div>
          </section>
        ) : (
          /* Shopping Cart View */
          <section className="cart-view">
            <h1 className="page-title">Your Shopping Cart ({totalItemsCount} items)</h1>

            {cart.length === 0 ? (
              <div className="empty-cart-card">
                <p className="empty-cart-text">Your cart is currently empty.</p>
                <button
                  className="buy-now-btn"
                  onClick={() => setActiveTab('books')}
                >
                  Browse Books
                </button>
              </div>
            ) : (
              <div className="cart-layout">
                {/* Cart Items List */}
                <div className="cart-items-list">
                  {cart.map((item) => (
                    <div key={item.id} className="cart-item">
                      <img src={item.coverImage} alt={item.title} className="cart-item-img" />
                      
                      <div className="cart-item-info">
                        <h3 className="cart-item-title">{item.title}</h3>
                        <p className="cart-item-author">By {item.author}</p>
                        <p className="cart-item-price">${item.price.toFixed(2)} each</p>
                      </div>

                      {/* Increase/Decrease Quantity Controls */}
                      <div className="cart-item-quantity">
                        <button
                          className="qty-btn"
                          onClick={() => decreaseQuantity(item.id)}
                          title="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="qty-value">{item.quantity}</span>
                        <button
                          className="qty-btn"
                          onClick={() => increaseQuantity(item.id)}
                          title="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      {/* Subtotal calculation for item */}
                      <div className="cart-item-subtotal">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>

                      {/* Remove item button */}
                      <button
                        className="remove-btn"
                        onClick={() => removeFromCart(item.id)}
                        title="Remove book from cart"
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>

                {/* Calculate Total / Cart Summary Partition */}
                <div className="cart-summary-card">
                  <h2>Order Summary</h2>
                  <div className="summary-row">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="summary-row">
                    <span>Estimated Tax (8%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="summary-divider"></div>
                  <div className="summary-row grand-total">
                    <span>Total</span>
                    <span>${grandTotal.toFixed(2)}</span>
                  </div>

                  <button
                    className="checkout-btn"
                    onClick={() => alert('Proceeding to checkout with total: $' + grandTotal.toFixed(2))}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            )}
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
function BookCard({ book, onSelect, onAddToCart }) {
  return (
    <div className="book-card">
      <div className="cover-wrapper" onClick={() => onSelect(book)}>
        <img src={book.coverImage} alt={book.title} className="book-cover" />
      </div>
      <div className="card-body">
        <span className="card-category">{book.category}</span>
        <h3 className="card-title" onClick={() => onSelect(book)}>
          {book.title}
        </h3>
        <p className="card-author">By {book.author}</p>
        <div className="card-footer">
          <span className="card-price">${book.price.toFixed(2)}</span>
          <button
            className="add-cart-btn"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(book);
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
