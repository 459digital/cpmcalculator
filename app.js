/* ─────────────────────────────────────────
   CPM CALCULATOR — app.js
───────────────────────────────────────── */

// ── DEFAULT PRODUCTS ──────────────────────────────────────────────────
const DEFAULT_PRODUCTS = [
  { id: 'p1',  name: 'Homepage Takeover',       category: 'Display',     cpm: 28.00, minImpressions: 100000, specs: '1920×1080, 300×250', notes: 'Premium homepage placement' },
  { id: 'p2',  name: 'Leaderboard Banner',       category: 'Display',     cpm: 8.50,  minImpressions: 250000, specs: '728×90', notes: '' },
  { id: 'p3',  name: 'Medium Rectangle',         category: 'Display',     cpm: 6.00,  minImpressions: 250000, specs: '300×250', notes: '' },
  { id: 'p4',  name: 'Pre-Roll Video (15s)',      category: 'Video',       cpm: 22.00, minImpressions: 50000,  specs: '16:9, :15', notes: 'Skippable after 5s' },
  { id: 'p5',  name: 'Pre-Roll Video (30s)',      category: 'Video',       cpm: 28.00, minImpressions: 50000,  specs: '16:9, :30', notes: 'Non-skippable' },
  { id: 'p6',  name: 'Mid-Roll Video',            category: 'Video',       cpm: 32.00, minImpressions: 25000,  specs: '16:9, :15–:30', notes: 'In-content placement' },
  { id: 'p7',  name: 'Sponsored Content',         category: 'Native',      cpm: 18.00, minImpressions: 100000, specs: 'Article format', notes: 'Editorial-style placement' },
  { id: 'p8',  name: 'In-Feed Native',            category: 'Native',      cpm: 12.00, minImpressions: 150000, specs: '600×400 image', notes: '' },
  { id: 'p9',  name: 'Email Newsletter',          category: 'Email',       cpm: 45.00, minImpressions: 10000,  specs: '600×200 header', notes: 'Weekly send, 35% open rate' },
  { id: 'p10', name: 'Email Dedicated Blast',     category: 'Email',       cpm: 65.00, minImpressions: 5000,   specs: '600px wide', notes: 'Solo send to full list' },
  { id: 'p11', name: 'Podcast Host-Read Ad (:30)', category: 'Audio',      cpm: 25.00, minImpressions: 10000,  specs: ':30 host-read', notes: 'CPM based on downloads' },
  { id: 'p12', name: 'Programmatic Display',      category: 'Programmatic',cpm: 3.50,  minImpressions: 500000, specs: 'Various IAB sizes', notes: 'Floor CPM; actual may vary' },
];

// ── STATE ──────────────────────────────────────────────────────────────
let products = [];
let editingId = null;
let solveFor = 'cpm';
let sortDir = 'asc';
let sortField = 'name';

// ── STORAGE ────────────────────────────────────────────────────────────
function loadProducts() {
  try {
    const raw = localStorage.getItem('cpm_products');
    if (raw) {
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
}

function genId() {
  return 'p' + Date.now() + Math.random().toString(36).slice(2, 6);
}

// ── TAB NAVIGATION ────────────────────────────────────────────────────
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const tab = btn.dataset.tab;
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-section').forEach(s => s.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('tab-' + tab).classList.add('active');
    if (tab === 'calculator') renderQuickFill();
    if (tab === 'compare') renderCompare();
  });
});

// ── PRODUCTS TAB ──────────────────────────────────────────────────────
function getCategories() {
  const cats = [...new Set(products.map(p => p.category).filter(Boolean))].sort();
  return cats;
}

