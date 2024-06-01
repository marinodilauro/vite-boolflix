<script>
import { state } from '../state.js';
import axios from 'axios';

export default {
  name: 'Card',
  emits: ['getMovieGenres', 'gettvShowGenres', 'getMovieActors', 'getTvShowActors'],
  data() {
    return {
      state,
      hovered: false,
      flag: '',
      movieGenres: [],
      tvShowsGenres: [],
      movieMainActors: [],
      tvShowMainActors: [],

      // API varaibles
      details_api_url: 'https://api.themoviedb.org/3/',
      movie_api_url: 'movie/',
      tvShow_api_url: 'tv/',
    }
  },
  props: {
    element: Object,
    type: String
  },
  methods: {

    getCountryCode(languageCode) {

      switch (languageCode) {
        case 'en':
          languageCode = 'gb'
          break;
        case 'ja':
          languageCode = 'jp'
          break;
        case 'zh':
          languageCode = 'cn'
          break;
        case 'ko':
          languageCode = 'kr'
          break;
        case 'da':
          languageCode = 'dk'
          break;
        default:
          languageCode = languageCode
      }

      return languageCode;

    },

    async getFlag(countryCode) {

      await axios.get('https://restcountries.com/v3.1/alpha/' + countryCode)
        .then(response => {

          // console.log(response.data[0].flags.svg);
          this.flag = response.data[0].flags.svg;

        })
        .catch(err => {
          console.error(err.message)
        })
    },

    async getMovieGenres(movieID) {
      this.$emit('getMovieGenres');

      const url = `${this.details_api_url + this.movie_api_url + movieID + '?' + state.api_key}`;

      await axios.get(url)
        .then(response => {

          const genres = response.data.genres

          //console.log(genres);

          genres.forEach(genre => {
            //console.log(genre);

            if (!this.state.searchedMovieGenres.includes(genre.id)) {
              // console.log(this.state.searchedMovieGenres.includes(genre.id));
              // console.log(genre);
              this.state.searchedMovieGenres.push(genre.id);
            }

            // console.log(this.state.searchedMovieGenres);
            this.movieGenres.push(genre.name)
          })


          //console.log(this.state.searchedMovieGenres);
          //console.log(this.movieMainActors);

        })
        .catch(err => {
          console.error(err.message)
        })

    },

    async gettvShowGenres(tvShowID) {
      this.$emit('gettvShowGenres');

      const url = `${this.details_api_url + this.movie_api_url + tvShowID + '?' + state.api_key}`;

      await axios.get(url)
        .then(response => {

          const genres = response.data.genres

          // console.log(genres);

          genres.forEach((genre) => {

            if (!this.state.searchedTvShowsGenres.includes(genre)) {
              this.state.searchedTvShowsGenres.push(genre)
            }

            this.tvShowsGenres.push(genre.name)

          });

          //console.log(this.movieMainActors);


        })
        .catch(err => {
          console.error(err.message)
        })

    },

    async getMovieActors(movieID) {
      this.$emit('getMovieActors');

      const url = `${this.details_api_url + this.movie_api_url + movieID + '/credits?' + state.api_key}`;

      await axios.get(url)
        .then(response => {

          const actors = response.data.cast.slice(0, 5);

          //console.log(actors);

          actors.forEach((actor, index) => {

            let actorName;

            if (index < actors.length - 1) {
              actorName = actor.name + ',';
            } else {
              actorName = actor.name;
            }

            this.movieMainActors.push(actorName)

          });

          //console.log(this.movieMainActors);


        })
        .catch(err => {
          console.error(err.message)
        })
    },

    async getTvShowActors(tvShowID) {
      this.$emit('getTvShowActors');

      const url = `${this.details_api_url + this.tvShow_api_url + tvShowID + '/credits?' + state.api_key}`;

      return await axios.get(url)
        .then(response => {

          const actors = response.data.cast.slice(0, 5);

          //console.log(actors);

          actors.forEach((actor, index) => {

            let actorName;

            if (index < actors.length - 1) {
              actorName = actor.name + ',';
            } else {
              actorName = actor.name;
            }

            this.tvShowMainActors.push(actorName)

          });

          //console.log(this.tvShowMainActors);

        })
        .catch(err => {
          console.error(err.message)
        })
    }
  },
  mounted() {

    this.getFlag(this.getCountryCode(this.element.original_language));

    if (this.type === 'movies') {

      this.getMovieActors(this.state.APIresults.movies[this.element.index].id);

      this.getMovieGenres(this.state.APIresults.movies[this.element.index].id);

    } else {

      this.getTvShowActors(this.state.APIresults.tvShows[this.element.index].id);

      this.gettvShowGenres(this.state.APIresults.tvShows[this.element.index].id);

    }



    // console.log(this.state.searchedMovieGenres);

  }
}

