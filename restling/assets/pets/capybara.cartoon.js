/* Restling — style module: Yuzu / Юдзу (id: capybara), стиль CARTOON.
   Контракт: assets/pets/CONTRACT.md v2. Стикерная энергия: жирный тональный
   контур 4px, насыщенная палитра кита, крупные глаза с белками, экспрессивная
   мимика. Корневой класс pet-svg pet-capybara pet-capybara-cartoon is-<mood>;
   все внутренние классы/keyframes/id с префиксом capybara-cartoon-. */
(function () {
  "use strict";

  // Палитра кита (раздел 3, pet2), насыщеннее для cartoon; контур на ~35% темнее
  var FUR = "#D89B52",      // шерсть (сочнее #C89B6C)
      OUT = "#8A5B26",      // тональный контур шерсти (не чёрный)
      FURD = "#B97A3A",     // морда/уши темнее
      FURL = "#F0C486",     // светлая грудка
      DARK = "#6E4A22",     // ноздри, рот
      YUZU = "#FFA31A",     // юдзу ярче
      YUZUD = "#C77C00",    // контур/тень юдзу
      YUZUL = "#FFDC8F",
      LEAF = "#3FB56E",
      LEAFD = "#2E8A52",
      WATER = "#9FDAD3",    // вода онсэна насыщеннее
      WATERD = "#63BAAF",
      WATERL = "#D9F3EF",
      STEAM = "#FDFBF7",
      CHEEK = "#FF9678",
      INK = "#3E3A47",
      BLANKET = "#DAD1FA",
      BLANKET2 = "#A08FDC",
      STONE = "#D8CCBA",
      STONEL = "#ECE3D3",
      STONEO = "#A3937C";

  var AURA = { radiant: "#FFF3D9", steady: "#E8F3EA", tired: "#EDF0F8", drained: "#F0ECF7" };

  // Амплитуды крупнее, чем в soft (стикерная энергия), темпы mood — те же.
  var KEYFRAMES =
    "@keyframes capybara-cartoon-breathe{0%,100%{transform:scale(1)}50%{transform:scale(1.045,1.08)}}" +
    "@keyframes capybara-cartoon-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}" +
    "@keyframes capybara-cartoon-blink{0%,90%,100%{transform:scaleY(0)}93%,96%{transform:scaleY(1)}}" +
    "@keyframes capybara-cartoon-ripple{0%{transform:scale(.6);opacity:.8}100%{transform:scale(1.2);opacity:0}}" +
    "@keyframes capybara-cartoon-steam{0%{transform:translateY(9px);opacity:0}35%{opacity:.65}100%{transform:translateY(-32px);opacity:0}}" +
    "@keyframes capybara-cartoon-sway{0%,100%{transform:rotate(-7deg)}50%{transform:rotate(7deg)}}" +
    "@keyframes capybara-cartoon-twinkle{0%,100%{opacity:0;transform:scale(.3) rotate(0deg)}50%{opacity:1;transform:scale(1.15) rotate(24deg)}}" +
    "@keyframes capybara-cartoon-glow{0%,100%{opacity:.35}50%{opacity:.8}}" +
    "@keyframes capybara-cartoon-earwig{0%,82%,100%{transform:rotate(0deg)}86%{transform:rotate(-16deg)}92%{transform:rotate(10deg)}}" +
    "@keyframes capybara-cartoon-peek{0%,86%,100%{transform:scaleY(.22)}91%,94%{transform:scaleY(.55)}}" +
    "@keyframes capybara-cartoon-z{0%{transform:translate(0,0);opacity:0}20%{opacity:.9}100%{transform:translate(11px,-27px);opacity:0}}";

  // --- Глаза: крупные, с белком и жирным контуром -------------------------
  // kind: big (radiant) | calm (steady) | heavy (tired) | slit (drained)
  function eye(kind, x) {
    if (kind === "slit") {
      return '<g transform="translate(' + x + ',-9)">' +
        '<ellipse class="capybara-cartoon-sliteye" rx="6" ry="4.8" fill="' + INK + '"/></g>';
    }
    var r = kind === "big" ? 9.5 : 8.2,
        pr = kind === "big" ? 4.8 : 4.1,
        py = kind === "heavy" ? 1.6 : 0,
        lid = "";
    if (kind === "calm") { // расслабленное нижнее веко — дзен-довольство
      lid = '<rect x="-9" y="3.6" width="18" height="8" rx="3" fill="' + FUR + '"/>' +
        '<path d="M -8.2 3.8 Q 0 6.6 8.2 3.8" fill="none" stroke="' + OUT + '" stroke-width="2.2" stroke-linecap="round" opacity=".65"/>';
    } else if (kind === "heavy") { // тяжёлое верхнее веко ~48%
      lid = '<rect x="-9.4" y="-9.4" width="18.8" height="9.4" fill="' + FUR + '"/>' +
        '<path d="M -8.8 -.2 L 8.8 -.2" stroke="' + OUT + '" stroke-width="2.6" stroke-linecap="round"/>';
    }
    return '<g transform="translate(' + x + ',-10)">' +
      '<circle r="' + r + '" fill="#FFFFFF" stroke="' + OUT + '" stroke-width="3"/>' +
      '<circle cy="' + py + '" r="' + pr + '" fill="' + INK + '"/>' +
      '<circle cx="1.9" cy="' + (py - 1.8) + '" r="2.2" fill="#FFFFFF"/>' +
      '<circle cx="-2" cy="' + (py + 2) + '" r="1" fill="#FFFFFF" opacity=".7"/>' +
      lid +
      '<rect class="capybara-cartoon-lid" x="' + (-r - 1.6) + '" y="' + (-r - 1.6) + '" width="' + (2 * r + 3.2) + '" height="' + (2 * r + 3.4) + '" rx="' + (r * .55) + '" fill="' + FUR + '"/>' +
      "</g>";
  }

  // Брови — главный экспрессивный акцент cartoon
  var BROWS = {
    up:    '<path d="M -35 -27 Q -27 -33 -19 -28" fill="none" stroke="' + OUT + '" stroke-width="3.4" stroke-linecap="round"/>' +
           '<path d="M 19 -28 Q 27 -33 35 -27" fill="none" stroke="' + OUT + '" stroke-width="3.4" stroke-linecap="round"/>',
    calm:  '<path d="M -34 -24 Q -27 -27 -20 -24" fill="none" stroke="' + OUT + '" stroke-width="3" stroke-linecap="round" opacity=".85"/>' +
           '<path d="M 20 -24 Q 27 -27 34 -24" fill="none" stroke="' + OUT + '" stroke-width="3" stroke-linecap="round" opacity=".85"/>',
    droop: '<path d="M -34 -24 Q -27 -25 -21 -21" fill="none" stroke="' + OUT + '" stroke-width="3" stroke-linecap="round" opacity=".8"/>' +
           '<path d="M 21 -21 Q 27 -25 34 -24" fill="none" stroke="' + OUT + '" stroke-width="3" stroke-linecap="round" opacity=".8"/>',
    none: ""
  };

  var MOUTHS = {
    grin: '<path d="M -14 25 Q 0 45 14 25 Q 0 31 -14 25 Z" fill="' + DARK + '" stroke="' + OUT + '" stroke-width="2.4" stroke-linejoin="round"/>' +
          '<path d="M -6 31.5 Q 0 38.5 6 31.5 Q 0 35 -6 31.5 Z" fill="' + CHEEK + '"/>',
    smile: '<path d="M -12 30 Q 0 40 12 30" fill="none" stroke="' + DARK + '" stroke-width="3.2" stroke-linecap="round"/>',
    wavy: '<path d="M -10 33 Q -5 35.6 0 33.6 Q 5 31.6 10 34" fill="none" stroke="' + DARK + '" stroke-width="3" stroke-linecap="round"/>',
    rest: '<path d="M -7 33 Q 0 37 7 33" fill="none" stroke="' + DARK + '" stroke-width="2.6" stroke-linecap="round"/>'
  };

  // Юдзу на макушке — крупнее и с контуром
  function yuzuOnHead(tilt, glow) {
    return '<g transform="translate(0,-54) rotate(' + tilt + ')">' +
      (glow ? '<circle class="capybara-cartoon-yuzuglow" r="19" fill="#FFF3D9" opacity=".55"/>' : "") +
      '<g class="capybara-cartoon-yuzu">' +
        '<circle r="12.5" fill="' + YUZU + '" stroke="' + YUZUD + '" stroke-width="3.2"/>' +
        '<circle cx="-4" cy="-4" r="3.2" fill="' + YUZUL + '"/>' +
        '<circle cy="-11.8" r="2" fill="' + YUZUD + '"/>' +
        '<ellipse cx="8.5" cy="-13.5" rx="6.5" ry="3.1" fill="' + LEAF + '" stroke="' + LEAFD + '" stroke-width="2" transform="rotate(-32 8.5 -13.5)"/>' +
      "</g></g>";
  }

  // Голова-«кирпичик»: тупая квадратная морда, ушки у макушки, жирный контур.
  // o: { eyes, brow, mouth, earL, earR, yuzu }
  function headSVG(o) {
    return '<g class="capybara-cartoon-head head">' +
      '<g transform="' + o.earL + '"><g class="capybara-cartoon-ear">' +
        '<circle r="10" fill="' + FUR + '" stroke="' + OUT + '" stroke-width="3.5"/>' +
        '<circle cy="1.2" r="4.8" fill="' + FURD + '"/></g></g>' +
      '<g transform="' + o.earR + '"><g class="capybara-cartoon-ear">' +
        '<circle r="10" fill="' + FUR + '" stroke="' + OUT + '" stroke-width="3.5"/>' +
        '<circle cy="1.2" r="4.8" fill="' + FURD + '"/></g></g>' +
      '<rect x="-45" y="-42" width="90" height="84" rx="25" fill="' + FUR + '" stroke="' + OUT + '" stroke-width="4"/>' +
      '<rect x="-32" y="4" width="64" height="42" rx="16" fill="' + FURD + '" stroke="' + OUT + '" stroke-width="3" opacity=".97"/>' +
      '<ellipse cx="-12" cy="14" rx="3.1" ry="4" fill="' + DARK + '"/>' +
      '<ellipse cx="12" cy="14" rx="3.1" ry="4" fill="' + DARK + '"/>' +
      '<ellipse cx="-39" cy="9" rx="6.5" ry="4.8" fill="' + CHEEK + '" opacity=".9"/>' +
      '<ellipse cx="39" cy="9" rx="6.5" ry="4.8" fill="' + CHEEK + '" opacity=".9"/>' +
      BROWS[o.brow] +
      '<g class="capybara-cartoon-eyes eyes">' + eye(o.eyes, -27) + eye(o.eyes, 27) + "</g>" +
      '<g class="capybara-cartoon-mouth mouth">' + MOUTHS[o.mouth] + "</g>" +
      '<g class="capybara-cartoon-extras extras">' + (o.yuzu || "") + "</g>" +
      "</g>";
  }

  // --- Сцена онсэна (radiant / steady / tired) ----------------------------

  function steamPath(x, y, cls, w) {
    return '<g transform="translate(' + x + "," + y + ')">' +
      '<path class="' + cls + '" d="M0 0 q -6 -9 0 -18 q 6 -9 0 -18" fill="none" stroke="' + STEAM +
      '" stroke-width="' + w + '" stroke-linecap="round" opacity="0"/></g>';
  }

  function onsenScene(mood, c) {
    var s = "";
    s += '<ellipse class="capybara-cartoon-aura aura" cx="120" cy="146" rx="102" ry="80" fill="' + AURA[mood] + '" opacity=".6"/>';
    // чаша и камни — тоже с контуром
    s += '<ellipse cx="120" cy="184" rx="98" ry="27" fill="' + WATERD + '"/>';
    s += '<ellipse cx="25" cy="182" rx="14" ry="9.5" fill="' + STONE + '" stroke="' + STONEO + '" stroke-width="3"/>' +
         '<ellipse cx="23" cy="179" rx="9" ry="5" fill="' + STONEL + '"/>' +
         '<ellipse cx="215" cy="180" rx="12" ry="8.5" fill="' + STONE + '" stroke="' + STONEO + '" stroke-width="3"/>' +
         '<ellipse cx="214" cy="177.5" rx="7.5" ry="4.5" fill="' + STONEL + '"/>';
    // капибара; clip прячет тело ниже чаши, погружение = сдвиг off
    s += '<clipPath id="capybara-cartoon-' + mood + '-dip"><rect x="0" y="0" width="240" height="195"/></clipPath>';
    s += '<g clip-path="url(#capybara-cartoon-' + mood + '-dip)">' +
      '<g transform="translate(120,' + (98 + c.off) + ')"><g class="capybara-cartoon-bob">' +
      '<g class="capybara-cartoon-torso body">' +
        '<ellipse cy="76" rx="66" ry="46" fill="' + FUR + '" stroke="' + OUT + '" stroke-width="4"/>' +
        '<ellipse cy="62" rx="30" ry="14" fill="' + FURL + '" opacity=".55"/>' +
      "</g>" +
      headSVG(c) +
      "</g></g></g>";
    // вода поверх тела — линия воды часть силуэта
    s += '<g class="capybara-cartoon-water">' +
      '<ellipse cx="120" cy="180" rx="92" ry="24" fill="' + WATER + '" opacity=".94"/>' +
      '<ellipse cx="120" cy="176" rx="80" ry="17" fill="' + WATERL + '" opacity=".5"/>' +
      '<ellipse class="capybara-cartoon-ripple1" cx="120" cy="176" rx="62" ry="12" fill="none" stroke="' + WATERD + '" stroke-width="3"/>' +
      '<ellipse class="capybara-cartoon-ripple2" cx="120" cy="178" rx="80" ry="16" fill="none" stroke="' + WATERD + '" stroke-width="3"/>' +
      "</g>";
    var st = '<g class="capybara-cartoon-steamg">';
    if (c.steam >= 1) st += steamPath(58, 168, "capybara-cartoon-steam-1", 6);
    if (c.steam >= 2) st += steamPath(182, 166, "capybara-cartoon-steam-2", 6);
    if (c.steam >= 3) st += steamPath(150, 160, "capybara-cartoon-steam-3", 5);
    s += st + "</g>";
    if (c.sparks) { // крупные 4-лучевые звёзды-искры
      var spark = function (x, y, n, k) {
        // позиция на группе-носителе: CSS-анимация transform не должна её затирать
        return '<g transform="translate(' + x + "," + y + ") scale(" + k + ')">' +
          '<path class="capybara-cartoon-spark-' + n + '" d="M0 -7 L1.8 -1.8 L7 0 L1.8 1.8 L0 7 L-1.8 1.8 L-7 0 L-1.8 -1.8 Z" fill="' + YUZU + '" stroke="' + YUZUD + '" stroke-width="1.4" opacity="0"/></g>';
      };
      s += '<g class="capybara-cartoon-particles particles">' +
        spark(42, 68, 1, 1.05) + spark(200, 58, 2, .9) + spark(178, 118, 3, .72) + spark(50, 126, 4, .82) +
        "</g>";
    }
    return s;
  }

  // --- Сцена drained: калачиком на камне под пледом -----------------------

  function drainedScene() {
    var s = "";
    s += '<ellipse class="capybara-cartoon-aura aura" cx="120" cy="150" rx="102" ry="78" fill="' + AURA.drained + '" opacity=".6"/>';
    // источник справа с последней струйкой пара
    s += '<ellipse cx="201" cy="198" rx="35" ry="11" fill="' + WATER + '"/>' +
         '<ellipse cx="201" cy="196" rx="26" ry="7" fill="' + WATERL + '" opacity=".6"/>' +
         '<ellipse class="capybara-cartoon-ripple1" cx="201" cy="196" rx="20" ry="5.5" fill="none" stroke="' + WATERD + '" stroke-width="2.2"/>' +
         steamPath(201, 188, "capybara-cartoon-steam-1", 4.5);
    // тёплый камень
    s += '<ellipse cx="110" cy="197" rx="66" ry="17" fill="' + STONE + '" stroke="' + STONEO + '" stroke-width="3.5"/>' +
         '<ellipse cx="110" cy="193" rx="54" ry="11" fill="' + STONEL + '" opacity=".85"/>';
    // тело калачиком + плед (дышат вместе)
    s += '<g class="capybara-cartoon-bob">' +
      '<g class="capybara-cartoon-torso body">' +
        '<ellipse cx="119" cy="177" rx="46" ry="26" fill="' + FUR + '" stroke="' + OUT + '" stroke-width="4"/>' +
        '<path d="M 68 194 Q 68 148 119 146 Q 170 148 170 194 Q 157 186 146 193 Q 135 186 124 193 Q 113 186 102 193 Q 91 186 80 193 Q 74 190 68 194 Z" fill="' + BLANKET + '" stroke="' + BLANKET2 + '" stroke-width="3.2" stroke-linejoin="round" opacity=".97"/>' +
        '<path d="M 82 162 Q 119 150 156 162" fill="none" stroke="' + BLANKET2 + '" stroke-width="2.6" stroke-dasharray="2.5 7" stroke-linecap="round" opacity=".9"/>' +
      "</g>" +
      '<g transform="translate(72,150) rotate(-6) scale(.9)">' +
        headSVG({
          eyes: "slit", brow: "none", mouth: "rest",
          earL: "translate(-34,-36) rotate(-16)",
          earR: "translate(34,-36) rotate(16)",
          yuzu: ""
        }) +
      "</g></g>";
    // юдзу лежит рядом на камне
    s += '<g class="capybara-cartoon-extras extras" transform="translate(156,188) rotate(16)">' +
      '<circle r="10.5" fill="' + YUZU + '" stroke="' + YUZUD + '" stroke-width="2.8"/>' +
      '<circle cx="-3.4" cy="-3.4" r="2.6" fill="' + YUZUL + '"/>' +
      '<circle cy="-9.6" r="1.7" fill="' + YUZUD + '"/>' +
      '<ellipse cx="7" cy="-11" rx="5.5" ry="2.6" fill="' + LEAF + '" stroke="' + LEAFD + '" stroke-width="1.6" transform="rotate(-30 7 -11)"/>' +
      "</g>";
    // сонные z — чуть крупнее, стикерно
    s += '<g class="capybara-cartoon-particles particles">' +
      '<text class="capybara-cartoon-z1" x="126" y="132" font-size="17" font-weight="800" fill="#9C8BC0" opacity="0">z</text>' +
      '<text class="capybara-cartoon-z2" x="142" y="116" font-size="12" font-weight="800" fill="#9C8BC0" opacity="0">z</text>' +
      "</g>";
    return s;
  }

  // --- CSS на mood ---------------------------------------------------------

  function styleFor(mood, c) {
    var P = ".pet-capybara-cartoon.is-" + mood;
    var css = KEYFRAMES;
    css += P + " .capybara-cartoon-aura{animation:capybara-cartoon-glow " + c.aura + " ease-in-out infinite}";
    css += P + " .capybara-cartoon-bob{animation:capybara-cartoon-bob " + c.breath + " ease-in-out infinite}";
    css += P + " .capybara-cartoon-torso{animation:capybara-cartoon-breathe " + c.breath + " ease-in-out infinite;transform-box:fill-box;transform-origin:50% 100%}";
    css += P + " .capybara-cartoon-lid{transform:scaleY(0);animation:capybara-cartoon-blink " + c.blink + " linear infinite;transform-box:fill-box;transform-origin:50% 0%}";
    css += P + " .capybara-cartoon-ripple1{animation:capybara-cartoon-ripple " + c.rip + " ease-out infinite;transform-box:fill-box;transform-origin:50% 50%}";
    css += P + " .capybara-cartoon-ripple2{animation:capybara-cartoon-ripple " + c.rip + " ease-out infinite;animation-delay:" + c.ripDelay + ";transform-box:fill-box;transform-origin:50% 50%}";
    css += P + " .capybara-cartoon-steam-1{animation:capybara-cartoon-steam " + c.steamDur + " ease-in-out infinite}";
    css += P + " .capybara-cartoon-steam-2{animation:capybara-cartoon-steam " + c.steamDur + " ease-in-out infinite;animation-delay:1.4s}";
    css += P + " .capybara-cartoon-steam-3{animation:capybara-cartoon-steam " + c.steamDur + " ease-in-out infinite;animation-delay:2.7s}";
    if (mood !== "drained") {
      css += P + " .capybara-cartoon-yuzu{animation:capybara-cartoon-sway " + c.sway + " ease-in-out infinite;transform-box:fill-box;transform-origin:50% 100%}";
    }
    if (mood === "radiant") {
      css += P + " .capybara-cartoon-yuzuglow{animation:capybara-cartoon-glow 2.2s ease-in-out infinite}";
      css += P + " .capybara-cartoon-ear{animation:capybara-cartoon-earwig 5.5s ease-in-out infinite;transform-box:fill-box;transform-origin:50% 90%}";
      for (var i = 1; i <= 4; i++) {
        css += P + " .capybara-cartoon-spark-" + i + "{animation:capybara-cartoon-twinkle 2.4s ease-in-out infinite;animation-delay:" + ((i - 1) * 0.6) + "s;transform-box:fill-box;transform-origin:50% 50%}";
      }
    }
    if (mood === "drained") {
      css += P + " .capybara-cartoon-sliteye{transform:scaleY(.22);animation:capybara-cartoon-peek 9s ease-in-out infinite;transform-box:fill-box;transform-origin:50% 50%}";
      css += P + " .capybara-cartoon-z1{animation:capybara-cartoon-z 7s ease-in-out infinite}";
      css += P + " .capybara-cartoon-z2{animation:capybara-cartoon-z 7s ease-in-out infinite;animation-delay:3.5s}";
    }
    // reduced motion: позы различимы статично (погружение/брови/веки/уши/плед)
    css += "@media (prefers-reduced-motion:reduce){" + P + " *{animation:none!important}}";
    return "<style>" + css + "</style>";
  }

  // --- Конфиг mood (канал капибары: погружение + пар + юдзу) ---------------

  var CFG = {
    radiant: { // по живот, огромные глаза, открытая улыбка, брови вверх, искры
      off: -6, breath: "2.2s", blink: "4.2s", aura: "2.2s",
      rip: "2.6s", ripDelay: "1.3s", steam: 3, steamDur: "3.6s", sway: "2.6s",
      eyes: "big", brow: "up", mouth: "grin", sparks: true,
      earL: "translate(-34,-40)", earR: "translate(34,-40)",
      yuzu: null
    },
    steady: { // по плечи, дзен: нижние веки-довольство, спокойная улыбка
      off: 12, breath: "3.5s", blink: "5s", aura: "3.5s",
      rip: "3.4s", ripDelay: "1.7s", steam: 2, steamDur: "4.6s", sway: "3.5s",
      eyes: "calm", brow: "calm", mouth: "smile",
      earL: "translate(-34,-40)", earR: "translate(34,-40)"
    },
    tired: { // по подбородок, тяжёлые веки ~48%, брови-домиком, юдзу набок
      off: 28, breath: "5s", blink: "6s", aura: "5s",
      rip: "4.4s", ripDelay: "2.2s", steam: 1, steamDur: "6s", sway: "5s",
      eyes: "heavy", brow: "droop", mouth: "wavy",
      earL: "translate(-37,-34) rotate(-30)", earR: "translate(37,-34) rotate(30)"
    },
    drained: { // на камне под пледом, глаза-щёлочки с редким peek, «z»
      breath: "7s", blink: "9s", aura: "7s",
      rip: "6s", ripDelay: "3s", steamDur: "8s"
    }
  };
  CFG.radiant.yuzu = yuzuOnHead(0, true);
  CFG.steady.yuzu = yuzuOnHead(0, false);
  CFG.tired.yuzu = yuzuOnHead(24, false);

  // --- Регистрация ---------------------------------------------------------

  window.registerPetStyle({
    petId: "capybara",
    style: "cartoon",
    render: function (mood) {
      var c = CFG[mood] || CFG.steady;
      var m = CFG[mood] ? mood : "steady";
      var body = m === "drained" ? drainedScene() : onsenScene(m, c);
      return '<svg class="pet-svg pet-capybara pet-capybara-cartoon is-' + m + '" viewBox="0 0 240 240" ' +
        'xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Yuzu the capybara (cartoon), ' + m + '">' +
        styleFor(m, c) + body + "</svg>";
    }
  });
})();
