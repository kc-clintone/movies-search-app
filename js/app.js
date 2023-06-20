// ---------------API Setup---------------
async function searchMovies(query) {
	const apiKey = '55253d3';
	const url = `http://www.omdbapi.com/?apikey=${apiKey}&t=${query}`;

	try {
		const response = await fetch(url);
		const data = await response.json();

		if (data.Response === 'True') {
			console.log(data);
			return data;
		} else {
			throw new Error(data.Error);
		}
	} catch (error) {
		console.error(error.message);
		throw error;
	}
}

// --------------UI updates----------------
const searchBtn = document.getElementById('searchBtn');
const sectionA = document.getElementById('sectionA');
const sectionB = document.getElementById('sectionB');
const movieResults = document.getElementById('movieResults');

// ===GET USER INPUT====
function getUserInput() {
	const inputElement = document.getElementById('searchInput');
	return inputElement.value;
}

let isSearching = false;

// ===HANDLE SEARCH FUNCTION===
async function handleSearch() {
	const target = getUserInput();

	if (isSearching) {
		// If currently searching, cancel the request and reset the application
		isSearching = false;
		clearSearchResults();
		resetApplication();
	} else {
		if (target.length === 0) {
			sectionA.classList.add('active');
		} else {
			sectionA.classList.add('inactive');
			sectionB.classList.add('active');

			isSearching = true;

			try {
				const results = await searchMovies(target);
				const dataArray = [results];
				displayMovieResults(dataArray);

				// Update the search button to "cancel" ---while viewing results---
				searchBtn.textContent = 'Cancel';
			} catch (error) {
				console.error(error.message);
				// Reset the search state ---if an error occurs---
				isSearching = false;
			}
		}
	}
}

// ====WHEN SEARCH IS INITIATED====
searchBtn.addEventListener('click', handleSearch);

function toggleDetails(element) {
	const moreDetails = element.nextElementSibling;
	moreDetails.classList.toggle('show-details');

	moreDetails.style.display = moreDetails.classList.contains('show-details')
		? 'flex'
		: 'none';

	element.textContent = moreDetails.classList.contains('show-details')
		? 'View Less'
		: 'View More';
}

// ----Display movie results----
function displayMovieResults(dataArray) {
	const movieResults = document.getElementById('movieResults');

	for (const movie of dataArray) {
		const { Title, Year, imdbRating, Plot, Actors, Poster, Type } = movie;

		let movieElement = document.createElement('div');
		movieElement.classList.add('movie-card');
		movieElement.innerHTML = `
      <img src=${Poster} alt='poster image' class='poster'/>
      <h2 class='movie-release-year-title'>Title</h2>
      <h2 class='movie-title'>${Title}</h2>
      <h2 class='movie-release-year-title'>Release Year:</h2>
      <h2 class='release-date'>${Year}</h2>
      
      <button class='details-btn' onclick="toggleDetails(this)">View more</button>
    `;

		let moreDetails = document.createElement('div');
		moreDetails.classList.add('movie-details');
		moreDetails.innerHTML = `
      <p class='common-stat-h4-styles'>Rating:</p>
      <span class='common-stat-h3-styles'>⭐ ${imdbRating}</span>
      <p class='common-stat-h4-styles'>Plot summary:</p>
      <span class='common-stat-h3-styles'>${Plot} </span>
      <p class='common-stat-h4-styles'>Cast:</p>
      <span class='common-stat-h3-styles cast'>${Actors}</span>
      <p class='common-stat-h4-styles'>Genre:</p>
      <span class='common-stat-h3-styles'>${Type}</span>
    `;

		// ----just a few styles for the movie details element----
		moreDetails.style.display = 'none';
		moreDetails.style.flexDirection = 'column';
		moreDetails.style.justifyContent = 'center';
		moreDetails.style.alignItems = 'center';
		moreDetails.style.width = '100%';
		moreDetails.style.height = 'auto';

		movieElement.appendChild(moreDetails);
		movieResults.appendChild(movieElement);
	}
}

// --------resetting the whole app---------
function clearSearchResults() {
	const movieResults = document.getElementById('movieResults');
	while (movieResults.firstChild) {
		movieResults.firstChild.remove();
	}
}

function resetApplication() {
	const inputElement = document.getElementById('searchInput');
	inputElement.value = '';

	// =====RESET HOME ELEMENTS=====
	sectionA.classList.remove('inactive');
	sectionA.classList.remove('active');
	sectionB.classList.remove('active');

	// =======RESET THE SEARCH BUTTON TO DEFAULT=======
	searchBtn.textContent = 'Search';
}
