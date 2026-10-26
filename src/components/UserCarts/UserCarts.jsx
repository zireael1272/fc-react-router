import { useParams } from "react-router-dom";
import { getUserCarts } from "../../api";
import { useEffect, useState } from "react";
import styles from "./UserCarts.module.scss";

function UserCarts() {
  const { id } = useParams();
  const [carts, setCarts] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    setIsFetching(true);
    setError(null);

    getUserCarts(id)
      .then((data) => {
        if (!cancelled) setCarts(data);
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
      {!isFetching && !error && carts.length === 0 && (
        <p className={styles.emptyMessage}>
          This user does not have an active shopping cart
        </p>
      )}
      {isFetching && <div>Loading. Please waite...</div>}

      {carts.map((cart) => (
        <div key={cart.id} className={styles.cartContainer}>
          <p className={styles.cartTitle}>Cart list:</p>
          <ul>
            {cart.products.map((product) => (
              <li key={product.id}>
                {product.title} — {product.quantity} item. × ${product.price}
              </li>
            ))}
          </ul>
          <p>All products: {cart.totalProducts}</p>
          <p>Sum: ${cart.total}</p>
        </div>
      ))}
    </>
  );
}

export default UserCarts;
