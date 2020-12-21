import visit from 'unist-util-visit';
import h from 'hastscript';

function embedImage() {
  return transform;

  function transform(tree) {
    visit(tree, ['leafDirective'], ondirective)
  }

  function ondirective(node) {
    if (node.name !== 'embed-image') return;

    var data = node.data || (node.data = {});
    var hast = h(node.name, node.attributes);

    data.hName = 'img';
    data.hProperties = hast.properties;
    data.hProperties.src = `/assets/img/posts${hast.properties.src}`;
    data.hProperties.className = 'shadow rounded';
  }
}

export {
  embedImage as default
}