import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import {
  isSafeLocalAsset,
  isAllowedIconUrl,
  isAllowedAvatarUrl,
  isAllowedRepoUrl,
  ALLOWED_CATEGORIES,
  ALLOWED_CREATOR_TYPES,
} from '../src/lib/urlPolicy';

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

  it('validates enum values for category and creator.type', () => {
    for (const file of dataFiles) {
      const filePath = path.resolve(__dirname, '../src/data', file);
      const entries = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

      for (const entry of entries) {
        expect(
          ALLOWED_CATEGORIES.has(entry.category),
          `Invalid category '${entry.category}' in entry ${entry.id} (${file})`
        ).toBe(true);

        if (entry.creator) {
          expect(
            ALLOWED_CREATOR_TYPES.has(entry.creator.type),
            `Invalid creator.type '${entry.creator.type}' in entry ${entry.id} (${file})`
          ).toBe(true);
        }
      }
    }
  });

  it('all URLs adhere to HTTPS security standards and trusted host allowlist', () => {
    for (const file of dataFiles) {
      const filePath = path.resolve(__dirname, '../src/data', file);
      const entries = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

      for (const entry of entries) {
        // 1. githubUrl must adhere to allowed repo hosts
        expect(
          isAllowedRepoUrl(entry.githubUrl),
          `Untrusted githubUrl in entry ${entry.id}: ${entry.githubUrl}`
        ).toBe(true);

        // 2. iconUrl must be a safe local asset or allowed remote icon host
        expect(
          isAllowedIconUrl(entry.iconUrl),
          `Untrusted or invalid iconUrl in entry ${entry.id}: ${entry.iconUrl}`
        ).toBe(true);

        // 3. creator avatarUrl must belong to allowed avatar hosts
        if (entry.creator?.avatarUrl) {
          expect(
            isAllowedAvatarUrl(entry.creator.avatarUrl),
            `Untrusted creator avatarUrl in entry ${entry.id}: ${entry.creator.avatarUrl}`
          ).toBe(true);
        }
      }
    }
  });

  describe('Security Validation Edge Cases (Negative Testing)', () => {
    it('correctly rejects protocol-relative, backslash bypasses, and javascript URLs', () => {
      expect(isSafeLocalAsset('/icons/python.webp')).toBe(true);
      expect(isSafeLocalAsset('/icons/sub/logo.svg')).toBe(true);
      expect(isSafeLocalAsset('//evil.com/x.png')).toBe(false);
      expect(isSafeLocalAsset('/\\evil.com/x.png')).toBe(false);
      expect(isSafeLocalAsset('javascript:alert(1)')).toBe(false);
      expect(isSafeLocalAsset('http://insecure.com/x.png')).toBe(false);
    });

    it('correctly validates icon allowlist policy', () => {
      expect(isAllowedIconUrl('/icons/python.webp')).toBe(true);
      expect(isAllowedIconUrl('https://cdn.simpleicons.org/react')).toBe(true);
      expect(isAllowedIconUrl('https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg')).toBe(true);
      expect(isAllowedIconUrl('https://raw.githubusercontent.com/user/repo/main/logo.png')).toBe(true);
      expect(isAllowedIconUrl('https://evil.com/fake-logo.png')).toBe(false);
      expect(isAllowedIconUrl('http://cdn.simpleicons.org/react')).toBe(false); // Insecure HTTP rejected
      expect(isAllowedIconUrl('//evil.com/exploit.png')).toBe(false);
      expect(isAllowedIconUrl('https://www.distrowiz.com/evil.png')).toBe(false); // Removed third-party rejected
      expect(isAllowedIconUrl('https://blackarch.org/images/logo.png')).toBe(false); // Removed third-party rejected
      expect(isAllowedIconUrl('https://gchq.github.io/CyberChef/images/logo.png')).toBe(false); // Removed third-party rejected
    });
  });
});
