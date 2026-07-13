import "./Loader.css";

function Loader({ size = "medium", text = "", className = "" }) {
  return (
    <div className={`loader-wrapper ${className}`}>
      <span className={`loader loader-${size}`}></span>

      {text && <p className="loader-text">{text}</p>}
    </div>
  );
}

export default Loader;