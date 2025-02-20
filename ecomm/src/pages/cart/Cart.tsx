import { useContext } from 'react'
import { ShopContext } from '../../context/ShopContext'
import { CartItem } from './CartItem'
import { useNavigate } from 'react-router-dom';
import "./cart.css";

 const Cart = () => {

  const context = useContext(ShopContext);

  if(!context ) {
    throw new Error('ShopContext must be used within a ShopContextProvider');
   }

  const{cartItems, products, getTotalCartAmount, checkout} = context;

  const totalAmount = getTotalCartAmount();

  const navigate = useNavigate();

  return (
    <div>
     {products.map((product)=>{
       if(cartItems[product.id]){
        return <CartItem key={product.id} data={product}/>
       }
      })}

    {totalAmount > 0 ? (
        <div className="checkout">
          <p> Subtotal: ${totalAmount} </p>
          <button onClick={() => navigate("/")}> Continue Shopping </button>
          <button
            onClick={() => {
              checkout();
              navigate("/checkout");
            }}
          >
            {" "}
            Checkout{" "}
          </button>
        </div>
      ) : (
        <h1> Your Shopping Cart is Empty</h1>
      )}
      </div>
  )
}

export default Cart;
