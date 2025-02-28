import React from 'react'
import { useContext } from 'react';
import { ShopContext } from '../../context/ShopContext';
import { Product } from '../../entities';

 const CartItem = ({data}:{data: Product}) => {

    const {id, title, price, image } = data;

    const context = useContext(ShopContext);

    if(! context ) {
      throw new Error('ShopContext must be used within a ShopContextProvider');
     }

    const {cartItems, AddToCart, removeFromCart} = context;

    let priceTotal = cartItems[id] * price;

    return (
    <div className='cartItem'>
       <img src={image} alt="" /> 
       <div className='description'>
        <p>
            <b>{title}</b>
        </p>
        <p>${priceTotal}</p>
        <div className="countHandler">
          <div className="btn-remove" onClick={() => removeFromCart(id)}> - </div>
          <input
            value={cartItems[id]}
          />
          <div className="btn-add" onClick={() => AddToCart(id)}> + </div>
        </div>
    </div>
    </div>
  )
}


export default CartItem;