import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, Users, ChefHat, Heart, ArrowLeft, Plus } from 'lucide-react';
import { RECIPES_DB } from '../data/recipes.js';
import { calculateMatch } from '../utils/recipeUtils.js';

function IngredientRow({ ingredient, inventory, groceryList, onAddToList }) {
  const inPantry = inventory.includes(ingredient);
  const onList = groceryList.includes(ingredient);

  let rowClass = 'bg-gray-50';
  let dotClass = 'bg-gray-400';
  let statusNode = (
    <button
      onClick={() => onAddToList(ingredient)}
      className="flex items-center gap-1 text-xs font-medium text-amber-600 hover:text-amber-700"
    >
      <Plus size={12} /> Add to list
    </button>
  );

  if (inPantry) {
    rowClass = 'bg-green-50 border border-green-200';
    dotClass = 'bg-green-500';
    statusNode = <span className="text-xs font-medium text-green-600">✓ In pantry</span>;
  } else if (onList) {
    rowClass = 'bg-amber-50 border border-amber-200';
    dotClass = 'bg-amber-500';
    statusNode = <span className="text-xs font-medium text-amber-600">📝 On list</span>;
  }

  return (
    <div className={`flex items-center justify-between rounded-lg px-3 py-2.5 ${rowClass}`}>
      <div className="flex items-center gap-2">
        <span className={`h-2 w-2 rounded-full flex-shrink-0 ${dotClass}`} />
        <span className="text-sm text-gray-800 capitalize">{ingredient}</span>
      </div>
      {statusNode}
    </div>
  );
}

export default function RecipeDetailPage({
  inventory,
  groceryList,
  favorites,
  cookingHistory,
  onToggleFavorite,
  onAddToGroceryList,
  onMarkCooked,
  onNotify,
}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const recipe = RECIPES_DB.find((r) => r.id === Number(id));

  if (!recipe) {
    return (
      <main className="px-5 py-6 text-center text-gray-500">
        Recipe not found.{' '}
        <button onClick={() => navigate('/')} className="text-amber-600 underline">
          Go back
        </button>
      </main>
    );
  }

  const matchPct = calculateMatch(recipe, inventory);
  const totalTime = recipe.prepTime + recipe.cookTime;
  const isFavorite = favorites.includes(recipe.id);
  const isCooked = cookingHistory.some((h) => h.recipeId === recipe.id);
  const difficultyLabel = { 1: 'Home Chef', 2: 'Sous Chef', 3: 'Master Chef' }[recipe.difficulty];

  const missingIngredients = recipe.ingredients.filter(
    (ing) => !inventory.includes(ing) && !groceryList.includes(ing)
  );

  const handleAddAllToList = () => {
    if (missingIngredients.length === 0) return;
    onAddToGroceryList(missingIngredients);
    onNotify(`Added ${missingIngredients.length} items to grocery list!`);
  };

  const handleAddSingle = (ing) => {
    onAddToGroceryList([ing]);
    onNotify(`${ing} added to grocery list`);
  };

  const handleMarkCooked = () => {
    onMarkCooked(recipe);
    onNotify('Recipe marked as cooked! 🎉');
  };

  return (
    <main className="px-5 py-6 max-w-2xl mx-auto">
      {/* Back */}
      <button
        onClick={() => navigate('/')}
        className="mb-4 flex items-center gap-1 text-sm font-medium text-amber-600 hover:text-amber-700"
      >
        <ArrowLeft size={16} /> Back to Recipes
      </button>

      {/* Hero */}
      <div className="mb-6 flex h-40 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-100 to-amber-50 text-7xl">
        {recipe.image}
      </div>

      {/* Title + favorite */}
      <div className="mb-3 flex items-start justify-between gap-3">
        <h1 className="text-2xl font-bold text-gray-900">{recipe.name}</h1>
        <button
          onClick={() => onToggleFavorite(recipe.id)}
          className="mt-1 flex-shrink-0 text-gray-400 hover:text-red-500"
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart
            size={24}
            fill={isFavorite ? '#ef4444' : 'none'}
            stroke={isFavorite ? '#ef4444' : 'currentColor'}
          />
        </button>
      </div>

      <p className="mb-5 text-sm text-gray-600">{recipe.description}</p>

      {/* Metadata cards */}
      <div className="mb-5 grid grid-cols-3 gap-3">
        <div className="flex flex-col items-center rounded-xl bg-gray-50 py-3 text-center">
          <Clock size={20} className="mb-1 text-amber-500" />
          <span className="text-xs text-gray-500">Total Time</span>
          <span className="text-sm font-semibold text-gray-900">{totalTime} min</span>
        </div>
        <div className="flex flex-col items-center rounded-xl bg-gray-50 py-3 text-center">
          <Users size={20} className="mb-1 text-amber-500" />
          <span className="text-xs text-gray-500">Servings</span>
          <span className="text-sm font-semibold text-gray-900">{recipe.servings}</span>
        </div>
        <div className="flex flex-col items-center rounded-xl bg-gray-50 py-3 text-center">
          <ChefHat size={20} className="mb-1 text-amber-500" />
          <span className="text-xs text-gray-500">Level</span>
          <span className="text-sm font-semibold text-gray-900">{difficultyLabel}</span>
        </div>
      </div>

      {/* Match card */}
      {inventory.length > 0 && (
        <div className="mb-5 rounded-xl border border-gray-200 bg-white p-4">
          <div className="mb-2 flex justify-between text-sm">
            <span className="font-medium text-gray-700">Ingredient Match</span>
            <span
              className={`font-semibold ${
                matchPct === 100 ? 'text-green-600' : matchPct >= 80 ? 'text-amber-600' : 'text-gray-500'
              }`}
            >
              {matchPct}%
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-gray-200">
            <div
              className={`h-2 rounded-full ${
                matchPct === 100 ? 'bg-green-500' : matchPct >= 80 ? 'bg-amber-500' : 'bg-gray-400'
              }`}
              style={{ width: `${matchPct}%` }}
            />
          </div>
        </div>
      )}

      {/* Ingredients */}
      <section className="mb-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Ingredients</h2>
          {missingIngredients.length > 0 && (
            <button
              onClick={handleAddAllToList}
              className="flex items-center gap-1 text-xs font-medium text-amber-600 hover:text-amber-700"
            >
              <Plus size={14} /> Add all to list
            </button>
          )}
        </div>
        <div className="flex flex-col gap-2">
          {recipe.ingredients.map((ing) => (
            <IngredientRow
              key={ing}
              ingredient={ing}
              inventory={inventory}
              groceryList={groceryList}
              onAddToList={handleAddSingle}
            />
          ))}
        </div>
      </section>

      {/* Instructions */}
      <section className="mb-8">
        <h2 className="mb-3 text-lg font-semibold text-gray-900">Instructions</h2>
        <ol className="flex flex-col gap-4">
          {recipe.instructions.map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-amber-500 text-xs font-bold text-white">
                {i + 1}
              </span>
              <p className="text-sm text-gray-700 pt-0.5">{step}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Mark as cooked */}
      <button
        onClick={handleMarkCooked}
        className={`w-full rounded-xl py-3 text-base font-semibold text-white ${
          isCooked
            ? 'bg-green-500 hover:bg-green-600'
            : 'bg-amber-500 hover:bg-amber-600'
        }`}
      >
        {isCooked ? '✓ Cooked before — Mark again' : 'Mark as Cooked'}
      </button>
    </main>
  );
}
