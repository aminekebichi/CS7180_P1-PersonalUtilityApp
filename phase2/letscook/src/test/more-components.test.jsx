import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

import FilterPanel from '../components/FilterPanel.jsx';
import SlidingMenu from '../components/SlidingMenu.jsx';
import RecipeDetailPage from '../pages/RecipeDetailPage.jsx';

// ── FilterPanel ───────────────────────────────────────────────────────────────
const filterDefaults = {
  isOpen: true,
  onClose: vi.fn(),
  selectedCuisines: [],
  selectedDietary: [],
  selectedDifficulty: [],
  showFavoritesOnly: false,
  onToggleCuisine: vi.fn(),
  onToggleDietary: vi.fn(),
  onToggleDifficulty: vi.fn(),
  onToggleFavorites: vi.fn(),
  onClearAll: vi.fn(),
};

describe('FilterPanel', () => {
  it('renders cuisine options', () => {
    render(<FilterPanel {...filterDefaults} />);
    expect(screen.getByText('Italian')).toBeInTheDocument();
    expect(screen.getByText('Mexican')).toBeInTheDocument();
    expect(screen.getByText('Colombian')).toBeInTheDocument();
  });

  it('renders dietary options', () => {
    render(<FilterPanel {...filterDefaults} />);
    expect(screen.getByText('Vegetarian')).toBeInTheDocument();
    expect(screen.getByText('Vegan')).toBeInTheDocument();
    expect(screen.getByText('Pescatarian')).toBeInTheDocument();
  });

  it('renders difficulty options', () => {
    render(<FilterPanel {...filterDefaults} />);
    expect(screen.getByText('Home Chef')).toBeInTheDocument();
    expect(screen.getByText('Sous Chef')).toBeInTheDocument();
    expect(screen.getByText('Master Chef')).toBeInTheDocument();
  });

  it('calls onToggleCuisine when a cuisine checkbox is clicked', () => {
    const onToggleCuisine = vi.fn();
    render(<FilterPanel {...filterDefaults} onToggleCuisine={onToggleCuisine} />);
    fireEvent.click(screen.getByLabelText ? screen.getAllByRole('checkbox')[0] : screen.getAllByRole('checkbox')[0]);
    expect(onToggleCuisine).toHaveBeenCalled();
  });

  it('calls onClearAll when Clear All Filters is clicked', () => {
    const onClearAll = vi.fn();
    render(<FilterPanel {...filterDefaults} onClearAll={onClearAll} />);
    fireEvent.click(screen.getByText('Clear All Filters'));
    expect(onClearAll).toHaveBeenCalledOnce();
  });

  it('calls onClose when backdrop is clicked', () => {
    const onClose = vi.fn();
    const { container } = render(<FilterPanel {...filterDefaults} onClose={onClose} />);
    // The backdrop is the first fixed div
    const backdrop = container.querySelector('[aria-hidden="true"]');
    fireEvent.click(backdrop);
    expect(onClose).toHaveBeenCalled();
  });

  it('shows checked state for active cuisine filter', () => {
    render(<FilterPanel {...filterDefaults} selectedCuisines={['Italian']} />);
    const checkboxes = screen.getAllByRole('checkbox');
    // Italian is first cuisine checkbox (index 0)
    expect(checkboxes[0]).toBeChecked();
  });

  it('shows checked state for favorites filter', () => {
    render(<FilterPanel {...filterDefaults} showFavoritesOnly={true} />);
    const checkboxes = screen.getAllByRole('checkbox');
    const favCheckbox = checkboxes[checkboxes.length - 1];
    expect(favCheckbox).toBeChecked();
  });
});

