
import { Link } from 'react-router-dom'
import  styles from  './Navbar.module.css';
import { useContext } from 'react';
import { ShopContext } from '../../context/ShopContext';
import { SlBasket } from "react-icons/sl";

 
const Navbar = () => {

   const context = useContext(ShopContext);

    if(!context ) {
      throw new Error('ShopContext must be used within a ShopContextProvider');
     }
     const { getTotalCartItems, isLoged, setLogin } = context;

    const totalItems = getTotalCartItems();

    // const isLogOut = ()=>{
    //   if(isLoged) {
    //     setLogin()
    //   }
    // }

  return (
    <div className={styles.navbar}>
      <div className={styles.links}>
      <Link to="/">Shop</Link>
       <Link to="/cart"><div className={styles.cartIcon}><SlBasket size={35}/>{totalItems}</div></Link>
           {/* <Link to="/login" onClick={isLogOut}>
                   {isLoged ? <p>Log Out</p>:<p>Log In</p>}
                   </Link> */}
       </div>
    </div>
  )
}

export default Navbar