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
})();
