/**
 * Willow / Уиллоу — волк (id: wolf), kawaii die-cut sticker-стиль.
 * Мягкий добрый серый волк: серое тело (#9aa0aa), кремовый живот/щёки/грудь,
 * ОСТРЫЕ стоячие уши, пушистый хвост свёрнут вокруг тела, небольшая мордочка.
 * Стикер-приём: ОДИН толстый тёмный контур (~5px, #2c2622) + die-cut белая
 * обводка позади персонажа (белый силуэт со смещением наружу ~7px).
 * Все классы/keyframes/id — с префиксом «wolf-sticker-».
 * Каналы состояния: поза + уши + хвост + веки (radiant→drained).
 */
(function () {
  "use strict";

  var GRAY = "#9aa0aa";   // тело
  var GRAYD = "#7f858f";  // тональная тень / хвост-основа
  var CREAM = "#F5EDDD";  // живот / щёки / грудь / морда
  var INNER = "#D6A7AC";  // нутро уха (мягкая роза)
  var OUT = "#2c2622";    // единый тёмный контур
  var CHEEK = "#F5A88E";  // румяные щёки
  var MOUTH = "#E88A76";  // тёплый рот
  var INK = "#2c2622";    // глаза

  var REDUCED =
    "@media (prefers-reduced-motion: reduce){.wolf-sticker *{animation:none !important}}";

  function glowDef(id, c1, o1, c2, o2) {
    return '<radialGradient id="' + id + '" cx="50%" cy="46%" r="56%">' +
      '<stop offset="0%" stop-color="' + c1 + '" stop-opacity="' + o1 + '"/>' +
      '<stop offset="55%" stop-color="' + c2 + '" stop-opacity="' + o2 + '"/>' +
      '<stop offset="100%" stop-color="' + c2 + '" stop-opacity="0"/>' +
      '</radialGradient>';
  }

  function shell(mood, style, defs, inner) {
    return '<svg viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg" ' +
      'class="pet-svg pet-wolf wolf-sticker is-' + mood + '" role="img" aria-label="Willow">' +
      '<style>' + style + REDUCED + '</style>' +
      '<defs>' + defs + '</defs>' + inner + '</svg>';
  }

  // die-cut белая обводка: тот же путь белым, толстый белый stroke (наружу ~7px)
  var DIE = 'fill="#fff" stroke="#fff" stroke-width="17" stroke-linejoin="round" stroke-linecap="round"';
  function bP(d) { return '<path d="' + d + '" ' + DIE + '/>'; }
  function bE(a) { return '<ellipse ' + a + ' ' + DIE + '/>'; }

  // окрашенная фигура с единым тёмным контуром 5px
  function oP(d, fill, w) {
    return '<path d="' + d + '" fill="' + fill + '" stroke="' + OUT +
      '" stroke-width="' + (w || 5) + '" stroke-linejoin="round" stroke-linecap="round"/>';
  }
  function oE(a, fill, w) {
    return '<ellipse ' + a + ' fill="' + fill + '" stroke="' + OUT +
      '" stroke-width="' + (w || 5) + '"/>';
  }

  var STAR = 'M0 -6 L1.7 -1.7 L6 0 L1.7 1.7 L0 6 L-1.7 1.7 L-6 0 L-1.7 -1.7 Z';
  var ZP = 'M0 0 h8 l-8 8 h8';

  /* ============================ RADIANT ============================ */
  /* прямая поза, уши торчком, широкая улыбка, пышный хвост, искры */
  function radiant() {
    var style =
      '.wolf-sticker.is-radiant .wolf-sticker-pet{transform-box:view-box;transform-origin:120px 202px;animation:wolf-sticker-perk 4.6s ease-in-out infinite}' +
      '.wolf-sticker.is-radiant .wolf-sticker-body{transform-box:view-box;transform-origin:120px 202px;animation:wolf-sticker-breathe-r 2.2s ease-in-out infinite}' +
      '.wolf-sticker.is-radiant .wolf-sticker-tail{transform-box:view-box;transform-origin:158px 176px;animation:wolf-sticker-wag 2.2s ease-in-out infinite}' +
      '.wolf-sticker.is-radiant .wolf-sticker-earL{transform-box:view-box;transform-origin:98px 108px;animation:wolf-sticker-earR-tw 3.3s ease-in-out infinite}' +
      '.wolf-sticker.is-radiant .wolf-sticker-earR{transform-box:view-box;transform-origin:142px 108px;animation:wolf-sticker-earL-tw 3.3s ease-in-out infinite}' +
      '.wolf-sticker.is-radiant .wolf-sticker-aura{animation:wolf-sticker-glow 2.2s ease-in-out infinite}' +
      '.wolf-sticker.is-radiant .wolf-sticker-lid{transform-box:view-box;transform:scaleY(0);animation:wolf-sticker-blink 4.4s linear infinite}' +
      '.wolf-sticker.is-radiant .wolf-sticker-lid-l{transform-origin:104px 126px}' +
      '.wolf-sticker.is-radiant .wolf-sticker-lid-r{transform-origin:136px 126px}' +
      '.wolf-sticker.is-radiant .wolf-sticker-spark{transform-box:view-box;animation:wolf-sticker-twinkle 1.9s ease-in-out infinite}' +
      '.wolf-sticker.is-radiant .wolf-sticker-sp2{animation-delay:.5s}' +
      '.wolf-sticker.is-radiant .wolf-sticker-sp3{animation-delay:1s}' +
      '.wolf-sticker.is-radiant .wolf-sticker-sp4{animation-delay:1.4s}' +
      '@keyframes wolf-sticker-perk{0%,58%,100%{transform:scale(1,1)}66%{transform:scale(1.02,.98)}74%{transform:scale(.99,1.02)}82%{transform:scale(1,1)}}' +
      '@keyframes wolf-sticker-breathe-r{0%,100%{transform:scale(1,1)}50%{transform:scale(1.03,.97)}}' +
      '@keyframes wolf-sticker-wag{0%,100%{transform:rotate(-7deg)}50%{transform:rotate(8deg)}}' +
      '@keyframes wolf-sticker-earL-tw{0%,100%{transform:rotate(0deg)}50%{transform:rotate(-3deg)}}' +
      '@keyframes wolf-sticker-earR-tw{0%,100%{transform:rotate(0deg)}50%{transform:rotate(3deg)}}' +
      '@keyframes wolf-sticker-glow{0%,100%{opacity:.75}50%{opacity:1}}' +
      '@keyframes wolf-sticker-blink{0%,92%,100%{transform:scaleY(0)}94.5%,96.5%{transform:scaleY(1)}}' +
      '@keyframes wolf-sticker-twinkle{0%,100%{opacity:.15;transform:scale(.5)}50%{opacity:1;transform:scale(1)}}';

    var defs = glowDef("wolf-sticker-radiant-glow", "#FFDF9E", ".9", "#FFF3D9", ".55");

    // геометрия
    var dTail = "M150 180 Q214 176 210 118 Q207 92 178 98 Q202 116 197 146 Q192 172 162 180 Q155 181 150 178 Z";
    var dEarL = "M96 112 L80 52 L124 100 Z";
    var dEarR = "M144 112 L160 52 L116 100 Z";
    var eBody = 'cx="120" cy="146" rx="45" ry="57"';
    var pawL = 'cx="106" cy="196" rx="9" ry="14"';
    var pawR = 'cx="134" cy="196" rx="9" ry="14"';

    var inner =
      '<g class="wolf-sticker-aura aura"><circle cx="120" cy="128" r="94" fill="url(#wolf-sticker-radiant-glow)"/></g>' +
      '<ellipse cx="120" cy="205" rx="40" ry="6.5" fill="' + INK + '" opacity=".08"/>' +
      // die-cut белый силуэт (статичен)
      '<g class="wolf-sticker-diecut">' + bP(dTail) + bE(pawL) + bE(pawR) + bP(dEarL) + bP(dEarR) + bE(eBody) + '</g>' +
      '<g class="wolf-sticker-pet">' +
        '<g class="wolf-sticker-tail extras">' + oP(dTail, GRAYD) +
          '<path d="M186 102 Q208 100 210 122 Q210 140 202 150 Q204 128 194 114 Q190 106 186 102 Z" fill="' + CREAM + '"/>' +
        '</g>' +
        '<g class="wolf-sticker-earL">' + oP(dEarL, GRAY) + oP("M98 104 L88 66 L116 98 Z", INNER, 0) + '</g>' +
        '<g class="wolf-sticker-earR">' + oP(dEarR, GRAY) + oP("M142 104 L152 66 L124 98 Z", INNER, 0) + '</g>' +
        '<g class="wolf-sticker-body body">' +
          oE(eBody, GRAY) +
          '<ellipse cx="120" cy="162" rx="30" ry="34" fill="' + CREAM + '"/>' +       // грудь/живот
          oE(pawL, GRAY) + oE(pawR, GRAY) +
          '<ellipse cx="120" cy="150" rx="26" ry="21" fill="' + CREAM + '"/>' +       // морда
          '<g class="wolf-sticker-eyes eyes">' +
            '<circle cx="104" cy="126" r="8" fill="' + INK + '"/>' +
            '<circle cx="136" cy="126" r="8" fill="' + INK + '"/>' +
            '<circle cx="107" cy="123" r="3" fill="#fff"/>' +
            '<circle cx="139" cy="123" r="3" fill="#fff"/>' +
            '<circle cx="101" cy="129" r="1.3" fill="#fff" opacity=".8"/>' +
            '<circle cx="133" cy="129" r="1.3" fill="#fff" opacity=".8"/>' +
          '</g>' +
          '<g class="wolf-sticker-lids eyelids">' +
            '<ellipse class="wolf-sticker-lid wolf-sticker-lid-l" cx="104" cy="126" rx="8.6" ry="8.6" fill="' + CREAM + '"/>' +
            '<ellipse class="wolf-sticker-lid wolf-sticker-lid-r" cx="136" cy="126" rx="8.6" ry="8.6" fill="' + CREAM + '"/>' +
          '</g>' +
          '<ellipse cx="90" cy="144" rx="8" ry="5.5" fill="' + CHEEK + '" opacity=".8"/>' +
          '<ellipse cx="150" cy="144" rx="8" ry="5.5" fill="' + CHEEK + '" opacity=".8"/>' +
          '<path d="M113 145 Q120 151 127 145 Q123 149 120 149 Q117 149 113 145 Z" fill="' + INK + '"/>' + // нос
          '<g class="wolf-sticker-mouth mouth">' +
            '<path d="M120 149 L120 153" stroke="' + OUT + '" stroke-width="2" stroke-linecap="round"/>' +
            '<path d="M107 153 Q120 168 133 153 Q120 162 107 153 Z" fill="' + MOUTH + '"/>' +
            '<path d="M120 153 Q120 162 120 162" fill="none"/>' +
          '</g>' +
        '</g>' +
      '</g>' +
      '<g class="wolf-sticker-particles particles" fill="#F5A623">' +
        '<g class="wolf-sticker-spark wolf-sticker-sp1" style="transform-origin:60px 66px"><path transform="translate(60,66)" d="' + STAR + '"/></g>' +
        '<g class="wolf-sticker-spark wolf-sticker-sp2" style="transform-origin:182px 58px"><path transform="translate(182,58) scale(.8)" d="' + STAR + '"/></g>' +
        '<g class="wolf-sticker-spark wolf-sticker-sp3" style="transform-origin:52px 104px"><path transform="translate(52,104) scale(.65)" d="' + STAR + '"/></g>' +
        '<g class="wolf-sticker-spark wolf-sticker-sp4" style="transform-origin:190px 100px"><path transform="translate(190,100) scale(.9)" d="' + STAR + '"/></g>' +
      '</g>';

    return shell("radiant", style, defs, inner);
  }

  /* ============================ STEADY ============================ */
  /* спокойная ровная поза, мягкая улыбка, хвост свёрнут вокруг */
  function steady() {
    var style =
      '.wolf-sticker.is-steady .wolf-sticker-body{transform-box:view-box;transform-origin:120px 202px;animation:wolf-sticker-breathe-s 3.5s ease-in-out infinite}' +
      '.wolf-sticker.is-steady .wolf-sticker-tail{transform-box:view-box;transform-origin:150px 172px;animation:wolf-sticker-sway 3.5s ease-in-out infinite}' +
      '.wolf-sticker.is-steady .wolf-sticker-lid{transform-box:view-box;transform:scaleY(0);animation:wolf-sticker-blink-s 5.2s linear infinite}' +
      '.wolf-sticker.is-steady .wolf-sticker-lid-l{transform-origin:104px 140px}' +
      '.wolf-sticker.is-steady .wolf-sticker-lid-r{transform-origin:136px 140px}' +
      '@keyframes wolf-sticker-breathe-s{0%,100%{transform:scale(1)}50%{transform:scale(1.022,.978)}}' +
      '@keyframes wolf-sticker-sway{0%,100%{transform:rotate(0deg)}50%{transform:rotate(-2.5deg)}}' +
      '@keyframes wolf-sticker-blink-s{0%,93%,100%{transform:scaleY(0)}95.5%,97.5%{transform:scaleY(1)}}';

    var defs = glowDef("wolf-sticker-steady-glow", "#BFE4CD", ".8", "#E8F3EA", ".5");

    var dTail = "M156 166 Q200 164 194 128 Q190 108 170 116 Q190 134 178 160 Q166 182 120 191 Q100 194 88 189 Q98 202 124 200 Q162 197 172 172 Q164 168 156 166 Z";
    var dEarL = "M92 118 L78 64 L120 106 Z";
    var dEarR = "M148 118 L162 64 L120 106 Z";
    var eBody = 'cx="120" cy="152" rx="51" ry="50"';
    var pawL = 'cx="106" cy="197" rx="11" ry="7"';
    var pawR = 'cx="134" cy="197" rx="11" ry="7"';

    var inner =
      '<g class="wolf-sticker-aura aura"><circle cx="120" cy="146" r="88" fill="url(#wolf-sticker-steady-glow)"/></g>' +
      '<ellipse cx="120" cy="206" rx="48" ry="6.5" fill="' + INK + '" opacity=".08"/>' +
      '<g class="wolf-sticker-diecut">' + bE(pawL) + bE(pawR) + bP(dEarL) + bP(dEarR) + bE(eBody) + bP(dTail) + '</g>' +
      '<g class="wolf-sticker-pet">' +
        oP(dEarL, GRAY) + oP("M94 110 L84 74 L112 102 Z", INNER, 0) +
        oP(dEarR, GRAY) + oP("M146 110 L156 74 L128 102 Z", INNER, 0) +
        '<g class="wolf-sticker-body body">' +
          oE(eBody, GRAY) +
          '<ellipse cx="120" cy="170" rx="30" ry="26" fill="' + CREAM + '"/>' +
          oE(pawL, GRAY) + oE(pawR, GRAY) +
          '<ellipse cx="120" cy="158" rx="25" ry="20" fill="' + CREAM + '"/>' +
          '<g class="wolf-sticker-eyes eyes">' +
            '<circle cx="104" cy="140" r="6.4" fill="' + INK + '"/>' +
            '<circle cx="136" cy="140" r="6.4" fill="' + INK + '"/>' +
            '<circle cx="106.4" cy="137.8" r="2.3" fill="#fff"/>' +
            '<circle cx="138.4" cy="137.8" r="2.3" fill="#fff"/>' +
          '</g>' +
          '<g class="wolf-sticker-lids eyelids">' +
            '<ellipse class="wolf-sticker-lid wolf-sticker-lid-l" cx="104" cy="140" rx="7" ry="7" fill="' + CREAM + '"/>' +
            '<ellipse class="wolf-sticker-lid wolf-sticker-lid-r" cx="136" cy="140" rx="7" ry="7" fill="' + CREAM + '"/>' +
          '</g>' +
          '<ellipse cx="91" cy="156" rx="7.5" ry="5" fill="' + CHEEK + '" opacity=".78"/>' +
          '<ellipse cx="149" cy="156" rx="7.5" ry="5" fill="' + CHEEK + '" opacity=".78"/>' +
          '<path d="M114 155 Q120 161 126 155 Q122.5 158.5 120 158.5 Q117.5 158.5 114 155 Z" fill="' + INK + '"/>' +
          '<g class="wolf-sticker-mouth mouth">' +
            '<path d="M120 158.5 L120 162" stroke="' + OUT + '" stroke-width="2" stroke-linecap="round" fill="none"/>' +
            '<path d="M110 162 Q115 168 120 162 Q125 168 130 162" fill="none" stroke="' + OUT + '" stroke-width="2.4" stroke-linecap="round"/>' +
          '</g>' +
        '</g>' +
        '<g class="wolf-sticker-tail extras">' + oP(dTail, GRAYD) +
          '<path d="M92 189 Q82 191 88 197 Q98 200 110 197 Q100 191 92 189 Z" fill="' + CREAM + '"/>' +
        '</g>' +
      '</g>';

    return shell("steady", style, defs, inner);
  }

  /* ============================ TIRED ============================ */
  /* уши назад, полуприкрытые глаза, тело оседает, редкий зевок */
  function tired() {
    var style =
      '.wolf-sticker.is-tired .wolf-sticker-body{transform-box:view-box;transform-origin:120px 202px;animation:wolf-sticker-breathe-t 5s ease-in-out infinite}' +
      '.wolf-sticker.is-tired .wolf-sticker-tail{transform-box:view-box;transform-origin:172px 190px;animation:wolf-sticker-sway-t 5s ease-in-out infinite}' +
      '.wolf-sticker.is-tired .wolf-sticker-lid{transform-box:view-box;transform:scaleY(.5);animation:wolf-sticker-blink-t 6s linear infinite}' +
      '.wolf-sticker.is-tired .wolf-sticker-lid-l{transform-origin:102px 154px}' +
      '.wolf-sticker.is-tired .wolf-sticker-lid-r{transform-origin:140px 154px}' +
      '.wolf-sticker.is-tired .wolf-sticker-mouth{transform-box:view-box;transform-origin:121px 172px;transform:scale(1,.14);animation:wolf-sticker-yawn 7.5s ease-in-out infinite}' +
      '@keyframes wolf-sticker-breathe-t{0%,100%{transform:scale(1)}50%{transform:scale(1.015,.985)}}' +
      '@keyframes wolf-sticker-sway-t{0%,100%{transform:rotate(0deg)}50%{transform:rotate(1.6deg)}}' +
      '@keyframes wolf-sticker-blink-t{0%,88%,100%{transform:scaleY(.5)}91.5%,93%{transform:scaleY(1)}}' +
      '@keyframes wolf-sticker-yawn{0%,52%,100%{transform:scale(1,.14)}60%,76%{transform:scale(1.1,1)}86%{transform:scale(1,.14)}}';

    var defs = glowDef("wolf-sticker-tired-glow", "#D9E1F1", ".65", "#EDF0F8", ".4");

    var dTail = "M172 190 Q200 194 195 202 Q186 207 170 205 Q184 202 178 194 Q176 190 172 190 Z";
    var dEarL = "M86 140 L58 118 L114 128 Z";   // ухо назад-влево
    var dEarR = "M154 140 L182 118 L126 128 Z"; // ухо назад-вправо
    var eBody = 'cx="120" cy="164" rx="60" ry="39"';
    var pawL = 'cx="96" cy="199" rx="12" ry="6"';
    var pawR = 'cx="144" cy="199" rx="12" ry="6"';

    var inner =
      '<g class="wolf-sticker-aura aura"><circle cx="120" cy="156" r="86" fill="url(#wolf-sticker-tired-glow)"/></g>' +
      '<ellipse cx="120" cy="206" rx="58" ry="6" fill="' + INK + '" opacity=".07"/>' +
      '<g class="wolf-sticker-diecut">' + bE(pawL) + bE(pawR) + bP(dEarL) + bP(dEarR) + bP(dTail) + bE(eBody) + '</g>' +
      '<g class="wolf-sticker-pet">' +
        oP(dEarL, GRAY) + oP("M88 134 L68 120 L106 128 Z", INNER, 0) +
        oP(dEarR, GRAY) + oP("M152 134 L172 120 L134 128 Z", INNER, 0) +
        '<g class="wolf-sticker-body body">' +
          oE(eBody, GRAY) +
          '<ellipse cx="120" cy="180" rx="34" ry="18" fill="' + CREAM + '"/>' +
          oE(pawL, GRAY) + oE(pawR, GRAY) +
          '<ellipse cx="120" cy="168" rx="26" ry="18" fill="' + CREAM + '"/>' +
          '<g class="wolf-sticker-eyes eyes">' +
            '<circle cx="102" cy="154" r="6" fill="' + INK + '"/>' +
            '<circle cx="140" cy="154" r="6" fill="' + INK + '"/>' +
            '<circle cx="104" cy="152.4" r="1.6" fill="#fff" opacity=".85"/>' +
            '<circle cx="142" cy="152.4" r="1.6" fill="#fff" opacity=".85"/>' +
          '</g>' +
          '<g class="wolf-sticker-lids eyelids">' +
            '<ellipse class="wolf-sticker-lid wolf-sticker-lid-l" cx="102" cy="154" rx="6.8" ry="6.8" fill="' + CREAM + '"/>' +
            '<ellipse class="wolf-sticker-lid wolf-sticker-lid-r" cx="140" cy="154" rx="6.8" ry="6.8" fill="' + CREAM + '"/>' +
          '</g>' +
          '<ellipse cx="88" cy="166" rx="7.5" ry="5" fill="' + CHEEK + '" opacity=".72"/>' +
          '<ellipse cx="154" cy="166" rx="7.5" ry="5" fill="' + CHEEK + '" opacity=".72"/>' +
          '<path d="M115 164 Q121 170 127 164 Q123.5 167.5 121 167.5 Q118.5 167.5 115 164 Z" fill="' + INK + '"/>' +
          '<g class="wolf-sticker-mouth mouth">' +
            '<ellipse cx="121" cy="179" rx="7" ry="9" fill="' + MOUTH + '"/>' +
            '<ellipse cx="121" cy="182.5" rx="3.6" ry="4" fill="#E9B7B0"/>' +
          '</g>' +
        '</g>' +
        '<g class="wolf-sticker-tail extras">' + oP(dTail, GRAYD) +
          '<path d="M176 204 Q170 205 165 203 Q172 200 178 201 Q179 203 176 204 Z" fill="' + CREAM + '"/>' +
        '</g>' +
      '</g>';

    return shell("tired", style, defs, inner);
  }

  /* ============================ DRAINED ============================ */
  /* свернулся клубком вокруг хвоста, глаза закрыты, «z z», без страдания */
  function drained() {
    var style =
      '.wolf-sticker.is-drained .wolf-sticker-body{transform-box:view-box;transform-origin:122px 202px;animation:wolf-sticker-breathe-d 7s ease-in-out infinite}' +
      '.wolf-sticker.is-drained .wolf-sticker-tail{transform-box:view-box;transform-origin:120px 186px;animation:wolf-sticker-curl 7s ease-in-out infinite}' +
      '.wolf-sticker.is-drained .wolf-sticker-z{opacity:0;animation:wolf-sticker-zfloat 7s ease-in-out infinite}' +
      '.wolf-sticker.is-drained .wolf-sticker-z2{animation-delay:2.3s}' +
      '.wolf-sticker.is-drained .wolf-sticker-z3{animation-delay:4.6s}' +
      '@keyframes wolf-sticker-breathe-d{0%,100%{transform:scale(1)}50%{transform:scale(1.012,1.035)}}' +
      '@keyframes wolf-sticker-curl{0%,100%{transform:translateY(0)}50%{transform:translateY(-2px)}}' +
      '@keyframes wolf-sticker-zfloat{0%{opacity:0;transform:translateY(7px)}14%{opacity:.85}55%,100%{opacity:0;transform:translateY(-15px)}}';

    var defs = glowDef("wolf-sticker-drained-glow", "#DFD5F0", ".6", "#F0ECF7", ".35");

    var dEarL = "M92 150 L82 118 L112 142 Z";
    var dEarR = "M138 148 L150 120 L118 140 Z";
    var eBall = 'cx="120" cy="172" rx="52" ry="35"';
    var dTail = "M74 182 Q56 178 60 196 Q66 210 96 208 Q120 206 138 202 Q120 210 92 208 Q68 206 66 190 Q66 182 74 182 Z";

    var inner =
      '<g class="wolf-sticker-aura aura"><circle cx="120" cy="176" r="84" fill="url(#wolf-sticker-drained-glow)"/></g>' +
      '<ellipse cx="122" cy="205" rx="52" ry="6" fill="' + INK + '" opacity=".07"/>' +
      '<g class="wolf-sticker-diecut">' + bP(dEarL) + bP(dEarR) + bE(eBall) + bP(dTail) + '</g>' +
      '<g class="wolf-sticker-pet">' +
        oP(dEarL, GRAY) + oP("M93 143 L86 124 L106 141 Z", INNER, 0) +
        oP(dEarR, GRAY) + oP("M137 142 L145 126 L124 139 Z", INNER, 0) +
        '<g class="wolf-sticker-body body">' +
          oE(eBall, GRAY) +
          '<ellipse cx="120" cy="188" rx="34" ry="16" fill="' + CREAM + '"/>' +   // грудь калачиком
          '<ellipse cx="98" cy="170" rx="22" ry="17" fill="' + CREAM + '"/>' +    // морда сбоку
          // закрытые глаза-дуги
          '<g class="wolf-sticker-eyes eyes" fill="none" stroke="' + INK + '" stroke-width="2.6" stroke-linecap="round">' +
            '<path d="M84 168 q6 5 12 0"/>' +
            '<path d="M102 166 q6 5 12 0"/>' +
          '</g>' +
          '<ellipse cx="80" cy="177" rx="5.5" ry="4" fill="' + CHEEK + '" opacity=".72"/>' +
          '<path d="M92 172 Q98 178 104 172 Q100.5 175.5 98 175.5 Q95.5 175.5 92 172 Z" fill="' + INK + '"/>' +
          '<path d="M92 180 q6 3.5 12 0" fill="none" stroke="' + OUT + '" stroke-width="2" stroke-linecap="round" opacity=".6"/>' +
        '</g>' +
        // пушистый хвост обёрнут вокруг калачика (спереди)
        '<g class="wolf-sticker-tail extras">' + oP(dTail, GRAYD) +
          '<path d="M70 186 Q60 184 62 196 Q68 190 78 190 Q74 186 70 186 Z" fill="' + CREAM + '"/>' +
        '</g>' +
      '</g>' +
      '<g class="wolf-sticker-particles particles" fill="none" stroke="#9C8BC0" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">' +
        '<g class="wolf-sticker-z wolf-sticker-z1"><path transform="translate(150,150) scale(.7)" d="' + ZP + '"/></g>' +
        '<g class="wolf-sticker-z wolf-sticker-z2"><path transform="translate(160,132) scale(.9)" d="' + ZP + '"/></g>' +
        '<g class="wolf-sticker-z wolf-sticker-z3"><path transform="translate(172,112) scale(1.15)" d="' + ZP + '"/></g>' +
      '</g>';

    return shell("drained", style, defs, inner);
  }

  window.registerPet({
    id: "wolf",
    nameEn: "Willow",
    nameRu: "Уиллоу",
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
