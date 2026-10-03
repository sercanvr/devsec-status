import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
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
  creator: {
    name: 'Guido van Rossum',
    avatarUrl: 'https://github.com/gvanrossum.png',
    type: 'person',
    releaseDate: '20 Şubat 1991',
    latestVersion: 'v3.13.2',
  },
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
  it('renders technology name, category, creator and popularity metrics correctly', () => {
    render(<TechBar entry={mockEntry} maxStars={100000} />);

    expect(screen.getByText('Python')).toBeInTheDocument();
    expect(screen.getByText('categories.language')).toBeInTheDocument();
    expect(screen.getByText('Guido van Rossum')).toBeInTheDocument();
    expect(screen.getByText(/50/)).toBeInTheDocument();
  });

  it('renders GitHub link safely', () => {
    render(<TechBar entry={mockEntry} maxStars={100000} />);

    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveAttribute('href', 'https://github.com/python/cpython');
    expect(links[0]).toHaveAttribute('target', '_blank');
  });
});
