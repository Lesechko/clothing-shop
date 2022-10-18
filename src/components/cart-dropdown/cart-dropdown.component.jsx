import { Button } from "../button/Button.components";
import "./cart-dropdown.styles.scss";

export const CartDropdown = () => {
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items"></div>
      <Button>GO TO CHECKOUT</Button>
    </div>
  );
};
