/* ============================================================================
 * Cabinet d'avocats D.G, Sélecteur de versions (TEMPORAIRE)
 * ----------------------------------------------------------------------------
 * Pastille flottante permettant de comparer les 3 versions du site :
 *   • Version actuelle   (V1, racine /)
 *   • Nouvelle version    (V2, /v2/)
 *   • Style Label         (V3, /v3/)
 * Outil de démonstration pour que le client compare et choisisse.
 *
 * POUR RETIRER : supprimer ce fichier + les balises
 *   <script src="/assets/version-switch.js" defer></script>
 * (un `grep -rl version-switch.js` liste toutes les pages concernées).
 * ========================================================================== */
(function () {
  "use strict";

  var VERSIONS = [
    { id: "v1", home: "/",     label: "V1", sub: "Actuelle", desc: "Version en ligne" },
    { id: "v2", home: "/v2/",  label: "V2", sub: "Refonte",  desc: "Refonte du cabinet" },
    { id: "v3", home: "/v3/",  label: "V3", sub: "Label",    desc: "Style label-avocats" }
  ];

  var path = window.location.pathname;
  var current = /(^|\/)v3(\/|$)/.test(path) ? "v3"
              : /(^|\/)v2(\/|$)/.test(path) ? "v2"
              : "v1";
  try { localStorage.setItem("dg-preview-version", current); } catch (e) {}

  var curObj = VERSIONS.filter(function (v) { return v.id === current; })[0];

  // ---- Styles -------------------------------------------------------------
  var css = "" +
    ".dg-vswitch{position:fixed;left:50%;transform:translateX(-50%);bottom:20px;z-index:9998;" +
      "font-family:'Inter',system-ui,-apple-system,Arial,sans-serif;max-width:calc(100vw - 24px)}" +
    ".dg-vswitch__bar{display:flex;align-items:center;gap:10px;background:#13131f;color:#fff;" +
      "border:1px solid rgba(255,255,255,.14);border-radius:999px;padding:7px 8px 7px 16px;" +
      "box-shadow:0 10px 30px rgba(0,0,0,.30)}" +
    ".dg-vswitch__lead{font-size:.7rem;letter-spacing:.12em;text-transform:uppercase;color:#b9b9c6;white-space:nowrap}" +
    ".dg-vswitch__opts{display:flex;gap:4px}" +
    ".dg-vswitch__opt{font-size:.78rem;font-weight:500;color:#e8e8ef;text-decoration:none;" +
      "padding:6px 13px;border-radius:999px;white-space:nowrap;transition:background .15s,color .15s}" +
    ".dg-vswitch__opt b{font-weight:700}" +
    ".dg-vswitch__opt span{opacity:.62;font-weight:400}" +
    ".dg-vswitch__opt:hover{background:rgba(255,255,255,.10)}" +
    ".dg-vswitch__opt[aria-current='true']{background:#fff;color:#13131f}" +
    ".dg-vswitch__opt[aria-current='true'] span{opacity:.55}" +
    ".dg-vswitch__close{flex:0 0 auto;width:24px;height:24px;border-radius:50%;border:none;cursor:pointer;" +
      "background:rgba(255,255,255,.10);color:#fff;font-size:.85rem;line-height:1;display:flex;align-items:center;justify-content:center}" +
    ".dg-vswitch__close:hover{background:rgba(255,255,255,.20)}" +
    "@media (max-width:640px){.dg-vswitch__lead{display:none}.dg-vswitch__opt span{display:none}" +
      ".dg-vswitch__opt{padding:8px 14px;font-size:.8rem}.dg-vswitch__bar{padding:6px 6px 6px 10px}}";
  var style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  // ---- Markup -------------------------------------------------------------
  var wrap = document.createElement("div");
  wrap.className = "dg-vswitch";
  wrap.setAttribute("role", "complementary");
  wrap.setAttribute("aria-label", "Comparer les versions du site");

  var opts = VERSIONS.map(function (v) {
    var isCur = v.id === current;
    return '<a class="dg-vswitch__opt" href="' + v.home + '"' +
      (isCur ? ' aria-current="true"' : '') +
      ' title="' + v.desc + '"><b>' + v.label + '</b> <span>' + v.sub + '</span></a>';
  }).join("");

  var bar = document.createElement("div");
  bar.className = "dg-vswitch__bar";
  bar.innerHTML =
    '<span class="dg-vswitch__lead">Voir&nbsp;:</span>' +
    '<span class="dg-vswitch__opts">' + opts + '</span>' +
    '<button class="dg-vswitch__close" type="button" aria-label="Masquer le comparateur">×</button>';

  bar.querySelector(".dg-vswitch__close").addEventListener("click", function () { wrap.remove(); });
  wrap.appendChild(bar);
  document.body.appendChild(wrap);

  // ---- Coexistence avec la bannière cookies (V1/V2) -----------------------
  var banner = document.getElementById("cookieBanner");
  function syncPosition() {
    if (!wrap.isConnected) return;
    var visible = banner && !banner.classList.contains("hidden") &&
      getComputedStyle(banner).display !== "none";
    wrap.style.bottom = visible ? (banner.offsetHeight + 30) + "px" : "";
  }
  if (banner) {
    syncPosition();
    new MutationObserver(syncPosition).observe(banner, { attributes: true, attributeFilter: ["class", "style"] });
    window.addEventListener("resize", syncPosition);
    setTimeout(syncPosition, 200);
  }
})();
