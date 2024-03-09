const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

audioElement.hidden = true;

// VoiceRSS Javascript SDK
const VoiceRSS = {
  speech: function (e) {
    this._validate(e), this._request(e);
  },
  _validate: function (e) {
    if (!e) throw "The settings are undefined";
    if (!e.key) throw "The API key is undefined";
    if (!e.src) throw "The text is undefined";
    if (!e.hl) throw "The language is undefined";
    if (e.c && "auto" != e.c.toLowerCase()) {
      var a = !1;
      switch (e.c.toLowerCase()) {
        case "mp3":
          a = new Audio().canPlayType("audio/mpeg").replace("no", "");
          break;
        case "wav":
          a = new Audio().canPlayType("audio/wav").replace("no", "");
          break;
        case "aac":
          a = new Audio().canPlayType("audio/aac").replace("no", "");
          break;
        case "ogg":
          a = new Audio().canPlayType("audio/ogg").replace("no", "");
          break;
        case "caf":
          a = new Audio().canPlayType("audio/x-caf").replace("no", "");
      }
      if (!a) throw "The browser does not support the audio codec " + e.c;
    }
  },
  _request: function (e) {
    var a = this._buildRequest(e),
      t = this._getXHR();
    (t.onreadystatechange = function () {
      if (4 == t.readyState && 200 == t.status) {
        if (0 == t.responseText.indexOf("ERROR")) throw t.responseText;
        audioElement.src = t.responseText;
        audioElement.play(); // Play the audio after setting the source
      }
    }),
      t.open("POST", "https://api.voicerss.org/", !0),
      t.setRequestHeader(
        "Content-Type",
        "application/x-www-form-urlencoded; charset=UTF-8"
      ),
      t.send(a);
  },
  _buildRequest: function (e) {
    var a = e.c && "auto" != e.c.toLowerCase() ? e.c : this._detectCodec();
    return (
      "key=" +
      (e.key || "") +
      "&src=" +
      (e.src || "") +
      "&hl=" +
      (e.hl || "") +
      "&r=" +
      (e.r || "") +
      "&c=" +
      (a || "") +
      "&f=" +
      (e.f || "") +
      "&ssml=" +
      (e.ssml || "") +
      "&b64=true"
    );
  },
  _detectCodec: function () {
    var e = new Audio();
    return e.canPlayType("audio/mpeg").replace("no", "")
      ? "mp3"
      : e.canPlayType("audio/wav").replace("no", "")
      ? "wav"
      : e.canPlayType("audio/aac").replace("no", "")
      ? "aac"
      : e.canPlayType("audio/ogg").replace("no", "")
      ? "ogg"
      : e.canPlayType("audio/x-caf").replace("no", "")
      ? "caf"
      : "";
  },
  _getXHR: function () {
    try {
      return new XMLHttpRequest();
    } catch (e) {}
    try {
      return new ActiveXObject("Msxml3.XMLHTTP");
    } catch (e) {}
    try {
      return new ActiveXObject("Msxml2.XMLHTTP.6.0");
    } catch (e) {}
    try {
      return new ActiveXObject("Msxml2.XMLHTTP.3.0");
    } catch (e) {}
    try {
      return new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {}
    try {
      return new ActiveXObject("Microsoft.XMLHTTP");
    } catch (e) {}
    throw "The browser does not support HTTP request";
  },
};

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
