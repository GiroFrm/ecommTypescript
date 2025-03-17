import {createContext, useState, useMemo, useCallback,ReactNode} from 'react';
import { useData } from '../hooks/useData';
import { Product } from '../entities';
import { approxPrice } from '../utils';

type ShopContextProps = {
    children: ReactNode;
}

type CartItems = {
    [key: string]: number
}

type ShopContextType = {
    cartItems: CartItems;
    AddToCart: (itemId: number) => void;
    removeFromCart: (itemId: number) => void;
    updateCartItemCount: (value: number, itemId: number)=>void;
    getTotalCartAmount: ()=>number;
    getTotalCartItems:()=>number;
    checkout:()=>void;
    products: Product[]; 
    setLogin: ()=> void;
    isLoged:  boolean;
}

export const ShopContext = createContext<ShopContextType | null>(null)

export const ShopContextProvider: React.FC<ShopContextProps | null> = (props: any) => {

    const {products} = useData();
    
      const[cartItems, setCartItems] = useState<CartItems>({ });

      const [isLoged, setIsLoged] = useState<boolean>(false);

      const setLogin = ()=>{
        setIsLoged((prevIsLogged) => !prevIsLogged);
      }

      const AddToCart = useCallback((itemId: number) =>{ 
        //if userId exist acces and increase
          setCartItems((prevItem)=>{
            if(prevItem[itemId]){
             return  {...prevItem, [itemId]: prevItem[itemId]+1 }
            }else {
             return {...prevItem, [itemId]: 1}
            }
      })
      },[])
      
      const removeFromCart = (itemId: number) => {
        setCartItems((prevItem)=>{
          if(prevItem[itemId]) {
            return {...prevItem, [itemId]: prevItem[itemId]-1}
          } else {
            const { [itemId]: _, ...newCart } = prevItem;
            return newCart;
          }
        })
      }

      const getTotalCartAmount = useCallback(() => {
        
        let totalAmount = 0;
        for (const item in cartItems) {
          if (cartItems[item] > 0) {
            let itemInfo = products.find((product) => product.id === Number(item));
              if(itemInfo){
                totalAmount += cartItems[item] * itemInfo.price;
              }
          }
        }
         //approx total to 2 decimal number
        let approxtotal = approxPrice(totalAmount);
        return approxtotal;
    
      },[cartItems]);

      const getTotalCartItems = useCallback(()=>{
        let total = 0;
        for (const item of Object.values(cartItems)) {
          const qnty = Number(item); 
                total += qnty; 
      }
      return total;
    },[cartItems])

     const  updateCartItemCount = useCallback((value: number, itemId: number)=>{
        setCartItems((prevItem)=>({...prevItem, [itemId]: value })  
     )}, [])

     const checkout = () => {
        setCartItems({});
      };

      const contextValue = {
        cartItems, 
        AddToCart, 
        removeFromCart, 
        getTotalCartAmount, 
        updateCartItemCount,
        products,
        checkout,
        getTotalCartItems,
        setLogin,
        isLoged 
      }  
      return <ShopContext.Provider value={contextValue}>{props.children}</ShopContext.Provider>
}


      