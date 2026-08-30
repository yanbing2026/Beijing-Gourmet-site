/* ============================================
   Beijing Gourmet — JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {

  // ==========================================
  // Mobile Navigation Toggle
  // ==========================================

  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function() {
      navLinks.classList.toggle('open');

      const spans = navToggle.querySelectorAll('span');
      if (navLinks.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    });

    // Close nav when a link is clicked
    navLinks.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        navLinks.classList.remove('open');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      });
    });
  }

  // ==========================================
  // Close mobile nav on outside click
  // ==========================================

  document.addEventListener('click', function(e) {
    if (navLinks && navLinks.classList.contains('open')) {
      const isClickInside = navLinks.contains(e.target) || navToggle.contains(e.target);
      if (!isClickInside) {
        navLinks.classList.remove('open');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    }
  });

  // ==========================================
  // Contact Form (prevent default, show message)
  // ==========================================

  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = document.getElementById('contact-email').value.trim();

      if (!email || !email.includes('@')) {
        alert('Please enter a valid email address.');
        return;
      }

      const btn = contactForm.querySelector('.btn-submit');
      const originalText = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;

      setTimeout(function() {
        alert('Thank you! We\'ll get back to you at ' + email + ' soon.');
        btn.textContent = originalText;
        btn.disabled = false;
        contactForm.reset();
      }, 600);
    });
  }

  // ==========================================
  // Smooth scroll for nav links
  // ==========================================

  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = 72;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ==========================================
  // Scroll-based navbar shadow
  // ==========================================

  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 20) {
      navbar.style.boxShadow = '0 2px 15px rgba(0,0,0,0.12)';
    } else {
      navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.08)';
    }
  });

  // ==========================================
  // Photo Gallery Carousel
  // ==========================================

  (function() {
    var track = document.getElementById('galleryTrack');
    var prevBtn = document.getElementById('galleryPrev');
    var nextBtn = document.getElementById('galleryNext');
    var autoplayBtn = document.getElementById('galleryAutoplay');
    var autoplayIcon = document.getElementById('autoplayIcon');
    var dotsContainer = document.getElementById('galleryDots');

    if (!track) return;

    var slides = track.querySelectorAll('.gallery-slide');
    var totalSlides = slides.length;
    var currentIndex = 0;
    var autoplayInterval = null;
    var autoplayDelay = 4000; // ms
    var isAutoplayPaused = false;
    var isTransitioning = false;

    // Touch / swipe state
    var touchStartX = 0;
    var touchEndX = 0;
    var minSwipeDistance = 50;

    // Build dots
    for (var i = 0; i < totalSlides; i++) {
      (function(idx) {
        var dot = document.createElement('button');
        dot.className = 'carousel-dot' + (idx === 0 ? ' active' : '');
        dot.setAttribute('aria-label', 'Go to photo ' + (idx + 1) + ' of ' + totalSlides);
        dot.setAttribute('data-index', idx);
        dot.addEventListener('click', function() {
          goToSlide(idx);
          resetAutoplay();
        });
        dotsContainer.appendChild(dot);
      })(i);
    }

    var dots = dotsContainer ? dotsContainer.querySelectorAll('.carousel-dot') : [];

    function updateDots() {
      for (var i = 0; i < dots.length; i++) {
        dots[i].className = 'carousel-dot' + (i === currentIndex ? ' active' : '');
      }
    }

    function goToSlide(index) {
      if (isTransitioning) return;
      if (index < 0) index = totalSlides - 1;
      if (index >= totalSlides) index = 0;
      if (index === currentIndex) return;

      isTransitioning = true;
      currentIndex = index;
      track.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';
      updateDots();

      // Trigger transition end
      var onEnd = function() {
        isTransitioning = false;
        track.removeEventListener('transitionend', onEnd);
      };
      track.addEventListener('transitionend', onEnd);

      // Fallback: clear transitioning flag after animation completes
      setTimeout(function() {
        isTransitioning = false;
      }, 550);
    }

    function nextSlide() {
      goToSlide(currentIndex + 1);
    }

    function prevSlide() {
      goToSlide(currentIndex - 1);
    }

    prevBtn.addEventListener('click', function() {
      prevSlide();
      resetAutoplay();
    });

    nextBtn.addEventListener('click', function() {
      nextSlide();
      resetAutoplay();
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
      // Only when carousel is in view
      var carousel = document.getElementById('galleryCarousel');
      if (!carousel) return;
      var rect = carousel.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        if (e.key === 'ArrowLeft') {
          prevSlide();
          resetAutoplay();
          e.preventDefault();
        } else if (e.key === 'ArrowRight') {
          nextSlide();
          resetAutoplay();
          e.preventDefault();
        }
      }
    });

    // Touch / swipe support
    var carouselEl = document.getElementById('galleryCarousel');
    if (carouselEl && 'ontouchstart' in window) {
      carouselEl.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      carouselEl.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        var diff = touchStartX - touchEndX;
        if (Math.abs(diff) > minSwipeDistance) {
          if (diff > 0) {
            nextSlide();
          } else {
            prevSlide();
          }
          resetAutoplay();
        }
      }, { passive: true });
    }

    // Autoplay
    function startAutoplay() {
      if (autoplayInterval) return;
      isAutoplayPaused = false;
      if (autoplayIcon) autoplayIcon.innerHTML = '<polygon points="5,3 19,12 5,21" fill="currentColor"/>';
      if (autoplayBtn) autoplayBtn.classList.remove('paused');
      if (autoplayBtn) autoplayBtn.setAttribute('aria-label', 'Pause autoplay');
      autoplayInterval = setInterval(function() {
        if (!isAutoplayPaused) {
          nextSlide();
        }
      }, autoplayDelay);
    }

    function stopAutoplay() {
      if (autoplayInterval) {
        clearInterval(autoplayInterval);
        autoplayInterval = null;
      }
      isAutoplayPaused = true;
      if (autoplayIcon) autoplayIcon.innerHTML = '<rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/>';
      if (autoplayBtn) autoplayBtn.classList.add('paused');
      if (autoplayBtn) autoplayBtn.setAttribute('aria-label', 'Play autoplay');
    }

    function resetAutoplay() {
      if (isAutoplayPaused) return;
      stopAutoplay();
      startAutoplay();
    }

    if (autoplayBtn) {
      autoplayBtn.addEventListener('click', function() {
        if (isAutoplayPaused) {
          startAutoplay();
        } else {
          stopAutoplay();
        }
      });
    }

    // Pause on hover / focus
    if (carouselEl) {
      carouselEl.addEventListener('mouseenter', function() {
        if (!isAutoplayPaused) {
          stopAutoplay();
        }
      });
      carouselEl.addEventListener('mouseleave', function() {
        if (!isAutoplayPaused) {
          startAutoplay();
        }
      });
      carouselEl.addEventListener('focusin', function() {
        if (!isAutoplayPaused) {
          stopAutoplay();
        }
      });
      carouselEl.addEventListener('focusout', function() {
        if (!isAutoplayPaused) {
          startAutoplay();
        }
      });
    }

    // Start autoplay
    startAutoplay();

    // Pause when tab is hidden
    document.addEventListener('visibilitychange', function() {
      if (document.hidden) {
        stopAutoplay();
      } else if (!isAutoplayPaused) {
        startAutoplay();
      }
    });

  })();

  // ==========================================
  // Google Maps — fallback static map if API key missing
  // ==========================================

  const mapContainer = document.getElementById('map');
  if (mapContainer) {
    // Check if Google Maps API loaded properly
    // If not, show a static map image as fallback
    window.addEventListener('load', function() {
      if (typeof google === 'undefined' || !google.maps || typeof initMap !== 'function') {
        // Replace map container with a static map image
        const staticMapUrl =
          'https://maps.googleapis.com/maps/api/staticmap?' +
          'center=8228+East+61st+Street,Tulsa,OK+74133&' +
          'zoom=15&size=600x400&scale=2&markers=color:red|8228+East+61st+Street,Tulsa,OK+74133&' +
          'style=feature:road|element:geometry|visibility:off&' +
          'style=feature:landscape|element:geometry.fill|color:0xededed&' +
          'style=feature:water|element:geometry|color:0xc9c9c9';

        mapContainer.innerHTML =
          '<img src="' + staticMapUrl + '" alt="Map to Beijing Gourmet — 8228 East 61st Street, Tulsa, OK 74133" ' +
          'style="width:100%;height:400px;object-fit:cover;border-radius:16px;">';
      }
    });
  }

});
