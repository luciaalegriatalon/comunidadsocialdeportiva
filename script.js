const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");
const sliders = [...document.querySelectorAll("[data-slider]")];

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      nav.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
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

  function setActiveSlide(index) {
    activeIndex = (index + slides.length) % slides.length;

    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === activeIndex);
    });

    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === activeIndex);
    });
  }

  function startAutoplay() {
    if (slides.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    autoplayId = window.setInterval(() => {
      setActiveSlide(activeIndex + 1);
    }, 5200);
  }

  function restartAutoplay() {
    window.clearInterval(autoplayId);
    startAutoplay();
  }

  if (!slides.length) {
    return;
  }

  setActiveSlide(activeIndex);

  if (prevButton && nextButton) {
    prevButton.addEventListener("click", () => {
      setActiveSlide(activeIndex - 1);
      restartAutoplay();
    });

    nextButton.addEventListener("click", () => {
      setActiveSlide(activeIndex + 1);
      restartAutoplay();
    });
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      setActiveSlide(index);
      restartAutoplay();
    });
  });

  startAutoplay();
});
