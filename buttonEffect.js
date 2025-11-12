document.querySelectorAll(".footerBar button").forEach(btn => {
  btn.addEventListener("click", () => {
    btn.classList.add("active");
    setTimeout(() => btn.classList.remove("active"), 1400);
  });
});
