// auditar-borradores.mjs
// Ejecutar desde la raíz del proyecto con: node auditar-borradores.mjs
//
// Lista todos los posts de src/content/posts/ marcados como draft: true,
// para comprobar que coinciden con los que eran borrador en WordPress.

import fs from 'fs';
import path from 'path';

const CARPETA_POSTS = 'src/content/posts';

function main() {
  const archivos = fs.readdirSync(CARPETA_POSTS).filter((f) => f.endsWith('.md'));
  const borradores = [];
  const publicados = [];

  for (const archivo of archivos) {
    const contenido = fs.readFileSync(path.join(CARPETA_POSTS, archivo), 'utf-8');
    const matchTitulo = contenido.match(/title:\s*(.+)/);
    const titulo = matchTitulo ? matchTitulo[1].trim() : archivo;
    const esBorrador = /draft:\s*true/.test(contenido);

    if (esBorrador) {
      borradores.push({ archivo, titulo });
    } else {
      publicados.push({ archivo, titulo });
    }
  }

  console.log(`Total de posts: ${archivos.length}`);
  console.log(`Publicados (draft: false): ${publicados.length}`);
  console.log(`Marcados como borrador (draft: true): ${borradores.length}\n`);

  if (borradores.length > 0) {
    console.log('--- Posts marcados como BORRADOR ---');
    borradores.forEach(({ archivo, titulo }) => {
      console.log(`  - ${titulo}  (${archivo})`);
    });
  } else {
    console.log('No hay ningún post marcado como borrador.');
  }
}

main();
