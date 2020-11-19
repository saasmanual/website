import { Generator } from '@saasmanual/generator';

(new Generator)
  .templates('./template')
  .source('./src/content')
  .destination('./build')
  .build();