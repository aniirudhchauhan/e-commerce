import { scrollToId } from "../utils/scroll";

function Hero() {
  function handleShop(e) {
    e.preventDefault();
    scrollToId("products");
  }

  return (
    <section className="hero" id="home">
      <div className="hero-text">
        <p className="tagline">New Collection 2026</p>
        <h1>
          Style That <span>Speaks</span> For You
        </h1>
        <p className="hero-desc">
          Discover trending fashion and accessories at prices you'll love.
        </p>
        <a href="#products" className="btn" onClick={handleShop}>
          Shop Now →
        </a>
      </div>

      <div className="hero-image">
        <img src="/images/slide1.jpg" alt="Featured product" />
      </div>
    </section>
  );
}

export default Hero;