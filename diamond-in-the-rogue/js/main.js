// Footer year
document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());

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
  const lightboxImg = document.getElementById('lightboxImg');
  const closeBtn = document.getElementById('lightboxClose');
  const prevBtn = document.getElementById('lightboxPrev');
  const nextBtn = document.getElementById('lightboxNext');
  let current = 0;

  function visibleItems() {
    return Array.from(galleryGrid.querySelectorAll('a')).filter(a => !a.closest('.gallery-item.hidden'));
  }

  function openLightbox(link) {
    const items = visibleItems();
    current = items.indexOf(link);
    lightboxImg.src = link.getAttribute('href');
    lightboxImg.alt = link.getAttribute('data-caption') || '';
    lightbox.classList.add('open');
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
  }

  function showRelative(delta) {
    const items = visibleItems();
    current = (current + delta + items.length) % items.length;
    const link = items[current];
    lightboxImg.src = link.getAttribute('href');
    lightboxImg.alt = link.getAttribute('data-caption') || '';
  }

  galleryGrid.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      openLightbox(link);
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

// Gallery filter
const filterRow = document.getElementById('filterRow');
if (filterRow) {
  const items = document.querySelectorAll('.gallery-item');
  filterRow.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      filterRow.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      items.forEach(item => {
        const match = filter === 'all' || item.getAttribute('data-tags').split(' ').includes(filter);
        item.classList.toggle('hidden', !match);
      });
    });
  });
}

// Highlight today's row in any hours table
document.querySelectorAll('.hours-table').forEach(table => {
  const dayNames = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  const today = dayNames[new Date().getDay()];
  const row = table.querySelector(`tr[data-day="${today}"]`);
  if (row) row.classList.add('today');
});

// Consultation / booking forms -> build a pre-filled mailto and hand off to the client's mail app
document.querySelectorAll('.booking-form').forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const to = form.getAttribute('data-to') || 'diamondintherogueta@gmail.com';
    const subjectPrefix = form.getAttribute('data-subject') || 'Consultation request';
    const subject = encodeURIComponent(`${subjectPrefix} — ${data.get('name') || ''}`);
    const lines = [
      `Name: ${data.get('name') || ''}`,
      `Email: ${data.get('email') || ''}`,
      `Phone: ${data.get('phone') || ''}`,
      `Placement: ${data.get('placement') || ''}`,
      `Approx. size: ${data.get('size') || ''}`,
      `Availability: ${data.get('availability') || ''}`,
      '',
      'Details:',
      data.get('idea') || data.get('message') || ''
    ];
    const body = encodeURIComponent(lines.join('\n'));
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;

    const success = form.parentElement.querySelector('.form-success');
    if (success) success.classList.add('show');
  });
});
