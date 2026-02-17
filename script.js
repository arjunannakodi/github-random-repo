const languageSelect = document.getElementById("languageSelect");
const resultDiv = document.getElementById("result");
const refreshBtn = document.getElementById("refreshBtn");

let currentLanguage = "";

languageSelect.addEventListener("change", () => {
  const language = languageSelect.value;

  if (!language) {
    resultDiv.innerHTML = "<p>Please select a language</p>";
    refreshBtn.style.display = "none";
    return;
  }

  currentLanguage = language;
  fetchRepository(language);
});

async function fetchRepository(language) {
  resultDiv.innerHTML = "<p>Loading...</p>";
  refreshBtn.style.display = "none";

  try {
    const response = await fetch(
      `https://api.github.com/search/repositories?q=language:${language}&sort=stars&order=desc&per_page=50`
    );

    const data = await response.json();
    const repos = data.items;

    const randomRepo = repos[Math.floor(Math.random() * repos.length)];

    resultDiv.innerHTML = `
      <h3>${randomRepo.name}</h3>
      <p>${randomRepo.description || "No description available"}</p>
      <p>⭐ Stars: ${randomRepo.stargazers_count}</p>
      <p>🍴 Forks: ${randomRepo.forks_count}</p>
      <p>🐛 Open Issues: ${randomRepo.open_issues_count}</p>
    `;

    refreshBtn.style.display = "block";

  } catch (error) {
    resultDiv.innerHTML = "<p>Error fetching repository</p>";
  }
}

refreshBtn.addEventListener("click", () => {
  fetchRepository(currentLanguage);
});
