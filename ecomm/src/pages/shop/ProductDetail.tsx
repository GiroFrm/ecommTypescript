import React,{useContext} from 'react'
import { Product } from '../../entities';
import { ShopContext } from '../../context/ShopContext';
import styles from './Shop.module.css'

const ProductDetail = ({data}:{data:Product}) => {

  const {id, title, price, image} = data;

  const context = useContext(ShopContext);

  if(!context ) {
    throw new Error('ShopContext must be used within a ShopContextProvider');
   }

  const{ AddToCart, cartItems }= context;
  
  const cartItemsCount = cartItems[id];

  return (
    <div className={styles.product}>
      <div className={styles.imgContainer}>
        <img src={image} alt="" />
        </div>
        <div className={styles.description}>
            <p>
                {" "}
                {title}
            </p>
            <p className={styles.price}>${price}</p> 
        </div>
        <button className={styles.addToCartBttn} onClick={()=>AddToCart(id)}>AddToCart {cartItemsCount}</button>
        
      </div>
  )
}

export default ProductDetail;


