import blogConfig from '../../../config.json';

function config(baseline) {
  for (const file in baseline.ctx) {
    const props = baseline.ctx[file];
    props.data.config = blogConfig;
  }
}

export { config as default }