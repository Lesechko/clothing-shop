import { useEffect } from "react";
import { createContext, useState } from "react";
import { getCollectionAndDocuments } from "../utils/firebase/firebase.utils";

export const CategoriesContext = createContext({
  categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});

  useEffect(() => {
    getCollectionAndDocuments().then((categoriesMap) =>
      setCategoriesMap(categoriesMap)
    );
  }, []);

  const value = { categoriesMap };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
