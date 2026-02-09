# Product Requirements Document (PRD)
## Let's Cook - Ingredient-Based Recipe Discovery Application

**Version:** 1.0  
**Date:** February 2026  
**Document Owner:** Product Development Team  
**Project Status:** Requirements Definition Phase

---

## Executive Summary

### The Problem
Amateur cooks face three critical challenges when preparing meals:

1. **Decision Paralysis**: Spend 15-30 minutes deciding what to cook, often resorting to the same 3-5 recipes or ordering takeout
2. **Ingredient Waste**: Purchase ingredients for single recipes that go unused, wasting $30-50 per month
3. **Skill Assessment Gap**: Cannot judge recipe difficulty before starting, leading to failed attempts and loss of confidence

These problems are particularly acute for recent graduates living independently, college students on tight budgets, and intermediate cooks seeking to expand their repertoire.

### The Solution
Let's Cook is a mobile-first application that solves these problems through:

- **Ingredient-Based Discovery**: Shows only recipes users can make with ingredients they already have
- **Progressive Skill Building**: Automatically matches recipes to user's current ability with a 5-level chef progression system
- **Smart Inventory Management**: Tracks available ingredients and suggests strategic additions to unlock more recipes

### Target Users

**Primary:** Young adults (18-30) living independently for the first time who need practical cooking guidance

**Secondary:** College students with limited budgets seeking to minimize food waste and learn essential skills

**Tertiary:** Intermediate home cooks (25-35) wanting to expand beyond their current recipe rotation

### Vision Statement
Empower amateur cooks to confidently discover and prepare meals using available ingredients while progressively building culinary skills through a structured learning system.

### Success Criteria
- Users can identify 3+ makeable recipes within 2 minutes
- Recipe recommendations accurately reflect ingredient availability
- Chef level progression responds appropriately to completed recipes
- Inventory management persists accurately across sessions

---

