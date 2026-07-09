// Footer year
document.getElementById('year') && (document.getElementById('year').textContent = new Date().getFullYear());

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// Gallery lightbox
const galleryGrid = document.getElementById('galleryGrid');
const lightbox = document.getElementById('lightbox');
if (galleryGrid && lightbox) {
  const items = Array.from(galleryGrid.querySelectorAll('a'));
  const lightboxImg = document.getElementById('lightboxImg');
  const closeBtn = document.getElementById('lightboxClose');
  const prevBtn = document.getElementById('lightboxPrev');
  const nextBtn = document.getElementById('lightboxNext');
  let current = 0;

  function openLightbox(index) {
    current = index;
    const link = items[current];
    lightboxImg.src = link.getAttribute('href');
    lightboxImg.alt = link.getAttribute('data-caption') || '';
    lightbox.classList.add('open');
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
  }

  function showRelative(delta) {
    current = (current + delta + items.length) % items.length;
    const link = items[current];
    lightboxImg.src = link.getAttribute('href');
    lightboxImg.alt = link.getAttribute('data-caption') || '';
  }

  items.forEach((link, index) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      openLightbox(index);
    });
  });

  closeBtn.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', () => showRelative(-1));
  nextBtn.addEventListener('click', () => showRelative(1));
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showRelative(-1);
    if (e.key === 'ArrowRight') showRelative(1);
  });
}