// ── SlidingMenu ───────────────────────────────────────────────────────────────
describe('SlidingMenu', () => {
  const renderMenu = (props = {}) =>
    render(
      <MemoryRouter>
        <SlidingMenu isOpen={true} onClose={() => {}} {...props} />
      </MemoryRouter>
    );

  it('renders navigation items', () => {
    renderMenu();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('My Pantry')).toBeInTheDocument();
    expect(screen.getByText('Cooking Log')).toBeInTheDocument();
  });

  it('calls onClose when the X button is clicked', () => {
    const onClose = vi.fn();
    renderMenu({ onClose });
    fireEvent.click(screen.getByLabelText('Close menu'));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('calls onClose when backdrop is clicked', () => {
    const onClose = vi.fn();
    const { container } = renderMenu({ onClose });
    const backdrop = container.querySelector('[aria-hidden="true"]');
    fireEvent.click(backdrop);
    expect(onClose).toHaveBeenCalled();
  });

  it('is visually hidden when closed', () => {
    renderMenu({ isOpen: false });
    const dialog = screen.getByRole('dialog');
    expect(dialog.style.transform).toBe('translateX(100%)');
  });

  it('is visible when open', () => {
    renderMenu({ isOpen: true });
    const dialog = screen.getByRole('dialog');
    expect(dialog.style.transform).toBe('translateX(0)');
  });
});

// ── RecipeDetailPage ──────────────────────────────────────────────────────────
const detailDefaults = {
  inventory: [],
  groceryList: [],
  favorites: [],
  cookingHistory: [],
  onToggleFavorite: vi.fn(),
  onAddToGroceryList: vi.fn(),
  onMarkCooked: vi.fn(),
  onNotify: vi.fn(),
};

function renderDetail(recipeId = '1', props = {}) {
  return render(
    <MemoryRouter initialEntries={[`/recipe/${recipeId}`]}>
      <Routes>
        <Route
          path="/recipe/:id"
          element={<RecipeDetailPage {...detailDefaults} {...props} />}
        />
      </Routes>
    </MemoryRouter>
  );
}

describe('RecipeDetailPage', () => {
  it('renders recipe name', () => {
    renderDetail('1');
    expect(screen.getByText('Spaghetti Carbonara')).toBeInTheDocument();
  });

  it('renders back button', () => {
    renderDetail('1');
    expect(screen.getByText('Back to Recipes')).toBeInTheDocument();
  });

  it('shows 404 message for unknown recipe', () => {
    renderDetail('999');
    expect(screen.getByText('Recipe not found.')).toBeInTheDocument();
  });

  it('renders all ingredients', () => {
    renderDetail('1');
    // Carbonara has 7 ingredients
    expect(screen.getByText('spaghetti')).toBeInTheDocument();
    expect(screen.getByText('eggs')).toBeInTheDocument();
  });

  it('renders instructions', () => {
    renderDetail('1');
    // Each step has a numbered badge
    const badges = screen.getAllByText('1');
    expect(badges.length).toBeGreaterThan(0);
  });

  it('shows "Mark as Cooked" when not yet cooked', () => {
    renderDetail('1');
    expect(screen.getByText('Mark as Cooked')).toBeInTheDocument();
  });

  it('calls onMarkCooked when button is clicked', () => {
    const onMarkCooked = vi.fn();
    const onNotify = vi.fn();
    renderDetail('1', { onMarkCooked, onNotify });
    fireEvent.click(screen.getByText('Mark as Cooked'));
    expect(onMarkCooked).toHaveBeenCalled();
    expect(onNotify).toHaveBeenCalledWith('Recipe marked as cooked! 🎉');
  });

  it('shows ingredient match card when inventory has items', () => {
    renderDetail('1', { inventory: ['spaghetti'] });
    expect(screen.getByText('Ingredient Match')).toBeInTheDocument();
  });

  it('shows in-pantry status for owned ingredients', () => {
    renderDetail('1', { inventory: ['spaghetti', 'eggs'] });
    const inPantryItems = screen.getAllByText('✓ In pantry');
    expect(inPantryItems.length).toBeGreaterThan(0);
  });

  it('shows "On list" status for grocery list items', () => {
    renderDetail('1', { groceryList: ['spaghetti'] });
    expect(screen.getByText('📝 On list')).toBeInTheDocument();
  });

  it('calls onAddToGroceryList when "Add all to list" is clicked', () => {
    const onAddToGroceryList = vi.fn();
    const onNotify = vi.fn();
    renderDetail('1', { onAddToGroceryList, onNotify });
    // The button text node is "Add all to list" (the + is a Lucide SVG icon)
    fireEvent.click(screen.getByText('Add all to list'));
    expect(onAddToGroceryList).toHaveBeenCalled();
  });
});
