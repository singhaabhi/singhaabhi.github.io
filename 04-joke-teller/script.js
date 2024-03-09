const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

audioElement.hidden = true;

// Function to toggle the disabled state of the button
const toggleButton = () => {
  button.disabled = !button.disabled;
};

// Function to convert joke text to speech using VoiceRSS API
const tellMe = (joke) => {
  console.log(joke);

  // Use VoiceRSS API to convert joke text to speech
  VoiceRSS.speech({
    key: "c55c5c66ef734700bd3e0ecd62dbcb8b",
    src: `${joke}`,
    hl: "en-us",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
};

// Function to fetch a joke from the JokeAPI
const getJoke = async () => {
  let joke = "";
  const apiUrl = "https://v2.jokeapi.dev/joke/Any?blacklistFlags=political"; // API URL for fetching jokes
  try {
    // Fetch joke data from the API
    const response = await fetch(apiUrl);
    const data = await response.json();
    // Check if the joke is a two-part joke or a single-line joke
    if (data.type === "twopart") {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = `${data.joke}`;
    }
    // Convert the fetched joke to speech
    tellMe(joke);
    // Disable the button to prevent multiple requests
    toggleButton();
  } catch (error) {
    // Log any errors that occur during joke fetching
    console.error("Error fetching jokes:", error);
  }
};

// Event listener for the button click
button.addEventListener("click", async () => {
  // Disable the button to prevent multiple requests
  button.disabled = true;

  // Fetch a new joke
  await getJoke();
});

// Event listener for when audio playback starts
audioElement.addEventListener("play", () => {
  // Disable the button while audio is playing
  button.disabled = true;
});

// Event listener for when audio playback ends
audioElement.addEventListener("ended", () => {
  // Enable the button when audio playback finishes
  button.disabled = false;
});
