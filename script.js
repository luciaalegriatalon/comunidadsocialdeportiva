const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");
const sliders = [...document.querySelectorAll("[data-slider]")];

if (menuButton && nav) {
  const menuLabel = menuButton.querySelector(".sr-only");

  function closeMenu() {
    nav.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
    if (menuLabel) menuLabel.textContent = "Abrir menú";
  }

  menuButton.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    if (menuLabel) menuLabel.textContent = isOpen ? "Cerrar menú" : "Abrir menú";
  });

  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("is-open")) {
      closeMenu();
      menuButton.focus();
    }
  });
}

sliders.forEach((slider) => {
  const slides = [...slider.querySelectorAll("[data-slide]")];
  const dots = [...slider.querySelectorAll("[data-dot]")];
  const prevButton = slider.querySelector("[data-prev]");
  const nextButton = slider.querySelector("[data-next]");
  let activeIndex = Math.max(0, slides.findIndex((slide) => slide.classList.contains("is-active")));
  let autoplayId;
  let didSwipe = false;
  let swipeStartX = null;
  let swipeStartY = null;
  let isRotationEnabled = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const swipeThreshold = 44;

  if (!slides.length) return;

  slider.setAttribute("role", "region");
  slider.setAttribute("aria-roledescription", "carrusel");
  if (!slider.hasAttribute("aria-label") && !slider.hasAttribute("aria-labelledby")) {
    slider.setAttribute("aria-label", "Galería de presentación");
  }

  slides.forEach((slide, index) => {
    slide.setAttribute("role", "group");
    slide.setAttribute("aria-roledescription", "diapositiva");
    slide.setAttribute("aria-label", `${index + 1} de ${slides.length}`);
  });

  const rotationButton = document.createElement("button");
  rotationButton.type = "button";
  rotationButton.className = "slider-rotation";
  slider.append(rotationButton);

  const liveRegion = document.createElement("p");
  liveRegion.className = "sr-only";
  liveRegion.setAttribute("aria-live", "polite");
  liveRegion.setAttribute("aria-atomic", "true");
  slider.append(liveRegion);

  function updateRotationButton() {
    rotationButton.textContent = isRotationEnabled ? "Pausar carrusel" : "Reanudar carrusel";
  }

  function setActiveSlide(index, announce = false) {
    activeIndex = (index + slides.length) % slides.length;

    slides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === activeIndex;
      slide.classList.toggle("is-active", isActive);
      slide.setAttribute("aria-hidden", String(!isActive));
    });

    dots.forEach((dot, dotIndex) => {
      const isActive = dotIndex === activeIndex;
      dot.classList.toggle("is-active", isActive);
      if (isActive) dot.setAttribute("aria-current", "true");
      else dot.removeAttribute("aria-current");
    });

    if (announce) liveRegion.textContent = `Diapositiva ${activeIndex + 1} de ${slides.length}`;
  }

  function stopAutoplay() {
    window.clearInterval(autoplayId);
  }

  function startAutoplay() {
    stopAutoplay();
    if (
      slides.length < 2 ||
      !isRotationEnabled ||
      slider.matches(":hover") ||
      slider.contains(document.activeElement)
    ) return;
    autoplayId = window.setInterval(() => setActiveSlide(activeIndex + 1), 5200);
  }

  function restartAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  setActiveSlide(activeIndex);
  updateRotationButton();

  rotationButton.addEventListener("click", () => {
    isRotationEnabled = !isRotationEnabled;
    updateRotationButton();
    if (isRotationEnabled) startAutoplay();
    else stopAutoplay();
  });

  slider.addEventListener("mouseenter", stopAutoplay);
  slider.addEventListener("mouseleave", startAutoplay);
  slider.addEventListener("focusin", stopAutoplay);
  slider.addEventListener("focusout", (event) => {
    if (!slider.contains(event.relatedTarget)) startAutoplay();
  });

  if (prevButton && nextButton) {
    prevButton.addEventListener("click", () => {
      setActiveSlide(activeIndex - 1, true);
      restartAutoplay();
    });
    nextButton.addEventListener("click", () => {
      setActiveSlide(activeIndex + 1, true);
      restartAutoplay();
    });
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      setActiveSlide(index, true);
      restartAutoplay();
    });
  });

  slider.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    swipeStartX = event.clientX;
    swipeStartY = event.clientY;
    didSwipe = false;
    stopAutoplay();
  });

  slider.addEventListener("pointerup", (event) => {
    if (swipeStartX === null || swipeStartY === null) return;
    const distanceX = event.clientX - swipeStartX;
    const distanceY = event.clientY - swipeStartY;
    swipeStartX = null;
    swipeStartY = null;

    if (Math.abs(distanceX) >= swipeThreshold && Math.abs(distanceX) > Math.abs(distanceY)) {
      didSwipe = true;
      setActiveSlide(activeIndex + (distanceX < 0 ? 1 : -1), true);
      window.setTimeout(() => { didSwipe = false; }, 0);
    }
    restartAutoplay();
  });

  slider.addEventListener("pointercancel", () => {
    swipeStartX = null;
    swipeStartY = null;
    restartAutoplay();
  });

  slider.addEventListener("click", (event) => {
    if (didSwipe) {
      event.preventDefault();
      event.stopPropagation();
      didSwipe = false;
    }
  }, true);

  startAutoplay();
});

const contactForm = document.querySelector("[data-contact-form]");
const collaborationLinks = [...document.querySelectorAll("[data-collaboration-option]")];

if (contactForm) {
  const collaborationType = contactForm.elements.type;
  const formStatus = contactForm.querySelector("[data-form-status]");

  collaborationLinks.forEach((link) => {
    link.addEventListener("click", () => {
      collaborationType.value = link.dataset.collaborationOption;
      if (formStatus) {
        formStatus.textContent = `Opción seleccionada: ${link.dataset.collaborationOption}.`;
      }
    });
  });

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = formData.get("name").trim();
    const organization = formData.get("organization").trim();
    const email = formData.get("email").trim();
    const phone = formData.get("phone").trim();
    const type = formData.get("type");
    const message = formData.get("message").trim();
    const subject = `Consulta para colaborar: ${type}`;
    const body = [
      `Nombre: ${name}`,
      `Organización o empresa: ${organization || "No indicada"}`,
      `Correo: ${email}`,
      `Teléfono o WhatsApp: ${phone || "No indicado"}`,
      `Forma de participación: ${type}`,
      "",
      "Propuesta:",
      message,
    ].join("\n");

    if (formStatus) {
      formStatus.textContent = "Se abrió tu aplicación de correo con la consulta preparada.";
    }

    window.location.href = `mailto:comunidadsocialdeportiva.org@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}
