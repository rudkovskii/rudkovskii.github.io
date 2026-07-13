/* Restling — pet style module: Clover / Кловер, кролик (id: rabbit), стиль STICKER.
   Kawaii die-cut sticker: пухлое залитое кремово-белое тело, сидячая «булочка»,
   короткие лапки; ОДИН толстый тёмный контур (#2c2622 ~5px, round join/cap);
   белая die-cut обводка ~7px позади персонажа (край стикера — чисто-белая, чтобы
   читалась вокруг кремового тела); ВЫСОКИЕ прямые уши с розовой внутренней частью —
   главная примета и канал состояния (нарисованы жирно); крохотный треугольный нос,
   намёк на круглый хвостик-помпон; большие блестящие глаза с бликами, румяные
   персиково-розовые щёки, тень-эллипс под телом.
   Вид считывается мгновенно за счёт ушей:
     radiant — уши торчком, широкая улыбка, искры;
     steady  — уши чуть расслаблены/разведены, спокойная мимика;
     tired   — уши обвисли по бокам, полуприкрытые глаза, зевок-мягкость;
     drained — свернулся, уши опущены назад, глаза закрыты, «z z».
   viewBox 0 0 240 240, БЕЗ width/height. Все классы/keyframes — префикс rabbit-sticker-.
   Корневой класс: pet-svg pet-rabbit pet-rabbit-sticker is-<mood>.
   Контракт: assets/pets/CONTRACT.md v2 (стиль sticker — общий для пака из 6). */
