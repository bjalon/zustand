import { useContext, useState } from "react";
import ReactLogo from "./logo.png"; // Import the image
import CartIcon from "./CartIcon.js";
import ThemeContext from "../contexts/ThemeContext.js";
import { useTheme } from "../contexts/ThemeContextHook.js";
import useAuthStore from "../store/AuthStore.ts";
import {useShallow} from "zustand/react/shallow";

function Header({ setPage }) {
  const [isDropdownOpen, setIsDropDownOpen] = useState(false);
  const { isAuthenticated, login, disconnect } = useAuthStore(
      useShallow((state) => ({
        isAuthenticated: state.isLogged,
        login: state.login,
        disconnect: state.disconnect,
      })),
  );

  // const {theme} = useContext(ThemeContext);
  const { theme } = useTheme();

  const handleToggleDropdown = () => {
    setIsDropDownOpen(!isDropdownOpen);
  };
  const handleLogin = () => {
    setIsDropDownOpen(false);
    setPage('login-page');
  };
  const handleLogout = () => {
    disconnect();
  };
  const handleGoToHomePage = () => {
    setPage("products-page")
  };

  return (
    <header className={`header theme-${theme}`}>
      <div className="header-navbar">
        <div onClick={handleGoToHomePage}>
          <img className="header-logo" src={ReactLogo} alt="Reactlogo" />
          <span className="header-title">My Shop</span>
        </div>
        <div>
          <CartIcon setPage={setPage}/>

          {isAuthenticated ? (
            <div className="header-user-wrapper">
              <div className="header-user-label" onClick={handleToggleDropdown}>
                {`Bonjour ${login ? login : "Anonyme"}`}
              </div>
              {isDropdownOpen && (
                <div className="header-user-dropdown">
                  <button className="btn" onClick={handleLogout}>
                    Se déconnecter
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button className="btn" onClick={handleLogin}>
              Se connecter
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
