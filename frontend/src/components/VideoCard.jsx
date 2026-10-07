import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AccountMenu from "./AccountMenu";

const HeartIcon = ({ filled }) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className={filled ? "is-filled" : ""}
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z" />
  </svg>
);

const BookmarkIcon = ({ filled }) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className={filled ? "is-filled" : ""}
  >
    <path d="M6 3.75A1.75 1.75 0 0 1 7.75 2h8.5A1.75 1.75 0 0 1 18 3.75v17.5a.75.75 0 0 1-1.2.6L12 18.1l-4.8 3.75a.75.75 0 0 1-1.2-.6V3.75Z" />
  </svg>
);

const StoreIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M4 10.5V20h16v-9.5M3 10.5 5 4h14l2 6.5M8 20v-5h8v5M3 10.5a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0" />
  </svg>
);

const VideoCard = ({ food, isActive, onLike, onSave, canInteract = true }) => {
  const videoRef = useRef(null);
  const navigate = useNavigate();

  const [muted, setMuted] = useState(true);
  const [expanded, setExpanded] = useState(false);

  const description =
    food.description?.trim() || "Discover this dish on Foody.";

  const shortDescription =
    description.length > 120
      ? `${description.slice(0, 120).trimEnd()}...`
      : description;

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    video.muted = muted;

    if (isActive) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isActive, muted]);

  const handleVisitStore = () => {
    if (food.foodPartner) {
      navigate(`/partner/${food.foodPartner}`);
    }
  };

  return (
    <article className="food-reel">
      <video
        ref={videoRef}
        className="food-reel__video"
        src={food.video}
        muted={muted}
        loop
        playsInline
        preload="metadata"
        onClick={() => setMuted((value) => !value)}
      />

      <div className="food-reel__shade" />

      <div className="food-reel__topbar">
        <span className="food-reel__brand">Foody</span>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <button
            type="button"
            className="food-reel__sound"
            onClick={() => setMuted((value) => !value)}
            aria-label={muted ? "Unmute video" : "Mute video"}
          >
            {muted ? "🔇" : "🔊"}
          </button>

          <AccountMenu />
        </div>
      </div>

      <div className="food-reel__content">
        <div className="food-reel__details">
          <h2>{food.name}</h2>

          <p className={expanded ? "is-expanded" : ""}>
            {expanded ? description : shortDescription}
          </p>

          {description.length > 120 && (
            <button
              type="button"
              className="food-reel__more"
              onClick={() => setExpanded((value) => !value)}
            >
              {expanded ? "less" : "more"}
            </button>
          )}

          <button
            type="button"
            className="food-reel__store"
            onClick={handleVisitStore}
            disabled={!food.foodPartner}
          >
            <StoreIcon />
            Visit Store
          </button>
        </div>

        <div className="food-reel__actions">
          <button
            type="button"
            className={`reel-action ${food.liked ? "is-active" : ""}`}
            onClick={() => onLike(food._id)}
            disabled={!canInteract}
            aria-label={canInteract ? "Like food" : "Available to users"}
          >
            <HeartIcon filled={food.liked} />
            <span>{food.likeCount ?? 0}</span>
          </button>

          <button
            type="button"
            className={`reel-action ${food.saved ? "is-active" : ""}`}
            onClick={() => onSave(food._id)}
            disabled={!canInteract}
            aria-label={canInteract ? "Save food" : "Available to users"}
          >
            <BookmarkIcon filled={food.saved} />
            <span>{food.savesCount ?? 0}</span>
          </button>
        </div>
      </div>
    </article>
  );
};

export default VideoCard;
