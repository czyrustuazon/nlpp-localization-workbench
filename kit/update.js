/* Check for a newer workbench. A newer build locks the page, or warns first if edits are unsaved. */
(function () {
  "use strict";

  var ONLINE = "https://czyrustuazon.github.io/nlpp-localization-workbench/";
  var DOWNLOAD =
    "https://github.com/czyrustuazon/nlpp-localization-workbench/archive/refs/heads/main.zip";
  var hosted = window.location.protocol !== "file:";
  var REMOTE = hosted
    ? new URL("../version.json", document.currentScript.src).href
    : "https://raw.githubusercontent.com/czyrustuazon/nlpp-localization-workbench/main/version.json";
  var meta = document.querySelector('meta[name="nlpp-workbench-build"]');
  var local = meta ? Number(meta.getAttribute("content")) : 0;
  if (!Number.isFinite(local)) local = 0;
  var locked = false;
  var pending = 0;
  var unsaved = Object.create(null);
  var timer = 0;

  function ensureStyle() {
    if (document.getElementById("nlpp-update-style")) return;
    var style = document.createElement("style");
    style.id = "nlpp-update-style";
    style.textContent =
      "#nlpp-update-lock{position:fixed;inset:0;z-index:2147483646;background:rgba(10,12,14,.94);" +
      "display:flex;align-items:center;justify-content:center;padding:1.5rem;}" +
      "#nlpp-update-lock .card{max-width:32rem;background:#24272b;color:#e8eaed;" +
      "border:1px solid #3a3f46;border-radius:10px;padding:1.25rem 1.4rem;" +
      "font-family:Segoe UI,system-ui,sans-serif;line-height:1.45;}" +
      "#nlpp-update-lock h2{margin:0 0 .5rem;font-size:1.05rem;}" +
      "#nlpp-update-lock p{margin:.4rem 0;font-size:.92rem;}" +
      "#nlpp-update-lock a,#nlpp-update-lock button{display:inline-block;font:inherit;font-size:.92rem;" +
      "margin:.8rem .5rem 0 0;color:#e8eaed;background:#2a2f36;border:1px solid #3a3f46;" +
      "border-radius:6px;padding:.45rem .9rem;text-decoration:none;cursor:pointer;}" +
      "#nlpp-update-lock .primary{background:#2a4558;border-color:#4a7a9a;}" +
      "#nlpp-update-warning{position:fixed;left:0;right:0;bottom:0;z-index:2147483646;margin:0;" +
      "padding:.55rem 1rem;background:#5a4312;color:#fff3d6;border-top:1px solid #a8822a;" +
      "font-family:Segoe UI,system-ui,sans-serif;font-size:.9rem;text-align:center;}";
    document.head.appendChild(style);
  }

  function hasUnsaved() {
    return Object.keys(unsaved).some(function (tool) { return unsaved[tool]; });
  }

  function actions() {
    if (hosted) {
      return '<button type="button" class="primary" id="nlpp-update-refresh">Reload</button>';
    }
    return (
      '<a class="primary" href="' + ONLINE + '">Open online workbench</a>' +
      '<a target="_blank" rel="noopener noreferrer" href="' + DOWNLOAD + '">Download a copy</a>'
    );
  }

  function lock(remoteBuild) {
    if (locked) return;
    locked = true;
    if (timer) window.clearInterval(timer);
    ensureStyle();
    document.querySelectorAll("iframe").forEach(function (frame) {
      frame.inert = true;
      frame.style.pointerEvents = "none";
    });
    var overlay = document.createElement("div");
    overlay.id = "nlpp-update-lock";
    overlay.setAttribute("role", "alertdialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.innerHTML =
      '<div class="card">' +
      "<h2>Workbench update</h2>" +
      "<p>Build " + remoteBuild + " is out. This page is still build " + local + ".</p>" +
      "<p>Editing is locked so a pack is not written from the old kit.</p>" +
      "<p>Saved JSON files still work: load them from Advanced in the Scripts or Strings tab.</p>" +
      actions() +
      "</div>";
    document.body.appendChild(overlay);
    document.addEventListener("keydown", blockEvent, true);
    document.addEventListener("keypress", blockEvent, true);
    document.addEventListener("input", blockEvent, true);
    document.addEventListener("click", blockEvent, true);
    var refresh = document.getElementById("nlpp-update-refresh");
    if (refresh) refresh.addEventListener("click", function () { window.location.reload(); });
  }

  function showWarning(remoteBuild) {
    ensureStyle();
    var warning = document.getElementById("nlpp-update-warning");
    if (!warning) {
      warning = document.createElement("p");
      warning.id = "nlpp-update-warning";
      warning.setAttribute("role", "alert");
      document.body.appendChild(warning);
    }
    warning.textContent =
      "Build " + remoteBuild + " is out and you have unsaved edits. " +
      "Press Save progress now. The page locks for the update once your edits are saved.";
  }

  function hideWarning() {
    var warning = document.getElementById("nlpp-update-warning");
    if (warning) warning.remove();
  }

  function applyPending() {
    if (!pending || locked) return;
    if (hasUnsaved()) {
      showWarning(pending);
    } else {
      hideWarning();
      lock(pending);
    }
  }

  function blockEvent(event) {
    if (!locked) return;
    if (event.type === "click" && event.target.closest &&
        event.target.closest("#nlpp-update-lock a, #nlpp-update-lock button")) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
  }

  function report(message) {
    var status = document.getElementById("nlpp-update-status");
    if (!status) return;
    status.textContent = message;
  }

  function check(manual) {
    if (locked) return Promise.resolve();
    report(manual ? "Checking…" : "");
    var url = REMOTE + "?t=" + Date.now();
    return fetch(url, { cache: "no-store" })
      .then(function (res) {
        if (!res.ok) throw new Error(String(res.status));
        return res.json();
      })
      .then(function (data) {
        var remote = Number(data && data.build);
        if (!Number.isFinite(remote)) throw new Error("bad version");
        if (remote > local) {
          pending = remote;
          applyPending();
          return;
        }
        if (manual) report("Up to date (build " + local + ").");
      })
      .catch(function () {
        if (manual) report("Couldn't reach GitHub to check for updates.");
      });
  }

  function mountButton() {
    if (document.getElementById("nlpp-check-updates")) return;
    var header = document.querySelector("header");
    if (!header) return;
    var button = document.createElement("button");
    button.type = "button";
    button.id = "nlpp-check-updates";
    button.textContent = "Check for updates";
    button.addEventListener("click", function () { check(true); });
    var status = document.createElement("span");
    status.id = "nlpp-update-status";
    status.style.color = "#9aa0a6";
    status.style.fontSize = "0.8rem";
    header.appendChild(button);
    header.appendChild(status);
  }

  function start() {
    // The hub runs the check for its tabs.
    if (window.parent !== window) {
      window.parent.postMessage({ type: "nlpp-kit-ready" }, "*");
      return;
    }
    window.addEventListener("message", function (event) {
      var data = event.data;
      if (!data || data.type !== "nlpp-unsaved") return;
      unsaved[data.tool] = !!data.dirty;
      applyPending();
    });
    mountButton();
    check(false);
    timer = window.setInterval(function () { check(false); }, 5 * 60 * 1000);
    document.addEventListener("visibilitychange", function () {
      if (document.visibilityState === "visible") check(false);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