function updateCategoryFilter() {
  const sel = document.getElementById('filterCategory');
  const cur = sel.value;
  const cats = getCategories();
  sel.innerHTML = '<option value="">All Categories</option>' +
    cats.map(c => `<option value="${c}" ${c === cur ? 'selected' : ''}>${c}</option>`).join('');

  // Datalist for form
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

  // Sort
  filtered.sort((a, b) => {
    let av = sortField === 'cpm' ? a.cpm : (a[sortField] || '').toString().toLowerCase();
    let bv = sortField === 'cpm' ? b.cpm : (b[sortField] || '').toString().toLowerCase();
    if (av < bv) return sortDir === 'asc' ? -1 : 1;
    if (av > bv) return sortDir === 'asc' ? 1 : -1;
    return 0;
  });

  const grid = document.getElementById('productsGrid');

  if (filtered.length === 0) {
    grid.innerHTML = `<div class="empty-state">
      <div class="empty-icon">📭</div>
      <div>${products.length === 0 ? 'No products yet. Add one to get started.' : 'No products match your filters.'}</div>
    </div>`;
    return;
  }

  grid.innerHTML = filtered.map((p, i) => `
    <div class="product-card" style="animation-delay:${i * 0.04}s">
      <div class="product-card-header">
        <div class="product-name">${escHtml(p.name)}</div>
        ${p.category ? `<span class="product-category-badge">${escHtml(p.category)}</span>` : ''}
      </div>
      <div class="product-cpm">$${formatCpm(p.cpm)}</div>
      <div class="product-cpm-label">CPM</div>
      <div class="product-meta">
        ${p.specs ? `<span>📐 ${escHtml(p.specs)}</span>` : ''}
        ${p.minImpressions ? `<span>📊 Min ${formatNum(p.minImpressions)} imps</span>` : ''}
        ${p.notes ? `<span>📝 ${escHtml(p.notes)}</span>` : ''}
      </div>
      <div class="product-actions">
        <button class="product-btn" onclick="editProduct('${p.id}')">✏ Edit</button>
        <button class="product-btn" onclick="fillCalc('${p.id}')">⚡ Use in Calc</button>
        <button class="product-btn danger" onclick="deleteProduct('${p.id}')">✕ Delete</button>
      </div>
    </div>
  `).join('');
}

function editProduct(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  editingId = id;
  document.getElementById('modalTitle').textContent = 'Edit Product';
  document.getElementById('formName').value = p.name;
  document.getElementById('formCategory').value = p.category || '';
  document.getElementById('formCpm').value = p.cpm;
  document.getElementById('formMinImpressions').value = p.minImpressions || '';
  document.getElementById('formSpecs').value = p.specs || '';
  document.getElementById('formNotes').value = p.notes || '';
  openModal();
}

function deleteProduct(id) {
  if (!confirm('Delete this product?')) return;
  products = products.filter(p => p.id !== id);
  saveProducts();
  renderProducts();
  toast('Product deleted', 'error');
}

function fillCalc(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  document.getElementById('input-cpm').value = p.cpm;
  setSolveFor('cpm');
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tab-section').forEach(s => s.classList.remove('active'));
  document.querySelector('[data-tab="calculator"]').classList.add('active');
  document.getElementById('tab-calculator').classList.add('active');
  renderQuickFill();
  toast(`CPM set to $${formatCpm(p.cpm)} from ${p.name}`);
}

// Sort toggle
document.getElementById('sortToggle').addEventListener('click', function () {
  const fields = ['name', 'cpm', 'category'];
  const idx = fields.indexOf(sortField);
  if (idx === fields.length - 1 || sortDir === 'desc') {
    if (sortDir === 'asc') {
      sortDir = 'desc';
    } else {
      sortField = fields[(idx + 1) % fields.length];
      sortDir = 'asc';
    }
  } else {
    sortDir = 'desc';
  }
  const labels = { name: 'Name', cpm: 'CPM', category: 'Category' };
  this.textContent = `Sort: ${labels[sortField]} ${sortDir === 'asc' ? '↑' : '↓'}`;
  renderProducts();
});

document.getElementById('searchProducts').addEventListener('input', renderProducts);
document.getElementById('filterCategory').addEventListener('change', renderProducts);

