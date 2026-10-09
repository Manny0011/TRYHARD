#!/usr/bin/env node
/* Parses the three source Markdown files into data/*.js (classic <script> files, so the app works from file://).
   Usage: node tools/build-data.js            (reads tools/source/*.md) */
const fs = require('fs');
const path = require('path');
const SRC = path.join(__dirname, 'source');
const OUT = path.join(__dirname, '..', 'data');
const read = (f) => fs.readFileSync(path.join(SRC, f), 'utf8').replace(/\r\n/g, '\n');
const pad = (n, w = 3) => String(n).padStart(w, '0');

/* ---------- body cleanup ---------- */
function cleanBody(raw) {
  let s = raw;
  // Pandoc export artifacts in the first 59 technical entries: `\n`{=tex}`\n*`{=tex}\*Q: ...\*\*
  s = s.replace(/`\\n`\{=tex\}`\\n\*`\{=tex\}\\\*/g, '\n\n**');
  s = s.replace(/\\\*\\\*/g, '**').replace(/\\\*/g, '*');
  s = s.replace(/`\\n(\d*)`\{=tex\}\.?/g, (m, d) => (d ? '\n' + d + '.' : '\n'));
  // Repair fences: a closing fence line that carries trailing prose ("``` Here p stores ...")
  const out = []; let inFence = false;
  for (const line of s.split('\n')) {
    if (!inFence) {
      if (/^\s*```/.test(line)) { inFence = true; out.push(line.replace(/^\s*```\s*/, '```')); }
      else out.push(line);
    } else if (/^\s*```/.test(line)) {
      inFence = false;
      const rest = line.replace(/^\s*```\s*/, '');
      out.push('```');
      if (rest) { out.push(''); out.push(rest); }
    } else out.push(line);
  }
  s = out.join('\n');
  // remove list-continuation indents introduced by hard-wrapping (outside fences)
  const out2 = []; inFence = false;
  for (const line of s.split('\n')) {
    if (/^```/.test(line)) inFence = !inFence;
    out2.push(!inFence && /^ {2,4}\S/.test(line) && !/^\s*([-*]|\d+\.)\s/.test(line) ? line.trim() : line);
  }
  s = out2.join('\n');
  return s.replace(/\n{3,}/g, '\n\n').trim();
}

const SECTION_MAP = [
  [/^core answer/i, 'Core Answer', 'core'],
  [/^why/i, 'Why / Concept Clarity', 'why'],
  [/^practical example/i, 'Practical Example', 'example'],
  [/^code/i, 'Code / Example', 'code'],
  [/^step-by-step/i, 'Step-by-Step', 'steps'],
  [/^interview follow/i, 'Interview Follow-ups + Answers', 'followups'],
  [/^common mistake/i, 'Common Mistakes', 'mistakes'],
  [/^interview answer/i, 'Interview Answer', 'core'],
  [/^possible follow/i, 'Possible Follow-up + Answer', 'followups'],
];
function mapSection(title) {
  for (const [re, name, kind] of SECTION_MAP) if (re.test(title)) return { title: name, kind, orig: title };
  return { title: title.replace(/\s*[—-]+\s*DORA$/, ''), kind: 'other', orig: title };
}

function parseBlocks(text, headingRe) {
  const lines = text.split('\n'); const blocks = []; let cur = null; let inFence = false;
  for (const line of lines) {
    if (/^```/.test(line.trim())) inFence = !inFence;
    const m = !inFence && line.match(headingRe);
    if (m) { cur = { m, lines: [] }; blocks.push(cur); continue; }
    if (cur) cur.lines.push(line);
  }
  return blocks;
}

