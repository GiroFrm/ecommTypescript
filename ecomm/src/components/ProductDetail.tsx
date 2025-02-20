import React,{useContext} from 'react'
import { Product } from '../entities';
import { ShopContext } from '../context/ShopContext';
import '../pages/shop/Shop.css'

const ProductDetail = ({data}:{data:Product}) => {

  const {id, title, price, image} = data;

  const context = useContext(ShopContext);

  if(!context ) {
    throw new Error('ShopContext must be used within a ShopContextProvider');
   }

  const{ AddToCart, cartItems }= context;
  
  const cartItemsCount = cartItems[id];

  return (
    <div className='product'>
        <img src={image} alt="" />
        <div className='description'>
            <p>
                {" "}
                <b>{title}</b>
            </p>
            <p>${price}</p>
        </div>
        <button className='addToCartBttn' onClick={()=>AddToCart(id)}>AddToCart {cartItemsCount}</button>
        
        </div>
  )
}

export default ProductDetail;


