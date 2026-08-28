// descargar-footer-webp.mjs
// Ejecutar desde la raíz del proyecto con: node descargar-footer-webp.mjs
//
// Descarga las 2 imágenes del footer que aún apuntaban a la web antigua
// (el logo de Madrid Travel Bloggers y la foto de Ítaca), las convierte a
// WebP y las guarda en public/images/paginas/. Al final imprime las rutas
// locales exactas que hay que pegar en Layout.astro.

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const imagenes = [
  {
    url: 'https://www.soplalebeche.com/wp-content/uploads/2017/10/madtb_banner.png',
    carpeta: 'public/images/footer',
    nombreFinal: 'madtb_banner.webp',
    anchoMaximo: 800,
  },
  {
    url: 'https://www.soplalebeche.com/wp-content/uploads/2017/10/201408_fisterre.jpg',
    carpeta: 'public/images/footer',
    nombreFinal: '201408_fisterre.webp',
    anchoMaximo: 800,
  },
  {
    url: 'https://www.soplalebeche.com/wp-content/uploads/2016/07/sobremi_rocioperiago_soplalebeche.png',
    carpeta: 'public/images/paginas',
    nombreFinal: 'sobremi_rocioperiago_soplalebeche.webp',
    anchoMaximo: 1600,
  },
  {
    url: 'https://www.soplalebeche.com/wp-content/uploads/2016/08/20160808_slide.jpg',
    carpeta: 'public/images/paginas',
    nombreFinal: '20160808_slide.webp',
    anchoMaximo: 1600,
  },
];

async function descargarYConvertir({ url, carpeta, nombreFinal, anchoMaximo }) {
  const respuesta = await fetch(url);
  if (!respuesta.ok) {
    console.log(`  ERROR descargando ${url}: ${respuesta.status}`);
    return;
  }
  const buffer = Buffer.from(await respuesta.arrayBuffer());
  fs.mkdirSync(carpeta, { recursive: true });
  const rutaFinal = path.join(carpeta, nombreFinal);

  await sharp(buffer)
    .resize({ width: anchoMaximo, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(rutaFinal);

  console.log(`  OK: ${rutaFinal.replace('public', '')}`);
}

async function main() {
  console.log('Descargando y convirtiendo...\n');
  for (const img of imagenes) {
    await descargarYConvertir(img);
  }
  console.log('\nListo.');
}

main();
