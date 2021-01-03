
const { parseCommits, gitFormat } = require('./helper');
const { spawn } = require('child_process');


async function changelog(generator) {
  const source = spawn('git', ['log', gitFormat]);

  source.on('error', function (err) {
    console.log(`Something went wrong: ${err}`);
  });
  
  const commits = await parseCommits(source.stdout);

  for (const file in generator.ctx) {
    const props = generator.ctx[file];
    props.data.changelog = commits;
  }

  return this;
}

export {
  changelog as default
}