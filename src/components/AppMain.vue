<script>
import Card from './Card.vue';
import { state } from '../state.js';


export default {
  name: 'AppMain',
  components: {
    Card
  },
  data() {
    return {
      state,
      searchQuery: '',
      flag: '',
      filtered: false
    }
  },
  methods: {
    filterByGenres(genre) {
      console.log(genre);
    }
  }
}

</script>

<template>

  <div id="main">

    <section v-for="(result, type) in state.APIresults">

      <h2 v-if="result.length > 0"> {{ type.charAt(0).toUpperCase() + type.slice(1) }} </h2>

      <div class="filter_by_genres" v-if="result.length > 0">
        <strong>Filter by genres</strong>

        <div class="genres d-flex gap-3 mt-2" v-if="type === 'movies'">
          <div class="genre fw-semibold" v-for="genre in state.searchedMovieGenres" @click="filterByGenres(genre)">
            {{ genre }}
          </div>
        </div>

        <div class="genres d-flex gap-3 mt-2" v-else>
          <div class="genre fw-semibold" v-for="genre in state.searchedTvShowsGenres" @click="filterByGenres(genre)">
            {{ genre }}
          </div>
        </div>

      </div>

      <div class="row row-cols-6 gx-2">

        <div class="col" v-for="element in result">

          <Card :element="element" :type="type" />

        </div>

      </div>

    </section>

  </div>

</template>

<style></style>