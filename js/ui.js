/* Shared UI pieces: icons, rings, bars, modal, confirm. */
(function () {
  const Lab = window.Lab; const esc = Lab.md.esc;
  const p = (d) => `<svg viewBox="0 0 24 24" class="ic" aria-hidden="true">${d}</svg>`;
  const icons = {
    dashboard: p('<rect x="3" y="3" width="7" height="9" rx="2"/><rect x="14" y="3" width="7" height="5" rx="2"/><rect x="14" y="12" width="7" height="9" rx="2"/><rect x="3" y="16" width="7" height="5" rx="2"/>'),
    technical: p('<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M9 9h6v6H9zM9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3"/>'),
    dsa: p('<circle cx="12" cy="5" r="2.5"/><circle cx="6" cy="18" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M11 7.4 7 15.6M13 7.4l4 8.2"/>'),
    loops: p('<path d="M17 2l4 4-4 4"/><path d="M3 11V9a3 3 0 0 1 3-3h15M7 22l-4-4 4-4"/><path d="M21 13v2a3 3 0 0 1-3 3H3"/>'),
    hr: p('<path d="M21 12a8 8 0 0 1-11.6 7.1L3 21l1.9-5.4A8 8 0 1 1 21 12z"/><path d="M8.5 11h7M8.5 14h4"/>'),
    all: p('<path d="M4 6h16M4 12h16M4 18h16"/><circle cx="2" cy="6" r=".6"/><circle cx="2" cy="12" r=".6"/><circle cx="2" cy="18" r=".6"/>'),
    bookmark: p('<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>'),
    check: p('<circle cx="12" cy="12" r="9"/><path d="m8 12.5 2.7 2.7L16 9.5"/>'),
    progress: p('<path d="M3 20h18"/><rect x="5" y="11" width="3.5" height="9" rx="1"/><rect x="10.3" y="5" width="3.5" height="15" rx="1"/><rect x="15.6" y="8" width="3.5" height="12" rx="1"/>'),
    settings: p('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>'),
    search: p('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'),
    flame: p('<path d="M12 3c1 3.5 5 5.5 5 10a5 5 0 0 1-10 0c0-2 1-3.2 2-4.2.2 1.4.9 2.2 1.8 2.5C10.2 8.4 10.5 5.6 12 3z"/>'),
    arrowL: p('<path d="M19 12H5M11 6l-6 6 6 6"/>'),
    arrowR: p('<path d="M5 12h14M13 6l6 6-6 6"/>'),
    chevron: p('<path d="m6 9 6 6 6-6"/>'),
    shuffle: p('<path d="M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/>'),
    target: p('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>'),
    close: p('<path d="M6 6l12 12M18 6 6 18"/>'),
    note: p('<path d="M5 3h10l4 4v14H5z"/><path d="M14 3v5h5M8 13h8M8 17h5"/>'),
    spark: p('<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/>'),
    download: p('<path d="M12 3v12M7 10l5 5 5-5M4 20h16"/>'),
    upload: p('<path d="M12 15V3M7 8l5-5 5 5M4 20h16"/>'),
    trash: p('<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>'),
    core: p('<circle cx="12" cy="12" r="9"/><path d="M12 8v4l3 2"/>'),
    why: p('<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 .9-1 1.7M12 17h.01"/>'),
    example: p('<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"/>'),
    code: p('<path d="m8 8-5 4 5 4M16 8l5 4-5 4M14 5l-4 14"/>'),
    steps: p('<path d="M9 6h12M9 12h12M9 18h12"/><path d="M3.5 5.5 4.5 5v2M3 11h2l-2 2h2M3 17h2v1H4v1h1v1H3"/>'),
    followups: p('<path d="M21 12a8 8 0 0 1-11.6 7.1L3 21l1.9-5.4A8 8 0 1 1 21 12z"/>'),
    mistakes: p('<path d="M12 3 2 20h20z"/><path d="M12 10v4M12 17h.01"/>'),
    other: p('<circle cx="12" cy="12" r="9"/><path d="M12 8h.01M11 12h1v5h1"/>'),
    star: '<svg viewBox="0 0 24 24" class="ic ic-star" aria-hidden="true"><path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/></svg>',
    tick: '<svg viewBox="0 0 24 24" class="ic ic-tick" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>',
  };

  function ring({ pct = 0, size = 120, stroke = 10, color = 'var(--violet)', label = '', sub = '', id = '' }) {
    const r = (size - stroke) / 2; const c = +(2 * Math.PI * r).toFixed(2);
    return `<div class="pring" style="width:${size}px;height:${size}px" ${id ? `id="${id}"` : ''}>
      <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" aria-hidden="true">
        <circle class="ring-bg" cx="${size / 2}" cy="${size / 2}" r="${r}" stroke-width="${stroke}" fill="none"/>
        <circle class="ring-fg" cx="${size / 2}" cy="${size / 2}" r="${r}" stroke-width="${stroke}" fill="none" stroke-linecap="round" stroke="${color}"
          stroke-dasharray="${c}" stroke-dashoffset="${c}" data-pct="${pct}" transform="rotate(-90 ${size / 2} ${size / 2})"/>
      </svg>
      <div class="ring-label"><b class="font-display" data-count="${pct}" data-suffix="%">${pct}%</b>${sub ? `<small>${esc(sub)}</small>` : ''}</div></div>`;
  }
  function bar(pct, color) {
    return `<div class="bar" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100"><div class="bar-fill" data-pct="${pct}" style="width:0;--c:${color || 'var(--violet)'}"></div></div>`;
  }

  /* ---------- modal ---------- */
  function openModal(html, { onClose, labelledBy } = {}) {
    const root = document.getElementById('modal-root'); const prev = document.activeElement;
    root.innerHTML = `<div class="modal-backdrop" data-modal-bg><div class="modal glass" role="dialog" aria-modal="true" ${labelledBy ? `aria-labelledby="${labelledBy}"` : ''}>${html}</div></div>`;
    const bg = root.firstElementChild; requestAnimationFrame(() => bg.classList.add('in'));
    const close = (val) => {
      bg.classList.remove('in'); bg.classList.add('out'); document.removeEventListener('keydown', key, true);
      setTimeout(() => { root.innerHTML = ''; prev && prev.focus && prev.focus(); }, Lab.Effects.reduced ? 0 : 220);
      onClose && onClose(val);
    };
    const key = (e) => {
      if (e.key === 'Escape') { e.stopPropagation(); close(false); }
      if (e.key === 'Tab') { const f = bg.querySelectorAll('button,[href],input,select,textarea'); if (!f.length) return; const a = f[0], z = f[f.length - 1]; if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); } else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); } }
    };
    document.addEventListener('keydown', key, true);
    bg.addEventListener('click', (e) => { if (e.target === bg) close(false); const b = e.target.closest('[data-modal-act]'); if (b) close(b.dataset.modalAct === 'ok'); });
    return { close, el: bg };
  }
  function confirmModal({ title, body, confirmLabel = 'Confirm', danger = false }) {
    return new Promise((resolve) => {
      const m = openModal(`<h2 id="m-title" class="font-display text-xl font-semibold">${esc(title)}</h2><p class="modal-body">${esc(body)}</p>
        <div class="modal-actions"><button class="btn btn-ghost" data-modal-act="cancel">Cancel</button><button class="btn ${danger ? 'btn-danger' : 'btn-primary'} magnetic" data-modal-act="ok">${esc(confirmLabel)}</button></div>`, { labelledBy: 'm-title', onClose: resolve });
      const ok = m.el.querySelector('[data-modal-act="ok"]'); ok && ok.focus();
    });
  }
  Lab.UI = { icons, ring, bar, openModal, confirm: confirmModal };
})();
