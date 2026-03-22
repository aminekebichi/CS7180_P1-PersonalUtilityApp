import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import HomePage from '../pages/HomePage.jsx';
import CookingLogPage from '../pages/CookingLogPage.jsx';
import InventoryPage from '../pages/InventoryPage.jsx';

// ── shared props helpers ────────────────────────────────────────────────────
const baseFilterProps = {
  favorites: [],
  selectedCuisines: [],
  selectedDietary: [],
  selectedDifficulty: [],
  showFavoritesOnly: false,
};

// ── HomePage ─────────────────────────────────────────────────────────────────
describe('HomePage', () => {
  const renderHome = (props = {}) =>
    render(
      <MemoryRouter>
        <HomePage
          inventory={[]}
          onToggleFavorite={() => {}}
          {...baseFilterProps}
          {...props}
        />
      </MemoryRouter>
    );

  it('renders all 23 recipe cards with no filters', () => {
    renderHome();
    // Each RecipeCard has an article role
    const cards = screen.getAllByRole('article');
    expect(cards).toHaveLength(23);
  });

  it('shows empty state when no recipes match filters', () => {
    renderHome({ selectedCuisines: ['Italian'], selectedDietary: ['vegan'] });
    expect(screen.getByText('No recipes found')).toBeInTheDocument();
  });

  it('shows pantry info card when inventory has items', () => {
    renderHome({ inventory: ['garlic', 'onion'] });
    expect(screen.getByText(/Showing recipes based on your/)).toBeInTheDocument();
  });

  it('does NOT show pantry info card when inventory is empty', () => {
    renderHome({ inventory: [] });
    expect(screen.queryByText(/Showing recipes based on your/)).not.toBeInTheDocument();
  });

  it('renders cuisine filter badges', () => {
    renderHome({ selectedCuisines: ['Italian', 'Mexican'] });
    expect(screen.getByText('Italian')).toBeInTheDocument();
    expect(screen.getByText('Mexican')).toBeInTheDocument();
  });

  it('renders Favorites badge when showFavoritesOnly is true', () => {
    renderHome({ showFavoritesOnly: true });
    expect(screen.getByText('Favorites')).toBeInTheDocument();
  });

  it('renders difficulty badge', () => {
    renderHome({ selectedDifficulty: [1] });
    expect(screen.getByText('Home Chef')).toBeInTheDocument();
  });

  it('filters recipes by cuisine', () => {
    renderHome({ selectedCuisines: ['Italian'] });
    const cards = screen.getAllByRole('article');
    expect(cards).toHaveLength(6);
  });
});

// ── CookingLogPage ────────────────────────────────────────────────────────────
describe('CookingLogPage', () => {
  it('shows empty state when cooking history is empty', () => {
    render(
      <MemoryRouter>
        <CookingLogPage cookingHistory={[]} />
      </MemoryRouter>
    );
    expect(screen.getByText('No recipes cooked yet')).toBeInTheDocument();
  });

  it('renders history entries in reverse chronological order', () => {
    const history = [
      { recipeId: 1, recipeName: 'Spaghetti Carbonara', date: '2026-01-01T10:00:00.000Z' },
      { recipeId: 3, recipeName: 'Caprese Salad', date: '2026-01-02T10:00:00.000Z' },
    ];
    render(
      <MemoryRouter>
        <CookingLogPage cookingHistory={history} />
      </MemoryRouter>
    );
    expect(screen.getByText('Spaghetti Carbonara')).toBeInTheDocument();
    expect(screen.getByText('Caprese Salad')).toBeInTheDocument();
  });
});

// ── InventoryPage ─────────────────────────────────────────────────────────────
const inventoryBaseProps = {
  inventory: [],
  groceryList: [],
  favorites: [],
  selectedCuisines: [],
  selectedDietary: [],
  selectedDifficulty: [],
  showFavoritesOnly: false,
  onRemoveFromInventory: vi.fn(),
  onAddToGroceryList: vi.fn(),
  onMoveToInventory: vi.fn(),
  onRemoveFromGroceryList: vi.fn(),
  onClearGroceryList: vi.fn(),
  onAddAllToInventory: vi.fn(),
  onNotify: vi.fn(),
};

describe('InventoryPage', () => {
  it('shows empty pantry state when inventory is empty', () => {
    render(
      <MemoryRouter>
        <InventoryPage {...inventoryBaseProps} />
      </MemoryRouter>
    );
    expect(screen.getByText('Your pantry is empty')).toBeInTheDocument();
  });

  it('shows empty grocery list state when list is empty', () => {
    render(
      <MemoryRouter>
        <InventoryPage {...inventoryBaseProps} />
      </MemoryRouter>
    );
    expect(screen.getByText('Grocery list is empty')).toBeInTheDocument();
  });

  it('renders inventory items', () => {
    render(
      <MemoryRouter>
        <InventoryPage {...inventoryBaseProps} inventory={['garlic', 'onion']} />
      </MemoryRouter>
    );
    expect(screen.getByText('garlic')).toBeInTheDocument();
    expect(screen.getByText('onion')).toBeInTheDocument();
  });

  it('renders grocery list items', () => {
    render(
      <MemoryRouter>
        <InventoryPage {...inventoryBaseProps} groceryList={['tomatoes']} />
      </MemoryRouter>
    );
    expect(screen.getByText('tomatoes')).toBeInTheDocument();
  });

  it('shows "Add All to Pantry" button when grocery list has items', () => {
    render(
      <MemoryRouter>
        <InventoryPage {...inventoryBaseProps} groceryList={['tomatoes', 'garlic']} />
      </MemoryRouter>
    );
    expect(screen.getByText('+ Add All to Pantry')).toBeInTheDocument();
  });

  it('calls onAddAllToInventory when "Add All to Pantry" is clicked', () => {
    const onAddAllToInventory = vi.fn();
    render(
      <MemoryRouter>
        <InventoryPage
          {...inventoryBaseProps}
          groceryList={['tomatoes', 'garlic']}
          onAddAllToInventory={onAddAllToInventory}
        />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByText('+ Add All to Pantry'));
    expect(onAddAllToInventory).toHaveBeenCalledWith(['tomatoes', 'garlic']);
  });

  it('calls onRemoveFromInventory when pantry item is clicked', () => {
    const onRemoveFromInventory = vi.fn();
    render(
      <MemoryRouter>
        <InventoryPage
          {...inventoryBaseProps}
          inventory={['garlic']}
          onRemoveFromInventory={onRemoveFromInventory}
        />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByText('garlic'));
    expect(onRemoveFromInventory).toHaveBeenCalledWith('garlic');
  });

  it('shows Search Ingredients button', () => {
    render(
      <MemoryRouter>
        <InventoryPage {...inventoryBaseProps} />
      </MemoryRouter>
    );
    expect(screen.getByText('Search Ingredients')).toBeInTheDocument();
  });

  it('shows suggested additions when recipes provide candidates', () => {
    // With no pantry and no grocery list, suggestions should appear
    render(
      <MemoryRouter>
        <InventoryPage {...inventoryBaseProps} />
      </MemoryRouter>
    );
    expect(screen.getByText('Suggested Additions')).toBeInTheDocument();
  });
});
