/** The fields of a featured piece that ordering uses. */
export interface Sortable {
  /** Folder path, e.g. "fine-art/portraits/family-portrait". Always present and unique. */
  id: string;
  /** Hand-set position from the piece's frontmatter. Lower shows first. */
  order?: number;
  /** When the piece was added to the site, from the frontmatter. */
  added?: Date;
}

/**
 * Decides the order of featured pieces within a category.
 *
 *   1. Pinned pieces (those with an `order`) lead, lowest number first.
 *   2. The rest follow newest first by `added`; a piece with no date goes last.
 *   3. Whatever is still level is settled by folder name, so the order never
 *      changes between builds.
 *
 * Standard comparator contract: negative if `a` shows before `b`, positive if
 * after. It only returns 0 for a piece compared with itself.
 */
export function comparePieces(a: Sortable, b: Sortable): number {
  // Compared against undefined, not for truthiness: an order of 0 is a pin.
  if (a.order !== b.order) {
    if (a.order === undefined) return 1;
    if (b.order === undefined) return -1;
    return a.order - b.order;
  }

  const aAdded = a.added?.getTime();
  const bAdded = b.added?.getTime();
  if (aAdded !== bAdded) {
    if (aAdded === undefined) return 1;
    if (bAdded === undefined) return -1;
    return bAdded - aAdded;
  }

  // A fixed locale keeps the result the same on every machine that builds the
  // site; `numeric` reads piece-2 before piece-10.
  return a.id.localeCompare(b.id, 'en', { numeric: true });
}
