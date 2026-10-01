import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { TechBar } from '../src/components/TechBar';
import { TechEntry } from '../src/types/tech';

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'tr', changeLanguage: () => Promise.resolve() },
  }),
}));

const mockEntry: TechEntry = {
  id: 'test-python',
  name: 'Python',
  category: 'language',
  iconUrl: 'https://example.com/python.png',
  githubUrl: 'https://github.com/python/cpython',
  popularity: {
    totalRepos: 10000,
    totalStars: 50000,
  },
  momentum: {
    newReposLast30Days: 1200,
    topStarredNewRepo: {
      name: 'test/repo',
      stars: 300,
    },
  },
  lastUpdated: '2026-10-01T00:00:00.000Z',
};

describe('TechBar Component', () => {
  it('renders technology name, category, and popularity metrics correctly', () => {
    render(<TechBar entry={mockEntry} maxStars={100000} />);

    expect(screen.getByText('Python')).toBeInTheDocument();
    expect(screen.getByText('language')).toBeInTheDocument();
    expect(screen.getByText(/50/)).toBeInTheDocument();
  });

  it('renders GitHub link safely', () => {
    render(<TechBar entry={mockEntry} maxStars={100000} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'https://github.com/python/cpython');
    expect(link).toHaveAttribute('target', '_blank');
  });
});
