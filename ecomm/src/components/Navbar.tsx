
import { Link } from 'react-router-dom'
import  styles from  './Navbar.module.css';
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { SlBasket } from "react-icons/sl";

const Navbar = () => {

   const context = useContext(ShopContext);
  
    if(!context ) {
      throw new Error('ShopContext must be used within a ShopContextProvider');
     }
     const { getTotalCartItems } = context;

     const totalItems = getTotalCartItems();
  return (
    <div className={styles.navbar}>
      <div className={styles.links}>
      <Link to="/">Shop</Link>
       <Link to="/cart"><div><p className='cart-icon'><SlBasket/><span >{totalItems}</span></p></div></Link>
       </div>
    </div>
  )
}

export default Navbar