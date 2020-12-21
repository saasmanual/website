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
import decorator from './src/lib/decorator';
import embedImage from './src/lib/embed-image';

(new Generator)
  .templates('./src/template')
  .use(posts)
  .use(config)
  .use(meta)
  .use(sitemap)
  .useRemarkPlugin((ctx) => { return directive; })
  .useRemarkPlugin((ctx) => { return toc; })
  .useRemarkPlugin((ctx) => { return alert; })
  .useRemarkPlugin((ctx) => { return floatingImage; })
  .useRemarkPlugin((ctx) => { return iframe; })
  .useRemarkPlugin((ctx) => { return breaks; })
  .useRemarkPlugin((ctx) => { return embedImage; })
  .useRemarkPlugin((ctx) => { 
    return { 
      plugin: footnotes, 
      opts: {inlineNotes: true} 
    }
  })
  .useRemarkPlugin(decorator)
  .source('./src/content')
  .destination('./build')
  .build();

