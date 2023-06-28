import { createContext, useReducer } from "react";
import { createAction } from "../utils";

const addCartItem = (cartItems, productToAdd) => {
  let exestingCartItem = cartItems.find((item) => item.id === productToAdd.id);

  if (exestingCartItem) {
    return cartItems.map((item) => {
      if (item.id === productToAdd.id) {
        return { ...item, quantity: item.quantity + 1 };
      }

      return item;
    });
  } else {
    return [...cartItems, { ...productToAdd, quantity: 1 }];
  }
};

const removeCartItem = (cartItems, productToRemove) => {
  let exestingCartItem = cartItems.find(
    (item) => item.id === productToRemove.id
  );

  if (exestingCartItem.quantity === 1) {
    return cartItems.filter((item) => item.id !== productToRemove.id);
  }

  return cartItems.map((item) => {
    if (item.id === productToRemove.id) {
      return { ...item, quantity: item.quantity - 1 };
    }

    return item;
  });
};

const clearCartItem = (cartItems, productToClear) =>
  cartItems.filter((item) => item.id !== productToClear.id);

export const CartContext = createContext({
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
  setIsCartOpen: () => {},
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
});

export const CART_ACTIONS_TYPE = {
  SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
  SET_CART_ITEMS: "SET_CART_ITEMS",
};

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTIONS_TYPE.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };
    case CART_ACTIONS_TYPE.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    default:
      throw new Error(`Unhandled type ${type} in CartReducer`);
  }
};

export const CartProvider = ({ children }) => {
  const [{ isCartOpen, cartItems, cartCount, cartTotal }, dispatch] =
    useReducer(cartReducer, INITIAL_STATE);

  const setIsCartOpen = (isCartOpen) =>
    dispatch(createAction(CART_ACTIONS_TYPE.SET_IS_CART_OPEN, isCartOpen));

  const updateNewCartItemsReducer = (cartItems) => {
    const cartTotal = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    const cartCount = cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );

    dispatch(
      createAction("SET_CART_ITEMS", {
        cartItems,
        cartCount,
        cartTotal,
      })
    );
  };

  const addItemToCart = (productToAdd) => {
    console.log({ cartItems });
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateNewCartItemsReducer(newCartItems);
  };

  const removeItemFromCart = (productToRemove) => {
    const newCartItems = removeCartItem(cartItems, productToRemove);
    updateNewCartItemsReducer(newCartItems);
  };

  const clearItemFromCart = (productToClear) => {
    const newCartItems = clearCartItem(cartItems, productToClear);
    updateNewCartItemsReducer(newCartItems);
  };

  return (
    <CartContext.Provider
      value={{
        isCartOpen,
        cartItems,
        cartCount,
        cartTotal,
        setIsCartOpen,
        addItemToCart,
        removeItemFromCart,
        clearItemFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
