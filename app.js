async function searchMovies(query) {
	const apiKey = '55253d3';
	const url = `http://www.omdbapi.com/?apikey=${apiKey}&s=${query}`;

	const response = await fetch(url);
	const data = await response.json();
	if (data.Response === 'True') {
		return data.Search;
	} else {
		throw new Error(data.Error);
	}
}

searchMovies('Avengers')
	.then((results) => {
		results.forEach((movie) => {
			const title = movie.Title;
			const year = movie.Year;
			const type = movie.Type;
			const poster = movie.Poster;
			const rated = movie.Plot;

			console.log(
				`Title: ${title}, Year: ${year}, Type: ${type}, Poster: ${poster}, Rated: ${rated}`
			);
		});
	})

	.catch((error) => {
		console.error(error.message);
	});
