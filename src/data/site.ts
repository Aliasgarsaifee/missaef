/** Facts about the brand that appear on every page. */
export const site = {
  name: 'missaef',
  byline: 'Art and handcrafted creations by Fatema Boxwala',
  tagline: 'and her creations',
  location: 'Indore, India',

  /** Her phrase. The line at the top of the home page. */
  promise: 'From your heart, to the table.',
  /** Her tagline. Used once, in the footer, and nowhere else. */
  signoff: 'Handcrafted with love',
  /** The words on every button that leads to the order form. */
  orderLabel: 'Tell me your wish',

  /** Her own claims, used exactly as she writes them. */
  credential: 'Certified Fine Artist',
  clients: '500+ happy clients',
  /**
   * Places her pieces have travelled to, from her Instagram story highlights.
   * Not the full list yet: Ali is confirming it with her.
   */
  deliveredTo: ['Mhow', 'Pune', 'Mumbra', 'Mumbai', 'Chhattisgarh', 'Indonesia', 'the US'],

  /** After the brand name in the home page's browser title and link preview. */
  titleLine: 'Handmade gifts and art by Fatema Boxwala, Indore',
  /** Default search and link-preview description. Uses the terms from her own captions. */
  description:
    'Customised birthday gifts, wadhavani trays, hampers and portrait sketches, handmade in Indore, India by Fatema Boxwala.',

  /**
   * Instagram handle, without the @. This is the only handle to link to:
   * some of her posters show @miss_aef, which is not a live account.
   */
  instagram: 'missaef_',
  /**
   * WhatsApp number in international format, digits only (country code first).
   * While this is null no WhatsApp button is published; the dev server shows a
   * marked placeholder on the order form instead. Never put a made-up number
   * here: a wa.me link would open a chat with a stranger.
   */
  whatsapp: null as string | null,
};
