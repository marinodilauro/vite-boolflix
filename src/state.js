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
  tvShow: {
    id: '',
    originalTitle: '',
    title: '',
    lang: '',
    vote: ''
  },
  movies: [],
  tvShows: [],
  movies_search_api_url: 'https://api.themoviedb.org/3/search/movie?api_key=05ef2d511c8cbc2bd8832a8dfcbd5ff7&query=',
  tvShows_search_api_url: 'https://api.themoviedb.org/3/search/tv?api_key=05ef2d511c8cbc2bd8832a8dfcbd5ff7&query=',

  // Actions that change the state

  searchMovieOrTvShow(title) {

    this.movies = [];
    this.tvShows = [];

    let moviesList = [];
    let tvShowsList = [];

    // Movie API call
    axios.get(this.movies_search_api_url + title)
      .then(response => {
        console.log(response.data.results);

        moviesList = response.data.results;

        moviesList.forEach((movie, index) => {

          this.movie = {
            id: index,
            originalTitle: movie.title,
            title: movie.original_title,
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


    // TV Show API call
    axios.get(this.tvShows_search_api_url + title)
      .then(response => {
        console.log(response.data.results);

        moviesList = response.data.results;

        moviesList.forEach((tvShow, index) => {

          this.tvShow = {
            id: index,
            originalTitle: tvShow.name,
            title: tvShow.original_name,
            lang: tvShow.original_language,
            vote: tvShow.vote_average
          }

          this.tvShows.push(this.tvShow);

        });

        console.log(this.tvShows);

      })
      .catch(err => {
        console.error(err.message)
      })

  },

})