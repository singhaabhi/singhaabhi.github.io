const videoElement = document.getElementById("video");
const startButton = document.getElementById("button");
const screenSelectorButton = document.getElementById("screen-selector-button");

// Initially hide the video element
videoElement.hidden = true;

// Function to select media stream
const selectMediaStream = async () => {
  try {
    // Request user to select a media stream (in this case, display media)
    const mediaStream = await navigator.mediaDevices.getDisplayMedia();

    // Set the selected media stream as the source for the video element
    videoElement.srcObject = mediaStream;

    // Once metadata is loaded, play the video
    videoElement.onloadedmetadata = () => {
      videoElement.play();
    };

    // Show the video element
    videoElement.hidden = false;
  } catch (error) {
    // If an error occurs during media stream selection, log the error and provide feedback to the user
    console.log("Error selecting media stream:", error);
    alert("Failed to select media stream. Please try again.");
  }
};

// Event listener for screen selector button
screenSelectorButton.addEventListener("click", async () => {
  // Disable buttons to prevent concurrent actions
  startButton.disabled = true;
  screenSelectorButton.disabled = true;

  // Call the selectMediaStream function to prompt the user to select a media stream
  await selectMediaStream();

  // Re-enable buttons after the operation is complete
  startButton.disabled = false;
  screenSelectorButton.disabled = false;
});

// Event listener for start button
startButton.addEventListener("click", async () => {
  // Disable buttons to prevent concurrent actions
  startButton.disabled = true;
  screenSelectorButton.disabled = true;

  // Request Picture-in-Picture mode for the video element
  await videoElement.requestPictureInPicture();

  // Re-enable buttons after the operation is complete
  startButton.disabled = false;
  screenSelectorButton.disabled = false;
});
