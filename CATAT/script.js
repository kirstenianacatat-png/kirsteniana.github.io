// script.js
// Handles: theme toggle (sun/moon animated), typing effect, reveal on scroll,
// project modal open/close, and small UI helpers.

const body = document.body;

// THEME TOGGLE
function initTheme() {
  const btns = document.querySelectorAll('#themeToggle');
  // Read saved preference
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') body.classList.add('dark-mode');
  else if (saved === 'light') body.classList.remove('dark-mode');
  else {
    // optional: follow system preference if no saved value
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) body.classList.add('dark-mode');
  }

  // Update all toggle buttons and set listeners
  btns.forEach(btn => {
    updateIcon(btn);
    btn.addEventListener('click', () => {
      body.classList.toggle('dark-mode');
      const isDark = body.classList.contains('dark-mode');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      updateIcon(btn);
    });
  });
}

function updateIcon(btn) {
  if (!btn) return;
  if (body.classList.contains('dark-mode')) {
    btn.querySelector('.sun').style.opacity = 1;
    btn.querySelector('.moon').style.opacity = 0;
    btn.setAttribute('aria-label', 'Switch to light theme');
  } else {
    btn.querySelector('.sun').style.opacity = 0;
    btn.querySelector('.moon').style.opacity = 1;
    btn.setAttribute('aria-label', 'Switch to dark theme');
  }
}

// TYPING ANIMATION (hero)
function initTyping() {
  const typeWrap = document.querySelector('.typewrap');
  if (!typeWrap) return;
  const text = "Hello, I'm Kirsten Iana L. Catat";
  const speed = 60;
  let i = 0;
  (function type() {
    if (i <= text.length) {
      typeWrap.textContent = text.slice(0, i++);
      typeWrap.style.borderRight = '2px solid rgba(60,40,120,0.25)';
      setTimeout(type, speed);
    } else {
      typeWrap.style.borderRight = 'none';
    }
  })();
}

// REVEAL ON SCROLL (intersection observer)
function initReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal, .project-card').forEach(el => io.observe(el));
}

// PROJECT MODAL
function initProjectModal() {
  const modal = document.getElementById('projectModal');
  if (!modal) return;
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const openBtns = Array.from(document.querySelectorAll('.open-modal'));
  const closeBtn = modal.querySelector('.modal-close');
  const modalDemo = document.getElementById('modalDemo');
  const modalCode = document.getElementById('modalCode');

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.currentTarget.closest('.project-card');
      const title = card.dataset.title || card.querySelector('h3')?.textContent || 'Project';
      const desc = card.dataset.desc || card.querySelector('p')?.textContent || '';
      modalTitle.textContent = title;
      modalDesc.textContent = desc;
      modalDemo.href = '#';
      modalCode.href = '#';
      modal.classList.add('show');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      e.currentTarget.setAttribute('aria-expanded', 'true');
    });
  });

  function closeModal() {
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    openBtns.forEach(b => b.setAttribute('aria-expanded', 'false'));
  }

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (ev) => {
    if (ev.target === modal) closeModal();
  });

  document.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape' && modal.classList.contains('show')) closeModal();
  });
}

// ADD small staggered entrance
function applyStagger() {
  document.querySelectorAll('.fade-in').forEach((el, i) => {
    el.style.animationDelay = `${i * 90}ms`;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initTyping();
  initReveal();
  initProjectModal();
  applyStagger();
});
