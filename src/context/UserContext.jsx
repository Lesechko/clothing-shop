import { useEffect } from "react";
import { createContext, useReducer } from "react";
import {
  onAuthChangedListener,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";
import { createAction } from "../utils";

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const USER_ACTIONS_TYPE = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
};

const INITIAL_STATE = {
  currentUser: null,
};

const userReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTIONS_TYPE.SET_CURRENT_USER:
      return {
        currentUser: payload,
      };

    default:
      throw new Error(`Unhandled type ${type} in UserReducer`);
  }
};

export const UserProvider = ({ children }) => {
  const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);
  console.log({ currentUser });
  const setCurrentUser = (user) =>
    dispatch(createAction(USER_ACTIONS_TYPE.SET_CURRENT_USER, user));

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
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
