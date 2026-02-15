## Problem Statement
Amateur home cooks face three interconnected challenges when deciding what to cook:

#### Decision Paralysis
Users spend 15-30 minutes staring at their fridge or scrolling through recipe websites trying to decide what to make. This mental overhead leads to:

- Repeatedly making the same 3-5 "safe" recipes out of boredom and exhaustion
- Ordering delivery 4-5 times per week despite wanting to cook more
- Giving up on cooking attempts altogether when the decision feels too complex

**User Quote:** _"I opened my fridge and just stared at it for like five minutes. I had some chicken that was going to expire soon, some random vegetables, and I was just like... what do I even do with this?"_ — Recent Graduate, Interview #1

#### Ingredient Waste & Budget Impact
Users purchase ingredients for single recipes but lack guidance on reusing them, resulting in:
- $30-50 per month in wasted specialty ingredients
- Duplicate purchases of items they already own
- Guilt and financial stress from throwing away unused food

**User Quote:** _"Bought all these ingredients - lemongrass, fish sauce, coconut milk. Made it once, it was okay, and now all those ingredients are just sitting in my pantry. Total waste of money."_ — Recent Graduate, Interview #1

#### Skill Assessment Gap
Users cannot accurately judge recipe difficulty before starting, leading to:
- Failed cooking attempts that waste 2+ hours and $25+ in ingredients
- Loss of confidence after repeated failures
- Risk aversion that keeps them trapped in a limited recipe rotation

**User Quote:** _"The gnocchi was definitely outside my abilities but I didn't realize that until I was already in the middle of it. After two hours we ended up ordering pizza."_ — Aspiring Home Chef, Interview #3

**The Core Insight:** Users don't need more recipes — they need **contextual guidance** that answers: "What can I make RIGHT NOW with what I have, that matches my current skill level, and won't take forever?"

---

## Target Users (from empathy mapping)

#### Primary Persona: The Solo Student/Graduate
- **Demographics:** Ages 20-25, living independently for first time, full-time student or early career
- **Cooking Experience:** Beginner (knows 3-5 basic recipes)
- **Budget:** $40-50/week for groceries
- **Pain Points:**
    - Decision paralysis when facing fridge full of random ingredients
    - Wastes money on single-use specialty ingredients ($30-40 per attempt)
    - No organized system for tracking pantry inventory
    - Orders delivery due to decision fatigue despite wanting to save money
- **Motivations:** Save money, build independence, eat healthier than takeout
- **Quote:** _"I'll look at a recipe and it either seems too basic and boring, or way too complicated and intimidating. There's no middle ground."_

#### Secondary Persona: The Budget-Conscious Cook
- **Demographics:** Ages 20-30, shared living situations, time-constrained schedules
- **Cooking Experience:** Beginner to intermediate, limited technique knowledge
- **Budget:** Strict weekly grocery budget, cost-per-meal conscious
- **Pain Points:**
    - Buys groceries without meal plan, ends up with random ingredients
    - Cannot re-find recipes discovered on social media
    - Time poverty (needs meals in <30 minutes on weeknights)
    - Food waste from unused vegetables/proteins
- **Motivations:** Minimize waste, learn practical skills, quick weeknight meals
- **Quote:** _"We end up buying stuff without really having a plan. Then by Wednesday we're looking at random ingredients like 'what do we do with eggplant?'"_

#### Tertiary Persona: The Skill-Building Home Cook
- **Demographics:** Ages 25-35, established but wants to expand repertoire
- **Cooking Experience:** Intermediate (has 5-7 go-to recipes, wants to grow)
- **Budget:** Moderate flexibility, willing to invest in ingredients
- **Pain Points:**
    - Stuck in rotation of same 5 recipes due to fear of weeknight failure
    - Cannot accurately assess difficulty before attempting new recipes
    - Has ingredients but doesn't know what combinations work together
    - Wants to build improvisation confidence but lacks structured progression
- **Motivations:** Expand repertoire, gain confidence, impress others, eventual improvisation ability
- **Quote:** _"I wish there was a way to know what I can make with what I already have, and have it be something new and interesting that's also at my skill level."_
---
## User Stories
#### US1: Input Available Ingredients
```
AS A user with ingredients in my kitchen
I WANT TO quickly add what I currently have available
SO THAT I can see relevant recipe suggestions without manual searching
```

**Acceptance Criteria:**
- User can search and select ingredients from a predefined dropdown list
- Selected ingredients display in a visible inventory list
- Ingredient list persists in browser storage between sessions
- User can view their current ingredient inventory at any time
- Interface loads and responds within 2 seconds
---
#### US2: Discover Recipes from Inventory
```
AS A user who has input my ingredients
I WANT TO see recipes I can make with what I have right now
SO THAT I avoid decision paralysis and unnecessary grocery trips
```

