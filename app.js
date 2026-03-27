/* ─────────────────────────────────────────
   CPM CALCULATOR — app.js
───────────────────────────────────────── */

// ── DEFAULT PRODUCTS ──────────────────────────────────────────────────
const DEFAULT_PRODUCTS = [
  { id: 'p001', name: 'Addressable Streaming Audio',       category: 'Audio',       cpm: 38.00, minImpressions: 0, specs: '', notes: 'Nexstar minimum $500/month' },
  { id: 'p002', name: 'Streaming Audio',                   category: 'Audio',       cpm: 35.00, minImpressions: 0, specs: '', notes: 'Nexstar minimum $500/month' },
  { id: 'p003', name: 'Addressable CTV 100',               category: 'CTV / OTT',  cpm: 40.00, minImpressions: 0, specs: '', notes: 'Nexstar minimum $500/month' },
  { id: 'p004', name: 'Addressable CTV 65',                category: 'CTV / OTT',  cpm: 30.00, minImpressions: 0, specs: '', notes: 'Nexstar minimum $500/month' },
  { id: 'p005', name: 'Addressable CTV 90',                category: 'CTV / OTT',  cpm: 36.00, minImpressions: 0, specs: '', notes: 'Nexstar minimum $500/month' },
  { id: 'p006', name: 'CTV 100',                           category: 'CTV / OTT',  cpm: 37.00, minImpressions: 0, specs: '', notes: 'Nexstar minimum $500/month' },
  { id: 'p007', name: 'CTV 65',                            category: 'CTV / OTT',  cpm: 27.00, minImpressions: 0, specs: '', notes: 'Nexstar minimum $500/month' },
  { id: 'p008', name: 'CTV 90',                            category: 'CTV / OTT',  cpm: 33.00, minImpressions: 0, specs: '', notes: 'Nexstar minimum $500/month' },
  { id: 'p009', name: 'Premium CTV',                       category: 'CTV / OTT',  cpm: 66.00, minImpressions: 0, specs: 'Hulu, Paramount+, Peacock, Max, Discovery+, Disney+', notes: 'Nexstar minimum $1,000/month; no guarantees of delivery on each network' },
  { id: 'p010', name: 'Streaming+',                        category: 'CTV / OTT',  cpm: 42.00, minImpressions: 0, specs: 'HuluLive, Philo, SlingTV, RokuTV, Fubo', notes: 'Nexstar minimum $1,000/month; up to 10% on HuluLive' },
  { id: 'p011', name: 'Spanish Language OTT',              category: 'CTV / OTT',  cpm: 48.00, minImpressions: 0, specs: '', notes: 'Nexstar minimum $1,000/month' },
  { id: 'p012', name: 'Streaming Sports: Sports OTT - Live and On Demand', category: 'CTV / OTT', cpm: 60.00, minImpressions: 0, specs: '', notes: 'Nexstar minimum $500/month' },
  { id: 'p013', name: 'Fox 59 Now CTV App',                category: 'CTV / OTT',  cpm: 20.00, minImpressions: 0, specs: 'AppleTV, FireTV, Roku, Samsung', notes: '' },
  { id: 'p014', name: 'Live Sports RON',                   category: 'Live Sports', cpm: 75.00,  minImpressions: 0, specs: '', notes: 'Nexstar minimum $1,000/month; no game level or sport type' },
  { id: 'p015', name: 'Live Sports - Basketball',          category: 'Live Sports', cpm: 108.00, minImpressions: 0, specs: 'Regular Season, Now-Apr 2026', notes: '$1,000/month minimum; delivery not guaranteed; geo-target only' },
  { id: 'p016', name: 'Live Sports - March Mania',         category: 'Live Sports', cpm: 155.00, minImpressions: 0, specs: 'Mar 15-Apr 6, 2026', notes: '$1,000/month minimum; delivery not guaranteed; geo-target only' },
  { id: 'p017', name: 'Live Sports - Olympics',            category: 'Live Sports', cpm: 122.00, minImpressions: 0, specs: 'Feb 6-22, 2026', notes: '$1,000/month minimum; delivery not guaranteed; geo-target only' },
  { id: 'p018', name: 'Live Sports - Soccer',              category: 'Live Sports', cpm: 65.00,  minImpressions: 0, specs: 'Regular Season, Feb-Oct 2026', notes: '$1,000/month minimum; delivery not guaranteed; geo-target only' },
  { id: 'p019', name: 'Live Sports - Hockey (NHL)',        category: 'Live Sports', cpm: 87.00,  minImpressions: 0, specs: 'Regular Season, Now-Apr 2026', notes: '$1,000/month minimum; delivery not guaranteed; geo-target only' },
  { id: 'p020', name: 'Live Sports - Motorsports',         category: 'Live Sports', cpm: 70.00,  minImpressions: 0, specs: 'Feb-Nov', notes: '$1,000/month minimum; delivery not guaranteed; geo-target only' },
  { id: 'p021', name: 'Live Sports - Baseball/MLB',        category: 'Live Sports', cpm: 82.00,  minImpressions: 0, specs: 'Mar-Sep Regular Season', notes: '$1,000/month minimum; delivery not guaranteed; geo-target only' },
  { id: 'p022', name: 'Live Sports - Golf',                category: 'Live Sports', cpm: 77.00,  minImpressions: 0, specs: 'Jan-Aug', notes: '$1,000/month minimum; delivery not guaranteed; geo-target only' },
  { id: 'p023', name: 'Live Sports - Tennis',              category: 'Live Sports', cpm: 88.00,  minImpressions: 0, specs: 'Jan-Sep', notes: '$1,000/month minimum; delivery not guaranteed; geo-target only' },
  { id: 'p024', name: 'Addressable Display',               category: 'Display',     cpm: 14.00, minImpressions: 0, specs: '', notes: 'Nexstar minimum $500/month display; no minimum for geofence' },
  { id: 'p025', name: 'Display',                           category: 'Display',     cpm: 9.00,  minImpressions: 0, specs: '', notes: 'Nexstar minimum $500/month display; no minimum for geofence' },
  { id: 'p026', name: 'GeoFence',                          category: 'Display',     cpm: 12.00, minImpressions: 0, specs: '', notes: 'No minimum for geofence' },
  { id: 'p027', name: 'Keyword Display',                   category: 'Display',     cpm: 12.00, minImpressions: 0, specs: '', notes: 'Nexstar minimum $500/month display' },
  { id: 'p028', name: 'Run-of-Site Display Ads',           category: 'Display',     cpm: 8.00,  minImpressions: 0, specs: '300x250, 728x90, 320x50, 300x600', notes: '' },
  { id: 'p029', name: 'Run-of-Site Billboard',             category: 'Display',     cpm: 12.00, minImpressions: 0, specs: '970x250', notes: '' },
  { id: 'p030', name: 'Run-of-Site Expandable/Retractable', category: 'Display',   cpm: 12.00, minImpressions: 0, specs: '300x250, 728x90', notes: '' },
  { id: 'p031', name: 'Run-of-Site Display w/ In-Banner Video', category: 'Display', cpm: 15.00, minImpressions: 0, specs: 'In-Banner Video', notes: '' },
  { id: 'p032', name: 'Point-of-Entry Takeover Display',   category: 'Display',     cpm: 12.00, minImpressions: 0, specs: '970x250, 728x90, 300x250, 300x600, 320x50', notes: '' },
  { id: 'p033', name: 'Social Display Ads (Website & News App)', category: 'Display', cpm: 11.00, minImpressions: 0, specs: '300x250 Only', notes: '' },
  { id: 'p034', name: 'Masthead Header Microbar (Weather Widget)', category: 'Display', cpm: 10.00, minImpressions: 0, specs: '88x31', notes: '' },
  { id: 'p035', name: 'NAN - Display CPM RON',             category: 'Display',     cpm: 6.00,  minImpressions: 0, specs: '', notes: 'Campaigns can target audiences by geography' },
  { id: 'p036', name: 'DOOH - Display',                    category: 'DOOH',        cpm: 20.00, minImpressions: 0, specs: '', notes: 'Nexstar minimum $500/month' },
  { id: 'p037', name: 'DOOH - Video',                      category: 'DOOH',        cpm: 31.00, minImpressions: 0, specs: '', notes: 'Nexstar minimum $500/month' },
  { id: 'p038', name: 'Addressable PreRoll',               category: 'Video',       cpm: 25.00, minImpressions: 0, specs: '', notes: 'Nexstar minimum $500/month display; no minimum for geofence' },
  { id: 'p039', name: 'GeoVideo',                          category: 'Video',       cpm: 22.00, minImpressions: 0, specs: '', notes: 'Nexstar minimum $500/month display; no minimum for geofence' },
  { id: 'p040', name: 'Keyword PreRoll',                   category: 'Video',       cpm: 24.00, minImpressions: 0, specs: '', notes: 'Nexstar minimum $500/month display; no minimum for geofence' },
  { id: 'p041', name: 'PreRoll',                           category: 'Video',       cpm: 22.00, minImpressions: 0, specs: '', notes: 'Nexstar minimum $500/month display; no minimum for geofence' },
  { id: 'p042', name: 'Run-of-Site PreRoll',               category: 'Video',       cpm: 25.00, minImpressions: 0, specs: ':15 or less', notes: '' },
  { id: 'p043', name: 'LiveStreaming',                      category: 'Video',       cpm: 25.00, minImpressions: 0, specs: ':15 or less', notes: '' },
  { id: 'p044', name: 'NAN - Video CPM RON',               category: 'Video',       cpm: 20.00, minImpressions: 0, specs: 'OLV, livestream, outstream', notes: 'Station O&O, The Hill and NewsNation' },
  { id: 'p045', name: 'NAN - Video OTT/CTV CPM RON',       category: 'Video',       cpm: 25.00, minImpressions: 0, specs: '', notes: 'Station O&O, The Hill and NewsNation' },
  { id: 'p046', name: 'YouTube (CPCV)',                    category: 'Video',       cpm: 0.10,  minImpressions: 0, specs: '', notes: 'Nexstar minimum $500/month; note: CPCV pricing' },
  { id: 'p047', name: 'Email Marketing',                   category: 'Email',       cpm: 25.00, minImpressions: 50000, specs: '', notes: 'Minimum COG $300 on initial or resend; minimum list 50,000' },
  { id: 'p048', name: 'Email Marketing (Postal File)',      category: 'Email',       cpm: 30.00, minImpressions: 0, specs: '', notes: 'No minimum' },
  { id: 'p049', name: 'Amazon O&O Premium: Prime Video + STV First Access', category: 'Amazon', cpm: 48.00, minImpressions: 0, specs: '', notes: 'Minimum $5,000/month with 3-month minimum' },
  { id: 'p050', name: 'Amazon STV Performance: STV + Display',              category: 'Amazon', cpm: 24.00, minImpressions: 0, specs: '', notes: 'Minimum $4,000/month with 3-month minimum' },
  { id: 'p051', name: 'Amazon STV Efficiency: STV + OLV',                   category: 'Amazon', cpm: 26.00, minImpressions: 0, specs: '', notes: 'Minimum $2,500/month with 3-month minimum' },
  { id: 'p052', name: 'STV Premium',                                         category: 'Amazon', cpm: 70.00, minImpressions: 0, specs: 'PrimeVideo, YTTV, Discovery+, Peacock, MAX, Hulu/Disney, Netflix', notes: 'Minimum $10,000/month with 3-month minimum' },
  { id: 'p053', name: 'Amazon Display',                                      category: 'Amazon', cpm: 11.00, minImpressions: 0, specs: '', notes: 'Minimum $1,000/month with 3-month minimum' },
  { id: 'p054', name: 'Amazon Online Digital Video',                         category: 'Amazon', cpm: 19.00, minImpressions: 0, specs: 'Amazon, Amazon Publisher Direct, DV360', notes: 'Minimum $1,000/month with 3-month minimum' },
  { id: 'p055', name: 'AMC MatchBack Report',                                category: 'Amazon', cpm: 1.00,  minImpressions: 0, specs: '', notes: 'Add CPM to digital product. Quarterly: $10k/month min.' },
  { id: 'p056', name: 'YTTV (RON) :15 Non-Skip',           category: 'YTTV',        cpm: 69.00,  minImpressions: 0, specs: ':15', notes: 'Minimum $5k/month for 3 months' },
  { id: 'p057', name: 'YTTV (RON) :30 Non-Skip',           category: 'YTTV',        cpm: 87.00,  minImpressions: 0, specs: ':30', notes: 'Minimum $5k/month for 3 months' },
  { id: 'p058', name: 'YTTV (RON) :60 Non-Skip',           category: 'YTTV',        cpm: 157.00, minImpressions: 0, specs: ':60', notes: 'Minimum $5k/month for 3 months' },
  { id: 'p059', name: 'YTTV (RON - Sports) :15 Non-Skip',  category: 'YTTV',        cpm: 99.00,  minImpressions: 0, specs: ':15', notes: 'Minimum $5k/month for 3 months' },
  { id: 'p060', name: 'YTTV (RON - Sports) :30 Non-Skip',  category: 'YTTV',        cpm: 117.00, minImpressions: 0, specs: ':30', notes: 'Minimum $5k/month for 3 months' },
  { id: 'p061', name: 'YTTV (RON - Sports) :60 Non-Skip',  category: 'YTTV',        cpm: 215.00, minImpressions: 0, specs: ':60', notes: 'Minimum $5k/month for 3 months' },
  { id: 'p062', name: 'VDS Digital Audio',                 category: 'VDS',         cpm: 38.00, minImpressions: 0, specs: '', notes: 'Only available for agencies with spend over $150k' },
  { id: 'p063', name: 'VDS Preroll Video AT',              category: 'VDS',         cpm: 22.00, minImpressions: 0, specs: '', notes: 'Only available for agencies with spend over $150k' },
  { id: 'p064', name: 'VDS Display AT',                    category: 'VDS',         cpm: 12.00, minImpressions: 0, specs: '', notes: 'Only available for agencies with spend over $150k' },
  { id: 'p065', name: 'VDS Display Device ID',             category: 'VDS',         cpm: 18.00, minImpressions: 120000, specs: '', notes: 'Min 120,000 impressions total; pre-sale audit required' },
  { id: 'p066', name: 'VDS Display Device ID AT',          category: 'VDS',         cpm: 20.00, minImpressions: 120000, specs: '', notes: 'Min 120,000 impressions total; pre-sale audit required' },
  { id: 'p067', name: 'VDS CTV',                           category: 'VDS',         cpm: 35.00, minImpressions: 0, specs: '', notes: 'Only available for agencies with spend over $150k' },
  { id: 'p068', name: 'VDS CTV AT',                        category: 'VDS',         cpm: 40.00, minImpressions: 0, specs: '', notes: 'Only available for agencies with spend over $150k' },
  { id: 'p069', name: 'VDS CTV 90/OTT 10',                category: 'VDS',         cpm: 32.00, minImpressions: 0, specs: '', notes: 'Only available for agencies with spend over $150k' },
  { id: 'p070', name: 'VDS CTV 90/OTT 10 AT',             category: 'VDS',         cpm: 38.00, minImpressions: 0, specs: '', notes: 'Only available for agencies with spend over $150k' },
  { id: 'p071', name: 'VDS CTV 65/OTT 30',                category: 'VDS',         cpm: 30.00, minImpressions: 0, specs: '', notes: 'Only available for agencies with spend over $150k' },
  { id: 'p072', name: 'VDS CTV 65/OTT 30 AT',             category: 'VDS',         cpm: 32.00, minImpressions: 0, specs: '', notes: 'Only available for agencies with spend over $150k' },
  { id: 'p073', name: 'WeatherCo Mobile APP ROS 300x250',         category: 'WeatherCo', cpm: 10.00, minImpressions: 0, specs: '300x250', notes: '' },
  { id: 'p074', name: 'WeatherCo Mobile APP ROS 320x50',          category: 'WeatherCo', cpm: 5.00,  minImpressions: 0, specs: '320x50', notes: '' },
  { id: 'p075', name: 'WeatherCo Mobile APP Home Screen 320x50',  category: 'WeatherCo', cpm: 6.00,  minImpressions: 0, specs: '320x50', notes: '' },
  { id: 'p076', name: 'WeatherCo Mobile APP PreRoll ROS',         category: 'WeatherCo', cpm: 22.00, minImpressions: 0, specs: ':15 or :30', notes: 'Mobile app only; geo-targeting only' },
  { id: 'p077', name: 'WeatherCo Web ROS 728x90, 300x600',        category: 'WeatherCo', cpm: 14.00, minImpressions: 0, specs: '728x90, 300x600', notes: '' },
  { id: 'p078', name: 'WeatherCo Web ROS 300x250',                category: 'WeatherCo', cpm: 14.00, minImpressions: 0, specs: '300x250', notes: '' },
  { id: 'p079', name: 'WeatherCo Web Billboard',                  category: 'WeatherCo', cpm: 14.00, minImpressions: 0, specs: 'Desktop billboard', notes: '' },
  { id: 'p080', name: 'WeatherCo Mobile Integrated Marquee',      category: 'WeatherCo', cpm: 17.00, minImpressions: 0, specs: 'Mobile App Only', notes: 'MINIMUM $100,000 retail; non-cancelable' },
  { id: 'p081', name: 'Weather CO Add-on: Weather Conditions',    category: 'WeatherCo', cpm: 3.00,  minImpressions: 0, specs: '', notes: 'Add CPM to digital product' },
  { id: 'p082', name: 'Weather CO Add-on: 3P Data',               category: 'WeatherCo', cpm: 4.00,  minImpressions: 0, specs: '', notes: 'Add CPM to digital product' },
  { id: 'p083', name: 'Weather CO Add-on: 1P Data',               category: 'WeatherCo', cpm: 4.00,  minImpressions: 0, specs: '', notes: 'Add CPM to digital product' },
];

