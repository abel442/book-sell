import BookCard from '../components/BookCard';

function HomeView({ categories, featuredBooks, newBooks, popularBooks, searchQuery, onSearchChange, onSearch, onCategorySelect, onSelectBook, onAddToCart }) {
  const bookSection = (title, books) => (
    <section className="section">
      <h2 className="section-title">{title}</h2>
      <div className="books-grid">
        {books.map((book) => <BookCard key={book.id} book={book} onSelect={onSelectBook} onAddToCart={onAddToCart} />)}
      </div>
    </section>
  );

  return (
    <section className="home-view">
      <div className="hero-banner">
        <h1>Find Your Next Favorite Book</h1>
        <p>Explore thousands of books across all genres and authors.</p>
        <form className="search-bar" onSubmit={onSearch}>
          <input type="text" placeholder="Search by book title or author..." value={searchQuery} onChange={onSearchChange} />
          <button type="submit">Search Books</button>
        </form>
      </div>
      <section className="section">
        <h2 className="section-title">Categories</h2>
        <div className="categories-grid">
          {categories.filter((category) => category !== 'All').map((category) => (
            <button key={category} className="category-pill" onClick={() => onCategorySelect(category)}>{category}</button>
          ))}
        </div>
      </section>
      {bookSection('Featured Books', featuredBooks)}
      {bookSection('New Arrival Books', newBooks)}
      {bookSection('Popular Books', popularBooks)}
    </section>
  );
}

export default HomeView;