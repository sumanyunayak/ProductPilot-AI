import "./Button.css";

function Button({
  children,
  variant = "primary", // This controls the button style.
  size = "medium",
  type = "button", // Default HTML button type is sometimes dangerous inside forms because it may submit automatically. So we safely set it as "button"
  disabled = false, // By default, button is clickable.
  onClick,
  className = "", // This allows extra custom classes if needed.
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`btn btn-${variant} btn-${size} ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;