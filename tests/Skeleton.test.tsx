import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Skeleton } from '../src/components/ui/skeleton';
import { CardSkeleton } from '../src/components/CardSkeleton';

describe('Skeleton UI Component', () => {
  it('renders Block shape with well and sheen classes', () => {
    const { container } = render(<Skeleton width={120} height={24} data-testid="skeleton-block" />);
    const el = container.querySelector('.mu-skeleton');
    expect(el).toBeInTheDocument();
    expect(el).toHaveClass('recipe-well-field');
    expect(el).toHaveClass('skeleton-sheen');
    expect(el).toHaveStyle({ width: '120px', height: '24px' });
  });

  it('renders Circle shape with circular geometry', () => {
    const { container } = render(<Skeleton.Circle size={40} />);
    const el = container.querySelector('.rounded-full');
    expect(el).toBeInTheDocument();
    expect(el).toHaveStyle({ width: '40px', height: '40px' });
  });

  it('renders Text shape with specified line count', () => {
    const { container } = render(<Skeleton.Text lines={3} width={200} />);
    const lines = container.querySelectorAll('.h-skeleton-line');
    expect(lines.length).toBe(3);
  });

  it('renders Swap fallback while loading and children when arrived', () => {
    const { rerender } = render(
      <Skeleton.Swap
        loading={true}
        fallback={<span data-testid="fallback">Yükleniyor...</span>}
      >
        <span data-testid="content">İçerik Geldi</span>
      </Skeleton.Swap>
    );

    expect(screen.getByTestId('fallback')).toBeInTheDocument();
    expect(screen.queryByTestId('content')).not.toBeInTheDocument();

    rerender(
      <Skeleton.Swap
        loading={false}
        fallback={<span data-testid="fallback">Yükleniyor...</span>}
      >
        <span data-testid="content">İçerik Geldi</span>
      </Skeleton.Swap>
    );

    expect(screen.getByTestId('content')).toBeInTheDocument();
    expect(screen.queryByTestId('fallback')).not.toBeInTheDocument();
  });
});

describe('CardSkeleton Component', () => {
  it('renders card skeleton with accessibility attributes and sunken shapes', () => {
    render(<CardSkeleton />);
    const card = screen.getByRole('status');
    expect(card).toBeInTheDocument();
    expect(card).toHaveAttribute('aria-busy', 'true');
    expect(card.querySelectorAll('.recipe-well-field').length).toBeGreaterThan(0);
  });
});
