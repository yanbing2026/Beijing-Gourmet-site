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
