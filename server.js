// Tiny Express server that:
//   - serves the static offsetworks.xyz HTML/CSS/JS
//   - reverse-proxies /lynx/* to the lynx Next.js service on Railway
//
// The lynx app is built with basePath: "/lynx" so all of its internal
// routes/assets/cookies are scoped under /lynx, and the proxy preserves
// the prefix when forwarding upstream.

const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

const LYNX_TARGET =
  process.env.LYNX_TARGET ||
  "https://lynx-production-9436.up.railway.app";

app.use(
  "/lynx",
  createProxyMiddleware({
    target: LYNX_TARGET,
    changeOrigin: true,
    // Express strips the /lynx mount prefix before passing to the proxy,
    // so we re-add it here to match the lynx app's basePath.
    pathRewrite: (p) => "/lynx" + p,
    ws: true,
    xfwd: true,
  }),
);

app.use(express.static(path.resolve(__dirname), { extensions: ["html"] }));

app.listen(port, () => {
  console.log(`offsetworks listening on :${port}, /lynx → ${LYNX_TARGET}`);
});
