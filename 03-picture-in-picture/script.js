const videoElement = document.getElementById("video");

const startButton = document.getElementById("button");
const screenSelectorButton = document.getElementById("screen-selector-button");

videoElement.hidden = true;
// Promt to select media stream, to play

const selectMediaStream = async () => {
  try {
    const mediaStream = await navigator.mediaDevices.getDisplayMedia();
    videoElement.srcObject = mediaStream;
    videoElement.onloadedmetadata = () => {
      videoElement.play();
    };
  } catch (error) {
    // catch Error
    console.log(" selectMediaStream err = ", error);
  }
};

// On Load

screenSelectorButton.addEventListener("click", async () => {
  await selectMediaStream();
  videoElement.hidden = false;
});

startButton.addEventListener("click", async () => {
  // Disable The Button
  startButton.disabled = true;
  // start p in p
  await videoElement.requestPictureInPicture();
  // Reset Button
  startButton.disabled = false;
});
