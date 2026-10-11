import { readdir } from "node:fs/promises";
import { join } from "node:path";

/** Saída estática do build (o que vai para o GitHub Pages). */
export const OUTPUT_DIR = "dist/client";

/**
 * Todos os HTML gerados, recursivamente. Falha se não houver nenhum (build
 * não rodou ou mudou de pasta), para as checagens não passarem "vazias".
 * @param {string} [dir]
 * @returns {Promise<string[]>}
 */
export async function findHtmlFiles(dir = OUTPUT_DIR) {
  const files = await collect(dir);
  if (files.length === 0) {
    throw new Error(`Nenhum HTML em ${dir}: rode o build antes.`);
  }
  return files;
}

/** @param {string} dir @returns {Promise<string[]>} */
async function collect(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) => {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) {
        return collect(path);
      }
      return Promise.resolve(entry.name.endsWith(".html") ? [path] : []);
    }),
  );
  return nested.flat();
}
