/* ═══════════════════════════════════════════════
   XtermChat Docs — script.js
   ═══════════════════════════════════════════════ */

// ── Scrollspy ────────────────────────────────────────────────────────────────
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');

function updateActive() {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 110) current = s.id;
  });
  navLinks.forEach(l => {
    l.classList.toggle('active', l.getAttribute('href') === '#' + current);
  });
}
window.addEventListener('scroll', updateActive, { passive: true });
updateActive();

// ── Sidebar open/close ────────────────────────────────────────────────────────
function openSidebar() {
  document.getElementById('sidebar').style.transform = 'translateX(0)';
  document.getElementById('overlay').classList.add('show');
  document.body.style.overflow = 'hidden';
}
function closeSidebar() {
  if (window.innerWidth < 1024) {
    document.getElementById('sidebar').style.transform = 'translateX(-100%)';
    document.getElementById('overlay').classList.remove('show');
    document.body.style.overflow = '';
  }
}
window.addEventListener('resize', () => {
  if (window.innerWidth >= 1024) {
    document.getElementById('sidebar').style.transform = '';
    document.getElementById('overlay').classList.remove('show');
    document.body.style.overflow = '';
  }
});

// ── Copy buttons on all pre blocks ────────────────────────────────────────────
function addCopyButtons() {
  document.querySelectorAll('pre').forEach(pre => {
    const btn = document.createElement('button');
    btn.className   = 'copy-btn';
    btn.textContent = 'copy';
    btn.addEventListener('click', () => {
      const code = pre.querySelector('code')?.innerText || pre.innerText;
      navigator.clipboard.writeText(code).then(() => {
        btn.textContent = 'copied!';
        btn.classList.add('copied');
        setTimeout(() => { btn.textContent = 'copy'; btn.classList.remove('copied'); }, 1800);
      }).catch(() => {
        btn.textContent = 'error';
        setTimeout(() => { btn.textContent = 'copy'; }, 1500);
      });
    });
    pre.appendChild(btn);
  });
}

// ── Close sidebar when nav link clicked (mobile) ──────────────────────────────
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth < 1024) closeSidebar();
  });
});

// ── Init ──────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  addCopyButtons();
  updateActive();
});