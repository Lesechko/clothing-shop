import { useEffect } from "react";
import { createContext, useState } from "react";
import {
  onAuthChangedListener,
  createUserDocumentFromAuth,
} from "../utils/firabase/firabase.utils";

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};
