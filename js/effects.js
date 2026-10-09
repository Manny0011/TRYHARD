/* Cosmic background, cursor glow/trail, magnetic buttons, card tilt, toasts, confetti. */
(function () {
  const Lab = window.Lab;
  const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const mqFine = window.matchMedia('(hover: hover) and (pointer: fine)');
  const E = { reduced: false };

  const isReduced = () => mqReduce.matches || (Lab.Store.state && Lab.Store.state.settings.reduceMotion);

  /* ---------- stars ---------- */
  const stars = { cv: null, ctx: null, list: [], w: 0, h: 0, dpr: 1, raf: 0, last: 0, shoot: null, nextShoot: 0 };
  function initStars() {
    stars.cv = document.getElementById('stars'); if (!stars.cv) return; stars.ctx = stars.cv.getContext('2d');
    resize(); window.addEventListener('resize', debounce(resize, 200));
    document.addEventListener('visibilitychange', () => { if (document.hidden) cancelAnimationFrame(stars.raf), (stars.raf = 0); else startStars(); });
  }
  function resize() {
    const cv = stars.cv; stars.dpr = Math.min(window.devicePixelRatio || 1, 1.5); stars.w = window.innerWidth; stars.h = window.innerHeight;
    cv.width = stars.w * stars.dpr; cv.height = stars.h * stars.dpr; cv.style.width = stars.w + 'px'; cv.style.height = stars.h + 'px';
    const n = Math.min(240, Math.round((stars.w * stars.h) / 8500));
    stars.list = Array.from({ length: n }, () => ({ x: Math.random() * stars.w, y: Math.random() * stars.h, r: Math.random() * 1.2 + 0.25, p: Math.random() * 6.28, s: Math.random() * 0.8 + 0.25, v: Math.random() * 0.06 + 0.01, hue: Math.random() < 0.18 ? 190 : Math.random() < 0.3 ? 265 : 220 }));
    drawStars(0);
  }
  function drawStars(t) {
    const { ctx, w, h, dpr } = stars; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, w, h);
    const still = E.reduced;
    for (const s of stars.list) {
      if (!still) { s.y -= s.v; if (s.y < -2) { s.y = h + 2; s.x = Math.random() * w; } }
      const a = still ? 0.6 : 0.35 + 0.55 * (0.5 + 0.5 * Math.sin(t / 1000 * s.s + s.p));
      ctx.fillStyle = `hsla(${s.hue},90%,${s.r > 1 ? 88 : 80}%,${a})`; ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, 6.283); ctx.fill();
    }
    const sh = stars.shoot;
    if (sh && !still) {
      sh.x += sh.vx; sh.y += sh.vy; sh.life -= 1; const g = ctx.createLinearGradient(sh.x, sh.y, sh.x - sh.vx * 14, sh.y - sh.vy * 14);
      g.addColorStop(0, 'rgba(210,225,255,.85)'); g.addColorStop(1, 'rgba(210,225,255,0)'); ctx.strokeStyle = g; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(sh.x, sh.y); ctx.lineTo(sh.x - sh.vx * 14, sh.y - sh.vy * 14); ctx.stroke();
      if (sh.life <= 0) stars.shoot = null;
    } else if (!still && t > stars.nextShoot) { stars.nextShoot = t + 9000 + Math.random() * 12000; if (t > 4000) stars.shoot = { x: Math.random() * w * 0.7 + w * 0.2, y: Math.random() * h * 0.35, vx: 7 + Math.random() * 3, vy: 3 + Math.random() * 2, life: 38 }; }
  }
  function startStars() {
    if (!stars.ctx || stars.raf) return;
    if (E.reduced) { drawStars(0); return; }
    const loop = (t) => { stars.raf = requestAnimationFrame(loop); if (t - stars.last < 33) return; stars.last = t; drawStars(t); };
    stars.raf = requestAnimationFrame(loop);
  }

  /* ---------- cursor + magnetic + tilt (one rAF loop that sleeps when idle) ---------- */
  const cur = { on: false, glow: null, dot: null, trail: [], mx: -200, my: -200, g: { x: -200, y: -200 }, d: { x: -200, y: -200 }, running: false, hot: null, tilt: null, rectDirty: false, lastMove: 0 };
  const TRAIL = 7;
  function initCursor() {
    const layer = document.getElementById('fx-layer');
    cur.glow = el('div', 'cursor-glow'); cur.dot = el('div', 'cursor-dot'); layer.append(cur.glow, cur.dot);
    for (let i = 0; i < TRAIL; i++) { const t = el('div', 'cursor-trail'); t.style.setProperty('--i', i); layer.appendChild(t); cur.trail.push({ el: t, x: -200, y: -200 }); }
    document.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerover', onOver, { passive: true });
    document.addEventListener('pointerout', onOut, { passive: true });
    document.addEventListener('pointerleave', () => { cur.mx = cur.my = -300; kick(); });
    window.addEventListener('scroll', () => { cur.rectDirty = true; }, { passive: true, capture: true });
    document.documentElement.classList.add('fx-cursor');
    cur.on = true;
  }
  function destroyCursor() {
    document.removeEventListener('pointermove', onMove); document.removeEventListener('pointerover', onOver); document.removeEventListener('pointerout', onOut);
    const layer = document.getElementById('fx-layer'); layer.innerHTML = ''; cur.trail = []; cur.on = false; document.documentElement.classList.remove('fx-cursor');
    releaseHot(true);
  }
  function el(tag, cls) { const e = document.createElement(tag); e.className = cls; return e; }
  function onMove(e) { if (e.pointerType === 'touch') return; cur.mx = e.clientX; cur.my = e.clientY; cur.lastMove = performance.now(); kick(); }
  function onOver(e) {
    const m = e.target.closest && e.target.closest('.magnetic'); const t = e.target.closest && e.target.closest('.tilt');
    if (m && (!cur.hot || cur.hot.el !== m)) { releaseHot(); const r = m.getBoundingClientRect(); cur.hot = { el: m, cx: r.left + r.width / 2, cy: r.top + r.height / 2, x: 0, y: 0, tx: 0, ty: 0, out: false }; m.classList.add('is-magnet'); }
    if (t && (!cur.tilt || cur.tilt.el !== t)) { releaseTilt(); const r = t.getBoundingClientRect(); cur.tilt = { el: t, r, rx: 0, ry: 0, trx: 0, try_: 0, out: false }; }
    document.documentElement.classList.toggle('cursor-link', !!(e.target.closest && e.target.closest('a,button,[role="button"],input,textarea,select,label,.qcard')));
    kick();
  }
  function onOut(e) {
    if (cur.hot && !cur.hot.el.contains(e.relatedTarget)) cur.hot.out = true;
    if (cur.tilt && !cur.tilt.el.contains(e.relatedTarget)) cur.tilt.out = true;
    kick();
  }
  function releaseHot(hard) { if (cur.hot) { if (hard) { cur.hot.el.style.transform = ''; cur.hot.el.classList.remove('is-magnet'); cur.hot = null; } else cur.hot.out = true; } }
  function releaseTilt() { if (cur.tilt) { cur.tilt.el.style.transform = ''; cur.tilt.el.style.removeProperty('--mx'); cur.tilt.el.style.removeProperty('--my'); cur.tilt = null; } }
  function kick() { if (!cur.running && cur.on) { cur.running = true; requestAnimationFrame(tick); } }
  const lerp = (a, b, k) => a + (b - a) * k;
  function tick() {
    let busy = false;
    // glow / dot / trail
    cur.g.x = lerp(cur.g.x, cur.mx, 0.14); cur.g.y = lerp(cur.g.y, cur.my, 0.14);
    cur.d.x = lerp(cur.d.x, cur.mx, 0.4); cur.d.y = lerp(cur.d.y, cur.my, 0.4);
    cur.glow.style.transform = `translate3d(${cur.g.x}px,${cur.g.y}px,0)`; cur.dot.style.transform = `translate3d(${cur.d.x}px,${cur.d.y}px,0)`;
    let px = cur.d.x, py = cur.d.y;
    for (const t of cur.trail) { t.x = lerp(t.x, px, 0.34); t.y = lerp(t.y, py, 0.34); t.el.style.transform = `translate3d(${t.x}px,${t.y}px,0)`; px = t.x; py = t.y; }
    if (Math.abs(cur.g.x - cur.mx) > 0.3 || Math.abs(cur.g.y - cur.my) > 0.3 || Math.abs(px - cur.mx) > 0.3 || Math.abs(py - cur.my) > 0.3) busy = true;
    // magnetic
    const h = cur.hot;
    if (h) {
      if (cur.rectDirty) { const m = h.el.getBoundingClientRect(); h.cx = m.left + m.width / 2 - h.x; h.cy = m.top + m.height / 2 - h.y; }
      h.tx = h.out ? 0 : Math.max(-9, Math.min(9, (cur.mx - h.cx) * 0.22)); h.ty = h.out ? 0 : Math.max(-7, Math.min(7, (cur.my - h.cy) * 0.22));
      h.x = lerp(h.x, h.tx, 0.2); h.y = lerp(h.y, h.ty, 0.2);
      h.el.style.transform = `translate3d(${h.x.toFixed(2)}px,${h.y.toFixed(2)}px,0)`;
      if (h.out && Math.abs(h.x) < 0.05 && Math.abs(h.y) < 0.05) { h.el.style.transform = ''; h.el.classList.remove('is-magnet'); cur.hot = null; } else busy = true;
    }
    // tilt
    const t = cur.tilt;
    if (t) {
      if (cur.rectDirty) t.r = t.el.getBoundingClientRect();
      const nx = Math.max(0, Math.min(1, (cur.mx - t.r.left) / t.r.width)); const ny = Math.max(0, Math.min(1, (cur.my - t.r.top) / t.r.height));
      t.trx = t.out ? 0 : (0.5 - ny) * 5; t.try_ = t.out ? 0 : (nx - 0.5) * 6;
      t.rx = lerp(t.rx, t.trx, 0.16); t.ry = lerp(t.ry, t.try_, 0.16);
      t.el.style.setProperty('--mx', (nx * 100).toFixed(1) + '%'); t.el.style.setProperty('--my', (ny * 100).toFixed(1) + '%');
      t.el.style.transform = t.out && Math.abs(t.rx) < 0.02 && Math.abs(t.ry) < 0.02 ? '' : `perspective(900px) rotateX(${t.rx.toFixed(2)}deg) rotateY(${t.ry.toFixed(2)}deg) translateY(${t.out ? 0 : -2}px)`;
      if (t.out && Math.abs(t.rx) < 0.02 && Math.abs(t.ry) < 0.02) cur.tilt = null; else busy = true;
    }
    cur.rectDirty = false;
    if (busy) requestAnimationFrame(tick); else cur.running = false;
  }

  /* ---------- toasts + confetti ---------- */
  Lab.toast = function (msg, opts = {}) {
    const root = document.getElementById('toasts'); const t = document.createElement('div');
    t.className = 'toast toast-' + (opts.type || 'info'); t.setAttribute('role', 'status');
    t.innerHTML = `<span class="toast-ic">${opts.icon || ''}</span><span>${Lab.md.esc(msg)}</span>`;
    root.appendChild(t); while (root.children.length > 3) root.firstChild.remove();
    requestAnimationFrame(() => t.classList.add('in'));
    setTimeout(() => { t.classList.remove('in'); t.classList.add('out'); setTimeout(() => t.remove(), 350); }, opts.ms || 2400);
  };
  Lab.burst = function (x, y, color) {
    if (E.reduced || !document.body.animate) return;
    const colors = [color || '#3be8a4', '#8b7bff', '#35d4f4', '#ffc24a', '#ff7ac6'];
    for (let i = 0; i < 14; i++) {
      const p = document.createElement('i'); p.className = 'confetti'; p.style.left = x + 'px'; p.style.top = y + 'px'; p.style.background = colors[i % colors.length];
      document.body.appendChild(p); const a = (Math.PI * 2 * i) / 14 + Math.random() * 0.5; const d = 26 + Math.random() * 34;
      const an = p.animate([{ transform: 'translate(-50%,-50%) scale(1)', opacity: 1 }, { transform: `translate(calc(-50% + ${Math.cos(a) * d}px), calc(-50% + ${Math.sin(a) * d - 8}px)) scale(.2)`, opacity: 0 }], { duration: 650 + Math.random() * 250, easing: 'cubic-bezier(.2,.7,.3,1)' });
      an.onfinish = () => p.remove();
    }
  };

  /* ---------- animated numbers / rings / bars ---------- */
  Lab.animateIn = function (root) {
    root = root || document;
    const reduced = E.reduced;
    root.querySelectorAll('.ring-fg[data-pct]').forEach((c) => { const circ = +c.getAttribute('stroke-dasharray'); const off = circ * (1 - Math.min(100, +c.dataset.pct) / 100); if (reduced) c.style.transition = 'none'; requestAnimationFrame(() => requestAnimationFrame(() => (c.style.strokeDashoffset = off))); });
    root.querySelectorAll('.bar-fill[data-pct]').forEach((b) => { if (reduced) b.style.transition = 'none'; requestAnimationFrame(() => requestAnimationFrame(() => (b.style.width = Math.min(100, +b.dataset.pct) + '%'))); });
    root.querySelectorAll('[data-count]').forEach((n) => {
      const to = +n.dataset.count; const suffix = n.dataset.suffix || '';
      if (reduced || to === 0) { n.textContent = to + suffix; return; }
      const t0 = performance.now(); const dur = 800;
      const step = (t) => { const p = Math.min(1, (t - t0) / dur); n.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))) + suffix; if (p < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step);
    });
  };

  E.apply = function () {
    E.reduced = isReduced();
    document.documentElement.classList.toggle('reduce-motion', E.reduced);
    const want = !E.reduced && mqFine.matches && Lab.Store.state.settings.cursorFx;
    if (want && !cur.on) initCursor(); else if (!want && cur.on) destroyCursor();
    if (stars.raf) { cancelAnimationFrame(stars.raf); stars.raf = 0; }
    startStars();
  };
  E.init = function () {
    initStars(); E.apply();
    mqReduce.addEventListener && mqReduce.addEventListener('change', E.apply);
    mqFine.addEventListener && mqFine.addEventListener('change', E.apply);
  };
  function debounce(fn, ms) { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; }
  Lab.debounce = debounce;
  Lab.Effects = E;
})();
