import { dirname } from 'path';
import blogConfig from '../../../config.json';

function meta(baseline) {
  for (const file in baseline.ctx) {
    const props = baseline.ctx[file];
    const dir = dirname(file);
    props.data.link = `${blogConfig.url}${dir === '.' ? '/' : `/${dir}`}`;
  }
}

export { meta as default }