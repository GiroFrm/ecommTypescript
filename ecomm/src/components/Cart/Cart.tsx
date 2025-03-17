import { useContext } from "react";
import { ShopContext } from "../../context/ShopContext";
import CartItem from "./CartItem.tsx";
import { useNavigate } from "react-router-dom";
import styles from "./cart.module.css";
import Login from "../Login/Login";

const Cart = () => {
  const context = useContext(ShopContext);

  if (!context) {
    throw new Error("ShopContext must be used within a ShopContextProvider");
  }

  const {
    cartItems,
    products,
    getTotalCartAmount,
    getTotalCartItems,
    checkout,
    isLoged
  } = context;

  const totalAmount = getTotalCartAmount();
  const totalItems = getTotalCartItems();
  const navigate = useNavigate();

  return (
    <div className={styles.cart}>
      <div className={styles.productsContainer}>
        {products.map((product) => {
          if (cartItems[product.id]) {
            return <CartItem key={product.id} data={product} />;
          }
        })}
      </div>

      {totalAmount > 0 ? (
        <div className={styles.checkout}>
          <div className={styles.flexGroup}>
            <p>{totalItems} items</p>
            <p>${totalAmount}</p>
          </div>
          <div className={styles.flexGroup} role="region" aria-label="Subtotal">
            <p>Subtotal</p>
            <p>${totalAmount} </p>
          </div>
          <div className={styles.flexGroup}>
            <p>Estimate delivery</p>
            <p>FREE</p>
          </div>

          <button
            onClick={() => {
              checkout();
              navigate("/");
            }}
          >
            {" "}
            Checkout{" "}
          </button>
          <button onClick={() => navigate("/")}>Continue Shopping</button>
        </div>
      ) : (
        <div style={{ textAlign: "center", width: "100%" }}>
          <h1> Your Shopping Cart is Empty</h1>
          <button onClick={() => navigate("/")}>Continue Shopping</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
