import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import "@testing-library/jest-dom/vitest"
import { it, expect, describe, vi, beforeEach } from 'vitest';
import CartItem from '../../src/pages/cart/CartItem';
import React from 'react';
import { ShopContext } from '../../src/context/ShopContext';
import Cart from '../../src/pages/cart/Cart';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../src/entities';



describe('CartItem component', () => {

  const createMockShopContext = (overrides = {}) => ({
    products: mockProducts,
    cartItems: mockCartItems,
    getTotalCartAmount: () => 0,
    checkout: vi.fn(),
    AddToCart: mockAddToCart,
    removeFromCart: mockRemoveFromCart,
    updateCartItemCount: vi.fn(),
    getTotalCartItems: vi.fn(),
    ...overrides,
  })
  const mockProducts = [{
    id: 1,
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
  {
    id: 2,
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



  const mockRemoveFromCart = vi.fn();
  const mockAddToCart = vi.fn()

  const mockCartItems = { 1: 2 }; // Example cart items with product ID 1 and count 2

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should render product', () => {
    render(
      <ShopContext.Provider
        value={
          createMockShopContext()
        }
      >
        <CartItem data={mockProducts[0]} />
      </ShopContext.Provider>
    )

    expect(screen.getByText('product1')).toBeInTheDocument();
  })

  it('should render countHandler Input with the correct quantity', () => {
    render(
      <ShopContext.Provider
        value={
          createMockShopContext()
        }
      >
        <CartItem data={mockProducts[0]} />
      </ShopContext.Provider>
    )

    const inputCountHandler = screen.getByRole('textbox');
    expect(inputCountHandler).toBeInTheDocument();
    expect(inputCountHandler).toHaveValue('2');
  })

  it('should render countHandler add-to-card button', () => {
    render(
      <ShopContext.Provider
        value={
          createMockShopContext()
        }
      >
        <CartItem data={mockProducts[0]} />
      </ShopContext.Provider>
    )
    const addToCartButton = screen.getByText('+');
    expect(addToCartButton).toBeInTheDocument();
  })

  it('should called addtoCart with product id when button is clicked', () => {
    render(
      <ShopContext.Provider
        value={createMockShopContext()}
      >
        <CartItem data={mockProducts[0]} />
      </ShopContext.Provider>
    )

    const addToCartButton = screen.getByText('+');

    fireEvent.click(addToCartButton);

    expect(mockAddToCart).toHaveBeenCalledWith(mockProducts[0].id);

  })

  it('should called removefromCart with product id when button is clicked', () => {
    render(
      <ShopContext.Provider
        value={
          createMockShopContext()
        }
      >
        <CartItem data={mockProducts[0]} />
      </ShopContext.Provider>
    )
    const addToCartButton = screen.getByText('-');

    fireEvent.click(addToCartButton);

    expect(mockRemoveFromCart).toHaveBeenCalledWith(1);
  })

  it('throws error if ShopContext is not available', () => {
    expect(() => render(<CartItem data={mockProducts[0]} />)).toThrowError(
      'ShopContext must be used within a ShopContextProvider'
    );
  });

  it('displays 0 if item not in cart', () => {
    render(
      <ShopContext.Provider
        value={
          createMockShopContext()
        }
      >
        <CartItem data={mockProducts[0]} />
      </ShopContext.Provider>
    )

    expect(screen.getByRole('textbox')).toHaveValue(undefined);
  });
})


