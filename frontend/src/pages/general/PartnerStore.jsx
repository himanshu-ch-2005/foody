import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import "../../styles/store.css";

const PartnerStore = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [partner, setPartner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const loadStore = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await api.get(`/food-partner/${id}`);

        if (!cancelled) {
          setPartner(response.data?.foodPartner || null);
        }
      } catch (requestError) {
        if (cancelled) return;

        if (requestError.response?.status === 401) {
          navigate("/user/login", { replace: true });
          return;
        }

        setError(
          requestError.response?.data?.message || "Unable to load this store.",
        );
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadStore();

    return () => {
      cancelled = true;
    };
  }, [id, navigate]);

  if (loading) {
    return (
      <main className="store-page store-page--centered">
        <div className="store-loader" />
      </main>
    );
  }

  if (error || !partner) {
    return (
      <main className="store-page store-page--centered">
        <section className="store-message">
          <h1>Store unavailable</h1>

          <p>{error || "This food partner could not be found."}</p>

          <Link to="/">Back to Foody</Link>
        </section>
      </main>
    );
  }

  return (
    <main className="store-page">
      <header className="store-header">
        <Link className="store-back" to="/" aria-label="Back to home">
          ←
        </Link>

        <span className="store-brand">Foody</span>

        <span className="store-header-spacer" />
      </header>

      <section className="store-profile">
        <div className="store-avatar">
          {(partner.restaurant || partner.name || "F").charAt(0).toUpperCase()}
        </div>

        <div className="store-profile__info">
          <h1>{partner.restaurant || "Food Partner"}</h1>

          <p className="store-owner">{partner.name}</p>

          <p>{partner.address}</p>

          <p>{partner.contact}</p>
        </div>
      </section>

      <section className="store-foods">
        <div className="store-section-heading">
          <h2>Food videos</h2>

          <span>{partner.foodItems?.length || 0}</span>
        </div>

        {partner.foodItems?.length ? (
          <div className="store-grid">
            {partner.foodItems.map((food) => (
              <article className="store-food-card" key={food._id}>
                <video
                  src={food.video}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  controls
                />

                <div className="store-food-card__content">
                  <h3>{food.name}</h3>

                  {food.description && <p>{food.description}</p>}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="store-empty">This store has no food videos yet.</p>
        )}
      </section>
    </main>
  );
};

export default PartnerStore;
