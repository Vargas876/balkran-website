const puppeteer = require('puppeteer-core');
const BASE = 'http://localhost:3999';
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
(async () => {
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  page.setViewport({ width: 1440, height: 900 });
  await page.goto(BASE + '/productos', { waitUntil: 'networkidle2', timeout: 30000 }).catch(async () => { await page.goto(BASE + '/productos', { waitUntil: 'domcontentloaded' }).catch(() => {}); });
  await sleep(4000);
  const pag = await page.evaluate(() => {
    const btns = [...document.querySelectorAll('button')].map((b) => ({ txt: (b.textContent || '').trim(), title: b.title })).filter((b) => b.title || /Siguiente|Anterior|›|‹/.test(b.txt));
    return btns.slice(0, 8);
  });
  console.log('PAGINACION:', JSON.stringify(pag, null, 1));
  // accept cookies
  await page.evaluate(() => { const btn = [...document.querySelectorAll('button')].find((b) => /cepto/i.test(b.textContent || '') && (b.textContent || '').trim().length < 15); if (btn) btn.click(); });
  await sleep(1000);
  await page.goto(BASE + '/', { waitUntil: 'networkidle2', timeout: 30000 }).catch(() => {});
  await sleep(2000);
  const chat = await page.evaluate(() => {
    const labels = [...document.querySelectorAll('[aria-label]')].map((e) => e.getAttribute('aria-label'));
    const volt = [...document.querySelectorAll('*')].filter((e) => (e.textContent || '').includes('Volt') && e.children.length === 0).slice(0, 5).map((e) => e.textContent.trim().slice(0, 40));
    return { labels: labels.slice(0, 20), volt };
  });
  console.log('CHAT labels:', JSON.stringify(chat.labels, null, 1));
  console.log('CHAT volt text:', JSON.stringify(chat.volt, null, 1));
  await browser.close();
})();
