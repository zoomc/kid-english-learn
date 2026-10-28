// 首页：吉祥物问候、继续学习、统计、贴纸册
(function () {
  'use strict';
  const { Speech, Sfx, Progress, Phonics, Mascot, Toast, openSettings, $, h } = KEL;

  const owl = Mascot.el(120);
  $('#mascot').append(owl);
  const greetings = [
    'Hello! I am Ollie. Let\'s read together!',
    'Hi there! Are you ready to read?',
    'Good job! Let\'s learn some sounds!',
  ];
  let gi = 0;
  owl.addEventListener('click', () => {
    Mascot.cheer(owl);
    Speech.speak(greetings[gi++ % greetings.length]);
  });

  $('#settings').addEventListener('click', openSettings);
  $('#coins').textContent = `🪙 ${Progress.data.coins}`;
  document.querySelectorAll('[data-soon]').forEach((el) => el.addEventListener('click', () => {
    Sfx.pop();
    Toast.show('这个乐园还在建设中，先去玩自然拼读吧！');
  }));

  const all = Phonics.allFamilies();

  // 继续学习：上次学到的家族
  const last = Progress.data.last && Phonics.findFamily(Progress.data.last.family);
  if (last) {
    const c = $('#continue');
    c.classList.remove('hidden');
    c.href = `phonics/family.html?f=${encodeURIComponent(last.family.id)}`;
    $('#continue-title').textContent = `继续学习：${last.family.title}`;
    $('#continue-sub').textContent = `${last.level.zh} · 已完成 ${Progress.familyPercent(last.family)}%`;
  }

  // 统计
  const doneFamilies = all.filter((x) => Progress.familyStars(x.family) === 3).length;
  let words = 0;
  Object.values(Progress.data.heard).forEach((l) => (words += l.length));
  const stat = (e, n, label) => h('span', { class: 'chip' }, `${e} ${n} ${label}`);
  $('#stats').append(
    stat('🔥', Progress.streak(), '天连续学习'),
    stat('🗣️', words, '个单词读过'),
    stat('🏆', doneFamilies, '个家族通关'),
  );

  // 贴纸册：每个家族一张
  const box = $('#stickers');
  all.forEach(({ level, family }) => {
    const stars = Progress.familyStars(family);
    const got = stars === 3;
    box.append(h('a', {
      class: 'sticker ' + (got ? 'got' : stars ? '' : 'lock'),
      href: `phonics/family.html?f=${encodeURIComponent(family.id)}`,
      title: `${level.zh} · ${family.title}${got ? '（已点亮）' : `（${stars}/3 星）`}`,
    }, family.icon || '⭐'));
  });
  $('#sticker-count').textContent = `${doneFamilies} / ${all.length}`;
})();
