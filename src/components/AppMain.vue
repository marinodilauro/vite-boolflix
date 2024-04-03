<script>
import { state } from '../state.js';
import { computed } from 'vue';

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

  <input type="text" name="searchMovie" id="searchMovie" v-model="searchMovieQuery">
  <button type="button" @click="this.state.searchMovie(this.searchMovieQuery)">Search movie</button>

</template>

<style></style>