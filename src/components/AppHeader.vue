<script>
import { state } from '../state.js';

export default {
  name: 'AppHeader',
  data() {
    return {
      state,
      searchQuery: ''
    }
  }
}

</script>

<template>

  <div id="header" class="d-flex justify-content-around align-items-center">

    <div class="logo py-3">
      <img src="/public/images/boolflixLogo.png" alt="">
    </div>

    <!-- Searchbar -->
    <div class="input-group w-25">
      <input type="text" class="form-control" placeholder="Search movie or tv show" aria-label="Search movie or tv show"
        aria-describedby="button-addon2" v-model="searchQuery"
        @keyup.enter="this.state.searchMovieOrTvShow(this.searchQuery)">
      <button class="btn btn-danger" type="button" id="button-addon2"
        @click="this.state.searchMovieOrTvShow(this.searchQuery)">Search</button>
    </div>

  </div>


</template>

<style></style>