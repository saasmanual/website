// [embed:markdown-plugin-embed-image-js]
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

    /*
     * The following line is not required for the plugin to work.
     * It is required for the SaaS Manual embedding feature.
     * Please remove this line if you just want to use the plugin.
     */ 
    hast.properties['data-attr-embed'] = 'markdown-plugin-embed-image-html';

    data.hName = 'img';
    data.hProperties = hast.properties;
    data.hProperties.src = `/assets/img/posts${hast.properties.src}`;
    data.hProperties.className = hast.properties.className || 'shadow rounded';
  }
}

export {
  embedImage as default
}
// [/embed]