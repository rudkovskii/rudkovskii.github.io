/**
 * Clover / Кловер — pet3, стиль CARTOON (стикер). По CONTRACT.md v2.
 * Персонаж = rabbit.js (soft): уши-канал mood, помпон, нос-«Y», зубы.
 * Стиль: тональный контур ~4px (какао, не #000), сочные цвета, крупные
 * глаза, амплитуды выше; темпы mood по контракту. Классы rc-* нарочно
 * не совпадают с soft (инлайн <style> глобален); id внутри SVG нет.
 */
(function () {
  "use strict";

  var BODY = "#FDEFD9";
  var BELLY = "#FFF9EC";
  var SHADE = "#F0D4AC";
  var LINE = "#7A5847"; // контур: какао, не #000
  var PINK = "#F79BB5";
  var PINKD = "#D96E92";
  var CHEEK = "#FA8E70";
  var POM = "#FFFDF8";
  var INK = "#3E3A47";
  var MOUTH = "#E96A55";
  var SPARK = "#F5A623";
  var PLAID = "#CFC7F7";
  var PLAIDL = "#A697E3";
  var ZINK = "#8E76C9";

  var SW = 4;  // основной контур
  var SWS = 3; // мелкий

  var REDUCED = "@media (prefers-reduced-motion: reduce){.pet-rabbit-cartoon *{animation:none !important}}";

  function shell(mood, style, inner) {
    return '<svg viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg" ' +
      'class="pet-svg pet-rabbit pet-rabbit-cartoon is-' + mood + '" role="img" aria-label="Clover">' +
      '<style>' + style + REDUCED + '</style>' + inner + '</svg>';
  }

  /* Нос-«Y», жирный. */
  function noseY(cx, cy, s) {
    s = s || 1;
    return '<g class="rc-nose">' +
      '<path d="M' + (cx - 6 * s) + ' ' + cy + ' L' + (cx + 6 * s) + ' ' + cy +
        ' L' + cx + ' ' + (cy + 6.5 * s) + ' Z" fill="' + PINK + '" stroke="' + LINE + '" stroke-width="' + (2.4 * s) + '" stroke-linejoin="round"/>' +
      '<path d="M' + cx + ' ' + (cy + 6 * s) + ' L' + cx + ' ' + (cy + 10 * s) +
        ' M' + cx + ' ' + (cy + 10 * s) + ' Q' + cx + ' ' + (cy + 13.5 * s) + ' ' + (cx - 6 * s) + ' ' + (cy + 14 * s) +
        ' M' + cx + ' ' + (cy + 10 * s) + ' Q' + cx + ' ' + (cy + 13.5 * s) + ' ' + (cx + 6 * s) + ' ' + (cy + 14 * s) + '"' +
        ' fill="none" stroke="' + PINKD + '" stroke-width="' + (2.6 * s) + '" stroke-linecap="round"/>' +
      '</g>';
  }

  /* Два передних зуба. */
  function teeth(cx, y, w, h) {
    return '<rect x="' + (cx - w / 2) + '" y="' + y + '" width="' + w + '" height="' + h +
      '" rx="2" fill="#FFFFFF" stroke="' + LINE + '" stroke-width="2.2"/>' +
      '<line x1="' + cx + '" y1="' + (y + 1) + '" x2="' + cx + '" y2="' + (y + h - 1) +
      '" stroke="' + LINE + '" stroke-width="1.6"/>';
  }

  /* Веко: круг шёрстки + дуга закрытого глаза. */
  function lid(cls, cx, cy, r) {
    return '<g class="rc-lid ' + cls + '">' +
      '<circle cx="' + cx + '" cy="' + cy + '" r="' + (r + 1.5) + '" fill="' + BODY + '"/>' +
      '<path d="M' + (cx - r) + ' ' + cy + ' Q' + cx + ' ' + (cy + r * 0.9) + ' ' + (cx + r) + ' ' + cy +
      '" fill="none" stroke="' + LINE + '" stroke-width="2.6" stroke-linecap="round"/>' +
      '</g>';
  }

  /* RADIANT: на задних лапках, уши торчком, binky */

  function radiant() {
    var style =
      '.pet-rabbit-cartoon.is-radiant .rc-pet{transform-box:view-box;transform-origin:120px 200px;animation:rabbit-cartoon-binky 6.6s ease-in-out infinite}' +
      '.pet-rabbit-cartoon.is-radiant .rc-body{transform-box:view-box;transform-origin:120px 200px;animation:rabbit-cartoon-breathe-r 2.2s ease-in-out infinite}' +
      '.pet-rabbit-cartoon.is-radiant .rc-ear-l{transform-box:view-box;transform-origin:104px 96px;animation:rabbit-cartoon-spring-l 2.2s ease-in-out .18s infinite}' +
      '.pet-rabbit-cartoon.is-radiant .rc-ear-r{transform-box:view-box;transform-origin:136px 96px;animation:rabbit-cartoon-spring-r 2.2s ease-in-out .18s infinite}' +
      '.pet-rabbit-cartoon.is-radiant .rc-tail{transform-box:view-box;transform-origin:158px 176px;animation:rabbit-cartoon-pom 1.4s ease-in-out infinite}' +
      '.pet-rabbit-cartoon.is-radiant .rc-nose{transform-box:view-box;transform-origin:120px 124px;animation:rabbit-cartoon-sniff-r 1.3s ease-in-out infinite}' +
      '.pet-rabbit-cartoon.is-radiant .rc-aura{animation:rabbit-cartoon-glow 2.2s ease-in-out infinite}' +
      '.pet-rabbit-cartoon.is-radiant .rc-lid{transform-box:view-box;transform:scaleY(0);animation:rabbit-cartoon-blink 4.4s linear infinite}' +
      '.pet-rabbit-cartoon.is-radiant .rc-lid-l{transform-origin:105px 111px}' +
      '.pet-rabbit-cartoon.is-radiant .rc-lid-r{transform-origin:135px 111px}' +
      '.pet-rabbit-cartoon.is-radiant .rc-spark{transform-box:view-box;animation:rabbit-cartoon-twinkle 1.9s ease-in-out infinite}' +
      '.pet-rabbit-cartoon.is-radiant .rc-sp1{transform-origin:58px 76px}' +
      '.pet-rabbit-cartoon.is-radiant .rc-sp2{transform-origin:184px 64px;animation-delay:.5s}' +
      '.pet-rabbit-cartoon.is-radiant .rc-sp3{transform-origin:52px 132px;animation-delay:1s}' +
      '.pet-rabbit-cartoon.is-radiant .rc-sp4{transform-origin:188px 124px;animation-delay:1.4s}' +
      '@keyframes rabbit-cartoon-binky{0%,56%,100%{transform:translateY(0) rotate(0) scale(1,1)}61%{transform:translateY(0) rotate(0) scale(1.13,.85)}67%{transform:translateY(-26px) rotate(-8deg) scale(.93,1.1)}73%{transform:translateY(0) rotate(3deg) scale(1.14,.85)}80%{transform:translateY(0) rotate(0) scale(1,1)}}' +
      '@keyframes rabbit-cartoon-breathe-r{0%,100%{transform:scale(1,1)}50%{transform:scale(1.045,.955)}}' +
      '@keyframes rabbit-cartoon-spring-l{0%,100%{transform:rotate(-6deg)}50%{transform:rotate(5deg)}}' +
      '@keyframes rabbit-cartoon-spring-r{0%,100%{transform:rotate(6deg)}50%{transform:rotate(-5deg)}}' +
      '@keyframes rabbit-cartoon-pom{0%,100%{transform:scale(1)}50%{transform:scale(1.22)}}' +
      '@keyframes rabbit-cartoon-sniff-r{0%,100%{transform:scale(1)}50%{transform:scale(1.14)}}' +
      '@keyframes rabbit-cartoon-glow{0%,100%{opacity:.75}50%{opacity:1}}' +
      '@keyframes rabbit-cartoon-blink{0%,92%,100%{transform:scaleY(0)}94.5%,96.5%{transform:scaleY(1)}}' +
      '@keyframes rabbit-cartoon-twinkle{0%,100%{opacity:.15;transform:scale(.4) rotate(0)}50%{opacity:1;transform:scale(1.15) rotate(18deg)}}';

    var star = 'M0 -7 L2 -2 L7 0 L2 2 L0 7 L-2 2 L-7 0 L-2 -2 Z';

    var inner =
      '<g class="rc-aura">' +
        '<circle cx="120" cy="126" r="98" fill="#FFF3D9" opacity=".85"/>' +
        '<circle cx="120" cy="126" r="70" fill="#FFDF9E" opacity=".5"/>' +
      '</g>' +
      '<ellipse cx="120" cy="204" rx="38" ry="7" fill="' + INK + '" opacity=".1"/>' +
      '<g class="rc-pet">' +
        '<g class="rc-ear-l">' +
          '<ellipse cx="103" cy="58" rx="12" ry="39" fill="' + BODY + '" stroke="' + LINE + '" stroke-width="' + SW + '" transform="rotate(-8 103 96)"/>' +
          '<ellipse cx="103" cy="62" rx="6" ry="27" fill="' + PINK + '" transform="rotate(-8 103 96)"/>' +
        '</g>' +
        '<g class="rc-ear-r">' +
          '<ellipse cx="137" cy="58" rx="12" ry="39" fill="' + BODY + '" stroke="' + LINE + '" stroke-width="' + SW + '" transform="rotate(8 137 96)"/>' +
          '<ellipse cx="137" cy="62" rx="6" ry="27" fill="' + PINK + '" transform="rotate(8 137 96)"/>' +
        '</g>' +
        '<g class="rc-tail"><circle cx="158" cy="176" r="12" fill="' + POM + '" stroke="' + LINE + '" stroke-width="' + SW + '"/></g>' +
        '<g class="rc-body">' +
          '<ellipse cx="120" cy="150" rx="42" ry="54" fill="' + BODY + '" stroke="' + LINE + '" stroke-width="' + SW + '"/>' +
          '<ellipse cx="120" cy="170" rx="25" ry="28" fill="' + BELLY + '" opacity=".9"/>' +
          '<ellipse cx="100" cy="200" rx="16" ry="8" fill="' + SHADE + '" stroke="' + LINE + '" stroke-width="' + SWS + '"/>' +
          '<ellipse cx="140" cy="200" rx="16" ry="8" fill="' + SHADE + '" stroke="' + LINE + '" stroke-width="' + SWS + '"/>' +
          '<ellipse cx="106" cy="154" rx="7.5" ry="12" fill="' + BODY + '" stroke="' + LINE + '" stroke-width="' + SWS + '" transform="rotate(-12 106 154)"/>' +
          '<ellipse cx="134" cy="154" rx="7.5" ry="12" fill="' + BODY + '" stroke="' + LINE + '" stroke-width="' + SWS + '" transform="rotate(12 134 154)"/>' +
          '<g class="rc-eyes">' +
            '<circle cx="105" cy="111" r="10" fill="' + INK + '"/>' +
            '<circle cx="135" cy="111" r="10" fill="' + INK + '"/>' +
            '<circle cx="108.5" cy="107.5" r="3.8" fill="#FFFFFF"/>' +
            '<circle cx="138.5" cy="107.5" r="3.8" fill="#FFFFFF"/>' +
            '<circle cx="102" cy="115" r="1.8" fill="#FFFFFF" opacity=".85"/>' +
            '<circle cx="132" cy="115" r="1.8" fill="#FFFFFF" opacity=".85"/>' +
          '</g>' +
          lid('rc-lid-l', 105, 111, 10) +
          lid('rc-lid-r', 135, 111, 10) +
          noseY(120, 124, 1) +
          '<ellipse cx="120" cy="143.5" rx="9.5" ry="6" fill="' + MOUTH + '" stroke="' + LINE + '" stroke-width="2.4"/>' +
          teeth(120, 139.5, 8.6, 6) +
          '<ellipse cx="90" cy="124" rx="8.5" ry="5.5" fill="' + CHEEK + '" opacity=".85"/>' +
          '<ellipse cx="150" cy="124" rx="8.5" ry="5.5" fill="' + CHEEK + '" opacity=".85"/>' +
        '</g>' +
      '</g>' +
      '<g class="rc-particles" fill="' + SPARK + '" stroke="' + LINE + '" stroke-width="1.6" stroke-linejoin="round">' +
        '<g class="rc-spark rc-sp1"><path transform="translate(58,76)" d="' + star + '"/></g>' +
        '<g class="rc-spark rc-sp2"><path transform="translate(184,64) scale(.85)" d="' + star + '"/></g>' +
        '<g class="rc-spark rc-sp3"><path transform="translate(52,132) scale(.7)" d="' + star + '"/></g>' +
        '<g class="rc-spark rc-sp4"><path transform="translate(188,124) scale(.8)" d="' + star + '"/></g>' +
      '</g>';

    return shell("radiant", style, inner);
  }

  /* STEADY: «булочка», одно ухо согнуто (bashful) */

  function steady() {
    var style =
      '.pet-rabbit-cartoon.is-steady .rc-body{transform-box:view-box;transform-origin:120px 202px;animation:rabbit-cartoon-breathe-s 3.5s ease-in-out infinite}' +
      '.pet-rabbit-cartoon.is-steady .rc-ear-l{transform-box:view-box;transform-origin:106px 120px;animation:rabbit-cartoon-sway-s 3.5s ease-in-out .2s infinite}' +
      '.pet-rabbit-cartoon.is-steady .rc-ear-r{transform-box:view-box;transform-origin:138px 118px;animation:rabbit-cartoon-flop 6.5s ease-in-out infinite}' +
      '.pet-rabbit-cartoon.is-steady .rc-nose{transform-box:view-box;transform-origin:120px 146px;animation:rabbit-cartoon-sniff-s 1.8s ease-in-out infinite}' +
      '.pet-rabbit-cartoon.is-steady .rc-tail{transform-box:view-box;transform-origin:164px 182px;animation:rabbit-cartoon-pom-s 3.5s ease-in-out infinite}' +
      '.pet-rabbit-cartoon.is-steady .rc-aura{animation:rabbit-cartoon-glow-s 3.5s ease-in-out infinite}' +
      '.pet-rabbit-cartoon.is-steady .rc-lid{transform-box:view-box;transform:scaleY(0);animation:rabbit-cartoon-blink-s 5.2s linear infinite}' +
      '.pet-rabbit-cartoon.is-steady .rc-lid-l{transform-origin:106px 136px}' +
      '.pet-rabbit-cartoon.is-steady .rc-lid-r{transform-origin:134px 136px}' +
      '@keyframes rabbit-cartoon-breathe-s{0%,100%{transform:scale(1,1)}50%{transform:scale(1.035,.965)}}' +
      '@keyframes rabbit-cartoon-sway-s{0%,100%{transform:rotate(-4deg)}50%{transform:rotate(4deg)}}' +
      '@keyframes rabbit-cartoon-flop{0%,86%,100%{transform:rotate(0)}89%{transform:rotate(-14deg)}93%{transform:rotate(6deg)}97%{transform:rotate(-3deg)}}' +
      '@keyframes rabbit-cartoon-sniff-s{0%,100%{transform:scale(1)}50%{transform:scale(1.1)}}' +
      '@keyframes rabbit-cartoon-pom-s{0%,100%{transform:scale(1)}50%{transform:scale(1.1)}}' +
      '@keyframes rabbit-cartoon-glow-s{0%,100%{opacity:.7}50%{opacity:.95}}' +
      '@keyframes rabbit-cartoon-blink-s{0%,93%,100%{transform:scaleY(0)}95.5%,97.5%{transform:scaleY(1)}}';

    var inner =
      '<g class="rc-aura">' +
        '<circle cx="120" cy="140" r="94" fill="#E8F3EA" opacity=".9"/>' +
        '<circle cx="120" cy="140" r="66" fill="#9CD0AF" opacity=".35"/>' +
      '</g>' +
      '<ellipse cx="120" cy="206" rx="48" ry="7" fill="' + INK + '" opacity=".1"/>' +
      '<g class="rc-pet">' +
        '<g class="rc-ear-l">' +
          '<ellipse cx="105" cy="84" rx="11" ry="37" fill="' + BODY + '" stroke="' + LINE + '" stroke-width="' + SW + '" transform="rotate(-6 105 120)"/>' +
          '<ellipse cx="105" cy="88" rx="5.5" ry="26" fill="' + PINK + '" transform="rotate(-6 105 120)"/>' +
        '</g>' +
        '<g class="rc-ear-r">' +
          '<path d="M128 120 Q125 90 132 73 Q139 58 153 65 Q163 71 154 82 Q144 91 142 103 Q140 113 139 120 Z" fill="' + BODY + '" stroke="' + LINE + '" stroke-width="' + SW + '" stroke-linejoin="round"/>' +
          '<ellipse cx="149" cy="73" rx="5" ry="8.5" fill="' + PINK + '" transform="rotate(42 149 73)"/>' +
        '</g>' +
        '<g class="rc-tail"><circle cx="164" cy="182" r="11" fill="' + POM + '" stroke="' + LINE + '" stroke-width="' + SW + '"/></g>' +
        '<g class="rc-body">' +
          '<ellipse cx="120" cy="160" rx="48" ry="45" fill="' + BODY + '" stroke="' + LINE + '" stroke-width="' + SW + '"/>' +
          '<ellipse cx="120" cy="177" rx="28" ry="22" fill="' + BELLY + '" opacity=".9"/>' +
          '<ellipse cx="96" cy="201" rx="17" ry="8" fill="' + SHADE + '" stroke="' + LINE + '" stroke-width="' + SWS + '"/>' +
          '<ellipse cx="144" cy="201" rx="17" ry="8" fill="' + SHADE + '" stroke="' + LINE + '" stroke-width="' + SWS + '"/>' +
          '<ellipse cx="108" cy="176" rx="7" ry="11" fill="' + BODY + '" stroke="' + LINE + '" stroke-width="' + SWS + '" transform="rotate(-10 108 176)"/>' +
          '<ellipse cx="132" cy="176" rx="7" ry="11" fill="' + BODY + '" stroke="' + LINE + '" stroke-width="' + SWS + '" transform="rotate(10 132 176)"/>' +
          '<g class="rc-eyes">' +
            '<circle cx="106" cy="136" r="8.5" fill="' + INK + '"/>' +
            '<circle cx="134" cy="136" r="8.5" fill="' + INK + '"/>' +
            '<circle cx="109" cy="133" r="3" fill="#FFFFFF"/>' +
            '<circle cx="137" cy="133" r="3" fill="#FFFFFF"/>' +
          '</g>' +
          lid('rc-lid-l', 106, 136, 8.5) +
          lid('rc-lid-r', 134, 136, 8.5) +
          noseY(120, 146, 1) +
          '<path d="M107 161 Q120 171 133 161" fill="none" stroke="' + LINE + '" stroke-width="3" stroke-linecap="round"/>' +
          teeth(120, 160, 8, 5.5) +
          '<ellipse cx="92" cy="148" rx="8" ry="5" fill="' + CHEEK + '" opacity=".8"/>' +
          '<ellipse cx="148" cy="148" rx="8" ry="5" fill="' + CHEEK + '" opacity=".8"/>' +
        '</g>' +
      '</g>';

    return shell("steady", style, inner);
  }

  /* TIRED: осела, уши висят, широкий зевок */

  function tired() {
    var style =
      '.pet-rabbit-cartoon.is-tired .rc-body{transform-box:view-box;transform-origin:120px 206px;animation:rabbit-cartoon-breathe-t 5s ease-in-out infinite}' +
      '.pet-rabbit-cartoon.is-tired .rc-ear-l{transform-box:view-box;transform-origin:98px 140px;animation:rabbit-cartoon-droop-l 5s ease-in-out .25s infinite}' +
      '.pet-rabbit-cartoon.is-tired .rc-ear-r{transform-box:view-box;transform-origin:142px 140px;animation:rabbit-cartoon-droop-r 5s ease-in-out .25s infinite}' +
      '.pet-rabbit-cartoon.is-tired .rc-nose{transform-box:view-box;transform-origin:120px 155px;animation:rabbit-cartoon-sniff-t 2.6s ease-in-out infinite}' +
      '.pet-rabbit-cartoon.is-tired .rc-yawn{transform-box:view-box;transform-origin:120px 173px;animation:rabbit-cartoon-yawn 9s ease-in-out infinite}' +
      '.pet-rabbit-cartoon.is-tired .rc-lid{transform-box:view-box;transform-origin:106px 144px;transform:scaleY(.55);animation:rabbit-cartoon-blink-t 6s linear infinite}' +
      '.pet-rabbit-cartoon.is-tired .rc-lid-r{transform-origin:134px 144px}' +
      '.pet-rabbit-cartoon.is-tired .rc-aura{animation:rabbit-cartoon-glow-t 5s ease-in-out infinite}' +
      '@keyframes rabbit-cartoon-breathe-t{0%,100%{transform:scale(1,1)}50%{transform:scale(1.022,.978)}}' +
      '@keyframes rabbit-cartoon-droop-l{0%,100%{transform:rotate(0)}50%{transform:rotate(3deg)}}' +
      '@keyframes rabbit-cartoon-droop-r{0%,100%{transform:rotate(0)}50%{transform:rotate(-3deg)}}' +
      '@keyframes rabbit-cartoon-sniff-t{0%,100%{transform:scale(1)}50%{transform:scale(1.06)}}' +
      '@keyframes rabbit-cartoon-yawn{0%,74%,96%,100%{transform:scale(.3)}81%,89%{transform:scale(1.45)}}' +
      '@keyframes rabbit-cartoon-blink-t{0%,90%,100%{transform:scaleY(.55)}93%,95%{transform:scaleY(1)}}' +
      '@keyframes rabbit-cartoon-glow-t{0%,100%{opacity:.55}50%{opacity:.75}}';

    var inner =
      '<g class="rc-aura">' +
        '<circle cx="120" cy="152" r="90" fill="#EDF0F8" opacity=".9"/>' +
        '<circle cx="120" cy="152" r="62" fill="#AEBEDD" opacity=".3"/>' +
      '</g>' +
      '<ellipse cx="120" cy="208" rx="54" ry="7" fill="' + INK + '" opacity=".1"/>' +
      '<g class="rc-pet">' +
        '<circle class="rc-tail" cx="168" cy="188" r="10" fill="' + POM + '" stroke="' + LINE + '" stroke-width="' + SWS + '"/>' +
        '<g class="rc-body">' +
          '<ellipse cx="120" cy="172" rx="54" ry="37" fill="' + BODY + '" stroke="' + LINE + '" stroke-width="' + SW + '"/>' +
          '<ellipse cx="120" cy="186" rx="30" ry="17" fill="' + BELLY + '" opacity=".85"/>' +
          '<g class="rc-ear-l">' +
            '<ellipse cx="92" cy="166" rx="9" ry="28" fill="' + BODY + '" stroke="' + LINE + '" stroke-width="' + SWS + '" transform="rotate(18 92 166)"/>' +
            '<ellipse cx="90.5" cy="170" rx="4.2" ry="19" fill="' + PINK + '" opacity=".9" transform="rotate(18 92 166)"/>' +
          '</g>' +
          '<g class="rc-ear-r">' +
            '<ellipse cx="148" cy="166" rx="9" ry="28" fill="' + BODY + '" stroke="' + LINE + '" stroke-width="' + SWS + '" transform="rotate(-18 148 166)"/>' +
            '<ellipse cx="149.5" cy="170" rx="4.2" ry="19" fill="' + PINK + '" opacity=".9" transform="rotate(-18 148 166)"/>' +
          '</g>' +
          '<ellipse cx="93" cy="203" rx="16" ry="7.5" fill="' + SHADE + '" stroke="' + LINE + '" stroke-width="' + SWS + '"/>' +
          '<ellipse cx="147" cy="203" rx="16" ry="7.5" fill="' + SHADE + '" stroke="' + LINE + '" stroke-width="' + SWS + '"/>' +
          '<ellipse cx="107" cy="188" rx="6.5" ry="9.5" fill="' + BODY + '" stroke="' + LINE + '" stroke-width="' + SWS + '" transform="rotate(-10 107 188)"/>' +
          '<ellipse cx="133" cy="188" rx="6.5" ry="9.5" fill="' + BODY + '" stroke="' + LINE + '" stroke-width="' + SWS + '" transform="rotate(10 133 188)"/>' +
          '<g class="rc-eyes">' +
            '<circle cx="106" cy="150" r="8" fill="' + INK + '"/>' +
            '<circle cx="134" cy="150" r="8" fill="' + INK + '"/>' +
            '<circle cx="108.4" cy="148" r="2.2" fill="#FFFFFF" opacity=".9"/>' +
            '<circle cx="136.4" cy="148" r="2.2" fill="#FFFFFF" opacity=".9"/>' +
          '</g>' +
          '<g class="rc-lids">' +
            '<ellipse class="rc-lid rc-lid-l" cx="106" cy="148" rx="9.4" ry="9.6" fill="' + BODY + '"/>' +
            '<ellipse class="rc-lid rc-lid-r" cx="134" cy="148" rx="9.4" ry="9.6" fill="' + BODY + '"/>' +
          '</g>' +
          '<path d="M97 142 Q106 138.5 115 142" fill="none" stroke="' + LINE + '" stroke-width="2.6" stroke-linecap="round"/>' +
          '<path d="M125 142 Q134 138.5 143 142" fill="none" stroke="' + LINE + '" stroke-width="2.6" stroke-linecap="round"/>' +
          noseY(120, 155, 0.9) +
          '<ellipse class="rc-yawn" cx="120" cy="173" rx="6" ry="7.5" fill="' + MOUTH + '" stroke="' + LINE + '" stroke-width="2.2"/>' +
          '<ellipse cx="101" cy="162" rx="6.5" ry="4.2" fill="' + CHEEK + '" opacity=".7"/>' +
          '<ellipse cx="139" cy="162" rx="6.5" ry="4.2" fill="' + CHEEK + '" opacity=".7"/>' +
        '</g>' +
      '</g>';

    return shell("tired", style, inner);
  }

  /* DRAINED: клубочек под пледом, кончики ушей наружу */

  function drained() {
    var style =
      '.pet-rabbit-cartoon.is-drained .rc-body{transform-box:view-box;transform-origin:120px 206px;animation:rabbit-cartoon-breathe-d 7s ease-in-out infinite}' +
      '.pet-rabbit-cartoon.is-drained .rc-blanket{transform-box:view-box;transform-origin:136px 178px;animation:rabbit-cartoon-blanket-d 7s ease-in-out infinite}' +
      '.pet-rabbit-cartoon.is-drained .rc-tips{transform-box:view-box;transform-origin:158px 158px;animation:rabbit-cartoon-tip-twitch 11s ease-in-out infinite}' +
      '.pet-rabbit-cartoon.is-drained .rc-nose{transform-box:view-box;transform-origin:74px 176px;animation:rabbit-cartoon-sniff-d 3.5s ease-in-out infinite}' +
      '.pet-rabbit-cartoon.is-drained .rc-eyes{transform-box:view-box;transform-origin:85px 170px;animation:rabbit-cartoon-peek 9s ease-in-out infinite}' +
      '.pet-rabbit-cartoon.is-drained .rc-z{animation:rabbit-cartoon-zzz 6s ease-in-out infinite;opacity:0}' +
      '.pet-rabbit-cartoon.is-drained .rc-z2{animation-delay:2s}' +
      '.pet-rabbit-cartoon.is-drained .rc-z3{animation-delay:4s}' +
      '@keyframes rabbit-cartoon-breathe-d{0%,100%{transform:scale(1,1)}50%{transform:scale(1.016,.984)}}' +
      '@keyframes rabbit-cartoon-blanket-d{0%,100%{transform:scale(1,1)}50%{transform:scale(1.014,.986)}}' +
      '@keyframes rabbit-cartoon-tip-twitch{0%,92%,100%{transform:rotate(0)}94%{transform:rotate(-6deg)}97%{transform:rotate(3deg)}}' +
      '@keyframes rabbit-cartoon-sniff-d{0%,100%{transform:scale(1)}50%{transform:scale(1.035)}}' +
      '@keyframes rabbit-cartoon-peek{0%,88%,100%{transform:scaleY(1)}91%,94%{transform:scaleY(1.9)}}' +
      '@keyframes rabbit-cartoon-zzz{0%{opacity:0;transform:translateY(5px)}25%{opacity:.9}60%{opacity:.4}100%{opacity:0;transform:translateY(-24px)}}';

    var inner =
      '<g class="rc-aura">' +
        '<circle cx="120" cy="168" r="88" fill="#F0ECF7" opacity=".9"/>' +
        '<circle cx="120" cy="168" r="60" fill="#B3A4D6" opacity=".3"/>' +
      '</g>' +
      '<ellipse cx="122" cy="208" rx="58" ry="7" fill="' + INK + '" opacity=".1"/>' +
      '<g class="rc-pet">' +
        '<g class="rc-body">' +
          '<ellipse cx="128" cy="183" rx="47" ry="24" fill="' + BODY + '" stroke="' + LINE + '" stroke-width="' + SW + '"/>' +
          '<circle cx="86" cy="174" r="24" fill="' + BODY + '" stroke="' + LINE + '" stroke-width="' + SW + '"/>' +
          '<g class="rc-eyes" fill="none" stroke="' + INK + '" stroke-width="3" stroke-linecap="round">' +
            '<path d="M71 170 Q76 174 81 170"/>' +
            '<path d="M90 170 Q95 174 100 170"/>' +
          '</g>' +
          noseY(74, 178, 0.85) +
          '<ellipse cx="65" cy="185" rx="6" ry="4" fill="' + CHEEK + '" opacity=".6"/>' +
          '<ellipse cx="99" cy="185" rx="6" ry="4" fill="' + CHEEK + '" opacity=".6"/>' +
        '</g>' +
        '<circle class="rc-tail" cx="176" cy="191" r="10" fill="' + POM + '" stroke="' + LINE + '" stroke-width="' + SWS + '"/>' +
        '<g class="rc-blanket">' +
          '<path d="M103 157 Q136 144 169 158 L175 192 Q136 203 101 193 Z" fill="' + PLAID + '" stroke="' + LINE + '" stroke-width="' + SW + '" stroke-linejoin="round"/>' +
          '<path d="M108 168 Q138 158 167 168 M106 180 Q138 171 170 180" fill="none" stroke="' + PLAIDL + '" stroke-width="2.6" stroke-linecap="round" opacity=".9"/>' +
        '</g>' +
        '<g class="rc-tips">' +
          '<ellipse cx="160" cy="152" rx="14" ry="6" fill="' + BODY + '" stroke="' + LINE + '" stroke-width="' + SWS + '" transform="rotate(10 160 152)"/>' +
          '<ellipse cx="164" cy="152.5" rx="6.5" ry="2.8" fill="' + PINK + '" transform="rotate(10 160 152)"/>' +
          '<ellipse cx="156" cy="161" rx="13" ry="5.6" fill="' + BODY + '" stroke="' + LINE + '" stroke-width="' + SWS + '" transform="rotate(15 156 161)"/>' +
          '<ellipse cx="160" cy="161.5" rx="6" ry="2.6" fill="' + PINK + '" transform="rotate(15 156 161)"/>' +
        '</g>' +
      '</g>' +
      '<g class="rc-particles" fill="' + ZINK + '" font-family="Nunito, Quicksand, sans-serif" font-weight="800">' +
        '<text class="rc-z rc-z1" x="96" y="142" font-size="15">z</text>' +
        '<text class="rc-z rc-z2" x="109" y="131" font-size="11">z</text>' +
        '<text class="rc-z rc-z3" x="90" y="124" font-size="9">z</text>' +
      '</g>';

    return shell("drained", style, inner);
  }

  window.registerPetStyle({
    petId: "rabbit",
    style: "cartoon",
    render: function (mood) {
      if (mood === "radiant") return radiant();
      if (mood === "steady") return steady();
      if (mood === "tired") return tired();
      return drained();
    }
  });
})();
