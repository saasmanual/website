import { Generator } from '@saasmanual/generator';
import directive from 'remark-directive';
import breaks from 'remark-breaks';
import visit from 'unist-util-visit';
import h from 'hastscript';

const toc = [{
  name: 'Hi'
}, {
  name: 'There'
}];

const template = ``

function htmlDirectives() {
  return transform

  function transform(tree) {
    visit(tree, ['textDirective', 'leafDirective', 'containerDirective'], ondirective)
  }

  function ondirective(node) {
    let data = node.data || (node.data = {})
    let hast;
    if (node.type === 'leafDirective' && node.name === 'toc') {
      hast = h('ul', {
        className: 'grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
      }, toc.map((item) => {
        return h('li', {
          className: 'col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200'
        }, item.name);
      }));
    } else {
      hast = h(node.name, node.attributes)
    }
    
    data.hName = hast.tagName;
    data.hProperties = hast.properties;
    data.hChildren = hast.children;
  }
}

(new Generator)
  .templates('./template')
  .useRemarkPlugin(directive)
  .useRemarkPlugin(htmlDirectives)
  .useRemarkPlugin(breaks)
  .source('./src/content')
  .destination('./build')
  .build();