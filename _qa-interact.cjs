const puppeteer = require('puppeteer-core');
const BASE = 'http://localhost:3999';
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const results = [];
function rec(name, ok, extra = '') {
  results.push({ name, ok, extra });
  console.log(`${ok ? 'PASS' : 'FAIL'} | ${name}${extra ? ' | ' + extra : ''}`);
}

(async () => {
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox', '--disable-gpu'] });
  const page = await browser.newPage();
  page.setViewport({ width: 1440, height: 900 });

  // ---- HOME ----
  await page.goto(BASE + '/', { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(2500);

  // Título y contenido
  const h1 = await page.evaluate(() => document.querySelector('h1')?.textContent?.trim() ?? '');
  rec('Home H1 presente', h1.length > 0, h1.slice(0, 60));

  // Imágenes reales (naturalWidth > 0)
  const imgInfo = await page.evaluate(() => {
    const imgs = [...document.querySelectorAll('img')];
    const broken = imgs.filter((i) => i.complete && i.naturalWidth === 0);
    const missingAlt = imgs.filter((i) => !(i.getAttribute('alt') !== null));
    return { total: imgs.length, broken: broken.map((i) => i.getAttribute('src')) };
  });
  rec(`Imágenes cargadas (${imgInfo.total})`, imgInfo.broken.length === 0, imgInfo.broken.length ? imgInfo.broken.slice(0, 3).join(', ') : 'todas ok');

  // CTA hero → productos (primer link "Ver productos" o similar)
  const heroCta = await page.evaluate(() => {
    const a = [...document.querySelectorAll('a')].find((x) => /ver productos|explorar|productos/i.test(x.textContent ?? ''));
    return a ? a.getAttribute('href') : null;
  });
  if (heroCta) {
    await page.evaluate((href) => document.querySelector(`a[href="${href}"]`)?.click(), heroCta);
    await sleep(2000);
    rec('CTA Hero navega', page.url().includes('/productos'), heroCta);
  } else {
    rec('CTA Hero encontrado', false, 'no se halló');
  }

  // NAVBAR: click cada link de menú (por href, esperando navegación)
  await page.goto(BASE + '/', { waitUntil: 'networkidle2' });
  await sleep(3000);
  for (const [label, target] of [['Productos', '/productos'], ['Nosotros', '/nosotros'], ['Contacto', '/contacto']]) {
    try {
      const href = target;
      const navPromise = page.waitForNavigation({ timeout: 15000 }).catch(() => {});
      await page.evaluate((h) => {
        const a = [...document.querySelectorAll('header a')].find((x) => x.getAttribute('href') === h);
        if (a) a.click();
      }, href);
      await navPromise;
      await sleep(1200);
      rec(`Navbar "${label}"`, page.url().includes(target), page.url().slice(0, 45));
    } catch (e) {
      rec(`Navbar "${label}"`, false, 'ERROR ' + e.message.slice(0, 50));
    }
  }

  // Dropdown "Ayuda" → FAQ
  await page.goto(BASE + '/', { waitUntil: 'networkidle2' });
  await sleep(1200);
  const faqLink = await page.evaluate(() => {
    const a = [...document.querySelectorAll('a')].find((x) => x.getAttribute('href') === '/preguntas-frecuentes');
    return a ? a.getAttribute('href') : null;
  });
  rec('Link FAQ existe', !!faqLink);
  if (faqLink) {
    await page.goto(BASE + faqLink, { waitUntil: 'networkidle2' });
    await sleep(1200);
    rec('Página FAQ carga', page.url().includes('/preguntas-frecuentes'));
  }

  // FOOTER: verificar todos los enlaces resuelven a rutas que existen (fetch HEAD)
  const footerLinks = await page.evaluate(() => {
    const footers = document.querySelectorAll('footer a');
    return [...footers].map((a) => a.getAttribute('href')).filter(Boolean);
  });
  // volver a pagina principal para obtener footer completo
  await page.goto(BASE + '/', { waitUntil: 'networkidle2' });
  await sleep(1200);
  const footerLinksFull = await page.evaluate(() => {
    const footers = document.querySelectorAll('footer a');
    return [...footers].map((a) => ({ href: a.getAttribute('href'), text: a.textContent?.trim().slice(0, 30) }));
  });
  const uniqueInternal = [...new Set(footerLinksFull.filter((l) => l.href?.startsWith('/')).map((l) => l.href))];
  rec(`Enlaces de footer: ${uniqueInternal.length} únicos`, true);
  for (const href of uniqueInternal) {
    try {
      const resp = await page.evaluate(async (h) => {
        const r = await fetch(h, { method: 'GET' });
        return r.status;
      }, href);
      rec(`Footer ${href}`, resp === 200, 'HTTP ' + resp);
    } catch (e) {
      rec(`Footer ${href}`, false, e.message.slice(0, 40));
    }
  }

  // WhatsApp dentro del navbar (link externo)
  await page.goto(BASE + '/', { waitUntil: 'networkidle2' });
  await sleep(3000);
  const waInfo = await page.evaluate(() => {
    const a = [...document.querySelectorAll('a')].find((x) => x.getAttribute('href')?.startsWith('https://wa.me'));
    return { found: !!a, href: a ? (a.getAttribute('href') || '').slice(0, 40) : '' };
  });
  rec('Link WhatsApp presente', waInfo.found, waInfo.href);

  // MOBILE: hamburguesa y menú
  await page.setViewport({ width: 390, height: 844 });
  await page.goto(BASE + '/', { waitUntil: 'networkidle2' });
  await sleep(3000);
  const overflowMobile = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  rec('Mobile 390px: sin overflow horizontal', !overflowMobile);

  const hamClicked = await page.evaluate(() => {
    const btn = document.querySelector('button[aria-label="Toggle menu"]');
    if (!btn) return false;
    btn.click();
    return true;
  });
  await sleep(700);
  const mobileMenuVisible = await page.evaluate(() => document.body.getAttribute('data-mobile-menu-open') === 'true');
  rec('Mobile: botón hamburguesa encontrado', hamClicked);
  rec('Mobile: menú abre', mobileMenuVisible);

  // RESPONSIVE: verificar distinto overflow en varias resoluciones
  const viewports = [1280, 1024, 768, 430, 375, 320];
  for (const w of viewports) {
    await page.setViewport({ width: w, height: 800 });
    await sleep(300);
    const o = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    rec(`Responsive ${w}px: sin overflow`, !o, o ? 'SCROLLBAR HORIZONTAL' : 'ok');
  }

  await browser.close();

  const fails = results.filter((r) => !r.ok);
  console.log(`\n=== INTERACTIVOS: ${results.length - fails.length}/${results.length} PASS ===`);
  process.exit(0);
})();
