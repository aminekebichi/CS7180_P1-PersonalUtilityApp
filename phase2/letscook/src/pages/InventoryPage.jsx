import React, { useState } from 'react';
import { Plus, Minus, ArrowUpRight, X, Search } from 'lucide-react';
import { getSuggestedIngredients, getFilteredRecipes } from '../utils/recipeUtils.js';
import IngredientSelectorModal from '../components/IngredientSelectorModal.jsx';
import ClearConfirmDialog from '../components/ClearConfirmDialog.jsx';

export default function InventoryPage({
  inventory,
  groceryList,
  favorites,
  selectedCuisines,
  selectedDietary,
  selectedDifficulty,
  showFavoritesOnly,
  onRemoveFromInventory,
  onAddToGroceryList,
  onMoveToInventory,
  onRemoveFromGroceryList,
  onClearGroceryList,
  onAddAllToInventory,
  onNotify,
}) {
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const filteredRecipes = getFilteredRecipes({
    inventory,
    favorites,
    selectedCuisines,
    selectedDietary,
    selectedDifficulty,
    showFavoritesOnly,
  });

  const suggestions = getSuggestedIngredients({
    inventory,
    groceryList,
    filteredRecipes,
  });

  const handleAddSuggestion = (ing) => {
    onAddToGroceryList([ing]);
    onNotify(`${ing} added to grocery list`);
  };

  const handleModalAdd = (ing) => {
    onAddToGroceryList([ing]);
    onNotify(`${ing} added to grocery list`);
  };

  const handleMoveToInventory = (ing) => {
    onMoveToInventory(ing);
    onNotify(`${ing} added to pantry`);
  };

  const handleRemoveFromList = (ing) => {
    onRemoveFromGroceryList(ing);
    onNotify(`${ing} removed from grocery list`);
  };

  const handleRemoveFromInventory = (ing) => {
    onRemoveFromInventory(ing);
    onNotify(`${ing} removed from pantry`);
  };

  const handleAddAllToPantry = () => {
    onAddAllToInventory(groceryList);
    onNotify(`Moved ${groceryList.length} items to pantry!`);
  };

  const handleClearConfirm = () => {
    onClearGroceryList();
    onNotify('Grocery list cleared');
    setShowConfirm(false);
  };

  return (
    <main className="px-5 py-6 max-w-2xl mx-auto">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">My Pantry</h1>

      {/* ── Section 1: Suggested Additions ───────────────────────────────────── */}
      {suggestions.length > 0 && (
        <section className="mb-8">
          <h2 className="mb-3 text-lg font-semibold text-gray-900">Suggested Additions</h2>
          <div className="grid grid-cols-2 gap-3">
            {suggestions.map(({ ingredient, unlockCount }) => (
              <button
                key={ingredient}
                onClick={() => handleAddSuggestion(ingredient)}
                className="flex items-center justify-between rounded-lg border border-green-500 bg-white px-3 py-3 text-left"
                style={{ transition: 'background-color 300ms ease-in-out' }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(34,197,94,0.1)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'white')}
              >
                <div>
                  <span className="block text-sm font-medium text-gray-800 capitalize">
                    {ingredient}
                  </span>
                  <span className="text-xs text-green-600">+{unlockCount} recipes</span>
                </div>
                <Plus size={16} className="text-green-500 flex-shrink-0" />
              </button>
            ))}
          </div>
        </section>
      )}

      {/* ── Section 2: Current Ingredients (Pantry) ──────────────────────────── */}
      <section className="mb-8">
        <h2 className="mb-3 text-lg font-semibold text-gray-900">
          Current Ingredients
          {inventory.length > 0 && (
            <span className="ml-2 text-sm font-normal text-gray-500">({inventory.length})</span>
          )}
        </h2>
        {inventory.length === 0 ? (
          <div className="flex flex-col items-center rounded-xl bg-gray-50 py-10 text-center">
            <span className="text-4xl text-gray-300 mb-3">🥬</span>
            <p className="text-sm font-medium text-gray-600">Your pantry is empty</p>
            <p className="text-xs text-gray-500 mt-1">Add ingredients from the grocery list below</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {inventory.map((ing) => (
              <button
                key={ing}
                onClick={() => handleRemoveFromInventory(ing)}
                className="flex items-center justify-between rounded-lg border-2 border-amber-500 bg-white px-3 py-3"
                style={{ transition: 'background-color 300ms ease-in-out' }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(245,158,11,0.1)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'white')}
              >
                <span className="text-sm font-medium text-gray-800 capitalize">{ing}</span>
                <Minus size={16} className="text-amber-500 flex-shrink-0" />
              </button>
            ))}
          </div>
        )}
      </section>

      {/* ── Section 3: Grocery List ───────────────────────────────────────────── */}
      <section>
        <h2 className="mb-3 text-lg font-semibold text-gray-900">
          Grocery List
          {groceryList.length > 0 && (
            <span className="ml-2 text-sm font-normal text-gray-500">({groceryList.length})</span>
          )}
        </h2>

        {/* Bulk move */}
        {groceryList.length > 0 && (
          <button
            onClick={handleAddAllToPantry}
            className="mb-3 w-full rounded-lg bg-amber-500 py-3 text-sm font-semibold text-white hover:bg-amber-600"
          >
            + Add All to Pantry
          </button>
        )}

        {/* Search button */}
        <button
          onClick={() => setShowModal(true)}
          className="mb-3 flex w-full items-center justify-center gap-2 rounded-lg border-2 border-amber-500 bg-white py-3 text-sm font-medium text-amber-600 hover:bg-amber-50"
        >
          <Search size={16} /> Search Ingredients
        </button>

        {/* List items */}
        {groceryList.length === 0 ? (
          <div className="flex flex-col items-center rounded-xl bg-gray-50 py-8 text-center">
            <span className="text-4xl text-gray-300 mb-3">🛒</span>
            <p className="text-sm font-medium text-gray-600">Grocery list is empty</p>
            <p className="text-xs text-gray-500 mt-1">
              Search for ingredients or add missing ones from a recipe
            </p>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-2 mb-4">
              {groceryList.map((ing) => (
                <div
                  key={ing}
                  className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-3 py-2.5"
                >
                  <span className="text-sm text-gray-800 capitalize">{ing}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleMoveToInventory(ing)}
                      className="text-amber-500 hover:text-amber-600"
                      aria-label={`Move ${ing} to pantry`}
                    >
                      <ArrowUpRight size={18} />
                    </button>
                    <button
                      onClick={() => handleRemoveFromList(ing)}
                      className="text-gray-400 hover:text-red-500"
                      aria-label={`Remove ${ing} from list`}
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => setShowConfirm(true)}
                className="text-xs font-medium text-gray-500 hover:text-gray-700"
              >
                - Clear grocery list
              </button>
            </div>
          </>
        )}
      </section>

      {/* Modal + confirm */}
      {showModal && (
        <IngredientSelectorModal
          groceryList={groceryList}
          onAddToList={handleModalAdd}
          onClose={() => setShowModal(false)}
        />
      )}
      {showConfirm && (
        <ClearConfirmDialog
          onConfirm={handleClearConfirm}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </main>
  );
}
