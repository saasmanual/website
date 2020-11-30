import visit from 'unist-util-visit';
import h from 'hastscript';
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
    let hast;
    let data = node.data || (node.data = {})
    if (node.type === 'leafDirective' && node.name === 'toc') {
      const renderedTemplate = nunjucks.render(join(__dirname, 'toc.njk'), {
        'items': tocItems
      });
      const p5ast = parse5.parseFragment(String(renderedTemplate), { sourceCodeLocationInfo: true })
      hast = fromParse5(p5ast, renderedTemplate);
    } else {
      hast = h(node.name, node.attributes)
    }

    data.hName = hast.tagName;
    data.hProperties = hast.properties;
    data.hChildren = hast.children;
  }
}

export {
  toc as default
}