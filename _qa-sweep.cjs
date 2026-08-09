const puppeteer = require('puppeteer-core');

const BASE = 'http://localhost:3999';
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const productSlugs = ["b1000","b2000","b3000","b9000","b750","b6000","b14000h","b18000h","b1000d","b2000d","b18000","b6000h","b9000d","b6000hd","b1000s","b4500d","b6000d","b800s","b4500s","b6000s","b9000s","kit-solar-b800s","kit-todo-en-uno-b1000d","kit-solar-b1000s","kit-solar-b2000s","b3000s","kit-solar-b6000s","kit-solar-b9000s","tensor-500m","tensor-700m","llave-tensora","manigueta-resortada-amarilla","resorte-de-3-metros","tensor-terminal","kit-solar-b4500s","resorte-de-5-metros","aislador-pivote-extralargo-amarillo-paquete-x-100","kit-portillo-resortado-3-metros-amarillo","cuchilla-seccionadora","kit-portillo-resortado-5-metros-amarillo","desviador-de-rayos","cuchilla-doble-tiro","voltimetro-de-luces","aislador-distanciador-x-12-unidades","manguera-aisladora-x-50-metros","dispensador-de-hilo-cinta-electroplastica","cinta-electroplastica-azul-x-200-metros","b500","b4500","b14000","b4500h","cable-aislado-x-50-metros","hilo-electroplastico-azul-200-metros","b3000d","b4500hd","b9000hd","b2000s","kit-solar-b3000s","aislador-tipo-pera-paquete-x-25","aislador-doble-fijacion-paquete-x-50-unidades","aislador-recibidor-paquete-x-25-unidades","hilo-electroplastico-balkran-azul-naranja","b1500","b9000h","klk"];

const historiaSlugs = ['balcon-de-los-apaches', 'san-francisco', 'san-salvador', 'hacienda-la-libertad'];
const eventoSlugs = ['informe-sociedades-bic-2025','informe-sociedades-bic-2024','informe-sociedades-bic-2023','informe-sociedades-bic-2022','informe-sociedades-bic-2021','4to-congreso-de-sostenibilidad','expobic-2022','macrorrueda-90-cali','agroexpo-2021'];

const staticRoutes = ['/', '/nosotros', '/productos', '/servicios', '/contacto', '/login', '/registro', '/recuperar', '/pqrs', '/historias', '/eventos', '/manuales', '/certificaciones', '/preguntas-frecuentes', '/politica-datos-personales', '/terminos-y-condiciones-tienda', '/garantias-y-devoluciones', '/robots.txt', '/sitemap.xml', '/no-existe-esta-ruta'];

let totalRoutes = 0, pass = 0, fail = 0;
const failures = [];
const consoleErrors = [];
const networkErrors = [];

async function checkPage(browser, url, opts = {}) {
  totalRoutes++;
  const page = await browser.newPage();
  const errs = [];
  const failedReqs = [];
  page.on('console', (m) => {
    if (m.type() === 'error') errs.push(`console: ${m.text()}`);
  });
  page.on('pageerror', (e) => errs.push(`pageerror: ${e.message}`));
  page.on('requestfailed', (r) => {
    const f = r.failure();
    const u = r.url();
    if (f?.errorText === 'net::ERR_ABORTED') return;
    if (f?.errorText === 'net::ERR_BLOCKED_BY_ORB') return;
    failedReqs.push(`${r.method()} ${u} :: ${f?.errorText ?? 'failed'}`);
  });
  page.on('response', (r) => {
    if (r.status() >= 400) failedReqs.push(`HTTP ${r.status()} ${r.url()}`);
  });
  try {
    const resp = await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise((r) => setTimeout(r, 800));
    const status = resp?.status() ?? 0;
    if (status === 200 && errs.length === 0 && failedReqs.length === 0) {
      pass++;
    } else {
      fail++;
      failures.push({ url, status, errs: errs.slice(0, 5), failedReqs: failedReqs.slice(0, 8) });
      if (errs.length) consoleErrors.push(...errs.map((e) => `${url} :: ${e}`));
      if (failedReqs.length) networkErrors.push(...failedReqs.map((e) => `${url} :: ${e}`));
    }
  } catch (e) {
    fail++;
    failures.push({ url, status: 'ERR', errs: [e.message.slice(0, 150)] });
  } finally {
    await page.close();
  }
}

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: 'new',
    args: ['--no-sandbox', '--disable-gpu', '--window-size=1440,900'],
  });

  for (const r of staticRoutes) await checkPage(browser, BASE + r);

  for (const slug of productSlugs) await checkPage(browser, `${BASE}/productos/${slug}`);
  for (const slug of historiaSlugs) await checkPage(browser, `${BASE}/historias/${slug}`);
  for (const slug of eventoSlugs) await checkPage(browser, `${BASE}/eventos/${slug}`);

  await browser.close();

  console.log('\n================ RESULTADO SWEEP ================');
  console.log(`Rutas probadas: ${totalRoutes} | PASS: ${pass} | FAIL: ${fail}`);
  console.log('Consola (errores):', consoleErrors.length);
  console.log('Network (errores):', networkErrors.length);
  if (failures.length) {
    console.log('\n--- FALLOS ---');
    for (const f of failures) {
      console.log('\nURL:', f.url, '| status:', f.status);
      if (f.errs?.length) console.log('  console/pageerror:', f.errs.slice(0, 3).join(' | '));
      if (f.failedReqs?.length) console.log('  requests:', f.failedReqs.slice(0, 6).join(' | '));
    }
  }
  if (consoleErrors.length) {
    console.log('\n--- TODOS LOS ERRORES DE CONSOLA ---');
    for (const e of [...new Set(consoleErrors)].slice(0, 30)) console.log('  ', e);
  }
  if (networkErrors.length) {
    console.log('\n--- TODOS LOS ERRORES DE RED ---');
    for (const e of [...new Set(networkErrors)].slice(0, 40)) console.log('  ', e);
  }
  process.exit(0);
})();
