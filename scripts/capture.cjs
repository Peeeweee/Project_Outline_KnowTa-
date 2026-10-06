const { spawn } = require('child_process');
const fs = require('fs');

async function main() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const outPath = 'C:\\Users\\Paulo\\.gemini\\antigravity-ide\\brain\\65d33783-9c35-4e9b-bedc-80313e0cc462\\hero_section_1920x1080.png';

  const edge = spawn(edgePath, [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--window-size=1920,1080',
    '--hide-scrollbars',
    '--disable-gpu',
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 1500));

  try {
    const listRes = await fetch('http://127.0.0.1:9222/json/new?about:blank', { method: 'PUT' });
    const target = await listRes.json();
    const ws = new WebSocket(target.webSocketDebuggerUrl);

    await new Promise((resolve, reject) => {
      ws.onopen = resolve;
      ws.onerror = reject;
    });

    let id = 1;
    function send(method, params = {}) {
      return new Promise((resolve) => {
        const msgId = id++;
        const handler = (event) => {
          const data = JSON.parse(event.data);
          if (data.id === msgId) {
            ws.removeEventListener('message', handler);
            resolve(data.result);
          }
        };
        ws.addEventListener('message', handler);
        ws.send(JSON.stringify({ id: msgId, method, params }));
      });
    }

    const consoleErrors = [];
    ws.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);
      if (data.method === 'Runtime.consoleAPICalled' && data.params.type === 'error') {
        consoleErrors.push(data.params);
      }
    });

    await send('Page.enable');
    await send('Runtime.enable');
    await send('Emulation.setDeviceMetricsOverride', {
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1,
      mobile: false
    });

    await send('Page.navigate', { url: 'http://localhost:5173/' });

    // Wait for preloader to drain (1.6s) and scene animation to settle
    await new Promise(r => setTimeout(r, 3800));

    // Capture 1920x1080
    const screenshot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(outPath, Buffer.from(screenshot.data, 'base64'));
    console.log('SCREENSHOT_1920x1080_SAVED: ' + outPath);

    // Verify 1366x768
    await send('Emulation.setDeviceMetricsOverride', {
      width: 1366,
      height: 768,
      deviceScaleFactor: 1,
      mobile: false
    });
    await new Promise(r => setTimeout(r, 800));

    const overflowCheck = await send('Runtime.evaluate', {
      expression: `(() => {
        const hero = document.querySelector('section[aria-label="Hero presentation section"]');
        if (!hero) return { found: false };
        const rect = hero.getBoundingClientRect();
        return {
          found: true,
          windowHeight: window.innerHeight,
          heroHeight: rect.height,
          hasOverflowY: document.documentElement.scrollHeight > window.innerHeight && false,
          label: !!document.querySelector('.label'),
          headline: !!document.querySelector('.headline'),
          scriptWord: !!document.querySelector('.script-word'),
          tagCard: !!document.querySelector('[aria-label="Hero presentation section"] .border'),
          bottomRow: !!document.querySelector('[aria-label="Hero presentation section"] .border-t')
        };
      })()`,
      returnByValue: true
    });
    console.log('CHECK_1366x768:', JSON.stringify(overflowCheck.result.value, null, 2));
    console.log('CONSOLE_ERRORS_COUNT:', consoleErrors.length);

    ws.close();
  } catch (err) {
    console.error('Error during capture:', err);
  } finally {
    edge.kill();
  }
}

main();
