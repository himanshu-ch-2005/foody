import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../../services/api";

import "../../styles/create-food.css";

const CreateFood = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const [video, setVideo] = useState(null);

  const [preview, setPreview] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleVideoChange = (event) => {
    const file = event.target.files?.[0];

    setError("");

    if (!file) {
      setVideo(null);
      setPreview("");
      return;
    }

    if (!file.type.startsWith("video/")) {
      setVideo(null);
      setPreview("");
      setError("Please select a video file.");
      return;
    }

    if (file.size > 100 * 1024 * 1024) {
      setVideo(null);
      setPreview("");
      setError("Video must be smaller than 100 MB.");
      return;
    }

    setVideo(file);

    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError("");
    setMessage("");

    if (!video) {
      setError("Please select a food video.");

      setLoading(false);
      return;
    }

    try {
      const body = new FormData();

      body.append("name", formData.name.trim());

      body.append("description", formData.description.trim());

      body.append("video", video);

      const response = await api.post("/food", body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage(response.data?.message || "Food uploaded successfully.");

      setFormData({
        name: "",
        description: "",
      });

      setVideo(null);
      setPreview("");

      setTimeout(() => navigate("/"), 300);
    } catch (requestError) {
      if (requestError.response?.status === 401) {
        localStorage.removeItem("role");

        navigate("/partner/login", {
          replace: true,
        });

        return;
      }

      setError(
        requestError.response?.data?.message ||
          "Unable to upload the food video.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="create-food-page">
      <header className="create-food-header">
        <Link to="/" className="create-food-brand">
          Foody
        </Link>

        <Link to="/partner/login" className="create-food-link">
          Partner login
        </Link>
      </header>

      <section className="create-food-card">
        <div className="create-food-heading">
          <span>Food Partner</span>

          <h1>Add a food video</h1>

          <p>Share your dish with people discovering food on Foody.</p>
        </div>

        {message && <div className="create-food-success">{message}</div>}

        {error && <div className="create-food-error">{error}</div>}

        <form onSubmit={handleSubmit} className="create-food-form">
          <label>
            <span>Food name</span>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Paneer Tikka"
              required
            />
          </label>

          <label>
            <span>Description</span>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Tell people about this dish"
              rows="4"
            />
          </label>

          <label className="create-food-upload">
            <span>Food video</span>

            <input
              type="file"
              accept="video/*"
              onChange={handleVideoChange}
              required
            />

            <strong>{video ? video.name : "Choose a video"}</strong>

            <small>
              MP4, WebM or another supported video format · max 100 MB
            </small>
          </label>

          {preview && (
            <video
              className="create-food-preview"
              src={preview}
              controls
              muted
              playsInline
            />
          )}

          <button
            className="create-food-submit"
            type="submit"
            disabled={loading}
          >
            {loading ? "Uploading..." : "Publish food"}
          </button>
        </form>
      </section>
    </main>
  );
};

export default CreateFood;
