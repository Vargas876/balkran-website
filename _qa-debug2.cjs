const puppeteer = require('puppeteer-core');
const BASE = 'http://localhost:3999';
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
(async () => {
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  page.setViewport({ width: 1440, height: 900 });
  await page.goto(BASE + '/productos', { waitUntil: 'networkidle2' });
  await sleep(2500);
  const before = await page.evaluate(() => ({
    cookie: localStorage.getItem('balkran_cookie_consent'),
    hasAcepto: [...document.querySelectorAll('button')].some((b) => /cepto/i.test(b.textContent||'') && (b.textContent||'').trim().length < 15),
  }));
  console.log('ANTES en /productos:', before);
  const clicked = await page.evaluate(() => {
    const btn = [...document.querySelectorAll('button')].find((b) => /cepto/i.test(b.textContent || '') && (b.textContent || '').trim().length < 15);
    if (btn) btn.click();
    return !!btn;
  });
  await sleep(800);
  const after = await page.evaluate(() => localStorage.getItem('balkran_cookie_consent'));
  console.log('click found:', clicked, 'despues:', after);
  await page.goto(BASE + '/', { waitUntil: 'networkidle2' });
  await sleep(4000);
  const chat = await page.evaluate(() => !!document.querySelector('button[aria-label="Abrir chat Volt"]'));
  console.log('chat en /:', chat);
  await browser.close();
})();
