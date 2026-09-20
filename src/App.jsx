import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Products from "./components/Products";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ProductPage from "./components/ProductPage";
import Checkout from "./components/Checkout";
import Profile from "./components/Profile";
import WelcomePopup from "./components/WelcomePopup";
import CartDrawer from "./components/CartDrawer";

const EMPTY_PROFILE = {
  name: "",
  phone: "",
  email: "",
  address: "",
  city: "",
  pincode: "",
};

function App() {
  const navigate = useNavigate();

  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart")) || [];
    } catch {
      return [];
    }
  });
  const [profile, setProfile] = useState(() => {
    try {
      return {
        ...EMPTY_PROFILE,
        ...(JSON.parse(localStorage.getItem("profile")) || {}),
      };
    } catch {
      return EMPTY_PROFILE;
    }
  });
  const [cartOpen, setCartOpen] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("profile", JSON.stringify(profile));
  }, [profile]);

  function addToCart(product) {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);

      if (exists) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }

      return [
        ...prev,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          thumbnail: product.thumbnail,
          qty: 1,
        },
      ];
    });
  }

  function changeQty(id, delta) {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, qty: item.qty + delta } : item
        )
        .filter((item) => item.qty > 0)
    );
  }

  function removeItem(id) {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }

  function clearCart() {
    setCart([]);
  }

  // merge new details into the saved profile
  function saveProfile(data) {
    setProfile((prev) => ({ ...prev, ...data }));
  }

  // Buy now: add the product, then go straight to checkout
  function buyNow(product) {
    addToCart(product);
    navigate("/checkout");
  }

  // Checkout button in the cart drawer
  function goCheckout() {
    setCartOpen(false);
    navigate("/checkout");
  }

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <>
      <WelcomePopup />
      <Navbar
        cartCount={cartCount}
        onCartClick={() => setCartOpen(true)}
        search={search}
        onSearch={setSearch}
        profileName={profile.name}
      />

      <Routes>
        {/* home page */}
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Products onAdd={addToCart} search={search} onSearch={setSearch} />
              <About />
              <Contact />
            </>
          }
        />

        {/* product detail page */}
        <Route
          path="/product/:id"
          element={<ProductPage onAdd={addToCart} onBuyNow={buyNow} />}
        />

        {/* checkout page */}
        <Route
          path="/checkout"
          element={
            <Checkout
              cart={cart}
              onClearCart={clearCart}
              profile={profile}
              onSaveProfile={saveProfile}
            />
          }
        />

        {/* profile page */}
        <Route
          path="/profile"
          element={<Profile profile={profile} onSave={saveProfile} />}
        />

        {/* any unknown address goes back to the home page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Footer />

      <CartDrawer
        open={cartOpen}
        cart={cart}
        onClose={() => setCartOpen(false)}
        onChangeQty={changeQty}
        onRemove={removeItem}
        onCheckout={goCheckout}
      />
    </>
  );
}

export default App;