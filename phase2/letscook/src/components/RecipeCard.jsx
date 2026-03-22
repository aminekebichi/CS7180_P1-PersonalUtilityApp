import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Users, ChefHat, Heart } from 'lucide-react';
import { calculateMatch } from '../utils/recipeUtils.js';

function DifficultyBadge({ level }) {
  return (
    <span className="flex items-center gap-0.5 rounded-md bg-amber-50 px-2 py-0.5 text-xs text-amber-700">
      {Array.from({ length: level }).map((_, i) => (
        <ChefHat key={i} size={11} />
      ))}
    </span>
  );
}

function MatchBar({ pct }) {
  const color = pct === 100 ? 'bg-green-500' : pct >= 80 ? 'bg-amber-500' : 'bg-gray-400';
  return (
    <div className="mt-2">
      <div className="mb-1 flex justify-between text-xs text-gray-500">
        <span>Ingredient match</span>
        <span className={pct === 100 ? 'text-green-600 font-medium' : pct >= 80 ? 'text-amber-600 font-medium' : 'text-gray-500'}>
          {pct}%
        </span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-gray-200">
        <div className={`h-1.5 rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export default function RecipeCard({ recipe, inventory, isFavorite, onToggleFavorite }) {
  const navigate = useNavigate();
  const matchPct = calculateMatch(recipe, inventory);
  const totalTime = recipe.prepTime + recipe.cookTime;

  return (
    <div
      className="relative flex cursor-pointer flex-col rounded-xl bg-white border border-gray-200 shadow-sm overflow-hidden"
      onClick={() => navigate(`/recipe/${recipe.id}`)}
      style={{ transition: 'box-shadow 200ms ease-in-out' }}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)')}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '')}
      role="article"
    >
      {/* Thumbnail */}
      <div className="flex h-32 items-center justify-center bg-gradient-to-br from-orange-100 to-amber-50 text-5xl">
        {recipe.image}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-4">
        {/* Name + favorite */}
        <div className="mb-1 flex items-start justify-between gap-2">
          <h3 className="text-base font-semibold text-gray-900 leading-snug">{recipe.name}</h3>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(recipe.id);
            }}
            className="mt-0.5 flex-shrink-0 text-gray-400 hover:text-red-500"
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart
              size={18}
              fill={isFavorite ? '#ef4444' : 'none'}
              stroke={isFavorite ? '#ef4444' : 'currentColor'}
            />
          </button>
        </div>

        <p className="mb-3 text-xs text-gray-500 line-clamp-2">{recipe.description}</p>

        {/* Meta */}
        <div className="mt-auto flex flex-wrap items-center gap-2 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Clock size={12} /> {totalTime} min
          </span>
          <span className="flex items-center gap-1">
            <Users size={12} /> {recipe.servings}
          </span>
          <DifficultyBadge level={recipe.difficulty} />
        </div>

        {/* Match bar (only when pantry has items) */}
        {inventory.length > 0 && <MatchBar pct={matchPct} />}
      </div>
    </div>
  );
}
