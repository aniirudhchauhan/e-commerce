import { useEffect, useState } from "react";
import { scrollToId } from "../utils/scroll";

const SLIDES = [
  { img: "/images/slide1.jpg", title: "New Arrivals", text: "Fresh styles just landed" },
  { img: "/images/slide2.jpg", title: "Luxury Dresses", text: "Elegance for every occasion" },
  { img: "/images/slide3.jpg", title: "Street Style", text: "Look bold, feel confident" },
  { img: "/images/slide4.jpg", title: "Accessories", text: "Complete your look" },
  { img: "/images/slide5.jpg", title: "Free Delivery", text: "On all orders above $50" },
];

function WelcomePopup() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);

  // open the popup shortly after the page loads
  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), 800);
    return () => clearTimeout(timer);
  }, []);

  // change to the next image every 3 seconds while open
  useEffect(() => {
    if (!open) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [open]);

  // close with the Escape key
  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  function handleStart(e) {
    e.preventDefault();
    setOpen(false);
    setTimeout(() => scrollToId("products"), 100);
  }

  if (!open) return null;

  return (
    <div className="popup-overlay" onClick={() => setOpen(false)}>
      <div className="popup" onClick={(e) => e.stopPropagation()}>
        <button className="popup-close" onClick={() => setOpen(false)}>
          ✕
        </button>

        <div className="popup-slides">
          {SLIDES.map((slide, i) => (
            <div
              key={slide.img}
              className={`popup-slide ${i === current ? "active" : ""}`}
            >
              <img src={slide.img} alt={slide.title} />
              <div className="popup-caption">
                <h3>{slide.title}</h3>
                <p>{slide.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="popup-dots">
          {SLIDES.map((_, i) => (
            <span
              key={i}
              className={`dot ${i === current ? "active" : ""}`}
              onClick={() => setCurrent(i)}
            />
          ))}
        </div>

        <a href="#products" className="btn popup-btn" onClick={handleStart}>
          Start Shopping →
        </a>
      </div>
    </div>
  );
}

export default WelcomePopup;