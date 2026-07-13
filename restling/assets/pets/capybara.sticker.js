/* Restling — pet style module: Yuzu / Юдзу, капибара (id: capybara), стиль STICKER.
   Kawaii die-cut sticker: пухлый залитый силуэт-«батон», сидячая поза, короткие
   лапки; ОДИН толстый тёмный контур (#2c2622 ~5px, round join/cap); белая die-cut
   обводка ~7px позади персонажа (край стикера); большие блестящие глаза с бликами
   (у капибары — сонные, но с шайном), румяные персиково-розовые щёки, нос + улыбка,
   тень-эллипс под телом. viewBox 0 0 240 240, БЕЗ width/height.
   Все классы/keyframes — с префиксом capybara-sticker-.
   Корневой класс: pet-svg pet-capybara pet-capybara-sticker is-<mood>.
   Контракт: assets/pets/CONTRACT.md v2 (стиль sticker — общий для пака из 6). */
(function () {
  "use strict";

  // Палитра: капибара Yuzu — тёплая коричневая шерсть, тупая тёмная морда.
  var COL = {
    body:  "#a9855f", // шерсть-«батон»
    snout: "#8a6a45", // тупой патч-морда (темнее тела)
    ear:   "#8a6a45", // тёмный намёк уха
    line:  "#2c2622", // единственный тёмный контур (не чёрный)
    white: "#ffffff", // die-cut обводка + блики
    eye:   "#2c2622", // глаза
    cheek: "#f2a08e", // румяные персиково-розовые щёки
    nose:  "#2c2622", // нос
    spark: "#f5a623", // искры radiant (state radiant)
    zzz:   "#8f86b8"  // сонные «z» drained
  };
  var AURA = { radiant: "#FFF3D9", steady: "#E8F3EA", tired: "#EDF0F8", drained: "#F0ECF7" };

  // --- Силуэт: уши + тело-«батон» + короткие лапки. fill/stroke параметризованы,
  // чтобы die-cut (белый, толстая обводка) и сам зверь совпадали контур-в-контур.
  function silhouette(fill, stroke, sw) {
    return '<g fill="' + fill + '" stroke="' + stroke + '" stroke-width="' + sw +
      '" stroke-linejoin="round" stroke-linecap="round">' +
      // крохотные округлые ушки сверху
      '<circle cx="88" cy="90" r="15"/><circle cx="152" cy="90" r="15"/>' +
      // короткие лапки, чуть выступают снизу
      '<rect x="82" y="180" width="30" height="24" rx="12"/>' +
      '<rect x="128" y="180" width="30" height="24" rx="12"/>' +
      // коричневое тело-«батон» — скруглённо-прямоугольное
      '<rect x="56" y="92" width="128" height="100" rx="46"/>' +
      "</g>";
  }

  // --- Морда: тупой тёмный патч + нос + улыбка (форма улыбки — по mood) ------
  function snout(mouth) {
    return '<g class="capybara-sticker-snout">' +
      '<rect x="96" y="140" width="48" height="40" rx="19" fill="' + COL.snout +
        '" stroke="' + COL.line + '" stroke-width="5" stroke-linejoin="round"/>' +
      '<ellipse cx="120" cy="151" rx="8.5" ry="5.5" fill="' + COL.nose + '"/>' +
      '<path d="' + mouth + '" fill="none" stroke="' + COL.line +
        '" stroke-width="4" stroke-linecap="round"/>' +
      "</g>";
  }

  // --- Румяные щёки --------------------------------------------------------
  function cheeks() {
    return '<g class="capybara-sticker-cheeks" fill="' + COL.cheek + '" opacity="0.85">' +
      '<ellipse cx="90" cy="152" rx="11" ry="7.5"/>' +
      '<ellipse cx="150" cy="152" rx="11" ry="7.5"/>' +
      "</g>";
  }

  // --- Глаза по mood: сонные, но с блеском ---------------------------------
  function eyes(mood) {
    var g = '<g class="capybara-sticker-eyes">';
    if (mood === "radiant") {
      // самые открытые (для капибары — всё ещё чуть прищур), два блика
      g += '<ellipse cx="102" cy="128" rx="7.5" ry="8.5" fill="' + COL.eye + '"/>' +
           '<ellipse cx="138" cy="128" rx="7.5" ry="8.5" fill="' + COL.eye + '"/>' +
           '<g fill="' + COL.white + '">' +
             '<circle cx="99.5" cy="124.5" r="2.6"/><circle cx="105" cy="130" r="1.4"/>' +
             '<circle cx="135.5" cy="124.5" r="2.6"/><circle cx="141" cy="130" r="1.4"/>' +
           "</g>";
    } else if (mood === "steady") {
      // спокойный дзен — чуть ниже веки, один мягкий блик
      g += '<ellipse cx="102" cy="129" rx="7" ry="6.5" fill="' + COL.eye + '"/>' +
           '<ellipse cx="138" cy="129" rx="7" ry="6.5" fill="' + COL.eye + '"/>' +
           '<g fill="' + COL.white + '">' +
             '<circle cx="99.8" cy="126.5" r="2.3"/><circle cx="135.8" cy="126.5" r="2.3"/>' +
           "</g>";
    } else if (mood === "tired") {
      // почти закрыты — тяжёлые опущенные дуги + крохотный блик
      g += '<g fill="none" stroke="' + COL.line + '" stroke-width="5" stroke-linecap="round">' +
             '<path d="M95 130 Q102 135 109 130"/><path d="M131 130 Q138 135 145 130"/>' +
           "</g>" +
           '<g fill="' + COL.white + '" opacity="0.9">' +
             '<circle cx="101" cy="130.5" r="1.3"/><circle cx="137" cy="130.5" r="1.3"/>' +
           "</g>";
    } else {
      // drained — закрыты, мягкие расслабленные дуги вниз
      g += '<g fill="none" stroke="' + COL.line + '" stroke-width="5" stroke-linecap="round">' +
             '<path d="M95 131 Q102 137 109 131"/><path d="M131 131 Q138 137 145 131"/>' +
           "</g>";
    }
    return g + "</g>";
  }

  // Веки для моргания (только radiant/steady — где глаза открыты)
  function lids() {
    return '<g class="capybara-sticker-lids" fill="' + COL.body + '" opacity="0">' +
      '<ellipse cx="102" cy="128" rx="9" ry="10"/>' +
      '<ellipse cx="138" cy="128" rx="9" ry="10"/>' +
      "</g>";
  }

  // --- Частицы: искры (radiant) ---------------------------------------------
  function sparkStar(cx, cy, r) {
    return '<path class="capybara-sticker-spark" opacity="0.9" fill="' + COL.spark +
      '" d="M' + cx + ' ' + (cy - r) + 'Q' + cx + ' ' + cy + ' ' + (cx + r) + ' ' + cy +
      'Q' + cx + ' ' + cy + ' ' + cx + ' ' + (cy + r) +
      'Q' + cx + ' ' + cy + ' ' + (cx - r) + ' ' + cy +
      'Q' + cx + ' ' + cy + ' ' + cx + ' ' + (cy - r) + 'Z"/>';
  }
  function sparks() {
    return '<g class="capybara-sticker-particles">' +
      sparkStar(58, 74, 7) + sparkStar(184, 88, 8) + sparkStar(72, 44, 5) +
      sparkStar(176, 52, 5) +
      "</g>";
  }

  // --- Частицы: сонные «z» (drained) ---------------------------------------
  function zChar(x, y, s) {
    return '<path class="capybara-sticker-z" opacity="0.9" fill="none" stroke="' + COL.zzz +
      '" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" d="M' +
      x + ' ' + y + 'h' + s + 'l-' + s + ' ' + s + 'h' + s + '"/>';
  }
  function zzz() {
    return '<g class="capybara-sticker-particles">' +
      zChar(166, 78, 9) + zChar(182, 62, 11) + zChar(200, 44, 13) +
      "</g>";
  }

  // --- Тень-эллипс (статична) ----------------------------------------------
  function shadow() {
    return '<ellipse class="capybara-sticker-shadow" cx="120" cy="210" rx="64" ry="12" fill="' +
      COL.line + '" opacity="0.16"/>';
  }

  // --- Аура состояния (статична, мягкий вош позади) -------------------------
  function auraGlow(mood) {
    return '<circle class="capybara-sticker-aura aura" cx="120" cy="126" r="96" fill="' +
      AURA[mood] + '" opacity="0.55"/>';
  }

  // --- Сборка одной сцены ---------------------------------------------------
  // pose — статичный transform для «оседания» (die-cut движется вместе с позой,
  // но статичен относительно дыхания). Дыхание живёт на внутренней .pet-группе.
  var POSE = {
    radiant: "translate(0,0)",
    steady:  "translate(0,4)",
    tired:   "translate(0,11)",
    drained: "translate(0,20)"
  };
  var MOUTH = {
    radiant: "M108 163 Q120 174 132 163",
    steady:  "M111 162 Q120 169 129 162",
    tired:   "M114 163 Q120 167 126 163",
    drained: "M115 163 Q120 166 125 163"
  };

  function scene(mood) {
    var face = eyes(mood) + snout(MOUTH[mood]) + cheeks();
    if (mood === "radiant" || mood === "steady") face += lids();

    var pet =
      '<g class="capybara-sticker-pet">' +
        silhouette(COL.body, COL.line, 5) +
        face +
      "</g>";

    var particles = mood === "radiant" ? sparks() : (mood === "drained" ? zzz() : "");

    return auraGlow(mood) + shadow() +
      '<g transform="' + POSE[mood] + '">' +
        // die-cut белая обводка ~7px позади персонажа (толстый белый штрих)
        '<g class="capybara-sticker-diecut">' +
          silhouette(COL.white, COL.white, 19) +
        "</g>" +
        pet +
      "</g>" +
      particles;
  }

  // --- CSS: дыхание, моргание, искры/z; die-cut и тень статичны -------------
  var KEY =
    "@keyframes capybara-sticker-breathe{0%,100%{transform:scale(1)}50%{transform:scale(1.03)}}" +
    "@keyframes capybara-sticker-blink{0%,90%,100%{opacity:0}94%{opacity:1}}" +
    "@keyframes capybara-sticker-twinkle{0%,100%{opacity:.3;transform:scale(.8)}50%{opacity:1;transform:scale(1.15)}}" +
    "@keyframes capybara-sticker-zfloat{0%{opacity:0;transform:translateY(5px)}25%{opacity:.95}100%{opacity:0;transform:translateY(-12px)}}";

  var BREATH = { radiant: "2.2s", steady: "3.5s", tired: "5s", drained: "7s" };

  function css(mood) {
    var P = ".pet-capybara-sticker.is-" + mood;
    var s = KEY;
    // дыхание — только внутренняя .pet-группа, от нижней кромки (лапки на месте)
    s += P + " .capybara-sticker-pet{transform-box:fill-box;transform-origin:50% 100%;" +
      "animation:capybara-sticker-breathe " + BREATH[mood] + " ease-in-out infinite}";
    // моргание — только там, где есть открытые веки
    if (mood === "radiant" || mood === "steady") {
      s += P + " .capybara-sticker-lids{animation:capybara-sticker-blink " +
        (mood === "radiant" ? "4.4s" : "5.2s") + " ease-in-out infinite}";
    }
    if (mood === "radiant") {
      s += P + " .capybara-sticker-spark{transform-box:fill-box;transform-origin:center;" +
        "animation:capybara-sticker-twinkle 2.4s ease-in-out infinite}";
      s += P + " .capybara-sticker-spark:nth-child(2){animation-delay:.6s}";
      s += P + " .capybara-sticker-spark:nth-child(3){animation-delay:1.1s}";
      s += P + " .capybara-sticker-spark:nth-child(4){animation-delay:1.6s}";
    }
    if (mood === "drained") {
      s += P + " .capybara-sticker-z{transform-box:fill-box;transform-origin:center;" +
        "animation:capybara-sticker-zfloat 3.2s ease-in-out infinite}";
      s += P + " .capybara-sticker-z:nth-child(2){animation-delay:1.05s}";
      s += P + " .capybara-sticker-z:nth-child(3){animation-delay:2.1s}";
    }
    // статика при reduced-motion: позы различимы позой/веками/дугами глаз
    s += "@media (prefers-reduced-motion:reduce){" + P + " *{animation:none!important}}";
    return "<style>" + s + "</style>";
  }

  // --- Готовые сцены (собираются один раз; render — чистая выдача строки) ---
  var SCENES = {
    radiant: scene("radiant"),
    steady:  scene("steady"),
    tired:   scene("tired"),
    drained: scene("drained")
  };

  window.registerPetStyle({
    petId: "capybara",
    style: "sticker",
    render: function (mood) {
      var m = SCENES[mood] ? mood : "steady";
      return '<svg class="pet-svg pet-capybara pet-capybara-sticker is-' + m +
        '" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg"' +
        ' role="img" aria-label="Yuzu the capybara, sticker, ' + m + '">' +
        css(m) + SCENES[m] + "</svg>";
    }
  });
})();
