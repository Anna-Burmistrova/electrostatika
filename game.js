const SVG_NS = 'http://www.w3.org/2000/svg';
const S = 32;
const TRI_DY = S * Math.sqrt(3) / 2;

const LEVELS = [
  {
    title: 'Две силы влево', grid: 'square', q: { x: 400, y: 240 }, forceLength: 64,
    description: 'Два заряда действуют на +Q. Построй силу от каждого заряда и найди их сумму.',
    sources: [
      { id: 'a', x: 272, y: 240, charge: -1, label: '−q', hint: 'Разноимённые заряды притягиваются. Сила направлена к заряду −q.' },
      { id: 'b', x: 528, y: 240, charge: 1, label: '+q', hint: 'Одноимённые заряды отталкиваются. Сила направлена от заряда +q.' }
    ],
    lines: [['a', 'b']],
    resultHint: 'Обе силы направлены влево. Их длины складываются.',
    takeaway: 'Одинаковые силы направлены влево, поэтому равнодействующая вдвое больше каждой.'
  },
  {
    title: 'Прямой угол', grid: 'square', q: { x: 400, y: 176 }, forceLength: 64,
    description: 'Силы перпендикулярны друг другу. Построй их и найди диагональ параллелограмма.',
    sources: [
      { id: 'a', x: 400, y: 304, charge: -1, label: '−q', hint: 'Заряд −q притягивает +Q вертикально вниз.' },
      { id: 'b', x: 528, y: 176, charge: 1, label: '+q', hint: 'Заряд +q отталкивает +Q горизонтально влево.' }
    ],
    lines: [['Q', 'a'], ['Q', 'b'], ['a', 'b']],
    resultHint: 'Построй квадрат на двух равных перпендикулярных векторах. Равнодействующая — его диагональ.',
    takeaway: 'Равные перпендикулярные силы дают диагональ квадрата под углом 45°.'
  },
  {
    title: 'Три заряда', grid: 'square', q: { x: 400, y: 264 }, forceLength: 64,
    description: 'Теперь на +Q действуют три заряда. Сложи их силы, учитывая модуль каждой.',
    sources: [
      { id: 'a', x: 272, y: 264, charge: -1, label: '−q', hint: 'Отрицательный заряд слева притягивает +Q влево.' },
      { id: 'b', x: 528, y: 264, charge: 1, label: '+q', hint: 'Положительный заряд справа отталкивает +Q влево.' },
      { id: 'c', x: 400, y: 136, charge: 2, label: '+2q', hint: 'Все расстояния равны. Заряд +2q создаёт силу в два раза больше и направляет её вниз.' }
    ],
    lines: [['a', 'b'], ['a', 'c'], ['b', 'c'], ['c', 'Q']],
    resultHint: 'Влево действуют две единичные силы, вниз — одна двойная. Горизонтальная и вертикальная суммы равны.',
    takeaway: 'Суммарные горизонтальная и вертикальная силы равны, поэтому итоговый вектор направлен под 45°.'
  },
  {
    title: 'Хитрый угол 30°', grid: 'triangle', angle30: true, q: { x: 324, y: 146 }, forceLength: 2 * Math.sqrt(3) * S,
    description: 'Заряд +4q больше в четыре раза, но расположен дальше. Найди соотношение сил.',
    sources: [
      { id: 'a', x: 324, y: 146 + 2 * Math.sqrt(3) * S, charge: -1, label: '−q', hint: '−q притягивает +Q вниз. Эта сила будет нашей единицей длины.' },
      { id: 'b', x: 324 + 6 * S, y: 146 + 2 * Math.sqrt(3) * S, charge: 4, label: '+4q', hint: 'Гипотенуза вдвое длиннее катета. По закону Кулона увеличение заряда в 4 раза компенсируется увеличением расстояния в 2 раза.' }
    ],
    lines: [['Q', 'a'], ['a', 'b'], ['b', 'Q']],
    resultHint: 'Две силы равны и образуют угол 120°. Результат направлен по биссектрисе — на 30° вниз от горизонтали влево.',
    takeaway: 'Две равные силы под углом 120° дают равнодействующую той же длины, направленную по биссектрисе.'
  },
  {
    title: 'Четыре угла квадрата', grid: 'square', q: { x: 400, y: 264 }, forceLength: Math.SQRT2 * 2 * S,
    description: 'Четыре заряда расположены в вершинах квадрата, а +Q — в центре. Найди силу каждого заряда.',
    sources: [
      { id: 'a', x: 528, y: 136, charge: 1, label: '+q', hint: 'Заряд +q сверху справа отталкивает +Q вниз-влево. Используй эту силу для выбора масштаба.' },
      { id: 'b', x: 272, y: 136, charge: -2, label: '−2q', hint: 'Отрицательный заряд притягивает +Q вверх-влево. Он вдвое больше единичного заряда.' },
      { id: 'c', x: 272, y: 392, charge: 1, label: '+q', hint: 'Положительный заряд снизу слева отталкивает +Q вверх-вправо.' },
      { id: 'd', x: 528, y: 392, charge: -1, label: '−q', hint: 'Отрицательный заряд снизу справа притягивает +Q вниз-вправо.' }
    ],
    lines: [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'a'], ['a', 'c'], ['b', 'd']],
    resultHint: 'Все вершины одинаково удалены от центра. Противоположно направленные силы удобно сокращать попарно.',
    takeaway: 'Часть диагональных сил компенсируется. Суммарная сила направлена вверх-влево.'
  },
  {
    title: 'Три заряда и −Q', grid: 'square', q: { x: 400, y: 325, charge: -1 }, forceLength: Math.SQRT2 * S,
    description: 'Теперь выделенный заряд отрицательный. Он находится посередине гипотенузы равнобедренного прямоугольного треугольника.',
    sources: [
      { id: 'a', x: 304, y: 421, charge: -1, label: '−q', hint: 'Два отрицательных заряда отталкиваются: сила от −q направлена вверх-вправо.' },
      { id: 'b', x: 304, y: 229, charge: 4, label: '+4q', hint: 'Положительный заряд +4q притягивает −Q вверх-влево с силой вчетверо больше единичной.' },
      { id: 'c', x: 496, y: 229, charge: 3, label: '+3q', hint: 'Положительный заряд +3q притягивает −Q вверх-вправо с силой в три раза больше единичной.' }
    ],
    lines: [['a', 'b'], ['b', 'c'], ['c', 'a']],
    resultHint: 'Все расстояния от −Q до вершин равны. Сложи диагональные силы, учитывая их коэффициенты 1, 4 и 3.',
    takeaway: 'Горизонтальные составляющие компенсируются, поэтому результирующая направлена вертикально вверх.'
  },
  {
    title: 'Силы на гипотенузе', grid: 'square', q: { x: 400, y: 325 }, forceLength: Math.SQRT2 * S,
    description: '+Q находится посередине гипотенузы. В трёх вершинах — заряды разных знаков и величин.',
    sources: [
      { id: 'a', x: 304, y: 229, charge: -1, label: '−q', hint: 'Отрицательный заряд сверху слева притягивает +Q вверх-влево.' },
      { id: 'b', x: 496, y: 229, charge: 1, label: '+q', hint: 'Положительный заряд сверху справа отталкивает +Q вниз-влево.' },
      { id: 'c', x: 304, y: 421, charge: 3, label: '+3q', hint: 'Положительный заряд +3q снизу слева отталкивает +Q вверх-вправо с тройной силой.' }
    ],
    lines: [['a', 'b'], ['b', 'c'], ['c', 'a']],
    resultHint: 'Расстояния до всех вершин равны. Сложи диагональные силы величиной F, F и 3F.',
    takeaway: 'Результирующая направлена вверх-вправо: её горизонтальная составляющая равна одной единице, вертикальная — трём.'
  },
  {
    title: 'Заряд под вершиной', grid: 'square', q: { x: 400, y: 292, charge: -1 }, forceLength: S * 2,
    description: 'В основании высоты расположен −Q. Два положительных и один отрицательный заряд находятся на одинаковом расстоянии от него.',
    sources: [
      { id: 'a', x: 528, y: 292, charge: 1, label: '+q', hint: 'Заряд +q справа притягивает −Q вправо. Эта сила задаёт масштаб.' },
      { id: 'b', x: 400, y: 164, charge: -1, label: '−q', hint: 'Отрицательный заряд сверху отталкивает −Q вниз.' },
      { id: 'c', x: 272, y: 292, charge: 3, label: '+3q', hint: 'Заряд +3q слева притягивает −Q влево с тройной силой.' }
    ],
    lines: [['a', 'b'], ['b', 'c'], ['c', 'a'], ['b', 'Q']],
    resultHint: 'Сначала сложи горизонтальные силы: одна вправо и три влево. Затем добавь вертикальную вниз.',
    takeaway: 'После сложения горизонтальных сил остаётся две единицы влево и одна вниз.'
  },
  {
    title: 'Другой треугольник 30°', grid: 'triangle', angle30: true, q: { x: 324, y: 300, charge: -1 }, forceLength: Math.sqrt(3) * S,
    description: 'Угол 30° снова помогает сравнить расстояния. Учти, что выделенный заряд −Q отрицательный.',
    sources: [
      { id: 'a', x: 324 + 6 * S, y: 300 + 2 * Math.sqrt(3) * S, charge: 2, label: '+2q', hint: 'Далёкий положительный заряд притягивает −Q вниз-вправо вдоль гипотенузы. Начни с этой силы.' },
      { id: 'b', x: 324, y: 300 + 2 * Math.sqrt(3) * S, charge: -1, label: '−q', hint: 'Заряд −q расположен вдвое ближе, чем +2q. Он отталкивает −Q вверх с силой вдвое больше первой.' }
    ],
    lines: [['Q', 'a'], ['a', 'b'], ['b', 'Q']],
    resultHint: 'Сила вдоль гипотенузы направлена вниз-вправо, а вертикальная сила вдвое больше и направлена вверх.',
    takeaway: 'При уменьшении расстояния вдвое сила возрастает в четыре раза, но заряд на гипотенузе вдвое больше: итоговое отношение сил 1:2.'
  },
  {
    title: 'Ещё четыре заряда', grid: 'square', q: { x: 400, y: 264 }, forceLength: Math.SQRT2 * S,
    description: 'Снова квадрат, но теперь другие заряды. Найди равнодействующую в его центре.',
    sources: [
      { id: 'a', x: 528, y: 392, charge: 1, label: '+q', hint: 'Положительный заряд снизу справа отталкивает +Q вверх-влево. Возьми эту силу за единицу.' },
      { id: 'b', x: 272, y: 136, charge: -1, label: '−q', hint: 'Отрицательный заряд сверху слева притягивает +Q вверх-влево.' },
      { id: 'c', x: 528, y: 136, charge: 2, label: '+2q', hint: 'Заряд +2q сверху справа отталкивает +Q вниз-влево с двойной силой.' },
      { id: 'd', x: 272, y: 392, charge: -1, label: '−q', hint: 'Отрицательный заряд снизу слева притягивает +Q вниз-влево.' }
    ],
    lines: [['a', 'c'], ['c', 'b'], ['b', 'd'], ['d', 'a'], ['a', 'b'], ['c', 'd']],
    resultHint: 'Все силы диагональные. Просуммируй отдельно горизонтальные и вертикальные составляющие.',
    takeaway: 'Горизонтальные составляющие дают пять единиц влево, а вертикальные — одну вниз.'
  },
  {
    title: 'Равносторонний треугольник', grid: 'triangle', q: { x: 280, y: 320 }, forceLength: 2 * S,
    description: 'В равностороннем треугольнике расстояния от +Q до двух других зарядов одинаковы.',
    sources: [
      { id: 'a', x: 280 + 6 * S, y: 320, charge: -1, label: '−q', hint: 'Отрицательный заряд справа притягивает +Q горизонтально вправо.' },
      { id: 'b', x: 280 + 3 * S, y: 320 - 3 * Math.sqrt(3) * S, charge: 2, label: '+2q', hint: 'Заряд +2q наверху отталкивает +Q вниз-влево. Его сила вдвое больше первой.' }
    ],
    lines: [['Q', 'a'], ['a', 'b'], ['b', 'Q']],
    resultHint: 'Сложи горизонтальную силу вправо и двойную силу вниз-влево. Их горизонтальные составляющие взаимно уничтожаются.',
    takeaway: 'Равнодействующая направлена вертикально вниз: горизонтальные составляющие сократились.'
  }
];

