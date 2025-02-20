import Product from "./ProductDetail";
import "./Shop.css";
import { useData } from "../../hooks/useData";

const Shop = () => {
  const { products, loading, error } = useData();

  if (loading) return <h1>Loading...</h1>;

  if (error) return <h1>Error: {error}</h1>;

  return (
    <div className="shop">
      <div className="shopTitle">
        <h1>Giro's shop</h1>
      </div>
      <div className="products">
        {" "}
        {products.map((product) => (
          <Product key={product.id} data={product} />
        ))}
      </div>
    </div>
  );
};

export default Shop;
