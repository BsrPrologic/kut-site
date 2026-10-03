// Dil seçimi: önce kayıtlı tercih, sonra tarayıcı dili (tr ise Türkçe), yoksa İngilizce.
(function () {
  var saved = null;
  try { saved = localStorage.getItem("kut-lang"); } catch (e) {}
  var lang = saved || ((navigator.language || "").toLowerCase().indexOf("tr") === 0 ? "tr" : "en");
  function apply(l) {
    document.documentElement.lang = l;
    document.querySelectorAll("[data-tr]").forEach(function (el) {
      el.innerHTML = el.getAttribute("data-" + l) || el.innerHTML;
    });
    document.querySelectorAll(".lang button").forEach(function (b) {
      b.setAttribute("aria-pressed", b.dataset.set === l ? "true" : "false");
    });
    var t = document.querySelector("title");
    if (t && t.dataset[l]) t.textContent = t.dataset[l];
    try { localStorage.setItem("kut-lang", l); } catch (e) {}
  }
  document.querySelectorAll(".lang button").forEach(function (b) {
    b.addEventListener("click", function () { apply(b.dataset.set); });
  });
  apply(lang);

  // Kıvılcımlar (giriş bölümünde)
  var box = document.querySelector(".embers");
  if (box && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    for (var i = 0; i < 28; i++) {
      var e = document.createElement("i");
      e.style.left = Math.random() * 100 + "%";
      e.style.animationDuration = 5 + Math.random() * 6 + "s";
      e.style.animationDelay = Math.random() * 8 + "s";
      var s = 3 + Math.random() * 4;
      e.style.width = e.style.height = s + "px";
      box.appendChild(e);
    }
  }
})();
