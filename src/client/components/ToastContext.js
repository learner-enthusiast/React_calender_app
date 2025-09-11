import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type, isVisible: false }]);

    // Trigger "enter" animation in next frame
    setTimeout(() => {
      setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, isVisible: true } : t)));
    }, 20);

    // Auto hide after 5s
    setTimeout(() => {
      setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, isVisible: false } : t)));
      // Remove from DOM after exit animation ends
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 300);
    }, 5000);
  }, []);

  return (
    <ToastContext.Provider value={addToast}>
      {children}

      <div
        style={{
          position: 'fixed',
          top: '1rem',
          right: '1rem',
          zIndex: 2000,
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          maxWidth: '20rem'
        }}
      >
        {toasts.map((toast) => {
          const colorStyles = getColor(toast.type);
          return (
            <div
              key={toast.id}
              style={{
                ...colorStyles,
                color: 'white',
                borderRadius: '0.375rem',
                padding: '0.75rem 1rem',
                boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                minWidth: '18rem',
                transition: 'all 0.3s ease',
                transform: toast.isVisible ? 'translateX(0)' : 'translateX(120%)',
                opacity: toast.isVisible ? 1 : 0
              }}
              role="alert"
            >
              <span style={{ fontSize: '0.875rem', lineHeight: '1.25rem' }}>{toast.message}</span>
              <button
                style={{
                  marginLeft: '0.75rem',
                  padding: '0.25rem',
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: 'white',
                  cursor: 'pointer',
                  borderRadius: '0.25rem',
                  opacity: 0.7,
                  transition: 'opacity 0.2s',
                  fontSize: '1.25rem',
                  lineHeight: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onMouseEnter={(e) => (e.target.style.opacity = '1')}
                onMouseLeave={(e) => (e.target.style.opacity = '0.7')}
                onClick={() => {
                  setToasts((prev) => prev.map((t) => (t.id === toast.id ? { ...t, isVisible: false } : t)));
                  setTimeout(() => {
                    setToasts((prev) => prev.filter((t) => t.id !== toast.id));
                  }, 300);
                }}
                aria-label="Close"
              >
                ×
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

function getColor(type) {
  switch (type) {
    case 'success':
      return { backgroundColor: '#10b981' };
    case 'error':
      return { backgroundColor: '#ef4444' };
    case 'warning':
      return { backgroundColor: '#f59e0b' };
    case 'info':
      return { backgroundColor: '#3b82f6' };
    default:
      return { backgroundColor: '#6b7280' };
  }
}

export function useToast() {
  const addToast = useContext(ToastContext);
  if (!addToast) throw new Error('useToast must be used inside ToastProvider');

  return {
    success: (msg) => addToast(msg, 'success'),
    error: (msg) => addToast(msg, 'error'),
    info: (msg) => addToast(msg, 'info'),
    warning: (msg) => addToast(msg, 'warning')
  };
}
