<script>
import { state } from '../state.js';
import axios from 'axios';

export default {
  name: 'Card',
  data() {
    return {
      state,
      hovered: false,
      flag: '',
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

    async getMovieActors(movieID) {

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

      this.getMovieActors(this.state.APIresults.movies[this.element.index].id)

    } else {

      this.getTvShowActors(this.state.APIresults.tvShows[this.element.index].id);

    }
  }
}

</script>

<template>

  <template v-if="type === 'movies'">

    <div class="_card movie" @mouseenter="this.hovered = true" @mouseleave="this.hovered = false"
      :style="{ backgroundImage: `url(${element.poster})` }">

      <div class="description" :class="{ hovered: hovered === true || element.poster_path === null }">

        <h4 class="text_overflow px-3 my-4"> {{ element.title }} </h4>

        <h6 class="text_overflow px-3 mb-4"> <strong> Titolo originale: </strong> {{ element.original_title }} </h6>

        <div class="px-3 mb-4" id="language"> <strong> Lingua: </strong> {{ element.flag }}
          <img class="language_flag rounded mx-3" :src="this.flag" alt="">
        </div>

        <p class="vote px-3">
          <strong> Voto: </strong> <i v-for="vote in element.vote" :key="vote" class="fa-solid fa-star me-1"></i>
        </p>

        <p class="overview px-3" v-if="element.overview">
          <strong> Descrizione: </strong>
          {{ element.overview }}
        </p>

        <p class="actors px-3" v-if="this.movieMainActors.length > 0">
          <strong> Attori: </strong>
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

        <h4 class="text_overflow px-3 my-4"> {{ element.name }} </h4>

        <h6 class="text_overflow px-3 mb-4"> <strong> Titolo originale: </strong> {{ element.original_name }} </h6>

        <div class="px-3 mb-4" id="language"> <strong> Lingua: </strong> {{ element.flag }}
          <img class="language_flag rounded mx-3" :src="this.flag" alt="">
        </div>

        <p class="vote px-3">
          <strong> Voto: </strong> <i v-for="vote in element.vote" :key="vote" class="fa-solid fa-star me-1"></i>
        </p>

        <p class="overview px-3" v-if="element.overview">
          <strong> Descrizione: </strong>
          {{ element.overview }}
        </p>

        <p class="actors px-3" v-if="this.tvShowMainActors.length > 0">
          <strong> Attori: </strong>
          <span class="pe-2" v-for="actor in this.tvShowMainActors">
            {{ actor }}
          </span>

        </p>

      </div>

    </div>

  </template>

</template>

<style></style>