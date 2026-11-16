import { describe, expect, it } from 'vitest';
import { instagramMessageUrl, instagramProfileUrl, whatsappUrl, withBase } from '../src/lib/links';

describe('withBase', () => {
  it('prefixes the base path and ends pages with a slash', () => {
    expect(withBase('/about', '/missaef')).toBe('/missaef/about/');
    expect(withBase('work/fine-art/', '/missaef')).toBe('/missaef/work/fine-art/');
  });

  it('gives the same result whether or not the base ends in a slash', () => {
    expect(withBase('/about', '/missaef/')).toBe('/missaef/about/');
  });

  it('points the home page at the base itself', () => {
    expect(withBase('/', '/missaef')).toBe('/missaef/');
    expect(withBase('', '/missaef/')).toBe('/missaef/');
  });

  it('leaves a file name without a trailing slash', () => {
    expect(withBase('/favicon.svg', '/missaef')).toBe('/missaef/favicon.svg');
  });

  it('works when the site is served from the root, as with a custom domain', () => {
    expect(withBase('/about', '/')).toBe('/about/');
    expect(withBase('/', '/')).toBe('/');
  });
});

describe('contact links', () => {
  it('builds Instagram links from the handle', () => {
    expect(instagramProfileUrl('missaef_')).toBe('https://www.instagram.com/missaef_/');
    expect(instagramMessageUrl('missaef_')).toBe('https://ig.me/m/missaef_');
  });

  it('strips everything but digits from a WhatsApp number', () => {
    expect(whatsappUrl('+91 00000 00000')).toBe('https://wa.me/910000000000');
  });

  it('encodes the prefilled message', () => {
    expect(whatsappUrl('910000000000', 'Hi! I saw your Resin Art & more')).toBe(
      'https://wa.me/910000000000?text=Hi!%20I%20saw%20your%20Resin%20Art%20%26%20more',
    );
  });
});