const $ = id => document.getElementById(id);
const board = $('board');
const state = {
  level: 0,
  selected: 0,
  phase: 'forces',
  solved: {},
  forceScale: null,
  draft: null,
  resultDraft: null,
  dragging: false,
  completed: new Set(loadCompleted())
};

function loadCompleted() {
  try { const saved = JSON.parse(localStorage.getItem('electrogrid-completed') || '[]'); return Array.isArray(saved) ? saved.filter(n => Number.isInteger(n) && n >= 0 && n < LEVELS.length) : []; }
  catch { return []; }
}

function svg(tag, attrs, parent) {
  const el = document.createElementNS(SVG_NS, tag);
  for (const [key, value] of Object.entries(attrs || {})) el.setAttribute(key, value);
  if (parent) parent.appendChild(el);
  return el;
}

function vectorLength(v) { return Math.hypot(v.x, v.y); }
function add(a, b) { return { x: a.x + b.x, y: a.y + b.y }; }
function minus(a, b) { return { x: a.x - b.x, y: a.y - b.y }; }
function current() { return LEVELS[state.level]; }

function expectedForces(level) {
  const first = level.sources[0];
  const targetSign = level.q.charge ?? 1;
  const initialR = Math.hypot(level.q.x - first.x, level.q.y - first.y);
  const scale = level.forceLength * initialR ** 2 / Math.abs(first.charge);
  return level.sources.map(source => {
    const dx = level.q.x - source.x, dy = level.q.y - source.y;
    const r = Math.hypot(dx, dy);
    return { x: scale * targetSign * source.charge * dx / r ** 3, y: scale * targetSign * source.charge * dy / r ** 3 };
  });
}

