
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css'
import './reset.css';
import Navbar from "./components/Navbar";
import Shop from "./pages/shop/Shop";
import Cart from "./pages/cart/Cart";
import Login from "./pages/login/login";
import { ShopContextProvider } from "./context/ShopContext";

function App() {
 

  return (
      <div>
      <ShopContextProvider>
       <Router>
         <Navbar/>
          <Routes>
            <Route path="/" element={<Shop/>}/>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/login" element={<Login/>}/>
          </Routes>
        </Router> 
        </ShopContextProvider>
    </div>
  )
}

export default App
