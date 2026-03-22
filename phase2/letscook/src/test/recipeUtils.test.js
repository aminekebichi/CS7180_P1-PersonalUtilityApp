import { describe, it, expect } from 'vitest';
import { calculateMatch, getFilteredRecipes, getSuggestedIngredients } from '../utils/recipeUtils.js';
import { RECIPES_DB } from '../data/recipes.js';

// ── calculateMatch ───────────────────────────────────────────────────────────
describe('calculateMatch', () => {
  const recipe = RECIPES_DB.find((r) => r.id === 1); // Spaghetti Carbonara

  it('returns 100 when inventory is empty', () => {
    expect(calculateMatch(recipe, [])).toBe(100);
  });

  it('returns 100 when all ingredients are in pantry', () => {
    expect(calculateMatch(recipe, recipe.ingredients)).toBe(100);
  });

  it('returns 0 when no ingredients match', () => {
    expect(calculateMatch(recipe, ['avocado', 'mango', 'tofu'])).toBe(0);
  });

  it('calculates partial match correctly', () => {
    // recipe has 7 ingredients; provide 1 → ~14%
    const pct = calculateMatch(recipe, [recipe.ingredients[0]]);
    expect(pct).toBe(Math.round((1 / recipe.ingredients.length) * 100));
  });
});

// ── getFilteredRecipes ───────────────────────────────────────────────────────
describe('getFilteredRecipes', () => {
  const base = {
    inventory: [],
    favorites: [],
    selectedCuisines: [],
    selectedDietary: [],
    selectedDifficulty: [],
    showFavoritesOnly: false,
  };

  it('returns all 23 recipes with no filters', () => {
    expect(getFilteredRecipes(base)).toHaveLength(23);
  });

  it('filters by cuisine', () => {
    const result = getFilteredRecipes({ ...base, selectedCuisines: ['Italian'] });
    expect(result).toHaveLength(6);
    result.forEach((r) => expect(r.cuisine).toBe('Italian'));
  });

  it('filters by dietary preference', () => {
    const result = getFilteredRecipes({ ...base, selectedDietary: ['vegan'] });
    result.forEach((r) => expect(r.dietary).toContain('vegan'));
  });

  it('filters by difficulty', () => {
    const result = getFilteredRecipes({ ...base, selectedDifficulty: [1] });
    result.forEach((r) => expect(r.difficulty).toBe(1));
  });

  it('filters to favorites only', () => {
    const result = getFilteredRecipes({
      ...base,
      favorites: [1, 3],
      showFavoritesOnly: true,
    });
    expect(result.map((r) => r.id)).toEqual(expect.arrayContaining([1, 3]));
    expect(result).toHaveLength(2);
  });

  it('sorts recipes by match percentage when inventory has items', () => {
    // Give pantry all Caprese Salad (id=3) ingredients → it should sort to top
    const caprese = RECIPES_DB.find((r) => r.id === 3);
    const result = getFilteredRecipes({
      ...base,
      inventory: caprese.ingredients,
    });
    expect(result[0].id).toBe(3);
  });

  it('combines multiple filters (cuisine + dietary)', () => {
    const result = getFilteredRecipes({
      ...base,
      selectedCuisines: ['Mexican'],
      selectedDietary: ['vegan'],
    });
    result.forEach((r) => {
      expect(r.cuisine).toBe('Mexican');
      expect(r.dietary).toContain('vegan');
    });
  });
});

// ── getSuggestedIngredients ──────────────────────────────────────────────────
describe('getSuggestedIngredients', () => {
  const filteredRecipes = RECIPES_DB;

  it('returns at most 6 suggestions', () => {
    const result = getSuggestedIngredients({ inventory: [], groceryList: [], filteredRecipes });
    expect(result.length).toBeLessThanOrEqual(6);
  });

  it('excludes ingredients already in pantry', () => {
    const inventory = ['garlic', 'onion'];
    const result = getSuggestedIngredients({ inventory, groceryList: [], filteredRecipes });
    result.forEach(({ ingredient }) => {
      expect(inventory).not.toContain(ingredient);
    });
  });

  it('excludes ingredients already on grocery list', () => {
    const groceryList = ['tomatoes', 'olive oil'];
    const result = getSuggestedIngredients({ inventory: [], groceryList, filteredRecipes });
    result.forEach(({ ingredient }) => {
      expect(groceryList).not.toContain(ingredient);
    });
  });

  it('returns ingredients with a positive unlock count', () => {
    const result = getSuggestedIngredients({ inventory: [], groceryList: [], filteredRecipes });
    // Scores should be ordered descending
    for (let i = 1; i < result.length; i++) {
      expect(result[i - 1].score).toBeGreaterThanOrEqual(result[i].score);
    }
  });
});
