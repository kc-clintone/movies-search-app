// ---------------API Setup---------------
async function searchMovies(query, page) {
	const url = `http://www.omdbapi.com/?apikey=55253d3&s=${query}&page=${page}`;

	try {
		const response = await fetch(url);
		const data = await response.json();

		if (data.Response === 'True') {
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
const paginationContainer = document.getElementById('paginationContainer');

// ===GET USER INPUT====
function getUserInput() {
	const inputElement = document.getElementById('searchInput');
	return inputElement.value;
}

let isSearching = false;
let currentPage = 1;
const resultsPerPage = 5;

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
				const totalResults = await getTotalResults(target);
				const totalPages = Math.ceil(totalResults / resultsPerPage);

				if (totalPages === 0) {
					// No results found
					displayNoResults();
				} else {
					// Perform pagination
					currentPage = 1;
					displayPagination(totalPages);
					await fetchAndDisplayResults(target, currentPage);
				}
			} catch (error) {
				console.error(error.message);
				// Reset the search state ---if an error occurs---
				isSearching = false;
			}
		}
	}
}

// Fetch total results count
async function getTotalResults(query) {
	const url = `http://www.omdbapi.com/?apikey=55253d3&s=${query}`;

	try {
		const response = await fetch(url);
		const data = await response.json();

		if (data.Response === 'True') {
			console.log(data);
			return parseInt(data.totalResults);
		} else {
			throw new Error(data.Error);
		}
	} catch (error) {
		console.error(error.message);
		throw error;
	}
}

// Fetch and display results for a specific page
async function fetchAndDisplayResults(query, page) {
	try {
		const results = await searchMovies(query, page);
		const dataArray = [results];
		displayMovieResults(dataArray);
	} catch (error) {
		console.error(error.message);
		// Reset the search state ---if an error occurs---
		isSearching = false;
	}
}

// -------Display movie results-------
function displayMovieResults(dataArray) {
	clearSearchResults();

	for (const movies of dataArray) {
		for (const movie of movies.Search) {
			const { Title, Year, imdbID, Type, Poster } = movie;

			let movieElement = document.createElement('div');
			movieElement.classList.add('movie-card');
			movieElement.innerHTML = `
        <img src=${Poster} alt='poster image' class='poster'/>
        <h2 class='movie-release-year-title'>Title</h2>
        <h2 class='movie-title'>${Title}</h2>
        <h2 class='movie-release-year-title'>Release Year:</h2>
        <h2 class='release-date'>${Year}</h2>
        <button class='details-btn'>View more</button>
      `;

			let moreDetails = document.createElement('div');
			moreDetails.classList.add('movie-details');
			moreDetails.innerHTML = `
        <p class='common-stat-h4-styles'>IMDb ID:</p>
        <span class='common-stat-h3-styles'>${imdbID}</span>
        <p class='common-stat-h4-styles'>Genre:</p>
        <span class='common-stat-h3-styles'>${Type}</span>
      `;

			// Hide moreDetails by default
			moreDetails.style.display = 'none';
			moreDetails.style.flexDirection = 'column';
			moreDetails.style.justifyContent = 'center';
			moreDetails.style.alignItems = 'center';
			moreDetails.style.width = '100%';
			moreDetails.style.height = 'auto';

			movieElement.appendChild(moreDetails);
			movieResults.appendChild(movieElement);

			// Add event listener to the details button
			const detailsBtn = movieElement.querySelector('.details-btn');
			detailsBtn.addEventListener('click', () => toggleDetails(detailsBtn));
		}
	}
}

// ------Display no results message------
function displayNoResults() {
	clearSearchResults();

	const messageElement = document.createElement('p');
	messageElement.textContent = 'No results found.';
	movieResults.appendChild(messageElement);
}

// --------Toggle movie details--------
function toggleDetails(button) {
	const movieElement = button.parentNode;
	const moreDetails = movieElement.querySelector('.movie-details');
	const isExpanded = moreDetails.style.display === 'none';

	moreDetails.style.display = isExpanded ? 'flex' : 'none';
	button.textContent = isExpanded ? 'View less' : 'View more';
}

// --------Display pagination buttons--------
function displayPagination(totalPages) {
	paginationContainer.innerHTML = '';

	for (let i = 1; i <= totalPages; i++) {
		const pageButton = document.createElement('button');
		pageButton.textContent = i;
		pageButton.addEventListener('click', () => handlePageClick(i));
		paginationContainer.appendChild(pageButton);
	}
}

// --------Handle page click event--------
function handlePageClick(page) {
	currentPage = page;
	fetchAndDisplayResults(getUserInput(), currentPage);
}

// --------resetting the whole app---------
function clearSearchResults() {
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

// ====WHEN SEARCH IS INITIATED====
searchBtn.addEventListener('click', handleSearch);
