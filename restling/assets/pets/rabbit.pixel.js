/**
 * Clover / Кловер — pet3, стиль «pixel» (assets/pets/CONTRACT.md v2).
 * Пиксель-арт: сетка 24×24 (квант 10px), SVG rect, shape-rendering=crispEdges,
 * ограниченная палитра из кита, анимации только steps() — ретро-тамагочи.
 * Уникальный канал состояния — уши:
 *   radiant — стоит столбиком, оба уха торчком, binky-подскок, искры;
 *   steady  — «булочка», левое ухо вверх, правое согнуто (bashful), вздрагивает;
 *   tired   — осела, уши висят по бокам, глаза полуприкрыты, зевок;
 *   drained — клубочек под пледом, торчат кончики ушей и помпон, «z».
 * Дыхание во всех mood — двухкадровый свап (frame A/B) через opacity + steps.
 */
(function () {
  "use strict";

  if (typeof window.registerPetStyle !== "function") return;

  var Q = 10; // квант сетки: 24×24 «пикселя» на viewBox 240

  // Палитра (кит, раздел 3 / pet3): 6–8 цветов на позу
  var BODY = "#F7EDE2"; // шёрстка
  var SHADE = "#E8D9C8"; // лапки/тени/рот
  var PINK = "#F2B8C6"; // внутреннее ухо, нос
  var POM = "#FDFBF7"; // помпон, животик, блик глаза
  var INK = "#3E3A47"; // глаза, тень на земле
  var CHEEK = "#F5A88E"; // щёчки, зевок
  var PLAID = "#E9E6FA"; // плед (drained)
  var PLAIDL = "#CFC8EE"; // узор пледа
  var GOLD = "#F5A623"; // искры radiant
  var SAGE = "#5FAF7E"; // аура steady
  var BLUE = "#8CA0C9"; // аура tired
  var LILAC = "#9C8BC0"; // аура и «z» drained

  var REDUCED =
    "@media (prefers-reduced-motion: reduce){.pet-rabbit-pixel *{animation:none !important}}";

  function px(x, y, w, h, c, extra) {
    return '<rect x="' + x * Q + '" y="' + y * Q + '" width="' + w * Q +
      '" height="' + h * Q + '" fill="' + c + '"' + (extra || "") + "/>";
  }

  function shell(mood, style, inner) {
    return '<svg viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg" ' +
      'shape-rendering="crispEdges" class="pet-svg pet-rabbit pet-rabbit-pixel is-' +
      mood + '" role="img" aria-label="Clover">' +
      "<style>" + style + REDUCED + "</style>" + inner + "</svg>";
  }

  // Хвост-помпон 2×2 с тональным L-краем (иначе белый пом тонет в светлом фоне)
  function pom(x, y) {
    return px(x, y, 2, 2, POM) + px(x, y + 1, 2, 1, SHADE) + px(x + 1, y, 1, 1, SHADE) +
      px(x, y, 1, 1, POM);
  }

  // Пиксельная «z» 3×3: XXX / .X. / XXX
  function zGlyph(x, y) {
    return px(x, y, 3, 1, LILAC) + px(x + 1, y + 1, 1, 1, LILAC) + px(x, y + 2, 3, 1, LILAC);
  }

  // Двухкадровый свап: A виден первую половину цикла, B — вторую (steps)
  var KF_FRAMES =
    "@keyframes rabbit-pixel-fA{0%{opacity:1}50%{opacity:0}100%{opacity:1}}" +
    "@keyframes rabbit-pixel-fB{0%{opacity:0}50%{opacity:1}100%{opacity:0}}";
  var KF_BLINK =
    "@keyframes rabbit-pixel-blink{0%{opacity:0}88%{opacity:0}90%{opacity:1}96%{opacity:1}97%{opacity:0}100%{opacity:0}}";

  /* ---------- RADIANT: столбиком, уши торчком, binky, искры ---------- */

  function radiant() {
    var style =
      ".pet-rabbit-pixel.is-radiant .rabbit-pixel-pet{animation:rabbit-pixel-binky 6.6s steps(1,end) infinite}" +
      ".pet-rabbit-pixel.is-radiant .rabbit-pixel-fA{animation:rabbit-pixel-fA 2.2s steps(1,end) infinite}" +
      ".pet-rabbit-pixel.is-radiant .rabbit-pixel-fB{opacity:0;animation:rabbit-pixel-fB 2.2s steps(1,end) infinite}" +
      ".pet-rabbit-pixel.is-radiant .rabbit-pixel-lid{opacity:0;animation:rabbit-pixel-blink 4.4s steps(1,end) infinite}" +
      ".pet-rabbit-pixel.is-radiant .rabbit-pixel-spark{opacity:0;animation:rabbit-pixel-spark 2.2s steps(1,end) infinite}" +
      ".pet-rabbit-pixel.is-radiant .rabbit-pixel-sp2{animation-delay:.55s}" +
      ".pet-rabbit-pixel.is-radiant .rabbit-pixel-sp3{animation-delay:1.1s}" +
      ".pet-rabbit-pixel.is-radiant .rabbit-pixel-sp4{animation-delay:1.65s}" +
      KF_FRAMES + KF_BLINK +
      "@keyframes rabbit-pixel-binky{0%{transform:translateY(0)}76%{transform:translateY(0)}78%{transform:translateY(-10px)}82%{transform:translateY(-20px)}88%{transform:translateY(-20px)}90%{transform:translateY(-10px)}92%{transform:translateY(0)}100%{transform:translateY(0)}}" +
      "@keyframes rabbit-pixel-spark{0%{opacity:0}45%{opacity:0}50%{opacity:1}85%{opacity:1}90%{opacity:0}100%{opacity:0}}";

    var inner =
      // тень на земле (вне pet — не прыгает вместе с binky)
      px(9, 20, 6, 1, INK, ' opacity=".08"') +
      '<g class="rabbit-pixel-pet">' +
        // кадр A: уши прямые
        '<g class="rabbit-pixel-fA">' +
          px(9, 2, 2, 6, BODY) + px(10, 3, 1, 4, PINK) +
          px(13, 2, 2, 6, BODY) + px(13, 3, 1, 4, PINK) +
        "</g>" +
        // кадр B: уши-пружинки разведены + бока-вдох
        '<g class="rabbit-pixel-fB">' +
          px(9, 5, 2, 3, BODY) + px(8, 2, 2, 3, BODY) +
          px(9, 3, 1, 2, PINK) + px(10, 5, 1, 2, PINK) +
          px(13, 5, 2, 3, BODY) + px(14, 2, 2, 3, BODY) +
          px(14, 3, 1, 2, PINK) + px(13, 5, 1, 2, PINK) +
          px(7, 14, 1, 2, BODY) + px(16, 14, 1, 2, BODY) +
        "</g>" +
        // голова и тело
        px(9, 7, 6, 1, BODY) +
        px(8, 8, 8, 5, BODY) +
        px(8, 13, 8, 5, BODY) +
        // хвост-помпон и задние тапочки
        px(16, 16, 2, 2, POM) +
        px(8, 18, 3, 2, SHADE) + px(13, 18, 3, 2, SHADE) +
        // животик и лапки у груди
        px(10, 14, 4, 3, POM) +
        px(9, 14, 1, 2, SHADE) + px(14, 14, 1, 2, SHADE) +
        // глаза с бликом (широко открыты)
        '<g class="rabbit-pixel-eyes">' +
          px(9, 9, 2, 2, INK) + px(13, 9, 2, 2, INK) +
          px(10, 9, 1, 1, POM) + px(14, 9, 1, 1, POM) +
        "</g>" +
        '<g class="rabbit-pixel-lid">' +
          px(9, 9, 2, 2, BODY) + px(13, 9, 2, 2, BODY) +
        "</g>" +
        // щёчки, нос, ротик
        px(8, 11, 1, 1, CHEEK) + px(15, 11, 1, 1, CHEEK) +
        px(11, 11, 2, 1, PINK) +
        px(11, 12, 2, 1, SHADE) +
      "</g>" +
      // искры
      '<g class="rabbit-pixel-particles">' +
        '<g class="rabbit-pixel-spark rabbit-pixel-sp1">' + px(5, 4, 1, 1, GOLD) + "</g>" +
        '<g class="rabbit-pixel-spark rabbit-pixel-sp2">' + px(18, 3, 1, 1, GOLD) + "</g>" +
        '<g class="rabbit-pixel-spark rabbit-pixel-sp3">' + px(4, 11, 1, 1, GOLD) + "</g>" +
        '<g class="rabbit-pixel-spark rabbit-pixel-sp4">' + px(19, 10, 1, 1, GOLD) + "</g>" +
      "</g>";

    return shell("radiant", style, inner);
  }

  /* ------ STEADY: «булочка», левое ухо вверх, правое согнуто ------ */

  function steady() {
    var style =
      ".pet-rabbit-pixel.is-steady .rabbit-pixel-fB{opacity:0;animation:rabbit-pixel-fB 3.5s steps(1,end) infinite}" +
      ".pet-rabbit-pixel.is-steady .rabbit-pixel-twA{animation:rabbit-pixel-twA 7s steps(1,end) infinite}" +
      ".pet-rabbit-pixel.is-steady .rabbit-pixel-twB{opacity:0;animation:rabbit-pixel-twB 7s steps(1,end) infinite}" +
      ".pet-rabbit-pixel.is-steady .rabbit-pixel-lid{opacity:0;animation:rabbit-pixel-blink 5.6s steps(1,end) infinite}" +
      KF_FRAMES + KF_BLINK +
      "@keyframes rabbit-pixel-twA{0%{opacity:1}86%{opacity:1}88%{opacity:0}96%{opacity:0}98%{opacity:1}100%{opacity:1}}" +
      "@keyframes rabbit-pixel-twB{0%{opacity:0}86%{opacity:0}88%{opacity:1}96%{opacity:1}98%{opacity:0}100%{opacity:0}}";

    var inner =
      // аура-пиксели (шалфей, ровное свечение без частиц)
      '<g class="rabbit-pixel-aura" opacity=".35">' +
        px(4, 8, 1, 1, SAGE) + px(19, 9, 1, 1, SAGE) +
        px(3, 15, 1, 1, SAGE) + px(20, 14, 1, 1, SAGE) +
      "</g>" +
      px(8, 20, 8, 1, INK, ' opacity=".08"') +
      '<g class="rabbit-pixel-pet">' +
        // левое ухо торчком
        px(9, 4, 2, 6, BODY) + px(10, 5, 1, 4, PINK) +
        // правое ухо согнуто — кадр A (обычный) / кадр B (вздрогнуло)
        '<g class="rabbit-pixel-twA">' +
          px(13, 8, 2, 2, BODY) + px(15, 9, 1, 2, BODY) + px(13, 8, 1, 2, PINK) +
        "</g>" +
        '<g class="rabbit-pixel-twB">' +
          px(13, 7, 2, 2, BODY) + px(15, 8, 1, 2, BODY) + px(13, 7, 1, 2, PINK) +
        "</g>" +
        // булочка: голова+тело единым блоком
        px(9, 10, 6, 1, BODY) +
        px(8, 11, 8, 4, BODY) +
        px(7, 15, 10, 4, BODY) +
        // бока-вдох (кадр B)
        '<g class="rabbit-pixel-fB">' +
          px(6, 16, 1, 2, BODY) + px(17, 15, 1, 2, BODY) +
        "</g>" +
        // хвост-помпон и тапочки
        px(16, 17, 2, 2, POM) +
        px(8, 18, 3, 2, SHADE) + px(13, 18, 3, 2, SHADE) +
        // животик и лапки на груди
        px(10, 16, 4, 3, POM) +
        px(10, 15, 1, 1, SHADE) + px(13, 15, 1, 1, SHADE) +
        // спокойные глаза с полубликом
        '<g class="rabbit-pixel-eyes">' +
          px(9, 12, 2, 2, INK) + px(13, 12, 2, 2, INK) +
          px(10, 12, 1, 1, POM) + px(14, 12, 1, 1, POM) +
        "</g>" +
        '<g class="rabbit-pixel-lid">' +
          px(9, 12, 2, 2, BODY) + px(13, 12, 2, 2, BODY) +
        "</g>" +
        // щёчки, нос, ротик
        px(8, 14, 1, 1, CHEEK) + px(15, 14, 1, 1, CHEEK) +
        px(11, 14, 2, 1, PINK) +
        px(11, 15, 2, 1, SHADE) +
      "</g>";

    return shell("steady", style, inner);
  }

  /* ------ TIRED: осела, уши висят по бокам, полуприкрытые глаза ------ */

  function tired() {
    var style =
      ".pet-rabbit-pixel.is-tired .rabbit-pixel-fB{opacity:0;animation:rabbit-pixel-fB 5s steps(1,end) infinite}" +
      ".pet-rabbit-pixel.is-tired .rabbit-pixel-lid{opacity:0;animation:rabbit-pixel-blink 6s steps(1,end) infinite}" +
      ".pet-rabbit-pixel.is-tired .rabbit-pixel-yawn{opacity:0;animation:rabbit-pixel-yawn 10s steps(1,end) infinite}" +
      KF_FRAMES + KF_BLINK +
      "@keyframes rabbit-pixel-yawn{0%{opacity:0}74%{opacity:0}76%{opacity:1}88%{opacity:1}90%{opacity:0}100%{opacity:0}}";

    var inner =
      // аура-пиксели (пыльно-голубая дымка)
      '<g class="rabbit-pixel-aura" opacity=".35">' +
        px(4, 9, 1, 1, BLUE) + px(19, 10, 1, 1, BLUE) +
        px(3, 16, 1, 1, BLUE) + px(20, 15, 1, 1, BLUE) +
      "</g>" +
      px(6, 20, 12, 1, INK, ' opacity=".08"') +
      '<g class="rabbit-pixel-pet">' +
        // осевшее тело (низкое и широкое)
        px(9, 12, 6, 1, BODY) +
        px(8, 13, 8, 2, BODY) +
        px(7, 15, 10, 2, BODY) +
        px(6, 17, 12, 3, BODY) +
        // макушка-вдох (кадр B)
        '<g class="rabbit-pixel-fB">' + px(9, 11, 6, 1, BODY) + "</g>" +
        // уши висят по бокам головы (поверх тела)
        px(6, 12, 2, 5, BODY) + px(7, 13, 1, 3, PINK) +
        px(16, 12, 2, 5, BODY) + px(16, 13, 1, 3, PINK) +
        // хвост-помпон и тапочки
        px(17, 17, 2, 2, POM) +
        px(7, 18, 3, 2, SHADE) + px(14, 18, 3, 2, SHADE) +
        // полуприкрытые глаза: тяжёлое веко + нижняя половина зрачка
        '<g class="rabbit-pixel-eyes">' +
          px(9, 13, 2, 1, SHADE) + px(13, 13, 2, 1, SHADE) +
          px(9, 14, 2, 1, INK) + px(13, 14, 2, 1, INK) +
        "</g>" +
        '<g class="rabbit-pixel-lid">' +
          px(9, 14, 2, 1, BODY) + px(13, 14, 2, 1, BODY) +
        "</g>" +
        // щёчки, нос, ротик
        px(8, 15, 1, 1, CHEEK) + px(15, 15, 1, 1, CHEEK) +
        px(11, 15, 2, 1, PINK) +
        px(11, 16, 2, 1, SHADE) +
        // редкий зевок (открытый ротик)
        '<g class="rabbit-pixel-yawn">' + px(11, 16, 2, 2, CHEEK) + "</g>" +
      "</g>";

    return shell("tired", style, inner);
  }

  /* -- DRAINED: клубочек под пледом, кончики ушей и помпон наружу, «z» -- */

  function drained() {
    var style =
      ".pet-rabbit-pixel.is-drained .rabbit-pixel-fB{opacity:0;animation:rabbit-pixel-fB 7s steps(1,end) infinite}" +
      ".pet-rabbit-pixel.is-drained .rabbit-pixel-peek{opacity:0;animation:rabbit-pixel-peek 9s steps(1,end) infinite}" +
      ".pet-rabbit-pixel.is-drained .rabbit-pixel-z{opacity:0;animation:rabbit-pixel-z 6s steps(1,end) infinite}" +
      ".pet-rabbit-pixel.is-drained .rabbit-pixel-z2{animation-delay:3s}" +
      KF_FRAMES +
      "@keyframes rabbit-pixel-peek{0%{opacity:0}86%{opacity:0}88%{opacity:1}94%{opacity:1}96%{opacity:0}100%{opacity:0}}" +
      "@keyframes rabbit-pixel-z{0%{opacity:0;transform:translateY(0)}8%{opacity:1;transform:translateY(0)}30%{opacity:1;transform:translateY(0)}32%{opacity:1;transform:translateY(-10px)}55%{opacity:1;transform:translateY(-10px)}57%{opacity:.55;transform:translateY(-20px)}78%{opacity:.55;transform:translateY(-20px)}80%{opacity:0;transform:translateY(-30px)}100%{opacity:0;transform:translateY(-30px)}}";

    var inner =
      // аура-пиксели (сиреневые сумерки)
      '<g class="rabbit-pixel-aura" opacity=".35">' +
        px(3, 10, 1, 1, LILAC) + px(19, 8, 1, 1, LILAC) +
        px(2, 16, 1, 1, LILAC) + px(20, 13, 1, 1, LILAC) +
      "</g>" +
      px(4, 20, 15, 1, INK, ' opacity=".08"') +
      '<g class="rabbit-pixel-pet">' +
        // голова клубочка (слева)
        px(5, 14, 3, 1, BODY) +
        px(4, 15, 5, 4, BODY) +
        px(5, 19, 3, 1, BODY) +
        // глаза-щёлочки
        '<g class="rabbit-pixel-eyes">' +
          px(5, 16, 1, 1, INK) + px(7, 16, 1, 1, INK) +
        "</g>" +
        // редкое «приоткрыла-закрыла»
        '<g class="rabbit-pixel-peek">' +
          px(5, 15, 1, 2, INK) + px(7, 15, 1, 2, INK) +
        "</g>" +
        // нос и щёчки
        px(6, 17, 1, 1, PINK) +
        px(4, 17, 1, 1, CHEEK) + px(8, 17, 1, 1, CHEEK) +
        // плед поверх тела
        px(9, 14, 8, 1, PLAID) +
        px(8, 15, 10, 4, PLAID) +
        px(8, 19, 10, 1, PLAID) +
        // плед-вдох: край приподнимается (кадр B)
        '<g class="rabbit-pixel-fB">' + px(9, 13, 8, 1, PLAID) + "</g>" +
        // узор пледа
        px(10, 15, 1, 1, PLAIDL) + px(13, 15, 1, 1, PLAIDL) +
        px(16, 15, 1, 1, PLAIDL) + px(11, 17, 1, 1, PLAIDL) +
        px(14, 17, 1, 1, PLAIDL) + px(9, 18, 1, 1, PLAIDL) +
        // кончики ушей вдоль спины, поверх пледа
        px(12, 13, 2, 1, BODY) + px(13, 13, 1, 1, PINK) +
        px(14, 12, 2, 1, BODY) + px(15, 12, 1, 1, PINK) +
        // хвост-помпон наружу
        px(18, 17, 2, 2, POM) +
      "</g>" +
      // два пиксельных «z» всплывают ступеньками
      '<g class="rabbit-pixel-particles">' +
        '<g class="rabbit-pixel-z rabbit-pixel-z1">' +
          px(8, 7, 2, 1, LILAC) + px(8, 8, 1, 1, LILAC) + px(8, 9, 2, 1, LILAC) +
        "</g>" +
        '<g class="rabbit-pixel-z rabbit-pixel-z2">' +
          px(11, 5, 2, 1, LILAC) + px(11, 6, 1, 1, LILAC) + px(11, 7, 2, 1, LILAC) +
        "</g>" +
      "</g>";

    return shell("drained", style, inner);
  }

  window.registerPetStyle({
    petId: "rabbit",
    style: "pixel",
    render: function (mood) {
      if (mood === "radiant") return radiant();
      if (mood === "steady") return steady();
      if (mood === "tired") return tired();
      return drained();
    }
  });
})();
