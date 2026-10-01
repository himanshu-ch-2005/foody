import { useState } from "react";
import axios from "axios";
import AuthInput from "../../components/AuthInput";
import "../../styles/auth.css";
import { Link, useNavigate } from "react-router-dom";

const FoodPartnerLogin = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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
        "http://localhost:3000/api/auth/partner/login",
        formData,
        {
          withCredentials: true,
        },
      );

      setMessage(response.data?.message || "Login successful!");
      localStorage.setItem("role", "partner");
      navigate("/create-food");
    } catch (error) {
        setMessage("");
      setError(
        error.response?.data?.message ||
          "Login failed. Please check your credentials.",
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

        <h1 className="auth-heading">Welcome back</h1>

        <p className="auth-subtitle">Sign in to manage your restaurant.</p>

        {message && <div className="auth-success">{message}</div>}

        {error && <div className="auth-error">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
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
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />

          <button className="auth-button" type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="auth-footer">
          Don't have a partner account?{" "}
          <Link className="auth-link" to="/partner/register">
            Create one
          </Link>
        </p>
      </section>
    </main>
  );
};

export default FoodPartnerLogin;