function expectedResult(level) {
  return expectedForces(level).reduce(add, { x: 0, y: 0 });
}

function scaledForce(level, index) {
  const nominal = expectedForces(level)[index];
  const scale = state.forceScale ?? 1;
  return { x: nominal.x * scale, y: nominal.y * scale };
}

function makeGrid() {
  const layer = $('gridLayer');
  layer.replaceChildren();
  const level = current(), q = level.q;
  if (level.grid === 'square') {
    for (let ix = -24; ix <= 24; ix++) {
      const x = q.x + ix * S;
      if (x < 0 || x > 800) continue;
      svg('line', { x1: x, y1: 0, x2: x, y2: 500, class: 'grid-line' }, layer);
    }
    for (let iy = -20; iy <= 20; iy++) {
      const y = q.y + iy * S;
      if (y < 0 || y > 500) continue;
      svg('line', { x1: 0, y1: y, x2: 800, y2: y, class: 'grid-line' }, layer);
      for (let ix = -24; ix <= 24; ix++) {
        const x = q.x + ix * S;
        if (x >= 0 && x <= 800) svg('circle', { cx: x, cy: y, r: 1.55, class: 'grid-dot' }, layer);
      }
    }
  } else {
    for (let j = -25; j <= 25; j++) {
      const y = q.y + j * TRI_DY;
      if (y < -TRI_DY || y > 500 + TRI_DY) continue;
      if (y >= 0 && y <= 500) svg('line', { x1: 0, y1: y, x2: 800, y2: y, class: 'grid-line' }, layer);
      for (let i = -35; i <= 35; i++) {
        const x = q.x + i * S + j * S / 2;
        if (x < -S || x > 800 + S) continue;
        svg('line', { x1: x, y1: y, x2: x + S / 2, y2: y + TRI_DY, class: 'grid-line' }, layer);
        svg('line', { x1: x, y1: y, x2: x - S / 2, y2: y + TRI_DY, class: 'grid-line' }, layer);
        if (x >= 0 && x <= 800 && y >= 0 && y <= 500) svg('circle', { cx: x, cy: y, r: 1.45, class: 'grid-dot' }, layer);
      }
    }
  }
}

