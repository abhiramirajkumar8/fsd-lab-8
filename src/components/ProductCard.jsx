
function ProductCard({ product, onView, onEdit, onDelete }) {
  const listingType = product.type || "Sell";

  const typeLabel = {
    Sell: "FOR SALE",
    Rent: "FOR RENT",
    Donate: "FREE DONATION",
  };

  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <img
          src={product.image || "https://placehold.co/600x800?text=ClosetCycle"}
          alt={product.name}
          className="product-image"
        />

        <span className="condition-tag">{product.condition}</span>
        <span className={`listing-badge ${listingType.toLowerCase()}`}>
          {typeLabel[listingType]}
        </span>
      </div>

      <div className="product-info">
        <p className="product-category">{product.category}</p>
        <h3>{product.name}</h3>
        <p className="product-size">Size: {product.size || "Not specified"}</p>

        <div className="product-bottom">
          <p className="product-price">
            {listingType === "Donate"
              ? "FREE"
              : `₹${Number(product.price).toLocaleString("en-IN")}${
                  listingType === "Rent" ? " / day" : ""
                }`}
          </p>

          <button
            className="view-link"
            onClick={() => onView(product)}
          >
            View item →
          </button>
        </div>

        <div className="product-actions">
          <button onClick={() => onEdit(product)}>Edit</button>
          <button onClick={() => onDelete(product.id)}>Delete</button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
