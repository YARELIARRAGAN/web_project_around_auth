import { useState } from "react";
import logo from "../../images/logo.svg";
import { useNavigate, useLocation, Link } from "react-router-dom";

function Header({ isLoggedIn, setIsLoggedIn, currentUser }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const locationSignin = location.pathname === "/signin";
  
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  } 
  function handleLogout() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/signin");
  }

  return (
    <header className="header page__section">
    <img
      alt="Logotipo Around The U.S."
      className="logo header__logo"
      src={logo}
    />

    {isLoggedIn && (
      <>
        <button
          type="button"
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isMenuOpen}
          className={`header__hamburger ${isMenuOpen ? "header__hamburger-open" : ""}`}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`header__container ${isMenuOpen ? "header__container-open" : ""}`}>
          <p className="header__email-user">{currentUser.data.email}</p>
          <button className="header__logout-button" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </>
    )}

    {!isLoggedIn &&
      (locationSignin ? (
        <Link to="/signup" className="header__link-to">
          Regístrate
        </Link>
      ) : (
        <Link to="/signin" className="header__link-to">
          Iniciar sesión
        </Link>
      ))}
  </header>
  );
}

export default Header;
