import React, { useEffect } from 'react';
import { CheckCircle } from 'lucide-react';

export default function Notification({ message, onDismiss }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onDismiss, 3000);
    return () => clearTimeout(timer);
  }, [message, onDismiss]);

  if (!message) return null;

  return (
    <div
      className="fixed top-20 left-1/2 z-50 flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-3 text-white shadow-lg"
      style={{ transform: 'translateX(-50%)', whiteSpace: 'nowrap' }}
      role="status"
      aria-live="polite"
    >
      <CheckCircle size={18} />
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
}
