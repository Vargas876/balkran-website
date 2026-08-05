export function formatLinea(linea: string = '', lang: string = 'es'): string {
  if (!linea) return '';
  if (lang === 'en') {
    return linea
      .replace(/LÍNEA B \(110V\)/gi, 'LINE B (110V)')
      .replace(/LÍNEA BH/gi, 'BH LINE (HEAVY DUTY)')
      .replace(/LÍNEA BD/gi, 'BD DUAL LINE (110V/12V)')
      .replace(/LÍNEA BHD/gi, 'BHD HEAVY DUTY DUAL LINE')
      .replace(/LÍNEA S \(12V\)/gi, 'SOLAR / BATTERY LINE (12V)')
      .replace(/KITS SOLARES/gi, 'SOLAR KITS')
      .replace(/Kits Solares/gi, 'Solar Kits')
      .replace(/ACCESORIOS/gi, 'ACCESSORIES')
      .replace(/Accesorios/gi, 'Accessories')
      .replace(/Hasta /gi, 'Up to ')
      .replace(/^LÍNEA\s+/gi, 'LINE ')
      .replace(/^LINEA\s+/gi, 'LINE ');
  }
  if (lang === 'fr') {
    return linea
      .replace(/LÍNEA B \(110V\)/gi, 'GAMME B (110V)')
      .replace(/LÍNEA BH/gi, 'GAMME BH (INTENSIF)')
      .replace(/LÍNEA BD/gi, 'GAMME BD (DUO 110V/12V)')
      .replace(/LÍNEA BHD/gi, 'GAMME BHD (DUO INTENSIF)')
      .replace(/LÍNEA S \(12V\)/gi, 'GAMME SOLAIRE / BATTERIE (12V)')
      .replace(/KITS SOLARES/gi, 'KITS SOLAIRES')
      .replace(/Kits Solares/gi, 'Kits Solaires')
      .replace(/ACCESORIOS/gi, 'ACCESSOIRES')
      .replace(/Accesorios/gi, 'Accessoires')
      .replace(/Hasta /gi, "Jusqu'à ")
      .replace(/^LÍNEA\s+/gi, 'GAMME ')
      .replace(/^LINEA\s+/gi, 'GAMME ');
  }
  return linea;
}

export function formatCategoria(cat: string = '', lang: string = 'es'): string {
  if (!cat) return '';
  if (lang === 'en') {
    if (cat === 'Energizadores') return 'Energizers';
    if (cat === 'Kits Solares') return 'Solar Kits';
    if (cat === 'Accesorios') return 'Accessories';
  }
  if (lang === 'fr') {
    if (cat === 'Energizadores') return 'Électrificateurs';
    if (cat === 'Kits Solares') return 'Kits Solaires';
    if (cat === 'Accesorios') return 'Accessoires';
  }
  return cat;
}

export function formatNombreProducto(nombre: string = '', lang: string = 'es'): string {
  if (!nombre) return '';
  if (lang === 'en') {
    return nombre
      .replace(/Kit Todo en Uno/gi, 'All-in-One Kit')
      .replace(/Kit Solar/gi, 'Solar Kit')
      .replace(/Manigueta Resortada Amarilla/gi, 'Yellow Spring Handle')
      .replace(/Aislador Pivote Extralargo Amarillo Paquete X 100/gi, 'Yellow Extra-Long Pivot Insulator (Pack of 100)')
      .replace(/Aislador Esquinero/gi, 'Corner Insulator')
      .replace(/Desviador De Rayos/gi, 'Lightning Diverter')
      .replace(/Voltímetro Digital/gi, 'Digital Voltmeter')
      .replace(/Cable Aislado X 50 Metros/gi, '50m Insulated Cable');
  }
  if (lang === 'fr') {
    return nombre
      .replace(/Kit Todo en Uno/gi, 'Kit Tout-en-Un')
      .replace(/Kit Solar/gi, 'Kit Solaire')
      .replace(/Manigueta Resortada Amarilla/gi, 'Poignée à Ressort Jaune')
      .replace(/Aislador Pivote Extralargo Amarillo Paquete X 100/gi, 'Isolateur Pivot Extra-Long Jaune (Paquet de 100)')
      .replace(/Aislador Esquinero/gi, 'Isolateur de Coin')
      .replace(/Desviador De Rayos/gi, 'Parafoudre')
      .replace(/Voltímetro Digital/gi, 'Voltmètre Numérique')
      .replace(/Cable Aislado X 50 Metros/gi, 'Câble Isolé 50m');
  }
  return nombre;
}

