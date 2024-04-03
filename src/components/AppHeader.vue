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

  <div id="header" class="d-flex justify-content-between align-items-center">

    <!-- Searchbar -->
    <div class="input-group m-4 w-25">
      <input type="text" class="form-control" placeholder="Search movie or tv show" aria-label="Search movie or tv show"
        aria-describedby="button-addon2" v-model="searchQuery">
      <button class="btn btn-danger" type="button" id="button-addon2"
        @click="this.state.searchMovieOrTvShow(this.searchQuery)">Search</button>
    </div>

    <!--       <input type="text" name="searchMovie" id="searchMovie" v-model="searchQuery">
      <button type="button" @click="this.state.searchMovieOrTvShow(this.searchQuery)">Search</button> -->



  </div>


</template>

<style></style>