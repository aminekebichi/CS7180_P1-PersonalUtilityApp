# CLAUDE.md — LetsCook Recipe Discovery App

## Project Summary
- **App:** LetsCook — helps home cooks find recipes based on available pantry ingredients
- **Course:** CS7180 P1 (Personal Utility App)
- **Author:** Amine Kebichi
- **Status:** Phase 1 complete (docs in `phase1/`). Phase 2 = implementation.
- **Full spec:** `claude-code-prompt.md` | **PRD:** `phase1/letscook_prd.md` | **User stories:** `phase1/interviews/user_stories.md`

---

## Tech Stack
- React 18 + Vite
- Tailwind CSS — **core utility classes only, no JIT**
- React Router v6
- Lucide React icons
- React Context API + `useState`/`useEffect`
- `localStorage` for all persistence (no backend, no external APIs for MVP)

---

## Prescribed File Structure
```
letscook/
├── src/
│   ├── App.jsx
│   ├── components/
│   │   ├── StickyHeader.jsx
│   │   ├── SlidingMenu.jsx
│   │   ├── FilterPanel.jsx
│   │   ├── RecipeCard.jsx
│   │   ├── IngredientSelectorModal.jsx
│   │   ├── Notification.jsx
│   │   └── ClearConfirmDialog.jsx
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── RecipeDetailPage.jsx
│   │   ├── InventoryPage.jsx
│   │   └── CookingLogPage.jsx
│   ├── data/
│   │   ├── recipes.js        (23 recipes)
│   │   └── ingredients.js    (92 ingredients in 8 categories)
│   ├── utils/
│   │   └── recipeUtils.js    (calculateMatch, getFilteredRecipes, getSuggestedIngredients)
│   └── main.jsx
├── package.json
├── vite.config.js
└── tailwind.config.js
```

---

## Critical Constraints (non-obvious)

1. **No Tailwind JIT hover classes** — use inline styles for all hover animations:
   ```jsx
   onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(245, 158, 11, 0.1)'}
   onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
   style={{ transition: 'background-color 300ms ease-in-out' }}
   ```

2. **No direct localStorage in components** — always sync via `useEffect`:
   ```js
   useEffect(() => { setInventory(JSON.parse(localStorage.getItem('inventory') || '[]')); }, []);
   useEffect(() => { localStorage.setItem('inventory', JSON.stringify(inventory)); }, [inventory]);
   ```

3. **Bulk state updates must be atomic** — never use `forEach` to call state setters in a loop:
   ```js
   // WRONG: items.forEach(item => addToList(item));
   // CORRECT:
   setList([...list, ...items.filter(item => !list.includes(item))]);
   ```

4. **Ingredients stored lowercase** in DB/state; displayed with CSS `capitalize` or `.charAt(0).toUpperCase()` in UI.

5. **No nested buttons** (accessibility violation).

6. **3-column recipe grid** uses inline `style` for the 1000px breakpoint (not a Tailwind class):
   ```jsx
   <div className="grid grid-cols-1 sm:grid-cols-2 gap-5"
        style={{ gridTemplateColumns: window.innerWidth >= 1000 ? 'repeat(3, minmax(0, 1fr))' : undefined }}>
   ```

---

## Design System

**Colors:**
- Primary: Orange/Amber — `bg-amber-500`, `text-amber-600`, `border-amber-500` (`#f59e0b`)
- Secondary: Green — `bg-green-500`, `text-green-600`, `border-green-500` (`#22c55e`)
- Orange = pantry ingredients, primary CTAs, branding, toast notifications
- Green = suggested ingredients, "in pantry" indicators, positive actions

**Buttons:**
- Primary CTA: `bg-amber-500 hover:bg-amber-600 text-white py-3 px-4 rounded-lg font-medium`
- Secondary CTA: `bg-white border-2 border-amber-500 text-amber-600` (hover via inline style)
- Text link: `text-amber-600 hover:text-amber-700 font-medium text-sm`
- Destructive: `text-gray-500 hover:text-gray-700`

**Cards:**
- Default: `bg-white border border-gray-200 rounded-lg p-4`
- Orange theme: `border-2 border-amber-500`
- Green theme: `border border-green-500`

**Empty states:** `bg-gray-50 rounded-xl` with large gray-300 icon, gray-600 primary text, gray-500 secondary text.

**Toast notifications:** Fixed `top-20 left-1/2 -translate-x-1/2`, `bg-amber-500 text-white`, auto-dismiss after 3s.

---

## State Shape (localStorage keys)
| Key | Type | Description |
|---|---|---|
| `inventory` | `string[]` | Lowercase ingredient names in pantry |
| `groceryList` | `string[]` | Lowercase ingredient names on list |
| `favorites` | `number[]` | Recipe IDs |
| `cookingHistory` | `{recipeId, recipeName, date}[]` | Cooking log |
| `selectedCuisines` | `string[]` | Active cuisine filters |
| `selectedDietary` | `string[]` | Active dietary filters |
| `selectedDifficulty` | `number[]` | Active difficulty filters (1/2/3) |
| `showFavoritesOnly` | `boolean` | Favorites filter toggle |

---

## Key Algorithms (in `src/utils/recipeUtils.js`)

**Recipe match percentage:**
```js
calculateMatch(recipe, inventory) {
  if (inventory.length === 0) return 100;
  const matches = recipe.ingredients.filter(ing => inventory.includes(ing)).length;
  return Math.round((matches / recipe.ingredients.length) * 100);
}
```

**Filtering + sorting:**
```js
// Apply: favorites → cuisines → dietary → difficulty → sort by match% descending
```

**Smart suggestions (top 6):**
```js
// For each ingredient NOT in pantry or grocery list:
// unlockCount = recipes that would reach 80%+ match if added
// frequencyCount = recipes containing this ingredient
// score = (unlockCount × 10) + frequencyCount
// Return top 6, respecting active filters
```

---

## Data
- **Recipes:** 23 total — Italian (6), Mexican (5), Asian (4), Indian (2), Mediterranean (2), Greek (1), Colombian (3)
- **Ingredients:** 92 total across 8 categories — Produce, Meat & Seafood, Dairy & Eggs, Grains & Pasta, Canned & Jarred, Spices & Seasonings, Sauces & Condiments, Baking & Misc

---

## Course Requirements
- **Testing:** Vitest + React Testing Library, ≥50% coverage
- **CI/CD:** GitHub Actions pipeline
- **Deployment:** Vercel (public URL required)
- **CRUD:** All operations must be covered across user stories
- **User stories:** MoSCoW-prioritized; US1 (inventory) + US2 (recipe discovery) are must-haves for MVP
