/* Restling — pet module: Yuzu / Юдзу, капибара в тёплом источнике (id: capybara).
   Контракт: assets/pets/CONTRACT.md. Один inline-SVG на mood, viewBox 0 0 240 240,
   корневой класс pet-svg pet-capybara is-<mood>, все анимации внутри SVG. */
(function () {
  "use strict";

  // Палитра из визуального кита (раздел 3, pet2 Yuzu)
  var FUR = "#C89B6C",      // песочно-коричневая шерсть
      FURD = "#A97F52",     // морда/лапы темнее
      FURL = "#D9B285",     // светлый живот/грудка
      DARK = "#7E5C3B",     // ноздри, рот (тональный, не чёрный)
      YUZU = "#F5A623",     // плод юдзу
      YUZUD = "#DE8F12",
      YUZUL = "#FFD98F",
      LEAF = "#5FAF7E",
      WATER = "#CFE3E0",    // вода онсэна
      WATERD = "#B7D2CE",
      WATERL = "#E4F2EF",
      STEAM = "#FDFBF7",
      CHEEK = "#F5A88E",
      INK = "#3E3A47",
      BLANKET = "#E9E6FA",
      BLANKET2 = "#CFC7EC",
      STONE = "#DCD3C6",
      STONEL = "#E9E2D6";

  var AURA = { radiant: "#FFF3D9", steady: "#E8F3EA", tired: "#EDF0F8", drained: "#F0ECF7" };

  // Общие @keyframes — одинаковые строки во всех mood, конфликтов между
  // экземплярами в одном DOM нет (имена с префиксом capybara-).
  var KEYFRAMES =
    "@keyframes capybara-breathe{0%,100%{transform:scale(1)}50%{transform:scale(1.028,1.05)}}" +
    "@keyframes capybara-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-2.5px)}}" +
    "@keyframes capybara-blink{0%,90%,100%{transform:scaleY(0)}93%,96%{transform:scaleY(1)}}" +
    "@keyframes capybara-ripple{0%{transform:scale(.62);opacity:.75}100%{transform:scale(1.18);opacity:0}}" +
    "@keyframes capybara-steamrise{0%{transform:translateY(8px);opacity:0}35%{opacity:.55}100%{transform:translateY(-30px);opacity:0}}" +
    "@keyframes capybara-sway{0%,100%{transform:rotate(-4deg)}50%{transform:rotate(4deg)}}" +
    "@keyframes capybara-twinkle{0%,100%{opacity:0;transform:scale(.4)}50%{opacity:1;transform:scale(1)}}" +
    "@keyframes capybara-glowpulse{0%,100%{opacity:.35}50%{opacity:.75}}" +
    "@keyframes capybara-earwig{0%,84%,100%{transform:rotate(0deg)}88%{transform:rotate(-10deg)}93%{transform:rotate(6deg)}}" +
    "@keyframes capybara-slitpeek{0%,86%,100%{transform:scaleY(.2)}91%,94%{transform:scaleY(.55)}}" +
    "@keyframes capybara-zfloat{0%{transform:translate(0,0);opacity:0}20%{opacity:.85}100%{transform:translate(9px,-24px);opacity:0}}";

  // --- Части морды -----------------------------------------------------

  // Один глаз. kind: open | zen | tired | slit. x — смещение по горизонтали.
  function eye(kind, x) {
    if (kind === "slit") {
      return '<g transform="translate(' + x + ',-8)">' +
        '<ellipse class="capybara-sliteye" rx="5.4" ry="4.5" fill="' + INK + '"/></g>';
    }
    var lid = "";
    if (kind === "zen") {
      lid = '<rect x="-6.2" y="-6.2" width="12.4" height="4.6" rx="2.2" fill="' + FUR + '"/>';
    } else if (kind === "tired") {
      lid = '<rect x="-6.2" y="-6.2" width="12.4" height="6.4" rx="2.2" fill="' + FUR + '"/>';
    }
    return '<g transform="translate(' + x + ',-8)">' +
      '<circle r="5.6" fill="' + INK + '"/>' +
      '<circle cx="1.9" cy="-1.9" r="1.8" fill="#FFFFFF"/>' +
      '<circle cx="-1.7" cy="2" r=".8" fill="#FFFFFF" opacity=".65"/>' +
      lid +
      '<rect class="capybara-lid-blink" x="-6.2" y="-6.2" width="12.4" height="12.6" rx="3" fill="' + FUR + '"/>' +
      "</g>";
  }

  var MOUTHS = {
    smile: '<path d="M -13 31 Q 0 39 13 31" fill="none" stroke="' + DARK + '" stroke-width="2.4" stroke-linecap="round"/>',
    soft:  '<path d="M -10 32 Q 0 37.5 10 32" fill="none" stroke="' + DARK + '" stroke-width="2.2" stroke-linecap="round"/>',
    flat:  '<path d="M -9 34 Q 0 36 9 34" fill="none" stroke="' + DARK + '" stroke-width="2.2" stroke-linecap="round"/>',
    rest:  '<path d="M -7 33 Q 0 36.5 7 33" fill="none" stroke="' + DARK + '" stroke-width="2" stroke-linecap="round"/>'
  };

  // Плод юдзу на макушке; tilt — статичный наклон (attr), покачивание — CSS внутри.
  function yuzuOnHead(tilt, glow) {
    return '<g transform="translate(0,-49) rotate(' + tilt + ')">' +
      (glow ? '<circle class="capybara-yuzuglow" r="17" fill="#FFF3D9" opacity=".5"/>' : "") +
      '<g class="capybara-yuzu">' +
        '<circle r="11" fill="' + YUZU + '"/>' +
        '<path d="M -6.5 6.5 Q 0 10.5 6.5 6.5" fill="none" stroke="' + YUZUD + '" stroke-width="1.4" opacity=".55"/>' +
        '<circle cx="-3.5" cy="-3.5" r="2.7" fill="' + YUZUL + '" opacity=".9"/>' +
        '<circle cy="-10.2" r="1.7" fill="' + YUZUD + '"/>' +
        '<ellipse cx="7.5" cy="-12" rx="6" ry="2.8" fill="' + LEAF + '" transform="rotate(-32 7.5 -12)"/>' +
      "</g></g>";
  }

  // Голова-«кирпичик» с тупой квадратной мордой; центр = (0,0), верх -40, низ +44.
  // o: { eyes, mouth, earL, earR, yuzu (строка или "") }
  function headSVG(o) {
    return '<g class="capybara-headwrap head">' +
      // маленькие круглые ушки высоко и близко к макушке
      '<g transform="' + o.earL + '"><g class="capybara-ear">' +
        '<circle r="8.5" fill="' + FUR + '"/><circle cy="1" r="4.4" fill="' + FURD + '"/></g></g>' +
      '<g transform="' + o.earR + '"><g class="capybara-ear">' +
        '<circle r="8.5" fill="' + FUR + '"/><circle cy="1" r="4.4" fill="' + FURD + '"/></g></g>' +
      // прямоугольная голова
      '<rect x="-42" y="-40" width="84" height="80" rx="21" fill="' + FUR + '"/>' +
      // тупая квадратная морда (темнее)
      '<rect x="-30" y="2" width="60" height="42" rx="15" fill="' + FURD + '"/>' +
      // две точки-ноздри на верхней плоскости морды
      '<ellipse cx="-11" cy="12" rx="2.6" ry="3.2" fill="' + DARK + '"/>' +
      '<ellipse cx="11" cy="12" rx="2.6" ry="3.2" fill="' + DARK + '"/>' +
      // щёчки
      '<ellipse cx="-37" cy="8" rx="5" ry="3.6" fill="' + CHEEK + '" opacity=".85"/>' +
      '<ellipse cx="37" cy="8" rx="5" ry="3.6" fill="' + CHEEK + '" opacity=".85"/>' +
      '<g class="capybara-eyes eyes">' + eye(o.eyes, -28) + eye(o.eyes, 28) + "</g>" +
      '<g class="capybara-mouth mouth">' + MOUTHS[o.mouth] + "</g>" +
      '<g class="capybara-extras extras">' + (o.yuzu || "") + "</g>" +
      "</g>";
  }

  // --- Сцена онсэна (radiant / steady / tired) --------------------------

  function steamPath(x, y, cls, w) {
    return '<g transform="translate(' + x + "," + y + ')">' +
      '<path class="' + cls + '" d="M0 0 q -5 -9 0 -17 q 5 -9 0 -17" fill="none" stroke="' + STEAM +
      '" stroke-width="' + w + '" stroke-linecap="round" opacity="0"/></g>';
  }

  function onsenScene(mood, c) {
    var s = "";
    // аура состояния
    s += '<ellipse class="capybara-aura aura" cx="120" cy="146" rx="100" ry="78" fill="' + AURA[mood] + '" opacity=".55"/>';
    // чаша источника и камни по краям
    s += '<ellipse cx="120" cy="184" rx="98" ry="27" fill="' + WATERD + '"/>';
    s += '<ellipse cx="26" cy="182" rx="13" ry="9" fill="' + STONE + '"/>' +
         '<ellipse cx="24" cy="179" rx="9" ry="5" fill="' + STONEL + '"/>' +
         '<ellipse cx="214" cy="180" rx="11" ry="8" fill="' + STONE + '"/>' +
         '<ellipse cx="213" cy="177.5" rx="7.5" ry="4.5" fill="' + STONEL + '"/>';
    // капибара: погружение = вертикальный сдвиг, покачивание на воде — bob;
    // clip прячет тело ниже чаши источника (иначе брюхо торчит из-под воды)
    s += '<clipPath id="capybara-' + mood + '-dip"><rect x="0" y="0" width="240" height="195"/></clipPath>';
    s += '<g clip-path="url(#capybara-' + mood + '-dip)">' +
      '<g transform="translate(120,' + (100 + c.off) + ')"><g class="capybara-bob">' +
      '<g class="capybara-torso body">' +
        '<ellipse cy="76" rx="64" ry="45" fill="' + FUR + '"/>' +
        '<ellipse cy="62" rx="29" ry="13" fill="' + FURL + '" opacity=".45"/>' +
      "</g>" +
      headSVG(c) +
      "</g></g></g>";
    // вода поверх тела — линия воды пересекает силуэт
    s += '<g class="capybara-water">' +
      '<ellipse cx="120" cy="180" rx="92" ry="24" fill="' + WATER + '" opacity=".92"/>' +
      '<ellipse cx="120" cy="176" rx="80" ry="17" fill="' + WATERL + '" opacity=".4"/>' +
      '<ellipse class="capybara-ripple1" cx="120" cy="176" rx="64" ry="12" fill="none" stroke="' + WATERD + '" stroke-width="2"/>' +
      '<ellipse class="capybara-ripple2" cx="120" cy="178" rx="80" ry="16" fill="none" stroke="' + WATERD + '" stroke-width="2"/>' +
      "</g>";
    // пар
    var st = '<g class="capybara-steam">';
    if (c.steam >= 1) st += steamPath(58, 168, "capybara-steam-1", 5);
    if (c.steam >= 2) st += steamPath(182, 166, "capybara-steam-2", 5);
    if (c.steam >= 3) st += steamPath(152, 160, "capybara-steam-3", 4.5);
    s += st + "</g>";
    // искры radiant
    if (c.sparks) {
      var spark = function (x, y, n, k) {
        return '<path class="capybara-spark-' + n + '" transform="translate(' + x + "," + y + ") scale(" + k +
          ')" d="M0 -5 L1.8 0 L0 5 L-1.8 0 Z" fill="' + YUZU + '" opacity="0"/>';
      };
      s += '<g class="capybara-particles particles">' +
        spark(44, 72, 1, 1) + spark(198, 62, 2, .85) + spark(176, 118, 3, .7) + spark(52, 128, 4, .8) +
        "</g>";
    }
    return s;
  }

  // --- Сцена drained: калачиком на тёплом камне у воды, под пледом ------

  function drainedScene() {
    var s = "";
    s += '<ellipse class="capybara-aura aura" cx="120" cy="150" rx="100" ry="76" fill="' + AURA.drained + '" opacity=".55"/>';
    // источник справа, последняя струйка пара
    s += '<ellipse cx="201" cy="198" rx="35" ry="11" fill="' + WATER + '"/>' +
         '<ellipse cx="201" cy="196" rx="26" ry="7" fill="' + WATERL + '" opacity=".55"/>' +
         '<ellipse class="capybara-ripple1" cx="201" cy="196" rx="20" ry="5.5" fill="none" stroke="' + WATERD + '" stroke-width="1.6"/>' +
         steamPath(201, 188, "capybara-steam-1", 4);
    // тёплый камень
    s += '<ellipse cx="110" cy="197" rx="66" ry="17" fill="' + STONE + '"/>' +
         '<ellipse cx="110" cy="193" rx="54" ry="11" fill="' + STONEL + '" opacity=".8"/>';
    // капибара калачиком: тело + плед дышат вместе, голова на камне
    s += '<g class="capybara-bob">' +
      '<g class="capybara-torso body">' +
        '<ellipse cx="119" cy="177" rx="45" ry="25" fill="' + FUR + '"/>' +
        // плед накрывает тело почти до камня, волнистый край + стежки
        '<path d="M 70 194 Q 70 150 119 148 Q 168 150 168 194 Q 156 187 145 193 Q 134 187 123 193 Q 112 187 101 193 Q 90 187 79 193 Q 74 190 70 194 Z" fill="' + BLANKET + '" stroke="' + BLANKET2 + '" stroke-width="1.6" opacity=".97"/>' +
        '<path d="M 82 163 Q 119 152 156 163" fill="none" stroke="' + BLANKET2 + '" stroke-width="2" stroke-dasharray="2 6" stroke-linecap="round" opacity=".9"/>' +
      "</g>" +
      '<g transform="translate(74,152) rotate(-6) scale(.94)">' +
        headSVG({
          eyes: "slit", mouth: "rest",
          earL: "translate(-32,-34) rotate(-14)",
          earR: "translate(32,-34) rotate(14)",
          yuzu: ""
        }) +
      "</g></g>";
    // юдзу лежит рядом на камне
    s += '<g class="capybara-extras extras" transform="translate(155,189) rotate(16)">' +
      '<circle r="9.5" fill="' + YUZU + '"/>' +
      '<circle cx="-3" cy="-3" r="2.3" fill="' + YUZUL + '" opacity=".9"/>' +
      '<circle cy="-8.8" r="1.5" fill="' + YUZUD + '"/>' +
      '<ellipse cx="6.5" cy="-10" rx="5" ry="2.4" fill="' + LEAF + '" transform="rotate(-30 6.5 -10)"/>' +
      "</g>";
    // сонные z
    s += '<g class="capybara-particles particles">' +
      '<text class="capybara-z1" x="128" y="134" font-size="15" font-weight="700" fill="#9C8BC0" opacity="0">z</text>' +
      '<text class="capybara-z2" x="142" y="120" font-size="11" font-weight="700" fill="#9C8BC0" opacity="0">z</text>' +
      "</g>";
    return s;
  }

  // --- Стили -------------------------------------------------------------

  function styleFor(mood, c) {
    var P = ".pet-capybara.is-" + mood;
    var css = KEYFRAMES;
    css += P + " .capybara-aura{animation:capybara-glowpulse " + c.aura + " ease-in-out infinite}";
    css += P + " .capybara-bob{animation:capybara-bob " + c.breath + " ease-in-out infinite}";
    css += P + " .capybara-torso{animation:capybara-breathe " + c.breath + " ease-in-out infinite;transform-box:fill-box;transform-origin:50% 100%}";
    css += P + " .capybara-lid-blink{transform:scaleY(0);animation:capybara-blink " + c.blink + " linear infinite;transform-box:fill-box;transform-origin:50% 0%}";
    css += P + " .capybara-ripple1{animation:capybara-ripple " + c.rip + " ease-out infinite;transform-box:fill-box;transform-origin:50% 50%}";
    css += P + " .capybara-ripple2{animation:capybara-ripple " + c.rip + " ease-out infinite;animation-delay:" + c.ripDelay + ";transform-box:fill-box;transform-origin:50% 50%}";
    css += P + " .capybara-steam-1{animation:capybara-steamrise " + c.steamDur + " ease-in-out infinite}";
    css += P + " .capybara-steam-2{animation:capybara-steamrise " + c.steamDur + " ease-in-out infinite;animation-delay:1.4s}";
    css += P + " .capybara-steam-3{animation:capybara-steamrise " + c.steamDur + " ease-in-out infinite;animation-delay:2.7s}";
    if (mood !== "drained") {
      css += P + " .capybara-yuzu{animation:capybara-sway " + c.sway + " ease-in-out infinite;transform-box:fill-box;transform-origin:50% 100%}";
    }
    if (mood === "radiant") {
      css += P + " .capybara-yuzuglow{animation:capybara-glowpulse 2.2s ease-in-out infinite}";
      css += P + " .capybara-ear{animation:capybara-earwig 6s ease-in-out infinite;transform-box:fill-box;transform-origin:50% 90%}";
      for (var i = 1; i <= 4; i++) {
        css += P + " .capybara-spark-" + i + "{animation:capybara-twinkle 2.4s ease-in-out infinite;animation-delay:" + ((i - 1) * 0.6) + "s;transform-box:fill-box;transform-origin:50% 50%}";
      }
    }
    if (mood === "drained") {
      css += P + " .capybara-sliteye{transform:scaleY(.2);animation:capybara-slitpeek 9s ease-in-out infinite;transform-box:fill-box;transform-origin:50% 50%}";
      css += P + " .capybara-z1{animation:capybara-zfloat 7s ease-in-out infinite}";
      css += P + " .capybara-z2{animation:capybara-zfloat 7s ease-in-out infinite;animation-delay:3.5s}";
    }
    // reduced motion: позы различимы статично (погружение/уши/юдзу/плед/веки)
    css += "@media (prefers-reduced-motion:reduce){" + P + " *{animation:none!important}}";
    return "<style>" + css + "</style>";
  }

  // --- Конфиг mood-состояний ----------------------------------------------
  // Канал капибары: глубина погружения + пар + юдзу (визуальный кит, pet2).

  var CFG = {
    radiant: { // по живот, спина прямая, юдзу сияет, 3 струйки пара + искры
      off: -3, breath: "2.2s", blink: "4.2s", aura: "2.2s",
      rip: "2.6s", ripDelay: "1.3s", steam: 3, steamDur: "3.6s", sway: "2.6s",
      eyes: "open", mouth: "smile", sparks: true,
      earL: "translate(-32,-38)", earR: "translate(32,-38)",
      yuzu: null // соберём ниже с glow
    },
    steady: { // по плечи, дзен-прищур, 2 струйки пара
      off: 12, breath: "3.5s", blink: "5s", aura: "3.5s",
      rip: "3.4s", ripDelay: "1.7s", steam: 2, steamDur: "4.6s", sway: "3.5s",
      eyes: "zen", mouth: "soft",
      earL: "translate(-32,-38)", earR: "translate(32,-38)"
    },
    tired: { // по подбородок, юдзу набок, ушки обвисли, пар почти исчез
      off: 28, breath: "5s", blink: "6s", aura: "5s",
      rip: "4.4s", ripDelay: "2.2s", steam: 1, steamDur: "6s", sway: "5s",
      eyes: "tired", mouth: "flat",
      earL: "translate(-35,-33) rotate(-28)", earR: "translate(35,-33) rotate(28)"
    },
    drained: { // на камне под пледом, юдзу рядом, «z» и последняя струйка пара
      breath: "7s", blink: "9s", aura: "7s",
      rip: "6s", ripDelay: "3s", steamDur: "8s"
    }
  };
  CFG.radiant.yuzu = yuzuOnHead(0, true);
  CFG.steady.yuzu = yuzuOnHead(0, false);
  CFG.tired.yuzu = yuzuOnHead(22, false);

  // --- Регистрация ---------------------------------------------------------

  window.registerPet({
    id: "capybara",
    nameEn: "Yuzu",
    nameRu: "Юдзу",
    render: function (mood) {
      var c = CFG[mood] || CFG.steady;
      var m = CFG[mood] ? mood : "steady";
      var body = m === "drained" ? drainedScene() : onsenScene(m, c);
      return '<svg class="pet-svg pet-capybara is-' + m + '" viewBox="0 0 240 240" ' +
        'xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Yuzu the capybara, ' + m + '">' +
        styleFor(m, c) + body + "</svg>";
    }
  });
})();
