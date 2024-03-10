const toggleSwitch = document.querySelector('input[type="checkbox"]');
const nav = document.getElementById("nav");
const toggleIcon = document.getElementById("nav");
const image1 = document.getElementById("image1");
const image2 = document.getElementById("image2");
const image3 = document.getElementById("image3");
const textBox = document.getElementById("text-box");

const imageMode = (color) => {
  image1.src = `img/undraw_proud_coder_${color}.svg`;
  image2.src = `img/undraw_feeling_proud_${color}.svg`;
  image3.src = `img/undraw_conceptual_idea_${color}.svg`;
};

const applyStyles = (isDark) => {
  const backgroundColor = isDark
    ? "rgb(0 0 0 / 50%)"
    : "rgb(255 255 255 / 50%)";
  const textBoxBackgroundColor = isDark
    ? "rgb( 255 255 255 / 50%)"
    : "rgb( 0 0 0  / 50%)";
  const textColor = isDark ? "rgb(0 0 0)" : "rgb(255 255 255)";
  nav.style.backgroundColor = backgroundColor;
  textBox.style.backgroundColor = textBoxBackgroundColor;
  textBox.style.color = textColor;
  imageMode(isDark ? "dark" : "light");
};

const switchTheme = () => {
  const isDark = event.target.checked;
  const theme = isDark ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  applyStyles(isDark);
};

toggleSwitch.addEventListener("change", switchTheme);

const currentTheme = localStorage.getItem("theme");

if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);
  toggleSwitch.checked = currentTheme === "dark";
  applyStyles(currentTheme === "dark");
}
