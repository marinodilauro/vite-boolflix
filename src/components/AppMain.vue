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
      filtered: false,
      filteredGenres: []
    }
  },
  methods: {
    receiveMovieGenres() { },
    receiveMovieActors() { },
    receivetvShowGenres() { },
    receiveTvShowActors() { },


    filterByGenres(genre) {

      console.log(this.components);

      let movies = this.state.APIresults.movies;
      console.log(movies);

      movies.forEach((movie, index) => {


        console.log(movie['genre_ids']);
        console.log(movie['genre_ids'].includes(genre));

        if (movie['genre_ids'].includes(genre)) {

          console.log(this.$refs.card[movie.index]);
          console.log(movie);


          console.log(this.$refs.card[movie.index].$data.movieGenres);
          this.$refs.card[movie.index].$data.movieGenres = []
          console.log(this.$refs.card[movie.index].$data.movieGenres);
          this.$refs.card[movie.index].getMovieGenres(movie.id);
          console.log(this.$refs.card[movie.index].$data.movieGenres);
          this.$refs.card[movie.index].$data.movieGenres = this.$refs.card[movie.index].$data.movieGenres;
          console.log(this.$refs.card[movie.index].$data.movieGenres);

          console.log(this.$refs.card[movie.index].$data.movieMainActors);
          this.$refs.card[movie.index].$data.movieMainActors = []
          console.log(this.$refs.card[movie.index].$data.movieMainActors);
          this.receiveMovieActors();
          console.log(this.$refs.card[movie.index].$data.movieMainActors);

          this.state.APIresults.movies = []

          this.state.APIresults.movies.push(movie);

        }
      })

      console.log(this.state.APIresults.movies);


    }

  },
  updated() {
    // this.$refs.card[movie.index].getMovieGenres(movie.id);
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

          <Card :element="element" :type="type" ref="card" @getMovieGenres="receiveMovieGenres"
            @gettvShowGenres="receivetvShowGenres" @getMovieActors="receiveMovieActors"
            @getTvShowActors="receiveTvShowActors" />

        </div>

      </div>

    </section>

  </div>

</template>

<style></style>