/* ============================================================
   NAVBAR — scroll effect + active section highlight
   ============================================================ */
const navbar   = document.getElementById('navbar');
const navMenu  = document.getElementById('navMenu');
const navToggle = document.getElementById('navToggle');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  highlightActiveNav();
}, { passive: true });

/* Mobile hamburger */
navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('open');
});
navMenu.querySelectorAll('a').forEach(link =>
  link.addEventListener('click', () => navMenu.classList.remove('open'))
);

/* Active nav link */
const sections = document.querySelectorAll('section[id]');
function highlightActiveNav() {
  const y = window.scrollY + 80;
  sections.forEach(sec => {
    const top    = sec.offsetTop;
    const bottom = top + sec.offsetHeight;
    const id     = sec.getAttribute('id');
    const link   = navMenu.querySelector(`a[href="#${id}"]`);
    if (!link) return;
    if (y >= top && y < bottom) {
      navMenu.querySelectorAll('a').forEach(a => a.classList.remove('active'));
      link.classList.add('active');
    }
  });
}

/* ============================================================
   SCROLL REVEAL — Intersection Observer
   ============================================================ */
const revealEls = document.querySelectorAll('.reveal, .fade-up');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (!entry.isIntersecting) return;

    /* Stagger siblings within the same parent */
    const siblings = Array.from(entry.target.parentElement.children)
      .filter(el => el.classList.contains('reveal') || el.classList.contains('fade-up'));
    const idx = siblings.indexOf(entry.target);
    entry.target.style.transitionDelay = `${idx * 80}ms`;

    entry.target.classList.add('visible');
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

/* ============================================================
   PUBLICATION FILTER TABS
   ============================================================ */
const tabs     = document.querySelectorAll('.pub-tab');
const pubItems = document.querySelectorAll('.pub-item');

// Default: show only "paper" tab items on load
pubItems.forEach(item => {
  if (item.dataset.type !== 'paper') item.classList.add('hidden');
});

// Also hide domestic items initially (redundant safety)


tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const filter = tab.dataset.filter;
    pubItems.forEach(item => {
      const match = item.dataset.type === filter;
      item.classList.toggle('hidden', !match);
    });
  });
});

/* ============================================================
   INITIAL TRIGGER for elements already in view
   ============================================================ */
window.addEventListener('load', () => {
  highlightActiveNav();
  /* Hero fade-up items are always visible */
  document.querySelectorAll('.fade-up').forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 100 + i * 120);
  });
});
