// Tiny Express server that:
//   - serves the static offsetworks.xyz HTML/CSS/JS
//   - reverse-proxies /lynx/* to the lynx Next.js service on Railway
//
// The lynx app is built with basePath: "/lynx" so all of its internal
// routes/assets/cookies are scoped under /lynx, and the proxy forwards
// the full path including the prefix.

const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

const LYNX_TARGET =
  process.env.LYNX_TARGET ||
  "https://lynx-production-9436.up.railway.app";

const UMO_TARGET =
  process.env.UMO_TARGET ||
  "https://umo.livemoments.online";

// Match /lynx or /lynx/...
app.use((req, res, next) => {
  if (req.path === "/lynx" || req.path.startsWith("/lynx/")) {
    return lynxProxy(req, res, next);
  }
  next();
});

// Match /umo-frame or /umo-frame/... — proxy to umo.livemoments.online and
// strip frame-blocking response headers so we can iframe it from the rocola.
app.use((req, res, next) => {
  if (req.path === "/umo-frame" || req.path.startsWith("/umo-frame/")) {
    return umoProxy(req, res, next);
  }
  next();
});

const lynxProxy = createProxyMiddleware({
  target: LYNX_TARGET,
  changeOrigin: true,
  ws: true,
  xfwd: true,
});

// Strip frame-blocking headers AND inject <base href> into HTML responses so
// the proxied page's relative asset paths (/static/css/..., /static/js/...)
// resolve to umo's origin instead of offsetworks.xyz.
const umoProxy = createProxyMiddleware({
  target: UMO_TARGET,
  changeOrigin: true,
  pathRewrite: { "^/umo-frame": "" },
  selfHandleResponse: true,
  on: {
    proxyRes: (proxyRes, req, res) => {
      const headers = { ...proxyRes.headers };
      delete headers["x-frame-options"];
      delete headers["content-security-policy"];
      delete headers["content-security-policy-report-only"];

      const contentType = proxyRes.headers["content-type"] || "";
      if (contentType.includes("text/html")) {
        const chunks = [];
        proxyRes.on("data", (c) => chunks.push(c));
        proxyRes.on("end", () => {
          let html = Buffer.concat(chunks).toString("utf8");
          html = html.replace(
            /<head([^>]*)>/i,
            `<head$1><base href="${UMO_TARGET}/">`
          );
          delete headers["content-length"];
          res.writeHead(proxyRes.statusCode || 200, headers);
          res.end(html);
        });
      } else {
        res.writeHead(proxyRes.statusCode || 200, headers);
        proxyRes.pipe(res);
      }
    },
  },
});

// Language URL aliases — /es and /en serve index.html with locale-aware
// SEO tags swapped server-side, so crawlers and social cards get the right
// title/description/og:locale even before JS runs.
const fs = require("fs");
const indexPath = path.resolve(__dirname, "index.html");

const ES_META = {
  title: "offset works — productos digitales que funcionan",
  description:
    "Estudio boutique de diseño y desarrollo para startups, creativos y fundadores. Sitios web, apps web y experiencias inmersivas — hechas desde cero, lanzadas en semanas.",
  canonical: "https://offsetworks.xyz/es",
  ogUrl: "https://offsetworks.xyz/es",
  ogLocale: "es_GT",
  ogLocaleAlt: "en_US",
  htmlLang: "es",
};

function renderLocale(req, res, locale) {
  let html = fs.readFileSync(indexPath, "utf8");
  if (locale === "es") {
    html = html
      .replace('<html lang="en">', `<html lang="${ES_META.htmlLang}">`)
      .replace(
        /<title>[^<]*<\/title>/,
        `<title>${ES_META.title}</title>`
      )
      .replace(
        /<meta name="description" content="[^"]*">/,
        `<meta name="description" content="${ES_META.description}">`
      )
      .replace(
        /<link rel="canonical" href="[^"]*">/,
        `<link rel="canonical" href="${ES_META.canonical}">`
      )
      .replace(
        /<meta property="og:title" content="[^"]*">/,
        `<meta property="og:title" content="${ES_META.title}">`
      )
      .replace(
        /<meta property="og:description" content="[^"]*">/,
        `<meta property="og:description" content="${ES_META.description}">`
      )
      .replace(
        /<meta property="og:url" content="[^"]*">/,
        `<meta property="og:url" content="${ES_META.ogUrl}">`
      )
      .replace(
        /<meta property="og:locale" content="[^"]*">/,
        `<meta property="og:locale" content="${ES_META.ogLocale}">`
      )
      .replace(
        /<meta property="og:locale:alternate" content="[^"]*">/,
        `<meta property="og:locale:alternate" content="${ES_META.ogLocaleAlt}">`
      )
      .replace(
        /<meta name="twitter:title" content="[^"]*">/,
        `<meta name="twitter:title" content="${ES_META.title}">`
      )
      .replace(
        /<meta name="twitter:description" content="[^"]*">/,
        `<meta name="twitter:description" content="${ES_META.description}">`
      );
  }
  res.type("html").send(html);
}

app.get(["/es", "/es/"], (req, res) => renderLocale(req, res, "es"));
app.get(["/en", "/en/"], (req, res) => renderLocale(req, res, "en"));

app.use(express.static(path.resolve(__dirname), { extensions: ["html"] }));

app.listen(port, () => {
  console.log(`offsetworks listening on :${port}, /lynx → ${LYNX_TARGET}`);
});
