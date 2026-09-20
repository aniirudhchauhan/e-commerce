import { useLocation, useNavigate } from "react-router-dom";
import { scrollToId } from "../utils/scroll";

function Footer() {
  const location = useLocation();
  const navigate = useNavigate();

  // go to a section of the home page, from any page
  function go(e, id) {
    e.preventDefault();

    if (location.pathname === "/") {
      scrollToId(id);
    } else {
      navigate("/");
      setTimeout(() => scrollToId(id), 150);
    }
  }

  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <h3>
            NOVA<span>.</span>
          </h3>
          <p>
            Trending fashion and accessories at prices you'll love. Style that
            speaks for you.
          </p>
        </div>

        <div>
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#home" onClick={(e) => go(e, "home")}>Home</a></li>
            <li><a href="#categories" onClick={(e) => go(e, "categories")}>Shop</a></li>
            <li><a href="#about" onClick={(e) => go(e, "about")}>About</a></li>
            <li><a href="#contact" onClick={(e) => go(e, "contact")}>Contact</a></li>
          </ul>
        </div>

        <div>
          <h4>Categories</h4>
          <ul>
            <li>Streetwear</li>
            <li>Luxury Dress</li>
            <li>Sneakers</li>
            <li>Handbags</li>
            <li>Glasses</li>
          </ul>
        </div>

        <div>
          <h4>Contact</h4>
          <ul>
            <li>hello@nova.com</li>
            <li>+91 98765 43210</li>
            <li>Mon - Sat, 10 AM - 7 PM</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 NOVA. All rights reserved.</p>
        <p>Built with React by Anirudh</p>
      </div>
    </footer>
  );
}

export default Footer;