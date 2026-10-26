import { NavLink, Outlet, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserById } from "../../api";
import styles from "./UserPage.module.scss";

function UserPage() {
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    setIsFetching(true);
    setError(null);
    setUser(null);

    getUserById(id)
      .then((data) => {
        if (!cancelled) setUser(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err);
      })
      .finally(() => {
        if (!cancelled) setIsFetching(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  const linkActive = ({ isActive }) =>
    `${styles.link} ${isActive ? styles.active : ""}`;

  return (
    <main className="page">
      <div className={styles.baseInfo}>
        {error && <div>!!!ERROR!!! {JSON.stringify(error)}</div>}
        {isFetching && <div>Loading. Please waite...</div>}
        {user && (
          <>
            <img
              className={styles.userImg}
              src={user.image}
              alt={`${user.firstName} ${user.lastName}`}
            />
            <p>
              {user.firstName} {user.lastName}
            </p>
          </>
        )}
      </div>
      <nav className={styles.navigation}>
        <NavLink to="." end className={linkActive}>
          Info
        </NavLink>
        <NavLink to="carts" className={linkActive}>
          Cart
        </NavLink>
      </nav>

      <Outlet />
    </main>
  );
}

export default UserPage;
