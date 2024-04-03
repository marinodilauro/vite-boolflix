<script>
import { state } from '../state.js';

export default {
  name: 'AppMain',
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

  <div class="container">
    <div class="row row-cols-6 gy-1">
      <div class="col" v-for="movie in this.state.movies">

        <div class="movie_card">
          <h3 id="movie_title"> {{ movie.title }} </h3>
          <h6 id="original_title"> {{ movie.originalTitle }} </h6>
          <p id="language"> {{ movie.lang }} </p>
          <p id="vote"> {{ movie.vote }} </p>
        </div>
      </div>
    </div>

  </div>

</template>

<style></style>