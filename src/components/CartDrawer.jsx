function CartDrawer({ open, cart, onClose, onChangeQty, onRemove, onCheckout }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <>
      <div
        className={`cart-overlay ${open ? "show" : ""}`}
        onClick={onClose}
      />

      <aside className={`cart-drawer ${open ? "open" : ""}`}>
        <div className="cart-header">
          <h3>Your Cart</h3>
          <button className="cart-close" onClick={onClose}>✕</button>
        </div>

        <div className="cart-items">
          {cart.length === 0 && (
            <p className="cart-empty">Your cart is empty 🛍️</p>
          )}

          {cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.thumbnail} alt={item.title} />

              <div className="cart-info">
                <h4>{item.title}</h4>
                <p>${item.price}</p>

                <div className="qty">
                  <button onClick={() => onChangeQty(item.id, -1)}>−</button>
                  <span>{item.qty}</span>
                  <button onClick={() => onChangeQty(item.id, 1)}>+</button>
                </div>
              </div>

              <button className="remove-btn" onClick={() => onRemove(item.id)}>
                🗑
              </button>
            </div>
          ))}
        </div>

        <div className="cart-footer">
          <div className="cart-total">
            <span>Total</span>
            <strong>${total.toFixed(2)}</strong>
          </div>
          <button className="btn checkout-btn" disabled={cart.length === 0} onClick={onCheckout}>
            Checkout
          </button>
        </div>
      </aside>
    </>
  );
}

export default CartDrawer;