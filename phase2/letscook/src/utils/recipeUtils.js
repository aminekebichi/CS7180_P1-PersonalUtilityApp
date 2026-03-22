import { RECIPES_DB } from '../data/recipes.js';

/**
 * Returns the percentage of a recipe's ingredients that are in the pantry.
 * Returns 100 when pantry is empty (show all recipes as fully available).
 */
export function calculateMatch(recipe, inventory) {
  if (inventory.length === 0) return 100;
  const matches = recipe.ingredients.filter((ing) => inventory.includes(ing)).length;
  return Math.round((matches / recipe.ingredients.length) * 100);
}

/**
 * Filters and sorts recipes according to active filter state.
 * Sorting: highest ingredient-match percentage first (when pantry has items).
 */
export function getFilteredRecipes({
  inventory,
  favorites,
  selectedCuisines,
  selectedDietary,
  selectedDifficulty,
  showFavoritesOnly,
}) {
  let filtered = [...RECIPES_DB];

  if (showFavoritesOnly) {
    filtered = filtered.filter((r) => favorites.includes(r.id));
  }
  if (selectedCuisines.length > 0) {
    filtered = filtered.filter((r) => selectedCuisines.includes(r.cuisine));
  }
  if (selectedDietary.length > 0) {
    filtered = filtered.filter((r) =>
      selectedDietary.some((diet) => r.dietary?.includes(diet))
    );
  }
  if (selectedDifficulty.length > 0) {
    filtered = filtered.filter((r) => selectedDifficulty.includes(r.difficulty));
  }

  if (inventory.length > 0) {
    filtered.sort(
      (a, b) => calculateMatch(b, inventory) - calculateMatch(a, inventory)
    );
  }

  return filtered;
}

/**
 * Returns the top 6 suggested ingredients (not in pantry or grocery list)
 * ranked by combined score = (unlockCount × 10) + frequencyCount.
 * unlockCount  – recipes that would reach ≥80% match if ingredient were added.
 * frequencyCount – how many filtered recipes contain the ingredient.
 */
export function getSuggestedIngredients({
  inventory,
  groceryList,
  filteredRecipes,
}) {
  // Collect all candidate ingredients from the filtered recipe set
  const candidateSet = new Set();
  filteredRecipes.forEach((r) => r.ingredients.forEach((ing) => candidateSet.add(ing)));

  const scores = [];

  candidateSet.forEach((ing) => {
    // Skip ingredients already owned or already on the list
    if (inventory.includes(ing) || groceryList.includes(ing)) return;

    // Simulate having this ingredient in the pantry
    const hypotheticalInventory = [...inventory, ing];

    let unlockCount = 0;
    let frequencyCount = 0;

    filteredRecipes.forEach((recipe) => {
      if (recipe.ingredients.includes(ing)) {
        frequencyCount += 1;
        const matchWith = calculateMatch(recipe, hypotheticalInventory);
        if (matchWith >= 80) unlockCount += 1;
      }
    });

    const score = unlockCount * 10 + frequencyCount;
    scores.push({ ingredient: ing, score, unlockCount });
  });

  scores.sort((a, b) => b.score - a.score);
  return scores.slice(0, 6);
}
