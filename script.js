// ---------- THEME SWITCHER ----------
const themeSelect = document.getElementById('themeSelect');
const root = document.documentElement;

// Apply saved theme (localStorage)
const saved = localStorage.getItem('portfolioTheme') || 'theme-blue';
document.body.classList.add(saved);
themeSelect.value = saved;

themeSelect.addEventListener('change', (e) => {
  const val = e.target.value;
  // remove previous theme classes (all possible)
  document.body.classList.remove('theme-blue','theme-purple','theme-blackgold','theme-darkteal','theme-green','theme-pastel','theme-custom');
  document.body.classList.add(val);
  localStorage.setItem('portfolioTheme', val);
});

// map theme names to class names for initial load
if(!document.body.classList.contains('theme-blue') && saved) {
  document.body.classList.add(saved);
}

// ---------- SMOOTH NAV SCROLL ----------
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const id = btn.getAttribute('data-target');
    const el = document.getElementById(id);
    if(el) {
      el.scrollIntoView({behavior:'smooth', block:'start'});
    }
  });
});

// ---------- MODAL HANDLING ----------
function openModal(id){
  const m = document.getElementById(id);
  if(m) m.style.display = 'flex';
}
function closeModal(elem){
  elem.style.display = 'none';
}

// Wire open-modal buttons
document.querySelectorAll('.open-modal').forEach(b=>{
  b.addEventListener('click', e=>{
    const id = b.dataset.modal;
    if(id) openModal(id);
  });
});

// modal open uses ids in markup: aboutModal, skillsModal, etc.
document.querySelectorAll('.modal').forEach(mod => {
  // close buttons
  mod.querySelectorAll('[data-close]').forEach(btn=>{
    btn.addEventListener('click', ()=> closeModal(mod));
  });
  // click outside to close
  mod.addEventListener('click', (ev)=>{
    if(ev.target === mod) closeModal(mod);
  });
});

// Bind global open-modal data attributes for older buttons (data-modal attribute)
document.querySelectorAll('[data-modal]').forEach(btn=>{
  // buttons inside page use .open-modal and data-modal attr; script above handles .open-modal
});

// ---------- POPUPS (if using direct open-modal class) ----------
document.querySelectorAll('.open-modal').forEach(btn=>{
  btn.addEventListener('click', () => {
    const modalId = btn.getAttribute('data-modal');
    const modalEl = document.getElementById(modalId);
    if(modalEl) modalEl.style.display = 'flex';
  });
});

// ---------- Show cards on scroll ----------
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
},{ threshold: 0.15 });

document.querySelectorAll('.card').forEach(card => observer.observe(card));

// ---------- Resume button fallback (if resume.pdf missing, disable) ----------
fetch('resume.pdf', {method:'HEAD'}).then(r=>{
  if(!r.ok){
    const btn = document.getElementById('resumeBtn');
    if(btn){
      btn.textContent = 'Resume (upload resume.pdf)';
      btn.classList.add('disabled');
      btn.href = '#';
      btn.addEventListener('click', (e) => { e.preventDefault(); alert('Upload resume.pdf to the repository root to enable this button.'); });
    }
  }
}).catch(()=>{/* no-op */});
