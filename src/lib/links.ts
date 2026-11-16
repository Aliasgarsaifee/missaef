/**
 * Turns a site path into a link that works under the site's base path.
 *
 * The site is served from /missaef/ on GitHub Pages, so "/about" must become
 * "/missaef/about/". Always build internal links with this.
 */
export function withBase(path: string, base: string = import.meta.env.BASE_URL): string {
  const root = base.replace(/\/+$/, '');
  const clean = path.replace(/^\/+|\/+$/g, '');
  if (clean === '') return `${root}/`;
  // A file such as /favicon.svg keeps its name; a page gets a trailing slash.
  const isFile = /\.[a-z0-9]+$/i.test(clean);
  return `${root}/${clean}${isFile ? '' : '/'}`;
}

export function instagramProfileUrl(handle: string): string {
  return `https://www.instagram.com/${handle}/`;
}

/** Opens a direct message to the account in the Instagram app. */
export function instagramMessageUrl(handle: string): string {
  return `https://ig.me/m/${handle}`;
}

/**
 * WhatsApp click-to-chat link. `message` is typed into the chat box for the
 * visitor, who can edit it before sending.
 */
export function whatsappUrl(number: string, message?: string): string {
  const digits = number.replace(/\D/g, '');
  const query = message ? `?text=${encodeURIComponent(message)}` : '';
  return `https://wa.me/${digits}${query}`;
}