**Acceptance Criteria:**
- Display at least 3-5 recipe suggestions with ≥80% ingredient match
- "Perfect match" recipes (100% ingredient availability) are visually distinguished
- Missing ingredients are clearly indicated for near-match recipes
- Recipes display with name, image, difficulty level, and prep/cook time
- Recipe list updates immediately when ingredient inventory changes
---
#### US3: View Complete Recipe Instructions
```
AS A user ready to start cooking
I WANT TO view complete recipe details with all ingredients and steps
SO THAT I can successfully prepare the dish without confusion
```

**Acceptance Criteria:**
- Recipe detail page shows complete ingredients list with quantities and units
- Step-by-step instructions are numbered and clearly formatted
- Prep time, cook time, and servings are displayed prominently
- Recipe includes a thumbnail or hero image
- Clear navigation button returns user to recipe list

---

#### US4: Track Completed Recipes
```
AS A user who has finished cooking a recipe
I WANT TO mark it as "cooked" and see my cooking history
SO THAT I can track my progress and remember successful meals
```

**Acceptance Criteria:**
- "Mark as Cooked" button is prominently displayed on recipe detail page
- Clicking button saves recipe to cooking log with timestamp
- Cooking history displays chronologically with recipe names and completion dates
- Completed recipes persist across browser sessions
- User can access cooking history from main navigation

---

#### US5: Manage Ingredient Inventory
```
AS A user managing my kitchen ingredients
I WANT TO update quantities and remove used items
SO THAT my recipe suggestions stay accurate over time
```

**Acceptance Criteria:**
- User can remove individual ingredients from inventory list
- User can edit ingredient quantities with appropriate units
- Changes to inventory immediately reflect in recipe suggestions
- Deleted ingredients are removed from inventory view
- Confirmation prompt appears before deleting ingredients to prevent accidents

---

### Should-Have (Post-MVP)

**US6: Filter Recipes by Cuisine Type**

```
AS A user with specific cuisine preferences
I WANT TO filter recipe suggestions by type (Italian, Asian, Mexican, etc.)
SO THAT I can cook food matching my current craving
```

**Priority:** P1 (High)  
**Acceptance Criteria:**

- Dropdown filter with 5-7 cuisine categories
- Filtered results update immediately
- Can clear filter to see all recipes **CRUD:** Read (filtered query)

---

**US7: Near-Match Recipe Suggestions**

```
AS A user missing 1-2 ingredients for a recipe
I WANT TO see these "near-match" recipes with missing items highlighted
SO THAT I can decide if a quick store run is worth it
```

**Priority:** P1 (High)  
**Acceptance Criteria:**

- Display recipes with 70-79% ingredient match separately
- Highlight missing ingredients in red or with icon
- Sort by fewest missing ingredients first **CRUD:** Read (fuzzy matching query)

---

### Nice-to-Have (Future Iterations)

**US8: Progressive Skill-Level Matching**

```
AS A home cook wanting to improve my skills
I WANT recipes matched to my current ability level
SO THAT I'm challenged but not overwhelmed
```

**Priority:** P2 (Medium)  
**Acceptance Criteria:**

- User profile tracks skill level (beginner/intermediate/advanced)
- Recipe difficulty ratings based on ingredient count + step complexity
- Suggestions prioritize appropriate difficulty **CRUD:** Update (user profile skill level)

---

## Success Metrics

#### Functional Accuracy (Primary)
- **Recipe Matching:** 100% of displayed recipes accurately reflect ingredient availability based on user's inventory
- **Ingredient Match Rate:** Top 3 recipe suggestions have ≥80% ingredient match
- **Data Persistence:** User's ingredient list and cooking log persist correctly across browser sessions with 100% accuracy
- **Recipe Completeness:** All recipes load with complete data (image, ingredients, instructions, timing)

#### Technical Performance (Secondary)
- **Page Load Time:** Recipe suggestions render in <2 seconds after ingredient input
- **Interface Responsiveness:** All user interactions (add/remove ingredients, view recipes, mark as cooked) respond within 1 second
- **Error Handling:** Application gracefully handles edge cases (empty inventory, no recipe matches, missing data)
- **Test Coverage:** ≥50% code coverage (course requirement)
- **Crash Rate:** Application maintains stability with <1% error rate during manual testing

#### Feature Completeness (Quality Gates)
- **CRUD Operations:** All 5 user stories implement required Create, Read, Update, and Delete operations
- **Cross-browser Compatibility:** Application functions correctly on Chrome, Firefox, Safari, and Edge (latest versions)
- **Mobile Responsiveness:** Interface is usable on mobile devices (320px minimum width)
- **Accessibility:** Basic keyboard navigation works for all core features
---
## Technical Constraints

