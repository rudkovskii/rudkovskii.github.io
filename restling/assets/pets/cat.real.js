/**
 * Mila / Мила — стиль "real" (id: cat). CONTRACT.md v2 + 03-visual-kit.md (pet1).
 * Тёплая энциклопедическая иллюстрация: природный окрас рыжего табби,
 * натуральные пропорции, миндальные глаза (янтарная радужка, вертикальный
 * зрачок), штрихи шерсти + 2 градиента, спокойные позы, сдержанные анимации.
 * Видовые признаки: уши, усы 3+3, хвост с тёмным кончиком, "М" на лбу, полоски.
 */
(function () {
  "use strict";

  var BODY = "#D89E63";   // ginger fur base
  var LIGHT = "#E8BE85";  // fur highlight (gradient top)
  var SHADE = "#BC8146";  // fur shading / tonal strokes
  var STRIPE = "#A26A38"; // tabby stripes
  var DARK = "#7E5630";   // tail tip, ear tips, lid line
  var CREAM = "#F4E4C8";  // muzzle / chest / paw tips
  var EARIN = "#D9A88E";  // inner ear
  var NOSE = "#C67B6F";   // brick-pink nose
  var IRIS = "#B8863B";   // amber iris
  var INK = "#3E3A47";    // pupil / mouth (--ink)
  var WHISK = "#F8F3E9";  // white whiskers
  var MOUTH = "#C87868";  // yawn inner
  var PLAID = "#E9E6FA";  // blanket (--calm-soft)
  var PLAIDL = "#CFC8EE"; // blanket stitches

  var TB = "transform-box:view-box;transform-origin:";
  var REDUCED = "@media (prefers-reduced-motion: reduce){.pet-cat-real *{animation:none !important}}";

  // stroke attribute pack
  function st(c, w) {
    return ' fill="none" stroke="' + c + '" stroke-width="' + w + '" stroke-linecap="round"';
  }
  function sto(c, w, o) { return st(c, w) + ' opacity="' + o + '"'; }

  function glowDef(id, c1, o1, c2, o2) {
    return '<radialGradient id="' + id + '" cx="50%" cy="44%" r="56%">' +
      '<stop offset="0%" stop-color="' + c1 + '" stop-opacity="' + o1 + '"/>' +
      '<stop offset="55%" stop-color="' + c2 + '" stop-opacity="' + o2 + '"/>' +
      '<stop offset="100%" stop-color="' + c2 + '" stop-opacity="0"/>' +
      '</radialGradient>';
  }

  // vertical fur-volume gradient: lit back -> shaded belly
  function furDef(id) {
    return '<linearGradient id="' + id + '" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0%" stop-color="' + LIGHT + '"/>' +
      '<stop offset="48%" stop-color="' + BODY + '"/>' +
      '<stop offset="100%" stop-color="' + SHADE + '"/>' +
      '</linearGradient>';
  }

  function shell(mood, style, defs, inner) {
    return '<svg viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg" ' +
      'class="pet-svg pet-cat pet-cat-real is-' + mood + '" role="img" aria-label="Mila">' +
      '<style>' + style + REDUCED + '</style>' +
      '<defs>' + defs + '</defs>' + inner + '</svg>';
  }

  // ear: outer + inner + optional dark tip
  function ear(o, i, t) {
    return '<path d="' + o + '" fill="' + BODY + '" stroke="' + SHADE + '" stroke-width="1"/>' +
      '<path d="' + i + '" fill="' + EARIN + '"/>' +
      (t ? '<path d="' + t + '" fill="' + DARK + '"/>' : '');
  }

  // tabby 'M' forehead mark
  function tabbyM(x, y, w) {
    return '<path d="M' + x + ' ' + (y + 1.5) + ' l2.6 8 M' + (x + 7) + ' ' + y + ' v10 M' + (x + 14) + ' ' + (y + 1.5) + ' l-2.6 8"' + st(STRIPE, w) + '/>';
  }

  // realistic almond eye: amber iris, vertical pupil, highlight, upper-lid line
  function eye(cx, cy) {
    return '<ellipse cx="' + cx + '" cy="' + cy + '" rx="4.6" ry="4.1" fill="' + IRIS + '"/>' +
      '<ellipse cx="' + cx + '" cy="' + cy + '" rx="1.8" ry="3.3" fill="' + INK + '"/>' +
      '<circle cx="' + (cx + 1.5) + '" cy="' + (cy - 1.6) + '" r="1.1" fill="#FFFFFF" opacity=".95"/>' +
      '<circle cx="' + (cx - 1.4) + '" cy="' + (cy + 1.8) + '" r=".6" fill="#FFFFFF" opacity=".55"/>' +
      '<path d="M' + (cx - 5.4) + ' ' + (cy - 1.4) + ' Q' + cx + ' ' + (cy - 5.6) + ' ' + (cx + 5.4) + ' ' + (cy - 1.4) + '"' + st(DARK, 1.4) + '/>';
  }

  // eyelid closing from the top (origin set per-mood at cy-5)
  function lid(cls, cx, cy) {
    return '<ellipse class="crl-lid ' + cls + '" cx="' + cx + '" cy="' + cy + '" rx="5.6" ry="5.2" fill="' + BODY + '"/>';
  }

  function whiskers(lines, w) {
    return '<g' + st(WHISK, w) + '>' + lines + '</g>';
  }

  /* ---- RADIANT: sitting tall and alert, tail up, sparks, ear flick ---- */

  function radiant() {
    var R = ".pet-cat-real.is-radiant ";
    var style =
      R + ".crl-pet{" + TB + "120px 200px;animation:cat-real-breathe-r 2.2s ease-in-out infinite}" +
      R + ".crl-tail{" + TB + "150px 184px;animation:cat-real-wag 2.2s ease-in-out infinite}" +
      R + ".crl-tailtip{" + TB + "178px 116px;animation:cat-real-flick 2.2s ease-in-out infinite}" +
      R + ".crl-earR{" + TB + "126px 60px;animation:cat-real-earflick 6.6s ease-in-out infinite}" +
      R + ".crl-aura{animation:cat-real-glow 2.2s ease-in-out infinite}" +
      R + ".crl-lid{" + TB + "99px 82px;transform:scaleY(0);animation:cat-real-blink 4.6s linear infinite}" +
      R + ".crl-lid-r{transform-origin:121px 82px}" +
      R + ".crl-whiskers{" + TB + "110px 100px;animation:cat-real-whisk 2.2s ease-in-out infinite}" +
      R + ".crl-spark{" + TB + "64px 58px;animation:cat-real-twinkle 1.9s ease-in-out infinite}" +
      R + ".crl-sp2{transform-origin:182px 52px;animation-delay:.6s}" +
      R + ".crl-sp3{transform-origin:190px 102px;animation-delay:1.2s}" +
      "@keyframes cat-real-breathe-r{0%,100%{transform:scale(1,1)}50%{transform:scale(1.018,.982)}}" +
      "@keyframes cat-real-wag{0%,100%{transform:rotate(-3deg)}50%{transform:rotate(4deg)}}" +
      "@keyframes cat-real-flick{0%,100%{transform:rotate(-4deg)}50%{transform:rotate(8deg)}}" +
      "@keyframes cat-real-earflick{0%,86%,100%{transform:rotate(0deg)}89%{transform:rotate(-12deg)}93%{transform:rotate(3deg)}96%{transform:rotate(0deg)}}" +
      "@keyframes cat-real-glow{0%,100%{opacity:.75}50%{opacity:1}}" +
      "@keyframes cat-real-blink{0%,92%,100%{transform:scaleY(0)}94.5%,96.5%{transform:scaleY(1)}}" +
      "@keyframes cat-real-whisk{0%,100%{transform:rotate(0deg)}50%{transform:rotate(.8deg)}}" +
      "@keyframes cat-real-twinkle{0%,100%{opacity:.15;transform:scale(.5)}50%{opacity:1;transform:scale(1)}}";

    var defs = glowDef("cat-real-radiant-glow", "#FFDF9E", ".85", "#FFF3D9", ".5") +
      furDef("cat-real-radiant-fur");

    var star = 'M0 -5 L1.4 -1.4 L5 0 L1.4 1.4 L0 5 L-1.4 1.4 L-5 0 L-1.4 -1.4 Z';

    var inner =
      '<g class="crl-aura aura"><circle cx="120" cy="128" r="92" fill="url(#cat-real-radiant-glow)"/></g>' +
      '<ellipse cx="122" cy="202" rx="42" ry="6" fill="' + INK + '" opacity=".07"/>' +
      '<g class="crl-pet">' +
        // tail raised, tabby rings + dark tip
        '<g class="crl-tail extras">' +
          '<path d="M150 184 Q186 162 180 116 Q178 104 170 100"' + st(BODY, 10) + '/>' +
          '<path d="M170 156 q8 -3 11 -8 M177 134 q7 -3 8 -8"' + st(STRIPE, 3.5) + '/>' +
          '<g class="crl-tailtip"><path d="M178 118 Q176 105 168 101"' + st(DARK, 10) + '/></g>' +
        '</g>' +
        '<g class="body">' +
          '<ellipse cx="142" cy="168" rx="34" ry="31" fill="url(#cat-real-radiant-fur)"/>' +
          '<path d="M149 145 q7 10 5 21 M160 151 q5 9 3 18 M138 144 q6 10 5 21"' + st(STRIPE, 3.4) + '/>' +
          '<ellipse cx="156" cy="196" rx="11" ry="5.5" fill="' + BODY + '" stroke="' + SHADE + '" stroke-width="1"/>' +
          '<ellipse cx="110" cy="148" rx="29" ry="50" fill="url(#cat-real-radiant-fur)"/>' +
          '<path d="M126 122 q8 6 9 14 M129 141 q6 6 7 13"' + st(STRIPE, 3.2) + '/>' +
          '<ellipse cx="107" cy="146" rx="12" ry="19" fill="' + CREAM + '" opacity=".85"/>' +
          '<path d="M100 160 L97 193"' + st(BODY, 12) + '/>' +
          '<path d="M122 162 L125 193"' + st(BODY, 12) + '/>' +
          '<ellipse cx="96" cy="196" rx="7.5" ry="4.5" fill="' + CREAM + '" stroke="' + SHADE + '" stroke-width=".8"/>' +
          '<ellipse cx="126" cy="196" rx="7.5" ry="4.5" fill="' + CREAM + '" stroke="' + SHADE + '" stroke-width=".8"/>' +
          // fur texture strokes
          '<path d="M100 136 l-2 6 M109 140 l-2 6 M117 135 l-2 6 M103 182 l-1 5 M131 168 l-2 6 M148 182 l-2 5 M157 172 l-2 6"' + sto(SHADE, 1, ".45") + '/>' +
        '</g>' +
        '<g class="head">' +
          ear("M86 72 L83 40 L110 58 Z", "M89 65 L87 48 L103 58 Z", "M85.5 47 L83 40 L90 44.5 Z") +
          '<g class="crl-earR">' + ear("M134 72 L139 40 L112 58 Z", "M131 65 L134 48 L118 58 Z", "M136.5 47 L139 40 L132 44.5 Z") + '</g>' +
          '<ellipse cx="110" cy="86" rx="27" ry="24" fill="url(#cat-real-radiant-fur)"/>' +
          // cheek fur tufts
          '<path d="M85 90 l-6 2 6 2 -5 3 6 2 M135 90 l6 2 -6 2 5 3 -6 2"' + sto(SHADE, 1.2, ".6") + '/>' +
          tabbyM(103, 64, 2.4) +
          '<path d="M92 68 q-3 6 -2 10 M128 68 q3 6 2 10"' + st(STRIPE, 2.2) + '/>' +
          '<ellipse cx="110" cy="99" rx="12" ry="8.5" fill="' + CREAM + '"/>' +
          '<g class="eyes">' + eye(99, 87) + eye(121, 87) + '</g>' +
          '<g class="eyelids">' + lid("crl-lid-l", 99, 87) + lid("crl-lid-r", 121, 87) + '</g>' +
          '<path d="M106.8 96.4 L113.2 96.4 L110 100.6 Z" fill="' + NOSE + '"/>' +
          '<g class="mouth">' +
            '<path d="M110 100.6 L110 103"' + st(DARK, 1.3) + '/>' +
            '<path d="M104 103.2 Q107 106.4 110 103.2 Q113 106.4 116 103.2"' + st(DARK, 1.4) + '/>' +
          '</g>' +
          '<g class="crl-whiskers">' + whiskers(
            '<line x1="87" y1="96" x2="64" y2="91"/><line x1="86" y1="100" x2="62" y2="100"/><line x1="87" y1="104" x2="65" y2="110"/>' +
            '<line x1="133" y1="96" x2="156" y2="91"/><line x1="134" y1="100" x2="158" y2="100"/><line x1="133" y1="104" x2="155" y2="110"/>', 1.3) + '</g>' +
        '</g>' +
      '</g>' +
      '<g class="particles" fill="#F5A623">' +
        '<g class="crl-spark crl-sp1"><path transform="translate(64,58)" d="' + star + '"/></g>' +
        '<g class="crl-spark crl-sp2"><path transform="translate(182,52) scale(.8)" d="' + star + '"/></g>' +
        '<g class="crl-spark crl-sp3"><path transform="translate(190,102) scale(.7)" d="' + star + '"/></g>' +
      '</g>';

    return shell("radiant", style, defs, inner);
  }

  /* ---- STEADY: classic loaf, paws tucked, tail wrapped, slow blink ---- */

  function steady() {
    var R = ".pet-cat-real.is-steady ";
    var style =
      R + ".crl-pet{" + TB + "120px 200px;animation:cat-real-breathe-s 3.5s ease-in-out infinite}" +
      R + ".crl-tailtip{" + TB + "112px 199px;animation:cat-real-tip-s 3.5s ease-in-out infinite}" +
      R + ".crl-earL{" + TB + "86px 92px;animation:cat-real-ear-s 9s ease-in-out infinite}" +
      R + ".crl-lid{" + TB + "88px 114px;transform:scaleY(.15);animation:cat-real-blink-s 5.4s linear infinite}" +
      R + ".crl-lid-r{transform-origin:108px 114px}" +
      "@keyframes cat-real-breathe-s{0%,100%{transform:scale(1)}50%{transform:scale(1.016,.984)}}" +
      "@keyframes cat-real-tip-s{0%,100%{transform:rotate(0deg)}50%{transform:rotate(-7deg)}}" +
      "@keyframes cat-real-ear-s{0%,90%,100%{transform:rotate(0deg)}93%{transform:rotate(-8deg)}96%{transform:rotate(0deg)}}" +
      "@keyframes cat-real-blink-s{0%,93%,100%{transform:scaleY(.15)}95.5%,97.5%{transform:scaleY(1)}}";

    var defs = glowDef("cat-real-steady-glow", "#BFE4CD", ".75", "#E8F3EA", ".45") +
      furDef("cat-real-steady-fur");

    var inner =
      '<g class="aura"><circle cx="120" cy="150" r="88" fill="url(#cat-real-steady-glow)"/></g>' +
      '<ellipse cx="120" cy="204" rx="50" ry="6" fill="' + INK + '" opacity=".07"/>' +
      '<g class="crl-pet">' +
        '<g class="body">' +
          '<ellipse cx="124" cy="162" rx="52" ry="40" fill="url(#cat-real-steady-fur)"/>' +
          // transverse mackerel back stripes + flank bars
          '<path d="M112 126 q12 -4 24 -1 M126 137 q12 -3 22 2 M138 150 q10 -2 18 4 M148 165 q8 0 14 5"' + st(STRIPE, 3.6) + '/>' +
          '<path d="M158 178 q4 5 2 10 M167 170 q4 5 3 10"' + st(STRIPE, 3) + '/>' +
          '<ellipse cx="104" cy="198" rx="9" ry="4.5" fill="' + CREAM + '" stroke="' + SHADE + '" stroke-width=".8"/>' +
          '<ellipse cx="126" cy="198" rx="9" ry="4.5" fill="' + CREAM + '" stroke="' + SHADE + '" stroke-width=".8"/>' +
          '<path d="M104 150 l-2 6 M118 158 l-2 6 M138 182 l-2 5 M152 186 l-2 5 M96 172 l-1 5"' + sto(SHADE, 1, ".45") + '/>' +
        '</g>' +
        '<g class="head">' +
          '<g class="crl-earL">' + ear("M78 104 L74 76 L98 92 Z", "M81 98 L79 83 L93 92 Z", "M76.5 82 L74 76 L80.5 80 Z") + '</g>' +
          ear("M118 104 L124 76 L100 92 Z", "M115 98 L117 83 L103 92 Z", "M121.5 82 L124 76 L117.5 80 Z") +
          '<ellipse cx="98" cy="118" rx="24" ry="21.5" fill="url(#cat-real-steady-fur)"/>' +
          '<path d="M76 122 l-6 2 6 2 -5 3 6 2 M120 122 l6 2 -6 2 5 3 -6 2"' + sto(SHADE, 1.1, ".6") + '/>' +
          tabbyM(91, 98, 2.2) +
          '<path d="M82 102 q-3 5 -2 9 M114 102 q3 5 2 9"' + st(STRIPE, 2) + '/>' +
          '<ellipse cx="98" cy="130" rx="11" ry="7.5" fill="' + CREAM + '"/>' +
          '<g class="eyes">' + eye(88, 119) + eye(108, 119) + '</g>' +
          '<g class="eyelids">' + lid("crl-lid-l", 88, 119) + lid("crl-lid-r", 108, 119) + '</g>' +
          '<path d="M95.2 126.8 L100.8 126.8 L98 130.6 Z" fill="' + NOSE + '"/>' +
          '<g class="mouth">' +
            '<path d="M98 130.6 L98 132.8"' + st(DARK, 1.2) + '/>' +
            '<path d="M92.6 133 Q95.3 135.8 98 133 Q100.7 135.8 103.4 133"' + st(DARK, 1.3) + '/>' +
          '</g>' +
          whiskers(
            '<line x1="78" y1="127" x2="57" y2="123"/><line x1="77" y1="131" x2="55" y2="132"/><line x1="78" y1="135" x2="58" y2="141"/>' +
            '<line x1="118" y1="127" x2="139" y2="123"/><line x1="119" y1="131" x2="141" y2="132"/><line x1="118" y1="135" x2="138" y2="141"/>', 1.2) +
        '</g>' +
        // tail wrapped around the front, rings + dark tip sways
        '<g class="crl-tail extras">' +
          '<path d="M168 172 Q190 186 176 196 Q152 203 118 200 Q106 199 100 196"' + st(BODY, 9) + '/>' +
          '<path d="M166 194 q-2 4 -6 5 M146 200 q-1 3 -5 4"' + st(STRIPE, 3) + '/>' +
          '<g class="crl-tailtip"><path d="M114 200.3 Q104 199.8 98 196.3"' + st(DARK, 9) + '/></g>' +
        '</g>' +
      '</g>';

    return shell("steady", style, defs, inner);
  }

  /* ---- TIRED: lying low, forelegs stretched, half-closed lids, slow yawn ---- */

  function tired() {
    var R = ".pet-cat-real.is-tired ";
    var style =
      R + ".crl-pet{" + TB + "120px 200px;animation:cat-real-breathe-t 5s ease-in-out infinite}" +
      R + ".crl-tailtip{" + TB + "180px 201px;animation:cat-real-twitch-t 9s ease-in-out infinite}" +
      R + ".crl-lid{" + TB + "88px 137px;transform:scaleY(.5);animation:cat-real-blink-t 6.5s linear infinite}" +
      R + ".crl-lid-r{transform-origin:108px 137px}" +
      R + ".crl-yawn{" + TB + "98px 155px;transform:scale(1,.12);animation:cat-real-yawn 7.5s ease-in-out infinite}" +
      "@keyframes cat-real-breathe-t{0%,100%{transform:scale(1)}50%{transform:scale(1.012,.988)}}" +
      "@keyframes cat-real-twitch-t{0%,88%,100%{transform:rotate(0deg)}91%{transform:rotate(-12deg)}94%{transform:rotate(5deg)}97%{transform:rotate(0deg)}}" +
      "@keyframes cat-real-blink-t{0%,88%,100%{transform:scaleY(.5)}91.5%,93%{transform:scaleY(1)}}" +
      "@keyframes cat-real-yawn{0%,54%,100%{transform:scale(1,.12)}62%,76%{transform:scale(1.08,1)}86%{transform:scale(1,.12)}}";

    var defs = glowDef("cat-real-tired-glow", "#D9E1F1", ".6", "#EDF0F8", ".38") +
      furDef("cat-real-tired-fur");

    var inner =
      '<g class="aura"><circle cx="120" cy="156" r="86" fill="url(#cat-real-tired-glow)"/></g>' +
      '<ellipse cx="122" cy="204" rx="56" ry="6" fill="' + INK + '" opacity=".06"/>' +
      '<g class="crl-pet">' +
        '<g class="body">' +
          '<ellipse cx="128" cy="176" rx="56" ry="27" fill="url(#cat-real-tired-fur)"/>' +
          '<path d="M122 152 q13 -3 25 1 M138 162 q11 -2 20 3 M152 174 q8 0 14 4"' + st(STRIPE, 3.4) + '/>' +
          '<path d="M170 186 q3 5 1 9"' + st(STRIPE, 2.8) + '/>' +
          // forelegs stretched forward
          '<path d="M96 184 L73 193"' + st(BODY, 11) + '/>' +
          '<path d="M106 190 L80 199"' + st(BODY, 11) + '/>' +
          '<ellipse cx="71" cy="194" rx="7" ry="4.2" fill="' + CREAM + '" stroke="' + SHADE + '" stroke-width=".8"/>' +
          '<ellipse cx="78" cy="200" rx="7" ry="4.2" fill="' + CREAM + '" stroke="' + SHADE + '" stroke-width=".8"/>' +
          '<path d="M120 186 l-2 5 M140 190 l-2 5 M156 184 l-2 5 M108 176 l-1 5"' + sto(SHADE, 1, ".45") + '/>' +
        '</g>' +
        '<g class="head">' +
          ear("M80 130 L76 104 L99 118 Z", "M83 124 L81 110 L94 118 Z", "M78.5 110 L76 104 L82.5 108 Z") +
          // right ear rotated back (tired signal)
          '<path d="M114 126 L128 105 L136 128 Z" fill="' + BODY + '" stroke="' + SHADE + '" stroke-width="1"/>' +
          '<path d="M128 105 L140 114 L133 125 Z" fill="' + SHADE + '"/>' +
          '<ellipse cx="98" cy="140" rx="23" ry="20" fill="url(#cat-real-tired-fur)"/>' +
          '<path d="M77 144 l-6 2 6 2 -5 3 6 2"' + sto(SHADE, 1.1, ".6") + '/>' +
          tabbyM(91, 122, 2.1) +
          '<ellipse cx="98" cy="152" rx="10.5" ry="7" fill="' + CREAM + '"/>' +
          '<g class="eyes">' + eye(88, 142) + eye(108, 142) + '</g>' +
          '<g class="eyelids">' + lid("crl-lid-l", 88, 142) + lid("crl-lid-r", 108, 142) + '</g>' +
          '<path d="M95.4 149 L100.6 149 L98 152.6 Z" fill="' + NOSE + '"/>' +
          // slow quiet yawn
          '<g class="crl-yawn mouth">' +
            '<ellipse cx="98" cy="159" rx="4.6" ry="6" fill="' + MOUTH + '"/>' +
            '<ellipse cx="98" cy="161.5" rx="2.4" ry="2.6" fill="' + EARIN + '"/>' +
          '</g>' +
          whiskers(
            '<line x1="79" y1="149" x2="59" y2="150"/><line x1="78" y1="153" x2="58" y2="158"/><line x1="79" y1="157" x2="61" y2="165"/>' +
            '<line x1="117" y1="149" x2="137" y2="150"/><line x1="118" y1="153" x2="138" y2="158"/><line x1="117" y1="157" x2="135" y2="165"/>', 1.2) +
        '</g>' +
        // tail flat on the ground, rare tip twitch
        '<g class="crl-tail extras">' +
          '<path d="M180 188 Q202 191 197 198 Q188 202 172 201"' + st(BODY, 8) + '/>' +
          '<path d="M194 191 q-1 4 -4 6"' + st(STRIPE, 2.8) + '/>' +
          '<g class="crl-tailtip"><path d="M178 201.3 Q168 201.3 162 199.3"' + st(DARK, 8) + '/></g>' +
        '</g>' +
      '</g>';

    return shell("tired", style, defs, inner);
  }

  /* ---- DRAINED: curled nose-to-tail under blanket, slit eyes, z's ---- */

  function drained() {
    var R = ".pet-cat-real.is-drained ";
    var style =
      R + ".crl-body{" + TB + "120px 200px;animation:cat-real-breathe-d 7s ease-in-out infinite}" +
      R + ".crl-blanket{" + TB + "134px 198px;animation:cat-real-blanket 7s ease-in-out infinite}" +
      R + ".crl-eyes{" + TB + "91px 168px;animation:cat-real-peek 11s linear infinite}" +
      R + ".crl-z{opacity:0;animation:cat-real-zfloat 7s ease-in-out infinite}" +
      R + ".crl-z2{animation-delay:2.3s}" +
      R + ".crl-z3{animation-delay:4.6s}" +
      "@keyframes cat-real-breathe-d{0%,100%{transform:scale(1)}50%{transform:scale(1.01,1.03)}}" +
      "@keyframes cat-real-blanket{0%,100%{transform:translateY(0)}50%{transform:translateY(-2px)}}" +
      "@keyframes cat-real-peek{0%,91%,100%{transform:scaleY(1)}93.5%,95%{transform:scaleY(2.2)}}" +
      "@keyframes cat-real-zfloat{0%{opacity:0;transform:translateY(6px)}14%{opacity:.85}55%,100%{opacity:0;transform:translateY(-14px)}}";

    var defs = glowDef("cat-real-drained-glow", "#DFD5F0", ".55", "#F0ECF7", ".32") +
      furDef("cat-real-drained-fur");

    var zPath = 'M0 0 h7 l-7 7 h7';

    var inner =
      '<g class="aura"><circle cx="120" cy="168" r="82" fill="url(#cat-real-drained-glow)"/></g>' +
      '<ellipse cx="124" cy="204" rx="44" ry="5.5" fill="' + INK + '" opacity=".07"/>' +
      '<g class="crl-pet">' +
        '<g class="crl-body body">' +
          // curled crescent, nose toward tail
          '<ellipse cx="118" cy="178" rx="37" ry="25" fill="url(#cat-real-drained-fur)"/>' +
          '<path d="M116 158 q10 -2 18 2 M132 166 q7 0 12 4"' + st(STRIPE, 3) + '/>' +
          '<path d="M100 194 l-1 4 M116 197 l-1 4"' + sto(SHADE, 1, ".45") + '/>' +
          ear("M78 162 L72 140 L94 154 Z", "M80.5 157 L77 145 L89 153 Z", "M74.5 146 L72 140 L78.5 144 Z") +
          '<ellipse cx="92" cy="172" rx="18" ry="16" fill="' + BODY + '"/>' +
          '<path d="M86 158 L88 165 M94 157 L94 164.5"' + st(STRIPE, 1.8) + '/>' +
          '<ellipse cx="87" cy="178" rx="7.5" ry="5.5" fill="' + CREAM + '" opacity=".9"/>' +
          // slit eyes, rare half-peek
          '<g class="crl-eyes eyes"' + st(INK, 1.9) + '>' +
            '<path d="M81 170 q4 3 8 0"/>' +
            '<path d="M93 167 q4 3 8 0"/>' +
          '</g>' +
          '<path d="M84.4 174.6 L89.6 174.6 L87 178 Z" fill="' + NOSE + '"/>' +
          '<path d="M84 181 q3 2 6 0"' + sto(INK, 1.5, ".5") + '/>' +
          whiskers('<line x1="79" y1="173" x2="66" y2="170"/><line x1="78" y1="177" x2="65" y2="178"/><line x1="79" y1="181" x2="67" y2="186"/>', 1.1) +
        '</g>' +
        // knitted blanket draped over the back, breathes with the cat
        '<g class="crl-blanket extras">' +
          '<path d="M104 156 Q128 142 150 154 Q162 163 163 182 Q163 196 149 198 L116 199 Q106 199 105 189 Q103 170 104 156 Z" fill="' + PLAID + '" stroke="' + PLAIDL + '" stroke-width="1.4" stroke-linejoin="round"/>' +
          '<path d="M114 166 l4 4 4 -4 M130 162 l4 4 4 -4 M145 167 l4 4 4 -4 M112 182 l4 4 4 -4 M128 180 l4 4 4 -4 M143 183 l4 4 4 -4 M122 192 l4 4 4 -4 M138 191 l4 4 4 -4"' + st(PLAIDL, 1.3) + '/>' +
          '<path d="M106 160 Q109 178 107 196" fill="none" stroke="' + PLAIDL + '" stroke-width="1.3"/>' +
          // right ear peeking above the blanket edge, next to the head
          ear("M104 152 L110 131 L126 148 Z", "M108 146 L111 136 L119 144 Z", "M108.8 137.5 L110 131 L115 136 Z") +
          // tail over the blanket: ring + dark tip near the face
          '<path d="M138 160 Q158 152 161 167 Q162 177 154 179"' + st(BODY, 7) + '/>' +
          '<path d="M157 160 q3 3 3 7"' + st(STRIPE, 2.6) + '/>' +
          '<path d="M160.6 171 Q160.6 178 152.5 180.3"' + st(DARK, 7) + '/>' +
        '</g>' +
      '</g>' +
      '<g class="particles"' + st("#9C8BC0", 2.2) + ' stroke-linejoin="round">' +
        '<g class="crl-z crl-z1"><path transform="translate(80,158) scale(.7)" d="' + zPath + '"/></g>' +
        '<g class="crl-z crl-z2"><path transform="translate(72,142) scale(.9)" d="' + zPath + '"/></g>' +
        '<g class="crl-z crl-z3"><path transform="translate(64,125) scale(1.1)" d="' + zPath + '"/></g>' +
      '</g>';

    return shell("drained", style, defs, inner);
  }

  window.registerPetStyle({
    petId: "cat",
    style: "real",
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
