/* Fern / Ферн — ленивец на ветке (id: sloth).
   Модуль питомца по assets/pets/CONTRACT.md — только inline-SVG + CSS-анимации.
   Видовые признаки (обязаны читаться за секунду): очень длинные руки с тремя
   когтями-крючками, тёмная маска-«очки» с полосами к вискам, круглая голова
   с вечной полуулыбкой, лохматый контур, ветка как часть композиции.
   Канал состояний — хват: висит на одной руке → сидит в развилке, обняв
   колени → обвис на двух руках → лежит на спине под листом-пледом. */
(function () {
  "use strict";

  var C = {
    fur: "#B8B29A",
    furDark: "#A49D85",
    belly: "#CDC7AF",
    mask: "#8A7E6C",
    claw: "#7C7160",
    face: "#E8DFC9",
    ink: "#3E3A47",
    nose: "#6F6455",
    cheek: "#F5A88E",
    leaf: "#5FAF7E",
    leafDark: "#4C9269",
    branch: "#A98F6F",
    spark: "#F5A623",
    zzz: "#9C8BC0"
  };

  function R(v) { return Math.round(v * 10) / 10; }

  /* ---------- мелкие детали ---------- */

  /* 3 когтя-крючка; rot — куда смотрят (0 = вниз), k — масштаб */
  function claws(x, y, rot, k) {
    k = k || 1;
    return '<path transform="translate(' + x + " " + y + ") rotate(" + rot + ") scale(" + k + ')" ' +
      'd="M -5 0 Q -2.4 4 -4.6 8.8 M 0 0 Q 2.8 4 0.8 9.6 M 5 0 Q 7.6 4 5.4 8.8" ' +
      'stroke="' + C.claw + '" stroke-width="2.8" stroke-linecap="round" fill="none"/>';
  }

  /* лист; cls = 'sloth-leaf' (+' sloth-leaf-b') для покачивания */
  function leafEl(x, y, rot, k, cls) {
    return '<g transform="translate(' + x + " " + y + ") rotate(" + rot + ") scale(" + k + ')">' +
      '<path class="' + (cls || "") + '" d="M 0 0 Q 6 -3 9 -13 Q 1 -9 0 0 Z" fill="' + C.leaf + '"/></g>';
  }

  /* лохматый пучок шерсти на контуре; rot — наружу (0 = вверх) */
  function tuft(x, y, rot) {
    return '<path transform="translate(' + x + " " + y + ") rotate(" + rot + ')" ' +
      'd="M -4.5 0 Q -1.5 -7 1 -1 Q 3 -6.5 5 0 Z" fill="' + C.fur + '"/>';
  }

  function sparkEl(x, y, k, cls) {
    return '<path class="' + cls + '" d="M ' + x + " " + R(y - 7 * k) +
      " L " + R(x + 1.8 * k) + " " + R(y - 1.8 * k) +
      " L " + R(x + 7 * k) + " " + y +
      " L " + R(x + 1.8 * k) + " " + R(y + 1.8 * k) +
      " L " + x + " " + R(y + 7 * k) +
      " L " + R(x - 1.8 * k) + " " + R(y + 1.8 * k) +
      " L " + R(x - 7 * k) + " " + y +
      " L " + R(x - 1.8 * k) + " " + R(y - 1.8 * k) + ' Z" fill="' + C.spark + '"/>';
  }

  function zee(x, y, k, cls) {
    return '<g transform="translate(' + x + " " + y + ')">' +
      '<path class="sloth-z ' + cls + '" d="M 0 0 h ' + R(6.5 * k) + " l " + R(-6.5 * k) + " " + R(6.5 * k) +
      " h " + R(6.5 * k) + '" stroke="' + C.zzz + '" stroke-width="' + R(2.2 * k) +
      '" stroke-linecap="round" stroke-linejoin="round" fill="none"/></g>';
  }

  /* ---------- глаза (в локальных координатах головы, центр глаза y=-1) ---------- */

  function eyeOpen(x, big) {
    var r = big ? 6 : 5.4, pr = big ? 4 : 3.5;
    var s = '<circle cx="' + x + '" cy="-1" r="' + r + '" fill="#FFFDF6"/>' +
      '<circle cx="' + x + '" cy="-0.6" r="' + pr + '" fill="' + C.ink + '"/>' +
      '<circle cx="' + R(x + 1.8) + '" cy="-3" r="' + (big ? 1.9 : 1.5) + '" fill="#FFFFFF"/>';
    if (big) s += '<circle cx="' + R(x - 2) + '" cy="0.8" r="1" fill="#FFFFFF"/>';
    s += '<ellipse class="sloth-blink" cx="' + x + '" cy="-1.2" rx="7" ry="7.4" fill="' + C.mask + '"/>';
    return s;
  }

  /* веко на ~50% */
  function eyeTired(x) {
    return '<circle cx="' + x + '" cy="-1" r="5.4" fill="#FFFDF6"/>' +
      '<circle cx="' + x + '" cy="0.2" r="3.4" fill="' + C.ink + '"/>' +
      '<circle cx="' + R(x + 1.4) + '" cy="1" r="1" fill="#FFFFFF"/>' +
      '<path d="M ' + R(x - 5.6) + " -2 A 5.6 5.6 0 0 1 " + R(x + 5.6) + " -2 L " + R(x + 5.6) +
      " -1 L " + R(x - 5.6) + ' -1 Z" fill="' + C.mask + '"/>' +
      '<ellipse class="sloth-blink" cx="' + x + '" cy="-1.2" rx="7" ry="7.4" fill="' + C.mask + '"/>';
  }

  /* глаза-щёлочки (мягкие полумесяцы, никакого страдания) */
  function eyeSlit(x) {
    return '<path d="M ' + R(x - 5) + " -1.5 Q " + x + " 2.6 " + R(x + 5) +
      ' -1.5" stroke="' + C.ink + '" stroke-width="2.2" stroke-linecap="round" fill="none"/>';
  }

  /* ---------- голова (центр в 0,0; caller оборачивает в transform) ---------- */

  function headEl(mood) {
    var s = '<circle r="26" fill="' + C.fur + '"/>';
    /* лохматая макушка */
    s += '<path d="M -20 -15 Q -24 -23 -15 -20 Q -14 -29 -6 -24 Q -1 -30 3 -24 Q 10 -28 11 -21 Q 19 -23 16 -15 Z" fill="' + C.fur + '"/>';
    /* светлая мордочка */
    s += '<ellipse cy="5" rx="19.5" ry="16" fill="' + C.face + '"/>';
    /* маска-«очки»: тёмные полосы через глаза к вискам */
    s += '<ellipse cx="-11" cy="-1" rx="12.5" ry="7.2" fill="' + C.mask + '" transform="rotate(-14 -11 -1)"/>';
    s += '<ellipse cx="11" cy="-1" rx="12.5" ry="7.2" fill="' + C.mask + '" transform="rotate(14 11 -1)"/>';
    s += '<g class="eyes">';
    if (mood === "radiant") s += eyeOpen(-10, true) + eyeOpen(10, true);
    else if (mood === "steady") s += eyeOpen(-10, false) + eyeOpen(10, false);
    else if (mood === "tired") s += eyeTired(-10) + eyeTired(10);
    else s += eyeSlit(-10) + eyeSlit(10);
    s += "</g>";
    s += '<ellipse cy="8.5" rx="4.2" ry="3" fill="' + C.nose + '"/>';
    /* вечная полуулыбка (асимметричная) */
    if (mood === "radiant") {
      s += '<path class="mouth" d="M -7 13.5 Q 0.5 19 7.5 13" stroke="' + C.ink + '" stroke-width="2" stroke-linecap="round" fill="none"/>';
    } else if (mood === "steady") {
      s += '<path class="mouth" d="M -6 14 Q 0.5 18 6.5 13.5" stroke="' + C.ink + '" stroke-width="2" stroke-linecap="round" fill="none"/>';
    } else if (mood === "tired") {
      s += '<g class="mouth"><path d="M -4.5 14 Q 0 16.5 5 13.6" stroke="' + C.ink + '" stroke-width="2" stroke-linecap="round" fill="none"/>' +
        '<ellipse class="sloth-yawn" cy="15.5" rx="4.5" ry="5.5" fill="' + C.nose + '"/></g>';
    } else {
      s += '<path class="mouth" d="M -4 14 Q 0.5 16.5 4.5 13.2" stroke="' + C.ink + '" stroke-width="1.8" stroke-linecap="round" fill="none"/>';
    }
    s += '<ellipse cx="-18" cy="8" rx="4.5" ry="3" fill="' + C.cheek + '" opacity=".55"/>';
    s += '<ellipse cx="18" cy="8" rx="4.5" ry="3" fill="' + C.cheek + '" opacity=".55"/>';
    return s;
  }

  /* ---------- общий CSS-каркас mood-а ---------- */

  function baseCss(m, o) {
    var p = ".pet-sloth.is-" + m + " ";
    var k = "sloth-" + m.charAt(0) + "-";
    var s = "";
    s += p + ".sloth-breathe{transform-box:fill-box;transform-origin:50% 80%;animation:" + k + "breathe " + o.breathe + " ease-in-out infinite}";
    s += "@keyframes " + k + "breathe{0%,100%{transform:scale(1)}50%{transform:scale(" + o.amp + ")}}";
    s += p + ".sloth-aura{animation:" + k + "aura " + o.breathe + " ease-in-out infinite}";
    s += "@keyframes " + k + "aura{0%,100%{opacity:" + o.aura[0] + "}50%{opacity:" + o.aura[1] + "}}";
    if (o.blink) {
      s += p + ".sloth-blink{transform-box:fill-box;transform-origin:50% 0%;animation:" + k + "blink " + o.blink + " linear infinite}";
      s += "@keyframes " + k + "blink{0%,91%{transform:scaleY(.05)}94%{transform:scaleY(1)}97%,100%{transform:scaleY(.05)}}";
    }
    if (o.swing) {
      s += p + ".sloth-swing{transform-box:view-box;transform-origin:" + o.swing.o + ";animation:" + k + "sway " + o.swing.d + " ease-in-out infinite}";
      s += "@keyframes " + k + "sway{0%,100%{transform:rotate(-" + o.swing.a + "deg)}50%{transform:rotate(" + o.swing.a + "deg)}}";
    }
    s += p + ".sloth-leaf{transform-box:fill-box;transform-origin:0% 100%;animation:" + k + "leaf " + o.leafD + " ease-in-out infinite}";
    s += "@keyframes " + k + "leaf{0%,100%{transform:rotate(-4deg)}50%{transform:rotate(5deg)}}";
    s += p + ".sloth-leaf-b{animation-delay:" + o.leafB + "}";
    s += o.extra || "";
    s += "@media (prefers-reduced-motion:reduce){" + p + "*{animation:none !important}}";
    return s;
  }

  function wrap(mood, css, scene) {
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" ' +
      'class="pet-svg pet-sloth is-' + mood + '" role="img" aria-label="Fern the sloth">' +
      "<style>" + css + "</style>" + scene + "</svg>";
  }

  /* ветка вдоль верха сцены */
  function topBranch() {
    return '<path d="M 14 57 C 70 49 170 49 226 56" stroke="' + C.branch +
      '" stroke-width="9" stroke-linecap="round" fill="none"/>';
  }

  /* ---------- radiant: висит на одной руке, вторая довольна раскинута ---------- */

  function radiant() {
    var css = baseCss("radiant", {
      breathe: "2.2s", amp: "1.03,1.045", aura: [".5", ".85"], blink: "4.6s",
      swing: { o: "92px 56px", a: 5, d: "4.2s" }, leafD: "3.4s", leafB: "-1.7s",
      extra:
        ".pet-sloth.is-radiant .sloth-wave{transform-box:view-box;transform-origin:141px 126px;animation:sloth-r-wave 3.4s ease-in-out infinite}" +
        "@keyframes sloth-r-wave{0%,100%{transform:rotate(3deg)}50%{transform:rotate(-8deg)}}" +
        ".pet-sloth.is-radiant .sloth-spark{transform-box:fill-box;transform-origin:50% 50%;animation:sloth-r-spark 2.4s ease-in-out infinite}" +
        "@keyframes sloth-r-spark{0%,100%{opacity:.15;transform:scale(.6)}50%{opacity:1;transform:scale(1.15)}}" +
        ".pet-sloth.is-radiant .sloth-sp2{animation-delay:-.8s}" +
        ".pet-sloth.is-radiant .sloth-sp3{animation-delay:-1.6s}"
    });

    var s = '<ellipse class="aura sloth-aura" cx="124" cy="126" rx="66" ry="62" fill="#FFF3D9"/>';
    s += '<g class="extras">' + topBranch() +
      leafEl(34, 53, -15, 1.1, "sloth-leaf") +
      leafEl(206, 52, 10, 1.15, "sloth-leaf sloth-leaf-b") +
      leafEl(78, 51, -8, 0.9, "sloth-leaf sloth-leaf-b") +
      leafEl(108, 50, 12, 0.85, "sloth-leaf") + "</g>";

    s += '<g class="sloth-swing">';
    /* длинная левая рука: хват на ветке */
    s += '<path d="M 92 56 C 95 76 103 90 115 100" stroke="' + C.fur + '" stroke-width="13" stroke-linecap="round" fill="none"/>';
    s += '<circle cx="92" cy="55" r="5.5" fill="' + C.fur + '"/>' + claws(92, 60, 180, 1);
    s += '<g class="body sloth-breathe">';
    s += '<ellipse cx="126" cy="149" rx="21.5" ry="27" fill="' + C.fur + '"/>';
    s += tuft(105, 152, -80) + tuft(147, 146, 82) + tuft(140, 128, 55);
    s += '<ellipse cx="126" cy="153" rx="13" ry="17.5" fill="' + C.belly + '"/>';
    /* ножки болтаются */
    s += '<path d="M 116 172 C 113 184 114 191 119 194" stroke="' + C.fur + '" stroke-width="11" stroke-linecap="round" fill="none"/>';
    s += '<path d="M 137 170 C 140 182 139 190 133 193" stroke="' + C.fur + '" stroke-width="11" stroke-linecap="round" fill="none"/>';
    s += claws(119, 194, 165, 0.6) + claws(133, 193, -165, 0.6);
    /* голова с игривым наклоном */
    s += '<g class="head" transform="translate(122 110) rotate(-6)">' + headEl("radiant") + "</g>";
    /* свободная рука раскинута */
    s += '<g class="sloth-wave"><path d="M 141 126 C 161 117 172 103 176 89" stroke="' + C.fur +
      '" stroke-width="13" stroke-linecap="round" fill="none"/>' + claws(178, 85, -140, 0.85) + "</g>";
    s += "</g></g>";

    s += '<g class="particles">' + sparkEl(58, 92, 1, "sloth-spark sloth-sp1") +
      sparkEl(186, 66, 0.8, "sloth-spark sloth-sp2") +
      sparkEl(172, 148, 0.7, "sloth-spark sloth-sp3") + "</g>";

    return wrap("radiant", css, s);
  }

  /* ---------- steady: сидит в развилке ветки, обняв колени ---------- */

  function steady() {
    var css = baseCss("steady", {
      breathe: "3.5s", amp: "1.025,1.04", aura: [".5", ".75"], blink: "5.5s",
      swing: { o: "118px 166px", a: 2, d: "6s" }, leafD: "4.6s", leafB: "-2.3s"
    });

    var s = '<ellipse class="aura sloth-aura" cx="120" cy="122" rx="64" ry="58" fill="#E8F3EA"/>';
    s += '<g class="extras">';
    s += '<path d="M 16 171 C 70 163 170 163 224 170" stroke="' + C.branch + '" stroke-width="10" stroke-linecap="round" fill="none"/>';
    s += '<path d="M 120 169 C 138 148 158 128 176 111" stroke="' + C.branch + '" stroke-width="7" stroke-linecap="round" fill="none"/>';
    s += leafEl(178, 113, -5, 1.1, "sloth-leaf") +
      leafEl(158, 131, -30, 0.85, "sloth-leaf sloth-leaf-b") +
      leafEl(34, 167, -12, 1, "sloth-leaf") + "</g>";

    s += '<g class="sloth-swing"><g class="body sloth-breathe">';
    s += '<ellipse cx="116" cy="130" rx="26" ry="25" fill="' + C.fur + '"/>';
    s += tuft(91, 124, -78) + tuft(141, 121, 78) + tuft(134, 141, 62);
    /* правая рука уходит к коленям за телом (тональная подложка отделяет от тела) */
    s += '<path d="M 138 118 C 148 132 148 144 142 152" stroke="' + C.furDark + '" stroke-width="15" stroke-linecap="round" fill="none" opacity=".7"/>';
    s += '<path d="M 138 118 C 148 132 148 144 142 152" stroke="' + C.fur + '" stroke-width="12" stroke-linecap="round" fill="none"/>';
    /* колени подтянуты */
    s += '<circle cx="103" cy="147" r="10.5" fill="' + C.fur + '"/>';
    s += '<circle cx="130" cy="147" r="10.5" fill="' + C.fur + '"/>';
    /* ступни с когтями поверх ветки */
    s += '<ellipse cx="102" cy="160" rx="6.5" ry="4.5" fill="' + C.fur + '"/>';
    s += '<ellipse cx="131" cy="160" rx="6.5" ry="4.5" fill="' + C.fur + '"/>';
    s += claws(102, 162, 15, 0.6) + claws(131, 162, -15, 0.6);
    /* длинная левая рука обнимает колени вокруг (с тональной подложкой) */
    s += '<path d="M 95 119 C 83 140 90 157 113 160 C 135 162 149 149 145 131" stroke="' + C.furDark +
      '" stroke-width="15.5" stroke-linecap="round" fill="none" opacity=".7"/>';
    s += '<path d="M 95 119 C 83 140 90 157 113 160 C 135 162 149 149 145 131" stroke="' + C.fur +
      '" stroke-width="12" stroke-linecap="round" fill="none"/>';
    s += claws(145, 131, 30, 0.85);
    s += '<g class="head" transform="translate(116 90)">' + headEl("steady") + "</g>";
    s += "</g></g>";

    return wrap("steady", css, s);
  }

  /* ---------- tired: обвис на ветке на обеих руках, тело вытянулось ---------- */

  function tired() {
    var css = baseCss("tired", {
      breathe: "5s", amp: "1.02,1.03", aura: [".35", ".55"], blink: "7s",
      swing: { o: "121px 54px", a: 1.6, d: "8s" }, leafD: "6s", leafB: "-3s",
      extra:
        ".pet-sloth.is-tired .sloth-yawn{transform-box:fill-box;transform-origin:50% 20%;animation:sloth-t-yawn 9s ease-in-out infinite}" +
        "@keyframes sloth-t-yawn{0%,70%{transform:scale(.15);opacity:0}76%{transform:scale(1);opacity:1}86%{transform:scale(1);opacity:1}93%,100%{transform:scale(.15);opacity:0}}"
    });

    var s = '<ellipse class="aura sloth-aura" cx="121" cy="130" rx="62" ry="60" fill="#EDF0F8"/>';
    s += '<g class="extras">' + topBranch() +
      leafEl(32, 53, -18, 1, "sloth-leaf") +
      leafEl(208, 52, 8, 1.05, "sloth-leaf sloth-leaf-b") + "</g>";

    s += '<g class="sloth-swing">';
    /* обе руки вытянуты к ветке */
    s += '<path d="M 97 56 C 99 80 105 100 113 113" stroke="' + C.fur + '" stroke-width="12" stroke-linecap="round" fill="none"/>';
    s += '<path d="M 145 56 C 143 80 137 100 129 113" stroke="' + C.fur + '" stroke-width="12" stroke-linecap="round" fill="none"/>';
    s += '<circle cx="97" cy="55" r="5" fill="' + C.fur + '"/>' + claws(97, 60, 180, 0.9);
    s += '<circle cx="145" cy="55" r="5" fill="' + C.fur + '"/>' + claws(145, 60, 180, 0.9);
    s += '<g class="body sloth-breathe">';
    /* тело осело и вытянулось вниз */
    s += '<ellipse cx="121" cy="157" rx="19.5" ry="31" fill="' + C.fur + '"/>';
    s += tuft(103, 160, -82) + tuft(139, 156, 82) + tuft(135, 178, 110);
    s += '<ellipse cx="121" cy="162" rx="11.5" ry="20" fill="' + C.belly + '"/>';
    /* ножки обвисли */
    s += '<path d="M 114 185 C 112 194 114 199 118 201" stroke="' + C.fur + '" stroke-width="10" stroke-linecap="round" fill="none"/>';
    s += '<path d="M 128 185 C 130 194 128 199 124 201" stroke="' + C.fur + '" stroke-width="10" stroke-linecap="round" fill="none"/>';
    s += claws(118, 201, 170, 0.55) + claws(124, 201, -170, 0.55);
    /* голова просела между плеч */
    s += '<g class="head" transform="translate(121 113) rotate(3)">' + headEl("tired") + "</g>";
    s += "</g></g>";

    return wrap("tired", css, s);
  }

  /* ---------- drained: лежит на спине вдоль ветки под листом-пледом ---------- */

  function drained() {
    var css = baseCss("drained", {
      breathe: "7s", amp: "1.012,1.022", aura: [".45", ".65"], blink: null,
      swing: null, leafD: "8s", leafB: "-4s",
      extra:
        ".pet-sloth.is-drained .sloth-dangle{transform-box:view-box;transform-origin:98px 140px;animation:sloth-d-dangle 7s ease-in-out infinite}" +
        "@keyframes sloth-d-dangle{0%,100%{transform:rotate(-3deg)}50%{transform:rotate(3deg)}}" +
        ".pet-sloth.is-drained .sloth-z{opacity:0;animation:sloth-d-z 8s linear infinite}" +
        "@keyframes sloth-d-z{0%{transform:translate(0,0);opacity:0}12%{opacity:.85}75%{opacity:.7}100%{transform:translate(9px,-34px);opacity:0}}" +
        ".pet-sloth.is-drained .sloth-z2{animation-delay:-2.7s}" +
        ".pet-sloth.is-drained .sloth-z3{animation-delay:-5.4s}"
    });

    var s = '<ellipse class="aura sloth-aura" cx="122" cy="138" rx="68" ry="56" fill="#F0ECF7"/>';
    s += '<g class="extras">';
    /* толстая ветка-лежанка */
    s += '<path d="M 12 154 C 70 147 172 147 228 153" stroke="' + C.branch + '" stroke-width="15" stroke-linecap="round" fill="none"/>';
    s += leafEl(30, 148, -20, 1, "sloth-leaf") +
      leafEl(212, 147, 12, 1.05, "sloth-leaf sloth-leaf-b") + "</g>";

    /* свешенная рука едва покачивается */
    s += '<g class="sloth-dangle"><path d="M 98 140 C 90 160 84 176 82 190" stroke="' + C.fur +
      '" stroke-width="11" stroke-linecap="round" fill="none"/>' + claws(82, 190, 8, 0.8) + "</g>";

    s += '<g class="body sloth-breathe">';
    /* тело на спине вдоль ветки */
    s += '<ellipse cx="130" cy="133" rx="33" ry="16.5" fill="' + C.fur + '"/>';
    s += tuft(118, 118, -18) + tuft(146, 119, 14);
    /* ступни торчат из-под пледа справа */
    s += '<circle cx="172" cy="136" r="7" fill="' + C.fur + '"/>' + claws(176, 130, -70, 0.55);
    /* голова запрокинута, лицом вверх */
    s += '<g class="head" transform="translate(88 126) rotate(-14)">' + headEl("drained") + "</g>";
    /* большой лист-плед */
    s += '<g class="sloth-blanket"><path d="M 98 128 Q 128 108 172 126 Q 177 136 168 142 Q 130 152 100 140 Q 93 132 98 128 Z" fill="' + C.leaf + '"/>' +
      '<path d="M 102 133 Q 134 123 166 133" stroke="' + C.leafDark + '" stroke-width="2" stroke-linecap="round" fill="none"/></g>';
    s += "</g>";

    /* медленные «z» */
    s += '<g class="particles">' + zee(98, 104, 1, "sloth-z1") +
      zee(106, 96, 0.75, "sloth-z2") + zee(112, 88, 0.55, "sloth-z3") + "</g>";

    return wrap("drained", css, s);
  }

  var POSES = { radiant: radiant, steady: steady, tired: tired, drained: drained };

  window.registerPet({
    id: "sloth",
    nameEn: "Fern",
    nameRu: "Ферн",
    render: function (mood) {
      return (POSES[mood] || POSES.steady)();
    }
  });
})();
