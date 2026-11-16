import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { occasions } from './data/catalog';
import { collectionSlugs } from './data/collections';

/**
 * A piece is a folder holding an index.md and its images:
 *
 *   src/content/work/<kind>/<category>/<piece>/index.md
 *   src/content/work/<kind>/<category>/<piece>/1.jpg
 *
 * The folder name is the piece's slug and the kind comes from where the
 * folder sits. The fields below go in the frontmatter of index.md. The text
 * under the frontmatter is the piece's short story: the person and the
 * occasion first, then the making. It is optional.
 */
const pieces = defineCollection({
  loader: glob({
    base: './src/content/work',
    pattern: '**/index.md',
    // "made-to-use/namakdani/strawberry/index.md" -> "made-to-use/namakdani/strawberry"
    generateId: ({ entry }) => entry.replace(/\/index\.md$/, ''),
  }),
  schema: z.object({
    title: z.string().min(1),
    /** Medium or materials, e.g. "Graphite on paper". Only what is known, never a guess. */
    medium: z.string().min(1),
    /**
     * What the first photo shows, for visitors who cannot see it. Without it
     * the title is used. Keep client names out, even when one is in the photo.
     */
    alt: z.string().min(1).optional(),
    /** Shown large, with its wish note, ahead of the other pieces of its kind. */
    featured: z.boolean().default(false),
    /** Occasions this piece suits. Must come from the list in data/catalog.ts. */
    tags: z.array(z.enum(occasions)).default([]),
    /** Lower numbers show first. Leave out to let the default order decide. */
    order: z.number().optional(),
    /** When the piece was added to the site. Used for ordering only, never shown. */
    added: z.coerce.date().optional(),

    /**
     * "heirloom" or "keepsake". This is Fatema's pricing call: a collection
     * proposed from the photo is a guess until `confirmed` is true.
     */
    collection: z.enum(collectionSlugs).optional(),
    /**
     * The wish that started the piece, in the client's own words, one or two
     * lines. Only ever a wish Ali has passed on. Never write one: a piece
     * with no wish is shown without a note.
     */
    wish: z.string().min(1).optional(),
    /** Who wished it, as a relationship and never a name: "her best friend, Pune". */
    wishedBy: z.string().min(1).optional(),
    /**
     * False while the title, story, collection or tags are still a draft.
     * Set to true once Ali has confirmed the piece. A draft is shown on the
     * dev server only and is never published.
     */
    confirmed: z.boolean().default(false),
  }),
});

export const collections = { pieces };
