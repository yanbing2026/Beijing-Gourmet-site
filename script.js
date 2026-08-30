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
      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const message = document.getElementById('contact-message').value.trim();

      if (!email || !email.includes('@')) {
        e.preventDefault();
        alert('Please enter a valid email address.');
        return;
      }

      e.preventDefault();

      const subject = 'Website Contact from ' + (name || 'a customer');
      const body = 'Name: ' + (name || 'N/A') + '\nEmail: ' + email + '\n\nMessage:\n' + (message || 'N/A');

      window.location.href = 'mailto:beijinggourmettulsa@gmail.com' +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(body);
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
      if (autoplayBtn) autoplayBtn.classList.remove('is-paused');
      if (autoplayBtn) autoplayBtn.setAttribute('aria-label', 'Pause slideshow');
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
      if (autoplayBtn) autoplayBtn.classList.add('is-paused');
      if (autoplayBtn) autoplayBtn.setAttribute('aria-label', 'Play slideshow');
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

});
