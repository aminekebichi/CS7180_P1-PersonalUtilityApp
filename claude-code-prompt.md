# Claude Code Prompt - LetsCook Recipe Discovery Application

## Project Overview
Build a full-stack React recipe discovery application called "LetsCook" that helps home cooks find recipes based on available ingredients, manage their pantry inventory, and track cooking history. The app solves decision paralysis by intelligently matching recipes to what users already have.

## Core User Flow
1. User adds ingredients they have to "My Pantry"
2. Homepage displays recipes sorted by ingredient match percentage (recipes they can make with what they have appear first)
3. User can add missing ingredients to a grocery list
4. Smart suggestions recommend ingredients that unlock the most recipes
5. User marks recipes as cooked to track their cooking journey

## Technical Stack Requirements

**Frontend:**
- React 18 with Vite
- Tailwind CSS for styling (use only core utility classes - no JIT-compiled classes)
- React Router v6 for navigation
- Lucide React for icons (ChefHat, Heart, History, Package, Filter, ShoppingCart, Plus, Minus, ArrowUpRight, Search, X, Menu, Clock, Users)

**State Management:**
- React Context API or useState/useEffect
- localStorage for data persistence (inventory, groceryList, favorites, cookingHistory, filters)

**Data:**
- Mock recipe database with 23 recipes (see recipe data structure below)
- 92 ingredients organized into 8 grocery store categories
- No external APIs required for MVP

## Design System

**Color Palette:**
- Primary Theme: Orange/Amber (`#f59e0b` / `bg-amber-500`, `text-amber-600`, `border-amber-500`)
- Secondary Theme: Green (`#22c55e` / `bg-green-500`, `text-green-600`, `border-green-500`)
- Use orange for: primary CTAs, pantry ingredients, main branding, notifications
- Use green for: suggested ingredients, positive actions, "in pantry" indicators

**Typography & Spacing:**
- Headers: `text-2xl font-bold` (page titles), `text-lg font-semibold` (section headers)
- Body: `text-sm` or `text-base`, `text-gray-900` for primary text, `text-gray-600` for secondary
- Padding: `p-4` to `p-6` for cards, `px-5 py-6` for page content
- Rounded corners: `rounded-lg` (small elements), `rounded-xl` (cards/modals), `rounded-2xl` (large modals)

**Interactive Elements:**
- Minimum touch target: 44px height
- Hover animations: 300ms ease-in-out background opacity transitions (0% → 10%)
- Use inline styles for animations:
```javascript
onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(245, 158, 11, 0.1)'}
onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
style={{ transition: 'background-color 300ms ease-in-out' }}
```

## Component Structure

### 1. Sticky Header (All Pages)
- Clickable logo (ChefHat icon) + "Let's Cook" title → navigates to home
- Filter icon (shows badge when filters active)
- Hamburger menu icon (always visible, never changes to X)
- Sticky positioning with `sticky top-0 bg-white z-10 border-b border-gray-100`

### 2. Sliding Navigation Menu
- Slides in from right side
- Backdrop overlay (semi-transparent black)
- Menu items:
  - Home (ChefHat icon)
  - My Pantry (Package icon)
  - Cooking Log (History icon)
- Close button (X icon) in header

### 3. Filter Panel (Slide-out from right)
- **Cuisine Type section:** Checkboxes for Italian, Mexican, Asian, Indian, Greek, Mediterranean, Colombian
- **Dietary Preferences section:** Vegetarian, Vegan, Pescatarian
- **Chef Level section:** 
  - Home Chef (1 ChefHat icon, right-aligned)
  - Sous Chef (2 ChefHat icons, right-aligned)
  - Master Chef (3 ChefHat icons, right-aligned)
- **Other Filters section:** "Favorites" checkbox
- "Clear All Filters" button at bottom
- Badge indicator on filter icon when any filter active

### 4. Homepage - Recipe Catalog
- Grid layout: 1 column (mobile), 2 columns (640px+), 3 columns (1000px+)
- Active filters display: Blue badges (cuisine), Green badges (dietary), Amber badges (chef level), Red badge (favorites)
- Info card when pantry has ingredients: "🎯 Showing recipes based on your X ingredients" with clickable link to pantry
- Recipe cards display:
  - Emoji thumbnail with gradient background (`bg-gradient-to-br from-orange-100 to-amber-50`)
  - Recipe name (text-lg font-semibold)
  - Description (text-sm, line-clamp-2)
  - Time (Clock icon + minutes)
  - Servings (Users icon + count)
  - Difficulty badge (1-3 ChefHat icons in `bg-amber-50` badge)
  - Heart icon for favorites (outline when not favorited, filled red when favorited)
  - Ingredient match percentage with color-coded progress bar when pantry has items:
    - 100% match: green bar (`bg-green-500`)
    - 80-99% match: amber bar (`bg-amber-500`)
    - <80% match: gray bar (`bg-gray-400`)

### 5. Recipe Detail Page
- "← Back to Recipes" navigation button
- Large emoji hero image
- Recipe title with favorite heart button
- Description
- Metadata cards: Total Time, Servings, Skill Level (with icons)
- Ingredient match card (when pantry has items) with percentage and progress bar
- Ingredients section:
  - Header with "+ Add all to list" button (adds all missing ingredients to grocery list)
  - Each ingredient row shows:
    - Dot indicator: green (in pantry), orange (on grocery list), gray (missing)
    - Ingredient name (capitalized)
    - Status: "✓ In pantry" (green), "📝 On list" (orange), or "+ Add to list" button (orange)
  - Background colors: green-50 (in pantry), amber-50 (on list), gray-50 (missing)
- Instructions section: Numbered steps with circular amber badges (1, 2, 3...)
- "Mark as Cooked" button (full-width, orange when not cooked, green when previously cooked)

### 6. My Pantry Page (Combined Inventory Management)

**Section 1: Suggested Additions**
- Algorithm calculates ingredients that unlock most recipes:
  - Combined score: `(unlockCount × 10) + frequencyCount`
  - Shows top 6 ingredients not in pantry or grocery list
  - Respects active filters
- Display: 2-column grid
- Each card: green border, ingredient name (capitalized), "+X recipes" count, Plus icon (right-aligned)
- Entire card is clickable button → adds to grocery list with notification
- Hover: 10% green background fade

**Section 2: Current Ingredients**
- 2-column grid
- Each card: orange border (`border-2 border-amber-500`), white background, ingredient name (capitalized), Minus icon (right-aligned, orange)
- Entire card is clickable button → removes from pantry with notification
- Hover: 10% orange background fade

**Section 3: Grocery List**
- Buttons (in order):
  1. "+ Add All to Pantry" - Full-width orange CTA (only shows when list has items)
  2. "Search Ingredients" - Full-width white button with orange border, Search icon, orange text
- Ingredient list items:
  - White background, gray border
  - Ingredient name (capitalized)
  - ArrowUpRight icon button (orange) → moves to pantry
  - X icon button (gray, hover red) → removes from list
- Bottom actions (when list has items):
  - "- Clear grocery list" gray text link → shows confirmation dialog

### 7. Ingredient Selector Modal
- Triggered by "Search Ingredients" button
- Backdrop overlay (semi-transparent black)
- Centered modal with max-width
- **Category View:**
  - 8 categories in 2-column grid:
    - Produce, Meat & Seafood, Dairy & Eggs, Grains & Pasta
    - Canned & Jarred, Spices & Seasonings, Sauces & Condiments, Baking & Misc
  - Each category button: white background, orange border (`border-2`), orange text, shows item count
  - Hover: 10% orange background fade
- **Ingredient View (after selecting category):**
  - "← Back to categories" orange text link
  - 2-column grid of ingredients
  - Each button: white background, gray border, capitalized name
  - Hover: 10% green background fade
  - Click → adds to grocery list with notification

### 8. Cooking Log Page
- Chronological list of cooked recipes
- Each entry: white background, orange border (`border-2 border-amber-500`)
- Shows: recipe name, date cooked, ChefHat icon (right-aligned, orange)
- Entire card clickable → navigates to recipe detail
- Hover: 10% orange background fade

### 9. Toast Notification System
- Fixed positioning: top-center (`top-20 left-1/2 transform -translate-x-1/2`)
- Orange background (`bg-amber-500`), white text
- Shows checkmark icon + message
- Auto-dismiss after 3 seconds
- Triggered for: add/remove pantry, add/remove grocery list, move to pantry, bulk operations

### 10. Confirmation Dialog (Clear Grocery List)
- Triggered by "Clear grocery list" button
- Backdrop overlay
- Centered modal: "Clear Grocery List?" title, warning message
- Two buttons: "Cancel" (gray), "Clear List" (red)
- Click outside backdrop → dismisses

## Recipe Data Structure
```javascript
{
  id: number,
  name: string,
  description: string,
  cuisine: "Italian" | "Mexican" | "Asian" | "Indian" | "Greek" | "Mediterranean" | "Colombian",
  difficulty: 1 | 2 | 3, // 1=Home Chef, 2=Sous Chef, 3=Master Chef
  prepTime: number, // minutes
  cookTime: number, // minutes
  servings: number,
  image: string, // emoji for MVP
  ingredients: string[], // lowercase ingredient names
  dietary?: string[], // optional: ["vegetarian"], ["vegan"], ["pescatarian"]
  instructions: string[] // step-by-step array
}
```

## Key Algorithms

**Recipe Matching:**
```javascript
calculateMatch(recipe) {
  if (inventory.length === 0) return 100;
  const matches = recipe.ingredients.filter(ing => inventory.includes(ing)).length;
  return Math.round((matches / recipe.ingredients.length) * 100);
}
```

**Recipe Filtering & Sorting:**
```javascript
getFilteredRecipes() {
  let filtered = RECIPES_DB;
  
  // Apply filters in order:
  if (showFavoritesOnly) filtered = filtered.filter(r => favorites.includes(r.id));
  if (selectedCuisines.length > 0) filtered = filtered.filter(r => selectedCuisines.includes(r.cuisine));
  if (selectedDietary.length > 0) filtered = filtered.filter(r => selectedDietary.some(diet => r.dietary?.includes(diet)));
  if (selectedDifficulty.length > 0) filtered = filtered.filter(r => selectedDifficulty.includes(r.difficulty));
  
  // Sort by ingredient match (highest first)
  if (inventory.length > 0) {
    filtered = filtered.sort((a, b) => calculateMatch(b) - calculateMatch(a));
  }
  
  return filtered;
}
```

**Smart Suggestions:**
```javascript
getSuggestedIngredients() {
  // For each ingredient not in pantry or grocery list:
  // 1. Count how many filtered recipes contain it (frequency)
  // 2. Count recipes that would reach 80%+ match with it (unlock potential)
  // 3. Combined score = (unlockCount × 10) + frequencyCount
  // 4. Sort by score descending, return top 6
}
```

## Critical Implementation Notes

**DO NOT use localStorage directly in components** - This will cause issues. Use React state with useEffect to sync to localStorage:
```javascript
const [inventory, setInventory] = useState([]);

useEffect(() => {
  const saved = JSON.parse(localStorage.getItem('inventory') || '[]');
  setInventory(saved);
}, []);

useEffect(() => {
  localStorage.setItem('inventory', JSON.stringify(inventory));
}, [inventory]);
```

**Bulk Operations Must Use Single State Updates:**
```javascript
// WRONG - causes state conflicts
items.forEach(item => addToList(item));

// CORRECT - single atomic update
setList([...list, ...items.filter(item => !list.includes(item))]);
```

**Capitalize Ingredients in Display:**
All ingredient names stored lowercase in database, display with CSS `capitalize` class or JavaScript `.charAt(0).toUpperCase()`.

**Responsive Grid for Recipes:**
Use inline style for custom breakpoint:
```javascript
<div className="grid grid-cols-1 sm:grid-cols-2 gap-5" 
     style={{ gridTemplateColumns: window.innerWidth >= 1000 ? 'repeat(3, minmax(0, 1fr))' : undefined }}>
```

## File Structure
```
letscook/
├── src/
│   ├── App.jsx (main component with routing)
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
│   │   ├── recipes.js (23 recipes)
│   │   └── ingredients.js (ingredient categories)
│   ├── utils/
│   │   └── recipeUtils.js (calculateMatch, getFilteredRecipes, getSuggestedIngredients)
│   └── main.jsx
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## Recipes to Include (23 total)

**Italian (6):** Spaghetti Carbonara, Margherita Pizza, Caprese Salad, Mushroom Risotto, Shrimp Scampi, Eggplant Parmesan

**Mexican (5):** Tacos al Pastor, Beef Burrito Bowl, Black Bean Tacos, Chicken Fajitas, Fish Tacos

**Asian (4):** Chicken Stir-Fry, Pad Thai, Tom Yum Soup, Salmon Teriyaki

**Indian (2):** Vegetable Curry, Chicken Tikka Masala

**Mediterranean (2):** Lentil Soup, Quinoa Buddha Bowl

**Greek (1):** Greek Salad

**Colombian (3):** Bandeja Paisa, Ajiaco Colombiano, Empanadas Colombianas

## Ingredient Categories (92 ingredients)

**Produce (28):** avocado, bell peppers, broccoli, cabbage, carrots, cauliflower, celery, cucumber, eggplant, fresh basil, garlic, ginger, kale, lemon, lettuce, lime, mushrooms, onion, red onion, pineapple, plantain, potatoes, spinach, sweet potato, tomatoes, cilantro, parsley, green onions

**Meat & Seafood (9):** chicken breast, ground beef, pork shoulder, pork belly, chorizo, salmon fillets, shrimp, white fish, pancetta

**Dairy & Eggs (10):** butter, cheese, cream, eggs, fried egg, feta cheese, mozzarella, parmesan, sour cream, yogurt

**Grains & Pasta (11):** arborio rice, arepa, corn flour, corn tortillas, flour tortillas, linguine, pizza dough, quinoa, rice, rice noodles, spaghetti

**Canned & Jarred (10):** black beans, red beans, chickpeas, coconut milk, kalamata olives, lentils, tomato sauce, vegetable broth, capers, aji sauce

**Spices & Seasonings (12):** bay leaf, black pepper, chili, chili powder, cumin, curry powder, garam masala, guasca, oregano, paprika, red pepper flakes, salt, turmeric

**Sauces & Condiments (9):** balsamic vinegar, fish sauce, honey, olive oil, soy sauce, tahini, tamarind paste, vegetable oil, white wine

**Baking & Misc (8):** bean sprouts, breadcrumbs, corn, flour, galangal, lemongrass, lime leaves, peanuts, sesame seeds

## Feature Requirements

### Smart Recipe Sorting
- When inventory has items, recipes MUST be sorted by `calculateMatch()` descending
- Recipes with highest ingredient match appear first
- Updates automatically when inventory changes
- Show match percentage and progress bar on each card

### Ingredient State System
Three possible states for every ingredient:
1. **In Pantry** (green): `bg-green-50 border-green-200`, green dot, "✓ In pantry" label
2. **On Grocery List** (orange): `bg-amber-50 border-amber-200`, orange dot, "📝 On list" label  
3. **Missing** (gray): `bg-gray-50`, gray dot, "+ Add to list" button

### Suggested Ingredients Algorithm
Must calculate combined score considering both unlock potential AND ingredient frequency:
- Unlock score: How many recipes would reach 80%+ match
- Frequency score: How many recipes contain this ingredient
- Combined: `(unlockCount × 10) + frequencyCount`
- Return top 6 ingredients
- Exclude items already in pantry or grocery list
- Respect active cuisine/dietary filters

### Bulk Operations
Critical: All bulk operations MUST use single state updates to prevent conflicts:
- "Add all to list" in recipe details
- "Add All to Pantry" in grocery list
- Moving multiple ingredients at once

### Data Persistence
Save to localStorage on every state change:
- `inventory` array
- `groceryList` array
- `favorites` array (recipe IDs)
- `cookingHistory` array (objects with recipeId, recipeName, date)
- `selectedCuisines` array
- `selectedDietary` array
- `selectedDifficulty` array (1, 2, 3)
- `showFavoritesOnly` boolean

## User Interactions & Notifications

**Show orange toast notification for:**
- Add ingredient to pantry: "[ingredient] added to pantry"
- Remove ingredient from pantry: "[ingredient] removed from pantry"
- Add ingredient to grocery list: "[ingredient] added to grocery list"
- Remove from grocery list: "[ingredient] removed from grocery list"
- Move to pantry: "[ingredient] added to pantry"
- Bulk move: "Moved X items to pantry!"
- Bulk add to list: "Added X items to grocery list!"
- Clear list: "Grocery list cleared"
- Mark as cooked: "Recipe marked as cooked! 🎉"

**Confirmation dialogs required for:**
- Clear grocery list (destructive action)

## Styling Specifics

**Buttons:**
- Primary CTA: `bg-amber-500 hover:bg-amber-600 text-white py-3 px-4 rounded-lg font-medium`
- Secondary CTA: `bg-white hover:bg-amber-50 border-2 border-amber-500 text-amber-600`
- Text link: `text-amber-600 hover:text-amber-700 font-medium text-sm`
- Destructive: `text-gray-500 hover:text-gray-700` with Minus icon

**Cards:**
- White background: `bg-white`
- Border variations: `border border-gray-200` (default), `border-2 border-amber-500` (orange theme), `border border-green-500` (green theme)
- Padding: `p-3` to `p-4`
- Rounded: `rounded-lg` or `rounded-xl`

**Empty States:**
- Background: `bg-gray-50 rounded-xl`
- Large icon (16x16) in gray-300
- Primary message in gray-600
- Secondary message in gray-500 text-sm

## Testing Checklist
- [ ] Recipes sort by ingredient match when pantry has items
- [ ] Filters persist across browser sessions
- [ ] Bulk operations add/move ALL items (not just one)
- [ ] Suggested ingredients update when inventory/filters change
- [ ] Animations work smoothly (not Tailwind JIT classes)
- [ ] All 92 ingredients accessible through category browser
- [ ] Clicking ingredient cards triggers correct action
- [ ] Notifications appear and auto-dismiss after 3 seconds
- [ ] Mobile responsive (320px minimum width)
- [ ] Desktop shows 3 recipe columns at 1000px+

## Common Pitfalls to Avoid

1. **DO NOT** use Tailwind classes like `hover:bg-amber-500/10` - use inline styles instead
2. **DO NOT** use `forEach` loops for bulk state updates - use spread operators
3. **DO NOT** forget to filter out duplicates when adding to arrays
4. **DO NOT** use lowercase ingredient names in UI - capitalize them
5. **DO NOT** create nested buttons (accessibility violation)
6. **DO NOT** forget localStorage sync in useEffect hooks
7. **DO NOT** skip the confirmation dialog for destructive actions

## Success Criteria
- User can add ingredients to pantry and see recipes automatically re-sort
- Suggested ingredients show personalized recommendations based on current state
- Grocery list workflow: search ingredients → add to list → move to pantry (with bulk actions)
- All filters work independently and in combination
- Cooking history tracks user progress over time
- App is fully functional offline (all data in localStorage)
- Clean, professional UI matching design system specifications