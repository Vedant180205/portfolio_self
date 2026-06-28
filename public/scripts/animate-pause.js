document.addEventListener('DOMContentLoaded', function() {
  const elements = document.querySelectorAll('[data-animate-pause]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('paused');
      } else {
        entry.target.classList.add('paused');
      }
    });
  }, { threshold: 0.2 });
  
  elements.forEach(el => observer.observe(el));
});
