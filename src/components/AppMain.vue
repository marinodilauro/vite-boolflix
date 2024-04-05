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
      hovered: false,
      flag: '',
      mainActors: []
    }
  }
}

</script>

<template>

  <div id="main">

    <section class="my-4 m-auto" v-for="(result, type) in state.APIresults">

      <h2 class="mb-4" v-if="result.length > 0"> {{ type }} </h2>

      <div class="row row-cols-5 g-5">

        <div class="col" v-for="element in result">

          <Card :element="element" />

        </div>

      </div>

    </section>

  </div>

</template>

<style></style>