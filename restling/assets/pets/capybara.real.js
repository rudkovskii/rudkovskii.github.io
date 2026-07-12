/* Restling — style module: Yuzu / Юдзу, капибара (id: capybara), стиль "real".
   Контракт: assets/pets/CONTRACT.md v2. Тёплая иллюстрация из детской энциклопедии,
   НЕ фотореализм: натуральные пропорции и видовой окрас, объём двумя градиентами,
   штрихи шерсти, маленькие реалистичные глаза, спокойные позы.
   Scoping: корневой класс pet-svg pet-capybara pet-capybara-real is-<mood>,
   все селекторы от .pet-capybara-real, keyframes/id с префиксом capybara-real-. */
(function () {
  "use strict";

  // Природный окрас капибары (агути, желтовато-бурый) + сценовые цвета из кита
  var FUR = "#96714A",       // основная шерсть
      FURD = "#79583A",      // тень, морда, лапы
      FURL = "#B39062",      // светлый верх / грудка
      FURX = "#5D452C",      // глубокий тон: штрихи шерсти, ноздри (не чёрный)
      LID = "#A28154",       // веко ~ тон головы на уровне глаз
      EYE = "#46351F",       // радужка/зрачок тёмно-карие
      YUZU = "#F5A623",      // плод юдзу (кит)
      YUZUD = "#C98410",
      YUZUL = "#FFD98F",
      LEAF = "#5FAF7E",
      LEAFD = "#3F8A5F",
      WATER = "#CFE3E0",     // вода онсэна (кит)
      WATERD = "#B7D2CE",
      WATERL = "#E4F2EF",
      STEAM = "#FDFBF7",
      BLANKET = "#E9E6FA",
      BLANKET2 = "#CFC7EC",
      STONE = "#CFC4B2",
      STONEL = "#E0D7C7",
      STONED = "#B4A78F";

  var AURA = { radiant: "#FFF3D9", steady: "#E8F3EA", tired: "#EDF0F8", drained: "#F0ECF7" };

  // Keyframes: амплитуды сдержаннее, чем в soft (стиль real), темпы mood те же
  var KEYFRAMES =
    "@keyframes capybara-real-breathe{0%,100%{transform:scale(1)}50%{transform:scale(1.016,1.034)}}" +
    "@keyframes capybara-real-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-1.6px)}}" +
    "@keyframes capybara-real-blink{0%,92%,100%{transform:scaleY(0)}95%,97%{transform:scaleY(1)}}" +
    "@keyframes capybara-real-ripple{0%{transform:scale(.66);opacity:.6}100%{transform:scale(1.14);opacity:0}}" +
    "@keyframes capybara-real-steam{0%{transform:translateY(7px);opacity:0}35%{opacity:.42}100%{transform:translateY(-26px);opacity:0}}" +
    "@keyframes capybara-real-sway{0%,100%{transform:rotate(-2.5deg)}50%{transform:rotate(2.5deg)}}" +
    "@keyframes capybara-real-mote{0%,100%{opacity:0;transform:translateY(0)}50%{opacity:.85;transform:translateY(-4px)}}" +
    "@keyframes capybara-real-glow{0%,100%{opacity:.28}50%{opacity:.55}}" +
    "@keyframes capybara-real-earflick{0%,88%,100%{transform:rotate(0deg)}91%{transform:rotate(-7deg)}95%{transform:rotate(4deg)}}" +
    "@keyframes capybara-real-slitpeek{0%,88%,100%{transform:scaleY(.28)}92%,95%{transform:scaleY(.6)}}" +
    "@keyframes capybara-real-nosewig{0%,86%,100%{transform:scale(1)}90%{transform:scale(1.14,.9)}94%{transform:scale(.94,1.06)}}" +
    "@keyframes capybara-real-zfloat{0%{transform:translate(0,0);opacity:0}22%{opacity:.7}100%{transform:translate(7px,-22px);opacity:0}}";

  // Два разрешённых градиента (объём шерсти) — id с префиксом capybara-real-<mood>-
  function defs(m) {
    return "<defs>" +
      '<radialGradient id="capybara-real-' + m + '-fur" cx=".42" cy=".26" r="1">' +
        '<stop offset="0" stop-color="' + FURL + '"/>' +
        '<stop offset=".55" stop-color="' + FUR + '"/>' +
        '<stop offset="1" stop-color="' + FURD + '"/></radialGradient>' +
      '<linearGradient id="capybara-real-' + m + '-head" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0" stop-color="' + FURL + '"/>' +
        '<stop offset=".72" stop-color="' + FUR + '"/>' +
        '<stop offset="1" stop-color="' + FURD + '"/></linearGradient>' +
      "</defs>";
  }

  // Штрихи шерсти: один <path> на группу штрихов (бюджет), тональные, без чёрного
  function hatch(d, w, o) {
    return '<path d="' + d + '" fill="none" stroke="' + FURX + '" stroke-width="' + (w || 1.5) +
      '" stroke-linecap="round" opacity="' + (o || ".28") + '"/>';
  }

  // Глаз: маленький, реалистичный, посажен широко и высоко. kind: open|zen|tired|slit
  function eye(kind, x) {
    if (kind === "slit") {
      return '<g transform="translate(' + x + ',-11)">' +
        '<ellipse class="capybara-real-sliteye" rx="3.6" ry="2.6" fill="' + EYE + '"/>' +
        '<path d="M -4.6 -2.6 Q 0 -4.8 4.6 -2.6" fill="none" stroke="' + FURX + '" stroke-width="1.1" opacity=".5"/></g>';
    }
    var lid = "";
    if (kind === "zen") {
      lid = '<rect x="-4.4" y="-4.2" width="8.8" height="3.4" rx="1.6" fill="' + LID + '"/>';
    } else if (kind === "tired") {
      lid = '<rect x="-4.4" y="-4.2" width="8.8" height="4.6" rx="1.6" fill="' + LID + '"/>';
    }
    return '<g transform="translate(' + x + ',-11)">' +
      '<ellipse rx="4" ry="4.3" fill="' + EYE + '"/>' +
      '<circle cx="1.2" cy="-1.4" r="1" fill="#FFFFFF" opacity=".92"/>' +
      lid +
      '<rect class="capybara-real-lidblink" x="-4.4" y="-4.6" width="8.8" height="9.2" rx="2" fill="' + LID + '"/>' +
      // тонкая тональная надбровная линия — «энциклопедическая» деталь
      '<path d="M -4.8 -5 Q 0 -6.8 4.8 -5" fill="none" stroke="' + FURX + '" stroke-width="1.1" opacity=".45"/>' +
      "</g>";
  }

  // Рты: у настоящей капибары мимика едва заметна — короткая линия под мордой
  var MOUTHS = {
    smile: '<path d="M -8 33 Q 0 37.5 8 33" fill="none" stroke="' + FURX + '" stroke-width="1.7" stroke-linecap="round" opacity=".75"/>',
    soft:  '<path d="M -6.5 33.5 Q 0 36.5 6.5 33.5" fill="none" stroke="' + FURX + '" stroke-width="1.6" stroke-linecap="round" opacity=".7"/>',
    flat:  '<path d="M -6 34.5 Q 0 35.8 6 34.5" fill="none" stroke="' + FURX + '" stroke-width="1.6" stroke-linecap="round" opacity=".65"/>',
    rest:  '<path d="M -5 34 Q 0 36 5 34" fill="none" stroke="' + FURX + '" stroke-width="1.4" stroke-linecap="round" opacity=".65"/>'
  };

  // Юдзу на макушке: чуть приглушённей и «плотнее», с тенью под плодом
  function yuzuOnHead(tilt, glow) {
    return '<g transform="translate(0,-46) rotate(' + tilt + ')">' +
      (glow ? '<circle class="capybara-real-yuzuglow" r="14.5" fill="#FFF3D9" opacity=".4"/>' : "") +
      '<g class="capybara-real-yuzu">' +
        '<ellipse cy="8.6" rx="8" ry="2.2" fill="' + FURX + '" opacity=".18"/>' +
        '<circle r="9.5" fill="' + YUZU + '"/>' +
        '<path d="M -5.5 6 Q 0 9 5.5 6" fill="none" stroke="' + YUZUD + '" stroke-width="1.2" opacity=".6"/>' +
        '<circle cx="-3" cy="-3" r="2.4" fill="' + YUZUL + '" opacity=".85"/>' +
        '<circle cx="4.2" cy="2.8" r=".8" fill="' + YUZUD + '" opacity=".5"/>' +
        '<circle cx="-.6" cy="5" r=".7" fill="' + YUZUD + '" opacity=".5"/>' +
        '<circle cy="-8.8" r="1.4" fill="' + YUZUD + '"/>' +
        '<path d="M 1.5 -9.5 Q 8 -16 14 -13.5 Q 9 -8.5 1.5 -9.5 Z" fill="' + LEAF + '"/>' +
        '<path d="M 2.5 -10 Q 8 -13.6 13 -13.2" fill="none" stroke="' + LEAFD + '" stroke-width="1" opacity=".7"/>' +
      "</g></g>";
  }

  // Голова: тот же «кирпичик» с тупой квадратной мордой, но натуральные пропорции —
  // компактнее относительно тела, глаза маленькие, широко и высоко, усы-вибриссы.
  // Центр (0,0), верх ~-38, низ ~+38.
  function headSVG(m, o) {
    return '<g class="capybara-real-headwrap head">' +
      // маленькие круглые ушки высоко и близко к макушке
      '<g transform="' + o.earL + '"><g class="capybara-real-ear">' +
        '<circle r="6.3" fill="' + FURD + '"/><circle cx=".4" cy=".8" r="3" fill="' + FURX + '" opacity=".75"/></g></g>' +
      '<g transform="' + o.earR + '"><g class="capybara-real-ear">' +
        '<circle r="6.3" fill="' + FURD + '"/><circle cx="-.4" cy=".8" r="3" fill="' + FURX + '" opacity=".75"/></g></g>' +
      // прямоугольная голова «кирпичиком» (градиент объёма)
      '<rect x="-33" y="-38" width="66" height="74" rx="19" fill="url(#capybara-real-' + m + '-head)"/>' +
      // тупая квадратная морда, темнее и глубже
      '<rect x="-25" y="2" width="50" height="36" rx="12" fill="' + FURD + '"/>' +
      '<ellipse cx="0" cy="8" rx="19" ry="6" fill="' + FUR + '" opacity=".35"/>' +
      // две точки-ноздри на верхней плоскости морды (запятые, чуть врозь)
      '<g class="capybara-real-nose">' +
        '<ellipse cx="-9" cy="11" rx="2" ry="2.7" fill="' + FURX + '" transform="rotate(-14 -9 11)"/>' +
        '<ellipse cx="9" cy="11" rx="2" ry="2.7" fill="' + FURX + '" transform="rotate(14 9 11)"/>' +
      "</g>" +
      // редкие жёсткие вибриссы — видовая деталь real
      '<path d="M -24 17 q -8 0 -13 3 M -24 23 q -8 -1 -13 1 M 24 17 q 8 0 13 3 M 24 23 q 8 -1 13 1" fill="none" stroke="' + FURX + '" stroke-width=".9" stroke-linecap="round" opacity=".4"/>' +
      // штрихи шерсти на лбу и скулах
      hatch("M -18 -32 q 2 4 0 9 M -6 -35 q 2 4 0 9 M 7 -34 q 2 4 0 9 M 18 -30 q 2 4 0 8 M -28 -8 q 2 4 0 8 M 28 -8 q -2 4 0 8", 1.4, ".3") +
      '<g class="capybara-real-eyes eyes">' + eye(o.eyes, -22) + eye(o.eyes, 22) + "</g>" +
      '<g class="capybara-real-mouth mouth">' + MOUTHS[o.mouth] + "</g>" +
      '<g class="capybara-real-extras extras">' + (o.yuzu || "") + "</g>" +
      "</g>";
  }

  function steamPath(x, y, cls, w) {
    return '<g transform="translate(' + x + "," + y + ')">' +
      '<path class="' + cls + '" d="M0 0 q -4 -8 0 -15 q 4 -8 0 -15" fill="none" stroke="' + STEAM +
      '" stroke-width="' + w + '" stroke-linecap="round" opacity="0"/></g>';
  }

  function stone(x, y, rx, ry) {
    return '<ellipse cx="' + x + '" cy="' + y + '" rx="' + rx + '" ry="' + ry + '" fill="' + STONE + '"/>' +
      '<ellipse cx="' + (x - 1.5) + '" cy="' + (y - ry * .35) + '" rx="' + (rx * .68) + '" ry="' + (ry * .55) + '" fill="' + STONEL + '"/>' +
      '<path d="M ' + (x - rx * .5) + " " + (y + ry * .45) + " Q " + x + " " + (y + ry * .75) + " " + (x + rx * .5) + " " + (y + ry * .45) +
      '" fill="none" stroke="' + STONED + '" stroke-width="1.2" opacity=".6"/>';
  }

  // --- Сцена онсэна (radiant / steady / tired) ---------------------------

  function onsenScene(m, c) {
    var s = defs(m);
    s += '<ellipse class="capybara-real-aura aura" cx="120" cy="148" rx="100" ry="76" fill="' + AURA[m] + '" opacity=".5"/>';
    // чаша источника и природные камни по краям
    s += '<ellipse cx="120" cy="185" rx="98" ry="26" fill="' + WATERD + '"/>';
    s += stone(25, 181, 14, 9.5) + stone(215, 179, 12, 8.5);
    // капибара: погружение = вертикальный сдвиг; clip прячет тело под чашей
    s += '<clipPath id="capybara-real-' + m + '-dip"><rect x="0" y="0" width="240" height="196"/></clipPath>';
    s += '<g clip-path="url(#capybara-real-' + m + '-dip)">' +
      '<g transform="translate(120,' + (102 + c.off) + ')"><g class="capybara-real-bob">' +
      '<g class="capybara-real-torso body">' +
        // массивное бочкообразное тело без шеи, натуральные пропорции (тело >> головы)
        '<ellipse cy="74" rx="66" ry="46" fill="url(#capybara-real-' + m + '-fur)"/>' +
        '<ellipse cy="94" rx="52" ry="22" fill="' + FURX + '" opacity=".14"/>' +
        '<ellipse cx="-2" cy="52" rx="26" ry="11" fill="' + FURL + '" opacity=".4"/>' +
        // штрихи шерсти по бокам и холке
        hatch("M -52 56 q 4 7 1 15 M -41 47 q 4 7 1 15 M 38 49 q -3 7 -1 15 M 49 58 q -3 7 -1 14 M -14 39 q 3 6 1 12 M 15 40 q -2 6 -1 12 M -28 42 q 3 6 1 12 M 28 43 q -3 6 -1 12", 1.6, ".26") +
      "</g>" +
      headSVG(m, c) +
      "</g></g></g>";
    // вода поверх тела — линия воды пересекает силуэт
    s += '<g class="capybara-real-waterg">' +
      '<ellipse cx="120" cy="181" rx="92" ry="23" fill="' + WATER + '" opacity=".9"/>' +
      '<ellipse cx="120" cy="177" rx="78" ry="16" fill="' + WATERL + '" opacity=".38"/>' +
      '<ellipse class="capybara-real-ripple1" cx="120" cy="177" rx="62" ry="11" fill="none" stroke="' + WATERD + '" stroke-width="1.8"/>' +
      '<ellipse class="capybara-real-ripple2" cx="120" cy="179" rx="79" ry="15" fill="none" stroke="' + WATERD + '" stroke-width="1.8"/>' +
      "</g>";
    var st = '<g class="capybara-real-steamg">';
    if (c.steam >= 1) st += steamPath(60, 169, "capybara-real-steam-1", 4.5);
    if (c.steam >= 2) st += steamPath(180, 167, "capybara-real-steam-2", 4.5);
    if (c.steam >= 3) st += steamPath(150, 161, "capybara-real-steam-3", 4);
    s += st + "</g>";
    // radiant: тёплые светлячки-мотыльки вместо мультяшных искр — сдержанно
    if (c.motes) {
      var mote = function (x, y, n, r) {
        return '<circle class="capybara-real-mote-' + n + '" cx="' + x + '" cy="' + y + '" r="' + r + '" fill="' + YUZU + '" opacity="0"/>';
      };
      s += '<g class="capybara-real-particles particles">' +
        mote(48, 78, 1, 1.9) + mote(196, 66, 2, 1.5) + mote(172, 118, 3, 1.3) + mote(56, 126, 4, 1.6) +
        "</g>";
    }
    return s;
  }

  // --- Сцена drained: калачиком на тёплом камне у воды, под пледом --------

  function drainedScene() {
    var m = "drained";
    var s = defs(m);
    s += '<ellipse class="capybara-real-aura aura" cx="120" cy="152" rx="100" ry="74" fill="' + AURA.drained + '" opacity=".5"/>';
    // источник справа, последняя струйка пара
    s += '<ellipse cx="200" cy="198" rx="34" ry="10.5" fill="' + WATER + '"/>' +
         '<ellipse cx="200" cy="196" rx="25" ry="6.5" fill="' + WATERL + '" opacity=".5"/>' +
         '<ellipse class="capybara-real-ripple1" cx="200" cy="196" rx="19" ry="5" fill="none" stroke="' + WATERD + '" stroke-width="1.4"/>' +
         steamPath(200, 189, "capybara-real-steam-1", 3.5);
    // тёплый плоский камень
    s += '<ellipse cx="108" cy="198" rx="66" ry="16" fill="' + STONE + '"/>' +
         '<ellipse cx="106" cy="194" rx="54" ry="10" fill="' + STONEL + '" opacity=".85"/>' +
         '<path d="M 62 202 Q 108 209 154 202" fill="none" stroke="' + STONED + '" stroke-width="1.4" opacity=".55"/>';
    // капибара калачиком: тело + плед дышат вместе
    s += '<g class="capybara-real-bob">' +
      '<g class="capybara-real-torso body">' +
        '<ellipse cx="118" cy="176" rx="46" ry="26" fill="url(#capybara-real-' + m + '-fur)"/>' +
        hatch("M 92 168 q 3 5 1 11 M 106 162 q 3 5 1 11 M 140 165 q -2 5 -1 11 M 152 172 q -2 5 -1 10", 1.4, ".24") +
        // плед с волнистым краем и стежками
        '<path d="M 70 194 Q 70 151 118 149 Q 166 151 166 194 Q 154 187 143 193 Q 132 187 121 193 Q 110 187 99 193 Q 88 187 77 193 Q 73 190 70 194 Z" fill="' + BLANKET + '" stroke="' + BLANKET2 + '" stroke-width="1.5" opacity=".96"/>' +
        '<path d="M 82 164 Q 118 153 154 164" fill="none" stroke="' + BLANKET2 + '" stroke-width="1.8" stroke-dasharray="2 6" stroke-linecap="round" opacity=".85"/>' +
      "</g>" +
      '<g transform="translate(76,154) rotate(-6) scale(.9)">' +
        headSVG(m, {
          eyes: "slit", mouth: "rest",
          earL: "translate(-25,-33) rotate(-16)",
          earR: "translate(25,-33) rotate(16)",
          yuzu: ""
        }) +
      "</g></g>";
    // юдзу лежит рядом на камне
    s += '<g class="capybara-real-extras extras" transform="translate(152,189) rotate(14)">' +
      '<ellipse cy="7.4" rx="7" ry="2" fill="' + FURX + '" opacity=".16"/>' +
      '<circle r="8.2" fill="' + YUZU + '"/>' +
      '<circle cx="-2.6" cy="-2.6" r="2" fill="' + YUZUL + '" opacity=".85"/>' +
      '<circle cx="3.4" cy="2.4" r=".7" fill="' + YUZUD + '" opacity=".5"/>' +
      '<circle cy="-7.6" r="1.3" fill="' + YUZUD + '"/>' +
      '<path d="M 1.2 -8.2 Q 6.5 -13.5 11.5 -11.5 Q 7.5 -7.5 1.2 -8.2 Z" fill="' + LEAF + '"/>' +
      "</g>";
    // сонные z
    s += '<g class="capybara-real-particles particles">' +
      '<text class="capybara-real-z1" x="126" y="136" font-size="13" font-weight="700" fill="#9C8BC0" opacity="0">z</text>' +
      '<text class="capybara-real-z2" x="139" y="123" font-size="10" font-weight="700" fill="#9C8BC0" opacity="0">z</text>' +
      "</g>";
    return s;
  }

  // --- Стили ---------------------------------------------------------------

  function styleFor(mood, c) {
    var P = ".pet-capybara-real.is-" + mood;
    var css = KEYFRAMES;
    css += P + " .capybara-real-aura{animation:capybara-real-glow " + c.aura + " ease-in-out infinite}";
    css += P + " .capybara-real-bob{animation:capybara-real-bob " + c.breath + " ease-in-out infinite}";
    css += P + " .capybara-real-torso{animation:capybara-real-breathe " + c.breath + " ease-in-out infinite;transform-box:fill-box;transform-origin:50% 100%}";
    css += P + " .capybara-real-lidblink{transform:scaleY(0);animation:capybara-real-blink " + c.blink + " linear infinite;transform-box:fill-box;transform-origin:50% 0%}";
    css += P + " .capybara-real-ripple1{animation:capybara-real-ripple " + c.rip + " ease-out infinite;transform-box:fill-box;transform-origin:50% 50%}";
    css += P + " .capybara-real-ripple2{animation:capybara-real-ripple " + c.rip + " ease-out infinite;animation-delay:" + c.ripDelay + ";transform-box:fill-box;transform-origin:50% 50%}";
    css += P + " .capybara-real-steam-1{animation:capybara-real-steam " + c.steamDur + " ease-in-out infinite}";
    css += P + " .capybara-real-steam-2{animation:capybara-real-steam " + c.steamDur + " ease-in-out infinite;animation-delay:1.5s}";
    css += P + " .capybara-real-steam-3{animation:capybara-real-steam " + c.steamDur + " ease-in-out infinite;animation-delay:2.9s}";
    css += P + " .capybara-real-nose{animation:capybara-real-nosewig " + c.blink + " ease-in-out infinite;transform-box:fill-box;transform-origin:50% 50%}";
    if (mood !== "drained") {
      css += P + " .capybara-real-yuzu{animation:capybara-real-sway " + c.sway + " ease-in-out infinite;transform-box:fill-box;transform-origin:50% 100%}";
    }
    if (mood === "radiant") {
      css += P + " .capybara-real-yuzuglow{animation:capybara-real-glow 2.2s ease-in-out infinite}";
      css += P + " .capybara-real-ear{animation:capybara-real-earflick 7s ease-in-out infinite;transform-box:fill-box;transform-origin:50% 90%}";
      for (var i = 1; i <= 4; i++) {
        css += P + " .capybara-real-mote-" + i + "{animation:capybara-real-mote 2.8s ease-in-out infinite;animation-delay:" + ((i - 1) * 0.7) + "s}";
      }
    }
    if (mood === "drained") {
      css += P + " .capybara-real-sliteye{transform:scaleY(.28);animation:capybara-real-slitpeek 10s ease-in-out infinite;transform-box:fill-box;transform-origin:50% 50%}";
      css += P + " .capybara-real-z1{animation:capybara-real-zfloat 7s ease-in-out infinite}";
      css += P + " .capybara-real-z2{animation:capybara-real-zfloat 7s ease-in-out infinite;animation-delay:3.5s}";
    }
    // reduced motion: позы различимы статично (погружение / веки / уши / юдзу / плед)
    css += "@media (prefers-reduced-motion:reduce){" + P + " *{animation:none!important}}";
    return "<style>" + css + "</style>";
  }

  // --- Конфиг mood-состояний -----------------------------------------------
  // Канал капибары: глубина погружения + пар + юдзу. Темпы по контракту.

  var CFG = {
    radiant: { // по живот, спина прямая, глаза открыты, юдзу тёпло светится, 3 струйки + светлячки
      off: -3, breath: "2.2s", blink: "4.4s", aura: "2.2s",
      rip: "2.6s", ripDelay: "1.3s", steam: 3, steamDur: "3.8s", sway: "2.6s",
      eyes: "open", mouth: "smile", motes: true,
      earL: "translate(-25,-36)", earR: "translate(25,-36)",
      yuzu: null
    },
    steady: { // по плечи, дзен-полуприкрытые глаза, 2 струйки, юдзу мерно качается
      off: 12, breath: "3.5s", blink: "5.2s", aura: "3.5s",
      rip: "3.4s", ripDelay: "1.7s", steam: 2, steamDur: "4.8s", sway: "3.5s",
      eyes: "zen", mouth: "soft",
      earL: "translate(-25,-36)", earR: "translate(25,-36)"
    },
    tired: { // по подбородок, веки ~50%, юдзу съехал набок, ушки обвисли, пар почти исчез
      off: 27, breath: "5s", blink: "6.5s", aura: "5s",
      rip: "4.4s", ripDelay: "2.2s", steam: 1, steamDur: "6s", sway: "5s",
      eyes: "tired", mouth: "flat",
      earL: "translate(-28,-31) rotate(-26)", earR: "translate(28,-31) rotate(26)"
    },
    drained: { // на камне под пледом, юдзу рядом, «z», последняя струйка пара
      breath: "7s", blink: "9s", aura: "7s",
      rip: "6s", ripDelay: "3s", steamDur: "8s"
    }
  };
  CFG.radiant.yuzu = yuzuOnHead(0, true);
  CFG.steady.yuzu = yuzuOnHead(0, false);
  CFG.tired.yuzu = yuzuOnHead(20, false);

  // --- Регистрация -----------------------------------------------------------

  window.registerPetStyle({
    petId: "capybara",
    style: "real",
    render: function (mood) {
      var c = CFG[mood] || CFG.steady;
      var m = CFG[mood] ? mood : "steady";
      var body = m === "drained" ? drainedScene() : onsenScene(m, c);
      return '<svg class="pet-svg pet-capybara pet-capybara-real is-' + m + '" viewBox="0 0 240 240" ' +
        'xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Yuzu the capybara, realistic, ' + m + '">' +
        styleFor(m, c) + body + "</svg>";
    }
  });
})();
