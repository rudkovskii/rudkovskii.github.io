/**
 * Mila / Мила — pet1 (id: cat), стиль «sticker» (kawaii die-cut наклейка).
 * STYLE-модуль по assets/pets/CONTRACT.md: window.registerPetStyle.
 *
 * Животное: рыжий полосатый кот (orange tabby) — тёплое рыжее тело (#d98a4a,
 * полоски темнее), острые треугольные уши с розовой внутренней частью,
 * свёрнутый калачиком хвост сбоку, лёгкие полоски на лбу/спине («M» табби),
 * крохотный нос-улыбка, sparkle-глаза.
 *
 * Sticker-приёмы (обязательны, едины для всего пака):
 *  - пухлый залитый силуэт-«батон», сидячая поза, короткие лапки;
 *  - ОДИН толстый тёмный контур на каждой форме: stroke 5px, #2c2622, round;
 *  - DIE-CUT белая обводка: единый белый силуэт позади персонажа со сдвигом
 *    наружу ~7px (дублированные формы тела/ушей/хвоста с толстой белой
 *    заливкой+обводкой, сливаются в один край отклеивающегося стикера);
 *  - большие блестящие глаза с 1–2 бликами; румяные щёки (низкая непрозрачн.);
 *  - маленький нос + короткая улыбка; мягкая тень-эллипс под телом.
 *
 * 4 mood заметно разные:
 *  radiant — прямая поза, широкая улыбка, звёздочки-искры вокруг;
 *  steady  — спокойный, расслабленный, ровная поза;
 *  tired   — полуприкрытые обвисшие глаза, лёгкий слампинг;
 *  drained — свернулся клубком/лежит низко, глаза закрыты, парят «z z».
 *
 * Idle-анимации (тонкие, в КАЖДОМ mood): дыхание (scale тела 1→1.03) +
 * периодическое моргание (глаза сплющиваются). Die-cut-обводка и тень статичны.
 * CSS через <style> внутри SVG, @keyframes, уважение prefers-reduced-motion.
 * Технически: один inline <svg> на mood, viewBox 0 0 240 240, без width/height;
 * все классы/keyframes с префиксом «cat-sticker-». Только inline SVG + CSS.
 */