// ── MODAL ────────────────────────────────────────────────────────────
function openModal() {
  document.getElementById('modalOverlay').classList.add('open');
}
function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  editingId = null;
  clearModalForm();
}
function clearModalForm() {
  ['formName','formCategory','formCpm','formMinImpressions','formSpecs','formNotes']
    .forEach(id => document.getElementById(id).value = '');
}

document.getElementById('openAddModal').addEventListener('click', () => {
  editingId = null;
  document.getElementById('modalTitle').textContent = 'Add Product';
  clearModalForm();
  openModal();
});
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
    toast('Product updated ✓', 'success');
  } else {
    products.push({ id: genId(), ...data });
    toast('Product added ✓', 'success');
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

  // Disable the solve field input, enable others
  ['cpm','cost','impressions'].forEach(f => {
    const inp = document.getElementById('input-' + f);
    inp.disabled = (f === field);
    inp.closest('.input-row').classList.toggle('disabled', f === field);
    if (f === field) inp.value = '';
  });

  clearResult();
}

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

// Enter key triggers calc
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

  const resultEl = document.getElementById('calcResult');

  if (solveFor === 'cpm') {
    const cost = get('cost'), imps = get('impressions');
    if (cost === null || imps === null) { toast('Enter Cost and Impressions', 'error'); return; }
    if (imps === 0) { toast('Impressions cannot be zero', 'error'); return; }
    const cpm = (cost / imps) * 1000;
    document.getElementById('input-cpm').value = cpm.toFixed(2);
    showResult('CPM', `$${formatCpm(cpm)}`, `Based on $${formatMoney(cost)} spend across ${formatNum(imps)} impressions`);

  } else if (solveFor === 'cost') {
    const cpm = get('cpm'), imps = get('impressions');
    if (cpm === null || imps === null) { toast('Enter CPM and Impressions', 'error'); return; }
    const cost = (cpm / 1000) * imps;
    document.getElementById('input-cost').value = cost.toFixed(2);
    showResult('Total Cost', `$${formatMoney(cost)}`, `At $${formatCpm(cpm)} CPM for ${formatNum(imps)} impressions`);

  } else if (solveFor === 'impressions') {
    const cpm = get('cpm'), cost = get('cost');
    if (cpm === null || cost === null) { toast('Enter CPM and Cost', 'error'); return; }
    if (cpm === 0) { toast('CPM cannot be zero', 'error'); return; }
    const imps = (cost / cpm) * 1000;
    document.getElementById('input-impressions').value = Math.round(imps);
    showResult('Impressions', formatNum(Math.round(imps)), `At $${formatCpm(cpm)} CPM with $${formatMoney(cost)} budget`);
  }
}

function showResult(label, value, sub) {
  const el = document.getElementById('calcResult');
  el.innerHTML = `
    <div class="result-label">${label}</div>
    <div class="result-value">${value}</div>
    <div class="result-sub">${sub}</div>
  `;
  el.classList.add('visible');
}

function clearResult() {
  const el = document.getElementById('calcResult');
  el.classList.remove('visible');
  el.innerHTML = '';
}

function renderQuickFill() {
  const list = document.getElementById('quickFillList');
  if (products.length === 0) {
    list.innerHTML = '<div style="color:var(--text-muted);font-size:12px;">No products yet.</div>';
    return;
  }
  const sorted = [...products].sort((a, b) => a.name.localeCompare(b.name));
  list.innerHTML = sorted.map(p => `
    <div class="quick-fill-item" onclick="quickFill('${p.id}')">
      <span class="qf-name">${escHtml(p.name)}</span>
      <span class="qf-cpm">$${formatCpm(p.cpm)}</span>
    </div>
  `).join('');
}

function quickFill(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  if (solveFor !== 'cpm') {
    document.getElementById('input-cpm').value = p.cpm;
  } else {
    // If solving for CPM, switch to solve for cost and set CPM
    setSolveFor('cost');
    document.getElementById('input-cpm').value = p.cpm;
  }
  toast(`CPM set to $${formatCpm(p.cpm)}`);
}

