// auditar-seo.mjs
// Ejecutar desde la raíz del proyecto con: node auditar-seo.mjs
//
// Revisa todos los posts y páginas y genera un informe de qué le falta
// seoTitle y/o seoDescription, para que sepas exactamente qué revisar.

import fs from 'fs';
import path from 'path';

const POSTS_DIR = 'src/content/posts';
const PAGES_DIR = 'src/content/pages';

function getFrontmatter(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  return match ? match[1] : '';
}

function tieneCampo(frontmatter, campo) {
  const re = new RegExp(`^${campo}:\\s*\\S`, 'm');
  return re.test(frontmatter);
}

function auditarCarpeta(dir, camposEsperados) {
  if (!fs.existsSync(dir)) {
    console.log(`  (carpeta ${dir} no encontrada, se salta)`);
    return;
  }
  const archivos = fs.readdirSync(dir).filter((f) => f.endsWith('.md'));
  let completos = 0;
  const incompletos = [];

  archivos.forEach((fname) => {
    const fm = getFrontmatter(path.join(dir, fname));
    const faltantes = camposEsperados.filter((campo) => !tieneCampo(fm, campo));
    if (faltantes.length === 0) {
      completos++;
    } else {
      incompletos.push({ fname, faltantes });
    }
  });

  console.log(`  Total: ${archivos.length}`);
  console.log(`  Completos (tienen ${camposEsperados.join(' y ')}): ${completos}`);
  console.log(`  Incompletos: ${incompletos.length}`);
  if (incompletos.length > 0) {
    console.log('\n  Detalle de lo que falta:');
    incompletos.forEach(({ fname, faltantes }) => {
      console.log(`   - ${fname}: falta ${faltantes.join(', ')}`);
    });
  }
}

console.log('=== AUDITORÍA SEO: POSTS (src/content/posts) ===');
auditarCarpeta(POSTS_DIR, ['seoTitle', 'seoDescription']);

console.log('\n=== AUDITORÍA SEO: PÁGINAS (src/content/pages) ===');
console.log('  Aviso: estas páginas nunca tuvieron seoTitle/seoDescription migrados de');
console.log('  WordPress (Yoast solo se capturó para los posts), así que es normal que');
console.log('  aparezcan todas como "incompletas" aquí. Si quieres SEO real en estas 5');
console.log('  páginas, hay que escribirlo a mano — dímelo y lo hacemos juntos.');
auditarCarpeta(PAGES_DIR, ['seoTitle', 'seoDescription']);
