export const INGREDIENT_CATEGORIES = {
  'Produce': [
    'avocado', 'bell peppers', 'broccoli', 'cabbage', 'carrots', 'cauliflower',
    'celery', 'cucumber', 'eggplant', 'fresh basil', 'garlic', 'ginger', 'kale',
    'lemon', 'lettuce', 'lime', 'mushrooms', 'onion', 'red onion', 'pineapple',
    'plantain', 'potatoes', 'spinach', 'sweet potato', 'tomatoes', 'cilantro',
    'parsley', 'green onions',
  ],
  'Meat & Seafood': [
    'chicken breast', 'ground beef', 'pork shoulder', 'pork belly', 'chorizo',
    'salmon fillets', 'shrimp', 'white fish', 'pancetta',
  ],
  'Dairy & Eggs': [
    'butter', 'cheese', 'cream', 'eggs', 'fried egg', 'feta cheese', 'mozzarella',
    'parmesan', 'sour cream', 'yogurt',
  ],
  'Grains & Pasta': [
    'arborio rice', 'arepa', 'corn flour', 'corn tortillas', 'flour tortillas',
    'linguine', 'pizza dough', 'quinoa', 'rice', 'rice noodles', 'spaghetti',
  ],
  'Canned & Jarred': [
    'black beans', 'red beans', 'chickpeas', 'coconut milk', 'kalamata olives',
    'lentils', 'tomato sauce', 'vegetable broth', 'capers', 'aji sauce',
  ],
  'Spices & Seasonings': [
    'bay leaf', 'black pepper', 'chili', 'chili powder', 'cumin', 'curry powder',
    'garam masala', 'guasca', 'oregano', 'paprika', 'red pepper flakes', 'salt',
    'turmeric',
  ],
  'Sauces & Condiments': [
    'balsamic vinegar', 'fish sauce', 'honey', 'olive oil', 'soy sauce', 'tahini',
    'tamarind paste', 'vegetable oil', 'white wine',
  ],
  'Baking & Misc': [
    'bean sprouts', 'breadcrumbs', 'corn', 'flour', 'galangal', 'lemongrass',
    'lime leaves', 'peanuts', 'sesame seeds',
  ],
};

export const ALL_INGREDIENTS = Object.values(INGREDIENT_CATEGORIES).flat();
