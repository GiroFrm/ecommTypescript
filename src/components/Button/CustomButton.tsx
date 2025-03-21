import React from 'react'
import styles from './CustomButton.module.css';
import { MouseEventHandler } from 'react';

type CustomButtonProps ={
    disable: boolean,
    type: 'submit' | 'reset' | 'button',
    onClick?: MouseEventHandler<HTMLButtonElement>;
    title: string,
    test?: string
}
export const CustomButton: React.FC<CustomButtonProps> = (
   { 
    disable,
    type, 
    onClick, 
    title, 
    test 
    }
) => {
  return (
    <button
     data-testid={test ? test: undefined}
     className={styles.btn}
     onClick={onClick}
     type={type}
     disabled={disable}
    >
     {title}
    </button>
  )
}