</script>

<template>

  <template v-if="type === 'movies'">

    <div class="_card movie" :style="{ backgroundImage: `url(${element.poster})` }">

      <h6 class="card_title text_overflow px-3 my-4"> {{ element.title }} </h6>

      <div class="description">

        <h4 class="text_overflow px-3 my-2"> {{ element.title }} </h4>

        <h6 class="text_overflow px-3 mb-2">
          <strong> Titolo originale </strong>
          <br>
          {{ element.original_title }}
        </h6>

        <div class="genres px-3 mb-2">
          <strong> Genere </strong>
          <br>
          <span class="pe-2" v-for="genre in this.movieGenres">
            {{ genre }}
          </span>
        </div>

        <div class="language px-3 mb-2">
          <strong> Lingua </strong>
          <br>
          {{ element.flag }}
          <img class="language_flag rounded-1" :src="this.flag" alt="">
        </div>

        <p class="vote px-3 mb-2">
          <strong> Voto </strong>
          <br>
          <i v-for="vote in element.vote" :key="vote" class="fa-solid fa-star me-1"></i>
          <i v-for="emptyStars in (5 - element.vote)" :key="emptyStars" class="fa-regular fa-star me-1"></i>
        </p>

        <p class="overview px-3 mb-1" v-if="element.overview">
          <strong> Descrizione </strong>
          <br>
          {{ element.overview }}
        </p>

        <p class="actors px-3" v-if="this.movieMainActors.length > 0">
          <strong> Attori </strong>
          <br>
          <span class="pe-2" v-for="actor in this.movieMainActors">
            {{ actor }}
          </span>
        </p>

      </div>

    </div>

  </template>


  <template v-else>

    <div class="_card tvShow" @mouseenter="this.hovered = true" @mouseleave="this.hovered = false"
      :style="{ backgroundImage: `url(${element.poster})` }">

      <div class="description" :class="{ hovered: hovered === true || element.poster_path === null }">

        <h4 class="text_overflow px-3 "> {{ element.name }} </h4>

        <h6 class="text_overflow px-3 mb-2">
          <strong> Titolo originale </strong>
          <br>
          {{ element.original_name }}
        </h6>

        <div class="genres genres px-3 mb-2">
          <strong> Genere </strong>
          <br>
          <span class="pe-2" v-for="genre in this.tvShowsGenres">
            {{ genre }}
          </span>
        </div>

        <div class="language px-3 mb-2">
          <strong> Lingua </strong>
          <br>
          {{ element.flag }}
          <img class="language_flag rounded-1 mb-2" :src="this.flag" alt="">
        </div>

        <p class="vote px-3 mb-2">
          <strong> Voto </strong>
          <br>
          <i v-for="vote in element.vote" :key="vote" class="fa-solid fa-star my-2 me-1"></i>
          <i v-for="emptyStars in (5 - element.vote) " :key="emptyStars" class="fa-regular fa-star my-2 me-1"></i>
        </p>

        <p class="overview px-3 mb-2" v-if="element.overview">
          <strong> Descrizione </strong>
          <br>
          {{ element.overview }}
        </p>

        <p class="actors px-3" v-if="this.tvShowMainActors.length > 0">
          <strong> Attori </strong>
          <br>
          <span class="pe-2" v-for="actor in this.tvShowMainActors">
            {{ actor }}
          </span>

        </p>

      </div>

    </div>

  </template>

</template>

<style></style>