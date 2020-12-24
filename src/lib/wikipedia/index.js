import visit from 'unist-util-visit';
import h from 'hastscript';
import fetch from 'node-fetch';
import { split } from "sentence-splitter";

const WIKIPEDIA_URL = `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&inprop=url&pageids=`;

async function getWikipediaContent(node) {
  const id = node.attributes.id;

  const response = await fetch(`${WIKIPEDIA_URL}${id}`);
  const json = await response.json();

  const { extract, title } = json.query.pages[id];
  const excerpt = split(extract)[0].raw;

  const data = node.data || (node.data = {});

  const hast = h('div', {
    className: ``
  }, [
    h('h3', 'From Wikipedia'),
    {
      type: 'text',
      value: excerpt
    },
    {
      type: 'text',
      value: ' '
    },
    {
      type: 'element',
      tagName: 'small',
      children: [{
        type: 'element',
        tagName: 'a',
        properties: {
          href: `https://en.wikipedia.org/wiki/${title}`
        },
        children: [{
          type: 'text',
          value: 'Read more in Wikipedia'
        }]
      }]
    }
  ]);

  data.hName = hast.tagName
  data.hProperties = hast.properties
  data.hChildren = hast.children;
}



function wikipedia() {
  return transform;

  async function transform(tree) {
    const promises = [];

    function ondirective(node) {
      if (node.name !== 'wikipedia') return;
      promises.push(getWikipediaContent(node));
    }

    visit(tree, ['leafDirective'], ondirective);

    await Promise.all(promises);
  }
}

export {
  wikipedia as default
}