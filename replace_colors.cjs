const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\Paulo\\Documents\\Outline_KnowTa\\knowta-deck\\src';

const replacements = {
  '#070A18': 'var(--black)',
  '#3556FF': 'var(--white)',
  '#1C2E8A': 'var(--gray-500)',
  '#2DD4BF': 'var(--color-human)',
  '#F5A524': 'var(--color-ai)',
  '#A78BFA': 'var(--color-conflict)'
};

function walk(directory) {
  const files = fs.readdirSync(directory);
  for (const file of files) {
    const fullPath = path.join(directory, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx') || fullPath.endsWith('.css')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;
      for (const [hex, token] of Object.entries(replacements)) {
        // Case insensitive replacement
        const regex = new RegExp(hex, 'gi');
        if (regex.test(content)) {
          content = content.replace(regex, token);
          changed = true;
        }
      }
      if (changed) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

walk(dir);
console.log('Replacement complete.');