(function () {
  "use strict";

  // Палитра: кремово-белый кролик Clover. Тело чуть кремовое, чтобы чисто-белая
  // die-cut обводка читалась вокруг него.
  var COL = {
    body:  "#FBF3E9", // кремово-белая шёрстка
    belly: "#FFFDF8", // светлый животик
    pink:  "#F4B8C9", // розовая внутренняя часть ушей
    line:  "#2c2622", // единственный тёмный контур (не чёрный)
    white: "#ffffff", // die-cut обводка + блики
    eye:   "#2c2622", // глаза
    cheek: "#F5A88E", // румяные персиково-розовые щёки
    nose:  "#E58AA0", // крохотный треугольный нос
    spark: "#F5A623", // искры radiant (state radiant)
    zzz:   "#9C8BC0"  // сонные «z» drained
  };
  var AURA = { radiant: "#FFF3D9", steady: "#E8F3EA", tired: "#EDF0F8", drained: "#F0ECF7" };

  // --- Геометрия ушей по mood (главный канал состояния) --------------------
  // lx/rx — центры левого/правого уха, cy — вертикаль центра, l/rrot — наклон,
  // orx/ory — внешний эллипс, irx/iry — розовая внутренняя часть.
  var EARS = {
    radiant: { lx: 100, rx: 140, cy: 54,  lrot: -9,   rrot: 9,   orx: 15, ory: 44, irx: 7,   iry: 30 },
    steady:  { lx: 98,  rx: 142, cy: 58,  lrot: -21,  rrot: 21,  orx: 15, ory: 42, irx: 7,   iry: 28 },
    tired:   { lx: 80,  rx: 160, cy: 120, lrot: -73,  rrot: 73,  orx: 14, ory: 40, irx: 6.5, iry: 26 },
    drained: { lx: 98,  rx: 150, cy: 104, lrot: -118, rrot: 118, orx: 13, ory: 38, irx: 6,   iry: 24 }
  };

  function ell(cx, cy, rx, ry, attr) {
    return '<ellipse cx="' + cx + '" cy="' + cy + '" rx="' + rx + '" ry="' + ry + '" ' + (attr || "") + "/>";
  }
  function cir(cx, cy, r, attr) {
    return '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" ' + (attr || "") + "/>";
  }
  function earOuter(cx, cy, rx, ry, rot, fill, stroke, sw) {
    return '<ellipse cx="' + cx + '" cy="' + cy + '" rx="' + rx + '" ry="' + ry +
      '" transform="rotate(' + rot + " " + cx + " " + cy + ')" fill="' + fill +
      '" stroke="' + stroke + '" stroke-width="' + sw + '" stroke-linejoin="round"/>';
  }
  function earInner(cx, cy, rx, ry, rot) {
    return '<ellipse cx="' + cx + '" cy="' + cy + '" rx="' + rx + '" ry="' + ry +
      '" transform="rotate(' + rot + " " + cx + " " + cy + ')" fill="' + COL.pink + '"/>';
  }

  // Только внешние силуэты ушей — для die-cut (белый) и как основа контура.
  function earsSilhouette(mood, fill, stroke, sw) {
    var e = EARS[mood];
    return earOuter(e.lx, e.cy, e.orx, e.ory, e.lrot, fill, stroke, sw) +
      earOuter(e.rx, e.cy, e.orx, e.ory, e.rrot, fill, stroke, sw);
  }

  // Цветные уши с розовой внутренней частью; правое ухо — в группе для лёгкого
  // подрагивания (idle). Левое статично.
  function coloredEars(mood) {
    var e = EARS[mood];
    return '<g class="rabbit-sticker-earL">' +
        earOuter(e.lx, e.cy, e.orx, e.ory, e.lrot, COL.body, COL.line, 5) +
        earInner(e.lx, e.cy, e.irx, e.iry, e.lrot) +
      "</g>" +
      '<g class="rabbit-sticker-ear rabbit-sticker-earR">' +
        earOuter(e.rx, e.cy, e.orx, e.ory, e.rrot, COL.body, COL.line, 5) +
        earInner(e.rx, e.cy, e.irx, e.iry, e.rrot) +
      "</g>";
  }

  // --- Тело-«булочка»: хвост-помпон + короткие лапки + залитый корпус.
  // fill/stroke параметризованы, чтобы die-cut и сам зверь совпадали контур-в-контур.
  function bodyBase(fill, stroke, sw) {
    return '<g fill="' + fill + '" stroke="' + stroke + '" stroke-width="' + sw +
      '" stroke-linejoin="round" stroke-linecap="round">' +
      // хвост-помпон (справа, за телом)
      cir(182, 168, 13) +
      // короткие лапки снизу
      '<rect x="80" y="182" width="30" height="23" rx="11"/>' +
      '<rect x="130" y="182" width="30" height="23" rx="11"/>' +
      // пухлый корпус-булочка
      '<rect x="54" y="98" width="132" height="102" rx="50"/>' +
      "</g>";
  }

  // --- Румяные персиково-розовые щёки --------------------------------------
  function cheeks(op) {
    return '<g class="rabbit-sticker-cheeks" fill="' + COL.cheek + '" opacity="' + op + '">' +
      ell(91, 146, 10, 7) + ell(149, 146, 10, 7) + "</g>";
  }

  // --- Крохотный треугольный нос + улыбка «Y» (форма по mood) --------------
  function noseMouth(mouth) {
    return '<g class="rabbit-sticker-mouth">' +
      '<path d="M113 144 Q120 142 127 144 L120 151 Z" fill="' + COL.nose +
        '" stroke="' + COL.line + '" stroke-width="2.5" stroke-linejoin="round"/>' +
      '<path d="' + mouth + '" fill="none" stroke="' + COL.line +
        '" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>' +
      // усики (тонкие, тональные, не чёрные-alert)
      '<g fill="none" stroke="' + COL.line + '" stroke-width="2" opacity="0.4" stroke-linecap="round">' +
        '<path d="M104 147 Q92 145 84 148"/><path d="M104 151 Q92 152 85 156"/>' +
        '<path d="M136 147 Q148 145 156 148"/><path d="M136 151 Q148 152 155 156"/>' +
      "</g></g>";
  }

  // --- Глаза по mood: большие блестящие / полуприкрытые / закрытые ---------
  function eyes(mood) {
    var EL = 102, ER = 138;
    var g = '<g class="rabbit-sticker-eyes">';
    if (mood === "radiant") {
      g += ell(EL, 131, 8, 9.5, 'fill="' + COL.eye + '"') +
           ell(ER, 131, 8, 9.5, 'fill="' + COL.eye + '"') +
           '<g fill="' + COL.white + '">' +
             cir(EL - 3, 127.5, 3) + cir(EL + 2.5, 134, 1.5) +
             cir(ER - 3, 127.5, 3) + cir(ER + 2.5, 134, 1.5) +
           "</g>";
    } else if (mood === "steady") {
      g += ell(EL, 131, 7, 8, 'fill="' + COL.eye + '"') +
           ell(ER, 131, 7, 8, 'fill="' + COL.eye + '"') +
           '<g fill="' + COL.white + '">' +
             cir(EL - 2.6, 128, 2.4) + cir(ER - 2.6, 128, 2.4) +
           "</g>";
    } else if (mood === "tired") {
      // полуприкрытые — тяжёлые опущенные дуги + крохотный блик
      g += '<g fill="none" stroke="' + COL.line + '" stroke-width="5" stroke-linecap="round">' +
             "<path d=\"M94 131 Q102 137 110 131\"/><path d=\"M130 131 Q138 137 146 131\"/>" +
           "</g>" +
           '<g fill="' + COL.white + '" opacity="0.9">' +
             cir(100, 131.5, 1.3) + cir(136, 131.5, 1.3) +
           "</g>";
    } else {
      // drained — закрыты, мягкие расслабленные дуги вниз
      g += '<g fill="none" stroke="' + COL.line + '" stroke-width="5" stroke-linecap="round">' +
             "<path d=\"M94 132 Q102 138 110 132\"/><path d=\"M130 132 Q138 138 146 132\"/>" +
           "</g>";
    }
    return g + "</g>";
  }

  // Веки для моргания (только radiant/steady — где глаза открыты)
  function lids() {
    return '<g class="rabbit-sticker-lids" fill="' + COL.body + '" opacity="0">' +
      ell(102, 131, 9, 10.5) + ell(138, 131, 9, 10.5) + "</g>";
  }

  // --- Частицы: искры (radiant) --------------------------------------------
  function sparkStar(cx, cy, r) {
    return '<path class="rabbit-sticker-spark" opacity="0.9" fill="' + COL.spark +
      '" d="M' + cx + " " + (cy - r) + "Q" + cx + " " + cy + " " + (cx + r) + " " + cy +
      "Q" + cx + " " + cy + " " + cx + " " + (cy + r) +
      "Q" + cx + " " + cy + " " + (cx - r) + " " + cy +
      "Q" + cx + " " + cy + " " + cx + " " + (cy - r) + 'Z"/>';
  }
  function sparks() {
    return '<g class="rabbit-sticker-particles">' +
      sparkStar(58, 66, 7) + sparkStar(184, 74, 8) + sparkStar(70, 36, 5) +
      sparkStar(176, 40, 5) + "</g>";
  }

  // --- Частицы: сонные «z» (drained) ---------------------------------------
  function zChar(x, y, s) {
    return '<path class="rabbit-sticker-z" opacity="0.9" fill="none" stroke="' + COL.zzz +
      '" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" d="M' +
      x + " " + y + "h" + s + "l-" + s + " " + s + "h" + s + '"/>';
  }
  function zzz() {
    return '<g class="rabbit-sticker-particles">' +
      zChar(150, 70, 9) + zChar(166, 52, 11) + zChar(184, 32, 13) + "</g>";
  }

  // --- Тень-эллипс (статична) ----------------------------------------------
  function shadow() {
    return '<ellipse class="rabbit-sticker-shadow" cx="120" cy="212" rx="62" ry="11" fill="' +
      COL.line + '" opacity="0.15"/>';
  }

  // --- Аура состояния (статична, мягкий вош позади) ------------------------
  function auraGlow(mood) {
    return '<circle class="rabbit-sticker-aura aura" cx="120" cy="128" r="96" fill="' +
      AURA[mood] + '" opacity="0.5"/>';
  }

  // --- Сборка одной сцены ---------------------------------------------------
  // POSE — статичный transform «оседания»; die-cut движется с позой, но статичен
  // относительно дыхания. Дыхание живёт на внутренней .rabbit-sticker-pet группе.
  var POSE = {
    radiant: "translate(0,0)",
    steady:  "translate(0,4)",
    tired:   "translate(0,11)",
    drained: "translate(0,20)"
  };
  var MOUTH = {
    radiant: "M120 151 V155 M120 155 Q112 161 106 155 M120 155 Q128 161 134 155",
    steady:  "M120 151 V155 M120 155 Q114 159 109 155 M120 155 Q126 159 131 155",
    tired:   "M120 151 V154 M120 154 Q115 158 111 154 M120 154 Q125 158 129 154",
    drained: "M120 151 V154 M120 154 Q116 156 112 154 M120 154 Q124 156 128 154"
  };
  var CHEEKOP = { radiant: 0.85, steady: 0.8, tired: 0.7, drained: 0.65 };

  function scene(mood) {
    var face = eyes(mood) + noseMouth(MOUTH[mood]) + cheeks(CHEEKOP[mood]);
    if (mood === "radiant" || mood === "steady") face += lids();

    var pet =
      '<g class="rabbit-sticker-pet">' +
        coloredEars(mood) +
        bodyBase(COL.body, COL.line, 5) +
        // светлый животик поверх корпуса
        ell(120, 168, 30, 34, 'fill="' + COL.belly + '"') +
        face +
      "</g>";

    var diecut =
      '<g class="rabbit-sticker-diecut">' +
        earsSilhouette(mood, COL.white, COL.white, 19) +
        bodyBase(COL.white, COL.white, 19) +
      "</g>";

    var particles = mood === "radiant" ? sparks() : (mood === "drained" ? zzz() : "");

    return auraGlow(mood) + shadow() +
      '<g transform="' + POSE[mood] + '">' + diecut + pet + "</g>" +
      particles;
  }

  // --- CSS: дыхание, моргание, подрагивание уха, искры/z; die-cut и тень статичны ---
  var KEY =
    "@keyframes rabbit-sticker-breathe{0%,100%{transform:scale(1)}50%{transform:scale(1.03)}}" +
    "@keyframes rabbit-sticker-blink{0%,90%,100%{opacity:0}94%{opacity:1}}" +
    "@keyframes rabbit-sticker-twitch{0%,86%,100%{transform:rotate(0)}90%{transform:rotate(-4deg)}94%{transform:rotate(3deg)}98%{transform:rotate(-1deg)}}" +
    "@keyframes rabbit-sticker-twinkle{0%,100%{opacity:.3;transform:scale(.8)}50%{opacity:1;transform:scale(1.15)}}" +
    "@keyframes rabbit-sticker-zfloat{0%{opacity:0;transform:translateY(5px)}25%{opacity:.95}100%{opacity:0;transform:translateY(-12px)}}";

  var BREATH = { radiant: "2.2s", steady: "3.5s", tired: "5s", drained: "7s" };

  function css(mood) {
    var P = ".pet-rabbit-sticker.is-" + mood;
    var s = KEY;
    // дыхание — внутренняя .pet-группа, от нижней кромки (лапки на месте)
    s += P + " .rabbit-sticker-pet{transform-box:fill-box;transform-origin:50% 100%;" +
      "animation:rabbit-sticker-breathe " + BREATH[mood] + " ease-in-out infinite}";
    // моргание — только там, где открытые веки
    if (mood === "radiant" || mood === "steady") {
      s += P + " .rabbit-sticker-lids{animation:rabbit-sticker-blink " +
        (mood === "radiant" ? "4.4s" : "5.2s") + " ease-in-out infinite}";
      // лёгкое подрагивание правого уха (idle) — только на прямых ушах
      s += P + " .rabbit-sticker-earR{transform-box:fill-box;transform-origin:50% 100%;" +
        "animation:rabbit-sticker-twitch " + (mood === "radiant" ? "5s" : "7s") +
        " ease-in-out infinite}";
    }
    if (mood === "radiant") {
      s += P + " .rabbit-sticker-spark{transform-box:fill-box;transform-origin:center;" +
        "animation:rabbit-sticker-twinkle 2.4s ease-in-out infinite}";
      s += P + " .rabbit-sticker-spark:nth-child(2){animation-delay:.6s}";
      s += P + " .rabbit-sticker-spark:nth-child(3){animation-delay:1.1s}";
      s += P + " .rabbit-sticker-spark:nth-child(4){animation-delay:1.6s}";
    }
    if (mood === "drained") {
      s += P + " .rabbit-sticker-z{transform-box:fill-box;transform-origin:center;" +
        "animation:rabbit-sticker-zfloat 3.2s ease-in-out infinite}";
      s += P + " .rabbit-sticker-z:nth-child(2){animation-delay:1.05s}";
      s += P + " .rabbit-sticker-z:nth-child(3){animation-delay:2.1s}";
    }
    // reduced-motion: позы различимы ушами/веками/дугами глаз без движения
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
    petId: "rabbit",
    style: "sticker",
    render: function (mood) {
      var m = SCENES[mood] ? mood : "steady";
      return '<svg class="pet-svg pet-rabbit pet-rabbit-sticker is-' + m +
        '" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg"' +
        ' role="img" aria-label="Clover the rabbit, sticker, ' + m + '">' +
        css(m) + SCENES[m] + "</svg>";
    }
  });
})();
