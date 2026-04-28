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

// Use a path filter (not app.use("/lynx", ...)) so the original
// req.url including the /lynx prefix is forwarded as-is.
app.use(
  createProxyMiddleware({
    pathFilter: ["/lynx", "/lynx/**"],
    target: LYNX_TARGET,
    changeOrigin: true,
    ws: true,
    xfwd: true,
  }),
);

app.use(express.static(path.resolve(__dirname), { extensions: ["html"] }));

app.listen(port, () => {
  console.log(`offsetworks listening on :${port}, /lynx → ${LYNX_TARGET}`);
});
