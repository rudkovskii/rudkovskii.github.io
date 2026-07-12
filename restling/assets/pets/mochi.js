/**
 * Mochi / Мочи — pet1 (предвыбран). Круглый кот-булочка, архетип «уют».
 * Модуль питомца по assets/pets/CONTRACT.md.
 * Уникальный канал состояния — форма тела (squash):
 *   radiant — стоит на задних лапках, хвост трубой, искры у ушей;
 *   steady  — сидячая «булка», хвост обёрнут вокруг;
 *   tired   — растёкся в овал, правое ухо согнуто, зевает;
 *   drained — клубок под вязаным пледом, «z» из носа.
 */
(function () {
  "use strict";

  // Палитра (визуальный кит, раздел 3 / pet1 + токены кита)
  var BODY = "#F6D8B8";   // кремово-персиковый
  var BELLY = "#FBEDDA";  // светлый животик
  var CARA = "#E8B48C";   // ушки/хвост — карамель
  var CARAD = "#D69B72";  // карамель темнее (нос, сгиб уха) — тональная, не чёрная
  var CHEEK = "#F5A88E";  // щёчки / внутреннее ухо
  var INK = "#3E3A47";    // глаза (--ink, не чёрный)
  var WHISK = "#E0BC96";  // усы — тональные
  var TONE = "#EAC59B";   // тональная обводка лапок (~15% темнее тела)
  var MOUTH = "#E88A76";  // ротик тёплый коралловый
  var PLAID = "#E9E6FA";  // вязаный плед (--calm-soft)
  var PLAIDL = "#CFC8EE"; // петли пледа

  var REDUCED = "@media (prefers-reduced-motion: reduce){.pet-mochi *{animation:none !important}}";

  function glowDef(id, c1, o1, c2, o2) {
    return '<radialGradient id="' + id + '" cx="50%" cy="44%" r="56%">' +
      '<stop offset="0%" stop-color="' + c1 + '" stop-opacity="' + o1 + '"/>' +
      '<stop offset="55%" stop-color="' + c2 + '" stop-opacity="' + o2 + '"/>' +
      '<stop offset="100%" stop-color="' + c2 + '" stop-opacity="0"/>' +
      '</radialGradient>';
  }

  function shell(mood, style, defs, inner) {
    return '<svg viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg" ' +
      'class="pet-svg pet-mochi is-' + mood + '" role="img" aria-label="Mochi">' +
      '<style>' + style + REDUCED + '</style>' +
      '<defs>' + defs + '</defs>' + inner + '</svg>';
  }

  /* ---------------- RADIANT: стоит на задних лапках, искры ---------------- */

  function radiant() {
    var style =
      '.pet-mochi.is-radiant .mochi-pet{transform-box:view-box;transform-origin:120px 200px;animation:mochi-hop 3.8s ease-in-out infinite}' +
      '.pet-mochi.is-radiant .mochi-body{transform-box:view-box;transform-origin:120px 200px;animation:mochi-breathe-r 2.2s ease-in-out infinite}' +
      '.pet-mochi.is-radiant .mochi-tail{transform-box:view-box;transform-origin:150px 184px;animation:mochi-wag 2.2s ease-in-out infinite}' +
      '.pet-mochi.is-radiant .mochi-aura{animation:mochi-glow 2.2s ease-in-out infinite}' +
      '.pet-mochi.is-radiant .mochi-lid{transform-box:view-box;transform:scaleY(0);animation:mochi-blink 4.4s linear infinite}' +
      '.pet-mochi.is-radiant .mochi-lid-l{transform-origin:104px 111px}' +
      '.pet-mochi.is-radiant .mochi-lid-r{transform-origin:136px 111px}' +
      '.pet-mochi.is-radiant .mochi-spark{transform-box:view-box;animation:mochi-twinkle 1.9s ease-in-out infinite}' +
      '.pet-mochi.is-radiant .mochi-sp1{transform-origin:66px 64px}' +
      '.pet-mochi.is-radiant .mochi-sp2{transform-origin:176px 56px;animation-delay:.5s}' +
      '.pet-mochi.is-radiant .mochi-sp3{transform-origin:58px 104px;animation-delay:1s}' +
      '.pet-mochi.is-radiant .mochi-sp4{transform-origin:184px 100px;animation-delay:1.4s}' +
      '@keyframes mochi-hop{0%,52%,100%{transform:translateY(0) scale(1,1)}58%{transform:translateY(0) scale(1.05,.93)}66%{transform:translateY(-11px) scale(.97,1.05)}74%{transform:translateY(0) scale(1.07,.91)}82%{transform:translateY(0) scale(1,1)}}' +
      '@keyframes mochi-breathe-r{0%,100%{transform:scale(1,1)}50%{transform:scale(1.03,.97)}}' +
      '@keyframes mochi-wag{0%,100%{transform:rotate(-4deg)}50%{transform:rotate(6deg)}}' +
      '@keyframes mochi-glow{0%,100%{opacity:.75}50%{opacity:1}}' +
      '@keyframes mochi-blink{0%,92%,100%{transform:scaleY(0)}94.5%,96.5%{transform:scaleY(1)}}' +
      '@keyframes mochi-twinkle{0%,100%{opacity:.15;transform:scale(.5)}50%{opacity:1;transform:scale(1)}}';

    var defs = glowDef("mochi-radiant-glow", "#FFDF9E", ".9", "#FFF3D9", ".55");

    var star = 'M0 -6 L1.7 -1.7 L6 0 L1.7 1.7 L0 6 L-1.7 1.7 L-6 0 L-1.7 -1.7 Z';

    var inner =
      '<g class="mochi-aura"><circle cx="120" cy="130" r="94" fill="url(#mochi-radiant-glow)"/></g>' +
      '<ellipse class="mochi-shadow" cx="120" cy="203" rx="38" ry="6" fill="' + INK + '" opacity=".07"/>' +
      '<g class="mochi-pet">' +
        // хвост трубой — за телом
        '<g class="mochi-tail"><path d="M150 184 Q184 172 177 130 Q174 112 163 116" fill="none" stroke="' + CARA + '" stroke-width="11" stroke-linecap="round"/></g>' +
        '<g class="mochi-body">' +
          // ушки (за телом)
          '<path d="M98 98 L92 60 L119 85 Z" fill="' + CARA + '" stroke="' + CARA + '" stroke-width="7" stroke-linejoin="round"/>' +
          '<path d="M142 98 L148 60 L121 85 Z" fill="' + CARA + '" stroke="' + CARA + '" stroke-width="7" stroke-linejoin="round"/>' +
          '<path d="M97 89 L94 67 L110 82 Z" fill="' + CHEEK + '" opacity=".85"/>' +
          '<path d="M143 89 L146 67 L130 82 Z" fill="' + CHEEK + '" opacity=".85"/>' +
          // поднятые передние лапки (за телом)
          '<ellipse cx="80" cy="126" rx="9" ry="15" fill="' + BODY + '" stroke="' + TONE + '" stroke-width="1.5" transform="rotate(-24 80 126)"/>' +
          '<ellipse cx="160" cy="126" rx="9" ry="15" fill="' + BODY + '" stroke="' + TONE + '" stroke-width="1.5" transform="rotate(24 160 126)"/>' +
          // тело — вытянутое яичко «встал на носочки»
          '<ellipse cx="120" cy="142" rx="43" ry="58" fill="' + BODY + '"/>' +
          '<ellipse cx="120" cy="162" rx="27" ry="30" fill="' + BELLY + '" opacity=".8"/>' +
          // задние лапки
          '<ellipse cx="102" cy="197" rx="11" ry="6.5" fill="' + BODY + '" stroke="' + TONE + '" stroke-width="1.5"/>' +
          '<ellipse cx="138" cy="197" rx="11" ry="6.5" fill="' + BODY + '" stroke="' + TONE + '" stroke-width="1.5"/>' +
          // мордочка
          '<g class="mochi-eyes">' +
            '<circle cx="104" cy="118" r="6.5" fill="' + INK + '"/>' +
            '<circle cx="136" cy="118" r="6.5" fill="' + INK + '"/>' +
            '<circle cx="106.5" cy="115.5" r="2.4" fill="#FFFFFF"/>' +
            '<circle cx="138.5" cy="115.5" r="2.4" fill="#FFFFFF"/>' +
            '<circle cx="102" cy="121" r="1.2" fill="#FFFFFF" opacity=".8"/>' +
            '<circle cx="134" cy="121" r="1.2" fill="#FFFFFF" opacity=".8"/>' +
          '</g>' +
          '<g class="mochi-lids">' +
            '<ellipse class="mochi-lid mochi-lid-l" cx="104" cy="118" rx="7.2" ry="7.2" fill="' + BODY + '"/>' +
            '<ellipse class="mochi-lid mochi-lid-r" cx="136" cy="118" rx="7.2" ry="7.2" fill="' + BODY + '"/>' +
          '</g>' +
          '<path d="M117 130 L123 130 L120 134 Z" fill="' + CARAD + '"/>' +
          '<g class="mochi-mouth">' +
            '<path d="M112 137 Q120 148 128 137 Z" fill="' + MOUTH + '"/>' +
            '<ellipse cx="120" cy="141.5" rx="3" ry="2" fill="' + CHEEK + '"/>' +
          '</g>' +
          '<ellipse cx="90" cy="130" rx="7.5" ry="5" fill="' + CHEEK + '" opacity=".75"/>' +
          '<ellipse cx="150" cy="130" rx="7.5" ry="5" fill="' + CHEEK + '" opacity=".75"/>' +
          '<g stroke="' + WHISK + '" stroke-width="1.6" stroke-linecap="round">' +
            '<line x1="82" y1="124" x2="66" y2="120"/><line x1="82" y1="131" x2="67" y2="132"/>' +
            '<line x1="158" y1="124" x2="174" y2="120"/><line x1="158" y1="131" x2="173" y2="132"/>' +
          '</g>' +
        '</g>' +
      '</g>' +
      '<g class="mochi-particles" fill="#F5A623">' +
        '<g class="mochi-spark mochi-sp1"><path transform="translate(66,64)" d="' + star + '"/></g>' +
        '<g class="mochi-spark mochi-sp2"><path transform="translate(176,56) scale(.8)" d="' + star + '"/></g>' +
        '<g class="mochi-spark mochi-sp3"><path transform="translate(58,104) scale(.65)" d="' + star + '"/></g>' +
        '<g class="mochi-spark mochi-sp4"><path transform="translate(184,100) scale(.9)" d="' + star + '"/></g>' +
      '</g>';

    return shell("radiant", style, defs, inner);
  }

  /* ---------------- STEADY: «булка» сидя, хвост обёрнут ---------------- */

  function steady() {
    var style =
      '.pet-mochi.is-steady .mochi-body{transform-box:view-box;transform-origin:120px 200px;animation:mochi-breathe-s 3.5s ease-in-out infinite}' +
      '.pet-mochi.is-steady .mochi-tail{transform-box:view-box;transform-origin:163px 170px;animation:mochi-sway 3.5s ease-in-out infinite}' +
      '.pet-mochi.is-steady .mochi-lid{transform-box:view-box;transform:scaleY(0);animation:mochi-blink-s 5.2s linear infinite}' +
      '.pet-mochi.is-steady .mochi-lid-l{transform-origin:103px 130px}' +
      '.pet-mochi.is-steady .mochi-lid-r{transform-origin:137px 130px}' +
      '@keyframes mochi-breathe-s{0%,100%{transform:scale(1)}50%{transform:scale(1.022,.978)}}' +
      '@keyframes mochi-sway{0%,100%{transform:rotate(0deg)}50%{transform:rotate(-2.6deg)}}' +
      '@keyframes mochi-blink-s{0%,93%,100%{transform:scaleY(0)}95.5%,97.5%{transform:scaleY(1)}}';

    var defs = glowDef("mochi-steady-glow", "#BFE4CD", ".8", "#E8F3EA", ".5");

    var inner =
      '<g class="mochi-aura"><circle cx="120" cy="146" r="88" fill="url(#mochi-steady-glow)"/></g>' +
      '<ellipse class="mochi-shadow" cx="120" cy="204" rx="46" ry="6" fill="' + INK + '" opacity=".07"/>' +
      '<g class="mochi-pet">' +
        '<g class="mochi-body">' +
          // ушки
          '<path d="M88 110 L80 70 L112 96 Z" fill="' + CARA + '" stroke="' + CARA + '" stroke-width="7" stroke-linejoin="round"/>' +
          '<path d="M152 110 L160 70 L128 96 Z" fill="' + CARA + '" stroke="' + CARA + '" stroke-width="7" stroke-linejoin="round"/>' +
          '<path d="M89 102 L85 77 L103 91 Z" fill="' + CHEEK + '" opacity=".85"/>' +
          '<path d="M151 102 L155 77 L137 91 Z" fill="' + CHEEK + '" opacity=".85"/>' +
          // тело-шар «булка»
          '<circle cx="120" cy="149" r="51" fill="' + BODY + '"/>' +
          '<ellipse cx="120" cy="168" rx="29" ry="23" fill="' + BELLY + '" opacity=".7"/>' +
          // передние лапки
          '<ellipse cx="105" cy="197" rx="10" ry="6" fill="' + BODY + '" stroke="' + TONE + '" stroke-width="1.5"/>' +
          '<ellipse cx="135" cy="197" rx="10" ry="6" fill="' + BODY + '" stroke="' + TONE + '" stroke-width="1.5"/>' +
          // мордочка
          '<g class="mochi-eyes">' +
            '<circle cx="103" cy="136" r="5.5" fill="' + INK + '"/>' +
            '<circle cx="137" cy="136" r="5.5" fill="' + INK + '"/>' +
            '<circle cx="105" cy="134" r="1.9" fill="#FFFFFF"/>' +
            '<circle cx="139" cy="134" r="1.9" fill="#FFFFFF"/>' +
          '</g>' +
          '<g class="mochi-lids">' +
            '<ellipse class="mochi-lid mochi-lid-l" cx="103" cy="136" rx="6.2" ry="6.2" fill="' + BODY + '"/>' +
            '<ellipse class="mochi-lid mochi-lid-r" cx="137" cy="136" rx="6.2" ry="6.2" fill="' + BODY + '"/>' +
          '</g>' +
          '<path d="M117 146 L123 146 L120 150 Z" fill="' + CARAD + '"/>' +
          '<g class="mochi-mouth">' +
            '<path d="M112 151 Q116 155.5 120 151 Q124 155.5 128 151" fill="none" stroke="' + CARAD + '" stroke-width="2" stroke-linecap="round"/>' +
          '</g>' +
          '<ellipse cx="91" cy="147" rx="7" ry="4.5" fill="' + CHEEK + '" opacity=".75"/>' +
          '<ellipse cx="149" cy="147" rx="7" ry="4.5" fill="' + CHEEK + '" opacity=".75"/>' +
          '<g stroke="' + WHISK + '" stroke-width="1.6" stroke-linecap="round">' +
            '<line x1="80" y1="140" x2="64" y2="136"/><line x1="80" y1="147" x2="65" y2="148"/>' +
            '<line x1="160" y1="140" x2="176" y2="136"/><line x1="160" y1="147" x2="175" y2="148"/>' +
          '</g>' +
        '</g>' +
        // хвост обёрнут спереди — поверх тела
        '<g class="mochi-tail"><path d="M163 170 Q186 182 175 195 Q158 204 122 201 Q104 200 97 197" fill="none" stroke="' + CARA + '" stroke-width="10" stroke-linecap="round"/></g>' +
      '</g>';

    return shell("steady", style, defs, inner);
  }

  /* ---------------- TIRED: растёкся в овал, ухо согнуто, зевает ---------------- */

  function tired() {
    var style =
      '.pet-mochi.is-tired .mochi-body{transform-box:view-box;transform-origin:120px 200px;animation:mochi-breathe-t 5s ease-in-out infinite}' +
      '.pet-mochi.is-tired .mochi-tail{transform-box:view-box;transform-origin:172px 184px;animation:mochi-sway-t 5s ease-in-out infinite}' +
      '.pet-mochi.is-tired .mochi-lid{transform-box:view-box;transform:scaleY(.48);animation:mochi-blink-t 6s linear infinite}' +
      '.pet-mochi.is-tired .mochi-lid-l{transform-origin:102px 146px}' +
      '.pet-mochi.is-tired .mochi-lid-r{transform-origin:140px 146px}' +
      '.pet-mochi.is-tired .mochi-mouth{transform-box:view-box;transform-origin:120px 165px;transform:scale(1,.12);animation:mochi-yawn 7.5s ease-in-out infinite}' +
      '@keyframes mochi-breathe-t{0%,100%{transform:scale(1)}50%{transform:scale(1.015,.985)}}' +
      '@keyframes mochi-sway-t{0%,100%{transform:rotate(0deg)}50%{transform:rotate(1.6deg)}}' +
      '@keyframes mochi-blink-t{0%,88%,100%{transform:scaleY(.48)}91.5%,93%{transform:scaleY(1)}}' +
      '@keyframes mochi-yawn{0%,52%,100%{transform:scale(1,.12)}60%,76%{transform:scale(1.12,1)}86%{transform:scale(1,.12)}}';

    var defs = glowDef("mochi-tired-glow", "#D9E1F1", ".65", "#EDF0F8", ".4");

    var inner =
      '<g class="mochi-aura"><circle cx="120" cy="154" r="86" fill="url(#mochi-tired-glow)"/></g>' +
      '<ellipse class="mochi-shadow" cx="120" cy="204" rx="58" ry="6" fill="' + INK + '" opacity=".06"/>' +
      '<g class="mochi-pet">' +
        '<g class="mochi-body">' +
          // левое ухо обычное
          '<path d="M84 138 L76 106 L107 126 Z" fill="' + CARA + '" stroke="' + CARA + '" stroke-width="7" stroke-linejoin="round"/>' +
          '<path d="M85 130 L81 112 L98 123 Z" fill="' + CHEEK + '" opacity=".85"/>' +
          // правое ухо согнуто: основание + завёрнутый кончик
          '<path d="M136 126 L146 102 L164 134 Z" fill="' + CARA + '" stroke="' + CARA + '" stroke-width="7" stroke-linejoin="round"/>' +
          '<path d="M146 102 L167 111 L156 124 Z" fill="' + CARAD + '" stroke="' + CARAD + '" stroke-width="5" stroke-linejoin="round"/>' +
          // тело растеклось в овал
          '<ellipse cx="120" cy="162" rx="61" ry="38" fill="' + BODY + '"/>' +
          '<ellipse cx="120" cy="174" rx="32" ry="18" fill="' + BELLY + '" opacity=".6"/>' +
          // лапки разъехались
          '<ellipse cx="96" cy="198" rx="11" ry="5.5" fill="' + BODY + '" stroke="' + TONE + '" stroke-width="1.5"/>' +
          '<ellipse cx="144" cy="198" rx="11" ry="5.5" fill="' + BODY + '" stroke="' + TONE + '" stroke-width="1.5"/>' +
          // мордочка
          '<g class="mochi-eyes">' +
            '<circle cx="102" cy="152" r="5.5" fill="' + INK + '"/>' +
            '<circle cx="140" cy="152" r="5.5" fill="' + INK + '"/>' +
            '<circle cx="104" cy="150.5" r="1.4" fill="#FFFFFF" opacity=".85"/>' +
            '<circle cx="142" cy="150.5" r="1.4" fill="#FFFFFF" opacity=".85"/>' +
          '</g>' +
          // веки прикрыты на ~48%
          '<g class="mochi-lids">' +
            '<ellipse class="mochi-lid mochi-lid-l" cx="102" cy="152" rx="6.3" ry="6.3" fill="' + BODY + '"/>' +
            '<ellipse class="mochi-lid mochi-lid-r" cx="140" cy="152" rx="6.3" ry="6.3" fill="' + BODY + '"/>' +
          '</g>' +
          '<path d="M117 162 L123 162 L120 166 Z" fill="' + CARAD + '"/>' +
          // зевок: ротик-эллипс раскрывается по scaleY
          '<g class="mochi-mouth">' +
            '<ellipse cx="120" cy="173" rx="6" ry="8" fill="' + MOUTH + '"/>' +
            '<ellipse cx="120" cy="176" rx="3.2" ry="3.5" fill="' + CHEEK + '"/>' +
          '</g>' +
          '<ellipse cx="88" cy="164" rx="7" ry="4.5" fill="' + CHEEK + '" opacity=".7"/>' +
          '<ellipse cx="152" cy="164" rx="7" ry="4.5" fill="' + CHEEK + '" opacity=".7"/>' +
          // усы обвисли
          '<g stroke="' + WHISK + '" stroke-width="1.6" stroke-linecap="round">' +
            '<line x1="78" y1="156" x2="62" y2="158"/><line x1="78" y1="162" x2="63" y2="166"/>' +
            '<line x1="162" y1="156" x2="178" y2="158"/><line x1="162" y1="162" x2="177" y2="166"/>' +
          '</g>' +
        '</g>' +
        // хвост лежит плоско
        '<g class="mochi-tail"><path d="M172 184 Q198 188 193 196 Q182 202 160 199" fill="none" stroke="' + CARA + '" stroke-width="9" stroke-linecap="round"/></g>' +
      '</g>';

    return shell("tired", style, defs, inner);
  }

  /* ---------------- DRAINED: клубок под пледом, «z» из носа ---------------- */

  function drained() {
    var style =
      '.pet-mochi.is-drained .mochi-body{transform-box:view-box;transform-origin:120px 200px;animation:mochi-breathe-d 7s ease-in-out infinite}' +
      '.pet-mochi.is-drained .mochi-blanket{transform-box:view-box;transform-origin:146px 198px;animation:mochi-blanket 7s ease-in-out infinite}' +
      '.pet-mochi.is-drained .mochi-eyes{transform-box:view-box;transform-origin:106px 167px;animation:mochi-peek 9s linear infinite}' +
      '.pet-mochi.is-drained .mochi-z{opacity:0;animation:mochi-zfloat 7s ease-in-out infinite}' +
      '.pet-mochi.is-drained .mochi-z2{animation-delay:2.3s}' +
      '.pet-mochi.is-drained .mochi-z3{animation-delay:4.6s}' +
      '@keyframes mochi-breathe-d{0%,100%{transform:scale(1)}50%{transform:scale(1.012,1.035)}}' +
      '@keyframes mochi-blanket{0%,100%{transform:translateY(0)}50%{transform:translateY(-2.2px)}}' +
      '@keyframes mochi-peek{0%,91%,100%{transform:scaleY(1)}93.5%,95%{transform:scaleY(2.4)}}' +
      '@keyframes mochi-zfloat{0%{opacity:0;transform:translateY(7px)}14%{opacity:.85}55%,100%{opacity:0;transform:translateY(-15px)}}';

    var defs = glowDef("mochi-drained-glow", "#DFD5F0", ".6", "#F0ECF7", ".35");

    var zPath = 'M0 0 h8 l-8 8 h8';

    var inner =
      '<g class="mochi-aura"><circle cx="120" cy="166" r="82" fill="url(#mochi-drained-glow)"/></g>' +
      '<ellipse class="mochi-shadow" cx="124" cy="203" rx="44" ry="5.5" fill="' + INK + '" opacity=".07"/>' +
      '<g class="mochi-pet">' +
        '<g class="mochi-body">' +
          // ушко торчит из-под пледа
          '<path d="M96 156 L88 128 L114 146 Z" fill="' + CARA + '" stroke="' + CARA + '" stroke-width="6" stroke-linejoin="round"/>' +
          '<path d="M97 149 L93 134 L106 143 Z" fill="' + CHEEK + '" opacity=".85"/>' +
          // клубок
          '<ellipse cx="122" cy="173" rx="34" ry="27" fill="' + BODY + '"/>' +
          // мордочка: глаза-щёлочки, изредка приоткрываются
          '<g class="mochi-eyes" fill="none" stroke="' + INK + '" stroke-width="2.2" stroke-linecap="round">' +
            '<path d="M94 168 q4 3.5 8 0"/>' +
            '<path d="M106 165 q4 3.5 8 0"/>' +
          '</g>' +
          '<path d="M101 172 L106 172 L103.5 175.5 Z" fill="' + CARAD + '"/>' +
          '<g class="mochi-mouth">' +
            '<path d="M100 179 q3.5 2.5 7 0" fill="none" stroke="' + INK + '" stroke-width="1.8" stroke-linecap="round" opacity=".55"/>' +
          '</g>' +
          '<ellipse cx="90" cy="176" rx="5" ry="3.5" fill="' + CHEEK + '" opacity=".7"/>' +
          '<g stroke="' + WHISK + '" stroke-width="1.4" stroke-linecap="round">' +
            '<line x1="88" y1="170" x2="77" y2="168"/><line x1="88" y1="174" x2="78" y2="177"/>' +
          '</g>' +
        '</g>' +
        // вязаный плед поверх клубка, дышит вместе с котом
        '<g class="mochi-blanket">' +
          '<path d="M118 150 Q140 138 160 150 Q174 160 175 180 Q175 195 160 197 L128 198 Q118 198 117 187 Q116 166 118 150 Z" fill="' + PLAID + '" stroke="' + PLAIDL + '" stroke-width="1.5" stroke-linejoin="round"/>' +
          '<path d="M126 162 l4 4 l4 -4 M140 158 l4 4 l4 -4 M154 162 l4 4 l4 -4 M124 178 l4 4 l4 -4 M138 176 l4 4 l4 -4 M152 178 l4 4 l4 -4 M133 190 l4 4 l4 -4 M147 189 l4 4 l4 -4" fill="none" stroke="' + PLAIDL + '" stroke-width="1.4" stroke-linecap="round"/>' +
          '<path d="M119 154 Q122 174 120 194" fill="none" stroke="' + PLAIDL + '" stroke-width="1.4"/>' +
          // хвост-запятая поверх пледа
          '<path d="M148 154 Q166 146 170 162 Q171 173 162 174" fill="none" stroke="' + CARA + '" stroke-width="8" stroke-linecap="round"/>' +
        '</g>' +
      '</g>' +
      // «z» всплывают из носа
      '<g class="mochi-particles" fill="none" stroke="#9C8BC0" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">' +
        '<g class="mochi-z mochi-z1"><path transform="translate(86,156) scale(.7)" d="' + zPath + '"/></g>' +
        '<g class="mochi-z mochi-z2"><path transform="translate(78,140) scale(.9)" d="' + zPath + '"/></g>' +
        '<g class="mochi-z mochi-z3"><path transform="translate(70,123) scale(1.15)" d="' + zPath + '"/></g>' +
      '</g>';

    return shell("drained", style, defs, inner);
  }

  window.registerPet({
    id: "mochi",
    nameEn: "Mochi",
    nameRu: "Мочи",
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
