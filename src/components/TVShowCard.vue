<script>
import { state } from '../state.js';
import axios from 'axios';

export default {
  name: 'MTVShowCard',
  data() {
    return {
      state,
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

    <div class="_card">
      <h4 class="text_overflow" id="tvShow_title"> {{ tvShow.title }} </h4>
      <h6 class="text_overflow" id="original_title"> {{ tvShow.originalTitle }} </h6>
      <p id="language"> {{ tvShow.flag }} </p>
      <img class="rounded" :src="this.flag" alt="">
      <p id="vote"> Voto: {{ tvShow.vote }} </p>
    </div>

  </div>

</template>

<style></style>