import { useContext } from "react";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { CartContext } from "../../context/CartContex";

import "./CartIcon.styles.scss";

export const CartIcon = () => {
  const { setIsCartOpen } = useContext(CartContext);

  const toggleIsCartOpen = () => setIsCartOpen((isCartOpen) => !isCartOpen);

  return (
    <div className="cart-icon-container" onClick={toggleIsCartOpen}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">0</span>
    </div>
  );
};
