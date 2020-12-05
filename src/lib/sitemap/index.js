import { create } from 'xmlbuilder2';
import { dirname } from 'path';
import blogConfig from '../../../config.json';

async function sitemap(generator) {
  const root = create({ version: '1.0' });
  const map = root.ele('sitemapindex', { xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9' })

  for (const file in generator.ctx) {
    const url = dirname(file) === '.' ? `${blogConfig.url}` : `${blogConfig.url}/${dirname(file)}`;
    map
      .ele('url')
      .ele('loc').txt(url);
  }

  const xml = root.end({ prettyPrint: true });
  
  return this;
}

export {
  sitemap as default
}