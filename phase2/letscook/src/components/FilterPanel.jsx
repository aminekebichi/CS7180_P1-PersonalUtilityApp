import React from 'react';
import { X, ChefHat } from 'lucide-react';

const CUISINES = ['Italian', 'Mexican', 'Asian', 'Indian', 'Greek', 'Mediterranean', 'Colombian'];
const DIETARY = ['Vegetarian', 'Vegan', 'Pescatarian'];
const DIFFICULTIES = [
  { value: 1, label: 'Home Chef', icons: 1 },
  { value: 2, label: 'Sous Chef', icons: 2 },
  { value: 3, label: 'Master Chef', icons: 3 },
];

export default function FilterPanel({
  isOpen,
  onClose,
  selectedCuisines,
  selectedDietary,
  selectedDifficulty,
  showFavoritesOnly,
  onToggleCuisine,
  onToggleDietary,
  onToggleDifficulty,
  onToggleFavorites,
  onClearAll,
}) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-20"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <div
        className="fixed right-0 top-0 z-30 flex h-full w-80 flex-col bg-white shadow-xl overflow-y-auto"
        style={{
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 300ms ease-in-out',
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Filter panel"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <span className="text-lg font-semibold text-gray-900">Filters</span>
          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100"
            aria-label="Close filters"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex flex-col gap-6 p-5 flex-1">
          {/* Cuisine */}
          <section>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
              Cuisine Type
            </h3>
            <div className="flex flex-col gap-2">
              {CUISINES.map((c) => (
                <label key={c} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedCuisines.includes(c)}
                    onChange={() => onToggleCuisine(c)}
                    className="h-4 w-4 rounded border-gray-300 accent-amber-500"
                  />
                  <span className="text-sm text-gray-700">{c}</span>
                </label>
              ))}
            </div>
          </section>

          {/* Dietary */}
          <section>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
              Dietary Preferences
            </h3>
            <div className="flex flex-col gap-2">
              {DIETARY.map((d) => (
                <label key={d} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedDietary.includes(d.toLowerCase())}
                    onChange={() => onToggleDietary(d.toLowerCase())}
                    className="h-4 w-4 rounded border-gray-300 accent-amber-500"
                  />
                  <span className="text-sm text-gray-700">{d}</span>
                </label>
              ))}
            </div>
          </section>

          {/* Difficulty */}
          <section>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
              Chef Level
            </h3>
            <div className="flex flex-col gap-2">
              {DIFFICULTIES.map(({ value, label, icons }) => (
                <label key={value} className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={selectedDifficulty.includes(value)}
                      onChange={() => onToggleDifficulty(value)}
                      className="h-4 w-4 rounded border-gray-300 accent-amber-500"
                    />
                    <span className="text-sm text-gray-700">{label}</span>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: icons }).map((_, i) => (
                      <ChefHat key={i} size={14} className="text-amber-500" />
                    ))}
                  </div>
                </label>
              ))}
            </div>
          </section>

          {/* Other */}
          <section>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
              Other Filters
            </h3>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={showFavoritesOnly}
                onChange={onToggleFavorites}
                className="h-4 w-4 rounded border-gray-300 accent-amber-500"
              />
              <span className="text-sm text-gray-700">Favorites only</span>
            </label>
          </section>
        </div>

        {/* Clear all */}
        <div className="border-t border-gray-100 p-5">
          <button
            onClick={onClearAll}
            className="w-full rounded-lg border border-gray-300 bg-white py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Clear All Filters
          </button>
        </div>
      </div>
    </>
  );
}
