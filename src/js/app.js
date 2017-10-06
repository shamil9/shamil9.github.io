var slider = new Siema();

document.querySelector(".prev").addEventListener("click", function() {
  slider.prev();
});
document.querySelector(".next").addEventListener("click", function() {
  slider.next();
});
