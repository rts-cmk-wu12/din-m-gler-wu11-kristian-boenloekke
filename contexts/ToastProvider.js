'use client'
import React, { createContext, useState, useContext, useCallback } from 'react'

const ToastContext = createContext({
    toast: () => { }
})

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([])

    const toast = useCallback((message, options = {}) => {
        const id = Date.now()
        const newToast = {
            id,
            message,
            variant: options.variant || 'default',
            duration: options.duration
        }

        setToasts(current => [...current, newToast])

        if (options.duration) {
            setTimeout(() => removeToast(id), options.duration)
        }
    }, [])

    const removeToast = useCallback((id) => {
        setToasts(current => current.filter(toast => toast.id !== id))
    }, [])

    return (
        <ToastContext.Provider value={{ toast }}>
            {children}
            <div style={{
                position: 'fixed',
                top: '16px',
                right: '16px',
                zIndex: 1000,
                maxWidth: '400px',
            }}>
                {toasts.map(toast => (
                    <div
                        key={toast.id}
                        style={{
                            backgroundColor: toast.variant === 'destructive' ? '#ff4d4f' : '#162A41',
                            
                        }}
                        className={`p-4 rounded-md shadow-lg flex justify-between items-center mb-2 border border-black text-white`}
                    >
                        {toast.message}
                        <button
                            onClick={() => removeToast(toast.id)}
                            className='ml-6 px-2 cursor-pointer bg-transparent text-black'
                        >
                            ✕
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    )
}

export function useToast() {
    const context = useContext(ToastContext)
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider')
    }
    return context
}
