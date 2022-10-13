// const key = document.querySelectorAll('.drum');
// // key.addEventListener('click', function () {
// //   console.log('sex');
// // });

// for (let i = 0; i < key.length; i++) {
//   key[i].addEventListener('click', function () {
//     audio.play();
//   });
// }

const keyW = document.querySelector('.w');
const keyA = document.querySelector('.a');
const keyS = document.querySelector('.s');
const keyD = document.querySelector('.d');
const keyJ = document.querySelector('.j');
const keyK = document.querySelector('.k');
const keyL = document.querySelector('.l');
const audioW = new Audio(`sounds/tom-1.mp3`);
const audioA = new Audio(`sounds/tom-2.mp3`);
const audioS = new Audio(`sounds/tom-3.mp3`);
const audioD = new Audio(`sounds/tom-4.mp3`);
const audioJ = new Audio(`sounds/snare.mp3`);
const audioK = new Audio(`sounds/crash.mp3`);
const audioL = new Audio(`sounds/kick-bass.mp3`);

keyW.addEventListener('click', function () {
  audioW.play();
});
keyA.addEventListener('click', function () {
  audioA.play();
});
keyS.addEventListener('click', function () {
  audioS.play();
});
keyD.addEventListener('click', function () {
  audioD.play();
});
keyJ.addEventListener('click', function () {
  audioJ.play();
});
keyK.addEventListener('click', function () {
  audioK.play();
});
keyL.addEventListener('click', function () {
  audioL.play();
});
