/**
 * Navbar Toggle - Mobile Menu
 */
(function() {
  'use strict';

  const navbarToggle = document.getElementById('navbarToggle');
  const navbarNav = document.getElementById('navbarNav');

  if (!navbarToggle || !navbarNav) return;

  function closeMenu() {
    navbarToggle.setAttribute('aria-expanded', 'false');
    navbarToggle.setAttribute('aria-label', 'Abrir menú');
    navbarNav.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  function openMenu() {
    navbarToggle.setAttribute('aria-expanded', 'true');
    navbarToggle.setAttribute('aria-label', 'Cerrar menú');
    navbarNav.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  // Toggle del menú principal
  navbarToggle.addEventListener('click', function() {
    const isOpen = this.getAttribute('aria-expanded') === 'true';
    isOpen ? closeMenu() : openMenu();
  });

  // Cerrar menú al hacer click en un enlace (no submenu toggle)
  navbarNav.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', closeMenu);
  });

  // Cerrar menú al presionar Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && navbarNav.classList.contains('is-open')) {
      closeMenu();
      navbarToggle.focus();
    }
  });

  // Submenu Toggle para móvil
  const submenuToggles = navbarNav.querySelectorAll('.navbar__submenu-toggle');
  submenuToggles.forEach(function(toggle) {
    toggle.addEventListener('click', function(e) {
      e.preventDefault();
      const submenu = this.nextElementSibling;
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      
      this.setAttribute('aria-expanded', isExpanded ? 'false' : 'true');
      submenu.classList.toggle('is-open');
    });
  });

  /**
   * Contact Form Handler
   */
  const contactForm = document.querySelector('.contact__form');
  const contactSuccess = document.getElementById('contactSuccess');
  const contactFormGrid = document.getElementById('contactFormGrid');
  const contactButton = document.querySelector('.contact__button');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Simular envío del formulario
      contactButton.disabled = true;
      contactButton.querySelector('.btn__text').textContent = 'Enviando...';
      
      // Simular tiempo de envío (1.5 segundos)
      setTimeout(function() {
        // Ocultar formulario
        contactFormGrid.style.display = 'none';
        contactButton.style.display = 'none';
        
        // Mostrar mensaje de éxito
        contactSuccess.style.display = 'block';
        
        // Resetear formulario
        contactForm.reset();
        contactButton.disabled = false;
        contactButton.querySelector('.btn__text').textContent = 'Enviar mensaje';
      }, 1500);
    });
  }

  /**
   * Portfolio Filter
   */
  (function() {
    'use strict';

    const filterButtons = document.querySelectorAll('.portfolio__filter-btn');
    const portfolioCards = document.querySelectorAll('.card--portfolio');

    if (!filterButtons.length || !portfolioCards.length) return;

    filterButtons.forEach(function(button) {
      button.addEventListener('click', function() {
        const filter = this.getAttribute('data-filter');

        // Actualizar estado activo del botón
        filterButtons.forEach(function(btn) {
          btn.classList.remove('portfolio__filter-btn--active');
        });
        this.classList.add('portfolio__filter-btn--active');

        // Filtrar proyectos
        portfolioCards.forEach(function(card) {
          const category = card.getAttribute('data-category');

          if (filter === 'all' || category === filter) {
            card.style.display = 'flex';
            // Añadir animación de fade in
            card.style.opacity = '0';
            setTimeout(function() {
              card.style.opacity = '1';
            }, 50);
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  })();
})();

// FAQ Acordeón
document.querySelectorAll('.faq__question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const answer = item.querySelector('.faq__answer');
    const isOpen = item.classList.contains('is-open');

    // Cierra todos
    document.querySelectorAll('.faq__item').forEach(i => {
      i.classList.remove('is-open');
      i.querySelector('.faq__answer').style.maxHeight = null;
      i.querySelector('.faq__question').setAttribute('aria-expanded', 'false');
    });

    // Abre el clickeado si estaba cerrado
    if (!isOpen) {
      item.classList.add('is-open');
      answer.style.maxHeight = answer.scrollHeight + 'px';
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});
// Modal mockup portafolio
function openMockup(url, title, img) {
  const modal = document.getElementById('mockupModal');
  document.getElementById('mockupUrl').textContent = url;
  document.getElementById('mockupExternalLink').href = url;
  document.getElementById('mockupImg').src = img;
  document.getElementById('mockupImg').alt = title;
  document.getElementById('mockupTitle').textContent = title;
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}
function closeMockup(e) {
  if (e && e.target !== document.getElementById('mockupModal') && e.type === 'click') return;
  document.getElementById('mockupModal').style.display = 'none';
  document.body.style.overflow = '';
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMockup(); });



/* ============================================
   1. INTERSECTION OBSERVER — Scroll Reveal
   ============================================ */
(function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // Una vez visible no vuelve a animarse
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px 0px 0px'
  });
 
  // Observa todos los elementos con data-reveal
  document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
})();
 
/* ============================================
   2. STAGGER AUTOMÁTICO para grids y listas
   Detecta hijos directos y les aplica delay
   ============================================ */
(function initStagger() {
  document.querySelectorAll('[data-stagger]').forEach(container => {
    const children = container.children;
    const delay    = parseFloat(container.dataset.stagger) || 0.1;
 
    Array.from(children).forEach((child, i) => {
      child.setAttribute('data-reveal', '');
      child.style.transitionDelay = `${i * delay}s`;
    });
 
    // Re-observar los hijos recién marcados
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
 
    Array.from(children).forEach(child => observer.observe(child));
  });
})();
 
/* ============================================
   3. CONTADOR ANIMADO
   Uso: <span data-counter="150" data-prefix="+" data-suffix="">0</span>
   ============================================ */
(function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;
 
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el      = entry.target;
      const target  = parseInt(el.dataset.counter, 10);
      const prefix  = el.dataset.prefix  || '';
      const suffix  = el.dataset.suffix  || '';
      const duration = 1400;
      const start   = performance.now();
 
      function update(now) {
        const elapsed  = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const eased    = 1 - Math.pow(1 - progress, 3);
        const current  = Math.floor(eased * target);
        el.textContent = prefix + current + suffix;
        if (progress < 1) requestAnimationFrame(update);
        else el.textContent = prefix + target + suffix;
      }
 
      requestAnimationFrame(update);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });
 
  counters.forEach(el => observer.observe(el));
})();
 
