/* Check GitHub for a newer workbench. A newer build locks this page until refresh. */
(function () {
  "use strict";

  var REMOTE =
    "https://raw.githubusercontent.com/czyrustuazon/nlpp-localization-workbench/main/version.json";
  var meta = document.querySelector('meta[name="nlpp-workbench-build"]');
  var local = meta ? Number(meta.getAttribute("content")) : 0;
  if (!Number.isFinite(local)) local = 0;
  var locked = false;
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
      "#nlpp-update-lock button{font:inherit;margin-top:.8rem;color:#e8eaed;background:#2a4558;" +
      "border:1px solid #4a7a9a;border-radius:6px;padding:.45rem .9rem;cursor:pointer;}";
    document.head.appendChild(style);
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
      "<p>Build " + remoteBuild + " is on GitHub. This page is still build " + local + ".</p>" +
      "<p>Editing and Save progress are locked so a pack is not written from the old kit. " +
      "Pull or re-download the latest workbench, then refresh.</p>" +
      '<button type="button" id="nlpp-update-refresh">Refresh</button>' +
      "</div>";
    document.body.appendChild(overlay);
    document.addEventListener("keydown", blockEvent, true);
    document.addEventListener("keypress", blockEvent, true);
    document.addEventListener("input", blockEvent, true);
    document.addEventListener("click", blockEvent, true);
    document.getElementById("nlpp-update-refresh").addEventListener("click", function () {
      window.location.reload();
    });
    if (window.parent && window.parent !== window) {
      window.parent.postMessage({ type: "nlpp-update-lock", build: remoteBuild }, "*");
    }
  }

  function blockEvent(event) {
    if (!locked) return;
    var refresh = document.getElementById("nlpp-update-refresh");
    if (event.type === "click" && refresh && (event.target === refresh || refresh.contains(event.target))) {
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
          lock(remote);
          return;
        }
        if (manual) report("Up to date (build " + local + ").");
      })
      .catch(function () {
        if (manual) report("Couldn't reach GitHub to check for updates.");
      });
  }

  function mountButton() {
    if (window.parent !== window) return;
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

  window.addEventListener("message", function (event) {
    var data = event.data;
    if (!data || data.type !== "nlpp-update-lock") return;
    lock(Number(data.build) || local + 1);
  });

  function start() {
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
