import { reactive } from 'vue';
import axios from 'axios';

// Global state
export const state = reactive({

  // State (data)
  movie: {
    id: '',
    originalTitle: '',
    title: '',
    lang: '',
    vote: ''
  },
  movies: [],
  movies_search_api_url: 'https://api.themoviedb.org/3/search/movie?api_key=05ef2d511c8cbc2bd8832a8dfcbd5ff7&query=',

  // Actions that change the state

  searchMovie(movieTitle) {

    this.movies = [];

    let moviesList = [];

    axios.get(this.movies_search_api_url + movieTitle)
      .then(response => {
        console.log(response.data.results);

        moviesList = response.data.results;

        moviesList.forEach((movie, index) => {

          this.movie = {
            id: index,
            originalTitle: movie.original_title,
            title: movie.title,
            lang: movie.original_language,
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