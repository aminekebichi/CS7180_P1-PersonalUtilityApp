import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Package } from 'lucide-react';
import RecipeCard from '../components/RecipeCard.jsx';
import { getFilteredRecipes } from '../utils/recipeUtils.js';

export default function HomePage({
  inventory,
  favorites,
  selectedCuisines,
  selectedDietary,
  selectedDifficulty,
  showFavoritesOnly,
  onToggleFavorite,
}) {
  const navigate = useNavigate();

  const filteredRecipes = getFilteredRecipes({
    inventory,
    favorites,
    selectedCuisines,
    selectedDietary,
    selectedDifficulty,
    showFavoritesOnly,
  });

  const hasFilters =
    selectedCuisines.length > 0 ||
    selectedDietary.length > 0 ||
    selectedDifficulty.length > 0 ||
    showFavoritesOnly;

  return (
    <main className="px-5 py-6">
      {/* Active filter badges */}
      {hasFilters && (
        <div className="mb-4 flex flex-wrap gap-2">
          {selectedCuisines.map((c) => (
            <span key={c} className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
              {c}
            </span>
          ))}
          {selectedDietary.map((d) => (
            <span key={d} className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700 capitalize">
              {d}
            </span>
          ))}
          {selectedDifficulty.map((d) => {
            const labels = { 1: 'Home Chef', 2: 'Sous Chef', 3: 'Master Chef' };
            return (
              <span key={d} className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">
                {labels[d]}
              </span>
            );
          })}
          {showFavoritesOnly && (
            <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
              Favorites
            </span>
          )}
        </div>
      )}

      {/* Pantry info card */}
      {inventory.length > 0 && (
        <div className="mb-5 flex items-center justify-between rounded-xl bg-amber-50 border border-amber-200 px-4 py-3">
          <span className="text-sm text-amber-800">
            🎯 Showing recipes based on your{' '}
            <strong>{inventory.length}</strong> ingredient{inventory.length !== 1 ? 's' : ''}
          </span>
          <button
            onClick={() => navigate('/pantry')}
            className="flex items-center gap-1 text-xs font-medium text-amber-600 hover:text-amber-700"
          >
            <Package size={14} /> My Pantry
          </button>
        </div>
      )}

      {/* Recipe grid */}
      {filteredRecipes.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl bg-gray-50 py-16 text-center">
          <span className="text-6xl text-gray-300 mb-4">🍽️</span>
          <p className="text-base font-medium text-gray-600">No recipes found</p>
          <p className="text-sm text-gray-500 mt-1">Try adjusting your filters</p>
        </div>
      ) : (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 gap-5"
          style={{
            gridTemplateColumns:
              typeof window !== 'undefined' && window.innerWidth >= 1000
                ? 'repeat(3, minmax(0, 1fr))'
                : undefined,
          }}
        >
          {filteredRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              inventory={inventory}
              isFavorite={favorites.includes(recipe.id)}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      )}
    </main>
  );
}
