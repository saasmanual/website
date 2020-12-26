import debug from 'debug';

const log = debug('markdown-seo');

function validateDescription(file, description) {
  const MIN_LENGTH = 55;
  const MAX_LENGTH = 300;
  
  if (!description) {
    log('Please provide a description for:', file);
    return;
  }
  
  if (description.length < MIN_LENGTH || description.length > MAX_LENGTH) {
    log(`Please provide a description between ${MIN_LENGTH} and ${MAX_LENGTH} characters:`, file)
    return;
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