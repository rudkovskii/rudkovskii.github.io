/* Juno / Джуно — маленькая сова-йог (pet4).
 * Модуль питомца по assets/pets/CONTRACT.md.
 * Один inline-SVG на mood, все анимации — CSS внутри <style> SVG,
 * все классы/keyframes/id — с префиксом «juno-».
 */
(function () {
  "use strict";

  // Палитра Juno (визуальный кит, раздел 3 / pet4)
  var BODY = "#B9AEDD";      // пыльная лаванда
  var DEEP = "#9C8FC7";      // тональная обводка (~15% темнее)
  var DARK = "#8C7AE6";      // веки, брови, ободки глаз
  var CAP_D = "#7A68CF";     // обводка ночного колпачка
  var CREAM = "#FBF6EE";     // грудка
  var INK = "#3E3A47";       // зрачки
  var AMBER = "#F5A623";     // клюв, лапки
  var AMBER_D = "#D9901E";   // тональная обводка клюва
  var WING = "#A99BD4";      // крылья чуть глубже тела
  var BLUSH = "#F2B8C6";     // щёчки
  var BRANCH = "#DFCBA9";    // ветка
  var BRANCH_D = "#C8AF87";
  var IRIS = "#FFE9B8";      // золотая радужка radiant

  var GLOW = {
    radiant: "#F5A623",
    steady: "#5FAF7E",
    tired: "#8CA0C9",
    drained: "#9C8BC0"
  };

  /* ---------- общие куски ---------- */

  function svgRoot(mood, inner) {
    return '<svg class="pet-svg pet-juno is-' + mood +
      '" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Juno (' + mood + ')">' +
      inner + "</svg>";
  }

  function aura(mood, o1, extraClass) {
    var id = "juno-" + mood + "-glow";
    var o2 = Math.round(o1 * 45) / 100;
    return '<defs><radialGradient id="' + id + '" cx="50%" cy="45%" r="60%">' +
      '<stop offset="0%" stop-color="' + GLOW[mood] + '" stop-opacity="' + o1 + '"/>' +
      '<stop offset="62%" stop-color="' + GLOW[mood] + '" stop-opacity="' + o2 + '"/>' +
      '<stop offset="100%" stop-color="' + GLOW[mood] + '" stop-opacity="0"/>' +
      "</radialGradient></defs>" +
      '<g class="aura"><ellipse class="juno-aura' + (extraClass || "") +
      '" cx="120" cy="130" rx="88" ry="84" fill="url(#' + id + ')"/></g>';
  }

  function ground() {
    return '<ellipse cx="120" cy="214" rx="52" ry="5" fill="' + INK + '" opacity="0.06"/>' +
      '<rect x="50" y="202" width="140" height="8" rx="4" fill="' + BRANCH +
      '" stroke="' + BRANCH_D + '" stroke-width="1.5"/>';
  }

  function feet() {
    return '<g class="juno-feet">' +
      '<circle cx="97" cy="199" r="4.5" fill="' + AMBER + '"/>' +
      '<circle cx="105" cy="199" r="4.5" fill="' + AMBER + '"/>' +
      '<circle cx="135" cy="199" r="4.5" fill="' + AMBER + '"/>' +
      '<circle cx="143" cy="199" r="4.5" fill="' + AMBER + '"/>' +
      "</g>";
  }

  function egg() {
    return '<path d="M120,64 C152,64 168,98 168,148 C168,184 148,201 120,201 ' +
      'C92,201 72,184 72,148 C72,98 88,64 120,64 Z" fill="' + BODY +
      '" stroke="' + DEEP + '" stroke-width="2.5"/>';
  }

  function breast() {
    return '<path d="M120,118 C142,118 153,138 153,163 C153,187 138,197 120,197 ' +
      'C102,197 87,187 87,163 C87,138 98,118 120,118 Z" fill="' + CREAM + '"/>';
  }

  function tufts() {
    return '<path d="M89,79 C84,64 89,55 97,51 C97,61 100,69 105,74 Z" fill="' + BODY +
      '" stroke="' + DEEP + '" stroke-width="2" stroke-linejoin="round"/>' +
      '<path d="M151,79 C156,64 151,55 143,51 C143,61 140,69 135,74 Z" fill="' + BODY +
      '" stroke="' + DEEP + '" stroke-width="2" stroke-linejoin="round"/>';
  }

  function cheeks(y) {
    return '<circle cx="84" cy="' + y + '" r="6.5" fill="' + BLUSH + '" opacity="0.55"/>' +
      '<circle cx="156" cy="' + y + '" r="6.5" fill="' + BLUSH + '" opacity="0.55"/>';
  }

  function beak() {
    return '<path d="M112,121 Q120,116 128,121 Q125,132 120,133 Q115,132 112,121 Z" fill="' +
      AMBER + '" stroke="' + AMBER_D + '" stroke-width="1.5" stroke-linejoin="round"/>';
  }

  function brows(d1, d2) {
    // d1/d2 — контрольные точки дуг: выше = удивлённо-радостно, ниже = спокойно
    return '<path d="M87,' + d1 + ' Q99,' + d2 + ' 111,' + d1 + '" stroke="' + DARK +
      '" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.85"/>' +
      '<path d="M129,' + d1 + ' Q141,' + d2 + ' 153,' + d1 + '" stroke="' + DARK +
      '" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.85"/>';
  }

  // Глаза-блюдца. dL/dR — насколько веко поднято (px): 44 = открыто, 0 = закрыто.
  function eyes(mood, opts) {
    var pupil = opts.pupilR || 8;
    var s = "";
    s += '<defs>' +
      '<clipPath id="juno-' + mood + '-eL"><circle cx="99" cy="108" r="18"/></clipPath>' +
      '<clipPath id="juno-' + mood + '-eR"><circle cx="141" cy="108" r="18"/></clipPath>' +
      "</defs>";
    s += '<g class="eyes">';
    ["99", "141"].forEach(function (cx) {
      s += '<circle cx="' + cx + '" cy="108" r="20" fill="' + DARK + '"/>' +
        '<circle cx="' + cx + '" cy="108" r="17.5" fill="#FFFFFF"/>';
      if (opts.iris) {
        s += '<circle cx="' + cx + '" cy="108" r="12" fill="' + IRIS + '"/>';
      }
      s += '<circle cx="' + cx + '" cy="108" r="' + pupil + '" fill="' + INK + '"/>';
      var x = +cx;
      s += '<circle cx="' + (x + 3) + '" cy="105" r="3.2" fill="#FFFFFF"/>';
      if (opts.doubleHl) {
        s += '<circle cx="' + (x - 3.5) + '" cy="110.5" r="1.8" fill="#FFFFFF"/>';
      }
    });
    s += "</g>";
    s += '<g class="eyelids">' +
      '<g clip-path="url(#juno-' + mood + '-eL)"><circle class="juno-lid juno-lid-l" cx="99" cy="' +
      (108 - opts.dL) + '" r="21" fill="' + DARK + '"/></g>' +
      '<g clip-path="url(#juno-' + mood + '-eR)"><circle class="juno-lid juno-lid-rr" cx="141" cy="' +
      (108 - opts.dR) + '" r="21" fill="' + DARK + '"/></g>' +
      "</g>";
    return s;
  }

  function reduced(mood) {
    return "@media (prefers-reduced-motion: reduce){.pet-juno.is-" + mood +
      " *{animation:none !important}}";
  }

  /* ---------- radiant: глаза-луны, крылья вверх, звёздочки, подпрыгивает ---------- */

  function star(x, y, s) {
    return "M" + x + "," + (y - s) + " L" + (x + s * 0.3) + "," + (y - s * 0.3) +
      " L" + (x + s) + "," + y + " L" + (x + s * 0.3) + "," + (y + s * 0.3) +
      " L" + x + "," + (y + s) + " L" + (x - s * 0.3) + "," + (y + s * 0.3) +
      " L" + (x - s) + "," + y + " L" + (x - s * 0.3) + "," + (y - s * 0.3) + " Z";
  }

  function renderRadiant() {
    var style = "<style>" +
      ".pet-juno.is-radiant .juno-aura{transform-origin:120px 130px;animation:juno-aura-pulse 2.2s ease-in-out infinite}" +
      "@keyframes juno-aura-pulse{0%,100%{opacity:.85;transform:scale(1)}50%{opacity:1;transform:scale(1.05)}}" +
      ".pet-juno.is-radiant .juno-bounce{transform-origin:120px 201px;animation:juno-bounce-r 4.4s ease-in-out infinite}" +
      "@keyframes juno-bounce-r{0%,58%,100%{transform:translateY(0) scale(1,1)}68%{transform:translateY(-10px) scale(1,1)}76%{transform:translateY(0) scale(1.06,0.94)}84%{transform:translateY(0) scale(1,1)}}" +
      ".pet-juno.is-radiant .juno-pet{transform-origin:120px 201px;animation:juno-breathe-r 2.2s ease-in-out infinite}" +
      "@keyframes juno-breathe-r{0%,100%{transform:scale(1,1)}50%{transform:scale(1.025,0.98)}}" +
      ".pet-juno.is-radiant .juno-wing-l{transform-origin:86px 126px;animation:juno-flap-l 2.2s ease-in-out infinite}" +
      "@keyframes juno-flap-l{0%,100%{transform:rotate(0deg)}50%{transform:rotate(-7deg)}}" +
      ".pet-juno.is-radiant .juno-wing-r{transform-origin:154px 126px;animation:juno-flap-r 2.2s ease-in-out infinite}" +
      "@keyframes juno-flap-r{0%,100%{transform:rotate(0deg)}50%{transform:rotate(7deg)}}" +
      ".pet-juno.is-radiant .juno-lid{animation:juno-blink-r 4.2s ease-in-out infinite}" +
      ".pet-juno.is-radiant .juno-lid-rr{animation-delay:.22s}" +
      "@keyframes juno-blink-r{0%,91%,100%{transform:translateY(0)}94%{transform:translateY(44px)}97%{transform:translateY(0)}}" +
      ".pet-juno.is-radiant .juno-star{transform-box:fill-box;transform-origin:center;animation:juno-twinkle 1.8s ease-in-out infinite}" +
      ".pet-juno.is-radiant .juno-star--2{animation-delay:.6s}" +
      ".pet-juno.is-radiant .juno-star--3{animation-delay:1.1s}" +
      "@keyframes juno-twinkle{0%,100%{opacity:.15;transform:scale(.7)}50%{opacity:1;transform:scale(1.15)}}" +
      reduced("radiant") +
      "</style>";

    var wings = '<g class="juno-wing-l"><path d="M84,128 C66,122 54,102 58,84 ' +
      'C60,76 66,74 70,78 C80,88 90,104 94,118 C96,126 92,130 84,128 Z" fill="' + WING +
      '" stroke="' + DEEP + '" stroke-width="2" stroke-linejoin="round"/></g>' +
      '<g class="juno-wing-r"><path d="M156,128 C174,122 186,102 182,84 ' +
      'C180,76 174,74 170,78 C160,88 150,104 146,118 C144,126 148,130 156,128 Z" fill="' + WING +
      '" stroke="' + DEEP + '" stroke-width="2" stroke-linejoin="round"/></g>';

    var particles = '<g class="particles">' +
      '<path class="juno-star juno-star--1" d="' + star(58, 66, 6) + '" fill="' + AMBER + '"/>' +
      '<path class="juno-star juno-star--2" d="' + star(184, 58, 7) + '" fill="' + AMBER + '"/>' +
      '<path class="juno-star juno-star--3" d="' + star(176, 112, 4.5) + '" fill="' + AMBER + '"/>' +
      "</g>";

    var smile = '<path d="M108,140 Q120,150 132,140" stroke="' + DARK +
      '" stroke-width="2.5" fill="none" stroke-linecap="round" opacity="0.55"/>';

    var inner = style + aura("radiant", 0.5) + ground() +
      '<g class="juno-bounce"><g class="juno-pet">' +
      '<g class="body">' + wings + egg() + breast() + "</g>" +
      '<g class="head">' + tufts() + brows(80, 74) +
      eyes("radiant", { pupilR: 8.5, iris: true, doubleHl: true, dL: 44, dR: 44 }) +
      '<g class="mouth">' + beak() + smile + "</g>" + cheeks(126) + "</g>" +
      feet() + "</g></g>" + particles;

    return svgRoot("radiant", inner);
  }

  /* ---------- steady: поза йоги, крылья на животе, спокойный взгляд ---------- */

  function renderSteady() {
    var style = "<style>" +
      ".pet-juno.is-steady .juno-pet{transform-origin:120px 201px;animation:juno-breathe-s 3.5s ease-in-out infinite}" +
      "@keyframes juno-breathe-s{0%,100%{transform:scale(1,1) rotate(0deg)}50%{transform:scale(1.018,0.988) rotate(0.6deg)}}" +
      ".pet-juno.is-steady .juno-lid{animation:juno-blink-s 5.2s ease-in-out infinite}" +
      ".pet-juno.is-steady .juno-lid-rr{animation-delay:.25s}" +
      "@keyframes juno-blink-s{0%,92%,100%{transform:translateY(0)}95%{transform:translateY(38px)}98%{transform:translateY(0)}}" +
      reduced("steady") +
      "</style>";

    // крылья сложены на животе, кончики встречаются — «поза йоги»
    var wings = '<g class="extras">' +
      '<path d="M82,128 C70,142 72,164 92,172 C104,177 114,172 112,162 ' +
      'C109,148 96,134 82,128 Z" fill="' + WING + '" stroke="' + DEEP +
      '" stroke-width="2" stroke-linejoin="round"/>' +
      '<path d="M158,128 C170,142 168,164 148,172 C136,177 126,172 128,162 ' +
      'C131,148 144,134 158,128 Z" fill="' + WING + '" stroke="' + DEEP +
      '" stroke-width="2" stroke-linejoin="round"/>' +
      "</g>";

    var smile = '<path d="M111,141 Q120,147 129,141" stroke="' + DARK +
      '" stroke-width="2.5" fill="none" stroke-linecap="round" opacity="0.55"/>';

    var inner = style + aura("steady", 0.42) + ground() +
      '<g class="juno-pet">' +
      '<g class="body">' + egg() + breast() + "</g>" + wings +
      '<g class="head">' + tufts() + brows(84, 81) +
      eyes("steady", { pupilR: 8, dL: 38, dR: 38 }) +
      '<g class="mouth">' + beak() + smile + "</g>" + cheeks(126) + "</g>" +
      feet() + "</g>";

    return svgRoot("steady", inner);
  }

  /* ---------- tired: взъерошена, осела, веки 40–55%, «клюёт носом», зевок ---------- */

  function renderTired() {
    var style = "<style>" +
      ".pet-juno.is-tired .juno-pet{transform-origin:120px 201px;animation:juno-breathe-t 5s ease-in-out infinite}" +
      "@keyframes juno-breathe-t{0%,100%{transform:scale(1,1)}50%{transform:scale(1.012,0.992)}}" +
      ".pet-juno.is-tired .juno-head{transform-origin:120px 132px;animation:juno-nod 7.5s ease-in-out infinite}" +
      "@keyframes juno-nod{0%,48%{transform:rotate(0deg) translateY(0)}64%{transform:rotate(6deg) translateY(3px)}72%{transform:rotate(9deg) translateY(4px)}78%{transform:rotate(0deg) translateY(0)}100%{transform:rotate(0deg) translateY(0)}}" +
      ".pet-juno.is-tired .juno-lid{animation:juno-blink-t 6s ease-in-out infinite}" +
      ".pet-juno.is-tired .juno-lid-rr{animation-delay:.3s}" +
      "@keyframes juno-blink-t{0%,80%,100%{transform:translateY(0)}88%{transform:translateY(26px)}96%{transform:translateY(0)}}" +
      ".pet-juno.is-tired .juno-yawn{transform-origin:120px 136px;transform:scaleY(0);animation:juno-yawn 11s ease-in-out infinite}" +
      "@keyframes juno-yawn{0%,68%{transform:scaleY(0)}74%,84%{transform:scaleY(1)}90%,100%{transform:scaleY(0)}}" +
      ".pet-juno.is-tired .juno-ruffle{transform-box:fill-box;transform-origin:50% 100%;animation:juno-ruffle 5s ease-in-out infinite}" +
      ".pet-juno.is-tired .juno-ruffle--2{animation-delay:1.2s}" +
      ".pet-juno.is-tired .juno-ruffle--3{animation-delay:2.4s}" +
      "@keyframes juno-ruffle{0%,100%{transform:rotate(0deg)}50%{transform:rotate(4deg)}}" +
      reduced("tired") +
      "</style>";

    // обвисшие крылья по бокам
    var wings = '<path d="M82,128 C68,140 64,164 72,184 C74,188 78,188 80,184 ' +
      'C86,170 90,150 90,136 C90,128 86,124 82,128 Z" fill="' + WING +
      '" stroke="' + DEEP + '" stroke-width="2" stroke-linejoin="round"/>' +
      '<path d="M158,128 C172,140 176,164 168,184 C166,188 162,188 160,184 ' +
      'C154,170 150,150 150,136 C150,128 154,124 158,128 Z" fill="' + WING +
      '" stroke="' + DEEP + '" stroke-width="2" stroke-linejoin="round"/>';

    // торчащие взъерошенные пёрышки на макушке
    var ruffles = '<g class="extras">' +
      '<path class="juno-ruffle juno-ruffle--1" d="M103,66 L96,50 L111,60 Z" fill="' + DEEP +
      '" stroke="' + DEEP + '" stroke-width="2" stroke-linejoin="round"/>' +
      '<path class="juno-ruffle juno-ruffle--2" d="M117,62 L117,45 L128,57 Z" fill="' + DEEP +
      '" stroke="' + DEEP + '" stroke-width="2" stroke-linejoin="round"/>' +
      '<path class="juno-ruffle juno-ruffle--3" d="M133,64 L142,49 L142,63 Z" fill="' + DEEP +
      '" stroke="' + DEEP + '" stroke-width="2" stroke-linejoin="round"/>' +
      "</g>";

    // зевок: приоткрытый клюв-ротик
    var yawn = '<ellipse class="juno-yawn" cx="120" cy="132" rx="6.5" ry="7.5" fill="' +
      AMBER_D + '" opacity="0.85"/>';

    // веки: левое 55% (d=20), правое 40% (d=26) — асимметрия усталости
    var inner = style + aura("tired", 0.32) + ground() +
      // вся сова осела: приплюснута на ~6% и сползла вниз
      '<g class="juno-pet"><g transform="translate(0,12.06) scale(1.06,0.94)">' +
      '<g class="body">' + wings + egg() + breast() + "</g>" +
      '<g class="head juno-head">' + tufts() + ruffles +
      eyes("tired", { pupilR: 7.5, dL: 20, dR: 26 }) +
      '<g class="mouth">' + beak() + yawn + "</g>" + cheeks(128) + "</g>" +
      "</g>" + feet() + "</g>";

    return svgRoot("tired", inner);
  }

  /* ---------- drained: шарик, завернулась в крылья, сползший колпачок, «z» ---------- */

  function renderDrained() {
    var style = "<style>" +
      ".pet-juno.is-drained .juno-pet{transform-origin:120px 202px;animation:juno-breathe-d 7s ease-in-out infinite}" +
      "@keyframes juno-breathe-d{0%,100%{transform:scale(1,1)}50%{transform:scale(1.035,0.975)}}" +
      ".pet-juno.is-drained .juno-pompom{animation:juno-pompom 7s ease-in-out infinite}" +
      "@keyframes juno-pompom{0%,100%{transform:rotate(0deg)}50%{transform:rotate(9deg)}}" +
      ".pet-juno.is-drained .juno-peek{transform-origin:120px 152px;transform:scaleY(0);animation:juno-peek 13s ease-in-out infinite}" +
      "@keyframes juno-peek{0%,52%{transform:scaleY(0)}56%,62%{transform:scaleY(1)}66%,100%{transform:scaleY(0)}}" +
      ".pet-juno.is-drained .juno-zz{animation:juno-zfloat 7s ease-in-out infinite;opacity:0}" +
      ".pet-juno.is-drained .juno-zz--2{animation-delay:3.5s}" +
      "@keyframes juno-zfloat{0%{opacity:0;transform:translate(0,0)}18%{opacity:.85}60%{opacity:.5}100%{opacity:0;transform:translate(9px,-28px)}}" +
      reduced("drained") +
      "</style>";

    var ball = '<ellipse cx="120" cy="161" rx="50" ry="41" fill="' + BODY +
      '" stroke="' + DEEP + '" stroke-width="2.5"/>';

    var breastPeek = '<ellipse cx="120" cy="180" rx="30" ry="16" fill="' + CREAM + '"/>';

    // глаза-щёлочки (закрытые дуги) + редкое «приоткрыла-закрыла»
    var slits = '<g class="eyes">' +
      '<path d="M90,152 Q98,159 106,152" stroke="' + DARK +
      '" stroke-width="3.5" fill="none" stroke-linecap="round"/>' +
      '<path d="M134,152 Q142,159 150,152" stroke="' + DARK +
      '" stroke-width="3.5" fill="none" stroke-linecap="round"/>' +
      '<g class="juno-peek">' +
      '<ellipse cx="98" cy="152" rx="7" ry="4" fill="#FFFFFF"/>' +
      '<circle cx="98" cy="152" r="2.5" fill="' + INK + '"/>' +
      '<ellipse cx="142" cy="152" rx="7" ry="4" fill="#FFFFFF"/>' +
      '<circle cx="142" cy="152" r="2.5" fill="' + INK + '"/>' +
      "</g></g>";

    var tinyBeak = '<path d="M115,161 Q120,157 125,161 Q123,168 120,168 Q117,168 115,161 Z" fill="' +
      AMBER + '" stroke="' + AMBER_D + '" stroke-width="1.2" stroke-linejoin="round"/>';

    // крылья, завёрнутые вокруг себя как плед
    var wrap = '<g class="extras">' +
      '<path d="M74,150 C64,170 78,194 112,199 C124,201 130,193 124,184 ' +
      'C112,168 90,152 74,150 Z" fill="' + WING + '" stroke="' + DEEP +
      '" stroke-width="2" stroke-linejoin="round"/>' +
      '<path d="M166,150 C176,170 162,194 128,199 C116,201 110,193 116,184 ' +
      'C128,168 150,152 166,150 Z" fill="' + WING + '" stroke="' + DEEP +
      '" stroke-width="2" stroke-linejoin="round"/>' +
      "</g>";

    // сползший ночной колпачок с помпоном
    var cap = '<g class="juno-cap">' +
      '<path d="M83,141 C86,112 116,98 142,110 C138,132 114,148 90,150 ' +
      'C85,149 83,146 83,141 Z" fill="' + DARK + '" stroke="' + CAP_D +
      '" stroke-width="2" stroke-linejoin="round"/>' +
      '<path d="M140,109 C152,103 163,111 162,125 C161,136 153,142 147,139 ' +
      'C141,136 141,129 144,123 C147,117 145,112 140,111 Z" fill="' + DARK +
      '" stroke="' + CAP_D + '" stroke-width="2" stroke-linejoin="round"/>' +
      '<path d="M84,144 C98,151 122,145 141,113" stroke="' + CREAM +
      '" stroke-width="7" fill="none" stroke-linecap="round" opacity="0.95"/>' +
      '<g transform="translate(152,138)"><g class="juno-pompom" style="transform-origin:0px -10px">' +
      '<circle cx="0" cy="0" r="7.5" fill="' + CREAM + '" stroke="#E4D7BF" stroke-width="1.5"/>' +
      "</g></g></g>";

    var zz = '<g class="particles">' +
      '<g transform="translate(168,128)"><g class="juno-zz juno-zz--1">' +
      '<path d="M0,0 h9 l-9,9 h9" stroke="' + DARK +
      '" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g></g>' +
      '<g transform="translate(184,110) scale(0.7)"><g class="juno-zz juno-zz--2">' +
      '<path d="M0,0 h9 l-9,9 h9" stroke="' + DARK +
      '" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g></g>' +
      "</g>";

    var inner = style + aura("drained", 0.4) + ground() +
      '<g class="juno-pet">' +
      '<g class="body">' + ball + breastPeek + "</g>" +
      wrap +
      '<g class="head">' + slits + '<g class="mouth">' + tinyBeak + "</g>" +
      cheeks(163) + "</g>" +
      cap + "</g>" + zz;

    return svgRoot("drained", inner);
  }

  /* ---------- регистрация ---------- */

  var RENDER = {
    radiant: renderRadiant,
    steady: renderSteady,
    tired: renderTired,
    drained: renderDrained
  };

  window.registerPet({
    id: "juno",
    nameEn: "Juno",
    nameRu: "Джуно",
    render: function (mood) {
      var fn = RENDER[mood] || RENDER.steady;
      return fn();
    }
  });
})();
