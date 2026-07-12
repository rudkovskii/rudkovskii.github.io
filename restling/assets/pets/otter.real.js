/* Restling — style module: Pebble / Пеббл, морская выдра (id: otter), стиль "real".
   Контракт: assets/pets/CONTRACT.md v2. Тёплая иллюстрация из детской энциклопедии,
   НЕ фотореализм: натуральные пропорции морской выдры (Enhydra lutris) — тёмно-бурое
   тело, светлая «седая» голова и мордочка, маленькие низкие ушки, крупный нос,
   длинные вибриссы, широкие задние ласты, плоский хвост. Объём — два градиента,
   текстура шерсти — тональные штрихи. Глаза маленькие, реалистичные. Позы спокойные.
   Ключевая метафора: плавает на спине, камешек на груди.
   Scoping: корневой класс pet-svg pet-otter pet-otter-real is-<mood>,
   селекторы от .pet-otter-real, keyframes/id с префиксом otter-real-. */
(function () {
  "use strict";

  // Природный окрас морской выдры + сценовые цвета (без чёрного, без красного)
  var FUR = "#5C4531",     // тёмно-бурое тело
      FURD = "#463526",    // глубокая тень тела
      FURL = "#7A6046",    // светлый верх тела (блик мокрой шерсти)
      FURX = "#382B1E",    // самый глубокий тон: штрихи, ласты (не чёрный)
      HEAD = "#D8C29E",    // светлая «седая» голова — видовой признак
      HEADL = "#EDDFC4",   // блик головы
      HEADD = "#B39B72",   // тень головы / штрихи седины
      CREAM = "#F2E7D2",   // мордочка вокруг носа
      EYE = "#382B1E",     // маленькие тёмно-карие глаза
      NOSE = "#403020",    // крупный нос
      WHISK = "#EFE4CC",   // светлые жёсткие вибриссы
      PEBB = "#98928A",    // камешек — природный серый
      PEBBL = "#C6C0B4",   // блик камешка
      PEBBD = "#767068",   // тень камешка
      WATER = "#C6DCE2",   // холодная морская вода
      WATERD = "#A9C6CF",  // тон воды / ватерлиния / круги
      WATERL = "#E4F1F4",  // светлая рябь
      KELP = "#5F8A52",    // ламинария-«плед»
      KELPD = "#456F3B";   // тень ламинарии

  var AURA = { radiant: "#FFF3D9", steady: "#E8F3EA", tired: "#EDF0F8", drained: "#F0ECF7" };

  // Общие keyframes: амплитуды сдержаннее soft (стиль real), темпы mood по контракту
  var KEYFRAMES =
    "@keyframes otter-real-bob{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-2px) rotate(-.5deg)}}" +
    "@keyframes otter-real-breathe{0%,100%{transform:scale(1)}50%{transform:scale(1.014,1.03)}}" +
    "@keyframes otter-real-blink{0%,92%,100%{transform:scaleY(0)}95%,97%{transform:scaleY(1)}}" +
    "@keyframes otter-real-ripple{0%{transform:scale(.7);opacity:.55}70%{opacity:.16}100%{transform:scale(1.12);opacity:0}}" +
    "@keyframes otter-real-whisk{0%,100%{transform:rotate(0deg)}50%{transform:rotate(1.6deg)}}" +
    "@keyframes otter-real-tap{0%,66%,100%{transform:translateY(0)}74%{transform:translateY(-6px) rotate(-8deg)}80%{transform:translateY(1px) rotate(0deg)}85%{transform:translateY(0)}}" +
    "@keyframes otter-real-tail{0%,58%,100%{transform:rotate(0deg)}66%{transform:rotate(-9deg)}74%{transform:rotate(3deg)}82%{transform:rotate(0deg)}}" +
    "@keyframes otter-real-drop{0%,58%{opacity:0;transform:translate(0,0) scale(.5)}68%{opacity:.9;transform:translate(3px,-10px) scale(1)}84%,100%{opacity:0;transform:translate(6px,-15px) scale(.6)}}" +
    "@keyframes otter-real-mote{0%,100%{opacity:0;transform:translateY(0)}50%{opacity:.85;transform:translateY(-4px)}}" +
    "@keyframes otter-real-glow{0%,100%{opacity:.3}50%{opacity:.55}}" +
    "@keyframes otter-real-dangle{0%,100%{transform:rotate(-3deg)}50%{transform:rotate(4deg)}}" +
    "@keyframes otter-real-yawn{0%,74%,96%,100%{transform:scale(1,.22)}82%,90%{transform:scale(1.1,1)}}" +
    "@keyframes otter-real-kelp{0%,100%{transform:rotate(0deg)}50%{transform:rotate(1.3deg)}}" +
    "@keyframes otter-real-z{0%,10%{opacity:0;transform:translate(0,0)}26%{opacity:.7}54%{opacity:0;transform:translate(7px,-20px)}100%{opacity:0}}";

  // Два разрешённых градиента (объём мокрой шерсти) — id с префиксом otter-real-<mood>-
  function defs(m) {
    return "<defs>" +
      '<linearGradient id="otter-real-' + m + '-fur" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0" stop-color="' + FURL + '"/>' +
        '<stop offset=".52" stop-color="' + FUR + '"/>' +
        '<stop offset="1" stop-color="' + FURD + '"/></linearGradient>' +
      '<radialGradient id="otter-real-' + m + '-head" cx=".4" cy=".3" r="1">' +
        '<stop offset="0" stop-color="' + HEADL + '"/>' +
        '<stop offset=".62" stop-color="' + HEAD + '"/>' +
        '<stop offset="1" stop-color="' + HEADD + '"/></radialGradient>' +
      "</defs>";
  }

  // Штрихи шерсти: один <path> на группу (бюджет), тональные
  function hatch(d, color, w, o) {
    return '<path d="' + d + '" fill="none" stroke="' + color + '" stroke-width="' + w +
      '" stroke-linecap="round" opacity="' + o + '"/>';
  }

  // Глаз: маленький, реалистичный, тёмно-карий. kind: spark|open|tired|slit
  function eye(kind, x, y) {
    if (kind === "slit") {
      return '<path d="M' + (x - 4) + " " + y + " Q" + x + " " + (y + 3) + " " + (x + 4) + " " + y +
        '" fill="none" stroke="' + EYE + '" stroke-width="1.9" stroke-linecap="round"/>';
    }
    var s = '<g transform="translate(' + x + "," + y + ')">' +
      '<ellipse rx="3.2" ry="3.5" fill="' + EYE + '"/>' +
      '<circle cx="1" cy="-1.2" r=".9" fill="#FFFFFF" opacity=".9"/>';
    if (kind === "spark") s += '<circle cx="-1.2" cy="1.4" r=".55" fill="#FFFFFF" opacity=".7"/>';
    if (kind === "tired") s += '<rect x="-3.8" y="-3.9" width="7.6" height="3.6" rx="1.6" fill="' + HEAD + '"/>' +
      '<path d="M-3.8 -.4 Q0 .8 3.8 -.4" fill="none" stroke="' + HEADD + '" stroke-width="1" opacity=".6"/>';
    else s += '<rect class="otter-real-lidblink" x="-3.8" y="-4" width="7.6" height="8" rx="1.8" fill="' + HEAD + '"/>';
    // тонкая надбровная тень — «энциклопедическая» деталь
    s += '<path d="M-4.2 -4.4 Q0 -5.8 4.2 -4.4" fill="none" stroke="' + HEADD + '" stroke-width="1" opacity=".5"/></g>';
    return s;
  }

  // Голова слева (абс. координаты, центр ~66,124): широкая светлая голова,
  // маленькие низкие ушки, кремовая мордочка, крупный нос, длинные вибриссы.
  function headSVG(m, o) {
    var s = '<g class="head otter-real-head"' + (o.tilt ? ' transform="rotate(' + o.tilt + ' 66 124)"' : "") + ">";
    // маленькие ушки НИЗКО по бокам головы (у морской выдры — не на макушке)
    s += '<g transform="translate(44,118)' + (o.earDroop ? " rotate(-14)" : "") + '">' +
         '<ellipse rx="4.6" ry="5.4" fill="' + HEADD + '" transform="rotate(-18)"/><ellipse cx=".8" cy=".6" rx="2.4" ry="3" fill="' + FURD + '" opacity=".55" transform="rotate(-18)"/></g>' +
         '<g transform="translate(88,118)' + (o.earDroop ? " rotate(14)" : "") + '">' +
         '<ellipse rx="4.6" ry="5.4" fill="' + HEADD + '" transform="rotate(18)"/><ellipse cx="-.8" cy=".6" rx="2.4" ry="3" fill="' + FURD + '" opacity=".55" transform="rotate(18)"/></g>';
    // широкая округлая голова, светлая (главный видовой контраст с тёмным телом)
    s += '<ellipse cx="66" cy="124" rx="24.5" ry="22.5" fill="url(#otter-real-' + m + '-head)"/>';
    // переход шеи в тёмное тело
    s += '<path d="M84 136 Q92 128 90 116 Q98 130 92 142 Z" fill="' + FUR + '" opacity=".85"/>';
    // кремовая мордочка вокруг носа
    s += '<ellipse cx="66" cy="132" rx="13.5" ry="10" fill="' + CREAM + '" opacity=".92"/>';
    // штрихи «седины» на лбу и скулах
    s += hatch("M56 108 q1.5 3.5 0 7 M66 106 q1.5 3.5 0 7 M76 108 q1.5 3.5 0 7 M48 122 q2 3 .5 6.5 M84 122 q-2 3 -.5 6.5", HEADD, 1.2, ".45");
    // глаза
    s += '<g class="eyes otter-real-eyes">' + o.eyes + "</g>";
    // крупный нос с «седловидным» верхом и бликом
    s += '<g class="otter-real-noseg"><path d="M60.5 127.5 Q66 125.5 71.5 127.5 Q71 133.5 66 135 Q61 133.5 60.5 127.5 Z" fill="' + NOSE + '"/>' +
         '<ellipse cx="63.6" cy="128.6" rx="1.6" ry="1" fill="#FFFFFF" opacity=".4"/></g>';
    // длинные жёсткие вибриссы — 3+3, светлые
    s += '<g class="otter-real-whiskers" fill="none" stroke="' + WHISK + '" stroke-width="1.1" stroke-linecap="round" opacity=".9">' +
         '<path d="M57 131 Q46 128 37 127"/><path d="M57 134 Q46 134 36 134"/><path d="M57 137 Q47 140 39 142"/>' +
         '<path d="M75 131 Q86 128 95 127"/><path d="M75 134 Q86 134 96 134"/><path d="M75 137 Q85 140 93 142"/></g>';
    s += '<g class="mouth otter-real-mouth">' + o.mouth + "</g></g>";
    return s;
  }

  // Рты: у настоящей выдры мимика едва заметна
  var MOUTHS = {
    smile: '<path d="M61 139.5 Q66 143 71 139.5" fill="none" stroke="' + FURX + '" stroke-width="1.5" stroke-linecap="round" opacity=".7"/>',
    soft:  '<path d="M62 140 Q66 142.4 70 140" fill="none" stroke="' + FURX + '" stroke-width="1.4" stroke-linecap="round" opacity=".65"/>',
    yawn:  '<ellipse class="otter-real-yawng" cx="66" cy="140.5" rx="3.2" ry="4" fill="#8A5B48" opacity=".9"/>' +
           '<path d="M62.5 140 Q66 142 69.5 140" fill="none" stroke="' + FURX + '" stroke-width="1.3" stroke-linecap="round" opacity=".55"/>',
    rest:  '<path d="M63 140.5 Q66 142 69 140.5" fill="none" stroke="' + FURX + '" stroke-width="1.3" stroke-linecap="round" opacity=".6"/>'
  };

  // Тело на спине: вытянутое тёмное, светлее к груди, штрихи мокрой шерсти
  function torso(m) {
    return '<g class="body otter-real-torso">' +
      '<ellipse cx="132" cy="147" rx="53" ry="22" fill="url(#otter-real-' + m + '-fur)"/>' +
      // светлый переход груди под головой (шерсть к голове светлеет постепенно)
      '<ellipse cx="103" cy="140" rx="18" ry="12" fill="' + HEADD + '" opacity=".5"/>' +
      '<ellipse cx="130" cy="139" rx="30" ry="10" fill="' + FURL + '" opacity=".45"/>' +
      // штрихи мокрой шерсти по бокам и животу
      hatch("M106 154 q3 4 1 9 M118 158 q3 4 1 8 M133 159 q2 4 1 8 M148 157 q-2 4 -1 8 M160 152 q-3 4 -1 8 M116 137 q2 3 1 7 M144 138 q-2 3 -1 7", FURX, 1.4, ".3") +
      hatch("M124 132 q2 3 0 6 M136 132 q2 3 0 6", FURL, 1.2, ".5") +
      "</g>";
  }

  // Плоский толстый хвост-весло справа, лежит на воде
  function tail() {
    return '<g class="otter-real-tailg">' +
      '<path d="M178 143 Q200 137 216 146 Q201 154 179 152 Q174 148 178 143 Z" fill="' + FUR + '"/>' +
      '<path d="M184 146 Q200 143 211 147" fill="none" stroke="' + FURD + '" stroke-width="1.3" opacity=".6"/>' +
      "</g>";
  }

  // Широкие перепончатые задние ласты, торчат из воды
  function flippers() {
    return '<g class="otter-real-flippers">' +
      '<path d="M158 138 Q163 118 172 116 Q174 130 166 141 Z" fill="' + FURX + '"/>' +
      '<path d="M164 132 Q168 124 171 121" fill="none" stroke="' + FURD + '" stroke-width="1.1" opacity=".7"/>' +
      '<path d="M172 141 Q180 124 188 124 Q188 137 178 146 Z" fill="' + FURX + '"/>' +
      '<path d="M177 137 Q182 130 185 128" fill="none" stroke="' + FURD + '" stroke-width="1.1" opacity=".7"/>' +
      "</g>";
  }

  // Камешек в лапках (группа для анимации)
  function pebbleAt(x, y) {
    return '<g class="otter-real-pebbleg">' +
      '<ellipse cx="' + x + '" cy="' + (y + 6) + '" rx="8" ry="2" fill="' + FURX + '" opacity=".2"/>' +
      '<ellipse cx="' + x + '" cy="' + y + '" rx="9" ry="7" fill="' + PEBB + '"/>' +
      '<path d="M' + (x - 5) + " " + (y + 3.5) + " Q" + x + " " + (y + 5.5) + " " + (x + 5) + " " + (y + 3.5) + '" fill="none" stroke="' + PEBBD + '" stroke-width="1.1" opacity=".6"/>' +
      '<ellipse cx="' + (x - 2.8) + '" cy="' + (y - 2.4) + '" rx="3" ry="2" fill="' + PEBBL + '"/>' +
      "</g>";
  }

  function paw(x, y, rot) {
    return '<g transform="rotate(' + rot + " " + x + " " + y + ')"><ellipse cx="' + x + '" cy="' + y + '" rx="5.5" ry="8.5" fill="' + FURX + '"/>' +
      '<path d="M' + (x - 2.5) + ' ' + (y - 5) + ' q2.5 -1.5 5 0" fill="none" stroke="' + FURD + '" stroke-width="1" opacity=".7"/></g>';
  }

  // Ламинария-«плед» (drained): выдры реально заворачиваются в неё во сне
  function kelpWrap() {
    return '<g class="extras otter-real-kelpg">' +
      '<path d="M108 116 Q118 136 105 156" fill="none" stroke="' + KELP + '" stroke-width="7" stroke-linecap="round" opacity=".92"/>' +
      '<path d="M108 118 Q116 136 106 152" fill="none" stroke="' + KELPD + '" stroke-width="1.6" opacity=".55"/>' +
      '<path d="M107 114 Q100 106 103 98 Q110 104 110 113 Z" fill="' + KELP + '"/>' +
      '<path d="M142 115 Q152 136 140 157" fill="none" stroke="' + KELP + '" stroke-width="6" stroke-linecap="round" opacity=".82"/>' +
      '<path d="M141 113 Q136 105 139 98 Q145 104 144 112 Z" fill="' + KELP + '" opacity=".9"/>' +
      '<path d="M156 124 Q163 140 154 154" fill="none" stroke="' + KELP + '" stroke-width="4.5" stroke-linecap="round" opacity=".6"/>' +
      "</g>";
  }

  // --- Сцена: вода + выдра, осадка по mood ---------------------------------

  function scene(m, c) {
    var s = defs(m);
    s += '<ellipse class="aura otter-real-aura" cx="120" cy="146" rx="102" ry="78" fill="' + AURA[m] + '" opacity=".5"/>';
    // морская гладь позади
    s += '<ellipse cx="120" cy="184" rx="110" ry="42" fill="' + WATER + '"/>';
    s += '<ellipse cx="120" cy="176" rx="94" ry="28" fill="' + WATERL + '" opacity=".35"/>';
    // выдра (осадка = вертикальный сдвиг off)
    s += '<g transform="translate(0,' + c.off + ')"><g class="otter-real-float">' +
      tail() + flippers() + torso(m) + (c.kelp ? kelpWrap() : "") + c.arms + headSVG(m, c) +
      "</g></g>";
    // вода поверх: ватерлиния пересекает силуэт — глубже осадка, больше скрыто
    s += '<g class="otter-real-waterfront">' +
      '<path d="M8 168 Q60 161 122 163 Q186 165 232 170 L232 226 Q120 238 8 226 Z" fill="' + WATER + '" opacity=".93"/>' +
      '<path d="M14 167 Q62 161 122 163 Q184 165 228 169" fill="none" stroke="' + WATERD + '" stroke-width="1.8" stroke-linecap="round" opacity=".8"/>' +
      '<path d="M46 176 Q74 172 100 175 M138 178 Q166 174 196 178" fill="none" stroke="' + WATERL + '" stroke-width="1.6" stroke-linecap="round" opacity=".7"/>' +
      '<ellipse class="otter-real-ripple1" cx="120" cy="172" rx="66" ry="10" fill="none" stroke="' + WATERD + '" stroke-width="1.7"/>' +
      '<ellipse class="otter-real-ripple2" cx="120" cy="174" rx="84" ry="14" fill="none" stroke="' + WATERD + '" stroke-width="1.5"/>' +
      "</g>";
    // частицы
    if (m === "radiant") {
      s += '<g class="particles otter-real-particles">' +
        '<circle class="otter-real-drop1" cx="200" cy="146" r="2.4" fill="' + WATERD + '"/>' +
        '<circle class="otter-real-drop2" cx="209" cy="150" r="1.8" fill="' + WATERL + '"/>' +
        '<circle class="otter-real-mote1" cx="46" cy="80" r="1.9" fill="#F5A623" opacity="0"/>' +
        '<circle class="otter-real-mote2" cx="192" cy="70" r="1.5" fill="#F5A623" opacity="0"/>' +
        '<circle class="otter-real-mote3" cx="160" cy="98" r="1.3" fill="#FFD98F" opacity="0"/>' +
        '<circle class="otter-real-mote4" cx="66" cy="66" r="1.4" fill="#FFD98F" opacity="0"/>' +
        "</g>";
    } else if (m === "drained") {
      s += '<g class="particles otter-real-particles" font-weight="700" fill="#9C8BC0">' +
        '<text class="otter-real-z1" x="48" y="92" font-size="12">z</text>' +
        '<text class="otter-real-z2" x="40" y="78" font-size="14">z</text>' +
        "</g>";
    }
    return s;
  }

  // --- CSS по mood ----------------------------------------------------------

  function styleFor(m, c) {
    var P = ".pet-otter-real.is-" + m;
    var css = KEYFRAMES;
    css += P + " .otter-real-aura{animation:otter-real-glow " + c.dur + " ease-in-out infinite}";
    css += P + " .otter-real-float{animation:otter-real-bob " + c.dur + " ease-in-out infinite;transform-box:view-box;transform-origin:120px 150px}";
    css += P + " .otter-real-torso{animation:otter-real-breathe " + c.dur + " ease-in-out infinite;transform-box:fill-box;transform-origin:50% 60%}";
    css += P + " .otter-real-lidblink{transform:scaleY(0);animation:otter-real-blink " + c.blink + " linear infinite;transform-box:fill-box;transform-origin:50% 0%}";
    css += P + " .otter-real-whiskers{animation:otter-real-whisk " + c.dur + " ease-in-out infinite;transform-box:fill-box;transform-origin:50% 30%}";
    css += P + " .otter-real-ripple1{animation:otter-real-ripple " + c.rip + " ease-out infinite;transform-box:fill-box;transform-origin:50% 50%}";
    css += P + " .otter-real-ripple2{animation:otter-real-ripple " + c.rip + " ease-out infinite;animation-delay:" + c.ripDelay + ";transform-box:fill-box;transform-origin:50% 50%}";
    if (m === "radiant") {
      css += P + " .otter-real-pebbleg{animation:otter-real-tap 5.5s ease-in-out infinite;transform-box:fill-box;transform-origin:50% 50%}";
      css += P + " .otter-real-tailg{animation:otter-real-tail 5.5s ease-in-out infinite;transform-box:fill-box;transform-origin:8% 50%}";
      css += P + " .otter-real-drop1{animation:otter-real-drop 5.5s ease-out infinite}";
      css += P + " .otter-real-drop2{animation:otter-real-drop 5.5s ease-out infinite;animation-delay:.12s}";
      for (var i = 1; i <= 4; i++) {
        css += P + " .otter-real-mote" + i + "{animation:otter-real-mote 2.8s ease-in-out infinite;animation-delay:" + ((i - 1) * 0.7) + "s}";
      }
    }
    if (m === "tired") {
      css += P + " .otter-real-dangleg{animation:otter-real-dangle 5s ease-in-out infinite;transform-box:fill-box;transform-origin:50% 10%}";
      css += P + " .otter-real-yawng{animation:otter-real-yawn 8s ease-in-out infinite;transform-box:fill-box;transform-origin:50% 40%}";
    }
    if (m === "drained") {
      css += P + " .otter-real-kelpg{animation:otter-real-kelp 7s ease-in-out infinite;transform-box:fill-box;transform-origin:50% 50%}";
      css += P + " .otter-real-z1{animation:otter-real-z 7s ease-in-out infinite;opacity:0}";
      css += P + " .otter-real-z2{animation:otter-real-z 7s ease-in-out infinite;animation-delay:3.2s;opacity:0}";
    }
    // reduced motion: позы различимы статично (осадка, веки, камешек, ласты, ламинария)
    css += "@media (prefers-reduced-motion:reduce){" + P + " *{animation:none!important}}";
    return "<style>" + css + "</style>";
  }

  // --- Конфиг mood ------------------------------------------------------------
  // Канал выдры: осадка на воде + положение камешка/лапок + вибриссы/веки.

  var CFG = {
    radiant: { // высоко на воде, голова приподнята, постукивает камешком по груди, хвост шлёпает
      off: -5, dur: "2.2s", blink: "4.4s", rip: "2.6s", ripDelay: "1.3s",
      tilt: -4, eyes: eye("spark", 57, 119) + eye("spark", 75, 119), mouth: MOUTHS.smile,
      arms: pebbleAt(118, 108) + paw(107, 121, -32) + paw(129, 121, 32)
    },
    steady: { // ровный дрейф, камешек спокойно на груди под сложенными лапками
      off: 3, dur: "3.5s", blink: "5.4s", rip: "3.6s", ripDelay: "1.8s",
      tilt: 0, eyes: eye("open", 57, 119) + eye("open", 75, 119), mouth: MOUTHS.soft,
      arms: pebbleAt(118, 120) + paw(109, 127, -18) + paw(127, 127, 18)
    },
    tired: { // просела в воду, веки ~45%, камешек съехал на живот, лапка свесилась, зевок
      off: 13, dur: "5s", blink: "7s", rip: "4.6s", ripDelay: "2.3s",
      tilt: 3, earDroop: true, eyes: eye("tired", 57, 119) + eye("tired", 75, 119), mouth: MOUTHS.yawn,
      arms: pebbleAt(141, 130) + paw(132, 125, 26) +
        '<g class="otter-real-dangleg">' + paw(99, 139, -40) + "</g>"
    },
    drained: { // завёрнута в ламинарию-«плед», камешек-грелка в обнимку, глаза-щёлочки, «z»
      off: 17, dur: "7s", blink: "9s", rip: "6s", ripDelay: "3s",
      tilt: 5, earDroop: true, kelp: true,
      eyes: eye("slit", 57, 119) + eye("slit", 75, 119), mouth: MOUTHS.rest,
      arms: pebbleAt(122, 121) + paw(113, 128, -14) + paw(131, 128, 14)
    }
  };

  // --- Регистрация -------------------------------------------------------------

  window.registerPetStyle({
    petId: "otter",
    style: "real",
    render: function (mood) {
      var m = CFG[mood] ? mood : "steady";
      var c = CFG[m];
      return '<svg class="pet-svg pet-otter pet-otter-real is-' + m + '" viewBox="0 0 240 240" ' +
        'xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Pebble the sea otter, realistic, ' + m + '">' +
        styleFor(m, c) + scene(m, c) + "</svg>";
    }
  });
})();
