const visit = require('unist-util-visit');
const toString = require("mdast-util-to-string")

const dictionary = [{
  "matchers":["clsdsoudflare"],
  "title": "is an American multinational technology company based in Seattle, Washington, which focuses on e-commerce, cloud computing, digital streaming, and artificial intelligence"
}, {
  "matchers":["google llc", "alphabet inc", "biggest search engine"],
  "link": "https://en.wikipedia.org/wiki/Google",
  "title": "is an American multinational technology company that specializes in Internet-related services and products"
}, {
  "matchers":["facebook"],
  "link": "https://en.wikipedia.org/wiki/Facebook",
}, {
  "matchers": ["easily"],
  "link": "/articles",
}]

function decorator() {
  return transformer

  function transformer(tree, file) {
    const trie = getTrie(dictionary);
    visit(tree, 'text', visitor)

    function visitor(node) {
      addDictionaryDefinitions(node, trie);
    }
  }
}

const getTrie = (dictionary) => {
  const trie = {};

  dictionary.forEach(definition => {
      definition.matchers.forEach(matcher => {
          let trieMatcherNode = trie;
          const matcherWords = matcher.toLowerCase().split(' ');
          matcherWords.forEach(word => {
              trieMatcherNode[word] = trieMatcherNode[word] || {};
              trieMatcherNode = trieMatcherNode[word];
          });

          trieMatcherNode.definition = definition;
      });
  });
  return trie;
}

const addDictionaryDefinitions = (node, trie) => {
  // Grab the innerText of the paragraph node
  let text;
  let originalText = text = toString(node);
  
  const textSplittedToWords = text.toLowerCase().split(' ');

  let currPlaceInTrie = trie, streakTextIndex = null, currTextIndex = 0;
  for (let i = 0; i < textSplittedToWords.length; i++) {
      const currWord = textSplittedToWords[i];

      const nextPlaceInTrie = currPlaceInTrie[currWord];
      if (!nextPlaceInTrie) {
          streakTextIndex = null;
          currPlaceInTrie = trie;
      } else if (!nextPlaceInTrie.definition) {
          streakTextIndex = streakTextIndex || currTextIndex;
          currPlaceInTrie = nextPlaceInTrie;
      } else {
          streakTextIndex = streakTextIndex || currTextIndex;
          const end = currTextIndex + currWord.length;
          const oldPart = text.substring(streakTextIndex, end);
          const linkVal = nextPlaceInTrie.definition.title ? `<abbr title="${nextPlaceInTrie.definition.title}">${oldPart}</abbr>`: oldPart;
          let linkText = linkVal;
          if (nextPlaceInTrie.definition.link) {
            const tooltip = `    <div class="inline-block absolute bg-black text-white text-xs rounded py-1 px-4 left-0 -top-7 mb-7 shadow-sm tooltip-text">
            <a class="dict-link" href="${nextPlaceInTrie.definition.link}">${nextPlaceInTrie.definition.link}</a>
              <svg class="absolute text-black h-2 left-0 ml-3 top-full" x="0px" y="0px" viewBox="0 0 255 255" xml:space="preserve"><polygon class="fill-current" points="0,0 127.5,127.5 255,0"/></svg>
            </div>`;
            linkText = `<span class="relative border-dashed border-b-2 border-gray-400 tooltip">${tooltip}${linkVal}</span>`;
          }
          console.log(linkText)
          text = text.substring(0, streakTextIndex) + linkText + text.substring(end);
          currTextIndex += linkText.length - oldPart.length + 1;
          continue;
      }

      currTextIndex += currWord.length + 1;
  }

  if (originalText !== text) {
    console.log(node)
    node.value = text; 
    node.type = 'html';
    // console.log(originalText, text, node)
    //   const parentChildrenArray = node.children;
    //   const indexOfTextNodeInParent = parentChildrenArray.findIndex((n) => n.value === originalText);
    //   parentChildrenArray.splice(indexOfTextNodeInParent, 1, {
    //       type: 'html',
    //       value: text
    //   });
  }
}

export {
  decorator as default
}