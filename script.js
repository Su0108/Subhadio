// Fade-up + progress bar animation on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('vis');
      e.target.querySelectorAll('.prog-bar[data-w]').forEach(b => {
        b.style.width = b.dataset.w + '%';
      });
      if (e.target.classList.contains('prog-bar') && e.target.dataset.w) {
        e.target.style.width = e.target.dataset.w + '%';
      }
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fu').forEach(el => io.observe(el));
document.querySelectorAll('.prog-bar[data-w]').forEach(el => io.observe(el));

// FAQ accordion
document.querySelectorAll('.faq-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});