/**
 * Falha o build se alguma página pré-renderizada saiu com erro de renderização.
 *
 * Quando um componente quebra no servidor, o React não derruba a página: troca
 * o trecho por um marcador `<!--$!-->` (renderizar no cliente) e a resposta
 * segue com status 200, então o pré-render do TanStack não percebe. O HTML
 * publicado sairia sem aquele conteúdo (sem SEO, vazio até o JS carregar).
 */
import { readFile } from "node:fs/promises";
import { findHtmlFiles } from "./lib/html-files.mjs";

const CLIENT_RENDER_MARKER = "<!--$!-->";

const files = await findHtmlFiles();
const broken = [];
for (const file of files) {
  if ((await readFile(file, "utf8")).includes(CLIENT_RENDER_MARKER)) {
    broken.push(file);
  }
}

if (broken.length > 0) {
  throw new Error(
    `Pré-render com erro (veja "Error in renderToReadableStream" no log) em:\n${broken.join("\n")}`,
  );
}
console.log(
  `[prerender] ${String(files.length)} páginas renderizadas sem erro.`,
);
