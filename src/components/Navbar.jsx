import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import noteContext from "../contexts/notes/noteContext";
import { useAuth } from "../contexts/auth/AuthState";

const Navbar = () => {
  const themes = useContext(noteContext);
  const { logout } = useAuth();
  const token = localStorage.getItem("auth-token");
  const pathName = useLocation().pathname;
  const navigate = useNavigate();

  const handleLogout = () => {
    // localStorage.removeItem("auth-token");
    // navigate("/login");
    logout();
  };

  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Note Book
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${pathName == "/" ? "active" : ""}`}
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${pathName == "/about" ? "active" : ""}`}
                to="/about"
              >
                About
              </Link>
            </li>
          </ul>
          <button
            className={`btn btn-outline-success mx-3`}
            onClick={() =>
              themes.theme.color == "bg-dark"
                ? themes.updateTheme("bg-light")
                : themes.updateTheme("bg-dark")
            }
          >
            {themes.theme.color == "bg-dark" ? "Light" : "Dark"}
          </button>

          {!token ? (
            <form className="d-flex" role="search">
              <Link className="btn btn-primary mx-2" to="/signup" role="button">
                Signup
              </Link>
              <Link className="btn btn-primary mx-2" to="/login" role="button">
                Login
              </Link>
            </form>
          ) : (
            <button className="btn btn-primary" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
