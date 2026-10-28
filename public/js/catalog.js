// 自然拼读目录：按阶段列出拼读家族，显示星星和进度
(function () {
  'use strict';
  const { Speech, Progress, Phonics, Mascot, openSettings, $, h, starsEl } = KEL;

  const owl = Mascot.el(76);
  $('#mascot').append(owl);
  owl.addEventListener('click', () => { Mascot.cheer(owl); Speech.speak('Pick a family and let\'s play!'); });
  $('#settings').addEventListener('click', openSettings);
  $('#coins').textContent = `🪙 ${Progress.data.coins}`;

  const lastId = Progress.data.last && Progress.data.last.family;
  const root = $('#levels');
  let currentEl = null;

  PHONICS.levels.forEach((level) => {
    const grid = h('div', { class: 'families' });
    level.families.forEach((family) => {
      const stars = Progress.familyStars(family);
      const pct = Progress.familyPercent(family);
      const isCur = family.id === lastId;
      const card = h('a', { class: 'fam' + (isCur ? ' current' : ''), href: `family.html?f=${encodeURIComponent(family.id)}` },
        isCur ? h('span', { class: 'here-tag' }, '📍 上次学到这') : null,
        h('div', { class: 'top' },
          h('span', { class: 'ico', style: { background: level.color + '22' } }, family.icon || '⭐'),
          h('div', {},
            h('h3', {}, family.title, family.sound ? h('span', { class: 'muted small' }, ' ' + family.sound) : null),
            h('div', { class: 'zh' }, family.zh))),
        h('div', { class: 'pchips' }, family.patterns.map((p) => h('span', { class: 'pchip', style: { color: level.color } }, p.label))),
        h('div', { class: 'bar' }, h('i', { style: { width: pct + '%' } })),
        h('div', { class: 'foot' }, starsEl(stars), h('span', { class: 'muted small' }, `${pct}%`)));
      if (isCur) currentEl = card;
      grid.append(card);
    });
    root.append(h('section', { class: 'level', id: `level-${level.id}` },
      h('div', { class: 'level-head', style: { background: level.color } },
        h('span', { class: 'no' }, level.no),
        h('div', {}, h('h2', {}, `${level.icon || ''} ${level.zh} · ${level.title}`), h('p', {}, level.desc || ''))),
      grid));
  });

  if (currentEl) setTimeout(() => currentEl.scrollIntoView({ behavior: 'smooth', block: 'center' }), 300);
})();
