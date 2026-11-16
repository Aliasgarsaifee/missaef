/**
 * The two collections. Every piece belongs to one, and which one is Fatema's
 * pricing call: a proposed collection stays unconfirmed until she agrees.
 *
 * The names are working names, to be confirmed with her. Change them here
 * and they change everywhere; the slugs are what a piece's index.md uses.
 *
 * The two are equals. Never describe either by its price, and never give one
 * a different look from the other.
 */
export const collectionSlugs = ['heirloom', 'keepsake'] as const;

export type CollectionSlug = (typeof collectionSlugs)[number];

export const collectionNames: Record<CollectionSlug, string> = {
  heirloom: 'Heirloom',
  keepsake: 'Keepsake',
};

/**
 * One line under each name, on its door and at the top of its page.
 * First drafts for Fatema. The difference between the two is size, detail,
 * materials and packaging, so that is all these lines may speak of.
 */
export const collectionLines: Record<CollectionSlug, string> = {
  heirloom: 'Larger pieces, with more detail in the making.',
  keepsake: 'Smaller pieces, made with the same care.',
};
