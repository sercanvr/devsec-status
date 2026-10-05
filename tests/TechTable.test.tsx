import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TechTable } from '../src/components/TechTable';
import { TechEntry } from '../src/types/tech';

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'tr', changeLanguage: () => Promise.resolve() },
  }),
}));

const mockEntries: TechEntry[] = [
  {
    id: 'test-python',
    name: 'Python',
    category: 'language',
    subCategory: 'Data Science & Systems',
    iconUrl: 'https://example.com/python.png',
    githubUrl: 'https://github.com/python/cpython',
    creator: {
      name: 'Guido van Rossum',
      avatarUrl: 'https://github.com/gvanrossum.png',
      type: 'person',
      releaseDate: '1991',
      latestVersion: 'v3.13.2',
    },
    popularity: {
      totalRepos: 10000,
      totalStars: 62000,
    },
    momentum: {
      newReposLast30Days: 1200,
      topStarredNewRepo: {
        name: 'test/repo',
        stars: 300,
      },
    },
    lastUpdated: '2026-10-01T00:00:00.000Z',
  },
  {
    id: 'test-rust',
    name: 'Rust',
    category: 'language',
    subCategory: 'Systems',
    iconUrl: 'https://example.com/rust.png',
    githubUrl: 'https://github.com/rust-lang/rust',
    creator: {
      name: 'Graydon Hoare',
      avatarUrl: 'https://github.com/graydon.png',
      type: 'person',
      releaseDate: '2010',
      latestVersion: 'v1.84.0',
    },
    popularity: {
      totalRepos: 5000,
      totalStars: 95000,
    },
    momentum: {
      newReposLast30Days: 800,
    },
    lastUpdated: '2026-10-01T00:00:00.000Z',
  },
];

describe('TechTable Component', () => {
  it('renders table title, search input and entry names', () => {
    render(
      <TechTable
        id="section-test"
        title="Test Languages"
        entries={mockEntries}
      />
    );

    expect(screen.getByText('Test Languages')).toBeInTheDocument();
    expect(screen.getAllByText('Python').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Rust').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Guido van Rossum').length).toBeGreaterThan(0);
  });

  it('renders progress bar and numeric popularity', () => {
    render(
      <TechTable
        id="section-test"
        title="Test Languages"
        entries={mockEntries}
      />
    );

    const progressBars = screen.getAllByRole('progressbar');
    expect(progressBars.length).toBeGreaterThan(0);
  });

  it('filters entries when search input is used', () => {
    render(
      <TechTable
        id="section-test"
        title="Test Languages"
        entries={mockEntries}
      />
    );

    const searchInput = screen.getByPlaceholderText('nav.search');
    fireEvent.change(searchInput, { target: { value: 'Rust' } });

    expect(screen.getAllByText('Rust').length).toBeGreaterThan(0);
    expect(screen.queryByText('Guido van Rossum')).not.toBeInTheDocument();
  });

  it('toggles row expansion when details button is clicked', () => {
    render(
      <TechTable
        id="section-test"
        title="Test Languages"
        entries={mockEntries}
      />
    );

    const detailsButtons = screen.getAllByText('Detaylar');
    fireEvent.click(detailsButtons[0]);

    expect(screen.getAllByText('Topluluk & Katkıda Bulunanlar').length).toBeGreaterThan(0);
    expect(screen.getAllByText('GitHub Deposuna Git').length).toBeGreaterThan(0);
  });
});
