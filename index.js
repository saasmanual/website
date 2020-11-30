import { Generator } from '@saasmanual/generator';
import directive from 'remark-directive';
import breaks from 'remark-breaks';
import toc from './src/lib/toc';

(new Generator)
  .templates('./template')
  .useRemarkPlugin(directive)
  .useRemarkPlugin(toc)
  .useRemarkPlugin(breaks)
  .source('./src/content')
  .destination('./build')
  .build();