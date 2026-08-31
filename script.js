document.addEventListener('DOMContentLoaded', () => {

  // 1. MOBILE MENU TOGGLE
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    // Close menu when clicking links
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // 2. NAVBAR SCROLL EFFECT
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('bg-gray-950/90', 'shadow-xl', 'py-3');
      navbar.classList.remove('bg-gray-950/70', 'py-4');
    } else {
      navbar.classList.add('bg-gray-950/70', 'py-4');
      navbar.classList.remove('bg-gray-950/90', 'shadow-xl', 'py-3');
    }
  });

  // 3. GALERÍA: FILTROS
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active class
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        if (filterValue === 'all' || item.classList.contains(filterValue)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // 4. LIGHTBOX MODAL DE RENDERS HD
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxCategory = document.getElementById('lightboxCategory');
  const closeLightbox = document.getElementById('closeLightbox');
  const prevLightbox = document.getElementById('prevLightbox');
  const nextLightbox = document.getElementById('nextLightbox');

  let currentGalleryIndex = 0;
  const visibleGalleryItems = () => Array.from(document.querySelectorAll('.gallery-item')).filter(item => item.style.display !== 'none');

  const openLightbox = (index) => {
    const items = visibleGalleryItems();
    if (index < 0) index = items.length - 1;
    if (index >= items.length) index = 0;
    
    currentGalleryIndex = index;
    const targetItem = items[currentGalleryIndex];

    const src = targetItem.getAttribute('data-src');
    const title = targetItem.getAttribute('data-title');
    const category = targetItem.getAttribute('data-category');

    lightboxImg.src = src;
    lightboxTitle.textContent = title;
    lightboxCategory.textContent = category;

    lightboxModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  };

  const hideLightbox = () => {
    lightboxModal.classList.add('hidden');
    document.body.style.overflow = '';
  };

  galleryItems.forEach((item, idx) => {
    item.addEventListener('click', () => {
      const visibleItems = visibleGalleryItems();
      const visibleIdx = visibleItems.indexOf(item);
      openLightbox(visibleIdx !== -1 ? visibleIdx : 0);
    });
  });

  if (closeLightbox) closeLightbox.addEventListener('click', hideLightbox);
  if (prevLightbox) prevLightbox.addEventListener('click', () => openLightbox(currentGalleryIndex - 1));
  if (nextLightbox) nextLightbox.addEventListener('click', () => openLightbox(currentGalleryIndex + 1));

  // Close lightbox on backdrop click
  lightboxModal.addEventListener('click', (e) => {
    if (e.target === lightboxModal) hideLightbox();
  });

  // Close lightbox on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !lightboxModal.classList.contains('hidden')) {
      hideLightbox();
    }
  });

  // 5. FORMULARIO DE CONTACTO SIMULACIÓN
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (contactForm && formSuccess) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      contactForm.classList.add('hidden');
      formSuccess.classList.remove('hidden');
    });
  }

});
