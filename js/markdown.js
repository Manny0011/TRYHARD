/* Tiny Markdown renderer + syntax highlighter (no dependencies). */
(function () {
  const Lab = window.Lab;
  const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  /* ---------- syntax highlighting ---------- */
  const KW = {
    cpp: 'class struct public private protected virtual override final const static void int double float char bool long short unsigned signed auto return if else for while do switch case break continue new delete template typename namespace using nullptr true false this friend operator typedef enum try catch throw explicit inline constexpr default noexcept include',
    js: 'function const let var return if else for while do switch case break continue new class extends async await try catch throw import export from default typeof instanceof of in this null undefined true false yield static get set super',
    sql: 'select from where group by having order join inner left right full outer on as and or not in is null insert into values update set delete create table primary key foreign references begin commit rollback limit distinct count max min sum avg over partition case when then else end index unique view alter drop exists between like asc desc union all dense_rank row_number rank',
    bash: 'git cd ls echo curl sudo npm node if then fi for do done',
  };
  const TYPES = new Set('string vector map unordered_map set unordered_set queue stack deque list pair priority_queue unique_ptr shared_ptr weak_ptr cout cin endl std size_t int double float char bool long short void INT VARCHAR Map Set Array Promise Math Object'.split(' '));
  const LANG = { 'c++': 'cpp', c: 'cpp', cpp: 'cpp', javascript: 'js', js: 'js', sql: 'sql', bash: 'bash', sh: 'bash', cmd: 'bash', http: 'http' };
  const wordSet = (l) => new Set(KW[l].split(' '));
  const SETS = {}; Object.keys(KW).forEach((k) => (SETS[k] = wordSet(k)));

  function highlight(code, langRaw) {
    const lang = LANG[(langRaw || '').toLowerCase()];
    if (!lang) return esc(code);
    if (lang === 'http') {
      return code.split('\n').map((l, i) => {
        if (i === 0 || /^(GET|POST|PUT|PATCH|DELETE|HTTP)/.test(l)) return esc(l).replace(/^(GET|POST|PUT|PATCH|DELETE|HEAD|OPTIONS)\b/, '<span class="tk-k">$1</span>').replace(/(HTTP\/[\d.]+)/, '<span class="tk-t">$1</span>');
        const m = l.match(/^([A-Za-z-]+):(.*)$/); return m ? `<span class="tk-f">${esc(m[1])}</span>:${esc(m[2])}` : esc(l);
      }).join('\n');
    }
    const kws = SETS[lang]; const ci = lang === 'sql';
    const cm = lang === 'sql' ? '--[^\\n]*|/\\*[\\s\\S]*?\\*/' : lang === 'bash' ? '#[^\\n]*' : '//[^\\n]*|/\\*[\\s\\S]*?\\*/';
    const re = new RegExp(`(${cm})|("(?:[^"\\\\\\n]|\\\\.)*"|'(?:[^'\\\\\\n]|\\\\.)*'|\`(?:[^\`\\\\]|\\\\.)*\`)|(^[ \\t]*#\\s*\\w+)|(\\b\\d[\\d_.]*\\b)|([A-Za-z_]\\w*)(?=\\s*\\()|([A-Za-z_]\\w*)`, 'gm');
    let out = ''; let last = 0; let m;
    while ((m = re.exec(code))) {
      out += esc(code.slice(last, m.index)); last = re.lastIndex;
      if (m[1]) out += `<span class="tk-c">${esc(m[1])}</span>`;
      else if (m[2]) out += `<span class="tk-s">${esc(m[2])}</span>`;
      else if (m[3]) out += `<span class="tk-k">${esc(m[3])}</span>`;
      else if (m[4]) out += `<span class="tk-n">${m[4]}</span>`;
      else if (m[5]) out += kws.has(ci ? m[5].toLowerCase() : m[5]) ? `<span class="tk-k">${m[5]}</span>` : `<span class="tk-f">${m[5]}</span>`;
      else if (m[6]) out += kws.has(ci ? m[6].toLowerCase() : m[6]) ? `<span class="tk-k">${m[6]}</span>` : TYPES.has(m[6]) ? `<span class="tk-t">${m[6]}</span>` : m[6];
    }
    return out + esc(code.slice(last));
  }

  /* ---------- markdown ---------- */
  function inline(s) {
    const codes = [];
    s = s.replace(/`([^`]+)`/g, (m, c) => { codes.push(c); return '\u0000' + (codes.length - 1) + '\u0000'; });
    s = esc(s);
    s = s.replace(/\*\*([^*]+?)\*\*/g, '<strong>$1</strong>').replace(/(^|[^*\w])\*([^*\s][^*]*?)\*(?!\*)/g, '$1<em>$2</em>');
    return s.replace(/\u0000(\d+)\u0000/g, (m, i) => `<code>${esc(codes[+i])}</code>`);
  }
  function codeBlock(code, lang) {
    const label = (lang || 'text').toLowerCase();
    return `<div class="code-block"><div class="code-head"><span class="code-lang">${esc(label === 'text' ? 'text' : label)}</span><button type="button" class="copy-btn" data-act="copy" aria-label="Copy code"><svg viewBox="0 0 24 24" class="ic"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V6a2 2 0 0 1 2-2h9"/></svg><span>Copy</span></button></div><pre><code>${highlight(code, lang)}</code></pre></div>`;
  }
  const UL = /^\s*[-*]\s+(.*)$/; const OL = /^\s*(\d+)\.\s*(.*)$/;
  function render(text) {
    const lines = (text || '').split('\n'); const out = []; let i = 0; let para = [];
    const flush = () => {
      if (!para.length) return;
      const html = para.map((l) => { const br = / {2,}$/.test(l) || /\\$/.test(l); return inline(l.trim().replace(/\\$/, '')) + (br ? '<br>' : ' '); }).join('').replace(/(<br>)? $/, '');
      out.push(`<p>${html}</p>`); para = [];
    };
    while (i < lines.length) {
      const line = lines[i];
      const f = line.match(/^```\s*([\w+#-]*)\s*$/);
      if (f) { flush(); const buf = []; i++; while (i < lines.length && !/^```/.test(lines[i])) buf.push(lines[i++]); i++; out.push(codeBlock(buf.join('\n').replace(/\s+$/, ''), f[1])); continue; }
      if (!line.trim()) { flush(); i++; continue; }
      if (/^-{3,}\s*$/.test(line)) { flush(); i++; continue; }
      const h = line.match(/^(#{1,6})\s+(.*)$/); if (h) { flush(); out.push(`<h4>${inline(h[2])}</h4>`); i++; continue; }
      if (/^>\s?/.test(line)) { flush(); const b = []; while (i < lines.length && /^>\s?/.test(lines[i])) b.push(lines[i++].replace(/^>\s?/, '')); out.push(`<blockquote>${render(b.join('\n'))}</blockquote>`); continue; }
      const isUl = UL.test(line); const isOl = OL.test(line);
      if (isUl || isOl) {
        flush(); const re = isUl ? UL : OL; const items = [];
        while (i < lines.length) {
          const l = lines[i]; const m = l.match(re);
          if (m) { items.push(isUl ? m[1] : m[2]); i++; continue; }
          if (!l.trim()) { let j = i; while (j < lines.length && !lines[j].trim()) j++; if (j < lines.length && re.test(lines[j])) { i = j; continue; } break; }
          if (/^```/.test(l) || /^(#{1,6})\s/.test(l) || UL.test(l) || OL.test(l)) break;
          if (items.length) { items[items.length - 1] += ' ' + l.trim(); i++; continue; } break;
        }
        const tag = isUl ? 'ul' : 'ol'; out.push(`<${tag}>${items.map((t) => `<li>${inline(t.trim())}</li>`).join('')}</${tag}>`); continue;
      }
      para.push(line); i++;
    }
    flush(); return out.join('');
  }

  /* Interview follow-ups: render "**Q: …** answer" blocks as Q/A cards */
  function renderFollowups(text) {
    const chunks = (text || '').split(/\n(?=\*\*Q:)/).map((c) => c.trim()).filter(Boolean); const parts = [];
    for (const c of chunks) {
      const m = c.match(/^\*\*Q:\s*([\s\S]*?)\*\*\s*([\s\S]*)$/);
      if (!m) { parts.push(`<div class="qa-note">${render(c)}</div>`); continue; }
      const q = m[1].replace(/\s+/g, ' ').trim(); const a = m[2].replace(/^\s*A:\s*/, '').trim();
      parts.push(`<div class="qa"><div class="qa-q"><span class="qa-tag">Q</span><span>${inline(q)}</span></div><div class="qa-a"><span class="qa-tag qa-tag-a">A</span><div class="prose-sm">${render(a)}</div></div></div>`);
    }
    return parts.join('');
  }
  Lab.md = { render, renderFollowups, inline, highlight, esc };
})();
