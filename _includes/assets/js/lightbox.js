(function() {
  'use strict';

  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  const lightboxImage = lightbox.querySelector('.lightbox__image');
  const lightboxCaption = lightbox.querySelector('.lightbox__caption');
  const lightboxCredit = lightbox.querySelector('.lightbox__credit');
  const closeBtn = lightbox.querySelector('.lightbox__close');
  const prevBtn = lightbox.querySelector('.lightbox__prev');
  const nextBtn = lightbox.querySelector('.lightbox__next');
  const backdrop = lightbox.querySelector('.lightbox__backdrop');

  let images = [];
  let currentIndex = 0;

  // Initialize gallery
  function initGallery() {
    const galleryFigures = document.querySelectorAll('.image-gallery__figure');

    images = Array.from(galleryFigures).map(figure => {
      const img = figure.querySelector('img');
      return {
        src: img.src,
        alt: img.alt,
        caption: figure.dataset.caption || '',
        credit: figure.dataset.credit || ''
      };
    });

    // Add click handlers to gallery links
    const galleryLinks = document.querySelectorAll('.image-gallery__link');
    galleryLinks.forEach((link, index) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        openLightbox(index);
      });
    });
  }

  // Open lightbox
  function openLightbox(index) {
    currentIndex = index;
    updateLightboxContent();
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  // Close lightbox
  function closeLightbox() {
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Update lightbox content
  function updateLightboxContent() {
    if (images.length === 0) return;

    const image = images[currentIndex];
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightboxCaption.textContent = image.caption;
    lightboxCredit.textContent = image.credit ? `Photo: ${image.credit}` : '';

    // Hide/show navigation buttons
    prevBtn.style.display = images.length > 1 ? 'block' : 'none';
    nextBtn.style.display = images.length > 1 ? 'block' : 'none';
  }

  // Navigate to previous image
  function showPrevious() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateLightboxContent();
  }

  // Navigate to next image
  function showNext() {
    currentIndex = (currentIndex + 1) % images.length;
    updateLightboxContent();
  }

  // Event listeners
  closeBtn.addEventListener('click', closeLightbox);
  backdrop.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', showPrevious);
  nextBtn.addEventListener('click', showNext);

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (lightbox.getAttribute('aria-hidden') === 'false') {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrevious();
      if (e.key === 'ArrowRight') showNext();
    }
  });

  // Touch swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, false);

  lightbox.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, false);

  function handleSwipe() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
      showNext();
    }
    if (touchEndX > touchStartX + swipeThreshold) {
      showPrevious();
    }
  }

  // Initialize on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGallery);
  } else {
    initGallery();
  }
})();
