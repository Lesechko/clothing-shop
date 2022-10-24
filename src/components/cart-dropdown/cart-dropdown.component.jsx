import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../button/Button.components";
import { CartItem } from "../cart-item/cart-item.component";
import { CartContext } from "../../context/CartContex";
import "./cart-dropdown.styles.scss";

export const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const goToCheckoutHandler = () => navigate("checkout");

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map((cartItem) => (
          <CartItem cartItem={cartItem} key={cartItem.id} />
        ))}
      </div>
      <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
    </div>
  );
};
