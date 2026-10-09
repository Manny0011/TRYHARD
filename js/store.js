/* Centralised state + LocalStorage persistence. Everything the app remembers goes through Lab.Store. */
(function () {
  const Lab = (window.Lab = window.Lab || {});
  const KEY = 'interviewPrepLab.v1';
  const DEFAULTS = () => ({
    v: 1,
    learned: {},      // id -> 'YYYY-MM-DD' (the day it was marked learned)
    bookmarks: {},    // id -> timestamp
    notes: {},        // id -> text
    last: { id: null, section: null, category: null, at: 0 },
    goal: 5,
    daily: { date: '', count: 0 },
    streak: { current: 0, best: 0, lastStudy: null },
    settings: { reduceMotion: false, cursorFx: true },
  });

  let mem = null; const subs = new Set(); let saveTimer = 0; let storageOK = true;

  const pad = (n) => String(n).padStart(2, '0');
  const dateKey = (d = new Date()) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const shiftDay = (key, delta) => { const [y, m, d] = key.split('-').map(Number); return dateKey(new Date(y, m - 1, d + delta)); };

  function load() {
    let raw = null;
    try { raw = localStorage.getItem(KEY); } catch (e) { storageOK = false; }
    const base = DEFAULTS();
    if (raw) {
      try {
        const p = JSON.parse(raw);
        mem = Object.assign(base, p, {
          last: Object.assign(base.last, p.last), daily: Object.assign(base.daily, p.daily),
          streak: Object.assign(base.streak, p.streak), settings: Object.assign(base.settings, p.settings),
        });
      } catch (e) { mem = base; }
    } else mem = base;
    recompute(false);
  }
  function persist() {
    try { localStorage.setItem(KEY, JSON.stringify(mem)); } catch (e) { storageOK = false; }
  }
  function save(immediate) {
    if (immediate) { clearTimeout(saveTimer); persist(); return; }
    clearTimeout(saveTimer); saveTimer = setTimeout(persist, 250);
  }
  window.addEventListener('pagehide', persist);
  window.addEventListener('beforeunload', persist);

  /* Derived stats (daily progress + streak) are recomputed from the learned dates, so they can never drift. */
  function recompute(notify = true) {
    const today = dateKey();
    const days = {}; for (const id in mem.learned) days[mem.learned[id]] = (days[mem.learned[id]] || 0) + 1;
    mem.daily = { date: today, count: days[today] || 0 };
    let cursor = days[today] ? today : days[shiftDay(today, -1)] ? shiftDay(today, -1) : null; let cur = 0;
    while (cursor && days[cursor]) { cur++; cursor = shiftDay(cursor, -1); }
    const keys = Object.keys(days).sort();
    mem.streak.current = cur;
    mem.streak.best = Math.max(mem.streak.best || 0, cur);
    mem.streak.lastStudy = keys.length ? keys[keys.length - 1] : null;
    mem._days = days; // not persisted semantics; harmless
    if (notify) emit();
  }
  function emit(type) { subs.forEach((fn) => { try { fn(type); } catch (e) { console.error(e); } }); }

  const Store = {
    init: load,
    refresh: () => recompute(true),
    subscribe(fn) { subs.add(fn); return () => subs.delete(fn); },
    get state() { return mem; },
    storageOK: () => storageOK,
    dateKey, shiftDay,
    today: () => dateKey(),

    isLearned: (id) => !!mem.learned[id],
    isBookmarked: (id) => !!mem.bookmarks[id],
    learnedCount: () => Object.keys(mem.learned).length,
    bookmarkCount: () => Object.keys(mem.bookmarks).length,
    /** @returns {boolean} the new learned state */
    toggleLearned(id, force) {
      const want = force === undefined ? !mem.learned[id] : !!force;
      if (want) mem.learned[id] = dateKey(); else delete mem.learned[id];
      recompute(false); save(true); emit('learned'); return want;
    },
    toggleBookmark(id, force) {
      const want = force === undefined ? !mem.bookmarks[id] : !!force;
      if (want) mem.bookmarks[id] = Date.now(); else delete mem.bookmarks[id];
      save(true); emit('bookmark'); return want;
    },
    getNote: (id) => mem.notes[id] || '',
    setNote(id, text) { if (text) mem.notes[id] = text; else delete mem.notes[id]; save(); },
    setLast(patch) { Object.assign(mem.last, patch, { at: Date.now() }); save(); },
    setGoal(n) { mem.goal = Math.max(1, Math.min(100, Math.round(+n) || 5)); save(true); emit('goal'); },
    setSetting(k, v) { mem.settings[k] = v; save(true); emit('settings'); },
    todayCount: () => (mem._days && mem._days[dateKey()]) || 0,
    /** last n days oldest -> newest: [{key, count}] */
    history(n = 7) {
      const out = []; const t = dateKey();
      for (let i = n - 1; i >= 0; i--) { const k = shiftDay(t, -i); out.push({ key: k, count: (mem._days && mem._days[k]) || 0 }); }
      return out;
    },
    resetProgress() { mem.learned = {}; mem.streak = { current: 0, best: 0, lastStudy: null }; recompute(false); save(true); emit('reset'); },
    clearBookmarks() { mem.bookmarks = {}; save(true); emit('bookmark'); },
    clearAll() { mem = DEFAULTS(); recompute(false); try { localStorage.removeItem(KEY); } catch (e) {} save(true); emit('reset'); },
    exportJSON() { const c = JSON.parse(JSON.stringify(mem)); delete c._days; return JSON.stringify({ app: 'interview-prep-lab', exportedAt: new Date().toISOString(), data: c }, null, 2); },
    importJSON(text) {
      const p = JSON.parse(text); const d = p && p.data; if (!d || typeof d.learned !== 'object') throw new Error('Not a Prep Lab export');
      const base = DEFAULTS(); mem = Object.assign(base, d, { last: Object.assign(base.last, d.last), streak: Object.assign(base.streak, d.streak), settings: Object.assign(base.settings, d.settings) });
      recompute(false); save(true); emit('reset');
    },
  };
  Lab.Store = Store;
})();