(function () {
  "use strict";

  /* ---- палитра ---- */
  var INK = "#2c2622";     // тёплый почти-чёрный контур
  var OR = "#d98a4a";      // рыжее тело
  var ORD = "#a5622a";     // тёмные полоски
  var CREAM = "#f3d6b2";   // животик/мордочка
  var PINK = "#f4b3c4";    // нутро ушей
  var NOSE = "#e58aa0";    // нос
  var CHEEK = "#f2917c";   // румянец (низкая непрозрачность)
  var WHITE = "#ffffff";
  var SPARK = "#F5A623";   // искры radiant
  var ZCOL = "#9C8BC0";    // «z» drained

  var REDUCED = "@media (prefers-reduced-motion:reduce){.pet-cat-sticker *{animation:none !important}}";

  /* ---- хелперы ---- */

  function shell(mood, cssStr, inner) {
    return '<svg viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg" ' +
      'class="pet-svg pet-cat pet-cat-sticker is-' + mood + '" role="img" aria-label="Mila">' +
      '<style>' + cssStr + REDUCED + '</style>' + inner + '</svg>';
  }

  // общий CSS: дыхание тела + моргание глаз
  function baseCss(mood, breatheDur, blinkDur) {
    var root = ".pet-cat-sticker.is-" + mood + " ";
    return root + ".cat-sticker-pet{transform-box:fill-box;transform-origin:bottom center;" +
        "animation:cat-sticker-breathe-" + mood + " " + breatheDur + " ease-in-out infinite}" +
      root + ".cat-sticker-eyes{transform-box:fill-box;transform-origin:center;" +
        "animation:cat-sticker-blink-" + mood + " " + blinkDur + " ease-in-out infinite}" +
      "@keyframes cat-sticker-breathe-" + mood + "{0%,100%{transform:scale(1)}50%{transform:scale(1.03)}}" +
      "@keyframes cat-sticker-blink-" + mood + "{0%,92%,100%{transform:scaleY(1)}96%{transform:scaleY(0.12)}}";
  }

  // die-cut белый силуэт: толстая белая заливка+обводка форм, сливается в край
  function diecut(body, earL, earR, tail) {
    return '<g class="cat-sticker-diecut">' +
      '<path d="' + tail + '" fill="none" stroke="' + WHITE + '" stroke-width="34" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<path d="' + earL + '" fill="' + WHITE + '" stroke="' + WHITE + '" stroke-width="18" stroke-linejoin="round"/>' +
      '<path d="' + earR + '" fill="' + WHITE + '" stroke="' + WHITE + '" stroke-width="18" stroke-linejoin="round"/>' +
      '<path d="' + body + '" fill="' + WHITE + '" stroke="' + WHITE + '" stroke-width="18" stroke-linejoin="round"/>' +
      '</g>';
  }

  var SHADOW = '<ellipse class="cat-sticker-shadow" cx="120" cy="206" rx="52" ry="11" fill="' + INK + '" opacity="0.12"/>';

  // хвост калачиком: тёмный контур + рыжая заливка + тёмный кончик
  function tail(d, tipx, tipy) {
    return '<path d="' + d + '" fill="none" stroke="' + INK + '" stroke-width="22" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<path d="' + d + '" fill="none" stroke="' + OR + '" stroke-width="13" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<circle cx="' + tipx + '" cy="' + tipy + '" r="5.5" fill="' + ORD + '"/>';
  }

  function ear(outer, inner) {
    return '<path d="' + outer + '" fill="' + OR + '" stroke="' + INK + '" stroke-width="5" stroke-linejoin="round"/>' +
      '<path d="' + inner + '" fill="' + PINK + '"/>';
  }

  function bodyShape(d) {
    return '<path d="' + d + '" fill="' + OR + '" stroke="' + INK + '" stroke-width="5" stroke-linejoin="round"/>';
  }

  function stripe(d) {
    return '<path d="' + d + '" fill="none" stroke="' + ORD + '" stroke-width="4" stroke-linecap="round"/>';
  }

  function cheek(cx, cy) {
    return '<ellipse cx="' + cx + '" cy="' + cy + '" rx="9" ry="6" fill="' + CHEEK + '" opacity="0.42"/>';
  }

  // большой блестящий глаз: тёмный овал + 2 белых блика
  function eye(cx, cy, rx, ry) {
    return '<ellipse cx="' + cx + '" cy="' + cy + '" rx="' + rx + '" ry="' + ry + '" fill="' + INK + '"/>' +
      '<circle cx="' + (cx - rx * 0.34) + '" cy="' + (cy - ry * 0.42) + '" r="' + (rx * 0.34) + '" fill="' + WHITE + '"/>' +
      '<circle cx="' + (cx + rx * 0.26) + '" cy="' + (cy + ry * 0.28) + '" r="' + (rx * 0.16) + '" fill="' + WHITE + '"/>';
  }

  // полуприкрытый обвисший глаз (tired): нижняя половинка + тяжёлое веко
  function tiredEye(cx, cy) {
    return '<path d="M' + (cx - 8) + ' ' + cy + ' A 8 7 0 0 0 ' + (cx + 8) + ' ' + cy + ' Z" fill="' + INK + '"/>' +
      '<path d="M' + (cx - 9) + ' ' + (cy - 1) + ' Q ' + cx + ' ' + (cy + 5) + ' ' + (cx + 9) + ' ' + (cy - 1) + '" ' +
      'fill="none" stroke="' + INK + '" stroke-width="3.5" stroke-linecap="round"/>';
  }

  // закрытый довольный глаз (drained): дужка
  function closedEye(cx, cy) {
    return '<path d="M' + (cx - 9) + ' ' + cy + ' Q ' + cx + ' ' + (cy + 8) + ' ' + (cx + 9) + ' ' + cy + '" ' +
      'fill="none" stroke="' + INK + '" stroke-width="4" stroke-linecap="round"/>';
  }

  function nose(cx, cy) {
    return '<path d="M' + (cx - 5) + ' ' + (cy - 2) + ' L' + (cx + 5) + ' ' + (cy - 2) + ' L' + cx + ' ' + (cy + 4) + ' Z" ' +
      'fill="' + NOSE + '" stroke="' + INK + '" stroke-width="1.5" stroke-linejoin="round"/>';
  }

  // короткая улыбка «ω» под носом
  function smile(cx, cy, w) {
    return '<path d="M' + cx + ' ' + cy + ' q-' + w + ' ' + (w * 1.15) + ' -' + (w * 2) + ' ' + (w * 0.35) + '" ' +
      'fill="none" stroke="' + INK + '" stroke-width="3.2" stroke-linecap="round"/>' +
      '<path d="M' + cx + ' ' + cy + ' q' + w + ' ' + (w * 1.15) + ' ' + (w * 2) + ' ' + (w * 0.35) + '" ' +
      'fill="none" stroke="' + INK + '" stroke-width="3.2" stroke-linecap="round"/>';
  }

  function star(cx, cy, r) {
    var a = r * 0.3;
    return '<path d="M' + cx + ' ' + (cy - r) + ' L' + (cx + a) + ' ' + (cy - a) + ' L' + (cx + r) + ' ' + cy +
      ' L' + (cx + a) + ' ' + (cy + a) + ' L' + cx + ' ' + (cy + r) + ' L' + (cx - a) + ' ' + (cy + a) +
      ' L' + (cx - r) + ' ' + cy + ' L' + (cx - a) + ' ' + (cy - a) + ' Z" fill="' + SPARK + '"/>';
  }

  function zGlyph(cx, cy, s) {
    return '<path d="M' + (cx - s) + ' ' + (cy - s) + ' h' + (2 * s) + ' l-' + (2 * s) + ' ' + (2 * s) + ' h' + (2 * s) + '" ' +
      'fill="none" stroke="' + ZCOL + '" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>';
  }

  var CREAM_BELLY = '<ellipse cx="120" cy="164" rx="33" ry="25" fill="' + CREAM + '"/>';

  /* ================= общие формы прямой позы (radiant/steady) ================= */

  var BODY_UP = "M120,66 C90,66 71,88 69,122 C67,152 72,182 83,193 C94,201 146,201 157,193 C168,182 173,152 171,122 C169,88 150,66 120,66 Z";
  var EAR_L_UP = "M84,80 L72,46 L104,68 Z";
  var EAR_R_UP = "M156,80 L168,46 L136,68 Z";
  var EAR_LI_UP = "M87,74 L80,54 L99,68 Z";
  var EAR_RI_UP = "M153,74 L160,54 L141,68 Z";
  var TAIL_UP = "M156,184 C190,182 206,156 194,134 C187,120 166,120 161,135 C157,147 172,154 181,147";

  // «M» табби на лбу + полоски на боках (общие для прямой позы)
  function upStripes() {
    return stripe("M120,84 l0,13") +
      stripe("M110,86 l-3,12") +
      stripe("M130,86 l3,12") +
      stripe("M74,110 q9,-4 15,1") +
      stripe("M73,122 q9,-4 15,1") +
      stripe("M75,134 q9,-4 15,1") +
      stripe("M166,110 q-9,-4 -15,1") +
      stripe("M167,122 q-9,-4 -15,1") +
      stripe("M165,134 q-9,-4 -15,1");
  }

  /* ================= RADIANT ================= */

  function buildRadiant() {
    var css = baseCss("radiant", "2.2s", "4.4s") +
      ".pet-cat-sticker.is-radiant .cat-sticker-spark{transform-box:fill-box;transform-origin:center;" +
        "animation:cat-sticker-twinkle 2.2s ease-in-out infinite}" +
      "@keyframes cat-sticker-twinkle{0%,100%{opacity:.35;transform:scale(.8)}50%{opacity:1;transform:scale(1.12)}}";
    var inner = SHADOW +
      diecut(BODY_UP, EAR_L_UP, EAR_R_UP, TAIL_UP) +
      '<g class="cat-sticker-pet">' +
        tail(TAIL_UP, 181, 147) +
        ear(EAR_L_UP, EAR_LI_UP) + ear(EAR_R_UP, EAR_RI_UP) +
        bodyShape(BODY_UP) + CREAM_BELLY + upStripes() +
        '<ellipse cx="120" cy="146" rx="23" ry="15" fill="' + CREAM + '"/>' +
        cheek(90, 134) + cheek(150, 134) +
        '<g class="cat-sticker-eyes">' + eye(104, 118, 13, 16) + eye(136, 118, 13, 16) + '</g>' +
        nose(120, 140) + smile(120, 148, 9) +
      '</g>' +
      '<g class="cat-sticker-spark">' +
        star(58, 70, 9) + star(184, 62, 11) + star(198, 118, 8) + star(50, 132, 7) +
      '</g>';
    return shell("radiant", css, inner);
  }

  /* ================= STEADY ================= */

  function buildSteady() {
    var css = baseCss("steady", "3.5s", "5.2s");
    var inner = SHADOW +
      diecut(BODY_UP, EAR_L_UP, EAR_R_UP, TAIL_UP) +
      '<g class="cat-sticker-pet">' +
        tail(TAIL_UP, 181, 147) +
        ear(EAR_L_UP, EAR_LI_UP) + ear(EAR_R_UP, EAR_RI_UP) +
        bodyShape(BODY_UP) + CREAM_BELLY + upStripes() +
        '<ellipse cx="120" cy="148" rx="22" ry="14" fill="' + CREAM + '"/>' +
        cheek(90, 136) + cheek(150, 136) +
        '<g class="cat-sticker-eyes">' + eye(104, 120, 11, 14) + eye(136, 120, 11, 14) + '</g>' +
        nose(120, 142) + smile(120, 150, 7) +
      '</g>';
    return shell("steady", css, inner);
  }

  /* ================= TIRED ================= */

  var BODY_T = "M120,80 C85,80 65,102 64,132 C63,159 71,187 85,195 C98,202 142,202 155,195 C169,187 177,159 176,132 C175,102 155,80 120,80 Z";
  var EAR_L_T = "M88,88 L77,58 L108,78 Z";
  var EAR_R_T = "M152,90 L166,64 L134,80 Z";       // правое ухо чуть обвисло
  var EAR_LI_T = "M91,82 L85,64 L103,78 Z";
  var EAR_RI_T = "M150,84 L159,66 L139,80 Z";
  var TAIL_T = "M154,194 C188,194 202,178 193,162 C187,152 171,154 168,165";

  function buildTired() {
    var css = baseCss("tired", "5s", "6s");
    var inner = SHADOW +
      diecut(BODY_T, EAR_L_T, EAR_R_T, TAIL_T) +
      '<g class="cat-sticker-pet">' +
        tail(TAIL_T, 168, 165) +
        ear(EAR_L_T, EAR_LI_T) + ear(EAR_R_T, EAR_RI_T) +
        bodyShape(BODY_T) +
        '<ellipse cx="120" cy="172" rx="33" ry="24" fill="' + CREAM + '"/>' +
        stripe("M120,98 l0,12") + stripe("M111,100 l-3,11") + stripe("M129,100 l3,11") +
        stripe("M70,126 q9,-4 15,1") + stripe("M71,138 q9,-4 15,1") +
        stripe("M170,126 q-9,-4 -15,1") + stripe("M169,138 q-9,-4 -15,1") +
        '<ellipse cx="120" cy="156" rx="22" ry="14" fill="' + CREAM + '"/>' +
        cheek(90, 148) + cheek(150, 148) +
        '<g class="cat-sticker-eyes">' + tiredEye(104, 132) + tiredEye(136, 132) + '</g>' +
        nose(120, 150) +
        '<path d="M111,160 q9,5 18,0" fill="none" stroke="' + INK + '" stroke-width="3.2" stroke-linecap="round"/>' +
      '</g>';
    return shell("tired", css, inner);
  }

  /* ================= DRAINED ================= */

  var BODY_D = "M120,118 C82,118 56,138 56,165 C56,188 80,200 120,200 C160,200 184,188 184,165 C184,138 158,118 120,118 Z";
  var EAR_L_D = "M92,122 L80,96 L112,114 Z";
  var EAR_R_D = "M124,116 L140,96 L146,122 Z";
  var EAR_LI_D = "M95,116 L87,100 L107,114 Z";
  var EAR_RI_D = "M126,116 L137,101 L142,120 Z";
  var TAIL_D = "M94,198 C70,198 62,178 78,168 C89,161 100,169 97,180";

  function buildDrained() {
    var css = baseCss("drained", "7s", "9s") +
      ".pet-cat-sticker.is-drained .cat-sticker-z1{transform-box:fill-box;transform-origin:center;" +
        "animation:cat-sticker-zfloat 4.5s ease-in-out infinite}" +
      ".pet-cat-sticker.is-drained .cat-sticker-z2{transform-box:fill-box;transform-origin:center;" +
        "animation:cat-sticker-zfloat 4.5s ease-in-out -2.25s infinite}" +
      "@keyframes cat-sticker-zfloat{0%{opacity:0;transform:translate(0,4px) scale(.8)}" +
        "25%{opacity:1}70%{opacity:1}100%{opacity:0;transform:translate(7px,-16px) scale(1.05)}}";
    var inner = SHADOW +
      diecut(BODY_D, EAR_L_D, EAR_R_D, TAIL_D) +
      '<g class="cat-sticker-pet">' +
        tail(TAIL_D, 97, 180) +
        ear(EAR_L_D, EAR_LI_D) + ear(EAR_R_D, EAR_RI_D) +
        bodyShape(BODY_D) +
        '<ellipse cx="120" cy="176" rx="42" ry="20" fill="' + CREAM + '"/>' +
        stripe("M120,128 l0,11") + stripe("M111,130 l-3,10") + stripe("M129,130 l3,10") +
        '<ellipse cx="120" cy="162" rx="22" ry="13" fill="' + CREAM + '"/>' +
        cheek(84, 158) + cheek(156, 158) +
        '<g class="cat-sticker-eyes">' + closedEye(100, 152) + closedEye(140, 152) + '</g>' +
        nose(120, 158) +
        '<path d="M114,166 q6,4 12,0" fill="none" stroke="' + INK + '" stroke-width="3" stroke-linecap="round"/>' +
      '</g>' +
      '<g class="cat-sticker-z1">' + zGlyph(170, 108, 6) + '</g>' +
      '<g class="cat-sticker-z2">' + zGlyph(190, 84, 8) + '</g>';
    return shell("drained", css, inner);
  }

  /* ================= регистрация ================= */

  var SVGS = {
    radiant: buildRadiant(),
    steady: buildSteady(),
    tired: buildTired(),
    drained: buildDrained()
  };

  window.registerPetStyle({
    petId: "cat",
    style: "sticker",
    render: function (mood) {
      return SVGS[mood] || SVGS.steady;
    }
  });
})();
