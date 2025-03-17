import React, { useContext } from "react";
import { ShopContext } from "../../context/ShopContext";
import Cart from "../Cart/Cart";
import Login from "../Login/Login";

const CartAccess = () => {
  const context = useContext(ShopContext);

  if (!context) {
    throw new Error("ShopContext must be used within a ShopContextProvider");
  }

  const { isLoged } = context;

  return (
    <>
      {isLoged ? <Cart /> : <Login />}
    </>
  );
};

export default CartAccess;
