// ============================================================
// AR HOME — MOBILE BROWSER APP ENGINE
// No desktop chrome: no phone frame, no side panel, no quicklinks.
// Every screen fills the full browser viewport.
// ============================================================

let currentFlow   = 'customer';
let history_stack = [];
let currentScreen = null;

const viewport = document.getElementById('viewport');

function renderAllScreens(){
  viewport.innerHTML = '';
  Object.keys(SCREENS).forEach(id => {
    const def  = SCREENS[id];
    const wrap = document.createElement('div');
    wrap.className = 'screen' + (def.tabbar ? ' has-tabbar' : '');
    wrap.id   = 'screen-' + id;
    wrap.innerHTML = def.render();
    restructureScreenScroll(wrap);
    viewport.appendChild(wrap);
    if (def.afterRender) def.afterRender(wrap);
  });
}

// Splits screen children so tabbar/.bottom-cta are truly pinned and
// everything else scrolls. Leaves single-root full-bleed screens alone.
function restructureScreenScroll(wrap){
  const children = Array.from(wrap.children);
  if (children.length <= 1) return;               // full-bleed (AR/splash)

  const pinnedSels = ['.bottom-cta', '.tabbar'];
  const pinned     = [];
  const scrollable = [];
  children.forEach(c => {
    (pinnedSels.some(s => c.matches(s)) ? pinned : scrollable).push(c);
  });

  const scroller = document.createElement('div');
  scroller.className = 'screen-scroll';
  scrollable.forEach(el => scroller.appendChild(el));
  wrap.innerHTML = '';
  wrap.appendChild(scroller);
  pinned.forEach(el => wrap.appendChild(el));
}

function goTo(id, opts = {}){
  if (!SCREENS[id]){ console.warn('Missing screen:', id); return; }
  if (!opts.silent) history_stack.push(id);
  showScreen(id);
}

function goBack(){
  if (history_stack.length > 1){
    history_stack.pop();
    showScreen(history_stack[history_stack.length - 1], true);
  } else {
    showScreen(currentFlow === 'designer' ? 'd-splash' : 'splash', true);
  }
}

function showScreen(id, silent = false){
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const target = document.getElementById('screen-' + id);
  if (target) target.classList.add('active');
  currentScreen = id;

  const def = SCREENS[id];
  if (def && def.flow) currentFlow = def.flow;

  updateTabbarHighlight(id);

  if (def && def.onActivate && target){
    requestAnimationFrame(() => def.onActivate(target));
  }
}

function updateTabbarHighlight(id){
  const def = SCREENS[id];
  if (!def || !def.tabKey) return;
  document.querySelectorAll('#screen-' + id + ' .tab-item').forEach(t => {
    t.classList.toggle('active', t.dataset.tab === def.tabKey);
  });
}

function startFlow(flow){
  currentFlow   = flow;
  history_stack = [];
  goTo(flow === 'designer' ? 'd-splash' : 'splash');
}

// ---- Boot ----
document.addEventListener('DOMContentLoaded', () => {
  renderAllScreens();
  goTo('splash');
});

// Prevent pull-to-refresh and double-tap zoom on iOS
document.addEventListener('touchmove', e => {
  if (e.touches.length > 1) e.preventDefault();
}, { passive: false });

let lastTap = 0;
document.addEventListener('touchend', e => {
  const now = Date.now();
  if (now - lastTap < 300) e.preventDefault();
  lastTap = now;
}, { passive: false });
