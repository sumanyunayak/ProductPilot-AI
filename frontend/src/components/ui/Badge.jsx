import "./Badge.css";

function Badge({
  children,
  variant = "default",
  size = "medium",
  className = "",
}) {
  return (
    <span className={`badge badge-${variant} badge-${size} ${className}`}>
      {children}
    </span>// We use span instead of div because a badge is small inline content, not a large layout block.
  );
}

export default Badge;