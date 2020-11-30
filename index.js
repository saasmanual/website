import { Generator } from '@saasmanual/generator';
import directive from 'remark-directive';
import breaks from 'remark-breaks';
import toc from './src/lib/toc';
import alert from './src/lib/alert';
import iframe from './src/lib/iframe';

(new Generator)
  .templates('./template')
  .useRemarkPlugin(directive)
  .useRemarkPlugin(toc)
  .useRemarkPlugin(alert)
  .useRemarkPlugin(breaks)
  .useRemarkPlugin(iframe)
  .source('./src/content')
  .destination('./build')
  .build();