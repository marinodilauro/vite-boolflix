<script>
import MovieCard from './MovieCard.vue';
import { state } from '../state.js';

export default {
  name: 'AppMain',
  components: {
    MovieCard
  },
  data() {
    return {
      state,
      searchMovieQuery: ''
    }
  }
}

</script>

<template>

  <div class="search_bar">

    <input type="text" name="searchMovie" id="searchMovie" v-model="searchMovieQuery">
    <button type="button" @click="this.state.searchMovie(this.searchMovieQuery)">Search movie</button>

  </div>

  <!-- Movie list -->
  <section class="container mb-5">
    <div class="row row-cols-5 g-3">

      <MovieCard :movie="movie" v-for="movie in state.movies" />

    </div>
  </section>

</template>

<style></style>