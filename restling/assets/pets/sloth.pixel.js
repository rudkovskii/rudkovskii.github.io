/* Fern / Ферн — ленивец, стиль «pixel» (assets/pets/sloth.pixel.js).
   Стилевой модуль по assets/pets/CONTRACT.md v2: registerPetStyle, тот же
   персонаж и видовые признаки, что в sloth.js (soft), но ретро-тамагочи:
   строгая сетка 24x24 «пикселей»-rect (квант 10), shape-rendering=crispEdges,
   только steps()-анимации (2 кадра: бобы/кадровые свапы), моргание — сменой
   кадра (глаза прячутся, под ними тёмная маска = закрытые веки).
   Видовые признаки: длинные руки с когтями-крючками, тёмная маска-«очки»,
   круглая голова с полуулыбкой, ветка — обязательная часть композиции.
   Палитра редуцированная (8 цветов существа + фоновые ауры состояний из кита):
   мех #B8B29A, какао (маска/когти/нос) #8A7E6C, мордочка/живот/блик #E8DFC9,
   графит #3E3A47, ветка #A98F6F, лист #5FAF7E, искра #F5A623, z #9C8BC0.
   Канал состояний — хват на ветке: висит на одной руке → сидит, обняв колени
   → обвис на двух руках → лежит вдоль ветки под листом-пледом. */
