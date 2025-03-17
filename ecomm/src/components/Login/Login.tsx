import { useEffect, useState, useRef, MouseEvent } from "react"
import{BrowserRouter, useNavigate, Link} from 'react-router-dom';
import styles from './Login.module.css';
import CustomInput from "../Input/CustomInput";
import { CustomButton } from "../Button/CustomButton";
import { useContext } from "react";
import { ShopContext } from "../../context/ShopContext";
import React from "react";


const Login =()=>{
   const context = useContext(ShopContext);
  
      if(!context ) {
        throw new Error('ShopContext must be used within a ShopContextProvider');
       }
       const { setLogin } = context;

   const emailRef = React.createRef<HTMLInputElement>();
   const passwordRef = useRef<HTMLInputElement>(null);
   const history = useNavigate();

   const handleLogin = async (event: React.FormEvent<HTMLFormElement>)=> {
        event.preventDefault();

    if(emailRef.current && passwordRef.current) {
        try{
           const response =  await fetch('http://localhost:3000/signin',{
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
            email: emailRef.current.value,
            password: passwordRef.current.value
           })
         })
         if(! response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
         }
         const data = await response.json();
         console.log(data)
         if(data){
            history('/cart') 
         }
         
        }catch(error) {
         console.error('Error during sign-in:', error);
        }
     }
    }

    
    
    return (
        <div>
            <h1>test</h1>
            <p>
                ot the the login system use the follow
            email: 'anto@gmail.com',
            password: 'anto'
            </p>
           <form id="form" className={styles.form} onSubmit={handleLogin} style={{display:'grid', placeContent:'center'}}>
            <CustomInput 
             type="text" 
             name="email"
             placeHolder="email"
             data-testid="email-input"
             inputRef={emailRef}
             required

            />
             <CustomInput 
             type="password" 
             name="password"
             placeHolder="password"
             inputRef={passwordRef}
             required
            />
           <CustomButton disable={false} type={"submit"} title={"Log In"} onClick={setLogin}/>
           <div className={styles.link}>
           Don&apos;t have an account?
           <Link to="/signup">
               SignUp
           </Link>
           </div>
           </form>
        </div>
    )
}

export default Login