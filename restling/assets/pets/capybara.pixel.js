/* Restling — pet style module: Yuzu / Юдзу, капибара (id: capybara), стиль pixel.
   Контракт: assets/pets/CONTRACT.md v2. Ретро-тамагочи: сетка 24x24 (квант 10),
   viewBox 0 0 240 240, shape-rendering="crispEdges", палитра 8 цветов из кита,
   без градиентов, все анимации — steps(), моргание сменой кадра.
   Корневой класс: pet-svg pet-capybara pet-capybara-pixel is-<mood>. */
(function () {
  "use strict";

  var Q = 10; // квант пикселя: сетка 24x24 на viewBox 240

  // Палитра (редуцированная, из визуального кита pet2 Yuzu): 8 цветов
  var C = {
    F: "#C89B6C", // шерсть
    D: "#A97F52", // морда / уши / веки
    I: "#3E3A47", // глаза, ноздри, «z» (графит, не чёрный)
    Y: "#F5A623", // плод юдзу / искры
    L: "#5FAF7E", // листик юдзу
    W: "#CFE3E0", // вода онсэна
    S: "#FDFBF7", // пар / блики / тёплый камень
    B: "#E9E6FA"  // плед (drained)
  };
  var AURA = { radiant: "#FFF3D9", steady: "#E8F3EA", tired: "#EDF0F8", drained: "#F0ECF7" };

  function rect(c, r, w, h) {
    return '<rect x="' + c * Q + '" y="' + r * Q + '" width="' + (w || 1) * Q +
      '" height="' + (h || 1) * Q + '"/>';
  }

  // Пиксель-карта -> rect'ы, горизонтальные раны одного цвета слиты в один rect,
  // цвета сгруппированы в <g fill> (бюджет). top — номер верхней строки карты.
  function mapRects(top, rows) {
    var by = {}, r, c, ch, s;
    for (r = 0; r < rows.length; r++) {
      var line = rows[r];
      if (line.length !== 24) throw new Error("capybara.pixel: row " + (top + r) + " width " + line.length);
      c = 0;
      while (c < 24) {
        ch = line.charAt(c);
        if (ch === ".") { c++; continue; }
        if (!C[ch]) throw new Error("capybara.pixel: bad key '" + ch + "' row " + (top + r));
        s = c;
        while (c < 24 && line.charAt(c) === ch) c++;
        (by[ch] = by[ch] || []).push(rect(s, top + r, c - s, 1));
      }
    }
    var out = "";
    for (ch in by) if (by.hasOwnProperty(ch)) out += '<g fill="' + C[ch] + '">' + by[ch].join("") + "</g>";
    return out;
  }

  // Список клеток [col,row,w?,h?] одного цвета
  function cells(key, list) {
    var s = '<g fill="' + C[key] + '">';
    for (var i = 0; i < list.length; i++) s += rect(list[i][0], list[i][1], list[i][2], list[i][3]);
    return s + "</g>";
  }

  // Пиксельная аура состояния (скруглённая плашка за сценой)
  function aura(mood) {
    return '<g class="aura" fill="' + AURA[mood] + '">' +
      rect(2, 3, 20, 1) + rect(1, 4, 22, 15) + rect(2, 19, 20, 2) + "</g>";
  }

  // Вода онсэна: от строки top до «земли» (строка 20), поверх тела —
  // линия воды пересекает силуэт; сверху пиксельные блики.
  function water(top) {
    return '<g class="capybara-pixel-water">' +
      '<g fill="' + C.W + '">' + rect(2, top, 20, 1) + rect(1, top + 1, 22, 19 - top) + rect(2, 20, 20, 1) + "</g>" +
      cells("S", [[5, top, 2], [13, top, 2], [18, top, 2]]) +
      "</g>";
  }

  // Двухкадровый пар (кадры сменяются steps'ами в противофазе)
  function steam(f1, f2) {
    return '<g class="capybara-pixel-steam">' +
      '<g class="capybara-pixel-sf1">' + cells("S", f1) + "</g>" +
      '<g class="capybara-pixel-sf2" opacity="0">' + cells("S", f2) + "</g>" +
      "</g>";
  }

  // Двухкадровые частицы (искры radiant / «z» drained)
  function particles(key, f1, f2) {
    return '<g class="capybara-pixel-particles particles">' +
      '<g class="capybara-pixel-pf1">' + cells(key, f1) + "</g>" +
      '<g class="capybara-pixel-pf2" opacity="0">' + cells(key, f2) + "</g>" +
      "</g>";
  }

  // Пиксельная буква Z (3x3) для сонных частиц
  function zShape(c, r) {
    return [[c, r, 3], [c + 1, r + 1], [c, r + 2, 3]];
  }

  // Кадр «глаза закрыты» — моргание сменой кадра поверх открытых глаз
  function shut(inner) {
    return '<g class="capybara-pixel-shut eyelids" opacity="0">' + inner + "</g>";
  }

  // --- Анимации: только steps(), дискретно как на экранчике тамагочи -----

  var KEY =
    "@keyframes capybara-pixel-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}" +
    "@keyframes capybara-pixel-f1{0%,100%{opacity:1}50%{opacity:0}}" +
    "@keyframes capybara-pixel-f2{0%,100%{opacity:0}50%{opacity:1}}" +
    "@keyframes capybara-pixel-wink{0%{opacity:0}88%{opacity:1}94%,100%{opacity:0}}";

  function styleFor(mood, cfg) {
    var P = ".pet-capybara-pixel.is-" + mood;
    var css = KEY;
    if (mood === "drained") {
      // дыхание = плед приподнимается на 1 пиксель (кадр-вздох)
      css += P + " .capybara-pixel-puff{animation:capybara-pixel-f2 " + cfg.breath + " steps(1,end) infinite}";
    } else {
      // дыхание = бобинг всей капибары на 1 квант на воде
      css += P + " .capybara-pixel-pet{animation:capybara-pixel-bob " + cfg.breath + " steps(1,end) infinite}";
    }
    css += P + " .capybara-pixel-shut{animation:capybara-pixel-wink " + cfg.blink + " steps(1,end) infinite}";
    css += P + " .capybara-pixel-sf1{animation:capybara-pixel-f1 " + cfg.steam + " steps(1,end) infinite}";
    css += P + " .capybara-pixel-sf2{animation:capybara-pixel-f2 " + cfg.steam + " steps(1,end) infinite}";
    if (cfg.part) {
      css += P + " .capybara-pixel-pf1{animation:capybara-pixel-f1 " + cfg.part + " steps(1,end) infinite}";
      css += P + " .capybara-pixel-pf2{animation:capybara-pixel-f2 " + cfg.part + " steps(1,end) infinite}";
    }
    // статичные позы различимы и без движения: глубина погружения, уши,
    // веки, наклон юдзу, плед (кадры-2 и веки скрыты атрибутом opacity="0")
    css += "@media (prefers-reduced-motion:reduce){" + P + " *{animation:none!important}}";
    return "<style>" + css + "</style>";
  }

  // --- Пиксель-карты поз ---------------------------------------------------
  // Ключи: F шерсть, D морда/уши, I глаза/ноздри, Y юдзу, L лист, W вода,
  // S пар/камень, B плед. Голова-«кирпичик», квадратная морда, ноздри на
  // верхней плоскости морды, маленькие ушки у макушки, юдзу на голове.

  // radiant: в воде по живот, спина прямая, глаза открыты с бликом,
  // широкая улыбка, юдзу ровно, 3 струйки пара + искры
  var ROWS_RADIANT = [
    "...........YYL..........",
    ".......FD..YY..DF.......",
    "........FFFFFFFF........",
    ".......FFFFFFFFFF.......",
    ".......FISFFFFISF.......",
    ".......FIIFFFFIIF.......",
    ".......FFDIDDIDFF.......",
    ".......FFIDDDDIFF.......",
    "........FDIIIIDF........",
    "......FFFFFFFFFFFF......",
    ".....FFFFFFFFFFFFFF.....",
    ".....FFFFFFFFFFFFFF.....",
    ".....FFFFFFFFFFFFFF.....",
    ".....FFFFFFFFFFFFFF.....",
    ".....FFFFFFFFFFFFFF.....",
    ".....FFFFFFFFFFFFFF.....",
    ".....FFFFFFFFFFFFFF....."
  ]; // top = 2, вода с 16

  // steady: погрузилась по плечи, дзен-прищур (глаза-полоски),
  // мягкая улыбка, 2 струйки пара
  var ROWS_STEADY = [
    "...........YYL..........",
    ".......FD..YY..DF.......",
    "........FFFFFFFF........",
    ".......FFFFFFFFFF.......",
    ".......FFFFFFFFFF.......",
    ".......FIIFFFFIIF.......",
    ".......FFDIDDIDFF.......",
    ".......FFDDDDDDFF.......",
    "........FDDIIDDF........",
    "......FFFFFFFFFFFF......",
    ".....FFFFFFFFFFFFFF.....",
    ".....FFFFFFFFFFFFFF.....",
    ".....FFFFFFFFFFFFFF.....",
    ".....FFFFFFFFFFFFFF.....",
    ".....FFFFFFFFFFFFFF....."
  ]; // top = 4, вода с 14

  // tired: по подбородок в воде (ноздри у самой линии воды), тяжёлые веки,
  // ушки обвисли по бокам, юдзу съехал набок, пар почти исчез
  var ROWS_TIRED = [
    ".............YYL........",
    ".............YY.........",
    "......FDFFFFFFFFDF......",
    ".......FFFFFFFFFF.......",
    ".......FDDFFFFDDF.......",
    ".......FIIFFFFIIF.......",
    ".......FFDIDDIDFF.......",
    ".......FFDDDDDDFF.......",
    "........FDDDDDDF........",
    ".....FFFFFFFFFFFFFF.....",
    ".....FFFFFFFFFFFFFF.....",
    ".....FFFFFFFFFFFFFF.....",
    ".....FFFFFFFFFFFFFF....."
  ]; // top = 6, вода с 13

  // drained: выбралась, лежит калачиком на тёплом камне, накрыта пледом
  // (волнистый край), глаза-щёлочки, юдзу лежит рядом на камне
  var ROWS_DRAINED = [
    "...FD..DF...............",
    "...FFFFFF.BBBBBBB.......",
    "..FFFFFFFFBBBBBBBB......",
    "..FIFFFFIFBBBBBBBBB.....",
    "..FDIDDIDFBBBBBBBBB.....",
    "..FDDDDDDFBBBBBBBBFYYL..",
    "...FDIIDFFBFBFBFBF.YY..."
  ]; // top = 12, камень на 19-20

  // --- Конфиг mood-состояний (темпы по контракту, all steps) ---------------

  var CFG = {
    radiant: { breath: "2.2s", blink: "4.2s", steam: "3.6s", part: "2.4s", top: 16 },
    steady:  { breath: "3.5s", blink: "5s",   steam: "4.6s", top: 14 },
    tired:   { breath: "5s",   blink: "6s",   steam: "6s",   top: 13 },
    drained: { breath: "7s",   blink: "9s",   steam: "8s",   part: "7s" }
  };

  // --- Сборка сцен (один раз при загрузке; render — чистая выдача строки) --

  var SCENES = {};

  SCENES.radiant =
    aura("radiant") +
    '<g class="capybara-pixel-pet body">' +
      mapRects(2, ROWS_RADIANT) +
      shut(cells("F", [[8, 6, 2, 2], [14, 6, 2, 2]]) + cells("I", [[8, 7, 2], [14, 7, 2]])) +
    "</g>" +
    water(CFG.radiant.top) +
    steam(
      [[2, 15], [3, 13], [2, 11], [21, 15], [20, 13], [21, 11], [18, 14], [19, 12]],
      [[3, 14], [2, 12], [3, 10], [20, 14], [21, 12], [20, 10], [19, 13], [18, 11]]
    ) +
    particles("Y", [[4, 6], [19, 8], [6, 2]], [[2, 9], [20, 4], [16, 1]]);

  SCENES.steady =
    aura("steady") +
    '<g class="capybara-pixel-pet body">' +
      mapRects(4, ROWS_STEADY) +
      shut(cells("F", [[8, 9, 2], [14, 9, 2]])) +
    "</g>" +
    water(CFG.steady.top) +
    steam(
      [[2, 13], [3, 11], [2, 9], [21, 13], [20, 11], [21, 9]],
      [[3, 12], [2, 10], [3, 8], [20, 12], [21, 10], [20, 8]]
    );

  SCENES.tired =
    aura("tired") +
    '<g class="capybara-pixel-pet body">' +
      mapRects(6, ROWS_TIRED) +
      shut(cells("D", [[8, 11, 2], [14, 11, 2]])) +
    "</g>" +
    water(CFG.tired.top) +
    steam([[2, 12], [3, 10]], [[3, 11], [2, 9]]);

  SCENES.drained =
    aura("drained") +
    // тёплый камень + маленькая заводь справа с последней струйкой пара
    '<g class="capybara-pixel-scene">' +
      cells("S", [[1, 19, 18], [2, 20, 16]]) +
      cells("W", [[20, 19, 3], [19, 20, 5]]) +
    "</g>" +
    '<g class="capybara-pixel-pet body">' +
      mapRects(12, ROWS_DRAINED) +
      '<g class="capybara-pixel-puff" opacity="0">' + cells("B", [[11, 12, 5]]) + "</g>" +
      shut(cells("F", [[3, 15], [8, 15]])) +
    "</g>" +
    steam([[21, 18], [22, 16]], [[22, 17], [21, 15]]) +
    particles("I", zShape(12, 8), zShape(15, 5));

  // --- Регистрация стиля ----------------------------------------------------

  window.registerPetStyle({
    petId: "capybara",
    style: "pixel",
    render: function (mood) {
      var m = SCENES[mood] ? mood : "steady";
      return '<svg class="pet-svg pet-capybara pet-capybara-pixel is-' + m +
        '" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges"' +
        ' role="img" aria-label="Yuzu the capybara, pixel, ' + m + '">' +
        styleFor(m, CFG[m]) + SCENES[m] + "</svg>";
    }
  });
})();
