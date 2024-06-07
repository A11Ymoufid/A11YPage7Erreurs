(function () {
  'use strict';

  // Fonction pour gérer le menu de navigation mobile
  function initMobileNavigation() {
    const mobileNavBtn = document.getElementById("mobile-nav-btn");
    const mobileNav = document.getElementById("mobile-nav");
    
    if (mobileNavBtn && mobileNav) {
      mobileNavBtn.addEventListener("click", function () {
        mobileNav.classList.toggle("active");
        toggleExpanded(mobileNavBtn);
      });
      
      mobileNavBtn.setAttribute("tabindex", "0");
      
      mobileNavBtn.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
          mobileNavBtn.click();
          event.preventDefault();
        }
      });
    }
  }

  // Fonction pour gérer l'affichage/masquage du contenu
  function initToggleContent() {
    const button = document.getElementById('toggleButton');
    const content = document.getElementById('content');
    
    if (button && content) {
      button.addEventListener("click", function () {
        toggleExpanded(button);
        content.style.display = content.style.display === 'block' ? 'none' : 'block';
      });
      
      button.setAttribute("tabindex", "0");
      
      button.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
          button.click();
          event.preventDefault();
        }
      });
    }
  }

  // Fonction pour gérer la modale
  function initModal() {
    const modalToggle = document.querySelector('.modal-toggle');
    
    if (modalToggle) {
      modalToggle.addEventListener('click', openModal);
    }

    function openModal() {
      const modal = document.querySelector('.modal__body');
      const modalOverlay = document.querySelector('.modal__overlay');
      const modalClose = modal.querySelector('.modal__close');
      
      if (modal && modalOverlay && modalClose) {
        modal.addEventListener('keydown', keydownEvent);
        modalOverlay.addEventListener('click', closeModal);
        modalClose.addEventListener('click', closeModal);
        
        modal.style.display = 'block';
        modalOverlay.style.display = 'block';
        
        modal.focus();
      }
    }

    function closeModal() {
      const modal = document.querySelector('.modal__body');
      const modalOverlay = document.querySelector('.modal__overlay');
      
      if (modal && modalOverlay) {
        modal.style.display = 'none';
        modalOverlay.style.display = 'none';
      }
    }

    function keydownEvent(e) {
      if (e.key === 'Escape') {
        closeModal();
      }
    }
  }

  // Fonction utilitaire pour basculer l'attribut aria-expanded
  function toggleExpanded(element) {
    const isExpanded = element.getAttribute('aria-expanded') === 'true';
    element.setAttribute('aria-expanded', String(!isExpanded));
  }

  // Appel des fonctions d'initialisation une fois que le DOM est prêt
  document.addEventListener("DOMContentLoaded", function () {
    initMobileNavigation();
    initToggleContent();
    initModal();
  });
})();
