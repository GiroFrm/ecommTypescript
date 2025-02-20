import React from 'react'
import { useContext } from 'react';
import { ShopContext } from '../../context/ShopContext';
import { Product } from '../../entities';

export const CartItem = ({data}:{data: Product}) => {

    const {id, title, price, image } = data;

    const context = useContext(ShopContext);

    if(! context ) {
      throw new Error('ShopContext must be used within a ShopContextProvider');
     }

    const {cartItems, AddToCart, removeFromCart} = context;

    return (
    <div className='cartItem'>
     {" "}
       <img src={image} alt="" /> 
       <div className='description'>
        <p>
            {" "}
            <b>{title}</b>
        </p>
        <p>${price}</p>
        <div className="countHandler">
          <button onClick={() => removeFromCart(id)}> - </button>
          <input
            value={cartItems[id]}
          />
          <button onClick={() => AddToCart(id)}> + </button>
        </div>
    </div>
    </div>
  )
}
