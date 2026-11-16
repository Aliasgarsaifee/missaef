/** What a visitor fills in on the "Tell me your wish" form. */
export interface WishAnswers {
  /** What they want made. */
  what: string;
  occasion: string;
  /** Their vision or theme. May run over several lines. */
  vision: string;
  /** Collection name as the visitor sees it, e.g. "Heirloom". Blank when not sure. */
  collection?: string;
  /** Date needed, as a date field gives it: "2026-12-12". */
  neededBy?: string;
  /** Delivery city. */
  city?: string;
}

export type RequiredAnswer = 'what' | 'occasion' | 'vision';

/** Her order script asks these three things, in this order. */
const REQUIRED: RequiredAnswer[] = ['what', 'occasion', 'vision'];

// Wording of the message is a first draft for Fatema to edit.
const GREETING = 'Hello Fatema, I have a wish.';

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

/** The three questions a visitor has left blank. Spaces alone count as blank. */
export function missingAnswers(answers: WishAnswers): RequiredAnswer[] {
  return REQUIRED.filter((key) => answers[key].trim() === '');
}

/**
 * Turns the form's answers into the one message a visitor sends on WhatsApp
 * or pastes into Instagram. Optional answers left blank get no line.
 */
export function composeWish(answers: WishAnswers): string {
  const lines = [
    GREETING,
    '',
    `What I would like made: ${oneLine(answers.what)}`,
    `The occasion: ${oneLine(answers.occasion)}`,
    `My vision: ${paragraphs(answers.vision)}`,
  ];

  const extras = [
    ['Collection', oneLine(answers.collection)],
    ['Needed by', readableDate(oneLine(answers.neededBy))],
    ['Deliver to', oneLine(answers.city)],
  ]
    .filter(([, value]) => value !== '')
    .map(([label, value]) => `${label}: ${value}`);

  if (extras.length > 0) lines.push('', ...extras);
  return lines.join('\n');
}

/** Collapses every run of spaces and line breaks into a single space. */
function oneLine(text = ''): string {
  return text.trim().replace(/\s+/g, ' ');
}

/** Keeps a visitor's line breaks, but no more than one blank line in a row. */
function paragraphs(text: string): string {
  return text.trim().replace(/\n{3,}/g, '\n\n');
}

/**
 * "2027-04-03" becomes "3 April 2027". Written out by hand instead of with
 * the browser's own date formatting, which varies by phone and by language
 * setting; she should get the same message from everyone.
 */
function readableDate(value: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  const month = match ? MONTHS[Number(match[2]) - 1] : undefined;
  if (!match || !month) return value;
  return `${Number(match[3])} ${month} ${match[1]}`;
}
