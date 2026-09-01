// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://dingweibattery.com',
  output: 'static',
  build: {
    format: 'directory'
  },
  integrations: [sitemap()],
  trailingSlash: 'always'
});