function renderDiagram() {
  const level = current();
  const edges = $('diagramLayer'); edges.replaceChildren();
  const charges = $('chargesLayer'); charges.replaceChildren();
  const lookup = { Q: level.q, ...Object.fromEntries(level.sources.map(c => [c.id, c])) };
  for (const [a, b] of level.lines) {
    const from = lookup[a], to = lookup[b];
    svg('line', { x1: from.x, y1: from.y, x2: to.x, y2: to.y, class: 'diagram-edge' }, edges);
  }
  if (level.angle30) {
    const corner = level.sources.reduce((a, b) => a.x > b.x ? a : b);
    svg('path', { d: `M ${corner.x - 40} ${corner.y} A40 40 0 0 1 ${corner.x - 34.64} ${corner.y - 20}`, stroke: '#7490a9', 'stroke-width': 1.7, fill: 'none' }, edges);
    const t = svg('text', { x: corner.x - 69, y: corner.y - 12, fill: '#53718b', 'font-size': 17 }, edges); t.textContent = '30°';
  }
  const drawCharge = (p, isTarget = false, isActive = false) => {
    const positive = (p.charge ?? 1) > 0;
    if (isActive) svg('circle', { cx: p.x, cy: p.y, r: 29, fill: 'none', stroke: '#0d9ab0', 'stroke-width': 2.8, 'stroke-dasharray': '5 5' }, charges);
    svg('circle', { cx: p.x, cy: p.y, r: 15, fill: positive ? '#e6f1ff' : '#fff0ec', stroke: positive ? '#317dcc' : '#df6a57', 'stroke-width': 2.6 }, charges);
    const mark = svg('text', { x: p.x, y: p.y + 1, class: 'charge-symbol', fill: positive ? '#2370bb' : '#cb5546' }, charges); mark.textContent = positive ? '+' : '−';
    const labelX = p.x + (isTarget ? 19 : 0);
    const labelY = p.y - (isTarget ? 15 : 26);
    const lbl = svg('text', { x: labelX, y: labelY, class: isTarget ? 'charge-label target-label' : 'charge-label', 'text-anchor': isTarget ? 'start' : 'middle' }, charges);
    if (isTarget) {
      const sign = svg('tspan', { fill: '#7343c6' }, lbl); sign.textContent = positive ? '+' : '−';
      const letter = svg('tspan', { fill: '#7343c6' }, lbl); letter.textContent = 'Q';
    } else lbl.textContent = p.label;
  };
  for (let i = 0; i < level.sources.length; i++) drawCharge(level.sources[i], false, state.phase === 'forces' && i === state.selected && !state.solved[i]);
  drawCharge(level.q, true, false);
}

