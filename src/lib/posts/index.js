import excerptAst from 'mdast-excerpt';
import readingTime from 'reading-time';
import {join, basename, dirname} from 'path';
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

async function posts(generator) {
  let posts = [];
  const asExcerpt = options => node => excerptAst(node, options || {});

  for (const file in generator.ctx) {
    const props = generator.ctx[file]; 
    if (props.data.layout !== 'post.njk') continue;
    
    posts.push({
      title: props.data.title,
      cover: props.data.cover,
      date: formatDate(props.data.date),
      readingTime: readingTime(props.content).text,
      author: blogConfig.authors[props.data.author],
      link: `/${dirname(file)}`,
      excerpt: remark()
        .use(asExcerpt, { omission: "...", pruneLength: 240 })
        .use(html)
        .processSync(props.data.excerpt || props.content)
    });
  }

  posts = posts.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  })

  for (const file in generator.ctx) {
    const props = generator.ctx[file];
    props.data.posts = posts;
  }

  return this;
}

export {
  posts as default
}