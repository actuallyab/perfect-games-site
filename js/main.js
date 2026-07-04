// Perfect Games — shared site script (no build step, no dependencies).
// Handles the mobile nav toggle and marks the current page's nav link active.

document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      links.classList.toggle("open");
      var expanded = links.classList.contains("open");
      toggle.setAttribute("aria-expanded", String(expanded));
    });

    links.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  var currentPage = document.body.getAttribute("data-page");
  if (currentPage) {
    document.querySelectorAll(".nav-links a[data-page]").forEach(function (link) {
      if (link.getAttribute("data-page") === currentPage) {
        link.classList.add("active");
      }
    });
  }
});
