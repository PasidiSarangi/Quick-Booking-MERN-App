import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const [confirmModal, setConfirmModal] = useState(null);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback((message, type = "error", title = "") => {
    const id = Date.now() + Math.random().toString(36).substring(2, 9);
    
    // Auto default title if not provided
    const defaultTitle =
      type === "error"
        ? "Error"
        : type === "success"
        ? "Success"
        : type === "warning"
        ? "Warning"
        : "Notice";

    const newToast = {
      id,
      message,
      type,
      title: title || defaultTitle,
    };

    setToasts((prev) => [...prev, newToast]);

    // Auto dismiss after 4 seconds
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  }, [removeToast]);

  const showConfirm = useCallback(({ title = "Confirm Action", message, onConfirm, onCancel, confirmText = "Confirm", cancelText = "Cancel" }) => {
    setConfirmModal({
      title,
      message,
      onConfirm: () => {
        setConfirmModal(null);
        if (onConfirm) onConfirm();
      },
      onCancel: () => {
        setConfirmModal(null);
        if (onCancel) onCancel();
      },
      confirmText,
      cancelText,
    });
  }, []);

  // Override window.alert to automatically use our beautiful toast
  useEffect(() => {
    const originalAlert = window.alert;
    window.alert = (msg) => {
      addToast(String(msg), "error");
    };

    return () => {
      window.alert = originalAlert;
    };
  }, [addToast]);

  const toastHelpers = {
    error: (msg, title) => addToast(msg, "error", title),
    success: (msg, title) => addToast(msg, "success", title),
    info: (msg, title) => addToast(msg, "info", title),
    warning: (msg, title) => addToast(msg, "warning", title),
    confirm: showConfirm,
  };

  return (
    <ToastContext.Provider value={toastHelpers}>
      {children}

      {/* TOAST CONTAINER */}
      <div className="toast-container" aria-live="polite">
        {toasts.map((t) => (
          <div key={t.id} className={`toast-card toast-${t.type}`}>
            <div className="toast-icon">
              {t.type === "error" && (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="15" y1="9" x2="9" y2="15"></line>
                  <line x1="9" y1="9" x2="15" y2="15"></line>
                </svg>
              )}
              {t.type === "success" && (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              )}
              {t.type === "info" && (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
              )}
              {t.type === "warning" && (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                  <line x1="12" y1="9" x2="12" y2="13"></line>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
              )}
            </div>

            <div className="toast-content">
              <span className="toast-title">{t.title}</span>
              <p className="toast-message">{t.message}</p>
            </div>

            <button
              className="toast-close-btn"
              onClick={() => removeToast(t.id)}
              aria-label="Close notification"
            >
              ×
            </button>
            <div className="toast-progress-bar" />
          </div>
        ))}
      </div>

      {/* CONFIRMATION MODAL */}
      {confirmModal && (
        <div className="custom-modal-backdrop" onClick={confirmModal.onCancel}>
          <div className="custom-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="custom-modal-header">
              <div className="modal-warning-icon">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                  <line x1="12" y1="9" x2="12" y2="13"></line>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
              </div>
              <h3>{confirmModal.title}</h3>
            </div>

            <div className="custom-modal-body">
              <p>{confirmModal.message}</p>
            </div>

            <div className="custom-modal-actions">
              <button
                className="modal-cancel-btn"
                onClick={confirmModal.onCancel}
              >
                {confirmModal.cancelText}
              </button>
              <button
                className="modal-confirm-btn"
                onClick={confirmModal.onConfirm}
              >
                {confirmModal.confirmText}
              </button>
            </div>
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
};
