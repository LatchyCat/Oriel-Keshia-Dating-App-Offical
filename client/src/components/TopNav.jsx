import { NavLink, useLocation } from 'react-router-dom';
import style from "../css/TopNav.module.css";

const TopNav = ({ isLoggedIn }) => {
  const location = useLocation();
  const isHomeRoute = location.pathname === '/';
  const isDashboardRoute = location.pathname === '/dashboard';
  const isEditRoute = location.pathname === '/edit';
  const isProfileRoute = location.pathname === '/profile';
  const isExpertRoute = location.pathname === '/expert';
  const isRegisterRoute = location.pathname === '/register';
  const isLoginRoute = location.pathname === '/login';

  return (
    <div className={style.HoldingCell}>
      <nav className={style.StartBox}>
        <div className={style.BoxTwo}>
          <div className={style.ButtonContainer}>
            {/* Conditional rendering for Home button */}
            {!isHomeRoute && <NavLink to="/" className={style.Button}>Home</NavLink>}
            {/* Dashboard button is not shown on the '/' and '/login' routes */}
            {!isHomeRoute && !isLoginRoute && !isRegisterRoute && !isExpertRoute && (
              <NavLink to="/dashboard" className={style.Button}>Dashboard</NavLink>
            )}
            {!isExpertRoute && <NavLink to="/expert" className={style.Button}>Talk to an Expert</NavLink>}
            {/* Always render login and register buttons */}
            {(isHomeRoute || isRegisterRoute) && <NavLink to="/login" className={style.ButtonLogin}>Login</NavLink>}
            {isHomeRoute && <NavLink to="/register" className={style.ButtonRegister}>Register</NavLink>}
            {/* Conditionally render logout button */}
            {(isDashboardRoute || isEditRoute || isProfileRoute) && <NavLink to="/logout" className={style.Button}>Logout</NavLink>}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default TopNav;
