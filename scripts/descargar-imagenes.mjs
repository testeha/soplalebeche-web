// descargar-imagenes.mjs
// Ejecutar desde la raíz del proyecto con: node descargar-imagenes.mjs
//
// 1. Escanea src/content/posts y src/content/pages en busca de URLs de
//    https://www.soplalebeche.com/wp-content/uploads/...
// 2. Descarga cada imagen a public/images/uploads/... (conservando la
//    misma estructura de carpetas año/mes que WordPress)
// 3. Reescribe todos los .md sustituyendo la URL externa por la ruta local

import fs from 'fs';
import path from 'path';

const POSTS_DIR = 'src/content/posts';
const PAGES_DIR = 'src/content/pages';
const PUBLIC_IMAGES = 'public/images';

const URL_RE = /https:\/\/www\.soplalebeche\.com\/wp-content\/uploads\/([^\s")\]]+)/g;

function getMdFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => path.join(dir, f));
}

function collectUrls(files) {
  const urls = new Set();
  for (const file of files) {
    const content = fs.readFileSync(file, 'utf-8');
    const matches = content.matchAll(URL_RE);
    for (const m of matches) {
      urls.add(m[0]);
    }
  }
  return [...urls];
}

async function downloadImage(url) {
  const relativePath = url.split('/wp-content/uploads/')[1]; // ej: 2021/07/Letur_6.jpg
  const destPath = path.join(PUBLIC_IMAGES, 'uploads', relativePath);
  fs.mkdirSync(path.dirname(destPath), { recursive: true });

  if (fs.existsSync(destPath)) {
    return { url, localPath: `/images/uploads/${relativePath}`, status: 'ya existía' };
  }

  try {
    const res = await fetch(url);
    if (!res.ok) {
      return { url, localPath: null, status: `error HTTP ${res.status}` };
    }
    const buffer = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(destPath, buffer);
    return { url, localPath: `/images/uploads/${relativePath}`, status: 'descargada' };
  } catch (err) {
    return { url, localPath: null, status: `error: ${err.message}` };
  }
}

function rewriteFiles(files, urlMap) {
  let totalReplacements = 0;
  for (const file of files) {
    let content = fs.readFileSync(file, 'utf-8');
    let changed = false;
    for (const [url, localPath] of urlMap.entries()) {
      if (content.includes(url)) {
        content = content.split(url).join(localPath);
        changed = true;
        totalReplacements++;
      }
    }
    if (changed) {
      fs.writeFileSync(file, content, 'utf-8');
    }
  }
  return totalReplacements;
}

async function main() {
  const postFiles = getMdFiles(POSTS_DIR);
  const pageFiles = getMdFiles(PAGES_DIR);
  const allFiles = [...postFiles, ...pageFiles];

  console.log(`Archivos .md encontrados: ${allFiles.length}`);

  const urls = collectUrls(allFiles);
  console.log(`URLs de imágenes detectadas: ${urls.length}\n`);

  const urlMap = new Map();
  let ok = 0, existed = 0, failed = 0;

  for (const url of urls) {
    const result = await downloadImage(url);
    if (result.localPath) {
      urlMap.set(url, result.localPath);
      if (result.status === 'descargada') ok++;
      else existed++;
    } else {
      failed++;
      console.log(`  ✗ ${url} -> ${result.status}`);
    }
  }

  console.log(`\nDescargadas: ${ok} | Ya existían: ${existed} | Fallidas: ${failed}`);

  const replacements = rewriteFiles(allFiles, urlMap);
  console.log(`Rutas reescritas en los .md: ${replacements}`);
  console.log('\nListo. Revisa public/images/uploads/ y comprueba que las crónicas cargan las fotos en local.');
}

main();
