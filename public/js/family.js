// 拼读家族学习页：学一学（组合 + 代表单词 + 拼读大卡）、听音选图、选拼写
(function () {
  'use strict';
  const { Speech, Sfx, Progress, Phonics, Mascot, Confetti, Toast, openSettings, $, h, shuffle, wordEl, starsEl } = KEL;

  const params = new URLSearchParams(location.search);
  const all = Phonics.allFamilies();
  const found = Phonics.findFamily(params.get('f')) || all[0];
  const { level, family } = found;
  const state = {
    pattern: family.patterns.find((p) => p.id === params.get('p')) || family.patterns[0],
    mode: ['learn', 'listen', 'spell'].includes(params.get('m')) ? params.get('m') : 'learn',
  };

  document.title = `${family.title} · 自然拼读 · 宝贝英语乐园`;
  document.documentElement.style.setProperty('--c', level.color);
  $('#crumb').textContent = `${level.icon || '🔤'} 第${level.no}关 · ${level.zh}`;
  $('#fam-title').textContent = `${family.icon || ''} ${family.title}`;
  $('#fam-sub').textContent = `${family.zh} · ${family.patterns.length} 种拼法`;
  $('#fam-tip').textContent = family.tip || '点单词卡片听发音，粉色字母就是今天的主角！';
  $('#settings').addEventListener('click', openSettings);

  const owl = Mascot.el(84);
  $('#mascot').append(owl);
  owl.addEventListener('click', () => { Mascot.cheer(owl); Speech.speak(Phonics.soundTexts(family, state.pattern)); });

  const updateCoins = () => ($('#coins').textContent = `🪙 ${Progress.data.coins}`);
  updateCoins();

  const syncUrl = () => {
    const q = new URLSearchParams({ f: family.id, p: state.pattern.id, m: state.mode });
    history.replaceState(null, '', `?${q}`);
  };

  // 顶部声音按钮：家族共用一个音时显示家族音，否则显示当前组合的音
  const soundBtn = $('#fam-sound');
  const renderSoundBtn = () => { $('#fam-ipa').textContent = family.sound || state.pattern.sound || state.pattern.label; };
  soundBtn.addEventListener('click', () => { Mascot.cheer(owl); Speech.speak(Phonics.soundTexts(family, state.pattern)); });

  // ---------- 组合标签 ----------
  function renderTabs() {
    const tabs = $('#tabs');
    tabs.innerHTML = '';
    family.patterns.forEach((p) => {
      const done = Progress.patternDone(family, p);
      const heard = Progress.heardList(family.id, p.id).length;
      const t = h('button', {
        class: 'tab' + (p === state.pattern && state.mode === 'learn' ? ' on' : '') + (done ? ' done' : ''),
        onclick: () => { Sfx.pop(); state.pattern = p; state.mode = 'learn'; render(); Speech.speak(Phonics.soundTexts(family, p)); },
      }, h('span', { class: 'lbl' }, p.label, h('span', { class: 'key' }, p.words[0].e)), h('span', { class: 'muted small' }, done ? '✅' : `${Math.min(heard, p.words.length)}/${p.words.length}`));
      tabs.append(t);
    });
  }

  document.querySelectorAll('.mode').forEach((b) => b.addEventListener('click', () => {
    Sfx.pop(); state.mode = b.dataset.mode; render();
  }));

  // ---------- 学一学 ----------
  function renderLearn(stage) {
    const p = state.pattern;
    const say = Phonics.soundTexts(family, p);
    const cards = [];
    const grid = h('div', { class: 'words' });

    const speakCard = (card, wd, opts = {}) => {
      cards.forEach((c) => c.classList.remove('speaking'));
      card.classList.add('speaking');
      Speech.speak(Phonics.plain(wd.w), { onend: () => { card.classList.remove('speaking'); opts.onend && opts.onend(); }, rate: opts.rate });
      const plain = Phonics.plain(wd.w);
      const wasDone = Progress.patternDone(family, p);
      Progress.markHeard(family.id, p.id, plain);
      card.classList.add('heard');
      updateCoins();
      if (!wasDone && Progress.patternDone(family, p)) setTimeout(celebratePattern, 900);
    };

    p.words.forEach((wd) => {
      const heard = Progress.heardList(family.id, p.id).includes(Phonics.plain(wd.w));
      const card = h('div', { class: 'wcard' + (heard ? ' heard' : ''), role: 'button', tabindex: 0 },
        h('span', { class: 'check' }, '✅'),
        h('span', { class: 'pic' }, wd.e),
        wordEl(wd.w),
        h('span', { class: 'zh' }, wd.zh),
        h('button', { class: 'btn ghost small', onclick: (e) => { e.stopPropagation(); Sfx.pop(); openFocus(wd, card); } }, '🧩 拼一拼'));
      card.addEventListener('click', () => speakCard(card, wd));
      cards.push(card);
      grid.append(card);
    });

    // 全部读一遍：依次点亮每张卡
    const readAll = () => {
      let i = 0;
      const next = () => { if (i < cards.length) { const c = cards[i]; const wd = p.words[i++]; c.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); speakCard(c, wd, { onend: () => setTimeout(next, 350) }); } };
      next();
    };

    const soundLine = family.sound
      ? `${family.title} 家族都发 ${family.sound}，这一种写成「${p.label}」`
      : `「${p.label}」发 ${p.sound || '它自己的音'}`;
    stage.append(
      h('div', { class: 'pattern-card' },
        h('div', { class: 'pattern-big' }, p.label),
        h('div', { class: 'info' },
          h('b', { style: { fontSize: '19px' } }, soundLine),
          h('p', {}, '点卡片听单词，点「拼一拼」把字母拼起来读。全部听过就能拿到 ⭐！'),
          h('div', { class: 'row' },
            h('button', { class: 'btn blue small', onclick: () => Speech.speak(say) }, '🔊 听发音'),
            h('button', { class: 'btn green small', onclick: readAll }, '▶️ 全部读一遍')))),
      grid);

    if (Progress.patternDone(family, p)) stage.append(doneBanner());
  }

  function doneBanner() {
    const idx = family.patterns.indexOf(state.pattern);
    const nextP = family.patterns.find((q, i) => i > idx && !Progress.patternDone(family, q)) ||
      family.patterns.find((q) => !Progress.patternDone(family, q));
    return h('div', { class: 'done-banner' },
      h('span', { style: { fontSize: '36px' } }, '🌟'),
      h('span', { class: 'txt' }, nextP ? `「${state.pattern.label}」学会啦！下一个是「${nextP.label}」` : '这个家族的拼法全学完啦！来玩游戏挑战一下吧'),
      nextP
        ? h('button', { class: 'btn small primary', onclick: () => { state.pattern = nextP; render(); window.scrollTo({ top: 0, behavior: 'smooth' }); Speech.speak(Phonics.soundTexts(family, nextP)); } }, '下一个 ➡️')
        : h('button', { class: 'btn small primary', onclick: () => { state.mode = 'listen'; render(); } }, '去游戏 🎮'));
  }

  function celebratePattern() {
    Sfx.win(); Confetti.burst(); Mascot.cheer(owl);
    Speech.speak('Great job!');
    renderTabs();
    const stage = $('#stage');
    if (state.mode === 'learn' && !stage.querySelector('.done-banner')) stage.append(doneBanner());
    checkFamilyComplete();
  }

  // 拼读大卡：字母块 → 点亮 → 合在一起读
  function openFocus(wd, card) {
    const plain = Phonics.plain(wd.w);
    const tiles = [];
    Phonics.parts(wd.w).forEach((part) => {
      if (part.hl) tiles.push({ t: part.t, hl: true });
      else part.t.split('').forEach((ch) => tiles.push({ t: ch }));
    });
    const say = state.pattern.say || family.say;
    const tilesEl = h('div', { class: 'tiles' });
    const tileEls = tiles.map((t) => {
      const el = h('button', { class: 'tile' + (t.hl ? ' hl' : '') }, t.t);
      el.addEventListener('click', () => {
        Sfx.pop();
        el.classList.add('lit'); setTimeout(() => el.classList.remove('lit'), 400);
        if (t.hl && say) Speech.speak(say);
      });
      tilesEl.append(el);
      return el;
    });
    const blend = () => {
      tilesEl.classList.remove('joined');
      tileEls.forEach((el, i) => setTimeout(() => { el.classList.add('lit'); Sfx.pop(); setTimeout(() => el.classList.remove('lit'), 380); }, i * 420));
      setTimeout(() => {
        tilesEl.classList.add('joined');
        Speech.speak([plain, plain], { rate: 0.75 });
        Progress.markHeard(family.id, state.pattern.id, plain);
        card && card.classList.add('heard');
        updateCoins();
      }, tileEls.length * 420 + 150);
    };
    const modal = h('div', { class: 'modal-mask', onclick: (e) => { if (e.target === modal) close(); } },
      h('div', { class: 'modal focus' },
        h('button', { class: 'icon-btn close', onclick: () => close(), 'aria-label': '关闭' }, '✖️'),
        h('div', { class: 'pic' }, wd.e),
        h('div', { class: 'zh' }, wd.zh),
        tilesEl,
        h('p', { class: 'muted small' }, say ? '点粉色的字母块听它的声音，再点「拼起来」' : '粉色是这一课的主角，点「拼起来」一起读'),
        h('div', { class: 'actions' },
          h('button', { class: 'btn primary', onclick: blend }, '🔗 拼起来'),
          h('button', { class: 'btn blue', onclick: () => Speech.speak(plain) }, '🔊 再听'),
          h('button', { class: 'btn yellow', onclick: () => Speech.speak(plain, { rate: 0.6 }) }, '🐢 慢慢读'))));
    const close = () => {
      modal.remove();
      if (Progress.patternDone(family, state.pattern)) { renderTabs(); }
      const stage = $('#stage');
      if (state.mode === 'learn' && Progress.patternDone(family, state.pattern) && !stage.querySelector('.done-banner')) celebratePattern();
    };
    document.body.append(modal);
    setTimeout(blend, 250);
  }

  // ---------- 游戏公共 ----------
  // 家族所有单词（带所属组合）
  const pool = [];
  family.patterns.forEach((p) => p.words.forEach((w) => pool.push({ p, w })));
  const ROUNDS = Math.min(8, pool.length);

  function makeRounds() {
    // 尽量让每个组合都出现
    const byP = family.patterns.map((p) => shuffle(pool.filter((x) => x.p === p)));
    const out = [];
    for (let i = 0; out.length < ROUNDS; i++) {
      const list = byP[i % byP.length];
      if (list.length) out.push(list.shift());
      if (byP.every((l) => !l.length)) break;
    }
    return shuffle(out);
  }

  function gameShell(stage, title, onRound, gameKey) {
    const rounds = makeRounds();
    let idx = 0, score = 0;
    const bar = h('i', { style: { width: '0%' } });
    const scoreEl = h('span', { class: 'score' }, '⭐ 0');
    const body = h('div');
    stage.append(h('div', { class: 'game' },
      h('div', { class: 'game-top' }, h('div', { class: 'bar' }, bar), scoreEl),
      h('div', { class: 'muted' }, title),
      body));

    const next = () => {
      bar.style.width = (idx / rounds.length) * 100 + '%';
      if (idx >= rounds.length) return finish();
      body.innerHTML = '';
      onRound(body, rounds[idx], (firstTry) => {
        if (firstTry) { score++; scoreEl.textContent = `⭐ ${score}`; }
        idx++;
        setTimeout(next, 1300);
      });
    };
    const finish = () => {
      const before = Progress.familyStars(family);
      Progress.setGame(family.id, gameKey, score, rounds.length);
      updateCoins();
      const ratio = score / rounds.length;
      const s = ratio === 1 ? 3 : ratio >= 0.75 ? 2 : ratio >= 0.5 ? 1 : 0;
      body.innerHTML = '';
      body.append(h('div', { class: 'result' },
        h('div', { class: 'big' }, s === 3 ? '🏆' : s === 2 ? '🎉' : s === 1 ? '👍' : '💪'),
        starsEl(s),
        h('p', {}, `答对 ${score} / ${rounds.length} 题！` + (ratio >= 0.75 ? ' 太厉害了！' : ' 再来一次会更好哦～')),
        h('div', { class: 'actions' },
          h('button', { class: 'btn primary', onclick: () => render() }, '🔁 再玩一次'),
          h('button', { class: 'btn ghost', onclick: () => { state.mode = gameKey === 'listen' ? 'spell' : 'learn'; render(); } },
            gameKey === 'listen' ? '🧩 去选拼写' : '📖 回去学习'))));
      if (s >= 2) { Sfx.win(); Confetti.burst(); Speech.speak(s === 3 ? 'Perfect! You are a super reader!' : 'Well done!'); }
      else Speech.speak('Nice try! Let\'s try again!');
      Mascot.cheer(owl);
      renderTabs();
      if (before < 3) checkFamilyComplete();
    };
    next();
  }

  // ---------- 听音选图 ----------
  function renderListen(stage) {
    gameShell(stage, '👂 听一听，选出对的图', (body, item, done) => {
      const plain = Phonics.plain(item.w.w);
      // 两个干扰项：优先选其他组合、不同图片的单词
      const others = shuffle(pool.filter((x) => x.w.e !== item.w.e && Phonics.plain(x.w.w) !== plain))
        .sort((a, b) => (a.p === item.p) - (b.p === item.p)).slice(0, 2);
      const opts = shuffle([item, ...others]);
      let firstTry = true, solved = false;
      const play = () => Speech.speak(plain);
      const playBtn = h('button', { class: 'play-big pulse', onclick: play, 'aria-label': '再听一次' }, '🔊');
      const choices = h('div', { class: 'choices' });
      opts.forEach((o) => {
        const btn = h('button', { class: 'choice' }, o.w.e, h('span', { class: 'word hidden' }, Phonics.plain(o.w.w)));
        btn.addEventListener('click', () => {
          if (solved) return;
          if (o === item) {
            solved = true;
            btn.classList.add('right'); btn.querySelector('.word').classList.remove('hidden');
            Sfx.good(); Speech.speak(plain);
            done(firstTry);
          } else {
            firstTry = false;
            btn.classList.remove('wrong'); void btn.offsetWidth; btn.classList.add('wrong');
            Sfx.bad(); setTimeout(play, 450);
          }
        });
        choices.append(btn);
      });
      body.append(h('h2', {}, '听到的是哪一个？'), playBtn, choices);
      setTimeout(play, 300);
    }, 'listen');
  }

  // ---------- 选拼写 ----------
  function renderSpell(stage) {
    const label = (p) => p.label.replace(/^-/, '');
    // 选项：本家族的组合；不够 3 个就从同一关的其他家族补
    const base = [...new Set(family.patterns.map(label))];
    const extra = [];
    if (base.length < 3) {
      level.families.forEach((f) => f !== family && f.patterns.forEach((p) => { const l = label(p); if (!base.includes(l) && !extra.includes(l)) extra.push(l); }));
    }
    gameShell(stage, '🧩 看图听音，选出正确的拼法', (body, item, done) => {
      const plain = Phonics.plain(item.w.w);
      const answer = label(item.p);
      let opts = base.filter((l) => l !== answer);
      opts = shuffle(opts).slice(0, 3);
      if (opts.length < 2) opts = opts.concat(shuffle(extra).slice(0, 2 - opts.length));
      opts = shuffle([answer, ...opts]);

      const blanks = [];
      const wordLine = h('div', { class: 'spell-word' }, Phonics.parts(item.w.w).map((part) => {
        if (!part.hl) return h('span', {}, part.t);
        const b = h('span', { class: 'blank' }, part.t);
        blanks.push(b);
        return b;
      }));
      let firstTry = true, solved = false;
      const play = () => Speech.speak(plain);
      const optsEl = h('div', { class: 'opts' });
      opts.forEach((l) => {
        const btn = h('button', { class: 'opt' }, l);
        btn.addEventListener('click', () => {
          if (solved) return;
          if (l === answer) {
            solved = true;
            btn.classList.add('right');
            blanks.forEach((b) => b.classList.add('filled'));
            Sfx.good(); Speech.speak(plain);
            done(firstTry);
          } else {
            firstTry = false;
            btn.classList.remove('wrong'); void btn.offsetWidth; btn.classList.add('wrong');
            Sfx.bad(); setTimeout(play, 450);
          }
        });
        optsEl.append(btn);
      });
      body.append(
        h('div', { class: 'spell-pic', onclick: play, style: { cursor: 'pointer' } }, item.w.e),
        h('button', { class: 'btn blue small', onclick: play }, '🔊 听一听'),
        wordLine, optsEl);
      setTimeout(play, 300);
    }, 'spell');
  }

  // 家族三颗星全拿到：贴纸点亮
  function checkFamilyComplete() {
    if (Progress.familyStars(family) === 3) {
      setTimeout(() => {
        Confetti.burst(48, [family.icon || '⭐', '⭐', '🎉']);
        Toast.show(`${family.icon || '⭐'} ${family.title} 家族通关！贴纸已点亮`, 3200);
      }, 600);
    }
  }

  // ---------- 上一个 / 下一个家族 ----------
  function renderNav() {
    const i = all.findIndex((x) => x.family === family);
    const prev = all[i - 1], next = all[i + 1];
    const nav = $('#fam-nav');
    nav.innerHTML = '';
    nav.append(
      prev ? h('a', { class: 'btn ghost small', href: `?f=${encodeURIComponent(prev.family.id)}` }, `⬅️ ${prev.family.title}`) : h('span'),
      next ? h('a', { class: 'btn ghost small', href: `?f=${encodeURIComponent(next.family.id)}` }, `${next.family.title} ➡️`) : h('span'));
  }

  function render() {
    Speech.stop();
    syncUrl();
    renderTabs();
    renderSoundBtn();
    document.querySelectorAll('.mode').forEach((b) => b.classList.toggle('on', b.dataset.mode === state.mode));
    const stage = $('#stage');
    stage.innerHTML = '';
    if (state.mode === 'learn') renderLearn(stage);
    else if (state.mode === 'listen') renderListen(stage);
    else renderSpell(stage);
  }

  render();
  renderNav();
})();
