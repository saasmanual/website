import { dirname } from 'path';
import visit from 'unist-util-visit';
import toString from 'mdast-util-to-string';

function createDictionary(ctx) {
  const dict = {};
  for (const file in ctx) {
    const type = file.split('/')[0];
    const data = ctx[file].data;

    data.keywords && data.keywords.split(',').forEach((keyword) => {
      keyword = keyword.trim().toLowerCase();
      if (!dict[keyword]) dict[keyword] = {};
      if (!dict[keyword][type]) dict[keyword][type] = [];
      dict[keyword][type].push({
        title: data.title,
        link: `/${dirname(file)}`
      });
    });
  }
  return dict;
}

function decorator(ctx) {
  return () => {
    const dict = createDictionary(ctx);

    return function transformer(tree, file) {
      visit(tree, 'text', visitor)
      function visitor(node) {
        addDictionaryDefinitions(node, dict);
      }
    }
  }
}

const addDictionaryDefinitions = (node, dict) => {
  const originalText = toString(node);
  const words = originalText.toLowerCase().split(' ');
  
  let currentIndex = 0;
  let text = originalText;
  for (let i = 0; i < words.length; i++) {
    const currWord = words[i];
    const match = dict[currWord];
    
    if (match) {
      const end = currentIndex + currWord.length;
      const oldPart = text.substring(currentIndex, end);
      const linkText = `<span class="border-pink-600 border-b-2 border-dotted cursor-default" x-data="tooltip('${encodeURIComponent(JSON.stringify(match))}')" @mouseenter="showTooltip($event, definition)" @mouseenter="showTooltip($event, definition)" @click="showTooltip($event, definition)">${oldPart}</span>`;
      text = text.substring(0, currentIndex) + linkText + text.substring(end);
      currentIndex += linkText.length - oldPart.length + 1;
      continue;
    }

    currentIndex += currWord.length + 1;
  }

  if (originalText !== text) {
    node.value = text;
    node.type = 'html';
  }
}

export {
  decorator as default
}