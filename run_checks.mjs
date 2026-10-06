import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const outDir = 'C:/Users/Paulo/.gemini/antigravity-ide/brain/65d33783-9c35-4e9b-bedc-80313e0cc462/';

(async () => {
  console.log("Starting playwright...");
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('http://localhost:5173');
  // Skip preloader
  await page.keyboard.press('Escape');
  await page.waitForTimeout(2000); 

  console.log("Taking 1920x1080 screenshots...");
  await page.setViewportSize({ width: 1920, height: 1080 });
  
  // Hero section is the first one (index 0).
  await page.screenshot({ path: path.join(outDir, 'hero_1920x1080.png') });
  
  // Find DATA section (index 6)
  await page.evaluate(() => document.querySelectorAll('section')[6].scrollIntoView());
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(outDir, 'data_1920x1080.png') });
  
  // Find VERDICT section (index 8)
  await page.evaluate(() => document.querySelectorAll('section')[8].scrollIntoView());
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(outDir, 'verdict_1920x1080.png') });

  // Let's do some checks:
  const sections = await page.$$('section');
  console.log(`Found ${sections.length} sections`);

  // Check labels
  const textContent = await page.evaluate(() => document.body.innerText);
  if (!textContent.includes("ILLUSTRATION")) {
    console.log("MISSING: ILLUSTRATION label not found globally.");
  }
  if (!textContent.includes("DEMO OUTPUT")) {
    console.log("MISSING: DEMO OUTPUT label not found globally.");
  }
  
  await browser.close();
  console.log("Done");
})();
