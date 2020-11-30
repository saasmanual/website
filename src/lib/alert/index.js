import visit from 'unist-util-visit';
import h from 'hastscript';

function alert() {
  return transform;

  function transform(tree) {
    visit(tree, ['containerDirective'], ondirective)
  }

  function ondirective(node) {
    const data = node.data || (node.data = {});
    const type = node.attributes.type || 'success';
    const hast = h('div', {
      className: `alert alert-${type}`
    })
 
    data.hName = hast.tagName
    data.hProperties = hast.properties
  }
}

export {
  alert as default
}