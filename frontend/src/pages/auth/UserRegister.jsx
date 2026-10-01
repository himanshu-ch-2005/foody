import { useState } from "react";
import axios from "axios";
import AuthInput from "../../components/AuthInput";
import "../../styles/auth.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const UserRegister = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
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
        "http://localhost:3000/api/auth/user/register",
        formData,
        {
          withCredentials: true,
        },
      );

        setMessage(response.data?.message || "Registration successful!");

      setFormData({
        fullName: "",
        email: "",
        password: "",
      });
      navigate("/")
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

        <h1 className="auth-heading">Create your account</h1>

        <p className="auth-subtitle">Join Foody and discover great food.</p>

        {message && <div className="auth-success">{message}</div>}

        {error && <div className="auth-error">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <AuthInput
            label="Full Name"
            name="fullName"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={handleChange}
          />

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
          Already have an account?{" "}
          <Link className="auth-link" to="/user/login">
            Sign in
          </Link>
        </p>
      </section>
    </main>
  );
};

export default UserRegister;
