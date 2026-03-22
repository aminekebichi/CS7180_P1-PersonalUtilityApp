import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Notification from '../components/Notification.jsx';
import ClearConfirmDialog from '../components/ClearConfirmDialog.jsx';
import RecipeCard from '../components/RecipeCard.jsx';
import StickyHeader from '../components/StickyHeader.jsx';

// ── Notification ─────────────────────────────────────────────────────────────
describe('Notification', () => {
  it('renders message when provided', () => {
    render(<Notification message="Garlic added to pantry" onDismiss={() => {}} />);
    expect(screen.getByText('Garlic added to pantry')).toBeInTheDocument();
  });

  it('renders nothing when message is empty', () => {
    const { container } = render(<Notification message="" onDismiss={() => {}} />);
    expect(container.firstChild).toBeNull();
  });

  it('calls onDismiss after 3 seconds', async () => {
    vi.useFakeTimers();
    const onDismiss = vi.fn();
    render(<Notification message="Test" onDismiss={onDismiss} />);
    expect(onDismiss).not.toHaveBeenCalled();
    act(() => vi.advanceTimersByTime(3000));
    expect(onDismiss).toHaveBeenCalledOnce();
    vi.useRealTimers();
  });
});

// ── ClearConfirmDialog ────────────────────────────────────────────────────────
describe('ClearConfirmDialog', () => {
  it('renders title and both buttons', () => {
    render(<ClearConfirmDialog onConfirm={() => {}} onCancel={() => {}} />);
    expect(screen.getByText('Clear Grocery List?')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Clear List')).toBeInTheDocument();
  });

  it('calls onConfirm when Clear List is clicked', () => {
    const onConfirm = vi.fn();
    render(<ClearConfirmDialog onConfirm={onConfirm} onCancel={() => {}} />);
    fireEvent.click(screen.getByText('Clear List'));
    expect(onConfirm).toHaveBeenCalledOnce();
  });

  it('calls onCancel when Cancel is clicked', () => {
    const onCancel = vi.fn();
    render(<ClearConfirmDialog onConfirm={() => {}} onCancel={onCancel} />);
    fireEvent.click(screen.getByText('Cancel'));
    expect(onCancel).toHaveBeenCalledOnce();
  });
});

// ── RecipeCard ────────────────────────────────────────────────────────────────
const mockRecipe = {
  id: 1,
  name: 'Spaghetti Carbonara',
  description: 'Classic Roman pasta.',
  cuisine: 'Italian',
  difficulty: 2,
  prepTime: 10,
  cookTime: 20,
  servings: 2,
  image: '🍝',
  dietary: [],
  ingredients: ['spaghetti', 'eggs', 'parmesan', 'pancetta', 'black pepper', 'salt', 'garlic'],
  instructions: [],
};

describe('RecipeCard', () => {
  const renderCard = (props = {}) =>
    render(
      <MemoryRouter>
        <RecipeCard
          recipe={mockRecipe}
          inventory={[]}
          isFavorite={false}
          onToggleFavorite={() => {}}
          {...props}
        />
      </MemoryRouter>
    );

  it('displays recipe name and description', () => {
    renderCard();
    expect(screen.getByText('Spaghetti Carbonara')).toBeInTheDocument();
    expect(screen.getByText('Classic Roman pasta.')).toBeInTheDocument();
  });

  it('shows total time (prep + cook)', () => {
    renderCard();
    expect(screen.getByText('30 min')).toBeInTheDocument();
  });

  it('does NOT show match bar when inventory is empty', () => {
    renderCard({ inventory: [] });
    expect(screen.queryByText('Ingredient match')).not.toBeInTheDocument();
  });

  it('shows match bar when inventory has items', () => {
    renderCard({ inventory: ['spaghetti'] });
    expect(screen.getByText('Ingredient match')).toBeInTheDocument();
  });

  it('calls onToggleFavorite when heart button is clicked', () => {
    const onToggleFavorite = vi.fn();
    renderCard({ onToggleFavorite });
    fireEvent.click(screen.getByLabelText('Add to favorites'));
    expect(onToggleFavorite).toHaveBeenCalledWith(1);
  });

  it('shows filled heart when recipe is a favorite', () => {
    renderCard({ isFavorite: true });
    expect(screen.getByLabelText('Remove from favorites')).toBeInTheDocument();
  });
});

// ── StickyHeader ──────────────────────────────────────────────────────────────
describe('StickyHeader', () => {
  it('renders the app title', () => {
    render(
      <MemoryRouter>
        <StickyHeader onMenuOpen={() => {}} onFilterOpen={() => {}} activeFilterCount={0} />
      </MemoryRouter>
    );
    expect(screen.getByText("Let's Cook")).toBeInTheDocument();
  });

  it('shows filter badge when filters are active', () => {
    render(
      <MemoryRouter>
        <StickyHeader onMenuOpen={() => {}} onFilterOpen={() => {}} activeFilterCount={3} />
      </MemoryRouter>
    );
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('calls onMenuOpen when hamburger is clicked', () => {
    const onMenuOpen = vi.fn();
    render(
      <MemoryRouter>
        <StickyHeader onMenuOpen={onMenuOpen} onFilterOpen={() => {}} activeFilterCount={0} />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByLabelText('Open menu'));
    expect(onMenuOpen).toHaveBeenCalledOnce();
  });

  it('calls onFilterOpen when filter icon is clicked', () => {
    const onFilterOpen = vi.fn();
    render(
      <MemoryRouter>
        <StickyHeader onMenuOpen={() => {}} onFilterOpen={onFilterOpen} activeFilterCount={0} />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByLabelText('Open filters'));
    expect(onFilterOpen).toHaveBeenCalledOnce();
  });
});
