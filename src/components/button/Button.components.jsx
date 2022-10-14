import "./Button.styles.scss";

export const BUTTON_TYPE_CLASSES = {
  google: "google-sign-in",
  inverted: "inverted",
};

export const Button = ({ children, buttonType, ...buttonProps }) => {
  const containerClass = `button-container ${
    BUTTON_TYPE_CLASSES[buttonType] || ""
  }`;

  return (
    <button className={containerClass} {...buttonProps}>
      {children}
    </button>
  );
};