// ── STATE ──────────────────────────────────────────────────────────────
let products = [];
let editingId = null;
let solveFor = 'cpm';
let sortDir = 'asc';
let sortField = 'name';
let calcProductId = null; // tracks which product is loaded in the calculator

// ── STORAGE ────────────────────────────────────────────────────────────
const DATA_VERSION = '2';

function loadProducts() {
  try {
    const version = localStorage.getItem('cpm_version');
    const raw = localStorage.getItem('cpm_products');
    if (raw && version === DATA_VERSION) {
      products = JSON.parse(raw);
    } else {
      products = DEFAULT_PRODUCTS.map(p => ({ ...p }));
      saveProducts();
    }
  } catch {
    products = DEFAULT_PRODUCTS.map(p => ({ ...p }));
  }
}

function saveProducts() {
  localStorage.setItem('cpm_products', JSON.stringify(products));
  localStorage.setItem('cpm_version', DATA_VERSION);
}

function genId() {
  return 'p' + Date.now() + Math.random().toString(36).slice(2, 6);
}

// ── TAB NAVIGATION ────────────────────────────────────────────────────
function switchTab(tab) {
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tab-section').forEach(s => s.classList.remove('active'));
  document.querySelector('[data-tab="' + tab + '"]').classList.add('active');
  document.getElementById('tab-' + tab).classList.add('active');
  if (tab === 'calculator') renderQuickFill();
  if (tab === 'compare') renderCompare();
  if (tab === 'package') renderPackagePicker();
}

