const apiKey = "b50360c7710a48748374adae3184b595";
const newsContainer = document.getElementById("news-container");
const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("search-btn");

async function fetchNews(query = "latest") {
  try {
    const response = await fetch(
      `https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`
    );
    const data = await response.json();

    if (data.articles) {
      renderNews(data.articles);
    } else {
      newsContainer.innerHTML = `<p>No articles found.</p>`;
    }
  } catch (error) {
    console.error("Error fetching news:", error);
    newsContainer.innerHTML = `<p>Failed to load news. Please try again later.</p>`;
  }
}

function renderNews(articles) {
  newsContainer.innerHTML = "";
  articles.forEach((article) => {
    const articleElement = document.createElement("div");
    articleElement.classList.add("news-article");

    articleElement.innerHTML = `
      <img src="${article.urlToImage || "https://via.placeholder.com/300x150"}" alt="Article Image">
      <h2>${article.title}</h2>
      <p>${article.description || "No description available."}</p>
      <a href="${article.url}" target="_blank">Read More</a>
    `;

    newsContainer.appendChild(articleElement);
  });
}

searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query) {
    fetchNews(query);
  }
});

// Load default news on page load
fetchNews();