function arrow(layer, vec, color, marker, dashed = false, offset = 0) {
  if (!vec || vectorLength(vec) < 2) return;
  const q = current().q, end = add(q, vec), length = vectorLength(vec);
  // The arrow is drawn above charges; leave the +Q glyph unobscured at its origin.
  const inset = Math.min(18, length * .32);
  const start = { x: q.x + vec.x * inset / length, y: q.y + vec.y * inset / length };
  // Only the visible drawing is displaced; the vector remains snapped to its grid node.
  const sideways = { x: -vec.y * offset / length, y: vec.x * offset / length };
  svg('line', { x1: start.x + sideways.x, y1: start.y + sideways.y, x2: end.x + sideways.x, y2: end.y + sideways.y, class: `vector${dashed ? ' vector-draft' : ''}`, stroke: color, 'marker-end': `url(#${marker})` }, layer);
}

function renderVectors() {
  const layer = $('arrowsLayer'); layer.replaceChildren();
  const forces = Object.values(state.solved).map(vec => ({ vec, color: '#367cc9', marker: 'arrow-force', dashed: false }));
  if (state.phase === 'forces' && state.draft) forces.push({ vec: state.draft, color: '#0a92a3', marker: 'arrow-draft', dashed: state.dragging });
  for (let index = 0; index < forces.length; index++) {
    const item = forces[index];
    const length = vectorLength(item.vec);
    if (length < 2) continue;
    const coinciding = forces.map((other, i) => ({ i, length: vectorLength(other.vec), vec: other.vec }))
      .filter(other => other.length >= 2 && (item.vec.x * other.vec.x + item.vec.y * other.vec.y) / (length * other.length) > .999)
      .map(other => other.i);
    // Parallel force arrows are nudged sideways by 8 SVG units.
    // Their saved coordinates, physical lengths and checking are unchanged.
    const offset = coinciding.length > 1 ? (coinciding.indexOf(index) - (coinciding.length - 1) / 2) * 8 : 0;
    arrow(layer, item.vec, item.color, item.marker, item.dashed, offset);
  }
  // The red resultant stays on the true grid nodes, between coinciding blue arrows.
  // Adding it must never change the positions of previously drawn forces.
  if (state.resultDraft) arrow(layer, state.resultDraft, '#e36848', 'arrow-result', state.dragging && state.phase === 'result');
  const cursor = $('cursorLayer'); cursor.replaceChildren();
  const draft = state.phase === 'result' ? state.resultDraft : state.draft;
  if (state.dragging && draft) {
    const end = add(current().q, draft);
    svg('circle', { cx: end.x, cy: end.y, r: 12, class: 'target-halo' }, cursor);
  }
}

