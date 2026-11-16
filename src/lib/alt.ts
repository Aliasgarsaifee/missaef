/**
 * Names a phone or an app gives a file, which say nothing about the picture:
 * IMG_1234, IMG-20260101-WA0012, DSC01234, PXL_20260101_123456,
 * WhatsApp Image 2026-01-01 at 10.30.00, 20260101_123456.
 */
const MACHINE_NAME =
  /^(img|dsc|dscn|dscf|pxl|mvimg|image|photo|pic|screenshot|whatsapp image|snapchat|placeholder)?[-_ ]?[\d\s._()-]*(at [\d.\s]+|wa\d+)?$/i;

/**
 * Alt text for a gallery image, which has no title of its own.
 *
 * A descriptive file name becomes the alt text ("galaxy-trinket-tray.jpg" ->
 * "Galaxy trinket tray"). A camera-style name falls back to the given text.
 * A leading number used only for ordering ("02-rose-coaster.jpg") is dropped.
 */
export function altFromFilename(filename: string, fallback: string): string {
  const stem = filename
    .replace(/^.*\//, '')
    .replace(/\.[a-z0-9]+$/i, '')
    .replace(/^\d+[-_ ]+(?=\D)/, '');

  if (MACHINE_NAME.test(stem)) return fallback;

  const words = stem.replace(/[-_]+/g, ' ').replace(/\s+/g, ' ').trim();
  if (words.length === 0) return fallback;
  return words.charAt(0).toUpperCase() + words.slice(1);
}
