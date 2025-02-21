import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import "@testing-library/jest-dom/vitest"
import { it, expect, describe, vi, beforeEach } from 'vitest';
import CartItem from '../../src/pages/cart/CartItem';
import React from 'react';
import { ShopContext } from '../../src/context/ShopContext';
import {BrowserRouter as Router, useNavigate } from 'react-router-dom';



describe('CartItem component', () => {

    const productMock = {  id: 1,
        title: "product1",
        price: 29.00,
        description: "pproduct test",
        category: "test category",
        image: "wwww.image.com",
        rating: {
          rate: 5,
          count: 23,
        }} 
        const mockRemoveFromCart = vi.fn();
    
        const mockAddToCart = vi.fn()
           
    
          const mockCartItems = { 1: 2 }; // Example cart items with product ID 1 and count 2
          
          const mockContextValue = {
            AddToCart: mockAddToCart,
            cartItems: mockCartItems,
            removeFromCart: mockRemoveFromCart,
            updateCartItemCount: vi.fn(),
            getTotalCartAmount: vi.fn(),
            checkout: vi.fn(),
            products: [],
          };
           beforeEach(() => {
              vi.resetAllMocks();
            });
             
            const renderWithContext = (ui: React.ReactElement) => {
              return render(
                <ShopContext.Provider value={mockContextValue}>
                  {ui}
                </ShopContext.Provider>
              );
            };




    it('should render product', () => {
        renderWithContext(<CartItem data={productMock}/>)

        expect(screen.getByText('product1')).toBeInTheDocument();
    })

    it('should render countHandler Input with the correct quantity', () => {
        renderWithContext(<CartItem data={productMock}/>)
        
        const inputCountHandler = screen.getByRole('textbox');
        expect(inputCountHandler).toBeInTheDocument();
        expect(inputCountHandler).toHaveValue('2');
    })

    it('should render countHandler add-to-card button', () => {
        renderWithContext(<CartItem data={productMock}/>)

        const addToCartButton = screen.getByText('+');
        expect(addToCartButton).toBeInTheDocument();
    })

    it('should called addtoCart with product id when button is clicked', ()=>{
        renderWithContext(<CartItem data={productMock}/>)

        const addToCartButton = screen.getByText('+');
       
    
        fireEvent.click(addToCartButton);

        expect(mockAddToCart).toHaveBeenCalledWith(1);

    })

    it('should called removefromCart with product id when button is clicked', ()=>{
        renderWithContext(<CartItem data={productMock}/>)

        const addToCartButton = screen.getByText('-');

        fireEvent.click(addToCartButton);

        expect(mockRemoveFromCart).toHaveBeenCalledWith(1);
    })
})