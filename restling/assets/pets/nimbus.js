/* Nimbus / Нимбус — облачная овечка ("погода твоего утра").
   Модуль питомца по assets/pets/CONTRACT.md: window.registerPet + render(mood) -> inline-SVG строка.
   Канал состояния: объём и цвет облака + спутник (солнышко / месяц). */
(function () {
  "use strict";

  var INK = "#3E3A47";           // тёплый графит (не чёрный)
  var CLOUD = "#FDFBF7";         // облачно-белый
  var CLOUD_SHADE = "#E9E6FA";   // лавандовая тень облака
  var CLOUD_TIRED = "#ECEAF3";   // "сдувшееся" посеревшее облако
  var CLOUD_TIRED_SHADE = "#DDD9EA";
  var FACE = "#9C8BC0";          // мордочка и ножки
  var FACE_DEEP = "#84719F";     // тональная (на ~18% темнее) для ресниц/рта
  var EAR = "#8F7DB5";           // ушки-листики
  var CHEEK = "#F2B8C6";
  var GOLD = "#F5A623";
  var GRASS = "#5FAF7E";

  var STATE_BG = {
    radiant: "#FFF3D9",
    steady: "#E8F3EA",
    tired: "#EDF0F8",
    drained: "#F0ECF7"
  };

  /* ------------------------------------------------------------------ CSS.
     Все keyframes определены один раз и одинаковы во всех mood-вариантах,
     поэтому несколько экземпляров разных mood на одной странице не конфликтуют.
     Селекторы жёстко заскоуплены на .pet-nimbus.is-<mood>. */
  var CSS =
    /* transform-опоры */
    '.pet-nimbus .nimbus-pet,.pet-nimbus .nimbus-breather{transform-box:fill-box;transform-origin:50% 100%}' +
    '.pet-nimbus .nimbus-puff{transform-box:fill-box;transform-origin:50% 55%}' +
    '.pet-nimbus .nimbus-eyes,.pet-nimbus .nimbus-spark,.pet-nimbus .nimbus-poof,.pet-nimbus .nimbus-z,.pet-nimbus .nimbus-yawn,.pet-nimbus .nimbus-sat,.pet-nimbus .nimbus-rays,.pet-nimbus .nimbus-ground{transform-box:fill-box;transform-origin:50% 50%}' +
    '.pet-nimbus .nimbus-tail{transform-box:fill-box;transform-origin:100% 50%}' +
    '.pet-nimbus .nimbus-grass{transform-box:fill-box;transform-origin:50% 100%}' +
    /* общие keyframes */
    '@keyframes nimbus-breathe{0%,100%{transform:scale(1)}50%{transform:scale(1.025,1.045)}}' +
    '@keyframes nimbus-breathe-soft{0%,100%{transform:scale(1)}50%{transform:scale(1.015,1.028)}}' +
    '@keyframes nimbus-breathe-deep{0%,100%{transform:scale(1)}50%{transform:scale(1.02,1.045)}}' +
    '@keyframes nimbus-puffb{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}' +
    '@keyframes nimbus-blink{0%,91.5%,100%{transform:scaleY(1)}94%,95.5%{transform:scaleY(0.08)}}' +
    '@keyframes nimbus-wag{0%,100%{transform:rotate(0deg)}50%{transform:rotate(16deg)}}' +
    '@keyframes nimbus-bounce{0%,100%{transform:translateY(0) scale(1)}12%{transform:translateY(0) scale(1.05,0.93)}38%{transform:translateY(-9px) scale(0.97,1.04)}60%{transform:translateY(0) scale(1.04,0.95)}78%{transform:translateY(0) scale(1)}}' +
    '@keyframes nimbus-shadowk{0%,100%{transform:scale(1);opacity:.7}38%{transform:scale(.82);opacity:.45}}' +
    '@keyframes nimbus-sunbob{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-5px) rotate(6deg)}}' +
    '@keyframes nimbus-moonbob{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-4px) rotate(-4deg)}}' +
    '@keyframes nimbus-spin{to{transform:rotate(360deg)}}' +
    '@keyframes nimbus-twinkle{0%,100%{opacity:.2;transform:scale(.55)}50%{opacity:1;transform:scale(1.15)}}' +
    '@keyframes nimbus-twinkle-slow{0%,100%{opacity:.15;transform:scale(.7)}50%{opacity:.7;transform:scale(1)}}' +
    '@keyframes nimbus-poofk{0%,52%{opacity:0;transform:scale(.3)}64%{opacity:.85;transform:scale(1)}88%,100%{opacity:0;transform:scale(1.6)}}' +
    '@keyframes nimbus-graze{0%,40%,96%,100%{transform:rotate(0deg)}55%,80%{transform:rotate(18deg)}}' +
    '@keyframes nimbus-sway{0%,100%{transform:rotate(0deg)}50%{transform:rotate(5deg)}}' +
    '@keyframes nimbus-nod{0%,100%{transform:rotate(4deg)}50%{transform:rotate(7deg)}}' +
    '@keyframes nimbus-yawnk{0%,50%,92%,100%{transform:scale(1)}62%,80%{transform:scale(1.8,2.9)}}' +
    '@keyframes nimbus-peek{0%,86%,100%{transform:scaleY(1)}90%,93%{transform:scaleY(2.1)}}' +
    '@keyframes nimbus-zzz{0%{opacity:0;transform:translate(0,0) rotate(0deg) scale(.8)}14%{opacity:.85}60%{opacity:0;transform:translate(8px,-30px) rotate(14deg) scale(1.1)}100%{opacity:0;transform:translate(8px,-30px) rotate(14deg) scale(1.1)}}' +
    /* radiant: пружинит, солнышко, искры, мини-облачка от ножек */
    '.pet-nimbus.is-radiant .nimbus-pet{animation:nimbus-bounce 2.2s ease-in-out infinite}' +
    '.pet-nimbus.is-radiant .nimbus-breather{animation:nimbus-breathe 2.2s ease-in-out infinite}' +
    '.pet-nimbus.is-radiant .nimbus-puff{animation:nimbus-puffb 2.2s ease-in-out infinite}' +
    '.pet-nimbus.is-radiant .nimbus-pf2{animation-delay:.25s}.pet-nimbus.is-radiant .nimbus-pf3{animation-delay:.5s}.pet-nimbus.is-radiant .nimbus-pf5{animation-delay:.35s}.pet-nimbus.is-radiant .nimbus-pf6{animation-delay:.15s}' +
    '.pet-nimbus.is-radiant .nimbus-eyes{animation:nimbus-blink 3.8s ease-in-out infinite}' +
    '.pet-nimbus.is-radiant .nimbus-tail{animation:nimbus-wag 1.1s ease-in-out infinite}' +
    '.pet-nimbus.is-radiant .nimbus-sat{animation:nimbus-sunbob 4.4s ease-in-out infinite}' +
    '.pet-nimbus.is-radiant .nimbus-rays{animation:nimbus-spin 16s linear infinite}' +
    '.pet-nimbus.is-radiant .nimbus-spark{animation:nimbus-twinkle 2.2s ease-in-out infinite}' +
    '.pet-nimbus.is-radiant .nimbus-sp2{animation-delay:.7s}.pet-nimbus.is-radiant .nimbus-sp3{animation-delay:1.3s}.pet-nimbus.is-radiant .nimbus-sp4{animation-delay:1.8s}' +
    '.pet-nimbus.is-radiant .nimbus-poof{animation:nimbus-poofk 2.2s ease-out infinite}' +
    '.pet-nimbus.is-radiant .nimbus-poof-b{animation-delay:.12s}' +
    '.pet-nimbus.is-radiant .nimbus-ground{animation:nimbus-shadowk 2.2s ease-in-out infinite}' +
    /* steady: ровное дыхание, неспешно пасётся, хвостик покачивается */
    '.pet-nimbus.is-steady .nimbus-breather{animation:nimbus-breathe 3.5s ease-in-out infinite}' +
    '.pet-nimbus.is-steady .nimbus-puff{animation:nimbus-puffb 3.5s ease-in-out infinite}' +
    '.pet-nimbus.is-steady .nimbus-pf2{animation-delay:.5s}.pet-nimbus.is-steady .nimbus-pf3{animation-delay:.9s}.pet-nimbus.is-steady .nimbus-pf5{animation-delay:.6s}.pet-nimbus.is-steady .nimbus-pf6{animation-delay:.3s}' +
    '.pet-nimbus.is-steady .nimbus-eyes{animation:nimbus-blink 5.2s ease-in-out infinite}' +
    '.pet-nimbus.is-steady .nimbus-head{transform-box:view-box;transform-origin:148px 134px;animation:nimbus-graze 7s ease-in-out infinite}' +
    '.pet-nimbus.is-steady .nimbus-tail{animation:nimbus-wag 3.5s ease-in-out infinite}' +
    '.pet-nimbus.is-steady .nimbus-grass{animation:nimbus-sway 3.5s ease-in-out infinite}' +
    '.pet-nimbus.is-steady .nimbus-grass-b{animation-delay:1.2s}' +
    /* tired: медленнее, осел, полуприкрытые глаза, зевает */
    '.pet-nimbus.is-tired .nimbus-breather{animation:nimbus-breathe-soft 5s ease-in-out infinite}' +
    '.pet-nimbus.is-tired .nimbus-puff{animation:nimbus-puffb 5s ease-in-out infinite}' +
    '.pet-nimbus.is-tired .nimbus-pf2{animation-delay:.8s}.pet-nimbus.is-tired .nimbus-pf3{animation-delay:1.4s}.pet-nimbus.is-tired .nimbus-pf5{animation-delay:1s}.pet-nimbus.is-tired .nimbus-pf6{animation-delay:.5s}' +
    '.pet-nimbus.is-tired .nimbus-eyes{animation:nimbus-blink 7s ease-in-out infinite}' +
    '.pet-nimbus.is-tired .nimbus-head{transform-box:view-box;transform-origin:150px 132px;animation:nimbus-nod 5s ease-in-out infinite}' +
    '.pet-nimbus.is-tired .nimbus-yawn{animation:nimbus-yawnk 6.5s ease-in-out infinite}' +
    /* drained: лежит, очень медленное дыхание, месяц, редкие "z" */
    '.pet-nimbus.is-drained .nimbus-breather{animation:nimbus-breathe-deep 7s ease-in-out infinite}' +
    '.pet-nimbus.is-drained .nimbus-puff{animation:nimbus-puffb 7s ease-in-out infinite}' +
    '.pet-nimbus.is-drained .nimbus-pf2{animation-delay:1.2s}.pet-nimbus.is-drained .nimbus-pf3{animation-delay:2.1s}.pet-nimbus.is-drained .nimbus-pf5{animation-delay:1.6s}.pet-nimbus.is-drained .nimbus-pf6{animation-delay:.8s}' +
    '.pet-nimbus.is-drained .nimbus-eyes{animation:nimbus-peek 9s ease-in-out infinite}' +
    '.pet-nimbus.is-drained .nimbus-sat{animation:nimbus-moonbob 8s ease-in-out infinite}' +
    '.pet-nimbus.is-drained .nimbus-spark{animation:nimbus-twinkle-slow 5s ease-in-out infinite}' +
    '.pet-nimbus.is-drained .nimbus-sp2{animation-delay:2.2s}' +
    '.pet-nimbus.is-drained .nimbus-z{opacity:0;animation:nimbus-zzz 7s ease-in infinite}' +
    '.pet-nimbus.is-drained .nimbus-z2{animation-delay:2.3s}.pet-nimbus.is-drained .nimbus-z3{animation-delay:4.6s}' +
    /* reduced motion: статичные позы различимы (поза + веки + аура + спутник) */
    '@media (prefers-reduced-motion:reduce){.pet-nimbus,.pet-nimbus *{animation:none !important}}';

  /* ------------------------------------------------------------ детали */

  function aura(mood, cy, r) {
    var bg = STATE_BG[mood];
    return '<defs><radialGradient id="nimbus-' + mood + '-aura" cx="50%" cy="45%" r="60%">' +
      '<stop offset="0%" stop-color="' + bg + '" stop-opacity="0.95"/>' +
      '<stop offset="65%" stop-color="' + bg + '" stop-opacity="0.55"/>' +
      '<stop offset="100%" stop-color="' + bg + '" stop-opacity="0"/>' +
      '</radialGradient></defs>' +
      '<g class="aura nimbus-aura"><circle cx="120" cy="' + cy + '" r="' + r + '" fill="url(#nimbus-' + mood + '-aura)"/></g>';
  }

  function groundShadow(rx, op) {
    return '<ellipse class="nimbus-ground" cx="118" cy="202" rx="' + rx + '" ry="6" fill="' + CLOUD_SHADE + '" opacity="' + op + '"/>';
  }

  /* кучевое тело: 5-6 перекрывающихся кругов + тональная тень снизу */
  function cloudStanding(fill, shade) {
    return '<g class="body nimbus-cloud">' +
      '<circle cx="86" cy="148" r="29" fill="' + shade + '"/>' +
      '<circle cx="102" cy="160" r="24" fill="' + shade + '"/>' +
      '<circle cx="131" cy="160" r="23" fill="' + shade + '"/>' +
      '<circle class="nimbus-puff nimbus-pf1" cx="85" cy="142" r="30" fill="' + fill + '"/>' +
      '<circle class="nimbus-puff nimbus-pf2" cx="145" cy="142" r="28" fill="' + fill + '"/>' +
      '<circle class="nimbus-puff nimbus-pf3" cx="100" cy="154" r="25" fill="' + fill + '"/>' +
      '<circle class="nimbus-puff nimbus-pf4" cx="129" cy="155" r="24" fill="' + fill + '"/>' +
      '<circle class="nimbus-puff nimbus-pf5" cx="114" cy="126" r="34" fill="' + fill + '"/>' +
      '<circle class="nimbus-puff nimbus-pf6" cx="141" cy="119" r="21" fill="' + fill + '"/>' +
      '</g>';
  }

  function legsStanding() {
    return '<g class="nimbus-legs" stroke="' + FACE + '" stroke-width="5" stroke-linecap="round">' +
      '<line x1="88" y1="158" x2="86" y2="197"/>' +
      '<line x1="106" y1="164" x2="105" y2="197"/>' +
      '<line x1="126" y1="164" x2="126" y2="197"/>' +
      '<line x1="144" y1="158" x2="146" y2="197"/>' +
      '</g>';
  }

  function legsTired() {
    return '<g class="nimbus-legs" stroke="' + FACE + '" stroke-width="5" stroke-linecap="round" fill="none">' +
      '<path d="M92,176 Q87,186 90,197"/>' +
      '<path d="M108,179 Q105,188 107,197"/>' +
      '<path d="M124,179 Q123,188 125,197"/>' +
      '<path d="M139,176 Q142,186 140,197"/>' +
      '</g>';
  }

  function tailPuff(fill) {
    return '<circle class="nimbus-tail" cx="72" cy="136" r="8" fill="' + fill + '"/>';
  }

  function eyesOpen(r, hi, extraSpark) {
    return '<g class="eyes nimbus-eyes">' +
      '<circle cx="160" cy="117" r="' + r + '" fill="' + INK + '"/>' +
      '<circle cx="174" cy="117" r="' + r + '" fill="' + INK + '"/>' +
      '<circle cx="161.3" cy="115.4" r="' + hi + '" fill="#FFFFFF"/>' +
      '<circle cx="175.3" cy="115.4" r="' + hi + '" fill="#FFFFFF"/>' +
      (extraSpark
        ? '<circle cx="158.7" cy="118.6" r="0.8" fill="#FFFFFF" opacity="0.85"/><circle cx="172.7" cy="118.6" r="0.8" fill="#FFFFFF" opacity="0.85"/>'
        : '') +
      '</g>';
  }

  function eyesTired() {
    return '<g class="eyes nimbus-eyes">' +
      '<circle cx="160" cy="118" r="3.3" fill="' + INK + '"/>' +
      '<circle cx="174" cy="118" r="3.3" fill="' + INK + '"/>' +
      '<circle cx="161" cy="117" r="0.9" fill="#FFFFFF" opacity="0.7"/>' +
      '<circle cx="175" cy="117" r="0.9" fill="#FFFFFF" opacity="0.7"/>' +
      /* веки закрывают ~45% глаза (в цвет мордочки) + линия ресниц */
      '<g class="eyelids nimbus-eyelids">' +
      '<rect x="156.2" y="113.8" width="7.6" height="3.6" fill="' + FACE + '"/>' +
      '<rect x="170.2" y="113.8" width="7.6" height="3.6" fill="' + FACE + '"/>' +
      '<path d="M156.6,117.4 L163.4,117.4" stroke="' + FACE_DEEP + '" stroke-width="1.4" stroke-linecap="round"/>' +
      '<path d="M170.6,117.4 L177.4,117.4" stroke="' + FACE_DEEP + '" stroke-width="1.4" stroke-linecap="round"/>' +
      '</g></g>';
  }

  function headStanding(o) {
    var earL = '<path d="M155,103 Q144,92 146,81 Q158,86 162,100 Z" fill="' + EAR + '"/>';
    var earR = o.droopEar
      ? '<path d="M176,103 Q190,101 194,110 Q184,113 173,106 Z" fill="' + EAR + '"/>'
      : '<path d="M177,102 Q187,89 185,78 Q173,84 171,99 Z" fill="' + EAR + '"/>';
    return '<g class="head nimbus-head">' +
      '<circle cx="152" cy="112" r="22" fill="' + o.fluff + '"/>' +
      earL + earR +
      '<ellipse cx="166" cy="120" rx="19" ry="18" fill="' + FACE + '"/>' +
      '<circle cx="161" cy="101" r="8" fill="' + o.fluff + '"/>' +
      '<circle cx="171" cy="103" r="7" fill="' + o.fluff + '"/>' +
      '<circle cx="153" cy="104" r="6" fill="' + o.fluff + '"/>' +
      o.eyes +
      '<g class="cheeks">' +
      '<circle cx="154" cy="127" r="' + o.cheekR + '" fill="' + CHEEK + '" opacity="' + o.cheekOp + '"/>' +
      '<circle cx="179" cy="127" r="' + o.cheekR + '" fill="' + CHEEK + '" opacity="' + o.cheekOp + '"/>' +
      '</g>' +
      o.mouth +
      '</g>';
  }

  function sparkle(x, y, s, cls) {
    return '<g transform="translate(' + x + ',' + y + ') scale(' + s + ')">' +
      '<path class="nimbus-spark ' + cls + '" d="M0,-5 L1.3,-1.3 L5,0 L1.3,1.3 L0,5 L-1.3,1.3 L-5,0 L-1.3,-1.3 Z" fill="' + GOLD + '"/>' +
      '</g>';
  }

  /* ------------------------------------------------------------- сцены */

  function sceneRadiant() {
    var sun =
      '<g class="extras nimbus-sat"><g transform="translate(72,66)">' +
      '<g class="nimbus-rays" stroke="' + GOLD + '" stroke-width="3" stroke-linecap="round">' +
      '<line x1="0" y1="-14" x2="0" y2="-19"/>' +
      '<line x1="0" y1="-14" x2="0" y2="-19" transform="rotate(45)"/>' +
      '<line x1="0" y1="-14" x2="0" y2="-19" transform="rotate(90)"/>' +
      '<line x1="0" y1="-14" x2="0" y2="-19" transform="rotate(135)"/>' +
      '<line x1="0" y1="-14" x2="0" y2="-19" transform="rotate(180)"/>' +
      '<line x1="0" y1="-14" x2="0" y2="-19" transform="rotate(225)"/>' +
      '<line x1="0" y1="-14" x2="0" y2="-19" transform="rotate(270)"/>' +
      '<line x1="0" y1="-14" x2="0" y2="-19" transform="rotate(315)"/>' +
      '</g>' +
      '<circle r="11" fill="' + GOLD + '"/>' +
      '<circle cx="-3" cy="-3" r="3.2" fill="#FFF3D9" opacity="0.8"/>' +
      '</g></g>';
    var mouth =
      '<g class="mouth nimbus-mouth">' +
      '<path d="M159,126 Q167,137 175,126 Q167,130.5 159,126 Z" fill="' + FACE_DEEP + '"/>' +
      '<path d="M163,129 Q167,132.6 171,129 Q167,130.8 163,129 Z" fill="' + CHEEK + '"/>' +
      '</g>';
    return aura("radiant", 128, 94) +
      sun +
      sparkle(46, 108, 1, "nimbus-sp1") +
      sparkle(196, 92, 0.9, "nimbus-sp2") +
      sparkle(190, 150, 0.75, "nimbus-sp3") +
      sparkle(104, 58, 0.7, "nimbus-sp4") +
      groundShadow(56, 0.7) +
      '<g class="pet nimbus-pet">' +
      legsStanding() +
      '<g class="nimbus-breather">' +
      tailPuff(CLOUD) +
      /* пышное облако: +5% объёма относительно steady */
      '<g transform="translate(-6,-8) scale(1.05)">' + cloudStanding(CLOUD, CLOUD_SHADE) + '</g>' +
      headStanding({ fluff: CLOUD, eyes: eyesOpen(3.9, 1.5, true), mouth: mouth, cheekR: 4, cheekOp: 1 }) +
      '</g>' +
      '</g>' +
      /* мини-облачка, отлетающие от ножек при подскоке */
      '<g class="particles nimbus-particles">' +
      '<g transform="translate(76,193)"><circle class="nimbus-poof nimbus-poof-a" r="5" fill="' + CLOUD + '"/></g>' +
      '<g transform="translate(158,191)"><circle class="nimbus-poof nimbus-poof-b" r="4" fill="' + CLOUD + '"/></g>' +
      '</g>';
  }

  function sceneSteady() {
    var mouth =
      '<g class="mouth nimbus-mouth">' +
      '<path d="M161,127 Q167,132 173,127" fill="none" stroke="' + INK + '" stroke-width="2" stroke-linecap="round"/>' +
      '</g>';
    var grass =
      '<g class="extras">' +
      '<g class="nimbus-grass nimbus-grass-a"><path d="M186,200 Q188,190 189,199 M190,200 Q193,188 195,199" stroke="' + GRASS + '" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.8"/></g>' +
      '<g class="nimbus-grass nimbus-grass-b"><path d="M52,200 Q54,191 55,199 M56,200 Q59,189 61,199" stroke="' + GRASS + '" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.7"/></g>' +
      '</g>';
    return aura("steady", 132, 90) +
      groundShadow(56, 0.65) +
      grass +
      '<g class="pet nimbus-pet">' +
      legsStanding() +
      '<g class="nimbus-breather">' +
      tailPuff(CLOUD) +
      cloudStanding(CLOUD, CLOUD_SHADE) +
      headStanding({ fluff: CLOUD, eyes: eyesOpen(3.4, 1.2, false), mouth: mouth, cheekR: 3.5, cheekOp: 0.9 }) +
      '</g>' +
      '</g>';
  }

  function sceneTired() {
    var mouth =
      '<g class="mouth nimbus-mouth">' +
      '<ellipse class="nimbus-yawn" cx="167" cy="130" rx="3" ry="2.2" fill="' + FACE_DEEP + '"/>' +
      '</g>';
    return aura("tired", 134, 88) +
      groundShadow(52, 0.6) +
      '<g class="pet nimbus-pet">' +
      legsTired() +
      '<g class="nimbus-breather">' +
      /* облако "сдулось": -12% объёма, осело к земле, посерело */
      '<g transform="translate(14.4,23.76) scale(0.88)">' +
      tailPuff(CLOUD_TIRED) +
      cloudStanding(CLOUD_TIRED, CLOUD_TIRED_SHADE) +
      headStanding({ fluff: CLOUD_TIRED, droopEar: true, eyes: eyesTired(), mouth: mouth, cheekR: 3.2, cheekOp: 0.55 }) +
      '</g>' +
      '</g>' +
      '</g>';
  }

  function sceneDrained() {
    var moon =
      '<g class="extras nimbus-sat"><g transform="translate(74,74)">' +
      '<path d="M0,-10 A10,10 0 0 0 0,10 A13,13 0 0 1 0,-10 Z" fill="' + GOLD + '" opacity="0.72" transform="rotate(18)"/>' +
      '</g></g>' +
      '<circle class="nimbus-spark nimbus-sp1" cx="100" cy="60" r="1.4" fill="' + GOLD + '" opacity="0.5"/>' +
      '<circle class="nimbus-spark nimbus-sp2" cx="52" cy="118" r="1.2" fill="' + GOLD + '" opacity="0.5"/>';
    var body =
      '<g class="body nimbus-cloud">' +
      '<circle cx="74" cy="184" r="21" fill="' + CLOUD_SHADE + '"/>' +
      '<circle cx="104" cy="188" r="19" fill="' + CLOUD_SHADE + '"/>' +
      '<circle cx="134" cy="186" r="17" fill="' + CLOUD_SHADE + '"/>' +
      '<circle class="nimbus-puff nimbus-pf1" cx="72" cy="178" r="22" fill="' + CLOUD + '"/>' +
      '<circle class="nimbus-puff nimbus-pf2" cx="98" cy="174" r="26" fill="' + CLOUD + '"/>' +
      '<circle class="nimbus-puff nimbus-pf3" cx="127" cy="176" r="23" fill="' + CLOUD + '"/>' +
      '<circle class="nimbus-puff nimbus-pf4" cx="150" cy="182" r="16" fill="' + CLOUD + '"/>' +
      '<circle class="nimbus-puff nimbus-pf5" cx="86" cy="164" r="16" fill="' + CLOUD + '"/>' +
      '<circle class="nimbus-puff nimbus-pf6" cx="114" cy="161" r="18" fill="' + CLOUD + '"/>' +
      '</g>' +
      /* тело-плед: мягкое лавандовое "одеяльце" поверх облака */
      '<g class="extras nimbus-blanket">' +
      '<rect x="76" y="158" width="64" height="34" rx="17" fill="' + CLOUD_SHADE + '" opacity="0.95" transform="rotate(-5 108 175)"/>' +
      '<path d="M84,170 Q108,164 132,170" stroke="#D8D2EE" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.8" transform="rotate(-5 108 175)"/>' +
      '</g>';
    var head =
      '<g class="head nimbus-head" transform="rotate(6 170 168)">' +
      '<circle cx="158" cy="160" r="19" fill="' + CLOUD + '"/>' +
      '<path d="M160,152 Q150,145 148,137 Q159,141 164,150 Z" fill="' + EAR + '"/>' +
      '<path d="M181,151 Q190,143 190,135 Q180,140 177,149 Z" fill="' + EAR + '"/>' +
      '<ellipse cx="172" cy="167" rx="17" ry="16" fill="' + FACE + '"/>' +
      '<circle cx="167" cy="151" r="7" fill="' + CLOUD + '"/>' +
      '<circle cx="176" cy="153" r="6" fill="' + CLOUD + '"/>' +
      '<g class="eyes nimbus-eyes">' +
      '<path d="M159,164 Q163,167.5 167,164" stroke="' + INK + '" stroke-width="2" fill="none" stroke-linecap="round"/>' +
      '<path d="M177,164 Q181,167.5 185,164" stroke="' + INK + '" stroke-width="2" fill="none" stroke-linecap="round"/>' +
      '</g>' +
      '<g class="cheeks">' +
      '<circle cx="160" cy="172" r="3.2" fill="' + CHEEK + '" opacity="0.7"/>' +
      '<circle cx="184" cy="172" r="3.2" fill="' + CHEEK + '" opacity="0.7"/>' +
      '</g>' +
      '<g class="mouth nimbus-mouth">' +
      '<path d="M168,173.5 Q172,176 176,173.5" stroke="' + INK + '" stroke-width="1.8" fill="none" stroke-linecap="round"/>' +
      '</g>' +
      '</g>';
    var zzz =
      '<g class="particles nimbus-particles" font-family="Quicksand,Nunito,sans-serif" font-weight="700">' +
      '<g transform="translate(148,142)"><text class="nimbus-z nimbus-z1" font-size="14" fill="' + FACE + '">z</text></g>' +
      '<g transform="translate(157,132)"><text class="nimbus-z nimbus-z2" font-size="11" fill="' + FACE + '">z</text></g>' +
      '<g transform="translate(165,124)"><text class="nimbus-z nimbus-z3" font-size="9" fill="' + FACE + '">z</text></g>' +
      '</g>';
    return aura("drained", 150, 92) +
      moon +
      groundShadow(64, 0.75) +
      '<g class="pet nimbus-pet">' +
      '<g class="nimbus-breather">' + body + head + '</g>' +
      '</g>' +
      zzz;
  }

  /* ------------------------------------------------------------ render */

  function render(mood) {
    var m = (mood === "radiant" || mood === "steady" || mood === "tired" || mood === "drained") ? mood : "steady";
    var scene;
    if (m === "radiant") scene = sceneRadiant();
    else if (m === "tired") scene = sceneTired();
    else if (m === "drained") scene = sceneDrained();
    else scene = sceneSteady();
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" class="pet-svg pet-nimbus is-' + m + '" role="img" aria-label="Nimbus the cloud sheep">' +
      '<style>' + CSS + '</style>' +
      scene +
      '</svg>';
  }

  if (typeof window !== "undefined" && typeof window.registerPet === "function") {
    window.registerPet({
      id: "nimbus",
      nameEn: "Nimbus",
      nameRu: "Нимбус",
      render: render
    });
  }
})();
