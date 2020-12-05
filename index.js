import { Generator } from '@saasmanual/generator';
import directive from 'remark-directive';
import breaks from 'remark-breaks';
import toc from './src/lib/toc';
import alert from './src/lib/alert';
import iframe from './src/lib/iframe';
import floatingImage from './src/lib/floating-image';
import footnotes from 'remark-footnotes';
import posts from './src/lib/posts';
import config from './src/lib/config';
import meta from './src/lib/meta';
import sitemap from './src/lib/sitemap';
(new Generator)
  .templates('./template')
  .use(posts)
  .use(config)
  .use(meta)
  .use(sitemap)
  .useRemarkPlugin(directive)
  .useRemarkPlugin(toc)
  .useRemarkPlugin(alert)
  .useRemarkPlugin(floatingImage)
  .useRemarkPlugin(iframe)
  .useRemarkPlugin(breaks)
  .useRemarkPlugin(footnotes, {inlineNotes: true})
  .source('./src/content')
  .destination('./build')
  .build();