/* ============================================================
   Restling — app.js
   Состояние, recovery-скор, слайдеры, движок состояний питомца,
   фичи F1–F4, фейк-дор, формы, аналитика. Ванильный JS, file://-safe.
   ============================================================ */
(function () {
  'use strict';

  /* ===================== 1. Константы (крутить здесь) ===================== */

  // Веса формулы recovery (ТЗ, раздел 3)
  var WEIGHT_READINESS = 0.40;
  var WEIGHT_SLEEP = 0.35;
  var WEIGHT_HRV = 0.25;

  // Нормализация сна
  var SLEEP_MIN_H = 3;        // низ шкалы слайдера
  var SLEEP_IDEAL_LO = 7.5;   // от этого значения sleepScore = 100
  var SLEEP_IDEAL_HI = 9;     // до этого значения sleepScore = 100
  var SLEEP_MAX_H = 10;       // верх шкалы; 9..10 → линейно 100 → SLEEP_OVER_SCORE
  var SLEEP_OVER_SCORE = 85;  // «пересып» — лёгкая просадка

  // Нормализация HRV: кламп 20–100, линейно 0–100
  var HRV_FLOOR = 20;
  var HRV_CEIL = 100;

  // Пороги состояний (ТЗ, раздел 4): recovery >= min → состояние
  var STATES = [
    { key: 'radiant', min: 80 },
    { key: 'steady',  min: 60 },
    { key: 'tired',   min: 35 },
    { key: 'drained', min: 0 }
  ];
  var MOODS = ['radiant', 'steady', 'tired', 'drained'];

  // Дефолты слайдеров = «отличный день», recovery 84 → radiant (ТЗ 3)
  var DEFAULTS = { sleep: 7.5, hrv: 65, readiness: 88 };
  // Пресеты S3
  var PRESETS = {
    great: { sleep: 8,   hrv: 90, readiness: 93 }, // recovery 94 → radiant
    rough: { sleep: 4.5, hrv: 28, readiness: 30 }  // recovery 26 → drained
  };

  // Тайминги фич
  var SURVEY_DELAY_MS = 3500;     // F4: пауза после слайдеров
  var DOZE_DELAY_MS = 2000;       // F2: уход с вкладки → дремлет
  var GREETING_MS = 2200;         // F2: приветствие при повторном визите
  var TOAST_MS = 2400;
  var PET_TAP_THROTTLE_MS = 250;  // F1: троттлинг тапов
  var PET_TAP_WINDOW_MS = 1500;   // F1: окно «серии» тапов
  var PET_NAME_MAX = 20;          // F3

  var LS = { lang: 'rp_lang', pet: 'rp_pet', names: 'rp_pet_names', visit: 'rp_last_visit' };
  var SS_SURVEY = 'rp_survey_done';

  /* ===================== 2. Утилиты ===================== */

  var CFG = window.RP_CONFIG || {};
  var PETS = window.RP_PETS || [];
  var DICT = window.RP_I18N || { en: {}, ru: {} };

  function clamp(v, lo, hi) { return Math.min(hi, Math.max(lo, v)); }
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  function lsGet(key) { try { return localStorage.getItem(key); } catch (e) { return null; } }
  function lsSet(key, val) { try { localStorage.setItem(key, val); } catch (e) {} }
  function ssGet(key) { try { return sessionStorage.getItem(key); } catch (e) { return null; } }
  function ssSet(key, val) { try { sessionStorage.setItem(key, val); } catch (e) {} }

  /* ===================== 3. Аналитика (ТЗ, раздел 7) ===================== */

  function track(event, props) {
    // Всегда в console.debug; при пустом config — тихий no-op наружу.
    try { console.debug('[track]', event, props || {}); } catch (e) {}
    if (CFG.analyticsKey) {
      try {
        if (typeof window.plausible === 'function') {
          window.plausible(event, { props: props || {} });
        } else if (typeof window.gtag === 'function') {
          window.gtag('event', event, props || {});
        }
      } catch (e) { /* аналитика никогда не ломает страницу */ }
    }
  }

  /* ===================== 4. Recovery-скор (ТЗ, раздел 3) ===================== */

  function sleepScore(h) {
    h = clamp(h, SLEEP_MIN_H, SLEEP_MAX_H);
    if (h >= SLEEP_IDEAL_LO && h <= SLEEP_IDEAL_HI) return 100;
    if (h < SLEEP_IDEAL_LO) return (h - SLEEP_MIN_H) / (SLEEP_IDEAL_LO - SLEEP_MIN_H) * 100;
    // 9 < h <= 10: линейно 100 → 85
    return 100 - (h - SLEEP_IDEAL_HI) / (SLEEP_MAX_H - SLEEP_IDEAL_HI) * (100 - SLEEP_OVER_SCORE);
  }

  function hrvScore(ms) {
    var v = clamp(ms, HRV_FLOOR, HRV_CEIL);
    return (v - HRV_FLOOR) / (HRV_CEIL - HRV_FLOOR) * 100;
  }

  function readinessScore(r) { return clamp(r, 0, 100); }

  function computeRecovery(sleepH, hrvMs, readiness) {
    return Math.round(
      WEIGHT_READINESS * readinessScore(readiness) +
      WEIGHT_SLEEP * sleepScore(sleepH) +
      WEIGHT_HRV * hrvScore(hrvMs)
    );
  }

  function stateFor(recovery) {
    for (var i = 0; i < STATES.length; i++) {
      if (recovery >= STATES[i].min) return STATES[i].key;
    }
    return 'drained';
  }

  /* ===================== 5. Состояние приложения ===================== */

  var state = {
    lang: (lsGet(LS.lang) === 'ru') ? 'ru' : 'en',
    petId: (function () {
      var saved = lsGet(LS.pet);
      return PETS.some(function (p) { return p.id === saved; }) ? saved : (PETS[0] && PETS[0].id);
    })(),
    names: (function () {
      try { return JSON.parse(lsGet(LS.names) || '{}') || {}; } catch (e) { return {}; }
    })(),
    values: { sleep: DEFAULTS.sleep, hrv: DEFAULTS.hrv, readiness: DEFAULTS.readiness },
    recovery: 0,
    mood: null,
    dozing: false,
    surveyShown: false,
    sliderTouched: false
  };

  var registry = {};        // id → {id, nameEn, nameRu, render}
  var renderedKey = null;   // «petId:mood:registered» — чтобы не перерисовывать зря

  /* ===================== 6. i18n ===================== */

  function t(key) {
    var d = DICT[state.lang] || {};
    if (Object.prototype.hasOwnProperty.call(d, key)) return d[key];
    if (Object.prototype.hasOwnProperty.call(DICT.en, key)) return DICT.en[key];
    return key;
  }

  function petCfg(id) {
    for (var i = 0; i < PETS.length; i++) if (PETS[i].id === id) return PETS[i];
    return PETS[0];
  }

  function defaultPetName(id) {
    var reg = registry[id];
    var cfg = petCfg(id) || {};
    if (state.lang === 'ru') return (reg && reg.nameRu) || cfg.nameRu || id;
    return (reg && reg.nameEn) || cfg.nameEn || id;
  }

  function displayName(id) {
    id = id || state.petId;
    return state.names[id] || defaultPetName(id);
  }

  function fill(str) {
    return String(str).split('{name}').join(displayName());
  }

  function tf(key) { return fill(t(key)); }

  /* ===================== 7. DOM-ссылки ===================== */

  var el = {
    scene: $('#scene'),
    stage: $('#petStage'),
    heroPet: $('#heroPet'),
    statusPhrase: $('#statusPhrase'),
    statusScore: $('#statusScore'),
    fallbackNote: $('#fallbackNote'),
    toast: $('#sceneToast'),
    petGrid: $('#petGrid'),
    nameInput: $('#petNameInput'),
    survey: $('#survey'),
    surveyQuestion: $('#surveyQuestion'),
    modal: $('#connectModal'),
    modalPet: $('#modalPet'),
    modalForm: $('#modalEmailForm'),
    modalSuccess: $('#modalSuccess'),
    ctaForm: $('#ctaEmailForm'),
    ctaSuccess: $('#ctaSuccess'),
    sliders: {
      sleep: $('#sliderSleep'),
      hrv: $('#sliderHrv'),
      readiness: $('#sliderReadiness')
    },
    values: {
      sleep: $('#valueSleep'),
      hrv: $('#valueHrv'),
      readiness: $('#valueReadiness')
    }
  };

  /* ===================== 8. Рендер питомца + fallback ===================== */

  // Временный placeholder-blob, пока модуль питомца не зарегистрирован.
  function fallbackRender(id, mood) {
    var cfg = petCfg(id) || { color: '#F6D8B8', colorDeep: '#E8B48C' };
    var c = cfg.color, d = cfg.colorDeep;
    var body, eyes, extra = '';
    if (mood === 'radiant') {
      body = '<ellipse class="fb-body" cx="120" cy="146" rx="62" ry="58" fill="' + c + '"/>';
      eyes = '<circle cx="100" cy="136" r="7" fill="#3E3A47"/><circle cx="140" cy="136" r="7" fill="#3E3A47"/>' +
             '<circle cx="102.5" cy="133.5" r="2.5" fill="#fff"/><circle cx="142.5" cy="133.5" r="2.5" fill="#fff"/>' +
             '<path d="M110 158 q10 8 20 0" stroke="#3E3A47" stroke-width="3" fill="none" stroke-linecap="round"/>';
      extra = '<text class="fb-spark" x="60" y="86" font-size="18" fill="#F5A623">✦</text>' +
              '<text class="fb-spark" x="168" y="72" font-size="14" fill="#F5A623">✦</text>';
    } else if (mood === 'steady') {
      body = '<ellipse class="fb-body" cx="120" cy="152" rx="62" ry="52" fill="' + c + '"/>';
      eyes = '<circle cx="100" cy="142" r="6" fill="#3E3A47"/><circle cx="140" cy="142" r="6" fill="#3E3A47"/>' +
             '<path d="M112 162 q8 6 16 0" stroke="#3E3A47" stroke-width="3" fill="none" stroke-linecap="round"/>';
    } else if (mood === 'tired') {
      body = '<ellipse class="fb-body" cx="120" cy="162" rx="68" ry="44" fill="' + c + '"/>';
      eyes = '<path d="M92 152 q8 6 16 0" stroke="#3E3A47" stroke-width="4" fill="none" stroke-linecap="round"/>' +
             '<path d="M132 152 q8 6 16 0" stroke="#3E3A47" stroke-width="4" fill="none" stroke-linecap="round"/>' +
             '<ellipse cx="120" cy="170" rx="5" ry="3.5" fill="#3E3A47" opacity=".55"/>';
    } else { // drained
      body = '<ellipse class="fb-body" cx="120" cy="172" rx="72" ry="34" fill="' + c + '"/>' +
             '<path d="M58 176 q62 -30 124 0 l0 14 q-62 14 -124 0 z" fill="#E9E6FA" opacity=".9"/>';
      eyes = '<path d="M94 164 q7 4 14 0" stroke="#3E3A47" stroke-width="3.5" fill="none" stroke-linecap="round"/>' +
             '<path d="M132 164 q7 4 14 0" stroke="#3E3A47" stroke-width="3.5" fill="none" stroke-linecap="round"/>';
      extra = '<text class="fb-zzz" x="158" y="120" font-size="16" fill="#9C8BC0">z</text>' +
              '<text class="fb-zzz" x="172" y="102" font-size="12" fill="#9C8BC0">z</text>';
    }
    var earL = '<circle cx="76" cy="104" r="14" fill="' + d + '"/>';
    var earR = '<circle cx="164" cy="104" r="14" fill="' + d + '"/>';
    var ears = (mood === 'drained') ? '' : earL + earR;
    return '<svg class="pet-svg pet-fallback is-' + mood + '" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">' +
      ears + body + eyes + extra + '</svg>';
  }

  function petSvg(id, mood) {
    var reg = registry[id];
    if (reg) {
      try {
        var out = reg.render(mood);
        if (typeof out === 'string' && out.indexOf('<svg') !== -1) return out;
      } catch (e) { try { console.warn('pet render failed', id, mood, e); } catch (_) {} }
    }
    return fallbackRender(id, mood);
  }

  // Кросс-фейд слоёв сцены (≤400 мс, ТЗ 4)
  function setStagePet(mood, instant) {
    var key = state.petId + ':' + mood + ':' + (registry[state.petId] ? 1 : 0);
    if (key === renderedKey && !instant) return;
    renderedKey = key;
    var layer = document.createElement('div');
    layer.className = 'pet-layer is-entering';
    layer.innerHTML = petSvg(state.petId, mood);
    var old = $all('.pet-layer', el.stage);
    // Страховка от накопления слоёв: rAF не тикает в скрытой вкладке
    // (а именно там F2 рисует позу «дремлет»), поэтому чистим старые слои
    // сразу, оставляя один для кросс-фейда, и не полагаемся на rAF.
    old.slice(0, -1).forEach(function (o) { o.remove(); });
    old = old.slice(-1);
    el.stage.appendChild(layer);
    var reveal = function () { layer.classList.remove('is-entering'); };
    requestAnimationFrame(reveal);
    setTimeout(reveal, 80); // фолбэк для скрытой вкладки
    old.forEach(function (o) {
      o.classList.add('is-leaving');
      setTimeout(function () { o.remove(); }, 380);
    });
  }

  window.registerPet = function (def) {
    if (!def || typeof def.id !== 'string' || typeof def.render !== 'function') {
      try { console.warn('registerPet: invalid definition', def); } catch (e) {}
      return;
    }
    registry[def.id] = def;
    // Перерисовать всё, что показывает этого питомца
    renderCardPreview(def.id);
    if (def.id === state.petId) {
      renderedKey = null;
      setStagePet(state.dozing ? 'drained' : state.mood || 'radiant', true);
      renderHeroPet();
      updateFallbackNote();
      refreshDynamicTexts(); // имя по умолчанию могло уточниться
    }
  };

  function renderHeroPet() {
    if (el.heroPet) el.heroPet.innerHTML = petSvg(state.petId, 'radiant');
  }

  function updateFallbackNote() {
    if (!el.fallbackNote) return;
    if (registry[state.petId]) {
      el.fallbackNote.hidden = true;
    } else {
      el.fallbackNote.hidden = false;
      el.fallbackNote.textContent = tf('demo.fallbackNote');
    }
  }

  /* ===================== 9. Карточки выбора питомца (S2) ===================== */

  function renderCardPreview(id) {
    var card = el.petGrid && el.petGrid.querySelector('[data-pet="' + id + '"] .pet-preview');
    if (card) card.innerHTML = petSvg(id, 'radiant');
  }

  function buildPetCards() {
    if (!el.petGrid) return;
    el.petGrid.innerHTML = '';
    PETS.forEach(function (p) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'pet-card' + (p.id === state.petId ? ' is-selected' : '');
      btn.setAttribute('data-pet', p.id);
      btn.setAttribute('aria-pressed', p.id === state.petId ? 'true' : 'false');
      btn.innerHTML =
        '<div class="pet-preview" aria-hidden="true"></div>' +
        '<div class="pet-name"></div>' +
        '<div class="pet-character"></div>';
      btn.addEventListener('click', function () { selectPet(p.id, true); });
      el.petGrid.appendChild(btn);
      renderCardPreview(p.id);
    });
    refreshCardTexts();
  }

  function refreshCardTexts() {
    if (!el.petGrid) return;
    PETS.forEach(function (p) {
      var card = el.petGrid.querySelector('[data-pet="' + p.id + '"]');
      if (!card) return;
      card.querySelector('.pet-name').textContent = state.names[p.id] || defaultPetName(p.id);
      card.querySelector('.pet-character').textContent = t(p.characterKey);
      card.classList.toggle('is-selected', p.id === state.petId);
      card.setAttribute('aria-pressed', p.id === state.petId ? 'true' : 'false');
    });
  }

  function selectPet(id, byUser) {
    if (!petCfg(id)) return;
    state.petId = id;
    lsSet(LS.pet, id);
    renderedKey = null;
    // смена питомца сохраняет текущий recovery/состояние (ТЗ 5)
    setStagePet(state.dozing ? 'drained' : state.mood, true);
    renderHeroPet();
    refreshCardTexts();
    syncNameField();
    updateFallbackNote();
    refreshDynamicTexts();
    if (byUser) {
      track('pet_selected', { pet_id: id });
      var demo = $('#demo');
      if (demo) demo.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  /* ===================== 10. Слайдеры и движок состояний ===================== */

  function formatSleep(h) {
    var whole = Math.floor(h);
    var mins = Math.round((h - whole) * 60);
    if (mins === 60) { whole += 1; mins = 0; }
    var out = whole + ' ' + t('units.h');
    if (mins > 0) out += ' ' + mins + ' ' + t('units.m');
    return out;
  }

  function refreshSliderUI() {
    var s = el.sliders, v = el.values;
    if (v.sleep) v.sleep.textContent = formatSleep(state.values.sleep);
    if (v.hrv) v.hrv.textContent = state.values.hrv + ' ' + t('units.ms');
    if (v.readiness) v.readiness.textContent = String(state.values.readiness);
    ['sleep', 'hrv', 'readiness'].forEach(function (m) {
      var input = s[m];
      if (!input) return;
      var pct = (input.value - input.min) / (input.max - input.min) * 100;
      input.style.setProperty('--fill', pct + '%');
    });
  }

  function updateStatusLine() {
    if (el.statusPhrase) el.statusPhrase.textContent = tf('state.' + state.mood);
    if (el.statusScore) el.statusScore.textContent = t('demo.recoveryLabel') + ' ' + state.recovery;
  }

  function updateScene() {
    if (!el.scene) return;
    el.scene.className = 'scene scene--' + state.mood + (state.dozing ? ' scene--dozing' : '');
  }

  function recompute(reason) {
    var v = state.values;
    state.recovery = computeRecovery(v.sleep, v.hrv, v.readiness);
    var next = stateFor(state.recovery);
    if (next !== state.mood) {
      if (state.mood) track('state_changed', { from: state.mood, to: next });
      state.mood = next;
      if (!state.dozing) setStagePet(next);
      updateScene();
    }
    updateStatusLine();
    refreshSliderUI();
  }

  var sliderTrackTs = { sleep: 0, hrv: 0, readiness: 0 };

  function onSliderInput(metric) {
    var input = el.sliders[metric];
    state.values[metric] = parseFloat(input.value);
    state.sliderTouched = true;
    recompute('slider');
    var now = Date.now();
    if (now - sliderTrackTs[metric] > 600) {
      sliderTrackTs[metric] = now;
      track('slider_changed', { metric: metric });
    }
    scheduleSurvey();
  }

  function applyPreset(name) {
    var p = PRESETS[name];
    if (!p) return;
    state.values = { sleep: p.sleep, hrv: p.hrv, readiness: p.readiness };
    el.sliders.sleep.value = p.sleep;
    el.sliders.hrv.value = p.hrv;
    el.sliders.readiness.value = p.readiness;
    state.sliderTouched = true;
    ['sleep', 'hrv', 'readiness'].forEach(function (m) { track('slider_changed', { metric: m }); });
    recompute('preset');
    scheduleSurvey();
  }

  /* ===================== 11. Тосты ===================== */

  var toastTimer = null;
  function showToast(text, ms) {
    if (!el.toast) return;
    el.toast.textContent = text;
    el.toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      el.toast.classList.remove('is-visible');
    }, ms || TOAST_MS);
  }

  /* ===================== 12. F1 — петтинг ===================== */

  var lastTapTs = 0;
  var tapStreak = 0;

  function reactAnimation(cls) {
    if (!el.stage) return;
    el.stage.classList.remove('react-bounce', 'react-nudge');
    void el.stage.offsetWidth; // рестарт анимации
    el.stage.classList.add(cls);
  }

  function floatEmoji(char) {
    if (!el.stage) return;
    var s = document.createElement('span');
    s.className = 'pet-float';
    s.textContent = char;
    el.stage.appendChild(s);
    setTimeout(function () { s.remove(); }, 1100);
  }

  function onPetTap() {
    var now = Date.now();
    if (now - lastTapTs < PET_TAP_THROTTLE_MS) return;
    tapStreak = (now - lastTapTs < PET_TAP_WINDOW_MS) ? tapStreak + 1 : 1;
    lastTapTs = now;

    var mood = state.dozing ? 'drained' : state.mood;
    track('pet_petted', { state: mood });

    if (mood === 'radiant') {
      reactAnimation('react-bounce');
      floatEmoji(tapStreak >= 3 ? '✨' : '❤️');
      showToast(tapStreak >= 3 ? tf('petting.radiantBurst') : tf('petting.radiant'));
    } else if (mood === 'steady') {
      reactAnimation('react-nudge');
      floatEmoji('\u{1F49B}');
      showToast(tf('petting.steady'));
    } else if (mood === 'tired') {
      if (tapStreak >= 3) { showToast(tf('petting.quiet')); return; }
      reactAnimation('react-nudge');
      floatEmoji('\u{1F90D}');
      showToast(tf('petting.tired'));
    } else { // drained
      if (tapStreak >= 3) { showToast(tf('petting.quiet')); return; }
      showToast(tf('petting.drained'));
    }
  }

  /* ===================== 13. F2 — сон при уходе с вкладки, возврат ===================== */

  var dozeTimer = null;

  function startDoze() {
    if (state.dozing) return;
    state.dozing = true;
    setStagePet('drained', true); // отдых, не измотанность — сцена мягкая (scene--dozing)
    updateScene();
  }

  function wakeUp() {
    if (!state.dozing) return;
    state.dozing = false;
    renderedKey = null;
    setStagePet(state.mood);
    updateScene();
    reactAnimation('react-nudge');
    showToast(tf('away.missed'));
  }

  function initVisibility() {
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) {
        clearTimeout(dozeTimer);
        dozeTimer = setTimeout(startDoze, DOZE_DELAY_MS);
      } else {
        clearTimeout(dozeTimer);
        wakeUp();
      }
    });
  }

  function initReturnVisit() {
    var last = lsGet(LS.visit);
    lsSet(LS.visit, String(Date.now()));
    if (last) {
      track('return_visit');
      setTimeout(function () { showToast(tf('away.welcome'), GREETING_MS); }, 600);
    }
  }

  /* ===================== 14. F3 — своё имя питомца ===================== */

  function syncNameField() {
    if (!el.nameInput) return;
    el.nameInput.value = displayName();
    el.nameInput.placeholder = t('demo.namePlaceholder');
    el.nameInput.maxLength = PET_NAME_MAX;
  }

  function commitName() {
    if (!el.nameInput) return;
    var raw = el.nameInput.value.trim().slice(0, PET_NAME_MAX);
    var def = defaultPetName(state.petId);
    var prev = state.names[state.petId] || null;
    if (!raw || raw === def) {
      delete state.names[state.petId]; // пусто/дефолт → откат к дефолту
    } else {
      state.names[state.petId] = raw;
      if (raw !== prev) track('pet_renamed');
    }
    lsSet(LS.names, JSON.stringify(state.names));
    syncNameField();
    refreshDynamicTexts();
    refreshCardTexts();
  }

  /* ===================== 15. F4 — микро-опрос ===================== */

  var surveyTimer = null;

  function scheduleSurvey() {
    if (state.surveyShown || ssGet(SS_SURVEY)) return;
    clearTimeout(surveyTimer);
    surveyTimer = setTimeout(function () {
      if (state.surveyShown || ssGet(SS_SURVEY) || !state.sliderTouched) return;
      state.surveyShown = true;
      if (el.surveyQuestion) el.surveyQuestion.textContent = t('survey.question');
      if (el.survey) el.survey.classList.add('is-visible');
    }, SURVEY_DELAY_MS);
  }

  function answerSurvey(answer) {
    track('signal_match', { answer: answer, recovery: state.recovery });
    ssSet(SS_SURVEY, '1');
    if (el.survey) el.survey.classList.remove('is-visible');
    showToast(tf(answer === 'yes' ? 'survey.thanksYes' : 'survey.thanksNo'));
  }

  /* ===================== 16. Фейк-дор (S5) и формы email ===================== */

  function openModal(device) {
    track('connect_clicked', { device: device });
    if (el.modalPet) el.modalPet.innerHTML = petSvg(state.petId, 'steady');
    if (el.modalForm) el.modalForm.hidden = false;
    if (el.modalSuccess) el.modalSuccess.classList.remove('is-visible');
    if (el.modal) {
      el.modal.classList.add('is-open');
      var input = el.modal.querySelector('input[type="email"]');
      if (input) setTimeout(function () { input.focus(); }, 60);
    }
  }

  function closeModal() {
    if (el.modal) el.modal.classList.remove('is-open');
  }

  function submitEmail(form, source, successEl) {
    var input = form.querySelector('input[type="email"]');
    var email = input ? input.value.trim() : '';
    if (!email) return;
    track('email_submitted', { source: source });
    if (CFG.formEndpoint) {
      try {
        var data = new FormData();
        data.append('email', email);
        data.append('source', source);
        fetch(CFG.formEndpoint, { method: 'POST', body: data, mode: 'no-cors' })
          .catch(function () { /* офлайн/file:// — успех показываем всё равно */ });
      } catch (e) { /* no-op */ }
    }
    // Локальный успех всегда (ТЗ S6) — email нигде не сохраняем
    form.hidden = true;
    if (successEl) successEl.classList.add('is-visible');
    if (input) input.value = '';
  }

  /* ===================== 17. i18n-применение ===================== */

  function applyStaticI18n() {
    document.documentElement.lang = state.lang;
    document.title = t('meta.title');
    $all('[data-i18n]').forEach(function (node) {
      node.textContent = fill(t(node.getAttribute('data-i18n')));
    });
    $all('[data-i18n-placeholder]').forEach(function (node) {
      node.placeholder = fill(t(node.getAttribute('data-i18n-placeholder')));
    });
    $all('[data-i18n-aria]').forEach(function (node) {
      node.setAttribute('aria-label', fill(t(node.getAttribute('data-i18n-aria'))));
    });
  }

  function refreshDynamicTexts() {
    applyStaticI18n();
    updateStatusLine();
    refreshSliderUI();
    updateFallbackNote();
    if (el.surveyQuestion && state.surveyShown) el.surveyQuestion.textContent = t('survey.question');
  }

  function setLang(lang, byUser) {
    if (lang !== 'en' && lang !== 'ru') return;
    if (lang === state.lang && byUser) return;
    state.lang = lang;
    lsSet(LS.lang, lang);
    $all('.lang-switch button').forEach(function (b) {
      b.classList.toggle('is-active', b.getAttribute('data-lang') === lang);
    });
    refreshDynamicTexts();
    refreshCardTexts();
    syncNameField();
    if (byUser) track('lang_switched', { to: lang });
  }

  /* ===================== 18. Инициализация ===================== */

  function initSliders() {
    ['sleep', 'hrv', 'readiness'].forEach(function (m) {
      var input = el.sliders[m];
      if (!input) return;
      input.value = DEFAULTS[m];
      input.addEventListener('input', function () { onSliderInput(m); });
    });
    $all('[data-preset]').forEach(function (btn) {
      btn.addEventListener('click', function () { applyPreset(btn.getAttribute('data-preset')); });
    });
  }

  function initDemoReached() {
    var demo = $('#demo');
    if (!demo || !('IntersectionObserver' in window)) return;
    var seen = false;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !seen) {
          seen = true;
          track('demo_reached');
          io.disconnect();
        }
      });
    }, { threshold: 0.35 });
    io.observe(demo);
  }

  function initEvents() {
    // петтинг — по сцене
    if (el.scene) el.scene.addEventListener('click', onPetTap);

    // смена питомца из S3
    var changeLink = $('#changePetLink');
    if (changeLink) changeLink.addEventListener('click', function () {
      var s2 = $('#choose');
      if (s2) s2.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    // имя (F3)
    if (el.nameInput) {
      el.nameInput.addEventListener('change', commitName);
      el.nameInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') { e.preventDefault(); el.nameInput.blur(); }
      });
    }

    // опрос (F4)
    $all('[data-survey-answer]').forEach(function (btn) {
      btn.addEventListener('click', function () { answerSurvey(btn.getAttribute('data-survey-answer')); });
    });

    // фейк-дор (S5)
    $all('[data-device]').forEach(function (btn) {
      btn.addEventListener('click', function () { openModal(btn.getAttribute('data-device')); });
    });
    var closeBtn = $('#modalClose');
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (el.modal) el.modal.addEventListener('click', function (e) {
      if (e.target === el.modal) closeModal();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeModal();
    });

    // формы
    if (el.modalForm) el.modalForm.addEventListener('submit', function (e) {
      e.preventDefault();
      submitEmail(el.modalForm, 'connect_modal', el.modalSuccess);
    });
    if (el.ctaForm) el.ctaForm.addEventListener('submit', function (e) {
      e.preventDefault();
      submitEmail(el.ctaForm, 'cta', el.ctaSuccess);
    });

    // язык
    $all('.lang-switch button').forEach(function (btn) {
      btn.addEventListener('click', function () { setLang(btn.getAttribute('data-lang'), true); });
    });
  }

  function init() {
    buildPetCards();
    initSliders();
    initEvents();
    initVisibility();
    initDemoReached();

    recompute('init');           // дефолты → recovery 84 → radiant
    setStagePet(state.mood, true);
    renderHeroPet();
    updateScene();
    syncNameField();
    setLang(state.lang, false);  // применяет i18n ко всему
    initReturnVisit();

    track('page_view', { lang: state.lang });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Небольшой отладочный доступ (не API): проверка формулы из консоли
  window.RP_DEBUG = {
    computeRecovery: computeRecovery,
    sleepScore: sleepScore,
    hrvScore: hrvScore,
    stateFor: stateFor
  };
})();
