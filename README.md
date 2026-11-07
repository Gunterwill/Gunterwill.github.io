# Gunterwill.github.io

Personal site at damirsarsengaliyev.com: an interactive graph you navigate by dragging toward nodes.

- `content.js`: all the text and the node tree. Add or edit nodes here; a node with `soon: true` shows "Coming soon".
- `content.ru.js`: Russian text for the same nodes, keyed by path. Anything missing falls back to English.
- `app.js`: layout, camera, drag/hover/keyboard input, panel, and the particle background.
- `style.css`: styles. `DESIGN.md` describes the colors, type, and rules behind them.
- `favicon.svg`, `og-image.png`: the browser tab icon and the preview card shown when the link is shared.

After changing files, bump the `?v=` numbers in `index.html` so browsers don't serve stale copies.

Preview locally: `python3 -m http.server 4173`, then open http://localhost:4173.
