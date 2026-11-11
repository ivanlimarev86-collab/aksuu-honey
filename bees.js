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
    '.bz-cap{font-family:"JetBrains Mono",ui-monospace,monospace;font-size:10.5px;letter-spacing:.08em;text-transform:uppercase;color:var(--f3);text-align:center;line-height:1.6}' +
    '.bz-facts{border-top:1px solid var(--l);margin-top:22px}' +
    '.bz-fact{display:grid;grid-template-columns:56px minmax(0,1fr);gap:14px;align-items:center;padding:18px 0;border-bottom:1px solid var(--l)}' +
    '.bz-fact svg{width:52px;height:52px;stroke:var(--g);fill:none;stroke-width:1.1;stroke-linecap:round;stroke-linejoin:round}' +
    '.bz-fact svg .fill{fill:var(--g);stroke:none}' +
    '.bz-fact svg .orb{stroke-dasharray:3 4;opacity:.75}' +
    '.bz-fact b{display:block;font-family:Cormorant,Georgia,serif;font-weight:300;font-size:clamp(32px,9vw,40px);line-height:1;color:var(--g2);font-variant-numeric:lining-nums;white-space:nowrap}' +
    '.bz-fact span{display:block;font-size:14px;line-height:1.4;color:var(--f2);margin-top:5px}' +
    '.bz-spoon{margin-top:26px}' +
    '.bz-spoon h3{font-family:Cormorant,Georgia,serif;font-weight:400;font-size:25px;line-height:1.15;color:var(--f);margin:0;font-variant-numeric:lining-nums}' +
    '.bz-bar{display:flex;height:16px;margin:16px 0 12px;gap:2px}' +
    '.bz-bar i{display:block;height:100%;transform-origin:left;transform:scaleX(0);transition:transform .9s cubic-bezier(.2,.7,.2,1)}' +
    '.bz-bar.in i{transform:none}' +
    '.bz-leg{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px 14px;font-size:13.5px;line-height:1.35;color:var(--f2)}' +
    '.bz-leg b{font-weight:500;color:var(--f);font-variant-numeric:lining-nums}' +
    '.bz-leg i{display:inline-block;width:9px;height:9px;margin-right:7px}' +
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
    one: '<svg viewBox="0 0 52 52"><ellipse cx="26" cy="29" rx="6" ry="9"/><path d="M21 26h10M21 31h10M26 20v-4"/><path d="M20 24c-7-4-10-1-9 3s6 3 9 1M32 24c7-4 10-1 9 3s-6 3-9 1"/><path class="orb" d="M6 44c10-8 30-8 40 0"/></svg>',
    amino: '<svg viewBox="0 0 52 52"><path d="M26 8l9 5v10l-9 5-9-5V13z"/><path d="M17 23l-8 5v9l8 5 9-5v-9M35 23l8 5v9l-8 5-9-5"/></svg>',
    bee: '<svg viewBox="0 0 52 52"><ellipse cx="26" cy="30" rx="8" ry="12"/><path d="M19 26h14M18.500 31h15M20 36h12M26 18v-5M23 13l-4-5M29 13l4-5"/><path d="M18 24C9 18 5 22 6 27s8 5 12 2M34 24c9-6 13-2 12 3s-8 5-12 2"/></svg>',
    flower: '<svg viewBox="0 0 52 52"><circle class="fill" cx="26" cy="26" r="4.500"/><path d="M26 20c-5-10 5-10 0-16M26 32c5 10-5 10 0 16M20 26c-10 5-10-5-16 0M32 26c10-5 10 5 16 0M21.500 21.500c-10-4-4-10-11-11M30.500 30.500c10 4 4 10 11 11M21.500 30.500c-4 10-10 4-11 11M30.500 21.500c4-10 10-4 11-11"/></svg>',
    spoon: '<svg viewBox="0 0 52 52"><ellipse cx="17" cy="17" rx="9" ry="11" transform="rotate(-45 17 17)"/><path d="M24 24l20 20"/><path class="fill" d="M12 16c3-3 7-3 10 0-1 4-4 6-7 6s-3-3-3-6z" opacity=".5"/></svg>'
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
    var unit = [10, 25, 50, 100, 250, 500, 1000, 2500, 5000].filter(function (u) { return st.bees / u <= 96; })[0] || 10000;
    var n = Math.max(1, Math.round(st.bees / unit));
    // one teaspoon, 7 g: USDA values per 100 g scaled by 0.07
    var seg = [
      [L('Фруктоза', 'Fructose'), 2.9, '#e3c57e'],
      [L('Глюкоза', 'Glucose'), 2.5, '#c9a961'],
      [L('Вода', 'Water'), 1.2, '#8a7a4c'],
      [L('Другие сахара и вещества', 'Other sugars and compounds'), 0.4, '#5a5238']
    ];
    el.className = 'bz';
    el.innerHTML =
      '<div class="bz-top"><b data-k="bees"></b><span>' + L(ruPl(st.bees, 'пчела прожила', 'пчелы прожили', 'пчёл прожили') + ' всю жизнь, собирая этот мёд', 'bees spent their whole lives gathering this honey') + '</span></div>' +
      '<div class="bz-hex">' + new Array(n + 1).join('<i></i>') + '</div>' +
      '<p class="bz-cap">' + L('Каждая сота на рисунке — ' + fmt(unit, lang) + ' ' + ruPl(unit, 'пчела', 'пчелы', 'пчёл'), 'Each cell in the picture is ' + fmt(unit, lang) + ' bees') + '</p>' +
      '<div class="bz-facts">' +
        '<div class="bz-fact">' + ICON.flower + '<div><b data-k="flowers"></b><span>' + L('раз пчёлы сели на цветок', 'times the bees landed on a flower') + '</span></div></div>' +
        '<div class="bz-fact">' + orbit(st.laps) + '<div><b data-k="km"></b><span>' + L('налетали эти пчёлы: ', 'flown by these bees: ') + dec(st.laps, lang) + L(' оборота вокруг Земли', ' times around the Earth') + '</span></div></div>' +
        '<div class="bz-fact">' + ICON.one + '<div><b>' + L('≈ 110 км', '≈ 110 km') + '</b><span>' + L('пролетела каждая пчела и села на ≈\u00a02\u00a0600 цветков', 'flown by each bee, landing on ≈\u00a02,600 flowers') + '</span></div></div>' +
        '<div class="bz-fact">' + ICON.spoon + '<div><b data-k="spoons"></b><span>' + L(ruPl(st.spoons, 'чайная ложка', 'чайные ложки', 'чайных ложек') + ': по одной в день хватит на ', 'teaspoons: one a day lasts ') + fmt(st.spoons, lang) + L(' ' + ruPl(st.spoons, 'день', 'дня', 'дней'), ' days') + '</span></div></div>' +
        '<div class="bz-fact">' + ICON.amino + '<div><b>≈ ' + aminoText(g, lang) + '</b><span>' + L('аминокислот в этом объёме, больше всего пролина', 'of amino acids in this amount, mostly proline') + '</span></div></div>' +
      '</div>' +
      '<div class="bz-spoon"><h3>' + L('В одной чайной ложке · 7 г · ≈ 21 ккал', 'In one teaspoon · 7 g · ≈ 21 kcal') + '</h3>' +
        '<div class="bz-bar">' + seg.map(function (s) { return '<i style="flex:' + s[1] + ';background:' + s[2] + '"></i>'; }).join('') + '</div>' +
        '<div class="bz-leg">' + seg.map(function (s) { return '<div><i style="background:' + s[2] + '"></i>' + s[0] + ' <b>' + dec(s[1], lang) + L(' г', ' g') + '</b></div>'; }).join('') + '</div>' +
        '<p class="bz-p">' + L('В каждой ложке ≈\u00a031\u00a0000 посадок на цветок и труд двенадцати пчёл за всю жизнь. Фруктозы в мёде больше, чем глюкозы; обе — простые сахара, организму не нужно их расщеплять.',
                                'Each spoonful holds ≈ 31,000 landings on flowers and the life’s work of twelve bees. Honey has more fructose than glucose; both are simple sugars the body does not need to break down.') + '</p></div>' +
      '<p class="bz-src">' + L('Оценки труда пчёл: Университет Джорджии, Университет Флориды. Состав и аминокислоты: типичный мёд по USDA и опубликованным исследованиям.',
                                'Bee-work estimates: University of Georgia, University of Florida. Composition and amino acids: typical honey per USDA and published studies.') + '</p>';
    var hx = el.querySelector('.bz-hex').children;
    [].forEach.call(hx, function (c, i) { setTimeout(function () { c.classList.add('in'); }, 60 + i * Math.min(22, 1400 / n)); });
    setTimeout(function () { el.querySelector('.bz-bar').classList.add('in'); }, 250);
    countUp(el.querySelector('[data-k=bees]'), st.bees, function (v) { return '≈ ' + fmt(Math.round(v / 10) * 10, lang); });
    countUp(el.querySelector('[data-k=flowers]'), st.flowers, function (v) { return '≈ ' + flowersText(v, lang); });
    countUp(el.querySelector('[data-k=km]'), st.km, function (v) { return '≈ ' + fmt(Math.round(v / 100) * 100, lang) + L(' км', ' km'); });
    countUp(el.querySelector('[data-k=spoons]'), st.spoons, function (v) { return '≈ ' + fmt(v, lang); });
  }

  window.AkBees = { stats: stats, render: render, fmt: fmt, dec: dec, flowersText: flowersText };
})();
