import visit from 'unist-util-visit';
import fromParse5 from 'hast-util-from-parse5';
import parse5 from 'parse5';
import nunjucks from 'nunjucks';
import { join } from 'path';
import tocItems from './toc.json';

function toc() {
  return transform;

  function transform(tree) {
    visit(tree, ['leafDirective'], ondirective)
  }

  function ondirective(node) {
    if (node.name !== 'toc' || node.type !== 'leafDirective') return;

    let data = node.data || (node.data = {})
    const renderedTemplate = nunjucks.render(join(__dirname, 'toc.njk'), {
      'items': tocItems
    });
    const p5ast = parse5.parseFragment(String(renderedTemplate), { sourceCodeLocationInfo: true })
    const hast = fromParse5(p5ast, renderedTemplate);
  
    data.hName = hast.tagName;
    data.hProperties = hast.properties;
    data.hChildren = hast.children;
  }
}

export {
  toc as default
}