// ── COMPARE TAB ───────────────────────────────────────────────────────
let selectedForCompare = new Set();

function renderCompare() {
  const list = document.getElementById('compareProductList');
  const sorted = [...products].sort((a, b) => a.name.localeCompare(b.name));

  if (sorted.length === 0) {
    list.innerHTML = '<div style="color:var(--text-muted);font-size:12px;padding:8px 0;">No products yet. Add some on the Products tab.</div>';
  } else {
    list.innerHTML = sorted.map(p => `
      <label class="compare-check-item ${selectedForCompare.has(p.id) ? 'selected' : ''}">
        <input type="checkbox" value="${p.id}" ${selectedForCompare.has(p.id) ? 'checked' : ''} onchange="toggleCompare('${p.id}', this.checked)" />
        <span class="cc-name">${escHtml(p.name)}</span>
        <span class="cc-cpm">$${formatCpm(p.cpm)}</span>
      </label>
    `).join('');
  }

  renderCompareTable();
}

function toggleCompare(id, checked) {
  if (checked) selectedForCompare.add(id);
  else selectedForCompare.delete(id);

  // Update selected styling
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

  const rows = sortedSel.map(p => {
    const barWidth = maxCpm > 0 ? (p.cpm / maxCpm * 100).toFixed(1) : 0;
    const impsForBudget = budget > 0 ? Math.round((budget / p.cpm) * 1000) : null;
    const isBest = p.cpm === minCpm && selected.length > 1;
    return `
      <tr>
        <td class="td-name">${escHtml(p.name)} ${isBest ? '<span style="color:var(--accent);font-size:11px;">★ lowest CPM</span>' : ''}</td>
        <td>${p.category ? `<span class="product-category-badge">${escHtml(p.category)}</span>` : '—'}</td>
        <td class="td-cpm">$${formatCpm(p.cpm)}</td>
        <td class="td-bar">
          <div class="cpm-bar-bg"><div class="cpm-bar-fill" style="width:${barWidth}%"></div></div>
        </td>
        ${budget > 0 ? `<td class="td-impressions has-budget">${formatNum(impsForBudget)}</td>` : `<td class="td-impressions">—</td>`}
        ${p.minImpressions ? `<td class="td-impressions">${formatNum(p.minImpressions)}</td>` : '<td class="td-impressions">—</td>'}
      </tr>
    `;
  });

  // Summary stats
  const avgCpm = selected.reduce((s, p) => s + p.cpm, 0) / selected.length;

  results.innerHTML = `
    <div class="compare-table-wrap">
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Category</th>
            <th>CPM</th>
            <th>Relative Cost</th>
            <th>${budget > 0 ? `Impressions ($${formatMoney(budget)} budget)` : 'Impressions'}</th>
            <th>Min Impressions</th>
          </tr>
        </thead>
        <tbody>${rows.join('')}</tbody>
        <tfoot>
          <tr style="border-top:2px solid var(--border2)">
            <td colspan="2" style="color:var(--text-muted);font-size:12px;letter-spacing:.04em;text-transform:uppercase;">Summary (${selected.length} products)</td>
            <td class="td-cpm" style="font-size:14px;">avg $${formatCpm(avgCpm)}</td>
            <td></td>
            <td class="td-impressions ${budget > 0 ? 'has-budget' : ''}">${budget > 0 ? formatNum(Math.round((budget / avgCpm) * 1000)) + ' avg' : '—'}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
  `;
}

// ── HELPERS ───────────────────────────────────────────────────────────
function formatCpm(v) {
  return Number(v).toFixed(2);
}

function formatMoney(v) {
  return v >= 1000
    ? v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    : v.toFixed(2);
}

function formatNum(v) {
  if (v === null || v === undefined) return '—';
  if (v >= 1_000_000) return (v / 1_000_000).toFixed(2) + 'M';
  if (v >= 1_000) return v.toLocaleString('en-US');
  return String(v);
}

function escHtml(s) {
  return String(s)
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;');
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
