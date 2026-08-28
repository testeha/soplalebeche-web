// generar-redirects.mjs
// Ejecutar desde la raíz del proyecto con: node generar-redirects.mjs
//
// Lee todos los posts PUBLICADOS (draft: false) de src/content/posts/ y
// genera (o actualiza) vercel.json con una redirección 301 permanente desde
// la URL antigua de WordPress (soplalebeche.com/slug/) hacia la nueva
// (soplalebeche.com/historias/slug), para no perder el posicionamiento SEO
// acumulado en Google.
//
// Los 19 posts marcados como borrador NO se incluyen, porque nunca tuvieron
// una URL pública en el WordPress antiguo (nadie los indexó ni los enlazó).

import fs from 'fs';
import path from 'path';

const CARPETA_POSTS = 'src/content/posts';
const ARCHIVO_VERCEL_JSON = 'vercel.json';

function extraerCampo(contenido, campo) {
  const match = contenido.match(new RegExp(`^${campo}:\\s*(.+)$`, 'm'));
  return match ? match[1].trim().replace(/^['"]|['"]$/g, '') : null;
}

function main() {
  const archivosPosts = fs.readdirSync(CARPETA_POSTS).filter((f) => f.endsWith('.md'));
  const redirects = [];

  for (const archivo of archivosPosts) {
    const ruta = path.join(CARPETA_POSTS, archivo);
    const contenido = fs.readFileSync(ruta, 'utf-8');
    const esBorrador = /draft:\s*true/.test(contenido);
    if (esBorrador) continue;

    const slug = extraerCampo(contenido, 'slug');
    if (!slug) {
      console.log(`  AVISO: no encontré "slug" en ${archivo}, lo salto`);
      continue;
    }

    redirects.push({
      source: `/${slug}`,
      destination: `/historias/${slug}`,
      permanent: true,
    });
  }

  // Si ya existe un vercel.json, lo respetamos y solo añadimos/actualizamos "redirects"
  let vercelJson = {};
  if (fs.existsSync(ARCHIVO_VERCEL_JSON)) {
    vercelJson = JSON.parse(fs.readFileSync(ARCHIVO_VERCEL_JSON, 'utf-8'));
  }
  vercelJson.redirects = redirects;

  fs.writeFileSync(ARCHIVO_VERCEL_JSON, JSON.stringify(vercelJson, null, 2) + '\n', 'utf-8');

  console.log(`Redirecciones generadas: ${redirects.length}`);
  console.log(`Guardado en ${ARCHIVO_VERCEL_JSON}`);
}

main();
