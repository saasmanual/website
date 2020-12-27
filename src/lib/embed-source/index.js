import h from 'hastscript';
import visit from 'unist-util-visit';
import glob from 'glob';
import debug from 'debug';
import Prism from 'prismjs';
import fromParse5 from 'hast-util-from-parse5';
import parse5 from 'parse5';
import tmp from 'tmp';
import { readFileSync } from 'fs';
import{ execSync } from 'child_process';

const log = debug('generator:embed-source');

const CLONED_REPOS = {
  default: {
    id: 'default',
    dir: './'
  }
}

if (process.env.NODE_ENV === 'development') {
  CLONED_REPOS['https://github.com/saasmanual/shared-infrastructure'] = {
    id: 'https://github.com/saasmanual/shared-infrastructure',
    dir: '../shared-infrastructure'
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
        stack.push({
          start: match.index,
          id: match[1],
          file
        });
      } else {
        const item = stack.pop();

        const innerContent = content.substr(item.start, match.index - item.start) + match[0];
        const lines = innerContent.split("\n");

        item.content = lines.splice(1, lines.length - 2).join("\n")

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
  
  execSync(`git clone ${repo}`, {
    stdio: [0, 1, 2],
    cwd: tmpDir.name
  });

  return CLONED_REPOS[repo] = {
    id: repo,
    dir: tmpDir.name
  }
}

function embed(node, snippets) {
  return async function() {
    const repo = await cloneRepo(node.attributes.repo);
    const data = node.data || (node.data = {});
  
    if (!snippets[repo.id]) {
      snippets[repo.id] = await getSnippets(repo);
    }
  
    if (!snippets[repo.id][node.attributes.id]) {
      log(`No snipped with id '${node.attributes.id}' found.`);
      return;
    }
  
    const code = Prism.highlight(snippets[repo.id][node.attributes.id].content, Prism.languages.javascript, 'javascript');
    const p5ast = parse5.parseFragment(String(code), { sourceCodeLocationInfo: true })
    const hast = h('pre', {
      className: ``
    });
  
    data.hName = hast.tagName
    data.hProperties = hast.properties
    data.hChildren = fromParse5(p5ast, code).children;
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

    for(const func of promises) {
      await func(this);
    }
  }

  return transform;
}

export {
  embedSource as default
}