import { describe, expect, it } from 'vitest';
import { composeWish, missingAnswers, type WishAnswers } from '../src/lib/wish';

const answers: WishAnswers = {
  what: 'A birthday wadhavani tray',
  occasion: "My sister's birthday",
  vision: 'Carnival theme, in red and gold',
};

describe('composeWish', () => {
  it('puts her three questions under a greeting, in the order she asks them', () => {
    expect(composeWish(answers)).toBe(
      [
        'Hello Fatema, I have a wish.',
        '',
        'What I would like made: A birthday wadhavani tray',
        "The occasion: My sister's birthday",
        'My vision: Carnival theme, in red and gold',
      ].join('\n'),
    );
  });

  it('adds the collection, date and city after a blank line when they are given', () => {
    const message = composeWish({
      ...answers,
      collection: 'Heirloom',
      neededBy: '2026-12-12',
      city: 'Pune',
    });

    expect(message.split('\n').slice(-4)).toEqual([
      '',
      'Collection: Heirloom',
      'Needed by: 12 December 2026',
      'Deliver to: Pune',
    ]);
  });

  it('leaves out an optional line that was not filled in', () => {
    const message = composeWish({ ...answers, collection: '', neededBy: '  ', city: 'Indore' });

    expect(message).not.toContain('Collection:');
    expect(message).not.toContain('Needed by:');
    expect(message.split('\n').slice(-2)).toEqual(['', 'Deliver to: Indore']);
  });

  it('writes the date in words, so 3 April cannot be read as 4 March', () => {
    expect(composeWish({ ...answers, neededBy: '2027-04-03' })).toContain(
      'Needed by: 3 April 2027',
    );
  });

  it('passes a date through as typed when it is not in the date field format', () => {
    expect(composeWish({ ...answers, neededBy: 'end of Ramadan' })).toContain(
      'Needed by: end of Ramadan',
    );
  });

  it('tidies stray spaces and line breaks in the one-line answers', () => {
    const message = composeWish({ ...answers, what: '  A  birthday\n tray  ', city: ' Pune \n' });

    expect(message).toContain('What I would like made: A birthday tray\n');
    expect(message.endsWith('Deliver to: Pune')).toBe(true);
  });

  it('keeps the line breaks a visitor typed in their vision', () => {
    const message = composeWish({ ...answers, vision: ' Red and gold.\n\n\n\nHer name on the tray. ' });

    expect(message).toContain('My vision: Red and gold.\n\nHer name on the tray.');
  });
});

describe('missingAnswers', () => {
  it('is empty when all three questions are answered', () => {
    expect(missingAnswers(answers)).toEqual([]);
  });

  it('lists each of the three questions left blank, counting spaces as blank', () => {
    expect(missingAnswers({ what: '', occasion: '   ', vision: 'A theme' })).toEqual([
      'what',
      'occasion',
    ]);
  });
});
