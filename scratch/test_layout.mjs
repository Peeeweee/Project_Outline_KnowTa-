import { spawn } from 'child_process';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const TARGET_URL = 'http://localhost:5173/';

async function main() {
  const chrome = spawn(CHROME_PATH, [
    '--headless=new',
    '--remote-debugging-port=9223',
    '--window-size=1920,1080',
    '--hide-scrollbars',
    '--disable-background-networking',
    '--user-data-dir=' + path.join(process.cwd(), '.chrome-temp-test'),
  ]);

  let wsUrl = null;
  for (let i = 0; i < 30; i++) {
    await new Promise((r) => setTimeout(r, 200));
    try {
      const res = await fetch('http://127.0.0.1:9223/json/version');
      const data = await res.json();
      wsUrl = data.webSocketDebuggerUrl;
      if (wsUrl) break;
    } catch {}
  }

  if (!wsUrl) {
    chrome.kill();
    process.exit(1);
  }

  const newTabRes = await fetch('http://127.0.0.1:9223/json/new?' + encodeURIComponent(TARGET_URL), { method: 'PUT' });
  const tabData = await newTabRes.json();
  const tabWsUrl = tabData.webSocketDebuggerUrl;

  const ws = new WebSocket(tabWsUrl);
  let id = 1;
  const pending = new Map();

  function send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const msgId = id++;
      pending.set(msgId, { resolve, reject });
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      if (msg.error) reject(msg.error);
      else resolve(msg.result);
    }
  };

  await new Promise((resolve) => {
    ws.onopen = resolve;
  });

  await send('Page.enable');
  await send('Runtime.enable');
  await send('Page.addScriptToEvaluateOnNewDocument', {
    source: `sessionStorage.setItem('knowta_hero_preloaded', 'true');`,
  });
  // Wait until React mounts scenes
  for (let i = 0; i < 20; i++) {
    await new Promise((r) => setTimeout(r, 300));
    const checkMount = await send('Runtime.evaluate', {
      expression: `document.querySelectorAll('[data-scene]').length`,
    });
    if (checkMount.result?.value > 0) {
      console.log(`React mounted with ${checkMount.result.value} scenes.`);
      break;
    }
  }

  async function checkScene(slug, width, height) {
    await send('Emulation.setDeviceMetricsOverride', {
      width,
      height,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await new Promise((r) => setTimeout(r, 500));

    const res = await send('Runtime.evaluate', {
      returnByValue: true,
      expression: `
        (() => {
          const wrapper = document.querySelector('[data-scene="${slug}"]');
          if (wrapper) window.scrollTo(0, wrapper.offsetTop);
          const section = wrapper ? wrapper.querySelector('section') : null;
          return {
            slug: "${slug}",
            resolution: "${width}x${height}",
            windowHeight: window.innerHeight,
            sectionScrollHeight: section ? section.scrollHeight : null,
            sectionClientHeight: section ? section.clientHeight : null,
            overflow: section ? section.scrollHeight > section.clientHeight : null,
          };
        })()
      `,
    });
    return res.result?.value;
  }

  const allSlugs = await send('Runtime.evaluate', {
    returnByValue: true,
    expression: `
      Array.from(document.querySelectorAll('[data-scene]')).map(el => el.getAttribute('data-scene'))
    `,
  });
  console.log('All slugs found:', allSlugs.result?.value);

  ws.close();
  chrome.kill();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
