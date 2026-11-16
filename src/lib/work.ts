import type { ImageMetadata } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';
import { kinds, type Category, type Kind, type Occasion } from '../data/catalog';
import { collectionNames, type CollectionSlug } from '../data/collections';
import { altFromFilename } from './alt';
import { visiblePieces } from './browse';
import { withBase } from './links';
import { comparePieces } from './order';
import { byFileName, locateWorkFile } from './paths';

const WORK_ROOT = '/src/content/work/';

/**
 * Drafts are shown on the dev server, and in a build run with SHOW_DRAFTS=1
 * (`npm run build:drafts`). A normal build publishes confirmed pieces only.
 */
const SHOW_DRAFTS = import.meta.env.DEV || __SHOW_DRAFTS__;

/**
 * Every image under src/content/work/, found at build time.
 * Add a new extension here if a camera or export produces one.
 */
const imageModules = import.meta.glob<{ default: ImageMetadata }>(
  '/src/content/work/**/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}',
  { eager: true },
);

export interface WorkImage {
  src: ImageMetadata;
  alt: string;
}

/** One piece of work: a folder holding an index.md and its images. */
export interface Piece {
  /** Folder path, e.g. "made-to-use/namakdani/strawberry-namakdani". */
  id: string;
  /** Link to the piece's own page. */
  href: string;
  title: string;
  kind: Kind;
  category: Category;
  /** Medium or materials. */
  medium: string;
  tags: Occasion[];
  /** Missing only on a draft that has no proposed collection yet. */
  collection?: CollectionSlug;
  collectionName?: string;
  /** The client's wish and who wished it. Missing for a piece with no wish yet. */
  wish?: string;
  wishedBy?: string;
  /** Shown large, with its wish note, ahead of the other pieces of its kind. */
  featured: boolean;
  /** False while the piece is still a draft. Drafts are never published. */
  confirmed: boolean;
  /** In file-name order. Always at least one. */
  images: [WorkImage, ...WorkImage[]];
  /** The collection entry, kept so the piece's page can render the story text. */
  entry: CollectionEntry<'pieces'>;
}

let cached: Promise<Piece[]> | undefined;

/**
 * Every piece a visitor may see, in catalogue order: by kind, then category,
 * then the ordering rule in order.ts.
 */
export function loadPieces(): Promise<Piece[]> {
  cached ??= buildPieces();
  return cached;
}

async function buildPieces(): Promise<Piece[]> {
  // Collect each piece folder's image files. Reading the path also checks it:
  // a loose image or a misspelled folder stops the build here.
  const filesByPiece = new Map<string, { file: string; src: ImageMetadata }[]>();
  for (const path of Object.keys(imageModules).sort(byFileName)) {
    const location = locateWorkFile(path.slice(WORK_ROOT.length), kinds);
    const id = `${location.kind}/${location.category}/${location.piece}`;
    const list = filesByPiece.get(id) ?? [];
    list.push({ file: location.file, src: imageModules[path]!.default });
    filesByPiece.set(id, list);
  }

  const byCategory = new Map<string, Piece[]>();
  for (const entry of await getCollection('pieces')) {
    const where = `src/content/work/${entry.id}/index.md`;
    const location = locateWorkFile(`${entry.id}/index.md`, kinds);
    const kind = kinds.find((k) => k.slug === location.kind)!;
    const category = kind.categories.find((c) => c.slug === location.category)!;

    const files = filesByPiece.get(entry.id);
    if (!files) throw new Error(`${where}: this piece has no images in its folder.`);
    filesByPiece.delete(entry.id);

    const { title, medium, tags, collection, wish, wishedBy, featured, confirmed, alt } = entry.data;
    if (confirmed && !collection) {
      const options = Object.keys(collectionNames).join('" or "');
      throw new Error(`${where}: a confirmed piece needs a collection ("${options}").`);
    }

    // The first image takes the written alt text when there is one. A file
    // with a descriptive name ("back-view.jpg") describes itself.
    const images = files.map(({ file, src }, index) => ({
      src,
      alt:
        index === 0
          ? (alt ?? altFromFilename(file, title))
          : altFromFilename(file, `${title}, view ${index + 1}`),
    })) as [WorkImage, ...WorkImage[]];

    const key = `${kind.slug}/${category.slug}`;
    const list = byCategory.get(key) ?? [];
    list.push({
      id: entry.id,
      href: withBase(`/work/${entry.id}`),
      title,
      kind,
      category,
      medium,
      tags,
      collection,
      collectionName: collection && collectionNames[collection],
      wish,
      wishedBy,
      featured,
      confirmed,
      images,
      entry,
    });
    byCategory.set(key, list);
  }

  const orphan = filesByPiece.keys().next().value;
  if (orphan) {
    throw new Error(
      `src/content/work/${orphan}/: this folder has images but no index.md. ` +
        `Every piece needs an index.md with at least a title and a medium.`,
    );
  }

  const all = kinds.flatMap((kind) =>
    kind.categories.flatMap((category) =>
      (byCategory.get(`${kind.slug}/${category.slug}`) ?? []).sort((a, b) =>
        comparePieces(toSortable(a), toSortable(b)),
      ),
    ),
  );
  return visiblePieces(all, SHOW_DRAFTS);
}

function toSortable(piece: Piece) {
  const { order, added } = piece.entry.data;
  return { id: piece.id, order, added };
}
