import { create } from 'xmlbuilder2';
import { dirname, join } from 'path';
import { writeFileSync } from 'fs';
import blogConfig from '../../../config.json';

async function sitemap(generator) {
  const root = create({ version: '1.0', encoding: 'utf-8', standalone: 'yes' });
  const map = root.ele('urlset', { xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9' })

  for (const file in generator.ctx) {
    const url = dirname(file) === '.' ? `${blogConfig.url}` : `${blogConfig.url}/${dirname(file)}`;
    map
      .ele('url')
      .ele('loc').txt(url);
  }

  const xml = root.end({ prettyPrint: true });
  const out = join(this._destination, 'sitemap.xml');
  writeFileSync(out, xml);

  return this;
}

export {
  sitemap as default
}