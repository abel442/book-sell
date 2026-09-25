function BookDetailsView({ book, backLabel, onBack, onAddToCart, onBuyNow }) {
  return (
    <section className="book-details-view">
      <button className="back-btn" onClick={onBack}>← Back to {backLabel}</button>
      <div className="details-card">
        <div className="details-image-container"><img src={book.coverImage} alt={book.title} className="details-cover" /></div>
        <div className="details-info">
          <span className="badge category-badge">{book.category}</span>
          <h1 className="details-title">{book.title}</h1>
          <p className="details-author">By <strong>{book.author}</strong></p>
          <p className="details-price">${book.price.toFixed(2)}</p>
          <div className="quantity-status"><strong>Available Quantity:</strong><span className={book.availableQuantity > 5 ? 'in-stock' : 'low-stock'}>{book.availableQuantity} in stock</span></div>
          <p className="details-description">{book.description}</p>
          <div className="details-actions">
            <button className="buy-now-btn" onClick={() => onAddToCart(book)}>Add to Cart</button>
            <button className="view-cart-btn" onClick={() => onBuyNow(book)}>Buy Now & View Cart</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BookDetailsView;