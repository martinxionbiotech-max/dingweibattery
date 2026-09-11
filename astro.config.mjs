// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

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
  integrations: [sitemap()],
  trailingSlash: 'always'
});
