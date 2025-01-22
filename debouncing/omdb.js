// Debounce function to delay the API call
function debounce(func, delay) {
  let timer;
  return function(...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
  };
}

// Function to fetch movie titles based on search input
async function fetchMovies(query) {
  const apiKey = '9b59ea9f'; 
  const response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`);
  const data = await response.json();
  if (data.Response === "True") {
      displayMovies(data.Search);
  } else {
      document.getElementById('results').innerHTML = "No movies found.";
  }
}

// Display list of movie titles in results box
function displayMovies(movies) {
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = ""; // Clear previous results
  movies.forEach(movie => {
      const movieDiv = document.createElement('div');
      movieDiv.classList.add('movie-title');
      movieDiv.innerText = movie.Title;
      movieDiv.onclick = () => fetchMovieDetails(movie.imdbID);
      resultsDiv.appendChild(movieDiv);
  });
}

// Function to fetch and display movie details
async function fetchMovieDetails(imdbID) {
  const apiKey = '9b59ea9f'; 
  const response = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`);
  const data = await response.json();
  displayMovieDetails(data);
}

// Display the details of the selected movie
function displayMovieDetails(movie) {
  const detailsDiv = document.getElementById('movie-details');
  detailsDiv.innerHTML = `
      <h2>${movie.Title}</h2>
      <img src="${movie.Poster}" alt="${movie.Title}" />
      <p><strong>Year:</strong> ${movie.Year}</p>
      <p><strong>Genre:</strong> ${movie.Genre}</p>
      <p><strong>Plot:</strong> ${movie.Plot}</p>
      
  `;
}

// Set up the debounced search function
const debouncedFetchMovies = debounce(fetchMovies, 500);

// Event listener for input field to handle search queries
document.getElementById('search-input').addEventListener('input', (event) => {
  const query = event.target.value.trim();
  if (query.length > 2) {
      debouncedFetchMovies(query); // Trigger debounced API call
  } else {
      document.getElementById('results').innerHTML = ""; // Clear results if query is short
      document.getElementById('movie-details').innerHTML = ""; // Clear movie details
  }
});