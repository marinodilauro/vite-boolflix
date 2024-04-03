<script>
import MovieCard from './MovieCard.vue';
import TVShowCard from './TVShowCard.vue';
import { state } from '../state.js';

export default {
  name: 'AppMain',
  components: {
    MovieCard,
    TVShowCard
  },
  data() {
    return {
      state,
      searchQuery: ''
    }
  }
}

</script>

<template>

  <h1 class="m-3">Search movie or TV show</h1>

  <!-- Searchbar -->
  <div class="search_bar">

    <input type="text" name="searchMovie" id="searchMovie" v-model="searchQuery">
    <button type="button" @click="this.state.searchMovieOrTvShow(this.searchQuery)">Search</button>

  </div>

  <!-- Movie list -->
  <section class="container mb-5" v-if="state.movies.length > 0">

    <h2>Movies</h2>

    <div class="row row-cols-5 g-3">

      <MovieCard :movie="movie" v-for="movie in state.movies" />

    </div>
  </section>

  <!-- TV Show list -->
  <section class="container mb-5" v-if="state.tvShows.length > 0">

    <h2>TV Shows</h2>

    <div class="row row-cols-5 g-3">

      <TVShowCard :tvShow="tvShow" v-for="tvShow in state.tvShows" />

    </div>
  </section>

</template>

<style></style>