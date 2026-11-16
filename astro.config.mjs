import { defineConfig } from 'astro/config';

// Served as a GitHub Pages project site: https://aliasgarsaifee.github.io/missaef/
// If a custom domain is added later: set `site` to it, delete `base`,
// and add public/CNAME containing the domain.
export default defineConfig({
  site: 'https://aliasgarsaifee.github.io',
  base: '/missaef',
  // Pages serves /about/ from about/index.html, so links always end in a slash.
  trailingSlash: 'always',
  image: {
    // Every <Image> gets a srcset and never renders wider than its source,
    // so a phone downloads a phone-sized file.
    layout: 'constrained',
    responsiveStyles: true,
  },
  vite: {
    // `SHOW_DRAFTS=1 astro build` builds the site with unconfirmed pieces
    // included, for looking at drafts in a real build. Never used to deploy.
    define: { __SHOW_DRAFTS__: JSON.stringify(process.env.SHOW_DRAFTS === '1') },
    server: {
      // The IDE's Python virtualenv and settings are not part of the site.
      watch: { ignored: ['**/.venv/**', '**/.idea/**'] },
    },
  },
});
