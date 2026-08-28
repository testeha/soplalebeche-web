// actualizar-referencias-webp.mjs
// Ejecutar DESPUÉS de convertir-webp.mjs, con: node actualizar-referencias-webp.mjs
//
// Recorre todos los posts y sustituye, en el frontmatter (featuredImage) y en
// el cuerpo del texto (galerías con formato ![](...)), cualquier referencia a
// /images/uploads/... que termine en .jpg/.jpeg/.png por su equivalente .webp.
// Solo toca rutas que empiecen por /images/uploads/ (las fotos ya descargadas
// localmente) — no toca URLs externas (por ejemplo, las que siguen apuntando
// a soplalebeche.com en Sobre mí, Contacto, etc.), esas hay que revisarlas
// aparte si se quiere hacer lo mismo con ellas.

import fs from 'fs';
import path from 'path';

const CARPETA_POSTS = 'src/content/posts';

function actualizarArchivo(ruta) {
  const contenidoOriginal = fs.readFileSync(ruta, 'utf-8');
  const contenidoNuevo = contenidoOriginal.replace(
    /(\/images\/uploads\/[^\s")]+)\.(jpe?g|png)/gi,
    '$1.webp'
  );
  if (contenidoNuevo !== contenidoOriginal) {
    fs.writeFileSync(ruta, contenidoNuevo, 'utf-8');
    return true;
  }
  return false;
}

function main() {
  if (!fs.existsSync(CARPETA_POSTS)) {
    console.log(`No se encontró la carpeta ${CARPETA_POSTS}`);
    return;
  }

  const archivos = fs.readdirSync(CARPETA_POSTS).filter((f) => f.endsWith('.md'));
  let actualizados = 0;

  for (const archivo of archivos) {
    const ruta = path.join(CARPETA_POSTS, archivo);
    if (actualizarArchivo(ruta)) {
      actualizados++;
    }
  }

  console.log(`Posts revisados: ${archivos.length}`);
  console.log(`Posts actualizados con referencias .webp: ${actualizados}`);
}

main();
