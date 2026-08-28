// reescribir-a-webp-local.mjs
// Ejecutar DESPUÉS de convertir-webp.mjs, con: node reescribir-a-webp-local.mjs
//
// A diferencia del script anterior (actualizar-referencias-webp.mjs, que
// asumía que los posts ya tenían rutas locales), este busca las URLs
// EXTERNAS de la web antigua (https://www.soplalebeche.com/wp-content/uploads/...)
// y las sustituye por la ruta local .webp equivalente — pero SOLO si ese
// archivo .webp existe de verdad en public/images/uploads/. Si no existe,
// deja la URL externa tal cual y avisa, en vez de crear un enlace roto.

import fs from 'fs';
import path from 'path';

const CARPETA_POSTS = 'src/content/posts';
const CARPETA_PUBLIC = 'public';

// Reconoce URLs del tipo:
// https://www.soplalebeche.com/wp-content/uploads/2017/03/nombre.jpg
const REGEX_URL_EXTERNA = /https:\/\/(?:www\.)?soplalebeche\.com\/wp-content\/uploads\/([^\s")]+)\.(jpe?g|png|webp)/gi;

function procesarArchivo(ruta) {
  const contenidoOriginal = fs.readFileSync(ruta, 'utf-8');
  let cambios = 0;
  const noEncontrados = [];

  const contenidoNuevo = contenidoOriginal.replace(REGEX_URL_EXTERNA, (match, rutaRelativa) => {
    const rutaLocalWebp = `/images/uploads/${rutaRelativa}.webp`;
    const rutaEnDisco = path.join(CARPETA_PUBLIC, rutaLocalWebp);

    if (fs.existsSync(rutaEnDisco)) {
      cambios++;
      return rutaLocalWebp;
    } else {
      noEncontrados.push(rutaLocalWebp);
      return match; // deja la URL externa tal cual, no rompemos nada
    }
  });

  if (contenidoNuevo !== contenidoOriginal) {
    fs.writeFileSync(ruta, contenidoNuevo, 'utf-8');
  }

  return { cambios, noEncontrados };
}

function main() {
  if (!fs.existsSync(CARPETA_POSTS)) {
    console.log(`No se encontró la carpeta ${CARPETA_POSTS}`);
    return;
  }

  const archivos = fs.readdirSync(CARPETA_POSTS).filter((f) => f.endsWith('.md'));
  let totalCambios = 0;
  let archivosConCambios = 0;
  const todosNoEncontrados = [];

  for (const archivo of archivos) {
    const ruta = path.join(CARPETA_POSTS, archivo);
    const { cambios, noEncontrados } = procesarArchivo(ruta);
    if (cambios > 0) {
      totalCambios += cambios;
      archivosConCambios++;
    }
    if (noEncontrados.length > 0) {
      todosNoEncontrados.push({ archivo, rutas: noEncontrados });
    }
  }

  console.log(`Posts revisados: ${archivos.length}`);
  console.log(`Posts con al menos una URL reescrita: ${archivosConCambios}`);
  console.log(`Total de URLs reescritas a .webp local: ${totalCambios}`);

  if (todosNoEncontrados.length > 0) {
    console.log(`\nAVISO: ${todosNoEncontrados.length} posts tienen alguna imagen que no encontré localmente (se dejó la URL externa tal cual):`);
    todosNoEncontrados.forEach(({ archivo, rutas }) => {
      console.log(` - ${archivo}: ${rutas.length} imagen(es)`);
    });
  } else {
    console.log('\nTodas las imágenes referenciadas se encontraron localmente. Ninguna URL externa quedó sin resolver.');
  }
}

main();
