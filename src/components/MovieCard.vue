<script>
import { state } from '../state.js';
import axios from 'axios';

export default {
  name: 'MovieCard',
  data() {
    return {
      state,
      hovered: false,
      flag: ''
    }
  },
  props: {
    movie: Object,
    tvShow: Object
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
        default:
          languageCode = languageCode
      }

      return languageCode;

    },
    async getFlag(countryCode) {

      await axios.get('https://restcountries.com/v3.1/alpha/' + countryCode)
        .then(response => {

          console.log(response.data[0].flags.svg);
          this.flag = response.data[0].flags.svg;

        })
        .catch(err => {
          console.error(err.message)
        })
    }
  },
  mounted() {
    this.getFlag(this.getCountryCode(this.state.movies[this.movie.id].lang));
  }
}

</script>

<template>

  <div class="col">

    <div class="_card movie" @mouseenter="this.hovered = true" @mouseleave="this.hovered = false"
      :style="{ backgroundImage: `url(${movie.poster})` }">

      <div class="description" :class="{ hovered: hovered === true || movie.poster_path === null }">

        <h4 class="text_overflow px-3 my-4" id="movie_title"> {{ movie.title }} </h4>
        <h6 class="text_overflow px-3 mb-4" id="original_title">Titolo originale: {{ movie.originalTitle }} </h6>
        <div class="px-3 mb-4" id="language">Lingua: {{ movie.flag }}
          <img class="language_flag rounded mx-3" :src="this.flag" alt="">
        </div>
        <div class="px-3" id="vote">Voto: <i v-for="vote in movie.vote" :key="vote" class="fa-solid fa-star me-1"></i>
        </div>

      </div>


    </div>

  </div>

</template>

<style></style>