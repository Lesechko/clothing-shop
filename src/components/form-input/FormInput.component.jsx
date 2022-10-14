import "./FormInput.styles.scss";

export const FormInput = ({ label, ...inputProps }) => {
  const id = inputProps.name;
  const labelClass = `${
    inputProps.value.length ? "shrink" : ""
  } form-input-label`;

  return (
    <div className="group">
      <input className="form-input" {...inputProps} id={id} /> 
      {label && (
        <label htmlFor={id} className={labelClass}>
          {label}
        </label>
      )}
    </div>
  );
};
