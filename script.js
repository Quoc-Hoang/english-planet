/* ================================================
   Ms Tiên Cambridge – English Planet
   JavaScript
   ================================================ */

(function () {
  'use strict';

  /* ---------- HEADER SCROLL EFFECT ---------- */
  const header = document.getElementById('header');
  const handleScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Back-to-top button
    const backBtn = document.getElementById('backToTop');
    if (window.scrollY > 400) {
      backBtn.classList.add('show');
    } else {
      backBtn.classList.remove('show');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });

  /* ---------- MOBILE MENU TOGGLE ---------- */
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');

  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuToggle.classList.toggle('active', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close menu when clicking nav link (mobile)
  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (nav.classList.contains('open')) {
        nav.classList.remove('open');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  /* ---------- BACK TO TOP ---------- */
  document.getElementById('backToTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- FADE-IN ON SCROLL ---------- */
  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
    );
    revealElements.forEach((el) => observer.observe(el));
  } else {
    // Fallback
    revealElements.forEach((el) => el.classList.add('visible'));
  }

  /* ---------- SMOOTH SCROLL FOR ANCHOR LINKS ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#' || href.length < 2) return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offsetTop = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
    });
  });

  /* ---------- REGISTRATION FORM HANDLER ---------- */
  const form = document.getElementById('registerForm');
  const success = document.getElementById('formSuccess');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Basic validation
    const requiredFields = form.querySelectorAll('[required]');
    let valid = true;

    requiredFields.forEach((field) => {
      if (!field.value.trim()) {
        field.classList.add('error');
        valid = false;
      } else {
        field.classList.remove('error');
      }
    });

    // Phone simple validation
    const phone = form.querySelector('#phone');
    if (phone.value && !/^[0-9\s]{9,12}$/.test(phone.value.trim())) {
      phone.classList.add('error');
      valid = false;
    }

    if (!valid) {
      // Scroll to first error
      const firstError = form.querySelector('.error');
      if (firstError) firstError.focus();
      return;
    }

    // Show success state
    success.hidden = false;

    // Reset after 6 seconds
    setTimeout(() => {
      form.reset();
      success.hidden = true;
    }, 6000);
  });

  // Remove error class on input
  form.querySelectorAll('input, select').forEach((field) => {
    field.addEventListener('input', () => field.classList.remove('error'));
    field.addEventListener('change', () => field.classList.remove('error'));
  });

  /* ---------- CHAT BUTTON (placeholder) ---------- */
  const chatBtn = document.getElementById('chatBtn');
  chatBtn.addEventListener('click', (e) => {
    e.preventDefault();
    alert(
      'Xin chào ba mẹ! 💬\n\n' +
      'Vui lòng để lại thông tin qua form đăng ký hoặc gọi hotline 0988 261 697 để được tư vấn nhanh nhất!'
    );
  });

  /* ---------- YEAR (auto update copyright if needed) ---------- */
  const yearEl = document.querySelector('.footer-bottom p');
  if (yearEl) {
    yearEl.innerHTML = yearEl.innerHTML.replace(
      /©\s*\d{4}/,
      '© ' + new Date().getFullYear()
    );
  }

  /* ---------- ACTIVE NAV LINK ON SCROLL ---------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav a');

  const updateActiveLink = () => {
    const scrollY = window.scrollY + 140;
    let currentId = '';

    sections.forEach((section) => {
      if (scrollY >= section.offsetTop && scrollY < section.offsetTop + section.offsetHeight) {
        currentId = section.id;
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle(
        'active',
        link.getAttribute('href') === '#' + currentId
      );
    });
  };
  window.addEventListener('scroll', updateActiveLink, { passive: true });

  /* Initial call */
  handleScroll();
  updateActiveLink();
})();
