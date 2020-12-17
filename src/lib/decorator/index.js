const visit = require('unist-util-visit');
const toString = require("mdast-util-to-string")

const dictionary = [{
  "matchers":["cloudflare"],
  "title": "is an American multinational technology company based in Seattle, Washington, which focuses on e-commerce, cloud computing, digital streaming, and artificial intelligence"
}, {
  "matchers":["google llc", "alphabet inc", "biggest search engine"],
  "link": "https://en.wikipedia.org/wiki/Google",
  "title": "is an American multinational technology company that specializes in Internet-related services and products"
}, {
  "matchers":["facebook"],
  "link": "https://en.wikipedia.org/wiki/Facebook",
}]

function decorator() {
  return transformer

  function transformer(tree, file) {
    const trie = getTrie(dictionary);
    visit(tree, 'paragraph', visitor)

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
console.log(trie)
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
          const linkText = nextPlaceInTrie.definition.link ? `<a class="dict-link" href="${nextPlaceInTrie.definition.link}">${linkVal}</a>` : linkVal;
          text = text.substring(0, streakTextIndex) + linkText + text.substring(end);
          currTextIndex += linkText.length - oldPart.length + 1;
          continue;
      }

      currTextIndex += currWord.length + 1;
  }

  if (originalText !== text) {
      const parentChildrenArray = node.children;
      const indexOfTextNodeInParent = parentChildrenArray.findIndex((n) => n.value === originalText);
      parentChildrenArray.splice(indexOfTextNodeInParent, 1, {
          type: 'html',
          value: text
      });
  }
}

export {
  decorator as default
}