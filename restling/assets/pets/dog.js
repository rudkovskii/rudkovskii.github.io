/**
 * Biscuit / Бисквит — пёс (id: dog), золотисто-рыжий щенок, kawaii die-cut sticker.
 * Базовый модуль (стиль soft) по assets/pets/CONTRACT.md.
 * Видовые признаки: золотисто-песочное пухлое тело, ВИСЛЫЕ мягкие уши (главная
 * примета), округлая морда с маленьким носом, в radiant — крохотный язычок,
 * виляющий хвост. Уютный и добрый.
 * Sticker-стиль: залитый силуэт-«батон», один толстый тёплый контур на каждой
 * форме, die-cut белая обводка позади всего персонажа, большие блестящие глаза,
 * румяные щёки, мягкая тень-эллипс.
 * Все классы / @keyframes / id — с префиксом «dog-sticker-».
 */
(function () {
  "use strict";

  var BODY = "#e0a760";   // тёплый тан — тело
  var BELLY = "#f2cf98";  // светлый песочный — грудка/живот
  var EAR = "#cf9450";    // уши/пятна чуть темнее тела
  var SNOUT = "#f7e6c8";  // кремовая морда
  var OUT = "#2c2622";    // тёплый почти-чёрный контур
  var NOSE = "#2c2622";   // нос
  var INK = "#2c2622";    // глаза
  var CHEEK = "#f2a488";  // персиково-розовые щёки
  var TONGUE = "#ef8ba1"; // язычок
  var MOUTH = "#5a4a3c";  // тёплая линия рта
  var WHITE = "#ffffff";  // die-cut обводка + блики
  var SP = "#f5a623";     // искры

  var SW = 5;             // толщина контура форм
  var REDUCED = "@media (prefers-reduced-motion: reduce){.pet-dog *{animation:none !important}}";

  function glowDef(id, c1, o1, c2, o2) {
    return '<radialGradient id="' + id + '" cx="50%" cy="46%" r="56%">' +
      '<stop offset="0%" stop-color="' + c1 + '" stop-opacity="' + o1 + '"/>' +
      '<stop offset="55%" stop-color="' + c2 + '" stop-opacity="' + o2 + '"/>' +
      '<stop offset="100%" stop-color="' + c2 + '" stop-opacity="0"/>' +
      '</radialGradient>';
  }

  function shell(mood, style, defs, inner) {
    return '<svg viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg" ' +
      'class="pet-svg pet-dog is-' + mood + '" role="img" aria-label="Biscuit">' +
      '<style>' + style + REDUCED + '</style>' +
      '<defs>' + defs + '</defs>' + inner + '</svg>';
  }

  // die-cut: единый белый силуэт со смещением наружу ~7px (толстый белый stroke)
  function diecut(shapes) {
    return '<g class="dog-sticker-diecut" fill="' + WHITE + '" stroke="' + WHITE +
      '" stroke-width="15" stroke-linejoin="round" stroke-linecap="round">' +
      shapes + '</g>';
  }

  var STAR = 'M0 -6 L1.7 -1.7 L6 0 L1.7 1.7 L0 6 L-1.7 1.7 L-6 0 L-1.7 -1.7 Z';
  var ZP = 'M0 0 h8 l-8 8 h8';

  /* =========================================================
     RADIANT — прямая поза, широкая улыбка + язычок, виляющий хвост, искры
     ========================================================= */
  function radiant() {
    var style =
      '.pet-dog.is-radiant .dog-sticker-pet{transform-box:view-box;transform-origin:120px 205px;animation:dog-sticker-perk 4.6s ease-in-out infinite}' +
      '.pet-dog.is-radiant .dog-sticker-body{transform-box:view-box;transform-origin:120px 205px;animation:dog-sticker-breathe-r 2.2s ease-in-out infinite}' +
      '.pet-dog.is-radiant .dog-sticker-tail{transform-box:view-box;transform-origin:158px 182px;animation:dog-sticker-wag .55s ease-in-out infinite}' +
      '.pet-dog.is-radiant .dog-sticker-ear-l{transform-box:view-box;transform-origin:98px 98px;animation:dog-sticker-earflop-l 2.2s ease-in-out infinite}' +
      '.pet-dog.is-radiant .dog-sticker-ear-r{transform-box:view-box;transform-origin:142px 98px;animation:dog-sticker-earflop-r 2.2s ease-in-out infinite}' +
      '.pet-dog.is-radiant .dog-sticker-tongue{transform-box:view-box;transform-origin:120px 130px;animation:dog-sticker-pant .8s ease-in-out infinite}' +
      '.pet-dog.is-radiant .dog-sticker-aura{animation:dog-sticker-glow 2.2s ease-in-out infinite}' +
      '.pet-dog.is-radiant .dog-sticker-lid{transform-box:view-box;transform:scaleY(0);animation:dog-sticker-blink 4.4s linear infinite}' +
      '.pet-dog.is-radiant .dog-sticker-lid-l{transform-origin:105px 109px}' +
      '.pet-dog.is-radiant .dog-sticker-lid-r{transform-origin:135px 109px}' +
      '.pet-dog.is-radiant .dog-sticker-spark{transform-box:view-box;animation:dog-sticker-twinkle 1.9s ease-in-out infinite}' +
      '.pet-dog.is-radiant .dog-sticker-sp1{transform-origin:60px 66px}' +
      '.pet-dog.is-radiant .dog-sticker-sp2{transform-origin:182px 58px;animation-delay:.5s}' +
      '.pet-dog.is-radiant .dog-sticker-sp3{transform-origin:54px 108px;animation-delay:1s}' +
      '.pet-dog.is-radiant .dog-sticker-sp4{transform-origin:188px 104px;animation-delay:1.4s}' +
      '@keyframes dog-sticker-perk{0%,58%,100%{transform:scale(1,1)}66%{transform:scale(1.015,.985)}74%{transform:scale(.99,1.02)}82%{transform:scale(1,1)}}' +
      '@keyframes dog-sticker-breathe-r{0%,100%{transform:scale(1,1)}50%{transform:scale(1.03,.97)}}' +
      '@keyframes dog-sticker-wag{0%,100%{transform:rotate(-13deg)}50%{transform:rotate(15deg)}}' +
      '@keyframes dog-sticker-earflop-l{0%,100%{transform:rotate(0deg)}50%{transform:rotate(4deg)}}' +
      '@keyframes dog-sticker-earflop-r{0%,100%{transform:rotate(0deg)}50%{transform:rotate(-4deg)}}' +
      '@keyframes dog-sticker-pant{0%,100%{transform:scale(1,.9) translateY(0)}50%{transform:scale(1.05,1.1) translateY(2px)}}' +
      '@keyframes dog-sticker-glow{0%,100%{opacity:.75}50%{opacity:1}}' +
      '@keyframes dog-sticker-blink{0%,92%,100%{transform:scaleY(0)}94.5%,96.5%{transform:scaleY(1)}}' +
      '@keyframes dog-sticker-twinkle{0%,100%{opacity:.15;transform:scale(.5)}50%{opacity:1;transform:scale(1)}}';

    var defs = glowDef("dog-sticker-radiant-glow", "#ffdf9e", ".9", "#fff3d9", ".55");

    var sil =
      '<path d="M156 182 Q190 172 192 144 Q193 134 185 133"/>' +
      '<ellipse cx="120" cy="170" rx="45" ry="41"/>' +
      '<path d="M96 98 Q68 104 72 144 Q75 162 96 154 Q102 126 106 104 Z"/>' +
      '<path d="M144 98 Q172 104 168 144 Q165 162 144 154 Q138 126 134 104 Z"/>' +
      '<circle cx="120" cy="110" r="34"/>' +
      '<ellipse cx="103" cy="199" rx="12" ry="9"/>' +
      '<ellipse cx="137" cy="199" rx="12" ry="9"/>';

    var inner =
      '<g class="dog-sticker-aura aura"><circle cx="120" cy="130" r="96" fill="url(#dog-sticker-radiant-glow)"/></g>' +
      '<ellipse class="dog-sticker-shadow" cx="120" cy="212" rx="46" ry="7" fill="' + INK + '" opacity=".08"/>' +
      diecut(sil) +
      '<g class="dog-sticker-pet">' +
        // хвост — виляет, за телом
        '<g class="dog-sticker-tail extras"><path d="M156 182 Q190 172 192 144 Q193 134 185 133" fill="none" stroke="' + BODY + '" stroke-width="13" stroke-linecap="round"/></g>' +
        '<g class="dog-sticker-body body">' +
          // тело-«батон»
          '<ellipse cx="120" cy="170" rx="45" ry="41" fill="' + BODY + '" stroke="' + OUT + '" stroke-width="' + SW + '" stroke-linejoin="round"/>' +
          '<ellipse cx="120" cy="184" rx="27" ry="24" fill="' + BELLY + '"/>' +
          // вислые уши (за головой), жирные
          '<g class="dog-sticker-ear-l"><path d="M96 98 Q68 104 72 144 Q75 162 96 154 Q102 126 106 104 Z" fill="' + EAR + '" stroke="' + OUT + '" stroke-width="' + SW + '" stroke-linejoin="round"/></g>' +
          '<g class="dog-sticker-ear-r"><path d="M144 98 Q172 104 168 144 Q165 162 144 154 Q138 126 134 104 Z" fill="' + EAR + '" stroke="' + OUT + '" stroke-width="' + SW + '" stroke-linejoin="round"/></g>' +
          // округлая голова
          '<circle cx="120" cy="110" r="34" fill="' + BODY + '" stroke="' + OUT + '" stroke-width="' + SW + '"/>' +
          // передние лапки
          '<ellipse cx="103" cy="199" rx="12" ry="9" fill="' + BODY + '" stroke="' + OUT + '" stroke-width="' + SW + '"/>' +
          '<ellipse cx="137" cy="199" rx="12" ry="9" fill="' + BODY + '" stroke="' + OUT + '" stroke-width="' + SW + '"/>' +
          // морда
          '<ellipse cx="120" cy="124" rx="21" ry="17" fill="' + SNOUT + '"/>' +
          // большие блестящие глаза
          '<g class="dog-sticker-eyes eyes">' +
            '<ellipse cx="105" cy="108" rx="7.5" ry="8.5" fill="' + INK + '"/>' +
            '<ellipse cx="135" cy="108" rx="7.5" ry="8.5" fill="' + INK + '"/>' +
            '<circle cx="108" cy="104.5" r="2.7" fill="' + WHITE + '"/>' +
            '<circle cx="138" cy="104.5" r="2.7" fill="' + WHITE + '"/>' +
            '<circle cx="102.5" cy="111" r="1.3" fill="' + WHITE + '" opacity=".85"/>' +
            '<circle cx="132.5" cy="111" r="1.3" fill="' + WHITE + '" opacity=".85"/>' +
          '</g>' +
          '<g class="dog-sticker-lids eyelids">' +
            '<ellipse class="dog-sticker-lid dog-sticker-lid-l" cx="105" cy="108" rx="8.4" ry="9" fill="' + BODY + '"/>' +
            '<ellipse class="dog-sticker-lid dog-sticker-lid-r" cx="135" cy="108" rx="8.4" ry="9" fill="' + BODY + '"/>' +
          '</g>' +
          // маленький нос + широкая улыбка + язычок
          '<ellipse cx="120" cy="118" rx="5.5" ry="4.3" fill="' + NOSE + '"/>' +
          '<circle cx="118" cy="116.6" r="1.3" fill="' + WHITE + '" opacity=".7"/>' +
          '<g class="dog-sticker-mouth mouth" fill="none" stroke="' + MOUTH + '" stroke-width="2.4" stroke-linecap="round">' +
            '<path d="M120 122 L120 127"/>' +
            '<path d="M120 127 Q109 136 100 129"/>' +
            '<path d="M120 127 Q131 136 140 129"/>' +
          '</g>' +
          '<g class="dog-sticker-tongue extras"><path d="M114 128 Q114 142 120 142 Q126 142 126 128 Z" fill="' + TONGUE + '" stroke="' + OUT + '" stroke-width="2"/><path d="M120 130 L120 139" stroke="#d96e86" stroke-width="1.6" stroke-linecap="round"/></g>' +
          '<ellipse cx="93" cy="120" rx="8" ry="5.5" fill="' + CHEEK + '" opacity=".55"/>' +
          '<ellipse cx="147" cy="120" rx="8" ry="5.5" fill="' + CHEEK + '" opacity=".55"/>' +
        '</g>' +
      '</g>' +
      '<g class="dog-sticker-particles particles" fill="' + SP + '">' +
        '<g class="dog-sticker-spark dog-sticker-sp1"><path transform="translate(60,66)" d="' + STAR + '"/></g>' +
        '<g class="dog-sticker-spark dog-sticker-sp2"><path transform="translate(182,58) scale(.8)" d="' + STAR + '"/></g>' +
        '<g class="dog-sticker-spark dog-sticker-sp3"><path transform="translate(54,108) scale(.65)" d="' + STAR + '"/></g>' +
        '<g class="dog-sticker-spark dog-sticker-sp4"><path transform="translate(188,104) scale(.9)" d="' + STAR + '"/></g>' +
      '</g>';

    return shell("radiant", style, defs, inner);
  }

  /* =========================================================
     STEADY — спокойный, довольный, ровная поза, мягкий хвост
     ========================================================= */
  function steady() {
    var style =
      '.pet-dog.is-steady .dog-sticker-body{transform-box:view-box;transform-origin:120px 205px;animation:dog-sticker-breathe-s 3.5s ease-in-out infinite}' +
      '.pet-dog.is-steady .dog-sticker-tail{transform-box:view-box;transform-origin:158px 186px;animation:dog-sticker-sway 3.5s ease-in-out infinite}' +
      '.pet-dog.is-steady .dog-sticker-ear-l{transform-box:view-box;transform-origin:98px 100px;animation:dog-sticker-earsway-l 4s ease-in-out infinite}' +
      '.pet-dog.is-steady .dog-sticker-ear-r{transform-box:view-box;transform-origin:142px 100px;animation:dog-sticker-earsway-r 4s ease-in-out infinite}' +
      '.pet-dog.is-steady .dog-sticker-lid{transform-box:view-box;transform:scaleY(0);animation:dog-sticker-blink-s 5.2s linear infinite}' +
      '.pet-dog.is-steady .dog-sticker-lid-l{transform-origin:105px 114px}' +
      '.pet-dog.is-steady .dog-sticker-lid-r{transform-origin:135px 114px}' +
      '@keyframes dog-sticker-breathe-s{0%,100%{transform:scale(1)}50%{transform:scale(1.022,.978)}}' +
      '@keyframes dog-sticker-sway{0%,100%{transform:rotate(-6deg)}50%{transform:rotate(6deg)}}' +
      '@keyframes dog-sticker-earsway-l{0%,100%{transform:rotate(0deg)}50%{transform:rotate(2.5deg)}}' +
      '@keyframes dog-sticker-earsway-r{0%,100%{transform:rotate(0deg)}50%{transform:rotate(-2.5deg)}}' +
      '@keyframes dog-sticker-blink-s{0%,93%,100%{transform:scaleY(0)}95.5%,97.5%{transform:scaleY(1)}}';

    var defs = glowDef("dog-sticker-steady-glow", "#bfe4cd", ".8", "#e8f3ea", ".5");

    var sil =
      '<path d="M156 186 Q192 180 194 154 Q195 144 187 143"/>' +
      '<ellipse cx="120" cy="172" rx="47" ry="40"/>' +
      '<path d="M94 100 Q66 108 72 148 Q76 166 96 158 Q102 130 105 106 Z"/>' +
      '<path d="M146 100 Q174 108 168 148 Q164 166 144 158 Q138 130 135 106 Z"/>' +
      '<circle cx="120" cy="114" r="34"/>' +
      '<ellipse cx="103" cy="200" rx="13" ry="9"/>' +
      '<ellipse cx="137" cy="200" rx="13" ry="9"/>';

    var inner =
      '<g class="dog-sticker-aura aura"><circle cx="120" cy="140" r="92" fill="url(#dog-sticker-steady-glow)"/></g>' +
      '<ellipse class="dog-sticker-shadow" cx="120" cy="212" rx="50" ry="7" fill="' + INK + '" opacity=".08"/>' +
      diecut(sil) +
      '<g class="dog-sticker-pet">' +
        '<g class="dog-sticker-tail extras"><path d="M156 186 Q192 180 194 154 Q195 144 187 143" fill="none" stroke="' + BODY + '" stroke-width="13" stroke-linecap="round"/></g>' +
        '<g class="dog-sticker-body body">' +
          '<ellipse cx="120" cy="172" rx="47" ry="40" fill="' + BODY + '" stroke="' + OUT + '" stroke-width="' + SW + '" stroke-linejoin="round"/>' +
          '<ellipse cx="120" cy="186" rx="28" ry="23" fill="' + BELLY + '"/>' +
          '<g class="dog-sticker-ear-l"><path d="M94 100 Q66 108 72 148 Q76 166 96 158 Q102 130 105 106 Z" fill="' + EAR + '" stroke="' + OUT + '" stroke-width="' + SW + '" stroke-linejoin="round"/></g>' +
          '<g class="dog-sticker-ear-r"><path d="M146 100 Q174 108 168 148 Q164 166 144 158 Q138 130 135 106 Z" fill="' + EAR + '" stroke="' + OUT + '" stroke-width="' + SW + '" stroke-linejoin="round"/></g>' +
          '<circle cx="120" cy="114" r="34" fill="' + BODY + '" stroke="' + OUT + '" stroke-width="' + SW + '"/>' +
          '<ellipse cx="103" cy="200" rx="13" ry="9" fill="' + BODY + '" stroke="' + OUT + '" stroke-width="' + SW + '"/>' +
          '<ellipse cx="137" cy="200" rx="13" ry="9" fill="' + BODY + '" stroke="' + OUT + '" stroke-width="' + SW + '"/>' +
          '<ellipse cx="120" cy="128" rx="21" ry="17" fill="' + SNOUT + '"/>' +
          '<g class="dog-sticker-eyes eyes">' +
            '<ellipse cx="105" cy="113" rx="6.8" ry="7.6" fill="' + INK + '"/>' +
            '<ellipse cx="135" cy="113" rx="6.8" ry="7.6" fill="' + INK + '"/>' +
            '<circle cx="107.5" cy="110" r="2.3" fill="' + WHITE + '"/>' +
            '<circle cx="137.5" cy="110" r="2.3" fill="' + WHITE + '"/>' +
          '</g>' +
          '<g class="dog-sticker-lids eyelids">' +
            '<ellipse class="dog-sticker-lid dog-sticker-lid-l" cx="105" cy="113" rx="7.6" ry="8" fill="' + BODY + '"/>' +
            '<ellipse class="dog-sticker-lid dog-sticker-lid-r" cx="135" cy="113" rx="7.6" ry="8" fill="' + BODY + '"/>' +
          '</g>' +
          '<ellipse cx="120" cy="122" rx="5.5" ry="4.3" fill="' + NOSE + '"/>' +
          '<circle cx="118" cy="120.6" r="1.3" fill="' + WHITE + '" opacity=".7"/>' +
          '<g class="dog-sticker-mouth mouth" fill="none" stroke="' + MOUTH + '" stroke-width="2.4" stroke-linecap="round">' +
            '<path d="M120 126 L120 131"/>' +
            '<path d="M120 131 Q111 138 104 133"/>' +
            '<path d="M120 131 Q129 138 136 133"/>' +
          '</g>' +
          '<ellipse cx="92" cy="124" rx="8" ry="5.5" fill="' + CHEEK + '" opacity=".5"/>' +
          '<ellipse cx="148" cy="124" rx="8" ry="5.5" fill="' + CHEEK + '" opacity=".5"/>' +
        '</g>' +
      '</g>';

    return shell("steady", style, defs, inner);
  }

  /* =========================================================
     TIRED — уши и голова обвисли, полуприкрытые глаза, редкий зевок
     ========================================================= */
  function tired() {
    var style =
      '.pet-dog.is-tired .dog-sticker-body{transform-box:view-box;transform-origin:120px 205px;animation:dog-sticker-breathe-t 5s ease-in-out infinite}' +
      '.pet-dog.is-tired .dog-sticker-head{transform-box:view-box;transform-origin:120px 150px;animation:dog-sticker-droop 5s ease-in-out infinite}' +
      '.pet-dog.is-tired .dog-sticker-tail{transform-box:view-box;transform-origin:160px 194px;animation:dog-sticker-sway-t 5s ease-in-out infinite}' +
      '.pet-dog.is-tired .dog-sticker-lid{transform-box:view-box;transform:scaleY(.5);animation:dog-sticker-blink-t 6s linear infinite}' +
      '.pet-dog.is-tired .dog-sticker-lid-l{transform-origin:104px 128px}' +
      '.pet-dog.is-tired .dog-sticker-lid-r{transform-origin:136px 128px}' +
      '.pet-dog.is-tired .dog-sticker-mouth{transform-box:view-box;transform-origin:120px 146px;transform:scale(1,.15);animation:dog-sticker-yawn 7.5s ease-in-out infinite}' +
      '@keyframes dog-sticker-breathe-t{0%,100%{transform:scale(1)}50%{transform:scale(1.015,.985)}}' +
      '@keyframes dog-sticker-droop{0%,100%{transform:rotate(0deg) translateY(0)}50%{transform:rotate(-2deg) translateY(1.5px)}}' +
      '@keyframes dog-sticker-sway-t{0%,100%{transform:rotate(0deg)}50%{transform:rotate(3deg)}}' +
      '@keyframes dog-sticker-blink-t{0%,88%,100%{transform:scaleY(.5)}91.5%,93%{transform:scaleY(1)}}' +
      '@keyframes dog-sticker-yawn{0%,52%,100%{transform:scale(1,.15)}60%,76%{transform:scale(1.1,1)}86%{transform:scale(1,.15)}}';

    var defs = glowDef("dog-sticker-tired-glow", "#d9e1f1", ".65", "#edf0f8", ".4");

    var sil =
      '<path d="M158 194 Q190 194 192 176 Q192 168 185 168"/>' +
      '<ellipse cx="120" cy="178" rx="52" ry="35"/>' +
      '<path d="M90 128 Q60 138 68 172 Q72 186 92 178 Q98 152 100 132 Z"/>' +
      '<path d="M150 128 Q180 138 172 172 Q168 186 148 178 Q142 152 140 132 Z"/>' +
      '<circle cx="120" cy="132" r="33"/>' +
      '<ellipse cx="98" cy="204" rx="13" ry="8"/>' +
      '<ellipse cx="142" cy="204" rx="13" ry="8"/>';

    var inner =
      '<g class="dog-sticker-aura aura"><circle cx="120" cy="152" r="88" fill="url(#dog-sticker-tired-glow)"/></g>' +
      '<ellipse class="dog-sticker-shadow" cx="120" cy="212" rx="58" ry="7" fill="' + INK + '" opacity=".07"/>' +
      diecut(sil) +
      '<g class="dog-sticker-pet">' +
        '<g class="dog-sticker-tail extras"><path d="M158 194 Q190 194 192 176 Q192 168 185 168" fill="none" stroke="' + BODY + '" stroke-width="12" stroke-linecap="round"/></g>' +
        '<g class="dog-sticker-body body">' +
          '<ellipse cx="120" cy="178" rx="52" ry="35" fill="' + BODY + '" stroke="' + OUT + '" stroke-width="' + SW + '" stroke-linejoin="round"/>' +
          '<ellipse cx="120" cy="188" rx="30" ry="19" fill="' + BELLY + '"/>' +
          '<ellipse cx="98" cy="204" rx="13" ry="8" fill="' + BODY + '" stroke="' + OUT + '" stroke-width="' + SW + '"/>' +
          '<ellipse cx="142" cy="204" rx="13" ry="8" fill="' + BODY + '" stroke="' + OUT + '" stroke-width="' + SW + '"/>' +
          '<g class="dog-sticker-head head">' +
            // обвисшие уши — свисают ниже
            '<path d="M90 128 Q60 138 68 172 Q72 186 92 178 Q98 152 100 132 Z" fill="' + EAR + '" stroke="' + OUT + '" stroke-width="' + SW + '" stroke-linejoin="round"/>' +
            '<path d="M150 128 Q180 138 172 172 Q168 186 148 178 Q142 152 140 132 Z" fill="' + EAR + '" stroke="' + OUT + '" stroke-width="' + SW + '" stroke-linejoin="round"/>' +
            '<circle cx="120" cy="132" r="33" fill="' + BODY + '" stroke="' + OUT + '" stroke-width="' + SW + '"/>' +
            '<ellipse cx="120" cy="145" rx="21" ry="16" fill="' + SNOUT + '"/>' +
            // полуприкрытые глаза
            '<g class="dog-sticker-eyes eyes">' +
              '<ellipse cx="104" cy="130" rx="6.6" ry="7.2" fill="' + INK + '"/>' +
              '<ellipse cx="136" cy="130" rx="6.6" ry="7.2" fill="' + INK + '"/>' +
              '<circle cx="106" cy="127.5" r="1.8" fill="' + WHITE + '" opacity=".9"/>' +
              '<circle cx="138" cy="127.5" r="1.8" fill="' + WHITE + '" opacity=".9"/>' +
            '</g>' +
            '<g class="dog-sticker-lids eyelids">' +
              '<ellipse class="dog-sticker-lid dog-sticker-lid-l" cx="104" cy="130" rx="7.4" ry="7.6" fill="' + BODY + '"/>' +
              '<ellipse class="dog-sticker-lid dog-sticker-lid-r" cx="136" cy="130" rx="7.4" ry="7.6" fill="' + BODY + '"/>' +
            '</g>' +
            '<ellipse cx="120" cy="139" rx="5.4" ry="4.2" fill="' + NOSE + '"/>' +
            // зевок
            '<g class="dog-sticker-mouth mouth"><ellipse cx="120" cy="150" rx="7" ry="9" fill="' + MOUTH + '"/><ellipse cx="120" cy="153" rx="4" ry="4.5" fill="' + TONGUE + '"/></g>' +
            '<ellipse cx="92" cy="141" rx="7.5" ry="5" fill="' + CHEEK + '" opacity=".45"/>' +
            '<ellipse cx="148" cy="141" rx="7.5" ry="5" fill="' + CHEEK + '" opacity=".45"/>' +
          '</g>' +
        '</g>' +
      '</g>';

    return shell("tired", style, defs, inner);
  }

  /* =========================================================
     DRAINED — свернулся/лежит низко, глаза закрыты, парят «z z»
     ========================================================= */
  function drained() {
    var style =
      '.pet-dog.is-drained .dog-sticker-body{transform-box:view-box;transform-origin:120px 200px;animation:dog-sticker-breathe-d 7s ease-in-out infinite}' +
      '.pet-dog.is-drained .dog-sticker-ear-l{transform-box:view-box;transform-origin:96px 168px;animation:dog-sticker-eartwitch 9s ease-in-out infinite}' +
      '.pet-dog.is-drained .dog-sticker-z{opacity:0;animation:dog-sticker-zfloat 7s ease-in-out infinite}' +
      '.pet-dog.is-drained .dog-sticker-z2{animation-delay:2.3s}' +
      '.pet-dog.is-drained .dog-sticker-z3{animation-delay:4.6s}' +
      '@keyframes dog-sticker-breathe-d{0%,100%{transform:scale(1)}50%{transform:scale(1.02,1.03)}}' +
      '@keyframes dog-sticker-eartwitch{0%,90%,100%{transform:rotate(0deg)}93%{transform:rotate(-7deg)}96%{transform:rotate(3deg)}}' +
      '@keyframes dog-sticker-zfloat{0%{opacity:0;transform:translateY(7px)}14%{opacity:.85}55%,100%{opacity:0;transform:translateY(-16px)}}';

    var defs = glowDef("dog-sticker-drained-glow", "#dfd5f0", ".6", "#f0ecf7", ".35");

    var sil =
      '<ellipse cx="120" cy="182" rx="62" ry="34"/>' +
      '<circle cx="88" cy="172" r="30"/>' +
      '<path d="M92 156 Q66 150 62 176 Q60 190 78 190 Q86 176 92 160 Z"/>';

    var inner =
      '<g class="dog-sticker-aura aura"><circle cx="120" cy="176" r="86" fill="url(#dog-sticker-drained-glow)"/></g>' +
      '<ellipse class="dog-sticker-shadow" cx="122" cy="210" rx="60" ry="7" fill="' + INK + '" opacity=".07"/>' +
      diecut(sil) +
      '<g class="dog-sticker-pet">' +
        '<g class="dog-sticker-body body">' +
          // свернувшееся лежащее тело
          '<ellipse cx="120" cy="182" rx="62" ry="34" fill="' + BODY + '" stroke="' + OUT + '" stroke-width="' + SW + '" stroke-linejoin="round"/>' +
          '<ellipse cx="140" cy="190" rx="34" ry="20" fill="' + BELLY + '"/>' +
          // хвост укрывает бок
          '<path d="M168 176 Q190 172 190 192 Q189 202 176 200" fill="none" stroke="' + BODY + '" stroke-width="12" stroke-linecap="round"/>' +
          // вислое ухо свисает
          '<g class="dog-sticker-ear-l"><path d="M92 156 Q66 150 62 176 Q60 190 78 190 Q86 176 92 160 Z" fill="' + EAR + '" stroke="' + OUT + '" stroke-width="' + SW + '" stroke-linejoin="round"/></g>' +
          // голова уложена
          '<circle cx="88" cy="172" r="30" fill="' + BODY + '" stroke="' + OUT + '" stroke-width="' + SW + '"/>' +
          '<ellipse cx="80" cy="184" rx="18" ry="13" fill="' + SNOUT + '"/>' +
          // закрытые глаза — мягкие дуги
          '<g class="dog-sticker-eyes eyes" fill="none" stroke="' + INK + '" stroke-width="2.6" stroke-linecap="round">' +
            '<path d="M68 174 q5 4.5 10 0"/>' +
            '<path d="M88 174 q5 4.5 10 0"/>' +
          '</g>' +
          '<ellipse cx="78" cy="184" rx="4.6" ry="3.6" fill="' + NOSE + '"/>' +
          '<path d="M74 190 q4 3 8 0" fill="none" stroke="' + MOUTH + '" stroke-width="2" stroke-linecap="round"/>' +
          '<ellipse cx="66" cy="181" rx="6" ry="4" fill="' + CHEEK + '" opacity=".5"/>' +
        '</g>' +
      '</g>' +
      '<g class="dog-sticker-particles particles" fill="none" stroke="#9c8bc0" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">' +
        '<g class="dog-sticker-z dog-sticker-z1"><path transform="translate(112,150) scale(.7)" d="' + ZP + '"/></g>' +
        '<g class="dog-sticker-z dog-sticker-z2"><path transform="translate(126,134) scale(.9)" d="' + ZP + '"/></g>' +
        '<g class="dog-sticker-z dog-sticker-z3"><path transform="translate(140,116) scale(1.15)" d="' + ZP + '"/></g>' +
      '</g>';

    return shell("drained", style, defs, inner);
  }

  window.registerPet({
    id: "dog",
    nameEn: "Biscuit",
    nameRu: "Бисквит",
    render: function (mood) {
      switch (mood) {
        case "radiant": return radiant();
        case "tired": return tired();
        case "drained": return drained();
        case "steady":
        default: return steady();
      }
    }
  });
})();
