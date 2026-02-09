# Let's Cook - User Stories & Prioritization

## MVP Scope
The Minimum Viable Product (MVP) for "Let's Cook" focuses on the core utility: helping users decide what to cook using ingredients they already have.
*   **Total Complexity:** Moderate
*   **Must-Have Stories:** 2 (Inventory Management, Recipe Discovery)
*   **Rationale:** We prioritize the "Inventory → Suggestion" loop because it addresses the immediate pain point of decision paralysis and food waste identified in every interview. The "Learning" aspects (Skill Level, History) are prioritized second to ensure the base utility works first.

---

## MUST HAVE
*Critical features without which the core value proposition fails.*

### User Story #1: Easy Inventory Management (CRUD)
**As a** user managing my kitchen  
**I want to** easily add, remove, and update ingredients in my virtual pantry  
**So that** I can keep an accurate record of what I have to generate recommendations  

#### Justification
*   **Core Value:** Foundation for the entire application; without inventory data, the recommendation engine cannot function.
*   **Research Evidence:**
    *   *Interview #1:* "I usually forget [what I have]... end up with three onions."
    *   *Interview #3:* "So now I just keep a stocked pantry... and kind of freestyle it."
*   **Dependencies:** None (Base Feature)

#### Acceptance Criteria
*   User can add new ingredients (Create)
*   User can view current inventory list (Read)
*   User can update quantities (Update)
*   User can remove items (Delete)
*   Data persists between sessions

### User Story #2: Ingredient-Based Recipe Discovery
**As a** home cook with limited ingredients  
**I want to** find recipes I can make with my current stock  
**So that** I don't waste food or time searching for recipes I can't cook  

#### Justification
*   **Core Value:** Directly solves the "What can I make?" problem.
*   **Research Evidence:**
    *   *Interview #1:* "If someone could just tell me 'hey, based on what you already have, you could make X, Y, or Z' that would be huge."
    *   *Interview #2:* "We get to the store... then by Wednesday we're looking at random ingredients like 'what do we do with eggplant?'"
    *   *Interview #3:* "I wish there was a way to know what I can make with what I already have"
*   **Dependencies:** Requires **Easy Inventory Management**

#### Acceptance Criteria
*   Feed displays recipes matching 100% of available ingredients
*   Visual indicators for recipes with 1-3 missing ingredients
*   User can view recipe details (ingredients, steps)

---

## SHOULD HAVE
*Important features that enhance the experience but aren't blockers for launch.*

### User Story #3: Recipe Completion Tracking
**As a** user who cooked a meal  
**I want to** log it in my history and deduct used ingredients  
**So that** I can track my culinary journey and keep my inventory accurate  

#### Justification
*   **Core Value:** Closes the loop on inventory management (auto-deduction) and enables the "Personal Utility" aspect of tracking usage.
*   **Research Evidence:**
    *   *Interview #2:* "We tried to [make it again], but we couldn't find the video again... We tried to recreate it from memory but it wasn't the same."
    *   *Interview #1:* "I haven't made it since because I can't remember exactly what I did... I didn't write anything down."
*   **Dependencies:** Requires **Ingredient-Based Recipe Discovery**

#### Acceptance Criteria
*   "Mark as Cooked" button on recipe details
*   Automatic deduction of ingredients from inventory (with confirmation)
*   History log of cooked recipes

### User Story #4: Progressive Skill Building (Chef Levels)
**As a** beginner cook  
**I want to** be recommended recipes that match my skill level  
**So that** I don't get discouraged by recipes that are too complex  

#### Justification
*   **Core Value:** Key differentiator for the "Learning" persona ("Amateur chefs who would like to learn").
*   **Research Evidence:**
    *   *Interview #2:* "Everything is either too simple like 'make toast' or too complicated... I just want something in between that grows with me."
    *   *Interview #3:* "The gnocchi was definitely outside my abilities but I didn't realize that until I was already in the middle of it."
*   **Dependencies:** Requires **Recipe Discovery**

#### Acceptance Criteria
*   Recipes tagged with difficulty (Beginner, Intermediate, Advanced)
*   User profile stores current "Chef Level"
*   Algorithm prioritizes suggestions at or immediately above user level

---

## COULD HAVE
*Nice-to-have features for future updates.*

### User Story #5: Smart Ingredient Suggestions
**As a** budget-conscious shopper  
**I want to** see which ingredients I should buy to unlock the most new recipes  
**So that** I can spend money efficiently and expand my options  

#### Justification
*   **Core Value:** Optimizes the grocery shopping experience but not essential for the "Cooking" phase.
*   **Research Evidence:**
    *   *Interview #1:* "Made it once... now all those ingredients are just sitting in my pantry. Total waste of money."
*   **Dependencies:** Requires **Recipe Discovery** algorithm

#### Acceptance Criteria
*   "Suggested Buys" section showing ingredients that would complete multiple partial-match recipes
*   visual indicator of how many new recipes an item would unlock

---

## WON'T HAVE
*Explicitly out of scope for MVP.*

### User Story #6: Social Sharing & Meal Planning Calendar
**Rationale:** While users mentioned coordination issues (Interview #2) and failed meal planning (Interview #3), building a shared calendar or social network adds significant technical complexity (auth providers, real-time sync) that distracts from the core "Personal Utility" value.
*   *Interview #3:* "I used to meal plan... But it never worked out."