/**
 * Fern / Ферн — стиль "real" (id: sloth), реалистичная тёплая иллюстрация.
 * По assets/pets/CONTRACT.md v2 (раздел 6, real) + 03-visual-kit.md (pet4).
 * Природный окрас трёхпалого ленивца: серо-оливково-бурая шерсть (не пастель),
 * тёмная маска-«очки» полосами к вискам, светлая мордочка, три длинных
 * когтя-крюка на каждой руке. Штрихи шерсти + 2 градиента (объём + аура),
 * глаза маленькие и реалистичные, позы спокойные, амплитуда анимаций
 * сдержанная. Ветка — обязательная часть композиции во всех mood.
 * Канал состояний — хват: висит на одной руке → сидит в развилке →
 * обвис на двух руках → лежит на спине под листом-пледом.
 */
(function () {
  "use strict";

  var FUR = "#9C8C72";     // base grey-olive-brown fur
  var LIGHT = "#B9AA8E";   // fur highlight (gradient top)
  var SHADE = "#7B6C55";   // fur shading / hair strokes
  var MASK = "#5F5240";    // dark eye mask, mouth line
  var FACE = "#E3D4B6";    // pale tan face disc
  var FACESH = "#CBBA97";  // face soft shading
  var BELLY = "#C7B99C";   // lighter belly
  var CLAW = "#6E5F49";    // long hook claws
  var NOSE = "#57493A";    // nose
  var IRIS = "#4A3A2C";    // dark brown iris
  var PUPIL = "#332B22";   // pupil (dark brown, not black)
  var SCLERA = "#F3EBD8";  // warm eye white
  var MOUTHIN = "#8A6353"; // yawn inner
  var LEAF = "#5FAF7E";
  var LEAFD = "#4C9269";
  var BARK = "#8A6F52";
  var BARKD = "#6E5740";
  var SPARK = "#F5A623";
  var ZZZ = "#9C8BC0";

  var REDUCED = "@media (prefers-reduced-motion: reduce){.pet-sloth-real *{animation:none !important}}";

  function R(v) { return Math.round(v * 10) / 10; }

  function glowDef(id, c1, o1, c2, o2) {
    return '<radialGradient id="' + id + '" cx="50%" cy="46%" r="56%">' +
      '<stop offset="0%" stop-color="' + c1 + '" stop-opacity="' + o1 + '"/>' +
      '<stop offset="55%" stop-color="' + c2 + '" stop-opacity="' + o2 + '"/>' +
      '<stop offset="100%" stop-color="' + c2 + '" stop-opacity="0"/>' +
      '</radialGradient>';
  }

  // vertical fur-volume gradient: lit back -> shaded underside
  function furDef(id) {
    return '<linearGradient id="' + id + '" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0%" stop-color="' + LIGHT + '"/>' +
      '<stop offset="48%" stop-color="' + FUR + '"/>' +
      '<stop offset="100%" stop-color="' + SHADE + '"/>' +
      '</linearGradient>';
  }

  function shell(mood, style, defs, inner) {
    return '<svg viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg" ' +
      'class="pet-svg pet-sloth pet-sloth-real is-' + mood + '" role="img" aria-label="Fern the sloth">' +
      "<style>" + style + REDUCED + "</style>" +
      "<defs>" + defs + "</defs>" + inner + "</svg>";
  }

  /* три длинных когтя-крюка; rot — куда смотрят (0 = вниз), k — масштаб */
  function claws(x, y, rot, k) {
    k = k || 1;
    return '<path transform="translate(' + x + " " + y + ") rotate(" + rot + ") scale(" + k + ')" ' +
      'd="M -5 0 Q -2 5 -4.6 10.5 M 0 0 Q 3 5 0.6 11.5 M 5 0 Q 8 5 5.2 10.5" ' +
      'stroke="' + CLAW + '" stroke-width="2.5" stroke-linecap="round" fill="none"/>';
  }

  /* лист с прожилкой; класс покачивания — на внутренней группе (fill-box) */
  function leafEl(x, y, rot, k, cls) {
    return '<g transform="translate(' + x + " " + y + ") rotate(" + rot + ") scale(" + k + ')">' +
      '<g class="' + (cls || "") + '">' +
      '<path d="M 0 0 Q 6.5 -3 9 -13.5 Q 1 -9.5 0 0 Z" fill="' + LEAF + '"/>' +
      '<path d="M 1.5 -2.5 Q 4.5 -7 7 -11.5" stroke="' + LEAFD + '" stroke-width="1" stroke-linecap="round" fill="none" opacity=".8"/>' +
      "</g></g>";
  }

  function sparkEl(x, y, k, cls) {
    return '<g class="srl-spark ' + cls + '"><path transform="translate(' + x + " " + y + ") scale(" + k + ')" ' +
      'd="M0 -6 L1.6 -1.6 L6 0 L1.6 1.6 L0 6 L-1.6 1.6 L-6 0 L-1.6 -1.6 Z" fill="' + SPARK + '"/></g>';
  }

  function zee(x, y, k, cls) {
    return '<g transform="translate(' + x + " " + y + ')">' +
      '<path class="srl-z ' + cls + '" d="M 0 0 h ' + R(6.5 * k) + " l " + R(-6.5 * k) + " " + R(6.5 * k) +
      " h " + R(6.5 * k) + '" stroke="' + ZZZ + '" stroke-width="' + R(2.2 * k) +
      '" stroke-linecap="round" stroke-linejoin="round" fill="none"/></g>';
  }

  /* ---------- глаза: маленькие, реалистичные (локальные координаты головы) ---------- */

  function eyeOpen(x, big) {
    var sr = big ? 4 : 3.7, ir = big ? 3.1 : 2.8, pr = big ? 1.7 : 1.5;
    var s = '<circle cx="' + x + '" cy="-1" r="' + sr + '" fill="' + SCLERA + '"/>' +
      '<circle cx="' + x + '" cy="-0.8" r="' + ir + '" fill="' + IRIS + '"/>' +
      '<circle cx="' + x + '" cy="-0.8" r="' + pr + '" fill="' + PUPIL + '"/>' +
      '<circle cx="' + R(x + 1.2) + '" cy="-2.2" r="' + (big ? 1 : 0.8) + '" fill="#FFFFFF" opacity=".95"/>';
    if (big) s += '<circle cx="' + R(x - 1.3) + '" cy="0.4" r="0.5" fill="#FFFFFF" opacity=".6"/>';
    /* линия верхнего века */
    s += '<path d="M ' + R(x - sr) + " -2.8 Q " + x + " " + R(-2.8 - sr * 0.65) + " " + R(x + sr) +
      ' -2.8" stroke="' + MASK + '" stroke-width="1.1" stroke-linecap="round" fill="none" opacity=".85"/>';
    s += '<ellipse class="srl-lid" cx="' + x + '" cy="-1.4" rx="4.7" ry="4.9" fill="' + MASK + '"/>';
    return s;
  }

  /* веко прикрыто на ~45–50% */
  function eyeTired(x) {
    return '<circle cx="' + x + '" cy="-1" r="3.7" fill="' + SCLERA + '"/>' +
      '<circle cx="' + x + '" cy="0" r="2.7" fill="' + IRIS + '"/>' +
      '<circle cx="' + x + '" cy="0.2" r="1.4" fill="' + PUPIL + '"/>' +
      '<circle cx="' + R(x + 1) + '" cy="-0.6" r="0.6" fill="#FFFFFF" opacity=".8"/>' +
      '<path d="M ' + R(x - 3.9) + " -1.2 A 3.9 3.9 0 0 1 " + R(x + 3.9) + " -1.2 L " + R(x + 3.9) +
      ' -0.2 Q ' + x + " 0.9 " + R(x - 3.9) + ' -0.2 Z" fill="' + MASK + '"/>' +
      '<path d="M ' + R(x - 3.6) + " -0.2 Q " + x + " 1 " + R(x + 3.6) +
      ' -0.2" stroke="#4A3E30" stroke-width="1" stroke-linecap="round" fill="none" opacity=".7"/>' +
      '<ellipse class="srl-lid" cx="' + x + '" cy="-1.4" rx="4.7" ry="4.9" fill="' + MASK + '"/>';
  }

  /* глаза-щёлочки: мягкие полумесяцы, никакого страдания */
  function eyeSlit(x) {
    return '<path d="M ' + R(x - 3.4) + " -1.2 Q " + x + " 1.5 " + R(x + 3.4) +
      ' -1.2" stroke="#4A3E30" stroke-width="1.8" stroke-linecap="round" fill="none"/>';
  }

  /* ---------- голова (центр 0,0; caller оборачивает в transform) ---------- */

  function headEl(mood) {
    var s = '<circle r="20" fill="' + FUR + '"/>';
    /* лохматая макушка: мягкие пряди по контуру */
    s += '<path d="M -14 -14 Q -16.5 -19 -11 -17.6 M -5 -18.5 Q -6 -23.5 -1 -21 M 4 -19 Q 5 -23.5 9 -20 M 12 -14.5 Q 16.5 -17 14 -12" ' +
      'stroke="' + FUR + '" stroke-width="2.6" stroke-linecap="round" fill="none"/>';
    /* штрихи шерсти на лбу */
    s += '<path d="M -10 -13 l-1 4 M 0 -15 l0 4 M 9 -12.5 l1 4" stroke="' + SHADE +
      '" stroke-width="1" stroke-linecap="round" fill="none" opacity=".4"/>';
    /* светлая мордочка */
    s += '<ellipse cy="4.5" rx="14.5" ry="12" fill="' + FACE + '"/>';
    s += '<path d="M -11 12.5 Q 0 16.5 11 12.5" stroke="' + FACESH +
      '" stroke-width="1.2" stroke-linecap="round" fill="none" opacity=".6"/>';
    /* маска-«очки»: тёмные полосы через глаза, сужаются к вискам */
    s += '<path d="M -3 -4 C -8 -8.5 -15.5 -8.5 -19 -3.4 C -20 -0.7 -17.6 1.6 -14.6 1.8 C -9.8 2.1 -5 0.7 -3 -1.4 Z" fill="' + MASK + '"/>';
    s += '<path d="M 3 -4 C 8 -8.5 15.5 -8.5 19 -3.4 C 20 -0.7 17.6 1.6 14.6 1.8 C 9.8 2.1 5 0.7 3 -1.4 Z" fill="' + MASK + '"/>';
    s += '<g class="eyes">';
    if (mood === "radiant") s += eyeOpen(-9.5, true) + eyeOpen(9.5, true);
    else if (mood === "steady") s += eyeOpen(-9.5, false) + eyeOpen(9.5, false);
    else if (mood === "tired") s += eyeTired(-9.5) + eyeTired(9.5);
    else s += eyeSlit(-9.5) + eyeSlit(9.5);
    s += "</g>";
    /* нос с бликом */
    s += '<ellipse cy="7.5" rx="3.3" ry="2.5" fill="' + NOSE + '"/>';
    s += '<circle cx="-1" cy="6.9" r="0.7" fill="#7A6B58" opacity=".8"/>';
    /* вечная мягкая полуулыбка */
    if (mood === "radiant") {
      s += '<path class="mouth" d="M -5.5 12 Q 0.5 15.8 6 11.6" stroke="' + MASK + '" stroke-width="1.6" stroke-linecap="round" fill="none"/>';
    } else if (mood === "steady") {
      s += '<path class="mouth" d="M -5 12.3 Q 0.5 15 5.5 11.9" stroke="' + MASK + '" stroke-width="1.5" stroke-linecap="round" fill="none"/>';
    } else if (mood === "tired") {
      s += '<g class="mouth"><path d="M -4 12.4 Q 0 14.4 4.5 11.9" stroke="' + MASK + '" stroke-width="1.5" stroke-linecap="round" fill="none"/>' +
        '<g class="srl-yawn"><ellipse cy="13.8" rx="3.6" ry="4.6" fill="' + MOUTHIN + '"/>' +
        '<ellipse cy="15.4" rx="1.8" ry="2" fill="#6E4C40"/></g></g>';
    } else {
      s += '<path class="mouth" d="M -3.5 12.2 Q 0.5 14 4.5 11.8" stroke="' + MASK + '" stroke-width="1.4" stroke-linecap="round" fill="none"/>';
    }
    /* едва заметный тёплый румянец */
    s += '<ellipse cx="-13" cy="8" rx="3.2" ry="2" fill="#D9A98F" opacity=".35"/>';
    s += '<ellipse cx="13" cy="8" rx="3.2" ry="2" fill="#D9A98F" opacity=".35"/>';
    return s;
  }

  /* ветка вдоль верха сцены + кора */
  function topBranch() {
    return '<path d="M 14 57 C 70 49 170 49 226 56" stroke="' + BARK + '" stroke-width="9" stroke-linecap="round" fill="none"/>' +
      '<path d="M 40 55.5 q 28 -4 52 -3 M 138 51.5 q 34 -1 62 2.5" stroke="' + BARKD +
      '" stroke-width="1.4" stroke-linecap="round" fill="none" opacity=".55"/>';
  }

  /* ---------- RADIANT: висит на одной руке, вторая довольно раскинута ---------- */

  function radiant() {
    var p = ".pet-sloth-real.is-radiant ";
    var style =
      p + ".srl-sway{transform-box:view-box;transform-origin:94px 55px;animation:sloth-real-sway-r 5s ease-in-out infinite}" +
      "@keyframes sloth-real-sway-r{0%,100%{transform:rotate(-3.5deg)}50%{transform:rotate(3.5deg)}}" +
      p + ".srl-breathe{transform-box:fill-box;transform-origin:50% 72%;animation:sloth-real-breathe-r 2.2s ease-in-out infinite}" +
      "@keyframes sloth-real-breathe-r{0%,100%{transform:scale(1)}50%{transform:scale(1.018,1.03)}}" +
      p + ".srl-aura{animation:sloth-real-glow-r 2.2s ease-in-out infinite}" +
      "@keyframes sloth-real-glow-r{0%,100%{opacity:.72}50%{opacity:1}}" +
      p + ".srl-lid{transform-box:fill-box;transform-origin:50% 0%;animation:sloth-real-blink-r 4.6s linear infinite}" +
      "@keyframes sloth-real-blink-r{0%,91%{transform:scaleY(.06)}93.5%,95.5%{transform:scaleY(1)}98%,100%{transform:scaleY(.06)}}" +
      p + ".srl-arm{transform-box:view-box;transform-origin:140px 125px;animation:sloth-real-wave-r 4.4s ease-in-out infinite}" +
      "@keyframes sloth-real-wave-r{0%,100%{transform:rotate(2deg)}50%{transform:rotate(-5deg)}}" +
      p + ".srl-leaf{transform-box:fill-box;transform-origin:0% 100%;animation:sloth-real-leaf-r 3.4s ease-in-out infinite}" +
      "@keyframes sloth-real-leaf-r{0%,100%{transform:rotate(-3deg)}50%{transform:rotate(4deg)}}" +
      p + ".srl-leaf-b{animation-delay:-1.7s}" +
      p + ".srl-spark{transform-box:view-box;animation:sloth-real-spark-r 2.4s ease-in-out infinite}" +
      p + ".srl-sp1{transform-origin:58px 92px}" +
      p + ".srl-sp2{transform-origin:186px 66px;animation-delay:-.8s}" +
      p + ".srl-sp3{transform-origin:172px 148px;animation-delay:-1.6s}" +
      "@keyframes sloth-real-spark-r{0%,100%{opacity:.15;transform:scale(.55)}50%{opacity:1;transform:scale(1.05)}}";

    var defs = glowDef("sloth-real-radiant-glow", "#FFDF9E", ".85", "#FFF3D9", ".5") +
      furDef("sloth-real-radiant-fur");

    var inner =
      '<g class="aura srl-aura"><circle cx="120" cy="122" r="90" fill="url(#sloth-real-radiant-glow)"/></g>' +
      '<g class="extras">' + topBranch() +
        leafEl(34, 53, -15, 1.1, "srl-leaf") +
        leafEl(206, 52, 10, 1.15, "srl-leaf srl-leaf-b") +
        leafEl(78, 51, -8, 0.9, "srl-leaf srl-leaf-b") +
        leafEl(108, 50, 12, 0.85, "srl-leaf") +
      "</g>" +
      '<g class="srl-sway">' +
        /* длинная рука хвата: заметно длиннее тела */
        '<path d="M 94 56 C 97 76 104 90 115 101" stroke="' + FUR + '" stroke-width="11" stroke-linecap="round" fill="none"/>' +
        '<path d="M 96.5 68 C 100 82 105 91 112 98" stroke="' + SHADE + '" stroke-width="1.6" stroke-linecap="round" fill="none" opacity=".5"/>' +
        '<circle cx="94" cy="55" r="4.8" fill="' + FUR + '"/>' + claws(94, 60, 180, 1) +
        '<g class="body srl-breathe">' +
          '<ellipse cx="126" cy="147" rx="19.5" ry="27" fill="url(#sloth-real-radiant-fur)"/>' +
          /* лохматый контур: мягкие пряди по бокам */
          '<path d="M 107.5 140 q -4.5 -1 -3.5 3.5 M 108 156 q -4.5 0 -3 3.5 M 144.5 141 q 4.5 -1 3.5 3.5 M 144 157 q 4.5 0 3 3.5" ' +
            'stroke="' + FUR + '" stroke-width="2.4" stroke-linecap="round" fill="none"/>' +
          '<ellipse cx="126" cy="152" rx="11.5" ry="16" fill="' + BELLY + '"/>' +
          /* штрихи шерсти */
          '<path d="M 116 128 l-1.5 5 M 126 125 l0 5 M 136 129 l1.5 5 M 118 168 l-1 4.5 M 134 167 l1 4.5" ' +
            'stroke="' + SHADE + '" stroke-width="1" stroke-linecap="round" fill="none" opacity=".45"/>' +
          /* ножки свободно висят */
          '<path d="M 117 170 C 114 182 115 189 120 192" stroke="' + FUR + '" stroke-width="9.5" stroke-linecap="round" fill="none"/>' +
          '<path d="M 136 169 C 139 181 138 188 132 191" stroke="' + FUR + '" stroke-width="9.5" stroke-linecap="round" fill="none"/>' +
          claws(120, 192, 168, 0.62) + claws(132, 191, -168, 0.62) +
          /* голова со спокойным наклоном */
          '<g class="head" transform="translate(122 110) rotate(-5)">' + headEl("radiant") + "</g>" +
          /* свободная рука неторопливо раскинута */
          '<g class="srl-arm">' +
            '<path d="M 140 125 C 159 117 171 103 176 90" stroke="' + FUR + '" stroke-width="11" stroke-linecap="round" fill="none"/>' +
            '<path d="M 146 119 C 158 112 167 102 171 93" stroke="' + SHADE + '" stroke-width="1.6" stroke-linecap="round" fill="none" opacity=".5"/>' +
            claws(178, 87, -138, 0.85) +
          "</g>" +
        "</g>" +
      "</g>" +
      '<g class="particles">' + sparkEl(58, 92, 1, "srl-sp1") +
        sparkEl(186, 66, 0.8, "srl-sp2") + sparkEl(172, 148, 0.7, "srl-sp3") + "</g>";

    return shell("radiant", style, defs, inner);
  }

  /* ---------- STEADY: сидит в развилке ветки, обняв колени ---------- */

  function steady() {
    var p = ".pet-sloth-real.is-steady ";
    var style =
      p + ".srl-sway{transform-box:view-box;transform-origin:118px 168px;animation:sloth-real-sway-s 7s ease-in-out infinite}" +
      "@keyframes sloth-real-sway-s{0%,100%{transform:rotate(-1.5deg)}50%{transform:rotate(1.5deg)}}" +
      p + ".srl-breathe{transform-box:fill-box;transform-origin:50% 70%;animation:sloth-real-breathe-s 3.5s ease-in-out infinite}" +
      "@keyframes sloth-real-breathe-s{0%,100%{transform:scale(1)}50%{transform:scale(1.014,1.024)}}" +
      p + ".srl-aura{animation:sloth-real-glow-s 3.5s ease-in-out infinite}" +
      "@keyframes sloth-real-glow-s{0%,100%{opacity:.65}50%{opacity:.9}}" +
      p + ".srl-lid{transform-box:fill-box;transform-origin:50% 0%;animation:sloth-real-blink-s 5.4s linear infinite}" +
      "@keyframes sloth-real-blink-s{0%,92%{transform:scaleY(.06)}94.5%,96.5%{transform:scaleY(1)}99%,100%{transform:scaleY(.06)}}" +
      p + ".srl-leaf{transform-box:fill-box;transform-origin:0% 100%;animation:sloth-real-leaf-s 4.6s ease-in-out infinite}" +
      "@keyframes sloth-real-leaf-s{0%,100%{transform:rotate(-3deg)}50%{transform:rotate(4deg)}}" +
      p + ".srl-leaf-b{animation-delay:-2.3s}";

    var defs = glowDef("sloth-real-steady-glow", "#BFE4CD", ".75", "#E8F3EA", ".45") +
      furDef("sloth-real-steady-fur");

    var inner =
      '<g class="aura srl-aura"><circle cx="118" cy="120" r="88" fill="url(#sloth-real-steady-glow)"/></g>' +
      '<g class="extras">' +
        '<path d="M 16 172 C 70 164 170 164 224 171" stroke="' + BARK + '" stroke-width="10" stroke-linecap="round" fill="none"/>' +
        '<path d="M 44 169.5 q 30 -4 56 -3 M 136 166.5 q 34 -0.5 60 3" stroke="' + BARKD +
          '" stroke-width="1.4" stroke-linecap="round" fill="none" opacity=".55"/>' +
        '<path d="M 120 170 C 138 149 158 129 176 112" stroke="' + BARK + '" stroke-width="6.5" stroke-linecap="round" fill="none"/>' +
        leafEl(178, 113, -5, 1.1, "srl-leaf") +
        leafEl(158, 131, -30, 0.85, "srl-leaf srl-leaf-b") +
        leafEl(34, 167, -12, 1, "srl-leaf") +
      "</g>" +
      '<g class="srl-sway"><g class="body srl-breathe">' +
        '<ellipse cx="116" cy="131" rx="24" ry="24" fill="url(#sloth-real-steady-fur)"/>' +
        /* лохматый контур */
        '<path d="M 93.5 123 q -4.5 -2 -2.5 2.5 M 96 138 q -4.5 -0.5 -2.5 3 M 138.5 122 q 4.5 -2 2.5 2.5 M 136.5 139 q 4.5 -0.5 2.5 3" ' +
          'stroke="' + FUR + '" stroke-width="2.4" stroke-linecap="round" fill="none"/>' +
        /* штрихи шерсти по спине */
        '<path d="M 104 115 l-1.5 5 M 116 112 l0 5 M 128 115 l1.5 5 M 99 132 l-1 4.5 M 133 133 l1 4.5" ' +
          'stroke="' + SHADE + '" stroke-width="1" stroke-linecap="round" fill="none" opacity=".45"/>' +
        /* правая рука уходит к коленям за телом (тональная подложка отделяет) */
        '<path d="M 137 118 C 147 132 147 144 141 152" stroke="' + SHADE + '" stroke-width="13.5" stroke-linecap="round" fill="none" opacity=".6"/>' +
        '<path d="M 137 118 C 147 132 147 144 141 152" stroke="' + FUR + '" stroke-width="10.5" stroke-linecap="round" fill="none"/>' +
        /* колени подтянуты */
        '<circle cx="103" cy="148" r="10" fill="' + FUR + '"/>' +
        '<circle cx="130" cy="148" r="10" fill="' + FUR + '"/>' +
        '<path d="M 97 143 a 8 8 0 0 1 10 -2 M 124 143 a 8 8 0 0 1 10 -2" stroke="' + LIGHT +
          '" stroke-width="1.4" stroke-linecap="round" fill="none" opacity=".7"/>' +
        /* ступни с когтями поверх ветки */
        '<ellipse cx="102" cy="161" rx="6" ry="4.2" fill="' + FUR + '"/>' +
        '<ellipse cx="131" cy="161" rx="6" ry="4.2" fill="' + FUR + '"/>' +
        claws(102, 163, 15, 0.6) + claws(131, 163, -15, 0.6) +
        /* длинная левая рука обнимает колени вокруг */
        '<path d="M 96 119 C 84 140 90 156 112 160 C 134 162 148 149 144 131" stroke="' + SHADE +
          '" stroke-width="14" stroke-linecap="round" fill="none" opacity=".6"/>' +
        '<path d="M 96 119 C 84 140 90 156 112 160 C 134 162 148 149 144 131" stroke="' + FUR +
          '" stroke-width="10.5" stroke-linecap="round" fill="none"/>' +
        '<path d="M 90 134 C 89 145 94 153 104 157" stroke="' + SHADE + '" stroke-width="1.4" stroke-linecap="round" fill="none" opacity=".45"/>' +
        claws(144, 131, 30, 0.8) +
        '<g class="head" transform="translate(116 92)">' + headEl("steady") + "</g>" +
      "</g></g>";

    return shell("steady", style, defs, inner);
  }

  /* ---------- TIRED: обвис на ветке на обеих руках, тело вытянулось ---------- */

  function tired() {
    var p = ".pet-sloth-real.is-tired ";
    var style =
      p + ".srl-sway{transform-box:view-box;transform-origin:121px 55px;animation:sloth-real-sway-t 8s ease-in-out infinite}" +
      "@keyframes sloth-real-sway-t{0%,100%{transform:rotate(-1.2deg)}50%{transform:rotate(1.2deg)}}" +
      p + ".srl-breathe{transform-box:fill-box;transform-origin:50% 60%;animation:sloth-real-breathe-t 5s ease-in-out infinite}" +
      "@keyframes sloth-real-breathe-t{0%,100%{transform:scale(1)}50%{transform:scale(1.01,1.018)}}" +
      p + ".srl-aura{animation:sloth-real-glow-t 5s ease-in-out infinite}" +
      "@keyframes sloth-real-glow-t{0%,100%{opacity:.5}50%{opacity:.7}}" +
      p + ".srl-lid{transform-box:fill-box;transform-origin:50% 0%;animation:sloth-real-blink-t 6.5s linear infinite}" +
      "@keyframes sloth-real-blink-t{0%,88%{transform:scaleY(.06)}91%,93%{transform:scaleY(1)}96%,100%{transform:scaleY(.06)}}" +
      p + ".srl-yawn{transform-box:fill-box;transform-origin:50% 15%;animation:sloth-real-yawn-t 9s ease-in-out infinite}" +
      "@keyframes sloth-real-yawn-t{0%,68%{transform:scale(.12);opacity:0}75%,85%{transform:scale(1);opacity:1}92%,100%{transform:scale(.12);opacity:0}}" +
      p + ".srl-leaf{transform-box:fill-box;transform-origin:0% 100%;animation:sloth-real-leaf-t 6s ease-in-out infinite}" +
      "@keyframes sloth-real-leaf-t{0%,100%{transform:rotate(-2.5deg)}50%{transform:rotate(3deg)}}" +
      p + ".srl-leaf-b{animation-delay:-3s}";

    var defs = glowDef("sloth-real-tired-glow", "#D9E1F1", ".6", "#EDF0F8", ".38") +
      furDef("sloth-real-tired-fur");

    var inner =
      '<g class="aura srl-aura"><circle cx="121" cy="128" r="88" fill="url(#sloth-real-tired-glow)"/></g>' +
      '<g class="extras">' + topBranch() +
        leafEl(32, 53, -18, 1, "srl-leaf") +
        leafEl(208, 52, 8, 1.05, "srl-leaf srl-leaf-b") +
      "</g>" +
      '<g class="srl-sway">' +
        /* обе руки вытянуты к ветке, тело провисло */
        '<path d="M 98 56 C 100 80 106 100 114 113" stroke="' + FUR + '" stroke-width="10.5" stroke-linecap="round" fill="none"/>' +
        '<path d="M 144 56 C 142 80 136 100 128 113" stroke="' + FUR + '" stroke-width="10.5" stroke-linecap="round" fill="none"/>' +
        '<path d="M 100.5 70 C 102.5 88 106.5 100 111 108 M 141.5 70 C 139.5 88 135.5 100 131 108" ' +
          'stroke="' + SHADE + '" stroke-width="1.4" stroke-linecap="round" fill="none" opacity=".5"/>' +
        '<circle cx="98" cy="55" r="4.5" fill="' + FUR + '"/>' + claws(98, 60, 180, 0.9) +
        '<circle cx="144" cy="55" r="4.5" fill="' + FUR + '"/>' + claws(144, 60, 180, 0.9) +
        '<g class="body srl-breathe">' +
          /* тело осело и вытянулось вниз */
          '<ellipse cx="121" cy="156" rx="17" ry="29" fill="url(#sloth-real-tired-fur)"/>' +
          '<path d="M 104.5 150 q -4.5 -1 -3.5 3.5 M 105.5 168 q -4.5 0 -3 3.5 M 137.5 151 q 4.5 -1 3.5 3.5 M 136.5 169 q 4.5 0 3 3.5" ' +
            'stroke="' + FUR + '" stroke-width="2.2" stroke-linecap="round" fill="none"/>' +
          '<ellipse cx="121" cy="161" rx="10" ry="18" fill="' + BELLY + '"/>' +
          '<path d="M 113 138 l-1 4.5 M 121 136 l0 4.5 M 129 138 l1 4.5 M 116 182 l-1 4 M 127 182 l1 4" ' +
            'stroke="' + SHADE + '" stroke-width="1" stroke-linecap="round" fill="none" opacity=".45"/>' +
          /* ножки обвисли */
          '<path d="M 115 184 C 113 193 115 198 119 200" stroke="' + FUR + '" stroke-width="8.5" stroke-linecap="round" fill="none"/>' +
          '<path d="M 127 184 C 129 193 127 198 123 200" stroke="' + FUR + '" stroke-width="8.5" stroke-linecap="round" fill="none"/>' +
          claws(119, 200, 170, 0.55) + claws(123, 200, -170, 0.55) +
          /* голова просела между плеч */
          '<g class="head" transform="translate(121 114) rotate(2)">' + headEl("tired") + "</g>" +
        "</g>" +
      "</g>";

    return shell("tired", style, defs, inner);
  }

  /* ---------- DRAINED: лежит на спине вдоль ветки под листом-пледом ---------- */

  function drained() {
    var p = ".pet-sloth-real.is-drained ";
    var style =
      p + ".srl-breathe{transform-box:fill-box;transform-origin:50% 55%;animation:sloth-real-breathe-d 7s ease-in-out infinite}" +
      "@keyframes sloth-real-breathe-d{0%,100%{transform:scale(1)}50%{transform:scale(1.008,1.02)}}" +
      p + ".srl-aura{animation:sloth-real-glow-d 7s ease-in-out infinite}" +
      "@keyframes sloth-real-glow-d{0%,100%{opacity:.5}50%{opacity:.68}}" +
      p + ".srl-dangle{transform-box:view-box;transform-origin:98px 140px;animation:sloth-real-dangle-d 7s ease-in-out infinite}" +
      "@keyframes sloth-real-dangle-d{0%,100%{transform:rotate(-3deg)}50%{transform:rotate(3deg)}}" +
      p + ".srl-blanket{transform-box:fill-box;animation:sloth-real-blanket-d 7s ease-in-out infinite}" +
      "@keyframes sloth-real-blanket-d{0%,100%{transform:translateY(0)}50%{transform:translateY(-1.5px)}}" +
      p + ".srl-z{opacity:0;animation:sloth-real-z-d 8s linear infinite}" +
      "@keyframes sloth-real-z-d{0%{transform:translate(0,0);opacity:0}12%{opacity:.85}75%{opacity:.7}100%{transform:translate(9px,-34px);opacity:0}}" +
      p + ".srl-z2{animation-delay:-2.7s}" +
      p + ".srl-z3{animation-delay:-5.4s}" +
      p + ".srl-leaf{transform-box:fill-box;transform-origin:0% 100%;animation:sloth-real-leaf-d 8s ease-in-out infinite}" +
      "@keyframes sloth-real-leaf-d{0%,100%{transform:rotate(-2deg)}50%{transform:rotate(2.5deg)}}" +
      p + ".srl-leaf-b{animation-delay:-4s}";

    var defs = glowDef("sloth-real-drained-glow", "#DFD5F0", ".55", "#F0ECF7", ".32") +
      furDef("sloth-real-drained-fur");

    var inner =
      '<g class="aura srl-aura"><circle cx="122" cy="140" r="84" fill="url(#sloth-real-drained-glow)"/></g>' +
      '<g class="extras">' +
        /* толстая ветка-лежанка с корой */
        '<path d="M 12 154 C 70 147 172 147 228 153" stroke="' + BARK + '" stroke-width="15" stroke-linecap="round" fill="none"/>' +
        '<path d="M 36 151 q 34 -3.5 64 -3 M 132 148.5 q 40 0 72 3" stroke="' + BARKD +
          '" stroke-width="1.6" stroke-linecap="round" fill="none" opacity=".5"/>' +
        leafEl(30, 148, -20, 1, "srl-leaf") +
        leafEl(212, 147, 12, 1.05, "srl-leaf srl-leaf-b") +
      "</g>" +
      /* свешенная рука едва покачивается */
      '<g class="srl-dangle">' +
        '<path d="M 98 140 C 90 160 84 176 82 190" stroke="' + FUR + '" stroke-width="9.5" stroke-linecap="round" fill="none"/>' +
        '<path d="M 94.5 152 C 90 165 87 176 85.5 185" stroke="' + SHADE + '" stroke-width="1.4" stroke-linecap="round" fill="none" opacity=".5"/>' +
        claws(82, 190, 8, 0.75) +
      "</g>" +
      '<g class="body srl-breathe">' +
        /* тело на спине вдоль ветки */
        '<ellipse cx="130" cy="133" rx="32" ry="15.5" fill="url(#sloth-real-drained-fur)"/>' +
        '<path d="M 112 120.5 q -2 -4.5 2.5 -3.5 M 127 118 q -1 -4.5 3.5 -3 M 147 120.5 q 2 -4.5 5 -2.5" ' +
          'stroke="' + FUR + '" stroke-width="2.2" stroke-linecap="round" fill="none"/>' +
        '<path d="M 116 124 l-1 4 M 130 122 l0 4 M 146 124.5 l1 4" stroke="' + SHADE +
          '" stroke-width="1" stroke-linecap="round" fill="none" opacity=".45"/>' +
        /* ступни торчат из-под пледа справа */
        '<circle cx="171" cy="136" r="6.5" fill="' + FUR + '"/>' + claws(175, 130, -70, 0.55) +
        /* голова запрокинута, лицом вверх */
        '<g class="head" transform="translate(88 126) rotate(-12)">' + headEl("drained") + "</g>" +
        /* большой лист-плед с прожилками */
        '<g class="srl-blanket">' +
          '<path d="M 98 128 Q 128 108 172 126 Q 177 136 168 142 Q 130 152 100 140 Q 93 132 98 128 Z" fill="' + LEAF + '"/>' +
          '<path d="M 102 133 Q 134 123 166 133" stroke="' + LEAFD + '" stroke-width="1.8" stroke-linecap="round" fill="none"/>' +
          '<path d="M 116 128.5 q 2 4 1 8 M 134 124.5 q 1.5 4.5 1 9 M 152 127 q 1.5 4 0.5 8" ' +
            'stroke="' + LEAFD + '" stroke-width="1.1" stroke-linecap="round" fill="none" opacity=".7"/>' +
        "</g>" +
      "</g>" +
      /* медленные «z» — медленнее, чем у всех */
      '<g class="particles">' + zee(98, 104, 1, "srl-z1") +
        zee(106, 96, 0.75, "srl-z2") + zee(112, 88, 0.55, "srl-z3") + "</g>";

    return shell("drained", style, defs, inner);
  }

  window.registerPetStyle({
    petId: "sloth",
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
