import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { scrollToId } from "../utils/scroll";

function Navbar({ cartCount, onCartClick, search, onSearch, profileName }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // go to a section of the home page, from any page
  function goTo(e, id) {
    e.preventDefault();
    setMenuOpen(false);

    if (location.pathname === "/") {
      scrollToId(id);
    } else {
      navigate("/");
      setTimeout(() => scrollToId(id), 150);
    }
  }

  function handleChange(e) {
    const value = e.target.value;
    onSearch(value);
    if (!value) return;

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => scrollToId("products"), 150);
    } else if (!search) {
      scrollToId("products");
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => scrollToId("products"), 150);
    } else {
      scrollToId("products");
    }
  }

  return (
    <header className="navbar">
      <a href="#home" className="logo" onClick={(e) => goTo(e, "home")}>
        NOVA<span>.</span>
      </a>

      <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
        <a href="#home" onClick={(e) => goTo(e, "home")}>Home</a>
        <a href="#categories" onClick={(e) => goTo(e, "categories")}>Shop</a>
        <a href="#about" onClick={(e) => goTo(e, "about")}>About</a>
        <a href="#contact" onClick={(e) => goTo(e, "contact")}>Contact</a>
      </nav>

      <form className="search-box" onSubmit={handleSubmit}>
        <span className="search-icon">🔍</span>
        <input type="text" placeholder="Search products..." value={search} onChange={handleChange} />
        {search && (
          <button type="button" className="search-clear" onClick={() => onSearch("")} aria-label="Clear search">
            ✕
          </button>
        )}
      </form>

      <div className="nav-actions">
        <button className="profile-btn" aria-label="Profile" onClick={() => navigate("/profile")}>
          {profileName ? profileName.charAt(0).toUpperCase() : "👤"}
        </button>

        <button className="cart-btn" aria-label="Cart" onClick={onCartClick}>
          🛒 <span className="cart-count">{cartCount}</span>
        </button>

        <button className="menu-btn" aria-label="Menu" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>
    </header>
  );
}

export default Navbar;