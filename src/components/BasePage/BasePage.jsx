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
  return (
    <header>
      <div className={styles.header}>
        <button className={styles.burgerBtn}>
          <i class="fa-solid fa-bars"></i>
        </button>
        <h1 className={styles.headerTitle}>Carts Product Manager</h1>
        <button className={styles.loginBtn}>Login</button>
      </div>
      <nav className={styles.navigation}>
        <NavLink to="/" className={styles.link}>
          Home
        </NavLink>
        <NavLink to="/carts" className={styles.link}>
          Carts
        </NavLink>
        <NavLink to="/users" className={styles.link}>
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
