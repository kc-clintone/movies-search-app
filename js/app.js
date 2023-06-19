// ---------------API Setup---------------
function searchMovies(query) {
	const apiKey = '55253d3';
	const url = `http://www.omdbapi.com/?apikey=${apiKey}&t=${query}`;

	return fetch(url)
		.then((response) => response.json())
		.then((data) => {
			if (data.Response === 'True') {
				console.log(data);
				return data;
			} else {
				throw new Error(data.Error);
			}
		});
}

// --------------UI updates----------------
const searchBtn = document.getElementById('searchBtn');
const sectionA = document.getElementById('sectionA');
const sectionB = document.getElementById('sectionB');
const movieResults = document.getElementById('movieResults');

const userInput = (e) => {
	e = document.getElementById('searchInput');
	return e.value;
};

searchBtn.addEventListener('click', () => {
	var target = userInput();
	if (target.length === 0) {
		sectionA.classList.add('active');
	} else {
		sectionA.classList.add('inactive');
		sectionB.classList.add('active');
		searchMovies(target)
			.then((results) => {
				const dataArray = [];
				dataArray.push(results);
				displayMovieResults(dataArray);
			})
			.catch((error) => {
				console.error(error.message);
			});
	}
});

// Toggle between showing more and less details
function toggleDetails(element) {
	element.parentNode.classList.toggle('show-details');
}

// Display movie results
function displayMovieResults(dataArray) {
	const movieResults = document.getElementById('movieResults');

	dataArray.forEach((movie) => {
		const title = movie.Title;
		const year = movie.Year;
		const rating = movie.imdbRating;
		const plot = movie.Plot;
		const cast = movie.Actors;
		const poster = movie.Poster;
		const type = movie.Type;

		let movieElement = document.createElement('div');
		movieElement.classList.add('movie-card');
		movieElement.innerHTML = `
		<img src=${poster} alt='poster image' class='poster'/>
          <h2 class='movie-release-year-title'>Title</h2>
          <h2 class='movie-title'>${title}</h2>
		  <h2 class='movie-release-year-title'>Release Year:</h2>
		  <h2 class='release-date'>${year}</h2>
          
          <button class='details-btn' onclick="toggleDetails(this)">Show ${
						movieElement.classList.contains('show-details') ? 'Less' : 'More'
					} Details</button>
          <div class="movie-details">
		  <p class='common-stat-h4-styles'>Rating:</p>
		  <span class='common-stat-h3-styles'>⭐ ${rating}</span>
            <p class='common-stat-h4-styles'>Plot summary:</p>
			<span class='common-stat-h3-styles'>${plot} </span>
            <p class='common-stat-h4-styles'>Cast:</p>
			<span class='common-stat-h3-styles cast'>${cast}</span>
            <p class='common-stat-h4-styles'>Genre:</p>
			<span class='common-stat-h3-styles'>${type}</span>
          </div>
          <hr>
        `;

		movieResults.appendChild(movieElement);
	});
}
