const count = 10;
const apiKey = "GNO6VocazscaeW9i4HFKO_TRN7v_a5uOUfce-YU6ROo";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

const getPhotos = async () => {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
};

getPhotos();
