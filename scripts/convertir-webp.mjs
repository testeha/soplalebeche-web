// convertir-webp.mjs
// Ejecutar desde la raíz del proyecto con: node convertir-webp.mjs
//
// Convierte todas las imágenes .jpg/.jpeg/.png dentro de public/images/uploads/
// a formato .webp (más ligero), limitando el ancho máximo a 1600px (de sobra
// para cómo se muestran en el sitio) y aplicando compresión de calidad 80.
// Al terminar cada conversión con éxito, borra el archivo original.
//
// Requiere la librería "sharp": si no la tienes instalada, ejecuta primero:
//   npm install sharp --save-dev

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const CARPETA = 'public/images/uploads';
const MAX_ANCHO = 1600;
const CALIDAD = 80;

function listarImagenes(dir) {
  let resultados = [];
  const entradas = fs.readdirSync(dir, { withFileTypes: true });
  for (const entrada of entradas) {
    const rutaCompleta = path.join(dir, entrada.name);
    if (entrada.isDirectory()) {
      resultados = resultados.concat(listarImagenes(rutaCompleta));
    } else if (/\.(jpe?g|png)$/i.test(entrada.name)) {
      resultados.push(rutaCompleta);
    }
  }
  return resultados;
}

async function convertir(rutaOriginal) {
  const rutaWebp = rutaOriginal.replace(/\.(jpe?g|png)$/i, '.webp');
  try {
    await sharp(rutaOriginal)
      .resize({ width: MAX_ANCHO, withoutEnlargement: true })
      .webp({ quality: CALIDAD })
      .toFile(rutaWebp);
    fs.unlinkSync(rutaOriginal);
    return true;
  } catch (err) {
    console.error(`  ERROR en ${rutaOriginal}:`, err.message);
    return false;
  }
}

async function main() {
  if (!fs.existsSync(CARPETA)) {
    console.log(`No se encontró la carpeta ${CARPETA}`);
    return;
  }

  const imagenes = listarImagenes(CARPETA);
  console.log(`Encontradas ${imagenes.length} imágenes para convertir...\n`);

  let pesoAntes = 0;
  let pesoDespues = 0;
  let ok = 0;
  let fallos = 0;

  for (const ruta of imagenes) {
    const statsAntes = fs.statSync(ruta);
    pesoAntes += statsAntes.size;

    const exito = await convertir(ruta);
    if (exito) {
      ok++;
      const rutaWebp = ruta.replace(/\.(jpe?g|png)$/i, '.webp');
      pesoDespues += fs.statSync(rutaWebp).size;
    } else {
      fallos++;
    }
  }

  console.log(`\nConvertidas: ${ok}`);
  console.log(`Fallidas: ${fallos}`);
  console.log(`Peso antes: ${(pesoAntes / 1024 / 1024).toFixed(1)} MB`);
  console.log(`Peso después: ${(pesoDespues / 1024 / 1024).toFixed(1)} MB`);
  console.log(`Ahorro: ${(100 - (pesoDespues / pesoAntes) * 100).toFixed(0)}%`);
}

main();
