import Toast from "./Toast";
import ToastContainer from "../components/ui/ToastContainer";

export default function ToastContainer({ toasts, removeToast }) {
  return (
    <ToastContext.Provider
      value={{
        showToast,
        removeToast,
      }}
    >
      {children}

      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
}