export function formatAlimentacion(alim: string = '', lang: string = 'es'): string {
  if (!alim) return '';
  if (lang === 'en') {
    return alim
      .replace(/Sistema Integrado Todo en Uno/gi, 'Integrated All-in-One System')
      .replace(/Red Eléctrica/gi, 'Electrical Grid')
      .replace(/Batería/gi, 'Battery')
      .replace(/Panel Solar/gi, 'Solar Panel');
  }
  if (lang === 'fr') {
    return alim
      .replace(/Sistema Integrado Todo en Uno/gi, 'Système Intégré Tout-en-Un')
      .replace(/Red Eléctrica/gi, 'Réseau Électrique')
      .replace(/Batería/gi, 'Batterie')
      .replace(/Panel Solar/gi, 'Panneau Solaire');
  }
  return alim;
}

export function formatDescripcionProducto(desc: string = '', lang: string = 'es'): string {
  if (!desc) return '';
  if (lang === 'en') {
    return desc
      .replace(/Kit Todo en Uno con energizador (.*) integrado\./gi, 'All-in-One Kit with integrated $1 energizer.')
      .replace(/Kit Todo en Uno/gi, 'All-in-One Kit')
      .replace(/energizador/gi, 'energizer')
      .replace(/integrado/gi, 'integrated');
  }
  if (lang === 'fr') {
    return desc
      .replace(/Kit Todo en Uno con energizador (.*) integrado\./gi, 'Kit Tout-en-Un avec électrificateur $1 integrado.')
      .replace(/Kit Todo en Uno/gi, 'Kit Tout-en-Un')
      .replace(/energizador/gi, 'électrificateur')
      .replace(/integrado/gi, 'intégré');
  }
  return desc;
}

export function formatSubtitulo(sub: string = '', lang: string = 'es'): string {
  if (!sub) return '';
  if (lang === 'en') {
    return sub
      .replace(/Kit Todo en Uno con energizador (.*) integrado\./gi, 'All-in-One Kit with integrated $1 energizer.')
      .replace(/Kit Todo en Uno/gi, 'All-in-One Kit')
      .replace(/Aislante UV/gi, 'UV Insulated')
      .replace(/Paquete X 100/gi, 'Pack of 100')
      .replace(/Hasta /gi, 'Up to ')
      .replace(/Red Eléctrica/gi, 'Electrical Grid')
      .replace(/Batería/gi, 'Battery')
      .replace(/Panel Solar/gi, 'Solar Panel')
      .replace(/Kit Solar completo/gi, 'Complete Solar Kit')
      .replace(/Garantía de fábrica/gi, 'Factory Warranty');
  }
  if (lang === 'fr') {
    return sub
      .replace(/Kit Todo en Uno con energizador (.*) integrado\./gi, 'Kit Tout-en-Un avec électrificateur $1 integrado.')
      .replace(/Kit Todo en Uno/gi, 'Kit Tout-en-Un')
      .replace(/Aislante UV/gi, 'Isolant Anti-UV')
      .replace(/Paquete X 100/gi, 'Paquet de 100')
      .replace(/Hasta /gi, "Jusqu'à ")
      .replace(/Red Eléctrica/gi, 'Réseau Électrique')
      .replace(/Batería/gi, 'Batterie')
      .replace(/Panel Solar/gi, 'Panneau Solaire')
      .replace(/Kit Solar completo/gi, 'Kit Solaire complet')
      .replace(/Garantía de fábrica/gi, "Garantie d'usine");
  }
  return sub;
}