#### Tech Stack
**Frontend:**
- **Framework:** React 18 with Vite
- **UI Library:** Tailwind CSS for responsive styling
- **State Management:** React Context API (sufficient for MVP scope)
- **Routing:** React Router v6
- **Responsive Design:** Mobile-first approach with breakpoints for tablet and desktop viewports

**Backend/Database:**
- **BaaS:** Firebase (Firestore + Firebase Auth)
  - Firestore for recipes, user data, cooking logs
  - Firebase Auth for user account management
  - **Free Tier Limits:** 50K reads/day, 20K writes/day, 1GB storage

**Hosting:**
- **Frontend:** Vercel (auto-deploys from GitHub main branch)
- **Custom Domain:** Optional (Vercel provides free subdomain)

**Recipe Data Source:**
- **Option A:** Curated JSON file with 20-30 recipes (recommended for MVP control)
- **Option B:** Spoonacular API (free tier: 150 requests/day) — risky for rate limits

**Development Tools:**
- **Version Control:** GitHub (with Actions for CI/CD)
- **Testing:** Vitest + React Testing Library (≥50% coverage required)
- **Linting:** ESLint + Prettier

#### Key Dependencies & Constraints
**External Dependencies:**
- Firebase SDK availability and stability
- Vercel deployment pipeline uptime
- Internet connectivity for Firebase operations

**Data Constraints:**
- Recipe dataset limited to 20-30 curated recipes for MVP
- Ingredient list must be predefined (no free-text input in MVP)
- All user data stored client-side (no server-side computation)

**Viewport Support:**
- **Mobile:** 320px - 767px (primary target based on user interviews)
- **Tablet:** 768px - 1023px
- **Desktop:** 1024px and above
- Touch-friendly interface elements (minimum 44px tap targets)
- Responsive images and layouts across all breakpoints
---
## Out of Scope

### Excluded from MVP

**❌ Meal Planning & Calendar Features**

- Weekly meal schedule builder, calendar view, batch meal prep suggestions
- **Rationale:** Adds significant complexity; not core to solving decision paralysis problem identified in interviews

**❌ Social & Community Features**

- Recipe sharing, comments, ratings, user-generated content, friend/follower systems
- **Rationale:** Increases scope substantially with auth complexity, moderation needs, and content management requirements

**❌ Native Mobile Apps**

- iOS or Android native applications, offline functionality (PWA), push notifications
- **Rationale:** Web-responsive design is sufficient for MVP; native apps require separate development pipeline and maintenance

---

### Future Consideration (Post-MVP Roadmap)

**Phase 2:** Recipe History Analytics

- Track most-cooked recipes
- Ingredient usage trends
- Weekly cooking statistics

**Phase 3:** Progressive Skill System

- User skill level tracking
- Recipe difficulty ratings
- Gradual complexity increase

**Phase 4:** Meal Planning Integration

- Weekly meal schedule builder
- Calendar view of planned meals
- Grocery list generation

---

## Appendix: Course Requirements Mapping

### Full CRUD Operations (5+ user stories required)

|User Story|Create|Read|Update|Delete|
|---|---|---|---|---|
|US1: Ingredient Input|✅ Add ingredients|✅ View list|-|-|
|US2: Recipe Discovery|-|✅ Fetch recipes|-|-|
|US3: Recipe Details|-|✅ View recipe|-|-|
|US4: Cooking Log|✅ Add entry|✅ View history|-|-|
|US5: Inventory Management|-|✅ View inventory|✅ Edit quantities|✅ Remove items|
|US6: Cuisine Filtering|-|✅ Filtered read|-|-|
|US8: Skill Level|✅ Set level|✅ View profile|✅ Update level|-|

**CRUD Coverage:**

- **Create:** US1, US4, US8 (3 stories)
- **Read:** US1, US2, US3, US4, US5, US6, US8 (7 stories)
- **Update:** US5, US8 (2 stories)
- **Delete:** US5 (1 story)

**Result:** ✅ Full CRUD coverage across 5+ user stories

---

### Testing Requirements

- **Coverage Target:** ≥50% code coverage
- **Testing Stack:** Vitest + React Testing Library
- **Key Test Areas:**
    - Recipe matching algorithm (unit tests)
    - Ingredient CRUD operations (integration tests)
    - Firebase data persistence (mocked tests)
    - UI component rendering (component tests)

### CI/CD Requirements

- **Pipeline:** GitHub Actions
- **Automated Checks:**
    - Run test suite on every PR
    - Lint code with ESLint
    - Build verification
- **Deployment:** Auto-deploy to Vercel on merge to main

### Deployment Requirement

- **Platform:** Vercel (free tier)
- **URL:** Publicly accessible via vercel.app subdomain
- **Uptime:** Best-effort (dependent on Vercel SLA)