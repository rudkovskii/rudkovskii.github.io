/**
 * Mila / Мила — pet1 (id: cat), стиль «pixel» (ретро-тамагочи).
 * По assets/pets/CONTRACT.md v2 + 03-visual-kit.md (раздел 3, pet1).
 * Сетка 24×24, квант 10px, SVG-«пиксели» как run-length path'ы,
 * shape-rendering="crispEdges", анимации только steps().
 * Палитра ≤8 цветов на mood (ядро 6 из кита + аура состояния + акцент).
 * Видовые признаки: треугольные уши с розовым нутром, хвост с тёмным
 * кончиком, усы 3+3, розовый нос, «М» табби на лбу, полоски на боках.
 * Кадры: дыхание = дискретный бob всего спрайта на 1 квант (в drained —
 * «дышит плед»: верхний ряд пледа появляется/исчезает), моргание и
 * взмахи хвоста — сменой кадров через stepped opacity.
 */
(function () {
  "use strict";

  var Q = 10; // квант сетки: 24×24 клетки на viewBox 240

  // ядро палитры (раздел 3 кита, pet1) — буквы = пиксели в спрайтах
  var PAL = {
    B: "#F6D8B8", // тело крем-персик
    C: "#E8B48C", // полоски/уши/хвост карамель
    D: "#C98F62", // тёмный: кончик хвоста, контур, согнутое ухо
    P: "#F2B8C6", // нос, нутро ушей, щёчки, зевок
    I: "#3E3A47", // глаза (--ink)
    W: "#FBEDE4", // животик + блик глаза
    L: "#E9E6FA"  // плед (--calm-soft), только drained
  };
  var AURA = { radiant: "#FFF3D9", steady: "#E8F3EA", tired: "#EDF0F8", drained: "#F0ECF7" };
  var SPARK = "#F5A623"; // искры radiant
  var ZCOL = "#9C8BC0";  // «z» drained

  var REDUCED = "@media (prefers-reduced-motion: reduce){.pet-cat-pixel *{animation:none !important}}";

  /* ---- пиксельные хелперы ---- */

  // спрайт из 24-символьных строк → path'ы по цветам (run-length по строкам)
  function gridPaths(rows, y0) {
    var byColor = {}, r, x, x2, ch, w, y, k, out = "";
    for (r = 0; r < rows.length; r++) {
      y = (y0 + r) * Q;
      x = 0;
      while (x < 24) {
        ch = rows[r].charAt(x);
        if (ch === ".") { x++; continue; }
        x2 = x;
        while (x2 < 24 && rows[r].charAt(x2) === ch) x2++;
        w = (x2 - x) * Q;
        byColor[ch] = (byColor[ch] || "") +
          "M" + (x * Q) + " " + y + "h" + w + "v" + Q + "h-" + w + "z";
        x = x2;
      }
    }
    for (k in byColor) {
      out += '<path fill="' + PAL[k] + '" d="' + byColor[k] + '"/>';
    }
    return out;
  }

  // список клеток [x,y] одного цвета → path
  function cells(list, color) {
    var d = "", i;
    for (i = 0; i < list.length; i++) {
      d += "M" + (list[i][0] * Q) + " " + (list[i][1] * Q) + "h" + Q + "v" + Q + "h-" + Q + "z";
    }
    return '<path fill="' + color + '" d="' + d + '"/>';
  }

  // горизонтальные раны [x0,y,w-в-клетках] одного цвета → path
  function runs(list, color) {
    var d = "", i, w;
    for (i = 0; i < list.length; i++) {
      w = list[i][2] * Q;
      d += "M" + (list[i][0] * Q) + " " + (list[i][1] * Q) + "h" + w + "v" + Q + "h-" + w + "z";
    }
    return '<path fill="' + color + '" d="' + d + '"/>';
  }

  // пиксельный эллипс-аура (ступенчатый) вокруг центра в клетках
  function pixEllipse(cx, cy, rx, ry, color) {
    var d = "", dy, hw, x, y, w;
    for (dy = -ry; dy <= ry; dy++) {
      hw = Math.max(1, Math.round(rx * Math.sqrt(Math.max(0, 1 - (dy * dy) / (ry * ry)))));
      x = (cx - hw) * Q;
      y = (cy + dy) * Q;
      w = 2 * hw * Q;
      d += "M" + x + " " + y + "h" + w + "v" + Q + "h-" + w + "z";
    }
    return '<path fill="' + color + '" d="' + d + '"/>';
  }

  function shell(mood, css, inner) {
    return '<svg viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg" ' +
      'shape-rendering="crispEdges" ' +
      'class="pet-svg pet-cat pet-cat-pixel is-' + mood + '" role="img" aria-label="Mila">' +
      '<style>' + css + REDUCED + '</style>' + inner + '</svg>';
  }

  // общий css-скелет mood'а: bob (дыхание), fa/fb (кадры A/B), blink
  function baseCss(m, sfx, dur, blinkDur, bOn, bOff, bob) {
    var root = ".pet-cat-pixel.is-" + m + " ";
    var css =
      root + ".cpx-a{animation:cat-pixel-fa-" + sfx + " " + dur + " steps(1,end) infinite}" +
      root + ".cpx-b{animation:cat-pixel-fb-" + sfx + " " + dur + " steps(1,end) infinite}" +
      root + ".cpx-lid{animation:cat-pixel-blink-" + sfx + " " + blinkDur + " steps(1,end) infinite}" +
      "@keyframes cat-pixel-fa-" + sfx + "{0%{opacity:1}50%{opacity:0}100%{opacity:1}}" +
      "@keyframes cat-pixel-fb-" + sfx + "{0%{opacity:0}50%{opacity:1}100%{opacity:0}}" +
      "@keyframes cat-pixel-blink-" + sfx + "{0%{opacity:0}" + bOn + "%{opacity:1}" + bOff + "%{opacity:0}100%{opacity:0}}";
    if (bob) {
      css = root + ".cpx-pet{animation:cat-pixel-bob-" + sfx + " " + dur + " steps(1,end) infinite}" +
        "@keyframes cat-pixel-bob-" + sfx + "{0%{transform:translateY(0)}50%{transform:translateY(" + Q + "px)}100%{transform:translateY(0)}}" +
        css;
    }
    return css;
  }

  /* ================= RADIANT: вытянулась вверх, хвост трубой, искры ================= */

  var R_ROWS = [
    ".......C........C.......",
    ".......CC......CC.......",
    ".......CPC....CPC.......",
    "......DDDDDDDDDDDD......",
    "......DBBBBBBBBBBD......",
    "......DBBBCBCBCBBD......", // «М» табби на лбу
    "......DBBBBBBBBBBD......",
    "......DBIWBBBBIWBD......", // широкие глаза 2×2 с бликом W
    ".....CDBIIBBBBIIBDC.....", // + усы
    "....C.DPBBBBBBBBPD.C....", // щёчки P + усы
    ".....CDBBBBPPBBBBDC.....", // нос + усы
    "......DBBBDPPDBBBD......", // открытая довольная пасть
    "......DBBBBDDBBBBD......",
    "......DBBWWWWWWBBD......", // животик
    "......DCBWWWWWWBCD......", // полоски на боках
    "......DBBWWWWWWBBD......",
    "......DBBDBBBBDBBD......", // лапки
    "......DDDDDDDDDDDD......"
  ];
  var R_TAIL = [[18, 17], [19, 16], [20, 15], [21, 14], [21, 13], [21, 12], [21, 11]]; // хвост трубой
  var R_TIP_A = [[21, 10], [21, 9]]; // тёмный кончик, кадр A
  var R_TIP_B = [[20, 10], [20, 9]]; // взмах, кадр B
  var R_LID = [[8, 10], [9, 10], [8, 11], [9, 11], [14, 10], [15, 10], [14, 11], [15, 11]];
  var R_SPARK_A = [[3, 4], [2, 5], [3, 5], [4, 5], [3, 6], [20, 3], [1, 11]]; // ✦ + точки
  var R_SPARK_B = [[20, 5], [19, 6], [20, 6], [21, 6], [20, 7], [4, 2], [2, 14]];

  function buildRadiant() {
    var css = baseCss("radiant", "r", "2.2s", "4.4s", 90, 95, true);
    var inner =
      '<g class="cpx-a aura">' + pixEllipse(12, 11, 10, 10, AURA.radiant) + cells(R_SPARK_A, SPARK) + "</g>" +
      '<g class="cpx-b aura" opacity="0">' + pixEllipse(12, 11, 11, 11, AURA.radiant) + cells(R_SPARK_B, SPARK) + "</g>" +
      '<g class="cpx-pet body">' +
        gridPaths(R_ROWS, 3) +
        cells(R_TAIL, PAL.C) +
        '<g class="cpx-a extras">' + cells(R_TIP_A, PAL.D) + "</g>" +
        '<g class="cpx-b extras" opacity="0">' + cells(R_TIP_B, PAL.D) + "</g>" +
        '<g class="cpx-lid eyelids" opacity="0">' + cells(R_LID, PAL.B) + "</g>" +
      "</g>";
    return shell("radiant", css, inner);
  }

  /* ================= STEADY: классическая «булка», хвост обёрнут ================= */

  var S_ROWS = [
    "......C..........C......",
    "......CC........CC......",
    "......CPC......CPC......",
    ".....DDDDDDDDDDDDDD.....",
    "....DBBBBBBBBBBBBBBD....",
    "....DBBBBBCBCBCBBBBD....", // «М» табби
    "....DBBBBBBBBBBBBBBD....",
    "....DBBBIWBBBBIWBBBD....", // спокойные глаза с бликом
    "..C.DBBBIIBBBBIIBBBD.C..", // + усы
    "...CDBPBBBBPPBBBBPBDC...", // нос + щёчки + усы
    "..C.DBBBBBDBBDBBBBBD.C..", // уголки рта + усы
    "....DBBBBWWDDWWBBBBD....", // улыбка + животик
    "....DBCBBWWWWWWBBCBD....", // полоски
    "....DBBBBWWWWWWBBBBD....",
    "....DBBDBBBBBBBBDBBD....", // подобранные лапки
    ".....DDDDDDDDDDDDDD....."
  ];
  var S_TAIL = [[19, 15], [20, 16], [20, 17], [19, 18]]; // хвост вокруг тела
  var S_TIP_A_C = [];
  var S_TIP_A_D = [[18, 19], [17, 19]]; // кончик лежит спереди
  var S_TIP_B_C = [[18, 19]];
  var S_TIP_B_D = [[17, 19], [16, 19]]; // кончик медленно уполз левее
  var S_LID = [[8, 12], [9, 12], [8, 13], [9, 13], [14, 12], [15, 12], [14, 13], [15, 13]];

  function buildSteady() {
    var css = baseCss("steady", "s", "3.5s", "5.2s", 91, 96, true);
    var inner =
      '<g class="cpx-a aura">' + pixEllipse(12, 13, 10, 8, AURA.steady) + "</g>" +
      '<g class="cpx-b aura" opacity="0">' + pixEllipse(12, 13, 11, 9, AURA.steady) + "</g>" +
      '<g class="cpx-pet body">' +
        gridPaths(S_ROWS, 5) +
        cells(S_TAIL, PAL.C) +
        '<g class="cpx-a extras">' + cells(S_TIP_A_D, PAL.D) + "</g>" +
        '<g class="cpx-b extras" opacity="0">' + cells(S_TIP_B_C, PAL.C) + cells(S_TIP_B_D, PAL.D) + "</g>" +
        '<g class="cpx-lid eyelids" opacity="0">' + cells(S_LID, PAL.B) + "</g>" +
      "</g>";
    return shell("steady", css, inner);
  }

  /* ================= TIRED: растеклась в овал, ухо согнуто, зевает ================= */

  var T_ROWS = [
    ".....C..................",
    ".....CC.........DD......", // правое ухо согнуто (тёмное)
    ".....CPC.......DDD......",
    "....DDDDDDDDDDDDDDDD....",
    "...DBBBBBBCBCBCBBBBBD...", // «М» табби
    "...DBBBBBBBBBBBBBBBBD...",
    "..CDBBBIIBBBBBIIBBBBDC..", // полуприкрытые глаза (1 ряд) + усы
    ".C.DBPBBBBPPBBBBBBPBD.C.", // нос + щёчки + обвисшие усы
    "..CDBCBBBBDDBBBBBBCBDC..", // ровный ротик + полоски + усы
    "...DBBBBWWWWWWWWBBBBD...", // животик
    "...DBBDBBBBBBBBBBDBBD...", // разъехавшиеся лапки
    "....DDDDDDDDDDDDDDDD...."
  ];
  var T_TAIL = [[21, 18], [21, 19], [22, 19]]; // хвост лежит плоско
  var T_TIP_A = [[23, 19]];
  var T_TIP_B = [[23, 18]]; // редкое подрагивание кончика
  var T_LID = [[7, 15], [8, 15], [14, 15], [15, 15]];
  var T_YAWN = [[10, 17], [11, 17], [10, 18], [11, 18]]; // розовый зевок

  function buildTired() {
    var css = baseCss("tired", "t", "5s", "6s", 88, 93, true) +
      ".pet-cat-pixel.is-tired .cpx-yawn{animation:cat-pixel-yawn-t 7.5s steps(1,end) infinite}" +
      "@keyframes cat-pixel-yawn-t{0%{opacity:0}55%{opacity:1}78%{opacity:0}100%{opacity:0}}";
    var inner =
      '<g class="cpx-a aura">' + pixEllipse(12, 15, 11, 7, AURA.tired) + "</g>" +
      '<g class="cpx-b aura" opacity="0">' + pixEllipse(12, 15, 12, 8, AURA.tired) + "</g>" +
      '<g class="cpx-pet body">' +
        gridPaths(T_ROWS, 9) +
        cells(T_TAIL, PAL.C) +
        '<g class="cpx-a extras">' + cells(T_TIP_A, PAL.D) + "</g>" +
        '<g class="cpx-b extras" opacity="0">' + cells(T_TIP_B, PAL.D) + "</g>" +
        '<g class="cpx-yawn mouth" opacity="0">' + cells(T_YAWN, PAL.P) + "</g>" +
        '<g class="cpx-lid eyelids" opacity="0">' + cells(T_LID, PAL.B) + "</g>" +
      "</g>";
    return shell("tired", css, inner);
  }

  /* ================= DRAINED: клубок под пледом, наружу уши и хвост, «z» ================= */

  var D_ROWS = [
    "......C......C..........", // левое ухо + правое торчит над пледом
    "......CC.....CC.........",
    ".....DDDDDDDDDDDD.......",
    "....DBBBBBBBBBBBBD......",
    "...CDIIBIIBBBBBBBD......", // глаза-щёлочки + ус
    "..C.DBPPBBBBBBBBBD......", // нос + ус
    "...CDBDBBCBBBBCBBD......", // ротик-точка + полоски + ус
    "....DBBBBBBBBBBBBD......",
    "....DBBBBBBBBBBBBD......",
    ".....DDDDDDDDDDDD......."
  ];
  // плед поверх клубка (раны [x, y, w])
  var D_BLANKET = [
    [11, 13, 7], [10, 14, 9], [10, 15, 9], [10, 16, 9],
    [10, 17, 10], [10, 18, 10], [10, 19, 10], [11, 20, 8]
  ];
  var D_BREATH = [[15, 12, 3]]; // «вдох»: верх пледа приподнимается на 1 квант
  var D_TAIL_C = [[15, 13], [16, 13]]; // хвост-запятая поверх пледа
  var D_TAIL_D = [[17, 13], [17, 14]]; // тёмный кончик наружу
  var D_PEEK = [[5, 14], [6, 14], [8, 14], [9, 14]]; // редкое «приоткрыла глаза»
  var D_Z1 = [[2, 8], [3, 8], [4, 8], [3, 9], [2, 10], [3, 10], [4, 10]];  // пиксельная Z
  var D_Z2 = [[0, 3], [1, 3], [2, 3], [1, 4], [0, 5], [1, 5], [2, 5]];

  function buildDrained() {
    var root = ".pet-cat-pixel.is-drained ";
    var css =
      root + ".cpx-a{animation:cat-pixel-fa-d 7s steps(1,end) infinite}" +
      root + ".cpx-b{animation:cat-pixel-fb-d 7s steps(1,end) infinite}" +
      root + ".cpx-peek{animation:cat-pixel-peek-d 10s steps(1,end) infinite}" +
      root + ".cpx-z1{animation:cat-pixel-z-d 7s steps(1,end) infinite}" +
      root + ".cpx-z2{animation:cat-pixel-z-d 7s steps(1,end) -3.5s infinite}" +
      "@keyframes cat-pixel-fa-d{0%{opacity:1}50%{opacity:0}100%{opacity:1}}" +
      "@keyframes cat-pixel-fb-d{0%{opacity:0}50%{opacity:1}100%{opacity:0}}" +
      "@keyframes cat-pixel-peek-d{0%{opacity:0}91%{opacity:1}95%{opacity:0}100%{opacity:0}}" +
      "@keyframes cat-pixel-z-d{0%{opacity:0;transform:translateY(" + Q + "px)}" +
        "14%{opacity:1;transform:translateY(" + Q + "px)}" +
        "40%{opacity:1;transform:translateY(0)}" +
        "66%{opacity:1;transform:translateY(-" + Q + "px)}" +
        "86%{opacity:0;transform:translateY(-" + Q + "px)}" +
        "100%{opacity:0;transform:translateY(" + Q + "px)}}";
    var inner =
      '<g class="cpx-a aura">' + pixEllipse(11, 16, 9, 6, AURA.drained) + "</g>" +
      '<g class="cpx-b aura" opacity="0">' + pixEllipse(11, 16, 10, 7, AURA.drained) + "</g>" +
      '<g class="body">' +
        gridPaths(D_ROWS, 11) +
        '<g class="extras">' +
          runs(D_BLANKET, PAL.L) +
          '<g class="cpx-b" opacity="0">' + runs(D_BREATH, PAL.L) + "</g>" + // дышит плед
          cells(D_TAIL_C, PAL.C) + cells(D_TAIL_D, PAL.D) +
        "</g>" +
        '<g class="cpx-peek eyes" opacity="0">' + cells(D_PEEK, PAL.I) + "</g>" +
      "</g>" +
      '<g class="particles">' +
        '<g class="cpx-z1" opacity="0">' + cells(D_Z1, ZCOL) + "</g>" +
        '<g class="cpx-z2" opacity="0">' + cells(D_Z2, ZCOL) + "</g>" +
      "</g>";
    return shell("drained", css, inner);
  }

  /* ================= регистрация ================= */

  var SVGS = {
    radiant: buildRadiant(),
    steady: buildSteady(),
    tired: buildTired(),
    drained: buildDrained()
  };

  window.registerPetStyle({
    petId: "cat",
    style: "pixel",
    render: function (mood) {
      return SVGS[mood] || SVGS.steady;
    }
  });
})();
