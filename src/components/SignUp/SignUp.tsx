import React, { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styles from './SignUp.module.css'
import CustomInput from '../Input/CustomInput';
import { CustomButton } from '../Button/CustomButton';

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
                 name:nameRef.current.value,
                 password: passwordRef.current.value,
             
              })
             
             })
              history('/cart') 

         }catch(error){
             console.error('Error during sign-Up:', error);
            }
        }
    }


  return (
    <div className={styles.main}>
    <form className={styles.form} onSubmit={handleReg}>
            <CustomInput 
            type={'text'} 
            name={'email'} 
            placeHolder={'email'}
            inputRef={emailRef}
            required/>
             <CustomInput  
             type={'text'}
             name={'name'}
             placeHolder={'name'}
             inputRef={nameRef}
             required
            />
             <CustomInput 
             type="password" 
             name="password"
             placeHolder="password"
             inputRef={passwordRef}
             required
            />
           <CustomButton disable={false} type={'submit'} title={'Sign Up'}/>
           <div className={styles.link}>
           Already have an account?
           <Link to="/login">
            Log in
           </Link>
           </div>
          
           </form>
       
    </div>
  )
}

export default SignUp