function renderProgress() {
  $('progressCount').textContent = `${state.completed.size} из ${LEVELS.length}`;
  $('progressFill').style.width = `${100 * state.completed.size / LEVELS.length}%`;
  const menu = $('levelButtons'); menu.replaceChildren();
  LEVELS.forEach((_, i) => {
    const btn = document.createElement('button');
    btn.type = 'button'; btn.className = 'level-button' + (i === state.level ? ' active' : '') + (state.completed.has(i) ? ' completed' : '');
    btn.textContent = i + 1;
    btn.title = `Уровень ${i + 1}`;
    btn.setAttribute('aria-label', `Уровень ${i + 1}${state.completed.has(i) ? ', пройден' : ''}`);
    btn.setAttribute('aria-current', i === state.level ? 'step' : 'false');
    btn.addEventListener('click', () => startLevel(i));
    menu.appendChild(btn);
  });
}

function renderSidebar() {
  const level = current();
  $('taskTitle').textContent = state.phase === 'forces' ? 'Построй силы' : state.phase === 'result' ? 'Сложи векторы' : 'Задача решена';
  $('taskDescription').textContent = state.phase === 'forces' ? level.description : state.phase === 'result' ? 'Построй результирующий вектор из точки Q. Используй правило параллелограмма или многоугольника.' : 'Ты нашёл правильное направление и длину равнодействующей.';
  $('stepOne').className = `step ${state.phase === 'forces' ? 'active' : 'done'}`;
  $('stepTwo').className = `step ${state.phase === 'result' ? 'active' : state.phase === 'done' ? 'done' : ''}`;
  const list = $('forceList'); list.replaceChildren();
  if (state.phase === 'forces') {
    level.sources.forEach((source, i) => {
      const solved = Boolean(state.solved[i]);
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `force-item${i === state.selected && !solved ? ' active' : ''}${solved ? ' solved' : ''}`;
      const awaitingScale = state.forceScale === null && i !== 0;
      btn.disabled = solved || awaitingScale;
      const subtext = solved ? 'Построена верно' : awaitingScale ? 'Сначала задай масштаб' : i === state.selected && state.forceScale === null ? 'Выбери любую длину' : i === state.selected ? 'Строим сейчас' : 'Ещё не построена';
      btn.innerHTML = `<span class="charge-dot ${source.charge > 0 ? 'plus' : 'minus'}">${source.charge > 0 ? '+' : '−'}</span><span class="force-item-copy"><strong>Сила от ${source.label}</strong><small>${subtext}</small></span><span class="item-status">${solved ? '✓' : i === state.selected ? '●' : '○'}</span>`;
      if (!btn.disabled) btn.addEventListener('click', () => { state.selected = i; state.draft = null; setFeedback(`Строй силу со стороны заряда ${source.label}.`, 'info'); renderSidebar(); renderDiagram(); renderVectors(); });
      list.appendChild(btn);
    });
  } else if (state.phase === 'result') {
    const p = document.createElement('p'); p.className = 'result-task';
    const targetLabel = level.q.charge === -1 ? '−Q' : '+Q';
    p.innerHTML = `<b>Последний шаг.</b> Проведи итоговую стрелку из ${targetLabel}. Её длина и направление должны соответствовать сумме всех сил.`;
    list.appendChild(p);
  }
  $('successPanel').hidden = state.phase !== 'done';
  $('successText').textContent = level.takeaway;
  $('nextButton').textContent = state.level < LEVELS.length - 1 ? 'Следующий уровень' : 'Вернуться к первому';
  $('checkButton').style.display = state.phase === 'done' ? 'none' : '';
  $('hintButton').style.display = state.phase === 'done' ? 'none' : '';
  $('checkButton').disabled = state.phase === 'forces' ? !state.draft : !state.resultDraft;
  $('boardInstruction').textContent = state.phase === 'forces'
    ? `Нарисуй силу, с которой ${level.sources[state.selected].label} действует на Q`
    : state.phase === 'result' ? 'Нарисуй итоговый вектор из Q' : 'Правильно! Выбери следующий уровень';
  renderProgress();
}

