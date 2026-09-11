// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { execSync } from 'node:child_process';

function gitLastmod(url) {
  try {
    const u = new URL(url);
    let p = u.pathname.replace(/\/$/, '') || '/';
    const rel = p === '/' ? 'index' : p.slice(1);
    const candidates = [
      `src/pages/${rel}/index.astro`,
      `src/pages/${rel}.astro`,
      `src/pages/${rel}/[model].astro`,
    ];
    for (const c of candidates) {
      const out = execSync(`git log -1 --format=%cs -- ${c}`, { encoding: 'utf8' }).trim();
      if (out) return new Date(out);
    }
  } catch {
    /* fall through */
  }
  return undefined;
}

export default defineConfig({
  site: 'https://dingweibattery.com',
  output: 'static',
  build: {
    format: 'directory'
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'ar', 'ru', 'zh'],
    routing: {
      prefixDefaultLocale: false
    }
  },
  integrations: [
    sitemap({
      serialize(item) {
        const lastmod = gitLastmod(item.url);
        return lastmod ? { ...item, lastmod } : item;
      },
    }),
  ],
  trailingSlash: 'always'
});
