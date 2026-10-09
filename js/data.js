/* Builds the question index, categories, counts and search from window.LAB_DATA. */
(function () {
  const Lab = window.Lab;
  const D = window.LAB_DATA || {};
  const META = {
    technical: { key: 'technical', label: 'Technical', color: 'var(--c-technical)', hex: '#8b7bff', blurb: 'OOPs, C++, SQL, DBMS, OS, Networking, JavaScript and core CS — detailed Hinglish answers.' },
    dsa:       { key: 'dsa', label: 'DSA', color: 'var(--c-dsa)', hex: '#35d4f4', blurb: 'Easy → Medium data-structure and algorithm problems, grouped by pattern.' },
    loops:     { key: 'loops', label: 'Loops', color: 'var(--c-loops)', hex: '#ffc24a', blurb: 'JavaScript loop and number problems: GCD, primes, Armstrong, perfect numbers and patterns.' },
    hr:        { key: 'hr', label: 'HR Round', color: 'var(--c-hr)', hex: '#ff7ac6', blurb: 'Simple-English HR and communication answers you can say naturally.' },
  };
  const ORDER = ['technical', 'dsa', 'loops', 'hr'];
  const all = []; const byId = new Map();
  ORDER.forEach((k) => {
    const arr = D[k] || []; META[k].questions = arr; META[k].categories = [];
    arr.forEach((q) => {
      all.push(q); byId.set(q.id, q); if (!META[k].categories.includes(q.category)) META[k].categories.push(q.category);
      const first = (q.sections[0] && q.sections[0].body) || '';
      q._plain = q.sections.map((s) => s.title + ' ' + s.body).join('\n').replace(/```[a-z+]*/g, ' ').replace(/[*`#]/g, '');
      q._snippet = first.replace(/```[\s\S]*?```/g, ' ').replace(/[*`]/g, '').replace(/\s+/g, ' ').trim();
      q._hay = (q.id + ' ' + q.title + ' ' + q.category + ' ' + (q.tag || '') + ' ' + (q.difficulty || '') + ' ' + q.keywords.join(' ') + ' ' + q._plain).toLowerCase();
      q._title = q.title.toLowerCase(); q._cat = (q.category + ' ' + (q.tag || '')).toLowerCase(); q._kw = q.keywords.join(' ');
      q._idx = all.length - 1;
    });
    META[k].count = arr.length;
  });

  const tokens = (s) => s.toLowerCase().split(/\s+/).filter(Boolean);
  function score(q, toks) {
    let sc = 0;
    for (const t of toks) {
      if (!q._hay.includes(t)) return -1;
      if (q._title.includes(t)) sc += new RegExp('(^|[^a-z0-9])' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).test(q._title) ? 14 : 9;
      if (q.id.toLowerCase().includes(t)) sc += 10;
      if (q._cat.includes(t)) sc += 5;
      if (q._kw.includes(t)) sc += 3;
      sc += 1;
    }
    return sc;
  }
  function search(query, opts = {}) {
    const toks = tokens(query || ''); const pool = opts.section && opts.section !== 'all' ? META[opts.section].questions : all;
    if (!toks.length) return pool.map((q) => ({ q, score: 0 }));
    const out = [];
    for (const q of pool) { const s = score(q, toks); if (s >= 0) out.push({ q, score: s }); }
    out.sort((a, b) => b.score - a.score || a.q._idx - b.q._idx);
    return out;
  }
  function filter(f) {
    const S = Lab.Store;
    let list = f.q ? search(f.q, { section: f.section }).map((r) => r.q) : (f.section && f.section !== 'all' ? META[f.section].questions : all);
    return list.filter((q) => {
      if (f.category && f.category !== 'all' && q.category !== f.category) return false;
      if (f.difficulty && f.difficulty !== 'all' && q.difficulty !== f.difficulty) return false;
      if (f.status === 'done' && !S.isLearned(q.id)) return false;
      if (f.status === 'todo' && S.isLearned(q.id)) return false;
      if (f.status === 'bookmarked' && !S.isBookmarked(q.id)) return false;
      return true;
    });
  }
  function excerpt(q, toks, len = 110) {
    const text = q._plain.replace(/\s+/g, ' ');
    const low = text.toLowerCase(); let at = -1;
    for (const t of toks) { const i = low.indexOf(t); if (i >= 0 && (at < 0 || i < at)) at = i; }
    if (at < 0) return q._snippet.slice(0, len);
    const s = Math.max(0, at - 30);
    return (s ? '…' : '') + text.slice(s, s + len) + '…';
  }
  function progress(list) {
    const S = Lab.Store; let done = 0; for (const q of list) if (S.isLearned(q.id)) done++;
    return { done, total: list.length, pct: list.length ? Math.round((done / list.length) * 100) : 0 };
  }
  Lab.Data = { META, ORDER, all, byId, search, filter, excerpt, progress, tokens, total: all.length };
})();