## Table of Contents
1. [User Personas & Stories](#user-personas--stories)
2. [Product Features](#product-features)
3. [User Interface Specifications](#user-interface-specifications)
4. [Technical Overview](#technical-overview)
5. [Development Phases](#development-phases)
6. [Future Roadmap](#future-roadmap)
7. [Success Metrics](#success-metrics)

---

## User Personas & Stories

### Persona 1: The Independent Newcomer
**Demographics:** Age 23 | Living alone | Beginner cook (knows 3 recipes)

**Goals:** Learn to cook, save money on delivery, build independence

**Pain Points:** Decision paralysis, wastes money on single-use ingredients, orders delivery 4-5x/week, can't recreate successful dishes

**User Story:**
```
AS A recent graduate living alone
I WANT TO see recipes I can make with available ingredients
SO THAT I don't waste time deciding or money on delivery
```

---

### Persona 2: The Budget-Conscious Student  
**Demographics:** Age 20 | Shared apartment | $40-50/week budget

**Goals:** Eat well on budget, avoid food waste, learn practical skills

**Pain Points:** Buys ingredients without plan, time poverty, can't re-find social media recipes, no "middle ground" recipes

**User Story:**
```
AS A college student with limited budget
I WANT TO be guided through progressively difficult recipes
SO THAT I can build cooking skills without being overwhelmed
```

---

### Persona 3: The Aspiring Home Chef
**Demographics:** Age 28 | Lives with partner | Intermediate (5 go-to recipes)

**Goals:** Expand repertoire, develop improvisation confidence, impress partner

**Pain Points:** Can't assess difficulty before starting, decision fatigue, has ingredients but doesn't know what to make

**User Story:**
```
AS AN intermediate cook seeking growth
I WANT TO receive recipes matched to my skill level
SO THAT I can gradually build confidence
```

---

## Product Features

### Feature 1: Main Recipe Feed
**Priority:** P0 (Must Have)  
**Complexity:** Medium

**Description:**  
Vertical scrolling feed displaying recipe cards with intelligent sorting based on ingredient availability and user's chef level.

**Display Logic:**
- Minimum 3 recipes at user's level with 100% ingredient match (green border)
- Minimum 3 recipes at user's level with 1-3 missing ingredients (orange border)
- Minimum 3 recipes above user's level (grayed out, locked icon)

**Recipe Sorting Algorithm:**
```
Priority 1: Perfect matches (0 missing) at user's level
Priority 2: Near-matches (1-3 missing) at user's level  
Priority 3: Locked recipes (above user's level)
Within each priority: Sort by difficulty (easiest first)
```

**Recipe Card Components:**
- Large thumbnail image (16:9 ratio)
- Recipe name
- Difficulty rating (1-5 stars)
- Visual border indicating match status
- Lock icon for above-level recipes

**Interactions:**
- Tap recipe card → Opens recipe detail view ("Cookbook Page")
- Continuous scroll loads more recipes
- Pull-to-refresh updates recommendations

---

### Feature 2: "My Fridge" Sliding Panel
**Priority:** P0 (Must Have)  
**Complexity:** Medium

**Description:**  
Side panel accessible via hamburger menu (top-left) displaying user's ingredient inventory, chef level progress, and suggested ingredient additions.

**Components:**

**A. Chef Level Display** (Top of panel)
- Current level name (Kitchen Newbie, Home Cook, Skilled Chef, Master Chef, Culinary Expert)
- Star rating (0-5 stars)
- Progress bar: "X/5 recipes to [Next Level]"
- Progress text showing completion status

**B. Current Inventory Section**
- Scrollable list of ingredients
- Each ingredient shows: Name | Quantity | Unit
- Alphabetically sorted
- Empty state: "Add ingredients to get started!"

**C. Edit Inventory Button**
- Opens ingredient management interface
- Add ingredients from predefined list (searchable dropdown)
- Update quantities with unit selector
- Remove ingredients (swipe or delete button)
- Changes save immediately to local storage

**D. Suggested Ingredients Section** (Bottom of panel)
- Header: "Suggested Additions"
- List of 5-7 ingredients ranked by recipes unlocked
- Format: "[Ingredient Name] - Unlocks X recipes"
- Only suggests ingredients from recipes at user's level with ≤3 total missing
- Tap to add directly to inventory

**Navigation:**
- Hamburger menu icon (☰) in top-left of main screen
- Panel slides in from left (covers ~70% of screen width on mobile)
- Tap outside panel or X button to close
- Smooth slide animation

---

### Feature 3: Recipe Detail View ("Cookbook Page")
**Priority:** P0 (Must Have)  
**Complexity:** Low

**Description:**  
Full-screen view displaying complete recipe information when user taps a recipe card from main feed.

**Layout Components:**
- Large hero image (full width)
- Recipe name (large, bold text)
- Difficulty rating (star display)
- Prep time | Cook time | Servings
- Ingredients list with quantities and units
- Step-by-step numbered instructions
- "Mark as Complete" button (bottom, prominent)

**Mark as Complete Flow:**
1. User taps "Mark as Complete"
2. Popup: "Would you like to remove used ingredients from your fridge?" (Yes/No)
3. If Yes: Deduct ingredients from inventory
4. If No: Keep inventory unchanged
5. Show progress message: "Recipe completed! X/5 to [Next Level]"
6. If level-up: Show celebration modal with new level name
7. Return to main feed

**Navigation:**
- Back button returns to main feed
- Recipe stays visible for reference

---

### Feature 4: Recipe Database
**Priority:** P0 (Must Have)  
**Complexity:** Low

**Description:**  
Curated collection of 30 recipes with automatic difficulty ratings and complete cooking instructions.

**Database Structure:**
- Total: 30 recipes
- Distribution by difficulty:
  - 8 recipes: Level 0 (1★) - 3-5 ingredients, 3-5 steps
  - 7 recipes: Level 1 (2★) - 5-8 ingredients, 5-8 steps
  - 6 recipes: Level 2 (3★) - 8-12 ingredients, 8-12 steps
  - 5 recipes: Level 3 (4★) - 12-15 ingredients, 12-15 steps
  - 4 recipes: Level 4 (5★) - 15+ ingredients, 15+ steps

**Each Recipe Includes:**
- Unique ID
- Name
- Difficulty (1-5 stars, auto-calculated)
- Level required (0-4)
- Prep time, cook time
- Servings
- High-quality thumbnail image
- Ingredients array (name, quantity, unit)
- Instructions array (numbered steps)

**Difficulty Calculation:**
```
Score = (ingredient_count × 0.6) + (step_count × 0.4)
Score ≤ 5: 1 star
Score ≤ 10: 2 stars
Score ≤ 15: 3 stars
Score ≤ 20: 4 stars
Score > 20: 5 stars
```

---

### Feature 5: Chef Level Progression System
**Priority:** P0 (Must Have)  
**Complexity:** Medium

**Description:**  
Gamified skill-building system that tracks user progress and unlocks recipes as competency increases.

**Level Structure:**
| Level | Name | Stars | Requirement |
|-------|------|-------|-------------|
| 0 | Kitchen Newbie | ★☆☆☆☆ | Start |
| 1 | Home Cook | ★★☆☆☆ | Complete 5 Level 0 recipes |
| 2 | Skilled Chef | ★★★☆☆ | Complete 5 Level 1 recipes |
| 3 | Master Chef | ★★★★☆ | Complete 5 Level 2 recipes |
| 4 | Culinary Expert | ★★★★★ | Complete 5 Level 3 recipes |

**Progression Mechanics:**
- Users start at Level 0
- Complete 5 recipes at current level to advance
- Progress counter resets to 0/5 after level-up
- Only recipes at or below user's level are unlocked
- Higher-level recipes visible but grayed out (motivation)

---

### Feature 6: Basic Onboarding
**Priority:** P0 (Must Have)  
**Complexity:** Low

**Description:**  
First-time user experience explaining core concepts and prompting initial ingredient setup.

**Onboarding Flow:**
1. Welcome screen with app logo and tagline
2. Swipeable tutorial cards:
   - "Add ingredients to 'My Fridge'"
   - "Discover recipes you can make now"
   - "Complete recipes to level up"
3. Prompt: "Add your first ingredients"
   - Opens "My Fridge" in edit mode
   - User adds 5-10 initial ingredients
4. "Done" button saves and shows main feed with available recipes

**Behavior:**
- Only shown on first app launch
- Saved to local storage: `onboarding_completed: true`
- Never repeats (no "replay tutorial" option in MVP)

---

## User Interface Specifications

### Main Recipe Feed Layout

```
┌─────────────────────────────────────┐
│ ☰  Let's Cook              ⚙️       │ ← Header
├─────────────────────────────────────┤
│                                     │
│  ┌─────────────────────────────┐   │
│  │   [Recipe Image]            │   │
│  │                             │   │ ← Recipe Card
│  │   Pasta Carbonara      ★★☆  │   │   (green border)
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │   [Recipe Image]            │   │
│  │                             │   │ ← Recipe Card  
│  │   Chicken Stir-Fry     ★★☆  │   │   (orange border)
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │   [Recipe Image] 🔒         │   │
│  │                             │   │ ← Recipe Card
│  │   Beef Wellington      ★★★★ │   │   (grayed out)
│  └─────────────────────────────┘   │
│                                     │
│              [more recipes]         │
│                                     │
└─────────────────────────────────────┘
```

**Header:**
- Left: Hamburger menu (☰)
- Center: "Let's Cook" logo/text
- Right: Settings icon (⚙️)

**Recipe Card Specifications:**
- Border: Green (100% match), Orange (1-3 missing), None (locked)
- Image: Full width within card
- Text section with name + star rating

---

### "My Fridge" Sliding Panel Layout

```
┌─────────────────────────────────────┐
│  My Fridge                    ✕     │ ← Panel Header
├─────────────────────────────────────┤
│                                     │
│  Chef Level                         │
│  ★★☆☆☆ Home Cook                    │ ← Chef Level Display
│  [████████░░░░] 3/5 to Skilled Chef │
│                                     │
├─────────────────────────────────────┤
│  Current Inventory                  │
│                                     │
│  • Chicken Breast - 2 lbs           │
│  • Onion - 3 whole                  │ ← Scrollable
│  • Garlic - 5 cloves                │   Inventory List
│  • Olive Oil - 1 cup                │
│  • Tomatoes - 4 whole               │
│  • Rice - 2 cups                    │
│                                     │
│       [Edit Inventory]              │ ← Edit Button
│                                     │
├─────────────────────────────────────┤
│  Suggested Additions                │
│                                     │
│  • Basil - Unlocks 4 recipes        │
│  • Mozzarella - Unlocks 3 recipes   │ ← Suggested
│  • Bell Pepper - Unlocks 3 recipes  │   Ingredients
│  • Pasta - Unlocks 5 recipes        │
│                                     │
└─────────────────────────────────────┘
```

**Panel Specifications:**
- Slides from left edge
- Semi-transparent overlay dims main content
- Panel header with title and close button
- Chef level section with progress visualization
- Inventory list: Scrollable, alphabetically sorted
- Edit button: Full width
- Suggested section at bottom

---

### Recipe Detail ("Cookbook") Page Layout

```
┌─────────────────────────────────────┐
│  ← Back                             │ ← Navigation
├─────────────────────────────────────┤
│                                     │
│     [Large Hero Image]              │ ← Hero Image
│                                     │
│                                     │
├─────────────────────────────────────┤
│  Grilled Salmon Salad               │
│  ★★★☆☆                              │ ← Header Info
│  Prep: 15 min | Cook: 20 min        │
│  Serves: 2                          │
├─────────────────────────────────────┤
│  Ingredients                        │
│  • 2 salmon fillets (6 oz each)    │
│  • 4 cups mixed greens              │
│  • 1/2 cup cherry tomatoes          │ ← Scrollable
│  • 1/4 cup olive oil                │   Content
│  • 2 tbsp lemon juice               │
│                                     │
│  Instructions                       │
│  1. Season salmon with salt...     │
│  2. Heat olive oil in pan...        │
│  3. Cook salmon for 5 min...        │
│  4. Toss greens with dressing...   │
│                                     │
├─────────────────────────────────────┤
│    [Mark as Complete]               │ ← CTA Button
└─────────────────────────────────────┘
```

**Page Sections:**
- Navigation bar with back arrow
- Hero image: Full width
- Header info with name, stars, times, servings
- Content area: Scrollable with ingredients + instructions
- CTA button: Fixed at bottom, full width

---

## Technical Overview

### Technology Stack

**Frontend Framework:**
- React Native (Expo)
- Cross-platform (iOS & Android)

**State Management:**
- React Context API
- Local state with useState/useReducer

**Storage:**
- AsyncStorage (React Native local storage)
- Offline-first architecture

**Image Handling:**
- Local assets bundled with app
- Optimized for mobile display

**Navigation:**
- React Navigation (Stack Navigator)

---

### Data Persistence

**Local Storage Keys:**
- `letscook_userProfile`: Chef level and progress
- `letscook_inventory`: Ingredient list
- `letscook_completedRecipes`: Array of completed recipe IDs
- `letscook_onboarding`: Boolean flag

**Data Lifecycle:**
- All data stored locally
- No server communication in MVP
- Export/import functionality for future phases

---

## Development Phases

### Phase 1: Core Recipe Discovery
**Goal:** Users can browse recipes and manage inventory

**Deliverables:**
- Main recipe feed with 30 recipes
- Recipe card display with sorting logic
- "My Fridge" sliding panel UI
- Ingredient inventory CRUD operations
- Recipe recommendation algorithm
- Local storage integration

---

### Phase 2: Skill Progression
**Goal:** Users can complete recipes and level up

**Deliverables:**
- Recipe detail ("Cookbook") page
- "Mark as Complete" flow
- Ingredient deduction logic
- Chef level progression system
- Level-up celebration modal
- Progress persistence

---

### Phase 3: Onboarding & Polish
**Goal:** Smooth first-time experience and UX refinement

**Deliverables:**
- First-launch onboarding flow
- Suggested ingredients feature
- Visual polish and animations
- Error handling
- Performance optimization
- User testing and iteration

---

## Future Roadmap

### Phase 4: Recipe History & Analytics
**Description:**  
Track cooking history and provide insights into culinary progress over time.

**Key Features:**
- Completed recipes history view
- Weekly/monthly cooking statistics
- Favorite recipes collection
- Ingredient usage trends
- Export cooking data

---

## Success Metrics

### Functional Accuracy
- **Recipe Matching**: 100% of displayed recipes accurately reflect ingredient availability
- **Inventory Persistence**: User's ingredient list persists correctly across app restarts
- **Chef Level Calculation**: Progress tracking increments correctly after recipe completion
- **Recipe Filtering**: Only recipes at or below user's level appear unlocked

### Data Integrity
- **Ingredient Deduction**: Correct quantities removed when user marks recipe complete
- **Level Progression**: User advances to next level after completing exactly 5 recipes
- **Recipe Database**: All 30 recipes load with complete data (image, ingredients, instructions)
- **Suggested Ingredients**: Recommendations accurately reflect recipes that can be unlocked

### Performance
- **App Launch**: Application opens within 2 seconds
- **Recipe Feed Load**: Main feed displays within 1 second
- **Storage Efficiency**: App maintains data under 50MB for full usage
- **Crash Rate**: Application crash rate below 1%

---

## Risk Assessment & Mitigation

### Technical Risks

**Risk:** AsyncStorage limitations on older devices  
**Impact:** Medium  
**Mitigation:** Implement data compression, warn users at 80% capacity

**Risk:** Recipe database requires manual curation  
**Impact:** High  
**Mitigation:** Start with 30 diverse, well-tested recipes; expand based on user feedback

### User Experience Risks

**Risk:** Users abandon onboarding without adding ingredients  
**Impact:** High  
**Mitigation:** Keep onboarding to 3 screens, allow skip, prompt gently later

**Risk:** Difficulty ratings feel inaccurate to users  
**Impact:** Medium  
**Mitigation:** Use conservative calculation, allow feedback mechanism in future

---

## Appendix

### Recipe Difficulty Calculation

**Formula:**
```
Difficulty Score = (Ingredient Count × 0.6) + (Step Count × 0.4)

Star Mapping:
Score ≤ 5:  1 star (Level 0)
Score ≤ 10: 2 stars (Level 1)
Score ≤ 15: 3 stars (Level 2)
Score ≤ 20: 4 stars (Level 3)
Score > 20: 5 stars (Level 4)
```

**Example:**
- Recipe with 8 ingredients, 6 steps:
  - Score = (8 × 0.6) + (6 × 0.4) = 4.8 + 2.4 = 7.2
  - Rating: 2 stars (Level 1)

---

### Ingredient Predefined List

All ingredients from 30 recipes form the predefined list. Users can only add ingredients that exist in at least one recipe. This ensures:
- No orphaned inventory items
- Accurate recipe recommendations
- Manageable database size

**Categories** (for future organization):
- Proteins (chicken, beef, fish, tofu, eggs)
- Vegetables (onion, garlic, tomato, pepper, etc.)
- Grains (rice, pasta, bread, flour)
- Dairy (milk, cheese, butter, yogurt)
- Pantry (oil, salt, spices, sauces)

---

*End of Product Requirements Document*