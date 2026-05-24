/* ============================================================================
 * Cabinet d'avocats D.G, Navigation mobile (V2)
 * Ouvre/ferme le menu (bouton ☰) sous 940px. Injecte aussi le bouton
 * « Prendre rendez-vous » dans le menu (caché sur mobile dans le header).
 * ========================================================================== */
(function () {
  "use strict";
  var header = document.querySelector("header");
  var toggle = document.querySelector(".menu-toggle");
  if (!header || !toggle) return;

  // Bouton RDV cloné dans le menu mobile (le .header-cta est masqué < 940px)
  var navRow = header.querySelector(".header-nav-row");
  var sourceCta = header.querySelector(".header-cta");
  if (navRow && sourceCta && !navRow.querySelector(".mobile-cta")) {
    var cta = sourceCta.cloneNode(true);
    cta.classList.remove("header-cta");
    cta.classList.add("mobile-cta");
    navRow.appendChild(cta);
  }

  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-controls", "primary-nav");
  if (navRow) navRow.id = navRow.id || "primary-nav";

  function setOpen(open) {
    header.classList.toggle("nav-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  }

  toggle.addEventListener("click", function (e) {
    e.stopPropagation();
    setOpen(!header.classList.contains("nav-open"));
  });

  // Fermer après clic sur un lien
  if (navRow) {
    navRow.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });
  }
  // Fermer au clic extérieur et à Échap
  document.addEventListener("click", function (e) {
    if (header.classList.contains("nav-open") && !header.contains(e.target)) setOpen(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setOpen(false);
  });
  // Réinitialiser si on repasse en desktop
  window.addEventListener("resize", function () {
    if (window.innerWidth > 940) setOpen(false);
  });
})();
