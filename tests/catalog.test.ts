import { describe, expect, it } from 'vitest';
import { kinds, occasions } from '../src/data/catalog';
import { collectionNames, collectionSlugs } from '../src/data/collections';

// Slugs become folder names and URLs, so they must be lowercase words joined by hyphens.
const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;

describe('catalog', () => {
  it('has the three kinds of work from her brief, in her order', () => {
    expect(kinds.map((kind) => kind.title)).toEqual([
      'Gifts and hampers',
      'Art and showpieces',
      'Made to use',
    ]);
  });

  it('uses URL-safe slugs everywhere', () => {
    for (const kind of kinds) {
      expect(kind.slug, kind.title).toMatch(SLUG);
      for (const category of kind.categories) {
        expect(category.slug, `${kind.title} / ${category.title}`).toMatch(SLUG);
      }
    }
  });

  it('never repeats a category slug, even across kinds', () => {
    const slugs = kinds.flatMap((kind) => kind.categories.map((category) => category.slug));
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('gives every kind at least one category, since pieces live in category folders', () => {
    for (const kind of kinds) {
      expect(kind.categories.length, kind.title).toBeGreaterThan(0);
    }
  });

  it('never repeats an occasion tag', () => {
    expect(new Set(occasions).size).toBe(occasions.length);
  });
});

describe('collections', () => {
  it('uses URL-safe slugs, since each collection is a page', () => {
    for (const slug of collectionSlugs) expect(slug).toMatch(SLUG);
  });

  it('never names a collection by its price', () => {
    const banned = /budget|cheap|economy|affordable|premium|luxury/i;
    for (const slug of collectionSlugs) expect(collectionNames[slug]).not.toMatch(banned);
  });
});
