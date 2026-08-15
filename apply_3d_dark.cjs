const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src', 'components');

function replaceInFile(fullPath) {
  let content = fs.readFileSync(fullPath, 'utf8');
  let originalContent = content;

  // Backgrounds
  content = content.replace(/bg-\[\#FEFFFC\]/g, 'bg-[#111111]/40 backdrop-blur-md');
  content = content.replace(/bg-\[\#111111\]/g, 'bg-[#FEFFFC]/10');
  
  // Text Colors
  content = content.replace(/text-\[\#111111\]/g, 'text-[#FEFFFC]');
  content = content.replace(/text-\[\#111111\]\/[0-9]+/g, 'text-[#FEFFFC]/70');
  
  // Borders
  content = content.replace(/border-\[\#111111\]/g, 'border-white/10');
  content = content.replace(/border-\[2px\]/g, 'border');
  content = content.replace(/border-\[3px\]/g, 'border');
  
  // Shadows (remove solid brutalist shadows inline)
  content = content.replace(/shadow-\[[^\]]+\]/g, 'shadow-xl');
  
  // Remove transition-none
  content = content.replace(/transition-none/g, '');

  if (content !== originalContent) {
    fs.writeFileSync(fullPath, content);
    console.log(`Updated 3D styles in ${fullPath}`);
  }
}

function walkAndReplace(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkAndReplace(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      replaceInFile(fullPath);
    }
  });
}

walkAndReplace(directoryPath);
