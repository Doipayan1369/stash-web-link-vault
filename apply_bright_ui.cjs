const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src', 'components');
const appTsxPath = path.join(__dirname, 'src', 'App.tsx');

function replaceInFile(fullPath) {
  let content = fs.readFileSync(fullPath, 'utf8');
  let originalContent = content;

  // Backgrounds
  content = content.replace(/bg-\[\#111111\]\/40 backdrop-blur-md/g, 'bg-[#FEFFFC]/95 backdrop-blur-md');
  content = content.replace(/bg-\[\#111111\]\/60 backdrop-blur-md/g, 'bg-[#FEFFFC]/95 backdrop-blur-md');
  content = content.replace(/bg-\[\#111111\]\/60/g, 'bg-[#FEFFFC]/95');
  content = content.replace(/bg-\[\#000000\]\/60 backdrop-blur-xl/g, 'bg-[#FEFFFC]/90 backdrop-blur-xl');
  content = content.replace(/bg-\[\#111111\]\/80/g, 'bg-[#FEFFFC]/90');
  content = content.replace(/bg-\[\#FEFFFC\]\/10/g, 'bg-[#111111]/5');
  
  // Text Colors
  content = content.replace(/text-\[\#FEFFFC\]/g, 'text-[#111111]');
  content = content.replace(/text-\[\#FEFFFC\]\/70/g, 'text-[#111111]/70');
  
  // Borders
  content = content.replace(/border-white\/10/g, 'border-[#111111]/10');
  
  if (content !== originalContent) {
    fs.writeFileSync(fullPath, content);
    console.log(`Updated bright styles in ${fullPath}`);
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
replaceInFile(appTsxPath);
