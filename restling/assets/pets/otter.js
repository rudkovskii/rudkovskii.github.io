/**
 * Pebble / Пеббл — pet5. Морская выдра, дрейфующая на спине. Архетип «доверие воде».
 * Модуль питомца по assets/pets/CONTRACT.md.
 * Уникальный канал состояния — осадка на воде + камешек + водоросли:
 *   radiant — высоко на воде, жонглирует камешком, хвост шлёпает по воде, брызги-искры;
 *   steady  — ровный дрейф, камешек спокойно на груди под лапками, круги по воде;
 *   tired   — просела ниже в воду, камешек съехал на живот, одна лапка свесилась в воду, зевок;
 *   drained — обёрнута лентами водорослей-«пледом», камешек-грелка на груди, «z» над водой.
 * Видовые признаки (всегда): поза на спине на воде, светлая кремовая мордочка на
 * шоколадном теле, круглые ушки, крупный нос-овал + усы, камешек в лапках, хвост-весло.
 */
(function () {
  "use strict";

  // Палитра (визуальный кит, раздел 3 / pet5 + токены кита)
  var BODY = "#8A6248";   // тело — шоколад
  var BODYD = "#75513B";  // шоколад темнее (тональная обводка/тень)
  var CREAM = "#FBEDE4";  // мордочка / грудка — крем
  var DARK = "#5E4634";   // нос / лапки — тёмное какао
  var PEBB = "#9C8BC0";   // камешек — серо-сиреневый
  var PEBBL = "#C4B8DD";  // блик камешка
  var WATER = "#DCE7F2";  // вода — пыльно-голубая
  var RIPPLE = "#B9CFE6"; // круги по воде / брызги
  var CHEEK = "#F5A88E";  // щёчки
  var INK = "#3E3A47";    // глаза (--ink, не чёрный)
  var WHISK = "#E3CDB8";  // усы — тональные на креме
  var SEA = "#5FAF7E";    // водоросли-«плед»
  var YAWN = "#B76E58";   // нутро зевка — тёплое, не красное

  var REDUCED = "@media (prefers-reduced-motion: reduce){.pet-otter *{animation:none !important}}";

  function glowDef(id, c1, o1, c2, o2) {
    return '<radialGradient id="' + id + '" cx="50%" cy="46%" r="56%">' +
      '<stop offset="0%" stop-color="' + c1 + '" stop-opacity="' + o1 + '"/>' +
      '<stop offset="55%" stop-color="' + c2 + '" stop-opacity="' + o2 + '"/>' +
      '<stop offset="100%" stop-color="' + c2 + '" stop-opacity="0"/>' +
      '</radialGradient>';
  }

  function shell(mood, style, defs, inner) {
    return '<svg viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg" ' +
      'class="pet-svg pet-otter is-' + mood + '" role="img" aria-label="Pebble">' +
      '<style>' + style + REDUCED + '</style>' +
      '<defs>' + defs + '</defs>' + inner + '</svg>';
  }

  // ---- общие куски выдры (база: steady-координаты, сдвиг — обёрткой translate) ----

  // Вода-«бассейн» позади выдры
  var POOL = '<ellipse class="otter-pool" cx="120" cy="188" rx="112" ry="44" fill="' + WATER + '"/>';

  // Передняя кромка воды — рисуется ПОВЕРХ выдры: чем ниже осадка, тем глубже сидит.
  // cy/ry подбираются на mood: верх эллипса = ватерлиния, низ должен накрывать дно тела.
  function poolFront(cy, ry) {
    var top = cy - ry + 2;
    return '<g class="otter-poolfront">' +
      '<ellipse cx="122" cy="' + cy + '" rx="100" ry="' + ry + '" fill="' + WATER + '" opacity=".94"/>' +
      '<path d="M30 ' + (top + 4) + ' Q70 ' + (top - 2) + ' 124 ' + top + ' Q184 ' + (top + 2) + ' 216 ' + (top + 6) + '" fill="none" stroke="' + RIPPLE + '" stroke-width="2" stroke-linecap="round" opacity=".7"/>' +
      '</g>';
  }

  // Хвост-весло (справа, лежит на воде) — отдельный класс для «шлепка»
  function tail() {
    return '<g class="otter-tail">' +
      '<ellipse cx="194" cy="148" rx="24" ry="8" fill="' + BODY + '" transform="rotate(7 194 148)"/>' +
      '<ellipse cx="208" cy="150" rx="9" ry="5.5" fill="' + BODYD + '" opacity=".55" transform="rotate(7 208 150)"/>' +
      '</g>';
  }

  // Корпус на спине: тело, кремовая грудка-живот, задние «ласты» торчат из воды
  function torso() {
    return '<ellipse cx="130" cy="146" rx="50" ry="24" fill="' + BODY + '"/>' +
      '<ellipse cx="133" cy="139" rx="33" ry="14" fill="' + CREAM + '" opacity=".92"/>' +
      '<ellipse cx="166" cy="131" rx="6" ry="10" fill="' + DARK + '" transform="rotate(-14 166 131)"/>' +
      '<ellipse cx="179" cy="137" rx="6" ry="10" fill="' + DARK + '" transform="rotate(-28 179 137)"/>';
  }

  // Голова слева: круглые ушки, тёмная голова, большая кремовая мордочка,
  // щёчки, глаза (передаются), нос-овал, усы, рот (передаётся)
  function head(eyes, lids, mouth) {
    return '<g class="otter-head">' +
      // круглые ушки по бокам макушки
      '<circle cx="51" cy="107" r="7.5" fill="' + BODY + '"/>' +
      '<circle cx="51" cy="107" r="3.6" fill="' + CHEEK + '" opacity=".55"/>' +
      '<circle cx="89" cy="107" r="7.5" fill="' + BODY + '"/>' +
      '<circle cx="89" cy="107" r="3.6" fill="' + CHEEK + '" opacity=".55"/>' +
      // тёмная голова
      '<circle cx="70" cy="126" r="25" fill="' + BODY + '"/>' +
      // светлая кремовая мордочка — контраст «крем на шоколаде»
      '<ellipse cx="70" cy="131" rx="19" ry="15.5" fill="' + CREAM + '"/>' +
      // щёчки
      '<circle cx="55" cy="134" r="4" fill="' + CHEEK + '" opacity=".7"/>' +
      '<circle cx="85" cy="134" r="4" fill="' + CHEEK + '" opacity=".7"/>' +
      '<g class="otter-eyes">' + eyes + '</g>' +
      '<g class="otter-lids">' + lids + '</g>' +
      // крупный тёмный нос-овал с бликом
      '<ellipse cx="70" cy="130" rx="5.6" ry="4.2" fill="' + DARK + '"/>' +
      '<ellipse cx="68.4" cy="128.8" rx="1.7" ry="1.1" fill="#FFFFFF" opacity=".55"/>' +
      // усы 3+3
      '<g class="otter-whiskers" fill="none" stroke="' + WHISK + '" stroke-width="1.3" stroke-linecap="round">' +
      '<path d="M62 130 Q52 127 44 126"/><path d="M62 133 Q52 133 43 133"/><path d="M62 136 Q52 138 45 140"/>' +
      '<path d="M78 130 Q88 127 96 126"/><path d="M78 133 Q88 133 97 133"/><path d="M78 136 Q88 138 95 140"/>' +
      '</g>' +
      '<g class="otter-mouth">' + mouth + '</g>' +
      '</g>';
  }

  // Камешек (группа для анимации) + лапки, держащие его
  function pebbleAt(x, y) {
    return '<g class="otter-pebble-g">' +
      '<ellipse cx="' + x + '" cy="' + y + '" rx="9.5" ry="7.5" fill="' + PEBB + '"/>' +
      '<ellipse cx="' + (x - 3) + '" cy="' + (y - 2.5) + '" rx="3.4" ry="2.2" fill="' + PEBBL + '"/>' +
      '</g>';
  }

  function paw(x, y, rot) {
    return '<ellipse cx="' + x + '" cy="' + y + '" rx="6.5" ry="9.5" fill="' + DARK + '" transform="rotate(' + rot + ' ' + x + ' ' + y + ')"/>';
  }

  // Глаза
  function eyesOpen(r, bigSpark) {
    var s = '<circle cx="59" cy="119" r="' + r + '" fill="' + INK + '"/>' +
      '<circle cx="81" cy="119" r="' + r + '" fill="' + INK + '"/>' +
      '<circle cx="61" cy="116.6" r="2.1" fill="#FFFFFF"/>' +
      '<circle cx="83" cy="116.6" r="2.1" fill="#FFFFFF"/>';
    if (bigSpark) {
      s += '<circle cx="57.4" cy="121" r="1.1" fill="#FFFFFF" opacity=".85"/>' +
        '<circle cx="79.4" cy="121" r="1.1" fill="#FFFFFF" opacity=".85"/>';
    }
    return s;
  }

  // Мигательные веки (по умолчанию scaleY(0), анимируются CSS-классом)
  function blinkLids() {
    return '<ellipse class="otter-lid otter-lid-l" cx="59" cy="119" rx="6.2" ry="6.2" fill="' + CREAM + '"/>' +
      '<ellipse class="otter-lid otter-lid-r" cx="81" cy="119" rx="6.2" ry="6.2" fill="' + CREAM + '"/>';
  }

  /* ---------------- RADIANT: высоко на воде, жонглирует камешком ---------------- */

  function radiant() {
    var style =
      '.pet-otter.is-radiant .otter-float{transform-box:view-box;transform-origin:120px 150px;animation:otter-bob-r 2.2s ease-in-out infinite}' +
      '.pet-otter.is-radiant .otter-poolfront{transform-box:view-box;animation:otter-counter-r 2.2s ease-in-out infinite}' +
      '.pet-otter.is-radiant .otter-tail{transform-box:view-box;transform-origin:174px 147px;animation:otter-slap 2.2s ease-in-out infinite}' +
      '.pet-otter.is-radiant .otter-pebble-g{transform-box:view-box;transform-origin:121px 113px;animation:otter-toss 7s ease-in-out infinite}' +
      '.pet-otter.is-radiant .otter-aura{animation:otter-glow-r 2.2s ease-in-out infinite}' +
      '.pet-otter.is-radiant .otter-whiskers{transform-box:view-box;transform-origin:70px 131px;animation:otter-whisk 2.2s ease-in-out infinite}' +
      '.pet-otter.is-radiant .otter-lid{transform-box:view-box;transform:scaleY(0);animation:otter-blink 4.4s linear infinite}' +
      '.pet-otter.is-radiant .otter-lid-l{transform-origin:59px 115px}' +
      '.pet-otter.is-radiant .otter-lid-r{transform-origin:81px 115px}' +
      '.pet-otter.is-radiant .otter-drop{transform-box:view-box;animation:otter-splash 2.2s ease-out infinite}' +
      '.pet-otter.is-radiant .otter-d2{animation-delay:.12s}' +
      '.pet-otter.is-radiant .otter-d3{animation-delay:.24s}' +
      '.pet-otter.is-radiant .otter-spark{transform-box:view-box;animation:otter-twinkle 1.9s ease-in-out infinite}' +
      '.pet-otter.is-radiant .otter-sp1{transform-origin:44px 76px}' +
      '.pet-otter.is-radiant .otter-sp2{transform-origin:186px 84px;animation-delay:.5s}' +
      '.pet-otter.is-radiant .otter-sp3{transform-origin:150px 62px;animation-delay:1s}' +
      '@keyframes otter-bob-r{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-4px) rotate(-1deg)}}' +
      '@keyframes otter-counter-r{0%,100%{transform:translateY(0)}50%{transform:translateY(2px)}}' +
      '@keyframes otter-slap{0%,52%,100%{transform:rotate(2deg)}62%{transform:rotate(-16deg)}72%{transform:rotate(6deg)}82%{transform:rotate(0deg)}}' +
      '@keyframes otter-toss{0%,68%,100%{transform:translateY(0) rotate(0deg)}76%{transform:translateY(-24px) rotate(170deg)}84%{transform:translateY(0) rotate(360deg)}}' +
      '@keyframes otter-glow-r{0%,100%{opacity:.75}50%{opacity:1}}' +
      '@keyframes otter-whisk{0%,100%{transform:rotate(0deg)}50%{transform:rotate(2deg)}}' +
      '@keyframes otter-blink{0%,92%,100%{transform:scaleY(0)}94.5%,96.5%{transform:scaleY(1)}}' +
      '@keyframes otter-splash{0%,50%{opacity:0;transform:translate(0,0) scale(.5)}62%{opacity:1;transform:translate(3px,-14px) scale(1)}80%,100%{opacity:0;transform:translate(6px,-20px) scale(.6)}}' +
      '@keyframes otter-twinkle{0%,100%{opacity:.15;transform:scale(.5)}50%{opacity:1;transform:scale(1)}}';

    var defs = glowDef("otter-radiant-glow", "#FFD98E", ".9", "#FFF3D9", ".55");
    var star = 'M0 -6 L1.7 -1.7 L6 0 L1.7 1.7 L0 6 L-1.7 1.7 L-6 0 L-1.7 -1.7 Z';

    var inner =
      '<g class="otter-aura"><circle cx="120" cy="132" r="96" fill="url(#otter-radiant-glow)"/></g>' +
      POOL +
      '<g transform="translate(0,-4)"><g class="otter-float">' +
        tail() + torso() +
        // лапки чуть раскинуты вверх — ловят камешек
        pebbleAt(121, 113) +
        paw(111, 125, -30) + paw(131, 125, 30) +
        head(
          eyesOpen(5.5, true),
          blinkLids(),
          '<path d="M64 137 Q70 145 76 137 Z" fill="' + YAWN + '"/><path d="M64 137 Q70 141 76 137" fill="' + CREAM + '"/>'
        ) +
      '</g></g>' +
      poolFront(162, 12) +
      '<g class="otter-particles">' +
        // брызги у хвоста-весла
        '<circle class="otter-drop" cx="198" cy="146" r="2.6" fill="' + RIPPLE + '"/>' +
        '<circle class="otter-drop otter-d2" cx="208" cy="150" r="2" fill="' + RIPPLE + '"/>' +
        '<circle class="otter-drop otter-d3" cx="190" cy="150" r="1.7" fill="#FFFFFF" opacity=".9"/>' +
        // искры
        '<path class="otter-spark otter-sp1" transform="translate(44 76)" d="' + star + '" fill="#F5A623"/>' +
        '<path class="otter-spark otter-sp2" transform="translate(186 84)" d="' + star + '" fill="#F5A623"/>' +
        '<path class="otter-spark otter-sp3" transform="translate(150 62)" d="' + star + '" fill="#F5C623"/>' +
      '</g>';

    return shell("radiant", style, defs, inner);
  }

  /* ---------------- STEADY: ровный дрейф, камешек на груди, круги по воде ---------------- */

  function steady() {
    var style =
      '.pet-otter.is-steady .otter-float{transform-box:view-box;transform-origin:120px 150px;animation:otter-bob-s 3.5s ease-in-out infinite}' +
      '.pet-otter.is-steady .otter-poolfront{transform-box:view-box;animation:otter-counter-s 3.5s ease-in-out infinite}' +
      '.pet-otter.is-steady .otter-tail{transform-box:view-box;transform-origin:174px 147px;animation:otter-sway 3.5s ease-in-out infinite}' +
      '.pet-otter.is-steady .otter-whiskers{transform-box:view-box;transform-origin:70px 131px;animation:otter-whisk-s 3.5s ease-in-out infinite}' +
      '.pet-otter.is-steady .otter-lid{transform-box:view-box;transform:scaleY(0);animation:otter-blink-s 5.2s linear infinite}' +
      '.pet-otter.is-steady .otter-lid-l{transform-origin:59px 115px}' +
      '.pet-otter.is-steady .otter-lid-r{transform-origin:81px 115px}' +
      '.pet-otter.is-steady .otter-ring{transform-box:view-box;transform-origin:124px 160px;animation:otter-ripple 3.5s ease-out infinite}' +
      '.pet-otter.is-steady .otter-r2{animation-delay:1.75s}' +
      '@keyframes otter-bob-s{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}' +
      '@keyframes otter-counter-s{0%,100%{transform:translateY(0)}50%{transform:translateY(1.6px)}}' +
      '@keyframes otter-sway{0%,100%{transform:rotate(1.5deg)}50%{transform:rotate(-2.5deg)}}' +
      '@keyframes otter-whisk-s{0%,100%{transform:rotate(0deg)}50%{transform:rotate(1.4deg)}}' +
      '@keyframes otter-blink-s{0%,93%,100%{transform:scaleY(0)}95%,97%{transform:scaleY(1)}}' +
      '@keyframes otter-ripple{0%{opacity:.7;transform:scale(.82)}70%{opacity:.18}100%{opacity:0;transform:scale(1.12)}}';

    var defs = glowDef("otter-steady-glow", "#A5D8B8", ".7", "#E8F3EA", ".45");

    var inner =
      '<g class="otter-aura"><circle cx="120" cy="134" r="92" fill="url(#otter-steady-glow)"/></g>' +
      POOL +
      // круги по воде — расходятся от выдры
      '<ellipse class="otter-ring" cx="124" cy="160" rx="80" ry="14" fill="none" stroke="' + RIPPLE + '" stroke-width="2"/>' +
      '<ellipse class="otter-ring otter-r2" cx="124" cy="160" rx="80" ry="14" fill="none" stroke="' + RIPPLE + '" stroke-width="1.6"/>' +
      '<g class="otter-float">' +
        tail() + torso() +
        // камешек спокойно на груди, лапки сложены поверх
        pebbleAt(121, 119) +
        paw(112, 126, -18) + paw(130, 126, 18) +
        head(
          eyesOpen(5, false),
          blinkLids(),
          '<path d="M64 138 Q70 143 76 138" fill="none" stroke="' + DARK + '" stroke-width="1.8" stroke-linecap="round"/>'
        ) +
      '</g>' +
      poolFront(164, 17);

    return shell("steady", style, defs, inner);
  }

  /* ---------------- TIRED: просела в воду, камешек на животе, лапка в воде ---------------- */

  function tired() {
    var style =
      '.pet-otter.is-tired .otter-float{transform-box:view-box;transform-origin:120px 158px;animation:otter-bob-t 5s ease-in-out infinite}' +
      '.pet-otter.is-tired .otter-poolfront{transform-box:view-box;animation:otter-counter-t 5s ease-in-out infinite}' +
      '.pet-otter.is-tired .otter-dangle{transform-box:view-box;transform-origin:100px 138px;animation:otter-dangle 5s ease-in-out infinite}' +
      '.pet-otter.is-tired .otter-yawn{transform-box:view-box;transform-origin:70px 139px;animation:otter-yawn 7.5s ease-in-out infinite}' +
      '.pet-otter.is-tired .otter-whiskers{transform-box:view-box;transform-origin:70px 131px;animation:otter-whisk-t 5s ease-in-out infinite}' +
      '.pet-otter.is-tired .otter-ring{transform-box:view-box;transform-origin:104px 166px;animation:otter-ripple-t 5s ease-out infinite}' +
      '@keyframes otter-bob-t{0%,100%{transform:translateY(0)}50%{transform:translateY(-2px)}}' +
      '@keyframes otter-counter-t{0%,100%{transform:translateY(0)}50%{transform:translateY(1.2px)}}' +
      '@keyframes otter-dangle{0%,100%{transform:rotate(-3deg)}50%{transform:rotate(4deg)}}' +
      '@keyframes otter-yawn{0%,72%,96%,100%{transform:scale(1,.28)}80%,88%{transform:scale(1.15,1)}}' +
      '@keyframes otter-whisk-t{0%,100%{transform:rotate(0deg)}50%{transform:rotate(-1.4deg)}}' +
      '@keyframes otter-ripple-t{0%{opacity:.55;transform:scale(.7)}70%{opacity:.15}100%{opacity:0;transform:scale(1.15)}}';

    var defs = glowDef("otter-tired-glow", "#B7C4E2", ".65", "#EDF0F8", ".45");

    // полуприкрытые веки — крем поверх верхней половины глаз (статично, читается без движения)
    var halfLids =
      '<ellipse cx="59" cy="114" rx="6.6" ry="5" fill="' + CREAM + '"/>' +
      '<ellipse cx="81" cy="114" rx="6.6" ry="5" fill="' + CREAM + '"/>' +
      '<path d="M53 116.5 Q59 118.5 65 116.5" fill="none" stroke="' + BODYD + '" stroke-width="1.2" stroke-linecap="round" opacity=".5"/>' +
      '<path d="M75 116.5 Q81 118.5 87 116.5" fill="none" stroke="' + BODYD + '" stroke-width="1.2" stroke-linecap="round" opacity=".5"/>';

    var inner =
      '<g class="otter-aura"><circle cx="120" cy="138" r="88" fill="url(#otter-tired-glow)"/></g>' +
      POOL +
      // ленивый круг у свесившейся лапки
      '<ellipse class="otter-ring" cx="104" cy="166" rx="26" ry="6" fill="none" stroke="' + RIPPLE + '" stroke-width="1.8"/>' +
      // осадка ниже: вся выдра сдвинута на +9
      '<g transform="translate(0,9)"><g class="otter-float">' +
        tail() + torso() +
        // левая лапка свесилась за борт, в воду (пересекает ватерлинию)
        '<g class="otter-dangle"><ellipse cx="100" cy="141" rx="5.5" ry="14" fill="' + DARK + '" transform="rotate(-38 100 141)"/></g>' +
        // камешек съехал на живот, правая лапка едва придерживает
        pebbleAt(142, 130) +
        paw(133, 125, 28) +
        head(
          eyesOpen(5, false),
          halfLids,
          '<ellipse class="otter-yawn" cx="70" cy="139" rx="3.8" ry="4.6" fill="' + YAWN + '"/>'
        ) +
      '</g></g>' +
      poolFront(164, 18);

    return shell("tired", style, defs, inner);
  }

  /* ---------------- DRAINED: водоросли-«плед», камешек-грелка, «z» над водой ---------------- */

  function drained() {
    var style =
      '.pet-otter.is-drained .otter-float{transform-box:view-box;transform-origin:120px 156px;animation:otter-bob-d 7s ease-in-out infinite}' +
      '.pet-otter.is-drained .otter-poolfront{transform-box:view-box;animation:otter-counter-d 7s ease-in-out infinite}' +
      '.pet-otter.is-drained .otter-weed{transform-box:view-box;transform-origin:120px 150px;animation:otter-weed 7s ease-in-out infinite}' +
      '.pet-otter.is-drained .otter-breath{transform-box:view-box;transform-origin:130px 146px;animation:otter-breath-d 7s ease-in-out infinite}' +
      '.pet-otter.is-drained .otter-z{animation:otter-zzz 7s ease-in-out infinite;opacity:0}' +
      '.pet-otter.is-drained .otter-z2{animation-delay:2.3s}' +
      '.pet-otter.is-drained .otter-z3{animation-delay:4.6s}' +
      '@keyframes otter-bob-d{0%,100%{transform:translateY(0)}50%{transform:translateY(-1.6px)}}' +
      '@keyframes otter-counter-d{0%,100%{transform:translateY(0)}50%{transform:translateY(1px)}}' +
      '@keyframes otter-weed{0%,100%{transform:rotate(0deg)}50%{transform:rotate(1.2deg)}}' +
      '@keyframes otter-breath-d{0%,100%{transform:scale(1,1)}50%{transform:scale(1.015,.985)}}' +
      '@keyframes otter-zzz{0%,8%{opacity:0;transform:translate(0,0)}22%{opacity:.85}48%{opacity:0;transform:translate(7px,-22px)}100%{opacity:0}}';

    var defs = glowDef("otter-drained-glow", "#C0B4DC", ".6", "#F0ECF7", ".45");

    // глаза-щёлочки: спокойные закрытые дуги (нежность, не страдание)
    var slitEyes =
      '<path d="M54 119 Q59 123 64 119" fill="none" stroke="' + INK + '" stroke-width="2.2" stroke-linecap="round"/>' +
      '<path d="M76 119 Q81 123 86 119" fill="none" stroke="' + INK + '" stroke-width="2.2" stroke-linecap="round"/>';

    var inner =
      '<g class="otter-aura"><circle cx="120" cy="138" r="88" fill="url(#otter-drained-glow)"/></g>' +
      POOL +
      '<g transform="translate(0,6)"><g class="otter-float"><g class="otter-breath">' +
        tail() + torso() +
        // камешек-грелка на груди, обе лапки обнимают его
        pebbleAt(121, 120) +
        paw(112, 127, -15) + paw(130, 127, 15) +
        // ленты водорослей, обёрнутые вокруг живота — «плед» (так выдры якорятся во сне)
        '<g class="otter-weed">' +
          '<path d="M106 113 Q114 132 102 152" fill="none" stroke="' + SEA + '" stroke-width="7" stroke-linecap="round" opacity=".92"/>' +
          '<ellipse cx="105" cy="111" rx="4.5" ry="6.5" fill="' + SEA + '" transform="rotate(24 105 111)"/>' +
          '<path d="M140 112 Q150 132 138 154" fill="none" stroke="' + SEA + '" stroke-width="6" stroke-linecap="round" opacity=".85"/>' +
          '<ellipse cx="139" cy="110" rx="4" ry="6" fill="' + SEA + '" transform="rotate(20 139 110)"/>' +
          '<path d="M156 122 Q163 138 154 152" fill="none" stroke="' + SEA + '" stroke-width="5" stroke-linecap="round" opacity=".7"/>' +
        '</g>' +
        head(
          slitEyes,
          '',
          '<path d="M67 139 Q70 141 73 139" fill="none" stroke="' + DARK + '" stroke-width="1.5" stroke-linecap="round"/>'
        ) +
      '</g></g></g>' +
      poolFront(164, 16) +
      '<g class="otter-particles" fill="' + PEBB + '" font-family="inherit" font-weight="700">' +
        '<text class="otter-z" x="52" y="88" font-size="11">z</text>' +
        '<text class="otter-z otter-z2" x="42" y="76" font-size="13">z</text>' +
        '<text class="otter-z otter-z3" x="56" y="64" font-size="15">z</text>' +
      '</g>';

    return shell("drained", style, defs, inner);
  }

  var RENDERS = { radiant: radiant, steady: steady, tired: tired, drained: drained };

  window.registerPet({
    id: "otter",
    nameEn: "Pebble",
    nameRu: "Пеббл",
    render: function (mood) {
      var fn = RENDERS[mood] || RENDERS.steady;
      return fn();
    }
  });
})();
