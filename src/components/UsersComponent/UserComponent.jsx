import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { getUsers } from "../../api";
import styles from "./UserComponent.module.scss";

function UserComponent() {
  const [users, setUsers] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);

  const path = useLocation().pathname;

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch((e) => setError(e))
      .finally(() => setIsFetching(false));
  }, []);

  return (
    <>
      {error && <div>!!!ERROR!!! {JSON.stringify(error)}</div>}
      {isFetching && <div>Loading. Please waite...</div>}
      {!error && !isFetching && (
        <main className="page">
          <nav className={styles.usersContainer}>
            {users.map((user) => (
              <NavLink
                to={`${path}/${user.id}`}
                key={user.id}
                className={styles.userItem}
              >
                <img
                  src={user.image}
                  alt={user.firstName}
                  className={styles.userImg}
                />
                <p>
                  {user.firstName} {user.lastName}
                </p>
              </NavLink>
            ))}
          </nav>
        </main>
      )}
    </>
  );
}

export default UserComponent;
