// 全站公共能力：发音、音效、学习进度、吉祥物、撒花
(function () {
  'use strict';

  // ---------- 设置 ----------
  const SETTINGS_KEY = 'kel-settings-v1';
  const Settings = {
    data: { accent: 'en-US', rate: 0.8, sfx: true },
    load() {
      try { Object.assign(this.data, JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{}')); } catch (e) {}
      return this.data;
    },
    save() {
      try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(this.data)); } catch (e) {}
    },
  };
  Settings.load();

  // ---------- 发音（浏览器自带 TTS） ----------
  // 按口音挑一个听起来最自然的声音；不同系统的声音名字不同，按优先级匹配
  const PREFERRED = {
    'en-US': ['Samantha', 'Google US English', 'Microsoft Aria', 'Microsoft Jenny', 'Ava', 'Allison', 'Nicky', 'Karen'],
    'en-GB': ['Google UK English Female', 'Serena', 'Kate', 'Daniel', 'Microsoft Sonia', 'Microsoft Libby', 'Google UK English Male'],
  };
  const Speech = {
    supported: 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window,
    voice: null,
    pickVoice() {
      if (!this.supported) return null;
      const voices = speechSynthesis.getVoices();
      if (!voices.length) return null;
      const accent = Settings.data.accent;
      const sameLang = voices.filter((v) => v.lang && v.lang.replace('_', '-').startsWith(accent));
      const english = voices.filter((v) => v.lang && v.lang.toLowerCase().startsWith('en'));
      for (const name of PREFERRED[accent] || []) {
        const v = sameLang.find((x) => x.name.includes(name)) || english.find((x) => x.name.includes(name));
        if (v) return (this.voice = v);
      }
      // 避开 macOS 的搞怪声音
      const odd = /Albert|Bad News|Bahh|Bells|Boing|Bubbles|Cellos|Good News|Jester|Organ|Superstar|Trinoids|Whisper|Wobble|Zarvox|Fred|Junior|Ralph|Kathy|Grandma|Grandpa|Eddy|Flo|Reed|Rocko|Sandy|Shelley/;
      this.voice = sameLang.find((v) => !odd.test(v.name)) || english.find((v) => !odd.test(v.name)) || null;
      return this.voice;
    },
    // texts: 字符串或数组（依次读）；opts.rate 相对倍速；opts.onend 全部读完回调
    speak(texts, opts = {}) {
      if (!this.supported) { Toast.show('这个浏览器不支持发音，换 Safari 或 Chrome 试试'); opts.onend && opts.onend(); return; }
      const list = (Array.isArray(texts) ? texts : [texts]).filter(Boolean);
      speechSynthesis.cancel();
      if (!this.voice) this.pickVoice();
      list.forEach((t, i) => {
        const u = new SpeechSynthesisUtterance(t);
        u.lang = this.voice ? this.voice.lang : Settings.data.accent;
        if (this.voice) u.voice = this.voice;
        u.rate = Settings.data.rate * (opts.rate || 1);
        u.pitch = 1.05;
        if (i === 0 && opts.onstart) u.onstart = opts.onstart;
        if (i === list.length - 1 && opts.onend) { u.onend = opts.onend; u.onerror = opts.onend; }
        speechSynthesis.speak(u);
      });
    },
    stop() { if (this.supported) speechSynthesis.cancel(); },
  };
  if (Speech.supported) {
    Speech.pickVoice();
    speechSynthesis.addEventListener && speechSynthesis.addEventListener('voiceschanged', () => Speech.pickVoice());
  }

  // ---------- 音效（WebAudio 合成，无需音频文件） ----------
  const Sfx = {
    ctx: null,
    tone(freq, start, dur, type = 'sine', vol = 0.18) {
      if (!Settings.data.sfx) return;
      try {
        this.ctx = this.ctx || new (window.AudioContext || window.webkitAudioContext)();
        const c = this.ctx, o = c.createOscillator(), g = c.createGain();
        o.type = type; o.frequency.value = freq;
        g.gain.setValueAtTime(0.0001, c.currentTime + start);
        g.gain.exponentialRampToValueAtTime(vol, c.currentTime + start + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + start + dur);
        o.connect(g).connect(c.destination);
        o.start(c.currentTime + start); o.stop(c.currentTime + start + dur + 0.05);
      } catch (e) {}
    },
    pop() { this.tone(660, 0, 0.08, 'triangle', 0.12); },
    good() { this.tone(784, 0, 0.12); this.tone(1047, 0.1, 0.22); },
    bad() { this.tone(220, 0, 0.18, 'square', 0.06); this.tone(180, 0.12, 0.22, 'square', 0.06); },
    win() { [523, 659, 784, 1047, 1319].forEach((f, i) => this.tone(f, i * 0.09, 0.25, 'triangle', 0.14)); },
  };

  // ---------- 学习进度（存在本机浏览器） ----------
  const PROGRESS_KEY = 'kel-progress-v1';
  const today = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };
  const Progress = {
    data: null,
    load() {
      try { this.data = JSON.parse(localStorage.getItem(PROGRESS_KEY) || 'null'); } catch (e) {}
      this.data = Object.assign({ heard: {}, games: {}, coins: 0, last: null, days: [] }, this.data || {});
      return this.data;
    },
    save() {
      try { localStorage.setItem(PROGRESS_KEY, JSON.stringify(this.data)); } catch (e) {}
    },
    touchDay() {
      const t = today();
      if (!this.data.days.includes(t)) { this.data.days.push(t); this.data.days = this.data.days.slice(-400); this.save(); }
    },
    // 连续学习天数（今天或昨天算起）
    streak() {
      const set = new Set(this.data.days);
      const d = new Date();
      if (!set.has(today())) d.setDate(d.getDate() - 1);
      let n = 0;
      for (;;) {
        const k = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
        if (!set.has(k)) break;
        n++; d.setDate(d.getDate() - 1);
      }
      return n;
    },
    markHeard(familyId, patternId, word) {
      const k = `${familyId}/${patternId}`;
      const list = this.data.heard[k] || (this.data.heard[k] = []);
      if (!list.includes(word)) { list.push(word); this.data.coins += 1; }
      this.data.last = { family: familyId, pattern: patternId, t: Date.now() };
      this.touchDay();
      this.save();
    },
    heardList(familyId, patternId) { return this.data.heard[`${familyId}/${patternId}`] || []; },
    patternDone(family, pattern) {
      const heard = this.heardList(family.id, pattern.id);
      return pattern.words.every((w) => heard.includes(Phonics.plain(w.w)));
    },
    setGame(familyId, game, score, total) {
      const g = this.data.games[familyId] || (this.data.games[familyId] = {});
      const prev = g[game] || 0;
      g[game] = Math.max(prev, score / total);
      this.data.coins += score;
      this.data.last = Object.assign({}, this.data.last, { family: familyId, t: Date.now() });
      this.touchDay();
      this.save();
    },
    // 家族星星：⭐ 学完所有组合 ⭐ 听音游戏 ≥75% ⭐ 拼写游戏 ≥75%
    familyStars(family) {
      const g = this.data.games[family.id] || {};
      return (family.patterns.every((p) => this.patternDone(family, p)) ? 1 : 0) +
        ((g.listen || 0) >= 0.75 ? 1 : 0) + ((g.spell || 0) >= 0.75 ? 1 : 0);
    },
    familyPercent(family) {
      let total = 0, got = 0;
      family.patterns.forEach((p) => {
        total += p.words.length;
        const heard = this.heardList(family.id, p.id);
        got += p.words.filter((w) => heard.includes(Phonics.plain(w.w))).length;
      });
      const g = this.data.games[family.id] || {};
      // 学单词占 60%，两个游戏各占 20%
      return Math.round((total ? got / total : 0) * 60 + Math.min(1, (g.listen || 0) / 0.75) * 20 + Math.min(1, (g.spell || 0) / 0.75) * 20);
    },
    reset() { localStorage.removeItem(PROGRESS_KEY); this.load(); },
  };
  Progress.load();

  // ---------- 课程数据工具 ----------
  const Phonics = {
    plain: (w) => w.replace(/[\[\]]/g, ''),
    // 把 'tr[ee]' 拆成 [{t:'tr'},{t:'ee',hl:true}]
    parts(w) {
      const out = [];
      w.replace(/\[([^\]]+)\]|([^\[]+)/g, (m, hl, normal) => { out.push(hl ? { t: hl, hl: true } : { t: normal }); return m; });
      return out;
    },
    allFamilies() {
      const out = [];
      (window.PHONICS ? PHONICS.levels : []).forEach((l) => l.families.forEach((f) => out.push({ level: l, family: f })));
      return out;
    },
    findFamily(id) { return this.allFamilies().find((x) => x.family.id === id) || null; },
    // 某个组合的“声音”怎么读：组合自己 > 家族共用 > 关键词
    soundTexts(family, pattern) {
      const say = pattern.say || family.say;
      const key = this.plain(pattern.words[0].w);
      return say ? [say, say, key] : [key];
    },
  };

  // ---------- 小工具 ----------
  const $ = (sel, root = document) => root.querySelector(sel);
  const h = (tag, attrs = {}, ...kids) => {
    const el = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs || {})) {
      if (v == null || v === false) continue;
      if (k === 'class') el.className = v;
      else if (k === 'style' && typeof v === 'object') Object.assign(el.style, v);
      else if (k.startsWith('on')) el.addEventListener(k.slice(2), v);
      else if (k === 'html') el.innerHTML = v;
      else el.setAttribute(k, v === true ? '' : v);
    }
    kids.flat().forEach((c) => c != null && el.append(c.nodeType ? c : document.createTextNode(c)));
    return el;
  };
  const shuffle = (arr) => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  };
  const wordEl = (w, cls = '') => h('span', { class: `word ${cls}` }, Phonics.parts(w).map((p) => h('span', { class: p.hl ? 'hl' : '' }, p.t)));
  const starsEl = (n, max = 3) => h('span', { class: 'stars', 'aria-label': `${n} 颗星` },
    Array.from({ length: max }, (_, i) => h('span', { class: i < n ? 'on' : 'off' }, '★')));

  // ---------- 吉祥物：猫头鹰 Ollie ----------
  const OWL_SVG = `
<svg viewBox="0 0 120 120" class="owl" aria-hidden="true">
  <ellipse cx="60" cy="112" rx="30" ry="5" fill="rgba(0,0,0,.08)"/>
  <g class="owl-body">
    <path d="M28 46 L22 18 L44 34 Z" fill="#7a5230"/>
    <path d="M92 46 L98 18 L76 34 Z" fill="#7a5230"/>
    <ellipse cx="60" cy="68" rx="38" ry="42" fill="#a0693c"/>
    <ellipse cx="60" cy="80" rx="24" ry="27" fill="#f6dcb4"/>
    <path d="M48 80 q4 4 8 0 M60 88 q4 4 8 0 M52 96 q4 4 8 0" stroke="#d9b98c" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <g class="owl-wing-l"><ellipse cx="24" cy="74" rx="9" ry="20" fill="#7a5230" transform="rotate(14 24 74)"/></g>
    <g class="owl-wing-r"><ellipse cx="96" cy="74" rx="9" ry="20" fill="#7a5230" transform="rotate(-14 96 74)"/></g>
    <circle cx="44" cy="50" r="16" fill="#fff"/><circle cx="76" cy="50" r="16" fill="#fff"/>
    <g class="owl-eyes">
      <circle cx="46" cy="52" r="8" fill="#2b2b2b"/><circle cx="74" cy="52" r="8" fill="#2b2b2b"/>
      <circle cx="49" cy="49" r="3" fill="#fff"/><circle cx="77" cy="49" r="3" fill="#fff"/>
    </g>
    <rect class="owl-lid" x="26" y="33" width="68" height="0" fill="#a0693c"/>
    <path d="M55 62 L65 62 L60 71 Z" fill="#ffb02e"/>
    <circle cx="33" cy="64" r="5" fill="#ff9a9a" opacity=".55"/><circle cx="87" cy="64" r="5" fill="#ff9a9a" opacity=".55"/>
    <path d="M44 108 l-4 6 M48 108 l0 7 M52 108 l4 6 M68 108 l-4 6 M72 108 l0 7 M76 108 l4 6" stroke="#ffb02e" stroke-width="3" stroke-linecap="round"/>
  </g>
</svg>`;
  const Mascot = {
    el(size = 96) { const d = h('div', { class: 'mascot', style: { width: size + 'px', height: size + 'px' } }); d.innerHTML = OWL_SVG; return d; },
    cheer(el) { if (!el) return; el.classList.remove('cheer'); void el.offsetWidth; el.classList.add('cheer'); },
  };

  // ---------- 撒花 ----------
  const Confetti = {
    burst(n = 36, chars = ['⭐', '🎉', '✨', '🌟', '🎈', '💖']) {
      const layer = h('div', { class: 'confetti' });
      for (let i = 0; i < n; i++) {
        const s = h('span', {}, chars[i % chars.length]);
        s.style.left = Math.random() * 100 + 'vw';
        s.style.setProperty('--dx', (Math.random() * 160 - 80).toFixed(0) + 'px');
        s.style.setProperty('--rot', (Math.random() * 720 - 360).toFixed(0) + 'deg');
        s.style.animationDelay = (Math.random() * 0.4).toFixed(2) + 's';
        s.style.fontSize = (18 + Math.random() * 22).toFixed(0) + 'px';
        layer.append(s);
      }
      document.body.append(layer);
      setTimeout(() => layer.remove(), 2600);
    },
  };

  // ---------- 提示条 ----------
  const Toast = {
    show(msg, ms = 2200) {
      const t = h('div', { class: 'toast' }, msg);
      document.body.append(t);
      requestAnimationFrame(() => t.classList.add('show'));
      setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 300); }, ms);
    },
  };

  // ---------- 设置面板 ----------
  function openSettings() {
    const d = Settings.data;
    const voiceName = () => (Speech.voice ? Speech.voice.name : '系统默认');
    const row = (label, ...ctrl) => h('div', { class: 'set-row' }, h('div', { class: 'set-label' }, label), h('div', { class: 'seg' }, ctrl));
    const seg = (key, val, text) => h('button', {
      class: 'seg-btn' + (d[key] === val ? ' on' : ''),
      onclick: (e) => {
        d[key] = val; Settings.save();
        if (key === 'accent') Speech.pickVoice();
        e.target.parentNode.querySelectorAll('.seg-btn').forEach((b) => b.classList.remove('on'));
        e.target.classList.add('on');
        voiceEl.textContent = voiceName();
        Speech.speak('Hello! Let\'s read together.');
      },
    }, text);
    const voiceEl = h('span', {}, voiceName());
    const modal = h('div', { class: 'modal-mask', onclick: (e) => { if (e.target === modal) modal.remove(); } },
      h('div', { class: 'modal sheet' },
        h('h2', {}, '⚙️ 设置'),
        row('口音', seg('accent', 'en-US', '🇺🇸 美式'), seg('accent', 'en-GB', '🇬🇧 英式')),
        row('语速', seg('rate', 0.6, '🐢 慢'), seg('rate', 0.8, '🐰 中'), seg('rate', 1, '🐆 快')),
        row('音效', seg('sfx', true, '开'), seg('sfx', false, '关')),
        h('p', { class: 'muted small' }, '当前声音：', voiceEl, '。发音来自设备自带的英语语音，iPhone/iPad 用 Safari 效果最好。'),
        h('div', { class: 'set-actions' },
          h('button', { class: 'btn ghost small', onclick: () => {
            if (confirm('确定清空全部学习进度吗？')) { Progress.reset(); location.reload(); }
          } }, '清空学习进度'),
          h('button', { class: 'btn primary', onclick: () => modal.remove() }, '好了'))));
    document.body.append(modal);
  }

  window.KEL = { Settings, Speech, Sfx, Progress, Phonics, Mascot, Confetti, Toast, openSettings, $, h, shuffle, wordEl, starsEl };
})();
