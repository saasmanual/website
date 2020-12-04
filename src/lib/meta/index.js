import { dirname } from 'path';

function meta(baseline) {
  for (const file in baseline.ctx) {
    const props = baseline.ctx[file];
    props.data.link = `/${dirname(file)}`;
  }
}

export { meta as default }