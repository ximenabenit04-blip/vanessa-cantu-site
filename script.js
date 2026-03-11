/* ============================================================
   Vanessa Cantú — Site Scripts
   ============================================================ */

(function () {
  'use strict';

  // --- Navigation scroll behavior ---
  const nav = document.getElementById('nav');

  function handleNavScroll() {
    if (window.scrollY > 80) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // --- Mobile menu toggle ---
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', function () {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close menu on link click
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // --- Intersection Observer for fade-in animations ---
  var animatedElements = document.querySelectorAll('[data-animate]');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry, index) {
          if (entry.isIntersecting) {
            // Stagger animation for milestone cards
            var delay = Array.from(animatedElements).indexOf(entry.target) * 150;
            setTimeout(function () {
              entry.target.classList.add('visible');
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    animatedElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show all immediately
    animatedElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // --- General fade-in for sections ---
  var sections = document.querySelectorAll(
    '.about__text-col, .about__image-col, .about__spanish-inner, ' +
    '.listings__header, .listing-card, .contact__info-col, .contact__form-col'
  );

  sections.forEach(function (el) {
    el.classList.add('fade-in');
  });

  if ('IntersectionObserver' in window) {
    var sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            sectionObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    sections.forEach(function (el) {
      sectionObserver.observe(el);
    });
  } else {
    sections.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // --- Testimonial Slider ---
  var testimonials = document.querySelectorAll('.testimonial');
  var dots = document.querySelectorAll('.testimonial-dot');
  var prevBtn = document.getElementById('prevBtn');
  var nextBtn = document.getElementById('nextBtn');
  var currentIndex = 0;
  var totalTestimonials = testimonials.length;
  var autoplayInterval;

  function showTestimonial(index) {
    testimonials.forEach(function (t) {
      t.classList.remove('active');
    });
    dots.forEach(function (d) {
      d.classList.remove('active');
    });

    currentIndex = (index + totalTestimonials) % totalTestimonials;
    testimonials[currentIndex].classList.add('active');
    dots[currentIndex].classList.add('active');
  }

  function nextTestimonial() {
    showTestimonial(currentIndex + 1);
  }

  function prevTestimonial() {
    showTestimonial(currentIndex - 1);
  }

  nextBtn.addEventListener('click', function () {
    nextTestimonial();
    resetAutoplay();
  });

  prevBtn.addEventListener('click', function () {
    prevTestimonial();
    resetAutoplay();
  });

  dots.forEach(function (dot) {
    dot.addEventListener('click', function () {
      showTestimonial(parseInt(this.getAttribute('data-index')));
      resetAutoplay();
    });
  });

  function startAutoplay() {
    autoplayInterval = setInterval(nextTestimonial, 6000);
  }

  function resetAutoplay() {
    clearInterval(autoplayInterval);
    startAutoplay();
  }

  startAutoplay();

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        var offset = nav.offsetHeight + 20;
        var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  // --- Contact form handling ---
  var contactForm = document.getElementById('contactForm');

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var submitBtn = contactForm.querySelector('.contact-form__submit');
    var originalText = submitBtn.textContent;
    submitBtn.textContent = 'Message Sent';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.6';

    setTimeout(function () {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      submitBtn.style.opacity = '1';
      contactForm.reset();
    }, 3000);
  });

})();