function setFeedback(message, kind = 'info') {
  $('feedback').className = `feedback ${kind === 'info' ? '' : kind}`;
  $('feedbackText').textContent = message;
  $('feedback').querySelector('.feedback-icon').textContent = kind === 'good' ? '✓' : kind === 'warning' ? '!' : 'i';
}

function updateBoardViewBox() {
  const small = window.innerWidth <= 530;
  const tablet = window.innerWidth <= 820;
  const narrowDesktop = window.innerWidth <= 1050;
  const width = small ? 460 : tablet ? 560 : narrowDesktop ? 590 : 640;
  const height = small ? 500 : tablet ? 440 : narrowDesktop ? 420 : 400;
  const x = small ? (current().grid === 'triangle' ? 130 : 170) : tablet ? (current().grid === 'triangle' ? 100 : 120) : narrowDesktop ? 105 : 80;
  const y = small ? 0 : tablet ? 30 : narrowDesktop ? 35 : 45;
  board.setAttribute('viewBox', `${x} ${y} ${width} ${height}`);
}

function startLevel(index) {
  state.level = index; state.selected = 0; state.phase = 'forces'; state.solved = {}; state.forceScale = null; state.draft = null; state.resultDraft = null; state.dragging = false;
  $('levelKicker').textContent = `УРОВЕНЬ ${String(index + 1).padStart(2, '0')}`;
  updateBoardViewBox();
  makeGrid(); renderSidebar(); renderVectors(); renderDiagram();
  setFeedback('Первую силу можно нарисовать любой длины: она задаёт масштаб. Важно только направление.');
}

function pointerPosition(event) {
  const pt = board.createSVGPoint(); pt.x = event.clientX; pt.y = event.clientY;
  const matrix = board.getScreenCTM();
  return matrix ? pt.matrixTransform(matrix.inverse()) : { x: 0, y: 0 };
}

function snap(pos) {
  const level = current(), q = level.q;
  if (level.grid === 'square') return { x: q.x + Math.round((pos.x - q.x) / S) * S, y: q.y + Math.round((pos.y - q.y) / S) * S };
  const j0 = Math.round((pos.y - q.y) / TRI_DY);
  let best = null;
  for (let j = j0 - 2; j <= j0 + 2; j++) {
    const i = Math.round((pos.x - q.x - j * S / 2) / S);
    const candidate = { x: q.x + i * S + j * S / 2, y: q.y + j * TRI_DY };
    const distance = vectorLength(minus(candidate, pos));
    if (!best || distance < best.distance) best = { ...candidate, distance };
  }
  return { x: best.x, y: best.y };
}

board.addEventListener('pointerdown', event => {
  if (state.phase === 'done') return;
  const pos = pointerPosition(event);
  if (vectorLength(minus(pos, current().q)) > 48) { setFeedback('Чтобы начать построение, нажми на заряд Q и потяни от него стрелку.', 'warning'); return; }
  event.preventDefault();
  state.dragging = true;
  board.setPointerCapture(event.pointerId);
  if (state.phase === 'forces') state.draft = { x: 0, y: 0 }; else state.resultDraft = { x: 0, y: 0 };
  renderVectors(); renderSidebar();
});

board.addEventListener('pointermove', event => {
  if (!state.dragging) return;
  event.preventDefault();
  const target = snap(pointerPosition(event));
  const vec = minus(target, current().q);
  if (state.phase === 'forces') state.draft = vec; else state.resultDraft = vec;
  renderVectors();
  $('checkButton').disabled = vectorLength(vec) < 2;
});

function finishDrag(event) {
  if (!state.dragging) return;
  event.preventDefault();
  state.dragging = false;
  const vec = state.phase === 'forces' ? state.draft : state.resultDraft;
  if (vec && vectorLength(vec) > 2) setFeedback('Стрелка построена. Теперь нажми «Проверить построение».');
  else { if (state.phase === 'forces') state.draft = null; else state.resultDraft = null; setFeedback('Потяни стрелку дальше от точки Q до другого узла сетки.', 'warning'); }
  renderVectors(); renderSidebar();
}
board.addEventListener('pointerup', finishDrag);
board.addEventListener('pointercancel', finishDrag);

