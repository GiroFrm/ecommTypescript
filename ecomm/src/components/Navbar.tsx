
import { Link } from 'react-router-dom'
import  styles from  './Navbar.module.css';

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.links}>
      <Link to="/">Shop</Link>
       <Link to="/cart">Cart</Link>
       </div>
    </div>
  )
}

export default Navbar