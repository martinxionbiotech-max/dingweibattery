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
      // 非内容工具页（/tools/battery-finder、/tools/compare）为交互式筛选/对比工具，
      // 非信息内容页，按 §34 排除出 sitemap；其余可索引内容页全部收录。
      filter: (page) => !page.includes('/tools/'),
      serialize(item) {
        const lastmod = gitLastmod(item.url);
        return lastmod ? { ...item, lastmod } : item;
      },
    }),
  ],
  trailingSlash: 'always'
});
