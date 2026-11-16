import { describe, expect, it } from 'vitest';
import { altFromFilename } from '../src/lib/alt';

const fallback = 'Portraits by missaef';

describe('altFromFilename', () => {
  it('turns a descriptive file name into a sentence', () => {
    expect(altFromFilename('galaxy-trinket-tray.jpg', fallback)).toBe('Galaxy trinket tray');
    expect(altFromFilename('rose_coaster.PNG', fallback)).toBe('Rose coaster');
    expect(altFromFilename('portrait.jpg', fallback)).toBe('Portrait');
  });

  it('drops a leading number that is only there for ordering', () => {
    expect(altFromFilename('02-rose-coaster.jpg', fallback)).toBe('Rose coaster');
  });

  it('ignores any folders in front of the file name', () => {
    expect(altFromFilename('resin-art/home-and-table/coffee-coaster.jpg', fallback)).toBe(
      'Coffee coaster',
    );
  });

  it('keeps a real word that only starts like a camera prefix', () => {
    expect(altFromFilename('picnic-hamper.jpg', fallback)).toBe('Picnic hamper');
    expect(altFromFilename('photo-of-nikah-frame.jpg', fallback)).toBe('Photo of nikah frame');
  });

  it.each([
    'IMG_1234.JPG',
    'IMG_1234 (1).jpg',
    'IMG-20260101-WA0012.jpg',
    'DSC01234.jpg',
    'PXL_20260101_123456789.jpg',
    'WhatsApp Image 2026-01-01 at 10.30.00.jpeg',
    '20260101_123456.jpg',
    '001.jpg',
    'image.png',
    'placeholder-3.jpg',
  ])('falls back for the machine-made name %s', (name) => {
    expect(altFromFilename(name, fallback)).toBe(fallback);
  });
});
