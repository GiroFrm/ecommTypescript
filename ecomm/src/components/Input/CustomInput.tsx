import React from 'react'
import { RefObject } from 'react';
import styles from './CustomInput.module.css'
;
type CustomInputProps = {
    type: string;
    name: string;
    placeHolder: string;
    inputRef?: RefObject<HTMLInputElement | null>
    test?:string
    required?: boolean
}
const CustomInput: React.FC<CustomInputProps> = (
    {type,
    name,
    placeHolder,
    inputRef,
    test,
    required,
    }
   ) => {


  return (
    <div> 
    <input 
    className={styles.inp}
    type={type}
    name={name}
    placeholder={placeHolder}
    ref={inputRef}
    required={required}
    data-testid={test}
    
    
   
   />
   </div>
  )
}

export default CustomInput