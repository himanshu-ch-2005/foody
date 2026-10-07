import { useState } from "react";
import axios from "axios";
import AuthInput from "../../components/AuthInput";
import "../../styles/auth.css";
import { Link, useNavigate } from "react-router-dom";

const FoodPartnerRegister = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    restaurant: "",
    name: "",
    contact: "",
    address: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/partner/register",
        formData,
        {
          withCredentials: true,
        },
      );

      localStorage.setItem("role", "partner");

      setMessage(
        response.data?.message || "Food partner registration successful!",
      );

      navigate("/");
    } catch (error) {
      setMessage("");

      setError(
        error.response?.data?.message ||
          "Registration failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-brand">
          <span className="auth-brand-mark">F</span>
          <span>Foody</span>
        </div>

        <span className="auth-role-note">Food Partner</span>

        <h1 className="auth-heading">Register your restaurant</h1>

        <p className="auth-subtitle">
          Join Foody and start serving your customers.
        </p>

        {message && <div className="auth-success">{message}</div>}

        {error && <div className="auth-error">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <AuthInput
            label="Restaurant / Business Name"
            name="restaurant"
            placeholder="Enter restaurant name"
            value={formData.restaurant}
            onChange={handleChange}
          />

          <AuthInput
            label="Owner Name"
            name="name"
            placeholder="Enter owner's name"
            value={formData.name}
            onChange={handleChange}
          />

          <AuthInput
            label="Contact Number"
            name="contact"
            type="tel"
            placeholder="Enter contact number"
            value={formData.contact}
            onChange={handleChange}
          />

          <div className="auth-field">
            <label className="auth-label" htmlFor="address">
              Address
            </label>

            <textarea
              className="auth-input auth-textarea"
              id="address"
              name="address"
              placeholder="Enter restaurant address"
              rows="3"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <AuthInput
            label="Email Address"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
          />

          <AuthInput
            label="Password"
            name="password"
            type="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
          />

          <button className="auth-button" type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create account"}
          </button>
        </form>

        <p className="auth-footer">
          Already have a partner account?{" "}
          <Link className="auth-link" to="/partner/login">
            Sign in
          </Link>
        </p>
      </section>
    </main>
  );
};

export default FoodPartnerRegister;
