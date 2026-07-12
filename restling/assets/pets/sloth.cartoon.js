/* Fern / Ферн — ленивец (id: sloth), стиль CARTOON.
   Стилевой модуль по assets/pets/CONTRACT.md v2 — только inline-SVG + CSS.
   Тот же персонаж и видовые признаки, что в sloth.js (soft): очень длинные
   руки с тремя когтями-крючками, тёмная маска-«очки» к вискам, круглая
   голова с полуулыбкой, лохматые пучки, ветка как часть композиции.
   Стиль: стикерная энергия — жирный ТОНАЛЬНЫЙ контур 4px (не чёрный),
   насыщеннее палитра кита, крупные глаза с двойным бликом, экспрессивнее
   мимика и амплитуда, но темпы mood — по контракту (2.2/3.5/5/7s).
   Scoping: корень `pet-svg pet-sloth pet-sloth-cartoon is-<mood>`, все
   внутренние классы и keyframes — с префиксом `sloth-cartoon-`. */
(function () {
  "use strict";

  var C = {
    fur: "#C9BC85",       /* насыщенная оливка (soft #B8B29A, saturation up) */
    line: "#7E7145",      /* тональный контур ~38% темнее fur */
    belly: "#E5DAA6",
    face: "#F6ECC4",
    mask: "#77684E",
    maskLine: "#4E4331",
    claw: "#6E6148",
    ink: "#3E3A47",
    nose: "#5F5340",
    cheek: "#F5906B",
    leaf: "#3FA968",
    leafLine: "#277144",
    branch: "#B08350",
    branchLine: "#7A5833",
    spark: "#F5A623",
    zzz: "#9C8BC0",
    white: "#FFFDF6"
  };

  function R(v) { return Math.round(v * 10) / 10; }
  function P(m) { return ".pet-sloth-cartoon.is-" + m + " "; }

  /* ---------- мелкие детали ---------- */

  /* «сосиска»-конечность с жирным тональным контуром: два штриха */
  function limb(d, w) {
    return '<path d="' + d + '" stroke="' + C.line + '" stroke-width="' + R(w + 7.5) +
      '" stroke-linecap="round" fill="none"/>' +
      '<path d="' + d + '" stroke="' + C.fur + '" stroke-width="' + w +
      '" stroke-linecap="round" fill="none"/>';
  }

  /* 3 когтя-крючка, толще, чем в soft; rot — куда смотрят (0 = вниз) */
  function claws(x, y, rot, k) {
    k = k || 1;
    return '<path transform="translate(' + x + " " + y + ") rotate(" + rot + ") scale(" + k + ')" ' +
      'd="M -6 0 Q -3 5 -5.4 10.6 M 0 0 Q 3.4 5 1 11.6 M 6 0 Q 9 5 6.4 10.6" ' +
      'stroke="' + C.claw + '" stroke-width="4" stroke-linecap="round" fill="none"/>';
  }

  /* лист с контуром; cls = 'sloth-cartoon-leaf' (+' sloth-cartoon-leaf-b') */
  function leafEl(x, y, rot, k, cls) {
    return '<g transform="translate(' + x + " " + y + ") rotate(" + rot + ") scale(" + k + ')">' +
      '<path class="' + (cls || "") + '" d="M 0 0 Q 7 -4 11 -16 Q 1 -11 0 0 Z" fill="' + C.leaf +
      '" stroke="' + C.leafLine + '" stroke-width="2.6" stroke-linejoin="round"/></g>';
  }

  /* лохматый пучок с контуром; кладётся ПОД основную форму (стикерные слои) */
  function tuft(x, y, rot, k) {
    return '<path transform="translate(' + x + " " + y + ") rotate(" + rot + ") scale(" + (k || 1) + ')" ' +
      'd="M -7 3 Q -4 -9 0 -3 Q 3.5 -9.5 7 3 Z" fill="' + C.fur +
      '" stroke="' + C.line + '" stroke-width="3.2" stroke-linejoin="round"/>';
  }

  function sparkEl(x, y, k, cls) {
    return '<path class="' + cls + '" d="M ' + x + " " + R(y - 8.5 * k) +
      " L " + R(x + 2.2 * k) + " " + R(y - 2.2 * k) +
      " L " + R(x + 8.5 * k) + " " + y +
      " L " + R(x + 2.2 * k) + " " + R(y + 2.2 * k) +
      " L " + x + " " + R(y + 8.5 * k) +
      " L " + R(x - 2.2 * k) + " " + R(y + 2.2 * k) +
      " L " + R(x - 8.5 * k) + " " + y +
      " L " + R(x - 2.2 * k) + " " + R(y - 2.2 * k) + ' Z" fill="' + C.spark + '"/>';
  }

  function zee(x, y, k, cls) {
    return '<g transform="translate(' + x + " " + y + ')">' +
      '<path class="sloth-cartoon-z ' + cls + '" d="M 0 0 h ' + R(7 * k) + " l " + R(-7 * k) + " " + R(7 * k) +
      " h " + R(7 * k) + '" stroke="' + C.zzz + '" stroke-width="' + R(2.8 * k) +
      '" stroke-linecap="round" stroke-linejoin="round" fill="none"/></g>';
  }

  /* ---------- глаза (крупнее, чем в soft; локальные координаты головы) ---------- */

  function eyeOpen(x, big) {
    var r = big ? 8.2 : 7, pr = big ? 5.4 : 4.6;
    return '<circle cx="' + x + '" cy="-1" r="' + r + '" fill="' + C.white +
      '" stroke="' + C.maskLine + '" stroke-width="2.4"/>' +
      '<circle cx="' + x + '" cy="-0.4" r="' + pr + '" fill="' + C.ink + '"/>' +
      '<circle cx="' + R(x + 2.4) + '" cy="-3.4" r="' + (big ? 2.6 : 2) + '" fill="#FFFFFF"/>' +
      '<circle cx="' + R(x - 2.4) + '" cy="1.4" r="1.2" fill="#FFFFFF"/>' +
      '<ellipse class="sloth-cartoon-blink" cx="' + x + '" cy="-1.4" rx="' + R(r + 2) +
      '" ry="' + R(r + 2.4) + '" fill="' + C.mask + '"/>';
  }

  /* веко на ~50%, жирный край века */
  function eyeTired(x) {
    return '<circle cx="' + x + '" cy="-1" r="7" fill="' + C.white +
      '" stroke="' + C.maskLine + '" stroke-width="2.4"/>' +
      '<circle cx="' + x + '" cy="1" r="4.2" fill="' + C.ink + '"/>' +
      '<circle cx="' + R(x + 1.8) + '" cy="2" r="1.3" fill="#FFFFFF"/>' +
      '<path d="M ' + R(x - 7.4) + " -2 A 7.4 7.4 0 0 1 " + R(x + 7.4) + " -2 L " + R(x + 7.4) +
      " 1 L " + R(x - 7.4) + ' 1 Z" fill="' + C.mask + '"/>' +
      '<path d="M ' + R(x - 7.2) + " 1 L " + R(x + 7.2) + ' 1" stroke="' + C.maskLine +
      '" stroke-width="2.6" stroke-linecap="round"/>' +
      '<ellipse class="sloth-cartoon-blink" cx="' + x + '" cy="-1.4" rx="9" ry="9.4" fill="' + C.mask + '"/>';
  }

  /* глаза-щёлочки: мягкие довольные полумесяцы, толстый штрих */
  function eyeSlit(x) {
    return '<path d="M ' + R(x - 6) + " -1.5 Q " + x + " 3.4 " + R(x + 6) +
      ' -1.5" stroke="' + C.ink + '" stroke-width="3.2" stroke-linecap="round" fill="none"/>';
  }

  /* ---------- голова (центр 0,0; caller оборачивает в transform) ---------- */

  function headEl(mood) {
    /* пучки макушки — ПОД головой, контур головы перекрывает их низ */
    var s = tuft(-13, -25, -22, 1.15) + tuft(0, -28, 0, 1.25) + tuft(13, -25, 22, 1.15);
    s += '<circle r="28" fill="' + C.fur + '" stroke="' + C.line + '" stroke-width="4"/>';
    /* светлая мордочка */
    s += '<ellipse cy="6" rx="20.5" ry="16.5" fill="' + C.face + '"/>';
    /* маска-«очки»: тёмные полосы через глаза к вискам, с контуром */
    s += '<ellipse cx="-12" cy="-1" rx="13.5" ry="8" fill="' + C.mask +
      '" stroke="' + C.maskLine + '" stroke-width="2.4" transform="rotate(-14 -12 -1)"/>';
    s += '<ellipse cx="12" cy="-1" rx="13.5" ry="8" fill="' + C.mask +
      '" stroke="' + C.maskLine + '" stroke-width="2.4" transform="rotate(14 12 -1)"/>';
    s += '<g class="eyes">';
    if (mood === "radiant") s += eyeOpen(-11, true) + eyeOpen(11, true);
    else if (mood === "steady") s += eyeOpen(-11, false) + eyeOpen(11, false);
    else if (mood === "tired") s += eyeTired(-11) + eyeTired(11);
    else s += eyeSlit(-11) + eyeSlit(11);
    s += "</g>";
    s += '<ellipse cy="9.5" rx="5" ry="3.6" fill="' + C.nose + '"/>';
    /* рот: экспрессивнее soft-версии, но всё та же фирменная полуулыбка */
    if (mood === "radiant") {
      s += '<g class="mouth"><path d="M -8.5 14 Q 0 17 8.5 13.5 Q 5.5 24.5 0 24.8 Q -5.5 25 -8.5 14 Z" fill="' + C.nose +
        '" stroke="' + C.ink + '" stroke-width="2.4" stroke-linejoin="round"/>' +
        '<ellipse cx="0" cy="22" rx="4.4" ry="2.6" fill="' + C.cheek + '"/></g>';
    } else if (mood === "steady") {
      s += '<path class="mouth" d="M -7 15 Q 0.5 20.5 7.5 14.5" stroke="' + C.ink +
        '" stroke-width="2.8" stroke-linecap="round" fill="none"/>';
    } else if (mood === "tired") {
      s += '<g class="mouth"><path d="M -5 15.5 Q 0 18.5 5.5 15" stroke="' + C.ink +
        '" stroke-width="2.8" stroke-linecap="round" fill="none"/>' +
        '<ellipse class="sloth-cartoon-yawn" cy="17" rx="5.5" ry="6.5" fill="' + C.nose +
        '" stroke="' + C.ink + '" stroke-width="2.2"/></g>';
    } else {
      s += '<path class="mouth" d="M -4.5 15.5 Q 0.5 18 5 14.5" stroke="' + C.ink +
        '" stroke-width="2.4" stroke-linecap="round" fill="none"/>';
    }
    /* крупные стикерные щёчки */
    s += '<ellipse cx="-19.5" cy="9" rx="5.6" ry="3.8" fill="' + C.cheek + '" opacity=".7"/>';
    s += '<ellipse cx="19.5" cy="9" rx="5.6" ry="3.8" fill="' + C.cheek + '" opacity=".7"/>';
    return s;
  }

  /* ---------- общий CSS-каркас mood-а ---------- */

  function baseCss(m, o) {
    var p = P(m);
    var k = "sloth-cartoon-" + m.charAt(0) + "-";
    var s = "";
    s += p + ".sloth-cartoon-breathe{transform-box:fill-box;transform-origin:50% 80%;animation:" + k + "breathe " + o.breathe + " ease-in-out infinite}";
    s += "@keyframes " + k + "breathe{0%,100%{transform:scale(1)}50%{transform:scale(" + o.amp + ")}}";
    s += p + ".sloth-cartoon-aura{animation:" + k + "aura " + o.breathe + " ease-in-out infinite}";
    s += "@keyframes " + k + "aura{0%,100%{opacity:" + o.aura[0] + "}50%{opacity:" + o.aura[1] + "}}";
    if (o.blink) {
      s += p + ".sloth-cartoon-blink{transform-box:fill-box;transform-origin:50% 0%;animation:" + k + "blink " + o.blink + " linear infinite}";
      s += "@keyframes " + k + "blink{0%,91%{transform:scaleY(.05)}94%{transform:scaleY(1)}97%,100%{transform:scaleY(.05)}}";
    }
    if (o.swing) {
      s += p + ".sloth-cartoon-swing{transform-box:view-box;transform-origin:" + o.swing.o + ";animation:" + k + "sway " + o.swing.d + " ease-in-out infinite}";
      s += "@keyframes " + k + "sway{0%,100%{transform:rotate(-" + o.swing.a + "deg)}50%{transform:rotate(" + o.swing.a + "deg)}}";
    }
    s += p + ".sloth-cartoon-leaf{transform-box:fill-box;transform-origin:0% 100%;animation:" + k + "leaf " + o.leafD + " ease-in-out infinite}";
    s += "@keyframes " + k + "leaf{0%,100%{transform:rotate(-6deg)}50%{transform:rotate(8deg)}}";
    s += p + ".sloth-cartoon-leaf-b{animation-delay:" + o.leafB + "}";
    s += o.extra || "";
    s += "@media (prefers-reduced-motion:reduce){" + p + "*{animation:none !important}}";
    return s;
  }

  function wrap(mood, css, scene) {
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" ' +
      'class="pet-svg pet-sloth pet-sloth-cartoon is-' + mood + '" role="img" aria-label="Fern the sloth">' +
      "<style>" + css + "</style>" + scene + "</svg>";
  }

  /* ветка вдоль верха сцены, с жирным контуром */
  function topBranch() {
    var d = "M 14 57 C 70 49 170 49 226 56";
    return '<path d="' + d + '" stroke="' + C.branchLine + '" stroke-width="13.5" stroke-linecap="round" fill="none"/>' +
      '<path d="' + d + '" stroke="' + C.branch + '" stroke-width="8.5" stroke-linecap="round" fill="none"/>';
  }

  /* ---------- radiant: висит на одной руке, вторая машет широко ---------- */

  function radiant() {
    var css = baseCss("radiant", {
      breathe: "2.2s", amp: "1.04,1.055", aura: [".55", ".9"], blink: "4.2s",
      swing: { o: "92px 56px", a: 7, d: "4.2s" }, leafD: "3.2s", leafB: "-1.6s",
      extra:
        P("radiant") + ".sloth-cartoon-wave{transform-box:view-box;transform-origin:141px 124px;animation:sloth-cartoon-r-wave 3.2s ease-in-out infinite}" +
        "@keyframes sloth-cartoon-r-wave{0%,100%{transform:rotate(6deg)}50%{transform:rotate(-14deg)}}" +
        P("radiant") + ".sloth-cartoon-spark{transform-box:fill-box;transform-origin:50% 50%;animation:sloth-cartoon-r-spark 2.2s ease-in-out infinite}" +
        "@keyframes sloth-cartoon-r-spark{0%,100%{opacity:.2;transform:scale(.5)}50%{opacity:1;transform:scale(1.25)}}" +
        P("radiant") + ".sloth-cartoon-sp2{animation-delay:-.75s}" +
        P("radiant") + ".sloth-cartoon-sp3{animation-delay:-1.5s}"
    });

    var s = '<ellipse class="aura sloth-cartoon-aura" cx="124" cy="126" rx="68" ry="64" fill="#FFF3D9"/>';
    s += '<g class="extras">' + topBranch() +
      leafEl(34, 53, -15, 1.15, "sloth-cartoon-leaf") +
      leafEl(206, 52, 10, 1.2, "sloth-cartoon-leaf sloth-cartoon-leaf-b") +
      leafEl(78, 51, -8, 0.9, "sloth-cartoon-leaf sloth-cartoon-leaf-b") + "</g>";

    s += '<g class="sloth-cartoon-swing">';
    /* длинная левая рука: хват на ветке */
    s += limb("M 92 56 C 95 76 103 90 115 100", 13);
    s += '<circle cx="92" cy="55" r="6.5" fill="' + C.fur + '" stroke="' + C.line + '" stroke-width="3.2"/>' +
      claws(92, 61, 180, 1.05);
    s += '<g class="body sloth-cartoon-breathe">';
    s += tuft(104, 150, -82, 1.05) + tuft(148, 144, 82, 1.05) + tuft(142, 126, 55, 0.95);
    s += '<ellipse cx="126" cy="149" rx="22.5" ry="28" fill="' + C.fur + '" stroke="' + C.line + '" stroke-width="4"/>';
    s += '<ellipse cx="126" cy="154" rx="13.5" ry="18" fill="' + C.belly + '"/>';
    /* ножки болтаются */
    s += limb("M 116 173 C 113 185 114 192 119 195", 11);
    s += limb("M 137 171 C 140 183 139 191 133 194", 11);
    s += claws(119, 196, 165, 0.65) + claws(133, 195, -165, 0.65);
    /* голова с игривым наклоном */
    s += '<g class="head" transform="translate(122 108) rotate(-8)">' + headEl("radiant") + "</g>";
    /* свободная рука машет широко — стикерная экспрессия */
    s += '<g class="sloth-cartoon-wave">' + limb("M 141 124 C 161 115 173 101 177 87", 13) +
      claws(179, 83, -140, 0.95) + "</g>";
    s += "</g></g>";

    s += '<g class="particles">' + sparkEl(56, 92, 1.05, "sloth-cartoon-spark sloth-cartoon-sp1") +
      sparkEl(188, 66, 0.85, "sloth-cartoon-spark sloth-cartoon-sp2") +
      sparkEl(174, 150, 0.7, "sloth-cartoon-spark sloth-cartoon-sp3") + "</g>";

    return wrap("radiant", css, s);
  }

  /* ---------- steady: сидит в развилке ветки, обняв колени ---------- */

  function steady() {
    var css = baseCss("steady", {
      breathe: "3.5s", amp: "1.03,1.048", aura: [".5", ".8"], blink: "5s",
      swing: { o: "118px 166px", a: 2.6, d: "6s" }, leafD: "4.4s", leafB: "-2.2s"
    });

    var s = '<ellipse class="aura sloth-cartoon-aura" cx="120" cy="120" rx="66" ry="60" fill="#E8F3EA"/>';
    s += '<g class="extras">';
    var b1 = "M 16 171 C 70 163 170 163 224 170";
    var b2 = "M 120 169 C 138 148 158 128 176 111";
    s += '<path d="' + b1 + '" stroke="' + C.branchLine + '" stroke-width="15" stroke-linecap="round" fill="none"/>';
    s += '<path d="' + b1 + '" stroke="' + C.branch + '" stroke-width="10" stroke-linecap="round" fill="none"/>';
    s += '<path d="' + b2 + '" stroke="' + C.branchLine + '" stroke-width="11" stroke-linecap="round" fill="none"/>';
    s += '<path d="' + b2 + '" stroke="' + C.branch + '" stroke-width="6.5" stroke-linecap="round" fill="none"/>';
    s += leafEl(178, 113, -5, 1.15, "sloth-cartoon-leaf") +
      leafEl(158, 131, -30, 0.9, "sloth-cartoon-leaf sloth-cartoon-leaf-b") +
      leafEl(34, 167, -12, 1.05, "sloth-cartoon-leaf") + "</g>";

    s += '<g class="sloth-cartoon-swing"><g class="body sloth-cartoon-breathe">';
    s += tuft(90, 122, -78, 1.05) + tuft(142, 119, 78, 1.05);
    s += '<ellipse cx="116" cy="130" rx="27" ry="26" fill="' + C.fur + '" stroke="' + C.line + '" stroke-width="4"/>';
    /* правая рука уходит к коленям за телом */
    s += limb("M 138 118 C 148 132 148 144 142 152", 12);
    /* колени подтянуты */
    s += '<circle cx="103" cy="147" r="11" fill="' + C.fur + '" stroke="' + C.line + '" stroke-width="3.6"/>';
    s += '<circle cx="130" cy="147" r="11" fill="' + C.fur + '" stroke="' + C.line + '" stroke-width="3.6"/>';
    /* ступни с когтями поверх ветки */
    s += '<ellipse cx="102" cy="161" rx="7" ry="5" fill="' + C.fur + '" stroke="' + C.line + '" stroke-width="3"/>';
    s += '<ellipse cx="131" cy="161" rx="7" ry="5" fill="' + C.fur + '" stroke="' + C.line + '" stroke-width="3"/>';
    s += claws(102, 164, 15, 0.65) + claws(131, 164, -15, 0.65);
    /* длинная левая рука обнимает колени вокруг */
    s += limb("M 95 119 C 83 140 90 157 113 160 C 135 162 149 149 145 131", 12);
    s += claws(145, 131, 30, 0.9);
    s += '<g class="head" transform="translate(116 88)">' + headEl("steady") + "</g>";
    s += "</g></g>";

    return wrap("steady", css, s);
  }

  /* ---------- tired: обвис на ветке на обеих руках, тело вытянулось ---------- */

  function tired() {
    var css = baseCss("tired", {
      breathe: "5s", amp: "1.022,1.035", aura: [".35", ".6"], blink: "6.5s",
      swing: { o: "121px 54px", a: 2, d: "8s" }, leafD: "6s", leafB: "-3s",
      extra:
        P("tired") + ".sloth-cartoon-yawn{transform-box:fill-box;transform-origin:50% 20%;animation:sloth-cartoon-t-yawn 9s ease-in-out infinite}" +
        "@keyframes sloth-cartoon-t-yawn{0%,70%{transform:scale(.12);opacity:0}76%{transform:scale(1);opacity:1}86%{transform:scale(1);opacity:1}93%,100%{transform:scale(.12);opacity:0}}"
    });

    var s = '<ellipse class="aura sloth-cartoon-aura" cx="121" cy="132" rx="64" ry="62" fill="#EDF0F8"/>';
    s += '<g class="extras">' + topBranch() +
      leafEl(32, 53, -18, 1.05, "sloth-cartoon-leaf") +
      leafEl(208, 52, 8, 1.1, "sloth-cartoon-leaf sloth-cartoon-leaf-b") + "</g>";

    s += '<g class="sloth-cartoon-swing">';
    /* обе руки вытянуты к ветке */
    s += limb("M 97 56 C 99 80 105 100 113 112", 12);
    s += limb("M 145 56 C 143 80 137 100 129 112", 12);
    s += '<circle cx="97" cy="55" r="5.8" fill="' + C.fur + '" stroke="' + C.line + '" stroke-width="3"/>' + claws(97, 61, 180, 0.9);
    s += '<circle cx="145" cy="55" r="5.8" fill="' + C.fur + '" stroke="' + C.line + '" stroke-width="3"/>' + claws(145, 61, 180, 0.9);
    s += '<g class="body sloth-cartoon-breathe">';
    s += tuft(102, 158, -84, 1) + tuft(140, 154, 84, 1) + tuft(136, 178, 112, 0.9);
    /* тело осело и вытянулось вниз */
    s += '<ellipse cx="121" cy="158" rx="20.5" ry="32" fill="' + C.fur + '" stroke="' + C.line + '" stroke-width="4"/>';
    s += '<ellipse cx="121" cy="163" rx="12" ry="20.5" fill="' + C.belly + '"/>';
    /* ножки обвисли */
    s += limb("M 114 187 C 112 196 114 201 118 203", 10);
    s += limb("M 128 187 C 130 196 128 201 124 203", 10);
    s += claws(118, 204, 170, 0.6) + claws(124, 204, -170, 0.6);
    /* голова просела между плеч */
    s += '<g class="head" transform="translate(121 112) rotate(4)">' + headEl("tired") + "</g>";
    s += "</g></g>";

    return wrap("tired", css, s);
  }

  /* ---------- drained: лежит на спине вдоль ветки под листом-пледом ---------- */

  function drained() {
    var css = baseCss("drained", {
      breathe: "7s", amp: "1.014,1.025", aura: [".45", ".7"], blink: null,
      swing: null, leafD: "8s", leafB: "-4s",
      extra:
        P("drained") + ".sloth-cartoon-dangle{transform-box:view-box;transform-origin:98px 140px;animation:sloth-cartoon-d-dangle 7s ease-in-out infinite}" +
        "@keyframes sloth-cartoon-d-dangle{0%,100%{transform:rotate(-4deg)}50%{transform:rotate(4deg)}}" +
        P("drained") + ".sloth-cartoon-z{opacity:0;animation:sloth-cartoon-d-z 8s linear infinite}" +
        "@keyframes sloth-cartoon-d-z{0%{transform:translate(0,0);opacity:0}12%{opacity:.9}75%{opacity:.7}100%{transform:translate(10px,-36px);opacity:0}}" +
        P("drained") + ".sloth-cartoon-z2{animation-delay:-2.7s}" +
        P("drained") + ".sloth-cartoon-z3{animation-delay:-5.4s}"
    });

    var s = '<ellipse class="aura sloth-cartoon-aura" cx="122" cy="138" rx="70" ry="58" fill="#F0ECF7"/>';
    s += '<g class="extras">';
    /* толстая ветка-лежанка */
    var b = "M 12 154 C 70 147 172 147 228 153";
    s += '<path d="' + b + '" stroke="' + C.branchLine + '" stroke-width="20" stroke-linecap="round" fill="none"/>';
    s += '<path d="' + b + '" stroke="' + C.branch + '" stroke-width="14" stroke-linecap="round" fill="none"/>';
    s += leafEl(30, 147, -20, 1.05, "sloth-cartoon-leaf") +
      leafEl(212, 146, 12, 1.1, "sloth-cartoon-leaf sloth-cartoon-leaf-b") + "</g>";

    /* свешенная рука едва покачивается */
    s += '<g class="sloth-cartoon-dangle">' + limb("M 98 140 C 90 160 84 176 82 190", 11) +
      claws(82, 191, 8, 0.85) + "</g>";

    s += '<g class="body sloth-cartoon-breathe">';
    /* тело на спине вдоль ветки */
    s += tuft(116, 116, -18, 1) + tuft(146, 117, 14, 1);
    s += '<ellipse cx="130" cy="133" rx="34" ry="17" fill="' + C.fur + '" stroke="' + C.line + '" stroke-width="4"/>';
    /* ступни торчат из-под пледа справа */
    s += '<circle cx="173" cy="136" r="7.5" fill="' + C.fur + '" stroke="' + C.line + '" stroke-width="3"/>' +
      claws(177, 129, -70, 0.6);
    /* голова запрокинута, лицом вверх */
    s += '<g class="head" transform="translate(87 125) rotate(-14)">' + headEl("drained") + "</g>";
    /* большой лист-плед с контуром */
    s += '<g class="extras"><path d="M 97 127 Q 128 105 173 125 Q 180 136 169 143 Q 130 155 99 142 Q 91 133 97 127 Z" fill="' + C.leaf +
      '" stroke="' + C.leafLine + '" stroke-width="3.4" stroke-linejoin="round"/>' +
      '<path d="M 102 133 Q 134 122 166 132" stroke="' + C.leafLine + '" stroke-width="2.4" stroke-linecap="round" fill="none"/></g>';
    s += "</g>";

    /* медленные «z» */
    s += '<g class="particles">' + zee(96, 102, 1, "sloth-cartoon-z1") +
      zee(105, 93, 0.75, "sloth-cartoon-z2") + zee(112, 85, 0.55, "sloth-cartoon-z3") + "</g>";

    return wrap("drained", css, s);
  }

  var POSES = { radiant: radiant, steady: steady, tired: tired, drained: drained };

  window.registerPetStyle({
    petId: "sloth",
    style: "cartoon",
    render: function (mood) {
      return (POSES[mood] || POSES.steady)();
    }
  });
})();
