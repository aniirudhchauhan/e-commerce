import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const FREE_SHIPPING_ABOVE = 50;
const SHIPPING_FEE = 5;

const PAYMENTS = [
  { id: "cod", label: "Cash on Delivery", icon: "💵" },
  { id: "upi", label: "UPI", icon: "📱" },
  { id: "card", label: "Card", icon: "💳" },
];

const EMPTY = {
  name: "",
  phone: "",
  email: "",
  address: "",
  city: "",
  pincode: "",
};

function Checkout({ cart, onClearCart, profile = {}, onSaveProfile }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ ...EMPTY, ...profile });
  const [payment, setPayment] = useState("cod");
  const [errors, setErrors] = useState({});
  const [order, setOrder] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping =
    subtotal === 0 || subtotal >= FREE_SHIPPING_ABOVE ? 0 : SHIPPING_FEE;
  const total = subtotal + shipping;

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function validate() {
    const found = {};

    if (!form.name.trim()) {
      found.name = "Please enter your full name";
    }

    if (!/^\d{10}$/.test(form.phone.replace(/\s/g, ""))) {
      found.phone = "Enter a valid 10-digit phone number";
    }

    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      found.email = "Enter a valid email address";
    }

    if (form.address.trim().length < 10) {
      found.address = "Please enter your full address";
    }

    if (!form.city.trim()) {
      found.city = "Please enter your city";
    }

    if (!/^\d{6}$/.test(form.pincode)) {
      found.pincode = "Enter a valid 6-digit pincode";
    }

    return found;
  }

  function handlePlaceOrder(e) {
    e.preventDefault();

    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    const newOrder = {
      id: "LX" + Date.now().toString().slice(-8),
      date: new Date().toLocaleString(),
      items: cart,
      subtotal,
      shipping,
      total,
      payment,
      customer: form,
    };

    // keep a simple order history in the browser
    try {
      const old = JSON.parse(localStorage.getItem("orders")) || [];
      localStorage.setItem("orders", JSON.stringify([newOrder, ...old]));
    } catch {
      // ignore storage problems
    }

    // remember these details for next time
    if (onSaveProfile) onSaveProfile(form);

    setOrder(newOrder);
    onClearCart();
    window.scrollTo(0, 0);
  }

  /* ---------- ORDER PLACED ---------- */
  if (order) {
    const paidWith = PAYMENTS.find((p) => p.id === order.payment);

    return (
      <div className="checkout-page">
        <div className="order-success">
          <div className="success-icon">✓</div>
          <h1>Order Placed!</h1>
          <p className="muted">
            Thank you, {order.customer.name}. Your order is confirmed.
          </p>

          <div className="order-id">
            Order ID <strong>{order.id}</strong>
          </div>

          <ul className="success-items">
            {order.items.map((item) => (
              <li key={item.id}>
                <img src={item.thumbnail} alt={item.title} />
                <span>
                  {item.title} × {item.qty}
                </span>
                <strong>${(item.price * item.qty).toFixed(2)}</strong>
              </li>
            ))}
          </ul>

          <div className="success-row">
            <span>Total paid</span>
            <strong>${order.total.toFixed(2)}</strong>
          </div>
          <div className="success-row">
            <span>Payment</span>
            <strong>
              {paidWith.icon} {paidWith.label}
            </strong>
          </div>
          <div className="success-row">
            <span>Delivering to</span>
            <strong className="right">
              {order.customer.address}, {order.customer.city} -{" "}
              {order.customer.pincode}
            </strong>
          </div>

          <button className="btn continue-btn" onClick={() => navigate("/")}>
            Continue Shopping
          </button>
          <button className="link-btn" onClick={() => navigate("/profile")}>
            View my orders
          </button>
        </div>
      </div>
    );
  }

  /* ---------- EMPTY CART ---------- */
  if (cart.length === 0) {
    return (
      <div className="checkout-page">
        <div className="order-success">
          <div className="success-icon empty">🛍️</div>
          <h1>Your cart is empty</h1>
          <p className="muted">Add some products before checking out.</p>
          <button className="btn continue-btn" onClick={() => navigate("/")}>
            Go to Shop
          </button>
        </div>
      </div>
    );
  }

  /* ---------- CHECKOUT FORM ---------- */
  return (
    <div className="checkout-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <h1 className="checkout-title">
        <span>Check</span>out
      </h1>

      <form className="checkout-grid" onSubmit={handlePlaceOrder} noValidate>
        {/* ---------- LEFT: DETAILS ---------- */}
        <div className="checkout-left">
          <div className="checkout-card">
            <h3>1. Delivery details</h3>

            <div className="form-group">
              <label htmlFor="name">Full name</label>
              <input id="name" name="name" type="text" placeholder="Your full name" value={form.name} onChange={handleChange} />
              {errors.name && <p className="form-error">{errors.name}</p>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input id="phone" name="phone" type="tel" placeholder="10-digit number" value={form.phone} onChange={handleChange} />
                {errors.phone && <p className="form-error">{errors.phone}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} />
                {errors.email && <p className="form-error">{errors.email}</p>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="address">Address</label>
              <textarea id="address" name="address" rows="3" placeholder="House no, street, area" value={form.address} onChange={handleChange} />
              {errors.address && <p className="form-error">{errors.address}</p>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input id="city" name="city" type="text" placeholder="City" value={form.city} onChange={handleChange} />
                {errors.city && <p className="form-error">{errors.city}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="pincode">Pincode</label>
                <input id="pincode" name="pincode" type="text" placeholder="6-digit pincode" value={form.pincode} onChange={handleChange} />
                {errors.pincode && <p className="form-error">{errors.pincode}</p>}
              </div>
            </div>
          </div>

          <div className="checkout-card">
            <h3>2. Payment method</h3>

            <div className="payment-options">
              {PAYMENTS.map((p) => (
                <label key={p.id} className={`payment-option ${payment === p.id ? "selected" : ""}`}>
                  <input type="radio" name="payment" value={p.id} checked={payment === p.id} onChange={() => setPayment(p.id)} />
                  <span className="payment-icon">{p.icon}</span>
                  <span>{p.label}</span>
                </label>
              ))}
            </div>

            <p className="demo-note">
              Demo store: no real payment is taken and no card details are
              needed.
            </p>
          </div>
        </div>

        {/* ---------- RIGHT: SUMMARY ---------- */}
        <aside className="checkout-summary">
          <h3>Order summary</h3>

          <ul className="summary-items">
            {cart.map((item) => (
              <li key={item.id}>
                <img src={item.thumbnail} alt={item.title} />
                <div className="summary-info">
                  <p>{item.title}</p>
                  <span className="muted">Qty {item.qty}</span>
                </div>
                <strong>${(item.price * item.qty).toFixed(2)}</strong>
              </li>
            ))}
          </ul>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
          </div>
          {shipping > 0 && (
            <p className="ship-hint">
              Add ${(FREE_SHIPPING_ABOVE - subtotal).toFixed(2)} more for free
              delivery
            </p>
          )}
          <div className="summary-row total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <button type="submit" className="btn place-btn">
            Place Order
          </button>
        </aside>
      </form>
    </div>
  );
}

export default Checkout;