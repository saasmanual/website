const propertyDelimiter = '@part@';
const commitDelimiter = '@commit-delimiter@';
const RE_SUBJECT = /^\((feat|fix|chore)\:\s?(.+)\)\s?(.+)/
const formats = [{
  placeholder: '%h',
  property: 'sha'
}, {
  placeholder: '%an',
  property: 'authorName'
}, {
  placeholder: '%ae',
  property: 'authorEmail'
}, {
  placeholder: '%cd',
  property: 'dateTime'
}, {
  placeholder: '%s',
  property: 'subject',
  formatter: (line) => { 
    const match = RE_SUBJECT.exec(line);
    
    if (!match) return;

    return {
      type: match[1],
      module: match[2],
      title: match[3]
    }
  }
}, {
  placeholder: '%b',
  property: 'body'
}];

const gitFormat = `--format=${formats.map(item => item.placeholder).join(propertyDelimiter)}${commitDelimiter}`;

async function* chunksToCommits(chunks) {
  let previous = '';
  for await (const chunk of chunks) {
    previous += chunk;
    let eolIndex;
    while ((eolIndex = previous.indexOf(commitDelimiter)) >= 0) {
      const line = previous.slice(0, eolIndex + commitDelimiter.length);
      yield line;
      previous = previous.slice(eolIndex + commitDelimiter.length);
    }
  }
  if (previous.length > 0) {
    yield previous;
  }
}

const RE_COMMIT = new RegExp(`${commitDelimiter}`);
function cleanCommit(commit) {
  const matchCommit = RE_COMMIT.exec(commit);
  if (matchCommit) commit = commit.slice(0, matchCommit.index);
  return commit.trim();
}

async function parseCommits(readable) {
  const commits = [];
  for await (const commit of chunksToCommits(readable)) {
    const cleanedCommit = cleanCommit(commit);
    const parts = cleanedCommit.split(propertyDelimiter);

    commits.push(formats.reduce((commit, format, index) => {
      commit[format.property] = format.formatter ? format.formatter(parts[index]) : parts[index];

      // I prefer to have this outside of the reduce call.
      // But for now this works so I will leave it here.
      if (format.property === 'sha') {
        commit.gitHubCommitUrl = `https://github.com/saasmanual/website/commit/${parts[index]}`;
      }

      return commit;
    }, {}));
  }
  return commits;
}

export {
  cleanCommit,
  chunksToCommits,
  parseCommits,
  gitFormat
}