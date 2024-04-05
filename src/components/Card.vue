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
      mainActors: []
    }
  },
  props: {
    element: Object
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

      await axios.get('https://api.themoviedb.org/3/movie/' + this.state.APIresults.movies[this.state.APIresults.movies.index].id + '/credits?api_key=181a6823495c32659ae7407c099e7e8f')
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
    /*     this.getFlag(this.getCountryCode(this.element[this.state.APIresults.movies.index].original_language));
        this.getActors(this.element[this.state.APIresults.movies.index].id); */
  }
}

</script>

<template>

  <template v-if="element === 'movies'">

    <div class="_card movie" @mouseenter="this.hovered = true" @mouseleave="this.hovered = false"
      :style="{ backgroundImage: `url(${element.poster})` }">

      <div class="description py-3" :class="{ hovered: hovered === true || element.poster_path === null }">

        <h4 class="text_overflow px-3 mb-4">
          {{ element.title }}
        </h4>

        <h6 class="text_overflow px-3 mb-4">
          <strong> Titolo originale: </strong>

        </h6>

        <div class="px-3 mb-4" id="language">
          <strong> Lingua: </strong>
          {{ element.flag }}
          <img class="language_flag rounded mx-3" :src="this.flag" alt="">
        </div>

        <div class="px-3 mb-4" id="vote" v-if="element.vote > 0">
          Voto: <i v-for="vote in element.vote" :key="vote" class="fa-solid fa-star me-1"></i>
        </div>

        <p class="overview px-3" v-if="element.overview">
          <strong> Descrizione: </strong>
          {{ element.overview }}
        </p>

        <p class="actors px-3" v-if="this.mainActors.length > 0">
          <strong> Attori: </strong>
          <span class="pe-2" v-for="actor in this.mainActors"> {{ actor }} </span>
        </p>

      </div>

    </div>

  </template>


  <template v-else>

    <div class="_card tvShow" @mouseenter="this.hovered = true" @mouseleave="this.hovered = false"
      :style="{ backgroundImage: `url(${element.poster})` }">

      <div class="description" :class="{ hovered: hovered === true || element.poster_path === null }">

        <h4 class="text_overflow px-3 my-4"> {{ element.name }} </h4>

        <h6 class="text_overflow px-3 mb-4">Titolo originale: {{ element.original_name }}
        </h6>

        <div class="px-3 mb-4" id="language">Lingua: {{ element.flag }}
          <img class="language_flag rounded mx-3" :src="this.flag" alt="">
        </div>

        <p class="px-3" id="vote">
          Voto: <i v-for="vote in element.vote" :key="vote" class="fa-solid fa-star me-1"></i>
        </p>

        <p class="overview px-3" v-if="element.overview">
          <strong> Descrizione: </strong>
          {{ element.overview }}
        </p>

        <p class="actors px-3" v-if="this.mainActors.length > 0">
          <strong> Attori: </strong>
          <span class="pe-2" v-for="actor in this.mainActors"> {{ actor }} </span>
        </p>

      </div>

    </div>

  </template>

</template>

<style></style>