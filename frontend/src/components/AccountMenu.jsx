import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/account-menu.css";

const AccountIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="8" r="3.5" />
    <path d="M5 20c.8-3.4 3.1-5 7-5s6.2 1.6 7 5" />
  </svg>
);

const AccountMenu = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const role = localStorage.getItem("role");

  const handleLogout = async () => {
    if (loading) return;

    setLoading(true);

    try {
      if (role === "partner") {
        await api.get("/auth/partner/logout");
      } else if (role === "user") {
        await api.get("/auth/user/logout");
      }
    } catch (error) {
      console.error("Logout request failed:", error);
    } finally {
      // Remove the role from browser storage
      localStorage.removeItem("role");

      setOpen(false);
      setLoading(false);

      /*
       * Use a full page navigation here.
       *
       * We are already on "/".
       * navigate("/") may not cause RootRoute to
       * render again because the URL has not changed.
       *
       * Reloading "/" makes RootRoute check localStorage
       * again and show the User / Food Partner screen.
       */
      window.location.replace("/");
    }
  };

  return (
    <div className="account-menu">
      <button
        type="button"
        className="account-menu__button"
        onClick={() => setOpen((value) => !value)}
        aria-label="Account menu"
        aria-expanded={open}
      >
        <AccountIcon />
      </button>

      {open && (
        <div className="account-menu__dropdown">
          <div className="account-menu__role">
            {role === "partner" ? "Food Partner" : "User"}
          </div>

          <button
            type="button"
            className="account-menu__logout"
            onClick={handleLogout}
            disabled={loading}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M10 17l5-5-5-5" />
              <path d="M15 12H3" />
              <path d="M21 19V5a2 2 0 0 0-2-2h-6" />
            </svg>

            <span>{loading ? "Logging out..." : "Log out"}</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default AccountMenu;
