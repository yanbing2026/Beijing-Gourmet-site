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

      // Animate hamburger to X
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
  // Menu Category Tabs
  // ==========================================

  const menuTabs = document.querySelectorAll('.menu-tab');
  const menuCategories = document.querySelectorAll('.menu-category');

  if (menuTabs.length && menuCategories.length) {
    menuTabs.forEach(function(tab) {
      tab.addEventListener('click', function() {
        // Deactivate all tabs
        menuTabs.forEach(function(t) {
          t.classList.remove('active');
        });

        // Activate clicked tab
        tab.classList.add('active');

        // Get target category
        const category = tab.getAttribute('data-category');

        // Show the matching category, hide others
        menuCategories.forEach(function(cat) {
          if (cat.id === 'menu-' + category) {
            cat.style.display = 'block';
            cat.style.animation = 'none';
            // Force reflow then re-trigger
            void cat.offsetWidth;
            cat.style.animation = 'fadeIn 0.4s ease-out';
          } else {
            cat.style.display = 'none';
          }
        });
      });
    });
  }

  // ==========================================
  // Smooth scroll for nav links (fallback)
  // ==========================================

  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = 70;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ==========================================
  // Scroll-based navbar styling
  // ==========================================

  const navbar = document.querySelector('.navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 80) {
      navbar.style.background = 'rgba(15, 15, 26, 0.97)';
      navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.3)';
    } else {
      navbar.style.background = 'rgba(15, 15, 26, 0.92)';
      navbar.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
  });

  // ==========================================
  // Parallax effect on hero background
  // ==========================================

  const hero = document.querySelector('.hero');
  const heroBg = document.querySelector('.hero-bg');

  if (hero && heroBg) {
    window.addEventListener('scroll', function() {
      const scrollY = window.pageYOffset;
      const heroHeight = hero.offsetHeight;

      if (scrollY < heroHeight) {
        const speed = 0.15;
        const yPos = scrollY * speed;
        heroBg.style.transform = 'translateY(' + yPos + 'px)';
      }
    });
  }

  // ==========================================
  // Intersection Observer for section reveals
  // ==========================================

  if ('IntersectionObserver' in window) {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all .section elements
    document.querySelectorAll('.section').forEach(function(section) {
      section.style.opacity = '0';
      section.style.transform = 'translateY(20px)';
      section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
      observer.observe(section);
    });

    // Reveal class
    const style = document.createElement('style');
    style.textContent = `
      .section.revealed {
        opacity: 1;
        transform: translateY(0);
      }
    `;
    document.head.appendChild(style);
  }

  // ==========================================
  // Reservation form handling
  // ==========================================

  const reservationForm = document.querySelector('.reservation-form');
  if (reservationForm) {
    reservationForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const date = document.getElementById('date').value;
      const time = document.getElementById('time').value;
      const guests = document.getElementById('guests').value;

      if (!name || !date || !time || !guests) {
        alert('Please fill in all required fields.');
        return;
      }

      // Show confirmation (in production, this would be an AJAX call)
      const btn = reservationForm.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;

      setTimeout(function() {
        alert(
          'Thank you, ' + name + '! Your reservation for ' +
          guests + ' guest(s) on ' + date + ' at ' + time +
          ' has been submitted. We\'ll confirm within 2 hours.'
        );
        btn.textContent = originalText;
        btn.disabled = false;
        reservationForm.reset();
      }, 800);
    });
  }

  // ==========================================
  // Newsletter form handling
  // ==========================================

  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = newsletterForm.querySelector('input[type="email"]').value.trim();

      if (!email) {
        alert('Please enter your email address.');
        return;
      }

      const btn = newsletterForm.querySelector('button');
      const originalText = btn.textContent;
      btn.textContent = 'Subscribed!';
      btn.style.background = '#4a9c6d';

      setTimeout(function() {
        btn.textContent = originalText;
        btn.style.background = '';
        newsletterForm.reset();
      }, 2000);
    });
  }

  // ==========================================
  // Active nav link highlighting on scroll
  // ==========================================

  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');

  if (sections.length && navAnchors.length) {
    function updateActiveNav() {
      const scrollPos = window.pageYOffset + 120;

      sections.forEach(function(section) {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
          navAnchors.forEach(function(anchor) {
            anchor.style.color = 'var(--color-text-muted)';
            if (anchor.getAttribute('href') === '#' + sectionId) {
              anchor.style.color = 'var(--color-gold)';
            }
          });
        }
      });
    }

    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();
  }

});
