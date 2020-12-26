import { table, getBorderCharacters } from 'table';
import chalk from 'chalk';

const TABLE_CONFIG = {
  border: getBorderCharacters(`norc`),
  drawHorizontalLine: (index, size) => {
    return index === 0 || index === 1 || index === size;
  }
};

function validateDescription(file, description) {
  const MIN_LENGTH = 55;
  const MAX_LENGTH = 300;
  
  if (!description) {
    return `${chalk.red('✘')} (Required)`;
  }
  
  if (description.length < MIN_LENGTH || description.length > MAX_LENGTH) {
    return `${chalk.red('✘')} (Between ${MIN_LENGTH} and ${MAX_LENGTH} chars.)`;
  }

  return chalk.green(`✔`);
}

async function seo(generator) {
  const data = [[chalk.bold('File'), chalk.bold('Description')]];

  for (const file in generator.ctx) {
    data.push([file, validateDescription(file, generator.ctx[file].data.description)]);
  }
  
  console.log(table(data, TABLE_CONFIG));

  return this;
}

export {
  seo as default
}