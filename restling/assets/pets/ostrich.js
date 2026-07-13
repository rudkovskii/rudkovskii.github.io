/**
 * Poppy / Поппи — страус (id: ostrich), милый бежево-тан страус, kawaii die-cut sticker.
 * Базовый модуль (стиль soft) по assets/pets/CONTRACT.md.
 * Видовые признаки (читаются мгновенно): круглое пушистое тан-тело с пёрышками-
 * плюмажами у хвоста, ДЛИННАЯ тонкая персиково-розовая шея к маленькой голове с
 * большими блестящими глазами и маленьким клювом, ДВЕ длинные тонкие ноги.
 * Sticker-стиль: залитый округлый силуэт, один толстый тёмный контур (~5px) на
 * каждой форме, die-cut белая обводка позади всего персонажа (включая шею и ноги),
 * большие блестящие глаза с бликами, румяные щёки, мягкая тень-эллипс.
 * Все классы / @keyframes / id — с префиксом «ostrich-sticker-».
 */
(function () {
  "use strict";

  var BODY = "#e8d0a0";   // пушистое бежево-тан тело
  var BELLY = "#f4e6c4";  // светлый песочный — грудка
  var PLUME = "#d4b478";  // пёрышки-плюмажи / крылья чуть темнее
  var NECK = "#f2b79a";   // персиково-розовая шея + голова
  var LEG = "#e8a888";    // тонкие ноги (персиковые)
  var BEAK = "#ef9f5e";   // маленький тёплый клюв
  var OUT = "#2c2622";    // тёплый почти-чёрный контур
  var INK = "#2c2622";    // глаза
  var CHEEK = "#f2a488";  // персиково-розовые щёки
  var WHITE = "#ffffff";  // die-cut обводка + блики
  var SP = "#f5a623";     // искры

  var SW = 5;             // толщина контура форм
  var NW = 13;            // толщина шеи
  var LW = 8;             // толщина ног
  var DA = 'fill="' + WHITE + '" stroke="' + WHITE + '" stroke-width="19" stroke-linejoin="round" stroke-linecap="round"';
  var REDUCED = "@media (prefers-reduced-motion: reduce){.pet-ostrich *{animation:none !important}}";

  function glowDef(id, c1, o1, c2, o2) {
    return '<radialGradient id="' + id + '" cx="50%" cy="46%" r="56%">' +
      '<stop offset="0%" stop-color="' + c1 + '" stop-opacity="' + o1 + '"/>' +
      '<stop offset="55%" stop-color="' + c2 + '" stop-opacity="' + o2 + '"/>' +
      '<stop offset="100%" stop-color="' + c2 + '" stop-opacity="0"/>' +
      '</radialGradient>';
  }

  function shell(mood, style, defs, inner) {
    return '<svg viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg" ' +
      'class="pet-svg pet-ostrich is-' + mood + '" role="img" aria-label="Poppy">' +
      '<style>' + style + REDUCED + '</style>' +
      '<defs>' + defs + '</defs>' + inner + '</svg>';
  }

  // die-cut тонких частей (шея/ноги): белый stroke шире контура на ~7px наружу
  function dtube(d, w) {
    return '<path d="' + d + '" fill="none" stroke="' + WHITE + '" stroke-width="' + (w + 19) +
      '" stroke-linecap="round" stroke-linejoin="round"/>';
  }
  // цветная «трубка» шеи/ноги: тёмный контур + заливка сверху
  function tube(d, w, color) {
    return '<path d="' + d + '" fill="none" stroke="' + OUT + '" stroke-width="' + (w + SW) +
      '" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<path d="' + d + '" fill="none" stroke="' + color + '" stroke-width="' + w +
      '" stroke-linecap="round" stroke-linejoin="round"/>';
  }
  function eye(cx, cy, rx, ry) {
    return '<ellipse cx="' + cx + '" cy="' + cy + '" rx="' + rx + '" ry="' + ry + '" fill="' + INK + '"/>' +
      '<circle cx="' + (cx + rx * 0.35) + '" cy="' + (cy - ry * 0.4) + '" r="' + (rx * 0.42) + '" fill="' + WHITE + '"/>' +
      '<circle cx="' + (cx - rx * 0.4) + '" cy="' + (cy + ry * 0.35) + '" r="' + (rx * 0.2) + '" fill="' + WHITE + '" opacity=".85"/>';
  }
  function foot(cx) {
    return '<g fill="none" stroke="' + OUT + '" stroke-width="4.5" stroke-linecap="round">' +
      '<path d="M' + cx + ' 205 l-6 4"/><path d="M' + cx + ' 205 l7 3"/></g>';
  }

  var STAR = 'M0 -6 L1.7 -1.7 L6 0 L1.7 1.7 L0 6 L-1.7 1.7 L-6 0 L-1.7 -1.7 Z';
  var ZP = 'M0 0 h8 l-8 8 h8';

  /* =========================================================
     RADIANT — шея вытянута вверх, бодрый, крылышки подняты, искры
     ========================================================= */
  function radiant() {
    var neckD = "M116 122 C112 92 116 64 130 46";
    var legL = "M106 188 C104 195 105 201 106 206";
    var legR = "M128 188 C130 195 129 201 128 206";
    var plumeD = "M150 130 Q172 116 182 132 Q190 142 181 156 Q172 166 155 158 Q147 146 150 130 Z";
    var wingL = "M90 150 Q66 138 60 158 Q58 172 76 170 Q88 162 90 150 Z";
    var wingR = "M142 150 Q166 138 172 158 Q174 172 156 170 Q144 162 142 150 Z";

    var style =
      '.pet-ostrich.is-radiant .ostrich-sticker-body{transform-box:view-box;transform-origin:116px 206px;animation:ostrich-sticker-breathe-r 2.2s ease-in-out infinite}' +
      '.pet-ostrich.is-radiant .ostrich-sticker-upper{transform-box:view-box;transform-origin:116px 120px;animation:ostrich-sticker-stretch 2.2s ease-in-out infinite}' +
      '.pet-ostrich.is-radiant .ostrich-sticker-wing-l{transform-box:view-box;transform-origin:90px 150px;animation:ostrich-sticker-flap-l 1.1s ease-in-out infinite}' +
      '.pet-ostrich.is-radiant .ostrich-sticker-wing-r{transform-box:view-box;transform-origin:142px 150px;animation:ostrich-sticker-flap-r 1.1s ease-in-out infinite}' +
      '.pet-ostrich.is-radiant .ostrich-sticker-aura{animation:ostrich-sticker-glow 2.2s ease-in-out infinite}' +
      '.pet-ostrich.is-radiant .ostrich-sticker-lid{transform-box:view-box;transform:scaleY(0);animation:ostrich-sticker-blink 4.4s linear infinite}' +
      '.pet-ostrich.is-radiant .ostrich-sticker-lid-l{transform-origin:128px 40px}' +
      '.pet-ostrich.is-radiant .ostrich-sticker-lid-r{transform-origin:141px 40px}' +
      '.pet-ostrich.is-radiant .ostrich-sticker-spark{transform-box:view-box;animation:ostrich-sticker-twinkle 1.9s ease-in-out infinite}' +
      '.pet-ostrich.is-radiant .ostrich-sticker-sp1{transform-origin:66px 60px}' +
      '.pet-ostrich.is-radiant .ostrich-sticker-sp2{transform-origin:180px 54px;animation-delay:.5s}' +
      '.pet-ostrich.is-radiant .ostrich-sticker-sp3{transform-origin:58px 108px;animation-delay:1s}' +
      '.pet-ostrich.is-radiant .ostrich-sticker-sp4{transform-origin:184px 100px;animation-delay:1.4s}' +
      '@keyframes ostrich-sticker-breathe-r{0%,100%{transform:scale(1,1)}50%{transform:scale(1.03,.97)}}' +
      '@keyframes ostrich-sticker-stretch{0%,100%{transform:translateY(0) rotate(-1deg)}50%{transform:translateY(-3px) rotate(1deg)}}' +
      '@keyframes ostrich-sticker-flap-l{0%,100%{transform:rotate(0deg)}50%{transform:rotate(-12deg)}}' +
      '@keyframes ostrich-sticker-flap-r{0%,100%{transform:rotate(0deg)}50%{transform:rotate(12deg)}}' +
      '@keyframes ostrich-sticker-glow{0%,100%{opacity:.75}50%{opacity:1}}' +
      '@keyframes ostrich-sticker-blink{0%,92%,100%{transform:scaleY(0)}94.5%,96.5%{transform:scaleY(1)}}' +
      '@keyframes ostrich-sticker-twinkle{0%,100%{opacity:.15;transform:scale(.5)}50%{opacity:1;transform:scale(1)}}';

    var defs = glowDef("ostrich-sticker-radiant-glow", "#ffdf9e", ".9", "#fff3d9", ".55");

    var diecut = '<g class="ostrich-sticker-diecut">' +
      '<path d="' + plumeD + '" ' + DA + '/>' +
      '<ellipse cx="116" cy="154" rx="40" ry="37" ' + DA + '/>' +
      '<path d="' + wingL + '" ' + DA + '/><path d="' + wingR + '" ' + DA + '/>' +
      dtube(legL, LW) + dtube(legR, LW) +
      dtube(neckD, NW) +
      '<circle cx="134" cy="42" r="16" ' + DA + '/>' +
      '</g>';

    var inner =
      '<g class="ostrich-sticker-aura aura"><circle cx="118" cy="132" r="96" fill="url(#ostrich-sticker-radiant-glow)"/></g>' +
      '<ellipse class="ostrich-sticker-shadow" cx="116" cy="212" rx="42" ry="6.5" fill="' + INK + '" opacity=".08"/>' +
      diecut +
      '<g class="ostrich-sticker-pet">' +
        '<g class="ostrich-sticker-body body">' +
          // длинные тонкие ноги + лапки
          '<g class="ostrich-sticker-legs">' + tube(legL, LW, LEG) + tube(legR, LW, LEG) + foot(106) + foot(128) + '</g>' +
          // хвостовые плюмажи за телом
          '<path class="ostrich-sticker-plume" d="' + plumeD + '" fill="' + PLUME + '" stroke="' + OUT + '" stroke-width="' + SW + '" stroke-linejoin="round"/>' +
          '<path d="M156 138 q10 4 16 12 M152 150 q11 1 18 7" fill="none" stroke="' + OUT + '" stroke-width="2" stroke-linecap="round" opacity=".35"/>' +
          // круглое пушистое тело
          '<ellipse cx="116" cy="154" rx="40" ry="37" fill="' + BODY + '" stroke="' + OUT + '" stroke-width="' + SW + '" stroke-linejoin="round"/>' +
          '<ellipse cx="114" cy="166" rx="24" ry="21" fill="' + BELLY + '"/>' +
          // приподнятые крылышки
          '<g class="ostrich-sticker-wing-l"><path d="' + wingL + '" fill="' + PLUME + '" stroke="' + OUT + '" stroke-width="' + SW + '" stroke-linejoin="round"/></g>' +
          '<g class="ostrich-sticker-wing-r"><path d="' + wingR + '" fill="' + PLUME + '" stroke="' + OUT + '" stroke-width="' + SW + '" stroke-linejoin="round"/></g>' +
          // длинная шея + маленькая голова
          '<g class="ostrich-sticker-upper">' +
            tube(neckD, NW, NECK) +
            '<circle cx="134" cy="42" r="16" fill="' + NECK + '" stroke="' + OUT + '" stroke-width="' + SW + '"/>' +
            '<g class="ostrich-sticker-eyes eyes">' + eye(128, 40, 6.4, 7.4) + eye(141, 40, 6.4, 7.4) + '</g>' +
            '<g class="ostrich-sticker-lids eyelids">' +
              '<ellipse class="ostrich-sticker-lid ostrich-sticker-lid-l" cx="128" cy="40" rx="7.2" ry="8" fill="' + NECK + '"/>' +
              '<ellipse class="ostrich-sticker-lid ostrich-sticker-lid-r" cx="141" cy="40" rx="7.2" ry="8" fill="' + NECK + '"/>' +
            '</g>' +
            // маленький клюв (приоткрыт, радостно)
            '<path d="M133 51 L147 49 L136 57 Z" fill="' + BEAK + '" stroke="' + OUT + '" stroke-width="2.4" stroke-linejoin="round"/>' +
            '<path d="M135 57 L145 56 L136 61 Z" fill="' + BEAK + '" stroke="' + OUT + '" stroke-width="2.2" stroke-linejoin="round"/>' +
            '<ellipse cx="123" cy="48" rx="5.5" ry="3.8" fill="' + CHEEK + '" opacity=".55"/>' +
            '<ellipse cx="147" cy="48" rx="5.5" ry="3.8" fill="' + CHEEK + '" opacity=".55"/>' +
          '</g>' +
        '</g>' +
      '</g>' +
      '<g class="ostrich-sticker-particles particles" fill="' + SP + '">' +
        '<g class="ostrich-sticker-spark ostrich-sticker-sp1"><path transform="translate(66,60)" d="' + STAR + '"/></g>' +
        '<g class="ostrich-sticker-spark ostrich-sticker-sp2"><path transform="translate(180,54) scale(.8)" d="' + STAR + '"/></g>' +
        '<g class="ostrich-sticker-spark ostrich-sticker-sp3"><path transform="translate(58,108) scale(.65)" d="' + STAR + '"/></g>' +
        '<g class="ostrich-sticker-spark ostrich-sticker-sp4"><path transform="translate(184,100) scale(.9)" d="' + STAR + '"/></g>' +
      '</g>';

    return shell("radiant", style, defs, inner);
  }

  /* =========================================================
     STEADY — спокойный, ровная поза, шея слегка изогнута
     ========================================================= */
  function steady() {
    var neckD = "M115 120 C114 96 130 82 148 74";
    var legL = "M106 186 C102 193 103 200 105 205";
    var legR = "M126 186 C130 193 129 200 127 205";
    var plumeD = "M148 122 Q170 108 180 124 Q188 132 180 146 Q172 156 155 150 Q146 138 148 122 Z";

    var style =
      '.pet-ostrich.is-steady .ostrich-sticker-body{transform-box:view-box;transform-origin:116px 206px;animation:ostrich-sticker-breathe-s 3.5s ease-in-out infinite}' +
      '.pet-ostrich.is-steady .ostrich-sticker-upper{transform-box:view-box;transform-origin:116px 118px;animation:ostrich-sticker-sway 3.5s ease-in-out infinite}' +
      '.pet-ostrich.is-steady .ostrich-sticker-lid{transform-box:view-box;transform:scaleY(0);animation:ostrich-sticker-blink-s 5.2s linear infinite}' +
      '.pet-ostrich.is-steady .ostrich-sticker-lid-l{transform-origin:144px 57px}' +
      '.pet-ostrich.is-steady .ostrich-sticker-lid-r{transform-origin:157px 57px}' +
      '@keyframes ostrich-sticker-breathe-s{0%,100%{transform:scale(1)}50%{transform:scale(1.022,.978)}}' +
      '@keyframes ostrich-sticker-sway{0%,100%{transform:rotate(-2.5deg)}50%{transform:rotate(2.5deg)}}' +
      '@keyframes ostrich-sticker-blink-s{0%,93%,100%{transform:scaleY(0)}95.5%,97.5%{transform:scaleY(1)}}';

    var defs = glowDef("ostrich-sticker-steady-glow", "#bfe4cd", ".8", "#e8f3ea", ".5");

    var diecut = '<g class="ostrich-sticker-diecut">' +
      '<path d="' + plumeD + '" ' + DA + '/>' +
      '<ellipse cx="116" cy="152" rx="42" ry="38" ' + DA + '/>' +
      dtube(legL, LW) + dtube(legR, LW) +
      dtube(neckD, NW) +
      '<circle cx="150" cy="60" r="17" ' + DA + '/>' +
      '</g>';

    var inner =
      '<g class="ostrich-sticker-aura aura"><circle cx="118" cy="140" r="92" fill="url(#ostrich-sticker-steady-glow)"/></g>' +
      '<ellipse class="ostrich-sticker-shadow" cx="116" cy="211" rx="44" ry="6.5" fill="' + INK + '" opacity=".08"/>' +
      diecut +
      '<g class="ostrich-sticker-pet">' +
        '<g class="ostrich-sticker-body body">' +
          '<g class="ostrich-sticker-legs">' + tube(legL, LW, LEG) + tube(legR, LW, LEG) + foot(106) + foot(126) + '</g>' +
          '<path class="ostrich-sticker-plume" d="' + plumeD + '" fill="' + PLUME + '" stroke="' + OUT + '" stroke-width="' + SW + '" stroke-linejoin="round"/>' +
          '<path d="M154 130 q10 4 16 12 M150 142 q11 1 18 7" fill="none" stroke="' + OUT + '" stroke-width="2" stroke-linecap="round" opacity=".35"/>' +
          '<ellipse cx="116" cy="152" rx="42" ry="38" fill="' + BODY + '" stroke="' + OUT + '" stroke-width="' + SW + '" stroke-linejoin="round"/>' +
          '<ellipse cx="114" cy="164" rx="26" ry="22" fill="' + BELLY + '"/>' +
          // сложенное крылышко на боку
          '<path d="M86 150 Q78 138 92 136 Q100 146 96 160 Q88 160 86 150 Z" fill="' + PLUME + '" stroke="' + OUT + '" stroke-width="' + SW + '" stroke-linejoin="round" opacity=".95"/>' +
          '<g class="ostrich-sticker-upper">' +
            tube(neckD, NW, NECK) +
            '<circle cx="150" cy="60" r="17" fill="' + NECK + '" stroke="' + OUT + '" stroke-width="' + SW + '"/>' +
            '<g class="ostrich-sticker-eyes eyes">' + eye(144, 57, 6.3, 7.2) + eye(157, 57, 6.3, 7.2) + '</g>' +
            '<g class="ostrich-sticker-lids eyelids">' +
              '<ellipse class="ostrich-sticker-lid ostrich-sticker-lid-l" cx="144" cy="57" rx="7.1" ry="7.8" fill="' + NECK + '"/>' +
              '<ellipse class="ostrich-sticker-lid ostrich-sticker-lid-r" cx="157" cy="57" rx="7.1" ry="7.8" fill="' + NECK + '"/>' +
            '</g>' +
            '<path d="M149 70 L163 68 L151 79 Z" fill="' + BEAK + '" stroke="' + OUT + '" stroke-width="2.6" stroke-linejoin="round"/>' +
            '<path d="M149 74 q4 3 9 1" fill="none" stroke="' + OUT + '" stroke-width="1.8" stroke-linecap="round" opacity=".5"/>' +
            '<ellipse cx="139" cy="66" rx="5.5" ry="3.8" fill="' + CHEEK + '" opacity=".55"/>' +
            '<ellipse cx="163" cy="66" rx="5.5" ry="3.8" fill="' + CHEEK + '" opacity=".55"/>' +
          '</g>' +
        '</g>' +
      '</g>';

    return shell("steady", style, defs, inner);
  }

  /* =========================================================
     TIRED — шея поникла вперёд-вниз, полуприкрытые глаза, ноги подогнулись
     ========================================================= */
  function tired() {
    var neckD = "M120 128 C134 114 152 118 162 132";
    var legL = "M106 186 C98 194 104 200 106 206";
    var legR = "M128 186 C136 194 130 200 128 206";
    var plumeD = "M78 128 Q56 116 48 132 Q42 142 52 154 Q62 162 78 154 Q84 142 78 128 Z";

    var style =
      '.pet-ostrich.is-tired .ostrich-sticker-body{transform-box:view-box;transform-origin:116px 206px;animation:ostrich-sticker-breathe-t 5s ease-in-out infinite}' +
      '.pet-ostrich.is-tired .ostrich-sticker-upper{transform-box:view-box;transform-origin:120px 128px;animation:ostrich-sticker-droop 5s ease-in-out infinite}' +
      '.pet-ostrich.is-tired .ostrich-sticker-lid{transform-box:view-box;transform:scaleY(.52);animation:ostrich-sticker-blink-t 6s linear infinite}' +
      '.pet-ostrich.is-tired .ostrich-sticker-lid-l{transform-origin:160px 138px}' +
      '.pet-ostrich.is-tired .ostrich-sticker-lid-r{transform-origin:172px 138px}' +
      '@keyframes ostrich-sticker-breathe-t{0%,100%{transform:scale(1)}50%{transform:scale(1.015,.985)}}' +
      '@keyframes ostrich-sticker-droop{0%,100%{transform:rotate(0deg) translateY(0)}50%{transform:rotate(2.5deg) translateY(1.5px)}}' +
      '@keyframes ostrich-sticker-blink-t{0%,88%,100%{transform:scaleY(.52)}91.5%,93%{transform:scaleY(1)}}';

    var defs = glowDef("ostrich-sticker-tired-glow", "#d9e1f1", ".65", "#edf0f8", ".4");

    var diecut = '<g class="ostrich-sticker-diecut">' +
      '<path d="' + plumeD + '" ' + DA + '/>' +
      '<ellipse cx="116" cy="158" rx="44" ry="35" ' + DA + '/>' +
      dtube(legL, LW) + dtube(legR, LW) +
      dtube(neckD, NW) +
      '<circle cx="166" cy="140" r="15" ' + DA + '/>' +
      '</g>';

    var inner =
      '<g class="ostrich-sticker-aura aura"><circle cx="116" cy="150" r="90" fill="url(#ostrich-sticker-tired-glow)"/></g>' +
      '<ellipse class="ostrich-sticker-shadow" cx="116" cy="212" rx="48" ry="6.5" fill="' + INK + '" opacity=".07"/>' +
      diecut +
      '<g class="ostrich-sticker-pet">' +
        '<g class="ostrich-sticker-body body">' +
          '<g class="ostrich-sticker-legs">' + tube(legL, LW, LEG) + tube(legR, LW, LEG) + foot(106) + foot(128) + '</g>' +
          // плюмажи поникли на бок
          '<path class="ostrich-sticker-plume" d="' + plumeD + '" fill="' + PLUME + '" stroke="' + OUT + '" stroke-width="' + SW + '" stroke-linejoin="round"/>' +
          '<path d="M70 136 q-10 4 -16 12 M74 148 q-11 1 -18 7" fill="none" stroke="' + OUT + '" stroke-width="2" stroke-linecap="round" opacity=".35"/>' +
          '<ellipse cx="116" cy="158" rx="44" ry="35" fill="' + BODY + '" stroke="' + OUT + '" stroke-width="' + SW + '" stroke-linejoin="round"/>' +
          '<ellipse cx="116" cy="168" rx="27" ry="19" fill="' + BELLY + '"/>' +
          '<path d="M150 154 Q160 144 164 158 Q160 168 148 166 Q146 158 150 154 Z" fill="' + PLUME + '" stroke="' + OUT + '" stroke-width="' + SW + '" stroke-linejoin="round" opacity=".95"/>' +
          '<g class="ostrich-sticker-upper">' +
            tube(neckD, NW, NECK) +
            '<circle cx="166" cy="140" r="15" fill="' + NECK + '" stroke="' + OUT + '" stroke-width="' + SW + '"/>' +
            '<g class="ostrich-sticker-eyes eyes">' + eye(160, 138, 5.6, 6.4) + eye(172, 138, 5.6, 6.4) + '</g>' +
            '<g class="ostrich-sticker-lids eyelids">' +
              '<ellipse class="ostrich-sticker-lid ostrich-sticker-lid-l" cx="160" cy="138" rx="6.4" ry="7" fill="' + NECK + '"/>' +
              '<ellipse class="ostrich-sticker-lid ostrich-sticker-lid-r" cx="172" cy="138" rx="6.4" ry="7" fill="' + NECK + '"/>' +
            '</g>' +
            // клюв поник вниз
            '<path d="M162 150 L150 154 L162 158 Z" fill="' + BEAK + '" stroke="' + OUT + '" stroke-width="2.4" stroke-linejoin="round"/>' +
            '<ellipse cx="157" cy="146" rx="5" ry="3.4" fill="' + CHEEK + '" opacity=".5"/>' +
            '<ellipse cx="176" cy="146" rx="5" ry="3.4" fill="' + CHEEK + '" opacity=".5"/>' +
          '</g>' +
        '</g>' +
      '</g>';

    return shell("tired", style, defs, inner);
  }

  /* =========================================================
     DRAINED — сел на землю, шея сложена, голова спрятана под крыло, «z z»
     ========================================================= */
  function drained() {
    var neckD = "M120 160 C104 154 96 162 94 170";
    var plumeD = "M164 168 Q188 158 192 176 Q193 190 176 190 Q164 180 164 168 Z";
    var wingD = "M76 156 Q104 146 120 164 Q126 176 110 182 Q84 182 72 168 Z";

    var style =
      '.pet-ostrich.is-drained .ostrich-sticker-body{transform-box:view-box;transform-origin:120px 200px;animation:ostrich-sticker-breathe-d 7s ease-in-out infinite}' +
      '.pet-ostrich.is-drained .ostrich-sticker-wing-d{transform-box:view-box;transform-origin:118px 166px;animation:ostrich-sticker-nuzzle 7s ease-in-out infinite}' +
      '.pet-ostrich.is-drained .ostrich-sticker-z{opacity:0;animation:ostrich-sticker-zfloat 7s ease-in-out infinite}' +
      '.pet-ostrich.is-drained .ostrich-sticker-z2{animation-delay:2.3s}' +
      '.pet-ostrich.is-drained .ostrich-sticker-z3{animation-delay:4.6s}' +
      '@keyframes ostrich-sticker-breathe-d{0%,100%{transform:scale(1)}50%{transform:scale(1.02,1.03)}}' +
      '@keyframes ostrich-sticker-nuzzle{0%,100%{transform:rotate(0deg)}50%{transform:rotate(-1.5deg) translateY(-1px)}}' +
      '@keyframes ostrich-sticker-zfloat{0%{opacity:0;transform:translateY(7px)}14%{opacity:.85}55%,100%{opacity:0;transform:translateY(-16px)}}';

    var defs = glowDef("ostrich-sticker-drained-glow", "#dfd5f0", ".6", "#f0ecf7", ".35");

    var diecut = '<g class="ostrich-sticker-diecut">' +
      '<path d="' + plumeD + '" ' + DA + '/>' +
      '<ellipse cx="122" cy="180" rx="48" ry="30" ' + DA + '/>' +
      dtube(neckD, NW) +
      '<circle cx="92" cy="172" r="15" ' + DA + '/>' +
      '<path d="' + wingD + '" ' + DA + '/>' +
      '</g>';

    var inner =
      '<g class="ostrich-sticker-aura aura"><circle cx="120" cy="176" r="86" fill="url(#ostrich-sticker-drained-glow)"/></g>' +
      '<ellipse class="ostrich-sticker-shadow" cx="122" cy="210" rx="54" ry="6.5" fill="' + INK + '" opacity=".07"/>' +
      diecut +
      '<g class="ostrich-sticker-pet">' +
        '<g class="ostrich-sticker-body body">' +
          // хвостовые плюмажи
          '<path class="ostrich-sticker-plume" d="' + plumeD + '" fill="' + PLUME + '" stroke="' + OUT + '" stroke-width="' + SW + '" stroke-linejoin="round"/>' +
          // сложенная сидящая туша
          '<ellipse cx="122" cy="180" rx="48" ry="30" fill="' + BODY + '" stroke="' + OUT + '" stroke-width="' + SW + '" stroke-linejoin="round"/>' +
          '<ellipse cx="132" cy="188" rx="30" ry="17" fill="' + BELLY + '"/>' +
          // короткие подогнутые ножки-намёки спереди
          '<path d="M104 202 q-6 4 -2 6 M118 204 q-6 4 -1 5" fill="none" stroke="' + OUT + '" stroke-width="4.5" stroke-linecap="round"/>' +
          // сложенная шея + уложенная голова слева
          tube(neckD, NW, NECK) +
          '<circle cx="92" cy="172" r="15" fill="' + NECK + '" stroke="' + OUT + '" stroke-width="' + SW + '"/>' +
          // закрытые глаза — мягкие дуги
          '<g class="ostrich-sticker-eyes eyes" fill="none" stroke="' + INK + '" stroke-width="2.4" stroke-linecap="round">' +
            '<path d="M80 170 q4.5 4 9 0"/>' +
            '<path d="M92 170 q4.5 4 9 0"/>' +
          '</g>' +
          '<path d="M84 178 L74 181 L84 184 Z" fill="' + BEAK + '" stroke="' + OUT + '" stroke-width="2.2" stroke-linejoin="round"/>' +
          '<ellipse cx="98" cy="178" rx="5" ry="3.4" fill="' + CHEEK + '" opacity=".5"/>' +
          // крыло укрывает голову
          '<g class="ostrich-sticker-wing-d"><path d="' + wingD + '" fill="' + PLUME + '" stroke="' + OUT + '" stroke-width="' + SW + '" stroke-linejoin="round"/>' +
            '<path d="M86 162 q14 5 26 10 M82 170 q14 3 24 7" fill="none" stroke="' + OUT + '" stroke-width="2" stroke-linecap="round" opacity=".3"/></g>' +
        '</g>' +
      '</g>' +
      '<g class="ostrich-sticker-particles particles" fill="none" stroke="#9c8bc0" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">' +
        '<g class="ostrich-sticker-z ostrich-sticker-z1"><path transform="translate(150,150) scale(.7)" d="' + ZP + '"/></g>' +
        '<g class="ostrich-sticker-z ostrich-sticker-z2"><path transform="translate(164,134) scale(.9)" d="' + ZP + '"/></g>' +
        '<g class="ostrich-sticker-z ostrich-sticker-z3"><path transform="translate(178,116) scale(1.15)" d="' + ZP + '"/></g>' +
      '</g>';

    return shell("drained", style, defs, inner);
  }

  window.registerPet({
    id: "ostrich",
    nameEn: "Poppy",
    nameRu: "Поппи",
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