/* ============================================
   4. HOVER MAGNÉTICO en botones primarios
   Efecto sutil que sigue el cursor
   ============================================ */
(function initMagneticButtons() {
  document.querySelectorAll('.btn--primary, .service-hero__cta, .portfolio-cta__btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect   = btn.getBoundingClientRect();
      const cx     = rect.left + rect.width  / 2;
      const cy     = rect.top  + rect.height / 2;
      const dx     = (e.clientX - cx) * 0.18;
      const dy     = (e.clientY - cy) * 0.18;
      btn.style.transform = `translate(${dx}px, ${dy}px) scale(1.03)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
})();
 

 
/* ============================================
   6. PARALLAX SUAVE en glows del hero
   Solo si el usuario no prefiere reduced motion
   ============================================ */
(function initParallax() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.matchMedia('(pointer: coarse)').matches) return;
 
  const glows = document.querySelectorAll('.hero__glow, .about-hero__glow, .portfolio-hero__glow, .service-hero__glow');
  if (!glows.length) return;
 
  let ticking = false;
  window.addEventListener('mousemove', e => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const xRatio = (e.clientX / window.innerWidth  - 0.5) * 2;
      const yRatio = (e.clientY / window.innerHeight - 0.5) * 2;
      glows.forEach((glow, i) => {
        const intensity = (i % 2 === 0) ? 18 : 12;
        glow.style.transform = `translate(${xRatio * intensity}px, ${yRatio * intensity}px)`;
      });
      ticking = false;
    });
  });
})();
 
/* ============================================
   7. ACTIVE NAV LINK según sección visible
   Marca el link activo en la navbar al scrollear
   ============================================ */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  if (!sections.length) return;
 
  const navLinks = document.querySelectorAll('.navbar__link[href^="#"], .navbar__link[href*="#"]');
  if (!navLinks.length) return;
 
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      navLinks.forEach(link => {
        const isActive = link.getAttribute('href').includes(id);
        link.classList.toggle('is-active', isActive);
      });
    });
  }, { threshold: 0.35 });
 
  sections.forEach(s => observer.observe(s));
})();
 
/* ============================================
   8. SMOOTH SCROLL para links ancla
   ============================================ */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const id  = link.getAttribute('href').slice(1);
      const el  = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();