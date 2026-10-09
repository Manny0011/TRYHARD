/* Views: sidebar, dashboard, lists, question detail, progress, settings, command palette. */
(function () {
  const Lab = window.Lab; const S = Lab.Store; const D = Lab.Data; const UI = Lab.UI; const I = UI.icons; const esc = Lab.md.esc;
  const V = (Lab.Views = {});
  Lab.listState = {}; Lab.ctx = null; V.active = { route: 'dashboard', key: null };

  const SEC_ICON = { technical: 'technical', dsa: 'dsa', loops: 'loops', hr: 'hr' };
  const $ = (sel, root = document) => root.querySelector(sel);
  const plural = (n, w) => `${n} ${w}${n === 1 ? '' : 's'}`;
  function fmtDate(key) {
    if (!key) return 'Not yet';
    if (key === S.today()) return 'Today'; if (key === S.shiftDay(S.today(), -1)) return 'Yesterday';
    const [y, m, d] = key.split('-').map(Number); return new Date(y, m - 1, d).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
  }
  const secStats = () => D.ORDER.map((k) => ({ key: k, meta: D.META[k], ...D.progress(D.META[k].questions) }));
  const overall = () => D.progress(D.all);

  /* ================= chrome (sidebar + topbar) ================= */
  const NAV = [
    { group: 'Learn', items: [['dashboard', 'Dashboard', 'dashboard'], ['technical', 'Technical', 'technical'], ['dsa', 'DSA', 'dsa'], ['loops', 'Loops', 'loops'], ['hr', 'HR Round', 'hr']] },
    { group: 'Library', items: [['all', 'All Questions', 'all'], ['bookmarks', 'Bookmarks', 'bookmark'], ['completed', 'Completed', 'check']] },
    { group: 'Insights', items: [['progress', 'Progress', 'progress'], ['settings', 'Settings', 'settings']] },
  ];
  V.renderChrome = function () {
    const sb = document.getElementById('sidebar'); if (!sb) return;
    const stats = {}; secStats().forEach((s) => (stats[s.key] = s));
    const badge = (k) => stats[k] ? `${stats[k].done}/${stats[k].total}` : k === 'all' ? D.total : k === 'bookmarks' ? S.bookmarkCount() : k === 'completed' ? S.learnedCount() : '';
    const goal = S.state.goal; const today = S.todayCount(); const gp = Math.min(100, Math.round((today / goal) * 100));
    sb.innerHTML = `
      <div class="sb-brand"><span class="brand-orb"></span><div><div class="font-display text-lg font-semibold leading-tight tracking-tight">Prep Lab</div><div class="text-[11px] text-faint tracking-wide uppercase">Allied Softech</div></div>
        <button class="icon-btn sb-close" data-act="close-nav" aria-label="Close menu">${I.close}</button></div>
      <button class="sb-search magnetic" data-act="open-search">${I.search}<span>Search 326 questions</span><kbd>Ctrl K</kbd></button>
      <nav class="sb-nav">${NAV.map((g) => `<div class="sb-group">${g.group}</div>` + g.items.map(([k, label, icon]) => {
        const meta = D.META[k]; const act = V.active.route === k || ((V.active.route === 'q' || V.active.route === 'list') && V.active.key === k);
        return `<a class="nav-item ${act ? 'active' : ''}" href="#/${k}" style="${meta ? `--accent:${meta.color}` : ''}" ${act ? 'aria-current="page"' : ''}><span class="nav-ic">${I[icon]}</span><span class="nav-label">${label}</span><span class="nav-badge">${badge(k)}</span></a>`;
      }).join('')).join('')}</nav>
      <div class="sb-foot glass-lite">
        <div class="flex items-center justify-between text-xs"><span class="text-muted">Today's goal</span><b>${today}/${goal}</b></div>
        <div class="bar mt-2"><div class="bar-fill" style="width:${gp}%;--c:var(--green)"></div></div>
        <div class="mt-3 flex items-center gap-2 text-xs text-muted"><span class="text-amber-300">${I.flame}</span><b class="text-white">${S.state.streak.current}</b> day streak <span class="ml-auto">best ${S.state.streak.best}</span></div>
      </div>`;
    const ts = document.getElementById('topbar-streak'); if (ts) { ts.innerHTML = `${I.flame}<b>${S.state.streak.current}</b>`; ts.title = `Current streak: ${plural(S.state.streak.current, 'day')} · Best: ${S.state.streak.best}`; }
  };
  V.setActiveNav = function (route, key) { V.active = { route, key }; V.renderChrome(); };

  /* ================= question cards ================= */
  function card(q, i, showSec) {
    const done = S.isLearned(q.id); const bm = S.isBookmarked(q.id); const m = D.META[q.section];
    const snip = q.sections.length ? q._snippet.slice(0, 130) + (q._snippet.length > 130 ? '…' : '') : '';
    return `<article class="qcard tilt ${done ? 'is-done' : ''}" data-id="${q.id}" style="--accent:${m.color};--d:${Math.min(i, 18) * 22}ms">
      <a class="qcard-link" href="#/q/${q.id}">
        <div class="qcard-top"><span class="id-badge">${q.id}</span>${showSec ? `<span class="sec-badge">${m.label}</span>` : ''}${q.difficulty ? `<span class="diff diff-${q.difficulty.toLowerCase()}">${q.difficulty}</span>` : ''}</div>
        <h3>${esc(q.title)}</h3>
        ${snip ? `<p class="qcard-snip">${esc(snip)}</p>` : ''}
        <div class="qcard-cat">${esc(q.tag && q.section === 'hr' ? q.tag : q.category)}</div>
      </a>
      <div class="qcard-actions">
        <button class="act-btn act-bm ${bm ? 'on' : ''}" data-act="bookmark" aria-pressed="${bm}" aria-label="${bm ? 'Remove bookmark' : 'Bookmark'} ${q.id}" title="Bookmark">${I.star}</button>
        <button class="act-btn act-learn ${done ? 'on' : ''}" data-act="learn" aria-pressed="${done}" aria-label="${done ? 'Mark as unlearned' : 'Mark as learned'} ${q.id}" title="Mark learned">${I.tick}</button>
      </div></article>`;
  }
  const NEW = { done: 0 };

  /* shared toggles (cards + detail page) */
  V.toggleLearn = function (id, src) {
    const now = S.toggleLearned(id); const q = D.byId.get(id);
    if (now) {
      const c = S.todayCount(); const g = S.state.goal;
      Lab.toast(`${id} learned · ${c}/${g} today`, { type: 'success', icon: I.check });
      if (c === g) setTimeout(() => Lab.toast(`Daily goal reached — ${plural(g, 'question')} done!`, { type: 'goal', icon: I.target, ms: 3200 }), 450);
      if (src) { const r = src.getBoundingClientRect(); Lab.burst(r.left + r.width / 2, r.top + r.height / 2); }
    } else Lab.toast(`${id} moved back to unlearned`, { icon: I.check });
    syncQuestionUI(id); afterToggle(q); return now;
  };
  V.toggleBookmark = function (id) {
    const now = S.toggleBookmark(id); Lab.toast(now ? `${id} bookmarked` : `${id} bookmark removed`, { type: now ? 'star' : 'info', icon: I.star });
    syncQuestionUI(id); afterToggle(D.byId.get(id)); return now;
  };
  function syncQuestionUI(id) {
    const done = S.isLearned(id); const bm = S.isBookmarked(id);
    document.querySelectorAll(`[data-id="${id}"]`).forEach((c) => {
      c.classList.toggle('is-done', done);
      const l = $('.act-learn', c); if (l) { l.classList.toggle('on', done); l.setAttribute('aria-pressed', done); if (done) pop(l); }
      const b = $('.act-bm', c); if (b) { b.classList.toggle('on', bm); b.setAttribute('aria-pressed', bm); pop(b); }
    });
    const lb = $('#detail-learn'); if (lb && lb.dataset.id === id) { lb.classList.toggle('on', done); lb.setAttribute('aria-pressed', done); lb.querySelector('.learn-text').textContent = done ? 'Learned' : 'Mark as Learned'; if (done) pop(lb); }
    const bb = $('#detail-bm'); if (bb && bb.dataset.id === id) { bb.classList.toggle('on', bm); bb.setAttribute('aria-pressed', bm); bb.querySelector('.bm-text').textContent = bm ? 'Bookmarked' : 'Bookmark'; pop(bb); }
  }
  function pop(el) { el.classList.remove('pop'); void el.offsetWidth; el.classList.add('pop'); }
  function afterToggle(q) {
    if (V.active.route === 'list') {
      updateHeaderProgress();
      const st = V.listCtx; if (st && (st.forced || st.state.status !== 'all')) {
        if (!matches(q, st)) { const c = $(`.qcard[data-id="${q.id}"]`); if (c) c.classList.add('leaving'); }
        clearTimeout(V._rt); V._rt = setTimeout(() => V.refreshList && V.refreshList(), Lab.Effects.reduced ? 0 : 280);
      }
    }
  }
  function matches(q, st) { return D.filter(filterOf(st)).includes(q); }

  /* ================= lists ================= */
  const TITLES = {
    technical: ['Technical', 'Core CS & development fundamentals'], dsa: ['DSA', 'Data structures & algorithms'], loops: ['Loops', 'JavaScript loops & number problems'], hr: ['HR Round', 'Communication & behavioural answers'],
    all: ['All Questions', 'Every question across all sections — filter or search'], bookmarks: ['Bookmarks', 'Questions you starred'], completed: ['Completed', 'Questions you have marked as learned'],
  };
  function filterOf(st) {
    return { section: st.isSection ? st.key : st.state.section, category: st.state.category, difficulty: st.state.difficulty, status: st.forced || st.state.status, q: st.state.q };
  }
  function hasFilters(st) { const s = st.state; return !!(s.q || s.category !== 'all' || s.difficulty !== 'all' || (!st.forced && s.status !== 'all') || (!st.isSection && s.section !== 'all')); }

  V.list = function (root, key) {
    const isSection = !!D.META[key]; const forced = key === 'bookmarks' ? 'bookmarked' : key === 'completed' ? 'done' : null;
    const state = (Lab.listState[key] = Lab.listState[key] || { category: 'all', difficulty: 'all', status: 'all', q: '', section: 'all' });
    if (isSection && !state._init) { state._init = true; const l = S.state.last; if (l.section === key && l.category && D.META[key].categories.includes(l.category)) state.category = l.category; }
    const st = (V.listCtx = { key, isSection, forced, state });
    const meta = D.META[key]; const [title, sub] = TITLES[key];
    const cats = isSection ? meta.categories : [...new Set(D.all.filter((q) => state.section === 'all' || q.section === state.section).map((q) => q.category))];
    const pool = isSection ? meta.questions : D.all; const hasDiff = pool.some((q) => q.difficulty);
    const accent = meta ? meta.color : 'var(--violet)';
    root.innerHTML = `
      <section class="page" style="--accent:${accent}">
        <header class="page-head">
          <div><div class="eyebrow">${isSection ? 'Section' : 'Library'}</div><h1 class="page-title font-display">${title}</h1><p class="page-sub">${isSection ? meta.blurb : sub}</p></div>
          <div id="head-progress" class="head-progress"></div>
        </header>
        ${key === 'hr' ? `<div class="tip glass-lite">${I.spark}<p><b>Don’t memorise word-for-word.</b> Understand the idea and speak naturally. For behavioural questions use <b>STAR</b>: Situation → Task → Action → Result.</p></div>` : ''}
        <div class="toolbar glass-lite">
          <label class="field field-search">${I.search}<input type="search" data-filter="q" placeholder="Search ${isSection ? title : 'all questions'}…" value="${esc(state.q)}" autocomplete="off" spellcheck="false"></label>
          ${!isSection ? `<select class="field" data-filter="section" aria-label="Section"><option value="all">All sections</option>${D.ORDER.map((k) => `<option value="${k}" ${state.section === k ? 'selected' : ''}>${D.META[k].label}</option>`).join('')}</select>` : ''}
          ${!isSection ? `<select class="field" data-filter="category" id="cat-select" aria-label="Category"></select>` : ''}
          ${hasDiff ? `<select class="field" data-filter="difficulty" aria-label="Difficulty"><option value="all">Any difficulty</option>${['Easy', 'Medium', 'Hard'].filter((d) => pool.some((q) => q.difficulty === d)).map((d) => `<option ${state.difficulty === d ? 'selected' : ''}>${d}</option>`).join('')}</select>` : ''}
          ${forced ? '' : `<select class="field" data-filter="status" aria-label="Status">${[['all', 'All status'], ['todo', 'Not completed'], ['done', 'Completed'], ['bookmarked', 'Bookmarked']].map(([v, l]) => `<option value="${v}" ${state.status === v ? 'selected' : ''}>${l}</option>`).join('')}</select>`}
          <button class="btn btn-ghost btn-sm" data-act="clear-filters" id="clear-filters" hidden>${I.close}<span>Clear filters</span></button>
        </div>
        ${isSection ? `<div class="chips" id="cat-chips" role="tablist" aria-label="Categories"></div>` : ''}
        <div id="list-meta" class="list-meta"></div>
        <div id="list-results"></div>
      </section>`;
    const catSelect = $('#cat-select');
    const fillCats = () => {
      if (catSelect) { const cs = [...new Set(D.all.filter((q) => state.section === 'all' || q.section === state.section).map((q) => q.category))]; if (state.category !== 'all' && !cs.includes(state.category)) state.category = 'all'; catSelect.innerHTML = `<option value="all">All categories</option>` + cs.map((c) => `<option ${c === state.category ? 'selected' : ''}>${esc(c)}</option>`).join(''); }
    };
    fillCats();
    function renderChips() {
      const box = $('#cat-chips'); if (!box) return;
      const counts = {}; meta.questions.forEach((q) => (counts[q.category] = (counts[q.category] || 0) + 1));
      box.innerHTML = [['all', 'All', meta.count], ...meta.categories.map((c) => [c, c, counts[c]])].map(([v, l, n]) => `<button class="chip-btn ${state.category === v ? 'on' : ''}" data-act="set-cat" data-val="${esc(v)}" role="tab" aria-selected="${state.category === v}">${esc(l)}<i>${n}</i></button>`).join('');
    }
    renderChips();

    V.refreshList = function () {
      fillCats(); renderChips();
      const list = D.filter(filterOf(st)); Lab.ctx = list.map((q) => q.id);
      const res = $('#list-results'); if (!res) return;
      const sel = $('#cat-select'); if (sel) sel.value = state.category;
      const filtersOn = hasFilters(st); $('#clear-filters').hidden = !filtersOn;
      const total = forced ? D.all.filter((q) => (forced === 'done' ? S.isLearned(q.id) : S.isBookmarked(q.id))).length : pool.length;
      $('#list-meta').innerHTML = `<span><b>${list.length}</b> ${list.length === 1 ? 'question' : 'questions'}${filtersOn ? ` <span class="text-faint">of ${total}</span>` : ''}</span>${state.q ? `<span class="text-faint">for “${esc(state.q)}”</span>` : ''}`;
      if (!list.length) {
        const msg = forced === 'bookmarked' && !filtersOn ? ['No bookmarks yet', 'Tap the ☆ on any question to save it here for quick revision.'] : forced === 'done' && !filtersOn ? ['Nothing completed yet', 'Mark questions as learned and they will show up here.'] : ['No questions match', 'Try a different search or clear the filters.'];
        res.innerHTML = `<div class="empty glass-lite"><div class="empty-orb"></div><h3 class="font-display">${msg[0]}</h3><p>${msg[1]}</p>${filtersOn ? `<button class="btn btn-primary magnetic" data-act="clear-filters">Clear filters</button>` : `<a class="btn btn-primary magnetic" href="#/all">Browse all questions</a>`}</div>`; return;
      }
      const showSec = !isSection;
      if (isSection && state.category === 'all' && !state.q) {
        const groups = {}; list.forEach((q) => (groups[q.category] = groups[q.category] || []).push(q));
        let n = 0;
        res.innerHTML = meta.categories.filter((c) => groups[c]).map((c) => { const p = D.progress(groups[c]); return `<section class="group"><header class="group-head"><h2 class="font-display">${esc(c)}</h2><span class="group-count">${p.done}/${p.total} learned</span><span class="group-line"></span></header><div class="cards">${groups[c].map((q) => card(q, n++, false)).join('')}</div></section>`; }).join('');
      } else res.innerHTML = `<div class="cards">${list.map((q, i) => card(q, i, showSec)).join('')}</div>`;
    };
    V.refreshList(); updateHeaderProgress(true);
  };
  function updateHeaderProgress(first) {
    const st = V.listCtx; const box = $('#head-progress'); if (!st || !box) return;
    const list = st.isSection ? D.META[st.key].questions : st.forced ? D.all : D.all;
    const p = D.progress(list);
    if (!box.firstChild) box.innerHTML = UI.ring({ pct: p.pct, size: 96, stroke: 8, color: st.isSection ? D.META[st.key].color : 'var(--violet)', sub: `${p.done}/${p.total}` }); else setRing(box.firstChild, p.pct, `${p.done}/${p.total}`);
    if (first) Lab.animateIn(box);
  }
  function setRing(ringEl, pct, sub) {
    const c = ringEl.querySelector('.ring-fg'); const circ = +c.getAttribute('stroke-dasharray'); c.dataset.pct = pct; c.style.strokeDashoffset = circ * (1 - pct / 100);
    const b = ringEl.querySelector('b'); b.dataset.count = pct; b.textContent = pct + '%'; const s = ringEl.querySelector('small'); if (s && sub) s.textContent = sub;
  }
  V.setListFilter = function (name, value) {
    const st = V.listCtx; if (!st) return; st.state[name] = value;
    if (name === 'section') st.state.category = 'all';
    if (name === 'category' && st.isSection) S.setLast({ section: st.key, category: value === 'all' ? null : value });
    V.refreshList();
  };
  V.clearFilters = function () {
    const st = V.listCtx; if (!st) return; Object.assign(st.state, { category: 'all', difficulty: 'all', status: 'all', q: '' }); if (!st.isSection) st.state.section = 'all';
    if (st.isSection) S.setLast({ section: st.key, category: null });
    V.list($('#view'), st.key); Lab.toast('Filters cleared', { icon: I.close });
  };

  /* ================= question detail ================= */
  V.detail = function (root, id) {
    const q = D.byId.get(id);
    if (!q) { root.innerHTML = `<section class="page"><div class="empty glass-lite"><div class="empty-orb"></div><h3 class="font-display">Question not found</h3><p>${esc(id)} does not exist.</p><a class="btn btn-primary" href="#/all">Browse all questions</a></div></section>`; return; }
    S.setLast({ id: q.id, section: q.section, category: q.category });
    const m = D.META[q.section]; const done = S.isLearned(q.id); const bm = S.isBookmarked(q.id);
    const ids = Lab.ctx && Lab.ctx.includes(q.id) ? Lab.ctx : m.questions.map((x) => x.id); const idx = ids.indexOf(q.id);
    const prev = idx > 0 ? D.byId.get(ids[idx - 1]) : null; const next = idx < ids.length - 1 ? D.byId.get(ids[idx + 1]) : null;
    const guide = !q.sections.length ? Lab.Guides.get(q.category) : null;
    const note = S.getNote(q.id);
    const secHtml = q.sections.map((s, i) => {
      const body = s.kind === 'followups' && /\*\*Q:/.test(s.body) ? Lab.md.renderFollowups(s.body) : Lab.md.render(s.body);
      return collapsible(`${s.kind} k-${s.kind}`, I[s.kind] || I.other, s.title, `<div class="prose">${body}</div>`, true);
    }).join('');
    const guideHtml = guide ? collapsible('k-guide', I.spark, 'How to approach it', `<div class="prose">
        <p class="guide-note">Study guide for the <b>${esc(q.category)}</b> pattern — general approach, not part of the original question bank.</p>
        <p><b>Pattern:</b> ${esc(guide.pattern)}</p><ol>${guide.steps.map((s) => `<li>${esc(s)}</li>`).join('')}</ol>
        <p><b>Edge cases to test:</b> ${esc(guide.edge)}.</p><p><b>Complexity target:</b> ${esc(guide.cx)}</p></div>`, true) : '';
    root.innerHTML = `
      <section class="page detail" style="--accent:${m.color}">
        <nav class="crumbs"><a href="#/${q.section}" class="crumb-back magnetic">${I.arrowL}<span>${m.label}</span></a><span class="crumb-sep">/</span><span class="crumb-cat">${esc(q.category)}</span><span class="crumb-pos">${idx + 1} / ${ids.length}</span></nav>
        <header class="detail-head glass">
          <div class="qcard-top"><span class="id-badge">${q.id}</span>${q.difficulty ? `<span class="diff diff-${q.difficulty.toLowerCase()}">${q.difficulty}</span>` : ''}<span class="sec-badge">${m.label}</span>${q.tag && q.section === 'hr' ? `<span class="sec-badge soft">${esc(q.tag)}</span>` : ''}</div>
          <h1 class="detail-title font-display">${esc(q.title)}</h1>
          <div class="detail-actions">
            <button id="detail-learn" data-id="${q.id}" data-act="learn-detail" class="learn-btn magnetic ${done ? 'on' : ''}" aria-pressed="${done}"><span class="box">${I.tick}</span><span class="learn-text">${done ? 'Learned' : 'Mark as Learned'}</span></button>
            <button id="detail-bm" data-id="${q.id}" data-act="bookmark-detail" class="bm-btn magnetic ${bm ? 'on' : ''}" aria-pressed="${bm}">${I.star}<span class="bm-text">${bm ? 'Bookmarked' : 'Bookmark'}</span></button>
            ${q.sections.length > 1 ? `<button class="btn btn-ghost btn-sm ml-auto" data-act="toggle-all" data-open="0">Collapse all</button>` : ''}
          </div>
        </header>
        ${!q.sections.length ? `<div class="problem glass-lite"><div class="eyebrow">Problem</div><p>${esc(q.title)}</p><div class="problem-meta"><span>${esc(q.category)}</span>${q.difficulty ? `<span>${q.difficulty}</span>` : ''}</div></div>` : ''}
        <div class="dsecs">${secHtml}${guideHtml}
          ${collapsible('k-notes', I.note, 'Your notes', `<textarea id="note-box" class="note-box" data-id="${q.id}" rows="${q.sections.length ? 4 : 8}" placeholder="${q.sections.length ? 'Jot down your own words, examples, or things to revise…' : 'Write your approach, pseudocode or final solution here. Saved automatically in this browser.'}" spellcheck="false">${esc(note)}</textarea><div class="note-status" id="note-status">${note ? 'Saved' : 'Autosaves in this browser'}</div>`, !!note || !q.sections.length)}
        </div>
        <footer class="pager">
          ${prev ? `<a class="pager-btn magnetic" href="#/q/${prev.id}">${I.arrowL}<span><small>Previous</small><b>${esc(prev.title)}</b></span></a>` : '<span></span>'}
          ${next ? `<a class="pager-btn pager-next magnetic" href="#/q/${next.id}"><span><small>Next</small><b>${esc(next.title)}</b></span>${I.arrowR}</a>` : '<span></span>'}
        </footer>
        <p class="kbd-hint">Shortcuts: <kbd>←</kbd> <kbd>→</kbd> navigate · <kbd>L</kbd> learned · <kbd>B</kbd> bookmark · <kbd>Ctrl</kbd>+<kbd>K</kbd> search</p>
      </section>`;
    V.detailNav = { prev: prev && prev.id, next: next && next.id, id: q.id };
  };
  function collapsible(cls, icon, title, inner, open) {
    return `<section class="dsec ${cls} ${open ? 'open' : ''}"><button class="dsec-head" data-act="toggle-sec" aria-expanded="${!!open}"><span class="dsec-ic">${icon}</span><span class="dsec-title font-display">${esc(title)}</span><span class="dsec-chev">${I.chevron}</span></button><div class="dsec-body"><div class="dsec-inner">${inner}</div></div></section>`;
  }

  /* ================= dashboard ================= */
  V.dashboard = function (root) {
    const o = overall(); const secs = secStats(); const goal = S.state.goal; const today = S.todayCount();
    const last = S.state.last.id ? D.byId.get(S.state.last.id) : null;
    const nextQ = (() => {
      const pool = last ? D.META[last.section].questions : D.all; const start = last ? pool.indexOf(last) + 1 : 0;
      for (let i = 0; i < pool.length; i++) { const q = pool[(start + i) % pool.length]; if (!S.isLearned(q.id) && (!last || q.id !== last.id)) return q; } return null;
    })();
    const hour = new Date().getHours(); const greet = hour < 5 ? 'Late-night orbit' : hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
    const hist = S.history(7); const maxH = Math.max(goal, ...hist.map((h) => h.count), 1);
    root.innerHTML = `
      <section class="page dash">
        <header class="page-head"><div><div class="eyebrow">${greet}</div><h1 class="page-title font-display">Interview <span class="grad-text">Prep Lab</span></h1><p class="page-sub">Fresher Software Developer · Allied Softech · ${D.total} questions to master</p></div>
          <button class="btn btn-primary magnetic" data-act="random">${I.shuffle}<span>Random unlearned</span></button></header>

        <div class="dash-grid">
          <div class="hero glass tilt">
            <div class="hero-ring">${UI.ring({ pct: o.pct, size: 168, stroke: 12, color: 'url(#g1)', sub: 'overall' })}
              <svg width="0" height="0" style="position:absolute"><defs><linearGradient id="g1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8b7bff"/><stop offset="1" stop-color="#35d4f4"/></linearGradient></defs></svg></div>
            <div class="hero-stats">
              <div class="stat"><span>Total Questions</span><b class="font-display" data-count="${o.total}">${o.total}</b></div>
              <div class="stat"><span>Completed</span><b class="font-display text-emerald-300" data-count="${o.done}">${o.done}</b></div>
              <div class="stat"><span>Remaining</span><b class="font-display text-amber-200" data-count="${o.total - o.done}">${o.total - o.done}</b></div>
              <div class="stat"><span>Overall Progress</span><b class="font-display" data-count="${o.pct}" data-suffix="%">${o.pct}%</b></div>
            </div>
          </div>

          <div class="continue glass tilt">
            <div class="eyebrow">Continue learning</div>
            ${last ? `<h2 class="continue-title font-display">${esc(last.title)}</h2>
              <div class="qcard-top"><span class="id-badge" style="--accent:${D.META[last.section].color}">${last.id}</span><span class="sec-badge">${D.META[last.section].label}</span><span class="sec-badge soft">${esc(last.category)}</span>${S.isLearned(last.id) ? '<span class="sec-badge ok">Learned</span>' : ''}</div>
              <div class="continue-actions"><a class="btn btn-primary magnetic" href="#/q/${last.id}">Resume ${I.arrowR}</a>${nextQ ? `<a class="btn btn-ghost" href="#/q/${nextQ.id}" title="${esc(nextQ.title)}">Next up: ${nextQ.id}</a>` : ''}</div>`
              : `<h2 class="continue-title font-display">Start your first question</h2><p class="text-muted text-sm mt-1">You haven't opened a question yet. Begin with the fundamentals.</p>
              <div class="continue-actions"><a class="btn btn-primary magnetic" href="#/q/TECH-001">Start with TECH-001 ${I.arrowR}</a></div>`}
          </div>

          <div class="goal glass tilt">
            <div class="goal-top">${UI.ring({ pct: Math.min(100, Math.round((today / goal) * 100)), size: 92, stroke: 8, color: 'var(--green)', sub: `${today}/${goal}` })}
              <div><div class="eyebrow">Daily goal</div><div class="goal-line"><b class="font-display">${today}</b> of ${goal} today</div>
                <div class="streaks"><span class="streak-pill">${I.flame}<b>${S.state.streak.current}</b> day streak</span><span class="text-xs text-muted">Best ${S.state.streak.best}</span></div>
                <div class="text-xs text-faint mt-1">Last study: ${fmtDate(S.state.streak.lastStudy)}</div></div></div>
            <div class="week">${hist.map((h) => `<div class="week-col" title="${fmtDate(h.key)}: ${plural(h.count, 'question')}"><div class="week-bar"><i style="height:${Math.round((h.count / maxH) * 100)}%" class="${h.key === S.today() ? 'today' : ''} ${h.count >= goal ? 'hit' : ''}"></i></div><span>${['S', 'M', 'T', 'W', 'T', 'F', 'S'][new Date(h.key.replace(/-/g, '/')).getDay()]}</span></div>`).join('')}</div>
          </div>
        </div>

        <h2 class="block-title font-display">Sections</h2>
        <div class="sec-grid">${secs.map((s) => `<a class="sec-card glass tilt" href="#/${s.key}" style="--accent:${s.meta.color}">
            <div class="sec-card-top"><span class="sec-ic">${I[SEC_ICON[s.key]]}</span><span class="sec-pct font-display">${s.pct}%</span></div>
            <h3 class="font-display">${s.meta.label} <span class="sec-prog">Progress</span></h3>
            <p>${s.meta.blurb}</p>${UI.bar(s.pct, s.meta.color)}
            <div class="sec-card-foot"><span><b>${s.done}</b> / ${s.total} learned</span><span class="go">Open ${I.arrowR}</span></div></a>`).join('')}</div>

        <div class="quick">
          <button class="quick-btn glass-lite magnetic" data-act="open-search">${I.search}<span>Search everything<small>Ctrl + K</small></span></button>
          <a class="quick-btn glass-lite magnetic" href="#/bookmarks">${I.bookmark}<span>Bookmarks<small>${plural(S.bookmarkCount(), 'saved question')}</small></span></a>
          <a class="quick-btn glass-lite magnetic" href="#/progress">${I.progress}<span>Full progress<small>by section & category</small></span></a>
        </div>
      </section>`;
    Lab.animateIn(root);
  };

  /* ================= progress ================= */
  V.progress = function (root) {
    const o = overall(); const secs = secStats(); const hist = S.history(14); const goal = S.state.goal; const maxH = Math.max(goal, ...hist.map((h) => h.count), 1);
    root.innerHTML = `
      <section class="page">
        <header class="page-head"><div><div class="eyebrow">Insights</div><h1 class="page-title font-display">Progress</h1><p class="page-sub">Everything below is calculated from your saved activity in this browser.</p></div></header>
        <div class="prog-top">
          <div class="glass prog-main tilt">
            ${UI.ring({ pct: o.pct, size: 190, stroke: 14, color: 'url(#g2)', sub: 'overall' })}
            <svg width="0" height="0" style="position:absolute"><defs><linearGradient id="g2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8b7bff"/><stop offset="1" stop-color="#3be8a4"/></linearGradient></defs></svg>
            <div class="prog-nums"><div><b class="font-display text-emerald-300" data-count="${o.done}">${o.done}</b><span>Completed</span></div><div><b class="font-display text-amber-200" data-count="${o.total - o.done}">${o.total - o.done}</b><span>Remaining</span></div><div><b class="font-display" data-count="${o.total}">${o.total}</b><span>Total</span></div></div>
          </div>
          <div class="glass prog-activity tilt"><div class="eyebrow">Last 14 days</div>
            <div class="week week-14">${hist.map((h) => `<div class="week-col" title="${fmtDate(h.key)}: ${plural(h.count, 'question')}"><div class="week-bar"><i style="height:${Math.round((h.count / maxH) * 100)}%" class="${h.key === S.today() ? 'today' : ''} ${h.count >= goal ? 'hit' : ''}"></i></div><span>${new Date(h.key.replace(/-/g, '/')).getDate()}</span></div>`).join('')}</div>
            <div class="act-foot"><span class="streak-pill">${I.flame}<b>${S.state.streak.current}</b> day streak</span><span class="text-xs text-muted">Best ${S.state.streak.best} · Goal ${goal}/day · Today ${S.todayCount()}</span></div></div>
        </div>
        <h2 class="block-title font-display">Section-wise</h2>
        <div class="ring-row">${secs.map((s) => `<a href="#/${s.key}" class="glass ring-card tilt" style="--accent:${s.meta.color}">${UI.ring({ pct: s.pct, size: 110, stroke: 9, color: s.meta.color, sub: `${s.done}/${s.total}` })}<h3 class="font-display">${s.meta.label}</h3><p>${s.total - s.done} remaining</p></a>`).join('')}</div>
        <h2 class="block-title font-display">Category-wise</h2>
        <div class="cat-grid">${secs.map((s) => { const cats = s.meta.categories.map((c) => ({ c, ...D.progress(s.meta.questions.filter((q) => q.category === c)) })); return `<div class="glass cat-card" style="--accent:${s.meta.color}"><header><span class="sec-ic sm">${I[SEC_ICON[s.key]]}</span><h3 class="font-display">${s.meta.label}</h3><span class="text-xs text-muted ml-auto">${s.done}/${s.total}</span></header>
          ${cats.map((x) => `<button class="cat-row" data-act="goto-cat" data-sec="${s.key}" data-cat="${esc(x.c)}"><span class="cat-name">${esc(x.c)}</span><span class="cat-num">${x.done}/${x.total}</span>${UI.bar(x.pct, s.meta.color)}</button>`).join('')}</div>`; }).join('')}</div>
      </section>`;
    Lab.animateIn(root);
  };

  /* ================= settings ================= */
  V.settings = function (root) {
    const st = S.state; const sw = (key, on, label, desc) => `<div class="set-row"><div><b>${label}</b><p>${desc}</p></div><button class="switch ${on ? 'on' : ''}" role="switch" aria-checked="${on}" aria-label="${label}" data-act="setting" data-key="${key}"><i></i></button></div>`;
    const osReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    root.innerHTML = `
      <section class="page">
        <header class="page-head"><div><div class="eyebrow">Preferences</div><h1 class="page-title font-display">Settings</h1><p class="page-sub">Saved automatically in this browser.</p></div></header>
        <div class="set-grid">
          <div class="glass set-card"><h3 class="font-display">Daily goal</h3><p class="text-muted text-sm">How many questions do you want to mark learned each day?</p>
            <div class="stepper"><button class="btn btn-ghost" data-act="goal" data-d="-1" aria-label="Decrease goal">−</button><input id="goal-input" type="number" min="1" max="100" value="${st.goal}" aria-label="Daily goal"><button class="btn btn-ghost" data-act="goal" data-d="1" aria-label="Increase goal">+</button></div>
            <div class="presets">${[3, 5, 10, 15, 20].map((n) => `<button class="chip-btn ${st.goal === n ? 'on' : ''}" data-act="goal-set" data-n="${n}">${n}/day</button>`).join('')}</div>
            <p class="text-xs text-faint mt-3">A day counts toward your streak when you mark at least one question as learned.</p></div>
          <div class="glass set-card"><h3 class="font-display">Motion</h3>
            ${sw('reduceMotion', st.settings.reduceMotion || osReduce, 'Reduce animations', osReduce ? 'Your system already requests reduced motion, so it is applied automatically.' : 'Turns off transitions, star movement and cursor effects.')}
            ${sw('cursorFx', st.settings.cursorFx, 'Cursor glow & trail', 'Soft cursor glow, trail, magnetic buttons and card tilt (desktop only).')}</div>
          <div class="glass set-card"><h3 class="font-display">Backup</h3><p class="text-muted text-sm">Progress lives in this browser’s LocalStorage. Export a copy to move it between browsers.</p>
            <div class="btn-row"><button class="btn btn-ghost magnetic" data-act="export">${I.download}<span>Export progress</span></button><label class="btn btn-ghost magnetic" tabindex="0">${I.upload}<span>Import</span><input type="file" accept="application/json" hidden id="import-file"></label></div>
            <p class="text-xs text-faint mt-3">Storage: ${S.storageOK() ? 'LocalStorage is available ✓' : '<b class="text-red-300">LocalStorage is blocked — progress will not persist.</b>'}</p></div>
          <div class="glass set-card danger-zone"><h3 class="font-display">Danger zone</h3>
            <div class="set-row"><div><b>Reset progress</b><p>Clears learned questions, daily progress and streaks. Bookmarks and notes stay.</p></div><button class="btn btn-danger-ghost" data-act="reset-progress">Reset</button></div>
            <div class="set-row"><div><b>Clear bookmarks</b><p>Removes all ${S.bookmarkCount()} bookmarks.</p></div><button class="btn btn-danger-ghost" data-act="clear-bookmarks">Clear</button></div>
            <div class="set-row"><div><b>Clear all local data</b><p>Wipes everything this app stored, including notes and settings.</p></div><button class="btn btn-danger-ghost" data-act="clear-all">Clear all</button></div></div>
        </div>
      </section>`;
  };

  /* ================= command palette (Ctrl + K) ================= */
  const P = { open: false, q: '', sec: 'all', idx: 0, results: [] };
  V.palette = {
    isOpen: () => P.open,
    open() {
      if (P.open) { $('#pal-input') && $('#pal-input').focus(); return; }
      P.open = true; P.idx = 0; const root = document.getElementById('palette-root'); P.prev = document.activeElement;
      root.innerHTML = `<div class="pal-backdrop" data-pal-bg><div class="pal glass" role="dialog" aria-modal="true" aria-label="Search questions">
        <div class="pal-search">${I.search}<input id="pal-input" type="text" placeholder="Search questions, categories, answers…" value="${esc(P.q)}" autocomplete="off" spellcheck="false" role="combobox" aria-expanded="true" aria-controls="pal-list"><kbd>Esc</kbd></div>
        <div class="pal-chips">${['all', ...D.ORDER].map((k) => `<button class="chip-btn ${P.sec === k ? 'on' : ''}" data-pal-sec="${k}">${k === 'all' ? 'All' : D.META[k].label}</button>`).join('')}</div>
        <div id="pal-list" class="pal-list" role="listbox"></div>
        <div class="pal-foot"><span><kbd>↑</kbd><kbd>↓</kbd> navigate</span><span><kbd>Enter</kbd> open</span><span id="pal-count"></span></div></div></div>`;
      const bg = root.firstElementChild; requestAnimationFrame(() => bg.classList.add('in'));
      const input = $('#pal-input'); input.focus(); input.select();
      input.addEventListener('input', Lab.debounce(() => { P.q = input.value; P.idx = 0; renderPal(); }, 70));
      input.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown') { e.preventDefault(); movePal(1); } else if (e.key === 'ArrowUp') { e.preventDefault(); movePal(-1); }
        else if (e.key === 'Enter') { e.preventDefault(); const r = P.results[P.idx]; if (r) go(r); }
        else if (e.key === 'Tab') { e.preventDefault(); const order = ['all', ...D.ORDER]; P.sec = order[(order.indexOf(P.sec) + (e.shiftKey ? -1 : 1) + order.length) % order.length]; syncChips(); P.idx = 0; renderPal(); }
      });
      bg.addEventListener('click', (e) => {
        if (e.target === bg) return V.palette.close();
        const c = e.target.closest('[data-pal-sec]'); if (c) { P.sec = c.dataset.palSec; syncChips(); P.idx = 0; renderPal(); input.focus(); return; }
        const t = e.target.closest('[data-pal-topic]'); if (t) { input.value = P.q = t.dataset.palTopic; P.idx = 0; renderPal(); input.focus(); return; }
        const r = e.target.closest('[data-pal-i]'); if (r) go(P.results[+r.dataset.palI]);
      });
      bg.addEventListener('mousemove', (e) => { const r = e.target.closest('[data-pal-i]'); if (r && +r.dataset.palI !== P.idx) { P.idx = +r.dataset.palI; markActive(false); } });
      renderPal();
    },
    close() {
      if (!P.open) return; P.open = false; const root = document.getElementById('palette-root'); const bg = root.firstElementChild;
      if (bg) { bg.classList.remove('in'); bg.classList.add('out'); }
      setTimeout(() => { root.innerHTML = ''; }, Lab.Effects.reduced ? 0 : 180);
      P.prev && P.prev.focus && P.prev.focus();
    },
  };
  function syncChips() { document.querySelectorAll('[data-pal-sec]').forEach((c) => c.classList.toggle('on', c.dataset.palSec === P.sec)); }
  function go(r) { if (!r) return; V.palette.close(); location.hash = '#/q/' + r.q.id; }
  function movePal(d) { if (!P.results.length) return; P.idx = (P.idx + d + P.results.length) % P.results.length; markActive(true); }
  function markActive(scroll) { document.querySelectorAll('[data-pal-i]').forEach((el) => { const on = +el.dataset.palI === P.idx; el.classList.toggle('active', on); el.setAttribute('aria-selected', on); if (on && scroll) el.scrollIntoView({ block: 'nearest' }); }); }
  function hl(text, toks) {
    let h = esc(text); toks.forEach((t) => { if (t.length) h = h.replace(new RegExp('(' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')(?![^<]*>)', 'ig'), '<mark>$1</mark>'); }); return h;
  }
  function renderPal() {
    const list = $('#pal-list'); if (!list) return; const toks = D.tokens(P.q);
    if (!toks.length) {
      const items = []; const last = S.state.last.id && D.byId.get(S.state.last.id); if (last) items.push({ q: last, tag: 'Continue where you left off' });
      const rnd = D.all.filter((q) => !S.isLearned(q.id) && (P.sec === 'all' || q.section === P.sec)); if (rnd.length) items.push({ q: rnd[Math.floor(Math.random() * rnd.length)], tag: 'Random unlearned' });
      D.all.filter((q) => S.isBookmarked(q.id)).slice(0, 3).forEach((q) => items.push({ q, tag: 'Bookmarked' }));
      P.results = items;
      list.innerHTML = `${items.length ? `<div class="pal-label">Quick jump</div>${items.map((r, i) => palItem(r, i, [], r.tag)).join('')}` : ''}<div class="pal-label">Try a topic</div><div class="pal-topics">${['OOPs', 'SQL', 'pointer', 'binary search', 'linked list', 'prime', 'STAR', 'TCP', 'closure', 'hashing'].map((t) => `<button class="chip-btn" data-pal-topic="${t}">${t}</button>`).join('')}</div>`;
      $('#pal-count').textContent = `${D.total} questions`; markActive(false); return;
    }
    const res = D.search(P.q, { section: P.sec }); P.results = res.slice(0, 40);
    $('#pal-count').textContent = `${res.length} match${res.length === 1 ? '' : 'es'}${res.length > 40 ? ' · showing 40' : ''}`;
    list.innerHTML = res.length ? P.results.map((r, i) => palItem(r, i, toks)).join('') : `<div class="pal-empty">No questions match “${esc(P.q)}”.</div>`;
    markActive(false);
  }
  function palItem(r, i, toks, tag) {
    const q = r.q; const m = D.META[q.section]; const inTitle = toks.length && toks.every((t) => q._title.includes(t));
    const ex = toks.length && !inTitle ? D.excerpt(q, toks) : tag || q.category;
    return `<div class="pal-item ${i === P.idx ? 'active' : ''}" data-pal-i="${i}" role="option" style="--accent:${m.color}"><span class="pal-dot"></span><div class="pal-main"><div class="pal-title">${hl(q.title, toks)}</div><div class="pal-ex">${hl(ex, toks)}</div></div><span class="pal-meta"><span class="id-badge">${q.id}</span>${S.isLearned(q.id) ? `<span class="pal-ok">${I.tick}</span>` : ''}</span></div>`;
  }

  /* ================= actions ================= */
  V.actions = {
    random() { const pool = D.all.filter((q) => !S.isLearned(q.id)); if (!pool.length) return Lab.toast('You have learned everything!', { icon: I.check }); location.hash = '#/q/' + pool[Math.floor(Math.random() * pool.length)].id; },
  };
})();
