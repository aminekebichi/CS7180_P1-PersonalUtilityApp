# Project Reflection: Let's Cook
**Author:** Amine Kebichi  
**Date:** February 2026  
**Course:** CS7180 - Personal Utility Application

---

## Executive Summary

This reflection documents the journey of creating "Let's Cook," a personal utility application designed to help amateur cooks discover recipes based on available ingredients. The project followed a user-centered design approach, beginning with problem identification, validation through Mom Test interviews, and culminating in a comprehensive Product Requirements Document (PRD).

---

## Phase 1: Project Proposal & Problem Identification

### Initial Concept
The project began with a broad idea: create a tool for people who want to learn how to cook. However, the initial concept lacked specificity about *what exact problem* needed solving.

### Key Challenges
- **Avoiding Solution-First Thinking**: My first instinct was to jump directly into features (recipe suggestions, skill levels, filtering) without validating whether these addressed real pain points.
- **Defining the Target User**: "People who want to learn to cook" was too vague. I needed to identify specific personas with concrete problems.

### Lessons Learned
> **Takeaway #1**: Start with the problem, not the solution. The Mom Test emphasizes asking about past behaviors and specific pain points rather than hypothetical feature requests.

The proposal phase forced me to articulate:
1. **Who** has this problem? (Recent graduates, college students, aspiring home cooks)
2. **What** is the specific pain point? (Decision paralysis, ingredient waste, skill assessment gaps)
3. **Why** does this matter? (Time wasted, money wasted, loss of confidence)

---

## Phase 2: Mom Test Interviews

### Interview Planning
I conducted three interviews with distinct user personas:
1. **Interview #1**: Recent graduate living alone (23 years old, beginner cook)
2. **Interview #2**: College student in shared housing (20 years old, budget-conscious)
3. **Interview #3**: Aspiring home chef (28 years old, intermediate skills)

### Interview Approach
Following The Mom Test principles, I focused on:
- **Past behaviors**: "Tell me about the last time you needed to figure out what to cook"
- **Specific stories**: "What happened when you tried to make that Thai curry?"
- **Concrete outcomes**: "How much did that cost you?" / "How often does that happen?"

### Critical Insights Discovered

#### Pain Point #1: Decision Paralysis
All three participants described spending 15-30 minutes staring at their fridge, unable to decide what to cook.

**Evidence:**
- *Interview #1*: "I opened my fridge and just stared at it for like five minutes... I had some chicken that was going to expire soon, some random vegetables, and I was just like... what do I even do with this?"
- *Interview #3*: "I get home around 6:30, I'm tired, I open the fridge and think 'what can I make?' I usually end up making one of my five go-to meals because I know I won't mess them up."

#### Pain Point #2: Ingredient Waste
Participants frequently purchased ingredients for single recipes that went unused, wasting $30-50 per month.

**Evidence:**
- *Interview #1*: "Bought all these ingredients - lemongrass, fish sauce, coconut milk... Made it once... now all those ingredients are just sitting in my pantry. Total waste of money."
- *Interview #2*: "We bought zucchini once because it was on sale... Nobody knew how to cook it... Two of them went bad in the fridge."

#### Pain Point #3: Skill Assessment Gap
Users couldn't judge recipe difficulty before starting, leading to failed attempts and discouragement.

**Evidence:**
- *Interview #3*: "I tried to make homemade gnocchi from scratch. It was a disaster... after two hours of work we ended up ordering pizza. The gnocchi was definitely outside my abilities but I didn't realize that until I was already in the middle of it."

### What Surprised Me

**Unexpected Finding**: Users didn't want rigid meal planning systems. Interview #3 explicitly stated: *"I used to meal plan on Sundays... But it never worked out."*

This was crucial because my initial concept included a meal planning calendar feature. The interviews revealed this would add complexity without addressing the core problem.

### Lessons Learned
> **Takeaway #2**: Users' stated desires don't always match their actual behaviors. Interview #2 mentioned wanting "something that grows with me," which validated the progressive skill-building feature, but rejected the meal planning idea through their past failed attempts.

> **Takeaway #3**: Ask about money and time. Quantifying the cost of the problem ($30-50/month in wasted ingredients, 15-30 minutes of decision time) made the pain point concrete and measurable.

