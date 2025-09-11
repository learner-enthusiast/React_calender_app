import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto remove after 3 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  }, []);

  return (
    <ToastContext.Provider value={addToast}>
      {children}

      {/* Toast container */}
      <div className="toast-container position-fixed top-0 end-0 p-3" style={{ top: '10px', zIndex: 2000 }}>
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast show text-white bg-${getColor(toast.type)} mb-2`} role="alert">
            <div className="toast-body d-flex justify-content-between align-items-center">
              {toast.message}
              <button
                className="btn-close btn-close-white ms-2"
                onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
              />
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

// Map toast type to Bootstrap colors
function getColor(type) {
  switch (type) {
    case 'success':
      return 'success';
    case 'error':
      return 'danger';
    case 'info':
    default:
      return 'primary';
  }
}

export function useToast() {
  const addToast = useContext(ToastContext);
  if (!addToast) throw new Error('useToast must be used inside ToastProvider');

  return {
    success: (msg) => addToast(msg, 'success'),
    error: (msg) => addToast(msg, 'error'),
    info: (msg) => addToast(msg, 'info')
  };
}
