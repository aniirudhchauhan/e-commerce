import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// shows 5 stars; filled ones are gold, the rest are grey
function Stars({ value = 0 }) {
  const full = Math.round(value);
  return (
    <span className="stars" aria-label={`${value} out of 5`}>
      {"★".repeat(full)}
      <span className="stars-empty">{"★".repeat(5 - full)}</span>
    </span>
  );
}

function ProductPage({ onAdd, onBuyNow }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mainImg, setMainImg] = useState("");
  const [added, setAdded] = useState(false);

  // load this product whenever the id in the URL changes
  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    setError("");

    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setMainImg(data.images?.[0] || data.thumbnail);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  function handleAdd() {
    onAdd(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  if (loading) {
    return <p className="status page-status">Loading product...</p>;
  }

  if (error || !product) {
    return (
      <div className="product-page">
        <p className="status error">{error || "Something went wrong"}</p>
        <button className="back-btn" onClick={() => navigate("/")}>
          ← Back to shop
        </button>
      </div>
    );
  }

  const gallery = product.images?.length ? product.images : [product.thumbnail];
  const reviews = product.reviews || [];

  // price before the discount
  const oldPrice = product.discountPercentage
    ? (product.price / (1 - product.discountPercentage / 100)).toFixed(2)
    : null;

  const inStock = product.stock > 0;

  // extra details; empty ones are skipped
  const details = [
    ["Brand", product.brand],
    ["SKU", product.sku],
    ["Warranty", product.warrantyInformation],
    ["Shipping", product.shippingInformation],
    ["Return policy", product.returnPolicy],
    ["Availability", product.availabilityStatus],
  ].filter(([, value]) => value);

  return (
    <div className="product-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="detail">
        {/* ---------- LEFT: IMAGES ---------- */}
        <div className="gallery">
          <div className="gallery-main">
            <img src={mainImg} alt={product.title} />
          </div>

          {gallery.length > 1 && (
            <div className="thumbs">
              {gallery.map((img) => (
                <button key={img} className={img === mainImg ? "active" : ""} onClick={() => setMainImg(img)}>
                  <img src={img} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ---------- RIGHT: INFO ---------- */}
        <div className="detail-info">
          <p className="detail-category">{product.category}</p>
          <h1 className="detail-title">{product.title}</h1>

          <div className="rating-row">
            <Stars value={product.rating} />
            <strong>{product.rating}</strong>
            <span className="muted">
              ({reviews.length} {reviews.length === 1 ? "review" : "reviews"})
            </span>
          </div>

          <div className="price-row">
            <span className="detail-price">${product.price}</span>
            {oldPrice && <span className="old-price">${oldPrice}</span>}
            {product.discountPercentage > 0 && (
              <span className="discount-badge">
                -{Math.round(product.discountPercentage)}%
              </span>
            )}
          </div>

          <p className={`stock ${inStock ? "in" : "out"}`}>
            {inStock ? `✓ In stock (${product.stock} left)` : "✕ Out of stock"}
          </p>

          <h3 className="detail-heading">Description</h3>
          <p className="detail-desc">{product.description}</p>

          {product.tags?.length > 0 && (
            <div className="tags">
              {product.tags.map((tag) => (
                <span key={tag}>#{tag}</span>
              ))}
            </div>
          )}

          <div className="detail-actions">
            <button className="btn detail-add" onClick={handleAdd} disabled={!inStock}>
              {added ? "✓ Added to cart" : "Add to cart"}
            </button>

            <button className="buy-btn" onClick={() => onBuyNow(product)} disabled={!inStock}>
              Buy now
            </button>
          </div>

          {details.length > 0 && (
            <ul className="details-list">
              {details.map(([label, value]) => (
                <li key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* ---------- REVIEWS ---------- */}
      <section className="reviews">
        <h2 className="section-title">
          Customer <span>Reviews</span>
        </h2>

        {reviews.length === 0 && (
          <p className="status">No reviews yet for this product.</p>
        )}

        <div className="review-grid">
          {reviews.map((r, i) => (
            <div className="review-card" key={i}>
              <div className="review-head">
                <div className="avatar">
                  {(r.reviewerName || "?").charAt(0).toUpperCase()}
                </div>
                <div>
                  <strong>{r.reviewerName}</strong>
                  <p className="muted">
                    {r.date ? new Date(r.date).toLocaleDateString() : ""}
                  </p>
                </div>
              </div>
              <Stars value={r.rating} />
              <p className="review-text">{r.comment}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default ProductPage;