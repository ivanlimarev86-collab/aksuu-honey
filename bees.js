/* Ak-Suu: what stands behind a given weight of honey. Shared by the site and the mini app.
   Estimates: University of Georgia bee program (2 million flowers, over 55,000 miles per pound),
   University of Florida IFAS (one worker makes about 1/12 teaspoon in her life),
   USDA FoodData Central, honey (per 100 g: 304 kcal, fructose 40.94 g, glucose 35.75 g, water 17.1 g). */
(function () {
  var CSS = '' +
    '.bz{--g:#c9a961;--g2:#e3c57e;--f:#ece4d1;--f2:#b9ad93;--f3:#8a806a;--l:rgba(201,169,97,.22);text-align:left}' +
    '.bz-top{text-align:center}.bz-top b{display:block;font-family:Cormorant,Georgia,serif;font-weight:300;font-size:clamp(54px,16vw,76px);line-height:1;color:var(--g2);font-variant-numeric:lining-nums}.bz-top span{display:block;font-family:Cormorant,Georgia,serif;font-style:italic;font-size:21px;line-height:1.3;color:var(--f2);margin:8px auto 20px;max-width:15em}' +
    '.bz-hex{display:flex;flex-wrap:wrap;justify-content:center;gap:4px;max-width:340px;margin:0 auto 10px}' +
    '.bz-hex i{width:17px;height:19px;background:var(--g);clip-path:polygon(50% 0,100% 25%,100% 75%,50% 100%,0 75%,0 25%);opacity:0;transform:scale(.4);transition:opacity .4s ease,transform .4s ease}' +
    '.bz-hex i.in{opacity:1;transform:none}' +
    '.bz-hive{max-width:340px;margin:0 auto}.bz-hbar{height:10px;background:rgba(201,169,97,.14);margin:0 0 12px;overflow:hidden}.bz-hbar i{display:block;height:100%;background:linear-gradient(90deg,var(--g),var(--g2));transform-origin:left;transform:scaleX(0);transition:transform 1.1s cubic-bezier(.2,.7,.2,1)}.bz-hbar.in i{transform:none}' +
    '.bz-cap{font-family:"JetBrains Mono",ui-monospace,monospace;font-size:10.5px;letter-spacing:.08em;text-transform:uppercase;color:var(--f3);text-align:center;line-height:1.6}' +
    '.bz-facts{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1px;background:var(--l);border:1px solid var(--l);margin-top:16px}' +
    '.bz-fact{background:linear-gradient(155deg,#141a16,#0c100d);padding:14px 12px 13px;min-width:0}.bz-fact:last-child:nth-child(odd){grid-column:1/-1;display:grid;grid-template-columns:34px minmax(0,1fr);gap:12px;align-items:center}' +
    '.bz-fact svg{display:block;width:30px;height:30px;margin-bottom:9px;stroke:var(--g);fill:none;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round}' +
    '.bz-fact svg .fill{fill:var(--g);stroke:none}' +
    '.bz-fact svg .orb{stroke-dasharray:3 4;opacity:.75}' +
    '.bz-fact b{display:block;font-family:Cormorant,Georgia,serif;font-weight:300;font-size:clamp(22px,6.4vw,28px);line-height:1;color:var(--g2);font-variant-numeric:lining-nums;white-space:nowrap}.bz-fact:last-child:nth-child(odd) svg{margin:0}' +
    '.bz-fact span{display:block;font-size:12.5px;line-height:1.35;color:var(--f2);margin-top:4px}' +
    '.bz-spoon{margin-top:26px}' +
    '.bz-spoon h3{font-family:Cormorant,Georgia,serif;font-weight:400;font-size:25px;line-height:1.15;color:var(--f);margin:0;font-variant-numeric:lining-nums}' +
    '.bz-bar{display:flex;height:16px;margin:16px 0 12px;gap:2px}' +
    '.bz-bar i{display:block;height:100%;transform-origin:left;transform:scaleX(0);transition:transform .9s cubic-bezier(.2,.7,.2,1)}' +
    '.bz-bar.in i{transform:none}' +
    '.bz-leg{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px 14px;font-size:13.5px;line-height:1.35;color:var(--f2)}' +
    '.bz-leg b{font-weight:500;color:var(--f);font-variant-numeric:lining-nums}' +
    '.bz-leg i{display:inline-block;width:9px;height:9px;margin-right:7px}' +
    '.bz-ratio{font-family:Cormorant,Georgia,serif;font-size:21px;line-height:1.3;color:var(--f);margin:16px 0 0;padding:12px 0;border-top:1px solid var(--l);border-bottom:1px solid var(--l);font-variant-numeric:lining-nums}.bz-ratio b{font-weight:400;color:var(--g2)}' +
    '.bz-p{font-size:14px;line-height:1.5;color:var(--f2);margin:14px 0 0}' +
    '.bz-src{font-family:"JetBrains Mono",ui-monospace,monospace;font-size:10px;letter-spacing:.06em;text-transform:uppercase;color:var(--f3);line-height:1.7;margin-top:18px}';
  var styled = false;
  function style() { if (styled) return; var s = document.createElement('style'); s.textContent = CSS; document.head.appendChild(s); styled = true; }

  function fmt(n, lang) { return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, lang === 'ru' ? ' ' : ','); }
  function dec(x, lang) { var s = (Math.round(x * 10) / 10).toFixed(1).replace(/\.0$/, ''); return lang === 'ru' ? s.replace('.', ',') : s; }
  function stats(g) {
    var b = g * 12 / 7, km = g * 88500 / 454;
    return { g: g, kg: g / 1000, bees: b < 1000 ? Math.round(b / 10) * 10 : Math.round(b / 100) * 100, flowers: g * 2e6 / 454,
      km: Math.round(km / 100) * 100, laps: km / 40075, spoons: Math.round(g / 7) };
  }
  function ruPl(n, a, b, c) { n = Math.abs(n); return n % 10 === 1 && n % 100 !== 11 ? a : (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 12 || n % 100 > 14) ? b : c); }
  function flowersText(f, lang) { return f >= 1e6 ? dec(f / 1e6, lang) + (lang === 'ru' ? ' млн' : ' million') : fmt(Math.round(f / 1000) * 1000, lang); }

  // free amino acids in honey: 0.24-0.81 g per kg (published ranges), mostly proline
  function aminoText(g, lang) {
    var lo = g * 0.24, hi = g * 0.81; // mg
    if (hi < 1000) return fmt(Math.round(lo / 10) * 10, lang) + '–' + fmt(Math.round(hi / 10) * 10, lang) + (lang === 'ru' ? ' мг' : ' mg');
    return dec(lo / 1000, lang) + '–' + dec(hi / 1000, lang) + (lang === 'ru' ? ' г' : ' g');
  }
  var ICON = {
    // a bee seen from above: head, striped body, two pairs of wings, a dotted flight path
    one: '<svg viewBox="0 0 52 52"><circle cx="26" cy="15" r="4"/><path d="M24 11.500l-3-4M28 11.500l3-4"/><ellipse cx="26" cy="29" rx="6.500" ry="10.500"/><path d="M20 25h12M19.700 30h12.600M21 35h10"/><path d="M20 22C11 14 4 17 5 23s9 6 15 2M32 22c9-8 16-5 15 1s-9 6-15 2"/><path class="orb" d="M8 46c9-5 27-5 36 0"/></svg>',
    // amino acid: a small molecule, atoms and bonds
    amino: '<svg viewBox="0 0 52 52"><path d="M14 30l10-6 10 6M24 24V13M34 30v10M14 30v8"/><circle class="fill" cx="24" cy="24" r="3.200"/><circle class="fill" cx="14" cy="30" r="3.200"/><circle class="fill" cx="34" cy="30" r="3.200"/><circle cx="24" cy="10" r="3.200"/><circle cx="34" cy="43" r="3.200"/><circle cx="14" cy="41" r="3.200"/></svg>',
    // a five-petal mountain flower with a stem and a leaf
    flower: '<svg viewBox="0 0 52 52"><circle class="fill" cx="26" cy="19" r="3.400"/><ellipse cx="26" cy="9.500" rx="4" ry="5.500"/><ellipse cx="26" cy="9.500" rx="4" ry="5.500" transform="rotate(72 26 19)"/><ellipse cx="26" cy="9.500" rx="4" ry="5.500" transform="rotate(144 26 19)"/><ellipse cx="26" cy="9.500" rx="4" ry="5.500" transform="rotate(216 26 19)"/><ellipse cx="26" cy="9.500" rx="4" ry="5.500" transform="rotate(288 26 19)"/><path d="M26 31v17M26 42c-7 0-10-4-11-8 6 0 10 3 11 8z"/></svg>',
    // a teaspoon with honey in the bowl and a drop falling
    spoon: '<svg viewBox="0 0 52 52"><ellipse cx="16" cy="15" rx="8.500" ry="11" transform="rotate(-45 16 15)"/><path d="M22.500 21.500l22 22"/><path class="fill" d="M9.500 15c3.500-2.500 9-2.500 13 0-1 5-4.500 8-8 8s-5-4-5-8z" opacity=".55"/><path class="fill" d="M13 36c1.800 2.600 2.600 4 2.600 5.200a2.600 2.600 0 0 1-5.200 0c0-1.200.8-2.600 2.600-5.200z"/></svg>'
  };
  function orbit(laps) {
    var n = Math.max(1, Math.min(5, Math.ceil(laps))), o = '';
    for (var i = 0; i < n; i++) o += '<ellipse class="orb" cx="26" cy="26" rx="' + (14 + i * 2.6) + '" ry="' + (6 + i * 1.7) + '" transform="rotate(' + (-24 + i * 14) + ' 26 26)"/>';
    return '<svg viewBox="0 0 52 52"><circle cx="26" cy="26" r="9.500"/><path d="M16.500 26h19M26 16.500c4 3 4 16 0 19M26 16.500c-4 3-4 16 0 19"/>' + o + '</svg>';
  }
  function countUp(el, to, text) {
    if (!window.requestAnimationFrame || (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches)) { el.textContent = text(to); return; }
    var t0 = null, d = 1100;
    function f(ts) { if (!t0) t0 = ts; var k = Math.min((ts - t0) / d, 1); k = 1 - Math.pow(1 - k, 3); el.textContent = text(to * k); if (k < 1) requestAnimationFrame(f); }
    requestAnimationFrame(f);
  }

  function render(el, g, lang) {
    style();
    var L = function (ru, en) { return lang === 'ru' ? ru : en; };
    var st = stats(g);
    // University of Georgia: a colony holds 40,000-65,000 bees; 50,000 is used as the middle
    var share = st.bees / 50000 * 100;
    var shareText = share >= 100 ? dec(share / 100, lang) + L(' таких семей, то есть больше', ' such colonies, more than') : (share < 10 ? dec(share, lang) : fmt(share, lang)) + ' %';
    // one teaspoon, 7 g: USDA sugars per 100 g scaled by 0.07; water from our own lab report (16.2 %)
    var seg = [
      [L('Фруктоза', 'Fructose'), 2.9, '#e3c57e'],
      [L('Глюкоза', 'Glucose'), 2.5, '#c9a961'],
      [L('Вода', 'Water'), 1.1, '#8a7a4c'],
      [L('Другие сахара и вещества', 'Other sugars and compounds'), 0.5, '#5a5238']
    ];
    el.className = 'bz';
    el.innerHTML =
      '<div class="bz-top"><b data-k="bees"></b><span>' + L(ruPl(st.bees, 'пчела прожила', 'пчелы прожили', 'пчёл прожили') + ' всю жизнь, собирая этот мёд', 'bees spent their whole lives gathering this honey') + '</span></div>' +
      '<div class="bz-hive"><div class="bz-hbar"><i style="width:' + Math.max(1.5, Math.min(100, share)) + '%"></i></div>' +
      '<p class="bz-cap">' + L('Это ' + shareText + ' одной пчелиной семьи. В семье около 50\u00a0000 пчёл', 'That is ' + shareText + ' of one colony. A colony is about 50,000 bees') + '</p></div>' +
      '<div class="bz-facts">' +
        '<div class="bz-fact">' + ICON.flower + '<div><b data-k="flowers"></b><span>' + L('раз пчёлы сели на цветок', 'times the bees landed on a flower') + '</span></div></div>' +
        '<div class="bz-fact">' + orbit(st.laps) + '<div><b data-k="km"></b><span>' + L('налетали эти пчёлы: ', 'flown by these bees: ') + dec(st.laps, lang) + L(' оборота вокруг Земли', ' times around the Earth') + '</span></div></div>' +
        '<div class="bz-fact">' + ICON.one + '<div><b>' + L('≈ 110 км', '≈ 110 km') + '</b><span>' + L('пролетела каждая пчела и села на ≈\u00a02\u00a0600 цветков', 'flown by each bee, landing on ≈\u00a02,600 flowers') + '</span></div></div>' +
        '<div class="bz-fact">' + ICON.spoon + '<div><b data-k="spoons"></b><span>' + L(ruPl(st.spoons, 'чайная ложка', 'чайные ложки', 'чайных ложек') + ': по одной в день хватит на ', 'teaspoons: one a day lasts ') + fmt(st.spoons, lang) + L(' ' + ruPl(st.spoons, 'день', 'дня', 'дней'), ' days') + '</span></div></div>' +
        '<div class="bz-fact">' + ICON.amino + '<div><b>≈ ' + aminoText(g, lang) + '</b><span>' + L('аминокислот в этом объёме, больше всего пролина', 'of amino acids in this amount, mostly proline') + '</span></div></div>' +
      '</div>';
    setTimeout(function () { el.querySelector('.bz-hbar').classList.add('in'); }, 250);
    countUp(el.querySelector('[data-k=bees]'), st.bees, function (v) { return '≈ ' + fmt(Math.round(v / 10) * 10, lang); });
    countUp(el.querySelector('[data-k=flowers]'), st.flowers, function (v) { return '≈ ' + flowersText(v, lang); });
    countUp(el.querySelector('[data-k=km]'), st.km, function (v) { return '≈ ' + fmt(Math.round(v / 100) * 100, lang) + L(' км', ' km'); });
    countUp(el.querySelector('[data-k=spoons]'), st.spoons, function (v) { return '≈ ' + fmt(v, lang); });
  }

  window.AkBees = { stats: stats, render: render, fmt: fmt, dec: dec, flowersText: flowersText };
})();
