import type { Kind } from '../data/catalog';

/** Where a file under src/content/work/ belongs. */
export interface WorkLocation {
  /** Slug of the kind of work, e.g. "made-to-use". */
  kind: string;
  category: string;
  /** The piece's folder name. */
  piece: string;
  file: string;
}

/**
 * Reads a path relative to src/content/work/ and says which piece it is part of.
 *
 *   made-to-use/namakdani/strawberry-namakdani/1.jpg
 *   -> kind "made-to-use", category "namakdani", piece "strawberry-namakdani"
 *
 * Every piece has its own folder, because every piece has a title, a
 * collection and a page of its own. Throws with an explanation when a path
 * does not fit, or names a kind or category that is not in the catalogue, so
 * a misplaced or misspelled folder stops the build instead of silently
 * vanishing from the site.
 */
export function locateWorkFile(relativePath: string, catalog: Kind[]): WorkLocation {
  const parts = relativePath.split('/').filter(Boolean);
  const where = `src/content/work/${relativePath}`;

  if (parts.length === 3) {
    const folder = parts.slice(0, 2).join('/');
    throw new Error(
      `${where}: every piece needs its own folder. ` +
        `Move this file into src/content/work/${folder}/<piece-name>/ ` +
        `and give that folder an index.md.`,
    );
  }
  if (parts.length !== 4) {
    throw new Error(`${where}: expected <kind>/<category>/<piece>/<file>.`);
  }

  const [kindSlug, categorySlug, piece, file] = parts as [string, string, string, string];
  const kind = catalog.find((k) => k.slug === kindSlug);
  if (!kind) {
    const known = catalog.map((k) => k.slug).join(', ');
    throw new Error(`${where}: "${kindSlug}" is not a kind of work. Kinds are: ${known}.`);
  }
  if (!kind.categories.some((c) => c.slug === categorySlug)) {
    const known = kind.categories.map((c) => c.slug).join(', ');
    throw new Error(
      `${where}: "${categorySlug}" is not a category of ${kind.slug}. Categories are: ${known}.`,
    );
  }

  return { kind: kindSlug, category: categorySlug, piece, file };
}

/** Sorts file names the way a person reads them: 2.jpg before 10.jpg. */
export function byFileName(a: string, b: string): number {
  return a.localeCompare(b, 'en', { numeric: true, sensitivity: 'base' });
}
