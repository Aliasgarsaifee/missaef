import type { Kind } from '../data/catalog';

/**
 * The pieces a visitor may see. A piece whose title, story or collection is
 * still a draft (`confirmed: false`) is never published. `showDrafts` is for
 * reviewing drafts on your own machine before they go live.
 */
export function visiblePieces<T extends { confirmed: boolean }>(pieces: T[], showDrafts: boolean): T[] {
  return showDrafts ? pieces : pieces.filter((piece) => piece.confirmed);
}

/**
 * Pieces grouped under their kind, in the catalogue's order of kinds. A kind
 * with no pieces is left out. Pieces keep the order they arrived in.
 */
export function groupByKind<T extends { kind: Kind }>(
  pieces: T[],
  kinds: Kind[],
): { kind: Kind; pieces: T[] }[] {
  return kinds
    .map((kind) => ({ kind, pieces: pieces.filter((piece) => piece.kind.slug === kind.slug) }))
    .filter((group) => group.pieces.length > 0);
}

/** The occasions that appear on these pieces, once each, in the catalogue's order. */
export function occasionsIn(pieces: { tags: readonly string[] }[], all: readonly string[]): string[] {
  const present = new Set(pieces.flatMap((piece) => piece.tags));
  return all.filter((occasion) => present.has(occasion));
}

/** Featured pieces first. The order inside each group is kept. */
export function featuredFirst<T extends { featured: boolean }>(pieces: T[]): T[] {
  return [...pieces.filter((piece) => piece.featured), ...pieces.filter((piece) => !piece.featured)];
}
