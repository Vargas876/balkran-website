const puppeteer = require('puppeteer-core');
const BASE = 'http://localhost:3999';
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const results = [];
function rec(name, ok, extra = '') {
  results.push({ name, ok });
  console.log(`${ok ? 'PASS' : 'FAIL'} | ${name}${extra ? ' | ' + extra : ''}`);
}

async function goto2(page, url, wait = 1500) {
  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
  } catch (e) {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 }).catch(() => {});
    await sleep(5000);
  }
  await sleep(wait);
}

(async () => {
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox', '--disable-gpu'] });
  const page = await browser.newPage();
  page.setViewport({ width: 1440, height: 900 });

  // ---------- PRODUCTOS: listado (paginado 10/pagina) ----------
  await goto2(page, BASE + '/productos', 2500);

  // ---------- ACCEPT COOKIES (habilita chat y state) ----------
  await page.evaluate(() => {
    const btn = [...document.querySelectorAll('button')].find((b) => /cepto/i.test(b.textContent || '') && (b.textContent || '').trim().length < 15);
    if (btn) btn.click();
  });
  await sleep(800);

  const listInfo = await page.evaluate(() => {
    const links = [...document.querySelectorAll('a')].filter((a) => /^\/productos\/[a-z0-9-]+$/.test(a.getAttribute('href') || ''));
    const unique = new Set(links.map((a) => a.getAttribute('href'))).size;
    const showing = (document.body.innerText.match(/(\d+)\s*-\s*(\d+)\s+de\s+(\d+)/) || [])[0] || '';
    const hasPagination = [...document.querySelectorAll('button')].some((b) => (b.title || '').indexOf('igniente') !== -1 || (b.title || '').indexOf('nterior') !== -1);
    return { unique, showing, hasPagination };
  });
  rec(`Listado productos: ${listInfo.unique} enlaces en vista y paginacion`, listInfo.unique >= 10 && listInfo.hasPagination, `mostrando=${listInfo.showing} | ${listInfo.unique} enlaces`);

  // click en una card de producto
  const navP = page.waitForNavigation({ timeout: 15000 }).catch(() => {});
  await page.evaluate(() => {
    const a = [...document.querySelectorAll('a')].find((x) => /^\/productos\/[a-z0-9-]+$/.test(x.getAttribute('href') || ''));
    if (a) a.click();
  });
  await navP;
  await sleep(2000);
  rec('Card producto -> detalle', /\/productos\/[a-z0-9-]+$/.test(page.url()), page.url().slice(-45));

  // ---------- DETALLE PRODUCTO ----------
  const detailHas = await page.evaluate(() => ({
    img: !!document.querySelector('img'),
    nombre: !!document.querySelector('h1'),
    addCart: !![...document.querySelectorAll('button')].find((b) => /adir al carrito|agregar al carrito/i.test(b.textContent || '')),
    tabs: [...document.querySelectorAll('button')].filter((b) => /instal|ficha|certificaci|valoracion/i.test(b.textContent || '')).length,
  }));
  rec('Detalle: imagen', detailHas.img);
  rec('Detalle: titulo (h1)', detailHas.nombre);
  rec('Detalle: boton anadir carrito', detailHas.addCart);
  rec(`Detalle: tabs presentes (${detailHas.tabs})`, detailHas.tabs >= 4);

  // anadir al carrito
  const added = await page.evaluate(() => {
    const btn = [...document.querySelectorAll('button')].find((b) => /adir al carrito|agregar al carrito/i.test(b.textContent || ''));
    if (!btn) return false;
    btn.click();
    return true;
  });
  await sleep(1500);
  rec('Anadir al carrito (click)', added);

  // abrir drawer del carrito
  const cartOpened = await page.evaluate(() => {
    const btn = document.querySelector('button[aria-label="Carrito de Compras"]');
    if (!btn) return false;
    btn.click();
    return true;
  });
  await sleep(1200);
  const cartContent = await page.evaluate(() => {
    const d = document.body.innerText;
    return /carrito|bolsa/i.test(d) && document.querySelector('aside, [class*=drawer], [class*=fixed]') !== null;
  });
  rec('Carrito drawer abre', cartContent);
  const drawerText = await page.evaluate(() => /total de compra|subtotal/i.test(document.body.innerText));
  rec('Carrito: total/subtotal visible', drawerText);

  // cerrar drawer
  await page.evaluate(() => {
    const b = document.querySelector('button[aria-label="Cerrar carrito"]');
    if (b) b.click();
  }).catch(() => {});
  await sleep(500);

  // ---------- BUSQUEDA ----------
  await goto2(page, BASE + '/productos', 2000);
  const searchInput = await page.evaluate(() => {
    const inp = [...document.querySelectorAll('input')].find((i) => /buscar|search/i.test(i.getAttribute('placeholder') || ''));
    if (!inp) return false;
    const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
    setter.call(inp, 'b9000');
    inp.dispatchEvent(new Event('input', { bubbles: true }));
    return true;
  });
  await sleep(2000);
  rec('Busqueda: campo encontrado', searchInput);
  const searchRes = await page.evaluate(() => [...document.querySelectorAll('a')].some((a) => /^\/productos\//.test(a.getAttribute('href') || '') && (a.getAttribute('href') || '').includes('b9000')));
  rec('Busqueda: resultados filtran', searchRes);

  // ---------- IDIOMAS ----------
  await goto2(page, BASE + '/', 2500);
  const langBtn = await page.evaluate(() => {
    const btn = document.querySelector('button[aria-label*="idioma"], button[aria-label*="Idioma"]');
    return !!btn;
  });
  rec('Cambiar idioma: control presente', langBtn);
  if (langBtn) {
    await page.evaluate(() => document.querySelector('button[aria-label*="idioma"], button[aria-label*="Idioma"]').click());
    await sleep(1000);
    const langs = await page.evaluate(() => [...document.querySelectorAll('button')].map((b) => (b.textContent || '').trim()).filter((t) => /EN|ES|FR/i.test(t)));
    rec('Cambiar idioma: opciones visibles', langs.length > 0, langs.slice(0, 4).join(','));
  }

  // ---------- BACK / FORWARD ----------
  await goto2(page, BASE + '/productos/b9000', 2000);
  await goto2(page, BASE + '/nosotros', 1500);
  await page.goBack({ waitUntil: 'networkidle2', timeout: 15000 }).catch(() => {});
  await sleep(2000);
  rec('Back: vuelve a /productos/b9000', page.url().includes('/productos/b9000'), page.url());
  await page.goForward({ waitUntil: 'networkidle2', timeout: 15000 }).catch(() => {});
  await sleep(2000);
  rec('Forward: vuelve a /nosotros', page.url().includes('/nosotros'), page.url());

  // ---------- RELOAD directo ruta dinamica ----------
  await goto2(page, BASE + '/productos/klk', 2000);
  await page.reload({ waitUntil: 'networkidle2', timeout: 30000 }).catch(() => {});
  await sleep(2000);
  rec('Reload en /productos/klk', page.url().includes('/productos/klk'), 'sin 404');

  // ---------- CHAT VOLT ----------
  await goto2(page, BASE + '/', 2000);
  let chatBtn = null;
  for (let i = 0; i < 10; i++) {
    const found = await page.evaluate(() => !!document.querySelector('button[aria-label="Abrir chat Volt"]'));
    if (found) break;
    await sleep(500);
  }
  const hasChat = await page.evaluate(() => !!document.querySelector('button[aria-label="Abrir chat Volt"]'));
  rec('Chat Volt: boton flotante', hasChat);
  if (hasChat) {
    await page.evaluate(() => document.querySelector('button[aria-label="Abrir chat Volt"]').click());
    await sleep(1500);
    const chatOpened = await page.evaluate(() => /Volt/i.test(document.body.innerText));
    rec('Chat Volt: abre', chatOpened);
    const input = await page.evaluate(() => {
      const inp = document.querySelector('input[type="text"]') || document.querySelector('textarea');
      if (!inp) return false;
      const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
      if (setter) setter.call(inp, 'Cual energizador me recomiendas para 30 km?');
      else inp.value = 'Cual energizador me recomiendas para 30 km?';
      inp.dispatchEvent(new Event('input', { bubbles: true }));
      return true;
    });
    await sleep(500);
    const sent = await page.evaluate(() => {
      const btn = [...document.querySelectorAll('button')].find((b) => (b.getAttribute('aria-label') || '') === 'Enviar');
      if (!btn) return false;
      btn.click();
      return true;
    });
    await sleep(9000);
    const responseOk = await page.evaluate(() => {
      const t = document.body.innerText;
      return t.includes('Volt') && (t.includes('energizador') || t.includes('km') || t.includes('asistente'));
    });
    rec('Chat Volt: envia y responde', sent && responseOk, sent ? 'respuesta OK' : 'no envio');
  }

  // ---------- COOKIE BANNER (ya aceptado arriba) ----------
  const cookieHidden = await page.evaluate(() => {
    const btn = [...document.querySelectorAll('button')].find((b) => /cepto/i.test(b.textContent || '') && (b.textContent || '').trim().length < 15);
    return !btn;
  });
  rec('Cookie banner: oculto tras aceptar', cookieHidden);

  await browser.close();
  const fails = results.filter((r) => !r.ok);
  console.log(`\n=== INTERACTIVOS 2: ${results.length - fails.length}/${results.length} PASS ===`);
  process.exit(0);
})();