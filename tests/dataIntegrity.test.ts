import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

const dataFiles = [
  'ai-infrastructure.json',
  'ai-tools.json',
  'databases.json',
  'frameworks.json',
  'languages.json',
  'linux-distros.json',
  'security-distros.json',
  'security-tools.json',
];

describe('Dataset Integrity & Schema Validation', () => {
  it('all 8 data files exist and are valid non-empty arrays', () => {
    for (const file of dataFiles) {
      const filePath = path.resolve(__dirname, '../src/data', file);
      expect(fs.existsSync(filePath), `${file} should exist`).toBe(true);
      const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      expect(Array.isArray(content), `${file} must be an array`).toBe(true);
      expect(content.length, `${file} must not be empty`).toBeGreaterThan(0);
    }
  });

  it('all entries contain required fields and unique IDs', () => {
    const seenIds = new Set<string>();

    for (const file of dataFiles) {
      const filePath = path.resolve(__dirname, '../src/data', file);
      const entries = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

      for (const entry of entries) {
        expect(entry.id, `Entry in ${file} missing id`).toBeTruthy();
        expect(seenIds.has(entry.id), `Duplicate ID found: ${entry.id} in ${file}`).toBe(false);
        seenIds.add(entry.id);

        expect(entry.name, `Entry ${entry.id} missing name`).toBeTruthy();
        expect(entry.category, `Entry ${entry.id} missing category`).toBeTruthy();
        expect(entry.iconUrl, `Entry ${entry.id} missing iconUrl`).toBeTruthy();
        expect(entry.githubUrl, `Entry ${entry.id} missing githubUrl`).toBeTruthy();
        expect(entry.creator, `Entry ${entry.id} missing creator`).toBeDefined();
        expect(entry.popularity, `Entry ${entry.id} missing popularity`).toBeDefined();
        expect(entry.momentum, `Entry ${entry.id} missing momentum`).toBeDefined();
      }
    }
  });

  it('all URLs adhere to HTTPS security standards and trusted host allowlist', () => {
    const allowedHosts = new Set([
      'cdn.simpleicons.org',
      'cdn.jsdelivr.net',
      'avatars.githubusercontent.com',
      'raw.githubusercontent.com',
      'github.com',
      'msercanvar.sirv.com',
      'blackarch.org',
      'www.distrowiz.com',
      'gchq.github.io',
    ]);

    const allowedRepoHosts = new Set([
      'github.com',
      'gitlab.com',
      'gitlab.tails.boum.org',
      'www.caine-live.net',
    ]);

    for (const file of dataFiles) {
      const filePath = path.resolve(__dirname, '../src/data', file);
      const entries = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

      for (const entry of entries) {
        // 1. githubUrl must use HTTPS and belong to trusted code repositories
        expect(
          entry.githubUrl.startsWith('https://'),
          `Invalid githubUrl in ${entry.id}: must use HTTPS`
        ).toBe(true);
        const repoHost = new URL(entry.githubUrl).hostname;
        expect(
          allowedRepoHosts.has(repoHost),
          `Untrusted githubUrl host '${repoHost}' in entry ${entry.id}`
        ).toBe(true);

        // 2. iconUrl must be a local asset (/...) or an HTTPS URL from allowed hosts
        if (entry.iconUrl.startsWith('/')) {
          // Valid local icon path
        } else {
          expect(entry.iconUrl.startsWith('https://'), `iconUrl must use HTTPS: ${entry.iconUrl}`).toBe(true);
          const iconHost = new URL(entry.iconUrl).hostname;
          expect(
            allowedHosts.has(iconHost),
            `Untrusted iconUrl host '${iconHost}' in entry ${entry.id}`
          ).toBe(true);
        }

        // 3. creator avatarUrl must be an HTTPS URL from allowed hosts
        if (entry.creator?.avatarUrl) {
          expect(entry.creator.avatarUrl.startsWith('https://'), `avatarUrl must use HTTPS: ${entry.creator.avatarUrl}`).toBe(true);
          const avatarHost = new URL(entry.creator.avatarUrl).hostname;
          expect(
            allowedHosts.has(avatarHost),
            `Untrusted avatarUrl host '${avatarHost}' in entry ${entry.id}`
          ).toBe(true);
        }
      }
    }
  });
});