document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => switchTab(btn.dataset.tab));
});

// ── PRODUCTS TAB ──────────────────────────────────────────────────────
function getCategories() {
  return [...new Set(products.map(p => p.category).filter(Boolean))].sort();
}

function updateCategoryFilter() {
  const sel = document.getElementById('filterCategory');
  const cur = sel.value;
  const cats = getCategories();
  sel.innerHTML = '<option value="">All Categories</option>' +
    cats.map(c => `<option value="${c}" ${c === cur ? 'selected' : ''}>${c}</option>`).join('');
  const dl = document.getElementById('categoryList');
  dl.innerHTML = cats.map(c => `<option value="${c}"></option>`).join('');
}

function renderProducts() {
  const search = document.getElementById('searchProducts').value.toLowerCase();
  const catFilter = document.getElementById('filterCategory').value;
  updateCategoryFilter();

  let filtered = products.filter(p => {
    const matchSearch = !search ||
      p.name.toLowerCase().includes(search) ||
      (p.category || '').toLowerCase().includes(search) ||
      (p.notes || '').toLowerCase().includes(search);
    const matchCat = !catFilter || p.category === catFilter;
    return matchSearch && matchCat;
  });

  filtered.sort((a, b) => {
    let av = sortField === 'cpm' ? a.cpm : (a[sortField] || '').toString().toLowerCase();
    let bv = sortField === 'cpm' ? b.cpm : (b[sortField] || '').toString().toLowerCase();
    if (av < bv) return sortDir === 'asc' ? -1 : 1;
    if (av > bv) return sortDir === 'asc' ? 1 : -1;
    return 0;
  });

  const grid = document.getElementById('productsGrid');

  if (filtered.length === 0) {
    grid.innerHTML = `<div class="empty-state"><div class="empty-icon">&#128205;</div><div>${products.length === 0 ? 'No products yet.' : 'No products match your filters.'}</div></div>`;
    return;
  }

  grid.innerHTML = filtered.map((p, i) => `
    <div class="product-card" style="animation-delay:${i * 0.03}s">
      <div class="product-card-header">
        <div class="product-name">${escHtml(p.name)}</div>
        ${p.category ? `<span class="product-category-badge">${escHtml(p.category)}</span>` : ''}
      </div>
      <div class="product-cpm">$${formatCpm(p.cpm)}</div>
      <div class="product-cpm-label">CPM</div>
      <div class="product-meta">
        ${p.specs ? `<span>&#128208; ${escHtml(p.specs)}</span>` : ''}
        ${p.minImpressions ? `<span>&#128202; Min ${formatNum(p.minImpressions)} imps</span>` : ''}
        ${p.notes ? `<span>&#128221; ${escHtml(p.notes)}</span>` : ''}
      </div>
      <div class="product-actions">
        <button class="product-btn" onclick="fillCalc('${p.id}')">&#9889; Use in Calculation</button>
        <button class="product-btn pkg-add-btn" onclick="addToPackageFromProduct('${p.id}')">&#43; Add to Package</button>
      </div>
    </div>
  `).join('');
}

document.getElementById('sortToggle').addEventListener('click', function () {
  const fields = ['name', 'cpm', 'category'];
  const idx = fields.indexOf(sortField);
  if (sortDir === 'asc') {
    sortDir = 'desc';
  } else {
    sortField = fields[(idx + 1) % fields.length];
    sortDir = 'asc';
  }
  const labels = { name: 'Name', cpm: 'CPM', category: 'Category' };
  const arrows = { asc: 'up', desc: 'down' };
  this.textContent = `Sort: ${labels[sortField]} ${arrows[sortDir]}`;
  renderProducts();
});

document.getElementById('searchProducts').addEventListener('input', renderProducts);
document.getElementById('filterCategory').addEventListener('change', renderProducts);

// ── MODAL (kept dormant, no UI trigger) ───────────────────────────────
function openModal() { document.getElementById('modalOverlay').classList.add('open'); }
function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  editingId = null;
  clearModalForm();
}
function clearModalForm() {
  ['formName','formCategory','formCpm','formMinImpressions','formSpecs','formNotes']
    .forEach(id => document.getElementById(id).value = '');
}
document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('modalCancel').addEventListener('click', closeModal);
document.getElementById('modalOverlay').addEventListener('click', e => {
  if (e.target === document.getElementById('modalOverlay')) closeModal();
});
document.getElementById('modalSave').addEventListener('click', () => {
  const name = document.getElementById('formName').value.trim();
  const cpmVal = parseFloat(document.getElementById('formCpm').value);
  if (!name) { toast('Product name is required', 'error'); return; }
  if (isNaN(cpmVal) || cpmVal < 0) { toast('Please enter a valid CPM', 'error'); return; }
  const data = {
    name,
    category: document.getElementById('formCategory').value.trim(),
    cpm: cpmVal,
    minImpressions: parseInt(document.getElementById('formMinImpressions').value) || 0,
    specs: document.getElementById('formSpecs').value.trim(),
    notes: document.getElementById('formNotes').value.trim(),
  };
  if (editingId) {
    const idx = products.findIndex(p => p.id === editingId);
    if (idx !== -1) products[idx] = { ...products[idx], ...data };
    toast('Product updated', 'success');
  } else {
    products.push({ id: genId(), ...data });
    toast('Product added', 'success');
  }
  saveProducts();
  renderProducts();
  closeModal();
});

// ── CALCULATOR TAB ────────────────────────────────────────────────────
function setSolveFor(field) {
  solveFor = field;
  document.querySelectorAll('.solve-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.target === field);
  });
  document.querySelectorAll('.field-badge').forEach(badge => {
    badge.textContent = badge.closest('.calc-field')?.id === 'field-' + field ? 'solve' : '';
  });
  document.querySelectorAll('.formula-part').forEach(part => {
    part.classList.toggle('solving', part.dataset.field === field);
  });
  ['cpm','cost','impressions'].forEach(f => {
    const inp = document.getElementById('input-' + f);
    inp.disabled = (f === field);
    inp.closest('.input-row').classList.toggle('disabled', f === field);
    if (f === field) inp.value = '';
  });
  clearResult();
}

function fillCalc(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;

  calcProductId = id;

  // Set CPM and switch to "Solve for Cost" so user enters impressions to get spend
  setSolveFor('cost');
  document.getElementById('input-cpm').value = p.cpm;

  // Update context banner
  document.getElementById('calcContextName').textContent = p.name + ' ($' + formatCpm(p.cpm) + ' CPM)';
  document.getElementById('calcContext').classList.add('active');

  switchTab('calculator');
  renderQuickFill();
  toast('Loaded: ' + p.name);
}

document.getElementById('calcContextClear').addEventListener('click', () => {
  calcProductId = null;
  document.getElementById('calcContext').classList.remove('active');
  document.getElementById('calcContextName').textContent = '';
  setSolveFor('cpm');
  ['cpm','cost','impressions'].forEach(f => {
    document.getElementById('input-' + f).value = '';
  });
  clearResult();
});

document.querySelectorAll('.solve-btn').forEach(btn => {
  btn.addEventListener('click', () => setSolveFor(btn.dataset.target));
});

document.getElementById('calcSolve').addEventListener('click', calculate);
document.getElementById('calcClear').addEventListener('click', () => {
  ['cpm','cost','impressions'].forEach(f => {
    const inp = document.getElementById('input-' + f);
    if (!inp.disabled) inp.value = '';
  });
  clearResult();
});

['input-cpm','input-cost','input-impressions'].forEach(id => {
  document.getElementById(id).addEventListener('keydown', e => {
    if (e.key === 'Enter') calculate();
  });
});

function calculate() {
  const get = id => {
    const v = parseFloat(document.getElementById('input-' + id).value);
    return isNaN(v) ? null : v;
  };

  if (solveFor === 'cpm') {
    const cost = get('cost'), imps = get('impressions');
    if (cost === null || imps === null) { toast('Enter Cost and Impressions', 'error'); return; }
    if (imps === 0) { toast('Impressions cannot be zero', 'error'); return; }
    const cpm = (cost / imps) * 1000;
    document.getElementById('input-cpm').value = cpm.toFixed(2);
    showResult('CPM', '$' + formatCpm(cpm), 'Based on $' + formatMoney(cost) + ' spend across ' + formatNum(imps) + ' impressions');

  } else if (solveFor === 'cost') {
    const cpm = get('cpm'), imps = get('impressions');
    if (cpm === null || imps === null) { toast('Enter CPM and Impressions', 'error'); return; }
    const cost = (cpm / 1000) * imps;
    document.getElementById('input-cost').value = cost.toFixed(2);
    showResult('Total Cost', '$' + formatMoney(cost), 'At $' + formatCpm(cpm) + ' CPM for ' + formatNum(imps) + ' impressions');

  } else if (solveFor === 'impressions') {
    const cpm = get('cpm'), cost = get('cost');
    if (cpm === null || cost === null) { toast('Enter CPM and Cost', 'error'); return; }
    if (cpm === 0) { toast('CPM cannot be zero', 'error'); return; }
    const imps = (cost / cpm) * 1000;
    document.getElementById('input-impressions').value = Math.round(imps);
    showResult('Impressions', formatNum(Math.round(imps)), 'At $' + formatCpm(cpm) + ' CPM with $' + formatMoney(cost) + ' budget');
  }
}

function showResult(label, value, sub) {
  const el = document.getElementById('calcResult');
  el.innerHTML = `<div class="result-label">${label}</div><div class="result-value">${value}</div><div class="result-sub">${sub}</div>`;
  el.classList.add('visible');
}

function clearResult() {
  const el = document.getElementById('calcResult');
  el.classList.remove('visible');
  el.innerHTML = '';
}

function renderQuickFill() {
  const list = document.getElementById('quickFillList');
  const catSel = document.getElementById('quickFillCategory');

  // Populate category dropdown
  if (catSel) {
    const cur = catSel.value;
    const cats = getCategories();
    catSel.innerHTML = '<option value="">All Categories</option>' +
      cats.map(c => `<option value="${c}" ${c === cur ? 'selected' : ''}>${c}</option>`).join('');
  }

  if (products.length === 0) {
    list.innerHTML = '<div style="color:var(--text-muted);font-size:12px;">No products yet.</div>';
    return;
  }

  const selectedCat = catSel ? catSel.value : '';
  const filtered = [...products]
    .filter(p => !selectedCat || p.category === selectedCat)
    .sort((a, b) => a.name.localeCompare(b.name));

  list.innerHTML = filtered.length === 0
    ? '<div style="color:var(--text-muted);font-size:12px;padding:8px 0;">No products in this category.</div>'
    : filtered.map(p => `
      <div class="quick-fill-item ${calcProductId === p.id ? 'active' : ''}" onclick="fillCalc('${p.id}')">
        <span class="qf-name">${escHtml(p.name)}</span>
        <span class="qf-cpm">$${formatCpm(p.cpm)}</span>
      </div>
    `).join('');
}

function quickFill(id) {
  fillCalc(id);
}

// ── COMPARE TAB ───────────────────────────────────────────────────────
let selectedForCompare = new Set();

function renderCompare() {
  const list = document.getElementById('compareProductList');
  const catSel = document.getElementById('compareCategory');

  // Populate category dropdown
  if (catSel) {
    const cur = catSel.value;
    const cats = getCategories();
    catSel.innerHTML = '<option value="">All Categories</option>' +
      cats.map(c => `<option value="${c}" ${c === cur ? 'selected' : ''}>${c}</option>`).join('');
  }

  const selectedCat = catSel ? catSel.value : '';
  const sorted = [...products]
    .filter(p => !selectedCat || p.category === selectedCat)
    .sort((a, b) => a.name.localeCompare(b.name));

  if (sorted.length === 0) {
    list.innerHTML = '<div style="color:var(--text-muted);font-size:12px;padding:8px 0;">No products match.</div>';
  } else {
    list.innerHTML = sorted.map(p => `
      <label class="compare-check-item ${selectedForCompare.has(p.id) ? 'selected' : ''}">
        <input type="checkbox" value="${p.id}" ${selectedForCompare.has(p.id) ? 'checked' : ''} onchange="toggleCompare('${p.id}', this.checked)" />
        <span class="cc-info">
          <span class="cc-name">${escHtml(p.name)}</span>
          ${p.category ? `<span class="cc-cat">${escHtml(p.category)}</span>` : ''}
        </span>
        <span class="cc-cpm">$${formatCpm(p.cpm)}</span>
      </label>
    `).join('');
  }
  renderCompareTable();
}

function toggleCompare(id, checked) {
  if (checked) selectedForCompare.add(id);
  else selectedForCompare.delete(id);
  document.querySelectorAll('.compare-check-item').forEach(el => {
    const cb = el.querySelector('input[type=checkbox]');
    el.classList.toggle('selected', cb && cb.checked);
  });
  renderCompareTable();
}

document.getElementById('compareBudget').addEventListener('input', renderCompareTable);

function renderCompareTable() {
  const results = document.getElementById('compareResults');
  const budget = parseFloat(document.getElementById('compareBudget').value) || 0;
  const selected = products.filter(p => selectedForCompare.has(p.id));

  if (selected.length === 0) {
    results.innerHTML = '<div class="compare-results-empty">Select products above to compare</div>';
    return;
  }

  const maxCpm = Math.max(...selected.map(p => p.cpm));
  const minCpm = Math.min(...selected.map(p => p.cpm));
  const sortedSel = [...selected].sort((a, b) => a.cpm - b.cpm);
  const avgCpm = selected.reduce((s, p) => s + p.cpm, 0) / selected.length;

  const rows = sortedSel.map(p => {
    const barWidth = maxCpm > 0 ? (p.cpm / maxCpm * 100).toFixed(1) : 0;
    const impsForBudget = budget > 0 ? Math.round((budget / p.cpm) * 1000) : null;
    const isBest = p.cpm === minCpm && selected.length > 1;
    return `<tr>
      <td class="td-name">${escHtml(p.name)} ${isBest ? '<span style="color:var(--accent);font-size:11px;">&#9733; lowest CPM</span>' : ''}</td>
      <td>${p.category ? `<span class="product-category-badge">${escHtml(p.category)}</span>` : '&mdash;'}</td>
      <td class="td-cpm">$${formatCpm(p.cpm)}</td>
      <td class="td-bar"><div class="cpm-bar-bg"><div class="cpm-bar-fill" style="width:${barWidth}%"></div></div></td>
      ${budget > 0 ? `<td class="td-impressions has-budget">${formatNum(impsForBudget)}</td>` : `<td class="td-impressions">&mdash;</td>`}
    </tr>`;
  }).join('');

  results.innerHTML = `<div class="compare-table-wrap"><table>
    <thead><tr>
      <th>Product</th><th>Category</th><th>CPM</th><th>Relative Cost</th>
      <th>${budget > 0 ? 'Impressions ($' + formatMoney(budget) + ' budget)' : 'Impressions'}</th>
    </tr></thead>
    <tbody>${rows}</tbody>
    <tfoot><tr style="border-top:2px solid var(--border2)">
      <td colspan="2" style="color:var(--text-muted);font-size:12px;text-transform:uppercase;letter-spacing:.04em;">Summary (${selected.length} products)</td>
      <td class="td-cpm" style="font-size:14px;">avg $${formatCpm(avgCpm)}</td>
      <td></td>
      <td class="td-impressions ${budget > 0 ? 'has-budget' : ''}">${budget > 0 ? formatNum(Math.round((budget / avgCpm) * 1000)) + ' avg' : '&mdash;'}</td>
    </tr></tfoot>
  </table></div>`;
}

// ── PACKAGE BUILDER ───────────────────────────────────────────────────
// packageItems: array of { productId, budget }
let packageItems = [];

function renderPackagePicker() {
  const search = document.getElementById('pkgSearch').value.toLowerCase();
  const cat = document.getElementById('pkgFilterCategory').value;

  // Update category dropdown
  const catSel = document.getElementById('pkgFilterCategory');
  const cur = catSel.value;
  const cats = getCategories();
  catSel.innerHTML = '<option value="">All Categories</option>' +
    cats.map(c => `<option value="${c}" ${c === cur ? 'selected' : ''}>${c}</option>`).join('');

  let filtered = products.filter(p => {
    const matchSearch = !search ||
      p.name.toLowerCase().includes(search) ||
      (p.category || '').toLowerCase().includes(search);
    const matchCat = !cat || p.category === cat;
    return matchSearch && matchCat;
  }).sort((a, b) => a.name.localeCompare(b.name));

  const inPackage = new Set(packageItems.map(i => i.productId));

  document.getElementById('pkgProductList').innerHTML = filtered.map(p => `
    <div class="pkg-pick-item ${inPackage.has(p.id) ? 'in-package' : ''}" onclick="togglePackageProduct('${p.id}')">
      <div class="pkg-pick-info">
        <div class="pkg-pick-name">${escHtml(p.name)}</div>
        <div class="pkg-pick-meta">${p.category ? escHtml(p.category) + ' &bull; ' : ''}$${formatCpm(p.cpm)} CPM</div>
      </div>
      <div class="pkg-pick-action">
        ${inPackage.has(p.id)
          ? '<span class="pkg-added-badge">&#10003; Added</span>'
          : '<span class="pkg-add-icon">&#43;</span>'}
      </div>
    </div>
  `).join('') || '<div style="color:var(--text-muted);padding:12px;font-size:13px;">No products match.</div>';

  renderPackageWorkspace();
}

function togglePackageProduct(id) {
  const idx = packageItems.findIndex(i => i.productId === id);
  if (idx !== -1) {
    packageItems.splice(idx, 1);
  } else {
    packageItems.push({ productId: id, budget: 0 });
  }
  renderPackagePicker();
}

function addToPackageFromProduct(id) {
  if (!packageItems.find(i => i.productId === id)) {
    packageItems.push({ productId: id, budget: 0 });
    toast('Added to package');
  }
  switchTab('package');
  renderPackagePicker();
}

function renderPackageWorkspace() {
  const container = document.getElementById('pkgLineItems');

  if (packageItems.length === 0) {
    container.innerHTML = `<div class="pkg-empty"><div class="pkg-empty-icon">&#128230;</div><div>Select products from the left to build your package</div></div>`;
    document.getElementById('pkgSummary').style.display = 'none';
    return;
  }

  container.innerHTML = `
    <div class="pkg-line-header">
      <span>Product</span>
      <span>CPM</span>
      <span>Budget Allocation</span>
      <span>Impressions</span>
      <span></span>
    </div>
    ${packageItems.map((item, idx) => {
      const p = products.find(x => x.id === item.productId);
      if (!p) return '';
      const imps = item.budget > 0 ? Math.round((item.budget / p.cpm) * 1000) : 0;
      return `<div class="pkg-line-item">
        <div class="pkg-line-name">
          <div class="pkg-line-product-name">${escHtml(p.name)}</div>
          <div class="pkg-line-product-cat">${escHtml(p.category || '')}</div>
        </div>
        <div class="pkg-line-cpm">$${formatCpm(p.cpm)}</div>
        <div class="pkg-line-budget">
          <div class="input-row">
            <span class="input-prefix">$</span>
            <input type="number" class="pkg-budget-field" value="${item.budget || ''}" placeholder="0.00"
              step="100" min="0" data-idx="${idx}" oninput="updateItemBudget(${idx}, this.value)" />
          </div>
        </div>
        <div class="pkg-line-impressions ${imps > 0 ? 'has-value' : ''}">
          ${imps > 0 ? formatNum(imps) : '&mdash;'}
        </div>
        <div class="pkg-line-remove">
          <button class="pkg-remove-btn" onclick="removePackageItem(${idx})">&#215;</button>
        </div>
      </div>`;
    }).join('')}
  `;

  updatePackageSummary();
}

