import { NavLink, Outlet } from "react-router-dom";
import styles from "./BasePage.module.scss";

function BasePage() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

function Header() {
  const linkActive = ({ isActive }) =>
    `${styles.link} ${isActive ? styles.active : ""}`;

  return (
    <header>
      <div className={styles.header}>
        <button className={styles.burgerBtn}>
          <i className="fa-solid fa-bars"></i>
        </button>
        <h1 className={styles.headerTitle}>Carts Product Manager</h1>
        <button className={styles.loginBtn}>Login</button>
      </div>
      <nav className={styles.navigation}>
        <NavLink to="/" end className={linkActive}>
          Home
        </NavLink>
        <NavLink to="/carts" className={linkActive}>
          Carts
        </NavLink>
        <NavLink to="/users" className={linkActive}>
          Users
        </NavLink>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className={styles.footer}>
      <p>Country: Ukraine City: Zaporizhzha Street: Miru av.</p>
    </footer>
  );
}

export default BasePage;
