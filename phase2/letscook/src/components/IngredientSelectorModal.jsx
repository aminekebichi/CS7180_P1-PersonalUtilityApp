import React, { useState } from 'react';
import { X, ChevronLeft } from 'lucide-react';
import { INGREDIENT_CATEGORIES } from '../data/ingredients.js';

const CATEGORY_NAMES = Object.keys(INGREDIENT_CATEGORIES);

export default function IngredientSelectorModal({ groceryList, onAddToList, onClose }) {
  const [activeCategory, setActiveCategory] = useState(null);

  const handleSelectIngredient = (ing) => {
    if (!groceryList.includes(ing)) {
      onAddToList(ing);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-2xl bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <div className="flex items-center gap-2">
            {activeCategory && (
              <button
                onClick={() => setActiveCategory(null)}
                className="text-amber-600 hover:text-amber-700 font-medium text-sm flex items-center gap-1"
              >
                <ChevronLeft size={16} />
                Back
              </button>
            )}
            <span className="text-lg font-semibold text-gray-900">
              {activeCategory || 'Select Category'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="max-h-96 overflow-y-auto p-4">
          {activeCategory === null ? (
            /* Category grid */
            <div className="grid grid-cols-2 gap-3">
              {CATEGORY_NAMES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="rounded-lg border-2 border-amber-500 bg-white px-3 py-3 text-left text-sm font-medium text-amber-600"
                  style={{ transition: 'background-color 300ms ease-in-out' }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(245,158,11,0.1)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'white')}
                >
                  <div>{cat}</div>
                  <div className="text-xs font-normal text-gray-500 mt-0.5">
                    {INGREDIENT_CATEGORIES[cat].length} items
                  </div>
                </button>
              ))}
            </div>
          ) : (
            /* Ingredient grid */
            <div className="grid grid-cols-2 gap-2">
              {INGREDIENT_CATEGORIES[activeCategory].map((ing) => {
                const onList = groceryList.includes(ing);
                return (
                  <button
                    key={ing}
                    onClick={() => handleSelectIngredient(ing)}
                    disabled={onList}
                    className={`rounded-lg border px-3 py-2.5 text-left text-sm capitalize ${
                      onList
                        ? 'border-amber-300 bg-amber-50 text-amber-600 cursor-default'
                        : 'border-gray-200 bg-white text-gray-700'
                    }`}
                    style={onList ? {} : { transition: 'background-color 300ms ease-in-out' }}
                    onMouseEnter={(e) => {
                      if (!onList) e.currentTarget.style.backgroundColor = 'rgba(34,197,94,0.1)';
                    }}
                    onMouseLeave={(e) => {
                      if (!onList) e.currentTarget.style.backgroundColor = 'white';
                    }}
                  >
                    {ing}
                    {onList && <span className="ml-1 text-xs">✓</span>}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
