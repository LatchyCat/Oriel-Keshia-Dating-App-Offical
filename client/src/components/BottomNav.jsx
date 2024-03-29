import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import style from "../css/BottomNav.module.css";

const BottomNav = () => {
  return (
    <footer className={style.Footer}>
      <div className={style.FooterContainer}>
        <div className={style.FooterLinks}>
          <NavLink to="/terms-of-service">Terms of Service</NavLink>
          <NavLink to="/privacy-policy">Privacy Policy</NavLink>
          <NavLink to="/contact">Contact Us</NavLink>
        </div>

        <div className={style.SocialMedia}>
          <a className={style.facebook} href="https://facebook.com"><FaFacebook /></a>
          <a className={style.twitter} href="https://twitter.com"><FaTwitter /></a>
          <a className={style.instagram} href="https://instagram.com"><FaInstagram /></a>
        </div>
        <div className={style.Copyright}>
          &copy; Oriel Oriented Prorigramming x Keshia's Synaptic Solutions
        </div>
      </div>
    </footer>
  );
};

export default BottomNav;
