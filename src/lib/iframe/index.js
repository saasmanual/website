import visit from 'unist-util-visit';
import h from 'hastscript';

function iframe() {
  return transform;

  function transform(tree) {
    visit(tree, ['textDirective'], ondirective)
  }

  function ondirective(node) {
    if (node.name !== 'iframe') return;

    const data = node.data || (node.data = {});
    const hast = h('iframe', {
      src: node.attributes.src,
      width: node.attributes.width || '100%',
      height: node.attributes.height || '250'
    })
    data.hName = hast.tagName
    data.hProperties = hast.properties
  }
}

export {
  iframe as default
}