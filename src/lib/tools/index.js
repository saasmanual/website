import excerptAst from 'mdast-excerpt';
import readingTime from 'reading-time';
import { dirname } from 'path';
import remark from 'remark';
import html from 'remark-html';
import blogConfig from '../../../config.json';

function formatDate(date) {
  return new Date(date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

async function tools(generator) {
  let tools = [];
  const asExcerpt = options => node => excerptAst(node, options || {});

  for (const file in generator.ctx) {
    const props = generator.ctx[file];
    const parts = file.split('/');
    
    if (parts[0] !== 'tools') continue;

    tools.push({
      title: props.data.title,
      readingTime: readingTime(props.content).text,
      link: `/${dirname(file)}`,
      excerpt: remark()
        .use(asExcerpt, { omission: "...", pruneLength: 240 })
        .use(html)
        .processSync(props.data.excerpt || props.content)
    });
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