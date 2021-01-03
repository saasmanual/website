import { parseCommits, gitFormat } from './helper';
import { spawn } from 'child_process';
import { writeFileSync, readFileSync } from 'fs';
import { join } from 'path';

async function changelog(generator) {
  const source = spawn('git', ['log', gitFormat]);

  source.on('error', function (err) {
    console.log(`Something went wrong: ${err}`);
  });

  let commits;
  if (process.env.NODE_ENV === 'production') {
    commits = JSON.parse(readFileSync(join(__dirname, 'commits.json'), 'utf-8'));
  } else {
    commits = await parseCommits(source.stdout);
    writeFileSync(join(__dirname, 'commits.json'), JSON.stringify(commits), 'utf-8');
  }


  for (const file in generator.ctx) {
    const props = generator.ctx[file];
    props.data.changelog = commits;
  }

  return this;
}

export {
  changelog as default
}