(() => {
  'use strict';

  const ROOT = window.GRAPH;
  const $ = (s) => document.querySelector(s);
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const easeOut = (t) => 1 - Math.pow(1 - t, 3);
  const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Phones and tablets get a lighter render path: no per-node blur, a
  // lower-resolution background at ~30fps, and fewer particles.
  const lowPower = matchMedia('(hover: none), (pointer: coarse), (max-width: 759px)').matches;
  document.documentElement.classList.toggle('low-power', lowPower);

  // ---------- language ----------

  const RU = window.GRAPH_RU || {};
  const UI = {
    en: {
      explore: 'Explore',
      soon: 'Coming soon',
      soonNote: 'This branch of the graph is still growing. Check back later.',
      release: 'Release to enter',
      clickOrDrag: 'click or drag',
      inside: (k) => `${k} nodes inside`,
      tipDeeper: 'drag <kbd>↓</kbd> to go deeper',
      tipSiblings: '<kbd>←</kbd> <kbd>→</kbd> for neighbours',
      tipBack: '<kbd>↑</kbd> to go back',
      hintDesktop: 'Hold and drag toward a node, or click it · arrow keys work too',
      hintTouch: 'Swipe toward a node, or tap it',
      goTo: 'Go to',
      comingSoon: 'coming soon',
      email: 'Email',
      cv: 'CV',
      switchTo: 'Переключить на русский',
    },
    ru: {
      explore: 'Разделы',
      soon: 'Скоро',
      soonNote: 'Эта ветка графа ещё растёт. Загляните позже.',
      release: 'Отпустите, чтобы перейти',
      clickOrDrag: 'нажмите или потяните',
      inside: (k) => `${k} ${k % 10 === 1 && k % 100 !== 11 ? 'узел' : [2, 3, 4].includes(k % 10) && ![12, 13, 14].includes(k % 100) ? 'узла' : 'узлов'} внутри`,
      tipDeeper: 'потяните <kbd>↓</kbd>, чтобы углубиться',
      tipSiblings: '<kbd>←</kbd> <kbd>→</kbd> — соседние',
      tipBack: '<kbd>↑</kbd> — назад',
      hintDesktop: 'Зажмите и потяните к узлу или нажмите на него · работают стрелки',
      hintTouch: 'Проведите к узлу или нажмите на него',
      goTo: 'Перейти:',
      comingSoon: 'скоро',
      email: 'Почта',
      cv: 'Резюме',
      switchTo: 'Switch to English',
    },
  };
  let lang = (() => {
    const q = new URLSearchParams(location.search).get('lang');
    if (q === 'ru' || q === 'en') return q;
    try { return localStorage.getItem('lang') === 'ru' ? 'ru' : 'en'; } catch (e) { return 'en'; }
  })();
  const ui = () => UI[lang];

  // A node's text in the current language; Russian falls back to English.
  function tx(n, field) {
    const o = lang === 'ru' ? RU[n.path] : null;
    if (o && o[field] !== undefined) {
      if (field === 'links') return (n.links || []).map((l, i) => ({ ...l, label: o.links[i] ?? l.label }));
      return o[field];
    }
    return n[field];
  }
  const L = (n) => tx(n, 'label');

  const ICONS = {
    start: '<path d="M12 3c.6 4.6 3.4 8.4 9 9-5.6.6-8.4 3.4-9 9-.6-5.6-3.4-8.4-9-9 5.6-.6 8.4-4.4 9-9z"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.2 3.6-7 8-7s8 2.8 8 7"/>',
    layers: '<path d="M12 3 2 8l10 5 10-5-10-5z"/><path d="m2 12 10 5 10-5"/><path d="m2 16 10 5 10-5"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    file: '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6"/><path d="M8 13h8M8 17h5"/>',
    cap: '<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c3 2 9 2 12 0v-5"/>',
    briefcase: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/><path d="M3 13h18"/>',
    bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
    heart: '<path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/>',
    graph: '<circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="12" cy="18" r="2.5"/><path d="M8.5 6h7M7.2 8.2l3.6 7.6M16.8 8.2l-3.6 7.6"/>',
    chart: '<path d="M3 20h18"/><path d="m5 16 4.5-5.5 3.5 3 6-7.5"/>',
    steer: '<path d="M4 17c4 0 5-10 9-10h7"/><path d="m16 3 4 4-4 4"/>',
    smile: '<circle cx="12" cy="12" r="9"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9.5h.01M15 9.5h.01"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    branch: '<circle cx="6" cy="5" r="2"/><circle cx="6" cy="19" r="2"/><circle cx="18" cy="7" r="2"/><path d="M6 7v10M18 9c0 4-6 4-11.2 8.6"/>',
    linkedin: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 11v6M8 7.5v.01M12 17v-6M12 13.5a2.5 2.5 0 0 1 5 0V17"/>',
    code: '<path d="m8 7-5 5 5 5M16 7l5 5-5 5"/>',
    shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="m9 12 2 2 4-4"/>',
    database: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>',
    flask: '<path d="M9 3h6M10 3v6L4.5 18.5A1.7 1.7 0 0 0 6 21h12a1.7 1.7 0 0 0 1.5-2.5L14 9V3"/><path d="M7 15h10"/>',
    mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
    home: '<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-5h4v5"/>',
    dot: '<circle cx="12" cy="12" r="3"/>',
  };

  // ---------- tree ----------

  const all = [];
  const byPath = new Map();
  (function walk(n, parent, depth) {
    n.parent = parent;
    n.depth = depth;
    n.children = n.children || [];
    n.path = parent ? `${parent.path}/${n.id}` : '';
    all.push(n);
    byPath.set(n.path, n);
    n.children.forEach((c) => walk(c, n, depth + 1));
  })(ROOT, null, 0);

  // Children sit centred under their parent. Only the focus, its children,
  // its parent and its siblings are ever visible, so cousins may overlap.
  const LEVEL = 220;
  const GAP = [0, 215, 185];
  const RADIUS = [60, 44, 34];
  (function place(n) {
    n.dy = n.depth * LEVEL;
    n.r = RADIUS[Math.min(n.depth, 2)];
    const gap = GAP[Math.min(n.depth + 1, GAP.length - 1)];
    n.children.forEach((c, i) => {
      c.dx = n.dx + (i - (n.children.length - 1) / 2) * gap;
      place(c);
    });
  })(Object.assign(ROOT, { dx: 0 }));

  // Phones only ever show the focus and its children, so children are laid
  // out in balanced rows of up to three under their parent to stay readable.
  // (Rows already show the hierarchy, so phones skip the static edge lines.)
  const M_COLS = 3, M_COLGAP = 112, M_ROW1 = 145, M_ROWGAP = 120;
  const M_FOCUS_R = 50; // on-screen radius of the focused node on phones
  (function placeMobile(n) {
    const k = n.children.length;
    const perRow = Math.ceil(k / Math.ceil(k / M_COLS)); // balanced: 4 -> 2+2, 5 -> 3+2
    n.children.forEach((c, i) => {
      const row = Math.floor(i / perRow);
      const inRow = Math.min(perRow, k - row * perRow);
      c.mx = n.mx + ((i % perRow) - (inRow - 1) / 2) * M_COLGAP;
      c.my = n.my + M_ROW1 + row * M_ROWGAP;
      placeMobile(c);
    });
  })(Object.assign(ROOT, { mx: 0, my: 0 }));

  function hashOf(n) { return '#' + (n.path || '/'); }
  function fromHash() {
    const p = decodeURIComponent(location.hash.replace(/^#/, '')).replace(/\/$/, '');
    return byPath.get(p) || ROOT;
  }

  function neighbors(f) {
    const list = [...f.children];
    if (f.parent) {
      list.push(f.parent);
      const sib = f.parent.children;
      const i = sib.indexOf(f);
      if (i > 0) list.push(sib[i - 1]);
      if (i < sib.length - 1) list.push(sib[i + 1]);
    }
    return list;
  }
  function sibling(f, step) {
    if (!f.parent) return null;
    const sib = f.parent.children;
    return sib[sib.indexOf(f) + step] || null;
  }

  // Straight segment from rim to rim, as a cubic so it can share the bezier helpers.
  function vr(n) { return mobile && n === focus ? M_FOCUS_R : n.r; }
  function curve(a, b) {
    const dx = b.x - a.x, dy = b.y - a.y;
    const len = Math.hypot(dx, dy) || 1;
    const ux = dx / len, uy = dy / len;
    const p0 = { x: a.x + ux * (vr(a) + 6), y: a.y + uy * (vr(a) + 6) };
    const p3 = { x: b.x - ux * (vr(b) + 6), y: b.y - uy * (vr(b) + 6) };
    const lerp = (t) => ({ x: p0.x + (p3.x - p0.x) * t, y: p0.y + (p3.y - p0.y) * t });
    return [p0, lerp(1 / 3), lerp(2 / 3), p3];
  }
  function curveD(c) {
    return `M${c[0].x},${c[0].y} C${c[1].x},${c[1].y} ${c[2].x},${c[2].y} ${c[3].x},${c[3].y}`;
  }
  function cubicAt(c, t) {
    const u = 1 - t;
    const a = u * u * u, b = 3 * u * u * t, d = 3 * u * t * t, e = t * t * t;
    return {
      x: a * c[0].x + b * c[1].x + d * c[2].x + e * c[3].x,
      y: a * c[0].y + b * c[1].y + d * c[2].y + e * c[3].y,
    };
  }

  // ---------- DOM ----------

  const stage = $('#stage');
  const world = $('#world');
  const edgesSvg = $('#edges');
  const edgeLayer = $('#edge-layer');
  const nodesEl = $('#nodes');
  const ghostPath = $('#ghost-path');
  const chargePath = $('#charge-path');
  const ghost = $('#ghost');
  const ghostTitle = ghost.querySelector('b');
  const ghostSub = ghost.querySelector('span');
  const traveler = $('#traveler');
  const panel = $('#panel');
  const panelScroll = panel.querySelector('.panel-scroll');
  const beam = $('#beam');
  const beamGrad = $('#beam-grad');
  const beamCone = $('#beam-cone');
  const beamL1 = $('#beam-l1');
  const beamL2 = $('#beam-l2');
  const crumbs = $('.crumbs');
  const hint = $('.hint');
  const edgeHints = {
    up: $('.edge-hint.up'),
    left: $('.edge-hint.left'),
    right: $('.edge-hint.right'),
  };

  const SVG_NS = 'http://www.w3.org/2000/svg';
  let suppressClick = false;

  all.forEach((n) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `node d${Math.min(n.depth, 2)}${n.soon ? ' is-soon' : ''}`;
    btn.style.setProperty('--r', `${n.r}px`);
    btn.style.setProperty('--fs', (M_FOCUS_R / n.r).toFixed(3));
    btn.style.setProperty('--delay', `${(-Math.random() * 6).toFixed(2)}s`);
    btn.innerHTML = `<span class="orb"><svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[n.icon] || ICONS.dot}</svg></span><span class="label"></span>`;
    btn.addEventListener('click', () => {
      if (suppressClick) return;
      go(n);
    });
    btn.addEventListener('pointerenter', () => { hoverNode = n; });
    btn.addEventListener('pointerleave', () => { if (hoverNode === n) hoverNode = null; });
    nodesEl.appendChild(btn);
    n.el = btn;

    if (n.parent) {
      const path = document.createElementNS(SVG_NS, 'path');
      path.setAttribute('class', 'edge');
      edgeLayer.appendChild(path);
      n.edgeEl = path;
    }
  });

  // ---------- viewport + camera ----------

  let W = 0, H = 0, mobile = false;
  let focus = ROOT;
  const cam = { x: 0, y: 0, s: 1 };

  // Where the focused node sits on screen. Nodes with children keep the panel
  // to their right; leaves (and phones) project it downward instead.
  function panelBelow() { return mobile || !focus.children.length; }
  function anchor() {
    if (mobile) return { x: W / 2, y: Math.max(160, H * 0.22) };
    return focus.children.length ? { x: W * 0.37, y: H * 0.42 } : { x: W / 2, y: H * 0.28 };
  }
  const anc = { x: 0, y: 0 };
  const CAM_MS = 720;
  let tween = null;
  function startTween(fromMotion) {
    tween = {
      x: cam.x, y: cam.y, s: cam.s, ax: anc.x, ay: anc.y,
      t0: performance.now(),
      dur: reduced ? 1 : CAM_MS,
      ease: fromMotion ? easeOut : easeInOut,
    };
  }
  // Zoom out just enough for the focused node's children to fit on screen.
  function zoom() {
    if (mobile) return clamp(Math.min(W / 360, H / 740), 0.8, 1.1);
    const base = W < 1100 ? 1 : 1.18;
    if (!focus.children.length) return base;
    const a = anchor();
    let left = 1, right = 1;
    for (const c of focus.children) {
      left = Math.max(left, focus.x - c.x + 64);
      right = Math.max(right, c.x - focus.x + 64);
    }
    const fit = Math.min((a.x - 16) / left, (W - a.x - 16) / right);
    return clamp(Math.min(base, fit), 0.6, base);
  }
  function toScreen(p) {
    return { x: anc.x + (p.x - cam.x) * cam.s, y: anc.y + (p.y - cam.y) * cam.s };
  }
  function dragDistance() { return mobile ? 130 : 190; }

  function applyLayout() {
    all.forEach((n) => {
      n.x = mobile ? n.mx : n.dx;
      n.y = mobile ? n.my : n.dy;
      n.el.style.left = `${n.x}px`;
      n.el.style.top = `${n.y}px`;
    });
  }

  let layoutMobile = null;
  function resize() {
    W = innerWidth;
    H = innerHeight;
    mobile = W < 760;
    document.documentElement.classList.toggle('is-mobile', mobile);
    if (mobile !== layoutMobile) {
      layoutMobile = mobile;
      applyLayout();
      refreshNodes();
      cam.x = focus.x;
      cam.y = focus.y;
      cam.s = zoom();
      tween = null;
    }
    Object.assign(anc, anchor());
    sceneDirty = true;
    bg.resize();
    if (panelOpen) positionPanel();
  }

  // ---------- focus + panel ----------

  let panelOpen = false;
  let panelToken = 0;
  let panelBox = null;
  let hasMoved = false;

  function go(n, { push = true, instant = false } = {}) {
    if (!n) return;
    const changed = n !== focus;
    if (n.parent) n.parent.lastChild = n;
    focus = n;
    setTitle();
    if (push && changed) history.pushState(null, '', hashOf(n));
    if (instant) {
      cam.x = n.x;
      cam.y = n.y;
      cam.s = zoom();
      Object.assign(anc, anchor());
    } else {
      // Coming out of a drag the camera is already moving, so ease out;
      // from a click or key press, ease in and out.
      startTween(drag.moved || wheel.active);
    }
    if (changed && !instant && !hasMoved) {
      hasMoved = true;
      hint.classList.add('gone');
    }
    refreshNodes();
    renderCrumbs();
    if (changed || instant) openPanel(n, instant);
  }

  function refreshNodes() {
    const trail = new Set();
    for (let a = focus; a; a = a.parent) trail.add(a);
    const opacity = new Map();
    all.forEach((n) => {
      let o = 0;
      if (n === focus || n.parent === focus) o = 1;
      else if (mobile) o = 0;
      else if (n === focus.parent) o = 0.75;
      else if (focus.parent && n.parent === focus.parent) o = 0.6;
      opacity.set(n, o);
      n.el.style.setProperty('--o', o);
      n.el.classList.toggle('hidden', o === 0);
      n.el.classList.toggle('is-focus', n === focus);
      n.el.classList.toggle('is-trail', trail.has(n) && n !== focus);
      n.el.tabIndex = o ? 0 : -1;
    });
    all.forEach((n) => {
      if (!n.edgeEl) return;
      n.edgeEl.setAttribute('d', curveD(curve(n.parent, n)));
      n.edgeEl.classList.toggle('trail', trail.has(n));
      n.edgeEl.classList.toggle('near', n.parent === focus);
      n.edgeEl.style.opacity = Math.min(opacity.get(n), opacity.get(n.parent)) * (n.parent === focus ? 1 : 0.8);
    });
  }

  function renderCrumbs() {
    const chain = [];
    for (let a = focus; a; a = a.parent) chain.unshift(a);
    crumbs.innerHTML = chain
      .map((n, i) => `${i ? '<span aria-hidden="true">/</span>' : ''}<button type="button" data-path="${n.path}"${n === focus ? ' aria-current="page"' : ''}>${L(n)}</button>`)
      .join('');
  }

  function render(n) {
    let i = 0;
    const st = () => `style="--i:${i++}"`;
    const out = [];
    const t = ui();
    out.push(`<div class="p-kicker" ${st()}>${tx(n, 'kicker') || (n.parent ? L(n.parent) : '')}</div>`);
    out.push(`<h2 class="p-title" ${st()}>${tx(n, 'title') || L(n)}</h2>`);
    const sub = tx(n, 'subtitle');
    if (sub) out.push(`<p class="p-sub" ${st()}>${sub}</p>`);
    if (n.soon) {
      out.push(`<div class="soon" ${st()}><span class="soon-text">${t.soon}</span><p>${tx(n, 'soonNote') || t.soonNote}</p></div>`);
    }
    const bullets = tx(n, 'bullets');
    if (bullets) {
      out.push(`<ul class="p-bullets" ${st()}>${bullets.map((b) => `<li>${b}</li>`).join('')}</ul>`);
    }
    (tx(n, 'body') || []).forEach((p) => out.push(`<p class="p-body" ${st()}>${p}</p>`));
    const list = tx(n, 'list');
    if (list) {
      out.push(`<ul class="p-list" ${st()}>${list.map((it) => `<li><b>${it.title}</b>${it.meta ? `<span>${it.meta}</span>` : ''}${it.text ? `<p>${it.text}</p>` : ''}</li>`).join('')}</ul>`);
    }
    const groups = tx(n, 'groups');
    if (groups) {
      out.push(`<div class="p-groups" ${st()}>${groups.map((g) => `<div><h4>${g.name}</h4><div class="chips">${g.items.map((x) => `<span class="chip">${x}</span>`).join('')}</div></div>`).join('')}</div>`);
    }
    const tags = tx(n, 'tags');
    if (tags) {
      out.push(`<div class="p-tags chips" ${st()}>${tags.map((x) => `<span class="chip">${x}</span>`).join('')}</div>`);
    }
    const links = (tx(n, 'links') || []).filter((l) => l.href);
    if (links.length) {
      out.push(`<div class="p-links" ${st()}>${links.map((l, j) => {
        const ext = !l.href.startsWith('mailto:');
        const attrs = l.download ? ' download' : ext ? ' target="_blank" rel="noopener"' : '';
        return `<a class="btn${j === 0 ? ' primary' : ''}" href="${l.href}"${attrs}>${l.label}${ext && !l.download ? ' ↗' : ''}</a>`;
      }).join('')}</div>`);
    }
    if (n.children.length) {
      out.push(`<div class="p-explore" ${st()}><span class="lbl">${t.explore}</span><div class="chips">${n.children.map((c) => `<button type="button" class="chip go" data-path="${c.path}">${L(c)}</button>`).join('')}</div></div>`);
    }
    const tips = [];
    if (n.children.length) tips.push(t.tipDeeper);
    if (sibling(n, -1) || sibling(n, 1)) tips.push(t.tipSiblings);
    if (n.parent) tips.push(t.tipBack);
    if (tips.length) out.push(`<p class="p-hint" ${st()}>${tips.join(' · ')}</p>`);
    return out.join('');
  }

  function openPanel(n, instant) {
    const token = ++panelToken;
    panel.classList.remove('open');
    beam.classList.remove('on');
    panelOpen = false;
    setTimeout(() => {
      if (token !== panelToken) return;
      panelScroll.innerHTML = render(n);
      panelScroll.scrollTop = 0;
      positionPanel();
      void panel.offsetWidth;
      panel.classList.add('open');
      beam.classList.toggle('on', !(mobile && n.children.length));
      panelOpen = true;
    }, instant ? 80 : Math.round(CAM_MS * 0.8));
  }

  function positionPanel() {
    panel.classList.toggle('below', panelBelow());
    if (mobile) {
      panel.style.left = panel.style.top = panel.style.width = '';
      const a = anchor();
      const s = zoom();
      let bottom = a.y + (M_FOCUS_R + 52) * s;
      if (focus.children.length) {
        const rows = Math.ceil(focus.children.length / M_COLS);
        bottom = a.y + (M_ROW1 + (rows - 1) * M_ROWGAP + focus.children[0].r + 50) * s;
      }
      panel.style.maxHeight = `${Math.max(H * 0.28, H - bottom - 24)}px`;
    } else if (panelBelow()) {
      const a = anchor();
      const width = Math.min(600, W - 64);
      const top = a.y + focus.r * zoom() + 64;
      panel.style.left = `${(W - width) / 2}px`;
      panel.style.top = `${top}px`;
      panel.style.width = `${width}px`;
      panel.style.maxHeight = `${Math.max(200, H - top - 28)}px`;
    } else {
      const a = anchor();
      const s = zoom();
      const left = Math.max(a.x + focus.r * s + 110, W * 0.5);
      const width = Math.min(460, W - left - 32);
      const top = Math.max(96, a.y - 200);
      const bottom = focus.children.length ? a.y + LEVEL * s - 70 : H - 32;
      panel.style.left = `${left}px`;
      panel.style.top = `${top}px`;
      panel.style.width = `${width}px`;
      panel.style.maxHeight = `${Math.max(240, bottom - top)}px`;
    }
    panelBox = { x: panel.offsetLeft, y: panel.offsetTop, w: panel.offsetWidth, h: panel.offsetHeight };
    sceneDirty = true;
    panel.style.setProperty('--panel-h', `${panelBox.h + 70}px`);
  }

  panel.addEventListener('click', (e) => {
    const b = e.target.closest('[data-path]');
    if (b) go(byPath.get(b.dataset.path));
  });
  crumbs.addEventListener('click', (e) => {
    const b = e.target.closest('[data-path]');
    if (b) go(byPath.get(b.dataset.path));
  });
  $('.brand').addEventListener('click', (e) => {
    e.preventDefault();
    go(ROOT);
  });
  Object.entries(edgeHints).forEach(([, el]) => {
    el.addEventListener('click', () => go(el._node));
  });
  addEventListener('popstate', () => go(fromHash(), { push: false }));

  // ---------- input ----------

  const drag = { active: false, moved: false, sx: 0, sy: 0, vx: 0, vy: 0 };
  const wheel = { vx: 0, vy: 0, active: false, timer: 0, lockUntil: 0 };
  const mouse = { x: -9999, y: -9999, type: 'mouse', inStage: false };
  let hoverNode = null;
  const COMMIT = 0.55;

  // Offset from the focus toward n. On phones the parent and siblings are not
  // drawn; they live in tabs at the top, left and right edges, so use those directions.
  function towards(n) {
    if (mobile && n.parent !== focus) {
      if (n === focus.parent) return { x: 0, y: -260 };
      return { x: n === sibling(focus, -1) ? -260 : 260, y: 0 };
    }
    return { x: n.x - focus.x, y: n.y - focus.y };
  }

  // Which neighbour lies in the direction of (vx, vy), and how far along we are.
  function evaluate(vx, vy, minCos = 0.55) {
    const len = Math.hypot(vx, vy);
    if (len < 12) return { t: null, p: 0 };
    let best = null;
    let bestCos = minCos;
    for (const n of neighbors(focus)) {
      const d = towards(n);
      const c = (vx * d.x + vy * d.y) / (len * Math.hypot(d.x, d.y));
      if (c > bestCos) { bestCos = c; best = n; }
    }
    if (!best) return { t: null, p: 0 };
    const d = towards(best);
    const along = (vx * d.x + vy * d.y) / Math.hypot(d.x, d.y);
    return { t: best, p: clamp(along / dragDistance(), 0, 1) };
  }

  stage.addEventListener('pointerdown', (e) => {
    if (e.button !== 0) return;
    drag.active = true;
    drag.moved = false;
    drag.sx = e.clientX;
    drag.sy = e.clientY;
    drag.vx = drag.vy = 0;
    mouse.type = e.pointerType;
  });

  addEventListener('pointermove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.type = e.pointerType;
    mouse.inStage = e.target === stage || stage.contains(e.target);
    if (!drag.active) return;
    drag.vx = e.clientX - drag.sx;
    drag.vy = e.clientY - drag.sy;
    if (!drag.moved && Math.hypot(drag.vx, drag.vy) > 7) {
      drag.moved = true;
      stage.classList.add('dragging');
    }
  });

  function endDrag(commit) {
    if (!drag.active) return;
    if (drag.moved) {
      suppressClick = true;
      setTimeout(() => { suppressClick = false; }, 60);
      const before = focus;
      if (commit) {
        const { t, p } = evaluate(drag.vx, drag.vy);
        if (t && p >= COMMIT) go(t);
      }
      if (focus === before) startTween(true);
    }
    drag.active = false;
    drag.moved = false;
    drag.vx = drag.vy = 0;
    stage.classList.remove('dragging');
  }
  addEventListener('pointerup', () => endDrag(true));
  addEventListener('pointercancel', () => endDrag(false));
  addEventListener('blur', () => endDrag(false));
  document.addEventListener('pointerleave', () => { mouse.inStage = false; });

  stage.addEventListener('wheel', (e) => {
    e.preventDefault();
    if (e.ctrlKey) return;
    const now = performance.now();
    if (now < wheel.lockUntil) return;
    const k = e.deltaMode === 1 ? 16 : 1;
    wheel.vx += e.deltaX * k * 0.6;
    wheel.vy += e.deltaY * k * 0.6;
    wheel.active = true;
    clearTimeout(wheel.timer);
    const finish = () => {
      const { t, p } = evaluate(wheel.vx, wheel.vy);
      if (t && p >= COMMIT) {
        go(t);
        wheel.lockUntil = performance.now() + 900;
      } else {
        startTween(true);
      }
      wheel.vx = wheel.vy = 0;
      wheel.active = false;
    };
    if (evaluate(wheel.vx, wheel.vy).p >= 1) finish();
    else wheel.timer = setTimeout(finish, 180);
  }, { passive: false });

  addEventListener('keydown', (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    let t = null;
    switch (e.key) {
      case 'ArrowDown': t = focus.lastChild || focus.children[0]; break;
      case 'ArrowUp': case 'Escape': case 'Backspace': t = focus.parent; break;
      case 'ArrowLeft': t = sibling(focus, -1); break;
      case 'ArrowRight': t = sibling(focus, 1); break;
      default: return;
    }
    e.preventDefault();
    if (t) {
      go(t);
      if (document.activeElement && document.activeElement.classList.contains('node')) t.el.focus({ preventScroll: true });
    }
  });

  // ---------- frame ----------

  let lastGhost = null;

  function setGhost(t, p, mode) {
    if (!t && !lastGhost) return;
    if (lastGhost && lastGhost !== t) lastGhost.el.classList.remove('is-target');
    lastGhost = t;
    if (!t) {
      edgesSvg.classList.remove('ghosting');
      ghost.classList.remove('on', 'ready');
      traveler.style.opacity = 0;
      return;
    }
    if (mobile && t.parent !== focus) {
      edgesSvg.classList.remove('ghosting');
      ghost.classList.remove('on', 'ready');
      traveler.style.opacity = 0;
      return;
    }
    t.el.classList.add('is-target');
    const c = curve(focus, t);
    const d = curveD(c);
    ghostPath.setAttribute('d', d);
    chargePath.setAttribute('d', d);
    const tb = easeOut(p) * 0.97;
    chargePath.style.strokeDasharray = `${mode === 'hover' ? 0 : tb} 1`;
    edgesSvg.classList.add('ghosting');

    const tp = cubicAt(c, tb);
    traveler.style.transform = `translate(${tp.x}px, ${tp.y}px) scale(${0.6 + p * 0.7})`;
    traveler.style.opacity = mode === 'hover' ? 0 : clamp(p * 4, 0, 1);

    const size = vr(t) * 2;
    ghost.style.left = `${t.x}px`;
    ghost.style.top = `${t.y}px`;
    ghost.style.width = ghost.style.height = `${size}px`;
    ghost.style.setProperty('--p', p.toFixed(3));
    ghost.classList.add('on');
    const ready = p >= COMMIT;
    ghost.classList.toggle('ready', ready);
    const u = ui();
    ghostTitle.textContent = L(t);
    const teaser = t.soon ? u.soon : tx(t, 'teaser') || (t.children.length ? u.inside(t.children.length) : tx(t, 'kicker') || '');
    if (mode === 'hover') ghostSub.textContent = `${teaser} · ${u.clickOrDrag}`;
    else ghostSub.textContent = ready ? u.release : teaser;
  }

  function updateBeam() {
    if (!panelOpen || !panelBox) return;
    const n = toScreen(focus);
    const r = vr(focus) * cam.s;
    let o, p1, p2;
    if (panelBelow()) {
      o = { x: n.x, y: n.y + r * 0.9 };
      p1 = { x: panelBox.x + 18, y: panelBox.y + 2 };
      p2 = { x: panelBox.x + panelBox.w - 18, y: panelBox.y + 2 };
    } else {
      o = { x: n.x + r * 0.9, y: n.y };
      p1 = { x: panelBox.x + 2, y: panelBox.y + 18 };
      p2 = { x: panelBox.x + 2, y: panelBox.y + panelBox.h - 18 };
    }
    beamCone.setAttribute('points', `${o.x},${o.y} ${p1.x},${p1.y} ${p2.x},${p2.y}`);
    beamGrad.setAttribute('x1', o.x);
    beamGrad.setAttribute('y1', o.y);
    beamGrad.setAttribute('x2', (p1.x + p2.x) / 2);
    beamGrad.setAttribute('y2', (p1.y + p2.y) / 2);
    for (const [line, p] of [[beamL1, p1], [beamL2, p2]]) {
      line.setAttribute('x1', o.x);
      line.setAttribute('y1', o.y);
      line.setAttribute('x2', p.x);
      line.setAttribute('y2', p.y);
    }
  }

  // Phones: tabs flush with the top/left/right edges for parent and siblings.
  function updateTabs(gt, gp) {
    for (const el of Object.values(edgeHints)) {
      const p = el._node && el._node === gt ? gp : 0;
      const key = p.toFixed(2);
      if (el._p === key) continue;
      el._p = key;
      el.style.setProperty('--p', key);
      el.classList.toggle('ready', p >= COMMIT);
    }
  }

  function updateEdgeHints() {
    const margin = 70;
    const targets = { up: focus.parent, left: sibling(focus, -1), right: sibling(focus, 1) };
    for (const [dir, el] of Object.entries(edgeHints)) {
      const n = targets[dir];
      if (!n) { el.classList.remove('show'); continue; }
      if (mobile) {
        if (el._node !== n || el._mode !== 'tab') {
          el._node = n;
          el._mode = 'tab';
          const arrow = dir === 'up' ? '↑' : dir === 'left' ? '‹' : '›';
          el.innerHTML = `<span class="tab-arrow" aria-hidden="true">${arrow}</span><span class="tab-label">${L(n)}</span>`;
          el.setAttribute('aria-label', `${ui().goTo} ${L(n)}`);
        }
        el.classList.add('show');
        el.style.left = el.style.top = '';
        if (dir !== 'up') el.style.setProperty('--tab-y', `${anchor().y}px`);
        continue;
      }
      if (el._mode === 'tab') {
        el._mode = '';
        el._node = null;
      }
      const s = toScreen(n);
      const off = s.x < margin || s.x > W - margin || s.y < margin + 40 || s.y > H - margin;
      if (!off) { el.classList.remove('show'); continue; }
      if (el._node !== n) {
        el._node = n;
        el.textContent = dir === 'up' ? `↑ ${L(n)}` : dir === 'left' ? `← ${L(n)}` : `${L(n)} →`;
      }
      el.classList.add('show');
      const x = dir === 'left' ? 90 : dir === 'right' ? W - 90 : clamp(s.x, 120, W - 120);
      const y = dir === 'up' ? (mobile ? 142 : 110) : clamp(s.y, 140, H - 80);
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
    }
  }

  let last = performance.now();
  let sceneDirty = true;
  let lastFade = '';
  function frame(now) {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    const t0 = performance.now();

    let gt = null, gp = 0, mode = null;
    if (drag.active && drag.moved) {
      ({ t: gt, p: gp } = evaluate(drag.vx, drag.vy));
      mode = 'drag';
    } else if (wheel.active) {
      ({ t: gt, p: gp } = evaluate(wheel.vx, wheel.vy));
      mode = 'drag';
    } else if (!drag.active && mouse.type === 'mouse' && mouse.inStage) {
      if (hoverNode && hoverNode !== focus && neighbors(focus).includes(hoverNode)) {
        gt = hoverNode;
      } else {
        const f = toScreen(focus);
        const vx = mouse.x - f.x, vy = mouse.y - f.y;
        if (Math.hypot(vx, vy) > focus.r * cam.s + 40) gt = evaluate(vx, vy, 0.82).t;
      }
      gp = gt ? 0.2 : 0;
      mode = 'hover';
    }
    setGhost(gt, gp, mode);
    if (mobile) updateTabs(gt, gp);

    // Camera: follow the focus, leaning toward the target while dragging.
    let tx = focus.x, ty = focus.y;
    const tz = zoom();
    if (mode === 'drag') {
      if (gt) {
        const e = easeOut(gp) * 0.34;
        const d = towards(gt);
        tx += d.x * e;
        ty += d.y * e;
      } else if (drag.active) {
        tx += (drag.vx * 0.05) / tz;
        ty += (drag.vy * 0.05) / tz;
      }
    }
    const a = anchor();
    if (mode === 'drag') tween = null;
    if (tween) {
      // Timed move with an ease that lands exactly on the target, instead of
      // an exponential approach whose sub-pixel tail reads as tiny jumps.
      const u = Math.min(1, (now - tween.t0) / tween.dur);
      const e = tween.ease(u);
      cam.x = tween.x + (tx - tween.x) * e;
      cam.y = tween.y + (ty - tween.y) * e;
      cam.s = tween.s + (tz - tween.s) * e;
      anc.x = tween.ax + (a.x - tween.ax) * e;
      anc.y = tween.ay + (a.y - tween.ay) * e;
      if (u >= 1) {
        tween = null;
        sceneDirty = true;
      }
    } else {
      const k = reduced ? 1 : 1 - Math.exp(-dt * (mode === 'drag' ? 9 : 4.2));
      cam.x += (tx - cam.x) * k;
      cam.y += (ty - cam.y) * k;
      cam.s += (tz - cam.s) * k;
      anc.x += (a.x - anc.x) * k;
      anc.y += (a.y - anc.y) * k;
    }

    // Skip DOM writes once the camera has settled and nothing is being dragged.
    const moving = tween || mode === 'drag' || gt
      || Math.abs(tx - cam.x) > 0.05 || Math.abs(ty - cam.y) > 0.05 || Math.abs(tz - cam.s) > 0.0005
      || Math.abs(a.x - anc.x) > 0.1 || Math.abs(a.y - anc.y) > 0.1;
    if (moving || sceneDirty) {
      sceneDirty = false;
      let ox = anc.x - cam.x * cam.s, oy = anc.y - cam.y * cam.s;
      if (!moving) {
        // at rest, snap to whole device pixels so text stays crisp and still
        const d = devicePixelRatio || 1;
        ox = Math.round(ox * d) / d;
        oy = Math.round(oy * d) / d;
      }
      world.style.transform = `translate3d(${ox}px, ${oy}px, 0) scale(${cam.s})`;
      updateBeam();
      updateEdgeHints();
    }

    const fade = (mode === 'drag' ? 1 - gp * 0.75 : 1).toFixed(2);
    if (fade !== lastFade) {
      lastFade = fade;
      panel.style.setProperty('--fade', fade);
      beam.style.setProperty('--fade', fade);
    }

    if (!debug || debug.bg) bg.draw(dt, cam, mouse);
    if (debug) debug.tick(now, performance.now() - t0);
    requestAnimationFrame(frame);
  }

  // ---------- background ----------

  const bg = (() => {
    const canvas = $('#bg');
    const ctx = canvas.getContext('2d');

    function sprite(size, stops) {
      const c = document.createElement('canvas');
      c.width = c.height = size;
      const g = c.getContext('2d');
      const gr = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
      stops.forEach(([o, col]) => gr.addColorStop(o, col));
      g.fillStyle = gr;
      g.fillRect(0, 0, size, size);
      return c;
    }
    const glow = sprite(64, [[0, 'rgba(255,255,255,1)'], [0.18, 'rgba(200,255,250,0.85)'], [0.45, 'rgba(140,245,235,0.18)'], [1, 'rgba(140,245,235,0)']]);
    const blobLight = sprite(256, [[0, 'rgba(90,240,220,0.55)'], [0.6, 'rgba(90,240,220,0.18)'], [1, 'rgba(90,240,220,0)']]);
    const blobDark = sprite(256, [[0, 'rgba(2,48,56,0.5)'], [0.6, 'rgba(2,48,56,0.16)'], [1, 'rgba(2,48,56,0)']]);

    let w = 0, h = 0, acc = 0;
    const net = [];
    let blobLayer = null;
    const dust = [];
    const blobs = [];

    function rand(a, b) { return a + Math.random() * (b - a); }

    function resize() {
      // Mobile browsers fire resize when the toolbar slides; skip if nothing changed.
      if (innerWidth === w && innerHeight === h) return;
      const dpr = lowPower ? 1 : Math.min(devicePixelRatio || 1, 2);
      w = innerWidth;
      h = innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const area = w * h;
      const netCount = Math.min(reduced ? 40 : lowPower ? 42 : 90, Math.round(area / 16000));
      while (net.length < netCount) {
        net.push({ x: rand(0, w), y: rand(0, h), vx: rand(-6, 6), vy: rand(-6, 6), r: rand(0.8, 2.2), bright: Math.random() < 0.22, ph: rand(0, 6.28) });
      }
      net.length = netCount;

      const dustCount = Math.min(reduced ? 80 : lowPower ? 100 : 260, Math.round(area / 5000));
      while (dust.length < dustCount) {
        dust.push({ x: rand(0, w), y: rand(0, h), z: rand(0.2, 1), r: rand(0.3, 0.9), a: rand(0.25, 0.7), ph: rand(0, 6.28), sp: rand(0.3, 1) });
      }
      dust.length = dustCount;

      if (!blobs.length) {
        for (let i = 0; i < 7; i++) {
          blobs.push({ x: rand(0, 1), y: rand(0, 1), r: rand(120, 300), dark: i % 3 === 2, ph: rand(0, 6.28), sp: rand(0.03, 0.08), z: rand(0.1, 0.4) });
        }
      }

      // On low-power devices the soft spheres are painted once and reused.
      blobLayer = null;
      if (lowPower) {
        blobLayer = document.createElement('canvas');
        blobLayer.width = w;
        blobLayer.height = h;
        const b = blobLayer.getContext('2d');
        for (const s of blobs) b.drawImage(s.dark ? blobDark : blobLight, s.x * w - s.r, s.y * h - s.r, s.r * 2, s.r * 2);
      }
    }

    const wrap = (v, m) => ((v % m) + m) % m;
    const LINK = lowPower ? 130 : 150;
    const BUCKETS = 6;
    const buckets = Array.from({ length: BUCKETS }, () => []);

    function draw(frameDt, cam, mouse) {
      // ~30fps is plenty for slow drifting particles on phones
      let dt = frameDt;
      if (lowPower) {
        acc += frameDt;
        if (acc < 1 / 30) return;
        dt = acc;
        acc = 0;
      }
      const speed = reduced ? 0.25 : 1;
      ctx.clearRect(0, 0, w, h);

      // out-of-focus spheres
      if (blobLayer) ctx.drawImage(blobLayer, 0, 0, w, h);
      else for (const b of blobs) {
        b.ph += dt * b.sp * speed;
        const x = b.x * w + Math.sin(b.ph) * 60 - cam.x * 0.04 * b.z;
        const y = b.y * h + Math.cos(b.ph * 0.8) * 40 - cam.y * 0.04 * b.z;
        ctx.globalAlpha = 1;
        ctx.drawImage(b.dark ? blobDark : blobLight, x - b.r, y - b.r, b.r * 2, b.r * 2);
      }

      // plexus network
      const px = [];
      for (const p of net) {
        p.x += p.vx * dt * speed;
        p.y += p.vy * dt * speed;
        p.ph += dt * speed;
        const x = wrap(p.x - cam.x * 0.06, w + 200) - 100;
        const y = wrap(p.y - cam.y * 0.06, h + 200) - 100;
        px.push(x, y);
      }
      // Group links into a few opacity buckets so each bucket is one stroke call.
      for (const b of buckets) b.length = 0;
      for (let i = 0; i < net.length; i++) {
        const x1 = px[i * 2], y1 = px[i * 2 + 1];
        for (let j = i + 1; j < net.length; j++) {
          const dx = px[j * 2] - x1, dy = px[j * 2 + 1] - y1;
          if (Math.abs(dx) > LINK || Math.abs(dy) > LINK) continue;
          const d = Math.hypot(dx, dy);
          if (d > LINK) continue;
          const md = Math.hypot((x1 + dx / 2) - mouse.x, (y1 + dy / 2) - mouse.y);
          const boost = md < 220 ? (1 - md / 220) * 0.35 : 0;
          const alpha = Math.min(0.63, (1 - d / LINK) * 0.28 + boost);
          buckets[Math.min(BUCKETS - 1, Math.floor((alpha / 0.63) * BUCKETS))].push(x1, y1, x1 + dx, y1 + dy);
        }
      }
      ctx.lineWidth = 0.6;
      buckets.forEach((seg, bi) => {
        if (!seg.length) return;
        ctx.strokeStyle = `rgba(210,255,250,${(((bi + 0.5) / BUCKETS) * 0.63).toFixed(3)})`;
        ctx.beginPath();
        for (let q = 0; q < seg.length; q += 4) {
          ctx.moveTo(seg[q], seg[q + 1]);
          ctx.lineTo(seg[q + 2], seg[q + 3]);
        }
        ctx.stroke();
      });
      for (let i = 0; i < net.length; i++) {
        const p = net[i];
        const R = p.bright ? p.r * 7 : p.r * 3.2;
        ctx.globalAlpha = p.bright ? 0.55 + 0.35 * Math.sin(p.ph * 1.3) : 0.75;
        ctx.drawImage(glow, px[i * 2] - R, px[i * 2 + 1] - R, R * 2, R * 2);
      }

      // fine dust
      for (const p of dust) {
        p.ph += dt * p.sp * speed;
        p.y -= dt * (3 + 8 * p.z) * p.sp * speed;
        const x = wrap(p.x + Math.sin(p.ph * 0.6) * 6 - cam.x * 0.09 * p.z, w + 40) - 20;
        const y = wrap(p.y - cam.y * 0.09 * p.z, h + 40) - 20;
        const R = p.r * 3;
        ctx.globalAlpha = p.a * (0.6 + 0.4 * Math.sin(p.ph * 2));
        ctx.drawImage(glow, x - R, y - R, R * 2, R * 2);
      }
      ctx.globalAlpha = 1;
    }

    return { resize, draw };
  })();

  // ---------- diagnostics (open the site with ?debug) ----------

  const debug = /[?&]debug\b/.test(location.search) ? (() => {
    const box = document.createElement('div');
    box.style.cssText = 'position:fixed;left:8px;right:8px;top:8px;z-index:99;padding:10px;border-radius:8px;'
      + 'background:rgba(0,20,25,.85);color:#fff;font:12px/1.5 ui-monospace,monospace';
    box.innerHTML = '<div id="dbg-stats">measuring…</div><div id="dbg-btns" style="display:flex;flex-wrap:wrap;gap:6px;margin-top:8px"></div>';
    document.body.appendChild(box);
    const stats = box.querySelector('#dbg-stats');
    const state = { bg: true };
    const btn = (label, on, toggle) => {
      const b = document.createElement('button');
      const paint = () => {
        b.textContent = `${label}: ${on ? 'ON' : 'OFF'}`;
        b.style.cssText = `padding:6px 10px;border-radius:6px;border:1px solid #fff4;font:inherit;color:#fff;background:${on ? '#0a7' : '#a33'}`;
      };
      b.addEventListener('click', () => { on = !on; toggle(on); paint(); });
      paint();
      box.querySelector('#dbg-btns').appendChild(b);
    };
    const root = document.documentElement;
    btn('Background', true, (on) => {
      state.bg = on;
      if (!on) $('#bg').getContext('2d').clearRect(0, 0, 1e4, 1e4);
    });
    btn('Panel blur', true, (on) => root.classList.toggle('dbg-no-panel-blur', !on));
    btn('All blur', true, (on) => root.classList.toggle('dbg-no-blur', !on));
    btn('Panel', true, (on) => root.classList.toggle('dbg-no-panel', !on));
    const style = document.createElement('style');
    style.textContent = '.dbg-no-panel-blur #panel,.dbg-no-blur *{-webkit-backdrop-filter:none!important;backdrop-filter:none!important}'
      + '.dbg-no-panel #panel,.dbg-no-panel #beam{display:none!important}';
    document.head.appendChild(style);

    let frames = 0, js = 0, worst = 0, since = performance.now();
    state.tick = (now, ms) => {
      frames++;
      js += ms;
      worst = Math.max(worst, ms);
      if (now - since >= 1000) {
        const fps = Math.round((frames * 1000) / (now - since));
        stats.textContent = `${fps} fps · JS ${(js / frames).toFixed(1)}ms avg / ${worst.toFixed(1)}ms worst · `
          + `${lowPower ? 'low-power' : 'full'} · ${innerWidth}×${innerHeight} @${devicePixelRatio}x`;
        frames = 0; js = 0; worst = 0; since = now;
      }
    };
    return state;
  })() : null;

  // ---------- language switching ----------

  const langBtn = $('.lang-toggle');
  function setTitle() {
    document.title = focus === ROOT ? 'Damir Sarsengaliyev' : `${L(focus)} · Damir Sarsengaliyev`;
  }
  function applyLang() {
    const u = ui();
    document.documentElement.lang = lang;
    all.forEach((n) => {
      n.el.querySelector('.label').textContent = L(n);
      n.el.setAttribute('aria-label', L(n) + (n.soon ? ` (${u.comingSoon})` : ''));
    });
    $('.hint-desktop').textContent = u.hintDesktop;
    $('.hint-touch').textContent = u.hintTouch;
    $('.quick [data-ui="email"]').textContent = u.email;
    $('.quick [data-ui="cv"]').textContent = u.cv;
    langBtn.classList.toggle('is-ru', lang === 'ru');
    langBtn.setAttribute('aria-label', u.switchTo);
    // force the edge hints and tabs to rewrite their text
    Object.values(edgeHints).forEach((el) => { el._node = null; });
    sceneDirty = true;
    renderCrumbs();
    setTitle();
    if (panelOpen) {
      panelScroll.innerHTML = render(focus);
      positionPanel();
    }
  }
  langBtn.addEventListener('click', () => {
    lang = lang === 'ru' ? 'en' : 'ru';
    try { localStorage.setItem('lang', lang); } catch (e) { /* private mode */ }
    applyLang();
  });

  // ---------- boot ----------

  addEventListener('resize', resize);
  resize();
  // No fade-in/out on the very first paint: hidden nodes start hidden.
  document.documentElement.classList.add('booting');
  requestAnimationFrame(() => requestAnimationFrame(() => document.documentElement.classList.remove('booting')));
  applyLang();
  const start = fromHash();
  go(start, { push: false, instant: true });
  history.replaceState(null, '', hashOf(start));
  requestAnimationFrame(frame);
})();
