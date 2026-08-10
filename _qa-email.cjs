const path = require('node:path');
// Forzar rutas absolutas del proyecto
process.chdir(path.join('C:', path.normalize('Users/Juan/Downloads/balkrann.framer.website-framer-full-20260803010603')));
const { sendInquiryNotification } = require('./lib/email');
(async () => {
  try {
    await sendInquiryNotification({
      id: 'qa-test-' + Date.now(),
      name: 'QA Bot',
      email: 'qa-bot@balkran.test',
      phone: '3000000000',
      tipo: 'Petición',
      message: 'Notificación de prueba QA E2E. Favor ignorar.',
    });
    console.log('sendInquiryNotification COMPLETADA sin error');
  } catch (e) {
    console.error('ERROR:', e.message);
  }
})();
