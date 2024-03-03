const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const btn = document.getElementById("btn");
const loader = document.getElementById("loader");

// Loading function
const loading = () => {
  loader.hidden = false;
  quoteContainer.hidden = true;
};

// Complete function
const complete = () => {
  quoteContainer.hidden = false;
  loader.hidden = true;
};

// const apiUrl = "https://api.quotable.io/random";

const newQuote = (apiQuote) => {
  if (apiQuote.content.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  quoteText.textContent = `"${apiQuote.content}"`;
  authorText.textContent = `-${apiQuote.author}`;
};

const getQuote = async () => {
  loading();
  const apiUrl = "https://api.quotable.io/random";
  try {
    const response = await fetch(apiUrl);
    apiQuote = await response.json();
    newQuote(apiQuote);
    console.log(apiQuote);
  } catch (err) {
    console.log(err);
  }
  complete();
};

getQuote();

btn.addEventListener("click", getQuote);

document.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    getQuote();
  }
});
