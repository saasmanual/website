import debug from 'debug';

const log = debug('markdown-seo');

function validateDescription(file, description) {
  if (!description) log('Please provide a description for:', file);
  else if (description.length < 55 || description.length > 300) {
    log('Please provide a description between 55 and 300 characters:', file)
  }
}

async function seo(generator) {
  for (const file in generator.ctx) {
    validateDescription(file, generator.ctx[file].data.description);
  }
  return this;
}

export {
  seo as default
}