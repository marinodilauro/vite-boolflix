<script>
import { state } from '../state.js';
import axios from 'axios';

export default {
  name: 'MovieCard',
  data() {
    return {
      state,
      hovered: false,
      flag: '',
      mainActors: []
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
    },
    async getActors(movieIndex) {

      await axios.get('https://api.themoviedb.org/3/movie/' + this.state.movies[this.movie.index].id + '/credits?api_key=181a6823495c32659ae7407c099e7e8f')
        .then(response => {

          const actors = response.data.cast.slice(0, 5);

          // console.log(actors);

          actors.forEach((actor, index) => {
            let actorName;

            if (index < actors.length - 1) {
              actorName = actor.name + ','

            } else {
              actorName = actor.name;
            }

            this.mainActors.push(actorName)
          })

          // console.log(this.mainActors);

        })
        .catch(err => {
          console.error(err.message)
        })
    }

  },
  mounted() {
    this.getFlag(this.getCountryCode(this.state.movies[this.movie.index].lang));
    this.getActors(this.state.movies[this.movie.index].id);
  }
}

</script>

<template>

  <div class="col">

    <div class="_card movie" @mouseenter="this.hovered = true" @mouseleave="this.hovered = false"
      :style="{ backgroundImage: `url(${movie.poster})` }">

      <div class="description py-3" :class="{ hovered: hovered === true || movie.poster_path === null }">

        <h4 class="text_overflow px-3 mb-4" id="movie_title"> {{ movie.title }} </h4>

        <h6 class="text_overflow px-3 mb-4" id="original_title"><strong> Titolo originale: </strong>
          {{ movie.originalTitle }}
        </h6>

        <div class="px-3 mb-4" id="language">
          <strong> Lingua: </strong> {{ movie.flag }}
          <img class="language_flag rounded mx-3" :src="this.flag" alt="">
        </div>

        <div class="px-3 mb-4" id="vote" v-if="movie.vote > 0">
          Voto: <i v-for="vote in movie.vote" :key="vote" class="fa-solid fa-star me-1"></i>
        </div>

        <p class="overview px-3" v-if="movie.overview">
          <strong> Descrizione: </strong>
          {{ movie.overview }}
        </p>

        <p class="actors px-3" v-if="this.mainActors.length > 0">
          <strong> Attori: </strong>
          <span class="pe-2" v-for="actor in this.mainActors"> {{ actor }} </span>
        </p>

      </div>


    </div>

  </div>

</template>

<style></style>