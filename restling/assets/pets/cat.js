/**
 * Mila / Мила — pet1 (id: cat), кремово-персиковая табби-кошка, архетип «уют».
 * По assets/pets/CONTRACT.md + 03-visual-kit.md (раздел 3, pet1).
 * Видовые признаки: треугольные уши (розовое нутро), хвост с тёмным кончиком,
 * усы 3+3, розовый нос, табби-полоски + «М» на лбу, большие круглые глаза.
 * Канал состояния — хвост + squash тела (трубой / булка / овал / клубок).
 */
(function () {
  "use strict";

  var BODY = "#F6D8B8";   // body cream-peach
  var BELLY = "#FBEDE4";  // belly cream
  var CARA = "#E8B48C";   // stripes/ears/tail caramel
  var DARK = "#C98F62";   // dark tail tip / ear fold (tonal)
  var PINK = "#F2B8C6";   // nose triangle + inner ear
  var CHEEK = "#F5A88E";  // cheeks
  var INK = "#3E3A47";    // eyes (--ink)
  var WHISK = "#E0BC96";  // whiskers tonal
  var TONE = "#EAC59B";   // paw tonal outline
  var MOUTH = "#E88A76";  // warm coral mouth
  var PLAID = "#E9E6FA";  // blanket (--calm-soft)
  var PLAIDL = "#CFC8EE"; // blanket stitches

  var REDUCED = "@media (prefers-reduced-motion: reduce){.pet-cat *{animation:none !important}}";

  function glowDef(id, c1, o1, c2, o2) {
    return '<radialGradient id="' + id + '" cx="50%" cy="44%" r="56%">' +
      '<stop offset="0%" stop-color="' + c1 + '" stop-opacity="' + o1 + '"/>' +
      '<stop offset="55%" stop-color="' + c2 + '" stop-opacity="' + o2 + '"/>' +
      '<stop offset="100%" stop-color="' + c2 + '" stop-opacity="0"/>' +
      '</radialGradient>';
  }

  function shell(mood, style, defs, inner) {
    return '<svg viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg" ' +
      'class="pet-svg pet-cat is-' + mood + '" role="img" aria-label="Mila">' +
      '<style>' + style + REDUCED + '</style>' +
      '<defs>' + defs + '</defs>' + inner + '</svg>';
  }

  // tabby 'M' forehead mark (3 strokes)
  function tabbyM(x1, y, w) {
    var s = w || 3;
    return '<g fill="none" stroke="' + CARA + '" stroke-width="' + s + '" stroke-linecap="round">' +
      '<path d="M' + (x1) + ' ' + (y + 2) + ' L' + (x1 + 3) + ' ' + (y + 11) + '"/>' +
      '<path d="M' + (x1 + 8) + ' ' + y + ' L' + (x1 + 8) + ' ' + (y + 11.5) + '"/>' +
      '<path d="M' + (x1 + 16) + ' ' + (y + 2) + ' L' + (x1 + 13) + ' ' + (y + 11) + '"/>' +
      '</g>';
  }

  /* ---- RADIANT: stretched tall, tail up, sparks, washing paw ---- */

  function radiant() {
    var style =
      '.pet-cat.is-radiant .cat-pet{transform-box:view-box;transform-origin:120px 200px;animation:cat-perk 4.6s ease-in-out infinite}' +
      '.pet-cat.is-radiant .cat-body{transform-box:view-box;transform-origin:120px 200px;animation:cat-breathe-r 2.2s ease-in-out infinite}' +
      '.pet-cat.is-radiant .cat-tail{transform-box:view-box;transform-origin:148px 188px;animation:cat-wag 2.2s ease-in-out infinite}' +
      '.pet-cat.is-radiant .cat-tailtip{transform-box:view-box;transform-origin:172px 122px;animation:cat-flick 2.2s ease-in-out infinite}' +
      '.pet-cat.is-radiant .cat-paw{transform-box:view-box;transform-origin:131px 172px;animation:cat-wash 8s ease-in-out infinite}' +
      '.pet-cat.is-radiant .cat-aura{animation:cat-glow 2.2s ease-in-out infinite}' +
      '.pet-cat.is-radiant .cat-lid{transform-box:view-box;transform:scaleY(0);animation:cat-blink 4.4s linear infinite}' +
      '.pet-cat.is-radiant .cat-lid-l{transform-origin:104px 111px}' +
      '.pet-cat.is-radiant .cat-lid-r{transform-origin:136px 111px}' +
      '.pet-cat.is-radiant .cat-whiskers{transform-box:view-box;transform-origin:120px 128px;animation:cat-whisk 2.2s ease-in-out infinite}' +
      '.pet-cat.is-radiant .cat-spark{transform-box:view-box;animation:cat-twinkle 1.9s ease-in-out infinite}' +
      '.pet-cat.is-radiant .cat-sp1{transform-origin:64px 62px}' +
      '.pet-cat.is-radiant .cat-sp2{transform-origin:178px 54px;animation-delay:.5s}' +
      '.pet-cat.is-radiant .cat-sp3{transform-origin:56px 102px;animation-delay:1s}' +
      '.pet-cat.is-radiant .cat-sp4{transform-origin:186px 98px;animation-delay:1.4s}' +
      '@keyframes cat-perk{0%,58%,100%{transform:scale(1,1)}64%{transform:scale(1.02,.98)}72%{transform:scale(.985,1.03)}80%{transform:scale(1,1)}}' +
      '@keyframes cat-breathe-r{0%,100%{transform:scale(1,1)}50%{transform:scale(1.03,.97)}}' +
      '@keyframes cat-wag{0%,100%{transform:rotate(-6deg)}50%{transform:rotate(7deg)}}' +
      '@keyframes cat-flick{0%,100%{transform:rotate(-8deg)}50%{transform:rotate(12deg)}}' +
      '@keyframes cat-wash{0%,56%,100%{transform:rotate(0deg)}63%{transform:rotate(-88deg)}69%{transform:rotate(-70deg)}75%{transform:rotate(-90deg)}84%{transform:rotate(0deg)}}' +
      '@keyframes cat-glow{0%,100%{opacity:.75}50%{opacity:1}}' +
      '@keyframes cat-blink{0%,92%,100%{transform:scaleY(0)}94.5%,96.5%{transform:scaleY(1)}}' +
      '@keyframes cat-whisk{0%,100%{transform:rotate(0deg)}50%{transform:rotate(1.2deg)}}' +
      '@keyframes cat-twinkle{0%,100%{opacity:.15;transform:scale(.5)}50%{opacity:1;transform:scale(1)}}';

    var defs = glowDef("cat-radiant-glow", "#FFDF9E", ".9", "#FFF3D9", ".55");

    var star = 'M0 -6 L1.7 -1.7 L6 0 L1.7 1.7 L0 6 L-1.7 1.7 L-6 0 L-1.7 -1.7 Z';

    var inner =
      '<g class="cat-aura aura"><circle cx="120" cy="130" r="94" fill="url(#cat-radiant-glow)"/></g>' +
      '<ellipse class="cat-shadow" cx="120" cy="203" rx="38" ry="6" fill="' + INK + '" opacity=".07"/>' +
      '<g class="cat-pet">' +
        // tail up behind body, dark tip flicks
        '<g class="cat-tail extras">' +
          '<path d="M148 188 Q184 168 178 124 Q176 110 168 108" fill="none" stroke="' + CARA + '" stroke-width="11" stroke-linecap="round"/>' +
          '<g class="cat-tailtip"><path d="M176 126 Q173 111 165 108" fill="none" stroke="' + DARK + '" stroke-width="11" stroke-linecap="round"/></g>' +
        '</g>' +
        '<g class="cat-body body">' +
          // perked triangular ears, pink inner
          '<path d="M98 98 L92 58 L119 85 Z" fill="' + CARA + '" stroke="' + CARA + '" stroke-width="7" stroke-linejoin="round"/>' +
          '<path d="M142 98 L148 58 L121 85 Z" fill="' + CARA + '" stroke="' + CARA + '" stroke-width="7" stroke-linejoin="round"/>' +
          '<path d="M97 89 L94 66 L110 82 Z" fill="' + PINK + '"/>' +
          '<path d="M143 89 L146 66 L130 82 Z" fill="' + PINK + '"/>' +
          // body stretched tall
          '<ellipse cx="120" cy="142" rx="43" ry="58" fill="' + BODY + '"/>' +
          '<ellipse cx="120" cy="164" rx="26" ry="29" fill="' + BELLY + '" opacity=".85"/>' +
          // forehead 'M' + flank stripes
          tabbyM(112, 94, 3) +
          '<g fill="none" stroke="' + CARA + '" stroke-width="5" stroke-linecap="round">' +
            '<path d="M79 148 q9 5 18 3"/><path d="M81 165 q9 5 17 2"/>' +
            '<path d="M161 148 q-9 5 -18 3"/><path d="M159 165 q-9 5 -17 2"/>' +
          '</g>' +
          // left paw down, right paw = washing gesture
          '<ellipse cx="109" cy="185" rx="7.5" ry="15" fill="' + BODY + '" stroke="' + TONE + '" stroke-width="1.5"/>' +
          '<g class="cat-paw"><ellipse cx="131" cy="185" rx="7.5" ry="15" fill="' + BODY + '" stroke="' + TONE + '" stroke-width="1.5"/></g>' +
          // big round eyes, large highlight
          '<g class="cat-eyes eyes">' +
            '<circle cx="104" cy="118" r="7" fill="' + INK + '"/>' +
            '<circle cx="136" cy="118" r="7" fill="' + INK + '"/>' +
            '<circle cx="106.6" cy="115.4" r="2.6" fill="#FFFFFF"/>' +
            '<circle cx="138.6" cy="115.4" r="2.6" fill="#FFFFFF"/>' +
            '<circle cx="101.8" cy="121.2" r="1.2" fill="#FFFFFF" opacity=".8"/>' +
            '<circle cx="133.8" cy="121.2" r="1.2" fill="#FFFFFF" opacity=".8"/>' +
          '</g>' +
          '<g class="cat-lids eyelids">' +
            '<ellipse class="cat-lid cat-lid-l" cx="104" cy="118" rx="7.8" ry="7.8" fill="' + BODY + '"/>' +
            '<ellipse class="cat-lid cat-lid-r" cx="136" cy="118" rx="7.8" ry="7.8" fill="' + BODY + '"/>' +
          '</g>' +
          // pink triangle nose + happy open smile
          '<path d="M116 130 L124 130 L120 136 Z" fill="' + PINK + '"/>' +
          '<g class="cat-mouth mouth">' +
            '<path d="M120 136 L120 139" stroke="' + DARK + '" stroke-width="1.6" stroke-linecap="round"/>' +
            '<path d="M112 139 Q120 150 128 139 Z" fill="' + MOUTH + '"/>' +
            '<ellipse cx="120" cy="143.5" rx="3" ry="2" fill="' + PINK + '"/>' +
          '</g>' +
          '<ellipse cx="90" cy="131" rx="7.5" ry="5" fill="' + CHEEK + '" opacity=".75"/>' +
          '<ellipse cx="150" cy="131" rx="7.5" ry="5" fill="' + CHEEK + '" opacity=".75"/>' +
          // whiskers 3+3, springy
          '<g class="cat-whiskers" stroke="' + WHISK + '" stroke-width="1.6" stroke-linecap="round">' +
            '<line x1="83" y1="122" x2="66" y2="117"/><line x1="83" y1="128" x2="64" y2="127"/><line x1="83" y1="134" x2="66" y2="138"/>' +
            '<line x1="157" y1="122" x2="174" y2="117"/><line x1="157" y1="128" x2="176" y2="127"/><line x1="157" y1="134" x2="174" y2="138"/>' +
          '</g>' +
        '</g>' +
      '</g>' +
      '<g class="cat-particles particles" fill="#F5A623">' +
        '<g class="cat-spark cat-sp1"><path transform="translate(64,62)" d="' + star + '"/></g>' +
        '<g class="cat-spark cat-sp2"><path transform="translate(178,54) scale(.8)" d="' + star + '"/></g>' +
        '<g class="cat-spark cat-sp3"><path transform="translate(56,102) scale(.65)" d="' + star + '"/></g>' +
        '<g class="cat-spark cat-sp4"><path transform="translate(186,98) scale(.9)" d="' + star + '"/></g>' +
      '</g>';

    return shell("radiant", style, defs, inner);
  }

  /* ---- STEADY: classic loaf, tail wrapped around ---- */

  function steady() {
    var style =
      '.pet-cat.is-steady .cat-body{transform-box:view-box;transform-origin:120px 200px;animation:cat-breathe-s 3.5s ease-in-out infinite}' +
      '.pet-cat.is-steady .cat-tail{transform-box:view-box;transform-origin:164px 168px;animation:cat-sway 3.5s ease-in-out infinite}' +
      '.pet-cat.is-steady .cat-tailtip{transform-box:view-box;transform-origin:110px 197px;animation:cat-tip-s 3.5s ease-in-out infinite}' +
      '.pet-cat.is-steady .cat-lid{transform-box:view-box;transform:scaleY(0);animation:cat-blink-s 5.2s linear infinite}' +
      '.pet-cat.is-steady .cat-lid-l{transform-origin:103px 130px}' +
      '.pet-cat.is-steady .cat-lid-r{transform-origin:137px 130px}' +
      '@keyframes cat-breathe-s{0%,100%{transform:scale(1)}50%{transform:scale(1.022,.978)}}' +
      '@keyframes cat-sway{0%,100%{transform:rotate(0deg)}50%{transform:rotate(-2deg)}}' +
      '@keyframes cat-tip-s{0%,100%{transform:rotate(0deg)}50%{transform:rotate(-9deg)}}' +
      '@keyframes cat-blink-s{0%,93%,100%{transform:scaleY(0)}95.5%,97.5%{transform:scaleY(1)}}';

    var defs = glowDef("cat-steady-glow", "#BFE4CD", ".8", "#E8F3EA", ".5");

    var inner =
      '<g class="cat-aura aura"><circle cx="120" cy="146" r="88" fill="url(#cat-steady-glow)"/></g>' +
      '<ellipse class="cat-shadow" cx="120" cy="204" rx="46" ry="6" fill="' + INK + '" opacity=".07"/>' +
      '<g class="cat-pet">' +
        '<g class="cat-body body">' +
          // ears, pink inner
          '<path d="M88 110 L80 70 L112 96 Z" fill="' + CARA + '" stroke="' + CARA + '" stroke-width="7" stroke-linejoin="round"/>' +
          '<path d="M152 110 L160 70 L128 96 Z" fill="' + CARA + '" stroke="' + CARA + '" stroke-width="7" stroke-linejoin="round"/>' +
          '<path d="M89 102 L85 77 L103 91 Z" fill="' + PINK + '"/>' +
          '<path d="M151 102 L155 77 L137 91 Z" fill="' + PINK + '"/>' +
          // loaf body
          '<circle cx="120" cy="149" r="51" fill="' + BODY + '"/>' +
          '<ellipse cx="120" cy="170" rx="28" ry="22" fill="' + BELLY + '" opacity=".75"/>' +
          // forehead 'M' + flank stripes
          tabbyM(112, 108, 3) +
          '<g fill="none" stroke="' + CARA + '" stroke-width="5" stroke-linecap="round">' +
            '<path d="M72 138 q10 5 19 4"/><path d="M75 156 q10 5 18 3"/>' +
            '<path d="M168 138 q-10 5 -19 4"/><path d="M165 156 q-10 5 -18 3"/>' +
          '</g>' +
          // tucked front paws
          '<ellipse cx="106" cy="196" rx="10" ry="6" fill="' + BODY + '" stroke="' + TONE + '" stroke-width="1.5"/>' +
          '<ellipse cx="134" cy="196" rx="10" ry="6" fill="' + BODY + '" stroke="' + TONE + '" stroke-width="1.5"/>' +
          // calm eyes
          '<g class="cat-eyes eyes">' +
            '<circle cx="103" cy="136" r="5.8" fill="' + INK + '"/>' +
            '<circle cx="137" cy="136" r="5.8" fill="' + INK + '"/>' +
            '<circle cx="105" cy="134" r="2" fill="#FFFFFF"/>' +
            '<circle cx="139" cy="134" r="2" fill="#FFFFFF"/>' +
          '</g>' +
          '<g class="cat-lids eyelids">' +
            '<ellipse class="cat-lid cat-lid-l" cx="103" cy="136" rx="6.5" ry="6.5" fill="' + BODY + '"/>' +
            '<ellipse class="cat-lid cat-lid-r" cx="137" cy="136" rx="6.5" ry="6.5" fill="' + BODY + '"/>' +
          '</g>' +
          // pink nose + cat 'w' mouth
          '<path d="M116.5 146 L123.5 146 L120 151 Z" fill="' + PINK + '"/>' +
          '<g class="cat-mouth mouth">' +
            '<path d="M120 151 L120 153.5" stroke="' + DARK + '" stroke-width="1.6" stroke-linecap="round" fill="none"/>' +
            '<path d="M112 153.5 Q116 158 120 153.5 Q124 158 128 153.5" fill="none" stroke="' + DARK + '" stroke-width="2" stroke-linecap="round"/>' +
          '</g>' +
          '<ellipse cx="90" cy="148" rx="7" ry="4.5" fill="' + CHEEK + '" opacity=".75"/>' +
          '<ellipse cx="150" cy="148" rx="7" ry="4.5" fill="' + CHEEK + '" opacity=".75"/>' +
          // whiskers 3+3
          '<g stroke="' + WHISK + '" stroke-width="1.6" stroke-linecap="round">' +
            '<line x1="81" y1="140" x2="64" y2="135"/><line x1="81" y1="146" x2="62" y2="146"/><line x1="81" y1="152" x2="64" y2="157"/>' +
            '<line x1="159" y1="140" x2="176" y2="135"/><line x1="159" y1="146" x2="178" y2="146"/><line x1="159" y1="152" x2="176" y2="157"/>' +
          '</g>' +
        '</g>' +
        // tail wrapped around front, dark tip sways
        '<g class="cat-tail extras">' +
          '<path d="M164 168 Q188 182 176 195 Q158 204 124 201 Q110 200 102 197" fill="none" stroke="' + CARA + '" stroke-width="10" stroke-linecap="round"/>' +
          '<g class="cat-tailtip"><path d="M113 199.5 Q104 198.5 98 195.5" fill="none" stroke="' + DARK + '" stroke-width="10" stroke-linecap="round"/></g>' +
        '</g>' +
      '</g>';

    return shell("steady", style, defs, inner);
  }

  /* ---- TIRED: squashed oval, folded ear, flat tail, yawn ---- */

  function tired() {
    var style =
      '.pet-cat.is-tired .cat-body{transform-box:view-box;transform-origin:120px 200px;animation:cat-breathe-t 5s ease-in-out infinite}' +
      '.pet-cat.is-tired .cat-tail{transform-box:view-box;transform-origin:172px 184px;animation:cat-sway-t 5s ease-in-out infinite}' +
      '.pet-cat.is-tired .cat-tailtip{transform-box:view-box;transform-origin:176px 199px;animation:cat-twitch 9s ease-in-out infinite}' +
      '.pet-cat.is-tired .cat-lid{transform-box:view-box;transform:scaleY(.48);animation:cat-blink-t 6s linear infinite}' +
      '.pet-cat.is-tired .cat-lid-l{transform-origin:102px 146px}' +
      '.pet-cat.is-tired .cat-lid-r{transform-origin:140px 146px}' +
      '.pet-cat.is-tired .cat-mouth{transform-box:view-box;transform-origin:120px 168px;transform:scale(1,.12);animation:cat-yawn 7.5s ease-in-out infinite}' +
      '@keyframes cat-breathe-t{0%,100%{transform:scale(1)}50%{transform:scale(1.015,.985)}}' +
      '@keyframes cat-sway-t{0%,100%{transform:rotate(0deg)}50%{transform:rotate(1.4deg)}}' +
      '@keyframes cat-twitch{0%,88%,100%{transform:rotate(0deg)}91%{transform:rotate(-16deg)}94%{transform:rotate(7deg)}97%{transform:rotate(0deg)}}' +
      '@keyframes cat-blink-t{0%,88%,100%{transform:scaleY(.48)}91.5%,93%{transform:scaleY(1)}}' +
      '@keyframes cat-yawn{0%,52%,100%{transform:scale(1,.12)}60%,76%{transform:scale(1.12,1)}86%{transform:scale(1,.12)}}';

    var defs = glowDef("cat-tired-glow", "#D9E1F1", ".65", "#EDF0F8", ".4");

    var inner =
      '<g class="cat-aura aura"><circle cx="120" cy="154" r="86" fill="url(#cat-tired-glow)"/></g>' +
      '<ellipse class="cat-shadow" cx="120" cy="204" rx="58" ry="6" fill="' + INK + '" opacity=".06"/>' +
      '<g class="cat-pet">' +
        '<g class="cat-body body">' +
          // left ear up, right ear folded
          '<path d="M84 138 L76 104 L107 126 Z" fill="' + CARA + '" stroke="' + CARA + '" stroke-width="7" stroke-linejoin="round"/>' +
          '<path d="M85 130 L81 111 L98 123 Z" fill="' + PINK + '"/>' +
          '<path d="M136 126 L146 100 L164 134 Z" fill="' + CARA + '" stroke="' + CARA + '" stroke-width="7" stroke-linejoin="round"/>' +
          '<path d="M146 100 L167 110 L156 123 Z" fill="' + DARK + '" stroke="' + DARK + '" stroke-width="5" stroke-linejoin="round"/>' +
          // body squashed to oval
          '<ellipse cx="120" cy="162" rx="61" ry="38" fill="' + BODY + '"/>' +
          '<ellipse cx="120" cy="178" rx="32" ry="17" fill="' + BELLY + '" opacity=".65"/>' +
          // forehead 'M' + flank stripes
          tabbyM(112, 129, 2.6) +
          '<g fill="none" stroke="' + CARA + '" stroke-width="4.5" stroke-linecap="round">' +
            '<path d="M64 152 q10 5 19 3"/><path d="M68 170 q10 5 18 2"/>' +
            '<path d="M176 152 q-10 5 -19 3"/><path d="M172 170 q-10 5 -18 2"/>' +
          '</g>' +
          // paws splayed
          '<ellipse cx="94" cy="198" rx="11" ry="5.5" fill="' + BODY + '" stroke="' + TONE + '" stroke-width="1.5"/>' +
          '<ellipse cx="146" cy="198" rx="11" ry="5.5" fill="' + BODY + '" stroke="' + TONE + '" stroke-width="1.5"/>' +
          // eyes half-closed (~48% lid)
          '<g class="cat-eyes eyes">' +
            '<circle cx="102" cy="152" r="5.6" fill="' + INK + '"/>' +
            '<circle cx="140" cy="152" r="5.6" fill="' + INK + '"/>' +
            '<circle cx="104" cy="150.5" r="1.4" fill="#FFFFFF" opacity=".85"/>' +
            '<circle cx="142" cy="150.5" r="1.4" fill="#FFFFFF" opacity=".85"/>' +
          '</g>' +
          '<g class="cat-lids eyelids">' +
            '<ellipse class="cat-lid cat-lid-l" cx="102" cy="152" rx="6.4" ry="6.4" fill="' + BODY + '"/>' +
            '<ellipse class="cat-lid cat-lid-r" cx="140" cy="152" rx="6.4" ry="6.4" fill="' + BODY + '"/>' +
          '</g>' +
          // pink nose + pink yawn
          '<path d="M116.5 162 L123.5 162 L120 167 Z" fill="' + PINK + '"/>' +
          '<g class="cat-mouth mouth">' +
            '<ellipse cx="120" cy="176" rx="6" ry="8" fill="' + MOUTH + '"/>' +
            '<ellipse cx="120" cy="179" rx="3.2" ry="3.5" fill="' + PINK + '"/>' +
          '</g>' +
          '<ellipse cx="88" cy="164" rx="7" ry="4.5" fill="' + CHEEK + '" opacity=".7"/>' +
          '<ellipse cx="152" cy="164" rx="7" ry="4.5" fill="' + CHEEK + '" opacity=".7"/>' +
          // whiskers 3+3, обвисли
          '<g stroke="' + WHISK + '" stroke-width="1.6" stroke-linecap="round">' +
            '<line x1="79" y1="154" x2="62" y2="153"/><line x1="79" y1="160" x2="62" y2="163"/><line x1="80" y1="166" x2="65" y2="172"/>' +
            '<line x1="161" y1="154" x2="178" y2="153"/><line x1="161" y1="160" x2="178" y2="163"/><line x1="160" y1="166" x2="175" y2="172"/>' +
          '</g>' +
        '</g>' +
        // tail flat, dark tip twitches rarely
        '<g class="cat-tail extras">' +
          '<path d="M172 184 Q198 188 193 196 Q184 201 170 200" fill="none" stroke="' + CARA + '" stroke-width="9" stroke-linecap="round"/>' +
          '<g class="cat-tailtip"><path d="M176 200.5 Q168 200.5 161 198.5" fill="none" stroke="' + DARK + '" stroke-width="9" stroke-linecap="round"/></g>' +
        '</g>' +
      '</g>';

    return shell("tired", style, defs, inner);
  }

  /* ---- DRAINED: curled under blanket, z's ---- */

  function drained() {
    var style =
      '.pet-cat.is-drained .cat-body{transform-box:view-box;transform-origin:120px 200px;animation:cat-breathe-d 7s ease-in-out infinite}' +
      '.pet-cat.is-drained .cat-blanket{transform-box:view-box;transform-origin:146px 198px;animation:cat-blanket 7s ease-in-out infinite}' +
      '.pet-cat.is-drained .cat-eyes{transform-box:view-box;transform-origin:104px 166px;animation:cat-peek 10s linear infinite}' +
      '.pet-cat.is-drained .cat-z{opacity:0;animation:cat-zfloat 7s ease-in-out infinite}' +
      '.pet-cat.is-drained .cat-z2{animation-delay:2.3s}' +
      '.pet-cat.is-drained .cat-z3{animation-delay:4.6s}' +
      '@keyframes cat-breathe-d{0%,100%{transform:scale(1)}50%{transform:scale(1.012,1.035)}}' +
      '@keyframes cat-blanket{0%,100%{transform:translateY(0)}50%{transform:translateY(-2.2px)}}' +
      '@keyframes cat-peek{0%,91%,100%{transform:scaleY(1)}93.5%,95%{transform:scaleY(2.4)}}' +
      '@keyframes cat-zfloat{0%{opacity:0;transform:translateY(7px)}14%{opacity:.85}55%,100%{opacity:0;transform:translateY(-15px)}}';

    var defs = glowDef("cat-drained-glow", "#DFD5F0", ".6", "#F0ECF7", ".35");

    var zPath = 'M0 0 h8 l-8 8 h8';

    var inner =
      '<g class="cat-aura aura"><circle cx="120" cy="166" r="82" fill="url(#cat-drained-glow)"/></g>' +
      '<ellipse class="cat-shadow" cx="124" cy="203" rx="44" ry="5.5" fill="' + INK + '" opacity=".07"/>' +
      '<g class="cat-pet">' +
        '<g class="cat-body body">' +
          // left ear out, pink inner
          '<path d="M90 154 L82 124 L108 144 Z" fill="' + CARA + '" stroke="' + CARA + '" stroke-width="6" stroke-linejoin="round"/>' +
          '<path d="M91 147 L87 130 L100 141 Z" fill="' + PINK + '"/>' +
          // curled ball
          '<ellipse cx="122" cy="173" rx="34" ry="27" fill="' + BODY + '"/>' +
          // tabby stripe on visible flank
          '<path d="M94 188 q8 4 15 2.5" fill="none" stroke="' + CARA + '" stroke-width="4" stroke-linecap="round"/>' +
          // slit eyes, rare peek
          '<g class="cat-eyes eyes" fill="none" stroke="' + INK + '" stroke-width="2.2" stroke-linecap="round">' +
            '<path d="M92 167 q4 3.5 8 0"/>' +
            '<path d="M104 164 q4 3.5 8 0"/>' +
          '</g>' +
          // pink nose + quiet mouth
          '<path d="M98 171 L104 171 L101 175 Z" fill="' + PINK + '"/>' +
          '<g class="cat-mouth mouth">' +
            '<path d="M98 179 q3.5 2.5 7 0" fill="none" stroke="' + INK + '" stroke-width="1.8" stroke-linecap="round" opacity=".55"/>' +
          '</g>' +
          '<ellipse cx="89" cy="177" rx="5" ry="3.5" fill="' + CHEEK + '" opacity=".7"/>' +
          // 3 whiskers on visible cheek
          '<g stroke="' + WHISK + '" stroke-width="1.4" stroke-linecap="round">' +
            '<line x1="87" y1="168" x2="76" y2="165"/><line x1="87" y1="172" x2="75" y2="172"/><line x1="87" y1="176" x2="77" y2="180"/>' +
          '</g>' +
        '</g>' +
        // knitted blanket over the ball, breathes
        '<g class="cat-blanket extras">' +
          '<path d="M118 150 Q140 138 160 150 Q174 160 175 180 Q175 195 160 197 L128 198 Q118 198 117 187 Q116 166 118 150 Z" fill="' + PLAID + '" stroke="' + PLAIDL + '" stroke-width="1.5" stroke-linejoin="round"/>' +
          '<path d="M126 162 l4 4 l4 -4 M140 158 l4 4 l4 -4 M154 162 l4 4 l4 -4 M124 178 l4 4 l4 -4 M138 176 l4 4 l4 -4 M152 178 l4 4 l4 -4 M133 190 l4 4 l4 -4 M147 189 l4 4 l4 -4" fill="none" stroke="' + PLAIDL + '" stroke-width="1.4" stroke-linecap="round"/>' +
          '<path d="M119 154 Q122 174 120 194" fill="none" stroke="' + PLAIDL + '" stroke-width="1.4"/>' +
          // right ear peeks above blanket edge
          '<path d="M124 148 L129 124 L146 143 Z" fill="' + CARA + '" stroke="' + CARA + '" stroke-width="6" stroke-linejoin="round"/>' +
          '<path d="M128 142 L131 130 L140 139 Z" fill="' + PINK + '"/>' +
          // tail comma over blanket, dark tip out
          '<path d="M148 156 Q166 148 170 162 Q171 173 164 175" fill="none" stroke="' + CARA + '" stroke-width="8" stroke-linecap="round"/>' +
          '<path d="M169 166 Q169 174 162 175.5" fill="none" stroke="' + DARK + '" stroke-width="8" stroke-linecap="round"/>' +
        '</g>' +
      '</g>' +
      // floating z's
      '<g class="cat-particles particles" fill="none" stroke="#9C8BC0" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">' +
        '<g class="cat-z cat-z1"><path transform="translate(84,156) scale(.7)" d="' + zPath + '"/></g>' +
        '<g class="cat-z cat-z2"><path transform="translate(76,140) scale(.9)" d="' + zPath + '"/></g>' +
        '<g class="cat-z cat-z3"><path transform="translate(68,123) scale(1.15)" d="' + zPath + '"/></g>' +
      '</g>';

    return shell("drained", style, defs, inner);
  }

  window.registerPet({
    id: "cat",
    nameEn: "Mila",
    nameRu: "Мила",
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
