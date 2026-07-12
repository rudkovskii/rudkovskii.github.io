/**
 * Clover / Кловер — pet3, стиль «real» (CONTRACT.md v2). Тот же персонаж,
 * что в rabbit.js, но как тёплая иллюстрация из детской энциклопедии:
 * природный агути-окрас, кремовый живот, натуральные пропорции, глаза
 * меньше и миндалевидные, штрихи шерсти + 2 градиента, сдержанные позы.
 * Канал состояния — уши: торчком / одно назад / висят / вдоль спины.
 * Scoping: .pet-rabbit-real, keyframes/id с префиксом rabbit-real-.
 */
(function () {
  "use strict";

  var TB = "transform-box:view-box;transform-origin:";
  var E = " ease-in-out infinite}";
  var K = "@keyframes rabbit-real-";

  var FUR = "#A98B63";
  var FURL = "#C9AF87";
  var FURD = "#7E6244";
  var LINE = "#6E5236";
  var CREAM = "#EDE1CC";
  var EARIN = "#C89A92";
  var NOSE = "#B98680";
  var NOSED = "#96655D";
  var EYE = "#46331F";
  var POM = "#E8DCC6";
  var MOUTH = "#B0766B";
  var INK = "#3E3A47";
  var PLAID = "#E9E6FA";
  var PLAIDL = "#CFC8EE";

  var REDUCED = "@media (prefers-reduced-motion: reduce){.pet-rabbit-real *{animation:none !important}}";

  function shell(mood, style, defs, inner) {
    return '<svg viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg" ' +
      'class="pet-svg pet-rabbit pet-rabbit-real is-' + mood + '" role="img" aria-label="Clover">' +
      '<style>' + style + REDUCED + '</style>' +
      '<defs>' + defs + '</defs>' + inner + '</svg>';
  }

  function glowDef(id, c1, o1, c2, o2) {
    return '<radialGradient id="' + id + '" cx="50%" cy="46%" r="56%">' +
      '<stop offset="0%" stop-color="' + c1 + '" stop-opacity="' + o1 + '"/>' +
      '<stop offset="55%" stop-color="' + c2 + '" stop-opacity="' + o2 + '"/>' +
      '<stop offset="100%" stop-color="' + c2 + '" stop-opacity="0"/>' +
      '</radialGradient>';
  }

  function furDef(id) {
    return '<linearGradient id="' + id + '" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0%" stop-color="' + FURL + '"/>' +
      '<stop offset="52%" stop-color="' + FUR + '"/>' +
      '<stop offset="100%" stop-color="' + FURD + '"/>' +
      '</linearGradient>';
  }

  /* Нос-«Y» — видовой признак. */
  function noseY(cx, cy, s) {
    s = s || 1;
    return '<g class="rabbit-nose" fill="none">' +
      '<path d="M' + (cx - 4.6 * s) + ' ' + cy + ' L' + (cx + 4.6 * s) + ' ' + cy +
        ' L' + cx + ' ' + (cy + 5 * s) + ' Z" fill="' + NOSE + '"/>' +
      '<path d="M' + cx + ' ' + (cy + 4.6 * s) + ' L' + cx + ' ' + (cy + 8 * s) +
        ' M' + cx + ' ' + (cy + 8 * s) + ' Q' + cx + ' ' + (cy + 10.6 * s) + ' ' + (cx - 4.4 * s) + ' ' + (cy + 11 * s) +
        ' M' + cx + ' ' + (cy + 8 * s) + ' Q' + cx + ' ' + (cy + 10.6 * s) + ' ' + (cx + 4.4 * s) + ' ' + (cy + 11 * s) + '"' +
        ' stroke="' + NOSED + '" stroke-width="' + (1.4 * s) + '" stroke-linecap="round"/>' +
      '</g>';
  }

  /* Усы, по 3 с каждой стороны. */
  function whiskers(cx, cy, s) {
    s = s || 1;
    return '<g class="rabbit-whiskers" fill="none" stroke="' + FURD + '" stroke-width="0.9" stroke-linecap="round" opacity=".5">' +
      '<path d="M' + (cx - 8 * s) + ' ' + (cy - 2 * s) + ' Q' + (cx - 20 * s) + ' ' + (cy - 6 * s) + ' ' + (cx - 27 * s) + ' ' + (cy - 5 * s) + '"/>' +
      '<path d="M' + (cx - 8 * s) + ' ' + (cy + 1 * s) + ' Q' + (cx - 20 * s) + ' ' + (cy + 1 * s) + ' ' + (cx - 28 * s) + ' ' + (cy + 3 * s) + '"/>' +
      '<path d="M' + (cx - 8 * s) + ' ' + (cy + 4 * s) + ' Q' + (cx - 18 * s) + ' ' + (cy + 8 * s) + ' ' + (cx - 25 * s) + ' ' + (cy + 11 * s) + '"/>' +
      '<path d="M' + (cx + 8 * s) + ' ' + (cy - 2 * s) + ' Q' + (cx + 20 * s) + ' ' + (cy - 6 * s) + ' ' + (cx + 27 * s) + ' ' + (cy - 5 * s) + '"/>' +
      '<path d="M' + (cx + 8 * s) + ' ' + (cy + 1 * s) + ' Q' + (cx + 20 * s) + ' ' + (cy + 1 * s) + ' ' + (cx + 28 * s) + ' ' + (cy + 3 * s) + '"/>' +
      '<path d="M' + (cx + 8 * s) + ' ' + (cy + 4 * s) + ' Q' + (cx + 18 * s) + ' ' + (cy + 8 * s) + ' ' + (cx + 25 * s) + ' ' + (cy + 11 * s) + '"/>' +
      '</g>';
  }

  /* Штрихи шерсти. */
  function tufts(list) {
    var out = '<g class="rabbit-fur" fill="none" stroke="' + FURD + '" stroke-width="1.1" stroke-linecap="round" opacity=".35">';
    for (var i = 0; i < list.length; i++) {
      var t = list[i];
      out += '<path d="M' + t[0] + ' ' + t[1] + ' q ' + (2 * t[2]) + ' -4 ' + (5 * t[2]) + ' -6"/>';
    }
    return out + '</g>';
  }

  /* --------- RADIANT: столбик «на стрёме», оба уха торчком, искры ---------- */

  function radiant() {
    var P = '.pet-rabbit-real.is-radiant ';
    var style =
      P + '.rabbit-pet{' + TB + '120px 200px;animation:rabbit-real-alert 8.5s' + E +
      P + '.rabbit-body{' + TB + '120px 200px;animation:rabbit-real-breathe-r 2.2s' + E +
      P + '.rabbit-ear-l{' + TB + '106px 90px;animation:rabbit-real-ear-l 2.2s ease-in-out .2s infinite}' +
      P + '.rabbit-ear-r{' + TB + '134px 90px;animation:rabbit-real-ear-r 2.2s ease-in-out .2s infinite}' +
      P + '.rabbit-nose{' + TB + '120px 106px;animation:rabbit-real-sniff-r 1.3s' + E +
      P + '.rabbit-tail{' + TB + '145px 175px;animation:rabbit-real-pom-r 2.2s' + E +
      P + '.rabbit-aura{animation:rabbit-real-glow-r 2.2s' + E +
      P + '.rabbit-lid{transform-box:view-box;transform:scaleY(0);animation:rabbit-real-blink-r 4.8s linear infinite}' +
      P + '.rabbit-lid-l{transform-origin:104px 92px}' +
      P + '.rabbit-lid-r{transform-origin:136px 92px}' +
      P + '.rabbit-spark{transform-box:view-box;animation:rabbit-real-twinkle 2.2s' + E +
      P + '.rabbit-sp1{transform-origin:62px 82px}' +
      P + '.rabbit-sp2{transform-origin:180px 70px;animation-delay:.55s}' +
      P + '.rabbit-sp3{transform-origin:56px 138px;animation-delay:1.1s}' +
      P + '.rabbit-sp4{transform-origin:184px 128px;animation-delay:1.6s}' +
      K + 'alert{0%,70%,100%{transform:translateY(0)}76%{transform:translateY(-7px)}84%{transform:translateY(0)}}' +
      K + 'breathe-r{0%,100%{transform:scale(1,1)}50%{transform:scale(1.02,.98)}}' +
      K + 'ear-l{0%,100%{transform:rotate(-1.6deg)}50%{transform:rotate(1.4deg)}}' +
      K + 'ear-r{0%,100%{transform:rotate(1.6deg)}50%{transform:rotate(-1.4deg)}}' +
      K + 'sniff-r{0%,100%{transform:scale(1)}50%{transform:scale(1.08)}}' +
      K + 'pom-r{0%,100%{transform:scale(1)}50%{transform:scale(1.07)}}' +
      K + 'glow-r{0%,100%{opacity:.7}50%{opacity:.95}}' +
      K + 'blink-r{0%,92%,100%{transform:scaleY(0)}94.5%,96.5%{transform:scaleY(1)}}' +
      K + 'twinkle{0%,100%{opacity:.1;transform:scale(.5)}50%{opacity:.8;transform:scale(1)}}';

    var defs = glowDef("rabbit-real-radiant-glow", "#FFDF9E", ".8", "#FFF3D9", ".5") +
      furDef("rabbit-real-radiant-fur");
    var star = 'M0 -5 L1.4 -1.4 L5 0 L1.4 1.4 L0 5 L-1.4 1.4 L-5 0 L-1.4 -1.4 Z';

    var inner =
      '<g class="rabbit-aura"><circle cx="120" cy="122" r="95" fill="url(#rabbit-real-radiant-glow)"/></g>' +
      '<ellipse class="rabbit-shadow" cx="120" cy="203" rx="31" ry="5" fill="' + INK + '" opacity=".08"/>' +
      '<g class="rabbit-pet">' +
        '<g class="rabbit-ear-l">' +
          '<ellipse cx="106" cy="55" rx="8.5" ry="34" fill="' + FUR + '" stroke="' + LINE + '" stroke-width="1" transform="rotate(-8 106 90)"/>' +
          '<ellipse cx="106" cy="58" rx="4" ry="25" fill="' + EARIN + '" transform="rotate(-8 106 90)"/>' +
        '</g>' +
        '<g class="rabbit-ear-r">' +
          '<ellipse cx="134" cy="55" rx="8.5" ry="34" fill="' + FUR + '" stroke="' + LINE + '" stroke-width="1" transform="rotate(8 134 90)"/>' +
          '<ellipse cx="134" cy="58" rx="4" ry="25" fill="' + EARIN + '" transform="rotate(8 134 90)"/>' +
        '</g>' +
        '<g class="rabbit-tail"><circle cx="145" cy="175" r="9" fill="' + POM + '" stroke="' + LINE + '" stroke-width="1"/></g>' +
        '<g class="rabbit-body">' +
          '<ellipse cx="120" cy="152" rx="31" ry="50" fill="url(#rabbit-real-radiant-fur)"/>' +
          '<ellipse cx="103" cy="178" rx="12" ry="18" fill="' + FURD + '" opacity=".18"/>' +
          '<ellipse cx="137" cy="178" rx="12" ry="18" fill="' + FURD + '" opacity=".18"/>' +
          '<ellipse cx="119" cy="164" rx="16" ry="26" fill="' + CREAM + '" opacity=".85"/>' +
          '<ellipse cx="102" cy="200" rx="15" ry="5.5" fill="' + FURL + '" stroke="' + LINE + '" stroke-width=".8"/>' +
          '<ellipse cx="138" cy="200" rx="15" ry="5.5" fill="' + FURL + '" stroke="' + LINE + '" stroke-width=".8"/>' +
          '<ellipse cx="111" cy="150" rx="5.5" ry="9" fill="' + FUR + '" stroke="' + LINE + '" stroke-width=".8" transform="rotate(-8 111 150)"/>' +
          '<ellipse cx="129" cy="150" rx="5.5" ry="9" fill="' + FUR + '" stroke="' + LINE + '" stroke-width=".8" transform="rotate(8 129 150)"/>' +
          '<ellipse cx="120" cy="100" rx="23" ry="20" fill="' + FUR + '"/>' +
          '<ellipse cx="120" cy="90" rx="15" ry="8" fill="' + FURL + '" opacity=".5"/>' +
          '<ellipse cx="120" cy="111" rx="11" ry="8" fill="' + CREAM + '" opacity=".9"/>' +
          '<g class="rabbit-eyes">' +
            '<ellipse cx="104" cy="97" rx="4.4" ry="5" fill="' + EYE + '" transform="rotate(-7 104 97)"/>' +
            '<ellipse cx="136" cy="97" rx="4.4" ry="5" fill="' + EYE + '" transform="rotate(7 136 97)"/>' +
            '<circle cx="105.6" cy="95.2" r="1.4" fill="#FFFFFF"/>' +
            '<circle cx="137.6" cy="95.2" r="1.4" fill="#FFFFFF"/>' +
          '</g>' +
          '<g class="rabbit-lids">' +
            '<ellipse class="rabbit-lid rabbit-lid-l" cx="104" cy="97" rx="5.2" ry="5.8" fill="' + FUR + '"/>' +
            '<ellipse class="rabbit-lid rabbit-lid-r" cx="136" cy="97" rx="5.2" ry="5.8" fill="' + FUR + '"/>' +
          '</g>' +
          noseY(120, 105, 0.8) +
          whiskers(120, 110, 0.9) +
          tufts([[108, 170, 1], [114, 176, 1], [130, 172, -1], [100, 138, 1], [140, 140, -1]]) +
        '</g>' +
      '</g>' +
      '<g class="rabbit-particles" fill="#F5A623">' +
        '<g class="rabbit-spark rabbit-sp1"><path transform="translate(62,82)" d="' + star + '"/></g>' +
        '<g class="rabbit-spark rabbit-sp2"><path transform="translate(180,70) scale(.8)" d="' + star + '"/></g>' +
        '<g class="rabbit-spark rabbit-sp3"><path transform="translate(56,138) scale(.65)" d="' + star + '"/></g>' +
        '<g class="rabbit-spark rabbit-sp4"><path transform="translate(184,128) scale(.75)" d="' + star + '"/></g>' +
      '</g>';

    return shell("radiant", style, defs, inner);
  }

  /* ----------- STEADY: естественно сидит, одно ухо отведено назад ---------- */

  function steady() {
    var P = '.pet-rabbit-real.is-steady ';
    var style =
      P + '.rabbit-body{' + TB + '120px 203px;animation:rabbit-real-breathe-s 3.5s' + E +
      P + '.rabbit-ear-l{' + TB + '106px 118px;animation:rabbit-real-sway-s 3.5s ease-in-out .25s infinite}' +
      P + '.rabbit-ear-r{' + TB + '134px 118px;animation:rabbit-real-twitch-s 7s' + E +
      P + '.rabbit-nose{' + TB + '120px 134px;animation:rabbit-real-sniff-s 1.8s' + E +
      P + '.rabbit-tail{' + TB + '164px 180px;animation:rabbit-real-pom-s 3.5s' + E +
      P + '.rabbit-aura{animation:rabbit-real-glow-s 3.5s' + E +
      P + '.rabbit-lid{transform-box:view-box;transform:scaleY(0);animation:rabbit-real-blink-s 5.4s linear infinite}' +
      P + '.rabbit-lid-l{transform-origin:105px 120.5px}' +
      P + '.rabbit-lid-r{transform-origin:135px 120.5px}' +
      K + 'breathe-s{0%,100%{transform:scale(1,1)}50%{transform:scale(1.018,.982)}}' +
      K + 'sway-s{0%,100%{transform:rotate(-1.4deg)}50%{transform:rotate(1.4deg)}}' +
      K + 'twitch-s{0%,88%,100%{transform:rotate(0)}91%{transform:rotate(-6deg)}95%{transform:rotate(2.5deg)}}' +
      K + 'sniff-s{0%,100%{transform:scale(1)}50%{transform:scale(1.06)}}' +
      K + 'pom-s{0%,100%{transform:scale(1)}50%{transform:scale(1.04)}}' +
      K + 'glow-s{0%,100%{opacity:.65}50%{opacity:.9}}' +
      K + 'blink-s{0%,93%,100%{transform:scaleY(0)}95.5%,97.5%{transform:scaleY(1)}}';

    var defs = glowDef("rabbit-real-steady-glow", "#9CD0AF", ".5", "#E8F3EA", ".4") +
      furDef("rabbit-real-steady-fur");

    var inner =
      '<g class="rabbit-aura"><circle cx="120" cy="140" r="92" fill="url(#rabbit-real-steady-glow)"/></g>' +
      '<ellipse class="rabbit-shadow" cx="120" cy="205" rx="45" ry="5.5" fill="' + INK + '" opacity=".08"/>' +
      '<g class="rabbit-pet">' +
        '<g class="rabbit-ear-l">' +
          '<ellipse cx="106" cy="85" rx="8" ry="32" fill="' + FUR + '" stroke="' + LINE + '" stroke-width="1" transform="rotate(-10 106 118)"/>' +
          '<ellipse cx="106" cy="88" rx="3.8" ry="23" fill="' + EARIN + '" transform="rotate(-10 106 118)"/>' +
        '</g>' +
        '<g class="rabbit-ear-r">' +
          '<ellipse cx="134" cy="88" rx="8" ry="30" fill="' + FUR + '" stroke="' + LINE + '" stroke-width="1" transform="rotate(48 134 118)"/>' +
          '<ellipse cx="134" cy="91" rx="3.6" ry="21" fill="' + EARIN + '" opacity=".8" transform="rotate(48 134 118)"/>' +
        '</g>' +
        '<g class="rabbit-tail"><circle cx="164" cy="180" r="8" fill="' + POM + '" stroke="' + LINE + '" stroke-width="1"/></g>' +
        '<g class="rabbit-body">' +
          '<ellipse cx="120" cy="165" rx="44" ry="38" fill="url(#rabbit-real-steady-fur)"/>' +
          '<ellipse cx="88" cy="172" rx="13" ry="20" fill="' + FURD + '" opacity=".18"/>' +
          '<ellipse cx="152" cy="172" rx="13" ry="20" fill="' + FURD + '" opacity=".18"/>' +
          '<ellipse cx="119" cy="177" rx="22" ry="18" fill="' + CREAM + '" opacity=".8"/>' +
          '<ellipse cx="98" cy="200" rx="16" ry="6" fill="' + FURL + '" stroke="' + LINE + '" stroke-width=".8"/>' +
          '<ellipse cx="142" cy="200" rx="16" ry="6" fill="' + FURL + '" stroke="' + LINE + '" stroke-width=".8"/>' +
          '<ellipse cx="111" cy="178" rx="5.5" ry="9" fill="' + FUR + '" stroke="' + LINE + '" stroke-width=".8" transform="rotate(-8 111 178)"/>' +
          '<ellipse cx="129" cy="178" rx="5.5" ry="9" fill="' + FUR + '" stroke="' + LINE + '" stroke-width=".8" transform="rotate(8 129 178)"/>' +
          '<ellipse cx="120" cy="128" rx="22" ry="19" fill="' + FUR + '"/>' +
          '<ellipse cx="120" cy="119" rx="14" ry="7.5" fill="' + FURL + '" opacity=".45"/>' +
          '<ellipse cx="120" cy="139" rx="10.5" ry="7.5" fill="' + CREAM + '" opacity=".9"/>' +
          '<g class="rabbit-eyes">' +
            '<ellipse cx="105" cy="125" rx="4" ry="4.5" fill="' + EYE + '" transform="rotate(-7 105 125)"/>' +
            '<ellipse cx="135" cy="125" rx="4" ry="4.5" fill="' + EYE + '" transform="rotate(7 135 125)"/>' +
            '<circle cx="106.4" cy="123.4" r="1.2" fill="#FFFFFF"/>' +
            '<circle cx="136.4" cy="123.4" r="1.2" fill="#FFFFFF"/>' +
          '</g>' +
          '<g class="rabbit-lids">' +
            '<ellipse class="rabbit-lid rabbit-lid-l" cx="105" cy="125" rx="4.8" ry="5.2" fill="' + FUR + '"/>' +
            '<ellipse class="rabbit-lid rabbit-lid-r" cx="135" cy="125" rx="4.8" ry="5.2" fill="' + FUR + '"/>' +
          '</g>' +
          '<path d="M114 143 Q120 146 126 143" fill="none" stroke="' + NOSED + '" stroke-width="1.1" stroke-linecap="round" opacity=".6"/>' +
          noseY(120, 133, 0.75) +
          whiskers(120, 138, 0.85) +
          tufts([[92, 180, 1], [100, 188, 1], [140, 184, -1], [148, 176, -1], [116, 196, 1]]) +
        '</g>' +
      '</g>';

    return shell("steady", style, defs, inner);
  }

  /* --------- TIRED: осела, уши висят по бокам, полуприкрытые глаза --------- */

  function tired() {
    var P = '.pet-rabbit-real.is-tired ';
    var style =
      P + '.rabbit-body{' + TB + '120px 205px;animation:rabbit-real-breathe-t 5s' + E +
      P + '.rabbit-ear-l{' + TB + '100px 140px;animation:rabbit-real-droop-l 5s ease-in-out .3s infinite}' +
      P + '.rabbit-ear-r{' + TB + '140px 140px;animation:rabbit-real-droop-r 5s ease-in-out .3s infinite}' +
      P + '.rabbit-nose{' + TB + '120px 155px;animation:rabbit-real-sniff-t 2.6s' + E +
      P + '.rabbit-yawn{' + TB + '120px 167px;animation:rabbit-real-yawn 9s' + E +
      P + '.rabbit-lid{transform-box:view-box;transform:scaleY(.55);animation:rabbit-real-blink-t 6s linear infinite}' +
      P + '.rabbit-lid-l{transform-origin:106px 142.6px}' +
      P + '.rabbit-lid-r{transform-origin:134px 142.6px}' +
      P + '.rabbit-aura{animation:rabbit-real-glow-t 5s' + E +
      K + 'breathe-t{0%,100%{transform:scale(1,1)}50%{transform:scale(1.014,.986)}}' +
      K + 'droop-l{0%,100%{transform:rotate(0)}50%{transform:rotate(1.6deg)}}' +
      K + 'droop-r{0%,100%{transform:rotate(0)}50%{transform:rotate(-1.6deg)}}' +
      K + 'sniff-t{0%,100%{transform:scale(1)}50%{transform:scale(1.04)}}' +
      K + 'yawn{0%,76%,96%,100%{transform:scale(.3)}82%,90%{transform:scale(1.15)}}' +
      K + 'blink-t{0%,90%,100%{transform:scaleY(.55)}93%,95%{transform:scaleY(1)}}' +
      K + 'glow-t{0%,100%{opacity:.5}50%{opacity:.7}}';

    var defs = glowDef("rabbit-real-tired-glow", "#AEBEDD", ".45", "#EDF0F8", ".38") +
      furDef("rabbit-real-tired-fur");

    var inner =
      '<g class="rabbit-aura"><circle cx="120" cy="152" r="88" fill="url(#rabbit-real-tired-glow)"/></g>' +
      '<ellipse class="rabbit-shadow" cx="120" cy="206" rx="51" ry="5.5" fill="' + INK + '" opacity=".08"/>' +
      '<g class="rabbit-pet">' +
        '<circle class="rabbit-tail" cx="165" cy="190" r="8" fill="' + POM + '" stroke="' + LINE + '" stroke-width="1"/>' +
        '<g class="rabbit-body">' +
          '<ellipse cx="120" cy="180" rx="50" ry="27" fill="url(#rabbit-real-tired-fur)"/>' +
          '<ellipse cx="120" cy="150" rx="22" ry="18" fill="' + FUR + '"/>' +
          '<ellipse cx="120" cy="141" rx="14" ry="7" fill="' + FURL + '" opacity=".4"/>' +
          '<g class="rabbit-ear-l">' +
            '<ellipse cx="94" cy="163" rx="7" ry="26" fill="' + FUR + '" stroke="' + LINE + '" stroke-width="1" transform="rotate(20 98 140)"/>' +
            '<ellipse cx="93" cy="166" rx="3.2" ry="18" fill="' + EARIN + '" opacity=".7" transform="rotate(20 98 140)"/>' +
          '</g>' +
          '<g class="rabbit-ear-r">' +
            '<ellipse cx="146" cy="163" rx="7" ry="26" fill="' + FUR + '" stroke="' + LINE + '" stroke-width="1" transform="rotate(-20 142 140)"/>' +
            '<ellipse cx="147" cy="166" rx="3.2" ry="18" fill="' + EARIN + '" opacity=".7" transform="rotate(-20 142 140)"/>' +
          '</g>' +
          '<ellipse cx="120" cy="189" rx="26" ry="14" fill="' + CREAM + '" opacity=".75"/>' +
          '<ellipse cx="96" cy="202" rx="15" ry="5.5" fill="' + FURL + '" stroke="' + LINE + '" stroke-width=".8"/>' +
          '<ellipse cx="144" cy="202" rx="15" ry="5.5" fill="' + FURL + '" stroke="' + LINE + '" stroke-width=".8"/>' +
          '<ellipse cx="120" cy="160" rx="10" ry="7" fill="' + CREAM + '" opacity=".9"/>' +
          '<g class="rabbit-eyes">' +
            '<ellipse cx="106" cy="147" rx="3.8" ry="4.2" fill="' + EYE + '"/>' +
            '<ellipse cx="134" cy="147" rx="3.8" ry="4.2" fill="' + EYE + '"/>' +
            '<circle cx="107.2" cy="145.8" r="1" fill="#FFFFFF" opacity=".9"/>' +
            '<circle cx="135.2" cy="145.8" r="1" fill="#FFFFFF" opacity=".9"/>' +
          '</g>' +
          '<g class="rabbit-lids">' +
            '<ellipse class="rabbit-lid rabbit-lid-l" cx="106" cy="146.6" rx="4.6" ry="4.8" fill="' + FUR + '"/>' +
            '<ellipse class="rabbit-lid rabbit-lid-r" cx="134" cy="146.6" rx="4.6" ry="4.8" fill="' + FUR + '"/>' +
          '</g>' +
          '<path d="M100 141.5 Q106 139.5 112 141.5" fill="none" stroke="' + FURD + '" stroke-width="1.1" stroke-linecap="round" opacity=".6"/>' +
          '<path d="M128 141.5 Q134 139.5 140 141.5" fill="none" stroke="' + FURD + '" stroke-width="1.1" stroke-linecap="round" opacity=".6"/>' +
          noseY(120, 154, 0.7) +
          '<ellipse class="rabbit-yawn" cx="120" cy="167" rx="3.8" ry="4.8" fill="' + MOUTH + '"/>' +
          whiskers(120, 158, 0.8) +
          tufts([[84, 182, 1], [92, 190, 1], [146, 186, -1], [154, 178, -1]]) +
        '</g>' +
      '</g>';

    return shell("tired", style, defs, inner);
  }

  /* ------ DRAINED: клубочек под пледом, уши вдоль спины, глаза-щёлочки ----- */

  function drained() {
    var P = '.pet-rabbit-real.is-drained ';
    var style =
      P + '.rabbit-body{' + TB + '120px 205px;animation:rabbit-real-breathe-d 7s' + E +
      P + '.rabbit-plaid{' + TB + '136px 182px;animation:rabbit-real-plaid-d 7s' + E +
      P + '.rabbit-ear-tips{' + TB + '104px 162px;animation:rabbit-real-tip-twitch 12s' + E +
      P + '.rabbit-nose{' + TB + '74px 180px;animation:rabbit-real-sniff-d 3.5s' + E +
      P + '.rabbit-eyes{' + TB + '85px 172px;animation:rabbit-real-peek 9s' + E +
      P + '.rabbit-z{animation:rabbit-real-zzz 6s ease-in-out infinite;opacity:0}' +
      P + '.rabbit-z2{animation-delay:2s}' +
      P + '.rabbit-z3{animation-delay:4s}' +
      K + 'breathe-d{0%,100%{transform:scale(1,1)}50%{transform:scale(1.011,.989)}}' +
      K + 'plaid-d{0%,100%{transform:scale(1,1)}50%{transform:scale(1.009,.991)}}' +
      K + 'tip-twitch{0%,93%,100%{transform:rotate(0)}95%{transform:rotate(-3deg)}98%{transform:rotate(1.5deg)}}' +
      K + 'sniff-d{0%,100%{transform:scale(1)}50%{transform:scale(1.025)}}' +
      K + 'peek{0%,88%,100%{transform:scaleY(1)}91%,94%{transform:scaleY(1.8)}}' +
      K + 'zzz{0%{opacity:0;transform:translateY(4px)}25%{opacity:.8}60%{opacity:.4}100%{opacity:0;transform:translateY(-20px)}}';

    var defs = glowDef("rabbit-real-drained-glow", "#B3A4D6", ".4", "#F0ECF7", ".35") +
      furDef("rabbit-real-drained-fur");

    var inner =
      '<g class="rabbit-aura"><circle cx="120" cy="170" r="85" fill="url(#rabbit-real-drained-glow)"/></g>' +
      '<ellipse class="rabbit-shadow" cx="122" cy="207" rx="54" ry="5.5" fill="' + INK + '" opacity=".08"/>' +
      '<g class="rabbit-pet">' +
        '<g class="rabbit-body">' +
          '<ellipse cx="130" cy="186" rx="44" ry="20" fill="url(#rabbit-real-drained-fur)"/>' +
          '<circle cx="88" cy="176" r="19" fill="' + FUR + '"/>' +
          '<ellipse cx="88" cy="167" rx="12" ry="6" fill="' + FURL + '" opacity=".4"/>' +
          '<ellipse cx="79" cy="184" rx="8" ry="6" fill="' + CREAM + '" opacity=".9"/>' +
          '<g class="rabbit-eyes" fill="none" stroke="' + EYE + '" stroke-width="1.8" stroke-linecap="round">' +
            '<path d="M73 172 Q77 174.4 81 172"/>' +
            '<path d="M91 172 Q95 174.4 99 172"/>' +
          '</g>' +
          noseY(74, 179, 0.65) +
          '<path d="M60 182 Q52 182 47 184 M60 185 Q53 187 49 190" fill="none" stroke="' + FURD + '" stroke-width=".9" stroke-linecap="round" opacity=".45"/>' +
          tufts([[112, 176, 1], [150, 182, -1]]) +
        '</g>' +
        '<circle class="rabbit-tail" cx="172" cy="192" r="8" fill="' + POM + '" stroke="' + LINE + '" stroke-width="1"/>' +
        '<g class="rabbit-plaid">' +
          '<path d="M102 164 Q134 152 170 164 L174 196 Q136 205 102 197 Z" fill="' + PLAID + '"/>' +
          '<path d="M106 173 Q138 164 168 173 M104 185 Q138 177 171 185" fill="none" stroke="' + PLAIDL + '" stroke-width="2" stroke-linecap="round" opacity=".8"/>' +
          '<path d="M102 164 Q134 152 170 164" fill="none" stroke="' + PLAIDL + '" stroke-width="3" stroke-linecap="round" opacity=".9"/>' +
        '</g>' +
        '<g class="rabbit-ear-tips">' +
          '<ellipse cx="112" cy="159" rx="15" ry="5" fill="' + FUR + '" stroke="' + LINE + '" stroke-width=".9" transform="rotate(7 112 159)"/>' +
          '<ellipse cx="117" cy="159.5" rx="6.5" ry="2.4" fill="' + EARIN + '" opacity=".75" transform="rotate(7 112 159)"/>' +
          '<ellipse cx="109" cy="167" rx="14" ry="4.6" fill="' + FUR + '" stroke="' + LINE + '" stroke-width=".9" transform="rotate(11 109 167)"/>' +
          '<ellipse cx="113.5" cy="167.5" rx="6" ry="2.2" fill="' + EARIN + '" opacity=".75" transform="rotate(11 109 167)"/>' +
        '</g>' +
      '</g>' +
      '<g class="rabbit-particles" fill="#9C8BC0" font-family="Nunito, Quicksand, sans-serif" font-weight="700">' +
        '<text class="rabbit-z rabbit-z1" x="98" y="144" font-size="13">z</text>' +
        '<text class="rabbit-z rabbit-z2" x="110" y="134" font-size="10">z</text>' +
        '<text class="rabbit-z rabbit-z3" x="92" y="128" font-size="8">z</text>' +
      '</g>';

    return shell("drained", style, defs, inner);
  }

  window.registerPetStyle({
    petId: "rabbit",
    style: "real",
    render: function (mood) {
      if (mood === "radiant") return radiant();
      if (mood === "steady") return steady();
      if (mood === "tired") return tired();
      return drained();
    }
  });
})();
