/**
 * Injeta a Content-Security-Policy em cada HTML gerado em `dist/client`.
 *
 * O site vai para o GitHub Pages, que não aceita headers customizados: a
 * política precisa ir numa <meta http-equiv>. Ela é montada depois do build
 * porque um dos scripts inline (a hidratação do TanStack) muda a cada página,
 * e o `head()` das rotas não conhece esse conteúdo. Cada página recebe os
 * hashes dos próprios scripts inline, sem `'unsafe-inline'` em `script-src`.
 *
 * O build falha se o HTML tiver algo que a política não cobre (ex.: atributo
 * `on*=`), para ninguém quebrar a CSP sem perceber.
 */
import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { findHtmlFiles } from "./lib/html-files.mjs";

/**
 * Google Analytics 4 (só carrega após consentimento, no site publicado),
 * conforme a orientação de CSP do próprio Google para o GA4.
 */
const GA_SCRIPT = "https://www.googletagmanager.com";
const GA_IMG = [
  "https://*.google-analytics.com",
  "https://*.googletagmanager.com",
];
const GA_CONNECT = [
  "https://*.google-analytics.com",
  "https://*.analytics.google.com",
  "https://*.googletagmanager.com",
];

/** Uma tag <script> com atributos (grupo 1) e conteúdo (grupo 2). */
const SCRIPT_TAG = /<script\b([^>]*)>([\s\S]*?)<\/script>/g;

/** Tipos de <script> que não executam (dados), fora do `script-src`. */
const DATA_SCRIPT_TYPES = new Set(["application/ld+json", "application/json"]);

/** @param {string[]} scriptHashes */
function buildPolicy(scriptHashes) {
  const directives = [
    "default-src 'self'",
    `script-src 'self' ${scriptHashes.map((hash) => `'${hash}'`).join(" ")} ${GA_SCRIPT}`,
    "style-src 'self'",
    // Só atributos style="" (variáveis CSS das animações vindas do SSR); não
    // executam código. Tags <style> continuam bloqueadas pelo style-src.
    "style-src-attr 'unsafe-inline'",
    `img-src 'self' data: ${GA_IMG.join(" ")}`,
    `connect-src 'self' ${GA_CONNECT.join(" ")}`,
    "font-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'none'",
  ];
  return directives.join("; ");
}

/**
 * O navegador calcula o hash sobre o texto do script como o parser de HTML o
 * entrega, não sobre os bytes do arquivo: quebras de linha viram "\n" e o
 * caractere NUL vira U+FFFD (a hidratação do TanStack tem NUL nos ids).
 * @param {string} content
 */
function toParsedScriptText(content) {
  return content.replace(/\r\n?/g, "\n").replaceAll("\0", "�");
}

/** @param {string} content */
function sha256(content) {
  const digest = createHash("sha256")
    .update(toParsedScriptText(content), "utf8")
    .digest("base64");
  return `sha256-${digest}`;
}

/**
 * Hashes dos scripts inline executáveis (sem `src`, tipo JS).
 * @param {string} html
 */
function inlineScriptHashes(html) {
  const hashes = new Set();
  for (const [, attributes = "", content = ""] of html.matchAll(SCRIPT_TAG)) {
    if (/\bsrc\s*=/.test(attributes)) {
      continue;
    }
    const type = /\btype\s*=\s*"([^"]*)"/.exec(attributes)?.[1];
    if (type && DATA_SCRIPT_TYPES.has(type)) {
      continue;
    }
    hashes.add(sha256(content));
  }
  return [...hashes];
}

/** @param {string} file */
async function addPolicy(file) {
  const html = await readFile(file, "utf8");

  if (html.includes('http-equiv="Content-Security-Policy"')) {
    throw new Error(`${file}: já tem uma meta CSP.`);
  }
  // Handlers inline (onclick="…") exigiriam 'unsafe-inline': não são
  // permitidos. O conteúdo dos <script> fica de fora da busca (é código, não tag).
  const markup = html.replace(SCRIPT_TAG, "");
  if (/<[a-z][^>]*\son[a-z]+\s*=/i.test(markup)) {
    throw new Error(
      `${file}: atributo de evento inline (on*=) não é permitido pela CSP.`,
    );
  }

  const headStart = /<head[^>]*>/.exec(html);
  if (!headStart) {
    throw new Error(`${file}: <head> não encontrado.`);
  }

  // Primeiro elemento do <head>: a meta só vale para o que vem depois dela.
  const meta = `<meta http-equiv="Content-Security-Policy" content="${buildPolicy(inlineScriptHashes(html))}">`;
  const insertAt = headStart.index + headStart[0].length;
  const output = html.slice(0, insertAt) + meta + html.slice(insertAt);

  // O navegador só procura o charset nos primeiros 1024 bytes: a meta CSP,
  // vindo antes, não pode empurrá-lo para fora (a página viraria Windows-1252).
  const charsetIndex = output.search(/<meta charset/i);
  const charsetAt = Buffer.byteLength(output.slice(0, charsetIndex), "utf8");
  if (charsetIndex < 0 || charsetAt > 1024) {
    throw new Error(
      `${file}: <meta charset> fora dos primeiros 1024 bytes após a CSP.`,
    );
  }
  await writeFile(file, output);
}

const files = await findHtmlFiles();
await Promise.all(files.map(addPolicy));
console.log(`[csp] política adicionada a ${String(files.length)} páginas.`);