function assess(drawn, expected, isResult = false) {
  const drawnLength = vectorLength(drawn), expectedLength = vectorLength(expected);
  if (!drawnLength) return { correct: false, message: 'Построй стрелку из точки Q.' };
  if (expectedLength < .01) return { correct: drawnLength < 16, message: 'Равнодействующая равна нулю — стрелка должна иметь нулевую длину.' };
  const cosine = (drawn.x * expected.x + drawn.y * expected.y) / (drawnLength * expectedLength);
  if (cosine < .97) return { correct: false, message: isResult ? 'Проверь правило параллелограмма: равнодействующая идёт из Q к противоположной вершине.' : 'Проверь направление стрелки: какие заряды притягивают, а какие отталкивают?' };
  if (Math.abs(drawnLength - expectedLength) / expectedLength > .10) return { correct: false, message: isResult ? 'Проверь, как ты складываешь векторы по правилу параллелограмма: равнодействующая — его диагональ, а не сторона.' : 'Направление близко к верному, но длина не подходит. Сравни заряды и расстояния по закону Кулона.' };
  if (vectorLength(minus(drawn, expected)) > 13) return { correct: false, message: isResult ? 'Почти получилось! Конец диагонали должен попасть в противоположную вершину параллелограмма.' : 'Почти правильно! Найди более точный узел сетки.' };
  return { correct: true };
}

function assessReference(drawn, expected) {
  const length = vectorLength(drawn), nominalLength = vectorLength(expected);
  if (length < 2) return { correct: false, message: 'Построй стрелку ненулевой длины из Q.' };
  const dot = drawn.x * expected.x + drawn.y * expected.y;
  const perpendicular = Math.abs(drawn.x * expected.y - drawn.y * expected.x) / nominalLength;
  if (dot <= 0 || perpendicular > 3) return { correct: false, message: 'Для первой силы длина произвольная. Проверь только направление стрелки.' };
  return { correct: true };
}

function checkAnswer() {
  const level = current();
  if (state.phase === 'forces') {
    if (!state.draft || vectorLength(state.draft) < 2) return setFeedback('Сначала нарисуй вектор из Q.', 'warning');
    const isReference = state.forceScale === null;
    const evaluation = isReference ? assessReference(state.draft, expectedForces(level)[0]) : assess(state.draft, scaledForce(level, state.selected));
    if (!evaluation.correct) return setFeedback(evaluation.message, 'warning');
    const source = level.sources[state.selected];
    if (isReference) state.forceScale = vectorLength(state.draft) / vectorLength(expectedForces(level)[0]);
    state.solved[state.selected] = state.draft;
    state.draft = null;
    const next = level.sources.findIndex((source, i) => !state.solved[i]);
    if (next === -1) {
      state.phase = 'result';
      setFeedback('Все силы построены правильно! Теперь сложи их и проведи итоговую стрелку из Q.', 'good');
    } else {
      state.selected = next;
      setFeedback(isReference ? 'Верно! Первая сила задала масштаб. Теперь построй остальные силы с правильными относительными длинами.' : `Верно! Сила от ${source.label} построена. Теперь переходи к следующей.`, 'good');
    }
    renderSidebar(); renderVectors(); renderDiagram();
  } else if (state.phase === 'result') {
    if (!state.resultDraft || vectorLength(state.resultDraft) < 2) return setFeedback('Нарисуй результирующий вектор из Q.', 'warning');
    const nominalResult = expectedResult(level);
    const evaluation = assess(state.resultDraft, { x: nominalResult.x * state.forceScale, y: nominalResult.y * state.forceScale }, true);
    if (!evaluation.correct) return setFeedback(evaluation.message, 'warning');
    state.phase = 'done';
    state.completed.add(state.level);
    try { localStorage.setItem('electrogrid-completed', JSON.stringify([...state.completed])); } catch {}
    setFeedback('Отлично! Правильно определены и направление, и модуль результирующей силы.', 'good');
    renderSidebar(); renderVectors(); renderDiagram();
  }
}

$('checkButton').addEventListener('click', checkAnswer);
$('hintButton').addEventListener('click', () => {
  const level = current();
  const message = state.phase === 'result' ? level.resultHint : level.sources[state.selected].hint;
  setFeedback(message);
});
$('resetButton').addEventListener('click', () => startLevel(state.level));
$('nextButton').addEventListener('click', () => startLevel((state.level + 1) % LEVELS.length));
board.addEventListener('keydown', event => { if (event.key === 'Enter' && state.phase !== 'done') checkAnswer(); });
window.addEventListener('resize', updateBoardViewBox);

startLevel(0);
