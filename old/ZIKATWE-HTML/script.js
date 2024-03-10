let logo = document.getElementById("logo");
let previousScroll = 0;
let timeout;

window.onscroll = function () {
  let currentScroll =
    document.body.scrollTop || document.documentElement.scrollTop;
  if (currentScroll > previousScroll) {
    logo.classList.add("hidden");
  } else {
    logo.classList.remove("hidden");
  }
  previousScroll = currentScroll;
  timeout = setTimeout(function () {
    if (
      document.body.scrollTop <= 20 ||
      document.documentElement.scrollTop <= 20
    ) {
      logo.classList.remove("hidden");
    }
  }, 3000);
};
