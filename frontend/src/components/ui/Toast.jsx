import "./Toast.css";

export default function Toast({ type, message, onClose }) {
  return (
    <div className={`toast toast-${type}`}>
      <span className="toast-message">{message}</span>

      <button
        className="toast-close"
        onClick={onClose}
        aria-label="Close notification"
      >
        ×
      </button>
    </div>
  );
}