function updateItemBudget(idx, val) {
  packageItems[idx].budget = parseFloat(val) || 0;
  updatePackageSummary();
}

function removePackageItem(idx) {
  packageItems.splice(idx, 1);
  renderPackagePicker();
}

function updatePackageSummary() {
  const summary = document.getElementById('pkgSummary');

  if (packageItems.length === 0) {
    summary.style.display = 'none';
    return;
  }

  summary.style.display = 'block';

  let totalBudget = 0;
  let totalImpressions = 0;

  packageItems.forEach(item => {
    const p = products.find(x => x.id === item.productId);
    if (!p) return;
    const budget = item.budget || 0;
    totalBudget += budget;
    if (budget > 0) totalImpressions += Math.round((budget / p.cpm) * 1000);
  });

  const blendedCpm = totalImpressions > 0 ? (totalBudget / totalImpressions) * 1000 : 0;

  document.getElementById('pkgTotalBudget').textContent = '$' + formatMoney(totalBudget);
  document.getElementById('pkgTotalImpressions').textContent = totalImpressions > 0 ? formatNum(totalImpressions) : '&mdash;';
  document.getElementById('pkgBlendedCpm').textContent = blendedCpm > 0 ? '$' + formatCpm(blendedCpm) : '&mdash;';
  document.getElementById('pkgProductCount').textContent = packageItems.length;
}

