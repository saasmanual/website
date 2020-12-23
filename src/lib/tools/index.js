import { dirname } from 'path';

async function tools(generator) {
  let tools = [];

  for (const file in generator.ctx) {
    const props = generator.ctx[file];
    const parts = file.split('/');
    
    if (parts[0] !== 'tools') continue;
    if (parts[1] === 'index.md') continue;

    tools.push(Object.assign({
      link: `/${dirname(file)}`
    }, props.data));
  }

  tools = tools.sort((a, b) => {
    return b.title - a.title;
  })

  for (const file in generator.ctx) {
    const props = generator.ctx[file];
    props.data.tools = tools;
  }

  return this;
}

export {
  tools as default
}