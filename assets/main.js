(function () {
  'use strict';

  let priorFocus;
  const modal = document.querySelector('.modal__body');
  const modalLabel = document.querySelector('#modal__label');
  const modalOverlay = document.querySelector('.modal__overlay');
  const modalToggle = document.querySelector('.modal-toggle');
  modalToggle.addEventListener('click', openModal);

  function openModal() {
    // Track the element (likely a button) that had focus before we open the modal.
    priorFocus = document.activeElement;
    const modalClose = modal.querySelector('.modal__close');

    // Set up the event listeners we need for the modal
    modal.addEventListener('keydown', keydownEvent);
    modalOverlay.addEventListener('click', closeModal);
    modalClose.addEventListener('click', closeModal);

    // Find all focusable children
    const focusableElementsString =
      'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
    let focusableElements = modal.querySelectorAll(focusableElementsString);
    focusableElements = Array.prototype.slice.call(focusableElements);

    const firstTabStop = focusableElements[0];
    const lastTabStop = focusableElements[focusableElements.length - 1];

    // Show the modal and overlay
    modal.style.display = 'block';
    modalOverlay.style.display = 'block';

    modalLabel.focus();

    function keydownEvent(e) {
      // Escape key should close the modal
      if (e.key === 'Escape') {
        closeModal();
      }

      // Tab key check for first or last tab stop
      if (e.key === 'Tab') {
        // Tab + Shift (reverse tabbing)
        if (e.shiftKey) {
          // If the current item is the first tab stop, or it shares a name with it (for example a set of radio buttons)
          if (
            document.activeElement === firstTabStop ||
            (document.activeElement.name !== '' &&
              document.activeElement.name === firstTabStop.name)
          ) {
            e.preventDefault();
            lastTabStop.focus();
          }
        } else if (document.activeElement === lastTabStop) {
          e.preventDefault();
          firstTabStop.focus();
        }
      }
    }
  }

  function closeModal() {
    const modal = document.querySelector('.modal__body');
    const modalOverlay = document.querySelector('.modal__overlay');

    if (modal && modalOverlay) {
      modal.style.display = 'none';
      modalOverlay.style.display = 'none';
      // Return focus to the element that had focus before the modal opened
      if (priorFocus) {
        priorFocus.focus();
      }
    }
  }

  // Appel des fonctions d'initialisation une fois que le DOM est prêt
  document.addEventListener("DOMContentLoaded", function () {
    initMobileNavigation();
    initToggleContent();
    initModal();
  });
})();

document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll('.social .ul a');
  
  links.forEach(function(link) {
      link.addEventListener("click", function (event) {
          event.preventDefault(); // Empêcher la redirection par défaut
          const ariaLabel = this.querySelector('svg').getAttribute('aria-label');
          alert(`Le lien ${ariaLabel} fonctionne!`); // Afficher un message d'alerte avec le aria-label
      });
  });
});