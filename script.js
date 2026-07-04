// ---- Sticky nav background on scroll ----
const nav = document.getElementById('nav');
const onScroll = () => {
  if (window.scrollY > 40) nav.classList.add('is-scrolled');
  else nav.classList.remove('is-scrolled');
};
window.addEventListener('scroll', onScroll);
onScroll();

// ---- Mobile nav toggle ----
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('is-open');
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('is-open'));
});

// ---- Generic tab system (works for both service tabs and FM tabs) ----
function setupTabs(navSelector, btnAttr, panelAttr) {
  const nav = document.querySelector(navSelector);
  if (!nav) return;
  const buttons = nav.querySelectorAll('.tab-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute(btnAttr);
      buttons.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      document.querySelectorAll(`[${panelAttr}]`).forEach(panel => {
        panel.classList.toggle('is-active', panel.getAttribute(panelAttr) === key);
      });
    });
  });
}
setupTabs('#svcTabsNav', 'data-tab', 'data-panel');
setupTabs('#fmTabsNav', 'data-fmtab', 'data-fmpanel');

// ---- Scroll reveal ----
const revealTargets = document.querySelectorAll(
  '.svc-card, .vm-card, .spec-card, .why-item, .pillar, .about-grid, .cta-grid'
);
revealTargets.forEach(el => el.classList.add('reveal'));
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealTargets.forEach(el => io.observe(el));

// ---- Footer year ----
document.getElementById('year').textContent = new Date().getFullYear();

// ---- Enquiry form: Netlify-friendly submit with inline success message ----
const form = document.getElementById('enquiryForm');
const successBox = document.getElementById('formSuccess');
if (form) {
  form.addEventListener('submit', (e) => {
    // If running locally (not yet deployed on Netlify), prevent a 404
    // and just show the success message instead.
    const isNetlifyLive = window.location.hostname.endsWith('.netlify.app') ||
                           !['localhost', '127.0.0.1', ''].includes(window.location.hostname) &&
                           window.location.protocol !== 'file:';
    if (!isNetlifyLive) {
      e.preventDefault();
      successBox.classList.add('is-visible');
      form.reset();
    }
    // If live on Netlify, let the native form POST proceed normally.
  });
}
