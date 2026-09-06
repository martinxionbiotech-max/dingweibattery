import { LOCALES, DEFAULT_LOCALE, type Locale } from './ui';

/**
 * 将任意站点路径(可能带 locale 前缀)转为目标 locale 的路径。
 * 英文(默认)无前缀;其他语言带 /es /ar /ru 前缀。
 */
export function localizedPath(pathname: string, target: Locale): string {
  let base = pathname;
  for (const { code } of LOCALES) {
    if (code === DEFAULT_LOCALE) continue;
    if (base === `/${code}/`) {
      base = '/';
      break;
    }
    if (base.startsWith(`/${code}/`)) {
      base = base.slice(code.length + 1);
      break;
    }
  }
  if (target === DEFAULT_LOCALE) return base;
  return `/${target}${base === '/' ? '/' : base}`;
}
