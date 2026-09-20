import { useState } from "react";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSent(false);
  }

  function validate() {
    const found = {};

    if (!form.name.trim()) {
      found.name = "Please enter your name";
    }

    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      found.email = "Please enter a valid email";
    }

    if (form.message.trim().length < 10) {
      found.message = "Message should be at least 10 characters";
    }

    return found;
  }

  function handleSubmit(e) {
    e.preventDefault();

    const found = validate();
    setErrors(found);

    // no errors: show success and clear the form
    if (Object.keys(found).length === 0) {
      setSent(true);
      setForm({ name: "", email: "", message: "" });
    }
  }

  return (
    <section className="contact" id="contact">
      <h2 className="section-title">
        Get In <span>Touch</span>
      </h2>

      <div className="contact-grid">
        <div className="contact-info">
          <div className="info-card">
            <span className="info-icon">📍</span>
            <div>
              <h4>Address</h4>
              <p>123 Fashion Street, Your City</p>
            </div>
          </div>

          <div className="info-card">
            <span className="info-icon">✉️</span>
            <div>
              <h4>Email</h4>
              <p>hello@nova.com</p>
            </div>
          </div>

          <div className="info-card">
            <span className="info-icon">📞</span>
            <div>
              <h4>Phone</h4>
              <p>+91 98765 43210</p>
            </div>
          </div>

          <div className="info-card">
            <span className="info-icon">🕒</span>
            <div>
              <h4>Working Hours</h4>
              <p>Mon - Sat, 10:00 AM - 7:00 PM</p>
            </div>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="name">Your Name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your name"
              value={form.name}
              onChange={handleChange}
            />
            {errors.name && <p className="form-error">{errors.name}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && <p className="form-error">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              placeholder="How can we help you?"
              value={form.message}
              onChange={handleChange}
            />
            {errors.message && <p className="form-error">{errors.message}</p>}
          </div>

          <button type="submit" className="btn form-btn">
            Send Message
          </button>

          {sent && (
            <p className="form-success">
              ✓ Thank you! Your message has been received.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

export default Contact;