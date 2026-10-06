const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const mediaDir = path.join(process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + '/Library/Preferences' : process.env.HOME + '/.local/share'), '../.gemini/antigravity-ide/brain', process.env.CONVERSATION_ID || '65d33783-9c35-4e9b-bedc-80313e0cc462', '.tempmediaStorage');
if (!fs.existsSync(mediaDir)) fs.mkdirSync(mediaDir, { recursive: true });

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  
  await page.goto('http://localhost:5173');
  
  // Wait for load
  await page.waitForTimeout(2000); // Wait for preloader

  // Press ArrowDown to S06 Hero (Index 5)
  for(let i=0; i<5; i++) {
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(500);
  }
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(mediaDir, 'media_' + Date.now() + '.png') });
  
  // S07 Idea (Index 6)
  await page.keyboard.press('ArrowDown');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(mediaDir, 'media_' + Date.now() + '.png') });

  // S13 Verdict (Index 12)
  for(let i=0; i<6; i++) {
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(500);
  }
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(mediaDir, 'media_' + Date.now() + '.png') });

  await browser.close();
})();
