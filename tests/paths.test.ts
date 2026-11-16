import { describe, expect, it } from 'vitest';
import type { Kind } from '../src/data/catalog';
import { byFileName, locateWorkFile } from '../src/lib/paths';

const catalog: Kind[] = [
  {
    slug: 'art-and-showpieces',
    title: 'Art and showpieces',
    intro: '',
    categories: [
      { slug: 'portraits', title: 'Portraits', intro: '' },
      { slug: 'paintings', title: 'Paintings', intro: '' },
    ],
  },
  {
    slug: 'made-to-use',
    title: 'Made to use',
    intro: '',
    categories: [{ slug: 'namakdani', title: 'Namakdani', intro: '' }],
  },
];

describe('locateWorkFile', () => {
  it('reads a file inside a piece folder', () => {
    expect(locateWorkFile('art-and-showpieces/portraits/family-portrait/1.jpg', catalog)).toEqual({
      kind: 'art-and-showpieces',
      category: 'portraits',
      piece: 'family-portrait',
      file: '1.jpg',
    });
  });

  it('rejects a loose image in a category folder and says where to move it', () => {
    expect(() => locateWorkFile('art-and-showpieces/portraits/sketch.jpg', catalog)).toThrow(
      'src/content/work/art-and-showpieces/portraits/sketch.jpg: every piece needs its own folder. ' +
        'Move this file into src/content/work/art-and-showpieces/portraits/<piece-name>/ ' +
        'and give that folder an index.md.',
    );
  });

  it('rejects a file that is not inside a category folder', () => {
    expect(() => locateWorkFile('art-and-showpieces/sketch.jpg', catalog)).toThrow(
      /src\/content\/work\/art-and-showpieces\/sketch\.jpg: expected <kind>\/<category>\/<piece>\/<file>/,
    );
  });

  it('rejects a file nested too deep', () => {
    expect(() => locateWorkFile('art-and-showpieces/portraits/a/b/1.jpg', catalog)).toThrow(
      /expected <kind>\/<category>\/<piece>\/<file>/,
    );
  });

  it('names the valid kinds when the kind folder is misspelled', () => {
    expect(() => locateWorkFile('art/portraits/family-portrait/1.jpg', catalog)).toThrow(
      '"art" is not a kind of work. Kinds are: art-and-showpieces, made-to-use.',
    );
  });

  it('names the valid categories when the category folder is misspelled', () => {
    expect(() =>
      locateWorkFile('art-and-showpieces/portrait/family-portrait/1.jpg', catalog),
    ).toThrow(
      '"portrait" is not a category of art-and-showpieces. Categories are: portraits, paintings.',
    );
  });
});

describe('byFileName', () => {
  it('orders numbered files the way a person counts', () => {
    expect(['10.jpg', '2.jpg', '1.jpg'].sort(byFileName)).toEqual(['1.jpg', '2.jpg', '10.jpg']);
  });

  it('ignores letter case', () => {
    expect(['b.jpg', 'A.jpg', 'c.jpg'].sort(byFileName)).toEqual(['A.jpg', 'b.jpg', 'c.jpg']);
  });
});
