/* Fern / Ферн — маленький ленивец с листиком на макушке.
   Модуль питомца по assets/pets/CONTRACT.md. Только inline-SVG + CSS-анимации. */
(function () {
  "use strict";

  var C = {
    body: "#B8B29A",
    bodyDark: "#A29B82",
    belly: "#D3CDB6",
    mask: "#8A7E6C",
    maskDark: "#75695A",
    muzzle: "#DAD4BE",
    ink: "#3E3A47",
    leaf: "#5FAF7E",
    leafDark: "#4C9269",
    leafSoft: "#9FCDB2",
    branch: "#A98F6F",
    cheek: "#E0A88C",
    zzz: "#9C8BC0"
  };

  function R(v) { return Math.round(v * 10) / 10; }

  /* ---------- маленькие детали ---------- */

  function spark(x, y, k) {
    return '<path d="M ' + x + " " + R(y - 7 * k) +
      " L " + R(x + 1.8 * k) + " " + R(y - 1.8 * k) +
      " L " + R(x + 7 * k) + " " + y +
      " L " + R(x + 1.8 * k) + " " + R(y + 1.8 * k) +
      " L " + x + " " + R(y + 7 * k) +
      " L " + R(x - 1.8 * k) + " " + R(y + 1.8 * k) +
      " L " + R(x - 7 * k) + " " + y +
      " L " + R(x - 1.8 * k) + " " + R(y - 1.8 * k) + ' Z" fill="#F5A623"/>';
  }

  function branchLeaf(x, y, flip) {
    var f = flip ? -1 : 1;
    return '<path d="M ' + x + " " + y +
      " Q " + R(x + 7 * f) + " " + (y - 2) + " " + R(x + 9 * f) + " " + (y - 9) +
      " Q " + R(x + 1 * f) + " " + (y - 7) + " " + x + " " + y +
      ' Z" fill="' + C.leaf + '" opacity=".85"/>';
  }

  function openEye(x, y, er, sparkle) {
    var s = '<circle cx="' + x + '" cy="' + y + '" r="' + er + '" fill="#FFFDF6"/>' +
      '<circle cx="' + x + '" cy="' + R(y + er * 0.06) + '" r="' + R(er * 0.62) + '" fill="' + C.ink + '"/>' +
      '<circle cx="' + R(x + er * 0.3) + '" cy="' + R(y - er * 0.32) + '" r="' + R(er * 0.3) + '" fill="#FFFFFF"/>';
    if (sparkle) {
      s += '<circle cx="' + R(x - er * 0.32) + '" cy="' + R(y + er * 0.3) + '" r="' + R(er * 0.16) + '" fill="#FFFFFF"/>';
    }
    return s;
  }

  function lid(x, y, er) {
    return '<ellipse class="fern-lid" cx="' + x + '" cy="' + y + '" rx="' + R(er + 1.5) +
      '" ry="' + R(er + 1.7) + '" fill="' + C.mask + '"/>';
  }

  /* Голова: круг + тёмная «маска» вокруг глаз + мордочка.
     o.eyes: open | half | slit; o.mouth: grin | smile | yawn | rest */
  function headSvg(cx, cy, r, o) {
    var ex = R(r * 0.42), ey = R(cy - r * 0.1), er = R(Math.max(4.3, r * 0.17));
    var lx = R(cx - ex), rx = R(cx + ex);
    var mY = R(cy + r * 0.52);
    var s = '<g class="head">';
    s += '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="' + C.body + '" stroke="' + C.bodyDark + '" stroke-width="2"/>';
    s += '<ellipse cx="' + lx + '" cy="' + ey + '" rx="' + R(r * 0.31) + '" ry="' + R(r * 0.45) + '" fill="' + C.mask + '" transform="rotate(-13 ' + lx + " " + ey + ')"/>';
    s += '<ellipse cx="' + rx + '" cy="' + ey + '" rx="' + R(r * 0.31) + '" ry="' + R(r * 0.45) + '" fill="' + C.mask + '" transform="rotate(13 ' + rx + " " + ey + ')"/>';
    s += '<ellipse cx="' + cx + '" cy="' + R(cy + r * 0.46) + '" rx="' + R(r * 0.4) + '" ry="' + R(r * 0.29) + '" fill="' + C.muzzle + '"/>';
    s += '<ellipse cx="' + cx + '" cy="' + R(cy + r * 0.31) + '" rx="' + R(r * 0.13) + '" ry="' + R(r * 0.1) + '" fill="' + C.maskDark + '"/>';
    if (o.cheeks) {
      s += '<circle cx="' + R(cx - r * 0.68) + '" cy="' + R(cy + r * 0.26) + '" r="' + R(r * 0.14) + '" fill="' + C.cheek + '" opacity=".5"/>';
      s += '<circle cx="' + R(cx + r * 0.68) + '" cy="' + R(cy + r * 0.26) + '" r="' + R(r * 0.14) + '" fill="' + C.cheek + '" opacity=".5"/>';
    }
    s += '<g class="eyes">';
    if (o.eyes === "slit") {
      s += '<g class="fern-peek">' +
        '<ellipse cx="' + lx + '" cy="' + ey + '" rx="' + er + '" ry="' + R(er * 0.55) + '" fill="#FFFDF6"/>' +
        '<circle cx="' + lx + '" cy="' + ey + '" r="' + R(er * 0.4) + '" fill="' + C.ink + '"/>' +
        '<ellipse cx="' + rx + '" cy="' + ey + '" rx="' + er + '" ry="' + R(er * 0.55) + '" fill="#FFFDF6"/>' +
        '<circle cx="' + rx + '" cy="' + ey + '" r="' + R(er * 0.4) + '" fill="' + C.ink + '"/></g>';
      s += '<g class="fern-slit">' +
        '<path d="M ' + R(lx - er - 1) + " " + ey + " q " + R(er + 1) + " " + R(er * 1.1) + " " + R((er + 1) * 2) + ' 0" stroke="' + C.maskDark + '" stroke-width="2.4" fill="none" stroke-linecap="round"/>' +
        '<path d="M ' + R(rx - er - 1) + " " + ey + " q " + R(er + 1) + " " + R(er * 1.1) + " " + R((er + 1) * 2) + ' 0" stroke="' + C.maskDark + '" stroke-width="2.4" fill="none" stroke-linecap="round"/></g>';
    } else {
      s += openEye(lx, ey, er, o.eyes === "open" && o.sparkle) + openEye(rx, ey, er, o.eyes === "open" && o.sparkle);
    }
    s += "</g>";
    if (o.eyes !== "slit") {
      s += '<g class="eyelids">' + lid(lx, ey, er) + lid(rx, ey, er) + "</g>";
    }
    if (o.mouth === "grin") {
      s += '<path class="mouth" d="M ' + R(cx - 6.5) + " " + R(mY - 1) + " Q " + cx + " " + R(mY + 8) + " " + R(cx + 6.5) + " " + R(mY - 1) + ' Z" fill="' + C.maskDark + '"/>';
    } else if (o.mouth === "smile") {
      s += '<path class="mouth" d="M ' + R(cx - 6) + " " + mY + " Q " + cx + " " + R(mY + 5) + " " + R(cx + 6) + " " + mY + '" stroke="' + C.maskDark + '" stroke-width="2" fill="none" stroke-linecap="round"/>';
    } else if (o.mouth === "yawn") {
      s += '<ellipse class="mouth fern-yawn" cx="' + cx + '" cy="' + R(mY + 1) + '" rx="3.2" ry="2.4" fill="' + C.maskDark + '"/>';
    } else {
      s += '<path class="mouth" d="M ' + R(cx - 4.5) + " " + mY + " Q " + cx + " " + R(mY + 3) + " " + R(cx + 4.5) + " " + mY + '" stroke="' + C.maskDark + '" stroke-width="2" fill="none" stroke-linecap="round"/>';
    }
    return s + "</g>";
  }

  /* ---------- росток на макушке (4 варианта) ---------- */

  function sproutRadiant(x, y) {
    return '<g class="extras fern-sprout">' +
      '<path d="M ' + x + " " + (y + 2) + " C " + (x - 1) + " " + (y - 4) + " " + (x - 1) + " " + (y - 7) + " " + x + " " + (y - 10) + '" stroke="' + C.leafDark + '" stroke-width="2.2" fill="none" stroke-linecap="round"/>' +
      '<path d="M ' + x + " " + (y - 9) + " Q " + (x - 12) + " " + (y - 10) + " " + (x - 14) + " " + (y - 20) + " Q " + (x - 3) + " " + (y - 18) + " " + x + " " + (y - 9) + ' Z" fill="' + C.leaf + '"/>' +
      '<path d="M ' + x + " " + (y - 10) + " Q " + (x + 11) + " " + (y - 13) + " " + (x + 13) + " " + (y - 23) + " Q " + (x + 2) + " " + (y - 20) + " " + x + " " + (y - 10) + ' Z" fill="' + C.leaf + '"/></g>';
  }

  function sproutSteady(x, y) {
    return '<g class="extras fern-sprout">' +
      '<path d="M ' + x + " " + (y + 2) + " C " + x + " " + (y - 3) + " " + x + " " + (y - 6) + " " + (x + 1) + " " + (y - 9) + '" stroke="' + C.leafDark + '" stroke-width="2.2" fill="none" stroke-linecap="round"/>' +
      '<path d="M ' + (x + 1) + " " + (y - 8) + " Q " + (x + 11) + " " + (y - 10) + " " + (x + 13) + " " + (y - 19) + " Q " + (x + 3) + " " + (y - 17) + " " + (x + 1) + " " + (y - 8) + ' Z" fill="' + C.leaf + '"/>' +
      '<circle cx="' + (x - 3) + '" cy="' + (y - 7) + '" r="2.2" fill="' + C.leaf + '"/></g>';
  }

  function sproutTired(x, y) {
    return '<g class="extras fern-sprout">' +
      '<path d="M ' + x + " " + (y + 2) + " C " + (x + 1) + " " + (y - 2) + " " + (x + 3) + " " + (y - 5) + " " + (x + 7) + " " + (y - 6) + '" stroke="' + C.leafDark + '" stroke-width="2.2" fill="none" stroke-linecap="round"/>' +
      '<path d="M ' + (x + 7) + " " + (y - 6) + " Q " + (x + 16) + " " + (y - 4) + " " + (x + 17) + " " + (y + 5) + " Q " + (x + 8) + " " + (y + 1) + " " + (x + 7) + " " + (y - 6) + ' Z" fill="' + C.leaf + '"/></g>';
  }

  function sproutDrained(x, y) {
    return '<g class="extras fern-sprout">' +
      '<path d="M ' + x + " " + (y + 2) + " C " + (x - 1) + " " + (y - 2) + " " + (x - 1) + " " + (y - 4) + " " + x + " " + (y - 6) + '" stroke="' + C.leafDark + '" stroke-width="2" fill="none" stroke-linecap="round"/>' +
      '<path d="M ' + x + " " + (y - 6) + " Q " + (x - 5) + " " + (y - 11) + " " + (x + 1) + " " + (y - 14) + " Q " + (x + 6) + " " + (y - 9) + " " + x + " " + (y - 6) + ' Z" fill="' + C.leaf + '"/>' +
      '<path d="M ' + (x + 1) + " " + (y - 9) + ' q 2 -2 1 -4" stroke="' + C.leafDark + '" stroke-width="1.2" fill="none" stroke-linecap="round"/></g>';
  }

  /* ---------- общие куски ---------- */

  function aura(color, cx, cy, rx, ry, mood) {
    var id = "fern-" + mood + "-aura";
    return '<defs><radialGradient id="' + id + '" cx="50%" cy="46%" r="60%">' +
      '<stop offset="0%" stop-color="' + color + '" stop-opacity=".32"/>' +
      '<stop offset="60%" stop-color="' + color + '" stop-opacity=".16"/>' +
      '<stop offset="100%" stop-color="' + color + '" stop-opacity="0"/>' +
      '</radialGradient></defs>' +
      '<g class="aura"><ellipse cx="' + cx + '" cy="' + cy + '" rx="' + rx + '" ry="' + ry + '" fill="url(#' + id + ')"/></g>';
  }

  function reduce(mood) {
    return "@media (prefers-reduced-motion:reduce){.pet-fern.is-" + mood + " *{animation:none!important}}";
  }

  function svgOpen(mood) {
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" class="pet-svg pet-fern is-' + mood + '" role="img" aria-label="Fern (' + mood + ')">';
  }

  /* ---------- 4 позы ---------- */

  function renderRadiant() {
    var css =
      ".pet-fern.is-radiant .fern-swing{transform-origin:133px 47px;animation:fern-r-sway 4.4s ease-in-out infinite}" +
      "@keyframes fern-r-sway{0%,100%{transform:rotate(2.5deg)}50%{transform:rotate(-2.5deg)}}" +
      ".pet-fern.is-radiant .fern-breath{transform-origin:118px 98px;animation:fern-r-br 2.2s ease-in-out infinite}" +
      "@keyframes fern-r-br{0%,100%{transform:scale(1,1)}50%{transform:scale(1.015,1.035)}}" +
      ".pet-fern.is-radiant .fern-thumbarm{transform-origin:104px 140px;animation:fern-r-th 5.6s ease-in-out infinite}" +
      "@keyframes fern-r-th{0%,58%,100%{transform:rotate(0deg)}68%,84%{transform:rotate(-9deg)}}" +
      ".pet-fern.is-radiant .fern-sprout{transform-origin:118px 73px;animation:fern-r-leaf 2.2s ease-in-out infinite}" +
      "@keyframes fern-r-leaf{0%,100%{transform:rotate(-4deg)}50%{transform:rotate(5deg)}}" +
      ".pet-fern.is-radiant .fern-lid{transform-box:fill-box;transform-origin:center top;transform:scaleY(.06);animation:fern-r-blink 4.2s linear infinite}" +
      "@keyframes fern-r-blink{0%,91%,98%,100%{transform:scaleY(.06)}94%{transform:scaleY(1)}}" +
      ".pet-fern.is-radiant .fern-sp{transform-box:fill-box;transform-origin:center;animation:fern-r-tw 2.2s ease-in-out infinite}" +
      ".pet-fern.is-radiant .fern-sp2{animation-delay:.7s}.pet-fern.is-radiant .fern-sp3{animation-delay:1.4s}" +
      "@keyframes fern-r-tw{0%,100%{opacity:.25;transform:scale(.65)}50%{opacity:1;transform:scale(1.05)}}" +
      reduce("radiant");
    return svgOpen("radiant") +
      "<style>" + css + "</style>" +
      aura("#F5A623", 120, 126, 86, 84, "radiant") +
      '<g class="particles">' +
      '<g class="fern-sp fern-sp1">' + spark(57, 84, 1) + "</g>" +
      '<g class="fern-sp fern-sp2">' + spark(188, 76, 0.75) + "</g>" +
      '<g class="fern-sp fern-sp3">' + spark(178, 150, 0.6) + "</g></g>" +
      '<path class="extras" d="M26 46 C78 38 168 40 216 52" stroke="' + C.branch + '" stroke-width="9" fill="none" stroke-linecap="round"/>' +
      branchLeaf(196, 44, false) + branchLeaf(52, 44, true) +
      '<ellipse cx="118" cy="206" rx="26" ry="4.5" fill="' + C.ink + '" opacity=".06"/>' +
      '<g class="fern-swing">' +
      '<path d="M133 50 C131 68 127 82 122 97" stroke="' + C.body + '" stroke-width="13" fill="none" stroke-linecap="round"/>' +
      '<circle cx="133" cy="47" r="7.5" fill="' + C.mask + '"/>' +
      '<g class="body fern-breath">' +
      '<path d="M107 182 C105 191 104 197 103 202" stroke="' + C.body + '" stroke-width="11" fill="none" stroke-linecap="round"/>' +
      '<path d="M129 182 C131 191 132 197 133 202" stroke="' + C.body + '" stroke-width="11" fill="none" stroke-linecap="round"/>' +
      '<circle cx="103" cy="203" r="5" fill="' + C.mask + '"/><circle cx="133" cy="203" r="5" fill="' + C.mask + '"/>' +
      '<ellipse cx="118" cy="156" rx="27" ry="33" fill="' + C.body + '" stroke="' + C.bodyDark + '" stroke-width="2"/>' +
      '<ellipse cx="118" cy="163" rx="16" ry="21" fill="' + C.belly + '"/>' +
      '<g class="fern-thumbarm">' +
      '<path d="M101 137 C92 130 84 121 80 112" stroke="' + C.body + '" stroke-width="12" fill="none" stroke-linecap="round"/>' +
      '<circle cx="79" cy="110" r="6.5" fill="' + C.mask + '"/>' +
      '<circle cx="74.5" cy="102.5" r="3.2" fill="' + C.mask + '"/></g>' +
      headSvg(118, 101, 29, { eyes: "open", sparkle: true, mouth: "grin", cheeks: true }) +
      sproutRadiant(118, 71) +
      "</g></g></svg>";
  }

  function renderSteady() {
    var css =
      ".pet-fern.is-steady .fern-breath{transform-origin:120px 195px;animation:fern-s-br 3.5s ease-in-out infinite}" +
      "@keyframes fern-s-br{0%,100%{transform:scale(1,1)}50%{transform:scale(1.012,1.03)}}" +
      ".pet-fern.is-steady .fern-sprout{transform-origin:120px 83px;animation:fern-s-leaf 3.5s ease-in-out infinite}" +
      "@keyframes fern-s-leaf{0%,100%{transform:rotate(-3deg)}50%{transform:rotate(4deg)}}" +
      ".pet-fern.is-steady .fern-lid{transform-box:fill-box;transform-origin:center top;transform:scaleY(.06);animation:fern-s-blink 5.4s linear infinite}" +
      "@keyframes fern-s-blink{0%,90%,97%,100%{transform:scaleY(.06)}93.5%{transform:scaleY(1)}}" +
      reduce("steady");
    return svgOpen("steady") +
      "<style>" + css + "</style>" +
      aura("#5FAF7E", 120, 140, 84, 80, "steady") +
      '<path class="extras" d="M36 199 C88 193 158 193 206 199" stroke="' + C.branch + '" stroke-width="9" fill="none" stroke-linecap="round"/>' +
      branchLeaf(58, 196, true) + branchLeaf(188, 196, false) +
      '<g class="body fern-breath">' +
      '<ellipse cx="120" cy="158" rx="29" ry="37" fill="' + C.body + '" stroke="' + C.bodyDark + '" stroke-width="2"/>' +
      '<ellipse cx="120" cy="166" rx="17" ry="23" fill="' + C.belly + '"/>' +
      '<circle cx="107" cy="180" r="11.5" fill="' + C.body + '" stroke="' + C.bodyDark + '" stroke-width="1.5"/>' +
      '<circle cx="133" cy="180" r="11.5" fill="' + C.body + '" stroke="' + C.bodyDark + '" stroke-width="1.5"/>' +
      '<ellipse cx="104" cy="192" rx="6" ry="4.2" fill="' + C.mask + '"/>' +
      '<ellipse cx="136" cy="192" rx="6" ry="4.2" fill="' + C.mask + '"/>' +
      '<path d="M94 143 C88 166 99 182 117 186" stroke="' + C.body + '" stroke-width="11" fill="none" stroke-linecap="round"/>' +
      '<path d="M146 143 C152 166 141 182 123 186" stroke="' + C.body + '" stroke-width="11" fill="none" stroke-linecap="round"/>' +
      '<circle cx="117" cy="186" r="5.5" fill="' + C.mask + '"/><circle cx="123" cy="186" r="5.5" fill="' + C.mask + '"/>' +
      headSvg(120, 110, 29, { eyes: "open", mouth: "smile", cheeks: true }) +
      sproutSteady(120, 81) +
      "</g></svg>";
  }

  function renderTired() {
    var css =
      ".pet-fern.is-tired .fern-swing{transform-origin:124px 50px;animation:fern-t-sway 7.5s ease-in-out infinite}" +
      "@keyframes fern-t-sway{0%,100%{transform:rotate(3.5deg)}50%{transform:rotate(-3.5deg)}}" +
      ".pet-fern.is-tired .fern-breath{transform-origin:124px 130px;animation:fern-t-br 5s ease-in-out infinite}" +
      "@keyframes fern-t-br{0%,100%{transform:scale(1,1)}50%{transform:scale(1.01,1.028)}}" +
      ".pet-fern.is-tired .fern-sprout{transform-origin:124px 96px;animation:fern-t-leaf 5s ease-in-out infinite}" +
      "@keyframes fern-t-leaf{0%,100%{transform:rotate(0deg)}50%{transform:rotate(3deg)}}" +
      ".pet-fern.is-tired .fern-lid{transform-box:fill-box;transform-origin:center top;transform:scaleY(.48);animation:fern-t-blink 6.5s linear infinite}" +
      "@keyframes fern-t-blink{0%,86%,96%,100%{transform:scaleY(.48)}90%{transform:scaleY(1)}}" +
      ".pet-fern.is-tired .fern-yawn{transform-box:fill-box;transform-origin:center;animation:fern-t-yawn 9s ease-in-out infinite}" +
      "@keyframes fern-t-yawn{0%,72%,96%,100%{transform:scale(1,1)}80%,88%{transform:scale(1.7,2.3)}}" +
      reduce("tired");
    return svgOpen("tired") +
      "<style>" + css + "</style>" +
      aura("#8CA0C9", 122, 140, 84, 80, "tired") +
      '<path class="extras" d="M26 48 C80 40 168 42 216 54" stroke="' + C.branch + '" stroke-width="9" fill="none" stroke-linecap="round"/>' +
      branchLeaf(200, 46, false) +
      '<ellipse cx="124" cy="216" rx="24" ry="4" fill="' + C.ink + '" opacity=".05"/>' +
      '<g class="fern-swing">' +
      '<path d="M96 49 C98 74 102 96 109 117" stroke="' + C.body + '" stroke-width="12" fill="none" stroke-linecap="round"/>' +
      '<path d="M152 51 C150 76 146 98 139 117" stroke="' + C.body + '" stroke-width="12" fill="none" stroke-linecap="round"/>' +
      '<circle cx="96" cy="47" r="7" fill="' + C.mask + '"/><circle cx="152" cy="49" r="7" fill="' + C.mask + '"/>' +
      '<g class="body fern-breath">' +
      '<path d="M115 196 C114 202 113 206 113 210" stroke="' + C.body + '" stroke-width="10" fill="none" stroke-linecap="round"/>' +
      '<path d="M133 196 C134 202 135 206 135 210" stroke="' + C.body + '" stroke-width="10" fill="none" stroke-linecap="round"/>' +
      '<circle cx="113" cy="211" r="4.5" fill="' + C.mask + '"/><circle cx="135" cy="211" r="4.5" fill="' + C.mask + '"/>' +
      '<ellipse cx="124" cy="170" rx="26" ry="31" fill="' + C.body + '" stroke="' + C.bodyDark + '" stroke-width="2"/>' +
      '<ellipse cx="124" cy="177" rx="15" ry="19" fill="' + C.belly + '"/>' +
      '<g transform="rotate(5 124 122)">' +
      headSvg(124, 122, 28, { eyes: "half", mouth: "yawn" }) +
      sproutTired(124, 94) +
      "</g></g></g></svg>";
  }

  function renderDrained() {
    var css =
      ".pet-fern.is-drained .fern-breath{transform-origin:120px 170px;animation:fern-d-br 7s ease-in-out infinite}" +
      "@keyframes fern-d-br{0%,100%{transform:scale(1,1)}50%{transform:scale(1.005,1.05)}}" +
      ".pet-fern.is-drained .fern-dangle{transform-origin:103px 160px;animation:fern-d-arm 7s ease-in-out infinite}" +
      "@keyframes fern-d-arm{0%,100%{transform:rotate(2.5deg)}50%{transform:rotate(-2.5deg)}}" +
      ".pet-fern.is-drained .fern-sprout{transform-origin:85px 123px;animation:fern-d-leaf 7s ease-in-out infinite}" +
      "@keyframes fern-d-leaf{0%,100%{transform:rotate(0deg)}50%{transform:rotate(-2.5deg)}}" +
      ".pet-fern.is-drained .fern-peek{opacity:0;animation:fern-d-peek 11s linear infinite}" +
      "@keyframes fern-d-peek{0%,86%,96%,100%{opacity:0}89%,93%{opacity:1}}" +
      ".pet-fern.is-drained .fern-slit{animation:fern-d-slit 11s linear infinite}" +
      "@keyframes fern-d-slit{0%,86%,96%,100%{opacity:1}89%,93%{opacity:0}}" +
      ".pet-fern.is-drained .fern-z{animation:fern-d-z 8s linear infinite}" +
      ".pet-fern.is-drained .fern-z2{animation-delay:2.6s}.pet-fern.is-drained .fern-z3{animation-delay:5.2s}" +
      "@keyframes fern-d-z{0%{opacity:0;transform:translateY(4px)}22%{opacity:.85}55%{opacity:.45}100%{opacity:0;transform:translateY(-20px)}}" +
      reduce("drained");
    return svgOpen("drained") +
      "<style>" + css + "</style>" +
      aura("#9C8BC0", 120, 150, 86, 74, "drained") +
      '<path class="extras" d="M22 176 C70 169 170 169 218 176" stroke="' + C.branch + '" stroke-width="13" fill="none" stroke-linecap="round"/>' +
      branchLeaf(204, 170, false) +
      '<g class="body fern-breath">' +
      '<g class="fern-dangle">' +
      '<path d="M103 160 C106 180 104 194 99 205" stroke="' + C.body + '" stroke-width="10" fill="none" stroke-linecap="round"/>' +
      '<circle cx="98.5" cy="206" r="5" fill="' + C.mask + '"/></g>' +
      '<ellipse cx="128" cy="151" rx="34" ry="19" fill="' + C.body + '" stroke="' + C.bodyDark + '" stroke-width="2"/>' +
      '<ellipse cx="132" cy="147" rx="20" ry="11" fill="' + C.belly + '"/>' +
      '<g transform="rotate(-6 85 146)">' +
      headSvg(85, 146, 25, { eyes: "slit", mouth: "rest" }) +
      sproutDrained(85, 122) +
      "</g>" +
      '<path class="extras" d="M96 150 Q128 126 172 146 Q170 166 128 167 Q102 163 96 150 Z" fill="' + C.leafSoft + '" stroke="' + C.leafDark + '" stroke-width="1.5"/>' +
      '<path d="M101 151 Q134 143 168 149" stroke="' + C.leafDark + '" stroke-width="1.2" fill="none" opacity=".55"/>' +
      '<circle cx="176" cy="149" r="4.5" fill="' + C.mask + '"/>' +
      '<circle cx="171" cy="157" r="4" fill="' + C.mask + '"/>' +
      '<path d="M136 136 C145 138 152 142 156 148" stroke="' + C.body + '" stroke-width="9" fill="none" stroke-linecap="round"/>' +
      '<circle cx="157" cy="149" r="4.5" fill="' + C.mask + '"/>' +
      "</g>" +
      '<g class="particles" fill="' + C.zzz + '" font-family="Quicksand,Nunito,sans-serif" font-weight="700">' +
      '<text class="fern-z fern-z1" x="64" y="116" font-size="13">z</text>' +
      '<text class="fern-z fern-z2" x="75" y="104" font-size="10">z</text>' +
      '<text class="fern-z fern-z3" x="58" y="99" font-size="8">z</text></g>' +
      "</svg>";
  }

  var poses = {
    radiant: renderRadiant,
    steady: renderSteady,
    tired: renderTired,
    drained: renderDrained
  };

  function render(mood) {
    var fn = poses[mood] || poses.steady;
    return fn();
  }

  if (typeof window !== "undefined" && typeof window.registerPet === "function") {
    window.registerPet({
      id: "fern",
      nameEn: "Fern",
      nameRu: "Ферн",
      render: render
    });
  }
})();
