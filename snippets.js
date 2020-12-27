import glob from 'glob';
import { readFileSync } from 'fs';

glob('src/**/*.js', (err, files) => {
  for (const file of files) {
    const content = readFileSync(file).toString();
    const tagRegex = /\[embed\:\s?([a-zA-Z-0-9]+)\]|\[\/embed\]/g;
    const snippets = {};
    const stack = [];
    
    let match;
    while ((match = tagRegex.exec(content))) {
      if (match[1]) {
        stack.push({
          start: match.index,
          id: match[1],
          file
        });
      } else {
        const item = stack.pop();
        
        const innerContent = content.substr(item.start, match.index - item.start) + match[0];
        const lines = innerContent.split("\n");
        
        item.content = lines.splice(1, lines.length - 2).join("\n")
        
        snippets[item.id] = item;
      }
    }

    console.log(snippets);
  }
});