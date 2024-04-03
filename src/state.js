import { reactive } from 'vue';
import axios from 'axios';

// Global state
export const state = reactive({

  // State (data)
  movie: {
    originalTitle: '',
    title: '',
    lang: '',
    flag: 'jp',
    vote: ''
  },
  movies: [],
  movies_search_api_url: 'https://api.themoviedb.org/3/search/movie?api_key=05ef2d511c8cbc2bd8832a8dfcbd5ff7&query=',

  // Actions that change the state
  getCountryCode(languageCode) {

    switch (languageCode) {
      case 'en':
        languageCode = 'gb'
        break;
      case 'ja':
        languageCode = 'jp'
        break;
      case 'zh':
        languageCode = 'cn'
        break;
      default:
        languageCode = languageCode
    }

    return languageCode;

  },
  getFlag(countryCode) {

    // `https://restcountries.com/v3.1/code/${language}`

    axios.get('https://restcountries.com/v3.1/alpha/' + countryCode)
      .then(response => {

        return response.data[0].flags.svg;

      })
      .catch(err => {
        console.error(err.message)
      })

  },
  searchMovie(movieTitle) {

    this.movies = [];

    let moviesList = [];

    axios.get(this.movies_search_api_url + movieTitle)
      .then(response => {
        console.log(response.data.results);

        moviesList = response.data.results;

        moviesList.forEach((movie) => {

          this.movie = {
            originalTitle: movie.original_title,
            title: movie.title,
            lang: movie.original_language,
            flag: this.getFlag(this.getCountryCode(movie.original_language)),
            vote: movie.vote_average
          }

          this.movies.push(this.movie);

        });

        console.log(this.movies);

      })
      .catch(err => {
        console.error(err.message)
      })

  },

})