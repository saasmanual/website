import h from 'hastscript';
import visit from 'unist-util-visit';
import glob from 'glob';
import debug from 'debug';
import Prism from 'prismjs';
import fromParse5 from 'hast-util-from-parse5';
import parse5 from 'parse5';
import tmp from 'tmp';
import { readFileSync } from 'fs';
import { execSync } from 'child_process';
import { relative, join } from 'path'

const log = debug('generator:embed-source');

const CODE_SVG = `<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="code" class="inline w-4 h-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M234.8 511.7L196 500.4c-4.2-1.2-6.7-5.7-5.5-9.9L331.3 5.8c1.2-4.2 5.7-6.7 9.9-5.5L380 11.6c4.2 1.2 6.7 5.7 5.5 9.9L244.7 506.2c-1.2 4.3-5.6 6.7-9.9 5.5zm-83.2-121.1l27.2-29c3.1-3.3 2.8-8.5-.5-11.5L72.2 256l106.1-94.1c3.4-3 3.6-8.2.5-11.5l-27.2-29c-3-3.2-8.1-3.4-11.3-.4L2.5 250.2c-3.4 3.2-3.4 8.5 0 11.7L140.3 391c3.2 3 8.2 2.8 11.3-.4zm284.1.4l137.7-129.1c3.4-3.2 3.4-8.5 0-11.7L435.7 121c-3.2-3-8.3-2.9-11.3.4l-27.2 29c-3.1 3.3-2.8 8.5.5 11.5L503.8 256l-106.1 94.1c-3.4 3-3.6 8.2-.5 11.5l27.2 29c3.1 3.2 8.1 3.4 11.3.4z"></path></svg>`;
const CLONED_REPOS = {
  default: {
    id: 'default',
    dir: './',
    url: 'https://github.com/saasmanual/website/tree/main/'
  }
}

if (process.env.NODE_ENV === 'devselopment') {
  CLONED_REPOS['https://github.com/saasmanual/shared-infrastructure'] = {
    id: 'https://github.com/saasmanual/shared-infrastructure',
    dir: '../shared-infrastructure',
    url: 'https://github.com/saasmanual/shared-infrastructure/tree/main/'
  }
}

async function getSnippets(repo) {
  const files = glob.sync(`${repo.dir}/!(node_modules)/**/*.js`);
  const snippets = {};

  for (const file of files) {
    const content = readFileSync(file).toString();
    const tagRegex = /\[embed\:\s?([a-zA-Z-0-9]+)\]|\[\/embed\]/g;
    const stack = [];
    
    let match;
    while ((match = tagRegex.exec(content))) {
      if (match[1]) {
        console.log(repo.dir, file)
        stack.push({
          start: match.index,
          id: match[1],
          file: relative(repo.dir, file),
          lineStart: content.substr(0, match.index).split('\n').length
        });
      } else {
        const item = stack.pop();

        const innerContent = content.substr(item.start, match.index - item.start) + match[0];
        const lines = innerContent.split("\n");

        item.content = lines.splice(1, lines.length - 2).join("\n")
        item.lineEnd = content.substr(0, match.index).split('\n').length

        snippets[item.id] = item;
      }
    }
  }

  return snippets;
}

async function cloneRepo(repo) {
  if (!repo) return CLONED_REPOS.default;
  if (CLONED_REPOS[repo]) return CLONED_REPOS[repo];

  const tmpDir = tmp.dirSync();
  const name = repo.split('/').pop();

  execSync(`git clone ${repo}`, {
    stdio: [0, 1, 2],
    cwd: tmpDir.name
  });

  return CLONED_REPOS[repo] = {
    id: repo,
    dir: `${tmpDir.name}/${name}`,
    url: `${repo}/tree/main/`
  }
}

function embed(node, snippets) {
  return async function () {
    const repo = await cloneRepo(node.attributes.repo);
    const data = node.data || (node.data = {});

    if (!snippets[repo.id]) {
      snippets[repo.id] = await getSnippets(repo);
    }

    const match = snippets[repo.id][node.attributes.id];
    if (!match) {
      log(`No snipped with id '${node.attributes.id}' found.`);
      return;
    }
    console.log(match.file)
    const lines = `#${match.lineStart && `L${match.lineStart}`}${match.lineEnd && `-L${match.lineEnd}`}`
    const repoLink = `${repo.url}${match.file}${lines}`;
    const code = `<div class="flex justify-end"><small><a href="${repoLink}" target="_blank">${CODE_SVG} View Code</a></small></div><pre class="mt-1">${Prism.highlight(match.content, Prism.languages.javascript, 'javascript')}</pre>`;

    const p5ast = parse5.parseFragment(String(code), { sourceCodeLocationInfo: true })
    const hast = h('div', {
      className: ``
    }, fromParse5(p5ast, code).children);

    data.hName = hast.tagName
    data.hProperties = hast.properties
    data.hChildren = hast.children;
  }
}

function embedSource() {
  const snippets = {};

  async function transform(tree) {
    const promises = [];

    function ondirective(node) {
      if (node.name !== 'embed-source') return;
      promises.push(embed(node, snippets));
    }

    visit(tree, ['leafDirective'], ondirective);

    for (const func of promises) {
      await func(this);
    }
  }

  return transform;
}

export {
  embedSource as default
}