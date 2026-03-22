import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChefHat } from 'lucide-react';

export default function CookingLogPage({ cookingHistory }) {
  const navigate = useNavigate();

  return (
    <main className="px-5 py-6 max-w-2xl mx-auto">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Cooking Log</h1>

      {cookingHistory.length === 0 ? (
        <div className="flex flex-col items-center rounded-xl bg-gray-50 py-16 text-center">
          <ChefHat size={64} className="mb-4 text-gray-300" />
          <p className="text-base font-medium text-gray-600">No recipes cooked yet</p>
          <p className="text-sm text-gray-500 mt-1">
            Mark recipes as cooked from the recipe detail page
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {[...cookingHistory].reverse().map((entry, i) => (
            <button
              key={i}
              onClick={() => navigate(`/recipe/${entry.recipeId}`)}
              className="flex items-center justify-between rounded-xl border-2 border-amber-500 bg-white px-4 py-4 text-left"
              style={{ transition: 'background-color 300ms ease-in-out' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(245,158,11,0.1)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'white')}
            >
              <div>
                <p className="text-sm font-semibold text-gray-900">{entry.recipeName}</p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {new Date(entry.date).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </p>
              </div>
              <ChefHat size={20} className="text-amber-500 flex-shrink-0" />
            </button>
          ))}
        </div>
      )}
    </main>
  );
}
