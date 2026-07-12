/* Restling — pet style module: Pebble / Пеббл, морская выдра (id: otter), стиль pixel.
   Контракт: assets/pets/CONTRACT.md v2. Ретро-тамагочи: сетка 24x24 (квант 10),
   viewBox 0 0 240 240, shape-rendering="crispEdges", без градиентов,
   все анимации — steps(), моргание сменой кадра. Палитра ≤8 цветов на mood
   (ядро из кита pet5 + аура состояния + акцент-искры в radiant).
   Ключевая метафора: выдра дрейфует НА СПИНЕ, камешек на груди, пиксельные волны.
   Осадка на воде кодирует mood: radiant едет высоко и жонглирует камешком,
   steady ровный дрейф, tired просела (лапка свесилась в воду, камешек уехал
   на живот), drained обёрнута лентами водорослей-«пледом», «z» над водой.
   Корневой класс: pet-svg pet-otter pet-otter-pixel is-<mood>. */
(function () {
  "use strict";

  var Q = 10; // квант пикселя: сетка 24x24 на viewBox 240

  // Палитра (редуцированная, из визуального кита pet5 Pebble)
  var C = {
    F: "#8A6248", // тело — шоколад
    D: "#5E4634", // тёмное какао: нос, лапки, кончик хвоста, веки tired
    M: "#FBEDE4", // крем: мордочка, животик, мигательные веки
    P: "#9C8BC0", // камешек + пиксельные «z»
    W: "#DCE7F2", // вода — пыльно-голубая
    R: "#B9CFE6", // гребешки волн, брызги, блик глаза
    I: "#3E3A47", // глаза (--ink, не чёрный)
    G: "#5FAF7E", // водоросли-«плед» (только drained)
    Y: "#F5A623"  // искры (только radiant)
  };
  var AURA = { radiant: "#FFF3D9", steady: "#E8F3EA", tired: "#EDF0F8", drained: "#F0ECF7" };

  function rect(c, r, w, h) {
    return '<rect x="' + c * Q + '" y="' + r * Q + '" width="' + (w || 1) * Q +
      '" height="' + (h || 1) * Q + '"/>';
  }

  // Пиксель-карта -> rect'ы: горизонтальные раны одного цвета слиты в один rect,
  // цвета сгруппированы в <g fill> (бюджет). top — номер верхней строки карты.
  function mapRects(top, rows) {
    var by = {}, r, c, ch, s;
    for (r = 0; r < rows.length; r++) {
      var line = rows[r];
      if (line.length !== 24) throw new Error("otter.pixel: row " + (top + r) + " width " + line.length);
      c = 0;
      while (c < 24) {
        ch = line.charAt(c);
        if (ch === ".") { c++; continue; }
        if (!C[ch]) throw new Error("otter.pixel: bad key '" + ch + "' row " + (top + r));
        s = c;
        while (c < 24 && line.charAt(c) === ch) c++;
        (by[ch] = by[ch] || []).push(rect(s, top + r, c - s, 1));
      }
    }
    var out = "";
    for (ch in by) if (by.hasOwnProperty(ch)) out += '<g fill="' + C[ch] + '">' + by[ch].join("") + "</g>";
    return out;
  }

  // Список клеток [col,row,w?,h?] одного цвета из палитры
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

  // Вода-«бассейн»: рисуется ПОВЕРХ выдры — линия воды пересекает силуэт,
  // осадка mood'а видна по числу рядов тела над водой. top всегда 13.
  var WATER_TOP = 13;
  function water() {
    return '<g class="otter-pixel-water" fill="' + C.W + '">' +
      rect(2, WATER_TOP, 20, 1) + rect(1, WATER_TOP + 1, 22, 19 - WATER_TOP) + rect(2, 20, 20, 1) +
      "</g>";
  }

  // Двухкадровые пиксельные волны-гребешки на линии воды (steps в противофазе)
  function waves() {
    return '<g class="otter-pixel-w1">' +
      cells("R", [[3, WATER_TOP, 2], [9, WATER_TOP, 2], [15, WATER_TOP, 2], [19, WATER_TOP, 2]]) + "</g>" +
      '<g class="otter-pixel-w2" opacity="0">' +
      cells("R", [[1, WATER_TOP, 2], [6, WATER_TOP, 2], [12, WATER_TOP, 2], [17, WATER_TOP, 2], [21, WATER_TOP]]) + "</g>";
  }

  // Двухкадровые частицы (искры radiant / «z» drained)
  function particles(key, f1, f2) {
    return '<g class="otter-pixel-particles particles">' +
      '<g class="otter-pixel-a">' + cells(key, f1) + "</g>" +
      '<g class="otter-pixel-b" opacity="0">' + cells(key, f2) + "</g>" +
      "</g>";
  }

  // Пиксельная буква Z (3x3) для сонных частиц
  function zShape(c, r) {
    return [[c, r, 3], [c + 1, r + 1], [c, r + 2, 3]];
  }

  // Пиксельная искра-«плюсик»
  function spark(c, r) {
    return [[c, r - 1], [c - 1, r], [c, r], [c + 1, r], [c, r + 1]];
  }

  // Кадр «глаза закрыты» — моргание сменой кадра поверх открытых глаз
  function shut(lids) {
    return '<g class="otter-pixel-shut eyelids" opacity="0">' + cells("M", lids) + "</g>";
  }

  // --- Анимации: только steps(), дискретно как на экранчике тамагочи -----

  var KEY =
    "@keyframes otter-pixel-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(10px)}}" +
    "@keyframes otter-pixel-f1{0%,100%{opacity:1}50%{opacity:0}}" +
    "@keyframes otter-pixel-f2{0%,100%{opacity:0}50%{opacity:1}}" +
    "@keyframes otter-pixel-blink{0%{opacity:0}88%{opacity:1}94%,100%{opacity:0}}" +
    "@keyframes otter-pixel-hold{0%,60%{opacity:1}61%{opacity:0}81%,100%{opacity:1}}" +
    "@keyframes otter-pixel-toss{0%,60%{opacity:0}61%{opacity:1}81%,100%{opacity:0}}" +
    "@keyframes otter-pixel-rare{0%,55%{opacity:0}56%{opacity:1}78%,100%{opacity:0}}";

  function styleFor(mood, cfg) {
    var P = ".pet-otter-pixel.is-" + mood;
    var css = KEY;
    if (mood === "drained") {
      // дыхание = грудка под водорослями приподнимается на 1 пиксель
      css += P + " .otter-pixel-puff{animation:otter-pixel-f2 " + cfg.breath + " steps(1,end) infinite}";
    } else {
      // дыхание = дискретный бобинг всей выдры на 1 квант на воде
      css += P + " .otter-pixel-pet{animation:otter-pixel-bob " + cfg.breath + " steps(1,end) infinite}";
    }
    // кадры A/B: волны, хвост, брызги, искры, «z»
    css += P + " .otter-pixel-w1{animation:otter-pixel-f1 " + cfg.wave + " steps(1,end) infinite}";
    css += P + " .otter-pixel-w2{animation:otter-pixel-f2 " + cfg.wave + " steps(1,end) infinite}";
    css += P + " .otter-pixel-a{animation:otter-pixel-f1 " + cfg.frame + " steps(1,end) infinite}";
    css += P + " .otter-pixel-b{animation:otter-pixel-f2 " + cfg.frame + " steps(1,end) infinite}";
    if (cfg.blink) {
      css += P + " .otter-pixel-shut{animation:otter-pixel-blink " + cfg.blink + " steps(1,end) infinite}";
    }
    if (cfg.toss) {
      // жонглирование: камешек исчезает с груди и на 2 кадра взлетает в воздух
      css += P + " .otter-pixel-hold{animation:otter-pixel-hold " + cfg.toss + " steps(1,end) infinite}";
      css += P + " .otter-pixel-air{animation:otter-pixel-toss " + cfg.toss + " steps(1,end) infinite}";
    }
    if (cfg.yawn) {
      css += P + " .otter-pixel-yawn{animation:otter-pixel-rare " + cfg.yawn + " steps(1,end) infinite}";
    }
    // статичные позы различимы и без движения: осадка в воде, глаза/веки,
    // положение камешка, водоросли, аура (кадры-2 скрыты атрибутом opacity="0")
    css += "@media (prefers-reduced-motion:reduce){" + P + " *{animation:none!important}}";
    return "<style>" + css + "</style>";
  }

  // --- Пиксель-карты поз ---------------------------------------------------
  // Ключи: F шоколад, D тёмное какао, M крем, P камешек, W вода, R волна/блик,
  // I глаза, G водоросли, Y искры. Выдра лежит на спине: голова слева (круглые
  // ушки, кремовая мордочка, тёмный нос), кремовый живот кверху, камешек на
  // груди в лапках, хвост-весло справа. Вода всегда с 13-й строки.

  // radiant: едет высоко (низ тела над водой), глаза с бликом, открытая улыбка,
  // задние ласты торчат, хвост шлёпает по воде (кадры), камешек жонглируется
  var ROWS_RADIANT = [
    "....FFFFF...............",
    "..FFFFFFFFF.............",
    "...FFFFFFF........D.....",
    "...FIRMIRF........DD....",
    "...FIIMIIFMMMMMMMMMF....",
    "...FMMDMMFFFFFFFFFF.....",
    "...FMDDDMFFFFFFFFFF.....",
    "....FFFFFFFFFFFFFFF....."
  ]; // top = 5, низ r12 — над водой

  // steady: ровный дрейф (нижний ряд тела под водой), камешек спокойно на
  // груди под лапками, спокойные открытые глаза, хвост лежит на воде
  var ROWS_STEADY = [
    "....FFFFF...............",
    "..FFFFFFFFF.............",
    "...FFFFFFF...PPP........",
    "...FIIMIIF..DPPPD.DD....",
    "...FIIMIIFMMMMMMMMMF....",
    "...FMMDMMFFFFFFFFFFFF...",
    "...FMDMDMFFFFFFFFFF.....",
    "....FFFFFFFFFFFFFFF....."
  ]; // top = 6

  // tired: просела в воду (видно мало тела), глаза-полоски (полуприкрыты),
  // камешек съехал на живот к хвосту, левая лапка свесилась в воду,
  // хвост утонул — торчит только кончик; редкий зевок (кадр)
  var ROWS_TIRED = [
    "....FFFFF...............",
    "..FFFFFFFFF.............",
    "...FIIMIIF.....PPP......",
    "...FMMDMMFMMMMDPPPMF....",
    "...FMMMMMFFDFFFFFFFFFD.."
  ]; // top = 8, низ и лапка уходят под воду

  // drained: обёрнута лентами водорослей-«пледа» (G), глаза закрыты (мягкие
  // тёмные чёрточки), камешек-грелка на груди в обеих лапках, «z» над водой
  var ROWS_DRAINED = [
    "....FFFFF...............",
    "..FFFFFFFFF.............",
    "...FDDMDDFG..PPP.G......",
    "...FMMDMMFMMDPPPDMMF....",
    "...FMMMMMFGGFFFFGGFF....",
    "....FFFFFFGGFFFFGGFFFD.."
  ]; // top = 7, водоросли «якорят» — чуть выше tired

  // --- Конфиг mood-состояний (темпы по контракту, всё steps) ---------------

  var CFG = {
    radiant: { breath: "2.2s", wave: "2.2s", frame: "2.2s", blink: "4.4s", toss: "4.4s" },
    steady:  { breath: "3.5s", wave: "3.5s", frame: "3.5s", blink: "5.2s" },
    tired:   { breath: "5s",   wave: "5s",   frame: "5s",   blink: "6s", yawn: "7.5s" },
    drained: { breath: "7s",   wave: "7s",   frame: "7s" }
  };

  // --- Сборка сцен (один раз при загрузке; render — чистая выдача строки) --

  var SCENES = {};

  SCENES.radiant =
    aura("radiant") +
    '<g class="otter-pixel-pet body">' +
      mapRects(5, ROWS_RADIANT) +
      // камешек: кадр «на груди в лапках» / кадр «подброшен в воздух»
      '<g class="otter-pixel-hold extras">' +
        cells("P", [[13, 7, 3], [13, 8, 3]]) + cells("D", [[12, 8], [16, 8]]) +
      "</g>" +
      '<g class="otter-pixel-air extras" opacity="0">' +
        cells("P", [[13, 4, 3], [13, 5, 3]]) + cells("D", [[12, 7], [16, 7]]) +
      "</g>" +
      // хвост-весло: лежит / взлетел для шлепка (с брызгами R)
      '<g class="otter-pixel-a extras">' + cells("F", [[20, 11], [21, 11]]) + cells("D", [[22, 11]]) + "</g>" +
      '<g class="otter-pixel-b extras" opacity="0">' +
        cells("F", [[20, 10], [21, 9]]) + cells("D", [[22, 8]]) +
        cells("R", [[22, 10], [23, 9], [20, 12]]) +
      "</g>" +
      shut([[4, 8, 2], [7, 8, 2], [4, 9, 2], [7, 9, 2]]) +
    "</g>" +
    water() + waves() +
    particles("Y",
      spark(2, 5).concat([[20, 3], [22, 6]]),
      spark(21, 4).concat([[1, 8], [5, 2]]));

  SCENES.steady =
    aura("steady") +
    '<g class="otter-pixel-pet body">' +
      mapRects(6, ROWS_STEADY) +
      // кончик хвоста лениво покачивается на 1 пиксель
      '<g class="otter-pixel-a extras">' + cells("D", [[22, 11]]) + "</g>" +
      '<g class="otter-pixel-b extras" opacity="0">' + cells("D", [[22, 12]]) + "</g>" +
      shut([[4, 9, 2], [7, 9, 2], [4, 10, 2], [7, 10, 2]]) +
    "</g>" +
    water() + waves();

  SCENES.tired =
    aura("tired") +
    '<g class="otter-pixel-pet body">' +
      mapRects(8, ROWS_TIRED) +
      // редкий зевок — тёмный открытый ротик на подбородке
      '<g class="otter-pixel-yawn mouth" opacity="0">' + cells("D", [[5, 12, 3]]) + "</g>" +
      shut([[4, 10, 2], [7, 10, 2]]) +
    "</g>" +
    water() + waves() +
    // ленивые круги у свесившейся в воду лапки
    '<g class="otter-pixel-a">' + cells("R", [[10, 13], [12, 13]]) + "</g>" +
    '<g class="otter-pixel-b" opacity="0">' + cells("R", [[9, 13], [13, 13]]) + "</g>";

  SCENES.drained =
    aura("drained") +
    '<g class="otter-pixel-pet body">' +
      mapRects(7, ROWS_DRAINED) +
      // «вдох»: грудка с камешком приподнимается на 1 пиксель
      '<g class="otter-pixel-puff extras" opacity="0">' + cells("M", [[11, 9, 2], [16, 9]]) + "</g>" +
    "</g>" +
    water() + waves() +
    particles("P", zShape(11, 4), zShape(14, 2));

  // --- Регистрация стиля ----------------------------------------------------

  window.registerPetStyle({
    petId: "otter",
    style: "pixel",
    render: function (mood) {
      var m = SCENES[mood] ? mood : "steady";
      return '<svg class="pet-svg pet-otter pet-otter-pixel is-' + m +
        '" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges"' +
        ' role="img" aria-label="Pebble the sea otter, pixel, ' + m + '">' +
        styleFor(m, CFG[m]) + SCENES[m] + "</svg>";
    }
  });
})();
