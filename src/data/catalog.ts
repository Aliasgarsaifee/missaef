/**
 * The catalogue tree: three kinds of work, each holding categories.
 *
 * The kinds are Fatema's own split ("gift items", "a piece of art like
 * showpiece", "very useful stuff"). The categories keep the name each thing
 * is actually called (wadhavani tray, namakdani, rida), never a translation.
 *
 * Folder names under src/content/work/ must match these slugs exactly:
 *   src/content/work/<kind slug>/<category slug>/<piece>/
 * The build fails with a clear message if a folder does not match.
 *
 * A category with no pieces in it is simply not shown, so listing one here
 * costs nothing. Add a category when the first photo of that kind arrives.
 *
 * Deliberately not here until Ali confirms she wants them on the site:
 * devotional calligraphy, the Ashara sketchbook posts, and resin Islamic art.
 *
 * Intro texts are first drafts for Fatema to edit. A category intro doubles
 * as the plain one-line description on a piece page, for a visitor who does
 * not know the term.
 */

export interface Category {
  slug: string;
  title: string;
  intro: string;
}

export interface Kind {
  slug: string;
  title: string;
  intro: string;
  categories: Category[];
}

/** Occasions cut across kinds, so they are tags and not categories. */
export const occasions = [
  'Wedding',
  'Nikah',
  'Shitabi',
  'Birthday',
  'Ramadan',
  'Eid',
  'Ashara',
  'Diwali',
  'Anniversary',
] as const;

export type Occasion = (typeof occasions)[number];

export const kinds: Kind[] = [
  {
    slug: 'gifts-and-hampers',
    title: 'Gifts and hampers',
    intro: 'Gifts put together by hand around one person and one occasion.',
    categories: [
      {
        slug: 'wadhavani-trays',
        title: 'Wadhavani trays',
        intro: 'A wadhavani tray is a decorated tray of gifts, made to a theme for a birthday or celebration.',
      },
      {
        slug: 'shitabi',
        title: 'Shitabi trays and packing',
        intro: 'Trays and packing for shitabi, with a place each for the mehndi cone, attar and kajal.',
      },
      {
        slug: 'hampers',
        title: 'Hampers',
        intro: 'Hampers put together around a person and an occasion.',
      },
      {
        slug: 'bouquets',
        title: 'Bouquets',
        intro: 'Bouquets of dry fruit, chocolate and handmade flowers.',
      },
      {
        slug: 'money-gifts',
        title: 'Money gifts',
        intro: 'Cash gifts folded, framed and presented as something to keep.',
      },
      {
        slug: 'themed-boxes',
        title: 'Themed boxes and surprises',
        intro: 'One-off gifts built around a single idea.',
      },
      {
        slug: 'padla-and-trousseau',
        title: 'Padla and trousseau packing',
        intro: 'Padla tokni and trousseau packing for the bride.',
      },
      {
        slug: 'invitations',
        title: 'Invitations',
        intro: 'Invitations made to be kept after the day.',
      },
    ],
  },
  {
    slug: 'art-and-showpieces',
    title: 'Art and showpieces',
    intro: 'Pieces made to be looked at and kept.',
    categories: [
      {
        slug: 'portraits',
        title: 'Portrait sketches',
        intro: 'Portraits in graphite, drawn from your photographs and framed.',
      },
      {
        slug: 'string-art',
        title: 'String art',
        intro: 'Pictures made from thread wound between pins.',
      },
      {
        slug: 'clay-miniatures',
        title: 'Miniature clay scenes',
        intro: 'Small scenes modelled in clay.',
      },
      {
        slug: 'paintings',
        title: 'Paintings',
        intro: 'Paintings on canvas.',
      },
      {
        slug: 'illustration',
        title: 'Illustration',
        intro: 'Illustration drawn on screen, including rida designs.',
      },
      {
        slug: 'resin-keepsakes',
        title: 'Resin keepsakes and frames',
        intro: 'Frames and keepsakes set in resin, often with flowers or a memory sealed inside.',
      },
    ],
  },
  {
    slug: 'made-to-use',
    title: 'Made to use',
    intro: 'Pieces made by hand to be used, not only looked at.',
    categories: [
      {
        slug: 'namakdani',
        title: 'Namakdani',
        intro: 'A namakdani is a small salt holder for the table, each one made to a theme.',
      },
      {
        slug: 'keychains-and-charms',
        title: 'Keychains and bag charms',
        intro: 'Keychains and bag charms modelled in clay.',
      },
      {
        slug: 'mirrors',
        title: 'Personalised mirrors',
        intro: 'Mirrors decorated and personalised by hand.',
      },
      {
        slug: 'ridas',
        title: 'Hand-painted ridas',
        intro: 'A rida is the two-piece dress worn by Dawoodi Bohra women. These are painted by hand.',
      },
      {
        slug: 'brooches-and-pendants',
        title: 'Brooches and pendants',
        intro: 'Small pieces made to match an outfit.',
      },
      {
        slug: 'resin-home-and-table',
        title: 'Resin for home and table',
        intro: 'Coasters, trays, clocks and diya holders set in resin.',
      },
    ],
  },
];
