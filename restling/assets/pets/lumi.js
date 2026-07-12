/* Lumi — розовый аксолотль. Модуль питомца по assets/pets/CONTRACT.md.
   Один inline-SVG на mood, все анимации — CSS внутри SVG, префикс классов lumi-. */
(function () {
  "use strict";

  var BODY = "#F2B8C6";      // пыльно-розовый
  var BODY_EDGE = "#E39BB2"; // тональная обводка (~18% темнее)
  var BELLY = "#FBEDE4";     // животик крем
  var FIN = "#F5C4D2";       // плавник/гребень светлее
  var FIN_LINE = "#E8A9BE";
  var LIMB = "#EFAFC0";
  var INK = "#5E4854";       // тёплый тёмный, не чёрный
  var BLUSH = "#F2A0AE";
  var MOUTH = "#C9647A";
  var LILAC = "#9C8BC0";

  var AURA = {
    radiant: { inner: "#F5A623", iop: ".30", bg: "#FFF3D9", op: ".95" },
    steady:  { inner: "#5FAF7E", iop: ".16", bg: "#E8F3EA", op: ".9" },
    tired:   { inner: "#8CA0C9", iop: ".12", bg: "#EDF0F8", op: ".75" },
    drained: { inner: "#9C8BC0", iop: ".18", bg: "#F0ECF7", op: ".9" }
  };

  // кончики жабр: коралл, в усталых состояниях приглушён
  var GILL_TIP = {
    radiant: "#E4573D",
    steady:  "#E4573D",
    tired:   "#C97B8A",
    drained: "#C489A0"
  };

  // поза жабр: d — доп. поворот (плюс = опадают вниз), s — масштаб (распушённость)
  var GILL_POSE = {
    radiant: { d: -14, s: 1.12 },
    steady:  { d: 0,   s: 1 },
    tired:   { d: 42,  s: 0.95 },
    drained: { d: 55,  s: 0.72 }
  };

  var STYLE =
    "<style>" +
    ".pet-lumi{--lumiBd:14px}" +
    ".pet-lumi.is-radiant{--lumiBd:16.5px}" +
    ".pet-lumi.is-tired{--lumiBd:9px}" +
    /* дыхание */
    ".pet-lumi .lumi-breathe{transform-box:fill-box;transform-origin:50% 100%;animation:lumi-breathe 3.5s ease-in-out infinite}" +
    ".pet-lumi.is-radiant .lumi-breathe{animation:lumi-breathe 2.2s ease-in-out infinite}" +
    ".pet-lumi.is-tired .lumi-breathe{animation:lumi-breathe-lo 5s ease-in-out infinite}" +
    ".pet-lumi.is-drained .lumi-breathe{animation:lumi-breathe-deep 7s ease-in-out infinite}" +
    "@keyframes lumi-breathe{0%,100%{transform:scale(1,1)}50%{transform:scale(1.015,1.032)}}" +
    "@keyframes lumi-breathe-lo{0%,100%{transform:scale(1,1)}50%{transform:scale(1.008,1.018)}}" +
    "@keyframes lumi-breathe-deep{0%,100%{transform:scale(1,1)}50%{transform:scale(1.02,1.05)}}" +
    /* парение (только radiant) */
    ".pet-lumi .lumi-float{animation:none}" +
    ".pet-lumi.is-radiant .lumi-float{animation:lumi-float 3.2s ease-in-out infinite}" +
    "@keyframes lumi-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}" +
    /* хвост-плавник */
    ".pet-lumi .lumi-tailsw{transform-box:fill-box;transform-origin:0% 89%;animation:lumi-tail-sway 3.5s ease-in-out infinite}" +
    ".pet-lumi.is-radiant .lumi-tailsw{animation-duration:2.4s}" +
    ".pet-lumi.is-tired .lumi-tailsw{animation-duration:6.5s}" +
    ".pet-lumi.is-drained .lumi-tailsw{animation:lumi-tail-soft 9s ease-in-out infinite}" +
    "@keyframes lumi-tail-sway{0%,100%{transform:rotate(-5deg)}50%{transform:rotate(6deg)}}" +
    "@keyframes lumi-tail-soft{0%,100%{transform:rotate(-1.5deg)}50%{transform:rotate(1.5deg)}}" +
    /* жабры: «дыхание воды» со сдвинутыми фазами */
    ".pet-lumi .lumi-gsw{transform-box:fill-box;transform-origin:90% 86%;animation:lumi-gill-sway 3.5s ease-in-out infinite}" +
    ".pet-lumi .lumi-gsw2{animation-delay:-.5s}" +
    ".pet-lumi .lumi-gsw3{animation-delay:-1s}" +
    ".pet-lumi .lumi-gsw4{animation-delay:-.25s}" +
    ".pet-lumi .lumi-gsw5{animation-delay:-.75s}" +
    ".pet-lumi .lumi-gsw6{animation-delay:-1.25s}" +
    ".pet-lumi.is-radiant .lumi-gsw{animation-duration:2.2s}" +
    ".pet-lumi.is-tired .lumi-gsw{animation-name:lumi-gill-soft;animation-duration:6s}" +
    ".pet-lumi.is-drained .lumi-gsw{animation-name:lumi-gill-soft;animation-duration:9s}" +
    "@keyframes lumi-gill-sway{0%,100%{transform:rotate(-6deg)}50%{transform:rotate(6deg)}}" +
    "@keyframes lumi-gill-soft{0%,100%{transform:rotate(-2deg)}50%{transform:rotate(2deg)}}" +
    /* свечение жабр — только radiant */
    ".pet-lumi.is-radiant .lumi-gills{filter:drop-shadow(0 0 4px rgba(245,166,35,.7));animation:lumi-glow 2.2s ease-in-out infinite}" +
    "@keyframes lumi-glow{0%,100%{filter:drop-shadow(0 0 3px rgba(228,87,61,.5))}50%{filter:drop-shadow(0 0 8px rgba(245,166,35,.9))}}" +
    /* моргание (radiant/steady/tired — веки; drained — редкое приоткрывание) */
    ".pet-lumi .lumi-blink{animation:lumi-blink 5.6s linear infinite}" +
    ".pet-lumi.is-radiant .lumi-blink{animation-duration:4.6s}" +
    ".pet-lumi.is-tired .lumi-blink{animation-duration:7s}" +
    "@keyframes lumi-blink{0%,92%{transform:translateY(0)}94.5%,96%{transform:translateY(var(--lumiBd))}98.5%,100%{transform:translateY(0)}}" +
    ".pet-lumi .lumi-peek{opacity:0}" +
    ".pet-lumi.is-drained .lumi-peek{animation:lumi-peek 9s linear infinite}" +
    ".pet-lumi.is-drained .lumi-shut{animation:lumi-shut 9s linear infinite}" +
    "@keyframes lumi-peek{0%,88%{opacity:0}90%,94%{opacity:1}96%,100%{opacity:0}}" +
    "@keyframes lumi-shut{0%,88%{opacity:1}90%,94%{opacity:0}96%,100%{opacity:1}}" +
    /* зевок (tired) */
    ".pet-lumi .lumi-yawn{transform-box:fill-box;transform-origin:50% 15%;transform:scale(.4,0)}" +
    ".pet-lumi.is-tired .lumi-yawn{animation:lumi-yawn 9s ease-in-out infinite}" +
    "@keyframes lumi-yawn{0%,72%{transform:scale(.4,0)}80%,90%{transform:scale(1,1)}97%,100%{transform:scale(.4,0)}}" +
    /* аура */
    ".pet-lumi.is-radiant .lumi-aura{animation:lumi-aura-pulse 2.2s ease-in-out infinite}" +
    "@keyframes lumi-aura-pulse{0%,100%{opacity:.85}50%{opacity:1}}" +
    /* искры (radiant) */
    ".pet-lumi .lumi-sp{transform-box:fill-box;transform-origin:50% 50%;animation:lumi-twinkle 2.2s ease-in-out infinite}" +
    ".pet-lumi .lumi-sp2{animation-delay:-.55s}" +
    ".pet-lumi .lumi-sp3{animation-delay:-1.1s}" +
    ".pet-lumi .lumi-sp4{animation-delay:-1.65s}" +
    "@keyframes lumi-twinkle{0%,100%{opacity:.15;transform:scale(.55)}50%{opacity:1;transform:scale(1.15)}}" +
    /* тень при парении */
    ".pet-lumi.is-radiant .lumi-shadow{transform-box:fill-box;transform-origin:50% 50%;animation:lumi-shadow-bob 3.2s ease-in-out infinite}" +
    "@keyframes lumi-shadow-bob{0%,100%{transform:scale(1)}50%{transform:scale(.82)}}" +
    /* «z» (drained) */
    ".pet-lumi .lumi-z{opacity:0}" +
    ".pet-lumi.is-drained .lumi-z{animation:lumi-zfloat 7.5s linear infinite}" +
    ".pet-lumi .lumi-z2{animation-delay:2.5s}" +
    ".pet-lumi .lumi-z3{animation-delay:5s}" +
    "@keyframes lumi-zfloat{0%{opacity:0;transform:translateY(8px)}12%{opacity:.85;transform:translateY(2px)}55%,100%{opacity:0;transform:translateY(-18px)}}" +
    /* reduced motion: позы различимы статично (поза + веки + аура) */
    "@media (prefers-reduced-motion:reduce){.pet-lumi,.pet-lumi *{animation:none !important}}" +
    "</style>";

  function defs(mood, hx, hy) {
    var a = AURA[mood];
    return "<defs>" +
      "<radialGradient id=\"lumi-" + mood + "-aura\">" +
      "<stop offset=\"0%\" stop-color=\"" + a.inner + "\" stop-opacity=\"" + a.iop + "\"/>" +
      "<stop offset=\"55%\" stop-color=\"" + a.bg + "\" stop-opacity=\".5\"/>" +
      "<stop offset=\"100%\" stop-color=\"" + a.bg + "\" stop-opacity=\"0\"/>" +
      "</radialGradient>" +
      "<radialGradient id=\"lumi-" + mood + "-gg\" gradientUnits=\"userSpaceOnUse\" cx=\"" + hx + "\" cy=\"" + hy + "\" r=\"78\">" +
      "<stop offset=\"28%\" stop-color=\"" + BODY + "\"/>" +
      "<stop offset=\"95%\" stop-color=\"" + GILL_TIP[mood] + "\"/>" +
      "</radialGradient>" +
      "</defs>";
  }

  // одна ветвистая жабра: стебель + 2 ответвления + шарики на кончиках; базовое направление — влево
  function gill(x, y, ang, mir, sc, i, grad) {
    return "<g transform=\"translate(" + x + " " + y + ") scale(" + (mir * sc) + " " + sc + ") rotate(" + ang + ")\">" +
      "<g class=\"lumi-gsw lumi-gsw" + i + "\">" +
      "<path d=\"M0 0Q-11 -2 -19 -9\" stroke-width=\"4.6\"/>" +
      "<path d=\"M-7 -2Q-11 -9 -12 -16\" stroke-width=\"3\"/>" +
      "<path d=\"M-11 -3Q-17 -3 -23 -1\" stroke-width=\"3\"/>" +
      "<circle cx=\"-19\" cy=\"-9\" r=\"3.3\" fill=\"url(#" + grad + ")\" stroke=\"none\"/>" +
      "<circle cx=\"-12\" cy=\"-16\" r=\"2.6\" fill=\"url(#" + grad + ")\" stroke=\"none\"/>" +
      "<circle cx=\"-23\" cy=\"-1\" r=\"2.6\" fill=\"url(#" + grad + ")\" stroke=\"none\"/>" +
      "</g></g>";
  }

  function gills(mood, spots, grad) {
    var p = GILL_POSE[mood];
    var out = "<g class=\"lumi-gills\" fill=\"none\" stroke=\"url(#" + grad + ")\" stroke-linecap=\"round\">";
    for (var i = 0; i < spots.length; i++) {
      var s = spots[i]; // [x, y, baseAng, mir]
      out += gill(s[0], s[1], s[2] + p.d, s[3], p.s, i + 1, grad);
    }
    return out + "</g>";
  }

  // хвост-плавник в локальных координатах (основание в (0,8), кончик вправо-вверх)
  function tailFin() {
    return "<path d=\"M0 8C14 13 29 9 35 -7C40 -20 33 -33 20 -32C28 -20 23 -5 6 -1Z\" fill=\"" + FIN + "\" stroke=\"" + FIN_LINE + "\" stroke-width=\"1.2\"/>" +
      "<path d=\"M8 3Q20 0 26 -12\" fill=\"none\" stroke=\"" + FIN_LINE + "\" stroke-width=\"2\" stroke-linecap=\"round\"/>";
  }

  function sparkle(x, y, sc, i) {
    return "<g transform=\"translate(" + x + " " + y + ") scale(" + sc + ")\">" +
      "<path class=\"lumi-sp lumi-sp" + i + "\" d=\"M0 -6L1.6 -1.6L6 0L1.6 1.6L0 6L-1.6 1.6L-6 0L-1.6 -1.6Z\" fill=\"#F5A623\"/>" +
      "</g>";
  }

  // ---- обычная компоновка: radiant / steady / tired ----
  function normalPose(mood) {
    var grad = "lumi-" + mood + "-gg";
    var isR = mood === "radiant";
    var isT = mood === "tired";

    var poseT = isR ? "translate(0 -10)" : (isT ? "translate(0 10) scale(1 .95)" : "translate(0 0)");
    var lidOff = isR ? -16.5 : (isT ? -9 : -14);
    var er = isR ? 6.5 : 6;

    var spots = [
      [60, 110, -35, 1], [49, 140, 0, 1], [58, 170, 35, 1],
      [124, 110, -35, -1], [135, 140, 0, -1], [126, 170, 35, -1]
    ];

    var eyesHi;
    if (isR) {
      eyesHi = "<circle cx=\"73.8\" cy=\"137.6\" r=\"2.6\" fill=\"#FFFFFF\"/><circle cx=\"78.5\" cy=\"142\" r=\"1.3\" fill=\"#FFFFFF\"/>" +
               "<circle cx=\"105.8\" cy=\"137.6\" r=\"2.6\" fill=\"#FFFFFF\"/><circle cx=\"110.5\" cy=\"142\" r=\"1.3\" fill=\"#FFFFFF\"/>";
    } else {
      eyesHi = "<circle cx=\"74.2\" cy=\"138\" r=\"2.1\" fill=\"#FFFFFF\"/><circle cx=\"106.2\" cy=\"138\" r=\"2.1\" fill=\"#FFFFFF\"/>";
    }

    var mouth;
    if (isR) {
      mouth = "<path d=\"M85 153Q92 165 99 153Z\" fill=\"" + MOUTH + "\"/>";
    } else if (isT) {
      mouth = "<path d=\"M87 157Q92 159.5 97 157\" fill=\"none\" stroke=\"" + MOUTH + "\" stroke-width=\"2.4\" stroke-linecap=\"round\"/>" +
              "<ellipse class=\"lumi-yawn\" cx=\"92\" cy=\"161\" rx=\"4.5\" ry=\"6\" fill=\"" + MOUTH + "\"/>";
    } else {
      mouth = "<path d=\"M85 155Q92 161 99 155\" fill=\"none\" stroke=\"" + MOUTH + "\" stroke-width=\"2.5\" stroke-linecap=\"round\"/>";
    }

    var particles = "";
    if (isR) {
      particles = "<g class=\"lumi-particles\">" +
        sparkle(40, 84, 1, 1) + sparkle(190, 70, 0.85, 2) +
        sparkle(198, 160, 0.7, 3) + sparkle(30, 162, 0.75, 4) +
        "</g>";
    }

    var headT = isT ? " transform=\"rotate(-5 92 142)\"" : "";

    return "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 240 240\" class=\"pet-svg pet-lumi is-" + mood + "\" role=\"img\" aria-label=\"Lumi the axolotl, " + mood + "\">" +
      STYLE + defs(mood, 92, 142) +
      "<circle class=\"lumi-aura\" cx=\"118\" cy=\"146\" r=\"90\" fill=\"url(#lumi-" + mood + "-aura)\" opacity=\"" + AURA[mood].op + "\"/>" +
      "<ellipse class=\"lumi-shadow\" cx=\"120\" cy=\"206\" rx=\"56\" ry=\"7\" fill=\"#3E3A47\" fill-opacity=\"" + (isR ? ".06" : ".08") + "\"/>" +
      "<g class=\"lumi-pet\" transform=\"" + poseT + "\">" +
      "<g class=\"lumi-float\"><g class=\"lumi-breathe\">" +
      // хвост-плавник (за телом)
      "<g class=\"lumi-tail\" transform=\"translate(180 170)\"><g class=\"lumi-tailsw\">" + tailFin() + "</g></g>" +
      // спинной гребень
      "<path d=\"M100 128Q144 108 184 148\" fill=\"none\" stroke=\"" + FIN + "\" stroke-width=\"9\" stroke-linecap=\"round\"/>" +
      // тело-капля
      "<ellipse cx=\"144\" cy=\"168\" rx=\"50\" ry=\"30\" fill=\"" + BODY + "\" stroke=\"" + BODY_EDGE + "\" stroke-width=\"1.4\"/>" +
      "<ellipse cx=\"146\" cy=\"184\" rx=\"36\" ry=\"12\" fill=\"" + BELLY + "\"/>" +
      // лапки-нубики
      "<ellipse cx=\"72\" cy=\"191\" rx=\"9\" ry=\"6.5\" fill=\"" + LIMB + "\"/>" +
      "<ellipse cx=\"104\" cy=\"194\" rx=\"8\" ry=\"6\" fill=\"" + LIMB + "\"/>" +
      // жабры (за головой, поверх тела)
      gills(mood, spots, grad) +
      // голова
      "<g class=\"lumi-head\"" + headT + ">" +
      "<circle cx=\"92\" cy=\"142\" r=\"45\" fill=\"" + BODY + "\" stroke=\"" + BODY_EDGE + "\" stroke-width=\"1.4\"/>" +
      "<ellipse cx=\"64\" cy=\"155\" rx=\"6.5\" ry=\"4\" fill=\"" + BLUSH + "\" opacity=\"" + (isT ? ".5" : ".75") + "\"/>" +
      "<ellipse cx=\"120\" cy=\"155\" rx=\"6.5\" ry=\"4\" fill=\"" + BLUSH + "\" opacity=\"" + (isT ? ".5" : ".75") + "\"/>" +
      "<g class=\"lumi-eyes\">" +
      "<circle cx=\"76\" cy=\"140\" r=\"" + er + "\" fill=\"" + INK + "\"/>" +
      "<circle cx=\"108\" cy=\"140\" r=\"" + er + "\" fill=\"" + INK + "\"/>" +
      eyesHi +
      "</g>" +
      "<g class=\"lumi-lids\" transform=\"translate(0 " + lidOff + ")\">" +
      "<circle class=\"lumi-blink\" cx=\"76\" cy=\"140\" r=\"8\" fill=\"" + BODY + "\"/>" +
      "<circle class=\"lumi-blink\" cx=\"108\" cy=\"140\" r=\"8\" fill=\"" + BODY + "\"/>" +
      "</g>" +
      "<g class=\"lumi-mouth\">" + mouth + "</g>" +
      "</g>" +
      "</g></g></g>" +
      particles +
      "</svg>";
  }

  // ---- drained: свернулась полумесяцем, подушка-ракушка, «z» ----
  function drainedPose() {
    var mood = "drained";
    var grad = "lumi-" + mood + "-gg";
    var spots = [
      [46, 122, -35, 1], [36, 150, 0, 1], [44, 178, 35, 1],
      [110, 120, -35, -1], [121, 150, 0, -1], [112, 178, 35, -1]
    ];

    return "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 240 240\" class=\"pet-svg pet-lumi is-drained\" role=\"img\" aria-label=\"Lumi the axolotl, drained\">" +
      STYLE + defs(mood, 78, 152) +
      "<circle class=\"lumi-aura\" cx=\"110\" cy=\"150\" r=\"88\" fill=\"url(#lumi-drained-aura)\" opacity=\"" + AURA[mood].op + "\"/>" +
      "<ellipse class=\"lumi-shadow\" cx=\"106\" cy=\"206\" rx=\"62\" ry=\"7\" fill=\"#3E3A47\" fill-opacity=\".08\"/>" +
      // подушка-ракушка (статична, не дышит)
      "<g class=\"lumi-pillow\">" +
      "<path d=\"M22 197Q22 172 52 170Q82 172 82 197Z\" fill=\"#EDE8F8\" stroke=\"#D9CFF0\" stroke-width=\"1.5\"/>" +
      "<path d=\"M52 196Q40 185 34 177\" fill=\"none\" stroke=\"#D9CFF0\" stroke-width=\"2\" stroke-linecap=\"round\"/>" +
      "<path d=\"M52 196Q52 183 52 173\" fill=\"none\" stroke=\"#D9CFF0\" stroke-width=\"2\" stroke-linecap=\"round\"/>" +
      "<path d=\"M52 196Q64 185 70 177\" fill=\"none\" stroke=\"#D9CFF0\" stroke-width=\"2\" stroke-linecap=\"round\"/>" +
      "</g>" +
      "<g class=\"lumi-pet\"><g class=\"lumi-breathe\">" +
      // спинка-полумесяц
      "<path d=\"M104 140Q152 126 174 164\" fill=\"none\" stroke=\"" + FIN + "\" stroke-width=\"8\" stroke-linecap=\"round\"/>" +
      // тело, свёрнутое к голове
      "<ellipse cx=\"130\" cy=\"176\" rx=\"48\" ry=\"24\" fill=\"" + BODY + "\" stroke=\"" + BODY_EDGE + "\" stroke-width=\"1.4\"/>" +
      "<ellipse cx=\"134\" cy=\"188\" rx=\"32\" ry=\"9\" fill=\"" + BELLY + "\"/>" +
      // хвост-плавник, обёрнутый вперёд, к щеке
      "<g class=\"lumi-tail\" transform=\"translate(118 192) rotate(-160) scale(.85)\"><g class=\"lumi-tailsw\">" + tailFin() + "</g></g>" +
      // прижатые жабры
      gills(mood, spots, grad) +
      // голова на подушке
      "<g class=\"lumi-head\">" +
      "<circle cx=\"78\" cy=\"152\" r=\"42\" fill=\"" + BODY + "\" stroke=\"" + BODY_EDGE + "\" stroke-width=\"1.4\"/>" +
      "<ellipse cx=\"50\" cy=\"162\" rx=\"6\" ry=\"3.8\" fill=\"" + BLUSH + "\" opacity=\".55\"/>" +
      "<ellipse cx=\"106\" cy=\"162\" rx=\"6\" ry=\"3.8\" fill=\"" + BLUSH + "\" opacity=\".55\"/>" +
      // глаза-щёлочки + редкое «приоткрыл-закрыл»
      "<g class=\"lumi-eyes\">" +
      "<path class=\"lumi-shut\" d=\"M56 146Q62 151 68 146\" fill=\"none\" stroke=\"#8A5F6F\" stroke-width=\"2.5\" stroke-linecap=\"round\"/>" +
      "<path class=\"lumi-shut\" d=\"M88 146Q94 151 100 146\" fill=\"none\" stroke=\"#8A5F6F\" stroke-width=\"2.5\" stroke-linecap=\"round\"/>" +
      "<circle class=\"lumi-peek\" cx=\"62\" cy=\"147.5\" r=\"2.2\" fill=\"" + INK + "\"/>" +
      "<circle class=\"lumi-peek\" cx=\"94\" cy=\"147.5\" r=\"2.2\" fill=\"" + INK + "\"/>" +
      "</g>" +
      "<g class=\"lumi-mouth\"><path d=\"M72 166Q78 169.5 84 166\" fill=\"none\" stroke=\"" + MOUTH + "\" stroke-width=\"2.2\" stroke-linecap=\"round\"/></g>" +
      "</g>" +
      "</g></g>" +
      // сонные «z»
      "<g class=\"lumi-particles\" fill=\"" + LILAC + "\" font-family=\"Nunito,'Segoe UI',sans-serif\" font-weight=\"700\">" +
      "<text class=\"lumi-z lumi-z1\" x=\"126\" y=\"118\" font-size=\"15\">z</text>" +
      "<text class=\"lumi-z lumi-z2\" x=\"144\" y=\"100\" font-size=\"12\">z</text>" +
      "<text class=\"lumi-z lumi-z3\" x=\"160\" y=\"84\" font-size=\"10\">z</text>" +
      "</g>" +
      "</svg>";
  }

  function render(mood) {
    if (mood === "drained") return drainedPose();
    if (mood === "radiant" || mood === "steady" || mood === "tired") return normalPose(mood);
    return normalPose("steady");
  }

  if (typeof window !== "undefined" && typeof window.registerPet === "function") {
    window.registerPet({
      id: "lumi",
      nameEn: "Lumi",
      nameRu: "Люми",
      render: render
    });
  }
})();