function distributeEvenly() {
  const total = parseFloat(document.getElementById('pkgBudget').value) || 0;
  if (total <= 0) { toast('Enter a total budget first', 'error'); return; }
  if (packageItems.length === 0) { toast('Add products to your package first', 'error'); return; }
  const share = Math.round((total / packageItems.length) * 100) / 100;
  packageItems.forEach(item => item.budget = share);
  renderPackageWorkspace();
  // Re-render picker to keep state in sync
  renderPackagePicker();
  toast('Budget distributed evenly');
}

document.getElementById('pkgDistribute').addEventListener('click', distributeEvenly);
document.getElementById('pkgBudget').addEventListener('keydown', e => { if (e.key === 'Enter') distributeEvenly(); });

document.getElementById('pkgClearAll').addEventListener('click', () => {
  if (packageItems.length === 0) return;
  packageItems = [];
  document.getElementById('pkgBudget').value = '';
  renderPackagePicker();
  toast('Package cleared');
});

document.getElementById('pkgSearch').addEventListener('input', renderPackagePicker);
document.getElementById('pkgFilterCategory').addEventListener('change', renderPackagePicker);

// ── HELPERS ───────────────────────────────────────────────────────────
function formatCpm(v) { return Number(v).toFixed(2); }

function formatMoney(v) {
  return v >= 1000
    ? v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    : v.toFixed(2);
}

function formatNum(v) {
  if (v === null || v === undefined) return '&mdash;';
  if (v >= 1000000) return (v / 1000000).toFixed(2) + 'M';
  if (v >= 1000) return v.toLocaleString('en-US');
  return String(v);
}

function escHtml(s) {
  return String(s)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

let toastTimer;
function toast(msg, type = 'success') {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.className = 'toast show ' + type;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2800);
}

// ── INIT ──────────────────────────────────────────────────────────────
loadProducts();
renderProducts();
setSolveFor('cpm');
