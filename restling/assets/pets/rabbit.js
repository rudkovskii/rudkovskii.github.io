/**
 * Clover / Кловер — pet3. Пастельный кролик-«bashful bunny», архетип «нежность».
 * Модуль питомца по assets/pets/CONTRACT.md.
 * Уникальный канал состояния — уши:
 *   radiant — стоит на задних лапках, оба уха торчком, binky-подскок, искры;
 *   steady  — сидит «булочкой», одно ухо вверх, второе согнуто (bashful);
 *   tired   — осела, оба уха висят по бокам головы, редкий зевок;
 *   drained — клубочек под пледом, уши сложены вдоль спины (торчат кончики), «z».
 * Видовые признаки всегда в кадре: длинные уши ~с тело, помпон-хвост,
 * нос-«Y», лапки у груди, задние «тапочки». Нос «дышит» во всех mood.
 */
(function () {
  "use strict";

  var BODY = "#F7EDE2";
  var SHADE = "#E8D9C8";
  var TONE = "#E0CDB8";
  var PINK = "#F2B8C6";
  var PINKD = "#D99AAC";
  var CHEEK = "#F5A88E";
  var POM = "#FDFBF7";
  var INK = "#3E3A47";
  var MOUTH = "#E88A76";
  var PLAID = "#E9E6FA";
  var PLAIDL = "#CFC8EE";

  var REDUCED = "@media (prefers-reduced-motion: reduce){.pet-rabbit *{animation:none !important}}";

  function glowDef(id, c1, o1, c2, o2) {
    return '<radialGradient id="' + id + '" cx="50%" cy="46%" r="56%">' +
      '<stop offset="0%" stop-color="' + c1 + '" stop-opacity="' + o1 + '"/>' +
      '<stop offset="55%" stop-color="' + c2 + '" stop-opacity="' + o2 + '"/>' +
      '<stop offset="100%" stop-color="' + c2 + '" stop-opacity="0"/>' +
      '</radialGradient>';
  }

  function shell(mood, style, defs, inner) {
    return '<svg viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg" ' +
      'class="pet-svg pet-rabbit is-' + mood + '" role="img" aria-label="Clover">' +
      '<style>' + style + REDUCED + '</style>' +
      '<defs>' + defs + '</defs>' + inner + '</svg>';
  }

  function noseY(cx, cy, s) {
    s = s || 1;
    return '<g class="rabbit-nose" fill="none">' +
      '<path d="M' + (cx - 5 * s) + ' ' + cy + ' L' + (cx + 5 * s) + ' ' + cy +
        ' L' + cx + ' ' + (cy + 5.5 * s) + ' Z" fill="' + PINK + '"/>' +
      '<path d="M' + cx + ' ' + (cy + 5 * s) + ' L' + cx + ' ' + (cy + 9 * s) +
        ' M' + cx + ' ' + (cy + 9 * s) + ' Q' + cx + ' ' + (cy + 12 * s) + ' ' + (cx - 5 * s) + ' ' + (cy + 12.5 * s) +
        ' M' + cx + ' ' + (cy + 9 * s) + ' Q' + cx + ' ' + (cy + 12 * s) + ' ' + (cx + 5 * s) + ' ' + (cy + 12.5 * s) + '"' +
        ' stroke="' + PINKD + '" stroke-width="' + (1.8 * s) + '" stroke-linecap="round"/>' +
      '</g>';
  }

  /* ------------- RADIANT: на задних лапках, уши торчком, binky ------------- */

  function radiant() {
    var style =
      '.pet-rabbit.is-radiant .rabbit-pet{transform-box:view-box;transform-origin:120px 200px;animation:rabbit-binky 7.8s ease-in-out infinite}' +
      '.pet-rabbit.is-radiant .rabbit-body{transform-box:view-box;transform-origin:120px 200px;animation:rabbit-breathe-r 2.2s ease-in-out infinite}' +
      '.pet-rabbit.is-radiant .rabbit-ear-l{transform-box:view-box;transform-origin:104px 96px;animation:rabbit-spring-l 2.2s ease-in-out .18s infinite}' +
      '.pet-rabbit.is-radiant .rabbit-ear-r{transform-box:view-box;transform-origin:136px 96px;animation:rabbit-spring-r 2.2s ease-in-out .18s infinite}' +
      '.pet-rabbit.is-radiant .rabbit-tail{transform-box:view-box;transform-origin:156px 176px;animation:rabbit-pom 1.6s ease-in-out infinite}' +
      '.pet-rabbit.is-radiant .rabbit-nose{transform-box:view-box;transform-origin:120px 128px;animation:rabbit-sniff-r 1.3s ease-in-out infinite}' +
      '.pet-rabbit.is-radiant .rabbit-aura{animation:rabbit-glow 2.2s ease-in-out infinite}' +
      '.pet-rabbit.is-radiant .rabbit-lid{transform-box:view-box;transform:scaleY(0);animation:rabbit-blink 4.6s linear infinite}' +
      '.pet-rabbit.is-radiant .rabbit-lid-l{transform-origin:106px 106px}' +
      '.pet-rabbit.is-radiant .rabbit-lid-r{transform-origin:134px 106px}' +
      '.pet-rabbit.is-radiant .rabbit-spark{transform-box:view-box;animation:rabbit-twinkle 1.9s ease-in-out infinite}' +
      '.pet-rabbit.is-radiant .rabbit-sp1{transform-origin:60px 78px}' +
      '.pet-rabbit.is-radiant .rabbit-sp2{transform-origin:182px 66px;animation-delay:.5s}' +
      '.pet-rabbit.is-radiant .rabbit-sp3{transform-origin:54px 132px;animation-delay:1s}' +
      '.pet-rabbit.is-radiant .rabbit-sp4{transform-origin:186px 124px;animation-delay:1.4s}' +
      '@keyframes rabbit-binky{0%,62%,100%{transform:translateY(0) rotate(0) scale(1,1)}66%{transform:translateY(0) rotate(0) scale(1.07,.9)}71%{transform:translateY(-17px) rotate(-5deg) scale(.96,1.06)}76%{transform:translateY(0) rotate(2deg) scale(1.08,.9)}82%{transform:translateY(0) rotate(0) scale(1,1)}}' +
      '@keyframes rabbit-breathe-r{0%,100%{transform:scale(1,1)}50%{transform:scale(1.03,.97)}}' +
      '@keyframes rabbit-spring-l{0%,100%{transform:rotate(-3deg)}50%{transform:rotate(2.5deg)}}' +
      '@keyframes rabbit-spring-r{0%,100%{transform:rotate(3deg)}50%{transform:rotate(-2.5deg)}}' +
      '@keyframes rabbit-pom{0%,100%{transform:scale(1)}50%{transform:scale(1.12)}}' +
      '@keyframes rabbit-sniff-r{0%,100%{transform:scale(1)}50%{transform:scale(1.1)}}' +
      '@keyframes rabbit-glow{0%,100%{opacity:.75}50%{opacity:1}}' +
      '@keyframes rabbit-blink{0%,92%,100%{transform:scaleY(0)}94.5%,96.5%{transform:scaleY(1)}}' +
      '@keyframes rabbit-twinkle{0%,100%{opacity:.15;transform:scale(.5)}50%{opacity:1;transform:scale(1)}}';

    var defs = glowDef("rabbit-radiant-glow", "#FFDF9E", ".9", "#FFF3D9", ".55");
    var star = 'M0 -6 L1.7 -1.7 L6 0 L1.7 1.7 L0 6 L-1.7 1.7 L-6 0 L-1.7 -1.7 Z';

    var inner =
      '<g class="rabbit-aura"><circle cx="120" cy="126" r="96" fill="url(#rabbit-radiant-glow)"/></g>' +
      '<ellipse class="rabbit-shadow" cx="120" cy="203" rx="36" ry="6" fill="' + INK + '" opacity=".07"/>' +
      '<g class="rabbit-pet">' +
        '<g class="rabbit-ear-l">' +
          '<ellipse cx="103" cy="60" rx="10.5" ry="37" fill="' + BODY + '" stroke="' + TONE + '" stroke-width="1.5" transform="rotate(-7 103 96)"/>' +
          '<ellipse cx="103" cy="63" rx="5.2" ry="27" fill="' + PINK + '" transform="rotate(-7 103 96)"/>' +
        '</g>' +
        '<g class="rabbit-ear-r">' +
          '<ellipse cx="137" cy="60" rx="10.5" ry="37" fill="' + BODY + '" stroke="' + TONE + '" stroke-width="1.5" transform="rotate(7 137 96)"/>' +
          '<ellipse cx="137" cy="63" rx="5.2" ry="27" fill="' + PINK + '" transform="rotate(7 137 96)"/>' +
        '</g>' +
        '<g class="rabbit-tail"><circle cx="156" cy="176" r="11" fill="' + POM + '" stroke="' + TONE + '" stroke-width="1.5"/></g>' +
        '<g class="rabbit-body">' +
          '<ellipse cx="120" cy="148" rx="39" ry="56" fill="' + BODY + '"/>' +
          '<ellipse cx="120" cy="168" rx="24" ry="29" fill="' + POM + '" opacity=".75"/>' +
          '<ellipse cx="101" cy="199" rx="15" ry="7" fill="' + SHADE + '"/>' +
          '<ellipse cx="139" cy="199" rx="15" ry="7" fill="' + SHADE + '"/>' +
          '<ellipse cx="107" cy="152" rx="7" ry="11" fill="' + BODY + '" stroke="' + TONE + '" stroke-width="1.5" transform="rotate(-10 107 152)"/>' +
          '<ellipse cx="133" cy="152" rx="7" ry="11" fill="' + BODY + '" stroke="' + TONE + '" stroke-width="1.5" transform="rotate(10 133 152)"/>' +
          '<g class="rabbit-eyes">' +
            '<circle cx="106" cy="113" r="7" fill="' + INK + '"/>' +
            '<circle cx="134" cy="113" r="7" fill="' + INK + '"/>' +
            '<circle cx="108.6" cy="110.4" r="2.6" fill="#FFFFFF"/>' +
            '<circle cx="136.6" cy="110.4" r="2.6" fill="#FFFFFF"/>' +
            '<circle cx="104" cy="116" r="1.2" fill="#FFFFFF" opacity=".8"/>' +
            '<circle cx="132" cy="116" r="1.2" fill="#FFFFFF" opacity=".8"/>' +
          '</g>' +
          '<g class="rabbit-lids">' +
            '<ellipse class="rabbit-lid rabbit-lid-l" cx="106" cy="113" rx="7.8" ry="7.8" fill="' + BODY + '"/>' +
            '<ellipse class="rabbit-lid rabbit-lid-r" cx="134" cy="113" rx="7.8" ry="7.8" fill="' + BODY + '"/>' +
          '</g>' +
          noseY(120, 126, 1) +
          '<rect x="116.6" y="137" width="6.8" height="4.6" rx="1.6" fill="#FFFFFF" stroke="' + TONE + '" stroke-width=".8"/>' +
          '<line x1="120" y1="137.4" x2="120" y2="141.2" stroke="' + TONE + '" stroke-width=".8"/>' +
          '<ellipse cx="93" cy="125" rx="7.5" ry="5" fill="' + CHEEK + '" opacity=".7"/>' +
          '<ellipse cx="147" cy="125" rx="7.5" ry="5" fill="' + CHEEK + '" opacity=".7"/>' +
        '</g>' +
      '</g>' +
      '<g class="rabbit-particles" fill="#F5A623">' +
        '<g class="rabbit-spark rabbit-sp1"><path transform="translate(60,78)" d="' + star + '"/></g>' +
        '<g class="rabbit-spark rabbit-sp2"><path transform="translate(182,66) scale(.8)" d="' + star + '"/></g>' +
        '<g class="rabbit-spark rabbit-sp3"><path transform="translate(54,132) scale(.65)" d="' + star + '"/></g>' +
        '<g class="rabbit-spark rabbit-sp4"><path transform="translate(186,124) scale(.75)" d="' + star + '"/></g>' +
      '</g>';

    return shell("radiant", style, defs, inner);
  }

  /* -------- STEADY: «булочка», одно ухо вверх, второе согнуто (bashful) ---- */

  function steady() {
    var style =
      '.pet-rabbit.is-steady .rabbit-body{transform-box:view-box;transform-origin:120px 202px;animation:rabbit-breathe-s 3.5s ease-in-out infinite}' +
      '.pet-rabbit.is-steady .rabbit-ear-l{transform-box:view-box;transform-origin:106px 120px;animation:rabbit-sway-s 3.5s ease-in-out .2s infinite}' +
      '.pet-rabbit.is-steady .rabbit-ear-r{transform-box:view-box;transform-origin:138px 118px;animation:rabbit-flop-twitch 6.5s ease-in-out infinite}' +
      '.pet-rabbit.is-steady .rabbit-nose{transform-box:view-box;transform-origin:120px 150px;animation:rabbit-sniff-s 1.8s ease-in-out infinite}' +
      '.pet-rabbit.is-steady .rabbit-tail{transform-box:view-box;transform-origin:162px 182px;animation:rabbit-pom-s 3.5s ease-in-out infinite}' +
      '.pet-rabbit.is-steady .rabbit-aura{animation:rabbit-glow-s 3.5s ease-in-out infinite}' +
      '.pet-rabbit.is-steady .rabbit-lid{transform-box:view-box;transform:scaleY(0);animation:rabbit-blink-s 5.2s linear infinite}' +
      '.pet-rabbit.is-steady .rabbit-lid-l{transform-origin:106px 131px}' +
      '.pet-rabbit.is-steady .rabbit-lid-r{transform-origin:134px 131px}' +
      '@keyframes rabbit-breathe-s{0%,100%{transform:scale(1,1)}50%{transform:scale(1.025,.975)}}' +
      '@keyframes rabbit-sway-s{0%,100%{transform:rotate(-2deg)}50%{transform:rotate(2deg)}}' +
      '@keyframes rabbit-flop-twitch{0%,88%,100%{transform:rotate(0)}91%{transform:rotate(-9deg)}94%{transform:rotate(4deg)}97%{transform:rotate(-2deg)}}' +
      '@keyframes rabbit-sniff-s{0%,100%{transform:scale(1)}50%{transform:scale(1.08)}}' +
      '@keyframes rabbit-pom-s{0%,100%{transform:scale(1)}50%{transform:scale(1.06)}}' +
      '@keyframes rabbit-glow-s{0%,100%{opacity:.7}50%{opacity:.95}}' +
      '@keyframes rabbit-blink-s{0%,93%,100%{transform:scaleY(0)}95.5%,97.5%{transform:scaleY(1)}}';

    var defs = glowDef("rabbit-steady-glow", "#9CD0AF", ".55", "#E8F3EA", ".45");

    var inner =
      '<g class="rabbit-aura"><circle cx="120" cy="140" r="92" fill="url(#rabbit-steady-glow)"/></g>' +
      '<ellipse class="rabbit-shadow" cx="120" cy="205" rx="46" ry="6" fill="' + INK + '" opacity=".07"/>' +
      '<g class="rabbit-pet">' +
        '<g class="rabbit-ear-l">' +
          '<ellipse cx="105" cy="86" rx="10" ry="35" fill="' + BODY + '" stroke="' + TONE + '" stroke-width="1.5" transform="rotate(-6 105 120)"/>' +
          '<ellipse cx="105" cy="89" rx="5" ry="25" fill="' + PINK + '" transform="rotate(-6 105 120)"/>' +
        '</g>' +
        '<g class="rabbit-ear-r">' +
          '<path d="M129 120 Q126 92 132 76 Q138 63 150 69 Q159 74 151 84 Q143 92 141 103 Q139 113 138 120 Z" fill="' + BODY + '" stroke="' + TONE + '" stroke-width="1.5" stroke-linejoin="round"/>' +
          '<ellipse cx="147" cy="76" rx="4.5" ry="7.5" fill="' + PINK + '" opacity=".85" transform="rotate(42 147 76)"/>' +
        '</g>' +
        '<g class="rabbit-tail"><circle cx="162" cy="182" r="10" fill="' + POM + '" stroke="' + TONE + '" stroke-width="1.5"/></g>' +
        '<g class="rabbit-body">' +
          '<ellipse cx="120" cy="160" rx="46" ry="44" fill="' + BODY + '"/>' +
          '<ellipse cx="120" cy="176" rx="27" ry="22" fill="' + POM + '" opacity=".75"/>' +
          '<ellipse cx="97" cy="200" rx="16" ry="7.5" fill="' + SHADE + '"/>' +
          '<ellipse cx="143" cy="200" rx="16" ry="7.5" fill="' + SHADE + '"/>' +
          '<ellipse cx="109" cy="174" rx="6.5" ry="10" fill="' + BODY + '" stroke="' + TONE + '" stroke-width="1.5" transform="rotate(-8 109 174)"/>' +
          '<ellipse cx="131" cy="174" rx="6.5" ry="10" fill="' + BODY + '" stroke="' + TONE + '" stroke-width="1.5" transform="rotate(8 131 174)"/>' +
          '<g class="rabbit-eyes">' +
            '<circle cx="106" cy="138" r="6" fill="' + INK + '"/>' +
            '<circle cx="134" cy="138" r="6" fill="' + INK + '"/>' +
            '<circle cx="108.2" cy="135.8" r="2" fill="#FFFFFF"/>' +
            '<circle cx="136.2" cy="135.8" r="2" fill="#FFFFFF"/>' +
          '</g>' +
          '<g class="rabbit-lids">' +
            '<ellipse class="rabbit-lid rabbit-lid-l" cx="106" cy="138" rx="6.8" ry="6.8" fill="' + BODY + '"/>' +
            '<ellipse class="rabbit-lid rabbit-lid-r" cx="134" cy="138" rx="6.8" ry="6.8" fill="' + BODY + '"/>' +
          '</g>' +
          noseY(120, 150, 1) +
          '<rect x="116.8" y="160.5" width="6.4" height="4.2" rx="1.5" fill="#FFFFFF" stroke="' + TONE + '" stroke-width=".8"/>' +
          '<line x1="120" y1="160.9" x2="120" y2="164.3" stroke="' + TONE + '" stroke-width=".8"/>' +
          '<ellipse cx="93" cy="149" rx="7" ry="4.6" fill="' + CHEEK + '" opacity=".7"/>' +
          '<ellipse cx="147" cy="149" rx="7" ry="4.6" fill="' + CHEEK + '" opacity=".7"/>' +
        '</g>' +
      '</g>';

    return shell("steady", style, defs, inner);
  }

  /* --------- TIRED: осела, уши висят по бокам, полуприкрытые глаза --------- */

  function tired() {
    var style =
      '.pet-rabbit.is-tired .rabbit-body{transform-box:view-box;transform-origin:120px 204px;animation:rabbit-breathe-t 5s ease-in-out infinite}' +
      '.pet-rabbit.is-tired .rabbit-ear-l{transform-box:view-box;transform-origin:100px 138px;animation:rabbit-droop-l 5s ease-in-out .25s infinite}' +
      '.pet-rabbit.is-tired .rabbit-ear-r{transform-box:view-box;transform-origin:140px 138px;animation:rabbit-droop-r 5s ease-in-out .25s infinite}' +
      '.pet-rabbit.is-tired .rabbit-nose{transform-box:view-box;transform-origin:120px 158px;animation:rabbit-sniff-t 2.6s ease-in-out infinite}' +
      '.pet-rabbit.is-tired .rabbit-yawn{transform-box:view-box;transform-origin:120px 172px;animation:rabbit-yawn 9s ease-in-out infinite}' +
      '.pet-rabbit.is-tired .rabbit-lid{transform-box:view-box;transform-origin:106px 145px;transform:scaleY(.55);animation:rabbit-blink-t 6s linear infinite}' +
      '.pet-rabbit.is-tired .rabbit-lid-r{transform-origin:134px 145px}' +
      '.pet-rabbit.is-tired .rabbit-aura{animation:rabbit-glow-t 5s ease-in-out infinite}' +
      '@keyframes rabbit-breathe-t{0%,100%{transform:scale(1,1)}50%{transform:scale(1.018,.982)}}' +
      '@keyframes rabbit-droop-l{0%,100%{transform:rotate(0)}50%{transform:rotate(2deg)}}' +
      '@keyframes rabbit-droop-r{0%,100%{transform:rotate(0)}50%{transform:rotate(-2deg)}}' +
      '@keyframes rabbit-sniff-t{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}' +
      '@keyframes rabbit-yawn{0%,76%,96%,100%{transform:scale(.35)}82%,90%{transform:scale(1.25)}}' +
      '@keyframes rabbit-blink-t{0%,90%,100%{transform:scaleY(.55)}93%,95%{transform:scaleY(1)}}' +
      '@keyframes rabbit-glow-t{0%,100%{opacity:.55}50%{opacity:.75}}';

    var defs = glowDef("rabbit-tired-glow", "#AEBEDD", ".5", "#EDF0F8", ".4");

    var inner =
      '<g class="rabbit-aura"><circle cx="120" cy="150" r="88" fill="url(#rabbit-tired-glow)"/></g>' +
      '<ellipse class="rabbit-shadow" cx="120" cy="206" rx="52" ry="6" fill="' + INK + '" opacity=".07"/>' +
      '<g class="rabbit-pet">' +
        '<circle class="rabbit-tail" cx="166" cy="188" r="9" fill="' + POM + '" stroke="' + TONE + '" stroke-width="1.5"/>' +
        '<g class="rabbit-body">' +
          '<ellipse cx="120" cy="172" rx="52" ry="36" fill="' + BODY + '"/>' +
          '<ellipse cx="120" cy="186" rx="29" ry="17" fill="' + POM + '" opacity=".7"/>' +
          '<g class="rabbit-ear-l">' +
            '<ellipse cx="93" cy="164" rx="8" ry="27" fill="' + BODY + '" stroke="' + TONE + '" stroke-width="1.5" transform="rotate(16 93 164)"/>' +
            '<ellipse cx="91.5" cy="168" rx="3.8" ry="19" fill="' + PINK + '" opacity=".75" transform="rotate(16 93 164)"/>' +
          '</g>' +
          '<g class="rabbit-ear-r">' +
            '<ellipse cx="147" cy="164" rx="8" ry="27" fill="' + BODY + '" stroke="' + TONE + '" stroke-width="1.5" transform="rotate(-16 147 164)"/>' +
            '<ellipse cx="148.5" cy="168" rx="3.8" ry="19" fill="' + PINK + '" opacity=".75" transform="rotate(-16 147 164)"/>' +
          '</g>' +
          '<ellipse cx="94" cy="202" rx="16" ry="7" fill="' + SHADE + '"/>' +
          '<ellipse cx="146" cy="202" rx="16" ry="7" fill="' + SHADE + '"/>' +
          '<ellipse cx="108" cy="186" rx="6" ry="9" fill="' + BODY + '" stroke="' + TONE + '" stroke-width="1.5" transform="rotate(-10 108 186)"/>' +
          '<ellipse cx="132" cy="186" rx="6" ry="9" fill="' + BODY + '" stroke="' + TONE + '" stroke-width="1.5" transform="rotate(10 132 186)"/>' +
          '<g class="rabbit-eyes">' +
            '<circle cx="106" cy="151" r="6" fill="' + INK + '"/>' +
            '<circle cx="134" cy="151" r="6" fill="' + INK + '"/>' +
            '<circle cx="108" cy="149.4" r="1.6" fill="#FFFFFF" opacity=".9"/>' +
            '<circle cx="136" cy="149.4" r="1.6" fill="#FFFFFF" opacity=".9"/>' +
          '</g>' +
          '<g class="rabbit-lids">' +
            '<ellipse class="rabbit-lid rabbit-lid-l" cx="106" cy="149" rx="7" ry="7.4" fill="' + BODY + '"/>' +
            '<ellipse class="rabbit-lid rabbit-lid-r" cx="134" cy="149" rx="7" ry="7.4" fill="' + BODY + '"/>' +
          '</g>' +
          '<path d="M99 145 Q106 142 113 145" fill="none" stroke="' + TONE + '" stroke-width="1.4" stroke-linecap="round"/>' +
          '<path d="M127 145 Q134 142 141 145" fill="none" stroke="' + TONE + '" stroke-width="1.4" stroke-linecap="round"/>' +
          noseY(120, 158, 0.9) +
          '<ellipse class="rabbit-yawn" cx="120" cy="172" rx="4.5" ry="5.5" fill="' + MOUTH + '"/>' +
          '<ellipse cx="103" cy="162" rx="5.5" ry="3.8" fill="' + CHEEK + '" opacity=".6"/>' +
          '<ellipse cx="137" cy="162" rx="5.5" ry="3.8" fill="' + CHEEK + '" opacity=".6"/>' +
        '</g>' +
      '</g>';

    return shell("tired", style, defs, inner);
  }

  /* ------ DRAINED: клубочек под пледом, уши вдоль спины, глаза-щёлочки ----- */

  function drained() {
    var style =
      '.pet-rabbit.is-drained .rabbit-body{transform-box:view-box;transform-origin:120px 204px;animation:rabbit-breathe-d 7s ease-in-out infinite}' +
      '.pet-rabbit.is-drained .rabbit-plaid{transform-box:view-box;transform-origin:136px 178px;animation:rabbit-plaid-d 7s ease-in-out infinite}' +
      '.pet-rabbit.is-drained .rabbit-ear-tips{transform-box:view-box;transform-origin:158px 158px;animation:rabbit-tip-twitch 11s ease-in-out infinite}' +
      '.pet-rabbit.is-drained .rabbit-nose{transform-box:view-box;transform-origin:74px 176px;animation:rabbit-sniff-d 3.5s ease-in-out infinite}' +
      '.pet-rabbit.is-drained .rabbit-eyes{transform-box:view-box;transform-origin:84px 170px;animation:rabbit-peek 9s ease-in-out infinite}' +
      '.pet-rabbit.is-drained .rabbit-z{animation:rabbit-zzz 6s ease-in-out infinite;opacity:0}' +
      '.pet-rabbit.is-drained .rabbit-z2{animation-delay:2s}' +
      '.pet-rabbit.is-drained .rabbit-z3{animation-delay:4s}' +
      '@keyframes rabbit-breathe-d{0%,100%{transform:scale(1,1)}50%{transform:scale(1.014,.986)}}' +
      '@keyframes rabbit-plaid-d{0%,100%{transform:scale(1,1)}50%{transform:scale(1.012,.988)}}' +
      '@keyframes rabbit-tip-twitch{0%,92%,100%{transform:rotate(0)}94%{transform:rotate(-4deg)}97%{transform:rotate(2deg)}}' +
      '@keyframes rabbit-sniff-d{0%,100%{transform:scale(1)}50%{transform:scale(1.03)}}' +
      '@keyframes rabbit-peek{0%,88%,100%{transform:scaleY(1)}91%,94%{transform:scaleY(1.9)}}' +
      '@keyframes rabbit-zzz{0%{opacity:0;transform:translateY(4px)}25%{opacity:.85}60%{opacity:.4}100%{opacity:0;transform:translateY(-22px)}}';

    var defs = glowDef("rabbit-drained-glow", "#B3A4D6", ".45", "#F0ECF7", ".4");

    var inner =
      '<g class="rabbit-aura"><circle cx="120" cy="168" r="86" fill="url(#rabbit-drained-glow)"/></g>' +
      '<ellipse class="rabbit-shadow" cx="122" cy="206" rx="56" ry="6" fill="' + INK + '" opacity=".07"/>' +
      '<g class="rabbit-pet">' +
        '<g class="rabbit-body">' +
          '<ellipse cx="128" cy="182" rx="46" ry="23" fill="' + BODY + '"/>' +
          '<circle cx="86" cy="174" r="23" fill="' + BODY + '"/>' +
          '<g class="rabbit-eyes" fill="none" stroke="' + INK + '" stroke-width="2" stroke-linecap="round">' +
            '<path d="M72 170 Q76 173 80 170"/>' +
            '<path d="M90 170 Q94 173 98 170"/>' +
          '</g>' +
          noseY(74, 178, 0.8) +
          '<ellipse cx="66" cy="184" rx="5.5" ry="3.8" fill="' + CHEEK + '" opacity=".55"/>' +
          '<ellipse cx="98" cy="184" rx="5.5" ry="3.8" fill="' + CHEEK + '" opacity=".55"/>' +
        '</g>' +
        '<circle class="rabbit-tail" cx="174" cy="190" r="9" fill="' + POM + '" stroke="' + TONE + '" stroke-width="1.5"/>' +
        '<g class="rabbit-plaid">' +
          '<path d="M104 158 Q136 146 168 159 L173 191 Q136 201 102 192 Z" fill="' + PLAID + '"/>' +
          '<path d="M108 168 Q138 158 166 168 M106 180 Q138 171 169 180" fill="none" stroke="' + PLAIDL + '" stroke-width="2" stroke-linecap="round" opacity=".8"/>' +
          '<path d="M104 158 Q136 146 168 159" fill="none" stroke="' + PLAIDL + '" stroke-width="3" stroke-linecap="round" opacity=".9"/>' +
        '</g>' +
        '<g class="rabbit-ear-tips">' +
          '<ellipse cx="160" cy="153" rx="13" ry="5.2" fill="' + BODY + '" stroke="' + TONE + '" stroke-width="1.2" transform="rotate(10 160 153)"/>' +
          '<ellipse cx="164" cy="153.5" rx="6" ry="2.6" fill="' + PINK + '" opacity=".8" transform="rotate(10 160 153)"/>' +
          '<ellipse cx="157" cy="161" rx="12" ry="5" fill="' + BODY + '" stroke="' + TONE + '" stroke-width="1.2" transform="rotate(14 157 161)"/>' +
          '<ellipse cx="161" cy="161.5" rx="5.5" ry="2.4" fill="' + PINK + '" opacity=".8" transform="rotate(14 157 161)"/>' +
        '</g>' +
      '</g>' +
      '<g class="rabbit-particles" fill="#9C8BC0" font-family="Nunito, Quicksand, sans-serif" font-weight="700">' +
        '<text class="rabbit-z rabbit-z1" x="96" y="142" font-size="13">z</text>' +
        '<text class="rabbit-z rabbit-z2" x="108" y="132" font-size="10">z</text>' +
        '<text class="rabbit-z rabbit-z3" x="90" y="126" font-size="8">z</text>' +
      '</g>';

    return shell("drained", style, defs, inner);
  }

  window.registerPet({
    id: "rabbit",
    nameEn: "Clover",
    nameRu: "Кловер",
    render: function (mood) {
      if (mood === "radiant") return radiant();
      if (mood === "steady") return steady();
      if (mood === "tired") return tired();
      return drained();
    }
  });
})();
