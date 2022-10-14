import { useContext } from "react";
import { ProductContext } from "../../context/ProductContext";
import { ProductCard } from "../product-card/ProductCard.component";
import "./Shop.styles.scss";

function Shop() {
  const { products } = useContext(ProductContext);

  return (
    <div className="products-container">
      {products.map((product) => {
        return <ProductCard key={product.id} product={product}></ProductCard>;
      })}
    </div>
  );
}

export default Shop;
