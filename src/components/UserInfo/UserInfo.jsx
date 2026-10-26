import { useParams } from "react-router-dom";
import { getUserById } from "../../api";
import { useEffect, useState } from "react";
import styles from "./UserInfo.module.scss";

function UserInfo() {
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

  return (
    <>
      {error && <div>!!!ERROR!!! {JSON.stringify(error)}</div>}
      {isFetching && <div>Loading. Please waite...</div>}
      {user && (
        <>
          <div className={styles.infoContainer}>
            <div>
              <p>Gender: {user.gender}</p>
              <p>Phone: {user.phone}</p>
              <p>Age: {user.age}</p>
            </div>

            <div>
              <p>Email: {user.email}</p>
              <p>
                Address: st. {user.address.state}, c. {user.address.city},{" "}
                {user.address.address}
              </p>
              <p>
                Company: dep. {user.company.department}, "{user.company.name}"
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default UserInfo;
