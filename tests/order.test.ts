import { describe, expect, it } from 'vitest';
import { comparePieces, type Sortable } from '../src/lib/order';

const piece = (id: string, fields: Omit<Sortable, 'id'> = {}): Sortable => ({ id, ...fields });
const day = (iso: string) => new Date(iso);
/** Sorts the pieces and returns their ids, so a test reads as "this order". */
const sorted = (...pieces: Sortable[]) => [...pieces].sort(comparePieces).map((p) => p.id);

describe('comparePieces', () => {
  it('shows pinned pieces lowest number first', () => {
    expect(
      sorted(piece('x', { order: 3 }), piece('z', { order: 1 }), piece('y', { order: 2 })),
    ).toEqual(['z', 'y', 'x']);
  });

  it('puts a pinned piece ahead of a newer piece that is not pinned', () => {
    expect(
      sorted(piece('a', { added: day('2026-11-01') }), piece('b', { order: 5 })),
    ).toEqual(['b', 'a']);
  });

  it('counts order 0 as pinned', () => {
    expect(
      sorted(
        piece('a', { added: day('2026-11-01') }),
        piece('b', { order: 1 }),
        piece('c', { order: 0 }),
      ),
    ).toEqual(['c', 'b', 'a']);
  });

  it('shows pieces that are not pinned newest first', () => {
    expect(
      sorted(
        piece('a', { added: day('2026-01-10') }),
        piece('b', { added: day('2026-06-10') }),
        piece('c', { added: day('2025-03-10') }),
      ),
    ).toEqual(['b', 'a', 'c']);
  });

  it('puts a piece with no order and no date after the dated ones', () => {
    expect(sorted(piece('a'), piece('b', { added: day('2020-01-01') }))).toEqual(['b', 'a']);
  });

  it('uses the date to separate two pieces that share an order number', () => {
    expect(
      sorted(
        piece('a', { order: 1, added: day('2026-01-10') }),
        piece('b', { order: 1, added: day('2026-06-10') }),
      ),
    ).toEqual(['b', 'a']);
  });

  it('uses the folder name when nothing else separates two pieces, reading numbers as numbers', () => {
    expect(
      sorted(piece('fine-art/portraits/piece-10'), piece('fine-art/portraits/piece-2')),
    ).toEqual(['fine-art/portraits/piece-2', 'fine-art/portraits/piece-10']);
  });

  it('gives a mixed category the same order whichever way the folders are read', () => {
    const pieces = [
      piece('undated-b'),
      piece('dated-old', { added: day('2025-02-01') }),
      piece('pinned-2', { order: 2 }),
      piece('undated-a'),
      piece('dated-new', { added: day('2026-09-01') }),
      piece('pinned-1', { order: 1 }),
    ];
    const expected = ['pinned-1', 'pinned-2', 'dated-new', 'dated-old', 'undated-a', 'undated-b'];

    expect(sorted(...pieces)).toEqual(expected);
    expect(sorted(...pieces.toReversed())).toEqual(expected);
  });
});
