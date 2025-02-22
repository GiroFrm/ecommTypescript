import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import "@testing-library/jest-dom/vitest"
import { it, expect, describe, vi, beforeEach } from 'vitest';
import Cart from '../../src/pages/cart/Cart'
import React from 'react';
import { ShopContext } from '../../src/context/ShopContext';
import { Product } from '../../src/entities';
import { useNavigate } from 'react-router-dom';


const mockProducts = [{  id: 1,
        title: "product1",
        price: 29.00,
        description: "pproduct test",
        category: "test category",
        image: "wwww.image.com",
        rating: {
          rate: 5,
          count: 23,
        }
    },
      {  id: 2,
            title: "product2",
            price: 29.00,
            description: "pproduct test2",
            category: "test category",
            image: "wwww.image2.com",
            rating: {
              rate: 3,
              count: 22,
            }
          }]
  

  
  vi.mock('react-router-dom', () => {
    const mockNavigate = vi.fn();
    return {
      useNavigate: () => mockNavigate,
    };
  });
  
  vi.mock('../../src/pages/cart/CartItem', () => {
    return {
      default: ({ data }: { data: Product }) => ( // Type the data prop
        <div data-testid={`cart-item-${data.id}`}>{data.title} - ${data.price}</div>
      ),
    };
  });
  
  describe('Cart Component', () => {
   
    it('renders empty cart message when cart is empty', () => {
      render(
        <ShopContext.Provider
          value={{
            cartItems: {},
            products: mockProducts,
            getTotalCartAmount: () => 0,
            checkout: vi.fn(),
            AddToCart: vi.fn(),
            removeFromCart: vi.fn(),
            updateCartItemCount: vi.fn()
          }}
        >
          <Cart />
        </ShopContext.Provider>
      );
  
      expect(screen.getByRole('heading', { name: /Your Shopping Cart is Empty/i })).toBeInTheDocument();
    });
  
    it('renders cart items when cart is not empty', () => {
      const mockCartItems = { 1: 1, 2: 2 }; // Type the mockCartItems
      render(
        <ShopContext.Provider
          value={{
            cartItems: mockCartItems,
            products: mockProducts,
            getTotalCartAmount: () => 50,
            checkout: vi.fn(),
            AddToCart: vi.fn(),
            removeFromCart: vi.fn(),
            updateCartItemCount: vi.fn()
          }}
        >
          <Cart />
        </ShopContext.Provider>
      );
  
      expect(screen.getByTestId('cart-item-1')).toBeInTheDocument();
      expect(screen.getByTestId('cart-item-2')).toBeInTheDocument();
    });
  
    it('calculates and displays total amount', () => {
        const mockCartItems = { 1: 1, 2: 2 };
      render(
        <ShopContext.Provider
          value={{
            cartItems: mockCartItems,
            products: mockProducts,
            getTotalCartAmount: () => 50,
            checkout: vi.fn(),
            AddToCart: vi.fn(),
            removeFromCart: vi.fn(),
            updateCartItemCount: vi.fn()
          }}
        >
          <Cart />
        </ShopContext.Provider>
      );
      expect(screen.getByText(/Subtotal: \$50/)).toBeInTheDocument();
    });
  
    it('navigates to home when "Continue Shopping" button is clicked', () => {
        const mockCartItems = { 1: 1, 2: 2 };
      render(
        <ShopContext.Provider
          value={{
            cartItems: mockCartItems,
            products: mockProducts,
            getTotalCartAmount: () => 50,
            checkout: vi.fn(),
            AddToCart: vi.fn(),
            removeFromCart: vi.fn(),
            updateCartItemCount: vi.fn()
          }}
        >
          <Cart />
        </ShopContext.Provider>
      );
      const continueShopping = screen.getByRole('button',{name: /Continue Shopping/i})
      fireEvent.click(continueShopping);
  
      expect(useNavigate()).toHaveBeenCalledWith('/');
    });
  
    it('calls checkout and navigates to checkout page when "Checkout" button is clicked', () => {
        const mockCartItems = { 1: 1, 2: 2 };
        const mockCheckout = vi.fn();
  
      render(
        <ShopContext.Provider
          value={{
            cartItems: mockCartItems,
            products: mockProducts,
            getTotalCartAmount: () => 50,
            checkout: mockCheckout,
            AddToCart: vi.fn(),
            removeFromCart: vi.fn(),
            updateCartItemCount: vi.fn()
          }}
        >
          <Cart />
        </ShopContext.Provider>
      );
  
      fireEvent.click(screen.getByText('Checkout'));
  
      expect(mockCheckout).toHaveBeenCalledTimes(1);
      expect(useNavigate()).toHaveBeenCalledWith('/checkout');
    });
  
    it('throws error if ShopContext is not available', () => {
      expect(() => render(<Cart />)).toThrowError('ShopContext must be used within a ShopContextProvider');
    });
  });
  