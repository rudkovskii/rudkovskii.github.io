/**
 * Mila / Мила — pet1 (id: cat), стиль CARTOON (стикерная энергия).
 * По assets/pets/CONTRACT.md v2 + 03-visual-kit.md (раздел 3, pet1).
 * Тот же персонаж, что в cat.js (soft): треугольные уши с розовым нутром,
 * хвост с тёмным кончиком, усы 3+3, розовый нос, табби-полоски + «М» на лбу.
 * Стиль: жирный тональный контур ~4.5px (НЕ чёрный), насыщенная палитра кита,
 * крупные глаза с двойным бликом, экспрессивная мимика и амплитуда.
 * Scoping: селекторы с .pet-cat-cartoon, keyframes cat-cartoon-*,
 * id градиентов cat-cartoon-<mood>-*. Внутренние классы cc-* — всегда
 * используются только под корневым .pet-cat-cartoon, наружу не текут.
 */
(function () {
  "use strict";

  // насыщенная cartoon-версия палитры кита (soft: #F6D8B8/#E8B48C/#F2B8C6…)
  var BODY = "#FBC98B";   // тело — сочный персик
  var BELLY = "#FFEDD2";  // животик крем
  var CARA = "#F09A4B";   // уши/хвост карамель
  var DARK = "#C06A26";   // кончик хвоста / полоски табби
  var OUT = "#9E6234";    // тональный контур (~35% темнее тела)
  var PINK = "#F98BAA";   // нос + нутро уха
  var CHEEK = "#FB8E66";  // щёчки
  var INK = "#3E3A47";    // глаза (--ink)
  var MOUTH = "#F2705A";  // рот коралл
  var PLAID = "#CFC4F5";  // плед (сочная лаванда)
  var PLAIDL = "#8E7BD6"; // контур/стежки пледа

  var SW = 4.5; // стикерный контур, px в координатах viewBox
  var BASE = ".pet-cat-cartoon *{transform-box:view-box}" +
    "@media (prefers-reduced-motion: reduce){.pet-cat-cartoon *{animation:none !important}}";
  var M = ".pet-cat-cartoon.is-"; // префикс каждого селектора (контракт)

  function glowDef(id, c1, o1, c2, o2) {
    return '<radialGradient id="' + id + '" cx="50%" cy="44%" r="56%">' +
      '<stop offset="0%" stop-color="' + c1 + '" stop-opacity="' + o1 + '"/>' +
      '<stop offset="55%" stop-color="' + c2 + '" stop-opacity="' + o2 + '"/>' +
      '<stop offset="100%" stop-color="' + c2 + '" stop-opacity="0"/>' +
      '</radialGradient>';
  }

  function shell(mood, style, defs, inner) {
    return '<svg viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg" ' +
      'class="pet-svg pet-cat pet-cat-cartoon is-' + mood + '" role="img" aria-label="Mila">' +
      '<style>' + style + BASE + '</style>' +
      '<defs>' + defs + '</defs>' + inner + '</svg>';
  }

  // «труба» с контуром: путь дважды — подложка OUT + цвет сверху
  function tube(d, w, c) {
    return '<path d="' + d + '" fill="none" stroke="' + OUT + '" stroke-width="' + (w + 6) + '" stroke-linecap="round"/>' +
      '<path d="' + d + '" fill="none" stroke="' + c + '" stroke-width="' + w + '" stroke-linecap="round"/>';
  }

  // табби-«М» на лбу — жирнее, чем в soft (один path, 3 подпути)
  function tabbyM(x, y, w) {
    return '<path fill="none" stroke="' + DARK + '" stroke-width="' + w + '" stroke-linecap="round" d="' +
      'M' + x + ' ' + (y + 2) + ' L' + (x + 3.5) + ' ' + (y + 12) +
      ' M' + (x + 9) + ' ' + y + ' L' + (x + 9) + ' ' + (y + 12.5) +
      ' M' + (x + 18) + ' ' + (y + 2) + ' L' + (x + 14.5) + ' ' + (y + 12) + '"/>';
  }

  // усы 3+3 — жирные тональные, один path; d>0 — обвисшие
  function whiskers(cy, d, cls) {
    return '<path' + (cls ? ' class="' + cls + '"' : '') + ' fill="none" stroke="' + OUT + '" stroke-width="2.4" stroke-linecap="round" opacity=".85" d="' +
      'M80 ' + (cy - 6) + ' L59 ' + (cy - 11 + d) +
      ' M80 ' + cy + ' L56 ' + (cy + d) +
      ' M80 ' + (cy + 6) + ' L59 ' + (cy + 11 + d * 2) +
      ' M160 ' + (cy - 6) + ' L181 ' + (cy - 11 + d) +
      ' M160 ' + cy + ' L184 ' + (cy + d) +
      ' M160 ' + (cy + 6) + ' L181 ' + (cy + 11 + d * 2) + '"/>';
  }

  // веко: телесный круг с контуром — в закрытом виде читается как мультяшный «шов»
  function lid(cls, cx, cy, r) {
    return '<ellipse class="cc-lid ' + cls + '" cx="' + cx + '" cy="' + cy + '" rx="' + r + '" ry="' + r +
      '" fill="' + BODY + '" stroke="' + OUT + '" stroke-width="2.5"/>';
  }

  /* ---- RADIANT: тянется вверх, хвост трубой машет, подскок, искры ---- */

  function radiant() {
    var P = M + "radiant ";
    var style =
      P + '.cc-pet{transform-origin:120px 200px;animation:cat-cartoon-hop 4.6s ease-in-out infinite}' +
      P + '.cc-body{transform-origin:120px 200px;animation:cat-cartoon-br 2.2s ease-in-out infinite}' +
      P + '.cc-tail{transform-origin:148px 188px;animation:cat-cartoon-wag 2.2s ease-in-out infinite}' +
      P + '.cc-tip{transform-origin:172px 122px;animation:cat-cartoon-flick 2.2s ease-in-out infinite}' +
      P + '.cc-aura{animation:cat-cartoon-glow 2.2s ease-in-out infinite}' +
      P + '.cc-lid{transform:scaleY(0);animation:cat-cartoon-blink 4.4s linear infinite}' +
      P + '.cc-lidl{transform-origin:103px 117px}' +
      P + '.cc-lidr{transform-origin:137px 117px}' +
      P + '.cc-whisk{transform-origin:120px 126px;animation:cat-cartoon-wsk 2.2s ease-in-out infinite}' +
      P + '.cc-spark{animation:cat-cartoon-twk 1.9s ease-in-out infinite}' +
      P + '.cc-s1{transform-origin:62px 60px}' +
      P + '.cc-s2{transform-origin:180px 52px;animation-delay:.5s}' +
      P + '.cc-s3{transform-origin:54px 104px;animation-delay:1s}' +
      P + '.cc-s4{transform-origin:188px 98px;animation-delay:1.4s}' +
      '@keyframes cat-cartoon-hop{0%,58%,100%{transform:translateY(0) scale(1,1)}64%{transform:translateY(0) scale(1.06,.92)}70%{transform:translateY(-9px) scale(.96,1.06)}78%{transform:translateY(0) scale(1.03,.97)}84%{transform:translateY(0) scale(1,1)}}' +
      '@keyframes cat-cartoon-br{0%,100%{transform:scale(1,1)}50%{transform:scale(1.045,.955)}}' +
      '@keyframes cat-cartoon-wag{0%,100%{transform:rotate(-10deg)}50%{transform:rotate(12deg)}}' +
      '@keyframes cat-cartoon-flick{0%,100%{transform:rotate(-12deg)}50%{transform:rotate(18deg)}}' +
      '@keyframes cat-cartoon-glow{0%,100%{opacity:.75}50%{opacity:1}}' +
      '@keyframes cat-cartoon-blink{0%,92%,100%{transform:scaleY(0)}94.5%,96.5%{transform:scaleY(1)}}' +
      '@keyframes cat-cartoon-wsk{0%,100%{transform:rotate(0deg)}50%{transform:rotate(2deg)}}' +
      '@keyframes cat-cartoon-twk{0%,100%{opacity:.15;transform:scale(.4) rotate(0deg)}50%{opacity:1;transform:scale(1.2) rotate(24deg)}}';

    var defs = glowDef("cat-cartoon-radiant-glow", "#FFD87A", ".95", "#FFF3D9", ".55");
    var star = 'M0 -7 L2 -2 L7 0 L2 2 L0 7 L-2 2 L-7 0 L-2 -2 Z';

    var inner =
      '<g class="cc-aura aura"><circle cx="120" cy="130" r="94" fill="url(#cat-cartoon-radiant-glow)"/></g>' +
      '<ellipse cx="120" cy="203" rx="40" ry="6.5" fill="' + INK + '" opacity=".1"/>' +
      '<g class="cc-pet">' +
      '<g class="cc-tail extras">' +
      tube('M148 188 Q186 168 180 122 Q178 108 168 106', 11, CARA) +
      '<g class="cc-tip">' + tube('M178 124 Q175 109 165 106', 11, DARK) + '</g>' +
      '</g>' +
      '<g class="cc-body body">' +
      // уши торчком, контур + розовое нутро
      '<path d="M97 99 L89 54 L120 84 Z" fill="' + CARA + '" stroke="' + OUT + '" stroke-width="' + SW + '" stroke-linejoin="round"/>' +
      '<path d="M143 99 L151 54 L120 84 Z" fill="' + CARA + '" stroke="' + OUT + '" stroke-width="' + SW + '" stroke-linejoin="round"/>' +
      '<path d="M97 89 L93 64 L110 80 Z" fill="' + PINK + '"/>' +
      '<path d="M143 89 L147 64 L130 80 Z" fill="' + PINK + '"/>' +
      // тело вытянуто вверх, стикерный контур
      '<ellipse cx="120" cy="142" rx="44" ry="59" fill="' + BODY + '" stroke="' + OUT + '" stroke-width="' + SW + '"/>' +
      '<ellipse cx="120" cy="166" rx="26" ry="28" fill="' + BELLY + '"/>' +
      tabbyM(111, 92, 4) +
      '<path fill="none" stroke="' + DARK + '" stroke-width="5.5" stroke-linecap="round" d="M79 148 q9 5 18 3 M81 165 q9 5 17 2 M161 148 q-9 5 -18 3 M159 165 q-9 5 -17 2"/>' +
      '<ellipse cx="107" cy="187" rx="8.5" ry="14" fill="' + BODY + '" stroke="' + OUT + '" stroke-width="3.5"/>' +
      '<ellipse cx="133" cy="187" rx="8.5" ry="14" fill="' + BODY + '" stroke="' + OUT + '" stroke-width="3.5"/>' +
      // ОГРОМНЫЕ глаза с двойным бликом — стикерная энергия
      '<g class="cc-eyes eyes">' +
      '<circle cx="103" cy="117" r="10" fill="' + INK + '"/>' +
      '<circle cx="137" cy="117" r="10" fill="' + INK + '"/>' +
      '<circle cx="106.6" cy="113" r="3.8" fill="#FFFFFF"/>' +
      '<circle cx="140.6" cy="113" r="3.8" fill="#FFFFFF"/>' +
      '<circle cx="100" cy="121.5" r="1.8" fill="#FFFFFF" opacity=".9"/>' +
      '<circle cx="134" cy="121.5" r="1.8" fill="#FFFFFF" opacity=".9"/>' +
      '</g>' +
      '<g class="eyelids">' + lid("cc-lidl", 103, 117, 10.8) + lid("cc-lidr", 137, 117, 10.8) + '</g>' +
      // нос + широченная улыбка с язычком
      '<path d="M115 131 L125 131 L120 138.5 Z" fill="' + PINK + '" stroke="' + OUT + '" stroke-width="2" stroke-linejoin="round"/>' +
      '<g class="cc-mouth mouth">' +
      '<path d="M120 138.5 L120 141.5" stroke="' + OUT + '" stroke-width="2.4" stroke-linecap="round"/>' +
      '<path d="M108 141.5 Q120 156 132 141.5 Z" fill="' + MOUTH + '" stroke="' + OUT + '" stroke-width="3" stroke-linejoin="round"/>' +
      '<ellipse cx="120" cy="148" rx="4.5" ry="2.8" fill="' + PINK + '"/>' +
      '</g>' +
      '<ellipse cx="88" cy="131" rx="8.5" ry="5.5" fill="' + CHEEK + '" opacity=".85"/>' +
      '<ellipse cx="152" cy="131" rx="8.5" ry="5.5" fill="' + CHEEK + '" opacity=".85"/>' +
      whiskers(122, -2, "cc-whisk") +
      '</g>' +
      '</g>' +
      '<g class="cc-parts particles" fill="#F5A623" stroke="' + OUT + '" stroke-width="1" stroke-linejoin="round">' +
      '<g class="cc-spark cc-s1"><path transform="translate(62,60) scale(1.1)" d="' + star + '"/></g>' +
      '<g class="cc-spark cc-s2"><path transform="translate(180,52) scale(.9)" d="' + star + '"/></g>' +
      '<g class="cc-spark cc-s3"><path transform="translate(54,104) scale(.7)" d="' + star + '"/></g>' +
      '<g class="cc-spark cc-s4"><path transform="translate(188,98) scale(1)" d="' + star + '"/></g>' +
      '</g>';

    return shell("radiant", style, defs, inner);
  }

  /* ---- STEADY: булка, хвост вокруг, довольная w-улыбка ---- */

  function steady() {
    var P = M + "steady ";
    var style =
      P + '.cc-body{transform-origin:120px 200px;animation:cat-cartoon-bs 3.5s ease-in-out infinite}' +
      P + '.cc-pet{transform-origin:120px 200px;animation:cat-cartoon-sway 7s ease-in-out infinite}' +
      P + '.cc-tip{transform-origin:112px 197px;animation:cat-cartoon-tip 3.5s ease-in-out infinite}' +
      P + '.cc-lid{transform:scaleY(0);animation:cat-cartoon-blks 5.2s linear infinite}' +
      P + '.cc-lidl{transform-origin:102px 134px}' +
      P + '.cc-lidr{transform-origin:138px 134px}' +
      '@keyframes cat-cartoon-bs{0%,100%{transform:scale(1)}50%{transform:scale(1.035,.965)}}' +
      '@keyframes cat-cartoon-sway{0%,100%{transform:rotate(-1.2deg)}50%{transform:rotate(1.2deg)}}' +
      '@keyframes cat-cartoon-tip{0%,100%{transform:rotate(0deg)}50%{transform:rotate(-14deg)}}' +
      '@keyframes cat-cartoon-blks{0%,93%,100%{transform:scaleY(0)}95.5%,97.5%{transform:scaleY(1)}}';

    var defs = glowDef("cat-cartoon-steady-glow", "#A8DDBE", ".85", "#E8F3EA", ".5");

    var inner =
      '<g class="cc-aura aura"><circle cx="120" cy="146" r="88" fill="url(#cat-cartoon-steady-glow)"/></g>' +
      '<ellipse cx="120" cy="204" rx="48" ry="6.5" fill="' + INK + '" opacity=".1"/>' +
      '<g class="cc-pet">' +
      '<g class="cc-body body">' +
      '<path d="M87 111 L78 66 L113 95 Z" fill="' + CARA + '" stroke="' + OUT + '" stroke-width="' + SW + '" stroke-linejoin="round"/>' +
      '<path d="M153 111 L162 66 L127 95 Z" fill="' + CARA + '" stroke="' + OUT + '" stroke-width="' + SW + '" stroke-linejoin="round"/>' +
      '<path d="M89 102 L84 75 L103 90 Z" fill="' + PINK + '"/>' +
      '<path d="M151 102 L156 75 L137 90 Z" fill="' + PINK + '"/>' +
      // булка со стикерным контуром
      '<circle cx="120" cy="149" r="52" fill="' + BODY + '" stroke="' + OUT + '" stroke-width="' + SW + '"/>' +
      '<ellipse cx="120" cy="172" rx="28" ry="21" fill="' + BELLY + '"/>' +
      tabbyM(111, 106, 3.6) +
      '<path fill="none" stroke="' + DARK + '" stroke-width="5.5" stroke-linecap="round" d="M72 138 q10 5 19 4 M75 156 q10 5 18 3 M168 138 q-10 5 -19 4 M165 156 q-10 5 -18 3"/>' +
      '<ellipse cx="105" cy="197" rx="11" ry="6.5" fill="' + BODY + '" stroke="' + OUT + '" stroke-width="3"/>' +
      '<ellipse cx="135" cy="197" rx="11" ry="6.5" fill="' + BODY + '" stroke="' + OUT + '" stroke-width="3"/>' +
      // крупные спокойные глаза
      '<g class="cc-eyes eyes">' +
      '<circle cx="102" cy="134" r="8.2" fill="' + INK + '"/>' +
      '<circle cx="138" cy="134" r="8.2" fill="' + INK + '"/>' +
      '<circle cx="104.8" cy="131" r="2.9" fill="#FFFFFF"/>' +
      '<circle cx="140.8" cy="131" r="2.9" fill="#FFFFFF"/>' +
      '</g>' +
      '<g class="eyelids">' + lid("cc-lidl", 102, 134, 9) + lid("cc-lidr", 138, 134, 9) + '</g>' +
      // нос + жирная кошачья w-улыбка
      '<path d="M115.5 146 L124.5 146 L120 152.5 Z" fill="' + PINK + '" stroke="' + OUT + '" stroke-width="2" stroke-linejoin="round"/>' +
      '<g class="cc-mouth mouth">' +
      '<path d="M120 152.5 L120 155.5" stroke="' + OUT + '" stroke-width="2.4" stroke-linecap="round" fill="none"/>' +
      '<path d="M110 155.5 Q115 161.5 120 155.5 Q125 161.5 130 155.5" fill="none" stroke="' + OUT + '" stroke-width="3" stroke-linecap="round"/>' +
      '</g>' +
      '<ellipse cx="88" cy="148" rx="8" ry="5" fill="' + CHEEK + '" opacity=".85"/>' +
      '<ellipse cx="152" cy="148" rx="8" ry="5" fill="' + CHEEK + '" opacity=".85"/>' +
      whiskers(146, 0, "") +
      '</g>' +
      // хвост обёрнут вокруг тела, тёмный кончик покачивается
      '<g class="cc-tail extras">' +
      tube('M166 168 Q190 182 178 196 Q158 205 124 202 Q110 201 102 198', 10, CARA) +
      '<g class="cc-tip">' + tube('M115 200.5 Q105 199.5 98 196.5', 10, DARK) + '</g>' +
      '</g>' +
      '</g>';

    return shell("steady", style, defs, inner);
  }

  /* ---- TIRED: растеклась в овал, ухо согнуто, огромный зевок ---- */

  function tired() {
    var P = M + "tired ";
    var style =
      P + '.cc-body{transform-origin:120px 200px;animation:cat-cartoon-bt 5s ease-in-out infinite}' +
      P + '.cc-tip{transform-origin:176px 199px;animation:cat-cartoon-twt 9s ease-in-out infinite}' +
      P + '.cc-fold{transform-origin:146px 104px;animation:cat-cartoon-flop 9s ease-in-out infinite}' +
      P + '.cc-lid{transform:scaleY(.46);animation:cat-cartoon-blkt 6s linear infinite}' +
      P + '.cc-lidl{transform-origin:101px 152px}' +
      P + '.cc-lidr{transform-origin:141px 152px}' +
      P + '.cc-mouth{transform-origin:120px 170px;transform:scale(1,.14);animation:cat-cartoon-yawn 7.5s ease-in-out infinite}' +
      '@keyframes cat-cartoon-bt{0%,100%{transform:scale(1)}50%{transform:scale(1.025,.975)}}' +
      '@keyframes cat-cartoon-twt{0%,88%,100%{transform:rotate(0deg)}91%{transform:rotate(-22deg)}94%{transform:rotate(10deg)}97%{transform:rotate(0deg)}}' +
      '@keyframes cat-cartoon-flop{0%,80%,100%{transform:rotate(0deg)}84%{transform:rotate(7deg)}88%{transform:rotate(-3deg)}92%{transform:rotate(0deg)}}' +
      '@keyframes cat-cartoon-blkt{0%,88%,100%{transform:scaleY(.46)}91.5%,93%{transform:scaleY(1)}}' +
      '@keyframes cat-cartoon-yawn{0%,52%,100%{transform:scale(1,.14)}60%,76%{transform:scale(1.25,1.12)}86%{transform:scale(1,.14)}}';

    var defs = glowDef("cat-cartoon-tired-glow", "#C3CFEA", ".7", "#EDF0F8", ".4");

    var inner =
      '<g class="cc-aura aura"><circle cx="120" cy="154" r="86" fill="url(#cat-cartoon-tired-glow)"/></g>' +
      '<ellipse cx="120" cy="205" rx="60" ry="6.5" fill="' + INK + '" opacity=".09"/>' +
      '<g class="cc-pet">' +
      '<g class="cc-body body">' +
      // левое ухо вверх, правое согнуто и изредка вздрагивает
      '<path d="M83 139 L73 100 L109 126 Z" fill="' + CARA + '" stroke="' + OUT + '" stroke-width="' + SW + '" stroke-linejoin="round"/>' +
      '<path d="M85 130 L80 108 L99 122 Z" fill="' + PINK + '"/>' +
      '<g class="cc-fold">' +
      '<path d="M136 126 L146 98 L166 134 Z" fill="' + CARA + '" stroke="' + OUT + '" stroke-width="' + SW + '" stroke-linejoin="round"/>' +
      '<path d="M146 98 L170 109 L157 124 Z" fill="' + DARK + '" stroke="' + OUT + '" stroke-width="3.5" stroke-linejoin="round"/>' +
      '</g>' +
      // растеклась в овал (сильный squash)
      '<ellipse cx="120" cy="163" rx="63" ry="38" fill="' + BODY + '" stroke="' + OUT + '" stroke-width="' + SW + '"/>' +
      '<ellipse cx="120" cy="180" rx="32" ry="16" fill="' + BELLY + '"/>' +
      tabbyM(111, 127, 3.2) +
      '<path fill="none" stroke="' + DARK + '" stroke-width="5" stroke-linecap="round" d="M64 152 q10 5 19 3 M68 170 q10 5 18 2 M176 152 q-10 5 -19 3 M172 170 q-10 5 -18 2"/>' +
      '<ellipse cx="92" cy="199" rx="12" ry="6" fill="' + BODY + '" stroke="' + OUT + '" stroke-width="3"/>' +
      '<ellipse cx="148" cy="199" rx="12" ry="6" fill="' + BODY + '" stroke="' + OUT + '" stroke-width="3"/>' +
      // глаза крупные, но полуприкрытые (веко ~46%)
      '<g class="cc-eyes eyes">' +
      '<circle cx="101" cy="152" r="7.8" fill="' + INK + '"/>' +
      '<circle cx="141" cy="152" r="7.8" fill="' + INK + '"/>' +
      '<circle cx="103.4" cy="150" r="2" fill="#FFFFFF" opacity=".9"/>' +
      '<circle cx="143.4" cy="150" r="2" fill="#FFFFFF" opacity=".9"/>' +
      '</g>' +
      '<g class="eyelids">' + lid("cc-lidl", 101, 152, 8.8) + lid("cc-lidr", 141, 152, 8.8) + '</g>' +
      // нос + огромный мультяшный зевок
      '<path d="M115.5 162 L124.5 162 L120 168 Z" fill="' + PINK + '" stroke="' + OUT + '" stroke-width="2" stroke-linejoin="round"/>' +
      '<g class="cc-mouth mouth">' +
      '<ellipse cx="120" cy="178" rx="8.5" ry="10" fill="' + MOUTH + '" stroke="' + OUT + '" stroke-width="3"/>' +
      '<ellipse cx="120" cy="182" rx="4.5" ry="4.2" fill="' + PINK + '"/>' +
      '</g>' +
      '<ellipse cx="86" cy="164" rx="8" ry="5" fill="' + CHEEK + '" opacity=".8"/>' +
      '<ellipse cx="154" cy="164" rx="8" ry="5" fill="' + CHEEK + '" opacity=".8"/>' +
      whiskers(160, 4, "") +
      '</g>' +
      // хвост лежит плоско, кончик изредка дёргается
      '<g class="cc-tail extras">' +
      tube('M174 184 Q200 188 195 197 Q186 202 171 201', 9, CARA) +
      '<g class="cc-tip">' + tube('M178 201.5 Q169 201.5 162 199.5', 9, DARK) + '</g>' +
      '</g>' +
      '</g>';

    return shell("tired", style, defs, inner);
  }

  /* ---- DRAINED: клубок под пледом, глаза-щёлочки, z ---- */

  function drained() {
    var P = M + "drained ";
    var style =
      P + '.cc-body{transform-origin:120px 200px;animation:cat-cartoon-bd 7s ease-in-out infinite}' +
      P + '.cc-blank{transform-origin:146px 198px;animation:cat-cartoon-blan 7s ease-in-out infinite}' +
      P + '.cc-eyes{transform-origin:102px 166px;animation:cat-cartoon-peek 10s linear infinite}' +
      P + '.cc-z{opacity:0;animation:cat-cartoon-zf 7s ease-in-out infinite}' +
      P + '.cc-z2{animation-delay:2.3s}' +
      P + '.cc-z3{animation-delay:4.6s}' +
      '@keyframes cat-cartoon-bd{0%,100%{transform:scale(1)}50%{transform:scale(1.015,1.045)}}' +
      '@keyframes cat-cartoon-blan{0%,100%{transform:translateY(0)}50%{transform:translateY(-2.8px)}}' +
      '@keyframes cat-cartoon-peek{0%,91%,100%{transform:scaleY(1)}93.5%,95%{transform:scaleY(2.2)}}' +
      '@keyframes cat-cartoon-zf{0%{opacity:0;transform:translateY(8px)}14%{opacity:.9}55%,100%{opacity:0;transform:translateY(-17px)}}';

    var defs = glowDef("cat-cartoon-drained-glow", "#CDBBE8", ".65", "#F0ECF7", ".35");
    var zPath = 'M0 0 h9 l-9 9 h9';

    var inner =
      '<g class="cc-aura aura"><circle cx="120" cy="166" r="82" fill="url(#cat-cartoon-drained-glow)"/></g>' +
      '<ellipse cx="124" cy="204" rx="46" ry="6" fill="' + INK + '" opacity=".1"/>' +
      '<g class="cc-pet">' +
      '<g class="cc-body body">' +
      '<path d="M89 154 L79 120 L109 143 Z" fill="' + CARA + '" stroke="' + OUT + '" stroke-width="4" stroke-linejoin="round"/>' +
      '<path d="M91 146 L86 127 L101 140 Z" fill="' + PINK + '"/>' +
      // клубок «нос в хвост»
      '<ellipse cx="122" cy="173" rx="36" ry="28" fill="' + BODY + '" stroke="' + OUT + '" stroke-width="4"/>' +
      '<path d="M93 189 q9 4.5 16 2.5" fill="none" stroke="' + DARK + '" stroke-width="4.5" stroke-linecap="round"/>' +
      // глаза-щёлочки, жирные, редкий «подгляд»
      '<g class="cc-eyes eyes" fill="none" stroke="' + INK + '" stroke-width="3" stroke-linecap="round">' +
      '<path d="M90 167 q4.5 4 9 0"/>' +
      '<path d="M103 164 q4.5 4 9 0"/>' +
      '</g>' +
      '<path d="M97 172 L104 172 L100.5 176.5 Z" fill="' + PINK + '" stroke="' + OUT + '" stroke-width="1.8" stroke-linejoin="round"/>' +
      '<g class="cc-mouth mouth">' +
      '<path d="M97 181 q3.5 2.8 7 0" fill="none" stroke="' + OUT + '" stroke-width="2.4" stroke-linecap="round" opacity=".75"/>' +
      '</g>' +
      '<ellipse cx="87" cy="178" rx="6" ry="4" fill="' + CHEEK + '" opacity=".8"/>' +
      '<g stroke="' + OUT + '" stroke-width="2.2" stroke-linecap="round" opacity=".75">' +
      '<line x1="86" y1="168" x2="73" y2="165"/><line x1="86" y1="172" x2="71" y2="172"/><line x1="86" y1="176" x2="74" y2="181"/>' +
      '</g>' +
      '</g>' +
      // вязаный плед поверх клубка, дышит; наружу — ухо и кончик хвоста
      '<g class="cc-blank extras">' +
      '<path d="M118 149 Q140 136 161 149 Q176 159 177 180 Q177 196 161 198 L128 199 Q117 199 116 187 Q115 165 118 149 Z" fill="' + PLAID + '" stroke="' + PLAIDL + '" stroke-width="4" stroke-linejoin="round"/>' +
      '<path d="M127 162 l4.5 4.5 l4.5 -4.5 M141 158 l4.5 4.5 l4.5 -4.5 M155 162 l4.5 4.5 l4.5 -4.5 M125 178 l4.5 4.5 l4.5 -4.5 M139 176 l4.5 4.5 l4.5 -4.5 M153 178 l4.5 4.5 l4.5 -4.5 M133 190 l4.5 4.5 l4.5 -4.5 M147 189 l4.5 4.5 l4.5 -4.5" fill="none" stroke="' + PLAIDL + '" stroke-width="2" stroke-linecap="round"/>' +
      '<path d="M124 147 L130 121 L148 142 Z" fill="' + CARA + '" stroke="' + OUT + '" stroke-width="4" stroke-linejoin="round"/>' +
      '<path d="M129 141 L132 128 L141 138 Z" fill="' + PINK + '"/>' +
      tube('M148 156 Q168 147 172 162 Q173 174 165 176', 8, CARA) +
      tube('M171 166 Q171 175 163 176.5', 8, DARK) +
      '</g>' +
      '</g>' +
      // всплывающие z — жирнее, мультяшнее
      '<g class="cc-parts particles" fill="none" stroke="#8F76D6" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round">' +
      '<g class="cc-z"><path transform="translate(84,156) scale(.7)" d="' + zPath + '"/></g>' +
      '<g class="cc-z cc-z2"><path transform="translate(75,139) scale(.95)" d="' + zPath + '"/></g>' +
      '<g class="cc-z cc-z3"><path transform="translate(66,121) scale(1.2)" d="' + zPath + '"/></g>' +
      '</g>';

    return shell("drained", style, defs, inner);
  }

  if (typeof window.registerPetStyle !== "function") return;

  window.registerPetStyle({
    petId: "cat",
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
