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

// Language URL aliases — /es and /en serve the main index.html.
// main.js reads window.location.pathname to set the initial language.
app.get(["/es", "/es/", "/en", "/en/"], (req, res) => {
  res.sendFile(path.resolve(__dirname, "index.html"));
});

app.use(express.static(path.resolve(__dirname), { extensions: ["html"] }));

app.listen(port, () => {
  console.log(`offsetworks listening on :${port}, /lynx → ${LYNX_TARGET}`);
});
