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
});
