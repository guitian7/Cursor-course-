'use client';

export default function Notification({ notification, onClose }) {
  if (!notification.show) return null;

  return (
    <div className={`fixed top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg z-50 transition-all duration-200 ease-out text-white ${
      notification.type === 'delete' ? 'bg-red-600' : 'bg-emerald-600'
    }`}>
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
      <span>{notification.message}</span>
      <button 
        onClick={onClose}
        className="ml-2 hover:text-white/80"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
} 