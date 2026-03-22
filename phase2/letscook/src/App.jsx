import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import StickyHeader from './components/StickyHeader.jsx';
import SlidingMenu from './components/SlidingMenu.jsx';
import FilterPanel from './components/FilterPanel.jsx';
import Notification from './components/Notification.jsx';

import HomePage from './pages/HomePage.jsx';
import RecipeDetailPage from './pages/RecipeDetailPage.jsx';
import InventoryPage from './pages/InventoryPage.jsx';
import CookingLogPage from './pages/CookingLogPage.jsx';

// ── localStorage helpers ────────────────────────────────────────────────────
function loadState(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw !== null ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function usePersistedState(key, fallback) {
  const [value, setValue] = useState(() => loadState(key, fallback));
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}

// ── App ─────────────────────────────────────────────────────────────────────
export default function App() {
  // Pantry / grocery
  const [inventory, setInventory] = usePersistedState('inventory', []);
  const [groceryList, setGroceryList] = usePersistedState('groceryList', []);

  // Favorites & history
  const [favorites, setFavorites] = usePersistedState('favorites', []);
  const [cookingHistory, setCookingHistory] = usePersistedState('cookingHistory', []);

  // Filters
  const [selectedCuisines, setSelectedCuisines] = usePersistedState('selectedCuisines', []);
  const [selectedDietary, setSelectedDietary] = usePersistedState('selectedDietary', []);
  const [selectedDifficulty, setSelectedDifficulty] = usePersistedState('selectedDifficulty', []);
  const [showFavoritesOnly, setShowFavoritesOnly] = usePersistedState('showFavoritesOnly', false);

  // UI state
  const [menuOpen, setMenuOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [notification, setNotification] = useState('');

  const notify = useCallback((msg) => setNotification(msg), []);
  const dismissNotification = useCallback(() => setNotification(''), []);

  // Active filter count for badge
  const activeFilterCount =
    selectedCuisines.length +
    selectedDietary.length +
    selectedDifficulty.length +
    (showFavoritesOnly ? 1 : 0);

  // ── Inventory mutations ─────────────────────────────────────────────────
  const addToInventory = useCallback((ingredients) => {
    setInventory((prev) => [...prev, ...ingredients.filter((i) => !prev.includes(i))]);
  }, [setInventory]);

  const removeFromInventory = useCallback((ingredient) => {
    setInventory((prev) => prev.filter((i) => i !== ingredient));
  }, [setInventory]);

  // ── Grocery list mutations ───────────────────────────────────────────────
  const addToGroceryList = useCallback((ingredients) => {
    setGroceryList((prev) => [...prev, ...ingredients.filter((i) => !prev.includes(i) && !inventory.includes(i))]);
  }, [setGroceryList, inventory]);

  const removeFromGroceryList = useCallback((ingredient) => {
    setGroceryList((prev) => prev.filter((i) => i !== ingredient));
  }, [setGroceryList]);

  const moveToInventory = useCallback((ingredient) => {
    setInventory((prev) => (prev.includes(ingredient) ? prev : [...prev, ingredient]));
    setGroceryList((prev) => prev.filter((i) => i !== ingredient));
  }, [setInventory, setGroceryList]);

  const addAllToInventory = useCallback((items) => {
    setInventory((prev) => [...prev, ...items.filter((i) => !prev.includes(i))]);
    setGroceryList([]);
  }, [setInventory, setGroceryList]);

  const clearGroceryList = useCallback(() => setGroceryList([]), [setGroceryList]);

  // ── Favorites ────────────────────────────────────────────────────────────
  const toggleFavorite = useCallback((id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  }, [setFavorites]);

  // ── Cooking history ──────────────────────────────────────────────────────
  const markCooked = useCallback((recipe) => {
    setCookingHistory((prev) => [
      ...prev,
      { recipeId: recipe.id, recipeName: recipe.name, date: new Date().toISOString() },
    ]);
  }, [setCookingHistory]);

  // ── Filter actions ───────────────────────────────────────────────────────
  const toggleCuisine = (c) =>
    setSelectedCuisines((prev) => prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]);

  const toggleDietary = (d) =>
    setSelectedDietary((prev) => prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]);

  const toggleDifficulty = (d) =>
    setSelectedDifficulty((prev) => prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]);

  const clearAllFilters = () => {
    setSelectedCuisines([]);
    setSelectedDietary([]);
    setSelectedDifficulty([]);
    setShowFavoritesOnly(false);
  };

  // Shared props for pages
  const sharedProps = {
    inventory,
    groceryList,
    favorites,
    cookingHistory,
    selectedCuisines,
    selectedDietary,
    selectedDifficulty,
    showFavoritesOnly,
    onToggleFavorite: toggleFavorite,
    onAddToGroceryList: addToGroceryList,
    onRemoveFromGroceryList: removeFromGroceryList,
    onMoveToInventory: moveToInventory,
    onAddAllToInventory: addAllToInventory,
    onClearGroceryList: clearGroceryList,
    onRemoveFromInventory: removeFromInventory,
    onMarkCooked: markCooked,
    onNotify: notify,
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <StickyHeader
          onMenuOpen={() => setMenuOpen(true)}
          onFilterOpen={() => setFilterOpen(true)}
          activeFilterCount={activeFilterCount}
        />

        <SlidingMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

        <FilterPanel
          isOpen={filterOpen}
          onClose={() => setFilterOpen(false)}
          selectedCuisines={selectedCuisines}
          selectedDietary={selectedDietary}
          selectedDifficulty={selectedDifficulty}
          showFavoritesOnly={showFavoritesOnly}
          onToggleCuisine={toggleCuisine}
          onToggleDietary={toggleDietary}
          onToggleDifficulty={toggleDifficulty}
          onToggleFavorites={() => setShowFavoritesOnly((v) => !v)}
          onClearAll={clearAllFilters}
        />

        <Notification message={notification} onDismiss={dismissNotification} />

        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                inventory={inventory}
                favorites={favorites}
                selectedCuisines={selectedCuisines}
                selectedDietary={selectedDietary}
                selectedDifficulty={selectedDifficulty}
                showFavoritesOnly={showFavoritesOnly}
                onToggleFavorite={toggleFavorite}
              />
            }
          />
          <Route
            path="/recipe/:id"
            element={<RecipeDetailPage {...sharedProps} />}
          />
          <Route
            path="/pantry"
            element={<InventoryPage {...sharedProps} />}
          />
          <Route
            path="/log"
            element={<CookingLogPage cookingHistory={cookingHistory} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
