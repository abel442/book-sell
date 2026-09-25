function BookCard({ book, onSelect, onAddToCart }) {
  return (
    <div className="book-card">
      <div className="cover-wrapper" onClick={() => onSelect(book)}>
        <img src={book.coverImage} alt={book.title} className="book-cover" />
      </div>
      <div className="card-body">
        <span className="card-category">{book.category}</span>
        <h3 className="card-title" onClick={() => onSelect(book)}>{book.title}</h3>
        <p className="card-author">By {book.author}</p>
        <div className="card-footer">
          <span className="card-price">${book.price.toFixed(2)}</span>
          <button className="add-cart-btn" onClick={(event) => {
            event.stopPropagation();
            onAddToCart(book);
          }}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookCard;