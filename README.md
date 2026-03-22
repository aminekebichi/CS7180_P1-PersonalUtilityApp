# Let's Cook

**Course:** CS7180 — Personal Utility App (P1)
**Author:** Amine Kebichi

---

## Project Description

**Let's Cook** is a recipe discovery app for home cooks. Add the ingredients you already have to your pantry, and the app instantly surfaces recipes sorted by how many of those ingredients you already own. Missing a few items? Add them to your grocery list, move them to your pantry when you shop, and mark recipes as cooked to build your cooking history.

The app runs entirely in the browser — no account or internet connection required after the initial load. All data is persisted in `localStorage`.

---

## Features

- **Ingredient-based recipe matching** — recipes are ranked by what percentage of their ingredients you already have
- **My Pantry** — add and remove ingredients from your personal inventory
- **Grocery List** — save missing ingredients; move them to your pantry in one tap
- **Smart Suggestions** — the app recommends ingredients that unlock the most recipes for you (scored by unlock potential × 10 + frequency)
- **Cooking Log** — chronological record of every recipe you've marked as cooked
- **Filtering** — filter by cuisine (Italian, Mexican, Asian, Indian, Greek, Mediterranean, Colombian), dietary preference (Vegetarian, Vegan, Pescatarian), and chef level (Home / Sous / Master Chef)
- **Favorites** — heart any recipe to pin it and filter to favorites-only
- **Fully offline** — all state persists in `localStorage` across sessions

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI framework | React 18 + Vite |
| Styling | Tailwind CSS (core utilities only) |
| Routing | React Router v6 |
| Icons | Lucide React |
| State & persistence | React Context / `useState` + `localStorage` |
| Testing | Vitest + React Testing Library |
| CI/CD | GitHub Actions |
| Deployment | Vercel |

---

## Project Structure

```
CS7180_P1-PersonalUtilityApp/
├── phase1/                        # Research & planning
│   ├── letscook_prd.md            # Product Requirements Document
│   ├── reflection.md              # Phase 1 reflection
│   └── interviews/
│       ├── interview_transcript_1.md
│       ├── interview_transcript_2.md
│       ├── interview_transcript_3.md
│       └── user_stories.md        # MoSCoW-prioritized user stories
├── phase2/
│   └── letscook/                  # React application
│       ├── src/
│       │   ├── App.jsx            # Root component, global state, routing
│       │   ├── components/        # Shared UI components
│       │   │   ├── StickyHeader.jsx
│       │   │   ├── SlidingMenu.jsx
│       │   │   ├── FilterPanel.jsx
│       │   │   ├── RecipeCard.jsx
│       │   │   ├── IngredientSelectorModal.jsx
│       │   │   ├── Notification.jsx
│       │   │   └── ClearConfirmDialog.jsx
│       │   ├── pages/
│       │   │   ├── HomePage.jsx
│       │   │   ├── RecipeDetailPage.jsx
│       │   │   ├── InventoryPage.jsx
│       │   │   └── CookingLogPage.jsx
│       │   ├── data/
│       │   │   ├── recipes.js     # 23 mock recipes
│       │   │   └── ingredients.js # 92 ingredients across 8 categories
│       │   ├── utils/
│       │   │   └── recipeUtils.js # calculateMatch, getFilteredRecipes, getSuggestedIngredients
│       │   └── test/              # Vitest + RTL test files
│       ├── package.json
│       ├── vite.config.js
│       └── tailwind.config.js
├── CLAUDE.md                      # AI assistant context file
├── claude-code-prompt.md          # Technical specification
└── README.md
```

---

## Running Locally

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher

### Steps

```bash
# 1. Clone the repository
git clone <repo-url>
cd CS7180_P1-PersonalUtilityApp

# 2. Navigate to the app directory
cd phase2/letscook

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Other Commands

```bash
# Production build
npm run build

# Preview production build locally
npm run preview

# Run tests
npm test

# Run tests with coverage report
npm run test:coverage
```

---

## Data

- **23 recipes** across 7 cuisines: Italian (6), Mexican (5), Asian (4), Indian (2), Mediterranean (2), Greek (1), Colombian (3)
- **92 ingredients** organized into 8 grocery store categories: Produce, Meat & Seafood, Dairy & Eggs, Grains & Pasta, Canned & Jarred, Spices & Seasonings, Sauces & Condiments, Baking & Misc

---

## User Personas

| Persona | Description |
|---|---|
| **Solo Student / Graduate** | Ages 20–25, beginner cook, limited budget (~$40–50/week), wants simple weeknight meals |
| **Budget-Conscious Cook** | Ages 20–30, intermediate level, strict budget, focused on reducing food waste |
| **Skill-Building Home Cook** | Ages 25–35, intermediate with growth aspirations, wants to expand their recipe repertoire |

---

## User Stories (MoSCoW)

| Priority | Story |
|---|---|
| Must Have | US1 — Easy Inventory Management: add, view, update, and remove pantry ingredients with persistence |
| Must Have | US2 — Ingredient-Based Recipe Discovery: find and sort recipes by available ingredients |
| Should Have | US3 — Recipe Completion Tracking: mark recipes as cooked and maintain cooking history |
| Should Have | US4 — Progressive Skill Building: filter by difficulty level |
| Could Have | US5 — Smart Ingredient Suggestions: show which ingredients unlock the most recipes |

---

## Course Requirements

| Requirement | Status |
|---|---|
| Problem validation via user interviews | ✓ 3 interviews in `phase1/interviews/` |
| 5+ user stories with CRUD coverage | ✓ US1–US5 covering all CRUD operations |
| ≥50% test coverage | ✓ 76.6% statement coverage, 74 tests |
| GitHub Actions CI/CD | ✓ Automated test pipeline |
| Public deployment | Vercel |
