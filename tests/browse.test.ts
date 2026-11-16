import { describe, expect, it } from 'vitest';
import type { Kind } from '../src/data/catalog';
import { featuredFirst, groupByKind, occasionsIn, visiblePieces } from '../src/lib/browse';

const gifts: Kind = { slug: 'gifts-and-hampers', title: 'Gifts and hampers', intro: '', categories: [] };
const art: Kind = { slug: 'art-and-showpieces', title: 'Art and showpieces', intro: '', categories: [] };
const useful: Kind = { slug: 'made-to-use', title: 'Made to use', intro: '', categories: [] };
const kinds = [gifts, art, useful];

describe('visiblePieces', () => {
  const pieces = [
    { id: 'a', confirmed: true },
    { id: 'b', confirmed: false },
  ];

  it('publishes only the pieces Ali has confirmed', () => {
    expect(visiblePieces(pieces, false).map((p) => p.id)).toEqual(['a']);
  });

  it('shows drafts too when asked, for reviewing them before they go live', () => {
    expect(visiblePieces(pieces, true).map((p) => p.id)).toEqual(['a', 'b']);
  });
});

describe('groupByKind', () => {
  it('groups pieces under their kind, in the catalog order of the kinds', () => {
    const pieces = [
      { id: 'namakdani', kind: useful },
      { id: 'tray', kind: gifts },
      { id: 'portrait', kind: art },
      { id: 'bouquet', kind: gifts },
    ];

    expect(
      groupByKind(pieces, kinds).map((group) => [group.kind.slug, group.pieces.map((p) => p.id)]),
    ).toEqual([
      ['gifts-and-hampers', ['tray', 'bouquet']],
      ['art-and-showpieces', ['portrait']],
      ['made-to-use', ['namakdani']],
    ]);
  });

  it('leaves out a kind that has no pieces', () => {
    const groups = groupByKind([{ id: 'portrait', kind: art }], kinds);

    expect(groups.map((group) => group.kind.slug)).toEqual(['art-and-showpieces']);
  });
});

describe('occasionsIn', () => {
  const all = ['Wedding', 'Birthday', 'Eid', 'Diwali'] as const;

  it('lists the occasions that appear on the pieces, once each, in catalog order', () => {
    const pieces = [{ tags: ['Eid', 'Birthday'] }, { tags: ['Birthday'] }, { tags: [] }];

    expect(occasionsIn(pieces, all)).toEqual(['Birthday', 'Eid']);
  });

  it('is empty when no piece carries an occasion', () => {
    expect(occasionsIn([{ tags: [] }], all)).toEqual([]);
  });
});

describe('featuredFirst', () => {
  it('moves featured pieces to the front and keeps the order inside each group', () => {
    const pieces = [
      { id: 'a', featured: false },
      { id: 'b', featured: true },
      { id: 'c', featured: false },
      { id: 'd', featured: true },
    ];

    expect(featuredFirst(pieces).map((p) => p.id)).toEqual(['b', 'd', 'a', 'c']);
  });
});
