import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom/vitest"
import { it, expect, describe, vi, beforeEach } from 'vitest';
import Shop from '../../src/pages/shop/Shop.tsx';
import { ShopContextProvider } from '../../src/context/ShopContext.tsx';
import {useData} from '../../src/hooks/useData.tsx'
import React from 'react';

vi.mock('../../src/hooks/useData', () => ({
  useData: vi.fn()
}))

describe('Shop Component', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });
    it('should renders products', () => {
        const mockProducts = [
          { id: 1, title: 'Product 1', price: 100 },
          { id: 2, title: 'Product 2', price: 200 },
        ];
        (useData as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ products: mockProducts, loading: false, error: null });
 
        render(
        <ShopContextProvider>
           <Shop />
        </ShopContextProvider>
      
      );
        
        expect(screen.getByText("Giro's shop")).toBeInTheDocument();
        expect(screen.getByText('Product 1')).toBeInTheDocument();
        expect(screen.getByText('Product 2')).toBeInTheDocument();
      });

      it('should render loading... if products arent displayed ', () => {
        (useData as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ products:[], loading: true, error: null });
 
        render(
        <ShopContextProvider>
           <Shop />
        </ShopContextProvider>
        )
        expect(screen.getByText('Loading...')).toBeInTheDocument();
        expect(screen.queryByText("Giro's shop")).not.toBeInTheDocument();

      })

      it('should render Error state ', () => {
        (useData as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ products:[], loading: false, error: 'error' });
 
        render(
        <ShopContextProvider>
           <Shop />
        </ShopContextProvider>
        )
        expect(screen.getByText('Error: error')).toBeInTheDocument();
        expect(screen.queryByText("Giro's shop")).not.toBeInTheDocument();
      })

    });
    