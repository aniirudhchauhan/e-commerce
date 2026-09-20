import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PAYMENT_LABELS = {
  cod: "Cash on Delivery",
  upi: "UPI",
  card: "Card",
};

function Profile({ profile, onSave }) {
  const navigate = useNavigate();
  const [tab, setTab] = useState("orders");

  // orders were saved by the checkout page
  const [orders] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("orders")) || [];
    } catch {
      return [];
    }
  });

  // personal info form
  const [info, setInfo] = useState({
    name: profile.name || "",
    phone: profile.phone || "",
    email: profile.email || "",
  });
  const [infoErrors, setInfoErrors] = useState({});
  const [infoSaved, setInfoSaved] = useState(false);

  // address form
  const [addr, setAddr] = useState({
    address: profile.address || "",
    city: profile.city || "",
    pincode: profile.pincode || "",
  });
  const [addrErrors, setAddrErrors] = useState({});
  const [addrSaved, setAddrSaved] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function changeInfo(e) {
    setInfo({ ...info, [e.target.name]: e.target.value });
    setInfoErrors({ ...infoErrors, [e.target.name]: "" });
    setInfoSaved(false);
  }

  function changeAddr(e) {
    setAddr({ ...addr, [e.target.name]: e.target.value });
    setAddrErrors({ ...addrErrors, [e.target.name]: "" });
    setAddrSaved(false);
  }

  function saveInfo(e) {
    e.preventDefault();
    const found = {};

    if (!info.name.trim()) {
      found.name = "Please enter your name";
    }

    if (!/^\d{10}$/.test(info.phone.replace(/\s/g, ""))) {
      found.phone = "Enter a valid 10-digit phone number";
    }

    if (!/^\S+@\S+\.\S+$/.test(info.email)) {
      found.email = "Enter a valid email address";
    }

    setInfoErrors(found);
    if (Object.keys(found).length > 0) return;

    onSave(info);
    setInfoSaved(true);
  }

  function saveAddress(e) {
    e.preventDefault();
    const found = {};

    if (addr.address.trim().length < 10) {
      found.address = "Please enter your full address";
    }

    if (!addr.city.trim()) {
      found.city = "Please enter your city";
    }

    if (!/^\d{6}$/.test(addr.pincode)) {
      found.pincode = "Enter a valid 6-digit pincode";
    }

    setAddrErrors(found);
    if (Object.keys(found).length > 0) return;

    onSave(addr);
    setAddrSaved(true);
  }

  const displayName = profile.name || "Guest";

  return (
    <div className="profile-page">
      {/* ---------- HEADER ---------- */}
      <div className="profile-header">
        <div className="profile-avatar">
          {profile.name ? profile.name.charAt(0).toUpperCase() : "👤"}
        </div>
        <div>
          <h1>{displayName}</h1>
          <p className="muted">
            {profile.email || "Add your details in the Personal Info tab"}
          </p>
        </div>
        <div className="profile-count">
          <strong>{orders.length}</strong>
          <span>{orders.length === 1 ? "Order" : "Orders"}</span>
        </div>
      </div>

      {/* ---------- TABS ---------- */}
      <div className="profile-tabs">
        <button className={tab === "orders" ? "active" : ""} onClick={() => setTab("orders")}>
          My Orders
        </button>
        <button className={tab === "info" ? "active" : ""} onClick={() => setTab("info")}>
          Personal Info
        </button>
        <button className={tab === "address" ? "active" : ""} onClick={() => setTab("address")}>
          Address
        </button>
      </div>

      {/* ---------- ORDERS ---------- */}
      {tab === "orders" && (
        <div className="profile-panel">
          {orders.length === 0 && (
            <div className="empty-orders">
              <div className="success-icon empty">🛍️</div>
              <h3>No orders yet</h3>
              <p className="muted">When you buy something, it will show up here.</p>
              <button className="btn continue-btn" onClick={() => navigate("/")}>
                Start Shopping
              </button>
            </div>
          )}

          {orders.map((o) => (
            <div className="order-card" key={o.id}>
              <div className="order-head">
                <div>
                  <strong>{o.id}</strong>
                  <p className="muted">{o.date}</p>
                </div>
                <span className="status-badge">✓ Confirmed</span>
              </div>

              <ul className="order-items">
                {o.items.map((item) => (
                  <li key={item.id}>
                    <img src={item.thumbnail} alt={item.title} />
                    <span>
                      {item.title} × {item.qty}
                    </span>
                    <strong>${(item.price * item.qty).toFixed(2)}</strong>
                  </li>
                ))}
              </ul>

              <div className="order-foot">
                <span>Paid via {PAYMENT_LABELS[o.payment] || o.payment}</span>
                <strong>Total ${o.total.toFixed(2)}</strong>
              </div>

              <p className="muted order-address">
                Delivered to: {o.customer.address}, {o.customer.city} -{" "}
                {o.customer.pincode}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* ---------- PERSONAL INFO ---------- */}
      {tab === "info" && (
        <div className="profile-panel">
          <form className="checkout-card" onSubmit={saveInfo} noValidate>
            <h3>Personal information</h3>

            <div className="form-group">
              <label htmlFor="p-name">Full name</label>
              <input id="p-name" name="name" type="text" placeholder="Your full name" value={info.name} onChange={changeInfo} />
              {infoErrors.name && <p className="form-error">{infoErrors.name}</p>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="p-phone">Phone</label>
                <input id="p-phone" name="phone" type="tel" placeholder="10-digit number" value={info.phone} onChange={changeInfo} />
                {infoErrors.phone && <p className="form-error">{infoErrors.phone}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="p-email">Email</label>
                <input id="p-email" name="email" type="email" placeholder="you@example.com" value={info.email} onChange={changeInfo} />
                {infoErrors.email && <p className="form-error">{infoErrors.email}</p>}
              </div>
            </div>

            <button type="submit" className="btn form-btn">
              Save Changes
            </button>

            {infoSaved && <p className="form-success">✓ Your information has been saved.</p>}
          </form>
        </div>
      )}

      {/* ---------- ADDRESS ---------- */}
      {tab === "address" && (
        <div className="profile-panel">
          <form className="checkout-card" onSubmit={saveAddress} noValidate>
            <h3>Delivery address</h3>

            <div className="form-group">
              <label htmlFor="p-address">Address</label>
              <textarea id="p-address" name="address" rows="3" placeholder="House no, street, area" value={addr.address} onChange={changeAddr} />
              {addrErrors.address && <p className="form-error">{addrErrors.address}</p>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="p-city">City</label>
                <input id="p-city" name="city" type="text" placeholder="City" value={addr.city} onChange={changeAddr} />
                {addrErrors.city && <p className="form-error">{addrErrors.city}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="p-pin">Pincode</label>
                <input id="p-pin" name="pincode" type="text" placeholder="6-digit pincode" value={addr.pincode} onChange={changeAddr} />
                {addrErrors.pincode && <p className="form-error">{addrErrors.pincode}</p>}
              </div>
            </div>

            <button type="submit" className="btn form-btn">
              Save Address
            </button>

            {addrSaved && <p className="form-success">✓ Your address has been saved.</p>}
          </form>
        </div>
      )}

      <p className="profile-note">
        Your details are stored only in this browser. There is no login yet.
      </p>
    </div>
  );
}

export default Profile;