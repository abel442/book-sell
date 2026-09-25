import BookCard from '../components/BookCard';

function BooksView({ categories, selectedCategory, onCategoryChange, searchQuery, onSearchChange, books, onSelectBook, onAddToCart }) {
  return (
    <section className="books-view">
      <h1 className="page-title">Explore All Books</h1>
      <div className="filters-bar">
        <input type="text" className="search-input" placeholder="Search titles or authors..." value={searchQuery} onChange={onSearchChange} />
        <div className="category-filters">
          {categories.map((category) => <button key={category} className={`filter-btn ${selectedCategory === category ? 'active' : ''}`} onClick={() => onCategoryChange(category)}>{category}</button>)}
        </div>
      </div>
      <div className="books-grid">
        {books.length > 0 ? books.map((book) => <BookCard key={book.id} book={book} onSelect={onSelectBook} onAddToCart={onAddToCart} />) : <div className="no-results">No books found matching your criteria.</div>}
      </div>
    </section>
  );
}

export default BooksView;