/**
 * Pebble / Пеббл — pet5 (id: otter), стиль CARTOON (стикерная энергия).
 * По assets/pets/CONTRACT.md v2 + 03-visual-kit.md (раздел 3, pet5).
 * Тот же персонаж, что в otter.js (soft): морская выдра на спине на воде,
 * кремовая мордочка на шоколадном теле, круглые ушки, нос-овал + усы,
 * камешек в лапках, хвост-весло. Уникальный канал состояния —
 * осадка на воде + камешек + водоросли (radiant жонглирует, steady дрейф,
 * tired просела и зевает, drained под «пледом» из водорослей).
 * Стиль: жирный тональный контур ~4px (НЕ чёрный), насыщенная палитра кита,
 * крупные глаза с двойным бликом, экспрессивная мимика и амплитуда.
 * Scoping: селекторы с .pet-otter-cartoon, keyframes otter-cartoon-*,
 * id градиентов otter-cartoon-<mood>-*. Внутренние классы oc-* живут
 * только под корневым .pet-otter-cartoon, наружу не текут.
 */
(function () {
  "use strict";

  // насыщенная cartoon-версия палитры кита (soft: #8A6248/#FBEDE4/#9C8BC0…)
  var BODY = "#9E6840";   // тело — сочный шоколад
  var OUT = "#66401F";    // тональный контур тела (~35% темнее)
  var CREAM = "#FFEFDA";  // мордочка / грудка — яркий крем
  var DARK = "#5E4230";   // нос / лапки — тёмное какао
  var DOUT = "#3F2C1D";   // контур тёмных лапок (тональный, не чёрный)
  var PEBB = "#A78FD6";   // камешек — сочная сирень
  var POUT = "#71589E";   // контур камешка
  var PEBBL = "#D3C4EF";  // блик камешка
  var WATER = "#C9DFF5";  // вода — насыщеннее пыльно-голубой
  var WOUT = "#7FA6CF";   // контур воды / волны
  var RIPPLE = "#9FC2E4"; // круги по воде / брызги
  var CHEEK = "#FB8E66";  // щёчки — сочный коралл-персик
  var INK = "#3E3A47";    // глаза (--ink, не чёрный)
  var MOUTH = "#F2705A";  // нутро рта/зевка — тёплый коралл, не красный
  var TONGUE = "#F98BAA"; // язычок
  var SEA = "#4CAE74";    // водоросли-«плед» — сочный шалфей
  var SEAD = "#2F7C50";   // контур водорослей

  var SW = 4.2; // стикерный контур, px в координатах viewBox
  var BASE = ".pet-otter-cartoon *{transform-box:view-box}" +
    "@media (prefers-reduced-motion: reduce){.pet-otter-cartoon *{animation:none !important}}";
  var M = ".pet-otter-cartoon.is-"; // префикс каждого селектора (контракт)

  function glowDef(id, c1, o1, c2, o2) {
    return '<radialGradient id="' + id + '" cx="50%" cy="46%" r="56%">' +
      '<stop offset="0%" stop-color="' + c1 + '" stop-opacity="' + o1 + '"/>' +
      '<stop offset="55%" stop-color="' + c2 + '" stop-opacity="' + o2 + '"/>' +
      '<stop offset="100%" stop-color="' + c2 + '" stop-opacity="0"/>' +
      '</radialGradient>';
  }

  function shell(mood, style, defs, inner) {
    return '<svg viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg" ' +
      'class="pet-svg pet-otter pet-otter-cartoon is-' + mood + '" role="img" aria-label="Pebble">' +
      '<style>' + style + BASE + '</style>' +
      '<defs>' + defs + '</defs>' + inner + '</svg>';
  }

  // «труба» с контуром: путь дважды — подложка + цвет сверху
  function tube(d, w, c, oc) {
    return '<path d="' + d + '" fill="none" stroke="' + oc + '" stroke-width="' + (w + 5) + '" stroke-linecap="round"/>' +
      '<path d="' + d + '" fill="none" stroke="' + c + '" stroke-width="' + w + '" stroke-linecap="round"/>';
  }

  // Вода-«бассейн» позади выдры — со стикерным контуром
  var POOL = '<ellipse class="oc-pool" cx="120" cy="188" rx="110" ry="42" fill="' + WATER +
    '" stroke="' + WOUT + '" stroke-width="3.5"/>';

  // Передняя кромка воды ПОВЕРХ выдры: чем ниже осадка, тем глубже сидит
  function poolFront(cy, ry) {
    var top = cy - ry + 2;
    return '<g class="oc-poolfront">' +
      '<ellipse cx="122" cy="' + cy + '" rx="98" ry="' + ry + '" fill="' + WATER + '" opacity=".96"/>' +
      '<path d="M32 ' + (top + 4) + ' Q70 ' + (top - 3) + ' 124 ' + top + ' Q184 ' + (top + 2) + ' 214 ' + (top + 6) +
      '" fill="none" stroke="' + WOUT + '" stroke-width="3.2" stroke-linecap="round"/>' +
      '</g>';
  }

  // Хвост-весло (справа, на воде) — жирный, с контуром
  function tail() {
    return '<g class="oc-tail">' +
      '<ellipse cx="194" cy="148" rx="26" ry="9.5" fill="' + BODY + '" stroke="' + OUT +
      '" stroke-width="' + SW + '" transform="rotate(7 194 148)"/>' +
      '<ellipse cx="209" cy="150" rx="9" ry="5.5" fill="' + DARK + '" opacity=".5" transform="rotate(7 209 150)"/>' +
      '</g>';
  }

  // Корпус на спине: тело с контуром, кремовый живот, задние «ласты» из воды
  function torso() {
    return '<ellipse cx="130" cy="146" rx="52" ry="26" fill="' + BODY + '" stroke="' + OUT + '" stroke-width="' + SW + '"/>' +
      '<ellipse cx="133" cy="139" rx="34" ry="15" fill="' + CREAM + '"/>' +
      '<ellipse cx="167" cy="129" rx="6.5" ry="11" fill="' + DARK + '" stroke="' + DOUT + '" stroke-width="2.8" transform="rotate(-14 167 129)"/>' +
      '<ellipse cx="181" cy="136" rx="6.5" ry="11" fill="' + DARK + '" stroke="' + DOUT + '" stroke-width="2.8" transform="rotate(-28 181 136)"/>';
  }

  // Голова слева: круглые ушки, крупная кремовая мордочка, щёчки,
  // глаза/веки/рот передаются по mood
  function head(eyes, lids, mouth) {
    return '<g class="oc-head">' +
      '<circle cx="48" cy="104" r="8.5" fill="' + BODY + '" stroke="' + OUT + '" stroke-width="3.4"/>' +
      '<circle cx="48" cy="104" r="3.8" fill="' + CHEEK + '" opacity=".8"/>' +
      '<circle cx="92" cy="104" r="8.5" fill="' + BODY + '" stroke="' + OUT + '" stroke-width="3.4"/>' +
      '<circle cx="92" cy="104" r="3.8" fill="' + CHEEK + '" opacity=".8"/>' +
      '<circle cx="70" cy="126" r="27" fill="' + BODY + '" stroke="' + OUT + '" stroke-width="' + SW + '"/>' +
      '<ellipse cx="70" cy="132" rx="20.5" ry="16.5" fill="' + CREAM + '"/>' +
      '<circle cx="52" cy="136" r="5" fill="' + CHEEK + '" opacity=".9"/>' +
      '<circle cx="88" cy="136" r="5" fill="' + CHEEK + '" opacity=".9"/>' +
      '<g class="oc-eyes eyes">' + eyes + '</g>' +
      '<g class="oc-lidsg eyelids">' + lids + '</g>' +
      // крупный нос-овал с контуром и бликом
      '<ellipse cx="70" cy="130" rx="6.4" ry="4.8" fill="' + DARK + '" stroke="' + DOUT + '" stroke-width="2"/>' +
      '<ellipse cx="68" cy="128.6" rx="2" ry="1.3" fill="#FFFFFF" opacity=".7"/>' +
      // усы 3+3 — жирные тональные
      '<g class="oc-whisk" fill="none" stroke="' + OUT + '" stroke-width="2.2" stroke-linecap="round" opacity=".85">' +
      '<path d="M61 130 Q50 126 41 125"/><path d="M61 133 Q50 133 40 133"/><path d="M61 136 Q50 139 42 141"/>' +
      '<path d="M79 130 Q90 126 99 125"/><path d="M79 133 Q90 133 100 133"/><path d="M79 136 Q90 139 98 141"/>' +
      '</g>' +
      '<g class="oc-mouth mouth">' + mouth + '</g>' +
      '</g>';
  }

  // Камешек — крупнее и сочнее, с контуром (группа для анимаций)
  function pebbleAt(x, y) {
    return '<g class="oc-pebble">' +
      '<ellipse cx="' + x + '" cy="' + y + '" rx="11" ry="8.5" fill="' + PEBB + '" stroke="' + POUT + '" stroke-width="3"/>' +
      '<ellipse cx="' + (x - 3.5) + '" cy="' + (y - 3) + '" rx="4" ry="2.5" fill="' + PEBBL + '"/>' +
      '</g>';
  }

  function paw(x, y, rot) {
    return '<ellipse cx="' + x + '" cy="' + y + '" rx="7" ry="10.5" fill="' + DARK + '" stroke="' + DOUT +
      '" stroke-width="2.8" transform="rotate(' + rot + ' ' + x + ' ' + y + ')"/>';
  }

  // ОГРОМНЫЕ мультяшные глаза; bigSpark — двойной блик
  function eyesOpen(r, bigSpark) {
    var s = '<circle cx="58" cy="118" r="' + r + '" fill="' + INK + '"/>' +
      '<circle cx="82" cy="118" r="' + r + '" fill="' + INK + '"/>' +
      '<circle cx="61" cy="115" r="' + (r * .38) + '" fill="#FFFFFF"/>' +
      '<circle cx="85" cy="115" r="' + (r * .38) + '" fill="#FFFFFF"/>';
    if (bigSpark) {
      s += '<circle cx="55.6" cy="121" r="1.7" fill="#FFFFFF" opacity=".9"/>' +
        '<circle cx="79.6" cy="121" r="1.7" fill="#FFFFFF" opacity=".9"/>';
    }
    return s;
  }

  // Мигательные веки: кремовый круг с контуром — закрытым читается как «шов»
  function blinkLids(r) {
    return '<ellipse class="oc-lid oc-lidl" cx="58" cy="118" rx="' + r + '" ry="' + r +
      '" fill="' + CREAM + '" stroke="' + OUT + '" stroke-width="2.4"/>' +
      '<ellipse class="oc-lid oc-lidr" cx="82" cy="118" rx="' + r + '" ry="' + r +
      '" fill="' + CREAM + '" stroke="' + OUT + '" stroke-width="2.4"/>';
  }

  /* ---- RADIANT: высоко на воде, жонглирует камешком, хвост шлёпает брызгами ---- */

  function radiant() {
    var P = M + "radiant ";
    var style =
      P + '.oc-float{transform-origin:120px 150px;animation:otter-cartoon-bob-r 2.2s ease-in-out infinite}' +
      P + '.oc-poolfront{animation:otter-cartoon-counter-r 2.2s ease-in-out infinite}' +
      P + '.oc-tail{transform-origin:172px 147px;animation:otter-cartoon-slap 2.2s ease-in-out infinite}' +
      P + '.oc-pebble{transform-origin:121px 111px;animation:otter-cartoon-toss 7s ease-in-out infinite}' +
      P + '.oc-aura{animation:otter-cartoon-glow-r 2.2s ease-in-out infinite}' +
      P + '.oc-whisk{transform-origin:70px 131px;animation:otter-cartoon-wsk 2.2s ease-in-out infinite}' +
      P + '.oc-lid{transform:scaleY(0);animation:otter-cartoon-blink 4.4s linear infinite}' +
      P + '.oc-lidl{transform-origin:58px 113px}' +
      P + '.oc-lidr{transform-origin:82px 113px}' +
      P + '.oc-drop{animation:otter-cartoon-splash 2.2s ease-out infinite}' +
      P + '.oc-d2{animation-delay:.12s}' +
      P + '.oc-d3{animation-delay:.24s}' +
      P + '.oc-spark{animation:otter-cartoon-twk 1.9s ease-in-out infinite}' +
      P + '.oc-s1{transform-origin:42px 72px}' +
      P + '.oc-s2{transform-origin:190px 80px;animation-delay:.5s}' +
      P + '.oc-s3{transform-origin:150px 56px;animation-delay:1s}' +
      '@keyframes otter-cartoon-bob-r{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-6px) rotate(-2deg)}}' +
      '@keyframes otter-cartoon-counter-r{0%,100%{transform:translateY(0)}50%{transform:translateY(3px)}}' +
      '@keyframes otter-cartoon-slap{0%,50%,100%{transform:rotate(3deg)}61%{transform:rotate(-24deg)}72%{transform:rotate(9deg)}82%{transform:rotate(0deg)}}' +
      '@keyframes otter-cartoon-toss{0%,66%,100%{transform:translateY(0) rotate(0deg)}75%{transform:translateY(-32px) rotate(180deg)}84%{transform:translateY(0) rotate(360deg)}88%{transform:translateY(-3px) rotate(360deg)}92%{transform:translateY(0) rotate(360deg)}}' +
      '@keyframes otter-cartoon-glow-r{0%,100%{opacity:.75}50%{opacity:1}}' +
      '@keyframes otter-cartoon-wsk{0%,100%{transform:rotate(0deg)}50%{transform:rotate(3deg)}}' +
      '@keyframes otter-cartoon-blink{0%,92%,100%{transform:scaleY(0)}94.5%,96.5%{transform:scaleY(1)}}' +
      '@keyframes otter-cartoon-splash{0%,48%{opacity:0;transform:translate(0,0) scale(.4)}61%{opacity:1;transform:translate(4px,-18px) scale(1.15)}80%,100%{opacity:0;transform:translate(8px,-26px) scale(.5)}}' +
      '@keyframes otter-cartoon-twk{0%,100%{opacity:.15;transform:scale(.4) rotate(0deg)}50%{opacity:1;transform:scale(1.2) rotate(24deg)}}';

    var defs = glowDef("otter-cartoon-radiant-glow", "#FFD87A", ".95", "#FFF3D9", ".55");
    var star = 'M0 -7 L2 -2 L7 0 L2 2 L0 7 L-2 2 L-7 0 L-2 -2 Z';

    var inner =
      '<g class="oc-aura aura"><circle cx="120" cy="130" r="96" fill="url(#otter-cartoon-radiant-glow)"/></g>' +
      POOL +
      '<g transform="translate(0,-6)"><g class="oc-float">' +
      tail() + torso() +
      // лапки раскинуты вверх — ловят камешек
      pebbleAt(121, 111) +
      paw(110, 125, -32) + paw(132, 125, 32) +
      head(
        eyesOpen(8, true),
        blinkLids(8.8),
        // широченная открытая улыбка с язычком
        '<path d="M60 137 Q70 151 80 137 Z" fill="' + MOUTH + '" stroke="' + OUT + '" stroke-width="2.6" stroke-linejoin="round"/>' +
        '<ellipse cx="70" cy="143.5" rx="4.2" ry="2.6" fill="' + TONGUE + '"/>'
      ) +
      '</g></g>' +
      poolFront(162, 12) +
      '<g class="oc-parts particles">' +
      // жирные брызги у хвоста-весла
      '<circle class="oc-drop" cx="198" cy="144" r="3.6" fill="' + RIPPLE + '"/>' +
      '<circle class="oc-drop oc-d2" cx="209" cy="149" r="2.8" fill="' + RIPPLE + '"/>' +
      '<circle class="oc-drop oc-d3" cx="189" cy="149" r="2.3" fill="#FFFFFF" opacity=".95"/>' +
      // искры со стикерным контуром
      '<g fill="#F5A623" stroke="#C07C15" stroke-width="1" stroke-linejoin="round">' +
      '<g class="oc-spark oc-s1"><path transform="translate(42,72) scale(1.1)" d="' + star + '"/></g>' +
      '<g class="oc-spark oc-s2"><path transform="translate(190,80) scale(.9)" d="' + star + '"/></g>' +
      '<g class="oc-spark oc-s3"><path transform="translate(150,56) scale(1)" d="' + star + '"/></g>' +
      '</g></g>';

    return shell("radiant", style, defs, inner);
  }

  /* ---- STEADY: ровный дрейф, камешек на груди, довольная улыбка, круги ---- */

  function steady() {
    var P = M + "steady ";
    var style =
      P + '.oc-float{transform-origin:120px 150px;animation:otter-cartoon-bob-s 3.5s ease-in-out infinite}' +
      P + '.oc-poolfront{animation:otter-cartoon-counter-s 3.5s ease-in-out infinite}' +
      P + '.oc-tail{transform-origin:172px 147px;animation:otter-cartoon-sway 3.5s ease-in-out infinite}' +
      P + '.oc-whisk{transform-origin:70px 131px;animation:otter-cartoon-wsk-s 3.5s ease-in-out infinite}' +
      P + '.oc-lid{transform:scaleY(0);animation:otter-cartoon-blink-s 5.2s linear infinite}' +
      P + '.oc-lidl{transform-origin:58px 113px}' +
      P + '.oc-lidr{transform-origin:82px 113px}' +
      P + '.oc-ring{transform-origin:124px 160px;animation:otter-cartoon-ripple 3.5s ease-out infinite}' +
      P + '.oc-r2{animation-delay:1.75s}' +
      '@keyframes otter-cartoon-bob-s{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}' +
      '@keyframes otter-cartoon-counter-s{0%,100%{transform:translateY(0)}50%{transform:translateY(2px)}}' +
      '@keyframes otter-cartoon-sway{0%,100%{transform:rotate(2deg)}50%{transform:rotate(-3.5deg)}}' +
      '@keyframes otter-cartoon-wsk-s{0%,100%{transform:rotate(0deg)}50%{transform:rotate(2deg)}}' +
      '@keyframes otter-cartoon-blink-s{0%,93%,100%{transform:scaleY(0)}95%,97%{transform:scaleY(1)}}' +
      '@keyframes otter-cartoon-ripple{0%{opacity:.75;transform:scale(.82)}70%{opacity:.2}100%{opacity:0;transform:scale(1.12)}}';

    var defs = glowDef("otter-cartoon-steady-glow", "#A8DDBE", ".85", "#E8F3EA", ".5");

    var inner =
      '<g class="oc-aura aura"><circle cx="120" cy="134" r="92" fill="url(#otter-cartoon-steady-glow)"/></g>' +
      POOL +
      // круги по воде — жирнее, расходятся от выдры
      '<ellipse class="oc-ring" cx="124" cy="160" rx="80" ry="14" fill="none" stroke="' + RIPPLE + '" stroke-width="3"/>' +
      '<ellipse class="oc-ring oc-r2" cx="124" cy="160" rx="80" ry="14" fill="none" stroke="' + RIPPLE + '" stroke-width="2.4"/>' +
      '<g class="oc-float">' +
      tail() + torso() +
      // камешек спокойно на груди, лапки сложены поверх
      pebbleAt(121, 118) +
      paw(111, 126, -18) + paw(131, 126, 18) +
      head(
        eyesOpen(7, false),
        blinkLids(7.8),
        // довольная широкая улыбка
        '<path d="M62 138 Q70 146 78 138" fill="none" stroke="' + OUT + '" stroke-width="3" stroke-linecap="round"/>'
      ) +
      '</g>' +
      poolFront(164, 17);

    return shell("steady", style, defs, inner);
  }

  /* ---- TIRED: просела в воду, камешек на животе, лапка в воде, ОГРОМНЫЙ зевок ---- */

  function tired() {
    var P = M + "tired ";
    var style =
      P + '.oc-float{transform-origin:120px 158px;animation:otter-cartoon-bob-t 5s ease-in-out infinite}' +
      P + '.oc-poolfront{animation:otter-cartoon-counter-t 5s ease-in-out infinite}' +
      P + '.oc-dangle{transform-origin:100px 136px;animation:otter-cartoon-dangle 5s ease-in-out infinite}' +
      P + '.oc-mouth{transform-origin:70px 140px;transform:scale(1,.16);animation:otter-cartoon-yawn 7.5s ease-in-out infinite}' +
      P + '.oc-whisk{transform-origin:70px 131px;animation:otter-cartoon-wsk-t 5s ease-in-out infinite}' +
      P + '.oc-ring{transform-origin:102px 168px;animation:otter-cartoon-ripple-t 5s ease-out infinite}' +
      '@keyframes otter-cartoon-bob-t{0%,100%{transform:translateY(0)}50%{transform:translateY(-2.5px)}}' +
      '@keyframes otter-cartoon-counter-t{0%,100%{transform:translateY(0)}50%{transform:translateY(1.4px)}}' +
      '@keyframes otter-cartoon-dangle{0%,100%{transform:rotate(-4deg)}50%{transform:rotate(6deg)}}' +
      '@keyframes otter-cartoon-yawn{0%,52%,100%{transform:scale(1,.16)}60%,76%{transform:scale(1.3,1.15)}86%{transform:scale(1,.16)}}' +
      '@keyframes otter-cartoon-wsk-t{0%,100%{transform:rotate(0deg)}50%{transform:rotate(-2deg)}}' +
      '@keyframes otter-cartoon-ripple-t{0%{opacity:.6;transform:scale(.7)}70%{opacity:.15}100%{opacity:0;transform:scale(1.15)}}';

    var defs = glowDef("otter-cartoon-tired-glow", "#C3CFEA", ".7", "#EDF0F8", ".4");

    // полуприкрытые веки (~45%): кремовые «шторки» с жирной сонной линией
    var halfLids =
      '<path d="M50 113 Q58 110 66 113 L66 119 Q58 122.5 50 119 Z" fill="' + CREAM + '"/>' +
      '<path d="M74 113 Q82 110 90 113 L90 119 Q82 122.5 74 119 Z" fill="' + CREAM + '"/>' +
      '<path d="M50 118.5 Q58 121.5 66 118.5" fill="none" stroke="' + OUT + '" stroke-width="2.6" stroke-linecap="round"/>' +
      '<path d="M74 118.5 Q82 121.5 90 118.5" fill="none" stroke="' + OUT + '" stroke-width="2.6" stroke-linecap="round"/>';

    var inner =
      '<g class="oc-aura aura"><circle cx="120" cy="138" r="88" fill="url(#otter-cartoon-tired-glow)"/></g>' +
      POOL +
      // ленивый круг у свесившейся лапки
      '<ellipse class="oc-ring" cx="102" cy="168" rx="26" ry="6" fill="none" stroke="' + RIPPLE + '" stroke-width="2.6"/>' +
      // осадка ниже: вся выдра сдвинута на +9
      '<g transform="translate(0,9)"><g class="oc-float">' +
      tail() + torso() +
      // левая лапка свесилась за борт в воду
      '<g class="oc-dangle"><ellipse cx="99" cy="140" rx="6" ry="15" fill="' + DARK + '" stroke="' + DOUT + '" stroke-width="2.8" transform="rotate(-38 99 140)"/></g>' +
      // камешек съехал на живот, правая лапка едва придерживает
      pebbleAt(144, 130) +
      paw(133, 124, 30) +
      head(
        eyesOpen(7, false),
        halfLids,
        // огромный мультяшный зевок
        '<ellipse cx="70" cy="140" rx="6.5" ry="7.5" fill="' + MOUTH + '" stroke="' + OUT + '" stroke-width="2.6"/>' +
        '<ellipse cx="70" cy="143" rx="3.4" ry="3" fill="' + TONGUE + '"/>'
      ) +
      '</g></g>' +
      poolFront(164, 18);

    return shell("tired", style, defs, inner);
  }

  /* ---- DRAINED: «плед» из водорослей, камешек-грелка, жирные z над водой ---- */

  function drained() {
    var P = M + "drained ";
    var style =
      P + '.oc-float{transform-origin:120px 156px;animation:otter-cartoon-bob-d 7s ease-in-out infinite}' +
      P + '.oc-poolfront{animation:otter-cartoon-counter-d 7s ease-in-out infinite}' +
      P + '.oc-weed{transform-origin:120px 150px;animation:otter-cartoon-weed 7s ease-in-out infinite}' +
      P + '.oc-breath{transform-origin:130px 146px;animation:otter-cartoon-breath 7s ease-in-out infinite}' +
      P + '.oc-z{opacity:0;animation:otter-cartoon-zzz 7s ease-in-out infinite}' +
      P + '.oc-z2{animation-delay:2.3s}' +
      P + '.oc-z3{animation-delay:4.6s}' +
      '@keyframes otter-cartoon-bob-d{0%,100%{transform:translateY(0)}50%{transform:translateY(-2px)}}' +
      '@keyframes otter-cartoon-counter-d{0%,100%{transform:translateY(0)}50%{transform:translateY(1.2px)}}' +
      '@keyframes otter-cartoon-weed{0%,100%{transform:rotate(0deg)}50%{transform:rotate(1.6deg)}}' +
      '@keyframes otter-cartoon-breath{0%,100%{transform:scale(1,1)}50%{transform:scale(1.02,.98)}}' +
      '@keyframes otter-cartoon-zzz{0%,8%{opacity:0;transform:translate(0,0)}22%{opacity:.9}48%{opacity:0;transform:translate(8px,-24px)}100%{opacity:0}}';

    var defs = glowDef("otter-cartoon-drained-glow", "#CDBBE8", ".65", "#F0ECF7", ".4");
    var zPath = 'M0 0 h9 l-9 9 h9';

    // глаза-щёлочки: спокойные жирные дуги (нежность, не страдание)
    var slitEyes =
      '<path d="M51 118 Q58 124 65 118" fill="none" stroke="' + INK + '" stroke-width="3.2" stroke-linecap="round"/>' +
      '<path d="M75 118 Q82 124 89 118" fill="none" stroke="' + INK + '" stroke-width="3.2" stroke-linecap="round"/>';

    var inner =
      '<g class="oc-aura aura"><circle cx="120" cy="138" r="88" fill="url(#otter-cartoon-drained-glow)"/></g>' +
      POOL +
      '<g transform="translate(0,6)"><g class="oc-float"><g class="oc-breath">' +
      tail() + torso() +
      // камешек-грелка на груди, обе лапки обнимают его
      pebbleAt(121, 119) +
      paw(111, 127, -15) + paw(131, 127, 15) +
      // ленты водорослей-«плед» вокруг живота — жирные, с тональным контуром
      '<g class="oc-weed extras">' +
      tube('M106 112 Q114 132 102 153', 7.5, SEA, SEAD) +
      '<ellipse cx="105" cy="109" rx="5" ry="7" fill="' + SEA + '" stroke="' + SEAD + '" stroke-width="2.4" transform="rotate(24 105 109)"/>' +
      tube('M141 111 Q151 132 139 155', 6.5, SEA, SEAD) +
      '<ellipse cx="140" cy="108" rx="4.5" ry="6.5" fill="' + SEA + '" stroke="' + SEAD + '" stroke-width="2.4" transform="rotate(20 140 108)"/>' +
      tube('M158 122 Q165 138 156 152', 5.5, SEA, SEAD) +
      '</g>' +
      head(
        slitEyes,
        '',
        // крошечная умиротворённая улыбка
        '<path d="M66 139 Q70 142 74 139" fill="none" stroke="' + OUT + '" stroke-width="2.4" stroke-linecap="round" opacity=".8"/>'
      ) +
      '</g></g></g>' +
      poolFront(164, 16) +
      // всплывающие z — жирные, мультяшные
      '<g class="oc-parts particles" fill="none" stroke="#8F76D6" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round">' +
      '<g class="oc-z"><path transform="translate(50,84) scale(.7)" d="' + zPath + '"/></g>' +
      '<g class="oc-z oc-z2"><path transform="translate(40,68) scale(.95)" d="' + zPath + '"/></g>' +
      '<g class="oc-z oc-z3"><path transform="translate(54,52) scale(1.2)" d="' + zPath + '"/></g>' +
      '</g>';

    return shell("drained", style, defs, inner);
  }

  if (typeof window.registerPetStyle !== "function") return;

  window.registerPetStyle({
    petId: "otter",
    style: "cartoon",
    render: function (mood) {
      switch (mood) {
        case "radiant": return radiant();
        case "tired": return tired();
        case "drained": return drained();
        case "steady":
        default: return steady();
      }
    }
  });
})();
