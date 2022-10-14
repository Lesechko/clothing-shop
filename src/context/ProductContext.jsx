import { useEffect } from "react";
import { createContext, useState } from "react";

export const ProductContext = createContext({
  products: [],
  setCurrentUser: () => null,
});

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3004/goods")
      .then((response) => response.json())
      .then((response) => setProducts(response));
  }, []);

  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
};
