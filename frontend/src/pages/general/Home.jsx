import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import VideoCard from "../../components/VideoCard";
import api from "../../services/api";
import "../../styles/home.css";
import BottomNav from "../../components/BottomNav";

const Home = () => {
  const navigate = useNavigate();

  const [foods, setFoods] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const feedRef = useRef(null);

  const fetchFoods = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await api.get("/food");

      setFoods(response.data?.foodItems || []);
    } catch (requestError) {
      if (requestError.response?.status === 401) {
        navigate("/user/login", { replace: true });
        return;
      }

      setError(
        requestError.response?.data?.message ||
          "Unable to load the Foody feed.",
      );
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchFoods();
  }, [fetchFoods]);

  useEffect(() => {
    const container = feedRef.current;

    if (!container) return undefined;

    const cards = Array.from(container.querySelectorAll(".food-reel"));

    if (!cards.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) return;

        const index = cards.indexOf(visible.target);

        if (index !== -1) {
          setActiveIndex(index);
        }
      },
      {
        root: container,
        threshold: [0.6, 0.8, 0.95],
      },
    );

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [foods]);

  const updateFood = (foodId, changes) => {
    setFoods((current) =>
      current.map((food) =>
        food._id === foodId ? { ...food, ...changes } : food,
      ),
    );
  };

  const handleLike = async (foodId) => {
    try {
      const response = await api.post("/food/like", {
        foodId,
      });

      updateFood(foodId, {
        liked: response.data?.liked,
        likeCount: response.data?.likeCount ?? 0,
      });
    } catch (requestError) {
      if (requestError.response?.status === 401) {
        navigate("/user/login");
      }
    }
  };

  const handleSave = async (foodId) => {
    try {
      const response = await api.post("/food/save", {
        foodId,
      });

      updateFood(foodId, {
        saved: response.data?.saved,
        savesCount: response.data?.savesCount ?? 0,
      });
    } catch (requestError) {
      if (requestError.response?.status === 401) {
        navigate("/user/login");
      }
    }
  };

  if (loading) {
    return (
      <main className="home-page home-page--centered">
        <div className="home-loader">
          <span />
          <span />
          <span />
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="home-page home-page--centered">
        <section className="home-message">
          <span className="home-message__brand">Foody</span>

          <h1>Something went wrong</h1>

          <p>{error}</p>

          <button type="button" onClick={fetchFoods}>
            Try again
          </button>
        </section>
      </main>
    );
  }

  if (!foods.length) {
    return (
      <main className="home-page home-page--centered">
        <section className="home-message">
          <span className="home-message__brand">Foody</span>

          <h1>No food videos yet</h1>

          <p>Food videos will appear here when a partner uploads one.</p>

          <Link to="/create-food">Add a food video</Link>
        </section>
      </main>
    );
  }

  return (
    <main className="home-page">
      <div className="food-feed" ref={feedRef}>
        {foods.map((food, index) => (
          <VideoCard
            key={food._id}
            food={food}
            isActive={index === activeIndex}
            onLike={handleLike}
            onSave={handleSave}
          />
        ))}
      </div>
      <BottomNav />
    </main>
  );
};

export default Home;
