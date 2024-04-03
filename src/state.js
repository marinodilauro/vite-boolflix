import { reactive } from 'vue';
import axios from 'axios';

// Global state
export const state = reactive({

  // State (data)
  movie: {
    id: '',
    poster: 'https://image.tmdb.org/t/p/w300',
    originalTitle: '',
    title: '',
    lang: '',
    vote: ''
  },
  tvShow: {
    id: '',
    poster: 'https://image.tmdb.org/t/p/w300',
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

          const updatedMovie = { ...movie }

          updatedMovie.id = index;
          updatedMovie.poster = this.movie.poster + movie.poster_path;
          updatedMovie.originalTitle = movie.title;
          updatedMovie.title = movie.original_title;
          updatedMovie.lang = movie.original_language;
          updatedMovie.vote = parseInt(movie.vote_average / 2);

          /*           this.movie = {
                      id: index,
                      poster: this.movie.poster + movie.poster_path,
                      originalTitle: movie.title,
                      title: movie.original_title,
                      lang: movie.original_language,
                      vote: movie.vote_average
                    } */

          this.movies.push(updatedMovie);

          // this.movie.poster = 'https://image.tmdb.org/t/p/w185';

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

          const updatedTvShow = { ...tvShow }

          updatedTvShow.id = index;
          updatedTvShow.poster = this.tvShow.poster + tvShow.poster_path;
          updatedTvShow.originalTitle = tvShow.name;
          updatedTvShow.title = tvShow.original_name;
          updatedTvShow.lang = tvShow.original_language;
          updatedTvShow.vote = parseInt(tvShow.vote_average / 2);

          /*           this.tvShow = {
                      id: index,
                      poster: this.tvShow.poster + tvShow.poster_path,
                      originalTitle: tvShow.name,
                      title: tvShow.original_name,
                      lang: tvShow.original_language,
                      vote: tvShow.vote_average
                    } */

          this.tvShows.push(updatedTvShow);
          // this.tvShow.poster = 'https://image.tmdb.org/t/p/w185';

        });

        console.log(this.tvShows);

      })
      .catch(err => {
        console.error(err.message)
      })

  },

})