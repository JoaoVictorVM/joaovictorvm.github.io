/**
 * Gera o que o GitHub Pages publica: uma página de redirecionamento para cada
 * página do site, apontando para o domínio oficial.
 *
 * O GitHub Pages não permite 301, então o redirecionamento fica no HTML. Cada
 * página responde 200 com `canonical` para o buscador ligar o endereço antigo ao
 * novo. O `404.html` cobre os demais caminhos, como links diretos para arquivos.
 */
import { mkdir, rm, writeFile } from "node:fs/promises";
import { dirname, join, relative, sep } from "node:path";
import { findHtmlFiles, OUTPUT_DIR } from "./lib/html-files.mjs";

/** Igual a `siteConfig.url` em src/shared/config/site.ts. */
const SITE_URL = "https://joaovictorvm.com";
const REDIRECTS_DIR = "dist/github-pages";
const NOT_FOUND_FILE = "404.html";

/** Mantém o caminho, os parâmetros e a âncora do endereço aberto. */
const REDIRECT_SCRIPT = `location.replace(${JSON.stringify(SITE_URL)}+location.pathname.replace(/\\/+$/,"")+location.search+location.hash);`;

/**
 * @param {string} file HTML relativo à saída do build (ex.: `about/index.html`)
 * @returns {string} Rota da página (ex.: `/about`), ou `/` na home
 */
function routeOf(file) {
  const path = file
    .split(sep)
    .join("/")
    .replace(/(^|\/)index\.html$/, "");
  return `/${path}`;
}

/**
 * @param {string} target URL de destino quando o JavaScript estiver desligado
 * @param {string} head Metadados específicos da página
 * @returns {string}
 */
function redirectPage(target, head) {
  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<title>João Victor Ventura Martins</title>
${head}
<script>${REDIRECT_SCRIPT}</script>
<meta http-equiv="refresh" content="0; url=${target}">
</head>
<body>
<p>Este site mudou para <a href="${target}">${SITE_URL.replace("https://", "")}</a>.</p>
</body>
</html>
`;
}

/** @param {string} file @param {string} content */
async function writeRedirect(file, content) {
  const path = join(REDIRECTS_DIR, file);
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, content);
}

const pages = (await findHtmlFiles())
  .map((file) => relative(OUTPUT_DIR, file))
  .filter((file) => file !== NOT_FOUND_FILE);

await rm(REDIRECTS_DIR, { recursive: true, force: true });
await Promise.all(
  pages.map((file) => {
    const target = `${SITE_URL}${routeOf(file)}`;
    return writeRedirect(
      file,
      redirectPage(target, `<link rel="canonical" href="${target}">`),
    );
  }),
);
await writeRedirect(
  NOT_FOUND_FILE,
  redirectPage(`${SITE_URL}/`, `<meta name="robots" content="noindex">`),
);
await writeRedirect(".nojekyll", "");

console.log(
  `[github-pages] ${String(pages.length)} redirecionamentos para ${SITE_URL}.`,
);
