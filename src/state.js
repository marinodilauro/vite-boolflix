import { reactive } from 'vue';
import axios from 'axios';

// Global state
export const state = reactive({

  // State (data)

  APIresults: {
    movies: {},
    tvShows: {},
  },

  // API varaibles

  api_key: 'api_key=181a6823495c32659ae7407c099e7e8f',
  search_api_url: 'https://api.themoviedb.org/3/search/',
  movie_api_url: 'movie?',
  tvShow_api_url: 'tv?',

  // Actions that change the state

  searchMovie(movieTitle) {

    const url = `${this.search_api_url + this.movie_api_url + this.api_key + '&query=' + movieTitle}`;
    return axios.get(url)

  },

  searchTvShow(tvShowTitle) {

    const url = `${this.search_api_url + this.tvShow_api_url + this.api_key + '&query=' + tvShowTitle}`;
    return axios.get(url)

  },

  getResults(searchQuery) {

    Promise.all([this.searchMovie(searchQuery), this.searchTvShow(searchQuery)])
      .then(([movies, tvShows]) => {
        console.log(movies.data, tvShows.data);

        this.APIresults.movies = movies.data.results;

        this.APIresults.movies.forEach((movie, index) => {

          movie.index = index;
          movie.poster = 'https://image.tmdb.org/t/p/w300' + movie.poster_path;
          movie.vote = parseInt(movie.vote_average / 2);

        });
        console.log(this.APIresults.movies);

        this.APIresults.tvShows = tvShows.data.results;

        this.APIresults.tvShows.forEach((tvShow, index) => {

          tvShow.index = index;
          tvShow.poster = 'https://image.tmdb.org/t/p/w300' + tvShow.poster_path;
          tvShow.vote = parseInt(tvShow.vote_average / 2);

        });
        console.log(this.APIresults.tvShows);

      })
      .catch(err => {
        console.error(err.message)
      })

  },

  /* searchMovieOrTvShow(title) {

    this.movies = [];
    this.tvShows = [];

    let moviesList = [];
    let tvShowsList = [];

    // Movie API call



    axios.get(this.api_key + this.title)
      .then(response => {

        // console.log(response.data.results);

        moviesList = response.data.results;

        moviesList.forEach((movie, index) => {

          const updatedMovie = { ...movie }

          updatedMovie.index = index;
          updatedMovie.poster = this.movie.poster + movie.poster_path;
          updatedMovie.originalTitle = movie.title;
          updatedMovie.title = movie.original_title;
          updatedMovie.lang = movie.original_language;
          updatedMovie.vote = parseInt(movie.vote_average / 2);

          this.movies.push(updatedMovie);

        });

        // console.log(this.movies);

      })
      .catch(err => {
        console.error(err.message)
      })


    // TV Show API call
    axios.get(this.tvShows_search_api_url + title)
      .then(response => {

        // console.log(response.data.results);

        moviesList = response.data.results;

        moviesList.forEach((tvShow, index) => {

          const updatedTvShow = { ...tvShow }

          updatedTvShow.index = index;
          updatedTvShow.poster = this.tvShow.poster + tvShow.poster_path;
          updatedTvShow.originalTitle = tvShow.name;
          updatedTvShow.title = tvShow.original_name;
          updatedTvShow.lang = tvShow.original_language;
          updatedTvShow.vote = parseInt(tvShow.vote_average / 2);

          this.tvShows.push(updatedTvShow);

        });

        // console.log(this.tvShows);

      })
      .catch(err => {
        console.error(err.message)
      })

  } */

})