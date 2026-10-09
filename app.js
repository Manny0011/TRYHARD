/* Interview Prep Lab — bootstrap, router and global event handling. */
(function () {
  const Lab = window.Lab; const S = Lab.Store; const D = Lab.Data; const V = Lab.Views; const I = Lab.UI.icons;
  const view = () => document.getElementById('view');
  const scrollMem = {}; let prevRoute = null;
  const LISTS = ['all', 'bookmarks', 'completed'];

  /* ---------- router ---------- */
  function route() {
    const hash = (location.hash || '#/dashboard').replace(/^#\/?/, ''); const parts = hash.split('/'); let key = parts[0] || 'dashboard';
    const v = view(); document.body.classList.remove('nav-open'); V.palette.close();
    if (V.active.route === 'list' && V.active.key) scrollMem[V.active.key] = window.scrollY;
    let title = 'Dashboard'; let from = V.active.route;
    if (D.META[key] || LISTS.includes(key)) {
      V.setActiveNav('list', key); V.list(v, key); title = (D.META[key] ? D.META[key].label : { all: 'All Questions', bookmarks: 'Bookmarks', completed: 'Completed' }[key]);
      if (D.META[key]) S.setLast({ section: key });
    } else if (key === 'q') {
      const q = D.byId.get(decodeURIComponent(parts[1] || '')); V.setActiveNav('q', q ? q.section : null); V.detail(v, q ? q.id : parts[1]); title = q ? `${q.id} · ${q.title}` : 'Not found';
    } else if (['progress', 'settings', 'dashboard'].includes(key)) { V.setActiveNav(key); V[key](v); title = key[0].toUpperCase() + key.slice(1); }
    else { location.replace('#/dashboard'); return; }
    document.title = `${title} — Interview Prep Lab`;
    v.classList.remove('page-enter'); void v.offsetWidth; v.classList.add('page-enter');
    window.scrollTo(0, 0);
    if (from === 'q' && V.active.route === 'list' && scrollMem[V.active.key] != null) { const y = scrollMem[V.active.key]; requestAnimationFrame(() => window.scrollTo(0, y)); }
    if (from !== undefined) v.focus({ preventScroll: true });
    prevRoute = key;
  }

  /* ---------- helpers ---------- */
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
    return new Promise((res, rej) => { const t = document.createElement('textarea'); t.value = text; t.style.cssText = 'position:fixed;opacity:0'; document.body.appendChild(t); t.select(); try { document.execCommand('copy') ? res() : rej(); } catch (e) { rej(e); } t.remove(); });
  }
  function download(name, text) { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([text], { type: 'application/json' })); a.download = name; document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500); }
  const idOf = (el) => { const c = el.closest('[data-id]'); return c && c.dataset.id; };
  const rerender = () => route();

  /* ---------- click actions ---------- */
  document.addEventListener('click', async (e) => {
    const el = e.target.closest('[data-act]'); if (!el) return; const act = el.dataset.act;
    switch (act) {
      case 'open-nav': document.body.classList.add('nav-open'); break;
      case 'close-nav': document.body.classList.remove('nav-open'); break;
      case 'open-search': document.body.classList.remove('nav-open'); V.palette.open(); break;
      case 'learn': e.preventDefault(); e.stopPropagation(); V.toggleLearn(idOf(el), el); break;
      case 'bookmark': e.preventDefault(); e.stopPropagation(); V.toggleBookmark(idOf(el)); break;
      case 'learn-detail': V.toggleLearn(el.dataset.id, el); break;
      case 'bookmark-detail': V.toggleBookmark(el.dataset.id); break;
      case 'copy': {
        const code = el.closest('.code-block').querySelector('code').textContent; const label = el.querySelector('span');
        try { await copyText(code); el.classList.add('copied'); label.textContent = 'Copied!'; Lab.toast('Code copied to clipboard', { type: 'success', icon: I.check }); }
        catch (err) { label.textContent = 'Press Ctrl+C'; const r = document.createRange(); r.selectNodeContents(el.closest('.code-block').querySelector('code')); const sel = getSelection(); sel.removeAllRanges(); sel.addRange(r); }
        setTimeout(() => { el.classList.remove('copied'); label.textContent = 'Copy'; }, 1600); break;
      }
      case 'toggle-sec': { const s = el.closest('.dsec'); const open = !s.classList.contains('open'); s.classList.toggle('open', open); el.setAttribute('aria-expanded', open); break; }
      case 'toggle-all': {
        const open = el.dataset.open === '1'; document.querySelectorAll('.dsec').forEach((s) => { s.classList.toggle('open', open); s.querySelector('.dsec-head').setAttribute('aria-expanded', open); });
        el.dataset.open = open ? '0' : '1'; el.textContent = open ? 'Collapse all' : 'Expand all'; break;
      }
      case 'set-cat': V.setListFilter('category', el.dataset.val); break;
      case 'clear-filters': V.clearFilters(); break;
      case 'random': V.actions.random(); break;
      case 'goto-cat': { const st = (Lab.listState[el.dataset.sec] = Lab.listState[el.dataset.sec] || { category: 'all', difficulty: 'all', status: 'all', q: '', section: 'all' }); Object.assign(st, { category: el.dataset.cat, q: '', status: 'all', difficulty: 'all', _init: true }); S.setLast({ section: el.dataset.sec, category: el.dataset.cat }); location.hash = '#/' + el.dataset.sec; break; }
      case 'setting': {
        const k = el.dataset.key; const os = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        S.setSetting(k, !S.state.settings[k]);
        const on = S.state.settings[k] || (k === 'reduceMotion' && os); el.classList.toggle('on', on); el.setAttribute('aria-checked', on);
        Lab.Effects.apply(); break;
      }
      case 'goal': S.setGoal(S.state.goal + +el.dataset.d); V.settings(view()); break;
      case 'goal-set': S.setGoal(+el.dataset.n); V.settings(view()); break;
      case 'export': download(`interview-prep-lab-progress-${S.today()}.json`, S.exportJSON()); Lab.toast('Progress exported', { type: 'success', icon: I.download }); break;
      case 'reset-progress': if (await Lab.UI.confirm({ title: 'Reset all progress?', body: 'This clears every learned question, your daily progress and your streaks. Bookmarks and notes are kept. This cannot be undone.', confirmLabel: 'Reset progress', danger: true })) { S.resetProgress(); Lab.toast('Progress reset', { icon: I.trash }); } break;
      case 'clear-bookmarks': if (await Lab.UI.confirm({ title: 'Clear all bookmarks?', body: `Remove all ${S.bookmarkCount()} bookmarked questions? Your learned progress is not affected.`, confirmLabel: 'Clear bookmarks', danger: true })) { S.clearBookmarks(); Lab.toast('Bookmarks cleared', { icon: I.trash }); rerender(); } break;
      case 'clear-all': if (await Lab.UI.confirm({ title: 'Clear all local data?', body: 'This permanently deletes learned questions, bookmarks, notes, streaks and settings stored in this browser. Consider exporting a backup first.', confirmLabel: 'Delete everything', danger: true })) { S.clearAll(); Lab.Effects.apply(); Lab.toast('All local data cleared', { icon: I.trash }); } break;
    }
  });
  document.querySelector('[data-skip]').addEventListener('click', (e) => { e.preventDefault(); view().focus(); });

  /* ---------- inputs ---------- */
  const filterInput = Lab.debounce((t) => V.setListFilter('q', t.value.trim()), 90);
  document.addEventListener('input', (e) => {
    const t = e.target;
    if (t.matches('[data-filter="q"]')) filterInput(t);
    else if (t.id === 'note-box') { const st = document.getElementById('note-status'); st.textContent = 'Saving…'; clearTimeout(t._n); t._n = setTimeout(() => { S.setNote(t.dataset.id, t.value); st.textContent = t.value ? 'Saved ✓' : 'Autosaves in this browser'; }, 350); }
  });
  document.addEventListener('change', (e) => {
    const t = e.target;
    if (t.matches('select[data-filter]')) V.setListFilter(t.dataset.filter, t.value);
    else if (t.id === 'goal-input') { S.setGoal(t.value); V.settings(view()); }
    else if (t.id === 'import-file' && t.files[0]) {
      const r = new FileReader(); r.onload = () => { try { S.importJSON(r.result); Lab.Effects.apply(); Lab.toast('Progress imported', { type: 'success', icon: I.upload }); } catch (err) { Lab.toast('Could not import: ' + err.message, { type: 'error' }); } }; r.readAsText(t.files[0]); t.value = '';
    }
  });

  /* ---------- keyboard ---------- */
  document.addEventListener('keydown', (e) => {
    const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName) || e.target.isContentEditable;
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); V.palette.isOpen() ? V.palette.close() : V.palette.open(); return; }
    if (e.key === 'Escape') { if (V.palette.isOpen()) { V.palette.close(); return; } document.body.classList.remove('nav-open'); return; }
    if (typing || e.ctrlKey || e.metaKey || e.altKey || V.palette.isOpen() || document.querySelector('.modal-backdrop')) return;
    if (e.key === '/') { e.preventDefault(); V.palette.open(); return; }
    const nav = V.detailNav; if (V.active.route !== 'q' || !nav) return;
    if (e.key === 'ArrowRight' && nav.next) location.hash = '#/q/' + nav.next;
    else if (e.key === 'ArrowLeft' && nav.prev) location.hash = '#/q/' + nav.prev;
    else if (e.key.toLowerCase() === 'l') V.toggleLearn(nav.id, document.getElementById('detail-learn'));
    else if (e.key.toLowerCase() === 'b') V.toggleBookmark(nav.id);
  });

  /* ---------- boot ---------- */
  S.init();
  let chromeQueued = false;
  S.subscribe((type) => {
    if (!chromeQueued) { chromeQueued = true; requestAnimationFrame(() => { chromeQueued = false; V.renderChrome(); }); }
    if (type === 'reset') rerender();
  });
  const dayCheck = () => { if (S.state.daily.date !== S.today()) { S.refresh(); if (V.active.route === 'dashboard' || V.active.route === 'progress') rerender(); } };
  document.addEventListener('visibilitychange', () => { if (!document.hidden) dayCheck(); }); window.addEventListener('focus', dayCheck);
  Lab.Effects.init(); V.active = { route: null, key: null }; V.renderChrome();
  window.addEventListener('hashchange', route);
  route();
  document.documentElement.classList.add('ready');
})();
