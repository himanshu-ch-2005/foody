import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import VideoCard from "../../components/VideoCard";
import BottomNav from "../../components/BottomNav";
import api from "../../services/api";
import "../../styles/saved.css";

const Saved = () => {
  const navigate = useNavigate();

  const [foods, setFoods] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSavedFoods = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await api.get("/food/save");

      const savedFoods = response.data?.foodItems || [];

      setFoods(
        savedFoods.map((food) => ({
          ...food,
          saved: true,
        })),
      );
    } catch (requestError) {
      if (requestError.response?.status === 401) {
        navigate("/user/login", {
          replace: true,
        });
        return;
      }

      setError(
        requestError.response?.data?.message || "Unable to load saved videos.",
      );
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchSavedFoods();
  }, [fetchSavedFoods]);

  useEffect(() => {
    const feed = document.querySelector(".saved-feed");

    if (!feed) return undefined;

    const cards = Array.from(feed.querySelectorAll(".food-reel"));

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
        root: feed,
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
      const response = await api.post("/food/like", { foodId });

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
      const response = await api.post("/food/save", { foodId });

      if (response.data?.saved === false) {
        setFoods((current) => current.filter((food) => food._id !== foodId));

        return;
      }

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
      <main className="saved-page saved-page--centered">
        <div className="saved-loader">
          <span />
          <span />
          <span />
        </div>

        <BottomNav />
      </main>
    );
  }

  if (error) {
    return (
      <main className="saved-page saved-page--centered">
        <section className="saved-message">
          <h1>Couldn't load saved videos</h1>

          <p>{error}</p>

          <button type="button" onClick={fetchSavedFoods}>
            Try again
          </button>
        </section>

        <BottomNav />
      </main>
    );
  }

  if (!foods.length) {
    return (
      <main className="saved-page saved-page--centered">
        <section className="saved-message">
          <div className="saved-message__icon">♡</div>

          <h1>No saved videos</h1>

          <p>Videos that you save from the Foody feed will appear here.</p>

          <button type="button" onClick={() => navigate("/")}>
            Explore food
          </button>
        </section>

        <BottomNav />
      </main>
    );
  }

  return (
    <main className="saved-page">
      <div className="saved-title">
        <span>Foody</span>
        <h1>Saved</h1>
      </div>

      <div className="saved-feed">
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

export default Saved;
