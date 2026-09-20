import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CATEGORIES = [
  { name: "Streetwear", img: "/images/slide1.jpg", api: ["mens-shirts"] },
  { name: "Luxury Dress", img: "/images/slide2.jpg", api: ["womens-dresses"] },
  { name: "Sneakers", img: "/images/slide3.jpg", api: ["mens-shoes"] },
  { name: "Handbags", img: "/images/slide4.jpg", api: ["womens-bags"] },
  { name: "Glasses", img: "/images/slide5.jpg", api: ["sunglasses"] },
];

const EXCLUDE = ["watch"];

function Products({ onAdd, search, onSearch }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [active, setActive] = useState("All");

  useEffect(() => {
    async function loadCategory(tileName, apiName) {
      try {
        const res = await fetch(
          `https://dummyjson.com/products/category/${apiName}?limit=12`
        );
        if (!res.ok) return [];
        const data = await res.json();
        return data.products.map((p) => ({ ...p, group: tileName }));
      } catch {
        return [];
      }
    }

    async function fetchProducts() {
      try {
        const requests = CATEGORIES.flatMap((c) =>
          c.api.map((apiName) => loadCategory(c.name, apiName))
        );
        const all = (await Promise.all(requests)).flat();

        const cleaned = all.filter(
          (p) => !EXCLUDE.some((w) => p.title.toLowerCase().includes(w))
        );

        if (cleaned.length === 0) throw new Error("No products found");
        setProducts(cleaned);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  function selectCategory(name) {
    onSearch("");
    setActive(name);
    document.getElementById("products").scrollIntoView({ behavior: "smooth" });
  }

  const term = search.trim().toLowerCase();
  let visibleProducts = products;

  if (term) {
    visibleProducts = products.filter(
      (p) =>
        p.title.toLowerCase().includes(term) ||
        p.group.toLowerCase().includes(term) ||
        (p.brand || "").toLowerCase().includes(term)
    );
  } else if (active !== "All") {
    visibleProducts = products.filter((p) => p.group === active);
  }

  return (
    <>
      {/* ---------- CATEGORIES ---------- */}
      <section className="categories" id="categories">
        <h2 className="section-title">
          Shop by <span>Category</span>
        </h2>

        <div className="category-grid">
          {CATEGORIES.map((c) => (
            <div
              key={c.name}
              className={`category-card ${
                !term && active === c.name ? "active" : ""
              }`}
              onClick={() => selectCategory(c.name)}
            >
              <img src={c.img} alt={c.name} />
              <div className="category-name">
                <h3>{c.name}</h3>
                <span>Shop now →</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- PRODUCTS ---------- */}
      <section className="products" id="products">
        <h2 className="section-title">
          {term ? (
            <>
              Results for <span>"{search.trim()}"</span>
            </>
          ) : active === "All" ? (
            <>
              Trending <span>Products</span>
            </>
          ) : (
            <>
              <span>{active}</span> Collection
            </>
          )}
        </h2>

        {term && !loading && (
          <div className="filter-bar">
            <p>
              {visibleProducts.length}{" "}
              {visibleProducts.length === 1 ? "product" : "products"} found
            </p>
            <button onClick={() => onSearch("")}>Clear search</button>
          </div>
        )}

        {!term && active !== "All" && (
          <div className="filter-bar">
            <p>
              Showing {visibleProducts.length} products in {active}
            </p>
            <button onClick={() => setActive("All")}>Show all products</button>
          </div>
        )}

        {loading && <p className="status">Loading products...</p>}
        {error && <p className="status error">{error}</p>}

        {term && !loading && visibleProducts.length === 0 && (
          <p className="status">
            No products match "{search.trim()}". Try another word 😕
          </p>
        )}

        <div className="product-grid">
          {visibleProducts.map((p) => (
            <div className="product" key={p.id}>
              <Link to={`/product/${p.id}`} className="product-link">
                <div className="product-img">
                  <img src={p.thumbnail} alt={p.title} />
                </div>
              </Link>

              <div className="card-top">
                <p className="product-category">{p.group}</p>
                <span className="card-rating">★ {p.rating}</span>
              </div>

              <Link to={`/product/${p.id}`} className="product-link">
                <h3>{p.title}</h3>
              </Link>

              <div className="product-bottom">
                <span className="price">${p.price}</span>
                <button className="add-btn" onClick={() => onAdd(p)}>
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Products;