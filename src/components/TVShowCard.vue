<script>
import { state } from '../state.js';
import axios from 'axios';

export default {
  name: 'TVShowCard',
  data() {
    return {
      state,
      hovered: false,
      flag: ''
    }
  },
  props: {
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
    this.getFlag(this.getCountryCode(this.state.tvShows[this.tvShow.id].lang));
  }
}

</script>

<template>

  <div class="col">

    <div class="_card tvShow" @mouseenter="this.hovered = true" @mouseleave="this.hovered = false"
      :style="{ backgroundImage: `url(${tvShow.poster})` }">

      <div class="description" :class="{ hovered: hovered === true || tvShow.poster_path === null }">

        <h4 class="text_overflow px-3 my-4" id="tvShow_title"> {{ tvShow.title }} </h4>
        <h6 class="text_overflow px-3 mb-4" id="original_title">Titolo originale: {{ tvShow.originalTitle }} </h6>
        <div class="px-3 mb-4" id="language">Lingua: {{ tvShow.flag }}
          <img class="language_flag rounded mx-3" :src="this.flag" alt="">
        </div>
        <p class="px-3" id="vote">Voto: <i v-for="vote in tvShow.vote" :key="vote" class="fa-solid fa-star me-1"></i>
        </p>

      </div>

    </div>

  </div>

</template>

<style></style>