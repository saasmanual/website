import { Generator } from '@saasmanual/generator';
import directive from 'remark-directive';
import breaks from 'remark-breaks';
import toc from './src/lib/toc';
import alert from './src/lib/alert';
import iframe from './src/lib/iframe';
import floatingImage from './src/lib/floating-image';
import footnotes from 'remark-footnotes';
import posts from './src/lib/posts';
import tools from './src/lib/tools';
import books from './src/lib/books';
import config from './src/lib/config';
import meta from './src/lib/meta';
import sitemap from './src/lib/sitemap';
import decorator from './src/lib/decorator';
import wikipedia from './src/lib/wikipedia';
import embedImage from './src/lib/embed-image';
import seo from './src/lib/seo';
import embedSource from './src/lib/embed-source';
import changelog from './src/lib/changelog';

(new Generator)
  .templates('./src/template')
  .use(posts)
  .use(tools)
  .use(books)
  .use(config)
  .use(meta)
  .use(sitemap)
  .use(changelog)
  .use(seo)
  .useRemarkPlugin((ctx) => { return directive; })
  .useRemarkPlugin((ctx) => { return toc; })
  .useRemarkPlugin((ctx) => { return alert; })
  .useRemarkPlugin((ctx) => { return floatingImage; })
  .useRemarkPlugin((ctx) => { return iframe; })
  .useRemarkPlugin((ctx) => { return breaks; })
  .useRemarkPlugin((ctx) => { return wikipedia; })
  .useRemarkPlugin((ctx) => { return embedImage; }) 
  .useRemarkPlugin((ctx) => { return embedSource; }) 
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

