import "./ProductCard.styles.scss";
import { Button, BUTTON_TYPE_CLASSES } from "../button/Button.components";

export const ProductCard = ({ product }) => {
  const { name, imageUrl, price } = product;

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt="product img" />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>

      <Button buttonType={BUTTON_TYPE_CLASSES.inverted}>Add to card</Button>
    </div>
  );
};
