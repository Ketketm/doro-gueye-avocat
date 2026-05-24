/* ============================================================================
 * Cabinet d'avocats D.G — Widget de comparaison de versions (TEMPORAIRE)
 * ----------------------------------------------------------------------------
 * Pastille flottante permettant de basculer entre la version actuelle (v1, à la
 * racine) et la nouvelle version (v2, dans /v2/). Outil de démonstration destiné
 * au client pour comparer et choisir.
 *
 * POUR RETIRER : supprimer ce fichier + retirer la balise
 *   <script src="/assets/version-switch.js" defer></script>
 * (un coup de `grep -rl version-switch.js` liste toutes les pages concernées).
 * ========================================================================== */
(function () {
  "use strict";

  var STORAGE_KEY = "dg-preview-version";

  // Détection de la version courante d'après l'URL (/v2/ = nouvelle version)
  var isV2 = /(^|\/)v2(\/|$)/.test(window.location.pathname);
  var currentVersion = isV2 ? "v2" : "v1";

  try { localStorage.setItem(STORAGE_KEY, currentVersion); } catch (e) {}

  // Cible du switch : on bascule vers l'autre version (page d'accueil)
  var target = isV2 ? "/" : "/v2/";
  var label = isV2 ? "Revenir à la version actuelle" : "Voir la nouvelle version";
  var badge = isV2 ? "Nouvelle version" : "Version actuelle";
  var arrow = isV2 ? "←" : "→";

  // ---- Styles (injectés pour rester sur un seul fichier) -------------------
  var css = "" +
    ".dg-vswitch{position:fixed;left:50%;transform:translateX(-50%);bottom:20px;z-index:9998;" +
      "font-family:'Inter',system-ui,sans-serif;max-width:calc(100vw - 40px)}" +
    ".dg-vswitch__card{display:flex;align-items:center;gap:12px;background:#FAF7F1;color:#111;" +
      "border:1px solid #E2DDD2;border-radius:10px;padding:10px 12px;text-decoration:none;" +
      "box-shadow:0 8px 28px rgba(40,20,20,.18);transition:transform .15s ease,box-shadow .15s ease}" +
    ".dg-vswitch__card:hover{transform:translateY(-2px);box-shadow:0 12px 34px rgba(40,20,20,.24)}" +
    ".dg-vswitch__icon{flex:0 0 auto;width:34px;height:34px;border-radius:8px;background:#6E1F2A;color:#fff;" +
      "display:flex;align-items:center;justify-content:center;font-size:1.1rem;line-height:1}" +
    ".dg-vswitch__txt{display:flex;flex-direction:column;line-height:1.25;min-width:0}" +
    ".dg-vswitch__badge{font-size:.6rem;letter-spacing:.12em;text-transform:uppercase;color:#B68A45;font-weight:600}" +
    ".dg-vswitch__label{font-size:.86rem;font-weight:500;color:#111;white-space:nowrap}" +
    ".dg-vswitch__arrow{flex:0 0 auto;color:#6E1F2A;font-size:1.05rem;font-weight:700;padding-left:2px}" +
    ".dg-vswitch__close{position:absolute;top:-8px;right:-8px;width:22px;height:22px;border-radius:50%;" +
      "background:#6E1F2A;color:#fff;border:2px solid #FAF7F1;cursor:pointer;font-size:.8rem;line-height:1;" +
      "display:flex;align-items:center;justify-content:center;padding:0}" +
    "@media (max-width:520px){.dg-vswitch__label{font-size:.8rem}.dg-vswitch{bottom:14px}}";

  var style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  // ---- Markup --------------------------------------------------------------
  var wrap = document.createElement("div");
  wrap.className = "dg-vswitch";
  wrap.setAttribute("role", "complementary");
  wrap.setAttribute("aria-label", "Comparer les deux versions du site");

  var link = document.createElement("a");
  link.className = "dg-vswitch__card";
  link.href = target;
  link.innerHTML =
    '<span class="dg-vswitch__icon" aria-hidden="true">' + (isV2 ? "↩" : "✦") + "</span>" +
    '<span class="dg-vswitch__txt">' +
      '<span class="dg-vswitch__badge">Aperçu · ' + badge + "</span>" +
      '<span class="dg-vswitch__label">' + label + "</span>" +
    "</span>" +
    '<span class="dg-vswitch__arrow" aria-hidden="true">' + arrow + "</span>";

  var close = document.createElement("button");
  close.className = "dg-vswitch__close";
  close.type = "button";
  close.setAttribute("aria-label", "Masquer le comparateur de versions");
  close.textContent = "×";
  close.addEventListener("click", function (e) {
    e.preventDefault();
    wrap.remove();
  });

  wrap.appendChild(link);
  wrap.appendChild(close);
  document.body.appendChild(wrap);

  // --- Coexistence avec la bannière cookies (évite le chevauchement) --------
  var banner = document.getElementById("cookieBanner");
  function syncPosition() {
    if (!wrap.isConnected) return;
    var visible = banner &&
      !banner.classList.contains("hidden") &&
      getComputedStyle(banner).display !== "none";
    wrap.style.bottom = visible ? (banner.offsetHeight + 30) + "px" : "";
  }
  if (banner) {
    syncPosition();
    // re-sync quand la bannière est acceptée/refusée (ajout de .hidden)
    new MutationObserver(syncPosition).observe(banner, {
      attributes: true, attributeFilter: ["class", "style"]
    });
    window.addEventListener("resize", syncPosition);
    // la bannière peut s'afficher juste après le chargement
    setTimeout(syncPosition, 200);
  }
})();
