// Get DOM elements
const menuBars = document.getElementById("menu-bars");
const overlay = document.getElementById("overlay");
const navItems = [
  document.getElementById("nav-1"),
  document.getElementById("nav-2"),
  document.getElementById("nav-3"),
  document.getElementById("nav-4"),
  document.getElementById("nav-5"),
];

// Toggle navigation function
const toggleNav = () => {
  // Toggle menu bars icon
  menuBars.classList.toggle("change");
  // Toggle overlay
  overlay.classList.toggle("overlay-active");

  // Check if overlay is active
  if (overlay.classList.contains("overlay-active")) {
    // Animate in
    overlay.classList.add("overlay-slide-right");
    overlay.classList.remove("overlay-slide-left");
    // Animate each nav item in
    navItems.forEach((navItem, index) => {
      navItem.classList.remove(`slide-out-${index + 1}`);
      navItem.classList.add(`slide-in-${index + 1}`);
    });
  } else {
    // Animate out
    overlay.classList.add("overlay-slide-left");
    overlay.classList.remove("overlay-slide-right");
    // Animate each nav item out
    navItems.forEach((navItem, index) => {
      navItem.classList.remove(`slide-in-${index + 1}`);
      navItem.classList.add(`slide-out-${index + 1}`);
    });
  }
};

// Event listeners for menu bars and each nav item
menuBars.addEventListener("click", toggleNav);
navItems.forEach((navItem) => {
  navItem.addEventListener("click", toggleNav);
});
