# Gunterwill.github.io

Personal site at damirsarsengaliyev.com: an interactive graph you navigate by dragging toward nodes.

- `content.js`: all the text and the node tree. Add or edit nodes here; a node with `soon: true` shows "Coming soon".
- `app.js`: layout, camera, drag/hover/keyboard input, panel, and the particle background.
- `style.css`: styles.

After changing files, bump the `?v=` numbers in `index.html` so browsers don't serve stale copies.

Preview locally: `python3 -m http.server 4173`, then open http://localhost:4173.
