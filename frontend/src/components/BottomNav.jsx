import { NavLink } from "react-router-dom";
import "../styles/bottom-nav.css";

const HomeIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M3 10.5 12 3l9 7.5" />
    <path d="M5 9.5V21h14V9.5" />
  </svg>
);

const BookmarkIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M6 3.75A1.75 1.75 0 0 1 7.75 2h8.5A1.75 1.75 0 0 1 18 3.75v17.5a.75.75 0 0 1-1.2.6L12 18.1l-4.8 3.75a.75.75 0 0 1-1.2-.6V3.75Z" />
  </svg>
);

const PlusIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const BottomNav = () => {
  const role = localStorage.getItem("role");
  const isPartner = role === "partner";

  return (
    <nav className="bottom-nav">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `bottom-nav__item ${isActive ? "is-active" : ""}`
        }
      >
        <HomeIcon />
        <span>Home</span>
      </NavLink>

      <NavLink
        to="/saved"
        className={({ isActive }) =>
          `bottom-nav__item ${isActive ? "is-active" : ""}`
        }
      >
        <BookmarkIcon />
        <span>Saved</span>
      </NavLink>

      {isPartner && (
        <NavLink
          to="/create-food"
          className={({ isActive }) =>
            `bottom-nav__item bottom-nav__add ${isActive ? "is-active" : ""}`
          }
        >
          <PlusIcon />
          <span>Create</span>
        </NavLink>
      )}
    </nav>
  );
};

export default BottomNav;
