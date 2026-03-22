import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChefHat, Package, History, X } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Home', icon: ChefHat, path: '/' },
  { label: 'My Pantry', icon: Package, path: '/pantry' },
  { label: 'Cooking Log', icon: History, path: '/log' },
];

export default function SlidingMenu({ isOpen, onClose }) {
  const navigate = useNavigate();

  const handleNav = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        className="fixed right-0 top-0 z-30 flex h-full w-72 flex-col bg-white shadow-xl"
        style={{
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 300ms ease-in-out',
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <span className="text-lg font-semibold text-gray-900">Menu</span>
          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex flex-col p-4 gap-1">
          {NAV_ITEMS.map(({ label, icon: Icon, path }) => (
            <button
              key={path}
              onClick={() => handleNav(path)}
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-left text-gray-700 hover:bg-amber-50 hover:text-amber-700"
              style={{ transition: 'background-color 300ms ease-in-out' }}
            >
              <Icon size={20} />
              <span className="font-medium">{label}</span>
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}
