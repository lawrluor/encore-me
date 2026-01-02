const fs = require('fs');
const path = require('path');

const layoutPath = path.join(__dirname, '../app/layout.tsx');

let content = fs.readFileSync(layoutPath, 'utf8');

const scriptImportRegex = /import Script from ["']next\/script["'];?\n?/;
content = content.replace(scriptImportRegex, '');

const reactScanScriptRegex = /\s*<Script\s+src=["']https:\/\/unpkg\.com\/react-scan\/dist\/auto\.global\.js["']\s+strategy=["']afterInteractive["']\s+\/>\n?/;
content = content.replace(reactScanScriptRegex, '');

fs.writeFileSync(layoutPath, content, 'utf8');

console.log('✓ Removed react-scan script from production build');
