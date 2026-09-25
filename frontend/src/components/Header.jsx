function Header({ activeTab, currentUser, totalItemsCount, onNavigate, onLogout }) {
  const navigate = (tab) => onNavigate(tab, true);

  return (
    <header className="navbar">
      <div className="nav-brand" onClick={() => navigate('home')}>
        📚 <span>BookSell Online</span>
      </div>
      <nav className="nav-links">
        <button className={`nav-btn ${activeTab === 'home' ? 'active' : ''}`} onClick={() => navigate('home')}>Home</button>
        <button className={`nav-btn ${activeTab === 'books' ? 'active' : ''}`} onClick={() => navigate('books')}>Books</button>
        <button className={`nav-btn cart-nav-btn ${activeTab === 'cart' ? 'active' : ''}`} onClick={() => navigate('cart')}>
          🛒 Cart ({totalItemsCount})
        </button>
        {currentUser ? (
          <div className="user-nav-group">
            <button className={`nav-btn ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => navigate('profile')}>
              👤 {currentUser.name}
            </button>
            <button className="auth-btn logout-btn" onClick={onLogout}>Logout</button>
          </div>
        ) : (
          <button className={`auth-btn login-btn ${activeTab === 'auth' ? 'active' : ''}`} onClick={() => navigate('auth')}>Sign In</button>
        )}
      </nav>
    </header>
  );
}

export default Header;