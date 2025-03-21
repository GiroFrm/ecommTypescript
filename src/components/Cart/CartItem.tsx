import React from 'react'
import { useContext } from 'react';
import { ShopContext } from '../../context/ShopContext';
import { Product } from '../../entities';
import styles from './cart.module.css';

 const CartItem = React.memo(({data}:{data: Product}) => {

    const {id, title, price, image } = data;

    const context = useContext(ShopContext);

    if(! context ) {
      throw new Error('ShopContext must be used within a ShopContextProvider');
     }

    const {cartItems, AddToCart, removeFromCart} = context;

    let priceTotal = cartItems[id] * price;

    return (
    <div className={styles.cartItem}>
      <div>
       <img src={image} alt="" /> 
       </div>
       <div className={styles.description}>
        <p>
            <b>{title}</b>
        </p>
        <p>${priceTotal}</p>
        <div className={styles.countHandler}>
          <div className={styles.btnRemove} onClick={() => removeFromCart(id)}> - </div>
          <input
            value={cartItems[id]}
          />
          <div className={styles.btnAdd} onClick={() => AddToCart(id)}> + </div>
        </div>
    </div>
    </div>
  )
}
 )


export default CartItem;