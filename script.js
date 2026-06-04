// ── Navbar scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ── Theme toggle
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;
const savedTheme = localStorage.getItem('theme') || 'light';
root.setAttribute('data-theme', savedTheme);
themeToggle.innerHTML = savedTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';

themeToggle.addEventListener('click', () => {
  const current = root.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  themeToggle.innerHTML = next === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});

// ── Hamburger
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// ── Active nav on scroll
const sections = document.querySelectorAll('section[id], div[id]');
window.addEventListener('scroll', () => {
  const y = window.scrollY + 80;
  sections.forEach(sec => {
    const link = navLinks.querySelector(`a[href="#${sec.id}"]`);
    if (!link) return;
    const active = y >= sec.offsetTop && y < sec.offsetTop + sec.offsetHeight;
    link.classList.toggle('active', active);
  });
});

// ── Scroll to top
const scrollTopBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => scrollTopBtn.classList.toggle('visible', window.scrollY > 500));
scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ── Fade-in on scroll
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll(
  '.skill-card, .proj-card, .exp-card, .cert-row, .edu-card, .clink, .stat-box'
).forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(18px)';
  el.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
  io.observe(el);
});

// ── Contact form
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  const orig = btn.innerHTML;
  btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
  btn.style.background = '#16a34a';
  btn.disabled = true;
  setTimeout(() => {
    btn.innerHTML = orig;
    btn.style.background = '';
    btn.disabled = false;
    e.target.reset();
  }, 3000);
});
