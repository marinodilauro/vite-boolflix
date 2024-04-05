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

    <section v-for="(result, type) in state.APIresults">

      <h2 v-if="result.length > 0"> {{ type.charAt(0).toUpperCase() + type.slice(1) }} </h2>

      <div class="row row-cols-6 gx-2">

        <div class="col" v-for="element in result">

          <Card :element="element" :type="type" />

        </div>

      </div>

    </section>

  </div>

</template>

<style></style>