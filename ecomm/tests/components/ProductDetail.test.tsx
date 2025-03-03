import { it, expect, describe, vi, beforeEach } from 'vitest';
import Product from '../../src/pages/shop/ProductDetail';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { ShopContext, ShopContextProvider } from '../../src/context/ShopContext';
import ProductDetail from '../../src/pages/shop/ProductDetail';

describe('ProductDetail', () => {
  const mockAddToCart = vi.fn();
  const mockCartItems = { 1: 2 }; // Example cart items with product ID 1 and count 2
  
  const mockContextValue = {
    AddToCart: mockAddToCart,
    cartItems: mockCartItems,
    removeFromCart: vi.fn(),
    updateCartItemCount: vi.fn(),
    getTotalCartAmount: vi.fn(),
    getTotalCartItems:vi.fn(),
    checkout: vi.fn(),
    products: [],
  };

  const product = {  id: 1,
    title: "product1",
    price: 29.00,
    description: "pproduct test",
    category: "test category",
    image: "wwww.image.com",
    rating: {
      rate: 5,
      count: 23,
    }} 
    
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
  
    it('should render a product details', () => {
     renderWithContext(<Product data={product}/>)

    expect(screen.getByText('product1')).toBeInTheDocument();
    expect(screen.getByText('$29')).toBeInTheDocument();
    expect(screen.getByAltText('')).toBeInTheDocument();
    })

    it('renders add to cart button with correct count', ()=>{
        renderWithContext(<Product data={product}/>)

         const addTocartButton = screen.getByText('AddToCart 2')
         expect(addTocartButton).toBeInTheDocument();
        })

    it('calls Addtocart with product id when button is clicked', ()=>{
        renderWithContext(<Product data={product}/>)

        const addTocartButton = screen.getByText('AddToCart 2');
        fireEvent.click(addTocartButton);

        expect(mockAddToCart).toHaveBeenCalledWith(1);
    })
})