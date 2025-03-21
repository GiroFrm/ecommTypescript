
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css'
import './reset.css';
import Navbar from "./components/Navbar/Navbar";
import { ShopContextProvider } from "./context/ShopContext";
import SignUp from "./components/SignUp/SignUp";
import { CartPage } from "./pages/CartPage";
import { ShopPage } from "./pages/ShopPage";
import LoginPage from "./pages/LoginPage";

function App() {
 

  return (
      <div>
      <ShopContextProvider>
       <Router>
         <Navbar/>
          <Routes>
            <Route path="/" element={<ShopPage/>}/>
            <Route path="/cart" element={<CartPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/signup" element={<SignUp/>}/>
          </Routes>
        </Router> 
        </ShopContextProvider>
    </div>
  )
}

export default App
