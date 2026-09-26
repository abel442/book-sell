import React, { useState } from 'react';
import './App.css';

// Initial book list
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

// Initial Categories List
const INITIAL_CATEGORIES = [
  'Fiction', 'Self-Help', 'Technology', 'Sci-Fi', 'History', 'Psychology'
];

// Initial Authors List
const INITIAL_AUTHORS = [
  'F. Scott Fitzgerald', 'James Clear', 'Robert C. Martin', 'Frank Herbert', 'Yuval Noah Harari', 'Daniel Kahneman'
];

// Initial Customers List
const INITIAL_CUSTOMERS = [
  { id: 1, name: 'John Doe', email: 'john@example.com', ordersCount: 3, totalSpent: 112.50, joinedDate: '2026-01-15' },
  { id: 2, name: 'Sarah Smith', email: 'sarah@example.com', ordersCount: 5, totalSpent: 240.00, joinedDate: '2026-03-22' },
  { id: 3, name: 'Michael Brown', email: 'michael@example.com', ordersCount: 1, totalSpent: 34.00, joinedDate: '2026-07-10' }
];

// Initial Orders
const INITIAL_ORDERS = [
  {
    id: 'ORD-98214',
    date: '2026-09-20',
    status: 'Delivered',
    total: 36.49,
    customer: {
      fullName: 'John Doe',
      email: 'john@example.com',
      phone: '+1 555-0192',
      address: '123 Main Street',
      city: 'New York',
      zipCode: '10001'
    },
    items: [
      { id: 1, title: 'The Great Gatsby', price: 14.99, quantity: 1, coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=400&q=80' },
      { id: 4, title: 'Dune', price: 18.99, quantity: 1, coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80' }
    ]
  },
  {
    id: 'ORD-54129',
    date: '2026-09-24',
    status: 'Processing',
    total: 58.20,
    customer: {
      fullName: 'Sarah Smith',
      email: 'sarah@example.com',
      phone: '+1 555-4819',
      address: '456 Oak Avenue',
      city: 'Los Angeles',
      zipCode: '90001'
    },
    items: [
      { id: 2, title: 'Atomic Habits', price: 21.50, quantity: 2, coverImage: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=400&q=80' }
    ]
  }
];

function App() {
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'books' | 'cart' | 'checkout' | 'orders' | 'auth' | 'profile' | 'admin'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBook, setSelectedBook] = useState(null);
  
  // Store Data States
  const [books, setBooks] = useState(INITIAL_BOOKS);
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [authors, setAuthors] = useState(INITIAL_AUTHORS);
  const [customers, setCustomers] = useState(INITIAL_CUSTOMERS);
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [cart, setCart] = useState([]);

  // Admin Active Tab / Section ('books' | 'categories' | 'authors' | 'customers' | 'orders' | 'stats')
  const [adminSubTab, setAdminSubTab] = useState('stats');

  // New Category & Author Input States
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newAuthorName, setNewAuthorName] = useState('');

  // User Auth State
  const [currentUser, setCurrentUser] = useState(null);
  const [authMode, setAuthMode] = useState('login');
  const [authFormData, setAuthFormData] = useState({ name: '', email: '', password: '' });
  const [authError, setAuthError] = useState('');

  // Checkout Form State
  const [checkoutData, setCheckoutData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    paymentMethod: 'credit-card'
  });

  // Admin Book Form State
  const [adminBookForm, setAdminBookForm] = useState({
    id: null,
    title: '',
    author: categories[0] || 'Fiction',
    price: '',
    category: categories[0] || 'Fiction',
    availableQuantity: '',
    coverImage: '',
    description: '',
    featured: false,
    isNew: true,
    popular: false
  });
  const [isEditingBook, setIsEditingBook] = useState(false);

  // Admin Category Management
  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;
    if (categories.includes(newCategoryName.trim())) {
      alert('Category already exists!');
      return;
    }
    setCategories([...categories, newCategoryName.trim()]);
    setNewCategoryName('');
  };

  const handleDeleteCategory = (catName) => {
    if (window.confirm(`Delete category "${catName}"?`)) {
      setCategories(categories.filter(c => c !== catName));
    }
  };

  // Admin Author Management
  const handleAddAuthor = (e) => {
    e.preventDefault();
    if (!newAuthorName.trim()) return;
    if (authors.includes(newAuthorName.trim())) {
      alert('Author already exists!');
      return;
    }
    setAuthors([...authors, newAuthorName.trim()]);
    setNewAuthorName('');
  };

  const handleDeleteAuthor = (authorName) => {
    if (window.confirm(`Delete author "${authorName}"?`)) {
      setAuthors(authors.filter(a => a !== authorName));
    }
  };

  // Admin Order Status Change
  const handleOrderStatusChange = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  // Handle Checkout (Place Order)
  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (!checkoutData.fullName || !checkoutData.email || !checkoutData.phone || !checkoutData.address || !checkoutData.city || !checkoutData.zipCode) {
      alert('Please fill out all delivery and customer information.');
      return;
    }

    if (cart.length === 0) {
      alert('Your cart is empty.');
      return;
    }

    const sub = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const taxAmt = sub * 0.08;
    const finalTotal = sub + taxAmt;

    const newOrder = {
      id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toISOString().split('T')[0],
      status: 'Processing',
      total: finalTotal,
      customer: { ...checkoutData },
      items: [...cart]
    };

    setBooks(prevBooks =>
      prevBooks.map(b => {
        const cartItem = cart.find(ci => ci.id === b.id);
        if (cartItem) {
          return {
            ...b,
            availableQuantity: Math.max(0, b.availableQuantity - cartItem.quantity)
          };
        }
        return b;
      })
    );

    // Also update or add customer profile metrics
    setCustomers(prev => {
      const existing = prev.find(c => c.email === checkoutData.email);
      if (existing) {
        return prev.map(c => c.email === checkoutData.email ? {
          ...c,
          ordersCount: c.ordersCount + 1,
          totalSpent: c.totalSpent + finalTotal
        } : c);
      }
      return [
        {
          id: Date.now(),
          name: checkoutData.fullName,
          email: checkoutData.email,
          ordersCount: 1,
          totalSpent: finalTotal,
          joinedDate: new Date().toISOString().split('T')[0]
        },
        ...prev
      ];
    });

    setOrders([newOrder, ...orders]);
    setCart([]);
    alert(`Order ${newOrder.id} placed successfully! Thank you for your purchase.`);
    setActiveTab('orders');
  };

  const proceedToCheckoutView = () => {
    if (currentUser) {
      setCheckoutData(prev => ({
        ...prev,
        fullName: currentUser.name || '',
        email: currentUser.email || ''
      }));
    }
    setActiveTab('checkout');
  };

  // Admin Book CRUD
  const handleAdminBookSubmit = (e) => {
    e.preventDefault();
    if (!adminBookForm.title || !adminBookForm.author || !adminBookForm.price || !adminBookForm.availableQuantity) {
      alert('Please fill in all required fields.');
      return;
    }

    const priceNum = parseFloat(adminBookForm.price);
    const qtyNum = parseInt(adminBookForm.availableQuantity, 10);
    const cover = adminBookForm.coverImage || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=400&q=80';

    if (isEditingBook) {
      setBooks(prev => prev.map(b => b.id === adminBookForm.id ? {
        ...adminBookForm,
        price: priceNum,
        availableQuantity: qtyNum,
        coverImage: cover
      } : b));
      alert('Book updated successfully!');
    } else {
      const newBook = {
        ...adminBookForm,
        id: Date.now(),
        price: priceNum,
        availableQuantity: qtyNum,
        coverImage: cover
      };
      setBooks(prev => [newBook, ...prev]);
      alert('New book added successfully!');
    }

    resetAdminForm();
  };

  const resetAdminForm = () => {
    setAdminBookForm({
      id: null,
      title: '',
      author: authors[0] || '',
      price: '',
      category: categories[0] || 'Fiction',
      availableQuantity: '',
      coverImage: '',
      description: '',
      featured: false,
      isNew: true,
      popular: false
    });
    setIsEditingBook(false);
  };

  const handleEditBookClick = (book) => {
    setAdminBookForm({ ...book });
    setIsEditingBook(true);
    setAdminSubTab('books');
  };

  const handleDeleteBookClick = (id) => {
    if (window.confirm('Are you sure you want to delete this book from inventory?')) {
      setBooks(prev => prev.filter(b => b.id !== id));
      setCart(prev => prev.filter(item => item.id !== id));
    }
  };

  // Auth Actions
  const handleAuthSubmit = (e) => {
    e.preventDefault();
    setAuthError('');

    if (!authFormData.email || !authFormData.password) {
      setAuthError('Please fill in all required fields.');
      return;
    }

    if (authMode === 'register' && !authFormData.name) {
      setAuthError('Please enter your full name.');
      return;
    }

    const userObj = {
      name: authMode === 'register' ? authFormData.name : authFormData.email.split('@')[0],
      email: authFormData.email,
      isAdmin: authFormData.email.includes('admin')
    };

    setCurrentUser(userObj);
    setAuthFormData({ name: '', email: '', password: '' });
    setActiveTab('home');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveTab('home');
  };

  // Cart Actions
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

  const increaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id === id) {
          if (item.quantity >= item.availableQuantity) {
            alert(`Maximum stock available reached.`);
            return item;
          }
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      })
    );
  };

  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const totalItemsCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const grandTotal = subtotal + tax;

  // Filter books
  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredBooks = books.filter((b) => b.featured);
  const newBooks = books.filter((b) => b.isNew);
  const popularBooks = books.filter((b) => b.popular);

  // Sales Statistics Calculation
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalBooksSold = orders.reduce((sum, o) => sum + o.items.reduce((iSum, i) => iSum + i.quantity, 0), 0);
  const pendingOrdersCount = orders.filter(o => o.status === 'Processing').length;

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
            className={`nav-btn ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('orders');
              setSelectedBook(null);
            }}
          >
            📦 My Orders ({orders.length})
          </button>

          {/* Admin Dashboard Tab */}
          <button
            className={`nav-btn admin-nav-btn ${activeTab === 'admin' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('admin');
              setSelectedBook(null);
            }}
          >
            ⚙️ Admin Dashboard
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

          {currentUser ? (
            <div className="user-nav-group">
              <button
                className={`nav-btn ${activeTab === 'profile' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab('profile');
                  setSelectedBook(null);
                }}
              >
                👤 {currentUser.name}
              </button>
              <button className="auth-btn logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <button
              className={`auth-btn login-btn ${activeTab === 'auth' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('auth');
                setSelectedBook(null);
              }}
            >
              Sign In
            </button>
          )}
        </nav>
      </header>

      {/* Main Content Area */}
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

            <section className="section">
              <h2 className="section-title">Categories</h2>
              <div className="categories-grid">
                {categories.map((cat) => (
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

            <section className="section">
              <h2 className="section-title">Featured Books</h2>
              <div className="books-grid">
                {featuredBooks.map((book) => (
                  <BookCard key={book.id} book={book} onSelect={setSelectedBook} onAddToCart={addToCart} />
                ))}
              </div>
            </section>

            <section className="section">
              <h2 className="section-title">New Arrival Books</h2>
              <div className="books-grid">
                {newBooks.map((book) => (
                  <BookCard key={book.id} book={book} onSelect={setSelectedBook} onAddToCart={addToCart} />
                ))}
              </div>
            </section>

            <section className="section">
              <h2 className="section-title">Popular Books</h2>
              <div className="books-grid">
                {popularBooks.map((book) => (
                  <BookCard key={book.id} book={book} onSelect={setSelectedBook} onAddToCart={addToCart} />
                ))}
              </div>
            </section>
          </section>
        ) : activeTab === 'books' ? (
          /* Books View */
          <section className="books-view">
            <h1 className="page-title">Explore All Books</h1>

            <div className="filters-bar">
              <input
                type="text"
                className="search-input"
                placeholder="Search titles or authors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              <div className="category-filters">
                {['All', ...categories].map((cat) => (
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

            <div className="books-grid">
              {filteredBooks.length > 0 ? (
                filteredBooks.map((book) => (
                  <BookCard key={book.id} book={book} onSelect={setSelectedBook} onAddToCart={addToCart} />
                ))
              ) : (
                <div className="no-results">No books found matching your criteria.</div>
              )}
            </div>
          </section>
        ) : activeTab === 'cart' ? (
          /* Cart View */
          <section className="cart-view">
            <h1 className="page-title">Your Shopping Cart ({totalItemsCount} items)</h1>

            {cart.length === 0 ? (
              <div className="empty-cart-card">
                <p className="empty-cart-text">Your cart is currently empty.</p>
                <button className="buy-now-btn" onClick={() => setActiveTab('books')}>
                  Browse Books
                </button>
              </div>
            ) : (
              <div className="cart-layout">
                <div className="cart-items-list">
                  {cart.map((item) => (
                    <div key={item.id} className="cart-item">
                      <img src={item.coverImage} alt={item.title} className="cart-item-img" />
                      <div className="cart-item-info">
                        <h3 className="cart-item-title">{item.title}</h3>
                        <p className="cart-item-author">By {item.author}</p>
                        <p className="cart-item-price">${item.price.toFixed(2)} each</p>
                      </div>

                      <div className="cart-item-quantity">
                        <button className="qty-btn" onClick={() => decreaseQuantity(item.id)}>
                          -
                        </button>
                        <span className="qty-value">{item.quantity}</span>
                        <button className="qty-btn" onClick={() => increaseQuantity(item.id)}>
                          +
                        </button>
                      </div>

                      <div className="cart-item-subtotal">${(item.price * item.quantity).toFixed(2)}</div>

                      <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>

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

                  <button className="checkout-btn" onClick={proceedToCheckoutView}>
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            )}
          </section>
        ) : activeTab === 'checkout' ? (
          /* Checkout View */
          <section className="checkout-view">
            <h1 className="page-title">🛍️ Checkout & Place Order</h1>

            <form onSubmit={handlePlaceOrder} className="checkout-layout">
              <div className="checkout-forms">
                <div className="checkout-card">
                  <h2>Customer Information</h2>
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. John Doe"
                      value={checkoutData.fullName}
                      onChange={(e) => setCheckoutData({ ...checkoutData, fullName: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Email Address *</label>
                      <input
                        type="email"
                        placeholder="john@example.com"
                        value={checkoutData.email}
                        onChange={(e) => setCheckoutData({ ...checkoutData, email: e.target.value })}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Phone Number *</label>
                      <input
                        type="tel"
                        placeholder="+1 555-0192"
                        value={checkoutData.phone}
                        onChange={(e) => setCheckoutData({ ...checkoutData, phone: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="checkout-card">
                  <h2>Delivery Address</h2>
                  <div className="form-group">
                    <label>Street Address *</label>
                    <input
                      type="text"
                      placeholder="123 Main Street, Apt 4B"
                      value={checkoutData.address}
                      onChange={(e) => setCheckoutData({ ...checkoutData, address: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>City *</label>
                      <input
                        type="text"
                        placeholder="New York"
                        value={checkoutData.city}
                        onChange={(e) => setCheckoutData({ ...checkoutData, city: e.target.value })}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Zip Code *</label>
                      <input
                        type="text"
                        placeholder="10001"
                        value={checkoutData.zipCode}
                        onChange={(e) => setCheckoutData({ ...checkoutData, zipCode: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="checkout-summary-card">
                <h2>Order Summary</h2>
                <div className="checkout-items-preview">
                  {cart.map(item => (
                    <div key={item.id} className="preview-item">
                      <span>{item.title} (x{item.quantity})</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="summary-divider"></div>
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
                  <span>Grand Total</span>
                  <span>${grandTotal.toFixed(2)}</span>
                </div>

                <button type="submit" className="place-order-btn">
                  Place Order Now
                </button>
              </div>
            </form>
          </section>
        ) : activeTab === 'orders' ? (
          /* My Orders View */
          <section className="orders-view">
            <h1 className="page-title">📦 My Orders & History</h1>

            {orders.length === 0 ? (
              <div className="empty-orders-card">
                <p>You have not placed any orders yet.</p>
                <button className="buy-now-btn" onClick={() => setActiveTab('books')}>
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className="orders-list">
                {orders.map((order) => (
                  <div key={order.id} className="order-card">
                    <div className="order-header">
                      <div>
                        <span className="order-id">{order.id}</span>
                        <span className="order-date">Placed on {order.date}</span>
                      </div>
                      <div className="order-status-group">
                        <span className={`status-badge ${order.status.toLowerCase()}`}>
                          {order.status}
                        </span>
                      </div>
                    </div>

                    <div className="order-body">
                      <div className="order-items-column">
                        <h4>Items Ordered</h4>
                        {order.items.map((item) => (
                          <div key={item.id} className="order-item-row">
                            <img src={item.coverImage} alt={item.title} className="order-item-thumb" />
                            <div>
                              <strong>{item.title}</strong>
                              <div className="order-item-qty">
                                ${item.price.toFixed(2)} x {item.quantity}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="order-delivery-column">
                        <h4>Delivery Info</h4>
                        <p><strong>{order.customer.fullName}</strong></p>
                        <p>{order.customer.address}, {order.customer.city} {order.customer.zipCode}</p>
                        <p>📞 {order.customer.phone}</p>
                        <div className="order-total-price">
                          Total Amount: ${order.total.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        ) : activeTab === 'auth' ? (
          /* Auth View */
          <section className="auth-view">
            <div className="auth-card">
              <h2 className="auth-title">
                {authMode === 'login' ? 'Sign In to Your Account' : 'Create New Account'}
              </h2>

              {authError && <div className="auth-error-banner">{authError}</div>}

              <form onSubmit={handleAuthSubmit} className="auth-form">
                {authMode === 'register' && (
                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      placeholder="e.g. John Doe"
                      value={authFormData.name}
                      onChange={(e) => setAuthFormData({ ...authFormData, name: e.target.value })}
                      required
                    />
                  </div>
                )}

                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={authFormData.email}
                    onChange={(e) => setAuthFormData({ ...authFormData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={authFormData.password}
                    onChange={(e) => setAuthFormData({ ...authFormData, password: e.target.value })}
                    required
                  />
                </div>

                <button type="submit" className="auth-submit-btn">
                  {authMode === 'login' ? 'Sign In' : 'Register Account'}
                </button>
              </form>

              <div className="auth-switch">
                {authMode === 'login' ? (
                  <p>
                    Don't have an account?{' '}
                    <span onClick={() => { setAuthMode('register'); setAuthError(''); }}>
                      Create one here
                    </span>
                  </p>
                ) : (
                  <p>
                    Already have an account?{' '}
                    <span onClick={() => { setAuthMode('login'); setAuthError(''); }}>
                      Sign in here
                    </span>
                  </p>
                )}
              </div>
            </div>
          </section>
        ) : activeTab === 'profile' ? (
          /* Profile View */
          <section className="profile-view">
            <h1 className="page-title">User Profile</h1>
            <div className="profile-card">
              <div className="profile-avatar">👤</div>
              <div className="profile-details">
                <h2>{currentUser?.name}</h2>
                <p className="profile-email">Email: {currentUser?.email}</p>
                <div className="profile-badge">Active Member</div>
                <button className="auth-btn logout-btn" onClick={handleLogout} style={{ marginTop: '1.5rem' }}>
                  Log Out
                </button>
              </div>
            </div>
          </section>
        ) : activeTab === 'admin' ? (
          /* Full Separate Admin Dashboard View */
          <section className="admin-dashboard-view">
            <div className="admin-header-bar">
              <h1>⚙️ Separate Admin Dashboard</h1>
              <div className="admin-sub-tabs">
                <button
                  className={`sub-tab-btn ${adminSubTab === 'stats' ? 'active' : ''}`}
                  onClick={() => setAdminSubTab('stats')}
                >
                  📊 Statistics
                </button>
                <button
                  className={`sub-tab-btn ${adminSubTab === 'books' ? 'active' : ''}`}
                  onClick={() => setAdminSubTab('books')}
                >
                  📚 Books Management
                </button>
                <button
                  className={`sub-tab-btn ${adminSubTab === 'categories' ? 'active' : ''}`}
                  onClick={() => setAdminSubTab('categories')}
                >
                  🏷️ Categories
                </button>
                <button
                  className={`sub-tab-btn ${adminSubTab === 'authors' ? 'active' : ''}`}
                  onClick={() => setAdminSubTab('authors')}
                >
                  ✍️ Authors
                </button>
                <button
                  className={`sub-tab-btn ${adminSubTab === 'orders' ? 'active' : ''}`}
                  onClick={() => setAdminSubTab('orders')}
                >
                  📦 Orders ({orders.length})
                </button>
                <button
                  className={`sub-tab-btn ${adminSubTab === 'customers' ? 'active' : ''}`}
                  onClick={() => setAdminSubTab('customers')}
                >
                  👥 Customers ({customers.length})
                </button>
              </div>
            </div>

            {/* Sub-Tab 1: Sales Statistics */}
            {adminSubTab === 'stats' && (
              <div className="admin-stats-container">
                <div className="stats-cards-grid">
                  <div className="stat-card">
                    <h3>Total Sales Revenue</h3>
                    <p className="stat-number">${totalRevenue.toFixed(2)}</p>
                    <span className="stat-trend">💰 Gross Earnings</span>
                  </div>
                  <div className="stat-card">
                    <h3>Total Orders Placed</h3>
                    <p className="stat-number">{orders.length}</p>
                    <span className="stat-trend">📦 Completed & Processing</span>
                  </div>
                  <div className="stat-card">
                    <h3>Total Books Sold</h3>
                    <p className="stat-number">{totalBooksSold}</p>
                    <span className="stat-trend">📖 Units Shipped</span>
                  </div>
                  <div className="stat-card">
                    <h3>Registered Customers</h3>
                    <p className="stat-number">{customers.length}</p>
                    <span className="stat-trend">👥 Active Buyers</span>
                  </div>
                </div>
              </div>
            )}

            {/* Sub-Tab 2: Add / Edit / Delete Books */}
            {adminSubTab === 'books' && (
              <div className="admin-layout">
                <div className="admin-form-card">
                  <h2>{isEditingBook ? 'Edit Book Information' : 'Add New Book'}</h2>
                  <form onSubmit={handleAdminBookSubmit} className="admin-form">
                    <div className="form-group">
                      <label>Book Title *</label>
                      <input
                        type="text"
                        placeholder="e.g. Master React"
                        value={adminBookForm.title}
                        onChange={(e) => setAdminBookForm({ ...adminBookForm, title: e.target.value })}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Author Name *</label>
                      <select
                        value={adminBookForm.author}
                        onChange={(e) => setAdminBookForm({ ...adminBookForm, author: e.target.value })}
                        className="admin-select"
                      >
                        {authors.map(a => (
                          <option key={a} value={a}>{a}</option>
                        ))}
                      </select>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Price ($) *</label>
                        <input
                          type="number"
                          step="0.01"
                          placeholder="19.99"
                          value={adminBookForm.price}
                          onChange={(e) => setAdminBookForm({ ...adminBookForm, price: e.target.value })}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label>Stock Quantity *</label>
                        <input
                          type="number"
                          placeholder="10"
                          value={adminBookForm.availableQuantity}
                          onChange={(e) => setAdminBookForm({ ...adminBookForm, availableQuantity: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Category</label>
                      <select
                        value={adminBookForm.category}
                        onChange={(e) => setAdminBookForm({ ...adminBookForm, category: e.target.value })}
                        className="admin-select"
                      >
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Cover Image URL</label>
                      <input
                        type="url"
                        placeholder="https://images.unsplash.com/..."
                        value={adminBookForm.coverImage}
                        onChange={(e) => setAdminBookForm({ ...adminBookForm, coverImage: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label>Book Description</label>
                      <textarea
                        rows="3"
                        placeholder="Brief overview of the book..."
                        value={adminBookForm.description}
                        onChange={(e) => setAdminBookForm({ ...adminBookForm, description: e.target.value })}
                        className="admin-textarea"
                      ></textarea>
                    </div>

                    <div className="form-checkbox-group">
                      <label>
                        <input
                          type="checkbox"
                          checked={adminBookForm.featured}
                          onChange={(e) => setAdminBookForm({ ...adminBookForm, featured: e.target.checked })}
                        />
                        Featured Book
                      </label>

                      <label>
                        <input
                          type="checkbox"
                          checked={adminBookForm.isNew}
                          onChange={(e) => setAdminBookForm({ ...adminBookForm, isNew: e.target.checked })}
                        />
                        New Arrival
                      </label>
                    </div>

                    <div className="admin-form-actions">
                      <button type="submit" className="admin-submit-btn">
                        {isEditingBook ? 'Save Changes' : 'Add Book'}
                      </button>
                      {isEditingBook && (
                        <button type="button" className="admin-cancel-btn" onClick={resetAdminForm}>
                          Cancel Edit
                        </button>
                      )}
                    </div>
                  </form>
                </div>

                <div className="admin-inventory-card">
                  <h2>Inventory List ({books.length} Books)</h2>
                  <div className="table-wrapper">
                    <table className="inventory-table">
                      <thead>
                        <tr>
                          <th>Book</th>
                          <th>Category</th>
                          <th>Price</th>
                          <th>Qty</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {books.map(book => (
                          <tr key={book.id}>
                            <td className="table-book-cell">
                              <img src={book.coverImage} alt={book.title} className="table-thumb" />
                              <div>
                                <strong>{book.title}</strong>
                                <div className="table-author">{book.author}</div>
                              </div>
                            </td>
                            <td>{book.category}</td>
                            <td>${book.price.toFixed(2)}</td>
                            <td>
                              <span className={book.availableQuantity > 5 ? 'in-stock' : 'low-stock'}>
                                {book.availableQuantity}
                              </span>
                            </td>
                            <td className="table-actions-cell">
                              <button className="action-btn edit-btn" onClick={() => handleEditBookClick(book)}>
                                ✏️ Edit
                              </button>
                              <button className="action-btn delete-btn" onClick={() => handleDeleteBookClick(book.id)}>
                                🗑️ Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Sub-Tab 3: Manage Categories */}
            {adminSubTab === 'categories' && (
              <div className="admin-two-column">
                <div className="admin-card">
                  <h2>Add New Category</h2>
                  <form onSubmit={handleAddCategory} className="admin-form-inline">
                    <input
                      type="text"
                      placeholder="e.g. Science & Nature"
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      required
                    />
                    <button type="submit" className="admin-submit-btn">Add Category</button>
                  </form>
                </div>

                <div className="admin-card">
                  <h2>Existing Categories ({categories.length})</h2>
                  <div className="admin-chip-list">
                    {categories.map(cat => (
                      <div key={cat} className="admin-chip">
                        <span>{cat}</span>
                        <button onClick={() => handleDeleteCategory(cat)} title="Remove Category">×</button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Sub-Tab 4: Manage Authors */}
            {adminSubTab === 'authors' && (
              <div className="admin-two-column">
                <div className="admin-card">
                  <h2>Add New Author</h2>
                  <form onSubmit={handleAddAuthor} className="admin-form-inline">
                    <input
                      type="text"
                      placeholder="e.g. George Orwell"
                      value={newAuthorName}
                      onChange={(e) => setNewAuthorName(e.target.value)}
                      required
                    />
                    <button type="submit" className="admin-submit-btn">Add Author</button>
                  </form>
                </div>

                <div className="admin-card">
                  <h2>Registered Authors ({authors.length})</h2>
                  <div className="admin-chip-list">
                    {authors.map(author => (
                      <div key={author} className="admin-chip">
                        <span>{author}</span>
                        <button onClick={() => handleDeleteAuthor(author)} title="Remove Author">×</button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Sub-Tab 5: View Orders & Change Order Status */}
            {adminSubTab === 'orders' && (
              <div className="admin-card">
                <h2>Customer Orders Management ({orders.length})</h2>
                <div className="table-wrapper">
                  <table className="inventory-table">
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Date</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Change Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map(order => (
                        <tr key={order.id}>
                          <td><strong>{order.id}</strong></td>
                          <td>
                            <div>{order.customer.fullName}</div>
                            <div className="table-author">{order.customer.email}</div>
                          </td>
                          <td>{order.date}</td>
                          <td>${order.total.toFixed(2)}</td>
                          <td>
                            <span className={`status-badge ${order.status.toLowerCase()}`}>
                              {order.status}
                            </span>
                          </td>
                          <td>
                            <select
                              value={order.status}
                              onChange={(e) => handleOrderStatusChange(order.id, e.target.value)}
                              className="admin-select-sm"
                            >
                              <option value="Processing">Processing</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Sub-Tab 6: View Customers */}
            {adminSubTab === 'customers' && (
              <div className="admin-card">
                <h2>Registered Customers ({customers.length})</h2>
                <div className="table-wrapper">
                  <table className="inventory-table">
                    <thead>
                      <tr>
                        <th>Customer Name</th>
                        <th>Email Address</th>
                        <th>Orders Count</th>
                        <th>Total Spent</th>
                        <th>Joined Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customers.map(c => (
                        <tr key={c.id}>
                          <td><strong>{c.name}</strong></td>
                          <td>{c.email}</td>
                          <td>{c.ordersCount} orders</td>
                          <td>${c.totalSpent.toFixed(2)}</td>
                          <td>{c.joinedDate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </section>
        ) : null}
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
