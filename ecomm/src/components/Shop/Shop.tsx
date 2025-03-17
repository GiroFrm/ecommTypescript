import ProductDetail from "./ProductDetail.tsx";
import styles from "./Shop.module.css";
import { useData } from "../../hooks/useData";



const Shop = () => {
  const { products, loading, error } = useData();

  if (loading) return(
  <div className={styles.spinnerContainer}>
     <div className={`${styles.spinner} ${styles.shop}`}></div>
  </div>
);

  if (error) return <h1>Error: {error}</h1>;

  return (
    <div className={styles.shop}>
      <h1 className={styles.title}>Our  Products</h1>
      <div className={styles.products}>
        {" "}
        {products.map((product) => (
          <ProductDetail key={product.id} data={product} />
        ))}
      </div>
    </div>
  );
};

export default Shop;
