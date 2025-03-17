import { it, expect, describe, beforeEach, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import React from 'react';
import Login from '../../src/components/Login/Login.tsx'; 
import { ShopContext } from '../../src/context/ShopContext';
import { BrowserRouter } from 'react-router-dom';



const createMockShopContext = (overrides = {}) => ({
    cartItems: {},
            products: [],
            getTotalCartAmount: () => 0,
            checkout: vi.fn(),
            AddToCart: vi.fn(),
            removeFromCart: vi.fn(),
            updateCartItemCount: vi.fn(),
            getTotalCartItems: vi.fn(),
            setLogin: vi.fn(),
            isLoged: false,
            ...overrides,
})

describe('Login Component', ()=>{
    const mockSetLogin = vi.fn();
  const mockNavigate = vi.fn();

    const renderLogin = () =>
        render(
          <ShopContext.Provider value={createMockShopContext()}>
            <BrowserRouter>
              <Login />
            </BrowserRouter>
          </ShopContext.Provider>
        );

      
    it('should render the login component',async ()=>{
        renderLogin();

    const form =  screen.getByRole('textbox');
    expect(form).toBeInTheDocument();
    expect(screen.queryByPlaceholderText('email')).toBeInTheDocument();
    expect(screen.queryByPlaceholderText('password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Log In' })).toBeInTheDocument();
    expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'SignUp' })).toBeInTheDocument();
  
  })

//   it('handles successful login', async () => {
//     global.fetch = vi.fn().mockResolvedValue(
//         Promise.resolve({
//           ok: true,
//           json: () => Promise.resolve({ success: true }),
//         })
//       ) 

//     renderLogin();

//     fireEvent.change(screen.getByPlaceholderText('email'), {
//       target: { value: 'anto@gmail.com' },
//     });
//     fireEvent.change(screen.getByPlaceholderText('password'), {
//       target: { value: 'anto' },
//     });
//     fireEvent.click(screen.getByRole('button', { name: 'Log In' }));

//     expect(screen.getByPlaceholderText("email")).toHaveValue("anto@gmail.com");
//     expect(screen.getByPlaceholderText("password")).toHaveValue("anto");

//     // await waitFor(() => {
//     //     expect(global.fetch).toHaveBeenCalled();
//     //   });

//   });

  

    });

    