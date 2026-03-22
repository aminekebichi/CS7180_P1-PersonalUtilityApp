import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChefHat, Filter, Menu } from 'lucide-react';

export default function StickyHeader({ onMenuOpen, onFilterOpen, activeFilterCount }) {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white px-4 py-3">
      {/* Logo */}
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-amber-600 hover:text-amber-700"
        aria-label="Go to home"
      >
        <ChefHat size={24} />
        <span className="text-lg font-bold text-gray-900">Let's Cook</span>
      </button>

      {/* Right actions */}
      <div className="flex items-center gap-2">
        {/* Filter button */}
        <button
          onClick={onFilterOpen}
          className="relative flex h-10 w-10 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100"
          aria-label="Open filters"
        >
          <Filter size={20} />
          {activeFilterCount > 0 && (
            <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-xs font-bold text-white">
              {activeFilterCount}
            </span>
          )}
        </button>

        {/* Hamburger */}
        <button
          onClick={onMenuOpen}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
      </div>
    </header>
  );
}
