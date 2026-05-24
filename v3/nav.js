/* V3, menu mobile : bascule body.nav-open au clic sur ☰ */
(function () {
  "use strict";
  var toggle = document.querySelector(".nav-toggle");
  if (!toggle) return;
  toggle.setAttribute("aria-expanded", "false");
  function setOpen(o) {
    document.body.classList.toggle("nav-open", o);
    toggle.setAttribute("aria-expanded", o ? "true" : "false");
  }
  toggle.addEventListener("click", function (e) {
    e.stopPropagation();
    setOpen(!document.body.classList.contains("nav-open"));
  });
  document.addEventListener("click", function (e) {
    if (document.body.classList.contains("nav-open") &&
        !e.target.closest(".site-nav")) setOpen(false);
  });
  var links = document.querySelector(".nav-links");
  if (links) links.addEventListener("click", function (e) { if (e.target.closest("a")) setOpen(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setOpen(false); });
  window.addEventListener("resize", function () { if (window.innerWidth > 760) setOpen(false); });
})();
