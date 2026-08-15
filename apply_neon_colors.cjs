const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src');

const replacements = {
  '#EAFDE6': '#FEFFFC',
  '#FFFFFF': '#FEFFFC',
  '#88C425': '#8116E0', // Plum Violet for hover/shadows
  '#BEF202': '#D0FF00', // Banana Yellow for primary buttons
  '#519548': '#8116E0',
  '#1B676B': '#000000', // Page background
};

function walkAndReplace(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkAndReplace(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.css')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;
      
      for (const [key, value] of Object.entries(replacements)) {
        const regex = new RegExp(key.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g');
        content = content.replace(regex, value);
      }
      
      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content);
        console.log(`Replaced colors in ${fullPath}`);
      }
    }
  });
}

walkAndReplace(directoryPath);
console.log('Color replacement complete.');
