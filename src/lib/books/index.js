import { dirname } from 'path';

async function books(generator) {
  let books = [];

  for (const file in generator.ctx) {
    const props = generator.ctx[file];
    const parts = file.split('/');
    
    if (parts[0] !== 'books') continue;
    if (parts[1] === 'index.md') continue;

    const topics = props.data.topics ? props.data.topics.split(',').map((str) => { return str.trim(); }) : [];

    props.data.topics = topics;

    books.push(Object.assign({
      link: `/${dirname(file)}`
    }, props.data, {
      topics
    }));
  }

  books = books.sort((a, b) => {
    return b.title - a.title;
  })

  for (const file in generator.ctx) {
    const props = generator.ctx[file];
    props.data.books = books;
  }

  return this;
}

export {
  books as default
}