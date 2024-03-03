const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const btn = document.getElementById("btn");

async function getQuote() {
  const apiUrl = "https://api.quotable.io/random";
  try {
    const response = await fetch(apiUrl);
    apiQuote = await response.json();
    console.log(apiQuote.content);
    console.log(apiQuote.author);

    quoteText.textContent = `"${apiQuote.content}"`;
    if (!apiQuote.author) {
      authorText.textContent = "Unknown";
    } else {
      authorText.textContent = `-${apiQuote.author}`;
    }

    if (apiQuote.content.length > 120) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }
  } catch (err) {
    alert(err);
  }
}

btn.addEventListener("click", getQuote);
