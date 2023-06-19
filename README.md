# Movie Search App

The Carrot Movies is a web application that allows users to search for movies and retrieve detailed information about them using the OMDB API. This app provides an easy and convenient way to explore and discover movies based on specific criteria such as title, keyword, or genre. By leveraging the OMDB API, the app provides access to a vast database of movie information, including titles, release years, ratings, plot summaries, cast, and more.

## Features

- Search for movies by title or keyword
- Retrieve movie details such as release year, rating, plot, and cast
- Display movie posters for visual representation
- Toggle between showing more or less details for each movie

## Technologies Used

- HTML
- CSS
- JavaScript

## Getting Started

To use the Movie Search App, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/kc-clintone/movies-search-app.git
```

2. Navigate to the project directory:

```bash
cd movie-search-app
```

3. Open the `index.html` file in a web browser.

## Usage

1. Enter a movie title or keyword in the search input field.
2. Press the Enter key or click the "Search" button.
3. The app will retrieve the matching movies from the OMDB API.
4. The movie results will be displayed, including the title, release year, rating, and a "Show More Details" button.
5. To view additional details such as the plot and cast, click the "Show More Details" button. The button will toggle between "Show Less Details" and "Show More Details" depending on the current state.
6. Scroll through the movie results to explore more movies.
7. To search for another movie, repeat steps 1-6.

## API Key

This app utilizes the OMDB API to fetch movie data. To use the app, you need to obtain an API key from the OMDB website (http://www.omdbapi.com/) and replace the placeholder `'YOUR_API_KEY'` in the `script.js` file with your actual API key.

```javascript
const apiKey = 'YOUR_API_KEY';
```

## Contributing

Contributions are welcome! If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

---
