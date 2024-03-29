import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import style from "../css/TopNav.module.css";

const TopNav = ({ isLoggedIn }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [loveMode, setLoveMode] = useState(false);

  const handleDarkModeClick = () => {
    setDarkMode(!darkMode);
    // Toggle dark mode class on body
    document.body.classList.toggle('dark-mode');
  };

  const handleLoveModeClick = () => {
    setLoveMode(!loveMode);
    // Toggle love mode class on body
    document.body.classList.toggle('love-mode');
  };

  return (
    <div className={style.HoldingCell}>
      <nav className={style.StartBox}>
        <div className={style.BoxTwo}>
          <div className={style.ButtonContainer}>
            <NavLink to="/" className={style.Button}>DashBoard</NavLink>
            <a href="#" className={style.Button}>Try for Free!</a>
            <a href="#" className={style.Button}>Talk to an Expert</a>
            <a href="#" className={style.Button}>Learn More</a>
            {isLoggedIn ? (
              <NavLink to="/login" className={style.ButtonLogin}>Login</NavLink>
            ) : (
              <NavLink to="/register" className={style.ButtonRegister}>Register</NavLink>
            )}
            <button className={darkMode ? `${style.DarkModeButton} ${style.Active}` : style.DarkModeButton} onClick={handleDarkModeClick}>
              Dark Mode
            </button>
            <button className={loveMode ? `${style.LoveModeButton} ${style.Active}` : style.LoveModeButton} onClick={handleLoveModeClick}>
              Love Mode
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default TopNav;
