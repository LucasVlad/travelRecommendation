let travelData = null;

async function fetchTravelData() {
  try {
    const response = await fetch("travel_recommendation_api.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    travelData = await response.json();
    console.log("Data loaded successfully:", travelData);
  } catch (error) {
    console.error("Error loading travel data:", error);
  }
}

window.addEventListener("DOMContentLoaded", fetchTravelData);
function searchFunction() {
  if (!travelData) {
    console.log("No travel data available");
    return;
  }

  const searchInput = document.getElementById("searchInput");
  const searchTerm = searchInput.value.toLowerCase().trim();
  console.log("Search input value:", searchTerm);

  if (!searchTerm) {
    console.log("Empty search input");
    return;
  }

  resetFunction();

  const results = [];

  travelData.countries.forEach((country) => {
    country.cities.forEach((city) => {
      if (
        city.name.toLowerCase().includes(searchTerm) ||
        city.description.toLowerCase().includes(searchTerm)
      ) {
        results.push(city);
      }
    });
  });

  if (searchTerm.includes("temple") || searchTerm.includes("temples")) {
    console.log("Temple category match found");
    results.push(...travelData.temples);
  } else {
    travelData.temples.forEach((temple) => {
      if (
        temple.name.toLowerCase().includes(searchTerm) ||
        temple.description.toLowerCase().includes(searchTerm)
      ) {
        results.push(temple);
      }
    });
  }

  if (searchTerm.includes("beach") || searchTerm.includes("beaches")) {
    console.log("Beach category match found");
    results.push(...travelData.beaches);
  } else {
    travelData.beaches.forEach((beach) => {
      if (
        beach.name.toLowerCase().includes(searchTerm) ||
        beach.description.toLowerCase().includes(searchTerm)
      ) {
        results.push(beach);
      }
    });
  }

  displayResults(results);
}

function displayResults(results) {
  const resultsSection = document.querySelector(".results-section");
  const searchResults = document.querySelector(".search-results");

  if (results.length === 0) {
    searchResults.innerHTML =
      '<p style="text-align: center; padding: 2rem;">No results found</p>';
  } else {
    searchResults.innerHTML = results
      .map(
        (result) => `
            <div class="result-card">
                <img src="${result.imageUrl}" alt="${result.name}">
                <div class="result-card-content">
                    <h3>${result.name}</h3>
                    <p>${result.description}</p>
                </div>
            </div>
        `,
      )
      .join("");
  }

  resultsSection.style.display = "block";
}

function resetFunction() {
  const searchInput = document.getElementById("searchInput");
  searchInput.value = "";
  const resultsSection = document.querySelector(".results-section");
  const searchResults = document.querySelector(".search-results");
  resultsSection.style.display = "none";
  searchResults.innerHTML = "";
}
