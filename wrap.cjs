const fs = require('fs');
const path = require('path');

const scenesDir = path.join(__dirname, 'src', 'scenes');
const files = fs.readdirSync(scenesDir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(scenesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Add LineReveal to imports if not present
  if (!content.includes('LineReveal')) {
    content = content.replace(/import {([^}]+)} from '\.\.\/components\/UI';/, "import { $1, LineReveal } from '../components/UI';");
  }

  // wrap headline
  content = content.replace(/(<h2[^>]*className="headline[^>]*>[\s\S]*?<\/h2>)/g, "<LineReveal delay={0}>\n$1\n</LineReveal>");

  // wrap sub
  content = content.replace(/(<p[^>]*className="sub[^>]*>[\s\S]*?<\/p>)/g, "<LineReveal delay={0.12}>\n$1\n</LineReveal>");
  content = content.replace(/(<div[^>]*className="sub[^>]*>[\s\S]*?<\/div>)/g, "<LineReveal delay={0.12}>\n$1\n</LineReveal>");

  fs.writeFileSync(filePath, content);
}

// Do the same for SectionPlaceholder in App.tsx
const appPath = path.join(__dirname, 'src', 'App.tsx');
let appContent = fs.readFileSync(appPath, 'utf8');
if (!appContent.includes('LineReveal')) {
  appContent = appContent.replace(/import { PillButton } from '\.\/components\/UI';/, "import { PillButton, LineReveal } from './components/UI';");
}
appContent = appContent.replace(/(<h2[^>]*className="headline[^>]*>[\s\S]*?<\/h2>)/g, "<LineReveal delay={0}>\n$1\n</LineReveal>");
fs.writeFileSync(appPath, appContent);

console.log('done');
