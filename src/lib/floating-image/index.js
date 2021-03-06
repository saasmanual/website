import visit from 'unist-util-visit';
import h from 'hastscript';
import toHast from 'mdast-util-to-hast';

function floatingImage() {
  return transform;

  function transform(tree) {
    visit(tree, ['containerDirective'], ondirective)
  }

  function ondirective(node) {
    if (node.name !== 'floating-image') return;

    const data = node.data || (node.data = {});
    const hast = h('div', {
      className: ``
    }, [
      
    ]);

    const hChildren = [h('img', {
      src: node.attributes.image,
      width: node.attributes.width || 100,
      height: node.attributes.height || 100,
      className: 'sm:float-left sm:mr-8 mb-8',
      alt: node.attributes.alt || 'Floating Image',
    })];

    node.children.forEach((child) => {
      hChildren.push(toHast(child));
    })
 
    data.hName = hast.tagName
    data.hProperties = hast.properties
    data.hChildren = hChildren;
  }
}

export {
  floatingImage as default
}