function parseSections(lines) {
  const sections = []; let cur = null; let inFence = false; let meta = {};
  for (const line of lines) {
    if (/^```/.test(line.trim())) inFence = !inFence;
    const h = !inFence && line.match(/^###\s+(.*)$/);
    if (h) { cur = { head: h[1].trim(), body: [] }; sections.push(cur); continue; }
    if (!cur) {
      const c = line.match(/^\*\*(Category|Round \/ Category):\*\*\s*(.*)$/);
      if (c) meta.category = c[2].trim();
      continue;
    }
    cur.body.push(line);
  }
  const res = [];
  for (const s of sections) {
    if (/^mark as learned/i.test(s.head)) continue;
    let body = s.body.join('\n').replace(/\n-{3,}\s*$/m, '');
    body = body.replace(/(\n|^)-{3,}\s*$/g, '').trim();
    body = cleanBody(body);
    if (!body) continue;
    res.push({ ...mapSection(s.head), body });
  }
  return { meta, sections: res };
}

const STOP = new Set('what is are the a an of and or to in vs how do you does kya hai hota hote ka ke ki mein se ko for it with on kab'.split(' '));
const kw = (...parts) => [...new Set(parts.join(' ').toLowerCase().replace(/[^a-z0-9+#/ ]+/g, ' ').split(/\s+/).filter((w) => w && w.length > 1 && !STOP.has(w)))];

/* ---------- Technical ---------- */
function technical() {
  const t = read('Allied_Softech_Technical_Detailed_Hinglish.md');
  const blocks = parseBlocks(t, /^##\s+Q?(\d+)\.\s+(.*)$/);
  const catFor = (n) => {
    if (n >= 60 && n <= 102) return (n === 90 || n === 91) ? 'Web' : 'Networking';
    if (n >= 103 && n <= 110) return 'DSA';
    if (n >= 111 && n <= 113) return 'SQL';
    if (n === 114) return 'DBMS';
    if (n === 115 || n === 116) return 'OS';
    if (n >= 117 && n <= 119) return 'JavaScript';
    if (n === 120) return 'Web';
    return null;
  };
  return blocks.map((b) => {
    const n = +b.m[1]; const title = b.m[2].trim();
    const { meta, sections } = parseSections(b.lines);
    const category = meta.category || catFor(n);
    if (!category) throw new Error('No category for Q' + n);
    return { id: 'TECH-' + pad(n), n, section: 'technical', category, title, keywords: kw(title, category), sections };
  });
}

/* ---------- HR ---------- */
const HR_GROUPS = {
  Introduction: 'About You', Company: 'About You', Motivation: 'About You',
  Strength: 'Self-Assessment', Weakness: 'Self-Assessment', Learning: 'Self-Assessment', Feedback: 'Self-Assessment', Failure: 'Self-Assessment',
  'Problem Solving': 'Work Approach', Debugging: 'Work Approach', Quality: 'Work Approach', Technology: 'Work Approach', Communication: 'Work Approach',
  Teamwork: 'Teamwork & Pressure', Conflict: 'Teamwork & Pressure', Pressure: 'Teamwork & Pressure', Requirements: 'Teamwork & Pressure', Ethics: 'Teamwork & Pressure',
  Project: 'Projects',
  Salary: 'Offer & Logistics', Relocation: 'Offer & Logistics', 'Work Style': 'Offer & Logistics',
  Career: 'Career & Closing', Closing: 'Career & Closing',
};
function hr() {
  const t = read('Allied_Softech_HR_Round_Easy_English.md');
  const blocks = parseBlocks(t, /^##\s+(\d+)\.\s+(.*)$/);
  return blocks.map((b) => {
    const n = +b.m[1]; const title = b.m[2].trim();
    const { meta, sections } = parseSections(b.lines);
    const tag = meta.category; const category = HR_GROUPS[tag];
    if (!category) throw new Error('No HR group for ' + tag);
    return { id: 'HR-' + pad(n), n, section: 'hr', category, tag, title, keywords: kw(title, tag, category), sections };
  });
}

/* ---------- DSA + Loops ---------- */
function dsaLoops() {
  const t = read('Allied_Softech_DSA_150_Loops_30_Questions.md');
  const dsa = []; const loops = []; let mode = null; let cat = null;
  const loopCat = (n) => {
    if (n <= 6) return 'Basic Loops';
    if ([7, 8, 9, 10, 11, 29].includes(n)) return 'Digit Problems';
    if (n >= 12 && n <= 14) return 'Primes & Fibonacci';
    if (n === 15 || n === 16) return 'GCD & LCM';
    if ([17, 18, 21, 22, 23, 24, 25].includes(n)) return 'Special Numbers';
    if ([19, 20, 26, 27, 28].includes(n)) return 'Divisors & Factors';
    if (n === 30) return 'Patterns';
    throw new Error('loop ' + n);
  };
  for (const line of t.split('\n')) {
    if (/^#\s+.*DSA\s+—/.test(line)) { mode = 'dsa'; continue; }
    if (/^#\s+.*JavaScript Loops/.test(line)) { mode = 'loops'; continue; }
    if (/^#\s+/.test(line)) { mode = null; continue; }
    const h2 = line.match(/^##\s+(.*)$/);
    if (h2 && mode === 'dsa') { cat = h2[1].trim(); continue; }
    const q = line.match(/^###\s+(DSA|LOOP)-(\d+)\s+—\s+\[(Easy|Medium|Hard)\]\s+(.*)$/);
    if (!q) continue;
    const n = +q[2]; const title = q[4].trim(); const difficulty = q[3];
    if (q[1] === 'DSA') dsa.push({ id: 'DSA-' + pad(n), n, section: 'dsa', category: cat, difficulty, title, keywords: kw(title, cat), sections: [] });
    else { const c = loopCat(n); loops.push({ id: 'LOOP-' + pad(n), n, section: 'loops', category: c, difficulty, title, keywords: kw(title, c), sections: [] }); }
  }
  return { dsa, loops };
}

/* ---------- write + verify ---------- */
function write(name, arr) {
  const body = '/* Generated by tools/build-data.js from the source Markdown. Do not edit by hand. */\n' +
    'window.LAB_DATA = window.LAB_DATA || {};\nwindow.LAB_DATA.' + name + ' = ' + JSON.stringify(arr) + ';\n';
  fs.writeFileSync(path.join(OUT, (name === 'technical' ? 'technical' : name) + '.js'), body);
}
function verify(name, arr, count, prefix) {
  if (arr.length !== count) throw new Error(`${name}: expected ${count}, got ${arr.length}`);
  arr.forEach((q, i) => { if (q.id !== `${prefix}-${pad(i + 1)}`) throw new Error(`${name}: ID gap at index ${i}: ${q.id}`); if (!q.title) throw new Error('no title ' + q.id); });
}
const tech = technical(); const h = hr(); const { dsa, loops } = dsaLoops();
verify('technical', tech, 120, 'TECH'); verify('dsa', dsa, 150, 'DSA'); verify('loops', loops, 30, 'LOOP'); verify('hr', h, 26, 'HR');
tech.forEach((q) => { if (q.sections.length < 3) throw new Error('thin technical entry ' + q.id); if (/\{=tex\}|\\n/.test(JSON.stringify(q.sections).replace(/\\\\n/g, ''))) { /* checked below */ } });
const leftovers = tech.filter((q) => /\{=tex\}/.test(JSON.stringify(q)));
if (leftovers.length) throw new Error('artifact leftovers in ' + leftovers.map((q) => q.id).join(','));
write('technical', tech); write('dsa', dsa); write('loops', loops); write('hr', h);
const cnt = (a) => a.reduce((m, q) => ((m[q.category] = (m[q.category] || 0) + 1), m), {});
console.log('OK  technical', tech.length, 'dsa', dsa.length, 'loops', loops.length, 'hr', h.length, 'total', tech.length + dsa.length + loops.length + h.length);
console.log('technical categories', cnt(tech)); console.log('dsa categories', cnt(dsa)); console.log('loop categories', cnt(loops)); console.log('hr groups', cnt(h));