(function () {
  "use strict";

  var Q = 10; /* квант: сетка 24x24 на viewBox 240 */

  var C = {
    fur: "#B8B29A",
    dark: "#8A7E6C",
    face: "#E8DFC9",
    ink: "#3E3A47",
    branch: "#A98F6F",
    leaf: "#5FAF7E",
    spark: "#F5A623",
    zzz: "#9C8BC0"
  };

  /* один «пиксель»-rect; всё кратно кванту */
  function P(x, y, w, h, c) {
    return '<rect x="' + x * Q + '" y="' + y * Q + '" width="' + w * Q +
      '" height="' + h * Q + '" fill="' + c + '"/>';
  }

  /* пиксельная «z» 3x3 */
  function zPx(x, y) {
    return P(x, y, 3, 1, C.zzz) + P(x + 1, y + 1, 1, 1, C.zzz) + P(x, y + 2, 3, 1, C.zzz);
  }

  /* чанки-аура состояния: блоб 18x14 из 5 rect'ов */
  function aura(color, dx, dy) {
    return '<g class="aura spx-aura">' +
      P(dx + 2, dy + 2, 14, 10, color) +
      P(dx + 4, dy, 10, 2, color) +
      P(dx + 4, dy + 12, 10, 2, color) +
      P(dx, dy + 4, 2, 6, color) +
      P(dx + 16, dy + 4, 2, 6, color) + "</g>";
  }

  /* ---------- голова 8x7 в сетке; c,r — левый верхний угол ---------- */

  function headPx(c, r, mood) {
    var s = '<g class="head">';
    /* мех */
    s += P(c + 1, r, 6, 1, C.fur);
    s += P(c, r + 1, 8, 5, C.fur);
    s += P(c + 1, r + 6, 6, 1, C.fur);
    /* светлая мордочка */
    s += P(c + 3, r + 2, 2, 2, C.face);
    s += P(c + 1, r + 4, 6, 2, C.face);
    /* маска-«очки» до висков + брови */
    s += P(c, r + 2, 3, 2, C.dark);
    s += P(c + 5, r + 2, 3, 2, C.dark);
    s += P(c + 1, r + 1, 2, 1, C.dark);
    s += P(c + 5, r + 1, 2, 1, C.dark);
    /* нос */
    s += P(c + 3, r + 4, 2, 1, C.dark);
    /* глаза (моргание прячет группу — маска под ними читается как веки) */
    s += '<g class="eyes spx-eyes">';
    if (mood === "radiant") {
      s += P(c + 1, r + 2, 2, 2, C.ink) + P(c + 5, r + 2, 2, 2, C.ink) +
        P(c + 2, r + 2, 1, 1, C.face) + P(c + 6, r + 2, 1, 1, C.face);
    } else if (mood === "steady") {
      s += P(c + 1, r + 2, 2, 1, C.ink) + P(c + 5, r + 2, 2, 1, C.ink);
    } else if (mood === "tired") {
      /* зрачки опущены вниз, верх прикрыт маской = веки на ~50% */
      s += P(c + 1, r + 3, 2, 1, C.ink) + P(c + 5, r + 3, 2, 1, C.ink);
    } else {
      /* щёлочки: по одному пикселю у переносицы, ниже всех */
      s += P(c + 2, r + 3, 1, 1, C.ink) + P(c + 5, r + 3, 1, 1, C.ink);
    }
    s += "</g>";
    /* рот */
    s += '<g class="mouth">';
    if (mood === "radiant") {
      s += P(c + 3, r + 5, 2, 1, C.ink);
    } else if (mood === "tired") {
      s += P(c + 3, r + 5, 1, 1, C.ink) +
        '<g class="spx-yawn">' + P(c + 3, r + 5, 2, 2, C.dark) + "</g>";
    } else {
      s += P(c + 3, r + 5, 1, 1, C.ink);
    }
    s += "</g></g>";
    return s;
  }

  /* ---------- CSS-каркас mood-а: только steps() ---------- */

  function css(m, o) {
    var p = ".pet-sloth-pixel.is-" + m + " ";
    var k = "sloth-pixel-" + m.charAt(0) + "-";
    var st = "steps(1,end)";
    var s = "";
    /* общий кадровый такт: два кадра через opacity */
    s += p + ".spx-f1{animation:" + k + "f1 " + o.frame + " " + st + " infinite}";
    s += "@keyframes " + k + "f1{0%,100%{opacity:1}50%{opacity:0}}";
    s += p + ".spx-f2{animation:" + k + "f2 " + o.frame + " " + st + " infinite}";
    s += "@keyframes " + k + "f2{0%{opacity:0}50%{opacity:1}100%{opacity:0}}";
    /* аура мигает в такт дыханию */
    s += p + ".spx-aura{animation:" + k + "aura " + o.frame + " " + st + " infinite}";
    s += "@keyframes " + k + "aura{0%,100%{opacity:" + o.aura[0] + "}50%{opacity:" + o.aura[1] + "}}";
    /* дыхание: дискретный боб на один квант */
    if (o.bob) {
      s += p + ".spx-bob{animation:" + k + "bob " + o.frame + " " + st + " infinite}";
      s += "@keyframes " + k + "bob{0%,100%{transform:translate(0,0)}50%{transform:translate(0,-" + Q + "px)}}";
    }
    /* покачивание вбок на один квант */
    if (o.sway) {
      s += p + ".spx-sway{animation:" + k + "sway " + o.sway + " " + st + " infinite}";
      s += "@keyframes " + k + "sway{0%,100%{transform:translate(0,0)}50%{transform:translate(" + Q + "px,0)}}";
    }
    /* моргание сменой кадра */
    if (o.blink) {
      s += p + ".spx-eyes{animation:" + k + "blink " + o.blink + " " + st + " infinite}";
      s += "@keyframes " + k + "blink{0%,88%{opacity:1}90%,96%{opacity:0}98%,100%{opacity:1}}";
    }
    s += o.extra || "";
    s += "@media (prefers-reduced-motion:reduce){" + p + "*{animation:none !important}}";
    return s;
  }

  function wrap(mood, cssText, scene) {
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" ' +
      'shape-rendering="crispEdges" ' +
      'class="pet-svg pet-sloth pet-sloth-pixel is-' + mood + '" ' +
      'role="img" aria-label="Fern the sloth, pixel style">' +
      "<style>" + cssText + "</style>" + scene + "</svg>";
  }

  /* ---------- radiant: висит на одной руке, вторая машет; искры ---------- */

  function radiant() {
    var s = aura("#FFF3D9", 3, 6);
    /* ветка сверху + листья в двух кадрах */
    s += '<g class="extras">' + P(0, 5, 24, 1, C.branch);
    s += '<g class="spx-f1">' + P(3, 4, 2, 1, C.leaf) + P(18, 4, 2, 1, C.leaf) + P(13, 6, 2, 1, C.leaf) + "</g>";
    s += '<g class="spx-f2">' + P(4, 4, 2, 1, C.leaf) + P(19, 4, 2, 1, C.leaf) + P(12, 6, 2, 1, C.leaf) + "</g>";
    s += "</g>";
    /* хват левой рукой: кисть над веткой, когти-крючки под ней */
    s += P(8, 4, 3, 1, C.fur);
    s += P(7, 6, 1, 1, C.dark) + P(9, 6, 1, 1, C.dark) + P(11, 6, 1, 1, C.dark);
    s += P(9, 6, 2, 4, C.fur); /* длинная рука вниз к телу */
    /* тело+голова дышат бобом на квант */
    s += '<g class="body spx-bob">';
    s += headPx(8, 9, "radiant");
    s += P(9, 16, 6, 4, C.fur);
    s += P(8, 17, 1, 1, C.fur) + P(15, 18, 1, 1, C.fur); /* лохматые пучки */
    s += P(10, 17, 4, 3, C.face); /* живот */
    /* ножки болтаются, коготки наружу */
    s += P(10, 20, 2, 2, C.fur) + P(13, 20, 2, 2, C.fur);
    s += P(9, 21, 1, 1, C.dark) + P(15, 21, 1, 1, C.dark);
    /* свободная рука довольно машет: два кадра, веер из трёх когтей */
    s += '<g class="spx-f1">' +
      P(15, 15, 2, 1, C.fur) + P(16, 14, 2, 1, C.fur) + P(17, 13, 2, 1, C.fur) + P(18, 12, 2, 1, C.fur) +
      P(17, 11, 1, 1, C.dark) + P(19, 11, 1, 1, C.dark) + P(21, 11, 1, 1, C.dark) + "</g>";
    s += '<g class="spx-f2">' +
      P(15, 16, 2, 1, C.fur) + P(16, 15, 2, 1, C.fur) + P(17, 14, 2, 1, C.fur) + P(18, 13, 2, 1, C.fur) +
      P(17, 12, 1, 1, C.dark) + P(19, 12, 1, 1, C.dark) + P(21, 12, 1, 1, C.dark) + "</g>";
    s += "</g>";
    /* искры мерцают в противофазе */
    s += '<g class="particles">';
    s += '<g class="spx-f1">' +
      P(4, 8, 1, 1, C.spark) + P(3, 9, 3, 1, C.spark) + P(4, 10, 1, 1, C.spark) +
      P(19, 10, 1, 1, C.spark) + P(16, 17, 1, 1, C.spark) + "</g>";
    s += '<g class="spx-f2">' + P(5, 7, 1, 1, C.spark) + P(20, 9, 1, 1, C.spark) + P(17, 16, 1, 1, C.spark) + "</g>";
    s += "</g>";
    return wrap("radiant", css("radiant", {
      frame: "2.2s", aura: [".55", ".9"], bob: true, blink: "4.6s"
    }), s);
  }

  /* ---------- steady: сидит в развилке, обняв колени длинной рукой ---------- */

  function steady() {
    var s = aura("#E8F3EA", 3, 3);
    /* ветка с развилкой */
    s += '<g class="extras">' + P(0, 16, 24, 1, C.branch);
    s += P(15, 15, 1, 1, C.branch) + P(16, 14, 1, 1, C.branch) +
      P(17, 13, 1, 1, C.branch) + P(18, 12, 1, 1, C.branch);
    s += '<g class="spx-f1">' + P(18, 11, 2, 1, C.leaf) + P(3, 15, 2, 1, C.leaf) + "</g>";
    s += '<g class="spx-f2">' + P(19, 11, 2, 1, C.leaf) + P(4, 15, 2, 1, C.leaf) + "</g>";
    s += "</g>";
    s += '<g class="body spx-bob">';
    s += headPx(8, 3, "steady");
    s += P(8, 10, 8, 5, C.fur); /* тело */
    s += P(7, 11, 1, 1, C.fur) + P(16, 10, 1, 1, C.fur); /* пучки шерсти */
    s += P(10, 10, 4, 3, C.face); /* живот над обнимающей рукой */
    /* длинная рука тёмным оттенком оборачивает колени, кисть-крючок справа */
    s += P(7, 10, 1, 4, C.dark);
    s += P(8, 13, 8, 1, C.dark);
    s += P(15, 12, 1, 1, C.dark) + P(16, 12, 1, 1, C.dark);
    /* ступни на ветке, когти цепляются за неё */
    s += P(9, 15, 2, 1, C.fur) + P(13, 15, 2, 1, C.fur);
    s += P(9, 16, 1, 1, C.dark) + P(11, 16, 1, 1, C.dark) +
      P(13, 16, 1, 1, C.dark) + P(15, 16, 1, 1, C.dark);
    s += "</g>";
    return wrap("steady", css("steady", {
      frame: "3.5s", aura: [".5", ".75"], bob: true, blink: "5.5s"
    }), s);
  }

  /* ---------- tired: обвис на обеих руках, чуть качается, зевает ---------- */

  function tired() {
    var s = aura("#EDF0F8", 3, 6);
    s += '<g class="extras">' + P(0, 5, 24, 1, C.branch);
    s += '<g class="spx-f1">' + P(2, 4, 2, 1, C.leaf) + P(20, 4, 2, 1, C.leaf) + "</g>";
    s += '<g class="spx-f2">' + P(3, 4, 2, 1, C.leaf) + P(19, 4, 2, 1, C.leaf) + "</g>";
    s += "</g>";
    s += '<g class="spx-sway">';
    /* обе кисти на ветке, когти под ней */
    s += P(7, 4, 3, 1, C.fur) + P(14, 4, 3, 1, C.fur);
    s += P(7, 6, 1, 1, C.dark) + P(9, 6, 1, 1, C.dark) +
      P(14, 6, 1, 1, C.dark) + P(16, 6, 1, 1, C.dark);
    /* руки ступеньками вниз к осевшему телу */
    s += P(8, 6, 2, 2, C.fur) + P(9, 8, 2, 3, C.fur);
    s += P(14, 6, 2, 2, C.fur) + P(13, 8, 2, 3, C.fur);
    s += '<g class="body spx-bob">';
    s += headPx(8, 10, "tired");
    s += P(10, 17, 5, 3, C.fur); /* тело вытянулось вниз */
    s += P(9, 18, 1, 1, C.fur) + P(15, 18, 1, 1, C.fur);
    s += P(11, 17, 3, 2, C.face);
    /* ножки обвисли тонкими ниточками */
    s += P(11, 20, 1, 2, C.fur) + P(13, 20, 1, 2, C.fur);
    s += P(11, 22, 1, 1, C.dark) + P(13, 22, 1, 1, C.dark);
    s += "</g></g>";
    return wrap("tired", css("tired", {
      frame: "5s", aura: [".35", ".55"], bob: true, sway: "8s", blink: "8s",
      extra:
        ".pet-sloth-pixel.is-tired .spx-yawn{animation:sloth-pixel-t-yawn 10s steps(1,end) infinite}" +
        "@keyframes sloth-pixel-t-yawn{0%,70%{opacity:0}72%,90%{opacity:1}92%,100%{opacity:0}}"
    }), s);
  }

  /* ---------- drained: лежит вдоль ветки под листом-пледом, рука свешена ---------- */

  function drained() {
    var s = aura("#F0ECF7", 3, 6);
    s += '<g class="extras">' + P(0, 15, 24, 2, C.branch) + "</g>";
    s += '<g class="body">';
    s += P(8, 12, 11, 3, C.fur); /* тело на спине вдоль ветки */
    s += P(19, 12, 1, 2, C.fur); /* ступни торчат из-под пледа */
    s += P(20, 12, 1, 1, C.dark) + P(20, 14, 1, 1, C.dark);
    s += headPx(2, 8, "drained");
    /* лист-плед с зубчатым краем */
    s += P(9, 11, 9, 3, C.leaf);
    s += P(10, 10, 1, 1, C.leaf) + P(13, 10, 1, 1, C.leaf) + P(16, 10, 1, 1, C.leaf);
    /* грудь под пледом медленно поднимается (кадр 2) */
    s += '<g class="spx-f2">' + P(11, 10, 2, 1, C.leaf) + "</g>";
    s += "</g>";
    /* свешенная рука едва покачивается: два кадра, веер из трёх когтей */
    s += '<g class="spx-f1">' + P(7, 15, 2, 4, C.fur) +
      P(6, 19, 1, 1, C.dark) + P(8, 19, 1, 1, C.dark) + P(10, 19, 1, 1, C.dark) + "</g>";
    s += '<g class="spx-f2">' + P(8, 15, 2, 4, C.fur) +
      P(7, 19, 1, 1, C.dark) + P(9, 19, 1, 1, C.dark) + P(11, 19, 1, 1, C.dark) + "</g>";
    /* медленные пиксельные «z» всплывают сменой кадров */
    s += '<g class="particles">';
    s += '<g class="spx-f1">' + zPx(7, 4) + "</g>";
    s += '<g class="spx-f2">' + zPx(9, 2) + "</g>";
    s += "</g>";
    return wrap("drained", css("drained", {
      frame: "7s", aura: [".45", ".65"], bob: false
    }), s);
  }

  var POSES = { radiant: radiant, steady: steady, tired: tired, drained: drained };

  window.registerPetStyle({
    petId: "sloth",
    style: "pixel",
    render: function (mood) {
      return (POSES[mood] || POSES.steady)();
    }
  });
})();
