import React, { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const SignUp = () => {

    const emailRef = useRef<HTMLInputElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const history = useNavigate();

    const  handleReg = async(event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        
        if(emailRef.current && passwordRef.current && nameRef.current) {
        try{
         await fetch('http://localhost:3000/register',{
                 method: 'post',
                 headers: {'Content-Type': 'application/json'},
                 body: JSON.stringify({
                 email: emailRef.current.value,
                 password: emailRef.current.value,
                 name:emailRef.current.value
              })
             
             })
              history('/cart') 

         }catch(error){
             console.error('Error during sign-Up:', error);
            }
        }
    }


  return (
    <div>
  <form onSubmit={handleReg} style={{display:'grid', placeContent:'center'}}>
            <input 
             type="text" 
             name="email"
             placeholder="email"
             ref={emailRef}
             required
            />
             <input 
             type="text" 
             name="name"
             placeholder="name"
             ref={nameRef}
             required
            />
             <input 
             type="password" 
             name="password"
             placeholder="password"
             ref={passwordRef}
             required
            />
           <input type="submit" value="Sign Up"/>
           <Link to="/login">
            Log in
           </Link>
           </form>
       
    </div>
  )
}

export default SignUp


