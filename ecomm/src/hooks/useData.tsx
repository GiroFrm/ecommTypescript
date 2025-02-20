import { useEffect, useState } from "react";
import { Product } from "../entities";
import axios,{AxiosError} from "axios";
  
  interface UseDataResult {
    products: Product[];
    loading: boolean;
    error: string | null;
  }

  const fetchProduct = async (): Promise<Product[]> => {
    const { data } = await axios.get<Product[]>(
      `https://fakestoreapi.com/products`
    );
    return data;
  }

export const useData = (): UseDataResult => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading]  = useState<boolean>(true);
  const [error, setError] = useState<string|null>(null);


  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
     try{
      const  data  = await fetchProduct();
      setProducts(data);
    }catch(error) {
      const axiosError = error as AxiosError;
      setError(axiosError.message);
    }finally {
      setLoading(false);
    }
}
    fetchData();
  }, []);

  return { products, loading, error };
};
