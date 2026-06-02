/* ============================================================================
 * Cabinet d'avocats D.G — Navigation mobile (menu ☰ + sous-menus accordéon)
 * Sur ≤940px : le bouton ☰ ouvre/ferme la navigation ; chaque rubrique à
 * sous-menu se déplie en accordéon. Sur desktop, le survol reste inchangé.
 * ========================================================================== */
(function () {
  "use strict";
  var header = document.querySelector("header");
  if (!header) return;

  var toggle = header.querySelector(".menu-toggle");
  var navlinks = header.querySelectorAll("nav.primary .navlink");

  function isMobile() {
    return toggle && getComputedStyle(toggle).display !== "none";
  }

  function closeAll() {
    header.classList.remove("nav-open");
    if (toggle) toggle.setAttribute("aria-expanded", "false");
    header.querySelectorAll("nav.primary li.open").forEach(function (li) {
      li.classList.remove("open");
      var b = li.querySelector(".navlink");
      if (b) b.setAttribute("aria-expanded", "false");
    });
  }

  if (toggle) {
    toggle.setAttribute("aria-expanded", "false");
    toggle.addEventListener("click", function () {
      var open = header.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      if (!open) {
        header.querySelectorAll("nav.primary li.open").forEach(function (li) {
          li.classList.remove("open");
        });
      }
    });
  }

  navlinks.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      if (!isMobile()) return;               // desktop = survol, on ne touche pas
      e.preventDefault();
      var li = btn.parentElement;
      var willOpen = !li.classList.contains("open");
      li.parentElement.querySelectorAll("li.open").forEach(function (o) {
        if (o !== li) {
          o.classList.remove("open");
          var b = o.querySelector(".navlink");
          if (b) b.setAttribute("aria-expanded", "false");
        }
      });
      li.classList.toggle("open", willOpen);
      btn.setAttribute("aria-expanded", willOpen ? "true" : "false");
    });
  });

  // Refermer le menu quand on clique sur un vrai lien
  header.querySelectorAll("nav.primary a").forEach(function (a) {
    a.addEventListener("click", function () { closeAll(); });
  });

  // Repasser en desktop : on nettoie l'état mobile
  window.addEventListener("resize", function () {
    if (window.innerWidth > 940) closeAll();
  });
})();
