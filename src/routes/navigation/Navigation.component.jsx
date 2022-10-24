import { Outlet, Link } from "react-router-dom";
import { useContext } from "react";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { UserContext } from "../../context/UserContext";
import { signOutUser } from "../../utils/firabase/firabase.utils";
import { CartIcon } from "../../components/cart-icon/CartIcon.component";

import "./navigation.styles.scss";
import { CartDropdown } from "../../components/cart-dropdown/cart-dropdown.component";
import { CartContext } from "../../context/CartContex";

function Navigation() {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen, cartItems } = useContext(CartContext);

  return (
    <>
      <div className="navigation">
        <Link to="/" className="logo-container">
          <CrwnLogo />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="shop">
            SHOP
          </Link>
          {currentUser ? (
            <Link className="auth-link" to="auth" onClick={signOutUser}>
              SIGN OUT
            </Link>
          ) : (
            <Link className="auth-link" to="auth">
              SIGN IN
            </Link>
          )}
          <CartIcon />
        </div>
        {isCartOpen && <CartDropdown cartItems={cartItems} />}
      </div>
      <Outlet />
    </>
  );
}
export default Navigation;
