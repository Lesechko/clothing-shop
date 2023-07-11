import { createAction } from "../../utils";
import { CART_ACTIONS_TYPE } from "./cart.types";

export const setIsCartOpen = (bolean) =>
  createAction(CART_ACTIONS_TYPE.SET_IS_CART_OPEN, bolean);

export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);

  return createAction(CART_ACTIONS_TYPE.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCart = (cartItems, productToRemove) => {
  const newCartItems = removeCartItem(cartItems, productToRemove);

  return createAction(CART_ACTIONS_TYPE.SET_CART_ITEMS, newCartItems);
};

export const clearItemFromCart = (cartItems, productToClear) => {
  const newCartItems = clearCartItem(cartItems, productToClear);

  return createAction(CART_ACTIONS_TYPE.SET_CART_ITEMS, newCartItems);
};

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
