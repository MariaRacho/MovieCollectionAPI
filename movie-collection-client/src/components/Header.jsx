import { NavLink } from "react-router-dom";
import "../styles/Header.css";

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <NavLink to="/" className="logo">
          <span className="logo-icon">🎬</span>

          <span className="logo-text">
            <span className="logo-title">Movie Collection</span>
            <span className="logo-subtitle">Library dashboard</span>
          </span>
        </NavLink>

        <nav className="navigation" aria-label="Main navigation">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "nav-link nav-link-active" : "nav-link"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/movies"
            className={({ isActive }) =>
              isActive ? "nav-link nav-link-active" : "nav-link"
            }
          >
            Movies
          </NavLink>

          <NavLink
            to="/genres"
            className={({ isActive }) =>
              isActive ? "nav-link nav-link-active" : "nav-link"
            }
          >
            Genres
          </NavLink>

          <NavLink
            to="/loans"
            className={({ isActive }) =>
              isActive ? "nav-link nav-link-active" : "nav-link"
            }
          >
            Loans
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;