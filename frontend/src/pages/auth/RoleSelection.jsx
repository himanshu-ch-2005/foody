import { useNavigate } from "react-router-dom";
import "../../styles/role-selection.css";

const RoleSelection = () => {
  const navigate = useNavigate();

  return (
    <main className="role-selection">
      <section className="role-selection__card">
        <div className="role-selection__brand">
          <span className="role-selection__brand-mark">F</span>
          <span>Foody</span>
        </div>

        <div className="role-selection__heading">
          <h1>Welcome to Foody</h1>

          <p>Choose how you want to continue.</p>
        </div>

        <div className="role-selection__options">
          <button
            type="button"
            className="role-option"
            onClick={() => navigate("/user/login")}
          >
            <div className="role-option__icon">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="8" r="3.5" />
                <path d="M5 20c.8-3.4 3.1-5 7-5s6.2 1.6 7 5" />
              </svg>
            </div>

            <div className="role-option__content">
              <strong>User</strong>
              <span>Discover food, like and save your favorites.</span>
            </div>

            <span className="role-option__arrow">→</span>
          </button>

          <button
            type="button"
            className="role-option"
            onClick={() => navigate("/partner/login")}
          >
            <div className="role-option__icon">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 10.5V20h16v-9.5" />
                <path d="M3 10.5 5 4h14l2 6.5" />
                <path d="M3 10.5a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0" />
              </svg>
            </div>

            <div className="role-option__content">
              <strong>Food Partner</strong>
              <span>Share your food and manage your restaurant.</span>
            </div>

            <span className="role-option__arrow">→</span>
          </button>
        </div>
      </section>
    </main>
  );
};

export default RoleSelection;
