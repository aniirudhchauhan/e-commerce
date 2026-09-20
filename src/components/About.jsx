const FEATURES = [
  { icon: "🚚", title: "Free Delivery", text: "On all orders above $50" },
  { icon: "↩️", title: "Easy Returns", text: "30-day hassle-free returns" },
  { icon: "🔒", title: "Secure Payment", text: "Your details stay protected" },
  { icon: "💬", title: "24/7 Support", text: "We're always here to help" },
];

const STATS = [
  { number: "50K+", label: "Happy Customers" },
  { number: "1200+", label: "Products" },
  { number: "4.8", label: "Average Rating" },
];

function About() {
  return (
    <section className="about" id="about">
      <h2 className="section-title">
        About <span>NOVA</span>
      </h2>

      <div className="about-grid">
        <div className="about-img">
          <img src="/images/slide3.jpg" alt="About NOVA" />
        </div>

        <div className="about-text">
          <p className="tagline">Our Story</p>
          <h3>Fashion that fits your style, not just your size</h3>
          <p>
            NOVA started with a simple idea: everyone deserves clothes and
            accessories that make them feel confident. We bring together
            streetwear, luxury dresses, sneakers, handbags, and glasses in one
            place, with honest prices and fast delivery.
          </p>
          <p>
            Every product is picked for quality and style, so you can spend
            less time searching and more time looking great.
          </p>

          <div className="stats">
            {STATS.map((s) => (
              <div className="stat" key={s.label}>
                <strong>{s.number}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="features">
        {FEATURES.map((f) => (
          <div className="feature" key={f.title}>
            <div className="feature-icon">{f.icon}</div>
            <h4>{f.title}</h4>
            <p>{f.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default About;