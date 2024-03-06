// Get references to HTML elements
const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

// Number of photos to fetch
let count = 7;

// API key for accessing Unsplash API
const apiKey = "GNO6VocazscaeW9i4HFKO_TRN7v_a5uOUfce-YU6ROo";

// API endpoint URL
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Image Loaded
const imageLoaded = () => {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    count = 30;
    apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
  }
};

// Helper Function to set Attributes
const setAttributes = (element, attributes) => {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
};

// Function to display fetched photos
const displayPhotos = () => {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  // Loop through each photo in the array
  photosArray.forEach((photo) => {
    // Create <a> element
    const item = document.createElement("a");
    setAttributes(item, { href: photo.links.html, target: "_blank" });

    // Create <img> element
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    img.addEventListener("load", imageLoaded);

    // Append <img> to <a>
    item.appendChild(img);
    // Append <a> to the image container
    imageContainer.appendChild(item);
  });
};

// Function to fetch photos from the API
const getPhotos = async () => {
  try {
    // Fetch data from the API endpoint
    const response = await fetch(apiUrl);

    // Parse response data as JSON
    photosArray = await response.json();

    // Call function to display fetched photos
    displayPhotos();
  } catch (err) {
    console.error(err);
  }
};

// Check to see if scrolling near bottom of page, load more photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    getPhotos();
    ready = false;
  }
});

// Call the getPhotos function to fetch and display photos
getPhotos();