---

## Phase 3: Drafting the PRD

### Translating Interviews into Requirements

The PRD process involved converting qualitative interview insights into quantitative, actionable specifications.

#### Example: Ingredient-Based Discovery Feature
**Interview Quote** (Interview #1):  
*"If someone could just tell me 'hey, based on what you already have, you could make X, Y, or Z' that would be huge."*

**PRD Translation:**
- **Feature**: Main Recipe Feed with ingredient-based sorting
- **Acceptance Criteria**: 
  - Display minimum 3 recipes with 100% ingredient match
  - Visual indicators for recipes with 1-3 missing ingredients
  - Recipe sorting algorithm prioritizing perfect matches

#### Example: Progressive Skill Building
**Interview Quote** (Interview #2):  
*"Everything is either too simple like 'make toast' or too complicated like 'make beef wellington.' I just want something in between that grows with me."*

**PRD Translation:**
- **Feature**: 5-level Chef Progression System
- **Mechanics**: 
  - Users start at Level 0 (Kitchen Newbie)
  - Complete 5 recipes at current level to advance
  - Recipes automatically rated by difficulty (1-5 stars)
  - Higher-level recipes visible but locked (motivation)

### Challenges in PRD Development

#### Challenge #1: Balancing Scope
The interviews revealed many potential features (filtering by cuisine, dietary restrictions, social sharing, meal planning). I had to prioritize ruthlessly.

**Solution**: MoSCoW Prioritization
- **MUST HAVE**: Inventory Management, Recipe Discovery (core value loop)
- **SHOULD HAVE**: Recipe Tracking, Skill Building (retention features)
- **COULD HAVE**: Smart Ingredient Suggestions (optimization)
- **WON'T HAVE**: Social features, meal planning (validated as non-essential)

#### Challenge #2: Defining "Good Enough" for MVP
How many recipes? How complex should the difficulty algorithm be? How many onboarding screens?

**Solution**: Used interview evidence to set constraints:
- **30 recipes**: Enough variety for initial testing without overwhelming curation effort
- **Simple difficulty formula**: `(ingredient_count × 0.6) + (step_count × 0.4)` based on Interview #3's observation that complexity comes from both ingredients and steps
- **3-screen onboarding**: Interview #2 mentioned "time poverty" and "brain power" constraints, so minimal friction was critical

#### Challenge #3: Technical Feasibility
The PRD needed to be implementable within course constraints (testing, CI/CD, deployment).

**Decisions Made**:
- **React Native (Expo)**: Cross-platform, rapid prototyping
- **Local storage only**: No backend complexity for MVP
- **Offline-first**: Addresses Interview #2's budget concerns (no data usage)

### Lessons Learned
> **Takeaway #4**: A PRD is a contract between user needs and technical reality. Every feature should trace back to interview evidence, and every technical decision should serve the user's goals.

> **Takeaway #5**: Constraints are liberating. The 30-recipe limit, offline-first architecture, and MoSCoW prioritization forced clarity and prevented scope creep.

---

## Phase 4: User Stories & Prioritization

### MoSCoW Reorganization

The final step was reorganizing user stories using the MoSCoW method, explicitly linking each story to:
1. **Interview evidence** (direct quotes from at least 2 interviews)
2. **Dependencies** (what must exist for this to work)
3. **Core value proposition** (does this solve the main problem?)

### Example: Inventory Management as "MUST HAVE"

**Justification**:
- **Core Value**: Foundation for the entire application; without inventory data, the recommendation engine cannot function.
- **Research Evidence**:
  - *Interview #1*: "I usually forget [what I have]... end up with three onions."
  - *Interview #3*: "So now I just keep a stocked pantry... and kind of freestyle it."
- **Dependencies**: None (Base Feature)

### Example: Smart Suggestions as "COULD HAVE"

**Justification**:
- **Core Value**: Optimizes the grocery shopping experience but not essential for the "Cooking" phase.
- **Research Evidence**: *Interview #1*: "Made it once... now all those ingredients are just sitting in my pantry. Total waste of money."
- **Dependencies**: Requires Recipe Discovery algorithm

**Why Deferred**: While this addresses ingredient waste, the core problem is *deciding what to cook with what you have*. Smart suggestions are a nice-to-have optimization, not a blocker for launch.

### Lessons Learned
> **Takeaway #6**: Prioritization is about saying "no" to good ideas. Smart Ingredient Suggestions is a valuable feature validated by interviews, but it's not critical for the MVP to deliver value.

---

## Key Takeaways from the Entire Process

### 1. The Mom Test Works
By focusing on past behaviors and specific stories, I avoided the trap of building features users *say* they want but won't actually use (e.g., meal planning calendars).

### 2. Validation ≠ Confirmation Bias
I entered interviews with assumptions about features (filtering by cuisine, dietary restrictions). The interviews revealed these were secondary to the core "what can I make right now?" problem.

### 3. Quantify the Pain
Asking "How much did that cost?" and "How often does that happen?" transformed vague frustrations into measurable problems:
- $30-50/month in wasted ingredients
- 15-30 minutes of decision time per meal
- 4-5 delivery orders per week (Interview #1)

### 4. Dependencies Drive Prioritization
The MoSCoW method forced me to map feature dependencies:
- Recipe Discovery **requires** Inventory Management
- Recipe Tracking **requires** Recipe Discovery
- Smart Suggestions **requires** Recipe Discovery algorithm

This created a clear build order: Inventory → Discovery → Tracking → Suggestions.

### 5. Constraints Clarify Vision
The course requirements (5+ user stories, CRUD operations, 50%+ test coverage, CI/CD, deployment) weren't obstacles—they were guardrails that prevented over-engineering.

### 6. The PRD is a Living Document
The PRD evolved as I wrote it. Initial drafts included features that didn't survive MoSCoW prioritization. The final version is leaner and more focused because of this iterative refinement.

---

## What I Would Do Differently

### 1. Conduct More Interviews
Three interviews provided strong patterns, but 5-7 would have increased confidence in prioritization decisions. Specifically, I would have interviewed:
- A user who *successfully* uses meal planning apps (to validate why I'm excluding this feature)
- A user with dietary restrictions (to assess if filtering is truly "COULD HAVE" vs "SHOULD HAVE")

### 2. Prototype Earlier
I created the PRD before any prototyping. A low-fidelity mockup during interviews could have validated UI assumptions (e.g., sliding panel vs. bottom sheet for "My Fridge").

### 3. Quantify Success Metrics Earlier
The PRD includes success metrics, but I should have defined these *before* writing features. This would have made prioritization even clearer (e.g., "Can users identify 3+ recipes within 2 minutes?" directly validates Recipe Discovery as MUST HAVE).

---

## Conclusion

Building "Let's Cook" taught me that **user-centered design is not about asking users what they want—it's about understanding what they actually do and why it's painful.**

The Mom Test interviews revealed that the core problem wasn't "learning to cook" (too broad) but rather:
1. **Decision paralysis** when faced with ingredients
2. **Ingredient waste** from poor planning
3. **Skill assessment gaps** leading to failed attempts

The PRD translated these insights into a focused MVP: an offline-first, mobile app that matches recipes to available ingredients and progressively builds cooking skills through a gamified leveling system.

The MoSCoW prioritization ensured that the MVP delivers core value (Inventory → Discovery loop) without getting distracted by nice-to-have features that don't address the validated pain points.

**Most importantly**: Every feature in the final PRD traces back to a specific quote from a real user describing a real problem they've experienced. That's the difference between building something users *might* want and building something they *actually need*.

---

## Appendix: Interview-to-Feature Mapping

| Interview Insight | Feature in PRD | Priority |
|-------------------|----------------|----------|
| "What can I make with what I have?" | Ingredient-Based Recipe Discovery | MUST HAVE |
| "I forget what I have... end up with three onions" | Easy Inventory Management (CRUD) | MUST HAVE |
| "Something that grows with me" | Progressive Skill Building (Chef Levels) | SHOULD HAVE |
| "I can't remember what I made" | Recipe Completion Tracking | SHOULD HAVE |
| "Ingredients sitting in my pantry" | Smart Ingredient Suggestions | COULD HAVE |
| "Meal planning never worked out" | ~~Meal Planning Calendar~~ | WON'T HAVE |

---

*This reflection represents the pre-implementation phase of the Let's Cook project. The next steps involve development, testing, and deployment per the PRD specifications.*
